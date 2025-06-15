import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Upload, DollarSign, Calendar, Send, AlertCircle, Zap, TrendingUp } from 'lucide-react';
import CyberButton from '../components/CyberButton';
import CyberCard from '../components/CyberCard';
import CyberInput from '../components/CyberInput';

const SellCard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    cardType: '',
    cardCode: '',
    cardValue: '',
    expiryDate: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const cardTypes = [
    'Amazon Pay',
    'Flipkart',
    'Myntra',
    'Google Play',
  ];

  const cardValues = [
    '₹199', '₹299', '₹499', '₹999', '₹1,999', '₹2,999', '₹4,999', 'Custom'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Validate minimum card value
    if (name === 'cardValue' && value === 'Custom') {
      setFormData({
        ...formData,
        [name]: value,
      });
      return;
    }
    
    if (name === 'customValue') {
      const numericValue = parseInt(value.replace(/[^\d]/g, ''));
      if (numericValue && numericValue < 199) {
        setError('Minimum card value is ₹199');
        return;
      } else {
        setError('');
      }
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setError('Only JPEG, PNG, and GIF files are allowed');
        return;
      }
      
      setSelectedFile(file);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate minimum value
    let finalValue = formData.cardValue;
    if (formData.cardValue === 'Custom') {
      const customValueInput = document.querySelector('input[name="customValue"]') as HTMLInputElement;
      if (customValueInput) {
        const numericValue = parseInt(customValueInput.value.replace(/[^\d]/g, ''));
        if (!numericValue || numericValue < 199) {
          setError('Minimum card value is ₹199');
          setLoading(false);
          return;
        }
        finalValue = `₹${numericValue}`;
      }
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('cardType', formData.cardType);
      formDataToSend.append('cardCode', formData.cardCode);
      formDataToSend.append('cardValue', finalValue);
      formDataToSend.append('expiryDate', formData.expiryDate);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('userId', user?.id || '');
      
      if (selectedFile) {
        formDataToSend.append('cardImage', selectedFile);
      }

      const response = await fetch('/api/cards/submit', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          cardType: '',
          cardCode: '',
          cardValue: '',
          expiryDate: '',
          description: '',
        });
        setSelectedFile(null);
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        setError('Failed to submit gift card. Please try again.');
      }
    } catch (err) {
      setError('Submission failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <CyberCard glow className="text-center max-w-md animate-scale-in">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyber-green to-green-500 rounded-full flex items-center justify-center animate-pulse">
            <Send className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Card Submitted Successfully!
          </h2>
          <p className="text-gray-300 mb-6 font-sans">
            Your gift card has been securely submitted for review. Our team will process it within 24 hours.
          </p>
          <div className="flex items-center justify-center gap-2 text-cyber-blue animate-pulse">
            <Zap className="w-4 h-4" />
            <span className="font-medium">Redirecting to dashboard...</span>
          </div>
        </CyberCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold bg-gradient-to-r from-cyber-blue to-cyber-pink bg-clip-text text-transparent mb-4">
            Sell Your Gift Card
          </h1>
          <p className="text-gray-300 text-lg font-sans mb-6">
            Transform your unused gift cards into instant cash
          </p>
          
          {/* Key benefits */}
          <div className="bg-gradient-to-r from-cyber-blue/10 to-cyber-pink/10 backdrop-blur-md border border-cyber-neon/20 rounded-xl p-4 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyber-neon" />
                <span className="text-white font-medium text-sm">24 Hour Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyber-pink" />
                <span className="text-white font-medium text-sm">Up to 200% Value</span>
              </div>
            </div>
          </div>
        </div>

        <CyberCard glow className="animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-300 text-center flex items-center gap-2 animate-scale-in">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-sans">{error}</span>
              </div>
            )}

            {/* Card Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 font-display">
                Gift Card Type *
              </label>
              <select
                name="cardType"
                value={formData.cardType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-cyber-gray/30 border border-cyber-blue/50 rounded-lg text-white font-sans focus:outline-none focus:ring-2 focus:border-cyber-blue focus:ring-cyber-blue/50 focus:shadow-lg focus:shadow-cyber-blue/20 transition-all duration-300 hover:border-cyber-blue/70"
              >
                <option value="">Select a gift card type</option>
                {cardTypes.map((type) => (
                  <option key={type} value={type} className="bg-cyber-dark">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Card Code */}
            <CyberInput
              label="Gift Card Code *"
              type="text"
              name="cardCode"
              value={formData.cardCode}
              onChange={handleInputChange}
              icon={CreditCard}
              placeholder="Enter the gift card code"
              required
            />

            {/* Card Value */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 font-display">
                Card Value * <span className="text-cyber-neon text-xs">(Minimum ₹199)</span>
              </label>
              <select
                name="cardValue"
                value={formData.cardValue}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-cyber-gray/30 border border-cyber-blue/50 rounded-lg text-white font-sans focus:outline-none focus:ring-2 focus:border-cyber-blue focus:ring-cyber-blue/50 focus:shadow-lg focus:shadow-cyber-blue/20 transition-all duration-300 hover:border-cyber-blue/70"
              >
                <option value="">Select card value</option>
                {cardValues.map((value) => (
                  <option key={value} value={value} className="bg-cyber-dark">
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Value Input */}
            {formData.cardValue === 'Custom' && (
              <CyberInput
                label="Custom Value *"
                type="text"
                name="customValue"
                placeholder="Enter value (minimum ₹199)"
                icon={DollarSign}
                required
              />
            )}

            {/* Expiry Date */}
            <CyberInput
              label="Expiry Date (Optional)"
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              icon={Calendar}
            />

            {/* File Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 font-display">
                Upload Card Image *
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="hidden"
                  id="cardImage"
                />
                <label
                  htmlFor="cardImage"
                  className="w-full px-4 py-8 border-2 border-dashed border-cyber-blue/50 rounded-lg cursor-pointer hover:border-cyber-blue hover:bg-cyber-blue/5 transition-all duration-300 flex flex-col items-center justify-center space-y-3 group"
                >
                  <Upload className="w-10 h-10 text-cyber-blue group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-300 font-sans text-center">
                    {selectedFile ? (
                      <span className="text-cyber-neon font-medium">{selectedFile.name}</span>
                    ) : (
                      <>
                        <span className="block font-medium">Click to upload card image</span>
                        <span className="text-sm text-gray-400">PNG, JPG, GIF up to 5MB</span>
                      </>
                    )}
                  </span>
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 font-display">
                Additional Notes (Optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Any additional information about the gift card..."
                className="w-full px-4 py-3 bg-cyber-gray/30 border border-cyber-blue/50 rounded-lg text-white placeholder-gray-400 font-sans focus:outline-none focus:ring-2 focus:border-cyber-blue focus:ring-cyber-blue/50 focus:shadow-lg focus:shadow-cyber-blue/20 transition-all duration-300 resize-none hover:border-cyber-blue/70"
              />
            </div>

            <CyberButton
              type="submit"
              loading={loading}
              icon={Send}
              className="w-full"
              size="lg"
            >
              <span className="font-display font-semibold">
                {loading ? 'SUBMITTING...' : 'SUBMIT GIFT CARD'}
              </span>
            </CyberButton>
          </form>

          <div className="mt-8 p-4 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg">
            <h3 className="text-sm font-semibold text-cyber-blue mb-2 font-display">🔒 Security Notice</h3>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Your gift card information is encrypted and securely transmitted. 
              Only authorized administrators can access your submission details. 
              We process all cards within 24 hours and maintain strict confidentiality.
            </p>
          </div>
        </CyberCard>
      </div>
    </div>
  );
};

export default SellCard;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import CyberButton from '../components/CyberButton';
import CyberCard from '../components/CyberCard';
import CyberInput from '../components/CyberInput';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const success = await register(formData.username, formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Registration failed. Username or email may already exist.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full animate-scale-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-cyber-blue to-cyber-pink bg-clip-text text-transparent">
            Join CyberCards
          </h2>
          <p className="mt-2 text-gray-300 font-sans">
            Create your account to start trading gift cards
          </p>
        </div>

        <CyberCard glow>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-center font-sans animate-scale-in">
                {error}
              </div>
            )}

            <CyberInput
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              icon={User}
              placeholder="Choose a username"
              required
            />

            <CyberInput
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              icon={Mail}
              placeholder="Enter your email"
              required
            />

            <CyberInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              icon={Lock}
              placeholder="Create a password (min. 6 characters)"
              required
            />

            <CyberInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={Lock}
              placeholder="Confirm your password"
              required
            />

            <CyberButton
              type="submit"
              loading={loading}
              icon={UserPlus}
              className="w-full"
              size="lg"
            >
              <span className="font-display font-semibold">
                {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </span>
            </CyberButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300 font-sans">
              Already have an account?{' '}
              <Link to="/login" className="text-cyber-blue hover:text-cyber-pink transition-colors duration-300 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </CyberCard>
      </div>
    </div>
  );
};

export default Register;
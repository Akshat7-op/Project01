import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, ShoppingCart, Star, Filter, Search, Eye, Lock } from 'lucide-react';
import CyberButton from '../components/CyberButton';
import CyberCard from '../components/CyberCard';
import CyberInput from '../components/CyberInput';

interface GiftCard {
  id: string;
  type: string;
  value: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  rating: number;
  seller: string;
  image: string;
  verified: boolean;
}

const BuyCards: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('discount');

  // Dummy gift cards data
  const giftCards: GiftCard[] = [
    {
      id: '1',
      type: 'Amazon Pay',
      value: '₹1,000',
      originalPrice: '₹1,000',
      discountedPrice: '₹850',
      discount: '15%',
      rating: 4.8,
      seller: 'CyberUser123',
      image: 'https://images.pexels.com/photos/6214479/pexels-photo-6214479.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
    },
    {
      id: '2',
      type: 'Flipkart',
      value: '₹2,000',
      originalPrice: '₹2,000',
      discountedPrice: '₹1,600',
      discount: '20%',
      rating: 4.9,
      seller: 'TechDealer99',
      image: 'https://images.pexels.com/photos/6214479/pexels-photo-6214479.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
    },
    {
      id: '3',
      type: 'Google Play',
      value: '₹500',
      originalPrice: '₹500',
      discountedPrice: '₹425',
      discount: '15%',
      rating: 4.7,
      seller: 'GameMaster',
      image: 'https://images.pexels.com/photos/6214479/pexels-photo-6214479.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: false,
    },
    {
      id: '4',
      type: 'Myntra',
      value: '₹1,500',
      originalPrice: '₹1,500',
      discountedPrice: '₹1,200',
      discount: '20%',
      rating: 4.6,
      seller: 'FashionHub',
      image: 'https://images.pexels.com/photos/6214479/pexels-photo-6214479.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
    },
    {
      id: '5',
      type: 'Amazon Pay',
      value: '₹3,000',
      originalPrice: '₹3,000',
      discountedPrice: '₹2,400',
      discount: '20%',
      rating: 4.9,
      seller: 'PremiumSeller',
      image: 'https://images.pexels.com/photos/6214479/pexels-photo-6214479.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
    },
    {
      id: '6',
      type: 'Google Play',
      value: '₹1,000',
      originalPrice: '₹1,000',
      discountedPrice: '₹800',
      discount: '20%',
      rating: 4.5,
      seller: 'AppLover',
      image: 'https://images.pexels.com/photos/6214479/pexels-photo-6214479.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
    },
  ];

  const cardTypes = ['all', 'Amazon Pay', 'Flipkart', 'Myntra', 'Google Play'];

  const filteredCards = giftCards.filter(card => {
    const matchesSearch = card.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || card.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleBuyClick = () => {
    // Redirect to login for demo purposes
    alert('Please login to purchase gift cards. This is a demo feature.');
  };

  return (
    <div className="min-h-screen py-8 md:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-slide-up">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold bg-gradient-to-r from-cyber-blue to-cyber-pink bg-clip-text text-transparent mb-4">
            Buy Gift Cards
          </h1>
          <p className="text-gray-300 text-lg font-sans mb-6">
            Discover premium gift cards at discounted prices
          </p>
          
          {/* Stats */}
          <div className="bg-gradient-to-r from-cyber-blue/10 to-cyber-pink/10 backdrop-blur-md border border-cyber-neon/20 rounded-xl p-4 mb-8 max-w-2xl mx-auto">
            <p className="text-cyber-neon font-semibold text-lg">💰 We've sold over ₹1,00,000 worth of gift cards and counting!</p>
          </div>
        </div>

        {/* Filters and Search */}
        <CyberCard className="mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center w-full lg:w-auto">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-cyber-blue" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 bg-cyber-gray/30 border border-cyber-blue/50 rounded-lg text-white font-sans focus:outline-none focus:ring-2 focus:border-cyber-blue focus:ring-cyber-blue/50 transition-all duration-300"
                >
                  {cardTypes.map(type => (
                    <option key={type} value={type} className="bg-cyber-dark capitalize">
                      {type === 'all' ? 'All Cards' : type}
                    </option>
                  ))}
                </select>
              </div>
              
              <CyberInput
                type="text"
                placeholder="Search cards or sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={Search}
                className="w-full sm:w-80"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm font-sans">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-cyber-gray/30 border border-cyber-blue/50 rounded-lg text-white font-sans focus:outline-none focus:ring-2 focus:border-cyber-blue focus:ring-cyber-blue/50 transition-all duration-300"
              >
                <option value="discount" className="bg-cyber-dark">Highest Discount</option>
                <option value="price" className="bg-cyber-dark">Lowest Price</option>
                <option value="rating" className="bg-cyber-dark">Highest Rating</option>
              </select>
            </div>
          </div>
        </CyberCard>

        {/* Gift Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCards.map((card, index) => (
            <CyberCard 
              key={card.id} 
              className="group relative overflow-hidden animate-scale-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                {/* Card Image */}
                <div className="w-full h-48 bg-gradient-to-br from-cyber-blue/20 to-cyber-pink/20 rounded-lg mb-4 overflow-hidden relative">
                  <div 
                    className="w-full h-full bg-cover bg-center opacity-60"
                    style={{ backgroundImage: `url(${card.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-cyber-pink/90 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {card.discount} OFF
                    </span>
                  </div>
                  {card.verified && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-cyber-green/90 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Verified
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-display font-bold text-lg">{card.type}</h3>
                    <p className="text-gray-300 text-sm font-sans">Value: {card.value}</p>
                  </div>
                </div>

                {/* Card Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through text-sm font-sans">{card.originalPrice}</span>
                        <span className="text-cyber-neon font-bold text-lg font-display">{card.discountedPrice}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-gray-300 text-sm font-sans">{card.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs font-sans">Seller</p>
                      <p className="text-white text-sm font-medium font-sans">{card.seller}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <CyberButton
                      variant="secondary"
                      size="sm"
                      icon={Eye}
                      className="flex-1"
                      onClick={handleBuyClick}
                    >
                      <span className="font-sans">View Details</span>
                    </CyberButton>
                    <CyberButton
                      size="sm"
                      icon={ShoppingCart}
                      className="flex-1"
                      onClick={handleBuyClick}
                    >
                      <span className="font-sans">Buy Now</span>
                    </CyberButton>
                  </div>
                </div>
              </div>
            </CyberCard>
          ))}
        </div>

        {/* No Results */}
        {filteredCards.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <CreditCard className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-300 text-lg mb-4 font-sans">No gift cards found</p>
            <p className="text-gray-400 font-sans">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Login Notice */}
        <CyberCard className="mt-12 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lock className="w-6 h-6 text-cyber-blue" />
            <h3 className="text-xl font-display font-semibold text-white">Ready to Purchase?</h3>
          </div>
          <p className="text-gray-300 mb-6 font-sans">
            Create an account or login to buy discounted gift cards from verified sellers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <CyberButton icon={CreditCard} className="w-full sm:w-auto">
                <span className="font-display font-semibold">CREATE ACCOUNT</span>
              </CyberButton>
            </Link>
            <Link to="/login">
              <CyberButton variant="secondary" className="w-full sm:w-auto">
                <span className="font-display font-semibold">LOGIN</span>
              </CyberButton>
            </Link>
          </div>
        </CyberCard>

        {/* Success Stats */}
        <div className="mt-12 text-center animate-fade-in">
          <div className="bg-cyber-dark/40 backdrop-blur-md border border-cyber-blue/20 rounded-lg p-6">
            <h4 className="text-cyber-neon font-display font-semibold text-lg mb-2">
              💰 Platform Statistics
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white font-display">₹1,00,000+</div>
                <div className="text-gray-400 text-sm font-sans">Total Sales</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-display">1,234</div>
                <div className="text-gray-400 text-sm font-sans">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-display">2,847</div>
                <div className="text-gray-400 text-sm font-sans">Cards Sold</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCards;
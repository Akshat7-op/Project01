import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CreditCard, Shield, Zap, Users, ArrowRight, Star, Cpu, Database, Lock, TrendingUp, Clock, DollarSign } from 'lucide-react';
import CyberButton from '../components/CyberButton';
import CyberCard from '../components/CyberCard';

const Home: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Clock,
      title: 'Lightning Fast',
      description: 'Sell your gift cards in just 24 hours with our automated system',
    },
    {
      icon: DollarSign,
      title: 'Best Rates',
      description: 'Earn 80% to 200% of your card value with competitive pricing',
    },
    {
      icon: Shield,
      title: 'Secure Trading',
      description: 'Military-grade encryption protects your transactions',
    },
    {
      icon: Users,
      title: 'Trusted Network',
      description: 'Join thousands of satisfied users in our marketplace',
    },
  ];

  const supportedCards = [
    { name: 'Amazon Pay', color: 'from-orange-500 to-yellow-500' },
    { name: 'Flipkart', color: 'from-blue-500 to-indigo-500' },
    { name: 'Myntra', color: 'from-pink-500 to-purple-500' },
    { name: 'Google Play', color: 'from-green-500 to-emerald-500' },
  ];

  const stats = [
    { label: 'Cards Sold', value: '2,847', icon: CreditCard },
    { label: 'Happy Users', value: '1,234', icon: Users },
    { label: 'Total Value', value: '₹10L+', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-street/50 via-cyber-darker to-cyber-dark"></div>
        <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-5"></div>
        
        {/* Anime character background */}
        <div className="absolute inset-0 opacity-15">
          <div 
            className="absolute right-0 top-0 w-full h-full bg-cover bg-center bg-no-repeat animate-hologram"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
              filter: 'hue-rotate(240deg) saturate(1.5) brightness(0.7)',
              maskImage: 'linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
            }}
          />
        </div>
        
        {/* Neon accent lines */}
        <div className="absolute top-10 left-10 w-2 h-20 bg-gradient-to-b from-cyber-pink to-transparent opacity-60 animate-flicker"></div>
        <div className="absolute top-32 left-32 w-2 h-16 bg-gradient-to-b from-cyber-blue to-transparent opacity-80 animate-flicker" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-20 right-20 w-2 h-24 bg-gradient-to-b from-cyber-magenta to-transparent opacity-70 animate-flicker" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating neon particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyber-neon rounded-full animate-matrix opacity-80"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyber-pink rounded-full animate-matrix opacity-60" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-cyber-blue rounded-full animate-matrix opacity-70" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Holographic scan lines */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-blue/5 to-transparent h-2 animate-scan opacity-30"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 animate-slide-up">
            {/* Main title */}
            <div className="relative mb-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-cyber-neon via-cyber-pink to-cyber-magenta bg-clip-text text-transparent animate-neon-pulse relative z-10">
                CYBER CARDS
              </h1>
            </div>
            
            <div className="relative mb-6">
              <h2 className="text-xl md:text-3xl lg:text-4xl font-display font-semibold mb-4 text-white/90">
                Digital Gift Card Exchange
              </h2>
            </div>

            {/* Key selling points */}
            <div className="bg-gradient-to-r from-cyber-blue/20 to-cyber-pink/20 backdrop-blur-md border border-cyber-neon/30 rounded-2xl p-4 md:p-6 mb-8 max-w-4xl mx-auto animate-fade-in">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyber-neon animate-pulse" />
                  <span className="text-white font-medium text-sm md:text-base">Sell in Just 24 Hours!</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyber-pink animate-pulse" />
                  <span className="text-white font-medium text-sm md:text-base">Earn 80% to 200% Value</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-cyber-green animate-pulse" />
                  <span className="text-white font-medium text-sm md:text-base">100% Secure</span>
                </div>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-sans leading-relaxed">
              Transform your unused gift cards into instant cash. Join the digital marketplace where 
              <span className="text-cyber-neon font-medium"> secure transactions meet premium rates.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-12 md:mb-16 animate-scale-in">
            {user ? (
              <>
                <Link to="/sell">
                  <CyberButton size="lg" icon={CreditCard} className="w-full sm:w-auto">
                    <span className="font-display font-semibold">SELL YOUR CARDS</span>
                  </CyberButton>
                </Link>
                <Link to="/dashboard">
                  <CyberButton size="lg" variant="secondary" className="w-full sm:w-auto">
                    <span className="font-display font-semibold">VIEW DASHBOARD</span>
                  </CyberButton>
                </Link>
              </>
            ) : (
              <>
                <Link to="/register">
                  <CyberButton size="lg" icon={CreditCard} className="w-full sm:w-auto shadow-lg shadow-cyber-blue/25">
                    <span className="font-display font-semibold">GET STARTED</span>
                  </CyberButton>
                </Link>
                <Link to="/login">
                  <CyberButton size="lg" variant="secondary" className="w-full sm:w-auto">
                    <span className="font-display font-semibold">LOGIN</span>
                  </CyberButton>
                </Link>
              </>
            )}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12 animate-fade-in">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-cyber-dark/60 backdrop-blur-md border border-cyber-neon/20 rounded-xl p-4 md:p-6 hover:border-cyber-neon/40 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="w-8 h-8 text-cyber-neon mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-white relative">
              <span className="bg-gradient-to-r from-cyber-neon to-cyber-pink bg-clip-text text-transparent">
                Why Choose CyberCards
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-sans mt-4">
              Experience the future of gift card trading with our advanced platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <CyberCard key={index} glow={index % 2 === 0} className="group relative overflow-hidden animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-center relative z-10">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyber-neon to-cyber-pink rounded-full flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white relative z-10" />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-3 text-white group-hover:text-cyber-neon transition-colors duration-300">{feature.title}</h3>
                    <p className="text-gray-300 font-sans text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </CyberCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Supported Cards Section */}
      <section className="py-12 md:py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-white relative">
              <span className="bg-gradient-to-r from-cyber-pink to-cyber-magenta bg-clip-text text-transparent">
                Supported Gift Cards
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-sans mt-4">
              We accept these premium gift card brands
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {supportedCards.map((card, index) => (
              <div
                key={card.name}
                className="bg-cyber-gray/30 border border-cyber-blue/20 rounded-xl p-4 md:p-6 text-center hover:border-cyber-neon/60 hover:bg-cyber-blue/10 transition-all duration-300 transform hover:scale-105 group relative overflow-hidden animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-neon/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                  <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <span className="text-sm md:text-base font-display font-semibold text-gray-300 group-hover:text-cyber-neon transition-colors duration-300 relative z-10">{card.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <CyberCard className="text-center relative overflow-hidden group animate-fade-in" glow>
            <div className="relative z-10 p-4 md:p-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-white">
                <span className="bg-gradient-to-r from-cyber-neon via-cyber-pink to-cyber-magenta bg-clip-text text-transparent animate-neon-pulse">
                  Ready to Start Trading?
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8 font-sans leading-relaxed">
                Join thousands of users who trust CyberCards for secure, fast gift card transactions
              </p>
              {!user && (
                <Link to="/register">
                  <CyberButton size="lg" icon={ArrowRight} className="shadow-lg shadow-cyber-neon/25">
                    <span className="font-display font-semibold">START SELLING NOW</span>
                  </CyberButton>
                </Link>
              )}
            </div>
          </CyberCard>
        </div>
      </section>

      {/* Footer Notice */}
      <footer className="py-8 px-4 relative z-10 border-t border-cyber-neon/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-cyber-dark/40 backdrop-blur-md border border-cyber-blue/20 rounded-lg p-4 mb-4">
            <p className="text-cyber-neon font-semibold mb-2">💰 We've sold over ₹1,00,000 worth of gift cards and counting!</p>
            <p className="text-xs text-gray-400 opacity-70">
              * Our platform facilitates secure digital asset exchanges for users seeking liquidity solutions
            </p>
          </div>
          <p className="text-gray-500 text-sm font-sans">
            © 2024 CyberCards. All rights reserved. | Secure • Fast • Trusted
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CreditCard, User, LogOut, Shield, Home, Menu, X, Cpu, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Buy Cards', href: '/buy', icon: ShoppingBag },
    { name: 'Sell Cards', href: '/sell', icon: CreditCard },
    { name: 'Dashboard', href: '/dashboard', icon: User },
  ];

  if (user?.isAdmin) {
    navigationItems.push({ name: 'Admin', href: '/admin', icon: Shield });
  }

  return (
    <div className="min-h-screen bg-cyber-darker text-white">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-street/50 via-cyber-darker to-cyber-dark"></div>
        <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-5"></div>
        
        {/* Neon accent lines */}
        <div className="absolute top-0 left-0 w-1 h-1 bg-cyber-neon opacity-60 animate-matrix"></div>
        <div className="absolute top-0 left-10 w-1 h-1 bg-cyber-pink opacity-40 animate-matrix" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-0 left-20 w-1 h-1 bg-cyber-magenta opacity-50 animate-matrix" style={{ animationDelay: '4s' }}></div>
        
        {/* Scanning line effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-neon/10 to-transparent h-0.5 animate-scan opacity-20"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-cyber-dark/90 backdrop-blur-md border-b border-cyber-neon/20 shadow-lg shadow-cyber-blue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyber-neon to-cyber-pink rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <Cpu className="w-6 h-6 text-white relative z-10" />
              </div>
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-cyber-neon to-cyber-pink bg-clip-text text-transparent group-hover:animate-pulse">
                CYBERCARDS
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <>
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-display relative group ${
                          isActive
                            ? 'bg-cyber-neon/20 text-cyber-neon border border-cyber-neon/50 shadow-lg shadow-cyber-neon/20'
                            : 'text-gray-300 hover:text-cyber-neon hover:bg-cyber-neon/10 border border-transparent hover:border-cyber-neon/30'
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-neon/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-lg"></div>
                        <Icon className="w-4 h-4 relative z-10" />
                        <span className="relative z-10 font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-cyber-pink hover:bg-cyber-pink/10 transition-all duration-300 font-display border border-transparent hover:border-cyber-pink/30 group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-pink/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-lg"></div>
                    <LogOut className="w-4 h-4 relative z-10" />
                    <span className="relative z-10 font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/buy"
                    className="text-gray-300 hover:text-cyber-neon transition-colors duration-300 font-display px-4 py-2 rounded-lg hover:bg-cyber-neon/10 border border-transparent hover:border-cyber-neon/30 font-medium"
                  >
                    Buy Cards
                  </Link>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-cyber-neon transition-colors duration-300 font-display px-4 py-2 rounded-lg hover:bg-cyber-neon/10 border border-transparent hover:border-cyber-neon/30 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-cyber-neon to-cyber-pink px-6 py-2 rounded-lg font-display font-semibold hover:shadow-lg hover:shadow-cyber-neon/25 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative z-10">Register</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-cyber-neon transition-colors duration-300 p-2 rounded-lg hover:bg-cyber-neon/10"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-cyber-dark/95 backdrop-blur-md border-t border-cyber-neon/20 animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user ? (
                <>
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 font-display ${
                          isActive
                            ? 'bg-cyber-neon/20 text-cyber-neon border border-cyber-neon/50'
                            : 'text-gray-300 hover:text-cyber-neon hover:bg-cyber-neon/10'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-cyber-pink hover:bg-cyber-pink/10 transition-all duration-300 w-full text-left font-display"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/buy"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-gray-300 hover:text-cyber-neon transition-colors duration-300 font-display rounded-lg hover:bg-cyber-neon/10 font-medium"
                  >
                    Buy Cards
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-gray-300 hover:text-cyber-neon transition-colors duration-300 font-display rounded-lg hover:bg-cyber-neon/10 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block bg-gradient-to-r from-cyber-neon to-cyber-pink px-3 py-2 rounded-lg font-display font-semibold hover:shadow-lg hover:shadow-cyber-neon/25 transition-all duration-300"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
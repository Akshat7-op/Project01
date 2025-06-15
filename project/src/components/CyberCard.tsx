import React from 'react';

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}

const CyberCard: React.FC<CyberCardProps> = ({ 
  children, 
  className = '', 
  glow = false, 
  hover = true 
}) => {
  return (
    <div
      className={`
        bg-cyber-dark/80 backdrop-blur-md border border-cyber-neon/30 rounded-lg p-6 relative overflow-hidden
        ${hover ? 'hover:border-cyber-neon/60 hover:shadow-lg hover:shadow-cyber-neon/20 hover:scale-105' : ''}
        ${glow ? 'shadow-lg shadow-cyber-neon/20 animate-neon-pulse' : ''}
        transition-all duration-300 transform group
        ${className}
      `}
    >
      {/* Cyber grid overlay */}
      <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-5 pointer-events-none"></div>
      
      {/* Holographic corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-neon/50 group-hover:border-cyber-neon transition-colors duration-300"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-neon/50 group-hover:border-cyber-neon transition-colors duration-300"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-neon/50 group-hover:border-cyber-neon transition-colors duration-300"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-neon/50 group-hover:border-cyber-neon transition-colors duration-300"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default CyberCard;
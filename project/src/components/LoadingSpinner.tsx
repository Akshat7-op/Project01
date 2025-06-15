import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', text }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        {/* Main spinner */}
        <div className={`${sizeClasses[size]} border-4 border-cyber-neon/30 border-t-cyber-neon rounded-full animate-spin`}></div>
        {/* Counter-rotating inner ring */}
        <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-r-cyber-pink rounded-full animate-spin`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        {/* Pulsing center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-cyber-neon rounded-full animate-pulse"></div>
        </div>
      </div>
      {text && (
        <p className="text-gray-300 text-sm animate-pulse font-cyber">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface CyberButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const CyberButton: React.FC<CyberButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  loading = false,
  className = '',
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-display font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden group';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-cyber-neon to-cyber-pink text-black hover:shadow-lg hover:shadow-cyber-neon/25 border border-cyber-neon/50 hover:border-cyber-neon',
    secondary: 'bg-cyber-gray/50 text-cyber-neon border border-cyber-neon/50 hover:bg-cyber-neon/20 hover:shadow-lg hover:shadow-cyber-neon/25 hover:border-cyber-neon',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/25 border border-red-500/50 hover:border-red-500',
    success: 'bg-gradient-to-r from-cyber-green to-green-500 text-black hover:shadow-lg hover:shadow-cyber-green/25 border border-cyber-green/50 hover:border-cyber-green',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {/* Holographic shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center">
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"></div>
        )}
        {Icon && !loading && <Icon className="w-4 h-4 mr-2" />}
        {children}
      </div>
    </button>
  );
};

export default CyberButton;
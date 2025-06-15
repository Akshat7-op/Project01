import React, { forwardRef } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface CyberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  cyber?: boolean;
}

const CyberInput = forwardRef<HTMLInputElement, CyberInputProps>(
  ({ label, error, icon: Icon, cyber = true, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-300 font-display">
            {label}
          </label>
        )}
        <div className="relative group">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-cyber-neon transition-colors duration-300" />
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 bg-cyber-gray/30 border rounded-lg text-white placeholder-gray-400 font-sans
              focus:outline-none focus:ring-2 transition-all duration-300 relative
              hover:border-cyber-blue/70
              ${cyber 
                ? 'border-cyber-neon/50 focus:border-cyber-neon focus:ring-cyber-neon/50 focus:shadow-lg focus:shadow-cyber-neon/20' 
                : 'border-gray-600 focus:border-gray-500 focus:ring-gray-500/50'
              }
              ${Icon ? 'pl-10' : ''}
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''}
              ${className}
            `}
            {...props}
          />
          {/* Holographic border effect */}
          <div className="absolute inset-0 rounded-lg border border-cyber-neon/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
        {error && (
          <p className="text-red-400 text-sm font-sans animate-pulse">{error}</p>
        )}
      </div>
    );
  }
);

CyberInput.displayName = 'CyberInput';

export default CyberInput;
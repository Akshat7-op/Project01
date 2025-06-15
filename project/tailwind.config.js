/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          blue: '#00d4ff',
          pink: '#ff0080',
          purple: '#8b00ff',
          magenta: '#ff00ff',
          green: '#00ff88',
          orange: '#ff6600',
          dark: '#0a0a0f',
          darker: '#05050a',
          gray: '#1a1a2e',
          street: '#1e0a2e',
          neon: '#00ffff',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 2s linear infinite',
        'matrix': 'matrix 20s linear infinite',
        'flicker': 'flicker 3s linear infinite',
        'hologram': 'hologram 4s ease-in-out infinite',
        'glitch': 'glitch 2s infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
      keyframes: {
        'neon-pulse': {
          '0%': { 
            textShadow: '0 0 5px #00d4ff, 0 0 10px #00d4ff, 0 0 15px #00d4ff, 0 0 20px #00d4ff',
            boxShadow: '0 0 5px #00d4ff, 0 0 10px #00d4ff, 0 0 15px #00d4ff'
          },
          '100%': { 
            textShadow: '0 0 2px #00d4ff, 0 0 5px #00d4ff, 0 0 8px #00d4ff, 0 0 12px #00d4ff',
            boxShadow: '0 0 2px #00d4ff, 0 0 5px #00d4ff, 0 0 8px #00d4ff'
          }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'glow': {
          '0%': { boxShadow: '0 0 5px #ff0080, 0 0 10px #ff0080, 0 0 15px #ff0080' },
          '100%': { boxShadow: '0 0 2px #ff0080, 0 0 5px #ff0080, 0 0 8px #ff0080' }
        },
        'scan': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' }
        },
        'matrix': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        'flicker': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
          '25%, 75%': { opacity: 0.9 }
        },
        'hologram': {
          '0%, 100%': { 
            transform: 'translateY(0px)',
            filter: 'hue-rotate(0deg)'
          },
          '50%': { 
            transform: 'translateY(-10px)',
            filter: 'hue-rotate(90deg)'
          }
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)',
        'neon-gradient': 'linear-gradient(45deg, #00d4ff, #ff0080, #8b00ff)',
        'street-gradient': 'linear-gradient(180deg, #0a0a0f 0%, #1e0a2e 50%, #0a0a0f 100%)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
};
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, LogIn } from 'lucide-react';
import CyberButton from '../components/CyberButton';
import CyberCard from '../components/CyberCard';
import CyberInput from '../components/CyberInput';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full animate-scale-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-cyber-blue to-cyber-pink bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-300 font-sans">
            Sign in to access your CyberCards account
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={User}
              placeholder="Enter your username"
              required
            />

            <CyberInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              placeholder="Enter your password"
              required
            />

            <CyberButton
              type="submit"
              loading={loading}
              icon={LogIn}
              className="w-full"
              size="lg"
            >
              <span className="font-display font-semibold">
                {loading ? 'SIGNING IN...' : 'SIGN IN'}
              </span>
            </CyberButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300 font-sans">
              Don't have an account?{' '}
              <Link to="/register" className="text-cyber-blue hover:text-cyber-pink transition-colors duration-300 font-medium">
                Create one here
              </Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-cyber-gray/20 rounded-lg border border-cyber-blue/20">
            <p className="text-sm text-gray-400 mb-2 font-display font-medium">Demo Credentials:</p>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 font-sans">Admin: <span className="text-cyber-neon">admin</span> / <span className="text-cyber-neon">admin123</span></p>
              <p className="text-xs text-gray-500 font-sans">User: <span className="text-cyber-neon">demo</span> / <span className="text-cyber-neon">demo123</span></p>
            </div>
          </div>
        </CyberCard>
      </div>
    </div>
  );
};

export default Login;
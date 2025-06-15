import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Clock, CheckCircle, XCircle, Eye, Plus } from 'lucide-react';
import CyberButton from '../components/CyberButton';
import CyberCard from '../components/CyberCard';
import LoadingSpinner from '../components/LoadingSpinner';

interface Submission {
  id: string;
  cardType: string;
  cardValue: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  adminNotes?: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchSubmissions();
  }, [user, navigate]);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/cards/user-submissions', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500 bg-yellow-500/20 border-yellow-500/50';
      case 'approved':
        return 'text-green-500 bg-green-500/20 border-green-500/50';
      case 'rejected':
        return 'text-red-500 bg-red-500/20 border-red-500/50';
      default:
        return 'text-gray-500 bg-gray-500/20 border-gray-500/50';
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading your dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-cyber font-bold bg-gradient-to-r from-cyber-blue to-cyber-pink bg-clip-text text-transparent mb-4">
            Cyber Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            Welcome back, {user.username}! Monitor your gift card submissions.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <CyberCard className="text-center">
            <div className="text-2xl font-bold text-cyber-blue mb-2">
              {submissions.length}
            </div>
            <div className="text-gray-300">Total Submissions</div>
          </CyberCard>
          
          <CyberCard className="text-center">
            <div className="text-2xl font-bold text-yellow-500 mb-2">
              {submissions.filter(s => s.status === 'pending').length}
            </div>
            <div className="text-gray-300">Pending Review</div>
          </CyberCard>
          
          <CyberCard className="text-center">
            <div className="text-2xl font-bold text-green-500 mb-2">
              {submissions.filter(s => s.status === 'approved').length}
            </div>
            <div className="text-gray-300">Approved</div>
          </CyberCard>
          
          <CyberCard className="text-center">
            <div className="text-2xl font-bold text-red-500 mb-2">
              {submissions.filter(s => s.status === 'rejected').length}
            </div>
            <div className="text-gray-300">Rejected</div>
          </CyberCard>
        </div>

        {/* Actions */}
        <div className="mb-8 flex justify-center">
          <CyberButton
            onClick={() => navigate('/sell')}
            icon={Plus}
            size="lg"
          >
            Sell Another Card
          </CyberButton>
        </div>

        {/* Submissions List */}
        <CyberCard>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-cyber font-bold text-white">
              Your Submissions
            </h2>
          </div>

          {submissions.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-300 text-lg mb-4">No submissions yet</p>
              <CyberButton
                onClick={() => navigate('/sell')}
                icon={Plus}
              >
                Submit Your First Card
              </CyberButton>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="bg-cyber-gray/20 border border-cyber-blue/20 rounded-lg p-4 hover:border-cyber-blue/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyber-blue/20 to-cyber-pink/20 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-cyber-blue" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {submission.cardType} - {submission.cardValue}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Submitted on {new Date(submission.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(submission.status)}`}>
                        {getStatusIcon(submission.status)}
                        <span className="text-sm font-medium capitalize">
                          {submission.status}
                        </span>
                      </div>
                      
                      <CyberButton
                        variant="secondary"
                        size="sm"
                        icon={Eye}
                        onClick={() => setSelectedSubmission(submission)}
                      >
                        View
                      </CyberButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CyberCard>

        {/* Submission Details Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <CyberCard className="max-w-md w-full" glow>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-cyber font-bold text-white">
                  Submission Details
                </h3>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Card Type</label>
                  <p className="text-white font-semibold">{selectedSubmission.cardType}</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400">Card Value</label>
                  <p className="text-white font-semibold">{selectedSubmission.cardValue}</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400">Status</label>
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(selectedSubmission.status)} mt-1`}>
                    {getStatusIcon(selectedSubmission.status)}
                    <span className="text-sm font-medium capitalize">
                      {selectedSubmission.status}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400">Submitted</label>
                  <p className="text-white">
                    {new Date(selectedSubmission.submittedAt).toLocaleString()}
                  </p>
                </div>
                
                {selectedSubmission.reviewedAt && (
                  <div>
                    <label className="text-sm text-gray-400">Reviewed</label>
                    <p className="text-white">
                      {new Date(selectedSubmission.reviewedAt).toLocaleString()}
                    </p>
                  </div>
                )}
                
                {selectedSubmission.adminNotes && (
                  <div>
                    <label className="text-sm text-gray-400">Admin Notes</label>
                    <p className="text-white bg-cyber-gray/30 p-3 rounded-lg mt-1">
                      {selectedSubmission.adminNotes}
                    </p>
                  </div>
                )}
              </div>
            </CyberCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
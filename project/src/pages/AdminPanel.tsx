import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, CreditCard, Eye, Check, X, Filter, Search, Download } from 'lucide-react';
import CyberButton from '../components/CyberButton';
import CyberCard from '../components/CyberCard';
import CyberInput from '../components/CyberInput';
import LoadingSpinner from '../components/LoadingSpinner';

interface AdminSubmission {
  id: string;
  userId: string;
  username: string;
  email: string;
  cardType: string;
  cardCode: string;
  cardValue: string;
  expiryDate?: string;
  description?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  adminNotes?: string;
  imageUrl?: string;
}

interface AdminStats {
  totalUsers: number;
  totalSubmissions: number;
  pendingSubmissions: number;
  approvedSubmissions: number;
  rejectedSubmissions: number;
}

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [submissions, setSubmissions] = useState<AdminSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<AdminSubmission[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<AdminSubmission | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
      return;
    }
    fetchAdminData();
  }, [user, navigate]);

  useEffect(() => {
    filterSubmissions();
  }, [submissions, filterStatus, searchTerm]);

  const fetchAdminData = async () => {
    try {
      const [submissionsResponse, statsResponse] = await Promise.all([
        fetch('/api/admin/submissions', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }),
        fetch('/api/admin/stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }),
      ]);

      if (submissionsResponse.ok && statsResponse.ok) {
        const submissionsData = await submissionsResponse.json();
        const statsData = await statsResponse.json();
        
        setSubmissions(submissionsData);
        setStats(statsData);
      }
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSubmissions = () => {
    let filtered = submissions;

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(s => s.status === filterStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.cardType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.cardCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSubmissions(filtered);
  };

  const handleReviewSubmission = async (submissionId: string, status: 'approved' | 'rejected') => {
    try {
      const response = await fetch('/api/admin/review-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          submissionId,
          status,
          adminNotes: reviewNotes,
        }),
      });

      if (response.ok) {
        // Refresh data
        fetchAdminData();
        setSelectedSubmission(null);
        setReviewNotes('');
      }
    } catch (error) {
      console.error('Failed to review submission:', error);
    }
  };

  const exportData = () => {
    const csvContent = [
      ['ID', 'Username', 'Email', 'Card Type', 'Card Value', 'Status', 'Submitted', 'Reviewed'].join(','),
      ...filteredSubmissions.map(s => [
        s.id,
        s.username,
        s.email,
        s.cardType,
        s.cardValue,
        s.status,
        new Date(s.submittedAt).toLocaleDateString(),
        s.reviewedAt ? new Date(s.reviewedAt).toLocaleDateString() : 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gift-card-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!user || !user.isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading admin panel..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-cyber-blue" />
            <h1 className="text-3xl md:text-4xl font-cyber font-bold bg-gradient-to-r from-cyber-blue to-cyber-pink bg-clip-text text-transparent">
              Admin Control Panel
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Manage gift card submissions and monitor platform activity
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <CyberCard className="text-center">
              <Users className="w-8 h-8 text-cyber-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-cyber-blue mb-1">
                {stats.totalUsers}
              </div>
              <div className="text-gray-300 text-sm">Total Users</div>
            </CyberCard>
            
            <CyberCard className="text-center">
              <CreditCard className="w-8 h-8 text-cyber-pink mx-auto mb-2" />
              <div className="text-2xl font-bold text-cyber-pink mb-1">
                {stats.totalSubmissions}
              </div>
              <div className="text-gray-300 text-sm">Total Submissions</div>
            </CyberCard>
            
            <CyberCard className="text-center">
              <div className="text-2xl font-bold text-yellow-500 mb-1">
                {stats.pendingSubmissions}
              </div>
              <div className="text-gray-300 text-sm">Pending Review</div>
            </CyberCard>
            
            <CyberCard className="text-center">
              <div className="text-2xl font-bold text-green-500 mb-1">
                {stats.approvedSubmissions}
              </div>
              <div className="text-gray-300 text-sm">Approved</div>
            </CyberCard>
            
            <CyberCard className="text-center">
              <div className="text-2xl font-bold text-red-500 mb-1">
                {stats.rejectedSubmissions}
              </div>
              <div className="text-gray-300 text-sm">Rejected</div>
            </CyberCard>
          </div>
        )}

        {/* Filters and Search */}
        <CyberCard className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-cyber-blue" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 bg-cyber-gray/30 border border-cyber-blue/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-cyber-blue focus:ring-cyber-blue/50"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <CyberInput
                type="text"
                placeholder="Search users, emails, or card types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={Search}
                className="w-full md:w-80"
              />
            </div>
            
            <CyberButton
              onClick={exportData}
              icon={Download}
              variant="secondary"
            >
              Export CSV
            </CyberButton>
          </div>
        </CyberCard>

        {/* Submissions Table */}
        <CyberCard>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-cyber font-bold text-white">
              Gift Card Submissions ({filteredSubmissions.length})
            </h2>
          </div>

          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-300 text-lg">No submissions found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-cyber-blue/20">
                    <th className="pb-3 text-gray-300 font-semibold">User</th>
                    <th className="pb-3 text-gray-300 font-semibold">Card Details</th>
                    <th className="pb-3 text-gray-300 font-semibold">Status</th>
                    <th className="pb-3 text-gray-300 font-semibold">Submitted</th>
                    <th className="pb-3 text-gray-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyber-blue/10">
                  {filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-cyber-blue/5 transition-colors duration-200">
                      <td className="py-4">
                        <div>
                          <div className="font-semibold text-white">{submission.username}</div>
                          <div className="text-sm text-gray-400">{submission.email}</div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div>
                          <div className="font-semibold text-white">{submission.cardType}</div>
                          <div className="text-sm text-gray-400">{submission.cardValue}</div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          submission.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' :
                          submission.status === 'approved' ? 'bg-green-500/20 text-green-500 border border-green-500/50' :
                          'bg-red-500/20 text-red-500 border border-red-500/50'
                        }`}>
                          {submission.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 text-gray-400">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        <CyberButton
                          size="sm"
                          variant="secondary"
                          icon={Eye}
                          onClick={() => setSelectedSubmission(submission)}
                        >
                          Review
                        </CyberButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CyberCard>

        {/* Review Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-cyber-dark/95 border border-cyber-blue/50 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-cyber font-bold text-white">
                  Review Submission
                </h3>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">User Information</label>
                    <div className="bg-cyber-gray/20 p-3 rounded-lg mt-1">
                      <p className="text-white font-semibold">{selectedSubmission.username}</p>
                      <p className="text-gray-400 text-sm">{selectedSubmission.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-400">Card Details</label>
                    <div className="bg-cyber-gray/20 p-3 rounded-lg mt-1">
                      <p className="text-white font-semibold">{selectedSubmission.cardType}</p>
                      <p className="text-gray-400">{selectedSubmission.cardValue}</p>
                      {selectedSubmission.expiryDate && (
                        <p className="text-gray-400 text-sm">Expires: {selectedSubmission.expiryDate}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-400">Gift Card Code</label>
                    <div className="bg-cyber-gray/20 p-3 rounded-lg mt-1 font-mono">
                      <p className="text-white break-all">{selectedSubmission.cardCode}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Current Status</label>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${
                      selectedSubmission.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' :
                      selectedSubmission.status === 'approved' ? 'bg-green-500/20 text-green-500 border border-green-500/50' :
                      'bg-red-500/20 text-red-500 border border-red-500/50'
                    }`}>
                      {selectedSubmission.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-400">Submitted</label>
                    <p className="text-white mt-1">
                      {new Date(selectedSubmission.submittedAt).toLocaleString()}
                    </p>
                  </div>
                  
                  {selectedSubmission.description && (
                    <div>
                      <label className="text-sm text-gray-400">User Notes</label>
                      <div className="bg-cyber-gray/20 p-3 rounded-lg mt-1">
                        <p className="text-white text-sm">{selectedSubmission.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {selectedSubmission.status === 'pending' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Admin Notes (Optional)</label>
                    <textarea
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder="Add notes for the user..."
                      rows={3}
                      className="w-full px-3 py-2 bg-cyber-gray/30 border border-cyber-blue/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-cyber-blue focus:ring-cyber-blue/50 resize-none"
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <CyberButton
                      onClick={() => handleReviewSubmission(selectedSubmission.id, 'approved')}
                      variant="success"
                      icon={Check}
                      className="flex-1"
                    >
                      Approve
                    </CyberButton>
                    <CyberButton
                      onClick={() => handleReviewSubmission(selectedSubmission.id, 'rejected')}
                      variant="danger"
                      icon={X}
                      className="flex-1"
                    >
                      Reject
                    </CyberButton>
                  </div>
                </div>
              )}
              
              {selectedSubmission.adminNotes && (
                <div className="mt-4">
                  <label className="text-sm text-gray-400">Previous Admin Notes</label>
                  <div className="bg-cyber-gray/20 p-3 rounded-lg mt-1">
                    <p className="text-white text-sm">{selectedSubmission.adminNotes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
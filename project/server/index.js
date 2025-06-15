import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'cyber-cards-secret-key-2024';

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and GIF files are allowed'));
    }
  }
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// In-memory data store (replace with actual database in production)
let users = [
  {
    id: 'admin-1',
    username: 'admin',
    email: 'admin@cybercards.com',
    password: bcrypt.hashSync('admin123', 10),
    isAdmin: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-1',
    username: 'demo',
    email: 'demo@example.com',
    password: bcrypt.hashSync('demo123', 10),
    isAdmin: false,
    createdAt: new Date().toISOString()
  }
];

let submissions = [];

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Middleware to check admin privileges
const requireAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(u => u.username === username || u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      isAdmin: false,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, isAdmin: newUser.isAdmin },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Gift Card Routes
app.post('/api/cards/submit', authenticateToken, upload.single('cardImage'), async (req, res) => {
  try {
    const { cardType, cardCode, cardValue, expiryDate, description } = req.body;
    const userId = req.user.id;

    const submission = {
      id: uuidv4(),
      userId,
      username: req.user.username,
      email: users.find(u => u.id === userId)?.email,
      cardType,
      cardCode,
      cardValue,
      expiryDate: expiryDate || null,
      description: description || null,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      adminNotes: null
    };

    submissions.push(submission);

    // TODO: Send email notification to admin
    console.log('New gift card submission:', submission.id);

    res.status(201).json({ message: 'Gift card submitted successfully', submissionId: submission.id });
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ message: 'Failed to submit gift card' });
  }
});

app.get('/api/cards/user-submissions', authenticateToken, (req, res) => {
  const userSubmissions = submissions
    .filter(s => s.userId === req.user.id)
    .map(s => ({
      id: s.id,
      cardType: s.cardType,
      cardValue: s.cardValue,
      status: s.status,
      submittedAt: s.submittedAt,
      reviewedAt: s.reviewedAt,
      adminNotes: s.adminNotes
    }));

  res.json(userSubmissions);
});

// Admin Routes
app.get('/api/admin/submissions', authenticateToken, requireAdmin, (req, res) => {
  res.json(submissions);
});

app.get('/api/admin/stats', authenticateToken, requireAdmin, (req, res) => {
  const stats = {
    totalUsers: users.length,
    totalSubmissions: submissions.length,
    pendingSubmissions: submissions.filter(s => s.status === 'pending').length,
    approvedSubmissions: submissions.filter(s => s.status === 'approved').length,
    rejectedSubmissions: submissions.filter(s => s.status === 'rejected').length
  };

  res.json(stats);
});

app.post('/api/admin/review-submission', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { submissionId, status, adminNotes } = req.body;

    const submissionIndex = submissions.findIndex(s => s.id === submissionId);
    if (submissionIndex === -1) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    submissions[submissionIndex] = {
      ...submissions[submissionIndex],
      status,
      adminNotes: adminNotes || null,
      reviewedAt: new Date().toISOString()
    };

    // TODO: Send email notification to user
    console.log(`Submission ${submissionId} ${status} by admin`);

    res.json({ message: 'Submission reviewed successfully' });
  } catch (error) {
    console.error('Review error:', error);
    res.status(500).json({ message: 'Failed to review submission' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CyberCards server running on port ${PORT}`);
  console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
  console.log(`🔐 Demo credentials:`);
  console.log(`   Admin: admin / admin123`);
  console.log(`   User: demo / demo123`);
});

export default app;
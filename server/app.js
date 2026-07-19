const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const { securityHeaders, blockSensitiveRoutes, validateSecrets } = require('./middleware/security');

const authRoutes = require('./routes/auth');
const crowdRoutes = require('./routes/crowd');
const navigationRoutes = require('./routes/navigation');
const aiRoutes = require('./routes/ai');
const reportRoutes = require('./routes/reports');
const announcementRoutes = require('./routes/announcements');
const volunteerRoutes = require('./routes/volunteers');
const emergencyRoutes = require('./routes/emergency');

const app = express();

// --- Security First ---
app.disable('x-powered-by');           // Hide Express fingerprint
app.use(securityHeaders);              // Add security headers to every response
app.use(blockSensitiveRoutes);         // Block attempts to extract API keys

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/crowd', crowdRoutes);
app.use('/api/navigation', navigationRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/emergency', emergencyRoutes);

// Health check — never exposes sensitive info
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    ai_enabled: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

// Validate secrets on startup
validateSecrets();

module.exports = app;


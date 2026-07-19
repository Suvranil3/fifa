/**
 * Security Middleware
 * Prevents API key leakage and adds security headers
 */

// Mask sensitive values for logging (show only last 4 chars)
function maskApiKey(key) {
  if (!key || key.length < 8) return '****';
  return '*'.repeat(key.length - 4) + key.slice(-4);
}

// Security headers middleware
function securityHeaders(req, res, next) {
  // Prevent browsers from sniffing MIME types
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  // Enable XSS filter in browsers
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Don't send referrer for cross-origin requests
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Remove Express fingerprint header
  res.removeHeader('X-Powered-By');
  next();
}

// Block any request that tries to access environment variables or config
function blockSensitiveRoutes(req, res, next) {
  const blockedPatterns = [
    /\.env/i,
    /config/i,
    /api[_-]?key/i,
    /secret/i,
    /password/i,
    /credential/i,
  ];

  const fullUrl = req.originalUrl || req.url;

  // Only block if these appear as query params or path params trying to extract secrets
  const queryString = JSON.stringify(req.query).toLowerCase();
  const bodyString = JSON.stringify(req.body || {}).toLowerCase();

  // Check if anyone is trying to extract API keys via request body
  if (bodyString.includes('gemini_api_key') || 
      bodyString.includes('jwt_secret') || 
      bodyString.includes('db_password') ||
      bodyString.includes('process.env')) {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied: Attempting to access restricted information' 
    });
  }

  next();
}

// Sanitize error messages to prevent key leakage in error responses
function sanitizeErrorOutput(error) {
  let message = error.message || 'Internal server error';
  
  // Replace any accidentally leaked API keys in error messages
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && message.includes(apiKey)) {
    message = message.replace(new RegExp(apiKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '[REDACTED]');
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (jwtSecret && message.includes(jwtSecret)) {
    message = message.replace(new RegExp(jwtSecret.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '[REDACTED]');
  }

  const dbPassword = process.env.DB_PASSWORD;
  if (dbPassword && message.includes(dbPassword)) {
    message = message.replace(new RegExp(dbPassword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '[REDACTED]');
  }

  return message;
}

// Validate that required secrets exist on startup
function validateSecrets() {
  const warnings = [];

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your_jwt_secret_key_here') {
    warnings.push('⚠️  JWT_SECRET is not set or using default — authentication is insecure!');
  }

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    warnings.push('ℹ️  GEMINI_API_KEY is not set — AI features will use mock fallback responses');
  } else {
    console.log(`✅ Gemini API Key loaded: ${maskApiKey(process.env.GEMINI_API_KEY)}`);
  }

  if (!process.env.DB_PASSWORD || process.env.DB_PASSWORD === 'your_password') {
    warnings.push('ℹ️  DB_PASSWORD is not configured — using mock data mode');
  }

  warnings.forEach(w => console.warn(w));
  return warnings.length === 0;
}

module.exports = {
  maskApiKey,
  securityHeaders,
  blockSensitiveRoutes,
  sanitizeErrorOutput,
  validateSecrets
};

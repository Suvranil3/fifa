/**
 * Global Error Handler Middleware
 * Sanitizes error output to prevent API key or secret leakage in responses.
 */
const { sanitizeErrorOutput } = require('./security');

const errorHandler = (err, req, res, next) => {
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    console.error(err.stack);
  }

  const statusCode = err.statusCode || 500;
  
  // Sanitize the error message — strip any accidentally leaked secrets
  const message = sanitizeErrorOutput(err);

  const response = {
    success: false,
    message,
  };

  // In dev mode, include stack trace but also sanitize it
  if (isDev && err.stack) {
    let sanitizedStack = err.stack;
    // Remove any API key or secret that might appear in stack traces
    const secrets = [
      process.env.GEMINI_API_KEY,
      process.env.JWT_SECRET,
      process.env.DB_PASSWORD
    ].filter(Boolean);

    secrets.forEach(secret => {
      if (secret && sanitizedStack.includes(secret)) {
        sanitizedStack = sanitizedStack.replace(
          new RegExp(secret.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), 
          '[REDACTED]'
        );
      }
    });

    response.stack = sanitizedStack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;

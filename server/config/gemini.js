/**
 * Gemini AI Configuration
 * API key is loaded from environment variables ONLY — never hardcoded.
 * Key is masked in all log output to prevent leakage.
 */
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { maskApiKey } = require('../middleware/security');

let genAI = null;

if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  // Log only the masked version — NEVER the full key
  console.log(`🤖 Gemini AI initialized (key: ${maskApiKey(process.env.GEMINI_API_KEY)})`);
} else {
  console.warn('⚠️  GEMINI_API_KEY not set — AI features will use fallback mock responses');
}

/**
 * Get the Gemini generative model instance.
 * Returns null if API key is not configured (triggers mock fallbacks).
 */
const getModel = () => {
  if (!genAI) return null;
  return genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
};

module.exports = { getModel };

const { getModel } = require('../config/gemini');
const prompts = require('../utils/prompts');

class GeminiService {
  async generateResponse(prompt) {
    try {
      const model = getModel();
      if (!model) throw new Error('Gemini model not initialized');
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      try {
        // Try to parse JSON, removing markdown code fences if present
        if (text.includes('\`\`\`')) {
          text = text.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
        }
        return JSON.parse(text);
      } catch (e) {
        return text;
      }
    } catch (error) {
      console.error('Gemini API Error:', error.message);
      return null;
    }
  }

  async chat(userMessage, history, stadiumContext) {
    const prompt = prompts.chatAssistant(userMessage, stadiumContext);
    const response = await this.generateResponse(prompt);
    
    if (!response) {
      return "Welcome to MetLife Stadium! How can I help you today? I can help with navigation, food, accessibility, and more.";
    }
    return response;
  }

  async predictCrowd(gateData) {
    const prompt = prompts.crowdPrediction(gateData, []);
    const response = await this.generateResponse(prompt);
    
    if (!response) {
      return {
        predictions: gateData.map(g => ({
          gate: g.gate_name,
          current: g.crowd,
          predicted_30min: Math.round(g.crowd * 1.1),
          predicted_60min: Math.round(g.crowd * 1.2)
        })),
        actions: ["Monitor gates closely", "Prepare additional staff"]
      };
    }
    return response;
  }

  async generateAnnouncement(context, language, category) {
    const prompt = prompts.announcementGeneration(context, language, category);
    const response = await this.generateResponse(prompt);
    
    if (!response) {
      return {
        title: 'Stadium Update',
        content: context,
        language: language
      };
    }
    return response;
  }

  async translate(text, targetLanguage) {
    const prompt = prompts.translation(text, targetLanguage);
    const response = await this.generateResponse(prompt);
    
    if (!response) {
      return `[Translation unavailable] ${text}`;
    }
    return response;
  }

  async summarizeIncidents(incidents) {
    const prompt = prompts.incidentSummary(incidents);
    const response = await this.generateResponse(prompt);
    
    if (!response) {
      return {
        overall_severity: "medium",
        summary: "Multiple incidents reported across the stadium.",
        recommended_actions: ["Dispatch security", "Notify medical staff"]
      };
    }
    return response;
  }

  async getAccessibilityHelp(needs, destination) {
    const prompt = prompts.accessibilityGuidance(needs, destination);
    const response = await this.generateResponse(prompt);
    return response || "Please ask staff for assistance with accessibility routes.";
  }

  async getTransportAdvice(location, destination) {
    const prompt = prompts.transportRecommendation(location, destination, new Date().toISOString());
    const response = await this.generateResponse(prompt);
    return response || "Please check the stadium app or screens for transport updates.";
  }

  async getVolunteerSuggestions(crowdData, incidents, volunteers) {
    const prompt = prompts.volunteerDeployment(crowdData, incidents, volunteers);
    const response = await this.generateResponse(prompt);
    
    if (!response) {
      return {
        redeployments: []
      };
    }
    return response;
  }

  async generateReport(data) {
    const prompt = prompts.operationalReport(data);
    const response = await this.generateResponse(prompt);
    
    if (!response) {
      return {
        title: "Operational Report",
        metrics: data,
        analysis: "Report generated with fallback data.",
        recommendations: []
      };
    }
    return response;
  }

  async getSustainabilityInsights(data) {
    const prompt = prompts.sustainabilityInsights(data.waste, data.water, data.crowd);
    const response = await this.generateResponse(prompt);
    
    if (!response) {
      return {
        analysis: "Sustainability data unavailable.",
        efficiency_score: 75,
        recommendations: ["Increase recycling bins"]
      };
    }
    return response;
  }
}

module.exports = new GeminiService();

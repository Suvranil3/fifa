import api from './api';

// Mock fallback logic for now since backend might not be up
export const sendChatMessage = async (message, history) => {
  try {
    const res = await api.post('/ai/chat', { message, history });
    return res.data.content;
  } catch (error) {
    // Mock responses based on keywords
    const msg = message.toLowerCase();
    if (msg.includes('food') || msg.includes('eat') || msg.includes('hungry')) {
      return "There are several food options nearby. The closest is the **Brazilian BBQ Grill** at the North concourse, and **Mediterranean Delights** which has vegetarian options. Would you like me to show them on the map?";
    }
    if (msg.includes('gate') || msg.includes('enter')) {
      return "Your assigned gate based on your ticket is **Gate B3** on the East side. The current wait time there is approximately 5 minutes. It is wheelchair accessible.";
    }
    if (msg.includes('washroom') || msg.includes('toilet') || msg.includes('restroom')) {
      return "The nearest washroom is located in section **124**, just behind you to the left. There is also a family/accessible washroom in section **126**.";
    }
    if (msg.includes('transport') || msg.includes('metro') || msg.includes('train')) {
      return "The **Meadowlands Station (Metro)** is currently operating with trains every 10 minutes. The walk to the station is about 5 minutes from Gate A. Wait times are currently low.";
    }
    
    // Generic fallback
    return "I can certainly help you with that! As your StadiumAI assistant, I'm here to ensure you have a great experience at the 2026 FIFA World Cup. Is there anything specific you need directions to?";
  }
};

export const translateText = async (text, language) => {
  try {
    const res = await api.post('/ai/translate', { text, language });
    return res.data.translatedText;
  } catch (error) {
    return text; // Mock: return original
  }
};

export const getCrowdPrediction = async () => {
  try {
    const res = await api.post('/ai/crowd-predict');
    return res.data;
  } catch (error) {
    return { predicted: 'medium', confidence: 0.85 };
  }
};

export const getAccessibilityGuide = async (needs, destination) => {
  try {
    const res = await api.post('/ai/accessibility', { needs, destination });
    return res.data.guide;
  } catch (error) {
    return "Please proceed to the nearest elevator located at section 120. Staff are available to assist you.";
  }
};

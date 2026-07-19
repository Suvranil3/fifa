import { useState } from 'react';
import { sendChatMessage } from '../services/aiService';

export function useChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! 👋 I\'m your StadiumAI assistant for FIFA World Cup 2026 at MetLife Stadium. I can help you with:\n\n🗺️ **Navigation** - Find gates, seats, facilities\n🍔 **Food & Drinks** - Find restaurants and stalls\n♿ **Accessibility** - Wheelchair routes, assistance\n🚇 **Transport** - Metro, buses, parking\n🆘 **Emergency** - Medical help, security\n📦 **Lost & Found** - Report or find items\n🌐 **Languages** - I speak multiple languages!\n\nHow can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const responseContent = await sendChatMessage(text, messages);
      const assistantMessage = { id: Date.now() + 1, role: 'assistant', content: responseContent, timestamp: new Date() };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = { id: Date.now() + 1, role: 'assistant', content: 'Sorry, I am having trouble connecting right now. Please try again later.', timestamp: new Date() };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      role: 'assistant',
      content: 'Hello! 👋 I\'m your StadiumAI assistant for FIFA World Cup 2026 at MetLife Stadium. I can help you with:\n\n🗺️ **Navigation** - Find gates, seats, facilities\n🍔 **Food & Drinks** - Find restaurants and stalls\n♿ **Accessibility** - Wheelchair routes, assistance\n🚇 **Transport** - Metro, buses, parking\n🆘 **Emergency** - Medical help, security\n📦 **Lost & Found** - Report or find items\n🌐 **Languages** - I speak multiple languages!\n\nHow can I help you today?',
      timestamp: new Date()
    }]);
  };

  return { messages, isTyping, sendMessage, clearChat };
}

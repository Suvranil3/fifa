import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Globe, Mic, Cpu, ArrowUp, RefreshCw } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { QUICK_CHAT_QUESTIONS } from '../../utils/constants';

const ChatAssistant = () => {
  const { messages, isTyping, sendMessage, clearChat } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  const handleQuickQuestion = (q) => {
    if (isTyping) return;
    sendMessage(q);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Mock voice input
      setTimeout(() => {
        setInputValue("where is the nearest washroom?");
        setIsRecording(false);
      }, 2500);
    }
  };

  const renderMarkdown = (text) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      let formattedLine = line;
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(formattedLine)) !== null) {
        parts.push(formattedLine.slice(lastIndex, match.index));
        parts.push(<strong key={match.index} className="font-semibold text-white">{match[1]}</strong>);
        lastIndex = match.index + match[0].length;
      }
      parts.push(formattedLine.slice(lastIndex));

      return (
        <span key={i} className="block mb-1 last:mb-0">
          {parts}
        </span>
      );
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-transparent relative font-readex p-4 md:p-6 lg:p-8 max-w-5xl mx-auto z-10 select-none">
      
      {/* Immersive Chat Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="flex-1 flex flex-col glass-premium rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-black/20">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-accent-gold to-yellow-500 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <Cpu size={22} className="text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-white tracking-wide text-sm md:text-base">stadium.ai assistant</h2>
              <p className="text-[10px] text-success flex items-center gap-1.5 mt-0.5 font-light">
                <span className="h-2 w-2 rounded-full bg-success animate-ping"></span>
                <span>online & active</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={clearChat}
              title="Clear Conversation"
              className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors border border-white/5"
            >
              <RefreshCw size={14} />
            </button>
            <button className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors border border-white/5">
              <Globe size={14} />
            </button>
          </div>
        </div>

        {/* Message Feed area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="h-9 w-9 rounded-full bg-gradient-gold flex items-center justify-center shadow-md mr-3 shrink-0 mt-0.5 border border-white/10 select-none">
                    ⚽
                  </div>
                )}
                
                <div className={`max-w-[80%] lg:max-w-[70%] px-5 py-4 shadow-xl border ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-accent-gold to-yellow-500 text-primary border-accent-gold/20 rounded-2xl rounded-tr-sm font-medium shadow-[0_4px_15px_rgba(212,175,55,0.2)]' 
                    : 'glass-premium text-gray-200 rounded-2xl rounded-tl-sm border-white/5'
                }`}
                >
                  <div className="text-sm leading-relaxed lowercase font-light">
                    {msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content}
                  </div>
                  <div className={`text-[9px] mt-2.5 font-light ${msg.role === 'user' ? 'text-primary/70 text-right' : 'text-gray-500 text-left'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="h-9 w-9 rounded-full bg-gradient-gold flex items-center justify-center shadow-md mr-3 shrink-0 mt-0.5 border border-white/10">
                ⚽
              </div>
              <div className="glass-premium rounded-2xl rounded-tl-sm px-5 py-4 flex gap-1.5 items-center border border-white/5 shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2.5 h-2.5 rounded-full bg-accent-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2.5 h-2.5 rounded-full bg-accent-gold animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Panel */}
        <div className="p-4 border-t border-white/5 bg-black/30 backdrop-blur-md">
          {/* Quick Prompts Carousel */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide select-none">
            {QUICK_CHAT_QUESTIONS.map((q, idx) => (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                key={idx}
                onClick={() => handleQuickQuestion(q)}
                className="whitespace-nowrap glass-premium px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:border-accent-gold/40 transition-all rounded-full shrink-0 border border-white/5 font-light lowercase"
              >
                {q}
              </motion.button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
            {/* Voice helper button */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={toggleRecording}
              className={`p-3 rounded-2xl border transition-all duration-300 ${
                isRecording 
                  ? 'bg-accent-crimson border-accent-crimson text-white shadow-[0_0_20px_rgba(196,30,58,0.5)]' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Mic size={18} />
            </motion.button>

            {/* Input fields */}
            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isRecording ? "listening..." : "ask telemetry, navigation, details..."}
                className="input-dark w-full pr-14 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:border-accent-gold/50 transition-all text-sm font-light placeholder-gray-500 lowercase"
                disabled={isTyping || isRecording}
              />
              
              {/* Send action */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputValue.trim() || isTyping || isRecording}
                  className="p-2.5 rounded-xl bg-accent-gold text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                >
                  <ArrowUp size={16} />
                </motion.button>
              </div>
            </div>
          </form>

          {/* Animated voice recording mockup */}
          <AnimatePresence>
            {isRecording && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 24 }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-center gap-1 mt-3"
              >
                <span className="text-[10px] text-accent-crimson uppercase tracking-widest font-bold mr-2">voice streaming</span>
                {[0.2, 0.4, 0.6, 0.3, 0.7, 0.5, 0.2].map((val, i) => (
                  <motion.span 
                    key={i} 
                    animate={{ scaleY: [1, 2.5, 1] }} 
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.08 }} 
                    className="w-0.5 h-3 bg-accent-crimson rounded-full origin-center" 
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
};

export default ChatAssistant;

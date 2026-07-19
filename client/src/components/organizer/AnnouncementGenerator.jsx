import React, { useState } from 'react';
import { FiSend, FiZap } from 'react-icons/fi';

const AnnouncementGenerator = () => {
  const [formData, setFormData] = useState({
    category: 'general',
    context: '',
    audience: 'all',
    priority: 'low',
    languages: { english: true, spanish: false, french: false, arabic: false, portuguese: false }
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [activeTab, setActiveTab] = useState('english');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  const handleLangToggle = (lang) => {
    setFormData(prev => ({
      ...prev,
      languages: { ...prev.languages, [lang]: !prev.languages[lang] }
    }));
  };

  const handleGenerate = () => {
    if (!formData.context) return;
    setIsGenerating(true);
    
    setTimeout(() => {
      setGenerated({
        title: formData.category === 'emergency' ? 'EMERGENCY ALERT' : 'Important Announcement',
        content: {
          english: `Attention ${formData.audience}: ${formData.context}. Thank you for your cooperation.`,
          spanish: `Atención ${formData.audience}: ${formData.context} (Spanish translation). Gracias por su cooperación.`,
          french: `Attention ${formData.audience}: ${formData.context} (French translation). Merci de votre coopération.`,
        },
        priority: formData.priority,
        category: formData.category
      });
      setIsGenerating(false);
      setActiveTab('english');
    }, 2000);
  };

  const handleBroadcast = () => {
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      setBroadcastSuccess(true);
      setTimeout(() => setBroadcastSuccess(false), 3000);
    }, 1500);
  };

  const getPriorityColor = (p) => {
    switch(p) {
      case 'low': return 'text-gray-400 border-gray-400';
      case 'medium': return 'text-[#1e90ff] border-[#1e90ff]';
      case 'high': return 'text-[#f59e0b] border-[#f59e0b]';
      case 'critical': return 'text-[#ef4444] border-[#ef4444] animate-pulse';
      default: return 'text-white border-white';
    }
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-white text-lg font-semibold mb-6 flex items-center space-x-2">
        <FiZap className="text-[#d4af37]" />
        <span>AI Announcement Generator</span>
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-secondary mb-1">Category</label>
              <select 
                className="w-full bg-[#131842] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="general">General Info</option>
                <option value="safety">Safety</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Priority</label>
              <select 
                className="w-full bg-[#131842] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                value={formData.priority}
                onChange={e => setFormData({...formData, priority: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-secondary mb-1">Audience</label>
            <select 
              className="w-full bg-[#131842] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#d4af37]"
              value={formData.audience}
              onChange={e => setFormData({...formData, audience: e.target.value})}
            >
              <option value="all">All Attendees</option>
              <option value="fans">Fans Only</option>
              <option value="volunteers">Volunteers</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-secondary mb-1">Context / Message Idea</label>
            <textarea 
              className="w-full bg-[#131842] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#d4af37] min-h-[100px]"
              placeholder="e.g. Gate A1 is overcrowded, please use Gate A2 or A3 instead..."
              value={formData.context}
              onChange={e => setFormData({...formData, context: e.target.value})}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm text-secondary mb-2">Translate to</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(formData.languages).map(lang => (
                <button
                  key={lang}
                  onClick={() => handleLangToggle(lang)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${formData.languages[lang] ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37]' : 'bg-transparent border-white/20 text-secondary hover:border-white/50'}`}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button 
            className="w-full btn-primary py-3 rounded-lg font-medium flex justify-center items-center space-x-2 mt-4"
            onClick={handleGenerate}
            disabled={isGenerating || !formData.context}
          >
            {isGenerating ? <span className="animate-spin inline-block h-5 w-5 border-2 border-white/20 border-t-white rounded-full"></span> : <><FiZap /> <span>Generate with AI ✨</span></>}
          </button>
        </div>

        {/* Preview */}
        <div className="flex flex-col">
          <label className="block text-sm text-secondary mb-2">Generated Preview</label>
          <div className="flex-grow bg-[#131842] border border-white/10 rounded-xl p-6 flex flex-col relative">
            {!generated && !isGenerating && (
              <div className="m-auto text-secondary text-center">
                <FiSend className="mx-auto text-3xl mb-2 opacity-50" />
                <p>Provide context and generate to see preview.</p>
              </div>
            )}
            
            {isGenerating && (
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-white/10 rounded w-1/3"></div>
                <div className="h-4 bg-white/10 rounded w-full"></div>
                <div className="h-4 bg-white/10 rounded w-5/6"></div>
                <div className="h-4 bg-white/10 rounded w-4/6"></div>
              </div>
            )}

            {generated && !isGenerating && (
              <>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-[#d4af37] font-bold text-lg">{generated.title}</h4>
                  <span className={`px-2 py-1 border rounded text-xs font-bold uppercase ${getPriorityColor(generated.priority)}`}>
                    {generated.priority}
                  </span>
                </div>
                
                <div className="flex space-x-1 mb-4 border-b border-white/10 pb-1">
                  {Object.keys(formData.languages).filter(k => formData.languages[k]).map(lang => (
                    <button 
                      key={lang}
                      className={`px-3 py-1 text-sm font-medium rounded-t-lg transition-colors ${activeTab === lang ? 'bg-white/10 text-white' : 'text-secondary hover:text-white'}`}
                      onClick={() => setActiveTab(lang)}
                    >
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="text-white whitespace-pre-wrap flex-grow font-medium leading-relaxed">
                  {generated.content[activeTab] || generated.content.english}
                </div>

                <button 
                  className={`w-full mt-6 py-3 rounded-lg font-bold flex justify-center items-center space-x-2 transition-all ${broadcastSuccess ? 'bg-[#10b981] text-white' : 'bg-[#1e90ff] hover:bg-[#1e90ff]/80 text-white'}`}
                  onClick={handleBroadcast}
                  disabled={isBroadcasting || broadcastSuccess}
                >
                  {isBroadcasting ? (
                    <span className="animate-spin inline-block h-5 w-5 border-2 border-white/20 border-t-white rounded-full"></span>
                  ) : broadcastSuccess ? (
                    <span>Broadcasted Successfully!</span>
                  ) : (
                    <><FiSend /> <span>Broadcast Now</span></>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementGenerator;

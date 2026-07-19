import React, { useState } from 'react';
import { FiSearch, FiFilter, FiZap, FiCheckCircle } from 'react-icons/fi';

const VolunteerPanel = ({ onDeploy }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);

  const mockVolunteers = [
    { id: 1, name: 'Maria Santos', skill: 'Medical First Aid', zone: 'North', status: 'deployed' },
    { id: 2, name: 'James Chen', skill: 'Security', zone: 'East', status: 'deployed' },
    { id: 3, name: 'Fatima Al-Rashid', skill: 'Translation (Arabic)', zone: 'South', status: 'available' },
    { id: 4, name: 'David Okafor', skill: 'Crowd Management', zone: 'West', status: 'deployed' },
    { id: 5, name: 'Yuki Tanaka', skill: 'Accessibility Support', zone: 'North', status: 'available' },
    { id: 6, name: 'Carlos Rivera', skill: 'Medical First Aid', zone: 'South', status: 'deployed' },
    { id: 7, name: 'Sophie Martin', skill: 'Translation (French)', zone: 'East', status: 'available' },
    { id: 8, name: 'Ahmed Hassan', skill: 'Security', zone: 'North', status: 'deployed' },
    { id: 9, name: 'Lisa Wang', skill: 'Crowd Management', zone: 'South', status: 'deployed' },
    { id: 10, name: 'Roberto Silva', skill: 'Translation (Portuguese)', zone: 'West', status: 'available' },
    { id: 11, name: 'Emma Johnson', skill: 'Medical First Aid', zone: 'VIP', status: 'deployed' },
    { id: 12, name: 'Omar Diallo', skill: 'Security', zone: 'South', status: 'deployed' },
    { id: 13, name: 'Priya Sharma', skill: 'Accessibility Support', zone: 'East', status: 'available' },
    { id: 14, name: 'Tom Wilson', skill: 'Crowd Management', zone: 'North', status: 'deployed' },
    { id: 15, name: 'Ana Garcia', skill: 'Translation (Spanish)', zone: 'West', status: 'off_duty' },
  ];

  const filteredVolunteers = mockVolunteers.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (statusFilter === 'all' || v.status === statusFilter)
  );

  const getStatusBadge = (status) => {
    switch(status) {
      case 'available': return <span className="px-2 py-1 bg-[#10b981]/20 text-[#10b981] rounded text-xs font-medium border border-[#10b981]/30">Available</span>;
      case 'deployed': return <span className="px-2 py-1 bg-[#1e90ff]/20 text-[#1e90ff] rounded text-xs font-medium border border-[#1e90ff]/30">Deployed</span>;
      case 'off_duty': return <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs font-medium border border-gray-500/30">Off Duty</span>;
      default: return null;
    }
  };

  const generateAiSuggestions = () => {
    setIsAiLoading(true);
    setTimeout(() => {
      setAiSuggestions([
        { volunteer: 'Fatima Al-Rashid', role: 'Translation (Arabic)', targetZone: 'East', reason: 'High concentration of Arabic speaking fans detected near Gate E2.' },
        { volunteer: 'Priya Sharma', role: 'Accessibility Support', targetZone: 'VIP', reason: 'VIP access ramp C requires immediate assistance based on current flow.' }
      ]);
      setIsAiLoading(false);
    }, 1500);
  };

  return (
    <div className="glass-card p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h3 className="text-white text-lg font-semibold">Volunteer Management</h3>
        <div className="flex space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search name..." 
              className="w-full bg-[#131842] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#d4af37]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
            <select 
              className="bg-[#131842] border border-white/10 rounded-lg pl-10 pr-8 py-2 text-white focus:outline-none focus:border-[#d4af37] appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="deployed">Deployed</option>
              <option value="off_duty">Off Duty</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-8 border border-[#d4af37]/30 rounded-xl bg-[#d4af37]/5 p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <FiZap className="text-[#d4af37]" />
            <h4 className="text-white font-medium">AI Deployment Suggestions</h4>
          </div>
          <button 
            onClick={generateAiSuggestions}
            disabled={isAiLoading}
            className="btn-primary px-4 py-2 text-sm flex items-center space-x-2"
          >
            {isAiLoading ? <span className="animate-spin inline-block h-4 w-4 border-2 border-white/20 border-t-white rounded-full"></span> : <FiZap />}
            <span>{isAiLoading ? 'Analyzing...' : 'Get Suggestions'}</span>
          </button>
        </div>
        
        {aiSuggestions && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiSuggestions.map((sug, i) => (
              <div key={i} className="bg-[#131842] border border-white/10 rounded-lg p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#d4af37]"></div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="text-white font-medium">{sug.volunteer}</h5>
                    <p className="text-xs text-[#d4af37]">{sug.role}</p>
                  </div>
                  <span className="bg-white/10 text-white text-xs px-2 py-1 rounded">Move to {sug.targetZone}</span>
                </div>
                <p className="text-sm text-secondary mb-3">{sug.reason}</p>
                <button className="w-full py-1.5 bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#d4af37] rounded text-sm transition-colors flex items-center justify-center space-x-2">
                  <FiCheckCircle /> <span>Accept & Deploy</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-secondary text-sm">
              <th className="pb-3 px-4 font-medium">Name</th>
              <th className="pb-3 px-4 font-medium">Skill</th>
              <th className="pb-3 px-4 font-medium">Zone</th>
              <th className="pb-3 px-4 font-medium">Status</th>
              <th className="pb-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVolunteers.map(v => (
              <tr key={v.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="py-3 px-4 text-white">{v.name}</td>
                <td className="py-3 px-4 text-secondary text-sm">{v.skill}</td>
                <td className="py-3 px-4 text-white">{v.zone || '-'}</td>
                <td className="py-3 px-4">{getStatusBadge(v.status)}</td>
                <td className="py-3 px-4 text-right">
                  {v.status === 'available' ? (
                    <button className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded transition-colors" onClick={() => onDeploy && onDeploy(v)}>
                      Deploy
                    </button>
                  ) : (
                    <button className="text-xs text-secondary hover:text-white transition-colors">
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolunteerPanel;

import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';
import StadiumBackdrop from './components/common/StadiumBackdrop';

// Fan Pages
import LandingPage from './pages/fan/LandingPage';
import FanDashboard from './pages/fan/FanDashboard';
import ChatPage from './pages/fan/ChatPage';
import MapPage from './pages/fan/MapPage';
import TransportPage from './pages/fan/TransportPage';

// Organizer Pages
import OrgDashboard from './pages/organizer/OrgDashboard';
import CrowdPage from './pages/organizer/CrowdPage';
import VolunteersPage from './pages/organizer/VolunteersPage';
import AnnouncementsPage from './pages/organizer/AnnouncementsPage';
import ReportsPage from './pages/organizer/ReportsPage';
import SustainabilityPage from './pages/organizer/SustainabilityPage';

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isOrganizerMode = location.pathname.startsWith('/organizer');
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return (
      <div className="h-screen w-full overflow-hidden bg-black font-readex">
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#040614] relative font-readex">
      {/* Cinematic Stadium Light & Grid Backdrop */}
      <StadiumBackdrop />

      <div className="z-10 flex h-full w-full overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)} 
          isOrganizerMode={isOrganizerMode} 
        />
        
        <div className="flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300">
          <Navbar 
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
            title={isOrganizerMode ? "Organizer Portal" : "Fan Portal"}
          />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent relative z-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppProvider>
          <Layout>
            <Routes>
              {/* Fan Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<FanDashboard />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/transport" element={<TransportPage />} />
              
              {/* Organizer Routes */}
              <Route path="/organizer" element={<OrgDashboard />} />
              <Route path="/organizer/crowd" element={<CrowdPage />} />
              <Route path="/organizer/volunteers" element={<VolunteersPage />} />
              <Route path="/organizer/announcements" element={<AnnouncementsPage />} />
              <Route path="/organizer/reports" element={<ReportsPage />} />
              <Route path="/organizer/sustainability" element={<SustainabilityPage />} />
            </Routes>
          </Layout>
        </AppProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

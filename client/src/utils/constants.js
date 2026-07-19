export const STADIUM_CENTER = { lat: 40.8128, lng: -74.0742 };
export const STADIUM_ZOOM = 17;

export const DENSITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

export const DENSITY_COLORS = {
  low: '#10b981',
  medium: '#d4af37',
  high: '#f59e0b',
  critical: '#c41e3a'
};

export const LANGUAGES = ['en', 'es', 'fr', 'ar', 'pt', 'bn', 'hi', 'zh', 'de', 'ja'];

export const NAV_ITEMS_FAN = [
  { path: '/dashboard', label: 'Dashboard', icon: 'FiHome' },
  { path: '/chat', label: 'AI Assistant', icon: 'FiMessageSquare' },
  { path: '/map', label: 'Stadium Map', icon: 'FiMap' },
  { path: '/transport', label: 'Transport', icon: 'FiTruck' }
];

export const NAV_ITEMS_ORGANIZER = [
  { path: '/organizer', label: 'Dashboard', icon: 'FiGrid' },
  { path: '/organizer/crowd', label: 'Crowd Management', icon: 'FiActivity' },
  { path: '/organizer/volunteers', label: 'Volunteers', icon: 'FiUsers' },
  { path: '/organizer/announcements', label: 'Announcements', icon: 'FiMic' },
  { path: '/organizer/reports', label: 'Reports', icon: 'FiFileText' },
  { path: '/organizer/sustainability', label: 'Sustainability', icon: 'FiGlobe' }
];

export const QUICK_CHAT_QUESTIONS = [
  'Where is my gate?',
  'Find vegetarian food',
  'Nearest washroom',
  'Guide me to Seat B12',
  'Emergency assistance',
  'Lost & Found',
  'Wheelchair accessible routes',
  'How to reach metro?'
];

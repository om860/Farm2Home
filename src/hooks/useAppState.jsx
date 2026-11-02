import { useState, useEffect, createContext, useContext } from 'react';

// ===================== THEME CONTEXT =====================
export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('farm2home-theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('farm2home-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

// ===================== PROFILE CONTEXT =====================
export const ProfileContext = createContext(null);

const defaultProfile = {
  name: "Demo Farmer",
  phone: "",
  state: "Andhra Pradesh",
  district: "Guntur",
  village: "",
  farmArea: "3.5",
  farmAreaUnit: "acres",
  soilType: "Red Soil",
  crops: ["Chilli", "Tomato"],
  language: "English",
  avatar: "DF",
  avatarColor: "#166534",
  memberSince: "January 2025",
  notifications: { weather: true, market: true, reminders: true, community: false },
};

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('farm2home-profile');
      return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile;
    } catch { return defaultProfile; }
  });

  const updateProfile = (updates) => {
    setProfile(p => {
      const updated = { ...p, ...updates };
      localStorage.setItem('farm2home-profile', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);

// ===================== SAVED PLANS CONTEXT =====================
export const SavedContext = createContext(null);

export function SavedProvider({ children }) {
  const [savedPlans, setSavedPlans] = useState(() => {
    try { return JSON.parse(localStorage.getItem('farm2home-plans') || '[]'); }
    catch { return []; }
  });

  const [observations, setObservations] = useState(() => {
    try { return JSON.parse(localStorage.getItem('farm2home-observations') || '[]'); }
    catch { return []; }
  });

  const [savedGuides, setSavedGuides] = useState(() => {
    try { return JSON.parse(localStorage.getItem('farm2home-guides') || '[]'); }
    catch { return []; }
  });

  const savePlan = (plan) => {
    setSavedPlans(prev => {
      const updated = [{ ...plan, id: Date.now(), savedAt: new Date().toLocaleDateString('en-IN') }, ...prev];
      localStorage.setItem('farm2home-plans', JSON.stringify(updated));
      return updated;
    });
  };

  const removePlan = (id) => {
    setSavedPlans(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem('farm2home-plans', JSON.stringify(updated));
      return updated;
    });
  };

  const saveObservation = (obs) => {
    setObservations(prev => {
      const updated = [{ ...obs, id: Date.now(), savedAt: new Date().toLocaleDateString('en-IN') }, ...prev];
      localStorage.setItem('farm2home-observations', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleGuide = (guideId) => {
    setSavedGuides(prev => {
      const updated = prev.includes(guideId)
        ? prev.filter(g => g !== guideId)
        : [...prev, guideId];
      localStorage.setItem('farm2home-guides', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <SavedContext.Provider value={{ savedPlans, savePlan, removePlan, observations, saveObservation, savedGuides, toggleGuide }}>
      {children}
    </SavedContext.Provider>
  );
}

export const useSaved = () => useContext(SavedContext);

// ===================== LOCATION CONTEXT =====================
export const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(() => {
    try { return JSON.parse(localStorage.getItem('farm2home-location') || '{"state":"","district":""}'); }
    catch { return { state: '', district: '' }; }
  });

  const updateLocation = (loc) => {
    const updated = { ...location, ...loc };
    setLocation(updated);
    localStorage.setItem('farm2home-location', JSON.stringify(updated));
  };

  return (
    <LocationContext.Provider value={{ location, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext);

// ===================== SEARCH HOOK =====================
export function useSearch(items, keys) {
  const [query, setQuery] = useState('');
  const filtered = query
    ? items.filter(item => keys.some(key => {
        const val = item[key];
        if (Array.isArray(val)) return val.some(v => v.toLowerCase().includes(query.toLowerCase()));
        return String(val || '').toLowerCase().includes(query.toLowerCase());
      }))
    : items;
  return { query, setQuery, filtered };
}

// ===================== LOCAL STORAGE HOOK =====================
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch { return defaultValue; }
  });

  const set = (v) => {
    setValue(v);
    localStorage.setItem(key, JSON.stringify(v));
  };

  return [value, set];
}

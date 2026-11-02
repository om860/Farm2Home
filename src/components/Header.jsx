import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Sun, Moon, Bell, User, MapPin, ChevronDown, Leaf, X } from 'lucide-react';
import { useTheme } from '../hooks/useAppState';
import { useProfile } from '../hooks/useAppState';
import { useLocation as useLocationCtx } from '../hooks/useAppState';
import { STATES_DISTRICTS } from '../data/sampleData';

export default function Header({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const { profile } = useProfile();
  const { location, updateLocation } = useLocationCtx();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const SEARCH_SUGGESTIONS = [
    { label: 'Chilli Cultivation Guide', path: '/crop-library/chilli' },
    { label: 'Crop Recommendation', path: '/crop-recommendation' },
    { label: 'Market Prices', path: '/market-prices' },
    { label: 'Weather Information', path: '/weather' },
    { label: 'Disease Support', path: '/crop-disease' },
    { label: 'Fertilizer Guidance', path: '/fertilizer' },
    { label: 'AI Agriculture Assistant', path: '/ai-assistant' },
    { label: 'Farmer Community', path: '/community' },
    { label: 'Knowledge Hub', path: '/knowledge-hub' },
    { label: 'Pesticide Planner', path: '/pesticide-planner' },
  ];

  const filteredSuggestions = searchQuery
    ? SEARCH_SUGGESTIONS.filter(s => s.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : SEARCH_SUGGESTIONS.slice(0, 5);

  useEffect(() => {
    if (showSearch && searchRef.current) searchRef.current.focus();
  }, [showSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      const match = SEARCH_SUGGESTIONS.find(s => s.label.toLowerCase().includes(searchQuery.toLowerCase()));
      if (match) navigate(match.path);
    }
    setShowSearch(false);
    setSearchQuery('');
  };

  return (
    <header className="header no-print">
      {/* Left: Menu + Location */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
        <button
          className="btn-icon"
          onClick={onMenuClick}
          aria-label="Toggle menu"
          id="header-menu-btn"
          style={{ display: 'flex' }}
        >
          <Menu size={20} />
        </button>

        {/* Location selector */}
        <div style={{ position: 'relative' }}>
          <button
            className="btn-ghost btn-sm"
            onClick={() => setShowLocation(!showLocation)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
            id="location-selector-btn"
          >
            <MapPin size={14} style={{ color: 'var(--accent-primary)' }} />
            <span style={{ fontSize: '0.8rem', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {location.district && location.state
                ? `${location.district}, ${location.state.slice(0, 12)}`
                : 'Select Location'}
            </span>
            <ChevronDown size={12} />
          </button>

          {showLocation && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, marginTop: '0.5rem',
              background: 'var(--bg-card)', border: '1px solid var(--border-color)',
              borderRadius: '12px', padding: '1rem', width: '280px', zIndex: 100,
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Select Your Location</div>
              <select
                className="form-input form-select"
                value={location.state || ''}
                onChange={e => updateLocation({ state: e.target.value, district: '' })}
                style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}
              >
                <option value="">Select State</option>
                {Object.keys(STATES_DISTRICTS).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select
                className="form-input form-select"
                value={location.district || ''}
                onChange={e => updateLocation({ district: e.target.value })}
                style={{ marginBottom: '0.75rem', fontSize: '0.85rem' }}
                disabled={!location.state}
              >
                <option value="">Select District</option>
                {(STATES_DISTRICTS[location.state] || []).map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowLocation(false)}>
                Confirm Location
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Center: Search */}
      <div style={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
        {!showSearch ? (
          <button
            className="btn-ghost"
            onClick={() => setShowSearch(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', padding: '0.4rem 1rem' }}
            id="header-search-btn"
          >
            <Search size={16} />
            <span style={{ color: 'var(--text-muted)' }}>Search features, crops...</span>
          </button>
        ) : (
          <div style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
            <form onSubmit={handleSearchSubmit}>
              <div className="search-bar" style={{ width: '100%' }}>
                <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <input
                  ref={searchRef}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search crops, features, guides..."
                  id="global-search-input"
                />
                <button type="button" onClick={() => { setShowSearch(false); setSearchQuery(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
                  <X size={16} />
                </button>
              </div>
            </form>
            {/* Dropdown suggestions */}
            <div style={{
              position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
              background: 'var(--bg-card)', border: '1px solid var(--border-color)',
              borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', zIndex: 100
            }}>
              {filteredSuggestions.map(s => (
                <Link
                  key={s.path}
                  to={s.path}
                  onClick={() => { setShowSearch(false); setSearchQuery(''); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.6rem 1rem', color: 'var(--text-primary)',
                    textDecoration: 'none', fontSize: '0.875rem', transition: 'background 0.15s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  <Search size={14} style={{ color: 'var(--text-muted)' }} />
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right: Theme, Notifications, Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'flex-end' }}>
        {/* Theme toggle */}
        <button
          className="btn-icon"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          id="theme-toggle-btn"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Notifications */}
        <button className="btn-icon" aria-label="Notifications" id="notifications-btn" style={{ position: 'relative' }}>
          <Bell size={18} />
          <span style={{
            position: 'absolute', top: '4px', right: '4px',
            width: '8px', height: '8px', background: '#22c55e',
            borderRadius: '50%', border: '2px solid var(--bg-header)'
          }} />
        </button>

        {/* Profile */}
        <div style={{ position: 'relative' }}>
          <button
            className="btn-icon"
            onClick={() => setShowProfile(!showProfile)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem' }}
            id="profile-menu-btn"
          >
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #166534, #22c55e)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 700, fontSize: '0.75rem'
            }}>
              {profile.avatar}
            </div>
          </button>

          {showProfile && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0,
              background: 'var(--bg-card)', border: '1px solid var(--border-color)',
              borderRadius: '16px', padding: '1rem', width: '220px', zIndex: 100,
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #166534, #22c55e)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0
                }}>
                  {profile.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{profile.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{profile.district}, {profile.state}</div>
                </div>
              </div>
              {[
                { label: 'Dashboard', path: '/dashboard', icon: '🌿' },
                { label: 'My Profile', path: '/profile', icon: '👤' },
                { label: 'Settings', path: '/settings', icon: '⚙️' },
              ].map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowProfile(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.5rem 0.75rem', borderRadius: '8px', color: 'var(--text-primary)',
                    textDecoration: 'none', fontSize: '0.875rem', transition: 'background 0.15s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  <span>{item.icon}</span> {item.label}
                </Link>
              ))}
              <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
                <div className="demo-notice" style={{ fontSize: '0.72rem' }}>
                  <Leaf size={12} /> Demo Mode — Sample Data
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click-away handler */}
      {(showProfile || showLocation) && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => { setShowProfile(false); setShowLocation(false); }} />
      )}
    </header>
  );
}

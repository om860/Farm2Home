import { useState } from 'react';
import { Bell, Moon, Sun, Globe, Trash2, CheckCircle, AlertCircle, Shield, Smartphone } from 'lucide-react';
import { useTheme } from '../hooks/useAppState';
import { useProfile } from '../hooks/useAppState';

export default function SettingsPage() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { profile, updateProfile } = useProfile();
  const [notifications, setNotifications] = useState({ ...profile.notifications });
  const [saved, setSaved] = useState(false);
  const [cleared, setCleared] = useState(false);

  const handleNotifChange = (key) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    updateProfile({ notifications: updated });
  };

  const handleClearData = () => {
    if (window.confirm('This will clear all saved plans and observations from this device. Continue?')) {
      localStorage.removeItem('farm2home-plans');
      localStorage.removeItem('farm2home-observations');
      localStorage.removeItem('farm2home-guides');
      setCleared(true);
      setTimeout(() => setCleared(false), 3000);
    }
  };

  const NOTIF_SETTINGS = [
    { key: 'weather', label: 'Weather Alerts', desc: 'Get alerts about extreme weather affecting your crops', icon: '🌤️' },
    { key: 'market', label: 'Market Price Updates', desc: 'Be notified when crop prices change significantly', icon: '📊' },
    { key: 'reminders', label: 'Farming Reminders', desc: 'Task and crop-care reminders based on your schedule', icon: '📋' },
    { key: 'community', label: 'Community Activity', desc: 'Updates from the farmer community forum', icon: '👥' },
  ];

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="section-title">⚙️ Settings</h1>
        <p className="section-subtitle">Customize your Farm2Home experience</p>
      </div>

      {cleared && (
        <div className="alert alert-success" style={{ marginBottom: '1.25rem' }}>
          <CheckCircle size={16} /> Saved data cleared from this device.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '720px' }}>
        {/* Appearance */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isDark ? <Moon size={16} color="var(--accent-primary)" /> : <Sun size={16} color="var(--accent-primary)" />}
            Appearance
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.125rem' }}>
                {isDark ? 'Easy on the eyes in low light' : 'Bright and clear for outdoor use'}
              </div>
            </div>
            <button
              onClick={toggleTheme}
              id="settings-theme-toggle"
              style={{
                width: '52px', height: '28px', borderRadius: '999px', border: 'none',
                background: isDark ? 'var(--accent-primary)' : 'var(--border-input)',
                cursor: 'pointer', position: 'relative', transition: 'background 0.3s',
              }}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              <span style={{
                position: 'absolute', top: '4px',
                left: isDark ? '28px' : '4px',
                width: '20px', height: '20px', borderRadius: '50%',
                background: 'white', transition: 'left 0.3s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
              }} />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bell size={16} color="var(--accent-primary)" /> Notification Preferences
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            (Demo only — notifications are not actually sent in this version)
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {NOTIF_SETTINGS.map(({ key, label, desc, icon }) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.25rem', lineHeight: 1, marginTop: '1px' }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.875rem' }}>{label}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.77rem', marginTop: '0.125rem' }}>{desc}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleNotifChange(key)}
                  id={`notif-toggle-${key}`}
                  style={{
                    width: '44px', height: '24px', borderRadius: '999px', border: 'none',
                    background: notifications[key] ? 'var(--accent-primary)' : 'var(--border-input)',
                    cursor: 'pointer', position: 'relative', transition: 'background 0.3s', flexShrink: 0,
                  }}
                  aria-label={`Toggle ${label}`}
                  aria-checked={notifications[key]}
                >
                  <span style={{
                    position: 'absolute', top: '3px',
                    left: notifications[key] ? '23px' : '3px',
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: 'white', transition: 'left 0.3s',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                  }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={16} color="var(--accent-primary)" /> Language
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.875rem' }}>App Language</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.77rem', marginTop: '0.125rem' }}>Currently: {profile.language} (English only in demo)</div>
            </div>
            <select
              className="form-input form-select"
              value={profile.language}
              onChange={e => updateProfile({ language: e.target.value })}
              style={{ width: 'auto', minWidth: '120px' }}
              id="language-select"
            >
              {['English', 'Hindi', 'Telugu', 'Kannada', 'Tamil', 'Marathi', 'Gujarati', 'Punjabi'].map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div className="demo-notice" style={{ marginTop: '0.75rem' }}>
            <AlertCircle size={12} /> Multi-language support is planned for future versions. Currently English only.
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={16} color="var(--accent-primary)" /> Data & Privacy
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ padding: '0.875rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Smartphone size={14} color="var(--accent-primary)" />
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.875rem' }}>Local Storage Only</div>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                All your data (profile, saved plans, preferences) is stored only on this device using browser localStorage. No data is sent to any server.
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#dc2626', fontSize: '0.875rem' }}>Clear Saved Data</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.77rem', marginTop: '0.125rem' }}>Remove all saved plans, observations, and guides</div>
              </div>
              <button
                className="btn btn-sm"
                onClick={handleClearData}
                id="clear-data-btn"
                style={{ background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5' }}
              >
                <Trash2 size={14} /> Clear Data
              </button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>ℹ️ About Farm2Home</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Version</span>
              <span style={{ fontWeight: 500 }}>1.0.0 (Demo)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Platform</span>
              <span style={{ fontWeight: 500 }}>Smart Agriculture Assistant</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Data Source</span>
              <span style={{ fontWeight: 500 }}>Sample / Demo data only</span>
            </div>
          </div>
          <div className="demo-notice" style={{ marginTop: '1rem' }}>
            <AlertCircle size={12} />
            All crop data, prices, and recommendations are sample data for demonstration. Not affiliated with any government body. Consult local KVK for official guidance.
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, LayoutDashboard, Sprout, BookOpen, Bug, Cloud, Beaker,
  TrendingUp, GraduationCap, Shield, Users, Bot, User, Settings,
  ChevronLeft, ChevronRight, X, Leaf, Menu
} from 'lucide-react';

const NAV_SECTIONS = [
  {
    label: 'Main',
    items: [
      { path: '/', label: 'Home', icon: Home },
      { path: '/dashboard', label: 'Farmer Dashboard', icon: LayoutDashboard },
    ]
  },
  {
    label: 'Farming Tools',
    items: [
      { path: '/crop-recommendation', label: 'Crop Recommendation', icon: Sprout },
      { path: '/crop-library', label: 'Crop Library', icon: BookOpen },
      { path: '/crop-disease', label: 'Disease Support', icon: Bug },
      { path: '/weather', label: 'Weather Information', icon: Cloud },
      { path: '/fertilizer', label: 'Fertilizer Guidance', icon: Beaker },
      { path: '/market-prices', label: 'Market Prices', icon: TrendingUp },
      { path: '/pesticide-planner', label: 'Pesticide Planner', icon: Shield },
    ]
  },
  {
    label: 'Knowledge & Community',
    items: [
      { path: '/knowledge-hub', label: 'Knowledge Hub', icon: GraduationCap },
      { path: '/community', label: 'Farmer Community', icon: Users },
      { path: '/ai-assistant', label: 'AI Assistant', icon: Bot },
    ]
  },
  {
    label: 'Account',
    items: [
      { path: '/profile', label: 'Farmer Profile', icon: User },
      { path: '/settings', label: 'Settings', icon: Settings },
    ]
  }
];

export default function Sidebar({ isOpen, onClose, collapsed, onToggleCollapse }) {
  const { pathname } = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`mobile-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}>
        {/* Logo area */}
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '64px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', overflow: 'hidden' }} onClick={onClose}>
            <div className="logo-mark" style={{ flexShrink: 0 }}>
              <Leaf size={20} color="white" strokeWidth={2.5} />
            </div>
            {!collapsed && (
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-primary)', whiteSpace: 'nowrap' }}>
                  Farm2Home
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Smart Agriculture Platform</div>
              </div>
            )}
          </Link>
          {/* Close button (mobile) */}
          <button className="btn-icon" onClick={onClose} style={{ display: 'none' }} aria-label="Close sidebar" id="sidebar-close-btn">
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, overflowY: 'auto', paddingBottom: '1rem' }}>
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              {!collapsed && <div className="nav-section-label">{section.label}</div>}
              {collapsed && <div style={{ margin: '0.5rem 0', height: '1px', background: 'var(--border-color)' }} />}
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={onClose}
                    title={collapsed ? item.label : undefined}
                    style={collapsed ? { justifyContent: 'center', padding: '0.625rem', margin: '2px 8px' } : {}}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} style={{ flexShrink: 0 }} />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={onToggleCollapse}
          className="no-print"
          style={{
            margin: '0.5rem', padding: '0.5rem', background: 'var(--bg-hover)',
            border: '1px solid var(--border-color)', borderRadius: '10px',
            color: 'var(--text-muted)', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            fontSize: '0.8rem', fontWeight: 500, transition: 'all 0.2s',
          }}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Collapse</span></>}
        </button>
      </aside>
    </>
  );
}

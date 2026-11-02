import { Link } from 'react-router-dom';
import {
  Sprout, BookOpen, Bug, Cloud, Beaker, TrendingUp,
  Shield, GraduationCap, Users, Bot, ArrowRight, Star,
  CheckCircle, Leaf, Sun, Droplets, Wind
} from 'lucide-react';
import { CROPS_DATA, KNOWLEDGE_ARTICLES } from '../data/sampleData';

const FEATURES = [
  { icon: Sprout, label: 'Crop Recommendation', desc: 'Season & location-based crop planning', path: '/crop-recommendation', color: '#166534', bg: '#dcfce7' },
  { icon: BookOpen, label: 'Crop Library', desc: 'Complete cultivation guides', path: '/crop-library', color: '#0369a1', bg: '#dbeafe' },
  { icon: Bug, label: 'Disease Support', desc: 'Identify and manage crop diseases', path: '/crop-disease', color: '#dc2626', bg: '#fee2e2' },
  { icon: Cloud, label: 'Weather Info', desc: 'Farming-focused weather guidance', path: '/weather', color: '#7c3aed', bg: '#ede9fe' },
  { icon: Beaker, label: 'Fertilizer Guidance', desc: 'Soil health & nutrient management', path: '/fertilizer', color: '#d97706', bg: '#fef3c7' },
  { icon: TrendingUp, label: 'Market Prices', desc: 'Mandi prices and crop market data', path: '/market-prices', color: '#059669', bg: '#d1fae5' },
  { icon: Shield, label: 'Pesticide Planner', desc: 'Responsible crop protection guidance', path: '/pesticide-planner', color: '#dc2626', bg: '#fee2e2' },
  { icon: GraduationCap, label: 'Knowledge Hub', desc: 'Farming guides and techniques', path: '/knowledge-hub', color: '#0369a1', bg: '#dbeafe' },
  { icon: Users, label: 'Farmer Community', desc: 'Connect with local farmers', path: '/community', color: '#7c3aed', bg: '#ede9fe' },
  { icon: Bot, label: 'AI Assistant', desc: 'Ask agriculture questions', path: '/ai-assistant', color: '#166534', bg: '#dcfce7' },
];

const QUICK_STATS = [
  { icon: '🌾', label: 'Crop Guides', value: '50+', desc: 'Detailed cultivation guides' },
  { icon: '🗺️', label: 'States Covered', value: '14', desc: 'Sample data across India' },
  { icon: '👥', label: 'Farmer Community', value: 'Demo', desc: 'Connect with other farmers' },
  { icon: '🤖', label: 'AI Assistant', value: 'Demo', desc: 'Agriculture Q&A interface' },
];

export default function HomePage() {
  return (
    <div style={{ animation: 'fadeInUp 0.5s ease' }}>
      {/* Hero Section */}
      <section className="hero-gradient" style={{
        borderRadius: '24px', padding: '4rem 3rem',
        marginBottom: '2rem', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '999px', padding: '0.375rem 1rem', marginBottom: '1.5rem' }}>
            <Leaf size={14} color="#4ade80" />
            <span style={{ fontSize: '0.8rem', color: '#4ade80', fontWeight: 600 }}>Smart Agriculture Platform</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            Smarter Farming<br />
            <span style={{ color: '#4ade80' }}>Starts Here</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '560px' }}>
            Farm2Home brings together crop planning, disease support, weather information, market prices and a farming knowledge hub — all in one platform designed for India's farmers.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/crop-recommendation" className="btn btn-lg" style={{ background: '#22c55e', color: 'white', boxShadow: '0 4px 16px rgba(34,197,94,0.4)' }}>
              <Sprout size={18} /> Explore Farming Tools
            </Link>
            <Link to="/crop-library" className="btn btn-lg btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }}>
              <BookOpen size={18} /> Plan Your Crop
            </Link>
          </div>
        </div>

        {/* Floating stats */}
        <div style={{
          position: 'absolute', right: '3rem', top: '50%', transform: 'translateY(-50%)',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem',
          '@media (max-width: 768px)': { display: 'none' }
        }} className="hero-stats">
          {[
            { icon: <Sun size={18} color="#fbbf24" />, label: 'Weather Tips' },
            { icon: <Droplets size={18} color="#60a5fa" />, label: 'Irrigation Guide' },
            { icon: <Leaf size={18} color="#4ade80" />, label: 'Crop Planning' },
            { icon: <Wind size={18} color="#a78bfa" />, label: 'Season Forecast' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px',
              padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`
            }}>
              {s.icon}
              <span style={{ fontSize: '0.8rem', color: 'white', fontWeight: 500 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <div className="grid-auto grid-4" style={{ marginBottom: '2rem' }}>
        {QUICK_STATS.map((stat, i) => (
          <div key={i} className="stat-card card-hover">
            <div className="stat-icon" style={{ background: 'var(--accent-light)', fontSize: '1.5rem' }}>{stat.icon}</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{stat.value}</div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{stat.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stat.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Platform Features */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 className="section-title">All Farming Tools in One Place</h2>
          <p className="section-subtitle">From crop planning to market prices — everything a modern farmer needs</p>
        </div>
        <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Link
                key={i}
                to={feature.path}
                className="feature-card"
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  background: feature.bg, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: '1rem'
                }}>
                  <Icon size={22} color={feature.color} strokeWidth={2} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
                  {feature.label}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{feature.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.75rem', color: feature.color, fontSize: '0.8rem', fontWeight: 600 }}>
                  Explore <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Crops */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h2 className="section-title">Featured Crop Guides</h2>
            <p className="section-subtitle">Season-specific cultivation guides for major crops</p>
          </div>
          <Link to="/crop-library" className="btn btn-secondary btn-sm">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
          {CROPS_DATA.map(crop => (
            <Link
              key={crop.id}
              to={`/crop-library/${crop.id}`}
              className="card card-hover"
              style={{ padding: '1.25rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: crop.bgColor, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0
              }}>
                {crop.icon}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{crop.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{crop.hindi}</div>
                <div style={{ display: 'flex', gap: '0.375rem', marginTop: '0.375rem', flexWrap: 'wrap' }}>
                  {crop.seasons.map(s => (
                    <span key={s} className={`badge ${s === 'kharif' ? 'badge-green' : s === 'rabi' ? 'badge-yellow' : 'badge-blue'}`}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Crop Planning Quick Start */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div className="card" style={{ padding: '2rem', background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-card))' }}>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <h2 className="section-title">Start Your Crop Plan</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '0.5rem', marginBottom: '1.25rem' }}>
                Enter your location, soil type and season to get crop recommendations tailored to your farm. Use sample data to explore the planning tool.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link to="/crop-recommendation" className="btn btn-primary">
                  <Sprout size={16} /> Plan My Crop
                </Link>
                <Link to="/crop-library" className="btn btn-secondary">
                  <BookOpen size={16} /> Browse Crops
                </Link>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', flex: 1, minWidth: '240px' }}>
              {['Kharif Season', 'Rabi Season', 'Soil Analysis', 'Irrigation Plan'].map((item, i) => (
                <div key={i} style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                  borderRadius: '12px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}>
                  <CheckCircle size={16} color="#22c55e" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Articles */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h2 className="section-title">Farming Knowledge</h2>
            <p className="section-subtitle">Guides, techniques and farming best practices</p>
          </div>
          <Link to="/knowledge-hub" className="btn btn-secondary btn-sm">
            All Articles <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid-auto grid-3">
          {KNOWLEDGE_ARTICLES.slice(0, 3).map(article => (
            <Link
              key={article.id}
              to="/knowledge-hub"
              className="card card-hover"
              style={{ padding: '1.25rem', textDecoration: 'none' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span className="badge badge-green">{article.category}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{article.readTime} read</span>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                {article.title}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{article.summary}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.75rem', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 600 }}>
                Read More <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Farmer Community Intro */}
      <section style={{ marginBottom: '2rem' }}>
        <div className="card hero-community-card" style={{
          padding: '2rem',
        }}>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                Join the Farmer Community
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                Connect with farmers in your region. Share experiences, ask questions about crop diseases, market prices and farming techniques. Demonstration mode — real messaging not active.
              </p>
              <Link to="/community" className="btn btn-primary btn-lg">
                <Users size={18} /> Explore Community
              </Link>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {['💬 Crop Discussions', '❓ Q&A Forum', '📸 Field Updates', '🌍 Regional Groups'].map((item, i) => (
                <div key={i} style={{
                  background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                  borderRadius: '12px', padding: '0.625rem 1rem', fontSize: '0.85rem', fontWeight: 500,
                  color: 'var(--text-secondary)'
                }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-color)', paddingTop: '2rem', marginTop: '2rem',
        color: 'var(--text-muted)', fontSize: '0.85rem'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div className="logo-mark" style={{ width: '28px', height: '28px' }}>
                <Leaf size={14} color="white" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent-primary)' }}>Farm2Home</span>
            </div>
            <p style={{ lineHeight: 1.6, maxWidth: '220px' }}>Smart Agriculture Platform supporting Indian farmers with crop planning, disease support and market information.</p>
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Farming Tools</div>
            {['Crop Recommendation', 'Crop Library', 'Disease Support', 'Weather Info', 'Market Prices'].map(l => (
              <div key={l} style={{ marginBottom: '0.25rem' }}>{l}</div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Knowledge</div>
            {['Fertilizer Guidance', 'Pesticide Planner', 'Knowledge Hub', 'AI Assistant', 'Farmer Community'].map(l => (
              <div key={l} style={{ marginBottom: '0.25rem' }}>{l}</div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Important Notice</div>
            <p style={{ lineHeight: 1.6, fontSize: '0.8rem' }}>
              All data shown on this platform is for demonstration purposes only. Do not make farming decisions based on this data alone. Always consult a qualified agricultural officer or your local Krishi Vigyan Kendra (KVK).
            </p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span>© 2026 Farm2Home — Smart Agriculture Platform</span>
          <span className="badge badge-demo">⚠️ Demo Version — All data is sample data</span>
        </div>
      </footer>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Sprout, Cloud, TrendingUp, Bug, Beaker,
  BookOpen, Shield, GraduationCap, Users, Bot, Bell,
  Plus, Trash2, Eye, ChevronRight, AlertCircle, CheckCircle, Leaf
} from 'lucide-react';
import { useProfile } from '../hooks/useAppState';
import { useSaved } from '../hooks/useAppState';
import { WEATHER_SAMPLE, MARKET_PRICES } from '../data/sampleData';

const TASK_LIST = [
  { id: 1, task: "Apply second top-dressing nitrogen", crop: "Chilli", dueDate: "Oct 28", priority: "high", done: false },
  { id: 2, task: "Monitor for thrips using sticky traps", crop: "Chilli", dueDate: "Oct 26", priority: "medium", done: false },
  { id: 3, task: "Check soil moisture — irrigate if needed", crop: "Tomato", dueDate: "Oct 25", priority: "medium", done: true },
  { id: 4, task: "Prepare land for Rabi crop sowing", crop: "General", dueDate: "Nov 02", priority: "low", done: false },
];

const SHORTCUTS = [
  { icon: Sprout, label: 'Crop Plan', path: '/crop-recommendation', color: '#166534', bg: '#dcfce7' },
  { icon: Bug, label: 'Disease', path: '/crop-disease', color: '#dc2626', bg: '#fee2e2' },
  { icon: Cloud, label: 'Weather', path: '/weather', color: '#7c3aed', bg: '#ede9fe' },
  { icon: TrendingUp, label: 'Prices', path: '/market-prices', color: '#059669', bg: '#d1fae5' },
  { icon: Beaker, label: 'Fertilizer', path: '/fertilizer', color: '#d97706', bg: '#fef3c7' },
  { icon: Shield, label: 'Pesticide', path: '/pesticide-planner', color: '#dc2626', bg: '#fee2e2' },
  { icon: GraduationCap, label: 'Knowledge', path: '/knowledge-hub', color: '#0369a1', bg: '#dbeafe' },
  { icon: Bot, label: 'AI Help', path: '/ai-assistant', color: '#166534', bg: '#dcfce7' },
];

const CROP_GROWTH = [
  { crop: "Chilli", variety: "Teja (S-17)", stage: "Fruiting", progress: 75, icon: "🌶️", sowDate: "July 15", estHarvest: "Nov 15", area: "2 acres" },
  { crop: "Tomato", variety: "US 618", stage: "Flowering", progress: 55, icon: "🍅", sowDate: "Aug 01", estHarvest: "Nov 10", area: "1.5 acres" },
];

export default function DashboardPage() {
  const { profile } = useProfile();
  const { savedPlans, removePlan, observations } = useSaved();
  const [tasks, setTasks] = useState(TASK_LIST);

  const toggleTask = (id) => {
    setTasks(t => t.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const pendingTasks = tasks.filter(t => !t.done).length;

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      {/* Demo notice */}
      <div className="demo-notice" style={{ marginBottom: '1.25rem' }}>
        <AlertCircle size={14} />
        <span><strong>Demo Dashboard</strong> — All crop data, tasks and weather shown here are sample data for demonstration only.</span>
      </div>

      {/* Welcome */}
      <div className="card dashboard-welcome" style={{
        padding: '1.5rem 2rem', marginBottom: '1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.375rem' }}>
            🌿 Welcome, {profile.name}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {profile.district}, {profile.state} · {profile.farmArea} {profile.farmAreaUnit} · {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
            {profile.crops.map(c => (
              <span key={c} className="badge badge-green">
                {c}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/crop-recommendation" className="btn btn-primary">
            <Sprout size={16} /> New Crop Plan
          </Link>
        </div>
      </div>

      {/* Quick shortcuts */}
      <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '1.5rem' }}>
        {SHORTCUTS.map((s, i) => {
          const Icon = s.icon;
          return (
            <Link
              key={i}
              to={s.path}
              className="card card-hover"
              style={{ padding: '1rem', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textAlign: 'center' }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} color={s.color} />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{s.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
        {/* Crop growth stages */}
        <div className="card" style={{ padding: '1.25rem', gridColumn: '1 / -1' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            🌱 Crop Growth Stages
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {CROP_GROWTH.map((crop, i) => (
              <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '1rem', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{crop.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{crop.crop}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{crop.variety}</div>
                    </div>
                  </div>
                  <span className="badge badge-green">{crop.stage}</span>
                </div>
                <div className="progress-bar" style={{ marginBottom: '0.5rem' }}>
                  <div className="progress-fill" style={{ width: `${crop.progress}%` }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Sown: {crop.sowDate}</span>
                  <span>{crop.progress}% complete</span>
                  <span>Est. harvest: {crop.estHarvest}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Area: {crop.area} <span className="badge badge-demo" style={{ marginLeft: '0.25rem' }}>Sample Data</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
              📋 Farming Tasks ({pendingTasks} pending)
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {tasks.map(task => (
              <div key={task.id} style={{
                display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                padding: '0.75rem', background: 'var(--bg-secondary)',
                borderRadius: '10px', border: '1px solid var(--border-color)',
                opacity: task.done ? 0.6 : 1, transition: 'opacity 0.2s'
              }}>
                <button
                  onClick={() => toggleTask(task.id)}
                  style={{ background: 'none', border: `2px solid ${task.done ? '#22c55e' : 'var(--border-input)'}`, borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', flexShrink: 0, marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', background: task.done ? '#22c55e' : 'transparent' }}
                  aria-label={`Mark "${task.task}" as ${task.done ? 'pending' : 'done'}`}
                >
                  {task.done && <CheckCircle size={14} color="white" />}
                </button>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-primary)', textDecoration: task.done ? 'line-through' : 'none' }}>
                    {task.task}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                    <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>{task.crop}</span>
                    <span className={`badge ${task.priority === 'high' ? 'badge-red' : task.priority === 'medium' ? 'badge-yellow' : 'badge-gray'}`} style={{ fontSize: '0.7rem' }}>
                      {task.priority}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Due: {task.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather summary */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>🌤️ Weather Summary</h2>
            <Link to="/weather" className="btn btn-ghost btn-sm">Full Forecast <ChevronRight size={14} /></Link>
          </div>
          <div className="demo-notice" style={{ marginBottom: '0.75rem' }}>
            <AlertCircle size={12} /> Sample weather data — not a real forecast
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ fontSize: '3rem' }}>{WEATHER_SAMPLE.icon}</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {WEATHER_SAMPLE.temperature}°C
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{WEATHER_SAMPLE.condition}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {[
              { label: 'Humidity', value: `${WEATHER_SAMPLE.humidity}%` },
              { label: 'Wind', value: `${WEATHER_SAMPLE.windSpeed} km/h ${WEATHER_SAMPLE.windDir}` },
              { label: 'Rainfall', value: `${WEATHER_SAMPLE.rainfall} mm` },
              { label: 'UV Index', value: WEATHER_SAMPLE.uvIndex },
            ].map(w => (
              <div key={w.label} style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '0.5rem 0.75rem' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{w.label}</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{w.value}</div>
              </div>
            ))}
          </div>
          {WEATHER_SAMPLE.farmingTips[0] && (
            <div style={{ marginTop: '0.75rem', padding: '0.625rem', background: 'var(--accent-light)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--accent-primary)' }}>
              💡 {WEATHER_SAMPLE.farmingTips[0]}
            </div>
          )}
        </div>
      </div>

      {/* Market prices summary */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>📊 Market Price Summary</h2>
          <Link to="/market-prices" className="btn btn-ghost btn-sm">View All <ChevronRight size={14} /></Link>
        </div>
        <div className="demo-notice" style={{ marginBottom: '0.75rem' }}>
          <AlertCircle size={12} /> Sample market data — not official or current prices
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                {['Crop', 'Mandi', 'Min (₹/qtl)', 'Max (₹/qtl)', 'Modal (₹/qtl)', 'Date'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '0.5rem 0.75rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MARKET_PRICES.slice(0, 5).map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.6rem 0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>{p.crop}</td>
                  <td style={{ padding: '0.6rem 0.75rem', color: 'var(--text-muted)' }}>{p.mandi}</td>
                  <td style={{ padding: '0.6rem 0.75rem' }}>₹{p.minPrice.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '0.6rem 0.75rem' }}>₹{p.maxPrice.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '0.6rem 0.75rem', fontWeight: 700, color: '#166534' }}>₹{p.modalPrice.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '0.6rem 0.75rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Saved plans */}
      {savedPlans.length > 0 && (
        <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            💾 Saved Crop Plans ({savedPlans.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {savedPlans.map(plan => (
              <div key={plan.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0.75rem 1rem', background: 'var(--bg-secondary)',
                borderRadius: '10px', border: '1px solid var(--border-color)'
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    {plan.crops?.join(', ') || 'Crop Plan'} — {plan.state}, {plan.district}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Saved: {plan.savedAt}</div>
                </div>
                <button
                  className="btn-icon"
                  onClick={() => removePlan(plan.id)}
                  aria-label="Remove saved plan"
                  style={{ color: '#dc2626' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Observations */}
      {observations.length > 0 && (
        <div className="card" style={{ padding: '1.25rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            🔍 Field Observations ({observations.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {observations.slice(0, 5).map(obs => (
              <div key={obs.id} style={{
                padding: '0.75rem 1rem', background: 'var(--bg-secondary)',
                borderRadius: '10px', border: '1px solid var(--border-color)'
              }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{obs.crop} — {obs.stage}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{obs.symptoms}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Saved: {obs.savedAt}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

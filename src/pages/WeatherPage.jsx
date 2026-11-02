import { useState } from 'react';
import { AlertCircle, Droplets, Wind, Eye, Thermometer, Cloud, Sun, CloudRain } from 'lucide-react';
import { STATES_DISTRICTS, WEATHER_SAMPLE } from '../data/sampleData';

const WEEK_TIPS = [
  { day: "Today", activity: "Suitable for field inspection and weed management" },
  { day: "Tuesday", activity: "Good conditions for pesticide application (low wind, morning)" },
  { day: "Wednesday", activity: "Light rain expected — delay fertiliser application" },
  { day: "Thursday", activity: "Post-rain soil moisture check; assess drainage" },
  { day: "Friday–Sunday", activity: "Good weather for harvesting operations" },
];

export default function WeatherPage() {
  const [state, setState] = useState('Andhra Pradesh');
  const [district, setDistrict] = useState('Guntur');
  const [viewed, setViewed] = useState(false);

  const w = WEATHER_SAMPLE;

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="section-title">🌤️ Weather Information</h1>
        <p className="section-subtitle">Farming-focused weather guidance and irrigation planning</p>
      </div>

      <div className="demo-notice" style={{ marginBottom: '1.25rem' }}>
        <AlertCircle size={14} />
        <div>
          <strong>Sample Data Only:</strong> All weather data shown on this page is <strong>simulated sample data</strong> for demonstration purposes.
          It does not reflect actual weather conditions. Never use this data for real farming decisions.
          For actual weather forecasts, visit the India Meteorological Department (IMD) website or your state agriculture department's advisory service.
        </div>
      </div>

      {/* Location selector */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '160px' }}>
          <label className="form-label">State</label>
          <select className="form-input form-select" value={state} onChange={e => { setState(e.target.value); setDistrict(''); }}>
            {Object.keys(STATES_DISTRICTS).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div style={{ flex: 1, minWidth: '160px' }}>
          <label className="form-label">District</label>
          <select className="form-input form-select" value={district} onChange={e => setDistrict(e.target.value)}>
            <option value="">Select District</option>
            {(STATES_DISTRICTS[state] || []).map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <button className="btn btn-primary" onClick={() => setViewed(true)}>
          View Weather
        </button>
      </div>

      {/* Current Weather */}
      <div className="weather-card" style={{ marginBottom: '1.25rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
          <span style={{ background: 'rgba(255,255,255,0.15)', border: '1px dashed rgba(255,255,255,0.4)', borderRadius: '999px', padding: '0.2rem 0.75rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.9)' }}>
            📋 Sample Data — Not a Real Forecast
          </span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.375rem' }}>
              {district || 'Guntur'}, {state} — {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
            <div style={{ fontSize: '5rem', lineHeight: 1 }}>{w.icon}</div>
          </div>
          <div>
            <div style={{ fontSize: '4rem', fontWeight: 800, fontFamily: 'var(--font-display)', lineHeight: 1 }}>
              {w.temperature}°C
            </div>
            <div style={{ opacity: 0.9, marginBottom: '0.5rem' }}>{w.condition} · Feels like {w.feelsLike}°C</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', flex: 1, minWidth: '200px' }}>
            {[
              { icon: <Droplets size={16} />, label: 'Humidity', value: `${w.humidity}%` },
              { icon: <Wind size={16} />, label: 'Wind', value: `${w.windSpeed} km/h ${w.windDir}` },
              { icon: <CloudRain size={16} />, label: 'Rainfall', value: `${w.rainfall} mm` },
              { icon: <Sun size={16} />, label: 'UV Index', value: `${w.uvIndex} / 11` },
            ].map(stat => (
              <div key={stat.label} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.625rem 0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', opacity: 0.8, fontSize: '0.78rem', marginBottom: '0.2rem' }}>
                  {stat.icon} {stat.label}
                </div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7-day forecast */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
          📅 7-Day Outlook <span className="badge badge-demo" style={{ marginLeft: '0.5rem' }}>Sample Data</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', overflowX: 'auto' }}>
          {w.forecast.map((day, i) => (
            <div key={i} style={{
              background: 'var(--bg-secondary)', borderRadius: '12px', padding: '0.875rem 0.5rem',
              textAlign: 'center', border: i === 0 ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
              minWidth: '80px'
            }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: i === 0 ? 'var(--accent-primary)' : 'var(--text-muted)', marginBottom: '0.5rem' }}>{day.day}</div>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.375rem' }}>{day.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{day.high}°</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{day.low}°</div>
              <div style={{ fontSize: '0.72rem', color: '#60a5fa', marginTop: '0.25rem' }}>💧 {day.rain}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Farming tips */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            🌱 Weather-Based Farming Tips
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {w.farmingTips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'var(--accent-light)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', flexShrink: 0, marginTop: '6px' }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            📋 Week Activity Planner
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {WEEK_TIPS.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.625rem', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-primary)', minWidth: '80px', flexShrink: 0 }}>{t.day}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{t.activity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Irrigation guidance */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
          💧 Irrigation Planning Considerations
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {[
            { icon: '🌧️', title: 'When rainfall is expected', desc: 'Delay irrigation by 2–3 days after significant rainfall. Check soil moisture first.' },
            { icon: '☀️', title: 'During hot and dry periods', desc: 'Increase irrigation frequency. Prefer morning or evening irrigation to reduce evaporation.' },
            { icon: '💨', title: 'High wind conditions', desc: 'Avoid sprinkler irrigation on windy days. Use drip or furrow irrigation instead.' },
            { icon: '🌡️', title: 'Temperature extremes', desc: 'During very high temperatures, light irrigation can reduce heat stress on crops.' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '1rem', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.375rem' }}>{item.title}</div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

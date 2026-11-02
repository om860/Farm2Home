import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, BookOpen, ArrowLeft, ChevronDown, ChevronUp, AlertCircle, Leaf, Clock, Droplets, Thermometer } from 'lucide-react';
import { CROPS_DATA } from '../data/sampleData';
import { useSearch } from '../hooks/useAppState';

function CropCard({ crop }) {
  return (
    <Link
      to={`/crop-library/${crop.id}`}
      className="card card-hover"
      style={{ padding: '1.25rem', textDecoration: 'none', display: 'flex', gap: '1rem', alignItems: 'center' }}
    >
      <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: crop.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0 }}>
        {crop.icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{crop.name}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{crop.hindi} · {crop.category}</div>
        <div style={{ display: 'flex', gap: '0.375rem', marginTop: '0.375rem', flexWrap: 'wrap' }}>
          {crop.seasons.map(s => (
            <span key={s} className={`badge ${s === 'kharif' ? 'badge-green' : s === 'rabi' ? 'badge-yellow' : 'badge-blue'}`}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </span>
          ))}
          <span className="badge badge-gray">{crop.duration}</span>
        </div>
      </div>
    </Link>
  );
}

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="card" style={{ marginBottom: '0.75rem', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1rem 1.25rem', background: 'none', border: 'none', cursor: 'pointer',
          fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)',
          textAlign: 'left'
        }}
      >
        {title}
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && (
        <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid var(--border-color)', marginTop: 0 }}>
          {children}
        </div>
      )}
    </div>
  );
}

function CropDetailPage({ crop }) {
  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <Link to="/crop-library" className="btn btn-ghost btn-sm" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
        <ArrowLeft size={16} /> Back to Crop Library
      </Link>

      <div className="demo-notice" style={{ marginBottom: '1.25rem' }}>
        <AlertCircle size={14} />
        <span><strong>Sample Data:</strong> This crop guide is for general information only. Do not apply fertiliser quantities, pesticide doses or yield estimates without consulting your local KVK or agriculture officer.</span>
      </div>

      {/* Crop header */}
      <div className="card" style={{
        padding: '2rem', marginBottom: '1.5rem',
        background: `linear-gradient(135deg, ${crop.color}22, ${crop.color}11)`,
        border: `2px solid ${crop.color}33`
      }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '18px', background: crop.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            {crop.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.375rem' }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>{crop.name}</h1>
              <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{crop.hindi}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <span className="badge badge-green">{crop.category}</span>
              {crop.seasons.map(s => (
                <span key={s} className={`badge ${s === 'kharif' ? 'badge-green' : s === 'rabi' ? 'badge-yellow' : 'badge-blue'}`}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </span>
              ))}
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{crop.description}</p>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginTop: '1.5rem' }}>
          {[
            { icon: <Clock size={16} />, label: 'Duration', value: crop.duration },
            { icon: <Droplets size={16} />, label: 'Water Req.', value: crop.waterReq },
            { icon: <Thermometer size={16} />, label: 'Temperature', value: crop.tempRange },
            { icon: <Leaf size={16} />, label: 'Seed Rate', value: crop.seedRate.slice(0, 30) + '...' },
          ].map((stat, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '10px', padding: '0.75rem', backdropFilter: 'blur(4px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: crop.color, marginBottom: '0.25rem', fontSize: '0.8rem', fontWeight: 600 }}>
                {stat.icon} {stat.label}
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Varieties */}
      <Accordion title="🌱 Varieties & Seed Selection" defaultOpen>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
          {crop.varieties.map((v, i) => (
            <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '0.875rem', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{v.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{v.notes}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <strong>Seed Rate:</strong> {crop.seedRate}<br />
          <strong>Spacing:</strong> {crop.spacing}<br />
          {crop.nurseryDays && <><strong>Nursery:</strong> {crop.nurseryDays}</>}
        </div>
      </Accordion>

      {/* Sowing Windows */}
      <Accordion title="📅 Sowing Windows by Season">
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {Object.entries(crop.sowingWindow || {}).map(([season, window]) => (
            <div key={season} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <span className={`badge ${season === 'kharif' ? 'badge-green' : season === 'rabi' ? 'badge-yellow' : 'badge-blue'}`} style={{ flexShrink: 0 }}>
                {season.charAt(0).toUpperCase() + season.slice(1)}
              </span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{window}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '0.75rem' }}>
          <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.375rem' }}>Suitable Soil Types:</div>
          <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
            {crop.soilTypes.map(s => <span key={s} className="badge badge-gray">{s}</span>)}
          </div>
        </div>
      </Accordion>

      {/* Growth Stages */}
      <Accordion title="🌿 Growth Stages">
        <div style={{ marginTop: '1rem', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '16px', top: 0, bottom: 0, width: '2px', background: 'var(--border-color)', zIndex: 0 }} />
          {crop.growthStages.map((stage, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #166534, #22c55e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                {i + 1}
              </div>
              <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '0.75rem 1rem', flex: 1, border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{stage.stage}</span>
                  <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>Day {stage.days}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Accordion>

      {/* Diseases */}
      <Accordion title="🔬 Common Diseases">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
          {crop.diseases.map((d, i) => (
            <div key={i} style={{ border: '1px solid #fecaca', borderRadius: '12px', padding: '1rem', background: '#fff5f5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.375rem' }}>
                <span style={{ fontWeight: 700, color: '#991b1b' }}>{d.name}</span>
                <span className="badge badge-red" style={{ fontSize: '0.72rem' }}>{d.pathogen}</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#7f1d1d', marginBottom: '0.375rem' }}><strong>Symptoms:</strong> {d.symptoms}</div>
              <div style={{ fontSize: '0.82rem', color: '#7f1d1d' }}><strong>Management:</strong> {d.management}</div>
            </div>
          ))}
        </div>
        <div className="demo-notice" style={{ marginTop: '0.75rem' }}>
          <AlertCircle size={12} /> Disease management guidance here is general only. Always consult a qualified plant pathologist or KVK for diagnosis and treatment advice.
        </div>
      </Accordion>

      {/* Pests */}
      <Accordion title="🐛 Pest Management">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
          {crop.pests.map((p, i) => (
            <div key={i} style={{ border: '1px solid #fde68a', borderRadius: '12px', padding: '1rem', background: '#fffbeb' }}>
              <span style={{ fontWeight: 700, color: '#92400e', display: 'block', marginBottom: '0.375rem' }}>{p.name}</span>
              <div style={{ fontSize: '0.82rem', color: '#78350f', marginBottom: '0.375rem' }}><strong>Symptoms:</strong> {p.symptoms}</div>
              <div style={{ fontSize: '0.82rem', color: '#78350f' }}><strong>IPM Approach:</strong> {p.ipm}</div>
            </div>
          ))}
        </div>
      </Accordion>

      {/* Irrigation & Harvesting */}
      <Accordion title="💧 Irrigation & Harvesting">
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ background: '#dbeafe', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '1rem' }}>
            <div style={{ fontWeight: 700, color: '#1e40af', marginBottom: '0.375rem' }}>Irrigation</div>
            <p style={{ fontSize: '0.875rem', color: '#1e3a8a' }}>{crop.irrigation}</p>
          </div>
          <div style={{ background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '1rem' }}>
            <div style={{ fontWeight: 700, color: '#166534', marginBottom: '0.375rem' }}>Harvesting</div>
            <p style={{ fontSize: '0.875rem', color: '#14532d' }}>{crop.harvestInfo}</p>
          </div>
        </div>
      </Accordion>

      {/* Yield & Cost notes */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
          ⚠️ Yield & Cost Information — Important Notice
        </h3>
        <div className="alert alert-warning" style={{ marginBottom: '0.75rem' }}>
          <AlertCircle size={16} />
          <span>{crop.yieldNote}</span>
        </div>
        <div className="alert alert-info">
          <AlertCircle size={16} />
          <span>{crop.costNote}</span>
        </div>
      </div>
    </div>
  );
}

export default function CropLibraryPage() {
  const { cropId } = useParams();
  const { query, setQuery, filtered } = useSearch(CROPS_DATA, ['name', 'hindi', 'category', 'seasons', 'states']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSeason, setSelectedSeason] = useState('All');

  const categories = ['All', ...new Set(CROPS_DATA.map(c => c.category))];
  const seasons = ['All', 'kharif', 'rabi', 'zaid'];

  const displayedCrops = filtered
    .filter(c => selectedCategory === 'All' || c.category === selectedCategory)
    .filter(c => selectedSeason === 'All' || c.seasons.includes(selectedSeason));

  if (cropId) {
    const crop = CROPS_DATA.find(c => c.id === cropId);
    if (!crop) return <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>Crop not found. <Link to="/crop-library">Back to Library</Link></div>;
    return <CropDetailPage crop={crop} />;
  }

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="section-title">📚 Crop Library</h1>
        <p className="section-subtitle">Complete cultivation guides for major crops — from sowing to harvest</p>
      </div>

      <div className="demo-notice" style={{ marginBottom: '1.25rem' }}>
        <AlertCircle size={14} />
        <span>All crop guides contain general agricultural information only. Always verify with your local KVK before making cultivation decisions.</span>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="search-bar" style={{ flex: 1, minWidth: '200px' }}>
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search crops..." id="crop-library-search" />
        </div>
        <div className="tabs">
          {categories.map(c => (
            <button key={c} className={`tab ${selectedCategory === c ? 'active' : ''}`} onClick={() => setSelectedCategory(c)}>{c}</button>
          ))}
        </div>
        <div className="tabs">
          {seasons.map(s => (
            <button key={s} className={`tab ${selectedSeason === s ? 'active' : ''}`} onClick={() => setSelectedSeason(s)}>
              {s === 'All' ? 'All Seasons' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {displayedCrops.length > 0 ? (
        <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {displayedCrops.map(crop => <CropCard key={crop.id} crop={crop} />)}
        </div>
      ) : (
        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
          <BookOpen size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
          <p style={{ color: 'var(--text-muted)' }}>No crops found matching your search. Try different filters.</p>
        </div>
      )}
    </div>
  );
}

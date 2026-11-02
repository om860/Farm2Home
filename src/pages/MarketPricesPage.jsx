import { useState } from 'react';
import { AlertCircle, TrendingUp, TrendingDown, Minus, Search, Filter, BarChart2 } from 'lucide-react';
import { MARKET_PRICES, STATES_DISTRICTS } from '../data/sampleData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CROP_LIST = [...new Set(MARKET_PRICES.map(p => p.crop))];

export default function MarketPricesPage() {
  const [filterCrop, setFilterCrop] = useState('');
  const [filterState, setFilterState] = useState('');
  const [sortBy, setSortBy] = useState('crop');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [selectedForChart, setSelectedForChart] = useState([]);

  let filtered = MARKET_PRICES
    .filter(p => !filterCrop || p.crop === filterCrop)
    .filter(p => !filterState || p.state === filterState)
    .filter(p => !search || p.crop.toLowerCase().includes(search.toLowerCase()) || p.mandi.toLowerCase().includes(search.toLowerCase()));

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'modal-asc') return a.modalPrice - b.modalPrice;
    if (sortBy === 'modal-desc') return b.modalPrice - a.modalPrice;
    if (sortBy === 'crop') return a.crop.localeCompare(b.crop);
    return 0;
  });

  const chartData = sorted.map(p => ({
    name: `${p.crop} (${p.mandi.split(' ')[0]})`,
    Min: p.minPrice,
    Modal: p.modalPrice,
    Max: p.maxPrice,
  }));

  const handleToggleChart = (idx) => {
    setSelectedForChart(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="section-title">📊 Market Prices</h1>
        <p className="section-subtitle">Mandi prices and agricultural market information</p>
      </div>

      <div className="demo-notice" style={{ marginBottom: '1.25rem' }}>
        <AlertCircle size={14} />
        <div>
          <strong>Sample Data — Not Official:</strong> All price records shown here are <strong>simulated sample data</strong> for demonstration purposes only.
          They do not represent actual, current or official market prices. For real mandi prices, visit the
          <strong> Agmarket (agmarknet.gov.in)</strong> or your state's agriculture marketing board website.
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid-auto grid-4" style={{ marginBottom: '1.5rem' }}>
        {[
          { label: 'Highest Modal Price', crop: MARKET_PRICES.reduce((a, b) => a.modalPrice > b.modalPrice ? a : b), icon: '⬆️' },
          { label: 'Lowest Modal Price', crop: MARKET_PRICES.reduce((a, b) => a.modalPrice < b.modalPrice ? a : b), icon: '⬇️' },
          { label: 'Latest Records', value: MARKET_PRICES.length, icon: '📋', sub: 'sample records' },
          { label: 'States Covered', value: new Set(MARKET_PRICES.map(p => p.state)).size, icon: '🗺️', sub: 'states in sample' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: '#dcfce7', fontSize: '1.25rem' }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{s.label}</div>
              {s.crop ? (
                <>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-primary)' }}>₹{s.crop.modalPrice.toLocaleString('en-IN')}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.crop.crop}</div>
                </>
              ) : (
                <>
                  <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--accent-primary)' }}>{s.value}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.sub}</div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="search-bar" style={{ flex: 1, minWidth: '160px' }}>
            <Search size={15} style={{ color: 'var(--text-muted)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search crop or mandi..." id="market-search" />
          </div>
          <select className="form-input form-select" style={{ maxWidth: '180px', fontSize: '0.85rem' }} value={filterCrop} onChange={e => setFilterCrop(e.target.value)}>
            <option value="">All Crops</option>
            {CROP_LIST.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="form-input form-select" style={{ maxWidth: '200px', fontSize: '0.85rem' }} value={filterState} onChange={e => setFilterState(e.target.value)}>
            <option value="">All States</option>
            {Object.keys(STATES_DISTRICTS).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="form-input form-select" style={{ maxWidth: '160px', fontSize: '0.85rem' }} value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="crop">Sort by Crop</option>
            <option value="modal-desc">Modal Price ↓</option>
            <option value="modal-asc">Modal Price ↑</option>
          </select>
          <div className="tabs">
            <button className={`tab ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}>Table</button>
            <button className={`tab ${viewMode === 'chart' ? 'active' : ''}`} onClick={() => setViewMode('chart')}>Chart</button>
            <button className={`tab ${viewMode === 'cards' ? 'active' : ''}`} onClick={() => setViewMode('cards')}>Cards</button>
          </div>
        </div>
      </div>

      {/* Table view */}
      {viewMode === 'table' && (
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)' }}>
                  {['Crop', 'Mandi / Market', 'State', 'District', 'Min Price', 'Max Price', 'Modal Price', 'Date', 'Source'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((p, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{p.crop}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{p.mandi}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{p.state}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>{p.district}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>₹{p.minPrice.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>₹{p.maxPrice.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 800, color: '#166534', fontSize: '0.95rem' }}>₹{p.modalPrice.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{p.date}</td>
                    <td style={{ padding: '0.75rem 1rem' }}><span className="badge badge-demo" style={{ fontSize: '0.68rem' }}>{p.source.split(' — ')[1]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Chart view */}
      {viewMode === 'chart' && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Price Comparison Chart <span className="badge badge-demo">Sample Data</span>
          </h2>
          <div style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.slice(0, 8)} margin={{ top: 10, right: 20, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" angle={-35} textAnchor="end" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(val, name) => [`₹${val.toLocaleString('en-IN')}`, name]} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="Min" fill="#bbf7d0" radius={[4,4,0,0]} />
                <Bar dataKey="Modal" fill="#22c55e" radius={[4,4,0,0]} />
                <Bar dataKey="Max" fill="#166534" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Cards view */}
      {viewMode === 'cards' && (
        <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {sorted.map((p, i) => (
            <div key={i} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{p.crop}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.mandi}</div>
                </div>
                <span className="badge badge-demo" style={{ fontSize: '0.7rem' }}>Sample</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.375rem', marginBottom: '0.75rem' }}>
                {[
                  { label: 'Min', value: p.minPrice, color: 'var(--text-muted)' },
                  { label: 'Modal', value: p.modalPrice, color: '#166534' },
                  { label: 'Max', value: p.maxPrice, color: 'var(--text-secondary)' },
                ].map(item => (
                  <div key={item.label} style={{ textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '8px', padding: '0.5rem' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>{item.label}</div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: item.color }}>₹{(item.value/1000).toFixed(1)}k</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {p.state} · {p.date}
              </div>
            </div>
          ))}
        </div>
      )}

      {sorted.length === 0 && (
        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>No results match your filters. Try different search terms.</p>
        </div>
      )}
    </div>
  );
}

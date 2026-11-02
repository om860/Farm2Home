import { useState } from 'react';
import { AlertCircle, Beaker, ChevronDown, ChevronUp } from 'lucide-react';
import { CROPS_DATA, FERTILIZER_GUIDE } from '../data/sampleData';

const GROWTH_STAGES = [
  "Pre-sowing / Land preparation", "Sowing / Transplanting",
  "Vegetative (early)", "Vegetative (late)", "Flowering", "Fruiting / Grain fill", "Pre-harvest"
];

function StageCard({ stage }) {
  return (
    <div style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', background: 'var(--bg-secondary)' }}>
      <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{stage.stage}</div>
      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.375rem' }}><strong>Nutrients:</strong> {stage.nutrients}</div>
      {stage.note && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{stage.note}</div>}
    </div>
  );
}

export default function FertilizerPage() {
  const [form, setForm] = useState({ crop: '', stage: '', area: '', soilTest: false });
  const [results, setResults] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.crop) return;
    const cropKey = form.crop.toLowerCase().replace(/[^a-z]/g, '');
    const guide = FERTILIZER_GUIDE[cropKey] || FERTILIZER_GUIDE.wheat;
    const cropData = CROPS_DATA.find(c => c.name.toLowerCase().includes(form.crop.toLowerCase()));
    setResults({ guide, cropData, form: { ...form } });
    setTimeout(() => document.getElementById('fertilizer-results')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const areaNum = parseFloat(form.area) || 0;

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="section-title">🧪 Fertilizer Guidance</h1>
        <p className="section-subtitle">Soil health and nutrient management guidance for your crops</p>
      </div>

      <div className="demo-notice" style={{ marginBottom: '1.25rem' }}>
        <AlertCircle size={14} />
        <div>
          <strong>Important:</strong> This tool provides <strong>general guidance only</strong>. Do not apply fertilisers based solely on this information.
          Exact quantities should always be based on a verified soil test result and guidance from your local KVK or agriculture officer.
          This platform does not provide specific fertiliser dosage recommendations.
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
            📋 Crop & Field Details
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label className="form-label">Crop *</label>
              <select className="form-input form-select" value={form.crop} onChange={e => setForm(f => ({ ...f, crop: e.target.value }))} required>
                <option value="">Select Crop</option>
                {CROPS_DATA.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Growth Stage</label>
              <select className="form-input form-select" value={form.stage} onChange={e => setForm(f => ({ ...f, stage: e.target.value }))}>
                <option value="">Select Stage</option>
                {GROWTH_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Land Area (acres)</label>
              <input className="form-input" type="number" min="0" step="0.1" value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} placeholder="e.g. 2.5" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1.5rem' }}>
              <input type="checkbox" id="soil-test-checkbox" checked={form.soilTest} onChange={e => setForm(f => ({ ...f, soilTest: e.target.checked }))} style={{ width: '16px', height: '16px', accentColor: '#166534' }} />
              <label htmlFor="soil-test-checkbox" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                I have recent soil test results
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg">
          <Beaker size={18} /> Get Fertilizer Guidance
        </button>
      </form>

      {/* Results */}
      {results && (
        <div id="fertilizer-results" style={{ marginTop: '2rem', animation: 'fadeInUp 0.4s ease' }}>
          <div className="demo-notice" style={{ marginBottom: '1.25rem' }}>
            <AlertCircle size={14} />
            <span>{results.guide.disclaimer}</span>
          </div>

          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Fertilizer Guidance for {results.form.crop}
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>{results.guide.general}</p>

            {/* NPK overview */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {[
                { nutrient: 'Nitrogen (N)', level: results.guide.npk.n, color: '#166534', bg: '#dcfce7' },
                { nutrient: 'Phosphorus (P)', level: results.guide.npk.p, color: '#0369a1', bg: '#dbeafe' },
                { nutrient: 'Potassium (K)', level: results.guide.npk.k, color: '#d97706', bg: '#fef3c7' },
              ].map((n, i) => (
                <div key={i} style={{ background: n.bg, borderRadius: '12px', padding: '1rem', textAlign: 'center', border: `1px solid ${n.color}22` }}>
                  <div style={{ fontWeight: 800, fontSize: '1.25rem', color: n.color, marginBottom: '0.25rem' }}>{n.nutrient.split(' ')[0]}</div>
                  <div style={{ fontSize: '0.8rem', color: n.color, fontWeight: 600 }}>{n.level}</div>
                  <div style={{ fontSize: '0.72rem', color: n.color, opacity: 0.8 }}>{n.nutrient}</div>
                </div>
              ))}
            </div>

            {/* Application stages */}
            <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              📋 Application Stages (General Guidance)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
              {results.guide.stages.map((stage, i) => <StageCard key={i} stage={stage} />)}
            </div>

            {/* Soil test recommendation */}
            <div className="alert alert-success">
              <Beaker size={16} />
              <div>
                <strong>Soil Test Recommendation:</strong> {results.guide.soilTest}
                {!results.form.soilTest && ' You have indicated you do not have a recent soil test. We strongly recommend getting one before applying fertilisers.'}
              </div>
            </div>
          </div>

          {/* Area calculator */}
          {areaNum > 0 && (
            <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                📐 Area Converter
              </h3>
              <div className="demo-notice" style={{ marginBottom: '1rem' }}>
                <AlertCircle size={12} /> Area calculations only. No fertiliser quantities provided — these must come from a soil test and KVK guidance.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
                {[
                  { label: 'Acres', value: areaNum.toFixed(2) },
                  { label: 'Hectares', value: (areaNum * 0.4047).toFixed(3) },
                  { label: 'Square Metres', value: (areaNum * 4046.86).toFixed(0) },
                  { label: 'Bigha (approx.)', value: (areaNum * 1.6).toFixed(2) + ' *' },
                ].map(item => (
                  <div key={item.label} style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '0.875rem', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{item.value}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.label}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>* Bigha size varies by state. Consult local records.</p>
            </div>
          )}

          {/* Soil health guidance */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              🌱 General Soil Health Guidance
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
              {[
                { title: 'Organic Matter', desc: 'Add well-decomposed farmyard manure (FYM) or compost before planting to improve soil structure and slow-release nutrient supply.' },
                { title: 'pH Management', desc: 'Most crops prefer soil pH 6.0–7.5. Apply lime to raise pH (acidic soils) or sulfur to lower pH (alkaline soils) — only after soil test.' },
                { title: 'Balanced Fertilisation', desc: 'Avoid excess nitrogen — it promotes vegetative growth at the expense of fruiting and increases pest susceptibility.' },
                { title: 'Irrigation & Nutrition', desc: 'Nutrient uptake depends on adequate soil moisture. Drip fertigation can improve nutrient use efficiency significantly.' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '1rem', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.375rem', fontSize: '0.9rem' }}>{item.title}</div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

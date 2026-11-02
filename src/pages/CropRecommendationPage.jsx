import { useState } from 'react';
import { AlertCircle, Sprout, CheckCircle, BookOpen, Info, Download, Save } from 'lucide-react';
import { STATES_DISTRICTS, SOIL_TYPES, SEASONS, CROP_RECOMMENDATIONS_LOGIC, CROPS_DATA } from '../data/sampleData';
import { useSaved } from '../hooks/useAppState';

const IRRIGATIONS = ["Rainfed (No Irrigation)", "Well Irrigation", "Borewell / Tubewell", "Canal Irrigation", "Drip Irrigation", "Sprinkler Irrigation"];

export default function CropRecommendationPage() {
  const { savePlan } = useSaved();
  const [form, setForm] = useState({
    state: '', district: '', village: '', sowDate: '', area: '',
    crop: '', soilType: '', soilPH: '', nitrogen: '', phosphorus: '', potassium: '',
    temperature: '', humidity: '', rainfall: '', irrigation: '', season: '',
  });
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.state) e.state = 'Please select a state';
    if (!form.district) e.district = 'Please select a district';
    if (!form.season) e.season = 'Please select a season';
    if (!form.soilType) e.soilType = 'Please select soil type';
    if (form.area && isNaN(form.area)) e.area = 'Area must be a number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaved(false);

    const seasonData = CROP_RECOMMENDATIONS_LOGIC[form.season]?.[form.state];
    const primaryCrops = seasonData?.primary || [];

    // Filter by soil compatibility if crop data available
    const matchedCrops = primaryCrops.map(cropName => {
      const data = CROPS_DATA.find(c => c.name.toLowerCase().includes(cropName.toLowerCase()) || cropName.toLowerCase().includes(c.name.toLowerCase().split('/')[0]));
      const soilMatch = data ? data.soilTypes.includes(form.soilType) : null;
      return { name: cropName, data, soilMatch };
    });

    const missing = [];
    if (!form.soilPH) missing.push("Soil pH");
    if (!form.nitrogen || !form.phosphorus || !form.potassium) missing.push("NPK soil test values");
    if (!form.temperature) missing.push("Current temperature");
    if (!form.humidity) missing.push("Humidity information");
    if (!form.rainfall) missing.push("Expected rainfall");

    setResults({ form: { ...form }, matchedCrops, missing, seasonNote: seasonData?.note || '' });
    setTimeout(() => document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleSave = () => {
    if (results) {
      savePlan({ ...results.form, crops: results.matchedCrops.map(c => c.name) });
      setSaved(true);
    }
  };

  const handlePrint = () => window.print();

  const seasonLabel = SEASONS.find(s => s.value === form.season)?.label || '';

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="section-title">🌱 Crop Recommendation</h1>
        <p className="section-subtitle">Enter your farm details to get season and location-based crop suggestions</p>
      </div>

      <div className="demo-notice" style={{ marginBottom: '1.25rem' }}>
        <AlertCircle size={14} />
        <div>
          <strong>Sample Data Notice:</strong> Crop suggestions shown here are based on general regional patterns and are for demonstration only.
          They do not constitute verified agricultural advice. Always consult your local Krishi Vigyan Kendra (KVK) or agriculture officer for your specific farm conditions.
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Location */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📍 Location Details
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label className="form-label">State *</label>
              <select className="form-input form-select" value={form.state} onChange={e => { handleChange('state', e.target.value); handleChange('district', ''); }}>
                <option value="">Select State</option>
                {Object.keys(STATES_DISTRICTS).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.state && <div style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.state}</div>}
            </div>
            <div>
              <label className="form-label">District *</label>
              <select className="form-input form-select" value={form.district} onChange={e => handleChange('district', e.target.value)} disabled={!form.state}>
                <option value="">Select District</option>
                {(STATES_DISTRICTS[form.state] || []).map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {errors.district && <div style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.district}</div>}
            </div>
            <div>
              <label className="form-label">Village / Local Area (Optional)</label>
              <input className="form-input" value={form.village} onChange={e => handleChange('village', e.target.value)} placeholder="e.g. Narasaraopet" />
            </div>
            <div>
              <label className="form-label">Land Area (acres)</label>
              <input className="form-input" type="number" min="0" step="0.1" value={form.area} onChange={e => handleChange('area', e.target.value)} placeholder="e.g. 2.5" />
              {errors.area && <div style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.area}</div>}
            </div>
          </div>
        </div>

        {/* Season & Planning */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📅 Season & Planning
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label className="form-label">Season *</label>
              <select className="form-input form-select" value={form.season} onChange={e => handleChange('season', e.target.value)}>
                <option value="">Select Season</option>
                {SEASONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              {errors.season && <div style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.season}</div>}
            </div>
            <div>
              <label className="form-label">Intended Sowing Date</label>
              <input className="form-input" type="date" value={form.sowDate} onChange={e => handleChange('sowDate', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Specific Crop Interest (Optional)</label>
              <input className="form-input" value={form.crop} onChange={e => handleChange('crop', e.target.value)} placeholder="Leave blank for suggestions" />
            </div>
          </div>
        </div>

        {/* Soil Information */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
            🌍 Soil Information
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div>
              <label className="form-label">Soil Type *</label>
              <select className="form-input form-select" value={form.soilType} onChange={e => handleChange('soilType', e.target.value)}>
                <option value="">Select Soil Type</option>
                {SOIL_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.soilType && <div style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.soilType}</div>}
            </div>
            <div>
              <label className="form-label">Soil pH (Optional)</label>
              <input className="form-input" type="number" step="0.1" min="4" max="9" value={form.soilPH} onChange={e => handleChange('soilPH', e.target.value)} placeholder="e.g. 6.5" />
            </div>
            <div>
              <label className="form-label">Nitrogen kg/ha (Optional)</label>
              <input className="form-input" type="number" value={form.nitrogen} onChange={e => handleChange('nitrogen', e.target.value)} placeholder="From soil test" />
            </div>
            <div>
              <label className="form-label">Phosphorus kg/ha (Optional)</label>
              <input className="form-input" type="number" value={form.phosphorus} onChange={e => handleChange('phosphorus', e.target.value)} placeholder="From soil test" />
            </div>
            <div>
              <label className="form-label">Potassium kg/ha (Optional)</label>
              <input className="form-input" type="number" value={form.potassium} onChange={e => handleChange('potassium', e.target.value)} placeholder="From soil test" />
            </div>
            <div>
              <label className="form-label">Irrigation Availability</label>
              <select className="form-input form-select" value={form.irrigation} onChange={e => handleChange('irrigation', e.target.value)}>
                <option value="">Select</option>
                {IRRIGATIONS.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Weather (optional) */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            🌤️ Weather Conditions (Optional)
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>If known, this helps refine suggestions.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
            <div>
              <label className="form-label">Avg. Temperature (°C)</label>
              <input className="form-input" type="number" value={form.temperature} onChange={e => handleChange('temperature', e.target.value)} placeholder="e.g. 28" />
            </div>
            <div>
              <label className="form-label">Avg. Humidity (%)</label>
              <input className="form-input" type="number" value={form.humidity} onChange={e => handleChange('humidity', e.target.value)} placeholder="e.g. 70" />
            </div>
            <div>
              <label className="form-label">Expected Rainfall (mm)</label>
              <input className="form-input" type="number" value={form.rainfall} onChange={e => handleChange('rainfall', e.target.value)} placeholder="e.g. 600" />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button type="submit" className="btn btn-primary btn-lg">
            <Sprout size={18} /> Get Crop Recommendations
          </button>
          <button type="button" className="btn btn-ghost btn-lg" onClick={() => { setForm({ state: '', district: '', village: '', sowDate: '', area: '', crop: '', soilType: '', soilPH: '', nitrogen: '', phosphorus: '', potassium: '', temperature: '', humidity: '', rainfall: '', irrigation: '', season: '' }); setResults(null); setSaved(false); }}>
            Clear Form
          </button>
        </div>
      </form>

      {/* Results */}
      {results && (
        <div id="results-section" style={{ marginTop: '2rem', animation: 'fadeInUp 0.4s ease' }}>
          <div className="demo-notice" style={{ marginBottom: '1.25rem' }}>
            <AlertCircle size={14} />
            <span>Results below are based on <strong>sample regional data</strong> and general agricultural patterns. They are for <strong>demonstration only</strong>. Do not make planting decisions based solely on this output. Consult your local KVK.</span>
          </div>

          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h2 style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                  Recommendations for {results.form.district}, {results.form.state}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  Season: {seasonLabel} · Soil: {results.form.soilType} {results.form.area && `· Area: ${results.form.area} acres`}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary btn-sm" onClick={handleSave} disabled={saved}>
                  <Save size={14} /> {saved ? 'Saved!' : 'Save Plan'}
                </button>
                <button className="btn btn-ghost btn-sm" onClick={handlePrint}>
                  <Download size={14} /> Print
                </button>
              </div>
            </div>

            {results.matchedCrops.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                {results.matchedCrops.map((item, i) => {
                  const crop = item.data;
                  const sowWindow = crop?.sowingWindow?.[results.form.season];
                  return (
                    <div key={i} className="card" style={{ padding: '1.25rem', border: '2px solid var(--border-color)', transition: 'all 0.2s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                          <span style={{ fontSize: '1.75rem' }}>{crop?.icon || '🌱'}</span>
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.name}</div>
                            {crop && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{crop.category}</div>}
                          </div>
                        </div>
                        {item.soilMatch === true && <span className="badge badge-green"><CheckCircle size={10} /> Soil ✓</span>}
                        {item.soilMatch === false && <span className="badge badge-yellow">Soil check needed</span>}
                      </div>

                      {crop && (
                        <>
                          {sowWindow && (
                            <div style={{ background: 'var(--accent-light)', borderRadius: '8px', padding: '0.5rem 0.75rem', marginBottom: '0.5rem', fontSize: '0.82rem', color: 'var(--accent-primary)' }}>
                              📅 Sowing Window: {sowWindow}
                            </div>
                          )}
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.375rem', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Duration:</span><span style={{ color: 'var(--text-primary)' }}>{crop.duration}</span>
                            <span style={{ color: 'var(--text-muted)' }}>Temperature:</span><span style={{ color: 'var(--text-primary)' }}>{crop.tempRange}</span>
                            <span style={{ color: 'var(--text-muted)' }}>Water Req:</span><span style={{ color: 'var(--text-primary)' }}>{crop.waterReq}</span>
                          </div>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                            {crop.description.slice(0, 120)}...
                          </p>
                        </>
                      )}
                      <span className="badge badge-demo">📋 Sample Suggestion</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="alert alert-warning">
                <Info size={16} />
                <span>No sample data available for {results.form.state} in {seasonLabel} season. Please contact your local KVK for accurate regional crop recommendations.</span>
              </div>
            )}
          </div>

          {/* Missing info */}
          {results.missing.length > 0 && (
            <div className="card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                ℹ️ Additional Information That Would Improve Recommendations
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {results.missing.map(m => (
                  <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }} />
                    {m}
                  </div>
                ))}
              </div>
              <p style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                For precise recommendations, get your soil tested at the nearest KVK or Soil Testing Laboratory.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

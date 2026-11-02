import { useState } from 'react';
import { AlertCircle, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { CROPS_DATA, PESTS_DISEASES, STATES_DISTRICTS } from '../data/sampleData';

const GROWTH_STAGES = [
  "Seedling / Nursery", "Vegetative (early)", "Vegetative (late)",
  "Flowering", "Fruiting / Pod fill", "Pre-harvest"
];

const TREATMENT_HISTORY = [
  { date: "Oct 15", product: "Yellow sticky traps", pest: "Thrips", result: "Moderate reduction" },
  { date: "Oct 08", product: "Neem oil spray", pest: "Whitefly", result: "Good control" },
];

function InfoBox({ color, bg, title, children }) {
  return (
    <div style={{ border: `1px solid ${color}33`, borderRadius: '12px', padding: '1rem', background: bg }}>
      <div style={{ fontWeight: 700, color, marginBottom: '0.5rem', fontSize: '0.9rem' }}>{title}</div>
      {children}
    </div>
  );
}

export default function PesticidePlannerPage() {
  const [form, setForm] = useState({
    state: '', district: '', crop: '', stage: '', area: '',
    pest: '', symptoms: '', previousTreatment: '', lastApplicationDate: '',
  });
  const [results, setResults] = useState(null);
  const [treatmentHistory, setTreatmentHistory] = useState(TREATMENT_HISTORY);
  const [showHistory, setShowHistory] = useState(false);
  const [followUpNote, setFollowUpNote] = useState('');

  const matchedPestData = PESTS_DISEASES.find(p =>
    p.name.toLowerCase().includes(form.pest?.toLowerCase()) ||
    form.pest?.toLowerCase().includes(p.name.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (!form.crop && !form.pest) return;
    setResults({ form: { ...form }, matchedPestData });
    setTimeout(() => document.getElementById('pesticide-results')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const areaNum = parseFloat(form.area) || 0;

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="section-title">🛡️ Pesticide & Crop Protection Planner</h1>
        <p className="section-subtitle">Responsible crop protection guidance following IPM principles</p>
      </div>

      <div className="demo-notice" style={{ marginBottom: '1rem' }}>
        <AlertCircle size={14} />
        <div>
          <strong>Critical Notice:</strong> This tool provides <strong>general IPM and crop protection information only</strong>.
          It does NOT provide specific pesticide names, doses, mixing instructions, or application schedules.
          Do not apply any pesticide without: (1) correctly identifying the pest/disease, (2) consulting the registered product label,
          and (3) getting advice from your local KVK or agriculture officer.
        </div>
      </div>

      <div className="alert alert-warning" style={{ marginBottom: '1.25rem' }}>
        <Shield size={16} />
        <div>
          Pesticide recommendations must be based on: <strong>confirmed pest identity · crop growth stage · local registration · product label · economic threshold</strong>.
          Never spray on a fixed schedule without confirming active pest pressure.
        </div>
      </div>

      <form onSubmit={handleSearch}>
        {/* Location & Crop */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
            📍 Location & Crop Details
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div>
              <label className="form-label">State</label>
              <select className="form-input form-select" value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value, district: '' }))}>
                <option value="">Select State</option>
                {Object.keys(STATES_DISTRICTS).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">District</label>
              <select className="form-input form-select" value={form.district} onChange={e => setForm(f => ({ ...f, district: e.target.value }))} disabled={!form.state}>
                <option value="">Select District</option>
                {(STATES_DISTRICTS[form.state] || []).map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Crop *</label>
              <select className="form-input form-select" value={form.crop} onChange={e => setForm(f => ({ ...f, crop: e.target.value }))}>
                <option value="">Select Crop</option>
                {CROPS_DATA.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                <option value="Other">Other</option>
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
              <input className="form-input" type="number" min="0" step="0.1" value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} placeholder="e.g. 2.0" />
            </div>
          </div>
        </div>

        {/* Problem description */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
            🔍 Problem Description
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label className="form-label">Pest or Disease Name *</label>
              <select className="form-input form-select" value={form.pest} onChange={e => setForm(f => ({ ...f, pest: e.target.value }))}>
                <option value="">Select / Search</option>
                {PESTS_DISEASES.map(p => <option key={p.id} value={p.name}>{p.name} ({p.type})</option>)}
                <option value="Unknown">Unknown — Need help identifying</option>
              </select>
            </div>
            <div>
              <label className="form-label">Date of Last Application (if any)</label>
              <input className="form-input" type="date" value={form.lastApplicationDate} onChange={e => setForm(f => ({ ...f, lastApplicationDate: e.target.value }))} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Describe Symptoms & Field Observations</label>
              <textarea className="form-input form-textarea" value={form.symptoms} onChange={e => setForm(f => ({ ...f, symptoms: e.target.value }))} placeholder="Describe what you observe — leaf colour, affected plant parts, distribution in field, % plants affected..." id="pest-symptoms-input" />
            </div>
            <div>
              <label className="form-label">Previous Treatment Details (Optional)</label>
              <input className="form-input" value={form.previousTreatment} onChange={e => setForm(f => ({ ...f, previousTreatment: e.target.value }))} placeholder="What was applied before?" />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg" disabled={!form.crop && !form.pest}>
          <Shield size={18} /> Get Guidance
        </button>
      </form>

      {/* Results */}
      {results && (
        <div id="pesticide-results" style={{ marginTop: '2rem', animation: 'fadeInUp 0.4s ease' }}>
          <div className="demo-notice" style={{ marginBottom: '1.25rem' }}>
            <AlertCircle size={14} />
            <span>All guidance below is <strong>general information only</strong>. No specific product, dose, or mixing instruction is provided. Consult your local KVK.</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <InfoBox color="#166534" bg="#dcfce7" title="✅ Step 1 — Before Anything Else">
              <ul style={{ fontSize: '0.875rem', lineHeight: 1.8, color: '#14532d', paddingLeft: '1.25rem' }}>
                <li>Correctly identify the pest or disease (consult KVK if unsure)</li>
                <li>Assess how many plants are affected and the severity</li>
                <li>Determine if the problem has crossed the economic threshold</li>
                <li>Check if natural enemies are present and providing control</li>
              </ul>
            </InfoBox>

            <InfoBox color="#0369a1" bg="#dbeafe" title="🌿 Step 2 — Try Non-Chemical Options First">
              {results.matchedPestData ? (
                <div style={{ fontSize: '0.875rem', lineHeight: 1.8, color: '#1e40af' }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.375rem' }}>For {results.matchedPestData.name}:</div>
                  <p>{results.matchedPestData.prevention}</p>
                  {results.matchedPestData.type === 'pest' && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <strong>IPM Notes:</strong><br />
                      Use traps, adjust irrigation, and conserve natural enemies before considering sprays.
                    </div>
                  )}
                </div>
              ) : (
                <ul style={{ fontSize: '0.875rem', lineHeight: 1.8, color: '#1e40af', paddingLeft: '1.25rem' }}>
                  <li>Use sticky traps to monitor and reduce pest numbers</li>
                  <li>Remove and destroy heavily infected plants</li>
                  <li>Adjust irrigation to reduce disease-conducive conditions</li>
                  <li>Consult KVK for crop-specific non-chemical controls</li>
                </ul>
              )}
            </InfoBox>

            <InfoBox color="#d97706" bg="#fef3c7" title="⚗️ Step 3 — Chemical Control (If Needed)">
              <div style={{ fontSize: '0.875rem', lineHeight: 1.8, color: '#92400e' }}>
                <p style={{ fontWeight: 700, marginBottom: '0.375rem' }}>⚠️ This platform does NOT provide specific pesticide recommendations.</p>
                <p>For registered product options:</p>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.375rem' }}>
                  <li>Contact your local KVK or agriculture officer</li>
                  <li>Consult a licensed pesticide retailer with the product label</li>
                  <li>Check Central Insecticides Board (CIB) registrations</li>
                  <li>Always follow the registered product label exactly</li>
                </ul>
              </div>
            </InfoBox>

            <InfoBox color="#dc2626" bg="#fee2e2" title="🦺 Personal Protective Equipment">
              <ul style={{ fontSize: '0.875rem', lineHeight: 1.8, color: '#991b1b', paddingLeft: '1.25rem' }}>
                <li>Chemical-resistant gloves</li>
                <li>Full-sleeve protective clothing</li>
                <li>Face mask / respirator</li>
                <li>Protective goggles</li>
                <li>Rubber boots</li>
                <li>Never spray in strong wind or during peak heat</li>
                <li>Wash hands and face thoroughly after application</li>
              </ul>
            </InfoBox>
          </div>

          {/* Area note */}
          {areaNum > 0 && (
            <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                📐 Land Area: {areaNum} acres = {(areaNum * 0.4047).toFixed(3)} hectares
              </h3>
              <div className="alert alert-warning">
                <AlertCircle size={14} />
                <span>Application quantity calculations are not provided. Tank mix volumes and product doses must be calculated from the registered product label by a qualified person.</span>
              </div>
            </div>
          )}

          {/* Treatment history */}
          <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
            <button
              onClick={() => setShowHistory(!showHistory)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}
            >
              📋 Treatment History & Reminders
              {showHistory ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {showHistory && (
              <div style={{ marginTop: '1rem' }}>
                <div className="demo-notice" style={{ marginBottom: '0.75rem' }}>
                  <AlertCircle size={12} /> Sample treatment history for demonstration only.
                </div>
                {treatmentHistory.map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '10px', border: '1px solid var(--border-color)', marginBottom: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className="badge badge-gray">{t.date}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{t.product}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Target: {t.pest} · Result: {t.result}</div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: '1rem' }}>
                  <label className="form-label">Add Follow-up Note</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input className="form-input" value={followUpNote} onChange={e => setFollowUpNote(e.target.value)} placeholder="Note for next field inspection..." id="followup-note-input" />
                    <button type="button" className="btn btn-secondary" onClick={() => {
                      if (followUpNote.trim()) {
                        setTreatmentHistory(h => [{ date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), product: followUpNote, pest: results.form.pest || results.form.crop, result: 'Pending' }, ...h]);
                        setFollowUpNote('');
                      }
                    }}>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* KVK referral */}
          <div className="card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #dcfce7, #f0fdf4)', border: '2px solid #bbf7d0' }}>
            <h3 style={{ fontWeight: 700, color: '#166534', marginBottom: '0.75rem' }}>🏛️ Get Verified Guidance</h3>
            <p style={{ fontSize: '0.875rem', color: '#166534', lineHeight: 1.7, marginBottom: '0.75rem' }}>
              For crop-specific, region-specific and verified crop protection advice:
            </p>
            <ul style={{ fontSize: '0.875rem', color: '#166534', lineHeight: 2, paddingLeft: '1.25rem' }}>
              <li><strong>Krishi Vigyan Kendra (KVK)</strong> — Your nearest KVK can conduct field visits and provide accurate guidance</li>
              <li><strong>State Agriculture Department</strong> — For state-registered product lists and approved doses</li>
              <li><strong>Licensed Pesticide Retailer</strong> — Can advise on registered products with the product label</li>
              <li><strong>Central Insecticides Board (CIB)</strong> — For registered pesticides list: cibrc.nic.in</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

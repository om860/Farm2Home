import { useState, useRef } from 'react';
import { AlertCircle, Upload, X, Bug, Save, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { CROPS_DATA, PESTS_DISEASES } from '../data/sampleData';
import { useSaved } from '../hooks/useAppState';

const GROWTH_STAGES = [
  "Seedling / Nursery", "Vegetative (early)", "Vegetative (late)",
  "Flowering / Bud stage", "Fruiting / Pod fill", "Pre-harvest", "Post-harvest"
];

export default function CropDiseasePage() {
  const { saveObservation } = useSaved();
  const [form, setForm] = useState({ crop: '', stage: '', symptoms: '', onset: '' });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [results, setResults] = useState(null);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef();

  const handleImage = (file) => {
    if (!file) return;
    setImage(file);
    const reader = new FileReader();
    reader.onload = e => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleImage(file);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!form.crop && !form.symptoms) return;

    // Match pests/diseases by crop and symptoms keywords
    const cropData = CROPS_DATA.find(c => c.name.toLowerCase().includes(form.crop.toLowerCase()) || c.id === form.crop);
    const matchedPests = PESTS_DISEASES.filter(p =>
      (!form.crop || p.crops.some(c => c.toLowerCase().includes(form.crop.toLowerCase()))) &&
      (!form.symptoms || p.symptoms.toLowerCase().includes(form.symptoms.toLowerCase().split(' ')[0]))
    );

    const cropDiseases = cropData?.diseases || [];
    const cropPests = cropData?.pests || [];

    setResults({ cropData, matchedPests, cropDiseases, cropPests, form: { ...form } });
    setSaved(false);
    setTimeout(() => document.getElementById('disease-results')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleSave = () => {
    if (results) {
      saveObservation({ crop: results.form.crop, stage: results.form.stage, symptoms: results.form.symptoms, onset: results.form.onset });
      setSaved(true);
    }
  };

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="section-title">🔬 Crop Disease & Pest Support</h1>
        <p className="section-subtitle">Describe your crop's symptoms and find possible causes and preventive guidance</p>
      </div>

      <div className="demo-notice" style={{ marginBottom: '1.25rem' }}>
        <AlertCircle size={14} />
        <div>
          <strong>Important Notice:</strong> This tool does <strong>not</strong> perform real AI-based disease detection.
          It shows general information based on your inputs. For accurate diagnosis, always consult a qualified plant pathologist,
          agricultural officer, or your nearest Krishi Vigyan Kendra (KVK).
        </div>
      </div>

      <form onSubmit={handleSearch}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
          {/* Form */}
          <div className="card" style={{ padding: '1.5rem', gridColumn: '1 / -1' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              📝 Describe the Problem
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label className="form-label">Crop Name *</label>
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
                <label className="form-label">When Did Symptoms Start?</label>
                <input className="form-input" type="date" value={form.onset} onChange={e => setForm(f => ({ ...f, onset: e.target.value }))} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Describe Visible Symptoms *</label>
                <textarea
                  className="form-input form-textarea"
                  value={form.symptoms}
                  onChange={e => setForm(f => ({ ...f, symptoms: e.target.value }))}
                  placeholder="e.g. Yellow leaves, dark spots on fruits, curling leaves, wilting, holes in leaves..."
                  id="symptoms-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            📸 Upload Field Photo (Optional)
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Upload a photo of the affected leaf or plant. Note: No automated analysis is performed in this demo — the image is for your reference only.
          </p>

          {!imagePreview ? (
            <div
              className="upload-zone"
              onClick={() => fileRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              id="image-upload-zone"
            >
              <Upload size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
              <div style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.375rem' }}>
                Click to upload or drag and drop
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>JPG, PNG, WEBP — max 10MB</div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleImage(e.target.files[0])} id="crop-image-input" />
            </div>
          ) : (
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img src={imagePreview} alt="Uploaded crop" style={{ maxHeight: '240px', maxWidth: '100%', borderRadius: '12px', border: '2px solid var(--border-color)', objectFit: 'cover' }} />
              <button
                type="button"
                onClick={() => { setImage(null); setImagePreview(null); }}
                style={{ position: 'absolute', top: '8px', right: '8px', background: '#dc2626', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
              <div className="demo-notice" style={{ marginTop: '0.75rem', maxWidth: '400px' }}>
                <AlertCircle size={12} /> Image uploaded for reference. No automated analysis is performed in this demo version.
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary btn-lg" disabled={!form.crop && !form.symptoms} id="disease-search-btn">
          <Search size={18} /> Find Possible Causes
        </button>
      </form>

      {/* Results */}
      {results && (
        <div id="disease-results" style={{ marginTop: '2rem', animation: 'fadeInUp 0.4s ease' }}>
          <div className="demo-notice" style={{ marginBottom: '1.25rem' }}>
            <AlertCircle size={14} />
            <span>The information below is <strong>general guidance only</strong> — not a diagnosis. Multiple diseases/pests can cause similar symptoms. Consult a qualified expert for diagnosis and management advice.</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
              Possible Causes for {results.form.crop || 'Selected Crop'}
            </h2>
            <button className="btn btn-secondary btn-sm" onClick={handleSave} disabled={saved}>
              <Save size={14} /> {saved ? 'Observation Saved' : 'Save Observation'}
            </button>
          </div>

          {/* Diseases */}
          {results.cropDiseases.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🔬 Possible Diseases
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.75rem' }}>
                {results.cropDiseases.map((d, i) => (
                  <div key={i} style={{ border: '1px solid #fecaca', borderRadius: '12px', padding: '1rem', background: 'rgba(254,226,226,0.3)' }}>
                    <div style={{ fontWeight: 700, color: '#991b1b', marginBottom: '0.375rem' }}>{d.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#7f1d1d', marginBottom: '0.5rem' }}><strong>Pathogen:</strong> {d.pathogen}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.375rem' }}><strong>Symptoms:</strong> {d.symptoms}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}><strong>General Guidance:</strong> {d.management}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pests */}
          {results.cropPests.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                🐛 Possible Pests
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.75rem' }}>
                {results.cropPests.map((p, i) => (
                  <div key={i} style={{ border: '1px solid #fde68a', borderRadius: '12px', padding: '1rem', background: 'rgba(254,243,199,0.3)' }}>
                    <div style={{ fontWeight: 700, color: '#92400e', marginBottom: '0.375rem' }}>{p.name}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.375rem' }}><strong>Symptoms:</strong> {p.symptoms}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}><strong>IPM Approach:</strong> {p.ipm}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.cropDiseases.length === 0 && results.cropPests.length === 0 && (
            <div className="alert alert-info">
              <AlertCircle size={16} />
              <span>No specific information found for the entered combination. Please consult your local KVK or agriculture officer for diagnosis and guidance.</span>
            </div>
          )}

          {/* KVK referral */}
          <div className="card" style={{ padding: '1.25rem', background: 'linear-gradient(135deg, #dcfce7, #f0fdf4)', border: '2px solid #bbf7d0' }}>
            <h3 style={{ fontWeight: 700, color: '#166534', marginBottom: '0.5rem' }}>🏛️ Get Expert Help</h3>
            <p style={{ fontSize: '0.875rem', color: '#166534', lineHeight: 1.7 }}>
              For accurate crop disease diagnosis and management advice, contact your nearest <strong>Krishi Vigyan Kendra (KVK)</strong> or
              state agriculture department. KVK scientists can conduct field visits and provide location-specific, verified guidance.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

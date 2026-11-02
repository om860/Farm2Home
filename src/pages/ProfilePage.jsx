import { useState } from 'react';
import { User, Phone, MapPin, Sprout, Leaf, Edit3, Save, X, CheckCircle } from 'lucide-react';
import { useProfile } from '../hooks/useAppState';
import { STATES_DISTRICTS, SOIL_TYPES } from '../data/sampleData';

const CROPS_LIST = [
  'Chilli', 'Tomato', 'Cotton', 'Paddy / Rice', 'Wheat', 'Maize', 'Groundnut',
  'Sugarcane', 'Onion', 'Potato', 'Soybean', 'Sunflower', 'Turmeric', 'Ginger',
  'Banana', 'Mango', 'Coconut', 'Brinjal', 'Okra (Bhindi)', 'Cauliflower',
];

const AVATAR_COLORS = ['#166534', '#1e40af', '#7c3aed', '#dc2626', '#b45309', '#0369a1'];

export default function ProfilePage() {
  const { profile, updateProfile } = useProfile();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...profile });
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const handleCropToggle = (crop) => {
    setForm(f => ({
      ...f,
      crops: f.crops.includes(crop)
        ? f.crops.filter(c => c !== crop)
        : [...f.crops, crop],
    }));
  };

  const handleSave = () => {
    const avatarInitials = form.name.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'FA';
    updateProfile({ ...form, avatar: avatarInitials });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setForm({ ...profile });
    setEditing(false);
  };

  const districtOptions = form.state ? STATES_DISTRICTS[form.state] || [] : [];

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 className="section-title">👤 Farmer Profile</h1>
          <p className="section-subtitle">Manage your personal and farm information</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {editing ? (
            <>
              <button className="btn btn-ghost btn-sm" onClick={handleCancel}><X size={14} /> Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={handleSave}><Save size={14} /> Save Profile</button>
            </>
          ) : (
            <button className="btn btn-secondary btn-sm" onClick={() => setEditing(true)}><Edit3 size={14} /> Edit Profile</button>
          )}
        </div>
      </div>

      {saved && (
        <div className="alert alert-success" style={{ marginBottom: '1.25rem' }}>
          <CheckCircle size={16} /> Profile saved successfully!
        </div>
      )}

      {/* Profile card */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        {/* Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: `linear-gradient(135deg, ${form.avatarColor}, #22c55e)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontSize: '1.75rem',
            boxShadow: '0 4px 16px rgba(22,101,52,0.3)',
          }}>
            {(form.name?.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()) || 'FA'}
          </div>
          {editing && (
            <div style={{ display: 'flex', gap: '0.375rem' }}>
              {AVATAR_COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => handleChange('avatarColor', c)}
                  style={{
                    width: '20px', height: '20px', borderRadius: '50%', background: c,
                    border: form.avatarColor === c ? '3px solid var(--text-primary)' : '2px solid transparent',
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {profile.name}
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            <MapPin size={13} style={{ display: 'inline', marginRight: '0.25rem' }} />
            {profile.district}, {profile.state}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.625rem', flexWrap: 'wrap' }}>
            <span className="badge badge-green"><Leaf size={10} /> {profile.farmArea} {profile.farmAreaUnit}</span>
            <span className="badge badge-gray">{profile.soilType}</span>
            <span className="badge badge-gray">Since {profile.memberSince}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {/* Personal Info */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={16} color="var(--accent-primary)" /> Personal Information
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="form-label">Full Name</label>
              {editing
                ? <input className="form-input" value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Your full name" />
                : <div style={{ padding: '0.5rem 0', color: 'var(--text-primary)', fontWeight: 500 }}>{profile.name}</div>
              }
            </div>
            <div>
              <label className="form-label">Phone Number</label>
              {editing
                ? <input className="form-input" value={form.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" type="tel" />
                : <div style={{ padding: '0.5rem 0', color: 'var(--text-primary)', fontWeight: 500 }}>{profile.phone || <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Not set</span>}</div>
              }
            </div>
            <div>
              <label className="form-label">Preferred Language</label>
              {editing
                ? (
                  <select className="form-input form-select" value={form.language} onChange={e => handleChange('language', e.target.value)}>
                    {['English', 'Hindi', 'Telugu', 'Kannada', 'Tamil', 'Marathi', 'Gujarati', 'Punjabi', 'Bengali', 'Odia'].map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                )
                : <div style={{ padding: '0.5rem 0', color: 'var(--text-primary)', fontWeight: 500 }}>{profile.language}</div>
              }
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={16} color="var(--accent-primary)" /> Location Details
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="form-label">State</label>
              {editing
                ? (
                  <select className="form-input form-select" value={form.state} onChange={e => { handleChange('state', e.target.value); handleChange('district', ''); }}>
                    <option value="">Select State</option>
                    {Object.keys(STATES_DISTRICTS).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                )
                : <div style={{ padding: '0.5rem 0', color: 'var(--text-primary)', fontWeight: 500 }}>{profile.state}</div>
              }
            </div>
            <div>
              <label className="form-label">District</label>
              {editing
                ? (
                  <select className="form-input form-select" value={form.district} onChange={e => handleChange('district', e.target.value)} disabled={!form.state}>
                    <option value="">Select District</option>
                    {districtOptions.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                )
                : <div style={{ padding: '0.5rem 0', color: 'var(--text-primary)', fontWeight: 500 }}>{profile.district}</div>
              }
            </div>
            <div>
              <label className="form-label">Village / Local Area</label>
              {editing
                ? <input className="form-input" value={form.village} onChange={e => handleChange('village', e.target.value)} placeholder="e.g. Narasaraopet" />
                : <div style={{ padding: '0.5rem 0', color: 'var(--text-primary)', fontWeight: 500 }}>{profile.village || <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Not set</span>}</div>
              }
            </div>
          </div>
        </div>

        {/* Farm Details */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sprout size={16} color="var(--accent-primary)" /> Farm Details
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label className="form-label">Farm Area</label>
                {editing
                  ? <input className="form-input" type="number" min="0" step="0.1" value={form.farmArea} onChange={e => handleChange('farmArea', e.target.value)} placeholder="e.g. 3.5" />
                  : <div style={{ padding: '0.5rem 0', color: 'var(--text-primary)', fontWeight: 500 }}>{profile.farmArea}</div>
                }
              </div>
              <div>
                <label className="form-label">Unit</label>
                {editing
                  ? (
                    <select className="form-input form-select" value={form.farmAreaUnit} onChange={e => handleChange('farmAreaUnit', e.target.value)}>
                      <option value="acres">Acres</option>
                      <option value="hectares">Hectares</option>
                      <option value="bigha">Bigha</option>
                      <option value="guntha">Guntha</option>
                    </select>
                  )
                  : <div style={{ padding: '0.5rem 0', color: 'var(--text-primary)', fontWeight: 500 }}>{profile.farmAreaUnit}</div>
                }
              </div>
            </div>
            <div>
              <label className="form-label">Soil Type</label>
              {editing
                ? (
                  <select className="form-input form-select" value={form.soilType} onChange={e => handleChange('soilType', e.target.value)}>
                    <option value="">Select Soil Type</option>
                    {SOIL_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                )
                : <div style={{ padding: '0.5rem 0', color: 'var(--text-primary)', fontWeight: 500 }}>{profile.soilType}</div>
              }
            </div>
          </div>
        </div>

        {/* Crops */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Leaf size={16} color="var(--accent-primary)" /> My Crops ({(editing ? form.crops : profile.crops).length} selected)
          </h2>
          {editing ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              {CROPS_LIST.map(crop => {
                const selected = form.crops.includes(crop);
                return (
                  <button
                    key={crop}
                    onClick={() => handleCropToggle(crop)}
                    style={{
                      padding: '0.3rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem',
                      cursor: 'pointer', transition: 'all 0.15s', fontWeight: 500,
                      border: selected ? '1.5px solid var(--accent-primary)' : '1.5px solid var(--border-color)',
                      background: selected ? 'var(--accent-light)' : 'var(--bg-secondary)',
                      color: selected ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    {selected && <CheckCircle size={11} style={{ display: 'inline', marginRight: '0.25rem' }} />}
                    {crop}
                  </button>
                );
              })}
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              {profile.crops.map(crop => (
                <span key={crop} className="badge badge-green">{crop}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

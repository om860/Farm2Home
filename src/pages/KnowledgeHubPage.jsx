import { useState } from 'react';
import { Search, BookOpen, Clock, User, Bookmark, BookmarkCheck, Filter } from 'lucide-react';
import { KNOWLEDGE_ARTICLES } from '../data/sampleData';
import { useSaved } from '../hooks/useAppState';
import { useSearch } from '../hooks/useAppState';

const CATEGORIES = ['All', 'Pest Management', 'Soil Management', 'Crop Planning', 'Irrigation', 'Organic Farming', 'Post-Harvest', 'Government Schemes', 'Crop Guide'];
const SEASONS = ['All', 'Kharif', 'Rabi', 'Zaid'];

const ARTICLE_CONTENT = {
  1: `## Integrated Pest Management (IPM) — Core Principles

IPM is an ecosystem-based strategy that focuses on long-term prevention of pests or their damage through a combination of techniques such as biological control, habitat manipulation, modification of cultural practices, and use of resistant varieties.

### Key IPM Principles

**1. Prevention and avoidance**
The primary goal of IPM is to prevent pest problems from occurring or to avoid them altogether through good cultural practices:
- Select resistant or tolerant varieties where available
- Use certified, disease-free seed
- Rotate crops to break pest cycles
- Adjust planting dates to avoid peak pest pressure
- Maintain proper plant spacing for air circulation

**2. Monitoring and accurate pest identification**
Before taking any pest management action:
- Regularly scout your fields (at least weekly during critical periods)
- Correctly identify the pest or disease — many problems look similar
- Assess the density and distribution of the pest
- Consult a qualified agricultural officer or KVK for difficult identifications

**3. Economic thresholds**
An economic threshold is the pest population level at which control action must be taken to prevent economic damage. Not every pest sighting requires action — natural enemies often provide sufficient control.

**4. Non-chemical controls first**
When action is needed, prefer:
- Biological controls (natural enemies, beneficial insects)
- Cultural controls (tillage, crop rotation, sanitation)
- Mechanical controls (traps, barriers)
- Physical controls (mulching, row covers)

**5. Chemical controls as a last resort**
When chemical control is necessary:
- Choose the most selective, least harmful product registered for the crop and pest
- Apply at the correct timing, rate, and method specified on the product label
- Rotate between different modes of action to prevent resistance
- Always wear appropriate personal protective equipment (PPE)

### Important Notice
Do not apply any pesticide without confirming the pest identity and consulting the registered product label. For guidance specific to your crop, region and season, contact your local Krishi Vigyan Kendra (KVK) or agriculture officer.`,

  2: `## Soil Health and Organic Matter Management

Soil health is the capacity of a soil to function as a living ecosystem to sustain plants, animals and humans. Healthy soil is the foundation of productive, sustainable farming.

### What is Soil Organic Matter?
Soil organic matter (SOM) consists of decomposing plant and animal residues, living organisms, and stable humus. Even a small increase in SOM can significantly improve:
- Water holding capacity
- Nutrient availability
- Soil structure and aeration
- Microbial activity and disease suppression

### Practical Steps to Improve Soil Health

**1. Add organic matter regularly**
- Apply well-decomposed farmyard manure (FYM) at 10–15 tonnes/acre before planting
- Incorporate crop residues (where feasible and not diseased)
- Use green manure crops (dhaincha, cowpea) before the main crop

**2. Reduce unnecessary tillage**
Excessive tillage destroys soil structure, kills beneficial organisms, and accelerates organic matter decomposition. Consider minimum tillage or conservation tillage practices.

**3. Keep the soil covered**
Bare soil is vulnerable to erosion, temperature extremes, and rapid loss of moisture. Use mulching with crop residues or plastic mulch to protect the soil surface.

**4. Grow cover crops**
Cover crops (legumes, cereals) protect soil during fallow periods and can add nitrogen (legumes) and organic matter.

**5. Get your soil tested**
Contact your nearest Krishi Vigyan Kendra (KVK) or Soil Testing Laboratory for a comprehensive soil health card. This provides accurate information about:
- pH, organic carbon, and available nutrients (N, P, K)
- Micronutrient status (Zn, Fe, Mn, Cu, B, S)
- Specific amendment recommendations`,
};

function ArticleModal({ article, onClose }) {
  const content = ARTICLE_CONTENT[article.id];
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={onClose}>
      <div style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '2rem', maxWidth: '700px', width: '100%', maxHeight: '85vh', overflow: 'auto', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)', animation: 'fadeInUp 0.3s ease' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <span className="badge badge-green" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>{article.category}</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{article.title}</h2>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              <span><User size={12} style={{ verticalAlign: 'middle' }} /> {article.author}</span>
              <span><Clock size={12} style={{ verticalAlign: 'middle' }} /> {article.readTime} read</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.375rem 0.75rem', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.875rem' }}>✕ Close</button>
        </div>
        <div className="demo-notice" style={{ marginBottom: '1rem' }}>
          📋 General information only — not verified regional or official agricultural advice.
        </div>
        {content ? (
          <div style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
            {content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '1rem', marginBottom: '0.5rem' }}>{line.slice(3)}</h2>;
              if (line.startsWith('### ')) return <h3 key={i} style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.875rem', marginBottom: '0.375rem' }}>{line.slice(4)}</h3>;
              if (line.startsWith('**') && line.endsWith('**')) return <p key={i} style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.5rem' }}>{line.slice(2, -2)}</p>;
              if (line.startsWith('- ')) return <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginLeft: '1rem' }}><span style={{ color: 'var(--accent-primary)', flexShrink: 0 }}>•</span><span>{line.slice(2)}</span></div>;
              return line ? <p key={i} style={{ marginBottom: '0.375rem' }}>{line}</p> : <div key={i} style={{ height: '0.5rem' }} />;
            })}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>{article.summary}</p>
        )}
      </div>
    </div>
  );
}

export default function KnowledgeHubPage() {
  const { savedGuides, toggleGuide } = useSaved();
  const { query, setQuery, filtered } = useSearch(KNOWLEDGE_ARTICLES, ['title', 'category', 'crop', 'season', 'summary', 'tags']);
  const [category, setCategory] = useState('All');
  const [season, setSeason] = useState('All');
  const [openArticle, setOpenArticle] = useState(null);

  const displayed = filtered
    .filter(a => category === 'All' || a.category === category)
    .filter(a => season === 'All' || a.season === season || a.season === 'All');

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      {openArticle && <ArticleModal article={openArticle} onClose={() => setOpenArticle(null)} />}

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="section-title">🎓 Farming Knowledge Hub</h1>
        <p className="section-subtitle">Guides, techniques and best practices for modern Indian farming</p>
      </div>

      {/* Search & Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="search-bar" style={{ flex: 1, minWidth: '200px' }}>
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search guides, techniques, crops..." id="knowledge-search" />
        </div>
        <select className="form-input form-select" style={{ maxWidth: '200px', fontSize: '0.85rem' }} value={season} onChange={e => setSeason(e.target.value)}>
          {SEASONS.map(s => <option key={s} value={s}>{s} Season</option>)}
        </select>
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: '0.375rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`tab ${category === c ? 'active' : ''}`}
            style={{ borderRadius: '999px', padding: '0.375rem 0.875rem', fontSize: '0.8rem' }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Saved guides note */}
      {savedGuides.length > 0 && (
        <div className="alert alert-success" style={{ marginBottom: '1.25rem' }}>
          <Bookmark size={16} />
          <span>You have {savedGuides.length} saved guide{savedGuides.length !== 1 ? 's' : ''}. They are accessible offline in your saved list.</span>
        </div>
      )}

      {/* Articles grid */}
      {displayed.length > 0 ? (
        <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {displayed.map(article => (
            <div key={article.id} className="card card-hover" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-green">{article.category}</span>
                  {article.season !== 'All' && (
                    <span className={`badge ${article.season === 'Kharif' ? 'badge-green' : article.season === 'Rabi' ? 'badge-yellow' : 'badge-blue'}`}>
                      {article.season}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => toggleGuide(article.id)}
                  className="btn-icon"
                  aria-label={savedGuides.includes(article.id) ? 'Remove from saved' : 'Save guide'}
                  style={{ color: savedGuides.includes(article.id) ? '#166534' : 'var(--text-muted)' }}
                >
                  {savedGuides.includes(article.id) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                </button>
              </div>

              <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.4, flex: 1 }}>
                {article.title}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                {article.summary}
              </p>

              <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                {article.tags.map(tag => (
                  <span key={tag} className="badge badge-gray" style={{ fontSize: '0.7rem' }}>#{tag}</span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <span><Clock size={12} style={{ verticalAlign: 'middle' }} /> {article.readTime}</span>
                  <span><User size={12} style={{ verticalAlign: 'middle' }} /> {article.author.split(' ')[0]}</span>
                </div>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setOpenArticle(article)}
                >
                  Read <BookOpen size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
          <BookOpen size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
          <p style={{ color: 'var(--text-muted)' }}>No articles found. Try different search terms or filters.</p>
        </div>
      )}
    </div>
  );
}

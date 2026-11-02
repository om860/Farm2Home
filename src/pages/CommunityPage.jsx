import { useState } from 'react';
import {
  Users, Search, MessageSquare, Heart, Flag, Filter,
  AlertCircle, Send, X, ChevronDown, ChevronUp, Plus, ThumbsUp
} from 'lucide-react';
import { COMMUNITY_POSTS, FARMERS_COMMUNITY, STATES_DISTRICTS } from '../data/sampleData';
import { useSearch } from '../hooks/useAppState';

const POST_TYPES = ['All', 'question', 'update', 'discussion'];
const CROPS = ['All', 'Chilli', 'Tomato', 'Wheat', 'Rice', 'Soybean', 'Cotton', 'Onion'];

function Avatar({ initials, color, size = 40 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color || 'linear-gradient(135deg, #166534, #22c55e)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontWeight: 700, fontSize: size > 36 ? '0.875rem' : '0.75rem',
      flexShrink: 0
    }}>
      {initials}
    </div>
  );
}

function PostCard({ post, onLike }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState(post.replies || []);
  const [reported, setReported] = useState(false);

  const handleLike = () => {
    setLiked(l => !l);
    setLikes(l => liked ? l - 1 : l + 1);
  };

  const handleReply = () => {
    if (!replyText.trim()) return;
    setReplies(r => [...r, { author: 'Demo User', avatar: 'DU', time: 'just now', text: replyText }]);
    setReplyText('');
  };

  const typeColors = { question: 'badge-blue', update: 'badge-green', discussion: 'badge-yellow' };

  return (
    <div className="post-card" style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
        <Avatar initials={post.avatar} color={post.avatarColor} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.375rem' }}>
            <div>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{post.author}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>{post.district}, {post.state}</span>
              <span className={`badge ${typeColors[post.type] || 'badge-gray'}`} style={{ marginLeft: '0.5rem', fontSize: '0.7rem' }}>{post.type}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{post.time}</span>
              {!reported && (
                <button
                  onClick={() => setReported(true)}
                  className="btn-icon"
                  style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem', color: 'var(--text-muted)' }}
                  title="Report post"
                  aria-label="Report post"
                >
                  <Flag size={12} />
                </button>
              )}
              {reported && <span className="badge badge-gray" style={{ fontSize: '0.7rem' }}>Reported</span>}
            </div>
          </div>

          <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', margin: '0.5rem 0 0.375rem', fontSize: '0.95rem' }}>
            {post.title}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.625rem' }}>
            {post.content}
          </p>

          <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            {post.tags.map(tag => (
              <span key={tag} className="badge badge-gray" style={{ fontSize: '0.7rem' }}>#{tag}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={handleLike}
              className="btn-ghost btn-sm"
              style={{ color: liked ? '#166534' : 'var(--text-muted)', borderColor: liked ? '#166534' : 'var(--border-color)' }}
              aria-label="Like post"
            >
              <ThumbsUp size={14} fill={liked ? 'currentColor' : 'none'} /> {likes}
            </button>
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="btn-ghost btn-sm"
              aria-label="View replies"
            >
              <MessageSquare size={14} /> {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
              {showReplies ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>

          {showReplies && (
            <div style={{ marginTop: '0.875rem', paddingLeft: '1rem', borderLeft: '2px solid var(--border-color)' }}>
              {replies.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.625rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
                  <Avatar initials={r.avatar} size={32} color="#166534" />
                  <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '0.625rem 0.875rem', flex: 1, border: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                      {r.author} · <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{r.time}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{r.text}</p>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <input
                  className="form-input"
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  onKeyDown={e => e.key === 'Enter' && handleReply()}
                  id={`reply-input-${post.id}`}
                  style={{ fontSize: '0.85rem' }}
                />
                <button className="btn btn-primary btn-sm" onClick={handleReply} disabled={!replyText.trim()}>
                  <Send size={14} />
                </button>
              </div>
              <div className="demo-notice" style={{ marginTop: '0.5rem', fontSize: '0.72rem' }}>
                <AlertCircle size={10} /> Demo mode — replies are not sent to real users
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChatPanel({ farmer, onClose }) {
  const [messages, setMessages] = useState([
    { from: 'them', text: `Hello! I'm ${farmer.name} from ${farmer.district}, ${farmer.state}. I grow ${farmer.crops.join(' and ')}.`, time: '10:15 AM' },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { from: 'me', text: input, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }]);
    setTimeout(() => {
      setMessages(m => [...m, { from: 'them', text: '(Demo: Real messaging is not active in this version. This is a demonstration interface only.)', time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1000);
    setInput('');
  };

  return (
    <div style={{
      position: 'fixed', right: '1.5rem', bottom: '1.5rem', width: '340px',
      background: 'var(--bg-card)', border: '1px solid var(--border-color)',
      borderRadius: '20px', boxShadow: 'var(--shadow-lg)', zIndex: 150,
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      animation: 'fadeInUp 0.3s ease'
    }}>
      <div style={{ background: 'linear-gradient(135deg, #166534, #22c55e)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <Avatar initials={farmer.avatar} size={36} color="rgba(255,255,255,0.3)" />
          <div>
            <div style={{ fontWeight: 700, color: 'white', fontSize: '0.875rem' }}>{farmer.name}</div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)' }}>{farmer.crops.join(', ')}</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={18} /></button>
      </div>
      <div className="demo-notice" style={{ borderRadius: 0, borderLeft: 0, borderRight: 0 }}>
        <AlertCircle size={10} /> Demo only — messages not sent to real users
      </div>
      <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.625rem', maxHeight: '280px' }}>
        {messages.map((m, i) => (
          <div key={i} className={m.from === 'me' ? 'chat-bubble-user' : 'chat-bubble-bot'} style={{ alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
            <div style={{ fontSize: '0.875rem' }}>{m.text}</div>
            <div style={{ fontSize: '0.68rem', opacity: 0.7, marginTop: '0.25rem', textAlign: 'right' }}>{m.time}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
        <input
          className="form-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Type a message..."
          id="chat-input"
          style={{ fontSize: '0.85rem' }}
        />
        <button className="btn btn-primary btn-sm" onClick={send} disabled={!input.trim()}>
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const [posts, setPosts] = useState(COMMUNITY_POSTS);
  const { query, setQuery, filtered } = useSearch(posts, ['title', 'content', 'tags', 'author', 'crop', 'state']);
  const [typeFilter, setTypeFilter] = useState('All');
  const [cropFilter, setCropFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [activeChat, setActiveChat] = useState(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '', type: 'discussion' });
  const [tab, setTab] = useState('feed');

  const displayedPosts = filtered
    .filter(p => typeFilter === 'All' || p.type === typeFilter)
    .filter(p => cropFilter === 'All' || p.tags.includes(cropFilter))
    .filter(p => stateFilter === 'All' || p.state === stateFilter);

  const handleNewPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    const post = {
      id: Date.now(),
      author: 'Demo User',
      district: 'Demo District',
      state: 'Demo State',
      crop: 'General',
      avatar: 'DU',
      avatarColor: '#166534',
      time: 'just now',
      title: newPost.title,
      content: newPost.content,
      likes: 0,
      comments: 0,
      tags: newPost.tags.split(',').map(t => t.trim()).filter(Boolean),
      type: newPost.type,
      replies: [],
    };
    setPosts(p => [post, ...p]);
    setNewPost({ title: '', content: '', tags: '', type: 'discussion' });
    setShowNewPost(false);
  };

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      {activeChat && <ChatPanel farmer={activeChat} onClose={() => setActiveChat(null)} />}

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="section-title">👥 Farmer Community</h1>
        <p className="section-subtitle">Connect with farmers in your region — share knowledge, ask questions</p>
      </div>

      <div className="demo-notice" style={{ marginBottom: '1.25rem' }}>
        <AlertCircle size={14} />
        <span><strong>Demonstration Mode:</strong> All posts and farmer profiles shown here are sample data. Real messaging, posts, and user accounts are not active in this version.</span>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: '1.25rem' }}>
        {['feed', 'farmers', 'groups'].map(t => (
          <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t === 'feed' ? '📰 Community Feed' : t === 'farmers' ? '👤 Nearby Farmers' : '🌍 Groups'}
          </button>
        ))}
      </div>

      {tab === 'feed' && (
        <>
          {/* Filters */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div className="search-bar" style={{ flex: 1, minWidth: '200px' }}>
              <Search size={15} style={{ color: 'var(--text-muted)' }} />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search posts..." id="community-search" />
            </div>
            <select className="form-input form-select" style={{ maxWidth: '140px', fontSize: '0.85rem' }} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
              {POST_TYPES.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
            <select className="form-input form-select" style={{ maxWidth: '140px', fontSize: '0.85rem' }} value={cropFilter} onChange={e => setCropFilter(e.target.value)}>
              {CROPS.map(c => <option key={c} value={c}>{c === 'All' ? 'All Crops' : c}</option>)}
            </select>
            <select className="form-input form-select" style={{ maxWidth: '160px', fontSize: '0.85rem' }} value={stateFilter} onChange={e => setStateFilter(e.target.value)}>
              <option value="All">All States</option>
              {Object.keys(STATES_DISTRICTS).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button className="btn btn-primary btn-sm" onClick={() => setShowNewPost(!showNewPost)}>
              <Plus size={14} /> New Post
            </button>
          </div>

          {/* New post form */}
          {showNewPost && (
            <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem', animation: 'fadeInUp 0.3s ease' }}>
              <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                Create New Post <span className="badge badge-demo">Demo Only</span>
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input className="form-input" value={newPost.title} onChange={e => setNewPost(p => ({ ...p, title: e.target.value }))} placeholder="Post title" id="new-post-title" />
                <textarea className="form-input form-textarea" value={newPost.content} onChange={e => setNewPost(p => ({ ...p, content: e.target.value }))} placeholder="Share your farming experience, question or update..." id="new-post-content" style={{ minHeight: '80px' }} />
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <input className="form-input" value={newPost.tags} onChange={e => setNewPost(p => ({ ...p, tags: e.target.value }))} placeholder="Tags: Chilli, Disease (comma separated)" style={{ flex: 1 }} id="new-post-tags" />
                  <select className="form-input form-select" value={newPost.type} onChange={e => setNewPost(p => ({ ...p, type: e.target.value }))} style={{ maxWidth: '160px' }}>
                    <option value="discussion">Discussion</option>
                    <option value="question">Question</option>
                    <option value="update">Field Update</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-primary" onClick={handleNewPost}>Post</button>
                  <button className="btn btn-ghost" onClick={() => setShowNewPost(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          {displayedPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
          {displayedPosts.length === 0 && (
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)' }}>No posts match your search.</p>
            </div>
          )}
        </>
      )}

      {tab === 'farmers' && (
        <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {FARMERS_COMMUNITY.map(farmer => (
            <div key={farmer.id} className="card card-hover" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center', marginBottom: '0.875rem' }}>
                <div style={{ position: 'relative' }}>
                  <Avatar initials={farmer.avatar} color={farmer.color} size={48} />
                  {farmer.online && (
                    <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '10px', height: '10px', background: '#22c55e', borderRadius: '50%', border: '2px solid var(--bg-card)' }} />
                  )}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{farmer.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{farmer.district}, {farmer.state}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Experience: {farmer.experience}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '0.875rem' }}>
                {farmer.crops.map(c => <span key={c} className="badge badge-green" style={{ fontSize: '0.72rem' }}>{c}</span>)}
              </div>
              <button
                className="btn btn-secondary"
                style={{ width: '100%' }}
                onClick={() => setActiveChat(farmer)}
                id={`chat-btn-${farmer.id}`}
              >
                <MessageSquare size={14} /> Message {farmer.name.split(' ')[0]}
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'groups' && (
        <div className="grid-auto grid-2">
          {[
            { name: 'Andhra Pradesh Chilli Growers', members: 234, crop: 'Chilli', state: 'Andhra Pradesh', posts: 45 },
            { name: 'MP Soybean Network', members: 178, crop: 'Soybean', state: 'Madhya Pradesh', posts: 32 },
            { name: 'Punjab Wheat Farmers', members: 312, crop: 'Wheat', state: 'Punjab', posts: 67 },
            { name: 'Maharashtra Cotton Forum', members: 145, crop: 'Cotton', state: 'Maharashtra', posts: 28 },
            { name: 'Telangana Rice Growers', members: 189, crop: 'Rice', state: 'Telangana', posts: 38 },
            { name: 'Karnataka Vegetable Farmers', members: 156, crop: 'Vegetables', state: 'Karnataka', posts: 51 },
          ].map((group, i) => (
            <div key={i} className="card card-hover" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{group.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{group.state}</div>
                </div>
                <span className="badge badge-green">{group.crop}</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.875rem' }}>
                <span>👥 {group.members} members <span className="badge badge-demo" style={{ fontSize: '0.68rem' }}>Sample</span></span>
                <span>📝 {group.posts} posts</span>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                View Group <span className="badge badge-demo" style={{ marginLeft: '0.375rem', fontSize: '0.68rem' }}>Demo</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

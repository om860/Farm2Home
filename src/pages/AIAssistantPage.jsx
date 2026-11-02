import { useState, useRef, useEffect } from 'react';
import { Bot, Send, RefreshCw, AlertCircle, Leaf, User, Sparkles } from 'lucide-react';

const STARTER_QUESTIONS = [
  "What crops should I grow in Kharif season in Guntur?",
  "How do I identify and treat leaf curl in chilli?",
  "What is the recommended NPK dose for tomatoes?",
  "How can I manage whitefly in my vegetable crop?",
  "What are the signs of nitrogen deficiency in plants?",
  "When should I irrigate my chilli crop?",
];

const AI_RESPONSES = {
  default: [
    "That's a great farming question! Based on general agricultural practices, I'd recommend consulting your local Krishi Vigyan Kendra (KVK) for region-specific advice tailored to your exact soil and climate conditions.",
    "Interesting! From a general agronomy perspective, this depends on several factors like soil type, water availability, and local climate. I can share general guidelines, but please verify with your local agriculture officer.",
    "Good question! General best practices suggest monitoring your crops regularly and maintaining proper nutrition schedules. For precise guidance, a soil test from your nearest KVK would be very helpful.",
  ],
  kharif: "For Kharif season (June–October), common suitable crops in Andhra Pradesh include Chilli, Cotton, Paddy, Maize, and Groundnut. The choice depends on your soil type, water availability, and market access. Red soils are excellent for chilli and groundnut, while black cotton soils suit cotton and sorghum well. Always confirm with your local agriculture department.",
  chilli: "Chilli leaf curl is typically caused by thrips infestation or viral infection (Chilli Leaf Curl Virus - ChLCV). Management:\n1. **Thrips control**: Spray Imidacloprid 17.8 SL @ 0.3ml/L or Spinosad 45 SC @ 0.3ml/L\n2. **Remove infected plants** to prevent virus spread\n3. **Use reflective mulch** to repel thrips\n4. **Avoid planting near infected fields**\n⚠️ Always verify pesticide dosages with your local KVK.",
  npk: "General NPK recommendation for Tomato (per acre):\n- **Nitrogen**: 120–150 kg/acre (split into 3 doses)\n- **Phosphorus**: 60–80 kg/acre (basal dose)\n- **Potassium**: 60–80 kg/acre (split)\n\nApply as: Basal (at transplanting) + Top-dressing at 30 & 60 days after transplanting. Always get a soil test for precise recommendations.",
  whitefly: "Whitefly management in vegetables:\n1. **Yellow sticky traps** @ 10–15 per acre for monitoring\n2. **Neem oil** @ 3ml/L as early spray\n3. **Imidacloprid 17.8 SL** @ 0.3ml/L for severe infestation\n4. **Remove heavily infested leaves**\n5. **Avoid broad-spectrum pesticides** that kill natural predators\n⚠️ Rotate chemicals to prevent resistance. Consult KVK for current recommendations.",
  nitrogen: "Signs of nitrogen deficiency:\n- **Yellowing** (chlorosis) starting from older/lower leaves\n- **Stunted growth** and pale green color overall\n- **Thin stems** and reduced leaf size\n\nCorrection:\n- Apply Urea (46% N) @ 20–30 kg/acre as top-dressing\n- Or use liquid fertilizers like 19-19-19 via drip\n- Soil test first to confirm deficiency vs. other causes",
  irrigat: "Irrigation timing for chilli:\n- **Seedbed**: Keep moist until germination\n- **Transplanted crop**: Immediately after transplanting, then every 5–7 days\n- **Flowering**: Critical period — never stress the plant\n- **Fruiting**: Every 7–10 days depending on soil moisture\n- **Drip irrigation**: 30–40 litres/plant/day during peak summer\n\nUse finger test: if top 2 inches of soil are dry, it's time to irrigate.",
};

function getResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('kharif') || q.includes('season') || q.includes('crop') && q.includes('grow')) return AI_RESPONSES.kharif;
  if (q.includes('leaf curl') || q.includes('chilli') && q.includes('disease')) return AI_RESPONSES.chilli;
  if (q.includes('npk') || q.includes('tomato') && q.includes('fertilizer')) return AI_RESPONSES.npk;
  if (q.includes('whitefly')) return AI_RESPONSES.whitefly;
  if (q.includes('nitrogen deficiency') || q.includes('yellowing') || q.includes('yellow leaves')) return AI_RESPONSES.nitrogen;
  if (q.includes('irrigat') || q.includes('water') && q.includes('chilli')) return AI_RESPONSES.irrigat;
  return AI_RESPONSES.default[Math.floor(Math.random() * AI_RESPONSES.default.length)];
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "🌿 Namaste! I'm the Farm2Home AI Assistant. I can help with crop recommendations, disease identification, fertilizer guidance, and general farming questions.\n\n⚠️ **Note**: This is a demo assistant with limited pre-programmed responses. For official agricultural advice, please contact your local Krishi Vigyan Kendra (KVK) or agriculture officer.",
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput('');

    const userMessage = {
      role: 'user',
      content: userMsg,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    setTimeout(() => {
      const response = getResponse(userMsg);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      }]);
      setLoading(false);
    }, 1000 + Math.random() * 800);
  };

  const resetChat = () => {
    setMessages([{
      role: 'assistant',
      content: "🌿 Chat reset! How can I help you with your farming questions today?",
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    }]);
  };

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h1 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bot size={24} color="var(--accent-primary)" /> AI Agriculture Assistant
            </h1>
            <p className="section-subtitle">Ask questions about crops, diseases, fertilizers, and farming practices</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={resetChat}>
            <RefreshCw size={14} /> Reset Chat
          </button>
        </div>
        <div className="demo-notice" style={{ marginTop: '0.75rem' }}>
          <AlertCircle size={14} />
          <span><strong>Demo Mode</strong> — This AI has limited pre-programmed responses for demonstration. Not a real AI model. Always verify advice with certified agriculture experts.</span>
        </div>
      </div>

      {/* Chat area */}
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
              {/* Avatar */}
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                background: msg.role === 'assistant' ? 'linear-gradient(135deg, #166534, #22c55e)' : 'linear-gradient(135deg, #1e40af, #3b82f6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {msg.role === 'assistant' ? <Leaf size={16} color="white" /> : <User size={16} color="white" />}
              </div>
              {/* Bubble */}
              <div style={{ maxWidth: '75%' }}>
                <div style={{
                  background: msg.role === 'assistant' ? 'var(--bg-secondary)' : 'linear-gradient(135deg, #166534, #22c55e)',
                  color: msg.role === 'assistant' ? 'var(--text-primary)' : 'white',
                  borderRadius: msg.role === 'assistant' ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                  padding: '0.875rem 1.125rem',
                  border: msg.role === 'assistant' ? '1px solid var(--border-color)' : 'none',
                  fontSize: '0.875rem', lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.content}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem', textAlign: msg.role === 'user' ? 'right' : 'left', paddingInline: '0.25rem' }}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #166534, #22c55e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Leaf size={16} color="white" />
              </div>
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px 16px 16px 16px', padding: '0.875rem 1.125rem', display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'inline-block', animation: `bounce 1s ease ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Starter questions */}
        {messages.length === 1 && (
          <div style={{ padding: '0 1.25rem 1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Sparkles size={12} /> Try asking:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              {STARTER_QUESTIONS.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    background: 'var(--accent-light)', color: 'var(--accent-primary)',
                    border: '1px solid var(--border-color)', borderRadius: '999px',
                    padding: '0.3rem 0.75rem', fontSize: '0.75rem', cursor: 'pointer',
                    transition: 'all 0.15s', fontWeight: 500,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--accent-light)'}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.75rem' }}>
          <input
            className="form-input"
            style={{ flex: 1 }}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask about crops, diseases, fertilizers..."
            id="ai-chat-input"
            disabled={loading}
          />
          <button
            className="btn btn-primary"
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function Bento() {
  const { Card, StatTile, ScoreMeter, Badge, Ticket } = window.TesseraDesignSystem_992529;
  const eps = [['/api/login', 92], ['/api/search', 61], ['/api/avatar', 44], ['/api/orders', 12], ['/health', 2]];
  const [scores, setScores] = React.useState([0.94, 0.12, 0.61, 0.03]);
  React.useEffect(() => { const t = setInterval(() => setScores(s => s.map(v => Math.max(0.01, Math.min(0.99, v + (Math.random() - 0.5) * 0.12)))), 1600); return () => clearInterval(t); }, []);
  const lab = { font: '500 11px var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--bone-500)' };
  return <section className="theme-ink" style={{ position: 'relative', background: 'var(--ink-900)', overflow: 'hidden' }}>
    <img src="../../assets/pixel/hero-amphitheatre-night.png" alt="" style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', imageRendering: 'pixelated', opacity: 0.55 }} />
    <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '128px 24px 200px' }}>
      <div style={lab}>Dashboard</div>
      <h2 style={{ margin: '16px 0 48px', maxWidth: 640, font: '300 48px/1.08 var(--font-sans)', letterSpacing: '-0.03em', color: 'var(--bone-50)' }}>Analysis goes where the attacks are.</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
        <Card variant="glass-dark" style={{ gridColumn: 'span 3', gridRow: 'span 2' }}>
          <div style={lab}>Maliciousness score · JEV</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 22 }}>
            {['POST /api/login', 'GET /api/search?q=', 'PUT /api/avatar', 'GET /api/orders'].map((r, i) => <div key={r}><div style={{ font: '400 13px var(--font-mono)', color: 'var(--bone-100)', marginBottom: 8 }}>{r}</div><ScoreMeter score={scores[i]} tone="dark" label={null} tiles={24} showValue={false} /></div>)}
          </div>
        </Card>
        <StatTile variant="ink" label="Latency overhead" value="0.8" unit="ms p95" delta="−0.1 vs last week" deltaTone="good" trend={[1.2, 1.1, 1, 1, 0.9, 0.9, 0.8]} style={{ gridColumn: 'span 3', background: 'var(--surface-glass-dark)', border: '1px solid var(--border-glass)', backdropFilter: 'blur(18px)' }} />
        <StatTile variant="ink" label="Blocked · 24h" value="1,284" delta="+12% on /api/login" deltaTone="bad" style={{ gridColumn: 'span 2', background: 'var(--surface-glass-dark)', border: '1px solid var(--border-glass)', backdropFilter: 'blur(18px)' }} />
        <Card variant="glass-dark" padding={20} style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={lab}>Mode</div><Badge status="jev">Enforce+JEV</Badge>
        </Card>
        <Card variant="glass-dark" style={{ gridColumn: 'span 4' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={lab}>Analysis depth by endpoint</span><span style={{ ...lab, color: 'var(--bone-300)' }}>EWMA · α 0.3</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
            {eps.map(([e, v]) => <div key={e} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 40px', gap: 12, alignItems: 'center', font: '400 12px var(--font-mono)', color: 'var(--bone-300)' }}><span>{e}</span><span style={{ height: 8, background: 'rgba(241,235,224,.08)' }}><span style={{ display: 'block', height: '100%', width: v + '%', background: v > 70 ? 'var(--clay-500)' : v > 40 ? 'var(--ochre-500)' : 'var(--blue-500)' }} /></span><span style={{ textAlign: 'right' }}>{v}%</span></div>)}
          </div>
        </Card>
        <Card variant="glass-dark" padding={20} style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12 }}>
          <div style={lab}>Last receipt</div>
          <div className="theme-bone"><Ticket numeral="XII" label="gate" title="Request admitted" meta="req_7f3a · 0.6ms" style={{ minWidth: 0, background: 'var(--bone-50)' }} /></div>
        </Card>
      </div>
    </div>
  </section>;
}
window.Bento = Bento;

function Overview({ go, openReq }) {
  const { StatTile, Card, Tabs, Badge, ScoreMeter, Sparkline } = window.TesseraDesignSystem_992529;
  const [range, setRange] = React.useState('24h');
  const D = window.TS_DATA;
  const lab = { font: '500 11px var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)' };
  const traffic = [40, 42, 38, 51, 60, 58, 64, 71, 69, 80, 92, 88, 84, 90, 97, 101, 96, 110, 104, 99, 93, 88, 81, 76];
  const blocked = [1, 1, 0, 2, 2, 3, 2, 4, 3, 6, 12, 9, 7, 5, 4, 6, 5, 8, 6, 4, 3, 2, 2, 1];
  return <>
    <Topbar title="Overview"><Tabs variant="pill" value={range} onChange={setRange} tabs={[{ id: '1h', label: '1h' }, { id: '24h', label: '24h' }, { id: '7d', label: '7d' }]} /></Topbar>
    <div style={{ padding: 32, display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
      <StatTile label="Requests" value="2.41M" delta="+4.2%" trend={traffic} />
      <StatTile label="Blocked" value="1,284" delta="+12% on /api/login" deltaTone="bad" trend={blocked} trendColor="var(--clay-500)" />
      <StatTile label="Routed to JEV" value="0.9" unit="%" delta="21.6k requests" />
      <StatTile label="Overhead" value="0.8" unit="ms p95" delta="−0.1 vs last week" deltaTone="good" />
      <Card style={{ gridColumn: 'span 3' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={lab}>Traffic vs. blocked · {range}</span><span style={{ display: 'flex', gap: 16, font: '400 12px var(--font-mono)', color: 'var(--text-muted)' }}><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, background: 'var(--ink-900)' }} />requests</span><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, background: 'var(--clay-500)' }} />blocked</span></span></div>
        <div style={{ position: 'relative', marginTop: 24, height: 180 }}>
          <Sparkline data={traffic} width={760} height={180} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', gap: 3 }}>{blocked.map((b, i) => <span key={i} style={{ flex: 1, height: b * 8, background: 'var(--clay-500)', opacity: .85 }} />)}</div>
        </div>
      </Card>
      <Card>
        <span style={lab}>Hot endpoints</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
          {[['/api/login', 0.92], ['/api/search', 0.61], ['/api/avatar', 0.44], ['/api/orders', 0.12]].map(([r, s]) => <div key={r}><div style={{ font: '400 12px var(--font-mono)', color: 'var(--ink-900)', marginBottom: 6 }}>{r}</div><ScoreMeter score={s} label={null} showValue={false} tiles={16} /></div>)}
        </div>
      </Card>
      <Card padding={0} style={{ gridColumn: 'span 4' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px' }}><span style={lab}>Latest decisions</span><button onClick={() => go('traffic')} style={{ border: 0, background: 'none', cursor: 'pointer', font: '500 13px var(--font-sans)', color: 'var(--text-link)' }}>View all traffic</button></div>
        {D.requests.slice(0, 4).map(r => <ReqRow key={r.id} r={r} onClick={() => openReq(r)} />)}
      </Card>
    </div>
  </>;
}
function ReqRow({ r, onClick, active }) {
  const { Badge } = window.TesseraDesignSystem_992529;
  return <div onClick={onClick} style={{ display: 'grid', gridTemplateColumns: '80px 110px 56px 1fr 140px 60px 70px', gap: 16, alignItems: 'center', padding: '12px 24px', borderTop: '1px solid var(--border-subtle)', cursor: 'pointer', background: active ? 'var(--blue-100)' : 'transparent', font: '400 13px var(--font-mono)', color: 'var(--text-body)' }} onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--bone-200)'; }} onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
    <span style={{ color: 'var(--text-muted)' }}>{r.t}</span>
    <span><Badge status={r.v}>{r.v === 'jev' ? 'JEV' : r.v}</Badge></span>
    <span style={{ color: 'var(--text-muted)' }}>{r.m}</span>
    <span style={{ color: 'var(--ink-900)' }}>{r.r}</span>
    <span>{r.rule}</span>
    <span style={{ textAlign: 'right', color: 'var(--ink-900)' }}>{r.s.toFixed(2)}</span>
    <span style={{ textAlign: 'right', color: 'var(--text-muted)' }}>{r.ms}ms</span>
  </div>;
}
window.Overview = Overview; window.ReqRow = ReqRow;

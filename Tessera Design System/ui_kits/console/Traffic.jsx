function Traffic({ sel, setSel, onAllow }) {
  const { Tabs, Input, Card, ScoreMeter, Ticket, Button, IconButton, Tag, Badge } = window.TesseraDesignSystem_992529;
  const [tab, setTab] = React.useState('all');
  const [q, setQ] = React.useState('');
  const all = window.TS_DATA.requests;
  const rows = all.filter(r => (tab === 'all' || r.v === tab) && (r.r + r.rule + r.ip).includes(q));
  const cnt = v => all.filter(r => r.v === v).length;
  return <>
    <Topbar title="Traffic"><div style={{ width: 280 }}><Input icon="search" mono placeholder="route, rule or IP" value={q} onChange={e => setQ(e.target.value)} /></div></Topbar>
    <div style={{ display: 'flex', minHeight: 0, flex: 1 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ padding: '8px 24px 0' }}><Tabs value={tab} onChange={setTab} tabs={[{ id: 'all', label: 'All', count: all.length }, { id: 'blocked', label: 'Blocked', count: cnt('blocked') }, { id: 'jev', label: 'JEV', count: cnt('jev') }, { id: 'review', label: 'Review', count: cnt('review') }, { id: 'passed', label: 'Passed', count: cnt('passed') }]} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '80px 110px 56px 1fr 140px 60px 70px', gap: 16, padding: '12px 24px', font: '500 10px var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-faint)' }}><span>Time</span><span>Verdict</span><span>Method</span><span>Route</span><span>Rule</span><span style={{ textAlign: 'right' }}>Score</span><span style={{ textAlign: 'right' }}>Cost</span></div>
        {rows.map(r => <ReqRow key={r.id} r={r} active={sel && sel.id === r.id} onClick={() => setSel(r)} />)}
        {!rows.length && <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)', font: '400 14px var(--font-sans)' }}>No requests match.</div>}
      </div>
      {sel && <aside style={{ width: 380, flex: 'none', borderLeft: '1px solid var(--border-default)', background: 'var(--bone-50)', padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Badge status={sel.v}>{sel.v === 'jev' ? 'JEV' : sel.v}</Badge><span style={{ flex: 1, font: '400 12px var(--font-mono)', color: 'var(--text-muted)' }}>{sel.id}</span><IconButton icon="x" label="Close" size="sm" onClick={() => setSel(null)} /></div>
        <div style={{ font: '400 20px var(--font-mono)', color: 'var(--ink-900)', letterSpacing: '-0.02em' }}><span style={{ color: 'var(--text-muted)' }}>{sel.m}</span> {sel.r}</div>
        <ScoreMeter score={sel.s} />
        <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', rowGap: 10, font: '400 13px var(--font-mono)' }}>
          {[['Rule', sel.rule], ['Source', sel.ip], ['Time', sel.t], ['Cost', sel.ms + 'ms']].map(([k, v]) => <React.Fragment key={k}><span style={{ color: 'var(--text-muted)' }}>{k}</span><span style={{ color: 'var(--ink-900)' }}>{v}</span></React.Fragment>)}
        </div>
        {sel.payload && <div><div style={{ font: '500 10px var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 8 }}>Payload</div><pre style={{ margin: 0, padding: 14, borderRadius: 'var(--radius-md)', background: 'var(--ink-900)', color: sel.v === 'blocked' ? 'var(--terracotta-400)' : 'var(--bone-300)', font: '400 12px/1.6 var(--font-mono)', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{sel.payload}</pre></div>}
        {sel.v === 'jev' && <div style={{ font: '400 14px/1.5 var(--font-sans)', color: 'var(--text-body)' }}>JEV: declared PNG but the body starts with a PHP open tag. Held for review; not forwarded.</div>}
        <Ticket numeral={sel.v === 'passed' ? 'XII' : 'X'} label="gate" status={sel.v} title={sel.v === 'passed' ? 'Request admitted' : sel.v === 'blocked' ? 'Entry refused' : 'Held at the gate'} meta={sel.id + ' · ' + sel.ms + 'ms'} style={{ minWidth: 0 }} />
        <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}><Button variant="outline" size="sm" iconLeft="copy">Copy as cURL</Button>{sel.v !== 'passed' && <Button variant="secondary" size="sm" onClick={() => onAllow(sel)}>Allow this shape</Button>}</div>
      </aside>}
    </div>
  </>;
}
window.Traffic = Traffic;

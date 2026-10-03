function PolicySection() {
  const { Terminal, Button, Tag, Icon } = window.TesseraDesignSystem_992529;
  const base = [
    { kind: 'cmd', text: 'tessera policy generate ./src' },
    { kind: 'comment', text: '# 38 routes · 4 upload handlers · 2 GraphQL operations' },
    { kind: 'code', text: 'route: "POST /api/login"' },
    { kind: 'code', text: 'body:' },
    { kind: 'code', text: '  email: { type: "email", max: 254 }' },
    { kind: 'code', text: '  password: { type: "string", max: 128 }' },
    { kind: 'code', text: 'rate: 12' },
    { kind: 'comment', text: '' },
    { kind: 'cmd', text: 'tessera tail --route /api/login' },
  ];
  const live = [
    { kind: 'pass', text: '✓ passed   schema ok                    0.02' },
    { kind: 'block', text: "✕ dropped  sqli.union  ' OR 1=1 --       0.94" },
    { kind: 'pass', text: '✓ passed   schema ok                    0.01' },
    { kind: 'jev', text: '→ jev      anomaly.len  4.2kB password   0.61' },
    { kind: 'block', text: '✕ dropped  schema.extra  "role":"admin" 0.88' },
  ];
  const [n, setN] = React.useState(1);
  React.useEffect(() => { const t = setInterval(() => setN(x => x >= live.length ? 1 : x + 1), 1400); return () => clearInterval(t); }, []);
  const pts = [['Read from your code', 'Routes, types and environment become per-endpoint rules.'], ['Reviewed like a diff', 'Policies are plain files in your repository.'], ['No traffic training', 'Nothing is learned from your users.']];
  const lab = { font: '500 11px var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)' };
  return <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 160px', display: 'grid', gridTemplateColumns: '5fr 1fr 6fr', alignItems: 'center' }}>
    <div>
      <div style={lab}>Policies</div>
      <h2 style={{ margin: '16px 0 0', font: '300 48px/1.08 var(--font-sans)', letterSpacing: '-0.03em', color: 'var(--ink-900)', textWrap: 'balance' }}>Your code already knows what a valid request looks like.</h2>
      <p style={{ margin: '20px 0 8px', font: '400 17px/1.55 var(--font-sans)', color: 'var(--text-body)', textWrap: 'pretty' }}>Tessera reads your routes, types and environment and writes a policy for each endpoint.</p>
      <div style={{ margin: '0 0 28px' }}>{pts.map(([t, d]) => <div key={t} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 8, padding: '14px 0', borderTop: '1px solid var(--border-default)' }}><span style={{ color: 'var(--blue-700)', paddingTop: 2 }}><Icon name="check" size={16} strokeWidth={2} /></span><div><div style={{ font: '500 15px var(--font-sans)', color: 'var(--ink-900)' }}>{t}</div><div style={{ font: '400 14px/1.5 var(--font-sans)', color: 'var(--text-muted)', marginTop: 2 }}>{d}</div></div></div>)}</div>
      <Button variant="outline" iconRight="arrow-up-right">Policy reference</Button>
    </div>
    <div />
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: '24px -16px -16px 24px', background: 'var(--bone-200)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)' }} />
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}><Tag>src/routes/auth.ts</Tag><Tag mono={false}>38 routes</Tag><Tag mono={false}>0.8 ms p95</Tag></div>
        <Terminal title="policy.tessera.yml" lines={[...base, ...live.slice(0, n)]} style={{ minHeight: 430 }} />
      </div>
    </div>
  </section>;
}
window.PolicySection = PolicySection;

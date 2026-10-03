function Flow() {
  const { ScoreMeter, Badge, Tag, Icon } = window.TesseraDesignSystem_992529;
  const steps = [
    ['I', 'Intercept', 'A transparent reverse proxy receives every HTTP request before your application does. No SDK, no code changes.', 'Listening on :443 → upstream app.internal:8080'],
    ['II', 'Check', 'A static-analysis toolchain validates magic bytes, schemas and known injection shapes against the policy for that route.', 'Median cost 0.4 ms per request'],
    ['III', 'Decide', 'Clean traffic passes straight through. Suspicious requests are routed to JEV, which returns a maliciousness score with context.', 'About 1% of traffic reaches JEV'],
    ['IV', 'Adapt', 'EWMA-based feedback tracks attacks per endpoint and raises analysis depth where it is needed, then lowers it again.', 'α 0.3 · window 5 min'],
  ];
  const nodes = ['Request', 'Proxy', 'Static analysis', 'JEV', 'Your app'];
  const lit = [[0, 1], [1, 2], [2, 3, 4], [2, 3, 4]];
  const wrap = React.useRef(null);
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const f = () => { const el = wrap.current; if (!el) return; const r = el.getBoundingClientRect(); const v = -r.top / Math.max(1, r.height - window.innerHeight); setP(isFinite(v) ? Math.max(0, Math.min(1, v)) : 0); };
    f(); window.addEventListener('scroll', f, { passive: true }); window.addEventListener('resize', f);
    return () => { window.removeEventListener('scroll', f); window.removeEventListener('resize', f); };
  }, []);
  const on = Math.max(0, Math.min(3, Math.floor(p * 4 - 0.0001))) || 0;
  const local = Math.max(0, Math.min(1, p * 4 - on));
  const lab = { font: '500 10px var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-faint)' };
  const row = (k, v, c) => <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: '1px solid var(--border-subtle)', font: '400 13px var(--font-mono)' }}><span style={{ color: 'var(--text-muted)' }}>{k}</span><span style={{ color: c || 'var(--ink-900)' }}>{v}</span></div>;
  const panels = [
    <div key="0"><div style={lab}>Incoming · last second</div>{[['GET', '/api/orders', '10.4.12.88'], ['POST', '/api/login', '185.220.101.4'], ['GET', '/api/search?q=', '77.88.21.3'], ['PUT', '/api/avatar', '91.198.4.17']].map((r, i) => <div key={i} style={{ display: 'grid', gridTemplateColumns: '48px 1fr auto', gap: 12, padding: '10px 0', borderTop: '1px solid var(--border-subtle)', font: '400 13px var(--font-mono)', opacity: local * 4 > i ? 1 : 0.15, transition: 'opacity var(--dur-base) var(--ease-out)' }}><span style={{ color: 'var(--text-muted)' }}>{r[0]}</span><span style={{ color: 'var(--ink-900)' }}>{r[1]}</span><span style={{ color: 'var(--text-faint)' }}>{r[2]}</span></div>)}</div>,
    <div key="1"><div style={lab}>Checks · POST /api/login</div>{[['Schema', 'email ≤ 254, password ≤ 128'], ['Magic bytes', 'n/a'], ['Injection shapes', 'sqli, xss, path traversal'], ['Rate', '12 / min / IP']].map((r, i) => <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderTop: '1px solid var(--border-subtle)', opacity: local * 4 > i ? 1 : 0.15, transition: 'opacity var(--dur-base) var(--ease-out)' }}><span style={{ color: 'var(--verdigris-500)' }}><Icon name="check" size={16} strokeWidth={2} /></span><span style={{ font: '500 14px var(--font-sans)', color: 'var(--ink-900)', width: 130 }}>{r[0]}</span><span style={{ font: '400 12px var(--font-mono)', color: 'var(--text-muted)' }}>{r[1]}</span></div>)}</div>,
    <div key="2" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}><div style={lab}>Verdicts</div>{[['GET /api/orders', 0.03, 'passed', 'Passed'], ['PUT /api/avatar', 0.58, 'jev', 'Routed to JEV'], ['POST /api/login', Math.min(0.94, 0.1 + local * 0.9), 'blocked', 'Blocked']].map(([r, s, st, l]) => <div key={r}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span style={{ font: '400 13px var(--font-mono)', color: 'var(--ink-900)' }}>{r}</span><Badge status={st}>{l}</Badge></div><ScoreMeter score={s} label={null} showValue={false} tiles={28} /></div>)}</div>,
    <div key="3"><div style={lab}>Analysis depth · EWMA</div>{[['/api/login', 92], ['/api/search', 61], ['/api/avatar', 44], ['/api/orders', 12], ['/health', 2]].map(([e, v], i) => <div key={e} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 40px', gap: 12, alignItems: 'center', padding: '10px 0', borderTop: '1px solid var(--border-subtle)', font: '400 12px var(--font-mono)', color: 'var(--text-body)' }}><span>{e}</span><span style={{ height: 8, background: 'var(--bone-300)' }}><span style={{ display: 'block', height: '100%', width: v * Math.min(1, local * 1.6) + '%', background: v > 70 ? 'var(--clay-500)' : v > 40 ? 'var(--ochre-500)' : 'var(--blue-500)', transition: 'width var(--dur-slow) var(--ease-out)' }} /></span><span style={{ textAlign: 'right' }}>{Math.round(v * Math.min(1, local * 1.6))}%</span></div>)}</div>,
  ];
  const l = lit[on] || lit[0];
  return <section ref={wrap} style={{ height: '420vh', position: 'relative' }}>
    <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '6fr 6fr', gap: 64, alignItems: 'center' }}>
        <div>
          <div style={{ font: '500 11px var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>How it works</div>
          <div style={{ position: 'relative', height: 300, marginTop: 24 }}>
            {steps.map(([n, t, d, m], i) => <div key={n} style={{ position: 'absolute', inset: 0, opacity: on === i ? 1 : 0, transform: `translateY(${on === i ? 0 : on > i ? -16 : 16}px)`, transition: 'all var(--dur-slow) var(--ease-out)', pointerEvents: 'none' }}>
              <div style={{ font: '400 56px/1 var(--font-pixel)', color: 'var(--terracotta-500)' }}>{n}</div>
              <h2 style={{ margin: '24px 0 0', font: '300 56px/1.05 var(--font-sans)', letterSpacing: '-0.035em', color: 'var(--ink-900)' }}>{t}.</h2>
              <p style={{ margin: '18px 0 0', maxWidth: 480, font: '400 18px/1.5 var(--font-sans)', color: 'var(--text-body)', textWrap: 'pretty' }}>{d}</p>
              <div style={{ marginTop: 20 }}><Tag>{m}</Tag></div>
            </div>)}
          </div>
          <div style={{ display: 'flex', gap: 3, marginTop: 8 }}>{steps.map((s, i) => <div key={i} style={{ flex: 1, height: 3, background: 'var(--bone-300)' }}><div style={{ height: '100%', background: 'var(--ink-900)', width: (i < on ? 100 : i === on ? local * 100 : 0) + '%' }} /></div>)}</div>
        </div>
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-2)', padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', paddingBottom: 22 }}>
            {nodes.map((n, i) => <React.Fragment key={n}>
              {i > 0 && <span style={{ width: 12, height: 1, background: l.includes(i) && l.includes(i - 1) ? 'var(--blue-500)' : 'var(--border-strong)' }} />}
              <span style={{ padding: '5px 9px', border: '1px solid', borderColor: l.includes(i) ? 'var(--blue-500)' : 'var(--border-default)', background: l.includes(i) ? 'var(--blue-100)' : 'transparent', borderRadius: 'var(--radius-xs)', font: '400 11px var(--font-mono)', color: 'var(--ink-900)', transition: 'all var(--dur-base) var(--ease-out)' }}>{n}</span>
            </React.Fragment>)}
          </div>
          <div style={{ minHeight: 250 }}>{panels[on]}</div>
          {row('Step', `${on + 1} / 4`)}
        </div>
      </div>
    </div>
  </section>;
}
window.Flow = Flow;

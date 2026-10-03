function SiteFooter({ onDeploy }) {
  const { Button } = window.TesseraDesignSystem_992529;
  const cols = [['Product', ['How it works', 'Policies', 'JEV', 'Pricing']], ['Developers', ['Docs', 'CLI', 'Changelog', 'Status']], ['Company', ['About', 'Security', 'Contact']]];
  return <footer style={{ background: 'var(--bone-100)' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '128px 24px 48px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, paddingBottom: 80, borderBottom: '1px solid var(--border-default)' }}>
        <h2 style={{ margin: 0, maxWidth: 640, font: '300 56px/1.04 var(--font-sans)', letterSpacing: '-0.035em', color: 'var(--ink-900)' }}>Put a gate in front of your app this afternoon.</h2>
        <Button size="lg" iconRight="arrow-right" onClick={onDeploy}>Deploy Tessera</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(3, 1fr)', gap: 24, paddingTop: 40 }}>
        <div><div style={{ font: '500 14px var(--font-sans)', letterSpacing: '.18em', color: 'var(--ink-900)' }}>TESSERA</div><div style={{ marginTop: 10, font: '400 13px var(--font-mono)', color: 'var(--text-muted)' }}>© 2026 · Admit one.</div></div>
        {cols.map(([h, ls]) => <div key={h}><div style={{ font: '500 11px var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>{h}</div>{ls.map(l => <a key={l} href="#" style={{ display: 'block', font: '400 14px/2 var(--font-sans)', color: 'var(--text-body)', textDecoration: 'none' }}>{l}</a>)}</div>)}
      </div>
    </div>
  </footer>;
}
window.SiteFooter = SiteFooter;

function SiteHeader({ onDeploy }) {
  const { NavPill, Button } = window.TesseraDesignSystem_992529;
  const [active, setActive] = React.useState('Product');
  return <header style={{ position: 'sticky', top: 0, zIndex: 20, display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '16px 40px', background: 'linear-gradient(var(--bone-100) 60%, rgba(241,235,224,0))' }}>
    <a href="#" style={{ font: '500 15px var(--font-sans)', letterSpacing: '.18em', color: 'var(--ink-900)', textDecoration: 'none' }}>TESSERA</a>
    <NavPill items={['Product', 'How it works', 'Policies', 'Docs', 'Pricing']} active={active} onSelect={setActive} />
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
      <Button variant="ghost" size="sm">Sign in</Button>
      <Button variant="secondary" size="sm" onClick={onDeploy}>Deploy</Button>
    </div>
  </header>;
}
window.SiteHeader = SiteHeader;

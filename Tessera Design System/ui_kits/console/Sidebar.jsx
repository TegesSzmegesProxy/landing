function Sidebar({ screen, go }) {
  const { Icon, Badge } = window.TesseraDesignSystem_992529;
  const items = [['overview', 'Overview', 'gauge'], ['traffic', 'Traffic', 'activity'], ['policies', 'Policies', 'file-code'], ['settings', 'Settings', 'settings']];
  return <aside style={{ width: 232, flex: 'none', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-default)', background: 'var(--bone-100)', padding: '20px 12px' }}>
    <div style={{ padding: '0 10px 24px', font: '500 14px var(--font-sans)', letterSpacing: '.18em', color: 'var(--ink-900)' }}>TESSERA</div>
    <div style={{ margin: '0 4px 20px', padding: '10px 12px', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', background: 'var(--surface-card)' }}>
      <div style={{ font: '500 13px var(--font-sans)', color: 'var(--ink-900)' }}>storefront-prod</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}><Badge status="jev">Enforce+JEV</Badge></div>
    </div>
    <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {items.map(([id, l, ic]) => { const on = screen === id; return <button key={id} onClick={() => go(id)} style={{ display: 'flex', alignItems: 'center', gap: 10, height: 36, padding: '0 10px', border: 0, borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: on ? 'var(--bone-50)' : 'transparent', boxShadow: on ? 'var(--shadow-1)' : 'none', color: on ? 'var(--ink-900)' : 'var(--stone-700)', font: '500 14px var(--font-sans)', textAlign: 'left' }}><Icon name={ic} size={16} />{l}</button>; })}
    </nav>
    <div style={{ marginTop: 'auto', padding: '0 10px', font: '400 11px/1.6 var(--font-mono)', color: 'var(--text-faint)' }}>proxy v2.4.1<br />eu-west · 3 nodes</div>
  </aside>;
}
window.Sidebar = Sidebar;

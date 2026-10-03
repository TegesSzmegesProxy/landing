function Topbar({ title, children }) {
  const { IconButton } = window.TesseraDesignSystem_992529;
  return <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 64, padding: '0 32px', borderBottom: '1px solid var(--border-default)' }}>
    <h1 style={{ margin: 0, flex: 1, font: '400 22px var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--ink-900)' }}>{title}</h1>
    {children}
    <IconButton icon="bell" label="Alerts" />
    <span style={{ width: 30, height: 30, borderRadius: 999, background: 'var(--terracotta-500)', color: 'var(--bone-50)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '500 12px var(--font-sans)' }}>MK</span>
  </div>;
}
window.Topbar = Topbar;

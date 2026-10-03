function Login({ onIn }) {
  const { Card, Input, Button } = window.TesseraDesignSystem_992529;
  return <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--ink-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
    <img src="../../assets/pixel/hero-amphitheatre-night-4x.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 70%', imageRendering: 'pixelated' }} />
    <div className="theme-bone" style={{ position: 'relative' }}>
      <Card variant="glass" padding={32} style={{ width: 380 }}>
        <div style={{ font: '500 14px var(--font-sans)', letterSpacing: '.18em', color: 'var(--ink-900)' }}>TESSERA</div>
        <div style={{ margin: '28px 0 24px', font: '300 30px/1.1 var(--font-sans)', letterSpacing: '-0.03em', color: 'var(--ink-900)' }}>Sign in to the console</div>
        <form onSubmit={e => { e.preventDefault(); onIn(); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input label="Work email" type="email" defaultValue="marcus@acme.dev" />
          <Input label="Password" type="password" defaultValue="hunter22" />
          <Button full size="lg" type="submit" style={{ marginTop: 6 }}>Continue</Button>
          <Button full variant="outline" type="button" iconLeft="key-round" onClick={onIn}>Use SSO</Button>
        </form>
      </Card>
    </div>
  </div>;
}
window.Login = Login;

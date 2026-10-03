function Hero({ onDeploy }) {
  const { Button, Card, Badge, ScoreMeter } = window.TesseraDesignSystem_992529;
  const reqs = [['GET', '/api/orders', 'passed', 0.03], ['POST', '/api/login', 'blocked', 0.94], ['PUT', '/api/avatar', 'jev', 0.58]];
  const [i, setI] = React.useState(0);
  const L = React.useRef({});
  React.useEffect(() => { const t = setInterval(() => setI(x => (x + 1) % reqs.length), 2200); return () => clearInterval(t); }, []);
  React.useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const y = Math.min(window.scrollY, 1400), t = performance.now() / 1000, R = L.current;
      if (R.img) R.img.style.transform = `translate3d(0,${y * 0.1}px,0) scale(${1 + y * 0.00015})`;
      if (R.c1) R.c1.style.transform = `translate3d(${-y * 0.35 + ((t * 6) % 1600) - 200}px,0,0)`;
      if (R.c2) R.c2.style.transform = `translate3d(${-y * 0.2 + ((t * 3.5 + 600) % 1800) - 300}px,${y * 0.05}px,0)`;
      if (R.c3) R.c3.style.transform = `translate3d(${-y * 0.5 + ((t * 9 + 1000) % 1700) - 250}px,0,0)`;
      if (R.b) R.b.style.transform = `translate3d(${y * 0.9 + ((t * 40) % 1800) - 200}px,${-y * 0.25 + Math.sin(t * 1.2) * 6}px,0)`;
      if (R.fg) R.fg.style.transform = `translate3d(0,${-y * 0.14}px,0)`;
      if (R.glow) R.glow.style.opacity = Math.max(0, 0.9 - y / 700);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener('scroll', on, { passive: true });
    const iv = setInterval(on, 60);
    on();
    return () => { window.removeEventListener('scroll', on); clearInterval(iv); };
  }, []);
  const r = reqs[i];
  const ref = k => el => { L.current[k] = el; };
  const px = { position: 'absolute', imageRendering: 'pixelated', willChange: 'transform', pointerEvents: 'none' };
  return <section style={{ position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'relative', zIndex: 5, maxWidth: 980, margin: '0 auto', padding: '72px 24px 56px', textAlign: 'center' }}>
      <div style={{ font: '500 11px var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Adaptive security layer · reverse proxy</div>
      <h1 style={{ margin: '20px 0 0', font: '300 76px/1.04 var(--font-sans)', letterSpacing: '-0.035em', color: 'var(--ink-900)', textWrap: 'balance' }}>Application-specific protection without the runtime overhead.</h1>
      <p style={{ margin: '24px auto 0', maxWidth: 600, font: '400 19px/1.5 var(--font-sans)', color: 'var(--text-body)', textWrap: 'pretty' }}>Tessera sits between your application and the rest of the world. It writes its policy from your code, checks every request, and asks JEV only when something looks wrong.</p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 32 }}>
        <Button size="lg" iconRight="arrow-right" onClick={onDeploy}>Deploy Tessera</Button>
        <Button size="lg" variant="outline">Read the docs</Button>
      </div>
    </div>
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div ref={ref('glow')} style={{ position: 'absolute', left: '50%', top: '14%', width: 560, height: 560, marginLeft: -280, borderRadius: 999, background: 'radial-gradient(closest-side, rgba(247,243,235,.95), rgba(247,243,235,0))', zIndex: 0 }} />
      <img ref={ref('img')} src="../../assets/pixel/hero-amphitheatre-day.png" alt="" style={{ display: 'block', width: '100%', imageRendering: 'pixelated', willChange: 'transform', transformOrigin: '50% 100%', position: 'relative', zIndex: 1 }} />
      <img ref={ref('c2')} src="../../assets/pixel/cloud.png" alt="" style={{ ...px, left: 0, top: '4%', width: 240, opacity: .85, zIndex: 2 }} />
      <img ref={ref('c1')} src="../../assets/pixel/cloud.png" alt="" style={{ ...px, left: 0, top: '16%', width: 360, zIndex: 2 }} />
      <img ref={ref('c3')} src="../../assets/pixel/cloud.png" alt="" style={{ ...px, left: 0, top: '30%', width: 180, opacity: .9, zIndex: 3 }} />
      <div ref={ref('b')} style={{ ...px, left: 0, top: '10%', width: 84, zIndex: 3, display: 'flex', gap: 22, alignItems: 'flex-start' }}>
        <img src="../../assets/pixel/bird-a.png" alt="" style={{ width: 28, imageRendering: 'pixelated' }} /><img src="../../assets/pixel/bird-b.png" alt="" style={{ width: 28, marginTop: 14, imageRendering: 'pixelated' }} /><img src="../../assets/pixel/bird-a.png" alt="" style={{ width: 20, marginTop: 4, imageRendering: 'pixelated' }} />
      </div>
      <div ref={ref('fg')} style={{ position: 'absolute', right: '6%', top: '22%', width: 300, zIndex: 4 }}>
        <Card variant="glass" padding={18}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ font: '500 11px var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--stone-600)' }}>Gate · live</span>
            <Badge status={r[2]}>{r[2] === 'jev' ? 'JEV' : r[2]}</Badge>
          </div>
          <div style={{ font: '400 15px var(--font-mono)', color: 'var(--ink-900)', margin: '14px 0 16px' }}><span style={{ color: 'var(--stone-600)' }}>{r[0]}</span> {r[1]}</div>
          <ScoreMeter score={r[3]} tiles={16} />
        </Card>
      </div>
    </div>
  </section>;
}
window.Hero = Hero;

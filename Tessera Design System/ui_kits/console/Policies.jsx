function Policies({ toast }) {
  const { Switch, Button, Tag, Terminal, Dialog, Radio, Card } = window.TesseraDesignSystem_992529;
  const [ps, setPs] = React.useState(window.TS_DATA.policies);
  const [sel, setSel] = React.useState(0);
  const [dlg, setDlg] = React.useState(false);
  const [mode, setMode] = React.useState('jev');
  const p = ps[sel];
  return <>
    <Topbar title="Policies"><Button variant="outline" size="sm" iconLeft="refresh-cw" onClick={() => toast({ status: 'passed', title: 'Policy regenerated', message: '38 routes · 2 changed', meta: 'commit 4e1b9c0' })}>Regenerate from source</Button><Button size="sm" onClick={() => setDlg(true)}>Change mode</Button></Topbar>
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 24, padding: 32 }}>
      <Card padding={0}>
        {ps.map((x, i) => <div key={x.route} onClick={() => setSel(i)} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderTop: i ? '1px solid var(--border-subtle)' : 0, cursor: 'pointer', background: sel === i ? 'var(--bone-200)' : 'transparent' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: '400 14px var(--font-mono)', color: 'var(--ink-900)' }}>{x.route}</div>
            <div style={{ font: '400 12px var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>{x.checks}</div>
          </div>
          <span style={{ font: '400 12px var(--font-mono)', color: 'var(--text-faint)' }}>{x.hits} hits</span>
          <span onClick={e => e.stopPropagation()}><Switch checked={x.on} onChange={v => setPs(ps.map((y, j) => j === i ? { ...y, on: v } : y))} /></span>
        </div>)}
      </Card>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Tag>{p.src}</Tag><Tag mono={false}>{p.on ? 'Enforced' : 'Observe only'}</Tag></div>
        <Terminal title={p.route.replace(/\W+/g, '-').replace(/^-|-$/g, '').toLowerCase() + '.tessera.yml'} lines={[{ kind: 'comment', text: '# generated from ' + p.src }, { kind: 'code', text: 'route: "' + p.route + '"' }, { kind: 'code', text: 'enforce: ' + p.on }, ...p.checks.split(' · ').map(c => ({ kind: 'code', text: '  - check: "' + c + '"' })), { kind: 'code', text: 'on_suspicious: "jev"' }, { kind: 'code', text: 'jev_threshold: 0.70' }]} />
      </div>
    </div>
    <Dialog open={dlg} onClose={() => setDlg(false)} title="Change enforcement mode" description="Applies to every route in storefront-prod." actions={<><Button variant="ghost" onClick={() => setDlg(false)}>Cancel</Button><Button onClick={() => { setDlg(false); toast({ status: 'info', title: 'Mode updated', message: { observe: 'Observe only', enforce: 'Enforce', jev: 'Enforce + JEV' }[mode] }); }}>Apply</Button></>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Radio name="mode" value="observe" checked={mode === 'observe'} onChange={setMode} label="Observe only — log, never block" />
        <Radio name="mode" value="enforce" checked={mode === 'enforce'} onChange={setMode} label="Enforce — block on static checks" />
        <Radio name="mode" value="jev" checked={mode === 'jev'} onChange={setMode} label="Enforce + JEV — route suspicious traffic for scoring" />
      </div>
    </Dialog>
  </>;
}
window.Policies = Policies;

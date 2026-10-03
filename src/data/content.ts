import type {
  CheckRow,
  DepthRow,
  FooterColumn,
  IncomingRow,
  NavItem,
  PolicyPoint,
  RequestSample,
  Step,
  TerminalLine,
  VerdictRow,
} from '../types';

export const WORDMARK = 'TESSERA';

export const header = {
  nav: [
    { label: 'Product', href: '#top' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Policies', href: '#policies' },
    { label: 'Docs' },
    { label: 'Pricing' },
  ] satisfies NavItem[],
  signIn: 'Sign in',
  deploy: 'Deploy',
  menu: 'Menu',
  closeMenu: 'Close menu',
};

export const hero = {
  eyebrow: 'Adaptive security layer · reverse proxy',
  title: 'Application-specific protection without the runtime overhead.',
  body: 'Tessera sits between your application and the rest of the world. It writes its policy from your code, checks every request, and asks JEV only when something looks wrong.',
  primary: 'Deploy Tessera',
  secondary: 'Read the docs',
  gateLabel: 'Gate · live',
  samples: [
    { method: 'GET', path: '/api/orders', status: 'passed', score: 0.03 },
    { method: 'POST', path: '/api/login', status: 'blocked', score: 0.94 },
    { method: 'PUT', path: '/api/avatar', status: 'jev', score: 0.58 },
  ] satisfies RequestSample[],
};

export const flow = {
  eyebrow: 'How it works',
  steps: [
    {
      numeral: 'I',
      title: 'Intercept',
      body: 'A transparent reverse proxy receives every HTTP request before your application does. No SDK, no code changes.',
      metric: 'Listening on :443 → upstream app.internal:8080',
    },
    {
      numeral: 'II',
      title: 'Check',
      body: 'A static-analysis toolchain validates magic bytes, schemas and known injection shapes against the policy for that route.',
      metric: 'Median cost 0.4 ms per request',
    },
    {
      numeral: 'III',
      title: 'Decide',
      body: 'Clean traffic passes straight through. Suspicious requests are routed to JEV, which returns a maliciousness score with context.',
      metric: 'About 1% of traffic reaches JEV',
    },
    {
      numeral: 'IV',
      title: 'Adapt',
      body: 'EWMA-based feedback tracks attacks per endpoint and raises analysis depth where it is needed, then lowers it again.',
      metric: 'α 0.3 · window 5 min',
    },
  ] satisfies Step[],
  nodes: ['Request', 'Proxy', 'Static analysis', 'JEV', 'Your app'],
  lit: [[0, 1], [1, 2], [2, 3, 4], [2, 3, 4]] as const,
  incomingLabel: 'Incoming · last second',
  incoming: [
    { method: 'GET', path: '/api/orders', ip: '10.4.12.88' },
    { method: 'POST', path: '/api/login', ip: '185.220.101.4' },
    { method: 'GET', path: '/api/search?q=', ip: '77.88.21.3' },
    { method: 'PUT', path: '/api/avatar', ip: '91.198.4.17' },
  ] satisfies IncomingRow[],
  checksLabel: 'Checks · POST /api/login',
  checks: [
    { name: 'Schema', detail: 'email ≤ 254, password ≤ 128' },
    { name: 'Magic bytes', detail: 'n/a' },
    { name: 'Injection shapes', detail: 'sqli, xss, path traversal' },
    { name: 'Rate', detail: '12 / min / IP' },
  ] satisfies CheckRow[],
  verdictsLabel: 'Verdicts',
  verdicts: [
    { route: 'GET /api/orders', score: 0.03, status: 'passed', label: 'Passed' },
    { route: 'PUT /api/avatar', score: 0.58, status: 'jev', label: 'Routed to JEV' },
    { route: 'POST /api/login', score: 0.94, status: 'blocked', label: 'Blocked' },
  ] satisfies VerdictRow[],
  depthLabel: 'Analysis depth · EWMA',
  stepLabel: 'Step',
};

export const endpoints: readonly DepthRow[] = [
  ['/api/login', 92],
  ['/api/search', 61],
  ['/api/avatar', 44],
  ['/api/orders', 12],
  ['/health', 2],
];

export const policy = {
  eyebrow: 'Policies',
  title: 'Your code already knows what a valid request looks like.',
  body: 'Tessera reads your routes, types and environment and writes a policy for each endpoint.',
  points: [
    { title: 'Read from your code', description: 'Routes, types and environment become per-endpoint rules.' },
    { title: 'Reviewed like a diff', description: 'Policies are plain files in your repository.' },
    { title: 'No traffic training', description: 'Nothing is learned from your users.' },
  ] satisfies PolicyPoint[],
  reference: 'Policy reference',
  tags: { file: 'src/routes/auth.ts', routes: '38 routes', latency: '0.8 ms p95' },
  terminalTitle: 'policy.tessera.yml',
  base: [
    { kind: 'cmd', text: 'tessera policy generate ./src' },
    { kind: 'comment', text: '# 38 routes · 4 upload handlers · 2 GraphQL operations' },
    { kind: 'code', text: 'route: "POST /api/login"' },
    { kind: 'code', text: 'body:' },
    { kind: 'code', text: '  email: { type: "email", max: 254 }' },
    { kind: 'code', text: '  password: { type: "string", max: 128 }' },
    { kind: 'code', text: 'rate: 12' },
    { kind: 'comment', text: '' },
    { kind: 'cmd', text: 'tessera tail --route /api/login' },
  ] satisfies TerminalLine[],
  live: [
    { kind: 'pass', text: '✓ passed   schema ok                    0.02' },
    { kind: 'block', text: "✕ dropped  sqli.union  ' OR 1=1 --       0.94" },
    { kind: 'pass', text: '✓ passed   schema ok                    0.01' },
    { kind: 'jev', text: '→ jev      anomaly.len  4.2kB password   0.61' },
    { kind: 'block', text: '✕ dropped  schema.extra  "role":"admin" 0.88' },
  ] satisfies TerminalLine[],
};

export const bento = {
  eyebrow: 'Dashboard',
  title: 'Analysis goes where the attacks are.',
  scoreLabel: 'Maliciousness score · JEV',
  routes: ['POST /api/login', 'GET /api/search?q=', 'PUT /api/avatar', 'GET /api/orders'],
  initialScores: [0.94, 0.12, 0.61, 0.03],
  latency: {
    label: 'Latency overhead',
    value: '0.8',
    unit: 'ms p95',
    delta: '−0.1 vs last week',
    trend: [1.2, 1.1, 1, 1, 0.9, 0.9, 0.8],
  },
  blocked: { label: 'Blocked · 24h', value: '1,284', delta: '+12% on /api/login' },
  modeLabel: 'Mode',
  mode: 'Enforce+JEV',
  depthLabel: 'Analysis depth by endpoint',
  depthMeta: 'EWMA · α 0.3',
  receiptLabel: 'Last receipt',
  ticket: { numeral: 'XII', label: 'gate', title: 'Request admitted', meta: 'req_7f3a · 0.6ms' },
};

export const footer = {
  title: 'Put a gate in front of your app this afternoon.',
  cta: 'Deploy Tessera',
  tagline: '© 2026 · Admit one.',
  columns: [
    { heading: 'Product', links: ['How it works', 'Policies', 'JEV', 'Pricing'] },
    { heading: 'Developers', links: ['Docs', 'CLI', 'Changelog', 'Status'] },
    { heading: 'Company', links: ['About', 'Security', 'Contact'] },
  ] satisfies FooterColumn[],
};

export const deploy = {
  title: 'Deploy Tessera',
  description: 'Point Tessera at your origin. It starts in observe mode and blocks nothing until you switch.',
  originLabel: 'Upstream origin',
  originPlaceholder: 'https://app.internal:8080',
  sourceLabel: 'Source',
  sources: ['github.com/acme/storefront', 'Upload a directory'],
  cancel: 'Cancel',
  submit: 'Generate policy',
  close: 'Close',
};

export const skipLink = 'Skip to content';

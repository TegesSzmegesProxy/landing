import type {
  CheckRow,
  DepthRow,
  FooterColumn,
  IncomingRow,
  NavItem,
  PolicyPoint,
  PricingTier,
  RequestSample,
  Step,
  TerminalLine,
  Verdict,
  VerdictRow,
} from '../types';

export const WORDMARK = 'TESSERA';

export const header = {
  nav: [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Policies', href: '#policies' },
    { label: 'JEV', href: '#jev' },
    { label: 'Demo', href: '#demo' },
    { label: 'Pricing', href: '#pricing' },
  ] satisfies NavItem[],
  closeMenu: 'Close menu',
};

export const hero = {
  eyebrow: 'Adaptive security layer · reverse proxy',
  title: 'Application-specific protection with minimal runtime overhead',
  body: 'Tessera sits between your application and the rest of the world. It drafts a policy from your repository and environment, checks every request with deterministic tools, and asks JEV when something looks wrong.',
  primary: 'Check demo',
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
      metric: 'Nginx :443 → Tessera :62197 → app.internal:8080',
    },
    {
      numeral: 'II',
      title: 'Check',
      body: 'Deterministic tools check schemas, injection shapes, URLs, auth, protocol abuse and resource limits, but only the ones the policy selects for that endpoint.',
      metric: '149 tools in 9 categories',
    },
    {
      numeral: 'III',
      title: 'Decide',
      body: 'Policy violations are blocked without AI. Suspicious requests, and a sampled share of clean ones, go to JEV, which returns an attack probability.',
      metric: 'BLOCK when attack probability > T',
    },
    {
      numeral: 'IV',
      title: 'Adapt',
      body: 'An asymmetric EWMA tracks attacks per endpoint, raises the sampling rate where they happen and tightens T toward your floor, then relaxes again.',
      metric: 'α 0.3 up · 0.02 down',
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
    { name: 'File type', detail: 'n/a · no uploads' },
    { name: 'Injection shapes', detail: 'sql_injection, xss, null_byte' },
    { name: 'Rate', detail: 'rate_limit · 12 / min' },
  ] satisfies CheckRow[],
  verdictsLabel: 'Verdicts',
  verdicts: [
    { route: 'GET /api/orders', score: 0.03, status: 'passed', label: 'Passed' },
    { route: 'PUT /api/avatar', score: 0.58, status: 'jev', label: 'Routed to JEV' },
    { route: 'POST /api/login', score: 0.94, status: 'blocked', label: 'Blocked' },
  ] satisfies VerdictRow[],
  depthLabel: 'Sampling rate N · EWMA',
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
  title: 'Our code already knows what a valid request looks like.',
  body: 'Tessera reads your linked GitHub repository in a network-less sandbox, adds a redacted environment scan and known CVEs, and drafts a policy for every endpoint and field.',
  points: [
    { title: 'Read from your code', description: 'Routes, fields, dependencies and CVEs become per-endpoint tools and JEV context.' },
    { title: 'Approved before it runs', description: 'Every policy is an immutable version. Approve it, reject it, or edit it in plain language.' },
    { title: 'Signed, then pulled', description: 'The proxy runs only Ed25519-signed bundles it has verified, and keeps the last good one if we are down.' },
  ] satisfies PolicyPoint[],
  reference: 'Policy reference',
  tags: { file: 'tessera.policy/v2', routes: '38 endpoints', latency: 'ed25519 signed' },
  terminalTitle: 'policy · POST /api/login',
  base: [
    { kind: 'cmd', text: 'tessera --analyze-env --project-id <id>' },
    { kind: 'comment', text: '# analysis · 38 endpoints · 4 upload handlers' },
    { kind: 'code', text: 'method: POST   path: /api/login' },
    { kind: 'code', text: 'requestTools: [request_size, rate_limit]' },
    { kind: 'code', text: 'fields:' },
    { kind: 'code', text: '  email:    { location: body, tools: [string_length, xss] }' },
    { kind: 'code', text: '  password: { location: body, tools: [string_length] }' },
    { kind: 'comment', text: '' },
    { kind: 'comment', text: '# proxy log' },
  ] satisfies TerminalLine[],
  live: [
    { kind: 'pass', text: '✓ ALLOW  SAFE · not sampled' },
    { kind: 'block', text: "✕ BLOCK  sql_injection · JEV p 0.94 > T 0.80" },
    { kind: 'pass', text: '✓ ALLOW  SAFE · sampled · JEV p 0.02' },
    { kind: 'jev', text: '→ JEV    entropy_analysis · password · p 0.31' },
    { kind: 'block', text: '✕ BLOCK  additional_properties · POLICY_VIOLATION' },
  ] satisfies TerminalLine[],
};

export const jev = {
  eyebrow: 'JEV',
  title: 'JEV only reads the requests that need it.',
  body: "JEV is Tessera's classification model, not a chatbot. Deterministic tools settle most requests; the rest go to JEV, which answers one question, is this request an attack attempt, with a probability.",
  points: [
    { title: 'Called on suspicion, or by sample', description: 'Every SUSPICIOUS request, plus a share N of SAFE ones. N rises on endpoints under attack and stays inside your bounds.' },
    { title: 'One number decides', description: 'BLOCK only when the attack probability is above your threshold T. Severity and confidence are logged for review.' },
  ] satisfies PolicyPoint[],
  more: { label: 'Why JEV costs so little', href: 'https://typesafe.ai' },
  sampleLabel: 'Every 100 clean requests',
  sampleMeta: 'N = 1% · illustrative',
  /** index of the one tile routed to JEV in the 20 × 5 mosaic */
  jevTile: 47,
  legend: [
    { label: 'Static analysis only', count: '99', detail: 'deterministic, no AI' },
  ],
};

export const pricing = {
  eyebrow: 'Pricing',
  title: 'Run it yourself, or let Tessera run it.',
  body: "Open core is free and self-hosted. Paid plans move the proxy, code analysis and JEV onto Tessera's infrastructure.",
  billingLabel: 'Billing period',
  billing: { monthly: 'Monthly', yearly: 'Yearly' },
  perMonth: '/ month',
  billedMonthly: 'Billed monthly',
  billedYearly: 'billed yearly',
  custom: 'Custom',
  featuredLabel: 'Recommended',
  tiers: [
    {
      name: 'Open core',
      blurb: 'For teams that run their own infrastructure.',
      price: { monthly: 0, yearly: 0 },
      note: 'Free forever · self-hosted',
      cta: 'Read the setup guide',
      features: [
        'Reverse proxy and 149 static-analysis tools',
        'Environment collector CLI',
        'JEV with your own credential',
        'You host, update and scale it',
      ],
    },
    {
      name: 'Hosted',
      blurb: 'For one application, run by Tessera. Plus your own API key for the analysis model.',
      // ponytail: yearly rate is a placeholder (two months free) — set the real one
      price: { monthly: 5.99, yearly: 4.99 },
      cta: 'Check demo',
      deploy: true,
      featured: true,
      features: [
        'Proxy hosted by Tessera, nothing to run',
        'Code analysis runs for you',
        'Analysis model on your API key, usage billed by your provider',
        'JEV included, no keys to manage',
        'More requests analysed by JEV',
        'Sampling bounds and threshold settings',
      ],
    },
    {
      name: 'Company',
      blurb: 'For organisations with their own models.',
      price: null,
      note: 'Priced on volume',
      cta: 'Contact sales',
      features: [
        'Everything in Hosted',
        'Your own policies, written by your AI with Tessera skills',
        'Platform managed for you by Tessera',
        'Highest sampling volumes',
        'Every check and threshold configurable',
      ],
    },
  ] satisfies PricingTier[],
};

/** Mirrors the organization dashboard page of the Tessera control plane, filled with sample data. */
export const bento = {
  eyebrow: 'Dashboard',
  title: 'Every project, policy and proxy in one place.',
  body: 'The hosted control plane is where you link repositories, approve policies, manage credentials and watch your proxies. It never sits in the request path.',
  url: 'app.tessera.dev/orgs/acme',
  org: 'acme',
  user: 'ops@acme.dev',
  nav: {
    dashboard: 'Dashboard',
    settingsLabel: 'Settings',
    settings: ['General', 'API keys'],
    projectsLabel: 'Projects',
    project: 'storefront',
    projectTabs: ['Overview', 'Operations', 'Policies', 'Analyses', 'Tuning', 'Settings'],
  },
  heading: 'Dashboard',
  subheading: 'Projects and shared configuration for',
  reachable: 'Control plane reachable',
  newProject: 'New project',
  stats: [
    { label: 'Projects', value: '3' },
    { label: 'Active API keys', value: '4' },
    { label: 'GitHub installations', value: '1' },
    { label: 'Members', value: '5' },
  ],
  overview: {
    title: 'System overview',
    body: 'Key metrics across all projects.',
    status: 'Healthy',
    slides: [
      { value: '3', label: 'Projects', meta: '2 with an active bundle' },
      { value: '1.42M', label: 'Requests · 24h', meta: 'from proxy telemetry' },
      { value: '1,284', label: 'Blocked · 24h', meta: '61% by static analysis, 39% by JEV' },
      { value: '2.4%', label: 'Sent to JEV · 24h', meta: 'N rising on storefront /api/login' },
    ],
  },
  projects: {
    title: 'Projects',
    body: 'Each project is one protected application with its own policy and bundle.',
    total: '3 total',
    open: 'Open',
    rows: [
      {
        name: 'storefront',
        meta: 'https://shop.acme.dev · bundle v7 · heartbeat 12 s ago',
        status: 'passed',
        statusLabel: 'Healthy',
        trend: [12, 14, 13, 18, 22, 19, 24, 21],
      },
      {
        name: 'admin-api',
        meta: 'https://admin.acme.dev · bundle v3 · v4 activated',
        status: 'jev',
        statusLabel: 'Restart required',
        trend: [4, 5, 4, 6, 5, 7, 6, 6],
      },
      {
        name: 'payments',
        meta: 'https://pay.acme.dev · policy v1 pending approval',
        status: 'review',
        statusLabel: 'Needs attention',
        trend: [0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  },
  jev: {
    title: 'Global JEV integration',
    status: 'Connected',
    body: 'Shared by all projects. Proxies fetch it with a deployment key that has the jev-credentials:read scope.',
    keyLabel: 'API key',
    key: 'jev_••••••••••••3f9c',
    rotate: 'Rotate',
  },
  repos: {
    title: 'Source repositories',
    status: 'Linked',
    body: 'Analysis source is fetched from GitHub through a linked installation.',
    rows: ['acme/storefront', 'acme/admin-api', 'acme/payments'],
    manage: 'Manage installations',
  },
  credentials: {
    title: 'Credentials',
    body: 'Collector keys upload analyses. Deployment keys let proxies pull bundles and report health.',
    rows: [
      { label: 'Collector keys', value: '2 active' },
      { label: 'Deployment keys', value: '2 active' },
    ],
    manage: 'Manage API keys',
  },
};

export const footer = {
  playLabel: 'Send a request',
  verdicts: { passed: 'Request admitted', blocked: 'Request dropped', jev: 'Sent to JEV', review: 'Held for review' } satisfies Record<Verdict, string>,
  tagline: '© 2026',
  columns: [
    { heading: 'Product', links: ['How it works', 'Policies', 'JEV', 'Pricing'] },
    { heading: 'Developers', links: ['Docs'] },
    { heading: 'Company', links: ['Contact', "Github"] },
  ] satisfies FooterColumn[],
};

// ponytail: placeholder until the dashboard is hosted, set the real URL here
export const dashboardUrl = '#';

export const skipLink = 'Skip to content';

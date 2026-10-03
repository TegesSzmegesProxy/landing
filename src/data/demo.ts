import type {
  DemoEdge,
  DemoGroup,
  DemoModel,
  DemoNode,
  DemoNodeId,
  DemoPhase,
  DemoStep,
  PolicyRule,
  RuleId,
  Scenario,
  TemplateLine,
  ToolSpec,
} from '../types';

export const demoCopy = {
  id: 'demo',
  eyebrow: 'Demo',
  title: 'Trace one request through Tessera.',
  body: 'Follow an attack on Adminer, CVE-2025-43960, from the collector in your CI to the 403 at the proxy. Edit the policy, swap the request, move the confidence threshold: the outcome changes with you.',
  note: 'Illustrative scenario with mocked data, modelled on the Tessera architecture. Nothing leaves your browser.',
  stepOf: (n: number, total: number) => `Step ${n} of ${total}`,
  nodesLabel: 'Nodes in this step',
  prev: 'Previous',
  next: 'Next',
  play: 'Auto-play',
  pause: 'Pause',
  reset: 'Reset',
  keys: '← → to step · space to play',
  why: 'Why it matters',
  learnMore: 'Learn more',
  diagramLabel: 'Tessera architecture. Select a node to jump to its step.',
};

export const phases: Record<DemoPhase, { label: string; hint: string }> = {
  learn: { label: 'Learn the app', hint: 'Offline, before any traffic' },
  trace: { label: 'Trace the request', hint: 'Runtime' },
  adapt: { label: 'Adapt', hint: 'Feedback' },
};

/** Plain-English definitions for `{{term}}` markers in step copy. */
export const glossary: Record<string, string> = {
  JEV: "Tessera's decision model. It gets the normalised request, the static evidence and the client's last 3 requests, and returns ATTACK or BENIGN with a maliciousness score from 1 to 6 and a confidence.",
  EWMA: 'Exponentially weighted moving average: a running average that counts recent events more than old ones. Tessera makes it asymmetric, so it rises fast after an attack and cools down slowly.',
  'signed bundle': 'The compiled policy and runtime config under one version, signed by the control plane (Ed25519). The proxy verifies it before use and keeps the last good one if the control plane is unreachable.',
  collector: 'A CLI or CI step that runs in your environment. It checks out the release, redacts secrets and uploads only structured context.',
  'magic bytes': 'The first few bytes of a file, which reveal its real type whatever its name says. Tessera checks them on uploads.',
  'PHP object injection': 'PHP can turn stored text back into live objects (unserialize). If an attacker controls that text, they choose which objects get built.',
  'reverse proxy': 'A server that sits in front of your app and receives requests on its behalf, then forwards the good ones.',
  'Policy API': 'The hosted dashboard and admin API where admins approve, edit or import policies. Every change is a new version that is recompiled and approved before activation.',
};

/* ---------------------------------------------------------------------------
   Diagram — hand-placed in a 1160 × 630 box
--------------------------------------------------------------------------- */

export const diagram = { width: 1160, height: 630, nodeH: 36 } as const;

export const demoGroups: DemoGroup[] = [
  { id: 'codebase', label: 'Codebase analysis', phase: 'learn', x: 10, y: 10, w: 585, h: 175 },
  { id: 'control', label: 'Control plane · hosted', phase: 'learn', x: 610, y: 10, w: 540, h: 175 },
  { id: 'edge', label: 'Edge / Proxy', phase: 'trace', x: 10, y: 225, w: 405, h: 275 },
  { id: 'core', label: 'Core / Enforcement', phase: 'trace', x: 430, y: 225, w: 720, h: 275 },
  { id: 'static', label: 'Static analysis', phase: 'trace', x: 438, y: 248, w: 372, h: 60 },
  { id: 'feedback', label: 'Feedback', phase: 'adapt', x: 700, y: 530, w: 450, h: 90 },
];

const n = (id: DemoNodeId, label: string, phase: DemoPhase, group: string, x: number, y: number, w: number): DemoNode => ({
  id,
  label,
  phase,
  group,
  x,
  y,
  w,
});

export const demoNodes: DemoNode[] = [
  n('git', 'Git', 'learn', 'Codebase analysis', 80, 70, 70),
  n('environment', 'Environment', 'learn', 'Codebase analysis', 80, 140, 112),
  n('dependencies', 'Dependencies', 'learn', 'Codebase analysis', 250, 45, 112),
  n('apiSurface', 'API Surface', 'learn', 'Codebase analysis', 250, 105, 108),
  n('cves', 'CVEs', 'learn', 'Codebase analysis', 430, 140, 76),
  n('policyGen', 'Policy generator', 'learn', 'Control', 690, 50, 134),
  n('policyComp', 'Policy compiler', 'learn', 'Control', 850, 50, 128),
  n('toolchainGen', 'Toolchain generator', 'learn', 'Control', 1025, 50, 156),
  n('policyApi', 'Policy API', 'learn', 'Control', 690, 135, 96),
  n('client', 'Client', 'trace', 'Outside', 55, 280, 70),
  n('ingress', 'Request Ingress', 'trace', 'Edge / Proxy', 170, 280, 128),
  n('normalizer', 'Request Normalizer', 'trace', 'Edge / Proxy', 325, 280, 150),
  n('upstream', 'Upstream', 'trace', 'Edge / Proxy', 150, 430, 96),
  n('runner', 'Runner', 'trace', 'Static analysis', 490, 280, 84),
  n('tools', 'Tools', 'trace', 'Static analysis', 615, 280, 84),
  n('aggregator', 'Aggregator', 'trace', 'Static analysis', 745, 280, 104),
  n('sampling', 'Sampling', 'trace', 'Core / Enforcement', 875, 280, 100),
  n('jev', 'JEV', 'trace', 'Core / Enforcement', 1010, 280, 84),
  n('decision', 'Decision orchestration', 'trace', 'Core / Enforcement', 1000, 430, 176),
  n('policyConfig', 'Policy Config', 'trace', 'Core / Enforcement', 500, 380, 124),
  n('sampler', 'Sampler', 'adapt', 'Feedback', 770, 572, 88),
  n('metrics', 'Metrics', 'adapt', 'Feedback', 910, 572, 88),
  n('threshold', 'Threshold', 'adapt', 'Feedback', 1050, 572, 100),
];

const e = (from: DemoNodeId, to: DemoNodeId, opt: Partial<DemoEdge> = {}): DemoEdge => ({ id: `${from}-${to}`, from, to, ...opt });

/**
 * Edges follow the Mermaid reference. Dashed ones are added so the walkthrough has a path to follow:
 * the client entering, the normalised request reaching the Runner, the cheap path past JEV, and a static block.
 */
export const demoEdges: DemoEdge[] = [
  e('git', 'dependencies'),
  e('git', 'apiSurface'),
  e('environment', 'cves'),
  e('dependencies', 'cves'),
  e('apiSurface', 'policyGen'),
  e('cves', 'policyGen'),
  e('policyGen', 'policyComp'),
  e('policyComp', 'toolchainGen'),
  e('toolchainGen', 'tools'),
  e('policyApi', 'normalizer'),
  e('policyApi', 'runner', { line: true }),
  e('client', 'ingress', { dashed: true }),
  e('ingress', 'normalizer', { line: true }),
  e('normalizer', 'runner', { dashed: true }),
  e('normalizer', 'sampling', { bend: 110 }),
  e('runner', 'tools'),
  e('tools', 'aggregator'),
  e('aggregator', 'sampling', { dashed: true }),
  e('aggregator', 'jev', { bend: -90 }),
  e('aggregator', 'decision', { dashed: true, bend: 40 }),
  e('sampling', 'jev'),
  e('sampling', 'decision', { dashed: true }),
  e('jev', 'decision', { line: true }),
  e('decision', 'upstream'),
  e('decision', 'sampler'),
  e('decision', 'metrics'),
  e('decision', 'threshold'),
  e('sampler', 'sampling'),
  e('policyConfig', 'runner', { dashed: true }),
  e('policyConfig', 'sampling', { dashed: true }),
  e('policyConfig', 'decision', { dashed: true }),
];

/* ---------------------------------------------------------------------------
   Policy, toolchain and checks
--------------------------------------------------------------------------- */

export const policyRules: PolicyRule[] = [
  {
    id: 'serializedObject',
    label: 'Deny serialized PHP objects in state',
    plain: '`state` must never carry a PHP serialized object. A match is a policy violation.',
    policy: ['      deny: php_serialized_object'],
    compiled: ['  field    injection  state · deny php_serialized_object'],
    finding: 'serialized PHP object in `state`',
  },
  {
    id: 'classAllowList',
    label: 'Deny Monolog\\Handler\\* classes',
    plain: 'The logging handlers the CVE abuses can never appear in a field. A match is a policy violation.',
    policy: ['      deny_classes: ["Monolog\\\\Handler\\\\*"]'],
    compiled: ['  field    injection  state · deny_classes Monolog\\Handler\\*'],
    finding: 'class `Monolog\\Handler\\BufferHandler` is denied',
  },
  {
    id: 'maxBody',
    label: 'Cap body and declared sizes',
    plain: 'Bodies over 64 kB, or values declaring sizes over 1 MB, are flagged as suspicious.',
    policy: ['    max_body: 64kB', '    max_declared_size: 1MB'],
    compiled: ['  request  resource   body ≤ 64 kB · declared size ≤ 1 MB'],
  },
  {
    id: 'riskHigh',
    label: 'Mark the endpoint risk: high',
    plain: 'Raises the sampling floor from 5% to 25%, so more SAFE requests are still checked by JEV.',
    policy: ['  risk: high                # sampling minN 0.05 → 0.25'],
    compiled: ['  sampling            minN 0.25 (risk: high)'],
  },
];

export const defaultRules: Record<RuleId, boolean> = {
  serializedObject: true,
  classAllowList: true,
  maxBody: true,
  riskHigh: true,
};

/** Tool groups from the static-analysis reference: schema, injection, resource, url, anomaly, file. */
export const tools: ToolSpec[] = [
  {
    id: 'schema',
    name: 'schema',
    hint: 'Field shape, type, requiredness and size.',
    runs: true,
    attack: { status: 'safe', detail: '`auth[driver]` is in the enum, `state` is a string' },
    benign: { status: 'safe', detail: '5 auth fields match the schema' },
  },
  {
    id: 'injection',
    name: 'injection',
    hint: 'SQL, command, template, XSS, path and other malicious input.',
    runs: true,
    needs: ['serializedObject', 'classAllowList'],
    uncovered: 'no SQL, XSS, template or path shapes · no rule covers serialized objects',
    attack: { status: 'violation', detail: 'serialized PHP object in `state`' },
    benign: { status: 'safe', detail: 'no injection shapes' },
  },
  {
    id: 'resource',
    name: 'resource',
    hint: 'Sizes and counts that could exhaust the server.',
    runs: true,
    needs: ['maxBody'],
    evidence: 0.2,
    uncovered: 'body is 412 bytes · no rule checks declared sizes',
    attack: { status: 'suspicious', detail: '`bufferSize` declares 99,999,999 (limit 1 MB)' },
    benign: { status: 'safe', detail: 'body is 96 bytes' },
  },
  {
    id: 'url',
    name: 'url',
    hint: 'URLs, protocols, hosts and ports the app has no reason to touch.',
    runs: true,
    attack: { status: 'safe', detail: 'no URLs in any field' },
    benign: { status: 'safe', detail: 'no URLs in any field' },
  },
  {
    id: 'anomaly',
    name: 'anomaly',
    hint: 'Does the value look like what this field normally holds?',
    runs: true,
    attack: { status: 'suspicious', detail: '`state` reads like code, not a session token' },
    benign: { status: 'safe', detail: 'values fit the login profile' },
  },
  {
    id: 'file',
    name: 'file · magic bytes',
    hint: 'Does an uploaded file really have the type it claims?',
    runs: false,
    skipReason: 'No file fields on this endpoint',
    attack: { status: 'na', detail: 'n/a' },
    benign: { status: 'na', detail: 'n/a' },
  },
];

export const demoModel: DemoModel = {
  endpoint: 'POST /adminer/',
  scoreThreshold: 3,
  defaultConfidence: 0.8,
  confidenceRange: [0.5, 0.99, 0.01],
  // fixed draws so the demo is repeatable; the proxy uses secure randomness
  sampling: { minN: 0.05, riskMinN: 0.25, maxN: 0.8, draw: { attack: 0.42, benign: 0.18 } },
  ewma: { up: 0.3, down: 0.05, quiet: 5 },
  jev: { attack: { score: 6, confidence: 0.74 }, benign: { score: 1, confidence: 0.96 } },
};

/* ---------------------------------------------------------------------------
   Steps
--------------------------------------------------------------------------- */

const policyTemplate: TemplateLine[] = [
  'tenant: acme-app',
  'endpoint: "POST /adminer/"',
  '  jev_context: "Adminer login form; CVE-2025-43960 applies"',
  '  sampling: { minN: 0.05, maxN: 0.80 }',
  { rule: 'riskHigh' },
  '  request:',
  { rule: 'maxBody' },
  '  fields:',
  '    auth[driver]: { type: enum, values: [server, pgsql, sqlite, oracle, mssql] }',
  '    auth[username]: { type: string, max: 64 }',
  '    state:',
  '      type: string',
  { rule: 'serializedObject' },
  { rule: 'classAllowList' },
];

const toolchainTemplate: TemplateLine[] = [
  'POST /adminer/',
  { rule: 'maxBody' },
  '  request  url        all fields',
  '  request  anomaly    profile adminer-login',
  '  field    schema     6 fields',
  '  field    injection  sqli, xss, template, path',
  { rule: 'serializedObject' },
  { rule: 'classAllowList' },
  '  sampling            N ∈ [0.05, 0.80]',
  { rule: 'riskHigh' },
];

export const demoSteps: DemoStep[] = [
  {
    id: 'git',
    phase: 'learn',
    title: 'The collector checks out the release',
    highlightNodes: ['git'],
    highlightEdges: [],
    explain:
      'Analysis starts in your CI, not on our servers. The Tessera {{collector}} checks out the exact commit, strips secrets and uploads a redacted context package to the control plane.',
    why: 'Secrets and unredacted source never leave your network.',
    data: {
      kind: 'tree',
      title: 'collector · GitHub Actions',
      lines: [
        { kind: 'cmd', text: 'tessera-collect --repo git@github.com:acme/app.git --commit 3f9c2ab' },
        { kind: 'out', text: '✓ checkout  3f9c2ab · release v2.14.0' },
        { kind: 'out', text: '✓ redact    .env, config/database.php · 4 secrets replaced' },
        { kind: 'out', text: '✓ syft      SBOM · 61 packages' },
        { kind: 'out', text: '✓ trivy     2 findings' },
        { kind: 'out', text: '✓ nmap      app.example.com · 80, 443 open' },
        { kind: 'out', text: '↑ upload    context package · 1.8 MB · tenant acme-app' },
      ],
    },
  },
  {
    id: 'dependencies',
    phase: 'learn',
    title: 'List the dependencies',
    highlightNodes: ['dependencies', 'git'],
    highlightEdges: ['git-dependencies'],
    packet: { from: 'git', to: 'dependencies' },
    explain: 'Syft builds a software bill of materials from the lock file. Two packages matter later: Adminer itself and Monolog, the logging library.',
    why: 'You cannot match a vulnerability to software you have not inventoried.',
    data: {
      kind: 'deps',
      source: 'Syft SBOM · composer.lock',
      rows: [
        { name: 'vrana/adminer', version: '4.8.1', note: 'database admin UI', flagged: true },
        { name: 'monolog/monolog', version: '3.5.0', note: 'logging, wired into Adminer', flagged: true },
        { name: 'psr/log', version: '3.0.0', note: 'logging interface' },
        { name: 'symfony/polyfill-mbstring', version: '1.29.0', note: 'string helpers' },
      ],
    },
  },
  {
    id: 'environment',
    phase: 'learn',
    title: 'Inspect the environment',
    highlightNodes: ['environment'],
    highlightEdges: ['environment-cves'],
    explain:
      'The collector also records how the app runs and what is exposed, from inside your network. Monolog is switched on, and Nmap finds /adminer/ reachable from the internet.',
    why: 'A flaw only matters if the vulnerable code is actually enabled and reachable.',
    data: {
      kind: 'env',
      rows: [
        { label: 'Runtime', value: 'PHP 8.1.27 · Apache 2.4.58 · php:8.1-apache' },
        { label: 'Monolog logging', value: 'enabled in config/logging.php', flagged: true },
        { label: 'Exposure (Nmap)', value: '80, 443 open · /adminer/ public, no auth in front', flagged: true },
        { label: 'Secrets', value: 'DB_PASSWORD, APP_KEY → [REDACTED] before upload' },
      ],
    },
  },
  {
    id: 'cves',
    phase: 'learn',
    title: 'Match known CVEs',
    highlightNodes: ['cves', 'dependencies', 'environment'],
    highlightEdges: ['dependencies-cves', 'environment-cves'],
    packet: { from: 'dependencies', to: 'cves' },
    explain:
      'Trivy flags Adminer 4.8.1, and the analysis confirms the vulnerable path is enabled and reachable: a {{PHP object injection}} that can hang the server. A CVE is evidence for the policy, not proof that any request is malicious.',
    why: 'This one has no official patch, so waiting for an upgrade is not a plan.',
    data: {
      kind: 'cve',
      id: 'CVE-2025-43960',
      title: 'Adminer 4.8.1 · object injection leading to denial of service',
      facts: [
        ['Type', 'PHP object injection → DoS (memory exhaustion)'],
        ['Affected', 'Adminer 4.8.1, when Monolog is used for logging'],
        ['Impact', 'An unauthenticated, crafted serialized payload exhausts RAM and hangs the server'],
        ['Source', 'Trivy, confirmed by the control-plane analysis'],
        ['Patch', 'No official patch'],
      ],
      matches: ['vrana/adminer 4.8.1', 'Monolog enabled', '/adminer/ exposed'],
      mitigation: 'Recommended mitigation: limit Monolog usage or filter classes. Tessera can filter them at the proxy.',
    },
  },
  {
    id: 'api-surface',
    phase: 'learn',
    title: 'Extract the API surface',
    highlightNodes: ['apiSurface', 'git'],
    highlightEdges: ['git-apiSurface'],
    packet: { from: 'git', to: 'apiSurface' },
    explain: 'In the control plane, an analysis model reads the redacted code and lists every endpoint (method + path) and the fields each one accepts.',
    why: 'Anything outside the list, or oversized inside it, is already suspect.',
    data: {
      kind: 'api',
      endpoints: [
        { method: 'GET', path: '/adminer/', fields: ['server', 'username', 'db'] },
        {
          method: 'POST',
          path: '/adminer/',
          fields: ['auth[driver]', 'auth[server]', 'auth[username]', 'auth[password]', 'auth[db]', 'state'],
          note: '`state` is free-form text',
        },
        { method: 'GET', path: '/health', fields: [] },
      ],
    },
  },
  {
    id: 'policy',
    phase: 'learn',
    title: 'Generate, compile, sign',
    highlightNodes: ['policyGen', 'policyComp', 'toolchainGen', 'policyApi', 'apiSurface', 'cves', 'tools'],
    highlightEdges: ['apiSurface-policyGen', 'cves-policyGen', 'policyGen-policyComp', 'policyComp-toolchainGen', 'toolchainGen-tools'],
    packet: { from: 'policyGen', to: 'tools' },
    explain:
      'An LLM turns the analysis into a tenant-wide policy with rules per endpoint and per field. The compiler maps it onto registered tools only. After an admin approves it in the {{Policy API}}, the control plane ships it as a {{signed bundle}}.',
    why: 'A patch for this CVE never shipped. A policy rule can block it today.',
    data: {
      kind: 'policy',
      title: 'policy · structured · v7',
      template: policyTemplate,
      toolchainTitle: 'bundle 7f3c2a1 · ed25519 signed',
      toolchain: toolchainTemplate,
      beats: [
        'Policy generator (LLM) writes structured rules from the analysis',
        'Compiler picks and configures registered tools, nothing else',
        'Admin approves, the control plane signs bundle 7f3c2a1',
        'Proxy pulls and verifies it at startup',
      ],
      editNote: 'Switch a rule off, as an admin would in the dashboard. In production each edit is a new version that is recompiled, approved and picked up on the next proxy restart; here it applies at once.',
    },
  },
  {
    id: 'ingress',
    phase: 'trace',
    title: 'The request arrives',
    highlightNodes: ['ingress', 'client'],
    highlightEdges: ['client-ingress'],
    packet: { from: 'client', to: 'ingress' },
    explain:
      'Nginx sends every request to the Tessera proxy, a {{reverse proxy}} on your own server. It resolves the tenant from the host, acme-app, before anything reaches Adminer. This one is a login post carrying a forged object.',
    why: 'Nothing reaches your app without passing the same gate.',
    data: {
      kind: 'request',
      requests: {
        attack: {
          title: 'incoming · POST /adminer/',
          lines: [
            { kind: 'out', text: 'POST /adminer/ HTTP/1.1' },
            { kind: 'out', text: 'Host: app.example.com' },
            { kind: 'out', text: 'Content-Type: application/x-www-form-urlencoded' },
            { kind: 'out', text: '' },
            { kind: 'block', text: 'auth[driver]=server&state=O:37:"Monolog\\Handler\\BufferHandler":4:{s:10:"bufferSize";i:99999999;…<truncated>}' },
          ],
          note: 'Illustrative payload, shortened. It is not a working exploit.',
        },
        benign: {
          title: 'incoming · POST /adminer/',
          lines: [
            { kind: 'out', text: 'POST /adminer/ HTTP/1.1' },
            { kind: 'out', text: 'Host: app.example.com' },
            { kind: 'out', text: 'Content-Type: application/x-www-form-urlencoded' },
            { kind: 'out', text: '' },
            { kind: 'out', text: 'auth[driver]=server&auth[server]=db&auth[username]=root&auth[password]=••••••&auth[db]=' },
          ],
          note: 'An ordinary login to the same endpoint.',
        },
      },
    },
  },
  {
    id: 'normalizer',
    phase: 'trace',
    title: 'Normalise and attach the policy',
    highlightNodes: ['normalizer', 'ingress', 'policyApi', 'policyConfig'],
    highlightEdges: ['ingress-normalizer', 'policyApi-normalizer'],
    packet: { from: 'ingress', to: 'normalizer' },
    explain:
      'Encodings are undone so every tool sees one canonical request. The endpoint policy comes from the in-memory copy of the {{signed bundle}} verified at startup; the request path never calls the control plane.',
    why: 'Enforcement keeps working even if our control plane is down.',
    data: {
      kind: 'normalize',
      variants: {
        attack: {
          before: ['auth%5Bdriver%5D=server&state=O%3A37%3A%22Monolog%5CHandler%5CBufferHandler%22%3A4%3A%7B…'],
          after: [
            'tenantId  acme-app',
            'endpoint  POST /adminer/',
            'clientIp  203.0.113.9',
            'fields',
            '  auth[driver]  "server"                                  body',
            '  state         \'O:37:"Monolog\\Handler\\BufferHandler":4:{…\'  body',
            'files     []',
          ],
          policy: 'POST /adminer/ · v7',
        },
        benign: {
          before: ['auth%5Bdriver%5D=server&auth%5Bserver%5D=db&auth%5Busername%5D=root&…'],
          after: [
            'tenantId  acme-app',
            'endpoint  POST /adminer/',
            'clientIp  198.51.100.24',
            'fields',
            '  auth[driver]    "server"  body',
            '  auth[server]    "db"      body',
            '  auth[username]  "root"    body',
            '  auth[password]  ••••••    body',
            'files     []',
          ],
          policy: 'POST /adminer/ · v7',
        },
      },
    },
  },
  {
    id: 'runner',
    phase: 'trace',
    title: 'Runner plans the checks',
    highlightNodes: ['runner', 'normalizer', 'policyConfig'],
    highlightEdges: ['normalizer-runner', 'policyConfig-runner'],
    packet: { from: 'normalizer', to: 'runner' },
    explain:
      'Every request goes through static analysis, but not through every tool. The Runner reads the endpoint policy: request tools see the whole request, field tools see only their field.',
    why: 'Running only the relevant tools is what keeps the overhead low.',
    data: { kind: 'runner' },
  },
  {
    id: 'tools',
    phase: 'trace',
    title: 'Tools run in parallel',
    highlightNodes: ['tools', 'runner'],
    highlightEdges: ['runner-tools'],
    packet: { from: 'runner', to: 'tools' },
    explain:
      'Each tool sets its own verdict: SAFE, SUSPICIOUS or POLICY_VIOLATION, or ERROR if it crashes or times out. They are deterministic string and size tests, so this takes well under a millisecond.',
    why: 'Most requests are settled right here, with no AI involved.',
    data: { kind: 'tools' },
  },
  {
    id: 'aggregator',
    phase: 'trace',
    title: 'One static verdict',
    highlightNodes: ['aggregator', 'tools'],
    highlightEdges: ['tools-aggregator'],
    packet: { from: 'tools', to: 'aggregator' },
    explain: 'The Aggregator keeps the worst verdict, ERROR > POLICY_VIOLATION > SUSPICIOUS > SAFE, plus compact evidence for JEV.',
    why: 'A policy violation ends here. It never needs AI.',
    data: { kind: 'aggregate' },
  },
  {
    id: 'sampling',
    phase: 'trace',
    title: 'Sampling decides who sees JEV',
    highlightNodes: ['sampling', 'policyConfig', 'jev'],
    highlightEdges: ['aggregator-sampling', 'policyConfig-sampling', 'sampling-jev'],
    packet: { from: 'aggregator', to: 'sampling' },
    explain:
      'Every SUSPICIOUS request goes to {{JEV}}. Sampling only applies to SAFE ones: each is sent to JEV with probability N, the endpoint’s sampling rate.',
    why: 'AI cost and latency are spent only where they can change the answer.',
    data: { kind: 'sampling' },
    alt: {
      sampled: {
        explain: 'Static analysis found nothing, but this request drew below N, so it goes to {{JEV}} as a sample. `risk: high` raised the floor of N to 25%.',
      },
      skipJev: {
        explain: 'SAFE and not drawn into the sample, so it is allowed without a {{JEV}} call. No model latency, no AI cost.',
        highlightNodes: ['sampling', 'policyConfig', 'decision'],
        highlightEdges: ['aggregator-sampling', 'policyConfig-sampling', 'sampling-decision'],
      },
      violation: {
        explain: 'Static analysis returned POLICY_VIOLATION, so the request never reaches Sampling. It is blocked deterministically, with no {{JEV}} call.',
        highlightNodes: ['aggregator', 'decision'],
        highlightEdges: ['aggregator-decision'],
        packet: { from: 'aggregator', to: 'decision' },
      },
    },
  },
  {
    id: 'jev',
    phase: 'trace',
    title: 'JEV classifies the request',
    highlightNodes: ['jev', 'sampling', 'aggregator'],
    highlightEdges: ['aggregator-jev', 'sampling-jev'],
    packet: { from: 'sampling', to: 'jev' },
    explain:
      '{{JEV}} gets the minimum structured context: the canonical request, the static evidence, the endpoint’s policy context and the client’s last 3 requests. It returns a classification, a score from 1 to 6 and a confidence.',
    why: 'It adds judgement exactly where rules alone are not sure.',
    data: {
      kind: 'jev',
      context: {
        attack: ['203.0.113.9 · last 3 requests', 'GET /adminer/ → 200', 'GET /adminer/?server=db → 200', 'POST /adminer/ · short fields → 200'],
        benign: ['198.51.100.24 · last 3 requests', 'GET /adminer/ → 200', 'GET /adminer/?file=default.css → 200'],
      },
      rationale: {
        high: 'Untrusted serialized data targets a Monolog handler with an inflated buffer size, on an endpoint affected by CVE-2025-43960.',
        mid: '`state` holds an object-shaped value this field never normally carries. Likely hostile, but with a single anomaly the evidence is thin.',
        low: 'An ordinary Adminer login. Fields match the schema, and the recent history is a normal page load.',
      },
    },
    alt: {
      skipJev: {
        explain: '{{JEV}} is not called on this path. The request goes from Sampling straight to the decision, so there is no model call to wait for or pay for.',
        highlightNodes: ['sampling', 'decision'],
        highlightEdges: ['sampling-decision'],
        packet: { from: 'sampling', to: 'decision' },
      },
      violation: {
        explain: '{{JEV}} is not called. A policy violation is a deterministic finding, so the AI has nothing to add.',
        highlightNodes: ['aggregator', 'decision'],
        highlightEdges: ['aggregator-decision'],
        packet: { from: 'aggregator', to: 'decision' },
      },
    },
  },
  {
    id: 'decision',
    phase: 'trace',
    title: 'Decide: allow or block',
    highlightNodes: ['decision', 'jev', 'upstream', 'policyConfig'],
    highlightEdges: ['jev-decision', 'decision-upstream', 'policyConfig-decision'],
    packet: { from: 'jev', to: 'upstream' },
    explain:
      'Decision orchestration combines the static verdict, sampling and the JEV result. JEV blocks only when score > 3 and confidence > T. Only ALLOW reaches Upstream; BLOCK gets HTTP 403.',
    why: 'T is yours. It can be locked, and adaptation may only tighten it, never loosen it.',
    data: { kind: 'decision' },
    alt: {
      skipJev: {
        highlightNodes: ['decision', 'sampling', 'upstream', 'policyConfig'],
        highlightEdges: ['sampling-decision', 'decision-upstream', 'policyConfig-decision'],
        packet: { from: 'sampling', to: 'upstream' },
      },
      block: {
        highlightNodes: ['decision', 'jev', 'policyConfig'],
        highlightEdges: ['jev-decision', 'policyConfig-decision'],
        packet: { from: 'jev', to: 'decision' },
      },
      violation: {
        explain: 'A POLICY_VIOLATION is blocked at once with HTTP 403. Sampling and the confidence threshold are never consulted, and nothing reaches Upstream.',
        highlightNodes: ['decision', 'aggregator', 'policyConfig'],
        highlightEdges: ['aggregator-decision', 'policyConfig-decision'],
        packet: { from: 'aggregator', to: 'decision' },
      },
    },
  },
  {
    id: 'feedback',
    phase: 'adapt',
    title: 'Feedback tunes the sampling',
    highlightNodes: ['sampler', 'metrics', 'threshold', 'decision', 'sampling'],
    highlightEdges: ['decision-sampler', 'decision-metrics', 'decision-threshold', 'sampler-sampling'],
    packet: { from: 'decision', to: 'sampler' },
    explain:
      'The JEV classification feeds the {{EWMA}} attack rate for this endpoint. It rises fast on ATTACK and cools slowly on BENIGN; the controller turns it into a new N between minN and maxN.',
    why: 'Security, latency and AI cost are balanced continuously, inside the bounds you set.',
    data: {
      kind: 'feedback',
      rows: [
        { endpoint: 'POST /adminer/', seed: [0, 0, 0, 0, 0] },
        { endpoint: 'GET /adminer/', seed: [0.05, 0.05, 0.05, 0.05, 0.05] },
        { endpoint: 'GET /health', seed: [0.01, 0.01, 0.01, 0.01, 0.01] },
      ],
      recapTitle: 'What you just traced',
      recap: [
        'A collector in your CI redacts secrets and uploads context; the control plane analyses it.',
        'An LLM drafts a policy per endpoint and per field. It is compiled to registered tools, approved and signed.',
        'The proxy pulls the signed bundle at startup and enforces it locally, even if the control plane is down.',
        'Static analysis runs on every request. Policy violations are blocked without AI.',
        'Suspicious and sampled requests go to JEV, and EWMA feedback tunes N per endpoint.',
      ],
      cta: 'Deploy Tessera',
    },
    alt: {
      skipJev: {
        explain: 'Unsampled requests teach the sampling loop nothing, so N for this endpoint stays at its floor. They still count as benign for the threshold rate.',
      },
      violation: {
        explain: 'Static violations never enter attack-rate feedback: they are deterministic findings, not JEV classifications. N for POST /adminer/ stays where it was.',
      },
    },
  },
];

export const scenarioLabels: Record<Scenario, string> = { attack: 'Attack request', benign: 'Benign request' };

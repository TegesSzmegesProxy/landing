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
  body: 'Follow an attack on Adminer, CVE-2025-43960, from the collector in your CI to the 403 at the proxy. Edit the policy, swap the request, move the attack probability threshold: the outcome changes with you.',
  note: 'Illustrative scenario with mocked data, modelled on the Tessera architecture. Nothing leaves your browser.',
  stepOf: (n: number, total: number) => `Step ${n} of ${total}`,
  pageOf: (n: number, total: number) => `Page ${n} of ${total}`,
  prevPage: 'Previous page',
  nextPage: 'Next page',
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
  JEV: "Tessera's classification model, not a chatbot. It gets the endpoint, the field names, locations and values, file metadata and any static pattern matches. It answers one question, \"is this request an attack attempt?\", with a probability. Only that probability, compared with your threshold T, decides.",
  EWMA: 'Exponentially weighted moving average: a running average that counts recent events more than old ones. Tessera makes it asymmetric (α 0.3 up, 0.02 down), so it rises fast after an attack and cools down slowly.',
  'signed bundle': 'The compiled policy and runtime config under one version (tessera.bundle/v2), signed by the control plane with Ed25519. The proxy checks the signature and content hash before use and keeps the last good copy if the control plane is unreachable.',
  collector: 'The tessera CLI, run in your CI or by hand. It scans your environment with Nmap, Nuclei, Trivy, httpx and Lynis, redacts the report and uploads it. It never uploads source code.',
  'magic bytes': 'The first few bytes of a file, which reveal its real type whatever its name says. Tessera checks them on uploads.',
  'PHP object injection': 'PHP can turn stored text back into live objects (unserialize). If an attacker controls that text, they choose which objects get built.',
  'reverse proxy': 'A server that sits in front of your app and receives requests on its behalf, then forwards the good ones.',
  'Policy API': 'The hosted dashboard and admin API where admins approve, reject, import or edit policies in plain language. Every change is a new immutable version that is recompiled and approved before activation, and the proxy picks it up on its next restart.',
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

/** Each rule selects real tools from the proxy registry (tessera.tools/v2) or sets a real sampling override. */
export const policyRules: PolicyRule[] = [
  {
    id: 'statePattern',
    label: 'Pin `state` to a token format',
    plain: '`state` must match `^[A-Za-z0-9_-]{1,64}$`, the shape of a real Adminer token. Anything else is a policy violation.',
    policy: ['          - regex_pattern: { pattern: "^[A-Za-z0-9_-]{1,64}$" }'],
    compiled: ['  field  body.state         regex_pattern ^[A-Za-z0-9_-]{1,64}$'],
    finding: '`state` does not match ^[A-Za-z0-9_-]{1,64}$',
  },
  {
    id: 'stateLength',
    label: 'Cap the length of `state`',
    plain: 'A token is never longer than 64 characters. A longer `state` is a policy violation.',
    policy: ['          - string_length: { length <= 64 }'],
    compiled: ['  field  body.state         string_length ≤ 64'],
    finding: '`state` is longer than 64 characters',
  },
  {
    id: 'deserialization',
    label: 'Scan `state` for serialized objects',
    plain: 'Flags serialized Java, .NET, PHP, Python and YAML payloads as suspicious. JEV gets the match as a hint.',
    policy: ['          - insecure_deserialization'],
    compiled: ['  field  body.state         insecure_deserialization'],
    finding: 'php_serialized_object in `state`',
  },
  {
    id: 'samplingFloor',
    label: 'Raise the sampling floor for this endpoint',
    plain: 'An endpoint override lifts minN from 5% to 25%, so more SAFE requests are still checked by JEV.',
    policy: ['  sampling: { minN: 0.25 }   # endpoint override'],
    compiled: ['  sampling                  minN 0.25 (endpoint override)'],
  },
];

export const defaultRules: Record<RuleId, boolean> = {
  statePattern: true,
  stateLength: true,
  deserialization: true,
  samplingFloor: true,
};

/** Real tool ids from the proxy registry. 149 exist in 9 categories; the Runner runs only the ones the policy selects. */
export const tools: ToolSpec[] = [
  {
    id: 'enum_validation',
    name: 'enum_validation',
    hint: 'schema · field value must be one of an allowed set.',
    runs: true,
    attack: { status: 'safe', detail: '`auth[driver]` = server, in the allowed set' },
    benign: { status: 'safe', detail: '`auth[driver]` = server, in the allowed set' },
  },
  {
    id: 'regex_pattern',
    name: 'regex_pattern',
    hint: 'schema · field must match a pattern; long values are rejected before matching.',
    runs: true,
    needs: ['statePattern'],
    uncovered: 'not selected for `state`',
    attack: { status: 'violation', detail: '`state` does not match the token pattern' },
    benign: { status: 'na', detail: 'no `state` field, so this field tool does not run' },
  },
  {
    id: 'string_length',
    name: 'string_length',
    hint: 'schema · string length must satisfy a comparison.',
    runs: true,
    needs: ['stateLength'],
    uncovered: 'no length rule on `state`',
    attack: { status: 'violation', detail: '`state` is longer than 64 characters' },
    benign: { status: 'na', detail: 'no `state` field, so this field tool does not run' },
  },
  {
    id: 'insecure_deserialization',
    name: 'insecure_deserialization',
    hint: 'injection · serialized Java, .NET, PHP, Python or YAML objects.',
    runs: true,
    needs: ['deserialization'],
    evidence: 0.05,
    uncovered: 'not selected for `state`',
    attack: { status: 'suspicious', detail: 'php_serialized_object in `state`' },
    benign: { status: 'safe', detail: 'no serialized objects' },
  },
  {
    id: 'xss',
    name: 'xss',
    hint: 'injection · script tags, event handlers and javascript: URLs, encoded or not.',
    runs: true,
    attack: { status: 'safe', detail: 'no script shapes in any field' },
    benign: { status: 'safe', detail: 'no script shapes in any field' },
  },
  {
    id: 'mime_type',
    name: 'mime_type',
    hint: 'file · upload type must be allowed and match its content.',
    runs: false,
    skipReason: 'No file fields on this endpoint',
    attack: { status: 'na', detail: 'n/a' },
    benign: { status: 'na', detail: 'n/a' },
  },
];

export const demoModel: DemoModel = {
  endpoint: 'POST /adminer/',
  defaultThreshold: 0.8,
  thresholdFloor: 0.5,
  // the proxy requires floor ≤ T < 1
  thresholdRange: [0.5, 0.99, 0.01],
  // fixed draws so the demo is repeatable; the proxy uses secure randomness
  sampling: { minN: 0.05, overrideMinN: 0.25, maxN: 0.8, draw: { attack: 0.42, benign: 0.18 } },
  // DEFAULT_ADAPTIVE_TUNING in the proxy
  ewma: { up: 0.3, down: 0.02, quiet: 5, sensitivity: 5 },
  jev: { attack: { attackProbability: 0.88, severity: 2 }, benign: { attackProbability: 0.03, severity: 0 } },
};

/* ---------------------------------------------------------------------------
   Steps
--------------------------------------------------------------------------- */

const policyTemplate: TemplateLine[] = [
  'schema: tessera.policy/v2',
  'endpoints:',
  '  - method: POST',
  '    path: /adminer/',
  '    humanReadablePolicy: "Adminer login. CVE-2025-43960 applies; no patch."',
  '    jevContext: "Login form. `state` is an opaque session token."',
  '    requestTools: [request_size]',
  '    fields:',
  '      - name: auth[driver]   location: body   required: true',
  '        tools: [enum_validation]',
  '      - name: auth[username] location: body',
  '        tools: [xss]',
  '      - name: state          location: body',
  '        tools:',
  { rule: 'statePattern' },
  { rule: 'stateLength' },
  { rule: 'deserialization' },
  '# runtime config, same signed bundle',
  'sampling: { probabilityN: 0.05, minN: 0.05, maxN: 0.80 }',
  { rule: 'samplingFloor' },
  'jev: { attackProbabilityThreshold: 0.80, floor: 0.50 }',
];

const toolchainTemplate: TemplateLine[] = [
  'POST /adminer/',
  '  full   request            request_size',
  '  field  body.auth[driver]  enum_validation [server, pgsql, sqlite, oracle, mssql]',
  '  field  body.auth[username] xss',
  { rule: 'statePattern' },
  { rule: 'stateLength' },
  { rule: 'deserialization' },
  '  sampling                  N ∈ [0.05, 0.80]',
  { rule: 'samplingFloor' },
  '  jev                       T 0.80 · floor 0.50',
];

export const demoSteps: DemoStep[] = [
  {
    id: 'git',
    phase: 'learn',
    title: 'Collect the environment, read the repository',
    highlightNodes: ['git'],
    highlightEdges: [],
    explain:
      'The {{collector}} runs in your CI and scans the environment, then uploads a redacted report. Source never travels with it: the control plane fetches the commit from your linked GitHub repository into a disposable sandbox with no network access.',
    why: 'Secrets are redacted before anything leaves your network, and anything sent to the AI model is redacted again.',
    data: {
      kind: 'tree',
      title: 'collector · GitHub Actions',
      lines: [
        { kind: 'cmd', text: 'tessera --analyze-env --project-id 66f1c0a2e4b9d3f7a8c1b2e3 --project-path .' },
        { kind: 'out', text: '✓ nmap      app.example.com · 80, 443 open' },
        { kind: 'out', text: '✓ httpx     /adminer/ · 200 · Adminer 4.8.1' },
        { kind: 'out', text: '✓ nuclei    1 finding' },
        { kind: 'out', text: '✓ trivy     composer.lock · 2 findings' },
        { kind: 'out', text: '✓ lynis     host hardening report' },
        { kind: 'out', text: '↑ upload    redacted environment report · project acme-app' },
        { kind: 'comment', text: '# control plane: github.com/acme/app @ 3f9c2ab → network-less sandbox' },
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
    explain: 'Trivy scans the project directory and reads the lock file. Two packages matter later: Adminer itself and Monolog, the logging library.',
    why: 'You cannot match a vulnerability to software you have not inventoried.',
    data: {
      kind: 'deps',
      source: 'Trivy · composer.lock',
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
      'The collector also records how the app runs and what is exposed. Monolog is switched on, Nmap finds ports 80 and 443 open, and httpx finds /adminer/ answering without auth in front.',
    why: 'A flaw only matters if the vulnerable code is actually enabled and reachable.',
    data: {
      kind: 'env',
      rows: [
        { label: 'Runtime', value: 'PHP 8.1.27 · Apache 2.4.58 · php:8.1-apache' },
        { label: 'Monolog logging', value: 'enabled in config/logging.php', flagged: true },
        { label: 'Exposure (Nmap, httpx)', value: '80, 443 open · /adminer/ public, no auth in front', flagged: true },
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
      mitigation: 'Recommended mitigation: limit Monolog usage or filter classes. Tessera can reject the payload at the proxy.',
    },
  },
  {
    id: 'api-surface',
    phase: 'learn',
    title: 'Extract the API surface',
    highlightNodes: ['apiSurface', 'git'],
    highlightEdges: ['git-apiSurface'],
    packet: { from: 'git', to: 'apiSurface' },
    explain: 'Inside the sandbox, an analysis model reads the code and lists every endpoint (method + path) and the fields each one accepts. It sees only redacted content.',
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
      'An LLM turns the analysis into a policy with a plain-language statement, JEV context and tools for every endpoint and field. The compiler accepts only tools from the proxy registry, at the right scope. After an admin approves it in the {{Policy API}}, the control plane ships it as a {{signed bundle}}.',
    why: 'A patch for this CVE never shipped. A policy rule can block it today.',
    data: {
      kind: 'policy',
      title: 'tessera.policy/v2 · version 7',
      template: policyTemplate,
      toolchainTitle: 'tessera.bundle/v2 · 7f3c2a1 · ed25519',
      toolchain: toolchainTemplate,
      beats: [
        'Policy generator (LLM) writes the endpoint and field policies from the analysis',
        'Compiler selects registered tools only, and rejects unknown or misplaced ones',
        'Admin approves, the control plane signs bundle 7f3c2a1',
        'Proxy pulls it at startup and checks signature, hash and every tool id',
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
      'Nginx sends every request to the Tessera proxy, a {{reverse proxy}} on your own server (port 62197 by default). It matches the request to an endpoint in the active policy before anything reaches Adminer. This one is a login post carrying a forged object.',
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
      'The body and query are flattened into named fields (`body.state`, `query.q`) and the request gets a hash. The endpoint policy comes from the in-memory copy of the {{signed bundle}} verified at startup; the request path never calls the control plane.',
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
      'Every request goes through static analysis, but not through every one of the 149 tools. The Runner reads the endpoint policy: full tools see the whole request, field tools see only their field, file tools only uploads.',
    why: 'Running only the relevant tools is what keeps the overhead low.',
    data: { kind: 'runner' },
  },
  {
    id: 'tools',
    phase: 'trace',
    title: 'Tools run, one after another',
    highlightNodes: ['tools', 'runner'],
    highlightEdges: ['runner-tools'],
    packet: { from: 'runner', to: 'tools' },
    explain:
      'Each tool sets its own verdict: SAFE, SUSPICIOUS or POLICY_VIOLATION, or ERROR if it cannot decide or throws. They are deterministic, synchronous checks with no network calls and no AI.',
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
    explain: 'The Aggregator keeps the worst verdict, ERROR > POLICY_VIOLATION > SUSPICIOUS > SAFE. SUSPICIOUS hits become pattern matches that JEV can check.',
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
        explain: 'Static analysis found nothing, but this request drew below N, so it goes to {{JEV}} as a sample. The endpoint override raised the floor of N to 25%.',
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
      '{{JEV}} gets only what it needs: the endpoint, each field’s name, location and value, file metadata and any pattern matches. IPs, identifiers, headers and static verdicts are left out. It returns an attack probability, plus a severity (0 to 3) and a confidence for display.',
    why: 'It adds judgement exactly where rules alone are not sure. Identical inputs hit a 24-hour verdict cache instead of the model.',
    data: {
      kind: 'jev',
      context: {
        attack: ['body.auth[driver] = "server"', 'body.state = \'O:37:"Monolog\\Handler\\BufferHandler":4:{…\''],
        benign: ['body.auth[driver] = "server"', 'body.auth[server] = "db"', 'body.auth[username] = "root"', 'body.auth[password] = "••••••"'],
      },
      rationale: {
        high: 'Untrusted serialized data targets a Monolog handler with an inflated buffer size, on an endpoint affected by CVE-2025-43960.',
        mid: '`state` holds an object-shaped value where a plain token is expected. Likely hostile, though no static check flagged it.',
        low: 'An ordinary Adminer login. Every value is plausible input for this endpoint.',
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
      'Decision orchestration combines the static verdict, sampling and the JEV result. JEV blocks only when the attack probability is strictly above T. Only ALLOW reaches Upstream; BLOCK gets HTTP 403 with just a request id.',
    why: 'T is yours. Under attack it tightens toward the floor you set, never past it, and you can lock it.',
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
      'The JEV classification feeds the {{EWMA}} attack rate for this endpoint and tenant. It rises fast on ATTACK and cools slowly on BENIGN; the controller turns it into N = minN + (maxN − minN)(1 − e^(−5s)), always between your bounds.',
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
        'A collector in your CI uploads a redacted environment report; the control plane reads your repository in a network-less sandbox.',
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

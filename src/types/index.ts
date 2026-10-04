export type Verdict = 'blocked' | 'passed' | 'review' | 'jev';
export type BadgeStatus = Verdict | 'neutral';

export type TerminalLineKind = 'cmd' | 'out' | 'code' | 'comment' | 'block' | 'pass' | 'jev' | 'key' | 'warn';

export interface TerminalLine {
  kind?: TerminalLineKind;
  text: string;
}

export interface Step {
  numeral: string;
  title: string;
  body: string;
  metric: string;
}

export interface RequestSample {
  method: string;
  path: string;
  status: Verdict;
  score: number;
}

export interface IncomingRow {
  method: string;
  path: string;
  ip: string;
}

export interface CheckRow {
  name: string;
  detail: string;
}

export interface VerdictRow {
  route: string;
  score: number;
  status: Verdict;
  label: string;
}

/** [endpoint, analysis depth 0–100] */
export type DepthRow = readonly [endpoint: string, depth: number];

export interface PolicyPoint {
  title: string;
  description: string;
}

export interface FooterColumn {
  heading: string;
  links: string[];
}

export interface NavItem {
  label: string;
  /** in-page anchor; items without one render as buttons */
  href?: string;
}

export type Billing = 'monthly' | 'yearly';

export interface PricingTier {
  name: string;
  blurb: string;
  /** USD per month for each billing period; null = quoted per contract */
  price: Record<Billing, number> | null;
  /** replaces the billing line when the price does not depend on the period */
  note?: string;
  cta: string;
  /** links to the dashboard */
  deploy?: boolean;
  featured?: boolean;
  features: string[];
}

/* ---------------------------------------------------------------------------
   Interactive demo — "Trace a request"
--------------------------------------------------------------------------- */

export type DemoPhase = 'learn' | 'trace' | 'adapt';
export type Scenario = 'attack' | 'benign';

export type DemoNodeId =
  | 'git' | 'dependencies' | 'environment' | 'cves' | 'apiSurface'
  | 'policyGen' | 'policyComp' | 'toolchainGen' | 'policyApi'
  | 'client' | 'ingress' | 'normalizer' | 'upstream'
  | 'runner' | 'tools' | 'aggregator' | 'sampling' | 'jev' | 'decision' | 'policyConfig'
  | 'sampler' | 'metrics' | 'threshold';

export interface DemoGroup {
  id: string;
  label: string;
  phase: DemoPhase;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DemoNode {
  id: DemoNodeId;
  label: string;
  phase: DemoPhase;
  /** centre, in diagram units */
  x: number;
  y: number;
  w: number;
  /** owning group label, shown in the mobile list */
  group: string;
}

export interface DemoEdge {
  /** `from-to` */
  id: string;
  from: DemoNodeId;
  to: DemoNodeId;
  /** perpendicular curve offset in diagram units */
  bend?: number;
  /** undirected (Mermaid `---`): no arrowhead, packet may travel both ways */
  line?: boolean;
  /** added for the walkthrough, not in the original diagram */
  dashed?: boolean;
}

export interface PacketHop {
  from: DemoNodeId;
  to: DemoNodeId;
}

export type RuleId = 'statePattern' | 'stateLength' | 'deserialization' | 'samplingFloor';

export interface PolicyRule {
  id: RuleId;
  label: string;
  plain: string;
  /** YAML lines this rule contributes to the policy */
  policy: string[];
  /** lines it contributes to the compiled toolchain */
  compiled: string[];
  /** what the owning tool reports when this rule is the one that fires */
  finding?: string;
}

/** A fixed line, or the slot where a rule's lines go (commented out while the rule is off). */
export type TemplateLine = string | { rule: RuleId };

/** ToolResult verdicts from the architecture contracts; `na` = tool not selected. */
export type CheckStatus = 'safe' | 'suspicious' | 'violation' | 'error' | 'na';
export type StaticVerdict = 'SAFE' | 'SUSPICIOUS' | 'POLICY_VIOLATION' | 'ERROR';

export interface ToolResult {
  status: CheckStatus;
  detail: string;
}

export interface ToolSpec {
  id: string;
  name: string;
  hint: string;
  /** does the Runner select this check for POST /adminer/ and GET /adminer/? */
  runs: boolean;
  skipReason?: string;
  /** the attack is only caught while one of these rules is on */
  needs?: RuleId[];
  /** a SUSPICIOUS finding JEV receives as a pattern match; raises the attack probability */
  evidence?: number;
  /** what the attack reports while none of `needs` is on */
  uncovered?: string;
  attack: ToolResult;
  benign: ToolResult;
}

export interface DepRow {
  name: string;
  version: string;
  note: string;
  flagged?: boolean;
}

export interface EnvRow {
  label: string;
  value: string;
  flagged?: boolean;
}

export interface ApiEndpoint {
  method: string;
  path: string;
  fields: string[];
  note?: string;
}

export interface FeedbackEndpoint {
  endpoint: string;
  /** sampling probability N history before the request, 0–1 */
  seed: number[];
}

export interface DemoModel {
  endpoint: string;
  /** user-set attack probability threshold T, its floor, and the slider range */
  defaultThreshold: number;
  thresholdFloor: number;
  thresholdRange: readonly [min: number, max: number, step: number];
  /** SamplingConfig for the endpoint; `overrideMinN` replaces `minN` while the endpoint override is on */
  sampling: { minN: number; overrideMinN: number; maxN: number; draw: Record<Scenario, number> };
  /** asymmetric EWMA (rises fast, recovers slowly) and the steepness of the saturating N curve */
  ewma: { up: number; down: number; quiet: number; sensitivity: number };
  jev: {
    attack: { attackProbability: number; severity: JevSeverity };
    benign: { attackProbability: number; severity: JevSeverity };
  };
}

/** JEV severity rubric: 0 benign, 1 anomalous, 2 attack attempt, 3 critical. Display only. */
export type JevSeverity = 0 | 1 | 2 | 3;

export type StepData =
  | { kind: 'tree'; title: string; lines: TerminalLine[] }
  | { kind: 'deps'; source: string; rows: DepRow[] }
  | { kind: 'env'; rows: EnvRow[] }
  | {
      kind: 'cve';
      id: string;
      title: string;
      facts: ReadonlyArray<readonly [label: string, value: string]>;
      matches: string[];
      mitigation: string;
    }
  | { kind: 'api'; endpoints: ApiEndpoint[] }
  | { kind: 'policy'; title: string; template: TemplateLine[]; toolchainTitle: string; toolchain: TemplateLine[]; beats: string[]; editNote: string }
  | { kind: 'request'; requests: Record<Scenario, { title: string; lines: TerminalLine[]; note: string }> }
  | { kind: 'normalize'; variants: Record<Scenario, { before: string[]; after: string[]; policy: string }> }
  | { kind: 'runner' }
  | { kind: 'tools' }
  | { kind: 'aggregate' }
  | { kind: 'sampling' }
  | { kind: 'jev'; context: Record<Scenario, string[]>; rationale: { high: string; mid: string; low: string } }
  | { kind: 'decision' }
  | { kind: 'feedback'; rows: FeedbackEndpoint[]; recapTitle: string; recap: string[]; cta: string };

/** Which alternative view of a step applies, given the visitor's choices. */
export type StepVariantKey = 'benign' | 'skipJev' | 'sampled' | 'violation' | 'block' | 'allow';

export interface StepView {
  highlightNodes: DemoNodeId[];
  highlightEdges: string[];
  packet?: PacketHop;
}

export interface StepVariant extends Partial<StepView> {
  explain?: string;
  why?: string;
}

export interface DemoStep extends StepView {
  id: string;
  phase: DemoPhase;
  title: string;
  /** 1–3 plain-English sentences; `{{term}}` marks a glossary term */
  explain: string;
  why: string;
  data: StepData;
  alt?: Partial<Record<StepVariantKey, StepVariant>>;
}

export interface DemoSettings {
  scenario: Scenario;
  rules: Record<RuleId, boolean>;
  /** JEV attack probability threshold T */
  threshold: number;
}

export interface DemoCheck {
  id: string;
  name: string;
  hint: string;
  status: CheckStatus;
  detail: string;
  evidence: number;
}

export interface DemoResult {
  checks: DemoCheck[];
  staticVerdict: StaticVerdict;
  /** how the request left static analysis */
  path: 'violation' | 'suspicious' | 'sampled' | 'skipped';
  sampling: { n: number; draw: number };
  jev: { called: boolean; verdict: 'ATTACK' | 'BENIGN'; attackProbability: number; severity: JevSeverity; confidence: number; tier: 'high' | 'mid' | 'low' };
  verdict: 'block' | 'allow';
  reason: string;
  /** the request was an attack and it was forwarded */
  missed: boolean;
  feedback: Array<{ endpoint: string; series: number[]; target: boolean }>;
}

export interface DemoCtx extends DemoSettings {
  result: DemoResult;
  setRule: (id: RuleId, on: boolean) => void;
  setScenario: (s: Scenario) => void;
  setThreshold: (t: number) => void;
  onDeploy: () => void;
}

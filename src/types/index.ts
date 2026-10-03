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
  /** opens the Deploy dialog */
  deploy?: boolean;
  featured?: boolean;
  features: string[];
}

import { Check, Minus, TriangleAlert, X } from 'lucide-react';
import type { BadgeStatus, CheckStatus } from '../../types';
import { Badge } from '../ui/Badge';

const MAP = {
  pass: ['passed', Check, 'Pass'],
  fail: ['blocked', X, 'Fail'],
  warn: ['review', TriangleAlert, 'Warn'],
  na: ['neutral', Minus, 'n/a'],
} as const satisfies Record<CheckStatus, readonly [BadgeStatus, unknown, string]>;

/** Status chip: icon + word, so meaning never rests on colour. */
export function StatusChip({ status }: { status: CheckStatus }) {
  const [badge, Icon, label] = MAP[status];
  return (
    <Badge status={badge} dot={false}>
      <Icon size={12} strokeWidth={2} aria-hidden />
      {label}
    </Badge>
  );
}

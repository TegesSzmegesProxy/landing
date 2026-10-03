import { Check, Minus, TriangleAlert, X } from 'lucide-react';
import type { BadgeStatus, CheckStatus } from '../../types';
import { Badge } from '../ui/Badge';

const MAP = {
  safe: ['passed', Check, 'Safe'],
  suspicious: ['review', TriangleAlert, 'Suspicious'],
  violation: ['blocked', X, 'Violation'],
  error: ['blocked', X, 'Error'],
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

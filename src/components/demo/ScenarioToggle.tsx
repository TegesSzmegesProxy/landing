import { ArrowLeftRight } from 'lucide-react';
import type { DemoCtx } from '../../types';
import { Button } from '../ui/Button';

/** Swaps the attack for a benign request (and back), then replays the trace from step 7. */
export function ScenarioToggle({ ctx }: { ctx: Pick<DemoCtx, 'scenario' | 'setScenario'> }) {
  const benign = ctx.scenario === 'benign';
  return (
    <Button variant="outline" size="sm" iconLeft={ArrowLeftRight} onClick={() => ctx.setScenario(benign ? 'attack' : 'benign')}>
      {benign ? 'Switch to attack request' : 'Switch to benign request'}
    </Button>
  );
}

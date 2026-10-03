import { ArrowRight, Server } from 'lucide-react';
import { deploy } from '../data/content';
import { Button } from './ui/Button';
import { Dialog } from './ui/Dialog';
import { Input } from './ui/Input';
import { Select } from './ui/Select';

export function DeployDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={deploy.title}
      description={deploy.description}
      closeLabel={deploy.close}
      actions={
        <>
          <Button variant="ghost" onClick={onClose}>
            {deploy.cancel}
          </Button>
          <Button iconRight={ArrowRight} onClick={onClose}>
            {deploy.submit}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-3.5">
        <Input label={deploy.originLabel} mono icon={Server} placeholder={deploy.originPlaceholder} />
        <Select label={deploy.sourceLabel} mono options={deploy.sources} />
      </div>
    </Dialog>
  );
}

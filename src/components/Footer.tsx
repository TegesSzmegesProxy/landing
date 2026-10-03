import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { WORDMARK, footer } from '../data/content';
import { reveal } from '../lib/motion';
import { Button } from './ui/Button';
import { Eyebrow } from './Eyebrow';

const ANCHORS: Record<string, string> = { 'How it works': '#how-it-works', Policies: '#policies' };

export function Footer({ onDeploy }: { onDeploy: () => void }) {
  return (
    <footer aria-labelledby="footer-heading" className="bg-bone-100">
      <div className="max-w-[1200px] mx-auto px-6 pt-32 pb-12">
        <motion.div
          {...reveal}
          className="flex justify-between items-end gap-6 pb-20 border-b border-(--border-default) max-md:flex-col max-md:items-start"
        >
          <h2
            id="footer-heading"
            className="m-0 max-w-[640px] font-sans text-[56px] max-md:text-[40px] font-light leading-[1.04] tracking-[-0.035em] text-ink-900"
          >
            {footer.title}
          </h2>
          <Button size="lg" iconRight={ArrowRight} onClick={onDeploy}>
            {footer.cta}
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-[2fr_repeat(3,1fr)] gap-6 pt-10">
          <div>
            <div className="font-sans text-[14px] leading-[normal] font-medium tracking-[.18em] text-ink-900">{WORDMARK}</div>
            <div className="mt-2.5 font-mono text-[13px] leading-[normal] text-muted">{footer.tagline}</div>
          </div>
          {footer.columns.map((c) => (
            <nav key={c.heading} aria-label={c.heading}>
              <Eyebrow className="mb-3.5">{c.heading}</Eyebrow>
              {c.links.map((l) => (
                <a
                  key={l}
                  href={ANCHORS[l] ?? '#'}
                  className="block font-sans text-[14px] leading-[2] max-md:leading-[44px] text-body no-underline hover:text-ink-900"
                >
                  {l}
                </a>
              ))}
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
}

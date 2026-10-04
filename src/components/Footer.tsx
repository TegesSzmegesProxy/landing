import { WORDMARK, footer } from '../data/content';
import { Eyebrow } from './Eyebrow';

const ANCHORS: Record<string, string> = { 'How it works': '#how-it-works', Policies: '#policies', JEV: '#jev', Pricing: '#pricing', Docs: 'https://tegesszmegesproxy.github.io/docs/', Github: 'https://github.com/TegesSzmegesProxy' };

export function Footer() {
  return (
    <footer className="bg-bone-100">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_repeat(3,1fr)] gap-6">
          <div>
            <div className="font-sans text-[14px] leading-[normal] font-medium tracking-[.18em] text-ink-900">{WORDMARK}</div>
            <div className="mt-2.5 font-mono text-[13px] leading-[normal] text-muted">{footer.tagline}</div>
          </div>
          {footer.columns.map((c) => (
            <nav key={c.heading} aria-label={c.heading}>
              <Eyebrow className="mb-3.5">{c.heading}</Eyebrow>
              {c.links.map((l) => {
                const href = ANCHORS[l] ?? '#';
                const isExternal = href.startsWith('http');
                return (
                  <a
                    key={l}
                    href={href}
                    {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="block font-sans text-[14px] leading-[2] max-md:leading-[44px] text-body no-underline hover:text-ink-900"
                  >
                    {l}
                  </a>
                );
              })}
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
}

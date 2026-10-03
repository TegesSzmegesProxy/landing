import { Fragment } from 'react';
import { Term } from './Term';

const MARK = /(\{\{[^}]+\}\}|`[^`]+`)/;

/** Step copy with `{{glossary term}}` and `code` markers. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(MARK).map((part, i) => {
        if (part.startsWith('{{')) return <Term key={i} term={part.slice(2, -2)} />;
        if (part.startsWith('`'))
          return (
            <code key={i} className="font-mono text-[0.92em] px-1 py-px rounded-xs bg-bone-200 text-ink-900">
              {part.slice(1, -1)}
            </code>
          );
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

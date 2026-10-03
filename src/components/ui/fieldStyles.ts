/** Shared `.ts-in` shell for Input and Select (FIELD_CSS in Input.jsx). */
export const FIELD_SHELL = [
  'flex items-center gap-2 h-10 max-md:h-11 px-3 rounded-sm bg-card border border-(--border-default) text-strong',
  'transition-[border-color,box-shadow] duration-(--dur-fast) ease-out',
  'hover:border-(--border-strong) focus-within:border-blue-500 focus-within:shadow-[0_0_0_3px_rgba(67,164,196,.22)]',
  'data-[error=true]:border-clay-500 data-[disabled=true]:opacity-50',
].join(' ');

export const FIELD_CONTROL =
  'flex-1 min-w-0 h-full border-0 outline-0 focus-visible:outline-0 bg-transparent text-inherit font-[inherit] text-[14px] appearance-none placeholder:text-faint';

/* @ds-bundle: {"format":4,"namespace":"TesseraDesignSystem_992529","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"ICONS","sourcePath":"components/core/icons.js"},{"name":"ScoreMeter","sourcePath":"components/data/ScoreMeter.jsx"},{"name":"Sparkline","sourcePath":"components/data/Sparkline.jsx"},{"name":"StatTile","sourcePath":"components/data/StatTile.jsx"},{"name":"Terminal","sourcePath":"components/data/Terminal.jsx"},{"name":"Ticket","sourcePath":"components/data/Ticket.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"CHOICE_CSS","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"FIELD_CSS","sourcePath":"components/forms/Input.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"NavPill","sourcePath":"components/navigation/NavPill.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"3a05f5e9df9c","components/core/Button.jsx":"99f64e9d4d1f","components/core/Card.jsx":"aa74ae7c4475","components/core/Icon.jsx":"74d3f1853175","components/core/IconButton.jsx":"3b3cc58412c1","components/core/Tag.jsx":"213d277d0a10","components/core/css.js":"39fede3906d1","components/core/icons.js":"a5fbeb8478e0","components/data/ScoreMeter.jsx":"0b788efcb483","components/data/Sparkline.jsx":"ffef31eaa64e","components/data/StatTile.jsx":"476867abeab4","components/data/Terminal.jsx":"ef0fe1000f65","components/data/Ticket.jsx":"e10d2a5b9755","components/feedback/Dialog.jsx":"4c4e74eed1c3","components/feedback/Toast.jsx":"589298364613","components/feedback/Tooltip.jsx":"ec0c6e7eb1b4","components/forms/Checkbox.jsx":"4209bd7f79a4","components/forms/Field.jsx":"b02263d06d63","components/forms/Input.jsx":"0353b7bca15a","components/forms/Radio.jsx":"3e4e4d02f2b6","components/forms/Select.jsx":"f69cfc5985fd","components/forms/Switch.jsx":"1e0a333b217e","components/navigation/NavPill.jsx":"b90bc9d43a18","components/navigation/Tabs.jsx":"c94c6bf3964e","ui_kits/console/Login.jsx":"da0ea01209f8","ui_kits/console/Overview.jsx":"464212bd1b43","ui_kits/console/Policies.jsx":"a8339945e1cd","ui_kits/console/Sidebar.jsx":"802c00494639","ui_kits/console/Topbar.jsx":"0f0327395f13","ui_kits/console/Traffic.jsx":"72c15d86772d","ui_kits/console/data.js":"3b107d047544","ui_kits/website/Bento.jsx":"e8292a2cab59","ui_kits/website/Flow.jsx":"a56d8aaa3f94","ui_kits/website/Footer.jsx":"57fd292fb2ae","ui_kits/website/Header.jsx":"b9ae3bf24b5f","ui_kits/website/Hero.jsx":"bb692cba8c7e","ui_kits/website/PolicySection.jsx":"310ebba8b3fa"},"inlinedExternals":[],"unexposedExports":[{"name":"injectCss","sourcePath":"components/core/css.js"}]} */

(() => {

const __ds_ns = (window.TesseraDesignSystem_992529 = window.TesseraDesignSystem_992529 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
const MAP = {
  blocked: ['var(--status-blocked-bg)', 'var(--clay-600)', 'var(--status-blocked)'],
  passed: ['var(--status-passed-bg)', 'var(--verdigris-600)', 'var(--status-passed)'],
  review: ['var(--status-review-bg)', 'var(--ochre-600)', 'var(--status-review)'],
  jev: ['var(--status-jev-bg)', 'var(--blue-700)', 'var(--status-jev)'],
  neutral: ['var(--border-subtle)', 'var(--text-body)', 'var(--text-faint)']
};
function Badge({
  status = 'neutral',
  dot = true,
  children,
  style
}) {
  const [bg, fg, d] = MAP[status] || MAP.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 22,
      padding: '0 8px',
      borderRadius: 'var(--radius-xs)',
      background: bg,
      color: fg,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      background: d,
      flex: 'none'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const V = {
  paper: {
    background: 'var(--surface-card)',
    border: '1px solid var(--border-subtle)',
    boxShadow: 'var(--shadow-1)',
    color: 'var(--text-body)'
  },
  sunken: {
    background: 'var(--surface-sunken)',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-body)'
  },
  glass: {
    background: 'var(--surface-glass)',
    border: '1px solid rgba(255,255,255,.5)',
    boxShadow: 'var(--shadow-3), var(--shadow-inset)',
    backdropFilter: 'blur(var(--blur-glass)) saturate(1.1)',
    WebkitBackdropFilter: 'blur(var(--blur-glass)) saturate(1.1)',
    color: 'var(--stone-800)'
  },
  'glass-dark': {
    background: 'var(--surface-glass-dark)',
    border: '1px solid var(--border-glass)',
    boxShadow: 'var(--shadow-3)',
    backdropFilter: 'blur(var(--blur-glass))',
    WebkitBackdropFilter: 'blur(var(--blur-glass))',
    color: 'var(--bone-300)'
  },
  ink: {
    background: 'var(--ink-900)',
    border: '1px solid var(--ink-900)',
    color: 'var(--bone-300)'
  }
};
function Card({
  variant = 'paper',
  padding = 24,
  radius = 'var(--radius-lg)',
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderRadius: radius,
      padding,
      ...V[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/css.js
try { (() => {
const done = new Set();
function injectCss(id, css) {
  if (typeof document === 'undefined' || done.has(id)) return;
  done.add(id);
  const el = document.createElement('style');
  el.setAttribute('data-ts', id);
  el.textContent = css;
  document.head.appendChild(el);
}
Object.assign(__ds_scope, { injectCss });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/css.js", error: String((e && e.message) || e) }); }

// components/core/icons.js
try { (() => {
// Lucide icon bodies (ISC), copied from lucide-static@0.460.0
const ICONS = {
  "shield": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" />",
  "shield-check": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" /><path d=\"m9 12 2 2 4-4\" />",
  "shield-alert": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" /><path d=\"M12 8v4\" /><path d=\"M12 16h.01\" />",
  "shield-x": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" /><path d=\"m14.5 9.5-5 5\" /><path d=\"m9.5 9.5 5 5\" />",
  "arrow-right": "<path d=\"M5 12h14\" /><path d=\"m12 5 7 7-7 7\" />",
  "arrow-up-right": "<path d=\"M7 7h10v10\" /><path d=\"M7 17 17 7\" />",
  "check": "<path d=\"M20 6 9 17l-5-5\" />",
  "x": "<path d=\"M18 6 6 18\" /><path d=\"m6 6 12 12\" />",
  "chevron-down": "<path d=\"m6 9 6 6 6-6\" />",
  "chevron-right": "<path d=\"m9 18 6-6-6-6\" />",
  "search": "<circle cx=\"11\" cy=\"11\" r=\"8\" /><path d=\"m21 21-4.3-4.3\" />",
  "settings": "<path d=\"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\" /><circle cx=\"12\" cy=\"12\" r=\"3\" />",
  "activity": "<path d=\"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2\" />",
  "gauge": "<path d=\"m12 14 4-4\" /><path d=\"M3.34 19a10 10 0 1 1 17.32 0\" />",
  "file-code": "<path d=\"M10 12.5 8 15l2 2.5\" /><path d=\"m14 12.5 2 2.5-2 2.5\" /><path d=\"M14 2v4a2 2 0 0 0 2 2h4\" /><path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z\" />",
  "terminal": "<polyline points=\"4 17 10 11 4 5\" /><line x1=\"12\" x2=\"20\" y1=\"19\" y2=\"19\" />",
  "server": "<rect width=\"20\" height=\"8\" x=\"2\" y=\"2\" rx=\"2\" ry=\"2\" /><rect width=\"20\" height=\"8\" x=\"2\" y=\"14\" rx=\"2\" ry=\"2\" /><line x1=\"6\" x2=\"6.01\" y1=\"6\" y2=\"6\" /><line x1=\"6\" x2=\"6.01\" y1=\"18\" y2=\"18\" />",
  "globe": "<circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\" /><path d=\"M2 12h20\" />",
  "lock": "<rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\" /><path d=\"M7 11V7a5 5 0 0 1 10 0v4\" />",
  "key-round": "<path d=\"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z\" /><circle cx=\"16.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\" />",
  "bell": "<path d=\"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9\" /><path d=\"M10.3 21a1.94 1.94 0 0 0 3.4 0\" />",
  "circle-alert": "<circle cx=\"12\" cy=\"12\" r=\"10\" /><line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\" /><line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\" />",
  "info": "<circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 16v-4\" /><path d=\"M12 8h.01\" />",
  "eye": "<path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\" /><circle cx=\"12\" cy=\"12\" r=\"3\" />",
  "filter": "<polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\" />",
  "copy": "<rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\" /><path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\" />",
  "external-link": "<path d=\"M15 3h6v6\" /><path d=\"M10 14 21 3\" /><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\" />",
  "plus": "<path d=\"M5 12h14\" /><path d=\"M12 5v14\" />",
  "minus": "<path d=\"M5 12h14\" />",
  "refresh-cw": "<path d=\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\" /><path d=\"M21 3v5h-5\" /><path d=\"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16\" /><path d=\"M8 16H3v5\" />",
  "zap": "<path d=\"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z\" />",
  "layers": "<path d=\"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z\" /><path d=\"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65\" /><path d=\"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65\" />",
  "git-branch": "<line x1=\"6\" x2=\"6\" y1=\"3\" y2=\"15\" /><circle cx=\"18\" cy=\"6\" r=\"3\" /><circle cx=\"6\" cy=\"18\" r=\"3\" /><path d=\"M18 9a9 9 0 0 1-9 9\" />",
  "book-open": "<path d=\"M12 7v14\" /><path d=\"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z\" />",
  "log-out": "<path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\" /><polyline points=\"16 17 21 12 16 7\" /><line x1=\"21\" x2=\"9\" y1=\"12\" y2=\"12\" />",
  "user": "<path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\" /><circle cx=\"12\" cy=\"7\" r=\"4\" />",
  "clock": "<circle cx=\"12\" cy=\"12\" r=\"10\" /><polyline points=\"12 6 12 12 16 14\" />",
  "scan-line": "<path d=\"M3 7V5a2 2 0 0 1 2-2h2\" /><path d=\"M17 3h2a2 2 0 0 1 2 2v2\" /><path d=\"M21 17v2a2 2 0 0 1-2 2h-2\" /><path d=\"M7 21H5a2 2 0 0 1-2-2v-2\" /><path d=\"M7 12h10\" />",
  "route": "<circle cx=\"6\" cy=\"19\" r=\"3\" /><path d=\"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15\" /><circle cx=\"18\" cy=\"5\" r=\"3\" />",
  "database": "<ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\" /><path d=\"M3 5V19A9 3 0 0 0 21 19V5\" /><path d=\"M3 12A9 3 0 0 0 21 12\" />",
  "sliders-horizontal": "<line x1=\"21\" x2=\"14\" y1=\"4\" y2=\"4\" /><line x1=\"10\" x2=\"3\" y1=\"4\" y2=\"4\" /><line x1=\"21\" x2=\"12\" y1=\"12\" y2=\"12\" /><line x1=\"8\" x2=\"3\" y1=\"12\" y2=\"12\" /><line x1=\"21\" x2=\"16\" y1=\"20\" y2=\"20\" /><line x1=\"12\" x2=\"3\" y1=\"20\" y2=\"20\" /><line x1=\"14\" x2=\"14\" y1=\"2\" y2=\"6\" /><line x1=\"8\" x2=\"8\" y1=\"10\" y2=\"14\" /><line x1=\"16\" x2=\"16\" y1=\"18\" y2=\"22\" />",
  "ellipsis": "<circle cx=\"12\" cy=\"12\" r=\"1\" /><circle cx=\"19\" cy=\"12\" r=\"1\" /><circle cx=\"5\" cy=\"12\" r=\"1\" />",
  "play": "<polygon points=\"6 3 20 12 6 21 6 3\" />",
  "pause": "<rect x=\"14\" y=\"4\" width=\"4\" height=\"16\" rx=\"1\" /><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\" rx=\"1\" />",
  "landmark": "<line x1=\"3\" x2=\"21\" y1=\"22\" y2=\"22\" /><line x1=\"6\" x2=\"6\" y1=\"18\" y2=\"11\" /><line x1=\"10\" x2=\"10\" y1=\"18\" y2=\"11\" /><line x1=\"14\" x2=\"14\" y1=\"18\" y2=\"11\" /><line x1=\"18\" x2=\"18\" y1=\"18\" y2=\"11\" /><polygon points=\"12 2 20 7 4 7\" />",
  "ticket": "<path d=\"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z\" /><path d=\"M13 5v2\" /><path d=\"M13 17v2\" /><path d=\"M13 11v2\" />"
};
Object.assign(__ds_scope, { ICONS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/icons.js", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Icon({
  name,
  size = 16,
  strokeWidth = 1.5,
  style,
  ...rest
}) {
  const body = __ds_scope.ICONS[name] || '';
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      flex: 'none',
      display: 'block',
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: body
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `.ts-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1px solid transparent;border-radius:var(--radius-pill);font-family:var(--font-sans);font-weight:500;letter-spacing:-0.005em;cursor:pointer;white-space:nowrap;transition:background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out)}
.ts-btn:active:not(:disabled){transform:translateY(1px)}
.ts-btn:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px}
.ts-btn:disabled{opacity:.42;cursor:not-allowed}
.ts-btn--sm{height:32px;padding:0 14px;font-size:13px}.ts-btn--md{height:40px;padding:0 18px;font-size:14px}.ts-btn--lg{height:48px;padding:0 24px;font-size:15px}
.ts-btn--primary{background:var(--accent);color:var(--accent-fg)}.ts-btn--primary:hover:not(:disabled){background:var(--blue-300)}
.ts-btn--secondary{background:var(--ink-900);color:var(--bone-100)}.ts-btn--secondary:hover:not(:disabled){background:var(--stone-700)}
.ts-btn--outline{background:transparent;color:var(--text-strong);border-color:var(--border-strong)}.ts-btn--outline:hover:not(:disabled){border-color:var(--text-strong)}
.ts-btn--ghost{background:transparent;color:var(--text-body)}.ts-btn--ghost:hover:not(:disabled){background:var(--border-subtle);color:var(--text-strong)}
.ts-btn--bone{background:var(--bone-50);color:var(--ink-900)}.ts-btn--bone:hover:not(:disabled){background:var(--bone-200)}
.ts-btn--danger{background:var(--clay-500);color:var(--bone-50)}.ts-btn--danger:hover:not(:disabled){background:var(--clay-600)}`;
function Button({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  full,
  children,
  className = '',
  style,
  ...rest
}) {
  __ds_scope.injectCss('btn', CSS);
  const is = size === 'lg' ? 16 : 15;
  return /*#__PURE__*/React.createElement("button", _extends({
    className: `ts-btn ts-btn--${variant} ts-btn--${size} ${className}`,
    style: {
      width: full ? '100%' : undefined,
      ...style
    }
  }, rest), iconLeft && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: is
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: is
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `.ts-ib{display:inline-flex;align-items:center;justify-content:center;border-radius:var(--radius-pill);border:1px solid transparent;cursor:pointer;color:var(--text-body);background:transparent;transition:background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out)}
.ts-ib:hover:not(:disabled){background:var(--border-subtle);color:var(--text-strong)}.ts-ib:active:not(:disabled){transform:translateY(1px)}
.ts-ib:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px}.ts-ib:disabled{opacity:.42;cursor:not-allowed}
.ts-ib--outline{border-color:var(--border-default)}.ts-ib--outline:hover:not(:disabled){border-color:var(--border-strong)}
.ts-ib--solid{background:var(--ink-900);color:var(--bone-100)}.ts-ib--solid:hover:not(:disabled){background:var(--stone-700);color:var(--bone-50)}`;
function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  ...rest
}) {
  __ds_scope.injectCss('ib', CSS);
  const px = {
    sm: 28,
    md: 36,
    lg: 44
  }[size];
  return /*#__PURE__*/React.createElement("button", _extends({
    className: `ts-ib ts-ib--${variant}`,
    "aria-label": label,
    title: label,
    style: {
      width: px,
      height: px
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'sm' ? 14 : 16
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  mono = true,
  onRemove,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 26,
      padding: onRemove ? '0 6px 0 10px' : '0 10px',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid var(--border-default)',
      color: 'var(--text-body)',
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
      fontSize: 12,
      whiteSpace: 'nowrap',
      ...style
    }
  }, children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      display: 'inline-flex',
      border: 0,
      background: 'none',
      padding: 2,
      cursor: 'pointer',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 12
  })));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/ScoreMeter.jsx
try { (() => {
function ScoreMeter({
  score = 0,
  tiles = 20,
  label = 'Maliciousness',
  showValue = true,
  threshold = 0.7,
  tone = 'light',
  style
}) {
  const lit = Math.round(score * tiles);
  const col = i => {
    const p = (i + 1) / tiles;
    if (i >= lit) return tone === 'dark' ? 'rgba(241,235,224,.1)' : 'var(--bone-300)';
    return p > threshold ? 'var(--clay-500)' : p > threshold * 0.6 ? 'var(--ochre-500)' : 'var(--verdigris-500)';
  };
  const verdict = score >= threshold ? 'block' : score >= threshold * 0.6 ? 'review' : 'pass';
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontFamily: 'var(--font-mono)',
      ...style
    }
  }, (label || showValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: dark ? 'var(--bone-500)' : 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, label), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      color: dark ? 'var(--bone-100)' : 'var(--text-strong)'
    }
  }, score.toFixed(2), " \xB7 ", verdict)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${tiles}, 1fr)`,
      gap: 2
    }
  }, Array.from({
    length: tiles
  }, (_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      height: 14,
      background: col(i),
      transition: `background var(--dur-base) var(--ease-out) ${i * 12}ms`
    }
  }))));
}
Object.assign(__ds_scope, { ScoreMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ScoreMeter.jsx", error: String((e && e.message) || e) }); }

// components/data/Sparkline.jsx
try { (() => {
function Sparkline({
  data = [],
  width = 120,
  height = 32,
  color = 'var(--text-strong)',
  fill = true,
  style
}) {
  if (!data.length) return null;
  const max = Math.max(...data),
    min = Math.min(...data),
    r = max - min || 1;
  const pts = data.map((v, i) => [i / (data.length - 1) * width, height - 2 - (v - min) / r * (height - 4)]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 ${width} ${height}`,
    preserveAspectRatio: "none",
    style: {
      display: 'block',
      overflow: 'visible',
      ...style
    }
  }, fill && /*#__PURE__*/React.createElement("path", {
    d: `${d} L${width} ${height} L0 ${height} Z`,
    fill: color,
    opacity: ".08"
  }), /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: color,
    strokeWidth: "1.25",
    vectorEffect: "non-scaling-stroke"
  }));
}
Object.assign(__ds_scope, { Sparkline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Sparkline.jsx", error: String((e && e.message) || e) }); }

// components/data/StatTile.jsx
try { (() => {
function StatTile({
  label,
  value,
  unit,
  delta,
  deltaTone = 'neutral',
  trend,
  trendColor,
  variant = 'paper',
  style
}) {
  const ink = variant === 'ink';
  const dc = {
    good: 'var(--verdigris-500)',
    bad: 'var(--clay-500)',
    neutral: ink ? 'var(--bone-500)' : 'var(--text-muted)'
  }[deltaTone];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      padding: 20,
      borderRadius: 'var(--radius-lg)',
      background: ink ? 'var(--ink-900)' : 'var(--surface-card)',
      border: ink ? '1px solid var(--ink-900)' : '1px solid var(--border-subtle)',
      boxShadow: ink ? 'none' : 'var(--shadow-1)',
      fontFamily: 'var(--font-sans)',
      minWidth: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: ink ? 'var(--bone-500)' : 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 40,
      fontWeight: 400,
      lineHeight: 1,
      letterSpacing: '-0.04em',
      color: ink ? 'var(--bone-50)' : 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: ink ? 'var(--bone-500)' : 'var(--text-muted)'
    }
  }, unit)), delta && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: dc
    }
  }, delta)), trend && /*#__PURE__*/React.createElement(__ds_scope.Sparkline, {
    data: trend,
    width: 96,
    height: 36,
    color: trendColor || (ink ? 'var(--blue-300)' : 'var(--ink-900)')
  })));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/data/Terminal.jsx
try { (() => {
const C = {
  cmd: 'var(--bone-50)',
  out: 'var(--bone-400)',
  comment: 'var(--stone-500)',
  block: 'var(--clay-500)',
  pass: 'var(--verdigris-500)',
  jev: 'var(--blue-300)',
  key: 'var(--blue-300)',
  warn: 'var(--ochre-500)'
};
function hl(text) {
  const parts = [];
  const re = /("[^"]*"|'[^']*'|\b\d+(?:\.\d+)?\b|^\s*[\w.-]+:)/g;
  let last = 0,
    m,
    k = 0;
  while (m = re.exec(text)) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const s = m[0];
    const col = /^["']/.test(s) ? 'var(--ochre-100)' : /:$/.test(s) ? 'var(--blue-300)' : 'var(--terracotta-400)';
    parts.push(/*#__PURE__*/React.createElement("span", {
      key: k++,
      style: {
        color: col
      }
    }, s));
    last = m.index + s.length;
  }
  parts.push(text.slice(last));
  return parts;
}
function Terminal({
  title = 'tessera',
  lines = [],
  highlight = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-lg)',
      background: 'var(--ink-900)',
      border: '1px solid #2c2a28',
      boxShadow: 'var(--shadow-3)',
      overflow: 'hidden',
      fontFamily: 'var(--font-mono)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 38,
      padding: '0 14px',
      borderBottom: '1px solid rgba(241,235,224,.08)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 5
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 8,
      height: 8,
      background: 'var(--stone-700)'
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--stone-500)'
    }
  }, title)), /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0,
      padding: '16px 18px 18px',
      fontSize: 13,
      lineHeight: 1.65,
      color: 'var(--bone-300)',
      overflowX: 'auto',
      whiteSpace: 'pre'
    }
  }, lines.map((l, i) => {
    const ln = typeof l === 'string' ? {
      kind: 'out',
      text: l
    } : l;
    const plain = ln.kind === 'out' || ln.kind === 'code';
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        color: C[ln.kind] || 'var(--bone-300)'
      }
    }, ln.kind === 'cmd' && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--blue-500)'
      }
    }, "$ "), highlight && plain ? hl(ln.text) : ln.text);
  })));
}
Object.assign(__ds_scope, { Terminal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Terminal.jsx", error: String((e && e.message) || e) }); }

// components/data/Ticket.jsx
try { (() => {
function Ticket({
  numeral = 'XII',
  label,
  title,
  meta,
  status = 'passed',
  style
}) {
  const c = {
    passed: 'var(--verdigris-500)',
    blocked: 'var(--clay-500)',
    review: 'var(--ochre-500)',
    jev: 'var(--blue-500)'
  }[status];
  const notch = 'radial-gradient(circle at 0 50%, transparent 7px, #000 7.5px) left/51% 100% no-repeat, radial-gradient(circle at 100% 50%, transparent 7px, #000 7.5px) right/51% 100% no-repeat';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      width: 'fit-content',
      minWidth: 300,
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-sm)',
      WebkitMask: notch,
      mask: notch,
      boxShadow: 'var(--shadow-1)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      width: 76,
      padding: '14px 0',
      background: 'var(--terracotta-500)',
      color: 'var(--bone-50)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontSize: 20,
      letterSpacing: '0.04em',
      lineHeight: 1
    }
  }, numeral), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 9,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      opacity: .85
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '14px 22px 14px 16px',
      borderLeft: '1px dashed var(--border-strong)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      background: c
    }
  }), title), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, meta)));
}
Object.assign(__ds_scope, { Ticket });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Ticket.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  description,
  children,
  actions,
  onClose,
  width = 460
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      background: 'rgba(31,31,31,.32)',
      backdropFilter: 'blur(3px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: width,
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-3)',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      padding: '20px 20px 0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 500,
      letterSpacing: '-0.015em',
      color: 'var(--text-strong)'
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontSize: 14,
      color: 'var(--text-muted)',
      textWrap: 'pretty'
    }
  }, description)), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Close",
    size: "sm",
    onClick: onClose
  })), children && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 24px 0'
    }
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 8,
      padding: 24
    }
  }, actions)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const IC = {
  blocked: ['shield-x', 'var(--clay-500)'],
  passed: ['shield-check', 'var(--verdigris-500)'],
  review: ['shield-alert', 'var(--ochre-500)'],
  info: ['info', 'var(--blue-500)']
};
function Toast({
  status = 'info',
  title,
  message,
  meta,
  onClose,
  style
}) {
  const [ic, c] = IC[status] || IC.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      width: 360,
      padding: '14px 12px 14px 16px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--ink-900)',
      color: 'var(--bone-300)',
      boxShadow: 'var(--shadow-3)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: c,
      paddingTop: 1
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ic,
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--bone-50)'
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      marginTop: 2,
      color: 'var(--bone-400)'
    }
  }, message), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      marginTop: 8,
      color: 'var(--stone-500)'
    }
  }, meta)), onClose && /*#__PURE__*/React.createElement("span", {
    className: "theme-ink"
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Dismiss",
    size: "sm",
    onClick: onClose
  })));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  side = 'top',
  children
}) {
  const [on, setOn] = React.useState(false);
  const pos = side === 'top' ? {
    bottom: 'calc(100% + 6px)',
    left: '50%',
    transform: 'translateX(-50%)'
  } : side === 'bottom' ? {
    top: 'calc(100% + 6px)',
    left: '50%',
    transform: 'translateX(-50%)'
  } : side === 'left' ? {
    right: 'calc(100% + 6px)',
    top: '50%',
    transform: 'translateY(-50%)'
  } : {
    left: 'calc(100% + 6px)',
    top: '50%',
    transform: 'translateY(-50%)'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setOn(true),
    onMouseLeave: () => setOn(false),
    onFocus: () => setOn(true),
    onBlur: () => setOn(false)
  }, children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      ...pos,
      zIndex: 50,
      padding: '5px 8px',
      borderRadius: 'var(--radius-xs)',
      background: 'var(--ink-900)',
      color: 'var(--bone-100)',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      opacity: on ? 1 : 0,
      transition: 'opacity var(--dur-fast) var(--ease-out)'
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CHOICE_CSS = `.ts-ch{display:inline-flex;align-items:center;gap:10px;font-family:var(--font-sans);font-size:14px;color:var(--text-body);cursor:pointer;user-select:none}
.ts-ch input{position:absolute;opacity:0;width:0;height:0}
.ts-ch .box{width:18px;height:18px;flex:none;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--border-strong);background:var(--surface-card);color:var(--ink-900);transition:all var(--dur-fast) var(--ease-out)}
.ts-ch:hover .box{border-color:var(--text-strong)}
.ts-ch input:checked+.box{background:var(--accent);border-color:var(--accent)}
.ts-ch input:focus-visible+.box{outline:2px solid var(--focus-ring);outline-offset:2px}
.ts-ch input:disabled+.box{opacity:.4}.ts-ch[data-disabled="true"]{cursor:not-allowed;color:var(--text-faint)}
.ts-ch .dot{width:6px;height:6px;background:var(--ink-900);opacity:0}.ts-ch input:checked+.box .dot{opacity:1}
.ts-sw .track{width:34px;height:20px;border-radius:999px;background:var(--bone-400);position:relative;flex:none;transition:background var(--dur-base) var(--ease-out)}
.ts-sw .knob{position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:999px;background:var(--bone-50);box-shadow:var(--shadow-1);transition:transform var(--dur-base) var(--ease-out)}
.ts-sw input:checked+.track{background:var(--accent)}.ts-sw input:checked+.track .knob{transform:translateX(14px)}
.ts-sw input:focus-visible+.track{outline:2px solid var(--focus-ring);outline-offset:2px}`;
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  ...rest
}) {
  __ds_scope.injectCss('choice', CHOICE_CSS);
  return /*#__PURE__*/React.createElement("label", {
    className: "ts-ch",
    "data-disabled": !!disabled
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: e => onChange && onChange(e.target.checked, e),
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "box",
    style: {
      borderRadius: 'var(--radius-xs)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 13,
    strokeWidth: 2.25
  })), label);
}
Object.assign(__ds_scope, { CHOICE_CSS, Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function Field({
  label,
  hint,
  error,
  htmlFor,
  children
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, label), children, (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: error ? 'var(--clay-600)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const FIELD_CSS = `.ts-in{display:flex;align-items:center;gap:8px;height:40px;padding:0 12px;border-radius:var(--radius-sm);background:var(--surface-card);border:1px solid var(--border-default);color:var(--text-strong);transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out)}
.ts-in:hover{border-color:var(--border-strong)}.ts-in:focus-within{border-color:var(--blue-500);box-shadow:0 0 0 3px rgba(67,164,196,.22)}
.ts-in[data-error="true"]{border-color:var(--clay-500)}.ts-in[data-disabled="true"]{opacity:.5}
.ts-in input,.ts-in select{flex:1;min-width:0;height:100%;border:0;outline:0;background:transparent;color:inherit;font:inherit;font-size:14px;appearance:none}
.ts-in input::placeholder{color:var(--text-faint)}`;
function Input({
  label,
  hint,
  error,
  icon,
  mono,
  suffix,
  disabled,
  id,
  style,
  ...rest
}) {
  __ds_scope.injectCss('field', FIELD_CSS);
  return /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: label,
    hint: hint,
    error: error,
    htmlFor: id
  }, /*#__PURE__*/React.createElement("span", {
    className: "ts-in",
    "data-error": !!error,
    "data-disabled": !!disabled,
    style: {
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 15
  })), /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    disabled: disabled
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, suffix)));
}
Object.assign(__ds_scope, { FIELD_CSS, Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  label,
  name,
  value,
  checked,
  defaultChecked,
  onChange,
  disabled,
  ...rest
}) {
  __ds_scope.injectCss('choice', __ds_scope.CHOICE_CSS);
  return /*#__PURE__*/React.createElement("label", {
    className: "ts-ch",
    "data-disabled": !!disabled
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: e => onChange && onChange(value, e),
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "box",
    style: {
      borderRadius: 999
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      borderRadius: 999
    }
  })), label);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  hint,
  error,
  options = [],
  mono,
  id,
  style,
  ...rest
}) {
  __ds_scope.injectCss('field', __ds_scope.FIELD_CSS);
  return /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: label,
    hint: hint,
    error: error,
    htmlFor: id
  }, /*#__PURE__*/React.createElement("span", {
    className: "ts-in",
    "data-error": !!error,
    style: {
      position: 'relative',
      paddingRight: 8,
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: id
  }, rest), options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 15
  }))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  ...rest
}) {
  __ds_scope.injectCss('choice', __ds_scope.CHOICE_CSS);
  return /*#__PURE__*/React.createElement("label", {
    className: "ts-ch ts-sw",
    "data-disabled": !!disabled
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: e => onChange && onChange(e.target.checked, e),
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "knob"
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavPill.jsx
try { (() => {
function NavPill({
  items = [],
  active,
  onSelect,
  tone = 'light',
  style
}) {
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: 4,
      borderRadius: 999,
      background: dark ? 'rgba(31,31,31,.62)' : 'rgba(247,243,235,.7)',
      border: dark ? '1px solid var(--border-glass)' : '1px solid rgba(31,31,31,.08)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, items.map((it, i) => {
    const on = it === active;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: it
    }, i > 0 && /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        width: 3,
        height: 3,
        background: dark ? 'var(--bone-500)' : 'var(--stone-500)'
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: () => onSelect && onSelect(it),
      style: {
        height: 34,
        padding: '0 16px',
        border: 0,
        borderRadius: 999,
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 14,
        fontWeight: 450,
        background: on ? dark ? 'rgba(241,235,224,.12)' : 'var(--bone-50)' : 'transparent',
        color: dark ? on ? 'var(--bone-50)' : 'var(--bone-300)' : on ? 'var(--ink-900)' : 'var(--stone-700)',
        transition: 'all var(--dur-fast) var(--ease-out)'
      }
    }, it));
  }));
}
Object.assign(__ds_scope, { NavPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavPill.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  value,
  onChange,
  variant = 'underline',
  style
}) {
  const pill = variant === 'pill';
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: pill ? 2 : 24,
      padding: pill ? 3 : 0,
      borderRadius: pill ? 999 : 0,
      background: pill ? 'var(--surface-sunken)' : 'transparent',
      borderBottom: pill ? 0 : '1px solid var(--border-default)',
      width: pill ? 'fit-content' : 'auto',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, tabs.map(t => {
    const on = t.id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(t.id),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        border: 0,
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 14,
        fontWeight: 500,
        transition: 'all var(--dur-fast) var(--ease-out)',
        ...(pill ? {
          height: 32,
          padding: '0 14px',
          borderRadius: 999,
          background: on ? 'var(--surface-card)' : 'transparent',
          boxShadow: on ? 'var(--shadow-1)' : 'none',
          color: on ? 'var(--text-strong)' : 'var(--text-muted)'
        } : {
          height: 40,
          padding: 0,
          background: 'transparent',
          marginBottom: -1,
          borderBottom: on ? '2px solid var(--text-strong)' : '2px solid transparent',
          color: on ? 'var(--text-strong)' : 'var(--text-muted)'
        })
      }
    }, t.label, t.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--text-faint)'
      }
    }, t.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/Login.jsx
try { (() => {
function Login({
  onIn
}) {
  const {
    Card,
    Input,
    Button
  } = window.TesseraDesignSystem_992529;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: '100vh',
      background: 'var(--ink-900)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/pixel/hero-amphitheatre-night-4x.png",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center 70%',
      imageRendering: 'pixelated'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "theme-bone",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "glass",
    padding: 32,
    style: {
      width: 380
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 14px var(--font-sans)',
      letterSpacing: '.18em',
      color: 'var(--ink-900)'
    }
  }, "TESSERA"), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '28px 0 24px',
      font: '300 30px/1.1 var(--font-sans)',
      letterSpacing: '-0.03em',
      color: 'var(--ink-900)'
    }
  }, "Sign in to the console"), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onIn();
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Work email",
    type: "email",
    defaultValue: "marcus@acme.dev"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Password",
    type: "password",
    defaultValue: "hunter22"
  }), /*#__PURE__*/React.createElement(Button, {
    full: true,
    size: "lg",
    type: "submit",
    style: {
      marginTop: 6
    }
  }, "Continue"), /*#__PURE__*/React.createElement(Button, {
    full: true,
    variant: "outline",
    type: "button",
    iconLeft: "key-round",
    onClick: onIn
  }, "Use SSO")))));
}
window.Login = Login;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/Login.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/Overview.jsx
try { (() => {
function Overview({
  go,
  openReq
}) {
  const {
    StatTile,
    Card,
    Tabs,
    Badge,
    ScoreMeter,
    Sparkline
  } = window.TesseraDesignSystem_992529;
  const [range, setRange] = React.useState('24h');
  const D = window.TS_DATA;
  const lab = {
    font: '500 11px var(--font-mono)',
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)'
  };
  const traffic = [40, 42, 38, 51, 60, 58, 64, 71, 69, 80, 92, 88, 84, 90, 97, 101, 96, 110, 104, 99, 93, 88, 81, 76];
  const blocked = [1, 1, 0, 2, 2, 3, 2, 4, 3, 6, 12, 9, 7, 5, 4, 6, 5, 8, 6, 4, 3, 2, 2, 1];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Topbar, {
    title: "Overview"
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    value: range,
    onChange: setRange,
    tabs: [{
      id: '1h',
      label: '1h'
    }, {
      id: '24h',
      label: '24h'
    }, {
      id: '7d',
      label: '7d'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Requests",
    value: "2.41M",
    delta: "+4.2%",
    trend: traffic
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Blocked",
    value: "1,284",
    delta: "+12% on /api/login",
    deltaTone: "bad",
    trend: blocked,
    trendColor: "var(--clay-500)"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Routed to JEV",
    value: "0.9",
    unit: "%",
    delta: "21.6k requests"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Overhead",
    value: "0.8",
    unit: "ms p95",
    delta: "\u22120.1 vs last week",
    deltaTone: "good"
  }), /*#__PURE__*/React.createElement(Card, {
    style: {
      gridColumn: 'span 3'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: lab
  }, "Traffic vs. blocked \xB7 ", range), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 16,
      font: '400 12px var(--font-mono)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      background: 'var(--ink-900)'
    }
  }), "requests"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      background: 'var(--clay-500)'
    }
  }), "blocked"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginTop: 24,
      height: 180
    }
  }, /*#__PURE__*/React.createElement(Sparkline, {
    data: traffic,
    width: 760,
    height: 180,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'flex-end',
      gap: 3
    }
  }, blocked.map((b, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      height: b * 8,
      background: 'var(--clay-500)',
      opacity: .85
    }
  }))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("span", {
    style: lab
  }, "Hot endpoints"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      marginTop: 20
    }
  }, [['/api/login', 0.92], ['/api/search', 0.61], ['/api/avatar', 0.44], ['/api/orders', 0.12]].map(([r, s]) => /*#__PURE__*/React.createElement("div", {
    key: r
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 12px var(--font-mono)',
      color: 'var(--ink-900)',
      marginBottom: 6
    }
  }, r), /*#__PURE__*/React.createElement(ScoreMeter, {
    score: s,
    label: null,
    showValue: false,
    tiles: 16
  }))))), /*#__PURE__*/React.createElement(Card, {
    padding: 0,
    style: {
      gridColumn: 'span 4'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '18px 24px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: lab
  }, "Latest decisions"), /*#__PURE__*/React.createElement("button", {
    onClick: () => go('traffic'),
    style: {
      border: 0,
      background: 'none',
      cursor: 'pointer',
      font: '500 13px var(--font-sans)',
      color: 'var(--text-link)'
    }
  }, "View all traffic")), D.requests.slice(0, 4).map(r => /*#__PURE__*/React.createElement(ReqRow, {
    key: r.id,
    r: r,
    onClick: () => openReq(r)
  })))));
}
function ReqRow({
  r,
  onClick,
  active
}) {
  const {
    Badge
  } = window.TesseraDesignSystem_992529;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      display: 'grid',
      gridTemplateColumns: '80px 110px 56px 1fr 140px 60px 70px',
      gap: 16,
      alignItems: 'center',
      padding: '12px 24px',
      borderTop: '1px solid var(--border-subtle)',
      cursor: 'pointer',
      background: active ? 'var(--blue-100)' : 'transparent',
      font: '400 13px var(--font-mono)',
      color: 'var(--text-body)'
    },
    onMouseEnter: e => {
      if (!active) e.currentTarget.style.background = 'var(--bone-200)';
    },
    onMouseLeave: e => {
      if (!active) e.currentTarget.style.background = 'transparent';
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, r.t), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Badge, {
    status: r.v
  }, r.v === 'jev' ? 'JEV' : r.v)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, r.m), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-900)'
    }
  }, r.r), /*#__PURE__*/React.createElement("span", null, r.rule), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right',
      color: 'var(--ink-900)'
    }
  }, r.s.toFixed(2)), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right',
      color: 'var(--text-muted)'
    }
  }, r.ms, "ms"));
}
window.Overview = Overview;
window.ReqRow = ReqRow;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/Overview.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/Policies.jsx
try { (() => {
function Policies({
  toast
}) {
  const {
    Switch,
    Button,
    Tag,
    Terminal,
    Dialog,
    Radio,
    Card
  } = window.TesseraDesignSystem_992529;
  const [ps, setPs] = React.useState(window.TS_DATA.policies);
  const [sel, setSel] = React.useState(0);
  const [dlg, setDlg] = React.useState(false);
  const [mode, setMode] = React.useState('jev');
  const p = ps[sel];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Topbar, {
    title: "Policies"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    iconLeft: "refresh-cw",
    onClick: () => toast({
      status: 'passed',
      title: 'Policy regenerated',
      message: '38 routes · 2 changed',
      meta: 'commit 4e1b9c0'
    })
  }, "Regenerate from source"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => setDlg(true)
  }, "Change mode")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
      gap: 24,
      padding: 32
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, ps.map((x, i) => /*#__PURE__*/React.createElement("div", {
    key: x.route,
    onClick: () => setSel(i),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '16px 20px',
      borderTop: i ? '1px solid var(--border-subtle)' : 0,
      cursor: 'pointer',
      background: sel === i ? 'var(--bone-200)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 14px var(--font-mono)',
      color: 'var(--ink-900)'
    }
  }, x.route), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 12px var(--font-sans)',
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, x.checks)), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 12px var(--font-mono)',
      color: 'var(--text-faint)'
    }
  }, x.hits, " hits"), /*#__PURE__*/React.createElement("span", {
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: x.on,
    onChange: v => setPs(ps.map((y, j) => j === i ? {
      ...y,
      on: v
    } : y))
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tag, null, p.src), /*#__PURE__*/React.createElement(Tag, {
    mono: false
  }, p.on ? 'Enforced' : 'Observe only')), /*#__PURE__*/React.createElement(Terminal, {
    title: p.route.replace(/\W+/g, '-').replace(/^-|-$/g, '').toLowerCase() + '.tessera.yml',
    lines: [{
      kind: 'comment',
      text: '# generated from ' + p.src
    }, {
      kind: 'code',
      text: 'route: "' + p.route + '"'
    }, {
      kind: 'code',
      text: 'enforce: ' + p.on
    }, ...p.checks.split(' · ').map(c => ({
      kind: 'code',
      text: '  - check: "' + c + '"'
    })), {
      kind: 'code',
      text: 'on_suspicious: "jev"'
    }, {
      kind: 'code',
      text: 'jev_threshold: 0.70'
    }]
  }))), /*#__PURE__*/React.createElement(Dialog, {
    open: dlg,
    onClose: () => setDlg(false),
    title: "Change enforcement mode",
    description: "Applies to every route in storefront-prod.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setDlg(false)
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setDlg(false);
        toast({
          status: 'info',
          title: 'Mode updated',
          message: {
            observe: 'Observe only',
            enforce: 'Enforce',
            jev: 'Enforce + JEV'
          }[mode]
        });
      }
    }, "Apply"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Radio, {
    name: "mode",
    value: "observe",
    checked: mode === 'observe',
    onChange: setMode,
    label: "Observe only \u2014 log, never block"
  }), /*#__PURE__*/React.createElement(Radio, {
    name: "mode",
    value: "enforce",
    checked: mode === 'enforce',
    onChange: setMode,
    label: "Enforce \u2014 block on static checks"
  }), /*#__PURE__*/React.createElement(Radio, {
    name: "mode",
    value: "jev",
    checked: mode === 'jev',
    onChange: setMode,
    label: "Enforce + JEV \u2014 route suspicious traffic for scoring"
  }))));
}
window.Policies = Policies;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/Policies.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/Sidebar.jsx
try { (() => {
function Sidebar({
  screen,
  go
}) {
  const {
    Icon,
    Badge
  } = window.TesseraDesignSystem_992529;
  const items = [['overview', 'Overview', 'gauge'], ['traffic', 'Traffic', 'activity'], ['policies', 'Policies', 'file-code'], ['settings', 'Settings', 'settings']];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 232,
      flex: 'none',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid var(--border-default)',
      background: 'var(--bone-100)',
      padding: '20px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 10px 24px',
      font: '500 14px var(--font-sans)',
      letterSpacing: '.18em',
      color: 'var(--ink-900)'
    }
  }, "TESSERA"), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '0 4px 20px',
      padding: '10px 12px',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 13px var(--font-sans)',
      color: 'var(--ink-900)'
    }
  }, "storefront-prod"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    status: "jev"
  }, "Enforce+JEV"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, items.map(([id, l, ic]) => {
    const on = screen === id;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => go(id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        height: 36,
        padding: '0 10px',
        border: 0,
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        background: on ? 'var(--bone-50)' : 'transparent',
        boxShadow: on ? 'var(--shadow-1)' : 'none',
        color: on ? 'var(--ink-900)' : 'var(--stone-700)',
        font: '500 14px var(--font-sans)',
        textAlign: 'left'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 16
    }), l);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      padding: '0 10px',
      font: '400 11px/1.6 var(--font-mono)',
      color: 'var(--text-faint)'
    }
  }, "proxy v2.4.1", /*#__PURE__*/React.createElement("br", null), "eu-west \xB7 3 nodes"));
}
window.Sidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/Topbar.jsx
try { (() => {
function Topbar({
  title,
  children
}) {
  const {
    IconButton
  } = window.TesseraDesignSystem_992529;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: 64,
      padding: '0 32px',
      borderBottom: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      flex: 1,
      font: '400 22px var(--font-sans)',
      letterSpacing: '-0.02em',
      color: 'var(--ink-900)'
    }
  }, title), children, /*#__PURE__*/React.createElement(IconButton, {
    icon: "bell",
    label: "Alerts"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 999,
      background: 'var(--terracotta-500)',
      color: 'var(--bone-50)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: '500 12px var(--font-sans)'
    }
  }, "MK"));
}
window.Topbar = Topbar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/Topbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/Traffic.jsx
try { (() => {
function Traffic({
  sel,
  setSel,
  onAllow
}) {
  const {
    Tabs,
    Input,
    Card,
    ScoreMeter,
    Ticket,
    Button,
    IconButton,
    Tag,
    Badge
  } = window.TesseraDesignSystem_992529;
  const [tab, setTab] = React.useState('all');
  const [q, setQ] = React.useState('');
  const all = window.TS_DATA.requests;
  const rows = all.filter(r => (tab === 'all' || r.v === tab) && (r.r + r.rule + r.ip).includes(q));
  const cnt = v => all.filter(r => r.v === v).length;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Topbar, {
    title: "Traffic"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 280
    }
  }, /*#__PURE__*/React.createElement(Input, {
    icon: "search",
    mono: true,
    placeholder: "route, rule or IP",
    value: q,
    onChange: e => setQ(e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      minHeight: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 24px 0'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    tabs: [{
      id: 'all',
      label: 'All',
      count: all.length
    }, {
      id: 'blocked',
      label: 'Blocked',
      count: cnt('blocked')
    }, {
      id: 'jev',
      label: 'JEV',
      count: cnt('jev')
    }, {
      id: 'review',
      label: 'Review',
      count: cnt('review')
    }, {
      id: 'passed',
      label: 'Passed',
      count: cnt('passed')
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '80px 110px 56px 1fr 140px 60px 70px',
      gap: 16,
      padding: '12px 24px',
      font: '500 10px var(--font-mono)',
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Time"), /*#__PURE__*/React.createElement("span", null, "Verdict"), /*#__PURE__*/React.createElement("span", null, "Method"), /*#__PURE__*/React.createElement("span", null, "Route"), /*#__PURE__*/React.createElement("span", null, "Rule"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, "Score"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, "Cost")), rows.map(r => /*#__PURE__*/React.createElement(ReqRow, {
    key: r.id,
    r: r,
    active: sel && sel.id === r.id,
    onClick: () => setSel(r)
  })), !rows.length && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 48,
      textAlign: 'center',
      color: 'var(--text-muted)',
      font: '400 14px var(--font-sans)'
    }
  }, "No requests match.")), sel && /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 380,
      flex: 'none',
      borderLeft: '1px solid var(--border-default)',
      background: 'var(--bone-50)',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    status: sel.v
  }, sel.v === 'jev' ? 'JEV' : sel.v), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: '400 12px var(--font-mono)',
      color: 'var(--text-muted)'
    }
  }, sel.id), /*#__PURE__*/React.createElement(IconButton, {
    icon: "x",
    label: "Close",
    size: "sm",
    onClick: () => setSel(null)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 20px var(--font-mono)',
      color: 'var(--ink-900)',
      letterSpacing: '-0.02em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, sel.m), " ", sel.r), /*#__PURE__*/React.createElement(ScoreMeter, {
    score: sel.s
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '90px 1fr',
      rowGap: 10,
      font: '400 13px var(--font-mono)'
    }
  }, [['Rule', sel.rule], ['Source', sel.ip], ['Time', sel.t], ['Cost', sel.ms + 'ms']].map(([k, v]) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: k
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-900)'
    }
  }, v)))), sel.payload && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 10px var(--font-mono)',
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      marginBottom: 8
    }
  }, "Payload"), /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0,
      padding: 14,
      borderRadius: 'var(--radius-md)',
      background: 'var(--ink-900)',
      color: sel.v === 'blocked' ? 'var(--terracotta-400)' : 'var(--bone-300)',
      font: '400 12px/1.6 var(--font-mono)',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all'
    }
  }, sel.payload)), sel.v === 'jev' && /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 14px/1.5 var(--font-sans)',
      color: 'var(--text-body)'
    }
  }, "JEV: declared PNG but the body starts with a PHP open tag. Held for review; not forwarded."), /*#__PURE__*/React.createElement(Ticket, {
    numeral: sel.v === 'passed' ? 'XII' : 'X',
    label: "gate",
    status: sel.v,
    title: sel.v === 'passed' ? 'Request admitted' : sel.v === 'blocked' ? 'Entry refused' : 'Held at the gate',
    meta: sel.id + ' · ' + sel.ms + 'ms',
    style: {
      minWidth: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    iconLeft: "copy"
  }, "Copy as cURL"), sel.v !== 'passed' && /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => onAllow(sel)
  }, "Allow this shape")))));
}
window.Traffic = Traffic;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/Traffic.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/data.js
try { (() => {
window.TS_DATA = {
  requests: [{
    id: 'req_7f3a',
    t: '14:02:11',
    m: 'POST',
    r: '/api/login',
    v: 'blocked',
    s: 0.94,
    rule: 'sqli.union',
    ms: 0.7,
    ip: '185.220.101.4',
    payload: "email=a@b.co&password=' OR 1=1 --"
  }, {
    id: 'req_7f39',
    t: '14:02:10',
    m: 'GET',
    r: '/api/orders',
    v: 'passed',
    s: 0.03,
    rule: 'schema ok',
    ms: 0.4,
    ip: '10.4.12.88',
    payload: '?page=2&limit=20'
  }, {
    id: 'req_7f38',
    t: '14:02:08',
    m: 'PUT',
    r: '/api/avatar',
    v: 'jev',
    s: 0.61,
    rule: 'magic.mismatch',
    ms: 41.2,
    ip: '91.198.4.17',
    payload: 'Content-Type: image/png · first bytes 3C 3F 70 68'
  }, {
    id: 'req_7f37',
    t: '14:02:06',
    m: 'GET',
    r: '/api/search',
    v: 'review',
    s: 0.52,
    rule: 'anomaly.len',
    ms: 0.9,
    ip: '77.88.21.3',
    payload: '?q=' + 'a'.repeat(28) + '…'
  }, {
    id: 'req_7f36',
    t: '14:02:05',
    m: 'POST',
    r: '/api/cart',
    v: 'passed',
    s: 0.02,
    rule: 'schema ok',
    ms: 0.5,
    ip: '10.4.12.91',
    payload: '{"sku":"TS-114","qty":1}'
  }, {
    id: 'req_7f35',
    t: '14:02:03',
    m: 'POST',
    r: '/api/users',
    v: 'blocked',
    s: 0.88,
    rule: 'schema.extra',
    ms: 0.6,
    ip: '45.155.205.9',
    payload: '{"name":"x","role":"admin"}'
  }, {
    id: 'req_7f34',
    t: '14:02:01',
    m: 'GET',
    r: '/health',
    v: 'passed',
    s: 0.0,
    rule: 'allowlist',
    ms: 0.1,
    ip: '10.4.0.2',
    payload: ''
  }],
  policies: [{
    route: 'POST /api/login',
    src: 'src/routes/auth.ts',
    checks: 'schema · rate 12/min · sqli',
    on: true,
    hits: 412
  }, {
    route: 'PUT /api/avatar',
    src: 'src/routes/profile.ts',
    checks: 'magic bytes png/jpeg · max 2MB',
    on: true,
    hits: 37
  }, {
    route: 'GET /api/search',
    src: 'src/routes/search.ts',
    checks: 'q max 120 · xss',
    on: true,
    hits: 96
  }, {
    route: 'POST /api/users',
    src: 'src/routes/users.ts',
    checks: 'schema strict · no extra keys',
    on: true,
    hits: 21
  }, {
    route: 'GET /api/orders',
    src: 'src/routes/orders.ts',
    checks: 'auth · page ≤ 500',
    on: false,
    hits: 0
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/data.js", error: String((e && e.message) || e) }); }

// ui_kits/website/Bento.jsx
try { (() => {
function Bento() {
  const {
    Card,
    StatTile,
    ScoreMeter,
    Badge,
    Ticket
  } = window.TesseraDesignSystem_992529;
  const eps = [['/api/login', 92], ['/api/search', 61], ['/api/avatar', 44], ['/api/orders', 12], ['/health', 2]];
  const [scores, setScores] = React.useState([0.94, 0.12, 0.61, 0.03]);
  React.useEffect(() => {
    const t = setInterval(() => setScores(s => s.map(v => Math.max(0.01, Math.min(0.99, v + (Math.random() - 0.5) * 0.12)))), 1600);
    return () => clearInterval(t);
  }, []);
  const lab = {
    font: '500 11px var(--font-mono)',
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    color: 'var(--bone-500)'
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "theme-ink",
    style: {
      position: 'relative',
      background: 'var(--ink-900)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/pixel/hero-amphitheatre-night.png",
    alt: "",
    style: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      imageRendering: 'pixelated',
      opacity: 0.55
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 1200,
      margin: '0 auto',
      padding: '128px 24px 200px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: lab
  }, "Dashboard"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '16px 0 48px',
      maxWidth: 640,
      font: '300 48px/1.08 var(--font-sans)',
      letterSpacing: '-0.03em',
      color: 'var(--bone-50)'
    }
  }, "Analysis goes where the attacks are."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "glass-dark",
    style: {
      gridColumn: 'span 3',
      gridRow: 'span 2'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: lab
  }, "Maliciousness score \xB7 JEV"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      marginTop: 22
    }
  }, ['POST /api/login', 'GET /api/search?q=', 'PUT /api/avatar', 'GET /api/orders'].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 13px var(--font-mono)',
      color: 'var(--bone-100)',
      marginBottom: 8
    }
  }, r), /*#__PURE__*/React.createElement(ScoreMeter, {
    score: scores[i],
    tone: "dark",
    label: null,
    tiles: 24,
    showValue: false
  }))))), /*#__PURE__*/React.createElement(StatTile, {
    variant: "ink",
    label: "Latency overhead",
    value: "0.8",
    unit: "ms p95",
    delta: "\u22120.1 vs last week",
    deltaTone: "good",
    trend: [1.2, 1.1, 1, 1, 0.9, 0.9, 0.8],
    style: {
      gridColumn: 'span 3',
      background: 'var(--surface-glass-dark)',
      border: '1px solid var(--border-glass)',
      backdropFilter: 'blur(18px)'
    }
  }), /*#__PURE__*/React.createElement(StatTile, {
    variant: "ink",
    label: "Blocked \xB7 24h",
    value: "1,284",
    delta: "+12% on /api/login",
    deltaTone: "bad",
    style: {
      gridColumn: 'span 2',
      background: 'var(--surface-glass-dark)',
      border: '1px solid var(--border-glass)',
      backdropFilter: 'blur(18px)'
    }
  }), /*#__PURE__*/React.createElement(Card, {
    variant: "glass-dark",
    padding: 20,
    style: {
      gridColumn: 'span 1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: lab
  }, "Mode"), /*#__PURE__*/React.createElement(Badge, {
    status: "jev"
  }, "Enforce+JEV")), /*#__PURE__*/React.createElement(Card, {
    variant: "glass-dark",
    style: {
      gridColumn: 'span 4'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: lab
  }, "Analysis depth by endpoint"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...lab,
      color: 'var(--bone-300)'
    }
  }, "EWMA \xB7 \u03B1 0.3")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      marginTop: 20
    }
  }, eps.map(([e, v]) => /*#__PURE__*/React.createElement("div", {
    key: e,
    style: {
      display: 'grid',
      gridTemplateColumns: '120px 1fr 40px',
      gap: 12,
      alignItems: 'center',
      font: '400 12px var(--font-mono)',
      color: 'var(--bone-300)'
    }
  }, /*#__PURE__*/React.createElement("span", null, e), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 8,
      background: 'rgba(241,235,224,.08)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      height: '100%',
      width: v + '%',
      background: v > 70 ? 'var(--clay-500)' : v > 40 ? 'var(--ochre-500)' : 'var(--blue-500)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, v, "%"))))), /*#__PURE__*/React.createElement(Card, {
    variant: "glass-dark",
    padding: 20,
    style: {
      gridColumn: 'span 2',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: lab
  }, "Last receipt"), /*#__PURE__*/React.createElement("div", {
    className: "theme-bone"
  }, /*#__PURE__*/React.createElement(Ticket, {
    numeral: "XII",
    label: "gate",
    title: "Request admitted",
    meta: "req_7f3a \xB7 0.6ms",
    style: {
      minWidth: 0,
      background: 'var(--bone-50)'
    }
  }))))));
}
window.Bento = Bento;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Bento.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Flow.jsx
try { (() => {
function Flow() {
  const {
    ScoreMeter,
    Badge,
    Tag,
    Icon
  } = window.TesseraDesignSystem_992529;
  const steps = [['I', 'Intercept', 'A transparent reverse proxy receives every HTTP request before your application does. No SDK, no code changes.', 'Listening on :443 → upstream app.internal:8080'], ['II', 'Check', 'A static-analysis toolchain validates magic bytes, schemas and known injection shapes against the policy for that route.', 'Median cost 0.4 ms per request'], ['III', 'Decide', 'Clean traffic passes straight through. Suspicious requests are routed to JEV, which returns a maliciousness score with context.', 'About 1% of traffic reaches JEV'], ['IV', 'Adapt', 'EWMA-based feedback tracks attacks per endpoint and raises analysis depth where it is needed, then lowers it again.', 'α 0.3 · window 5 min']];
  const nodes = ['Request', 'Proxy', 'Static analysis', 'JEV', 'Your app'];
  const lit = [[0, 1], [1, 2], [2, 3, 4], [2, 3, 4]];
  const wrap = React.useRef(null);
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const f = () => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const v = -r.top / Math.max(1, r.height - window.innerHeight);
      setP(isFinite(v) ? Math.max(0, Math.min(1, v)) : 0);
    };
    f();
    window.addEventListener('scroll', f, {
      passive: true
    });
    window.addEventListener('resize', f);
    return () => {
      window.removeEventListener('scroll', f);
      window.removeEventListener('resize', f);
    };
  }, []);
  const on = Math.max(0, Math.min(3, Math.floor(p * 4 - 0.0001))) || 0;
  const local = Math.max(0, Math.min(1, p * 4 - on));
  const lab = {
    font: '500 10px var(--font-mono)',
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    color: 'var(--text-faint)'
  };
  const row = (k, v, c) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderTop: '1px solid var(--border-subtle)',
      font: '400 13px var(--font-mono)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      color: c || 'var(--ink-900)'
    }
  }, v));
  const panels = [/*#__PURE__*/React.createElement("div", {
    key: "0"
  }, /*#__PURE__*/React.createElement("div", {
    style: lab
  }, "Incoming \xB7 last second"), [['GET', '/api/orders', '10.4.12.88'], ['POST', '/api/login', '185.220.101.4'], ['GET', '/api/search?q=', '77.88.21.3'], ['PUT', '/api/avatar', '91.198.4.17']].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '48px 1fr auto',
      gap: 12,
      padding: '10px 0',
      borderTop: '1px solid var(--border-subtle)',
      font: '400 13px var(--font-mono)',
      opacity: local * 4 > i ? 1 : 0.15,
      transition: 'opacity var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, r[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-900)'
    }
  }, r[1]), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)'
    }
  }, r[2])))), /*#__PURE__*/React.createElement("div", {
    key: "1"
  }, /*#__PURE__*/React.createElement("div", {
    style: lab
  }, "Checks \xB7 POST /api/login"), [['Schema', 'email ≤ 254, password ≤ 128'], ['Magic bytes', 'n/a'], ['Injection shapes', 'sqli, xss, path traversal'], ['Rate', '12 / min / IP']].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      padding: '12px 0',
      borderTop: '1px solid var(--border-subtle)',
      opacity: local * 4 > i ? 1 : 0.15,
      transition: 'opacity var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--verdigris-500)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16,
    strokeWidth: 2
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 14px var(--font-sans)',
      color: 'var(--ink-900)',
      width: 130
    }
  }, r[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 12px var(--font-mono)',
      color: 'var(--text-muted)'
    }
  }, r[1])))), /*#__PURE__*/React.createElement("div", {
    key: "2",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: lab
  }, "Verdicts"), [['GET /api/orders', 0.03, 'passed', 'Passed'], ['PUT /api/avatar', 0.58, 'jev', 'Routed to JEV'], ['POST /api/login', Math.min(0.94, 0.1 + local * 0.9), 'blocked', 'Blocked']].map(([r, s, st, l]) => /*#__PURE__*/React.createElement("div", {
    key: r
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 13px var(--font-mono)',
      color: 'var(--ink-900)'
    }
  }, r), /*#__PURE__*/React.createElement(Badge, {
    status: st
  }, l)), /*#__PURE__*/React.createElement(ScoreMeter, {
    score: s,
    label: null,
    showValue: false,
    tiles: 28
  })))), /*#__PURE__*/React.createElement("div", {
    key: "3"
  }, /*#__PURE__*/React.createElement("div", {
    style: lab
  }, "Analysis depth \xB7 EWMA"), [['/api/login', 92], ['/api/search', 61], ['/api/avatar', 44], ['/api/orders', 12], ['/health', 2]].map(([e, v], i) => /*#__PURE__*/React.createElement("div", {
    key: e,
    style: {
      display: 'grid',
      gridTemplateColumns: '110px 1fr 40px',
      gap: 12,
      alignItems: 'center',
      padding: '10px 0',
      borderTop: '1px solid var(--border-subtle)',
      font: '400 12px var(--font-mono)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", null, e), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 8,
      background: 'var(--bone-300)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      height: '100%',
      width: v * Math.min(1, local * 1.6) + '%',
      background: v > 70 ? 'var(--clay-500)' : v > 40 ? 'var(--ochre-500)' : 'var(--blue-500)',
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, Math.round(v * Math.min(1, local * 1.6)), "%"))))];
  const l = lit[on] || lit[0];
  return /*#__PURE__*/React.createElement("section", {
    ref: wrap,
    style: {
      height: '420vh',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      height: '100vh',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      width: '100%',
      margin: '0 auto',
      padding: '0 24px',
      display: 'grid',
      gridTemplateColumns: '6fr 6fr',
      gap: 64,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 11px var(--font-mono)',
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "How it works"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 300,
      marginTop: 24
    }
  }, steps.map(([n, t, d, m], i) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      position: 'absolute',
      inset: 0,
      opacity: on === i ? 1 : 0,
      transform: `translateY(${on === i ? 0 : on > i ? -16 : 16}px)`,
      transition: 'all var(--dur-slow) var(--ease-out)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 56px/1 var(--font-pixel)',
      color: 'var(--terracotta-500)'
    }
  }, n), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '24px 0 0',
      font: '300 56px/1.05 var(--font-sans)',
      letterSpacing: '-0.035em',
      color: 'var(--ink-900)'
    }
  }, t, "."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '18px 0 0',
      maxWidth: 480,
      font: '400 18px/1.5 var(--font-sans)',
      color: 'var(--text-body)',
      textWrap: 'pretty'
    }
  }, d), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Tag, null, m))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 3,
      marginTop: 8
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: 3,
      background: 'var(--bone-300)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      background: 'var(--ink-900)',
      width: (i < on ? 100 : i === on ? local * 100 : 0) + '%'
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-2)',
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexWrap: 'wrap',
      paddingBottom: 22
    }
  }, nodes.map((n, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: n
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 1,
      background: l.includes(i) && l.includes(i - 1) ? 'var(--blue-500)' : 'var(--border-strong)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '5px 9px',
      border: '1px solid',
      borderColor: l.includes(i) ? 'var(--blue-500)' : 'var(--border-default)',
      background: l.includes(i) ? 'var(--blue-100)' : 'transparent',
      borderRadius: 'var(--radius-xs)',
      font: '400 11px var(--font-mono)',
      color: 'var(--ink-900)',
      transition: 'all var(--dur-base) var(--ease-out)'
    }
  }, n)))), /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 250
    }
  }, panels[on]), row('Step', `${on + 1} / 4`)))));
}
window.Flow = Flow;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Flow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
function SiteFooter({
  onDeploy
}) {
  const {
    Button
  } = window.TesseraDesignSystem_992529;
  const cols = [['Product', ['How it works', 'Policies', 'JEV', 'Pricing']], ['Developers', ['Docs', 'CLI', 'Changelog', 'Status']], ['Company', ['About', 'Security', 'Contact']]];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--bone-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '128px 24px 48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 24,
      paddingBottom: 80,
      borderBottom: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      maxWidth: 640,
      font: '300 56px/1.04 var(--font-sans)',
      letterSpacing: '-0.035em',
      color: 'var(--ink-900)'
    }
  }, "Put a gate in front of your app this afternoon."), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconRight: "arrow-right",
    onClick: onDeploy
  }, "Deploy Tessera")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr repeat(3, 1fr)',
      gap: 24,
      paddingTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 14px var(--font-sans)',
      letterSpacing: '.18em',
      color: 'var(--ink-900)'
    }
  }, "TESSERA"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      font: '400 13px var(--font-mono)',
      color: 'var(--text-muted)'
    }
  }, "\xA9 2026 \xB7 Admit one.")), cols.map(([h, ls]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 11px var(--font-mono)',
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 14
    }
  }, h), ls.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      display: 'block',
      font: '400 14px/2 var(--font-sans)',
      color: 'var(--text-body)',
      textDecoration: 'none'
    }
  }, l)))))));
}
window.SiteFooter = SiteFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
function SiteHeader({
  onDeploy
}) {
  const {
    NavPill,
    Button
  } = window.TesseraDesignSystem_992529;
  const [active, setActive] = React.useState('Product');
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      padding: '16px 40px',
      background: 'linear-gradient(var(--bone-100) 60%, rgba(241,235,224,0))'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      font: '500 15px var(--font-sans)',
      letterSpacing: '.18em',
      color: 'var(--ink-900)',
      textDecoration: 'none'
    }
  }, "TESSERA"), /*#__PURE__*/React.createElement(NavPill, {
    items: ['Product', 'How it works', 'Policies', 'Docs', 'Pricing'],
    active: active,
    onSelect: setActive
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: onDeploy
  }, "Deploy")));
}
window.SiteHeader = SiteHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
function Hero({
  onDeploy
}) {
  const {
    Button,
    Card,
    Badge,
    ScoreMeter
  } = window.TesseraDesignSystem_992529;
  const reqs = [['GET', '/api/orders', 'passed', 0.03], ['POST', '/api/login', 'blocked', 0.94], ['PUT', '/api/avatar', 'jev', 0.58]];
  const [i, setI] = React.useState(0);
  const L = React.useRef({});
  React.useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % reqs.length), 2200);
    return () => clearInterval(t);
  }, []);
  React.useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const y = Math.min(window.scrollY, 1400),
        t = performance.now() / 1000,
        R = L.current;
      if (R.img) R.img.style.transform = `translate3d(0,${y * 0.1}px,0) scale(${1 + y * 0.00015})`;
      if (R.c1) R.c1.style.transform = `translate3d(${-y * 0.35 + t * 6 % 1600 - 200}px,0,0)`;
      if (R.c2) R.c2.style.transform = `translate3d(${-y * 0.2 + (t * 3.5 + 600) % 1800 - 300}px,${y * 0.05}px,0)`;
      if (R.c3) R.c3.style.transform = `translate3d(${-y * 0.5 + (t * 9 + 1000) % 1700 - 250}px,0,0)`;
      if (R.b) R.b.style.transform = `translate3d(${y * 0.9 + t * 40 % 1800 - 200}px,${-y * 0.25 + Math.sin(t * 1.2) * 6}px,0)`;
      if (R.fg) R.fg.style.transform = `translate3d(0,${-y * 0.14}px,0)`;
      if (R.glow) R.glow.style.opacity = Math.max(0, 0.9 - y / 700);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener('scroll', on, {
      passive: true
    });
    const iv = setInterval(on, 60);
    on();
    return () => {
      window.removeEventListener('scroll', on);
      clearInterval(iv);
    };
  }, []);
  const r = reqs[i];
  const ref = k => el => {
    L.current[k] = el;
  };
  const px = {
    position: 'absolute',
    imageRendering: 'pixelated',
    willChange: 'transform',
    pointerEvents: 'none'
  };
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 5,
      maxWidth: 980,
      margin: '0 auto',
      padding: '72px 24px 56px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 11px var(--font-mono)',
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Adaptive security layer \xB7 reverse proxy"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '20px 0 0',
      font: '300 76px/1.04 var(--font-sans)',
      letterSpacing: '-0.035em',
      color: 'var(--ink-900)',
      textWrap: 'balance'
    }
  }, "Application-specific protection without the runtime overhead."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '24px auto 0',
      maxWidth: 600,
      font: '400 19px/1.5 var(--font-sans)',
      color: 'var(--text-body)',
      textWrap: 'pretty'
    }
  }, "Tessera sits between your application and the rest of the world. It writes its policy from your code, checks every request, and asks JEV only when something looks wrong."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'center',
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconRight: "arrow-right",
    onClick: onDeploy
  }, "Deploy Tessera"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline"
  }, "Read the docs"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: ref('glow'),
    style: {
      position: 'absolute',
      left: '50%',
      top: '14%',
      width: 560,
      height: 560,
      marginLeft: -280,
      borderRadius: 999,
      background: 'radial-gradient(closest-side, rgba(247,243,235,.95), rgba(247,243,235,0))',
      zIndex: 0
    }
  }), /*#__PURE__*/React.createElement("img", {
    ref: ref('img'),
    src: "../../assets/pixel/hero-amphitheatre-day.png",
    alt: "",
    style: {
      display: 'block',
      width: '100%',
      imageRendering: 'pixelated',
      willChange: 'transform',
      transformOrigin: '50% 100%',
      position: 'relative',
      zIndex: 1
    }
  }), /*#__PURE__*/React.createElement("img", {
    ref: ref('c2'),
    src: "../../assets/pixel/cloud.png",
    alt: "",
    style: {
      ...px,
      left: 0,
      top: '4%',
      width: 240,
      opacity: .85,
      zIndex: 2
    }
  }), /*#__PURE__*/React.createElement("img", {
    ref: ref('c1'),
    src: "../../assets/pixel/cloud.png",
    alt: "",
    style: {
      ...px,
      left: 0,
      top: '16%',
      width: 360,
      zIndex: 2
    }
  }), /*#__PURE__*/React.createElement("img", {
    ref: ref('c3'),
    src: "../../assets/pixel/cloud.png",
    alt: "",
    style: {
      ...px,
      left: 0,
      top: '30%',
      width: 180,
      opacity: .9,
      zIndex: 3
    }
  }), /*#__PURE__*/React.createElement("div", {
    ref: ref('b'),
    style: {
      ...px,
      left: 0,
      top: '10%',
      width: 84,
      zIndex: 3,
      display: 'flex',
      gap: 22,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/pixel/bird-a.png",
    alt: "",
    style: {
      width: 28,
      imageRendering: 'pixelated'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/pixel/bird-b.png",
    alt: "",
    style: {
      width: 28,
      marginTop: 14,
      imageRendering: 'pixelated'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/pixel/bird-a.png",
    alt: "",
    style: {
      width: 20,
      marginTop: 4,
      imageRendering: 'pixelated'
    }
  })), /*#__PURE__*/React.createElement("div", {
    ref: ref('fg'),
    style: {
      position: 'absolute',
      right: '6%',
      top: '22%',
      width: 300,
      zIndex: 4
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "glass",
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 11px var(--font-mono)',
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--stone-600)'
    }
  }, "Gate \xB7 live"), /*#__PURE__*/React.createElement(Badge, {
    status: r[2]
  }, r[2] === 'jev' ? 'JEV' : r[2])), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 15px var(--font-mono)',
      color: 'var(--ink-900)',
      margin: '14px 0 16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--stone-600)'
    }
  }, r[0]), " ", r[1]), /*#__PURE__*/React.createElement(ScoreMeter, {
    score: r[3],
    tiles: 16
  })))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PolicySection.jsx
try { (() => {
function PolicySection() {
  const {
    Terminal,
    Button,
    Tag,
    Icon
  } = window.TesseraDesignSystem_992529;
  const base = [{
    kind: 'cmd',
    text: 'tessera policy generate ./src'
  }, {
    kind: 'comment',
    text: '# 38 routes · 4 upload handlers · 2 GraphQL operations'
  }, {
    kind: 'code',
    text: 'route: "POST /api/login"'
  }, {
    kind: 'code',
    text: 'body:'
  }, {
    kind: 'code',
    text: '  email: { type: "email", max: 254 }'
  }, {
    kind: 'code',
    text: '  password: { type: "string", max: 128 }'
  }, {
    kind: 'code',
    text: 'rate: 12'
  }, {
    kind: 'comment',
    text: ''
  }, {
    kind: 'cmd',
    text: 'tessera tail --route /api/login'
  }];
  const live = [{
    kind: 'pass',
    text: '✓ passed   schema ok                    0.02'
  }, {
    kind: 'block',
    text: "✕ dropped  sqli.union  ' OR 1=1 --       0.94"
  }, {
    kind: 'pass',
    text: '✓ passed   schema ok                    0.01'
  }, {
    kind: 'jev',
    text: '→ jev      anomaly.len  4.2kB password   0.61'
  }, {
    kind: 'block',
    text: '✕ dropped  schema.extra  "role":"admin" 0.88'
  }];
  const [n, setN] = React.useState(1);
  React.useEffect(() => {
    const t = setInterval(() => setN(x => x >= live.length ? 1 : x + 1), 1400);
    return () => clearInterval(t);
  }, []);
  const pts = [['Read from your code', 'Routes, types and environment become per-endpoint rules.'], ['Reviewed like a diff', 'Policies are plain files in your repository.'], ['No traffic training', 'Nothing is learned from your users.']];
  const lab = {
    font: '500 11px var(--font-mono)',
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)'
  };
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 24px 160px',
      display: 'grid',
      gridTemplateColumns: '5fr 1fr 6fr',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: lab
  }, "Policies"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '16px 0 0',
      font: '300 48px/1.08 var(--font-sans)',
      letterSpacing: '-0.03em',
      color: 'var(--ink-900)',
      textWrap: 'balance'
    }
  }, "Your code already knows what a valid request looks like."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '20px 0 8px',
      font: '400 17px/1.55 var(--font-sans)',
      color: 'var(--text-body)',
      textWrap: 'pretty'
    }
  }, "Tessera reads your routes, types and environment and writes a policy for each endpoint."), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '0 0 28px'
    }
  }, pts.map(([t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'grid',
      gridTemplateColumns: '24px 1fr',
      gap: 8,
      padding: '14px 0',
      borderTop: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--blue-700)',
      paddingTop: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16,
    strokeWidth: 2
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 15px var(--font-sans)',
      color: 'var(--ink-900)'
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 14px/1.5 var(--font-sans)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, d))))), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    iconRight: "arrow-up-right"
  }, "Policy reference")), /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '24px -16px -16px 24px',
      background: 'var(--bone-200)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border-subtle)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "src/routes/auth.ts"), /*#__PURE__*/React.createElement(Tag, {
    mono: false
  }, "38 routes"), /*#__PURE__*/React.createElement(Tag, {
    mono: false
  }, "0.8 ms p95")), /*#__PURE__*/React.createElement(Terminal, {
    title: "policy.tessera.yml",
    lines: [...base, ...live.slice(0, n)],
    style: {
      minHeight: 430
    }
  }))));
}
window.PolicySection = PolicySection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PolicySection.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.ICONS = __ds_scope.ICONS;

__ds_ns.ScoreMeter = __ds_scope.ScoreMeter;

__ds_ns.Sparkline = __ds_scope.Sparkline;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.Terminal = __ds_scope.Terminal;

__ds_ns.Ticket = __ds_scope.Ticket;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.CHOICE_CSS = __ds_scope.CHOICE_CSS;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.FIELD_CSS = __ds_scope.FIELD_CSS;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.NavPill = __ds_scope.NavPill;

__ds_ns.Tabs = __ds_scope.Tabs;

})();

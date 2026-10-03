# Console UI kit
Tessera's operator console (product surface implied by the brief: verdicts, JEV scores, policies, latency). No source UI was supplied — this is an original design on the system, not a recreation.
- `Login.jsx` — glass card over the night amphitheatre
- `Sidebar.jsx`, `Topbar.jsx` — app chrome
- `Overview.jsx` — stat tiles, traffic/blocked chart, hot endpoints, latest decisions (`ReqRow`)
- `Traffic.jsx` — filterable request log + detail panel (ScoreMeter, payload, Ticket)
- `Policies.jsx` — route list with switches, generated YAML in Terminal, mode Dialog
- `data.js` — fake requests/policies
Flow: sign in → overview → click a decision → traffic detail → "Allow this shape" toast; Policies → Change mode dialog. Settings → sign out returns to login.

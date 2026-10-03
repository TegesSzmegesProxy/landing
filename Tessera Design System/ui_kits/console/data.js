window.TS_DATA = {
  requests: [
    { id: 'req_7f3a', t: '14:02:11', m: 'POST', r: '/api/login', v: 'blocked', s: 0.94, rule: 'sqli.union', ms: 0.7, ip: '185.220.101.4', payload: "email=a@b.co&password=' OR 1=1 --" },
    { id: 'req_7f39', t: '14:02:10', m: 'GET', r: '/api/orders', v: 'passed', s: 0.03, rule: 'schema ok', ms: 0.4, ip: '10.4.12.88', payload: '?page=2&limit=20' },
    { id: 'req_7f38', t: '14:02:08', m: 'PUT', r: '/api/avatar', v: 'jev', s: 0.61, rule: 'magic.mismatch', ms: 41.2, ip: '91.198.4.17', payload: 'Content-Type: image/png · first bytes 3C 3F 70 68' },
    { id: 'req_7f37', t: '14:02:06', m: 'GET', r: '/api/search', v: 'review', s: 0.52, rule: 'anomaly.len', ms: 0.9, ip: '77.88.21.3', payload: '?q=' + 'a'.repeat(28) + '…' },
    { id: 'req_7f36', t: '14:02:05', m: 'POST', r: '/api/cart', v: 'passed', s: 0.02, rule: 'schema ok', ms: 0.5, ip: '10.4.12.91', payload: '{"sku":"TS-114","qty":1}' },
    { id: 'req_7f35', t: '14:02:03', m: 'POST', r: '/api/users', v: 'blocked', s: 0.88, rule: 'schema.extra', ms: 0.6, ip: '45.155.205.9', payload: '{"name":"x","role":"admin"}' },
    { id: 'req_7f34', t: '14:02:01', m: 'GET', r: '/health', v: 'passed', s: 0.0, rule: 'allowlist', ms: 0.1, ip: '10.4.0.2', payload: '' },
  ],
  policies: [
    { route: 'POST /api/login', src: 'src/routes/auth.ts', checks: 'schema · rate 12/min · sqli', on: true, hits: 412 },
    { route: 'PUT /api/avatar', src: 'src/routes/profile.ts', checks: 'magic bytes png/jpeg · max 2MB', on: true, hits: 37 },
    { route: 'GET /api/search', src: 'src/routes/search.ts', checks: 'q max 120 · xss', on: true, hits: 96 },
    { route: 'POST /api/users', src: 'src/routes/users.ts', checks: 'schema strict · no extra keys', on: true, hits: 21 },
    { route: 'GET /api/orders', src: 'src/routes/orders.ts', checks: 'auth · page ≤ 500', on: false, hits: 0 },
  ],
};

# Tessera landing

Marketing site and interactive demo for Tessera, a runtime security proxy with a hosted control plane.

Live: https://tegesszmegesproxy.github.io/landing/

## Run

```sh
npm install
npm run dev      # dev server
npm run build    # type-check and build to dist/
```

Pushing to the `deploy` branch publishes the site to GitHub Pages.

## Where things are

All copy lives in `src/data/content.ts` and `src/data/demo.ts`. The demo runs entirely in the browser on mocked data.

Pricing and the dashboard link (`dashboardUrl` in `src/data/content.ts`) are placeholders for now.

## Built with LLMs

During this project we used Claude for practicality and time efficiency.

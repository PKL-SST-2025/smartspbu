## Usage

Those templates dependencies are maintained via [pnpm](https://pnpm.io) via `pnpm up -Lri`.

This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely be removed once you clone a template.

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)

## This project was created with the [Solid CLI](https://github.com/solidjs-community/solid-cli)

## Smart SPBU Operational Center (MVP Frontend)

Implemented MVP baseline referencing Relogica asset hierarchy UI.

Stack: SolidJS + Router, Tailwind, Flowbite, amCharts5 (map), ag-grid, solid-icons.

Brand Palette: 320A6B / 065084 / 0F828C / 78B9B5.

### Implemented (Phase-1 subset)
* Dashboard with KPI cards (total, connected, offline, uptime, technicians, SLA)
* Basic GIS world map placeholder with a few sample SPBU markers
* Alerts panel (sample data)
* Tickets / Dispatch summary panel
* Sites table (ag-grid) listing sample sites & status coloring
* Navigation layout (sidebar + top bar + pages: Dashboard, Sites, Alerts, Devices)

### Placeholders (to wire with backend later)
* Realtime connectivity status & telemetry ingestion
* Device management, alert CRUD, dispatch workflow
* Security (authn/z) & API integration

### Next Steps
1. Integrate actual API endpoints for KPI + site list + alerts
2. Add WebSocket / SSE for live status updates
3. Extend map to Indonesia region-focused geodata & clustering
4. Implement filters (region, status, priority) for Sites + Map
5. Add authentication & role-based access (RBAC)
6. Add anomaly detection visualization module (Phase-2)

### Development
Install dependencies then run dev server.

```
npm install
npm run dev
```

### License
MIT

# ARMSHIN / BARON — Foundation

This is the initial source-code foundation, not a deployed production system.

## Architecture
- `app/`: BARON management application routes, root layout, and styles (Next.js + TypeScript).
- `schema.sql`: PostgreSQL/Supabase schema for directors, requests, partners, quotes, deals, expenses, commissions and append-only audit events.
- Customer-facing website and AI integration are intentionally not enabled in this foundation. They will be added only after authentication and data access are tested.

## Important security status
- Do not put database passwords, Supabase service-role keys, or AI API keys in browser code.
- The SQL schema includes RLS policies that deny browser access by default. Server-side authorization still needs to be implemented and tested before production use.
- Create two separate director accounts. Do not share one login.

## Run locally
Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

The current screen is a non-production foundation dashboard. Authentication and database connection are not yet wired up.

## Netlify deployment

The Next.js project lives at the repository root. `netlify.toml` sets the base directory to `.`, the build command to `npm run build`, and the publish directory to `.next`. Netlify automatically detects Next.js and uses its Next.js runtime integration.

The root-level `index.html` and `baron.html` are standalone prototypes; the deployed Next.js homepage is defined in `app/page.tsx`.

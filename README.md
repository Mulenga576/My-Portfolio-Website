# DataSilence Portfolio

Mulenga Mpikula Silence’s portfolio at [datasilence.tech](https://datasilence.tech/). The personalized site starts at the repository’s `index.html`. The internship tracker lives in `internship-tracker.html`.

## Local preview

With Node.js 18+ and Python 3 installed, run these commands from the repository root.

```sh
node scripts/build-portfolio.mjs
python3 -m http.server 8000 --bind 127.0.0.1 --directory dist
```

Open `http://127.0.0.1:8000/`. Open `/internship-tracker.html` for the tracker. The CV is served from `/public/downloads/Mulenga%20Mpikula%20Silence%20CV.pdf`.

## Netlify

The published production deploy for commit `56904ba` on `main` exposes the checked-in Next.js export at `/out/index.html` alongside the personalized site. Netlify's dashboard and the published deploy log confirm the current settings. [Build settings](https://app.netlify.com/projects/effortless-dieffenbachia-671e33/configuration/developer-settings#build-settings) · [Production deploy](https://app.netlify.com/projects/effortless-dieffenbachia-671e33/deploys/68c217e5462fbf00085d96c3)

| Setting | Current production | Proposed in `netlify.toml` |
| --- | --- | --- |
| Base directory | Repository root (`/` in the dashboard) | Repository root |
| Build command | Unset | `node scripts/build-portfolio.mjs` |
| Publish directory | Repository root (`/` in the deploy log) | `dist` |
| Homepage | Root `index.html` | `dist/index.html`, copied from the repository root |

The proposed build recreates `dist` from the portfolio pages and their assets and sets `NETLIFY_NEXT_PLUGIN_SKIP`. It excludes the Next.js export and application, environment files, and database scripts. To develop the older Next.js demo, install dependencies, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`, and run `npm run dev`.

## Contact form

The browser initializes Supabase with its project URL and public anon key in `index.html`. To point a local copy at a different project, update those two values together using that project’s public anon key. Keep service-role credentials on the server.

The production contact form inserts `name`, `email`, `subject`, and `message` into `public.contact_submissions`. The database assigns the default `status` of `new`. Public visitors have insert-only access. The client requests no returned records and makes no read query against that table. The static build does not require Supabase credentials in Netlify environment variables.

Use a test project to verify form delivery or arrange an approved production test. The historical SQL and direct database test scripts in this repository predate the current production access rules.

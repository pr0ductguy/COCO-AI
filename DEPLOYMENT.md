# Deployment

COCO AI deploys to Vercel from the `main` branch.

## Security

- Next.js is pinned to **15.5.19**, patched against CVE-2025-66478
  (React Server Components RCE, downstream of CVE-2025-55182).
- Do **not** redeploy historical deployments built from earlier commits
  (e.g. the original `Initial commit`) — those used an unpatched Next.js
  and Vercel will block them. Always deploy the latest `main` commit.

## Build

- Framework: Next.js (App Router)
- Install: `npm install`
- Build: `next build`
- Output: 492 static pages (9 modules + historical archive profiles)

# Digest Engine Marketing Monorepo

![Digest Engine marketing site header](./readme.jpg)

Monorepo for the Digest Engine marketing site and Sanity Studio.

This repository contains two workspace apps:

- `apps/marketing`: the public marketing site, blog, docs, pricing pages, and signup flow.
- `apps/studio`: the SSR Sanity Studio used to manage marketing content.

Shared Sanity schema definitions live in `packages/sanity-schema` so content modeling stays in one place.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Nextra for blog and docs content
- Sanity Studio
- Turborepo
- Vitest and Testing Library
- pnpm 11

## Getting Started

Requirements:

- Node.js 24.8 or newer
- pnpm 11.1 or newer

Install dependencies:

```bash
pnpm install
```

Start both development servers:

```bash
pnpm run dev
```

Run one app at a time:

```bash
pnpm run dev:marketing
pnpm run dev:studio
```

Create production builds:

```bash
pnpm run build
```

The marketing app still generates its sitemap during `postbuild`.

## Common Commands

```bash
pnpm run dev
pnpm run dev:marketing
pnpm run dev:studio
pnpm run build
pnpm run typecheck
pnpm run lint
pnpm run test
pnpm run format:check
```

## Project Layout

- `apps/marketing/src/app/`: Next.js routes and page entry points for the static site
- `apps/marketing/src/components/`: reusable marketing UI and page components
- `apps/marketing/src/lib/`: shared helpers, props, and client utilities
- `apps/marketing/src/styles/`: global theme and styling layers
- `apps/studio/src/app/`: SSR Sanity Studio routes
- `packages/sanity-schema/src/`: shared Sanity schema definitions
- `.github/workflows/`: CI workflows for lint, test, build, branch rules, and CodeQL

## Notes

- This repo uses pnpm workspaces and Turborepo.
- `apps/marketing` is intended for static export deployment.
- `apps/studio` is intended for SSR deployment on its own Vercel project and subdomain.
- Content for the public docs and blog stays in-repo with the marketing app.

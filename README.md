# Next.js Admin

Provisioned from [`Qode-Fleet-Control/fleet-template-v1`](https://github.com/Qode-Fleet-Control/fleet-template-v1) — the fleet
lifecycle contract (`bin/`, `fleet.conf`, `compose.yaml`, deploy workflows) with
the Next.js Admin starter laid on top. It was the fleet's "Template Library"
template (`templates/nextjs-admin` in agent-fleet) until 2026-10-06, and is now a
scaffold like the others, mounted at `typescript/nextjs-admin` in
[`fleet-scaffolds`](https://github.com/Qode-Fleet-Control/fleet-scaffolds).

## Fleet lifecycle

`fleet.conf` drives every script in `bin/`. On the fleet the app runs as a container
(`docker compose up`); the plain commands are for work without docker
(`FLEET_RUNTIME=process bin/run`).

| step | command |
|---|---|
| install | `corepack pnpm install --frozen-lockfile` |
| build | `corepack pnpm build` |
| start | `corepack pnpm exec next start -H 0.0.0.0 -p $PORT` |

    ./bin/run       # install, build, start in the foreground
    ./bin/start     # start from existing build artifacts
    ./bin/restart   # rebuild and restart
    ./bin/stop      # stop whatever holds the port

Listens on `$PORT` (default `3000`); the health check hits `/login`, the one page
an anonymous request gets a 200 from (`/` redirects there).

**Auth on the fleet.** Set `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` and
`ADMIN_EMAILS` in the workspace env; compose passes them through. Without
`AUTH_SECRET` the container makes a random one at start, so the app still boots,
but sessions end on every restart. Register
`https://<app host>/api/auth/callback/google` as a redirect URI. `AUTH_TRUST_HOST`
is set, since the fleet serves the app behind its proxy.

A full-stack admin dashboard starter built with the Next.js App Router. It ships
with authentication, role-based route protection, a component library, and four
ready-made pages so you can start building your own admin surface immediately.

## Tech stack

- [Next.js 14](https://nextjs.org/docs) — App Router, React Server Components
- [Auth.js v5](https://authjs.dev) (`next-auth@5`) — Google OAuth + JWT sessions
- [shadcn/ui](https://ui.shadcn.com) — accessible components built on Radix UI
- [Recharts](https://recharts.org) — charts
- [Tailwind CSS](https://tailwindcss.com) — styling
- [TanStack Table](https://tanstack.com/table) — the reusable DataTable
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) — forms and validation

## Prerequisites

- Node 18 or newer
- [pnpm](https://pnpm.io)
- Google OAuth credentials (a client ID and secret from the
  [Google Cloud Console](https://console.cloud.google.com/apis/credentials))

## Quick start

```bash
git clone <your-repo-url>
cd nextjs-admin
pnpm install
cp .env.example .env.local
# fill in the values described below, then:
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to
`/dashboard`, which requires an admin session, so you'll land on `/login` first.

## Environment variables

Copy `.env.example` to `.env.local` and set each value:

| Variable             | Description                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| `AUTH_SECRET`        | Secret used to encrypt the session JWT. Generate one with `openssl rand -base64 32`.            |
| `AUTH_GOOGLE_ID`     | Google OAuth client ID for the Google sign-in provider.                                         |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret that pairs with `AUTH_GOOGLE_ID`.                                     |
| `ADMIN_EMAILS`       | Comma-separated list of emails granted the `admin` role. Anyone else signs in as a normal user. |

When registering the OAuth client, add
`http://localhost:3000/api/auth/callback/google` as an authorized redirect URI.

## Pages

- **Dashboard** (`/dashboard`) — stat cards for headline metrics, an activity
  chart, and a recent-activity table.
- **Users** (`/users`) — a searchable DataTable with create and delete (CRUD)
  actions wired through `lib/api.ts`.
- **Analytics** (`/analytics`) — usage trends and performance over time, driven
  by a date-range picker and Recharts visualizations.
- **Settings** (`/settings`) — tabbed forms for General, Security, and
  Notifications preferences, validated with React Hook Form and Zod.

## Customization

### Adding a nav item

Nav links live in `components/layout/Sidebar.tsx`. Add an entry to the `navItems`
array with an `href`, a `label`, and a [lucide](https://lucide.dev) `icon`:

```ts
const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  // ...
  { href: "/reports", label: "Reports", icon: FileText },
];
```

Create the matching page at `app/(admin)/reports/page.tsx`. Because it lives in
the `(admin)` route group, `middleware.ts` protects it automatically.

### Swapping the auth provider

The Google provider is configured in `lib/auth.ts`. Swap it for another
[Auth.js provider](https://authjs.dev/getting-started/authentication/oauth) by
replacing the `providers` array and its environment variables — for example
GitHub:

```ts
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  // keep the jwt/session callbacks that assign the admin role
});
```

The `jwt` callback assigns the `admin` role from `ADMIN_EMAILS`; keep it (or
adapt its role logic) so `middleware.ts` can continue to gate admin routes.

## Learn more

- [Next.js App Router](https://nextjs.org/docs/app)
- [Auth.js](https://authjs.dev)
- [shadcn/ui](https://ui.shadcn.com)
- [Recharts](https://recharts.org)
- [Tailwind CSS](https://tailwindcss.com/docs)

# Working guide for Claude Code

This is a Next.js 14 App Router admin dashboard. Read this before making changes
so edits land in the right place and stay consistent with the template.

## Architecture overview

Route groups organize the `app/` directory without affecting URLs:

- `app/(admin)/` — the authenticated admin surface. `layout.tsx` here renders the
  `Sidebar` + `TopBar` shell around every page. Pages: `dashboard`, `users`,
  `analytics`, `settings`.
- `app/(auth)/` — public auth pages: `login` (Google sign-in button) and
  `unauthorized` (shown to signed-in non-admins).
- `app/api/auth/[...nextauth]/route.ts` — the Auth.js request handler.
- `app/page.tsx` — root route; redirects to `/dashboard`.

Component locations:

- `components/ui/` — shadcn/ui primitives (Button, Card, DataTable, Dialog, Tabs, …).
- `components/layout/` — `Sidebar.tsx` and `TopBar.tsx`, the admin shell.
- `components/dashboard/` — dashboard widgets (`StatCards`, `ActivityChart`, `ActivityTable`).
- `components/settings/` — the tabbed settings forms.

Auth flow:

1. `middleware.ts` runs on every non-asset request. It lets `/login` and
   `/unauthorized` through, redirects unauthenticated users to `/login`, and
   redirects signed-in users without the `admin` role to `/unauthorized`.
2. `/login` calls `signIn("google")`. After the OAuth round-trip, Auth.js issues
   a session JWT.
3. `lib/auth.ts`'s `jwt` callback reads `ADMIN_EMAILS` and stamps `token.role`;
   the `session` callback copies it onto `session.user.role`. `middleware.ts`
   checks that role to gate admin pages.

## How to add a new admin page

1. Create the page at `app/(admin)/your-page/page.tsx`, exporting a default
   component. It automatically inherits the admin shell from
   `app/(admin)/layout.tsx`.
2. Add a nav link in `components/layout/Sidebar.tsx`: push an entry onto the
   `navItems` array with `href: "/your-page"`, a `label`, and a lucide `icon`.
3. Route protection is automatic — everything under `(admin)` is already guarded
   by `middleware.ts`. Only edit the middleware if your page must be *public*: add
   its path to the early `NextResponse.next()` allowlist alongside `/login`.

## How to add a shadcn component

```bash
pnpm dlx shadcn@latest add <component>
```

This writes the component into `components/ui/` using the settings in
`components.json` (new-york style, zinc base color). Import it via the `@/components/ui`
alias.

## Key files map

| File                            | Purpose                                                                    |
| ------------------------------- | -------------------------------------------------------------------------- |
| `lib/auth.ts`                   | NextAuth (Auth.js v5) config: providers plus the jwt/session role callbacks. |
| `middleware.ts`                 | Route protection for the `(admin)` group and role checks.                  |
| `lib/api.ts`                    | Typed fetch helpers (`getUsers`/`createUser`/`deleteUser`); falls back to mock data when `NEXT_PUBLIC_API_URL` is unset. |
| `components/ui/data-table.tsx`  | Reusable TanStack-backed DataTable with built-in search.                   |
| `lib/utils.ts`                  | `cn()` class-name helper (clsx + tailwind-merge).                          |
| `types/next-auth.d.ts`          | Module augmentation adding `role` to the session and JWT types.            |

## Conventions

- Server Components by default; add `"use client"` only when a file needs hooks,
  state, or event handlers (see `Sidebar.tsx`, `users/page.tsx`).
- Style with Tailwind classes and the `cn()` helper; use the theme tokens
  (`bg-background`, `text-muted-foreground`, `bg-sidebar`, …) rather than raw colors.
- Import through the `@/` path alias, not relative `../../` chains.
- Validate forms with React Hook Form + Zod, following the `components/settings/` forms.
- Keep the request logger: every HTTP request must log one JSON line with status and duration (Monitoring tab).

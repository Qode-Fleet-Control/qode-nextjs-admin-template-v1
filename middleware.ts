import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

// Admin pages live in the (admin) route group. Route groups don't appear in the
// URL, so we guard the whole app surface here and let the public auth pages
// (/login, /unauthorized) and Auth.js's own endpoints through.
export default auth((req) => {
  const { pathname } = req.nextUrl

  if (pathname.startsWith("/login") || pathname.startsWith("/unauthorized")) {
    return NextResponse.next()
  }

  if (!req.auth) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin))
  }

  if (req.auth.user?.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.nextUrl.origin))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
}

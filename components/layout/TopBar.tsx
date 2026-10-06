"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";

function titleFromPathname(pathname: string) {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (!segment) {
    return "Dashboard";
  }
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

export function TopBar() {
  const pathname = usePathname();
  const title = titleFromPathname(pathname);

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-6">
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>

      <div className="flex items-center gap-4">
        <div
          aria-hidden="true"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground"
        >
          <User className="h-4 w-4" />
        </div>
        <button
          type="button"
          onClick={() => signOut()}
          className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </header>
  );
}

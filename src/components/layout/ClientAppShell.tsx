"use client";

import { usePathname } from "next/navigation";
import { AppNav } from "./AppNav";

export function ClientAppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-[var(--li-bg-page)] text-[var(--li-text)]">
      <AppNav activePath={pathname} />
      <div className="mx-auto max-w-[1128px] px-2 pb-20 pt-2 sm:pb-10 sm:px-4">{children}</div>
    </div>
  );
}

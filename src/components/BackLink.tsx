"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

/* Goes back when there is history; a direct visit (no history) follows href
   to "/" with no hash. history.length counts the current entry, so > 1 means
   there is a previous page. */
export default function BackLink({ className, children }: { className?: string; children: ReactNode }) {
  const router = useRouter();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (window.history.length > 1) {
      e.preventDefault();
      router.back();
    }
  }

  return (
    <Link href="/" onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}

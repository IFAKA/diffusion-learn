"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useProgress } from "@/lib/progress-context";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function Header() {
  const { getPercentComplete } = useProgress();
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Avoid hydration mismatch - localStorage only exists on client
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    setPercent(getPercentComplete());
  }, [getPercentComplete]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[var(--fg)] flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-[var(--bg)]"
            >
              <path
                d="M8 0L10 6H16L11 10L13 16L8 12L3 16L5 10L0 6H6L8 0Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="font-medium text-sm tracking-tight group-hover:text-[var(--fg-secondary)] transition-colors">
            Learn Diffusion
          </span>
        </Link>

        {/* Progress */}
        {!isHome && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-32 h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--fg)] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <span className="text-xs font-mono text-[var(--fg-muted)]">
                {percent}%
              </span>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              isHome
                ? "text-[var(--fg)]"
                : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
            }`}
          >
            Home
          </Link>
          <Link
            href="/learn"
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              pathname.startsWith("/learn")
                ? "text-[var(--fg)]"
                : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
            }`}
          >
            Modules
          </Link>
        </nav>
      </div>
    </header>
  );
}

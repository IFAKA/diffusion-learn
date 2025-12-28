"use client";

import { motion } from "framer-motion";

export function DiffusionDiagram() {
  return (
    <div className="w-full max-w-lg">
      <div className="relative py-8">
        {/* Forward process (top) */}
        <div className="mb-8">
          <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-4 text-center">
            Forward Process (Training)
          </div>
          <div className="flex items-center justify-between">
            {/* Clean image */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[var(--success)]/30 to-[var(--success)]/10 border border-[var(--success)]/30 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <span className="mt-2 text-xs text-[var(--fg-muted)]">Clean</span>
            </div>

            {/* Arrow with noise */}
            <div className="flex-1 mx-4 relative">
              <div className="h-0.5 bg-[var(--border)]" />
              <motion.div
                className="absolute top-1/2 left-0 w-4 h-4 -mt-2 rounded-full bg-[var(--fg-muted)]"
                animate={{ x: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-[var(--fg-muted)]">
                + noise
              </div>
            </div>

            {/* Noisy image */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22/%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] opacity-30" />
              </div>
              <span className="mt-2 text-xs text-[var(--fg-muted)]">Noise</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-4">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="text-xs text-[var(--fg-muted)]">learned from data</span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        {/* Reverse process (bottom) */}
        <div className="mt-8">
          <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-4 text-center">
            Reverse Process (Generation)
          </div>
          <div className="flex items-center justify-between">
            {/* Noisy image */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22/%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] opacity-30" />
              </div>
              <span className="mt-2 text-xs text-[var(--fg-muted)]">Noise</span>
            </div>

            {/* Arrow with denoising */}
            <div className="flex-1 mx-4 relative">
              <div className="h-0.5 bg-[var(--success)]" />
              <motion.div
                className="absolute top-1/2 right-0 w-4 h-4 -mt-2 rounded-full bg-[var(--success)]"
                animate={{ x: ["0%", "-100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-[var(--success)]">
                - noise (×8)
              </div>
            </div>

            {/* Clean image */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[var(--success)]/30 to-[var(--success)]/10 border border-[var(--success)]/30 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <span className="mt-2 text-xs text-[var(--success)]">Image!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="text-xs text-[var(--fg-muted)] text-center mt-4">
        The model learns to reverse noise addition, enabling generation from pure noise.
      </p>
    </div>
  );
}

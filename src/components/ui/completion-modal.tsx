"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShareCard } from "./share-card";

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: {
    strong: number;
    partial: number;
    weak: number;
  };
  totalChallenges: number;
}

export function CompletionModal({
  isOpen,
  onClose,
  stats,
  totalChallenges,
}: CompletionModalProps) {
  const total = stats.strong + stats.partial + stats.weak;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[var(--bg)] border border-[var(--border)] rounded-2xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Trophy icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-[var(--success)]/10 flex items-center justify-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--success)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-[var(--fg)] text-center mb-2">
                Course Complete!
              </h2>
              <p className="text-[var(--fg-secondary)] text-center mb-8">
                You&apos;ve finished all {totalChallenges} challenges. Great work understanding diffusion models!
              </p>

              {/* Stats */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-secondary)]">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[var(--success)]" />
                    <span className="text-[var(--fg)]">Strong understanding</span>
                  </div>
                  <span className="font-mono text-[var(--fg-muted)]">
                    {stats.strong}/{total}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-secondary)]">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[var(--warning)]" />
                    <span className="text-[var(--fg)]">Partial understanding</span>
                  </div>
                  <span className="font-mono text-[var(--fg-muted)]">
                    {stats.partial}/{total}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-secondary)]">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[var(--fg-muted)]" />
                    <span className="text-[var(--fg)]">Needs review</span>
                  </div>
                  <span className="font-mono text-[var(--fg-muted)]">
                    {stats.weak}/{total}
                  </span>
                </div>
              </div>

              {/* Share card */}
              <div className="mb-6">
                <p className="text-xs text-[var(--fg-muted)] text-center mb-3">
                  Share your achievement
                </p>
                <ShareCard stats={stats} totalChallenges={totalChallenges} />
              </div>

              {/* Tip */}
              {(stats.partial > 0 || stats.weak > 0) && (
                <p className="text-sm text-[var(--fg-muted)] text-center mb-4">
                  Keep practicing with spaced reviews to strengthen your understanding.
                </p>
              )}

              {/* Close button */}
              <button
                onClick={onClose}
                className="w-full py-3 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium hover:opacity-90 transition-opacity"
              >
                Continue Learning
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

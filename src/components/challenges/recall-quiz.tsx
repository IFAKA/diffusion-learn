"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Challenge } from "@/lib/challenges";
import { useProgress } from "@/lib/progress-context";

interface RecallQuizProps {
  challenges: Challenge[];
  onComplete: () => void;
}

export function RecallQuiz({ challenges, onComplete }: RecallQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const { recordReview } = useProgress();

  if (challenges.length === 0) {
    return null;
  }

  const currentChallenge = challenges[currentIndex];
  const isLast = currentIndex === challenges.length - 1;

  const handleResponse = (correct: boolean) => {
    recordReview(currentChallenge.id, correct);

    if (isLast) {
      onComplete();
    } else {
      setShowAnswer(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="p-6 rounded-xl border border-[var(--warning)]/30 bg-[var(--warning)]/5">
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-[var(--warning)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <h3 className="font-medium text-[var(--warning)]">
          Quick Review ({currentIndex + 1}/{challenges.length})
        </h3>
      </div>

      <p className="text-xs text-[var(--fg-muted)] mb-4">
        Before starting new content, let&apos;s reinforce what you&apos;ve learned.
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentChallenge.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {/* Question */}
          <div className="mb-4">
            <p className="text-[var(--fg)] font-medium mb-2">
              {currentChallenge.prompt}
            </p>

            {!showAnswer && (
              <button
                onClick={() => setShowAnswer(true)}
                className="mt-4 px-4 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium
                  hover:opacity-90 transition-opacity
                  focus:outline-none focus:ring-2 focus:ring-[var(--fg)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
              >
                Show Answer
              </button>
            )}
          </div>

          {/* Answer reveal */}
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
                <p className="text-sm text-[var(--fg-muted)] uppercase tracking-wider mb-2">
                  Key Insight
                </p>
                <p className="text-[var(--fg)]">{currentChallenge.insight}</p>
              </div>

              <div>
                <p className="text-sm text-[var(--fg-muted)] mb-2">
                  Did you remember this correctly?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleResponse(true)}
                    className="px-4 py-2 rounded-lg bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/30
                      hover:bg-[var(--success)]/20 transition-colors
                      focus:outline-none focus:ring-2 focus:ring-[var(--success)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
                  >
                    <span aria-hidden="true">✓ </span>
                    Yes
                  </button>
                  <button
                    onClick={() => handleResponse(false)}
                    className="px-4 py-2 rounded-lg bg-[var(--error)]/10 text-[var(--error)] border border-[var(--error)]/30
                      hover:bg-[var(--error)]/20 transition-colors
                      focus:outline-none focus:ring-2 focus:ring-[var(--error)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
                  >
                    <span aria-hidden="true">✗ </span>
                    No
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

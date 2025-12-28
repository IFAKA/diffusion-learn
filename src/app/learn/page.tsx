"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { modules, lessons } from "@/lib/challenges";
import { useProgress } from "@/lib/progress-context";
import { RecallQuiz } from "@/components/challenges/recall-quiz";
import Link from "next/link";

export default function LearnPage() {
  const {
    getPercentComplete,
    getUnderstandingScore,
    isChallengeCompleted,
    getDueReviews,
    getReviewStats,
  } = useProgress();

  const [showingReview, setShowingReview] = useState(true);

  const percent = getPercentComplete();
  const understanding = getUnderstandingScore();
  const dueReviews = getDueReviews(3);
  const reviewStats = getReviewStats();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-[var(--fg)] mb-4">
          Learning Path
        </h1>
        <p className="text-[var(--fg-secondary)] mb-6">
          7 modules. Work through challenges to actually understand diffusion models.
        </p>

        {/* Progress stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[var(--fg-secondary)]">
                Progress
              </span>
              <span className="font-mono text-sm text-[var(--fg)]">{percent}%</span>
            </div>
            <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[var(--fg)] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]">
            <span className="text-sm text-[var(--fg-secondary)] block mb-2">
              Understanding
            </span>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--success)]" />
                <span className="text-[var(--fg-muted)]">{understanding.strong}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--warning)]" />
                <span className="text-[var(--fg-muted)]">{understanding.partial}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--fg-muted)]" />
                <span className="text-[var(--fg-muted)]">{understanding.weak}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]">
            <span className="text-sm text-[var(--fg-secondary)] block mb-2">
              Retention
            </span>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-[var(--success)] font-medium">{reviewStats.mastered}</span>
                <span className="text-[var(--fg-muted)]">mastered</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[var(--fg)] font-medium">{reviewStats.learning}</span>
                <span className="text-[var(--fg-muted)]">learning</span>
              </div>
              {reviewStats.due > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-[var(--warning)] font-medium">{reviewStats.due}</span>
                  <span className="text-[var(--fg-muted)]">due</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Due Reviews */}
      {dueReviews.length > 0 && showingReview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <RecallQuiz
            challenges={dueReviews}
            onComplete={() => setShowingReview(false)}
          />
        </motion.div>
      )}

      {/* Skip review option */}
      {dueReviews.length > 0 && showingReview && (
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowingReview(false)}
            className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            Skip review for now
          </button>
        </div>
      )}

      {/* Module grid */}
      <div className="grid gap-4">
        {modules.map((module, index) => {
          const moduleLessons = Object.values(lessons).filter(l => l.moduleId === module.id);
          const totalChallenges = moduleLessons.reduce((sum, l) =>
            sum + l.challenges.length + (l.transferQuestion ? 1 : 0), 0
          );
          const completedChallenges = moduleLessons.reduce((sum, l) => {
            const challenges = [...l.challenges, ...(l.transferQuestion ? [l.transferQuestion] : [])];
            return sum + challenges.filter(c => isChallengeCompleted(c.id)).length;
          }, 0);
          const modulePercent = totalChallenges > 0
            ? Math.round((completedChallenges / totalChallenges) * 100)
            : 0;
          const isComplete = modulePercent === 100;

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Link href={`/learn/${module.id}`}>
                <div className="group relative p-6 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] transition-all duration-200">
                  {/* Module number badge */}
                  <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center">
                    <span className="text-xs font-mono text-[var(--fg-muted)]">
                      {module.id}
                    </span>
                  </div>

                  {/* Completion badge */}
                  {isComplete && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--success)] flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--bg)" strokeWidth="3" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[var(--fg)] mb-1 group-hover:text-[var(--fg)] transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-sm text-[var(--fg-muted)] mb-3">
                        {module.description}
                      </p>

                      {/* Progress bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1 bg-[var(--border)] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: isComplete ? "var(--success)" : "var(--fg)",
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${modulePercent}%` }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                          />
                        </div>
                        <span className="text-xs font-mono text-[var(--fg-muted)] w-16 text-right">
                          {completedChallenges}/{totalChallenges}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <svg
                      className="w-5 h-5 text-[var(--fg-muted)] group-hover:text-[var(--fg)] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

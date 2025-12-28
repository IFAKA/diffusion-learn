"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useProgress } from "@/lib/progress-context";
import { TOTAL_CHALLENGES, lessons } from "@/lib/challenges";

export default function HomePage() {
  const { getPercentComplete, getNextLesson, progress } = useProgress();
  const percent = getPercentComplete();
  const nextLesson = getNextLesson();
  const hasStarted = progress.completedLessons.length > 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] mb-8">
            <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
            <span className="text-xs text-[var(--fg-muted)]">
              ADHD-friendly learning
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--fg)] mb-6 tracking-tight">
            Learn Diffusion Models
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-[var(--fg-secondary)] mb-8 max-w-lg mx-auto">
            Understand AI image generation from scratch. Built for web developers
            with zero ML background.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--fg)]">7</div>
              <div className="text-xs text-[var(--fg-muted)]">modules</div>
            </div>
            <div className="w-px h-8 bg-[var(--border)]" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--fg)]">{Object.keys(lessons).length}</div>
              <div className="text-xs text-[var(--fg-muted)]">lessons</div>
            </div>
            <div className="w-px h-8 bg-[var(--border)]" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--fg)]">{TOTAL_CHALLENGES}</div>
              <div className="text-xs text-[var(--fg-muted)]">challenges</div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {hasStarted ? (
              <>
                <Link
                  href={
                    nextLesson
                      ? `/learn/${nextLesson.moduleId}/${nextLesson.lessonId}`
                      : "/learn"
                  }
                  className="px-6 py-3 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium
                    hover:opacity-90 transition-opacity"
                >
                  Continue Learning ({percent}% complete)
                </Link>
                <Link
                  href="/learn"
                  className="px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--fg-secondary)]
                    hover:bg-[var(--bg-hover)] transition-colors"
                >
                  View All Modules
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/learn/1/1"
                  className="px-6 py-3 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium
                    hover:opacity-90 transition-opacity"
                >
                  Start Learning
                </Link>
                <Link
                  href="/learn"
                  className="px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--fg-secondary)]
                    hover:bg-[var(--bg-hover)] transition-colors"
                >
                  Browse Modules
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="border-t border-[var(--border)] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--fg)"
                  strokeWidth="1.5"
                >
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-medium text-[var(--fg)] mb-2">Learn by Doing</h3>
              <p className="text-sm text-[var(--fg-muted)]">
                Predict, explain, and build. Struggle first, then discover the answer.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--fg)"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
              <h3 className="font-medium text-[var(--fg)] mb-2">Interactive Demos</h3>
              <p className="text-sm text-[var(--fg-muted)]">
                Play with sliders, visualizations, and live examples.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--fg)"
                  strokeWidth="1.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-medium text-[var(--fg)] mb-2">Track Understanding</h3>
              <p className="text-sm text-[var(--fg-muted)]">
                Self-assess after each challenge. Know what you understand vs need to revisit.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-6 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-xs text-[var(--fg-muted)]">
            Built to understand Z-Image-Turbo
          </span>
          <a
            href="https://huggingface.co/Tongyi-MAI/Z-Image-Turbo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            View Model
          </a>
        </div>
      </footer>
    </div>
  );
}

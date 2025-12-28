"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useProgress } from "@/lib/progress-context";
import { notFound } from "next/navigation";

export default function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  /* eslint-disable @typescript-eslint/no-require-imports */
  const { getModule, lessons, modules } = require("@/lib/challenges");
  /* eslint-enable @typescript-eslint/no-require-imports */

  const { moduleId } = use(params);
  const moduleIdNum = parseInt(moduleId);
  const currentModule = getModule(moduleIdNum);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const moduleLessons = (Object.values(lessons) as any[]).filter(l => l.moduleId === moduleIdNum);
  const { isLessonCompleted, isChallengeCompleted } = useProgress();

  if (!currentModule) {
    notFound();
  }

  const totalChallenges = moduleLessons.reduce((sum, l) =>
    sum + l.challenges.length + (l.transferQuestion ? 1 : 0), 0
  );

  const completedChallenges = moduleLessons.reduce((sum, l) => {
    const lessonChallenges = [...l.challenges, ...(l.transferQuestion ? [l.transferQuestion] : [])];
    return sum + lessonChallenges.filter(c => isChallengeCompleted(c.id)).length;
  }, 0);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--fg-muted)] mb-8">
        <Link href="/learn" className="hover:text-[var(--fg)] transition-colors">
          Modules
        </Link>
        <span>/</span>
        <span className="text-[var(--fg)]">{currentModule.title}</span>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center">
            <span className="font-mono text-sm text-[var(--fg-muted)]">
              {currentModule.id}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[var(--fg)]">{currentModule.title}</h1>
        </div>
        <p className="text-[var(--fg-secondary)] mb-6">{currentModule.description}</p>

        {/* Progress */}
        <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--fg-secondary)]">
              Challenges completed
            </span>
            <span className="font-mono text-sm text-[var(--fg)]">
              {completedChallenges}/{totalChallenges}
            </span>
          </div>
          <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[var(--success)] rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${totalChallenges > 0 ? (completedChallenges / totalChallenges) * 100 : 0}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Core concepts */}
      <div className="mb-10">
        <h2 className="text-sm font-medium text-[var(--fg-muted)] uppercase tracking-wider mb-4">
          What you&apos;ll understand after this module
        </h2>
        <ul className="space-y-2">
          {currentModule.coreConcepts.map((concept: string, index: number) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 text-[var(--fg-secondary)]"
            >
              <svg
                className="w-5 h-5 text-[var(--fg-muted)] flex-shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              {concept}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Lessons list */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-[var(--fg-muted)] uppercase tracking-wider mb-4">
          Lessons
        </h2>
        {moduleLessons.map((lesson, index) => {
          const isCompleted = isLessonCompleted(lesson.id);
          const challengeCount = lesson.challenges.length + (lesson.transferQuestion ? 1 : 0);
          const lessonChallenges = [...lesson.challenges, ...(lesson.transferQuestion ? [lesson.transferQuestion] : [])];
          const completedInLesson = lessonChallenges.filter(c => isChallengeCompleted(c.id)).length;

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/learn/${moduleIdNum}/${lesson.lessonNumber}`}>
                <div
                  className={`group p-5 rounded-xl border transition-all ${
                    isCompleted
                      ? "border-[var(--success)]/30 bg-[var(--success)]/5"
                      : "border-[var(--border)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Number/Check */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCompleted
                          ? "bg-[var(--success)]/20 text-[var(--success)]"
                          : "bg-[var(--bg)] border border-[var(--border)] text-[var(--fg-muted)] group-hover:text-[var(--fg)]"
                      }`}
                    >
                      {isCompleted ? (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <span className="font-mono text-sm">
                          {lesson.lessonNumber}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <h3
                          className={`font-medium ${
                            isCompleted
                              ? "text-[var(--success)]"
                              : "text-[var(--fg)] group-hover:text-[var(--fg)]"
                          }`}
                        >
                          {lesson.title}
                        </h3>
                        <span className="text-xs text-[var(--fg-muted)] whitespace-nowrap">
                          {completedInLesson}/{challengeCount} challenges
                        </span>
                      </div>
                      <p className="text-sm text-[var(--fg-muted)] mt-1">
                        {lesson.subtitle}
                      </p>
                    </div>

                    {/* Arrow */}
                    <svg
                      className="w-5 h-5 text-[var(--fg-muted)] group-hover:text-[var(--fg)] group-hover:translate-x-1 transition-all flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
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

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-[var(--border)]">
        {moduleIdNum > 1 ? (
          <Link
            href={`/learn/${moduleIdNum - 1}`}
            className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            ← Previous Module
          </Link>
        ) : (
          <div />
        )}
        {moduleIdNum < modules.length ? (
          <Link
            href={`/learn/${moduleIdNum + 1}`}
            className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            Next Module →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

"use client";

import { use, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { LoadingPlaceholder } from "@/components/ui/spinner";

const ChallengeWrapper = dynamic(
  () => import("@/components/challenges/challenge-wrapper").then(m => m.ChallengeWrapper),
  { loading: () => <LoadingPlaceholder />, ssr: false }
);

export default function PracticePage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const { moduleId, lessonId } = use(params);
  const moduleIdNum = parseInt(moduleId);
  const lessonIdNum = parseInt(lessonId);

  // Import data lazily to avoid Turbopack bundling all at once
  /* eslint-disable @typescript-eslint/no-require-imports */
  const { getLesson, getModule, modules, lessons } = require("@/lib/challenges");
  const { useProgress } = require("@/lib/progress-context");
  /* eslint-enable @typescript-eslint/no-require-imports */

  const challengeContent = getLesson(moduleIdNum, lessonIdNum);
  const lessonModule = getModule(moduleIdNum);

  if (!lessonModule || !challengeContent) {
    notFound();
  }

  const { completeChallenge, completeLesson, isChallengeCompleted, isLessonCompleted } = useProgress();
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  const lessonTitle = challengeContent.title;
  const allChallenges = [
    ...challengeContent.challenges,
    ...(challengeContent.transferQuestion ? [challengeContent.transferQuestion] : []),
  ];

  const currentChallenge = allChallenges[currentChallengeIndex];
  const isLastChallenge = currentChallengeIndex === allChallenges.length - 1;
  const lessonComplete = isLessonCompleted(challengeContent.id);

  const moduleLessons = (Object.values(lessons) as { moduleId: number }[]).filter((l) => l.moduleId === moduleIdNum);
  const hasNextLesson = lessonIdNum < moduleLessons.length;
  const hasNextModule = moduleIdNum < modules.length;

  const nextLessonLink = hasNextLesson
    ? `/learn/${moduleIdNum}/${lessonIdNum + 1}`
    : hasNextModule
    ? `/learn/${moduleIdNum + 1}/1`
    : null;

  const handleChallengeComplete = (understood: "yes" | "partial" | "no") => {
    if (!currentChallenge) return;
    completeChallenge(currentChallenge.id, understood);
    if (isLastChallenge) {
      completeLesson(challengeContent.id);
    } else {
      setTimeout(() => setCurrentChallengeIndex(i => i + 1), 500);
    }
  };

  const backLink = moduleIdNum === 8 ? `/learn/${moduleIdNum}` : `/learn/${moduleIdNum}/${lessonIdNum}`;
  const backLabel = moduleIdNum === 8 ? "← Back to Module" : "← Back to Learn";

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--fg-muted)] mb-8">
        <Link href="/learn" className="hover:text-[var(--fg)]">Modules</Link>
        <span>/</span>
        <Link href={`/learn/${moduleIdNum}`} className="hover:text-[var(--fg)]">{lessonModule.title}</Link>
        <span>/</span>
        <span className="text-[var(--fg)]">{lessonTitle}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-mono text-[var(--fg-muted)] uppercase tracking-wider">
            Practice • Lesson {lessonIdNum}
          </p>
          {lessonComplete && (
            <span className="text-xs text-[var(--success)] flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Completed
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-[var(--fg)] mb-2">{lessonTitle}</h1>
        <p className="text-[var(--fg-secondary)]">Test your understanding with these challenges</p>
      </header>

      {/* Progress dots */}
      <div className="flex items-center gap-2 mb-6">
        {allChallenges.map((challenge: { id: string }, index: number) => (
          <button
            key={challenge.id}
            onClick={() => setCurrentChallengeIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              isChallengeCompleted(challenge.id)
                ? "bg-[var(--success)]"
                : index === currentChallengeIndex
                ? "bg-[var(--fg)] scale-125"
                : "bg-[var(--border)]"
            }`}
          />
        ))}
      </div>

      {/* Challenge - key forces remount when challenge changes */}
      <ChallengeWrapper key={currentChallenge.id} challenge={currentChallenge} onComplete={handleChallengeComplete} />

      {/* Complete state */}
      {lessonComplete && isLastChallenge && (
        <div className="mt-8 p-6 rounded-xl border border-[var(--success)]/30 bg-[var(--success)]/5 text-center">
          <h3 className="text-lg font-medium text-[var(--success)] mb-2">Practice Complete!</h3>
          <p className="text-[var(--fg-secondary)] mb-4">Great job!</p>
          {nextLessonLink && (
            <Link
              href={nextLessonLink}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium"
            >
              {hasNextLesson ? "Next Lesson" : "Next Module"}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex items-center justify-between mt-12 pt-8 border-t border-[var(--border)]">
        <Link href={backLink} className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]">
          {backLabel}
        </Link>
        {nextLessonLink && lessonComplete ? (
          <Link href={nextLessonLink} className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]">
            {hasNextLesson ? "Next Lesson" : "Next Module"} →
          </Link>
        ) : nextLessonLink ? (
          <span className="text-sm text-[var(--fg-muted)] opacity-50">Complete challenges first</span>
        ) : (
          <span className="text-sm text-[var(--success)]">Course Complete!</span>
        )}
      </nav>
    </div>
  );
}

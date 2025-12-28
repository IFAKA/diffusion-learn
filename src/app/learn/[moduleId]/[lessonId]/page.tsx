"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getLesson as getVisualLesson, getModule as getVisualModule } from "@/lib/lessons";
import { getLesson as getChallengeLesson, getModule as getChallengeModule, modules as challengeModules, lessons as challengeLessons } from "@/lib/challenges";
import { LessonSection } from "@/components/learn/lesson-section";
import { ChallengeWrapper } from "@/components/challenges/challenge-wrapper";
import { useProgress } from "@/lib/progress-context";
import { notFound } from "next/navigation";

export default function LessonPage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const { moduleId, lessonId } = use(params);
  const moduleIdNum = parseInt(moduleId);
  const lessonIdNum = parseInt(lessonId);

  // Load from both systems
  const visualContent = getVisualLesson(moduleIdNum, lessonIdNum);
  const challengeContent = getChallengeLesson(moduleIdNum, lessonIdNum);

  // Use challenge module as primary (has 8 modules), fall back to visual module
  const lessonModule = getChallengeModule(moduleIdNum) || getVisualModule(moduleIdNum);

  // Get lesson metadata from whichever exists
  const lessonTitle = visualContent?.title || challengeContent?.title;
  const lessonSubtitle = visualContent?.subtitle || challengeContent?.subtitle;

  const { completeChallenge, completeLesson, isChallengeCompleted, isLessonCompleted } = useProgress();
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  // If neither exists, 404
  if (!lessonModule || (!visualContent && !challengeContent)) {
    notFound();
  }

  // Calculate challenges if they exist
  const allChallenges = challengeContent ? [
    ...challengeContent.challenges,
    ...(challengeContent.transferQuestion ? [challengeContent.transferQuestion] : []),
  ] : [];

  const currentChallenge = allChallenges[currentChallengeIndex];
  const isLastChallenge = currentChallengeIndex === allChallenges.length - 1;
  const lessonComplete = challengeContent ? isLessonCompleted(challengeContent.id) : false;

  // Calculate navigation using challenge lessons (more complete)
  const moduleLessons = Object.values(challengeLessons).filter(l => l.moduleId === moduleIdNum);
  const hasNextLesson = lessonIdNum < moduleLessons.length;
  const hasPrevLesson = lessonIdNum > 1;
  const hasNextModule = moduleIdNum < challengeModules.length;
  const hasPrevModule = moduleIdNum > 1;

  const nextLink = hasNextLesson
    ? `/learn/${moduleIdNum}/${lessonIdNum + 1}`
    : hasNextModule
    ? `/learn/${moduleIdNum + 1}/1`
    : null;

  const prevLink = hasPrevLesson
    ? `/learn/${moduleIdNum}/${lessonIdNum - 1}`
    : hasPrevModule
    ? `/learn/${moduleIdNum - 1}/${
        Object.values(challengeLessons).filter(l => l.moduleId === moduleIdNum - 1).length
      }`
    : null;

  const handleChallengeComplete = (understood: "yes" | "partial" | "no") => {
    if (!challengeContent || !currentChallenge) return;

    completeChallenge(currentChallenge.id, understood);

    if (isLastChallenge) {
      completeLesson(challengeContent.id);
    } else {
      setTimeout(() => {
        setCurrentChallengeIndex(currentChallengeIndex + 1);
      }, 500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--fg-muted)] mb-8">
        <Link href="/learn" className="hover:text-[var(--fg)] transition-colors">
          Modules
        </Link>
        <span>/</span>
        <Link
          href={`/learn/${moduleIdNum}`}
          className="hover:text-[var(--fg)] transition-colors"
        >
          {lessonModule.title}
        </Link>
        <span>/</span>
        <span className="text-[var(--fg)]">{lessonTitle}</span>
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-[var(--fg-muted)] uppercase tracking-wider">
            Lesson {lessonIdNum}
            {visualContent?.estimatedTime && ` • ${visualContent.estimatedTime}`}
          </span>
          {lessonComplete && (
            <span className="text-xs text-[var(--success)] flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Completed
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-[var(--fg)] mb-2">
          {lessonTitle}
        </h1>
        <p className="text-[var(--fg-secondary)]">{lessonSubtitle}</p>
      </motion.header>

      {/* SECTION 1: Interactive Visualizations (if exists) */}
      {visualContent && (
        <div className="space-y-6 mb-12">
          {visualContent.sections.map((section, index) => (
            <LessonSection key={index} section={section} index={index} />
          ))}
        </div>
      )}

      {/* SECTION 2: Challenges (if exists) */}
      {challengeContent && allChallenges.length > 0 && (
        <div className="mt-8">
          {/* Divider if we had visualizations above */}
          {visualContent && (
            <div className="mb-8 pt-8 border-t border-[var(--border)]">
              <h2 className="text-lg font-semibold text-[var(--fg)] mb-2">
                Practice
              </h2>
              <p className="text-sm text-[var(--fg-muted)]">
                Test your understanding with these challenges
              </p>
            </div>
          )}

          {/* Challenge progress dots */}
          <div className="flex items-center gap-2 mb-6">
            {allChallenges.map((challenge, index) => {
              const isCompleted = isChallengeCompleted(challenge.id);
              const isCurrent = index === currentChallengeIndex;

              return (
                <button
                  key={challenge.id}
                  onClick={() => setCurrentChallengeIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    isCompleted
                      ? "bg-[var(--success)]"
                      : isCurrent
                      ? "bg-[var(--fg)] scale-125"
                      : "bg-[var(--border)]"
                  }`}
                  title={`Challenge ${index + 1}`}
                />
              );
            })}
            {challengeContent.transferQuestion && (
              <span className="text-xs text-[var(--fg-muted)] ml-2">+ Transfer</span>
            )}
          </div>

          {/* Current challenge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentChallenge.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {challengeContent.transferQuestion && currentChallenge.id === challengeContent.transferQuestion.id && (
                <div className="mb-6 p-3 rounded-lg bg-[var(--warning)]/10 border border-[var(--warning)]/30">
                  <p className="text-sm text-[var(--warning)]">
                    <strong>Transfer Challenge:</strong> Apply what you learned to a new situation.
                  </p>
                </div>
              )}

              <ChallengeWrapper
                challenge={currentChallenge}
                onComplete={handleChallengeComplete}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Lesson complete state */}
      <AnimatePresence>
        {lessonComplete && isLastChallenge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 rounded-xl border border-[var(--success)]/30 bg-[var(--success)]/5 text-center"
          >
            <svg
              className="w-12 h-12 mx-auto mb-4 text-[var(--success)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h3 className="text-lg font-medium text-[var(--success)] mb-2">
              Lesson Complete
            </h3>
            <p className="text-[var(--fg-secondary)] mb-4">
              Great job! You&apos;ve completed this lesson.
            </p>
            {nextLink && (
              <Link
                href={nextLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium
                  hover:opacity-90 transition-opacity"
              >
                {hasNextLesson ? "Next Lesson" : "Next Module"}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="flex items-center justify-between mt-12 pt-8 border-t border-[var(--border)]">
        {prevLink ? (
          <Link
            href={prevLink}
            className="group flex items-center gap-2 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Previous</span>
          </Link>
        ) : (
          <div />
        )}

        <Link
          href={`/learn/${moduleIdNum}`}
          className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
        >
          Back to Module
        </Link>

        {nextLink && (!challengeContent || lessonComplete) ? (
          <Link
            href={nextLink}
            className="group flex items-center gap-2 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            <span className="text-sm">
              {hasNextLesson ? "Next Lesson" : "Next Module"}
            </span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        ) : nextLink ? (
          <span className="text-sm text-[var(--fg-muted)] opacity-50">
            Complete challenges first
          </span>
        ) : (
          <span className="text-sm text-[var(--success)]">Course Complete!</span>
        )}
      </nav>
    </div>
  );
}

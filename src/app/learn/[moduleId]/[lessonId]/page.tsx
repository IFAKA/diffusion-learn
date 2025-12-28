"use client";

import { use } from "react";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";

// Lazy load heavy modules
import dynamic from "next/dynamic";

const LessonContent = dynamic(() => import("@/components/learn/lesson-content"), {
  loading: () => (
    <div className="space-y-4">
      <div className="h-32 bg-[var(--border)] rounded-lg animate-pulse" />
      <div className="h-32 bg-[var(--border)] rounded-lg animate-pulse" />
    </div>
  ),
});

export default function LessonPage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const { moduleId, lessonId } = use(params);
  const moduleIdNum = parseInt(moduleId);
  const lessonIdNum = parseInt(lessonId);

  // Import data lazily inside component to avoid Turbopack bundling all at once
  /* eslint-disable @typescript-eslint/no-require-imports */
  const { getLesson: getVisualLesson, getModule: getVisualModule } = require("@/lib/lessons");
  const { getLesson: getChallengeLesson, getModule: getChallengeModule, modules: challengeModules, lessons: challengeLessons } = require("@/lib/challenges");
  /* eslint-enable @typescript-eslint/no-require-imports */

  const visualContent = getVisualLesson(moduleIdNum, lessonIdNum);
  const challengeContent = getChallengeLesson(moduleIdNum, lessonIdNum);
  const lessonModule = getChallengeModule(moduleIdNum) || getVisualModule(moduleIdNum);

  if (!lessonModule || (!visualContent && !challengeContent)) {
    notFound();
  }

  if (!visualContent && challengeContent) {
    redirect(`/learn/${moduleIdNum}/${lessonIdNum}/practice`);
  }

  const lessonTitle = visualContent?.title || challengeContent?.title;
  const lessonSubtitle = visualContent?.subtitle || challengeContent?.subtitle;
  const hasChallenges = !!challengeContent;

  let nextStepLink: string | null = null;
  let nextStepLabel = "Next Lesson";

  if (hasChallenges) {
    nextStepLink = `/learn/${moduleIdNum}/${lessonIdNum}/practice`;
    nextStepLabel = "Continue to Practice";
  } else {
    const moduleLessons = (Object.values(challengeLessons) as { moduleId: number }[]).filter(
      (l) => l.moduleId === moduleIdNum
    );
    if (lessonIdNum < moduleLessons.length) {
      nextStepLink = `/learn/${moduleIdNum}/${lessonIdNum + 1}`;
    } else if (moduleIdNum < challengeModules.length) {
      nextStepLink = `/learn/${moduleIdNum + 1}/1`;
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--fg-muted)] mb-8">
        <Link href="/learn" className="hover:text-[var(--fg)]">Modules</Link>
        <span>/</span>
        <Link href={`/learn/${moduleIdNum}`} className="hover:text-[var(--fg)]">
          {lessonModule.title}
        </Link>
        <span>/</span>
        <span className="text-[var(--fg)]">{lessonTitle}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-xs font-mono text-[var(--fg-muted)] uppercase tracking-wider mb-2">
          Lesson {lessonIdNum}
          {visualContent?.estimatedTime && ` • ${visualContent.estimatedTime}`}
        </p>
        <h1 className="text-2xl font-bold text-[var(--fg)] mb-2">{lessonTitle}</h1>
        <p className="text-[var(--fg-secondary)]">{lessonSubtitle}</p>
      </header>

      {/* Content */}
      {visualContent && <LessonContent sections={visualContent.sections} />}

      {/* Next button */}
      {nextStepLink && (
        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <Link
            href={nextStepLink}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium hover:opacity-90"
          >
            {nextStepLabel}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}

      {/* Back link */}
      <nav className="mt-8 pt-8 border-t border-[var(--border)]">
        <Link
          href={`/learn/${moduleIdNum}`}
          className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]"
        >
          ← Back to Module
        </Link>
      </nav>
    </div>
  );
}

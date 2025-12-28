"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { modules, lessons, TOTAL_CHALLENGES } from "./content";
import type { Challenge } from "./types";

interface ChallengeResult {
  challengeId: string;
  understood: "yes" | "partial" | "no";
  completedAt: string;
}

interface ReviewItem {
  challengeId: string;
  lastReviewed: string;
  nextReview: string;
  interval: number; // days until next review
  correctStreak: number;
}

interface Progress {
  completedChallenges: Record<string, ChallengeResult>;
  completedLessons: string[];
  reviewItems: Record<string, ReviewItem>;
}

interface ProgressContextType {
  progress: Progress;
  completeChallenge: (challengeId: string, understood: "yes" | "partial" | "no") => void;
  completeLesson: (lessonId: string) => void;
  isChallengeCompleted: (challengeId: string) => boolean;
  isLessonCompleted: (lessonId: string) => boolean;
  getPercentComplete: () => number;
  getUnderstandingScore: () => { strong: number; partial: number; weak: number };
  getNextLesson: () => { moduleId: number; lessonId: number } | null;
  resetProgress: () => void;
  // Spaced retrieval
  getDueReviews: (limit?: number) => Challenge[];
  recordReview: (challengeId: string, correct: boolean) => void;
  getReviewStats: () => { due: number; mastered: number; learning: number };
}

const defaultProgress: Progress = {
  completedChallenges: {},
  completedLessons: [],
  reviewItems: {},
};

const ProgressContext = createContext<ProgressContextType | null>(null);

const STORAGE_KEY = "diffusion-learn-progress-v3";

// Spaced repetition intervals (in days)
const INITIAL_INTERVAL = 1;
const INTERVAL_MULTIPLIER = 2;
const MAX_INTERVAL = 30;

function loadProgressFromStorage(): Progress {
  if (typeof window === "undefined") return defaultProgress;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Migrate from v2 if needed
      if (!parsed.reviewItems) {
        parsed.reviewItems = {};
      }
      return parsed;
    } catch {
      return defaultProgress;
    }
  }
  return defaultProgress;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  // Start with default to avoid hydration mismatch
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage after mount
  useEffect(() => {
    setProgress(loadProgressFromStorage());
    setHydrated(true);
  }, []);

  // Save to localStorage on change (only after hydration)
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress, hydrated]);

  const completeChallenge = (challengeId: string, understood: "yes" | "partial" | "no") => {
    const now = new Date();
    const nextReviewDate = new Date(now);

    // Set initial review interval based on understanding
    let initialInterval = INITIAL_INTERVAL;
    if (understood === "yes") {
      initialInterval = 2; // Understood well = review in 2 days
    } else if (understood === "partial") {
      initialInterval = 1; // Partial = review tomorrow
    } else {
      initialInterval = 0.5; // Weak = review in 12 hours
    }

    nextReviewDate.setDate(nextReviewDate.getDate() + initialInterval);

    setProgress((prev) => ({
      ...prev,
      completedChallenges: {
        ...prev.completedChallenges,
        [challengeId]: {
          challengeId,
          understood,
          completedAt: now.toISOString(),
        },
      },
      reviewItems: {
        ...prev.reviewItems,
        [challengeId]: {
          challengeId,
          lastReviewed: now.toISOString(),
          nextReview: nextReviewDate.toISOString(),
          interval: initialInterval,
          correctStreak: understood === "yes" ? 1 : 0,
        },
      },
    }));
  };

  const completeLesson = (lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  };

  const isChallengeCompleted = (challengeId: string) => {
    return challengeId in progress.completedChallenges;
  };

  const isLessonCompleted = (lessonId: string) => {
    return progress.completedLessons.includes(lessonId);
  };

  const getPercentComplete = () => {
    const completedCount = Object.keys(progress.completedChallenges).length;
    return Math.round((completedCount / TOTAL_CHALLENGES) * 100);
  };

  const getUnderstandingScore = () => {
    const results = Object.values(progress.completedChallenges);
    return {
      strong: results.filter((r) => r.understood === "yes").length,
      partial: results.filter((r) => r.understood === "partial").length,
      weak: results.filter((r) => r.understood === "no").length,
    };
  };

  const getNextLesson = () => {
    for (const mod of modules) {
      const moduleLessons = Object.values(lessons).filter(
        (l) => l.moduleId === mod.id
      );
      for (const lesson of moduleLessons) {
        if (!progress.completedLessons.includes(lesson.id)) {
          return { moduleId: mod.id, lessonId: lesson.lessonNumber };
        }
      }
    }
    return null;
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("diffusion-learn-celebration-shown");
  };

  // Get challenges that are due for review
  const getDueReviews = (limit: number = 3): Challenge[] => {
    const now = new Date();
    const dueItems: { item: ReviewItem; challenge: Challenge }[] = [];

    // Find all due review items
    for (const [challengeId, reviewItem] of Object.entries(progress.reviewItems)) {
      const nextReview = new Date(reviewItem.nextReview);
      if (nextReview <= now) {
        // Find the challenge
        for (const lesson of Object.values(lessons)) {
          const allChallenges = [
            ...lesson.challenges,
            ...(lesson.transferQuestion ? [lesson.transferQuestion] : []),
          ];
          const challenge = allChallenges.find((c) => c.id === challengeId);
          if (challenge) {
            dueItems.push({ item: reviewItem, challenge });
            break;
          }
        }
      }
    }

    // Sort by: weak understanding first, then oldest review
    dueItems.sort((a, b) => {
      const aResult = progress.completedChallenges[a.item.challengeId];
      const bResult = progress.completedChallenges[b.item.challengeId];

      // Prioritize weak understanding
      const aWeak = aResult?.understood === "no" ? 0 : aResult?.understood === "partial" ? 1 : 2;
      const bWeak = bResult?.understood === "no" ? 0 : bResult?.understood === "partial" ? 1 : 2;
      if (aWeak !== bWeak) return aWeak - bWeak;

      // Then by oldest review
      return new Date(a.item.lastReviewed).getTime() - new Date(b.item.lastReviewed).getTime();
    });

    return dueItems.slice(0, limit).map((d) => d.challenge);
  };

  // Record a review result and update the interval
  const recordReview = (challengeId: string, correct: boolean) => {
    const now = new Date();
    const existing = progress.reviewItems[challengeId];

    if (!existing) return;

    let newInterval: number;
    let newStreak: number;

    if (correct) {
      // Increase interval on correct answer
      newStreak = existing.correctStreak + 1;
      newInterval = Math.min(existing.interval * INTERVAL_MULTIPLIER, MAX_INTERVAL);
    } else {
      // Reset to short interval on incorrect
      newStreak = 0;
      newInterval = INITIAL_INTERVAL;
    }

    const nextReviewDate = new Date(now);
    nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

    setProgress((prev) => ({
      ...prev,
      reviewItems: {
        ...prev.reviewItems,
        [challengeId]: {
          ...existing,
          lastReviewed: now.toISOString(),
          nextReview: nextReviewDate.toISOString(),
          interval: newInterval,
          correctStreak: newStreak,
        },
      },
      // Also update the understanding level
      completedChallenges: {
        ...prev.completedChallenges,
        [challengeId]: {
          ...prev.completedChallenges[challengeId],
          understood: correct ? "yes" : "partial",
          completedAt: now.toISOString(),
        },
      },
    }));
  };

  // Get review statistics
  const getReviewStats = () => {
    const now = new Date();
    let due = 0;
    let mastered = 0;
    let learning = 0;

    for (const reviewItem of Object.values(progress.reviewItems)) {
      const nextReview = new Date(reviewItem.nextReview);

      if (nextReview <= now) {
        due++;
      }

      if (reviewItem.interval >= 14) {
        mastered++; // 2+ weeks interval = mastered
      } else {
        learning++;
      }
    }

    return { due, mastered, learning };
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        completeChallenge,
        completeLesson,
        isChallengeCompleted,
        isLessonCompleted,
        getPercentComplete,
        getUnderstandingScore,
        getNextLesson,
        resetProgress,
        getDueReviews,
        recordReview,
        getReviewStats,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return context;
}

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

// ============================================================================
// useChallenge Hook - shared state logic for all challenge types
// ============================================================================

interface UseChallengeOptions {
  /** Total number of hints available */
  hintCount?: number;
}

interface UseChallengeReturn {
  submitted: boolean;
  submit: () => void;
  hintsShown: number;
  showNextHint: () => void;
  hasMoreHints: boolean;
  /** Attach to result container for focus management */
  resultRef: React.RefObject<HTMLDivElement | null>;
}

export function useChallenge(options: UseChallengeOptions = {}): UseChallengeReturn {
  const { hintCount = 0 } = options;

  const [submitted, setSubmitted] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);

  // Focus result container after submission
  useEffect(() => {
    if (submitted && resultRef.current) {
      resultRef.current.focus();
    }
  }, [submitted]);

  const submit = useCallback(() => {
    setSubmitted(true);
  }, []);

  const showNextHint = useCallback(() => {
    setHintsShown(prev => Math.min(prev + 1, hintCount));
  }, [hintCount]);

  return {
    submitted,
    submit,
    hintsShown,
    showNextHint,
    hasMoreHints: hintsShown < hintCount,
    resultRef,
  };
}

// ============================================================================
// SelfAssessment - the three-button self-assessment UI
// ============================================================================

interface SelfAssessmentProps {
  onComplete: (understood: "yes" | "partial" | "no") => void;
  /** Optional custom question text */
  question?: string;
  /** ID for aria-labelledby */
  labelId?: string;
}

export function SelfAssessment({
  onComplete,
  question = "Did you understand the core idea?",
  labelId = "self-assessment-label"
}: SelfAssessmentProps) {
  return (
    <div
      className="pt-4 border-t border-[var(--border)]"
      role="group"
      aria-labelledby={labelId}
    >
      <p id={labelId} className="text-sm text-[var(--fg-muted)] mb-3">
        {question}
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onComplete("yes")}
          className="px-4 py-2 rounded-lg bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/30
            hover:bg-[var(--success)]/20 transition-colors
            focus:outline-none focus:ring-2 focus:ring-[var(--success)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
        >
          <span aria-hidden="true">✓ </span>Yes, got it
        </button>
        <button
          onClick={() => onComplete("partial")}
          className="px-4 py-2 rounded-lg bg-[var(--warning)]/10 text-[var(--warning)] border border-[var(--warning)]/30
            hover:bg-[var(--warning)]/20 transition-colors
            focus:outline-none focus:ring-2 focus:ring-[var(--warning)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
        >
          <span aria-hidden="true">◐ </span>Partially
        </button>
        <button
          onClick={() => onComplete("no")}
          className="px-4 py-2 rounded-lg bg-[var(--fg)]/5 text-[var(--fg-muted)] border border-[var(--border)]
            hover:bg-[var(--fg)]/10 transition-colors
            focus:outline-none focus:ring-2 focus:ring-[var(--fg)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
        >
          <span aria-hidden="true">✗ </span>Not really
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// HintsList - progressive hints display with animation
// ============================================================================

interface HintsListProps {
  hints: string[];
  hintsShown: number;
}

export function HintsList({ hints, hintsShown }: HintsListProps) {
  if (hintsShown === 0) return null;

  return (
    <div className="mb-6 space-y-2" role="list" aria-label="Hints">
      {hints.slice(0, hintsShown).map((hint, i) => (
        <motion.div
          key={i}
          role="listitem"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-dashed border-[var(--border)]"
        >
          <p className="text-sm text-[var(--fg-muted)]">
            <span className="text-[var(--fg-secondary)]">Hint {i + 1}:</span> {hint}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================================
// HintButton - button to show next hint
// ============================================================================

interface HintButtonProps {
  hintsShown: number;
  totalHints: number;
  onShowHint: () => void;
}

export function HintButton({ hintsShown, totalHints, onShowHint }: HintButtonProps) {
  if (hintsShown >= totalHints) return null;

  return (
    <button
      onClick={onShowHint}
      aria-label={`Show hint ${hintsShown + 1} of ${totalHints}`}
      className="px-4 py-3 rounded-lg border border-[var(--border)] text-[var(--fg-muted)]
        hover:text-[var(--fg)] hover:border-[var(--border-hover)] transition-colors
        focus:outline-none focus:ring-2 focus:ring-[var(--fg)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
    >
      Hint ({hintsShown}/{totalHints})
    </button>
  );
}

// ============================================================================
// InsightCard - displays the insight after submission
// ============================================================================

interface InsightCardProps {
  insight: string;
  variant?: "default" | "success";
}

export function InsightCard({ insight, variant = "default" }: InsightCardProps) {
  const styles = variant === "success"
    ? "border-[var(--success)]/20 bg-[var(--success)]/5"
    : "border-[var(--fg)]/20 bg-[var(--bg-secondary)]";

  const titleColor = variant === "success"
    ? "text-[var(--success)]"
    : "text-[var(--fg-muted)]";

  return (
    <div className={`p-6 rounded-lg border ${styles}`}>
      <h3 className={`text-sm font-medium uppercase tracking-wider mb-3 ${titleColor}`}>
        {variant === "success" ? "The Key Insight" : "The Insight"}
      </h3>
      <p className="text-[var(--fg)] leading-relaxed">
        {insight}
      </p>
    </div>
  );
}

// ============================================================================
// SubmitButton - primary submit action
// ============================================================================

interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function SubmitButton({ onClick, disabled = false, children }: SubmitButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className="px-6 py-3 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium
        disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity
        focus:outline-none focus:ring-2 focus:ring-[var(--fg)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
    >
      {children}
    </button>
  );
}

// ============================================================================
// ResultIcon - checkmark or X icon for correct/incorrect
// ============================================================================

interface ResultIconProps {
  correct: boolean;
  className?: string;
}

export function ResultIcon({ correct, className = "w-5 h-5" }: ResultIconProps) {
  if (correct) {
    return (
      <svg
        className={`${className} text-[var(--success)]`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }

  return (
    <svg
      className={`${className} text-[var(--error)]`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

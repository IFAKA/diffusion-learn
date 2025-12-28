"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Challenge } from "@/lib/challenges";

interface ExplainChallengeProps {
  challenge: Challenge;
  onComplete: (understood: "yes" | "partial" | "no") => void;
}

export function ExplainChallenge({ challenge, onComplete }: ExplainChallengeProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hasThought, setHasThought] = useState(false); // Must think before typing

  const resultRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const minLength = 10;
  const canSubmit = userAnswer.trim().length >= minLength;

  // Focus management after submit
  useEffect(() => {
    if (submitted && resultRef.current) {
      resultRef.current.focus();
    }
  }, [submitted]);

  const handleSubmit = () => {
    if (canSubmit) {
      setSubmitted(true);
    }
  };

  const startThinking = () => {
    setHasThought(true);
    // Focus textarea after state update
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  // Handle Cmd/Ctrl+Enter to submit
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && canSubmit) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Prompt */}
      <h2
        id={`question-${challenge.id}`}
        className="text-xl font-medium text-[var(--fg)] mb-6"
      >
        {challenge.prompt}
      </h2>

      {/* Think First Step - shows hints before allowing text input */}
      {!submitted && !hasThought && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="p-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)]">
            <h3 className="text-sm font-medium text-[var(--fg-secondary)] mb-3">
              Before you write, think about this:
            </h3>
            <ul className="space-y-2">
              {challenge.hints.map((hint, i) => (
                <li key={i} className="flex items-start gap-2 text-[var(--fg-muted)]">
                  <span className="text-[var(--fg-secondary)] mt-0.5">•</span>
                  <span>{hint}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={startThinking}
            className="w-full px-6 py-3 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium
              hover:opacity-90 transition-opacity
              focus:outline-none focus:ring-2 focus:ring-[var(--fg)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
          >
            I&apos;ve thought about it - let me write
          </button>
        </motion.div>
      )}

      {/* Text input - only shows after thinking */}
      {!submitted && hasThought && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <label
            htmlFor={`answer-${challenge.id}`}
            className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
            style={{ clip: "rect(0, 0, 0, 0)" }}
          >
            Your explanation
          </label>
          <textarea
            ref={textareaRef}
            id={`answer-${challenge.id}`}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="In your own words, explain..."
            aria-describedby={`char-count-${challenge.id}`}
            className="w-full h-40 p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]
              text-[var(--fg)] placeholder:text-[var(--fg-muted)]
              focus:outline-none focus:ring-2 focus:ring-[var(--fg)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]
              resize-none"
          />

          <div className="flex items-center justify-between">
            <p
              id={`char-count-${challenge.id}`}
              className="text-xs text-[var(--fg-muted)]"
              aria-live="polite"
            >
              {userAnswer.length < minLength
                ? `Write at least ${minLength - userAnswer.length} more characters`
                : "Ready to submit (Cmd/Ctrl+Enter)"}
            </p>
            <span className="text-xs text-[var(--fg-muted)]">
              {userAnswer.length} characters
            </span>
          </div>
        </motion.div>
      )}

      {/* Actions - only show after thinking step */}
      {!submitted && hasThought && (
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            aria-disabled={!canSubmit}
            className="px-6 py-3 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium
              disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity
              focus:outline-none focus:ring-2 focus:ring-[var(--fg)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
          >
            Submit
          </button>
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Your answer */}
            <div
              ref={resultRef}
              tabIndex={-1}
              role="region"
              aria-label="Your submission and feedback"
              className="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] focus:outline-none"
            >
              <h3 className="text-sm font-medium text-[var(--fg-muted)] uppercase tracking-wider mb-2">
                Your Explanation
              </h3>
              <p className="text-[var(--fg-secondary)] whitespace-pre-wrap">
                {userAnswer}
              </p>
            </div>

            {/* Model answer */}
            {challenge.modelAnswer && (
              <div className="p-4 rounded-lg border border-[var(--fg)]/20 bg-[var(--bg-elevated)]">
                <h3 className="text-sm font-medium text-[var(--fg-muted)] uppercase tracking-wider mb-2">
                  Model Answer
                </h3>
                <p className="text-[var(--fg)] leading-relaxed">
                  {challenge.modelAnswer}
                </p>
              </div>
            )}

            {/* The insight */}
            <div className="p-6 rounded-lg border border-[var(--success)]/20 bg-[var(--success)]/5">
              <h3 className="text-sm font-medium text-[var(--success)] uppercase tracking-wider mb-3">
                The Key Insight
              </h3>
              <p className="text-[var(--fg)] leading-relaxed">
                {challenge.insight}
              </p>
            </div>

            {/* Self-assessment */}
            <div
              className="pt-4 border-t border-[var(--border)]"
              role="group"
              aria-labelledby="self-assessment-explain"
            >
              <p id="self-assessment-explain" className="text-sm text-[var(--fg-muted)] mb-3">
                Compare your explanation to the model answer. Did you capture the core idea?
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onComplete("yes")}
                  className="px-4 py-2 rounded-lg bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/30
                    hover:bg-[var(--success)]/20 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-[var(--success)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
                >
                  <span aria-hidden="true">✓ </span>Yes, I got it
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
                  <span aria-hidden="true">✗ </span>I missed it
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

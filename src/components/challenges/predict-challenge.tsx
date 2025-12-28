"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Challenge } from "@/lib/types";
import {
  useChallenge,
  SelfAssessment,
  HintsList,
  HintButton,
  InsightCard,
  SubmitButton,
  ResultIcon,
} from "./challenge-shared";

interface PredictChallengeProps {
  challenge: Challenge;
  onComplete: (understood: "yes" | "partial" | "no") => void;
}

export function PredictChallenge({ challenge, onComplete }: PredictChallengeProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const { submitted, submit, hintsShown, showNextHint, hasMoreHints, resultRef } = useChallenge({
    hintCount: challenge.hints.length,
  });

  const choicesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const choices = useMemo(() => challenge.choices || [], [challenge.choices]);

  const handleSubmit = () => {
    if (selectedChoice || choices.length === 0) {
      submit();
    }
  };

  // Keyboard navigation for choices
  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    const len = choices.length;

    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        const nextIndex = (index + 1) % len;
        setFocusedIndex(nextIndex);
        choicesRef.current[nextIndex]?.focus();
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        const prevIndex = (index - 1 + len) % len;
        setFocusedIndex(prevIndex);
        choicesRef.current[prevIndex]?.focus();
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        setSelectedChoice(choices[index].id);
        break;
    }
  }, [choices]);

  const selectedIsCorrect = choices.find(c => c.id === selectedChoice)?.isCorrect;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Context */}
      {challenge.context && !submitted && (
        <div
          className="mb-6 p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]"
          role="note"
          aria-label="Challenge context"
        >
          <p className="text-sm text-[var(--fg-secondary)] whitespace-pre-wrap font-mono">
            {challenge.context}
          </p>
        </div>
      )}

      {/* Prompt */}
      <h2
        id={`question-${challenge.id}`}
        className="text-xl font-medium text-[var(--fg)] mb-6"
      >
        {challenge.prompt}
      </h2>

      {/* Choices - accessible radiogroup */}
      {!submitted && choices.length > 0 && (
        <div
          role="radiogroup"
          aria-labelledby={`question-${challenge.id}`}
          className="space-y-3 mb-6"
        >
          {choices.map((choice, index) => (
            <button
              key={choice.id}
              ref={el => { choicesRef.current[index] = el; }}
              role="radio"
              aria-checked={selectedChoice === choice.id}
              tabIndex={focusedIndex === index ? 0 : -1}
              onClick={() => {
                setSelectedChoice(choice.id);
                setFocusedIndex(index);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-full p-4 rounded-lg border text-left transition-all
                focus:outline-none focus:ring-2 focus:ring-[var(--fg)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]
                ${selectedChoice === choice.id
                  ? "border-[var(--fg)] bg-[var(--bg-elevated)]"
                  : "border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[var(--border-hover)]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedChoice === choice.id
                      ? "border-[var(--fg)]"
                      : "border-[var(--fg-muted)]"
                  }`}
                  aria-hidden="true"
                >
                  {selectedChoice === choice.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--fg)]" />
                  )}
                </div>
                <span className="text-[var(--fg-secondary)]">{choice.text}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Hints */}
      {!submitted && <HintsList hints={challenge.hints} hintsShown={hintsShown} />}

      {/* Actions */}
      {!submitted && (
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <SubmitButton
              onClick={handleSubmit}
              disabled={choices.length > 0 && !selectedChoice}
            >
              {choices.length > 0 ? "Submit Answer" : "Reveal Insight"}
            </SubmitButton>
            {hasMoreHints && (
              <HintButton
                hintsShown={hintsShown}
                totalHints={challenge.hints.length}
                onShowHint={showNextHint}
              />
            )}
          </div>
          {choices.length > 0 && !selectedChoice && (
            <p className="text-xs text-[var(--fg-muted)]" aria-live="polite">
              Select an answer above to continue
            </p>
          )}
          {choices.length === 0 && (
            <p className="text-xs text-[var(--fg-muted)]">
              Think about this, then reveal the insight when ready
            </p>
          )}
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            ref={resultRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 focus:outline-none"
          >
            {/* Your answer - only show if there were choices */}
            {choices.length > 0 && (
              <div
                role="status"
                aria-live="polite"
                className={`p-4 rounded-lg border ${
                  selectedIsCorrect
                    ? "border-[var(--success)]/30 bg-[var(--success)]/5"
                    : "border-[var(--error)]/30 bg-[var(--error)]/5"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <ResultIcon correct={!!selectedIsCorrect} />
                  <span className={`text-sm font-medium ${
                    selectedIsCorrect ? "text-[var(--success)]" : "text-[var(--error)]"
                  }`}>
                    {selectedIsCorrect ? "Correct!" : "Not quite"}
                  </span>
                </div>
                <p className="text-[var(--fg-secondary)]">
                  Your answer: {choices.find(c => c.id === selectedChoice)?.text}
                </p>
              </div>
            )}

            {/* The insight */}
            <InsightCard insight={challenge.insight} />

            {/* Misconceptions */}
            {challenge.misconceptions && challenge.misconceptions.length > 0 && (
              <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]">
                <h3 className="text-sm font-medium text-[var(--fg-muted)] uppercase tracking-wider mb-3">
                  Common Misconceptions
                </h3>
                <ul className="space-y-2" role="list">
                  {challenge.misconceptions.map((m, i) => (
                    <li key={i} className="text-sm text-[var(--fg-secondary)] flex items-start gap-2">
                      <span className="text-[var(--fg-muted)]" aria-hidden="true">•</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Self-assessment */}
            <SelfAssessment onComplete={onComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const challenges = [
  {
    target: "A red ball on green grass",
    hints: ["Color of the ball?", "What surface?", "Position?"],
  },
  {
    target: "A cat sitting on a windowsill at sunset",
    hints: ["What animal?", "Where is it?", "Time of day?", "What's the cat doing?"],
  },
  {
    target: "An astronaut riding a horse on the moon",
    hints: ["Who?", "Doing what?", "Where?"],
  },
];

export function PromptChallenge() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userPrompt, setUserPrompt] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const challenge = challenges[currentChallenge];

  const calculateScore = () => {
    const targetWords = challenge.target.toLowerCase().split(/\s+/);
    const userWords = userPrompt.toLowerCase().split(/\s+/);

    let matches = 0;
    targetWords.forEach(word => {
      if (userWords.some(uw => uw.includes(word) || word.includes(uw))) {
        matches++;
      }
    });

    return Math.round((matches / targetWords.length) * 100);
  };

  const handleCheck = () => {
    setScore(calculateScore());
    setShowAnswer(true);
  };

  const handleNext = () => {
    setCurrentChallenge((prev) => (prev + 1) % challenges.length);
    setUserPrompt("");
    setShowAnswer(false);
    setScore(null);
  };

  return (
    <div className="w-full max-w-md">
      {/* Challenge display */}
      <div className="mb-6 p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
        <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-2">
          Describe this image precisely:
        </div>
        <div className="h-32 rounded-lg bg-[var(--bg)] border border-dashed border-[var(--border)] flex items-center justify-center">
          <div className="text-center p-4">
            <svg className="w-8 h-8 mx-auto mb-2 text-[var(--fg-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <p className="text-sm text-[var(--fg-muted)] italic">
              [Imagine: {challenge.target}]
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {challenge.hints.map((hint, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full bg-[var(--bg)] text-[var(--fg-muted)]">
              {hint}
            </span>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="mb-4">
        <textarea
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Write your prompt description..."
          className="w-full px-4 py-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]
            text-[var(--fg)] placeholder:text-[var(--fg-muted)] resize-none
            focus:outline-none focus:border-[var(--fg-muted)] transition-colors"
          rows={3}
          disabled={showAnswer}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {!showAnswer ? (
          <button
            onClick={handleCheck}
            disabled={!userPrompt.trim()}
            className="flex-1 px-4 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium text-sm
              hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check My Prompt
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 px-4 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium text-sm
              hover:opacity-90 transition-opacity"
          >
            Next Challenge
          </button>
        )}
      </div>

      {/* Result */}
      <AnimatePresence>
        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[var(--fg-secondary)]">Match score:</span>
              <span className={`text-lg font-mono font-bold ${
                score! >= 70 ? "text-[var(--success)]" :
                score! >= 40 ? "text-[var(--warning)]" : "text-[var(--error)]"
              }`}>
                {score}%
              </span>
            </div>
            <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-1">
              Target description:
            </div>
            <p className="text-sm text-[var(--fg)] font-medium">
              &quot;{challenge.target}&quot;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress */}
      <div className="mt-4 flex justify-center gap-2">
        {challenges.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === currentChallenge ? "bg-[var(--fg)]" : "bg-[var(--border)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

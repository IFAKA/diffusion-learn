"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Challenge, Choice } from "@/lib/challenges";

interface BuildChallengeProps {
  challenge: Challenge;
  onComplete: (understood: "yes" | "partial" | "no") => void;
}

// Shuffle function that runs once per challenge
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function BuildChallenge({ challenge, onComplete }: BuildChallengeProps) {
  // Use a lazy initializer to shuffle once on mount
  const [items, setItems] = useState<Choice[]>(() =>
    challenge.choices ? shuffleArray(challenge.choices) : []
  );
  const [submitted, setSubmitted] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  // Focus management after submit
  useEffect(() => {
    if (submitted && resultRef.current) {
      resultRef.current.focus();
    }
  }, [submitted]);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const showNextHint = () => {
    if (hintsShown < challenge.hints.length) {
      setHintsShown(hintsShown + 1);
    }
  };

  // Move item up or down
  const moveItem = useCallback((fromIndex: number, direction: "up" | "down") => {
    const toIndex = direction === "up" ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= items.length) return;

    const newItems = [...items];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    setItems(newItems);
    setFocusedIndex(toIndex);

    // Announce for screen readers
    setAnnouncement(`${movedItem.text} moved to position ${toIndex + 1}`);

    // Focus the moved item
    setTimeout(() => {
      itemRefs.current[toIndex]?.focus();
    }, 0);
  }, [items]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        if (e.altKey || e.metaKey) {
          // Alt+Up = move item up
          moveItem(index, "up");
        } else {
          // Just Up = focus previous
          const prevIndex = Math.max(0, index - 1);
          setFocusedIndex(prevIndex);
          itemRefs.current[prevIndex]?.focus();
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (e.altKey || e.metaKey) {
          // Alt+Down = move item down
          moveItem(index, "down");
        } else {
          // Just Down = focus next
          const nextIndex = Math.min(items.length - 1, index + 1);
          setFocusedIndex(nextIndex);
          itemRefs.current[nextIndex]?.focus();
        }
        break;
      case " ":
        e.preventDefault();
        // Space could toggle "grabbed" state for keyboard reordering
        setAnnouncement(`${items[index].text} at position ${index + 1}. Use Alt+Arrow keys to move.`);
        break;
    }
  }, [items, moveItem]);

  const userOrder = items.map(item => item.id);
  const isCorrect = challenge.correctOrder
    ? JSON.stringify(userOrder) === JSON.stringify(challenge.correctOrder)
    : false;

  const getCorrectPosition = (id: string): number => {
    return challenge.correctOrder?.indexOf(id) ?? -1;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
        style={{ clip: "rect(0, 0, 0, 0)" }}
      >
        {announcement}
      </div>

      {/* Prompt */}
      <h2
        id={`question-${challenge.id}`}
        className="text-xl font-medium text-[var(--fg)] mb-6"
      >
        {challenge.prompt}
      </h2>

      {/* Reorderable items */}
      {!submitted && (
        <div className="mb-6">
          <p className="text-sm text-[var(--fg-muted)] mb-1">
            Reorder the items below:
          </p>
          <p className="text-xs text-[var(--fg-muted)] mb-3">
            Use buttons or Alt+Arrow keys to move items
          </p>

          <div
            role="listbox"
            aria-labelledby={`question-${challenge.id}`}
            aria-describedby="reorder-instructions"
            className="space-y-2"
          >
            <span
              id="reorder-instructions"
              className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
              style={{ clip: "rect(0, 0, 0, 0)" }}
            >
              Use arrow keys to navigate, Alt+Arrow keys to reorder items
            </span>

            {items.map((item, index) => (
              <div
                key={item.id}
                ref={el => { itemRefs.current[index] = el; }}
                role="option"
                aria-selected={focusedIndex === index}
                tabIndex={focusedIndex === index ? 0 : -1}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => setFocusedIndex(index)}
                className={`p-3 rounded-lg bg-[var(--bg-secondary)] border transition-all
                  focus:outline-none focus:ring-2 focus:ring-[var(--fg)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]
                  ${focusedIndex === index
                    ? "border-[var(--fg)]"
                    : "border-[var(--border)] hover:border-[var(--border-hover)]"
                  }`}
              >
                <div className="flex items-center gap-3">
                  {/* Position number */}
                  <div
                    className="w-6 h-6 rounded bg-[var(--bg)] border border-[var(--border)]
                      flex items-center justify-center text-sm font-mono text-[var(--fg-muted)] flex-shrink-0"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </div>

                  {/* Item text */}
                  <span className="text-[var(--fg-secondary)] flex-1">{item.text}</span>

                  {/* Move buttons */}
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => moveItem(index, "up")}
                      disabled={index === 0}
                      aria-label={`Move ${item.text} up`}
                      className="p-1.5 rounded border border-[var(--border)] text-[var(--fg-muted)]
                        hover:text-[var(--fg)] hover:border-[var(--border-hover)] transition-colors
                        disabled:opacity-30 disabled:cursor-not-allowed
                        focus:outline-none focus:ring-2 focus:ring-[var(--fg)]"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <polyline points="18 15 12 9 6 15" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => moveItem(index, "down")}
                      disabled={index === items.length - 1}
                      aria-label={`Move ${item.text} down`}
                      className="p-1.5 rounded border border-[var(--border)] text-[var(--fg-muted)]
                        hover:text-[var(--fg)] hover:border-[var(--border-hover)] transition-colors
                        disabled:opacity-30 disabled:cursor-not-allowed
                        focus:outline-none focus:ring-2 focus:ring-[var(--fg)]"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hints */}
      {!submitted && hintsShown > 0 && (
        <div className="mb-6 space-y-2" role="list" aria-label="Hints">
          {challenge.hints.slice(0, hintsShown).map((hint, i) => (
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
      )}

      {/* Actions */}
      {!submitted && (
        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium
              hover:opacity-90 transition-opacity
              focus:outline-none focus:ring-2 focus:ring-[var(--fg)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
          >
            Check Order
          </button>
          {hintsShown < challenge.hints.length && (
            <button
              onClick={showNextHint}
              aria-label={`Show hint ${hintsShown + 1} of ${challenge.hints.length}`}
              className="px-4 py-3 rounded-lg border border-[var(--border)] text-[var(--fg-muted)]
                hover:text-[var(--fg)] hover:border-[var(--border-hover)] transition-colors
                focus:outline-none focus:ring-2 focus:ring-[var(--fg)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
            >
              Hint ({hintsShown}/{challenge.hints.length})
            </button>
          )}
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
            {/* Result header */}
            <div
              ref={resultRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
              className={`p-4 rounded-lg border focus:outline-none ${
                isCorrect
                  ? "border-[var(--success)]/30 bg-[var(--success)]/5"
                  : "border-[var(--warning)]/30 bg-[var(--warning)]/5"
              }`}
            >
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <svg className="w-5 h-5 text-[var(--success)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="font-medium text-[var(--success)]">Perfect order!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 text-[var(--warning)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span className="font-medium text-[var(--warning)]">Not quite - see the correct order below</span>
                  </>
                )}
              </div>
            </div>

            {/* Comparison */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Your order */}
              <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]">
                <h3 className="text-sm font-medium text-[var(--fg-muted)] uppercase tracking-wider mb-3">
                  Your Order
                </h3>
                <ol className="space-y-2" role="list">
                  {items.map((item, index) => {
                    const correctPos = getCorrectPosition(item.id);
                    const isInRightPlace = correctPos === index;
                    return (
                      <li
                        key={item.id}
                        className={`p-2 rounded border text-sm flex items-center gap-2 ${
                          isInRightPlace
                            ? "border-[var(--success)]/30 bg-[var(--success)]/5 text-[var(--success)]"
                            : "border-[var(--error)]/30 bg-[var(--error)]/5 text-[var(--error)]"
                        }`}
                      >
                        {isInRightPlace ? (
                          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        )}
                        <span>{index + 1}. {item.text}</span>
                        <span
                          className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
                          style={{ clip: "rect(0, 0, 0, 0)" }}
                        >{isInRightPlace ? "(correct position)" : "(incorrect position)"}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Correct order */}
              <div className="p-4 rounded-lg border border-[var(--fg)]/20 bg-[var(--bg-elevated)]">
                <h3 className="text-sm font-medium text-[var(--fg-muted)] uppercase tracking-wider mb-3">
                  Correct Order
                </h3>
                <ol className="space-y-2" role="list">
                  {challenge.correctOrder?.map((id, index) => {
                    const item = challenge.choices?.find(c => c.id === id);
                    return (
                      <li
                        key={id}
                        className="p-2 rounded border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--fg-secondary)]"
                      >
                        {index + 1}. {item?.text}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            {/* The insight */}
            <div className="p-6 rounded-lg border border-[var(--success)]/20 bg-[var(--success)]/5">
              <h3 className="text-sm font-medium text-[var(--success)] uppercase tracking-wider mb-3">
                The Insight
              </h3>
              <p className="text-[var(--fg)] leading-relaxed">
                {challenge.insight}
              </p>
            </div>

            {/* Self-assessment */}
            <div
              className="pt-4 border-t border-[var(--border)]"
              role="group"
              aria-labelledby="self-assessment-build"
            >
              <p id="self-assessment-build" className="text-sm text-[var(--fg-muted)] mb-3">
                Do you understand why this order is correct?
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onComplete("yes")}
                  className="px-4 py-2 rounded-lg bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/30
                    hover:bg-[var(--success)]/20 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-[var(--success)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
                >
                  <span aria-hidden="true">✓ </span>Yes, makes sense
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
                  <span aria-hidden="true">✗ </span>Still confused
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

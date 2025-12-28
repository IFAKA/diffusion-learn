"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const contextExamples = [
  {
    sentence: "river bank",
    word: "bank",
    meaning: "edge of a river",
    vector: [0.8, -0.2, 0.1, 0.9],
    relatedTo: ["water", "nature", "shore"],
  },
  {
    sentence: "bank account",
    word: "bank",
    meaning: "financial institution",
    vector: [-0.7, 0.8, 0.3, -0.1],
    relatedTo: ["money", "finance", "savings"],
  },
  {
    sentence: "bright red apple",
    word: "bright",
    meaning: "intensity of color",
    vector: [0.9, 0.6, -0.1, 0.2],
    relatedTo: ["vivid", "saturated", "intense"],
  },
  {
    sentence: "bright student",
    word: "bright",
    meaning: "intelligent",
    vector: [0.1, -0.3, 0.9, 0.7],
    relatedTo: ["smart", "clever", "quick"],
  },
];

export function EncoderDemo() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  const example = contextExamples[selectedExample];

  // Find pair for comparison (same word, different context)
  const comparisonExample = useMemo(() => {
    return contextExamples.find(
      (e, i) => i !== selectedExample && e.word === example.word
    );
  }, [selectedExample, example.word]);

  const words = example.sentence.split(" ");

  return (
    <div className="w-full max-w-lg">
      {/* Sentence display */}
      <div className="mb-6 p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
        <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-3">
          Input sentence
        </div>
        <div className="flex gap-2 flex-wrap">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className={`px-3 py-2 rounded-lg text-sm ${
                word.toLowerCase() === example.word
                  ? "bg-[var(--success)]/20 text-[var(--success)] font-medium border border-[var(--success)]/30"
                  : "bg-[var(--bg)] text-[var(--fg-secondary)]"
              }`}
              animate={{
                scale: word.toLowerCase() === example.word ? [1, 1.05, 1] : 1,
              }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Encoding visualization */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-2">
              Contextual meaning of &quot;{example.word}&quot;
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <p className="text-sm text-[var(--fg)] mb-2">{example.meaning}</p>
              <div className="flex gap-1">
                {example.relatedTo.map((rel) => (
                  <span
                    key={rel}
                    className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-secondary)] text-[var(--fg-muted)]"
                  >
                    {rel}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <svg className="w-6 h-6 text-[var(--fg-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>

          <div className="flex-1">
            <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-2">
              Embedding vector
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] font-mono text-xs">
              [{example.vector.map((v, i) => (
                <span key={i} className={v > 0 ? "text-[var(--success)]" : "text-[var(--error)]"}>
                  {v.toFixed(1)}{i < example.vector.length - 1 ? ", " : ""}
                </span>
              ))}]
            </div>
          </div>
        </div>
      </div>

      {/* Comparison toggle */}
      {comparisonExample && (
        <div className="mb-4">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--fg-secondary)]
              hover:bg-[var(--bg-hover)] transition-colors flex items-center justify-center gap-2"
          >
            <span>{showComparison ? "Hide" : "Show"} different context</span>
            <motion.svg
              className="w-4 h-4"
              animate={{ rotate: showComparison ? 180 : 0 }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
          </button>
        </div>
      )}

      {/* Comparison view */}
      <AnimatePresence>
        {showComparison && comparisonExample && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="p-4 rounded-lg border border-[var(--warning)]/30 bg-[var(--warning)]/5">
              <div className="text-xs text-[var(--warning)] uppercase tracking-wider mb-2">
                Same word, different context: &quot;{comparisonExample.sentence}&quot;
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm text-[var(--fg)] mb-1">{comparisonExample.meaning}</p>
                  <div className="flex gap-1">
                    {comparisonExample.relatedTo.map((rel) => (
                      <span
                        key={rel}
                        className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg)] text-[var(--fg-muted)]"
                      >
                        {rel}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="font-mono text-xs">
                  [{comparisonExample.vector.map((v, i) => (
                    <span key={i} className={v > 0 ? "text-[var(--success)]" : "text-[var(--error)]"}>
                      {v.toFixed(1)}{i < comparisonExample.vector.length - 1 ? ", " : ""}
                    </span>
                  ))}]
                </div>
              </div>
              <p className="mt-3 text-xs text-[var(--fg-muted)]">
                Notice how the vectors are completely different despite being the same word!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Example selector */}
      <div className="flex gap-2 flex-wrap">
        {contextExamples.map((ex, i) => (
          <button
            key={i}
            onClick={() => {
              setSelectedExample(i);
              setShowComparison(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
              i === selectedExample
                ? "bg-[var(--fg)] text-[var(--bg)]"
                : "bg-[var(--bg-secondary)] text-[var(--fg-secondary)] hover:bg-[var(--bg-hover)]"
            }`}
          >
            {ex.sentence}
          </button>
        ))}
      </div>
    </div>
  );
}

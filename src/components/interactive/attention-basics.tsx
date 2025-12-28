"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const sentence = ["The", "fluffy", "orange", "cat", "sat", "on", "the", "mat"];

// Attention weights for each word (simplified)
const attentionPatterns: Record<number, number[]> = {
  0: [0.8, 0.1, 0.05, 0.02, 0.01, 0.01, 0.01, 0.0], // "The" attends to itself
  1: [0.05, 0.7, 0.1, 0.12, 0.01, 0.01, 0.01, 0.0], // "fluffy" attends to "cat"
  2: [0.05, 0.1, 0.6, 0.2, 0.02, 0.01, 0.01, 0.01], // "orange" attends to "cat"
  3: [0.02, 0.25, 0.25, 0.3, 0.08, 0.05, 0.03, 0.02], // "cat" attends to its modifiers
  4: [0.01, 0.05, 0.05, 0.3, 0.4, 0.1, 0.05, 0.04], // "sat" attends to subject
  5: [0.01, 0.01, 0.01, 0.1, 0.2, 0.5, 0.1, 0.07], // "on"
  6: [0.1, 0.01, 0.01, 0.01, 0.01, 0.05, 0.6, 0.21], // "the"
  7: [0.01, 0.02, 0.02, 0.15, 0.2, 0.1, 0.1, 0.4], // "mat" attends to context
};

export function AttentionBasics() {
  const [selectedWord, setSelectedWord] = useState<number | null>(null);

  const weights = selectedWord !== null ? attentionPatterns[selectedWord] : null;

  return (
    <div className="w-full max-w-lg">
      {/* Instructions */}
      <p className="text-sm text-[var(--fg-muted)] mb-4 text-center">
        Click a word to see what it &quot;pays attention to&quot;
      </p>

      {/* Sentence display */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {sentence.map((word, i) => {
          const weight = weights?.[i] || 0;
          const isSelected = selectedWord === i;

          return (
            <motion.button
              key={i}
              onClick={() => setSelectedWord(isSelected ? null : i)}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isSelected
                  ? "bg-[var(--success)] text-white"
                  : "bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--fg-muted)]"
              }`}
              animate={{
                scale: isSelected ? 1.1 : 1,
                backgroundColor: selectedWord !== null && !isSelected
                  ? `rgba(0, 208, 132, ${weight})`
                  : undefined,
              }}
              style={{
                color: selectedWord !== null && !isSelected && weight > 0.3
                  ? "white"
                  : undefined,
              }}
            >
              {word}
              {/* Attention weight label */}
              {selectedWord !== null && !isSelected && weight > 0.05 && (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-mono text-[var(--fg-muted)]"
                >
                  {(weight * 100).toFixed(0)}%
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Attention explanation */}
      {selectedWord !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]"
        >
          <div className="text-sm text-[var(--fg)]">
            <strong>&quot;{sentence[selectedWord]}&quot;</strong> pays attention to:
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {weights!
              .map((w, i) => ({ word: sentence[i], weight: w, index: i }))
              .sort((a, b) => b.weight - a.weight)
              .slice(0, 4)
              .map(({ word, weight, index }) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded text-xs"
                  style={{
                    backgroundColor: `rgba(0, 208, 132, ${weight})`,
                    color: weight > 0.3 ? "white" : "var(--fg-secondary)",
                  }}
                >
                  {word}: {(weight * 100).toFixed(0)}%
                </span>
              ))}
          </div>
        </motion.div>
      )}

      {/* Visual attention matrix hint */}
      <div className="mt-6 p-3 rounded-lg bg-[var(--bg)] border border-dashed border-[var(--border)]">
        <div className="text-xs text-[var(--fg-muted)] text-center">
          <p className="mb-2">This is <strong>self-attention</strong>: each word computes relevance weights for every other word.</p>
          <p>Notice how adjectives (&quot;fluffy&quot;, &quot;orange&quot;) strongly attend to the noun (&quot;cat&quot;) they modify.</p>
        </div>
      </div>
    </div>
  );
}

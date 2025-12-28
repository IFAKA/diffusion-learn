"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const bilingualPairs = [
  {
    english: "cat",
    chinese: "猫",
    englishVector: [0.82, -0.34, 0.56, 0.21],
    chineseVector: [0.79, -0.31, 0.58, 0.19],
    similarity: 0.94,
  },
  {
    english: "sunset over ocean",
    chinese: "海上日落",
    englishVector: [0.45, 0.78, -0.22, 0.61],
    chineseVector: [0.42, 0.81, -0.19, 0.58],
    similarity: 0.96,
  },
  {
    english: "beautiful flower",
    chinese: "美丽的花",
    englishVector: [0.33, -0.67, 0.44, 0.88],
    chineseVector: [0.35, -0.64, 0.41, 0.85],
    similarity: 0.93,
  },
  {
    english: "mountain landscape",
    chinese: "山景",
    englishVector: [-0.12, 0.89, 0.34, -0.45],
    chineseVector: [-0.15, 0.86, 0.37, -0.42],
    similarity: 0.95,
  },
];

export function BilingualDemo() {
  const [selectedPair, setSelectedPair] = useState(0);
  const [showVectors, setShowVectors] = useState(false);

  const pair = bilingualPairs[selectedPair];

  return (
    <div className="w-full max-w-lg">
      {/* Language comparison */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* English */}
        <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
          <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-2">
            English
          </div>
          <motion.p
            key={`en-${selectedPair}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg text-[var(--fg)] font-medium"
          >
            &quot;{pair.english}&quot;
          </motion.p>
        </div>

        {/* Chinese */}
        <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
          <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-2">
            中文 (Chinese)
          </div>
          <motion.p
            key={`zh-${selectedPair}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg text-[var(--fg)] font-medium"
          >
            &quot;{pair.chinese}&quot;
          </motion.p>
        </div>
      </div>

      {/* Similarity meter */}
      <div className="mb-6 p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[var(--fg-secondary)]">Embedding Similarity</span>
          <motion.span
            key={selectedPair}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-lg font-mono font-bold text-[var(--success)]"
          >
            {(pair.similarity * 100).toFixed(0)}%
          </motion.span>
        </div>
        <div className="h-3 bg-[var(--border)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[var(--success)]"
            initial={{ width: 0 }}
            animate={{ width: `${pair.similarity * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <p className="mt-2 text-xs text-[var(--fg-muted)]">
          High similarity means the model understands these mean the same thing
        </p>
      </div>

      {/* Vector comparison toggle */}
      <button
        onClick={() => setShowVectors(!showVectors)}
        className="w-full mb-4 px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--fg-secondary)]
          hover:bg-[var(--bg-hover)] transition-colors"
      >
        {showVectors ? "Hide" : "Show"} embedding vectors
      </button>

      {/* Vector visualization */}
      {showVectors && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-6 space-y-3"
        >
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
            <div className="text-xs text-[var(--fg-muted)] mb-1">English embedding:</div>
            <code className="text-xs font-mono text-[var(--fg)]">
              [{pair.englishVector.map((v, i) => (
                <span key={i} className={v > 0 ? "text-[var(--success)]" : "text-[var(--error)]"}>
                  {v.toFixed(2)}{i < pair.englishVector.length - 1 ? ", " : ""}
                </span>
              ))}]
            </code>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
            <div className="text-xs text-[var(--fg-muted)] mb-1">Chinese embedding:</div>
            <code className="text-xs font-mono text-[var(--fg)]">
              [{pair.chineseVector.map((v, i) => (
                <span key={i} className={v > 0 ? "text-[var(--success)]" : "text-[var(--error)]"}>
                  {v.toFixed(2)}{i < pair.chineseVector.length - 1 ? ", " : ""}
                </span>
              ))}]
            </code>
          </div>
          <p className="text-xs text-[var(--fg-muted)] text-center">
            Notice how similar the numbers are — that&apos;s what high cosine similarity means!
          </p>
        </motion.div>
      )}

      {/* Pair selector */}
      <div className="grid grid-cols-2 gap-2">
        {bilingualPairs.map((p, i) => (
          <button
            key={i}
            onClick={() => setSelectedPair(i)}
            className={`px-3 py-2 rounded-lg text-xs transition-colors text-left ${
              i === selectedPair
                ? "bg-[var(--fg)] text-[var(--bg)]"
                : "bg-[var(--bg-secondary)] text-[var(--fg-secondary)] hover:bg-[var(--bg-hover)]"
            }`}
          >
            <span className="block">{p.english}</span>
            <span className="block opacity-70">{p.chinese}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

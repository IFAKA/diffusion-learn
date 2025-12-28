"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const trainingPairs = [
  { caption: "A golden retriever playing in the park", features: ["dog", "golden", "outdoor", "playful"] },
  { caption: "Sunset over the ocean with orange clouds", features: ["sunset", "ocean", "orange", "clouds"] },
  { caption: "A cup of coffee on a wooden table", features: ["coffee", "cup", "wood", "indoor"] },
  { caption: "Snow-covered mountains at dawn", features: ["mountains", "snow", "dawn", "cold"] },
  { caption: "A red rose with water droplets", features: ["flower", "red", "water", "macro"] },
];

export function TrainingDataDemo() {
  const [currentPair, setCurrentPair] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [learnedFeatures, setLearnedFeatures] = useState<Set<string>>(new Set());
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentPair((prev) => {
          const next = (prev + 1) % trainingPairs.length;
          // Add features to learned set
          trainingPairs[prev].features.forEach(f => {
            setLearnedFeatures(s => new Set([...s, f]));
          });
          if (next === 0) {
            setIsPlaying(false);
          }
          return next;
        });
        setShowFeatures(true);
        setTimeout(() => setShowFeatures(false), 800);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handleStart = () => {
    setLearnedFeatures(new Set());
    setCurrentPair(0);
    setIsPlaying(true);
  };

  const pair = trainingPairs[currentPair];

  return (
    <div className="w-full max-w-lg">
      {/* Training visualization */}
      <div className="relative mb-6">
        <div className="flex items-center gap-4">
          {/* Image placeholder */}
          <motion.div
            key={currentPair}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-32 h-32 rounded-lg bg-gradient-to-br from-[var(--fg-muted)]/20 to-[var(--fg-muted)]/5
              border border-[var(--border)] flex items-center justify-center"
          >
            <svg className="w-12 h-12 text-[var(--fg-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </motion.div>

          {/* Arrow */}
          <div className="flex-shrink-0">
            <motion.svg
              className="w-8 h-8 text-[var(--fg-muted)]"
              animate={{ x: isPlaying ? [0, 5, 0] : 0 }}
              transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </div>

          {/* Caption */}
          <div className="flex-1 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
            <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-1">Caption</div>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPair}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-[var(--fg)]"
              >
                &quot;{pair.caption}&quot;
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Feature extraction animation */}
        <AnimatePresence>
          {showFeatures && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1"
            >
              {pair.features.map((f, i) => (
                <motion.span
                  key={f}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-xs px-2 py-0.5 rounded bg-[var(--success)]/20 text-[var(--success)]"
                >
                  +{f}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Model brain visualization */}
      <div className="mt-12 p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-[var(--fg-muted)] uppercase tracking-wider">Model Knowledge</span>
          <span className="text-xs text-[var(--fg-muted)]">{learnedFeatures.size} patterns learned</span>
        </div>
        <div className="flex flex-wrap items-start content-start gap-1.5 min-h-[60px]">
          <AnimatePresence>
            {Array.from(learnedFeatures).map((feature) => (
              <motion.span
                key={feature}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-2.5 py-1 text-xs leading-none rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--fg-secondary)]"
              >
                {feature}
              </motion.span>
            ))}
          </AnimatePresence>
          {learnedFeatures.size === 0 && (
            <span className="text-xs text-[var(--fg-muted)] italic">No patterns yet...</span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleStart}
          disabled={isPlaying}
          className="flex-1 px-4 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium text-sm
            hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlaying ? "Training..." : "Start Training"}
        </button>
      </div>

      {/* Progress */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1 h-1 bg-[var(--border)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[var(--success)]"
            animate={{ width: `${((currentPair + 1) / trainingPairs.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-[var(--fg-muted)]">
          {currentPair + 1}/{trainingPairs.length}
        </span>
      </div>
    </div>
  );
}

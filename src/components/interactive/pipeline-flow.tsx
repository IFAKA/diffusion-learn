"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stages = [
  {
    id: "prompt",
    label: "Prompt",
    description: "Your text input",
    example: '"a cat on a beach"',
    color: "var(--fg)",
  },
  {
    id: "tokenize",
    label: "Tokenize",
    description: "Split into tokens",
    example: "[1, 2857, 319, 1, 8921]",
    color: "var(--fg)",
  },
  {
    id: "encode",
    label: "Encode",
    description: "Create embeddings",
    example: "[[0.2, -0.5, ...], ...]",
    color: "var(--fg)",
  },
  {
    id: "noise",
    label: "Start Noise",
    description: "Random latent",
    example: "128×128×4 tensor",
    color: "var(--fg)",
  },
  {
    id: "denoise",
    label: "Denoise",
    description: "8 refinement steps",
    example: "Transformer × 8",
    color: "var(--success)",
  },
  {
    id: "decode",
    label: "Decode",
    description: "VAE to pixels",
    example: "1024×1024 RGB",
    color: "var(--fg)",
  },
];

export function PipelineFlow() {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const runAnimation = async () => {
    setIsAnimating(true);
    for (let i = 0; i < stages.length; i++) {
      setActiveStage(i);
      await new Promise((r) => setTimeout(r, 1200));
    }
    await new Promise((r) => setTimeout(r, 500));
    setActiveStage(null);
    setIsAnimating(false);
  };

  return (
    <div className="w-full max-w-lg">
      {/* Pipeline visualization */}
      <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex items-center">
            {/* Stage node */}
            <motion.div
              className={`relative flex flex-col items-center cursor-pointer ${
                !isAnimating ? "hover:scale-105" : ""
              } transition-transform`}
              onClick={() => !isAnimating && setActiveStage(index)}
              animate={{
                scale: activeStage === index ? 1.1 : 1,
              }}
            >
              <motion.div
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                animate={{
                  borderColor:
                    activeStage === index ? stage.color : "var(--border)",
                  backgroundColor:
                    activeStage === index
                      ? "var(--bg-elevated)"
                      : "var(--bg-secondary)",
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="font-mono text-xs text-[var(--fg-muted)]">
                  {index + 1}
                </span>
              </motion.div>
              <span className="mt-2 text-[10px] text-[var(--fg-muted)] whitespace-nowrap">
                {stage.label}
              </span>
            </motion.div>

            {/* Connector arrow */}
            {index < stages.length - 1 && (
              <motion.div
                className="w-6 h-0.5 mx-1"
                animate={{
                  backgroundColor:
                    activeStage !== null && activeStage > index
                      ? "var(--fg)"
                      : "var(--border)",
                }}
                transition={{ duration: 0.2 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Stage details */}
      <AnimatePresence mode="wait">
        {activeStage !== null && (
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: stages[activeStage].color }}
              />
              <h4 className="font-medium text-[var(--fg)]">
                {stages[activeStage].label}
              </h4>
            </div>
            <p className="text-sm text-[var(--fg-secondary)] mb-3">
              {stages[activeStage].description}
            </p>
            <code className="block p-2 rounded bg-[var(--bg)] text-xs font-mono text-[var(--fg-muted)]">
              {stages[activeStage].example}
            </code>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {activeStage === null && !isAnimating && (
        <div className="p-4 rounded-lg border border-dashed border-[var(--border)] text-center">
          <p className="text-sm text-[var(--fg-muted)]">
            Click a stage or run animation to explore
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="mt-4">
        <button
          onClick={runAnimation}
          disabled={isAnimating}
          className="w-full px-4 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium text-sm
            hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnimating ? "Running..." : "Run Pipeline Animation"}
        </button>
      </div>
    </div>
  );
}

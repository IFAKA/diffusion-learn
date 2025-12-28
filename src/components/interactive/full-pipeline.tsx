"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pipelineSteps = [
  {
    id: 1,
    name: "Input",
    description: "Your text prompt",
    data: '"a cat on a beach"',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 2,
    name: "Tokenize",
    description: "Convert to token IDs",
    data: "[1, 2857, 319, 1, 8921]",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: 3,
    name: "Encode",
    description: "Create text embeddings",
    data: "768-dim vectors × 5",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    id: 4,
    name: "Noise",
    description: "Start with random noise",
    data: "128×128×4 latent",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 7h.01M12 7h.01M17 7h.01M7 12h.01M12 12h.01M17 12h.01M7 17h.01M12 17h.01M17 17h.01" />
      </svg>
    ),
  },
  {
    id: 5,
    name: "Denoise ×8",
    description: "Iterative refinement",
    data: "S3-DiT transformer",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: 6,
    name: "Decode",
    description: "VAE to pixels",
    data: "1024×1024 RGB",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
];

export function FullPipeline() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const runPipeline = async () => {
    setIsRunning(true);
    setCurrentStep(0);

    for (let i = 0; i <= pipelineSteps.length + 1; i++) {
      setCurrentStep(i);
      await new Promise((r) => setTimeout(r, 800));
    }

    setIsRunning(false);
  };

  return (
    <div className="w-full max-w-lg">
      {/* Pipeline steps */}
      <div className="space-y-3 mb-6">
        {pipelineSteps.map((step, index) => {
          const isActive = currentStep === index + 1;
          const isComplete = currentStep > index + 1;

          return (
            <motion.div
              key={step.id}
              className={`p-4 rounded-lg border transition-colors ${
                isActive
                  ? "border-[var(--fg)] bg-[var(--bg-elevated)]"
                  : isComplete
                  ? "border-[var(--success)]/30 bg-[var(--success)]/5"
                  : "border-[var(--border)] bg-[var(--bg-secondary)]"
              }`}
              animate={{
                scale: isActive ? 1.02 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isActive
                      ? "bg-[var(--fg)] text-[var(--bg)]"
                      : isComplete
                      ? "bg-[var(--success)]/20 text-[var(--success)]"
                      : "bg-[var(--bg)] text-[var(--fg-muted)]"
                  }`}
                >
                  {isComplete ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    step.icon
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`font-medium ${
                        isActive
                          ? "text-[var(--fg)]"
                          : isComplete
                          ? "text-[var(--success)]"
                          : "text-[var(--fg-secondary)]"
                      }`}
                    >
                      {step.name}
                    </h4>
                    <AnimatePresence>
                      {(isActive || isComplete) && (
                        <motion.code
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-xs font-mono text-[var(--fg-muted)]"
                        >
                          {step.data}
                        </motion.code>
                      )}
                    </AnimatePresence>
                  </div>
                  <p className="text-sm text-[var(--fg-muted)]">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Result */}
      <AnimatePresence>
        {currentStep > pipelineSteps.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg border border-[var(--success)] bg-[var(--success)]/10 text-center mb-4"
          >
            <span className="text-[var(--success)] font-medium">
              Image generated in ~0.8 seconds!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control */}
      <button
        onClick={runPipeline}
        disabled={isRunning}
        className="w-full px-4 py-3 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium
          hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRunning ? "Running Pipeline..." : "Run Full Pipeline"}
      </button>
    </div>
  );
}

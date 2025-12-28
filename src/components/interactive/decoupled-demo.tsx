"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Component = "cfg" | "distribution" | "dmdr";

interface ComponentInfo {
  name: string;
  fullName: string;
  description: string;
  benefit: string;
  color: string;
}

const components: Record<Component, ComponentInfo> = {
  cfg: {
    name: "CFG Augmentation",
    fullName: "Classifier-Free Guidance Augmentation",
    description: "Teaches strong prompt following by amplifying the difference between conditional and unconditional predictions.",
    benefit: "Better text-image alignment",
    color: "#4dabf7",
  },
  distribution: {
    name: "Distribution Matching",
    fullName: "Distribution Matching Distillation",
    description: "Ensures student outputs match the statistical distribution of teacher outputs, not just individual samples.",
    benefit: "Consistent output quality",
    color: "#ffd43b",
  },
  dmdr: {
    name: "DMDR",
    fullName: "Distribution Matching with RL",
    description: "Adds reinforcement learning fine-tuning to optimize for aesthetic quality and human preferences.",
    benefit: "Higher aesthetic quality",
    color: "#00d084",
  },
};

export function DecoupledDemo() {
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [step, setStep] = useState(0);

  const runAnimation = async () => {
    setIsAnimating(true);
    setStep(0);

    for (let i = 0; i < 3; i++) {
      setStep(i);
      setSelectedComponent(["cfg", "distribution", "dmdr"][i] as Component);
      await new Promise(r => setTimeout(r, 1500));
    }

    setStep(3);
    await new Promise(r => setTimeout(r, 1000));
    setIsAnimating(false);
  };

  return (
    <div className="w-full max-w-lg">
      {/* Architecture diagram */}
      <div className="mb-6 p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
        <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-4 text-center">
          Decoupled-DMD Architecture
        </div>

        {/* Visual representation */}
        <div className="space-y-3">
          {(["cfg", "distribution", "dmdr"] as Component[]).map((comp, i) => {
            const info = components[comp];
            const isActive = selectedComponent === comp || step > i;

            return (
              <motion.button
                key={comp}
                onClick={() => !isAnimating && setSelectedComponent(selectedComponent === comp ? null : comp)}
                className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                  isActive
                    ? "border-opacity-100"
                    : "border-[var(--border)] opacity-50"
                }`}
                style={{
                  borderColor: isActive ? info.color : undefined,
                  backgroundColor: isActive ? `${info.color}15` : undefined,
                }}
                animate={{ scale: selectedComponent === comp ? 1.02 : 1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: info.color }}
                    />
                    <span className="text-sm font-medium text-[var(--fg)]">
                      {info.name}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--fg-muted)]">
                    Step {i + 1}
                  </span>
                </div>
              </motion.button>
            );
          })}

          {/* Result */}
          <motion.div
            className={`p-3 rounded-lg border-2 transition-all ${
              step >= 3
                ? "border-[var(--success)] bg-[var(--success)]/10"
                : "border-dashed border-[var(--border)] opacity-50"
            }`}
            animate={{ scale: step >= 3 ? 1.02 : 1 }}
          >
            <div className="text-center">
              <span className="text-sm font-medium text-[var(--success)]">
                Z-Image-Turbo
              </span>
              <div className="text-xs text-[var(--fg-muted)] mt-1">
                8 steps, CFG=0, high quality
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Component details */}
      <AnimatePresence mode="wait">
        {selectedComponent && (
          <motion.div
            key={selectedComponent}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 rounded-lg border"
            style={{
              borderColor: components[selectedComponent].color,
              backgroundColor: `${components[selectedComponent].color}10`,
            }}
          >
            <h4 className="font-medium text-[var(--fg)] mb-1">
              {components[selectedComponent].fullName}
            </h4>
            <p className="text-sm text-[var(--fg-secondary)] mb-2">
              {components[selectedComponent].description}
            </p>
            <div
              className="inline-block px-2 py-1 rounded text-xs font-medium"
              style={{
                backgroundColor: components[selectedComponent].color,
                color: "white",
              }}
            >
              {components[selectedComponent].benefit}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Run animation button */}
      <button
        onClick={runAnimation}
        disabled={isAnimating}
        className="w-full px-4 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium text-sm
          hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAnimating ? "Training..." : "Run Training Pipeline"}
      </button>

      {/* Key insight */}
      <div className="mt-4 p-3 rounded-lg bg-[var(--bg)] border border-dashed border-[var(--border)]">
        <p className="text-xs text-[var(--fg-muted)] text-center">
          <strong>Key insight:</strong> By training each component separately (decoupled),
          each can be optimized independently, leading to better overall results than
          training everything together.
        </p>
      </div>
    </div>
  );
}

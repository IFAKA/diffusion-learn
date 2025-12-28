"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function StepComparison() {
  const [currentStep, setCurrentStep] = useState(0);
  const maxSteps = 8;

  // Simulated quality scores
  const getQuality = (step: number, isFast: boolean) => {
    if (isFast) {
      // Z-Image: reaches high quality quickly
      return Math.min(95, 40 + step * 8);
    } else {
      // Standard: needs more steps
      return Math.min(98, 20 + step * 1.8);
    }
  };

  return (
    <div className="w-full max-w-lg">
      {/* Comparison cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Standard model */}
        <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[var(--fg-muted)] uppercase tracking-wider">
              Standard (50 steps)
            </span>
            <span className="font-mono text-xs text-[var(--fg-muted)]">
              ~10s
            </span>
          </div>

          {/* Quality bar */}
          <div className="h-24 bg-[var(--bg)] rounded border border-[var(--border)] relative overflow-hidden">
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-[var(--fg-muted)]"
              animate={{ height: `${getQuality(currentStep * 6, false)}%` }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-lg text-[var(--fg)]">
                {Math.round(getQuality(currentStep * 6, false))}%
              </span>
            </div>
          </div>

          <p className="mt-2 text-xs text-[var(--fg-muted)] text-center">
            Step {currentStep * 6}/50
          </p>
        </div>

        {/* Z-Image model */}
        <div className="p-4 rounded-lg border border-[var(--success)]/30 bg-[var(--success)]/5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[var(--success)] uppercase tracking-wider">
              Z-Image (8 steps)
            </span>
            <span className="font-mono text-xs text-[var(--success)]">
              ~0.8s
            </span>
          </div>

          {/* Quality bar */}
          <div className="h-24 bg-[var(--bg)] rounded border border-[var(--border)] relative overflow-hidden">
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-[var(--success)]"
              animate={{ height: `${getQuality(currentStep, true)}%` }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-lg text-[var(--fg)]">
                {Math.round(getQuality(currentStep, true))}%
              </span>
            </div>
          </div>

          <p className="mt-2 text-xs text-[var(--fg-muted)] text-center">
            Step {currentStep}/8
          </p>
        </div>
      </div>

      {/* Step slider */}
      <div className="mb-4">
        <input
          type="range"
          min={0}
          max={maxSteps}
          value={currentStep}
          onChange={(e) => setCurrentStep(parseInt(e.target.value))}
          className="w-full h-2 bg-[var(--border)] rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-[var(--fg)]
            [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <div className="flex justify-between mt-2 text-xs text-[var(--fg-muted)]">
          <span>Start</span>
          <span>Z-Image done</span>
        </div>
      </div>

      {/* Key insight */}
      <div className="p-3 rounded-lg border border-dashed border-[var(--border)] text-center">
        <p className="text-sm text-[var(--fg-secondary)]">
          {currentStep === maxSteps ? (
            <span className="text-[var(--success)]">
              Z-Image reaches 95% quality in 8 steps while standard is still at{" "}
              {Math.round(getQuality(currentStep * 6, false))}%
            </span>
          ) : (
            "Drag to compare quality at each step"
          )}
        </p>
      </div>
    </div>
  );
}

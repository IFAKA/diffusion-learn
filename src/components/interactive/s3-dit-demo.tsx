"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Mode = "traditional" | "s3";

export function S3DiTDemo() {
  const [mode, setMode] = useState<Mode>("traditional");
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const maxSteps = mode === "traditional" ? 6 : 4;

  // Animation
  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setStep((prev) => {
          if (prev >= maxSteps) {
            setIsAnimating(false);
            return maxSteps;
          }
          return prev + 1;
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isAnimating, maxSteps]);

  const handlePlay = () => {
    setStep(0);
    setIsAnimating(true);
  };

  const traditionalSteps = [
    { label: "Text Encoder", stream: "text", color: "#4dabf7" },
    { label: "Semantic Encoder", stream: "semantic", color: "#ffd43b" },
    { label: "Image Encoder", stream: "image", color: "#ff6b6b" },
    { label: "Cross-Attention", stream: "fusion", color: "#9775fa" },
    { label: "Fusion Layer", stream: "fusion", color: "#9775fa" },
    { label: "Output", stream: "output", color: "#00d084" },
  ];

  const s3Steps = [
    { label: "Concatenate Tokens", tokens: ["Text", "Semantic", "Image"] },
    { label: "Transformer Block", tokens: ["Mixed"] },
    { label: "Transformer Block", tokens: ["Mixed"] },
    { label: "Output", tokens: ["Result"] },
  ];

  return (
    <div className="w-full max-w-lg">
      {/* Mode toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setMode("traditional"); setStep(0); setIsAnimating(false); }}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "traditional"
              ? "bg-[var(--fg)] text-[var(--bg)]"
              : "bg-[var(--bg-secondary)] text-[var(--fg-secondary)] hover:bg-[var(--bg-hover)]"
          }`}
        >
          Traditional (Multi-Stream)
        </button>
        <button
          onClick={() => { setMode("s3"); setStep(0); setIsAnimating(false); }}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "s3"
              ? "bg-[var(--success)] text-white"
              : "bg-[var(--bg-secondary)] text-[var(--fg-secondary)] hover:bg-[var(--bg-hover)]"
          }`}
        >
          S3-DiT (Single-Stream)
        </button>
      </div>

      {/* Visualization */}
      <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] mb-4 min-h-[200px]">
        {mode === "traditional" ? (
          <div className="space-y-2">
            {/* Multiple streams */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {["Text", "Semantic", "Image"].map((stream, i) => (
                <motion.div
                  key={stream}
                  className="p-2 rounded text-center text-xs"
                  animate={{
                    opacity: step >= i ? 1 : 0.3,
                    backgroundColor: step >= i
                      ? [traditionalSteps[0].color, traditionalSteps[1].color, traditionalSteps[2].color][i]
                      : "var(--bg)",
                  }}
                  style={{ color: step >= i ? "white" : "var(--fg-muted)" }}
                >
                  {stream}
                </motion.div>
              ))}
            </div>

            {/* Arrows */}
            <div className="flex justify-center">
              <motion.svg
                className="w-6 h-6 text-[var(--fg-muted)]"
                animate={{ opacity: step >= 3 ? 1 : 0.3 }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </motion.svg>
            </div>

            {/* Fusion layers */}
            {traditionalSteps.slice(3).map((s, i) => (
              <motion.div
                key={i}
                className="p-2 rounded text-center text-xs"
                animate={{
                  opacity: step >= i + 3 ? 1 : 0.3,
                  backgroundColor: step >= i + 3 ? s.color : "var(--bg)",
                }}
                style={{ color: step >= i + 3 ? "white" : "var(--fg-muted)" }}
              >
                {s.label}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {s3Steps.map((s, i) => (
              <motion.div
                key={i}
                className="p-3 rounded"
                animate={{
                  opacity: step >= i ? 1 : 0.3,
                  backgroundColor: step >= i ? "var(--success)" : "var(--bg)",
                }}
              >
                <div className="text-xs font-medium text-center mb-2" style={{ color: step >= i ? "white" : "var(--fg-muted)" }}>
                  {s.label}
                </div>
                <div className="flex justify-center gap-1">
                  {s.tokens.map((token, j) => (
                    <motion.span
                      key={j}
                      className="px-2 py-0.5 rounded text-xs"
                      style={{
                        backgroundColor: step >= i ? "rgba(255,255,255,0.2)" : "var(--border)",
                        color: step >= i ? "white" : "var(--fg-muted)",
                      }}
                    >
                      {token}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Play button */}
      <button
        onClick={handlePlay}
        disabled={isAnimating}
        className="w-full px-4 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium text-sm
          hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      >
        {isAnimating ? "Processing..." : "Run Animation"}
      </button>

      {/* Comparison stats */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className={`p-3 rounded-lg border ${mode === "traditional" ? "border-[var(--fg)]" : "border-[var(--border)]"}`}>
          <div className="text-2xl font-bold text-[var(--fg)]">3</div>
          <div className="text-xs text-[var(--fg-muted)]">Separate streams</div>
          <div className="text-xs text-[var(--fg-muted)]">Complex fusion</div>
        </div>
        <div className={`p-3 rounded-lg border ${mode === "s3" ? "border-[var(--success)]" : "border-[var(--border)]"}`}>
          <div className="text-2xl font-bold text-[var(--success)]">1</div>
          <div className="text-xs text-[var(--fg-muted)]">Single stream</div>
          <div className="text-xs text-[var(--fg-muted)]">Simpler & faster</div>
        </div>
      </div>
    </div>
  );
}

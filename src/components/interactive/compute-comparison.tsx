"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Mode = "pixel" | "latent";

const stats = {
  pixel: {
    resolution: "1024×1024",
    tokens: "1,048,576",
    attentionOps: "1.1 trillion",
    memory: "~16 GB",
    feasible: false,
  },
  latent: {
    resolution: "128×128",
    tokens: "16,384",
    attentionOps: "268 million",
    memory: "~2 GB",
    feasible: true,
  },
};

export function ComputeComparison() {
  const [mode, setMode] = useState<Mode>("latent");
  const [showCalculation, setShowCalculation] = useState(false);

  const current = stats[mode];
  const ratio = 1048576 / 16384; // ~64x

  return (
    <div className="w-full max-w-lg">
      {/* Mode toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode("pixel")}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "pixel"
              ? "bg-[var(--error)] text-white"
              : "bg-[var(--bg-secondary)] text-[var(--fg-secondary)] hover:bg-[var(--bg-hover)]"
          }`}
        >
          Pixel Space
        </button>
        <button
          onClick={() => setMode("latent")}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "latent"
              ? "bg-[var(--success)] text-white"
              : "bg-[var(--bg-secondary)] text-[var(--fg-secondary)] hover:bg-[var(--bg-hover)]"
          }`}
        >
          Latent Space
        </button>
      </div>

      {/* Visual comparison */}
      <div className="relative mb-6 p-6 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
        <div className="flex items-end justify-center gap-8">
          {/* Pixel space bar */}
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ height: mode === "pixel" ? 160 : 40 }}
              className="w-16 rounded-t-lg"
              style={{ backgroundColor: mode === "pixel" ? "var(--error)" : "var(--border)" }}
            />
            <div className="text-xs text-[var(--fg-muted)] mt-2">Pixel</div>
            <div className="text-xs font-mono text-[var(--fg-muted)]">1M tokens</div>
          </div>

          {/* Latent space bar */}
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ height: mode === "latent" ? 80 : 20 }}
              className="w-16 rounded-t-lg"
              style={{ backgroundColor: mode === "latent" ? "var(--success)" : "var(--border)" }}
            />
            <div className="text-xs text-[var(--fg-muted)] mt-2">Latent</div>
            <div className="text-xs font-mono text-[var(--fg-muted)]">16K tokens</div>
          </div>
        </div>

        {/* Ratio indicator */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded bg-[var(--bg)] border border-[var(--border)]">
          <span className="text-xs font-mono text-[var(--fg)]">{ratio.toFixed(0)}× fewer tokens</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
          <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-1">Resolution</div>
          <div className="font-mono text-sm text-[var(--fg)]">{current.resolution}</div>
        </div>
        <div className="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
          <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-1">Tokens</div>
          <div className="font-mono text-sm text-[var(--fg)]">{current.tokens}</div>
        </div>
        <div className="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
          <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-1">Attention Ops</div>
          <div className="font-mono text-sm text-[var(--fg)]">{current.attentionOps}</div>
        </div>
        <div className="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
          <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-1">Memory</div>
          <div className="font-mono text-sm text-[var(--fg)]">{current.memory}</div>
        </div>
      </div>

      {/* Feasibility indicator */}
      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-lg border ${
          current.feasible
            ? "bg-[var(--success)]/10 border-[var(--success)]/30"
            : "bg-[var(--error)]/10 border-[var(--error)]/30"
        }`}
      >
        <div className="flex items-center gap-2">
          {current.feasible ? (
            <svg className="w-5 h-5 text-[var(--success)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-[var(--error)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          )}
          <span className={`text-sm font-medium ${current.feasible ? "text-[var(--success)]" : "text-[var(--error)]"}`}>
            {current.feasible ? "Feasible on consumer GPUs" : "Not feasible (would require datacenter hardware)"}
          </span>
        </div>
      </motion.div>

      {/* Math explanation toggle */}
      <button
        onClick={() => setShowCalculation(!showCalculation)}
        className="w-full mt-4 px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--fg-secondary)]
          hover:bg-[var(--bg-hover)] transition-colors"
      >
        {showCalculation ? "Hide" : "Show"} the math
      </button>

      {showCalculation && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 p-4 rounded-lg bg-[var(--bg)] border border-dashed border-[var(--border)]"
        >
          <pre className="text-xs font-mono text-[var(--fg-muted)] whitespace-pre-wrap">
{`Self-attention complexity: O(n²)

Pixel space (1024×1024 = 1M tokens):
  1M² = 1,000,000,000,000 ops

Latent space (128×128 = 16K tokens):
  16K² = 268,000,000 ops

Ratio: 1T / 268M ≈ 4,000× fewer ops!`}
          </pre>
        </motion.div>
      )}
    </div>
  );
}

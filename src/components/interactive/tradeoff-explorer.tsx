"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const models = [
  { name: "SD 1.5", speed: 20, quality: 70, memory: 60, steps: 50 },
  { name: "SDXL", speed: 15, quality: 85, memory: 30, steps: 50 },
  { name: "SD 3", speed: 10, quality: 90, memory: 25, steps: 28 },
  { name: "Z-Image", speed: 90, quality: 88, memory: 65, steps: 8 },
  { name: "Flux", speed: 25, quality: 92, memory: 20, steps: 20 },
];

export function TradeoffExplorer() {
  const [selectedModel, setSelectedModel] = useState<string>("Z-Image");
  const model = models.find((m) => m.name === selectedModel)!;

  return (
    <div className="w-full max-w-lg">
      {/* Model selector */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {models.map((m) => (
          <button
            key={m.name}
            onClick={() => setSelectedModel(m.name)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              selectedModel === m.name
                ? "bg-[var(--fg)] text-[var(--bg)]"
                : "border border-[var(--border)] text-[var(--fg-secondary)] hover:border-[var(--fg-muted)]"
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      {/* Metrics */}
      <div className="space-y-4 mb-6">
        {/* Speed */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-[var(--fg-secondary)]">Speed</span>
            <span className="text-sm font-mono text-[var(--fg-muted)]">
              {model.steps} steps
            </span>
          </div>
          <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                backgroundColor:
                  model.speed > 70
                    ? "var(--success)"
                    : model.speed > 40
                    ? "var(--warning)"
                    : "var(--error)",
              }}
              animate={{ width: `${model.speed}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Quality */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-[var(--fg-secondary)]">Quality</span>
            <span className="text-sm font-mono text-[var(--fg-muted)]">
              {model.quality}%
            </span>
          </div>
          <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[var(--fg)] rounded-full"
              animate={{ width: `${model.quality}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Memory */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-[var(--fg-secondary)]">
              Memory Efficiency
            </span>
            <span className="text-sm font-mono text-[var(--fg-muted)]">
              {model.memory > 50 ? "16GB GPU" : "24GB+ GPU"}
            </span>
          </div>
          <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                backgroundColor:
                  model.memory > 50 ? "var(--success)" : "var(--warning)",
              }}
              animate={{ width: `${model.memory}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]">
        <h4 className="font-medium text-[var(--fg)] mb-2">{model.name}</h4>
        <p className="text-sm text-[var(--fg-muted)]">
          {model.name === "Z-Image" &&
            "Optimized for speed through distillation. Best balance of speed and quality for real-time applications."}
          {model.name === "SD 1.5" &&
            "The original. Slower but well-understood with huge community support."}
          {model.name === "SDXL" &&
            "High quality output but needs more VRAM and time."}
          {model.name === "SD 3" &&
            "Latest SD with improved text rendering but computationally expensive."}
          {model.name === "Flux" &&
            "State-of-the-art quality but requires significant compute."}
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Architecture = "unet" | "dit";

interface ArchitectureData {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  layers: { name: string; width: number }[];
}

const architectures: Record<Architecture, ArchitectureData> = {
  unet: {
    name: "U-Net",
    description: "Traditional encoder-decoder with skip connections",
    pros: [
      "Well-established architecture",
      "Good at preserving details",
      "Efficient for smaller images",
    ],
    cons: [
      "Complex multi-scale processing",
      "Harder to scale up",
      "Less parallelizable",
    ],
    layers: [
      { name: "Encoder 1", width: 100 },
      { name: "Encoder 2", width: 80 },
      { name: "Encoder 3", width: 60 },
      { name: "Bottleneck", width: 40 },
      { name: "Decoder 3", width: 60 },
      { name: "Decoder 2", width: 80 },
      { name: "Decoder 1", width: 100 },
    ],
  },
  dit: {
    name: "DiT (Diffusion Transformer)",
    description: "Pure transformer architecture for diffusion",
    pros: [
      "Scales predictably with size",
      "Simpler architecture",
      "Better parallelization",
    ],
    cons: [
      "Higher memory for large images",
      "Requires more compute",
      "Newer, less mature",
    ],
    layers: [
      { name: "Patch Embed", width: 100 },
      { name: "Transformer Block 1", width: 100 },
      { name: "Transformer Block 2", width: 100 },
      { name: "Transformer Block N", width: 100 },
      { name: "Final Layer", width: 100 },
    ],
  },
};

export function ArchitectureComparison() {
  const [selected, setSelected] = useState<Architecture>("unet");
  const [showBoth, setShowBoth] = useState(false);

  const arch = architectures[selected];

  return (
    <div className="w-full max-w-lg">
      {/* Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setSelected("unet"); setShowBoth(false); }}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selected === "unet" && !showBoth
              ? "bg-[var(--fg)] text-[var(--bg)]"
              : "bg-[var(--bg-secondary)] text-[var(--fg-secondary)] hover:bg-[var(--bg-hover)]"
          }`}
        >
          U-Net
        </button>
        <button
          onClick={() => { setSelected("dit"); setShowBoth(false); }}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selected === "dit" && !showBoth
              ? "bg-[var(--fg)] text-[var(--bg)]"
              : "bg-[var(--bg-secondary)] text-[var(--fg-secondary)] hover:bg-[var(--bg-hover)]"
          }`}
        >
          DiT
        </button>
        <button
          onClick={() => setShowBoth(!showBoth)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            showBoth
              ? "bg-[var(--success)] text-white"
              : "bg-[var(--bg-secondary)] text-[var(--fg-secondary)] hover:bg-[var(--bg-hover)]"
          }`}
        >
          Compare
        </button>
      </div>

      {/* Architecture visualization */}
      <div className={`grid gap-4 mb-6 ${showBoth ? "grid-cols-2" : "grid-cols-1"}`}>
        {(showBoth ? ["unet", "dit"] as Architecture[] : [selected]).map((archKey) => {
          const a = architectures[archKey];
          return (
            <div key={archKey} className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
              <h3 className="text-sm font-medium text-[var(--fg)] mb-2">{a.name}</h3>
              <div className="space-y-1">
                {a.layers.map((layer, i) => (
                  <motion.div
                    key={i}
                    initial={{ width: 0 }}
                    animate={{ width: `${layer.width}%` }}
                    transition={{ delay: i * 0.35, duration: 0.6 }}
                    className="h-6 rounded flex items-center px-2"
                    style={{
                      backgroundColor: archKey === "unet"
                        ? `rgba(255, 150, 50, ${0.3 + (i * 0.1)})`
                        : `rgba(100, 150, 255, ${0.3 + (i * 0.15)})`,
                    }}
                  >
                    <span className="text-xs text-[var(--fg)] truncate">{layer.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Details (only show when not comparing) */}
      {!showBoth && (
        <motion.div
          key={selected}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <p className="text-sm text-[var(--fg-secondary)]">{arch.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-[var(--success)]/10 border border-[var(--success)]/30">
              <div className="text-xs text-[var(--success)] font-medium mb-2">Advantages</div>
              <ul className="space-y-1">
                {arch.pros.map((pro, i) => (
                  <li key={i} className="text-xs text-[var(--fg-secondary)] flex items-start gap-1">
                    <span className="text-[var(--success)]">+</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-[var(--error)]/10 border border-[var(--error)]/30">
              <div className="text-xs text-[var(--error)] font-medium mb-2">Disadvantages</div>
              <ul className="space-y-1">
                {arch.cons.map((con, i) => (
                  <li key={i} className="text-xs text-[var(--fg-secondary)] flex items-start gap-1">
                    <span className="text-[var(--error)]">−</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Z-Image note */}
      <div className="mt-4 p-3 rounded-lg bg-[var(--bg)] border border-dashed border-[var(--border)]">
        <p className="text-xs text-[var(--fg-muted)] text-center">
          Z-Image uses <strong>DiT</strong> architecture for better scaling and quality,
          combined with S3 (Single-Stream) for efficiency.
        </p>
      </div>
    </div>
  );
}

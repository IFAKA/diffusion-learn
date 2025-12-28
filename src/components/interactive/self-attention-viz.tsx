"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// 4x4 grid of image patches
const gridSize = 4;
const patches = Array.from({ length: gridSize * gridSize }, (_, i) => i);

// Simulated attention patterns for each patch
const getAttentionWeights = (patchIndex: number): number[] => {
  const weights = new Array(gridSize * gridSize).fill(0);
  const row = Math.floor(patchIndex / gridSize);
  const col = patchIndex % gridSize;

  // Patches attend more to nearby patches and patches with similar content
  for (let i = 0; i < gridSize * gridSize; i++) {
    const iRow = Math.floor(i / gridSize);
    const iCol = i % gridSize;
    const distance = Math.sqrt((row - iRow) ** 2 + (col - iCol) ** 2);

    // Base weight decreases with distance
    let weight = Math.exp(-distance * 0.5);

    // Self-attention is always high
    if (i === patchIndex) weight = 1;

    weights[i] = weight;
  }

  // Normalize
  const sum = weights.reduce((a, b) => a + b, 0);
  return weights.map((w) => w / sum);
};

export function SelfAttentionViz() {
  const [selectedPatch, setSelectedPatch] = useState<number | null>(null);

  const weights = selectedPatch !== null ? getAttentionWeights(selectedPatch) : null;

  // Patch labels for a simple cat face
  const getPatchContent = (i: number): string => {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;

    if (row === 0) return "bg"; // Background
    if (row === 1 && (col === 1 || col === 2)) return "ear";
    if (row === 2 && (col === 1 || col === 2)) return "eye";
    if (row === 3 && (col === 1 || col === 2)) return "nose";
    return "bg";
  };

  const getPatchColor = (content: string): string => {
    switch (content) {
      case "ear": return "#ffa500";
      case "eye": return "#00cc66";
      case "nose": return "#ff9999";
      default: return "#e0e0e0";
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Instructions */}
      <p className="text-sm text-[var(--fg-muted)] mb-4 text-center">
        Click a patch to see its attention pattern
      </p>

      {/* Grid of patches */}
      <div className="relative mb-6">
        <div
          className="grid gap-1 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            width: "256px",
          }}
        >
          {patches.map((i) => {
            const isSelected = selectedPatch === i;
            const weight = weights?.[i] || 0;
            const content = getPatchContent(i);

            return (
              <motion.button
                key={i}
                onClick={() => setSelectedPatch(isSelected ? null : i)}
                className="aspect-square rounded-lg border-2 transition-all relative overflow-hidden"
                style={{
                  backgroundColor: getPatchColor(content),
                  borderColor: isSelected
                    ? "var(--success)"
                    : selectedPatch !== null
                    ? `rgba(0, 208, 132, ${weight})`
                    : "var(--border)",
                  borderWidth: isSelected ? 3 : 2,
                }}
                animate={{
                  scale: isSelected ? 1.1 : 1,
                }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Attention overlay */}
                {selectedPatch !== null && !isSelected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: weight }}
                    className="absolute inset-0 bg-[var(--success)]"
                  />
                )}
                {/* Weight label */}
                {selectedPatch !== null && weight > 0.05 && (
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-white drop-shadow-md">
                    {(weight * 100).toFixed(0)}%
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 mt-4">
          {[
            { label: "Background", color: "#e0e0e0" },
            { label: "Ear", color: "#ffa500" },
            { label: "Eye", color: "#00cc66" },
            { label: "Nose", color: "#ff9999" },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
              <span className="text-xs text-[var(--fg-muted)]">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      {selectedPatch !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]"
        >
          <p className="text-sm text-[var(--fg)]">
            Patch <strong>{selectedPatch}</strong> ({getPatchContent(selectedPatch)}) attends to:
          </p>
          <ul className="mt-2 text-xs text-[var(--fg-muted)]">
            <li>• Nearby patches (spatial locality)</li>
            <li>• Itself (self-attention)</li>
            <li>• Related patches (semantic similarity)</li>
          </ul>
        </motion.div>
      )}

      {/* Info box */}
      <div className="mt-4 p-3 rounded-lg bg-[var(--bg)] border border-dashed border-[var(--border)]">
        <p className="text-xs text-[var(--fg-muted)] text-center">
          Self-attention allows each patch to gather information from all other patches,
          enabling global coherence in generated images.
        </p>
      </div>
    </div>
  );
}

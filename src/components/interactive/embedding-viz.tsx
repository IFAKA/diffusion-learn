"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Pre-computed 2D positions for word embeddings (t-SNE style)
const words = [
  { word: "cat", x: 35, y: 30, group: "animals" },
  { word: "dog", x: 40, y: 35, group: "animals" },
  { word: "kitten", x: 32, y: 33, group: "animals" },
  { word: "puppy", x: 43, y: 38, group: "animals" },
  { word: "bird", x: 28, y: 25, group: "animals" },
  { word: "fish", x: 25, y: 45, group: "animals" },
  { word: "red", x: 70, y: 20, group: "colors" },
  { word: "blue", x: 75, y: 25, group: "colors" },
  { word: "green", x: 72, y: 30, group: "colors" },
  { word: "orange", x: 68, y: 18, group: "colors" },
  { word: "yellow", x: 65, y: 22, group: "colors" },
  { word: "happy", x: 20, y: 70, group: "emotions" },
  { word: "sad", x: 25, y: 78, group: "emotions" },
  { word: "angry", x: 30, y: 75, group: "emotions" },
  { word: "calm", x: 18, y: 72, group: "emotions" },
  { word: "beach", x: 60, y: 65, group: "places" },
  { word: "ocean", x: 58, y: 70, group: "places" },
  { word: "mountain", x: 65, y: 55, group: "places" },
  { word: "forest", x: 70, y: 60, group: "places" },
  { word: "city", x: 55, y: 52, group: "places" },
];

const groupColors: Record<string, string> = {
  animals: "#00d084",
  colors: "#ff6b6b",
  emotions: "#4dabf7",
  places: "#ffd43b",
};

export function EmbeddingViz() {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const groups = Array.from(new Set(words.map((w) => w.group)));

  return (
    <div className="w-full max-w-lg">
      {/* Visualization area */}
      <div className="relative aspect-square bg-[var(--bg)] rounded-lg border border-[var(--border)] overflow-hidden mb-4">
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(10)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-[var(--fg)]"
              style={{ top: `${i * 10}%` }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px bg-[var(--fg)]"
              style={{ left: `${i * 10}%` }}
            />
          ))}
        </div>

        {/* Word points */}
        {words.map((item) => {
          const isHighlighted =
            hoveredWord === item.word ||
            (selectedGroup && item.group === selectedGroup);
          const isDimmed =
            (selectedGroup && item.group !== selectedGroup) ||
            (hoveredWord && hoveredWord !== item.word && !selectedGroup);

          return (
            <motion.div
              key={item.word}
              className="absolute cursor-pointer"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: isHighlighted ? 1.2 : 1,
                opacity: isDimmed ? 0.3 : 1,
              }}
              onMouseEnter={() => setHoveredWord(item.word)}
              onMouseLeave={() => setHoveredWord(null)}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: groupColors[item.group] }}
              />
              <motion.span
                className="absolute top-4 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap font-mono"
                animate={{
                  opacity: isHighlighted ? 1 : 0.6,
                  color: isHighlighted ? "var(--fg)" : "var(--fg-muted)",
                }}
              >
                {item.word}
              </motion.span>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {groups.map((group) => (
          <button
            key={group}
            onClick={() =>
              setSelectedGroup(selectedGroup === group ? null : group)
            }
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all ${
              selectedGroup === group
                ? "bg-[var(--bg-elevated)] border border-[var(--fg-muted)]"
                : "border border-[var(--border)] hover:border-[var(--fg-muted)]"
            }`}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: groupColors[group] }}
            />
            <span className="capitalize text-[var(--fg-secondary)]">
              {group}
            </span>
          </button>
        ))}
      </div>

      {/* Info */}
      <p className="text-xs text-[var(--fg-muted)] text-center">
        Similar words cluster together in embedding space.
        <br />
        Click a category to highlight, hover for details.
      </p>
    </div>
  );
}

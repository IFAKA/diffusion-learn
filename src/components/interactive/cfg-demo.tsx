"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function CFGDemo() {
  const [cfgScale, setCfgScale] = useState(7);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate image based on CFG scale
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    const cx = width / 2;
    const cy = height / 2;

    // CFG effects:
    // Low CFG: more noise/variation, less prompt adherence
    // High CFG: stronger colors, potential artifacts
    const promptStrength = Math.min(cfgScale / 10, 1);
    const artifactStrength = Math.max(0, (cfgScale - 12) / 8);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;

        // Base shape: cat face (target prompt)
        const dist = Math.sqrt((x - cx) ** 2 + ((y - cy) * 1.1) ** 2);
        let baseR, baseG, baseB;

        if (dist < 55) {
          // Cat face - orange
          baseR = 230;
          baseG = 160;
          baseB = 100;

          // Eyes
          const leftEyeDist = Math.sqrt((x - (cx - 18)) ** 2 + (y - (cy - 8)) ** 2);
          const rightEyeDist = Math.sqrt((x - (cx + 18)) ** 2 + (y - (cy - 8)) ** 2);
          if (leftEyeDist < 6 || rightEyeDist < 6) {
            baseR = 40;
            baseG = 160;
            baseB = 60;
          }
        } else {
          // Background
          baseR = 180;
          baseG = 200;
          baseB = 220;
        }

        // Low CFG: add randomness/noise
        const randomOffset = (1 - promptStrength) * (Math.random() - 0.5) * 100;

        // High CFG: oversaturate colors
        const saturationBoost = 1 + artifactStrength * 0.5;

        // High CFG: add artifacts (weird color bands)
        let artifactOffset = 0;
        if (artifactStrength > 0) {
          artifactOffset = Math.sin(x / 3 + y / 5) * artifactStrength * 50;
        }

        // Apply CFG effects
        const midR = 128, midG = 128, midB = 128;
        data[i] = Math.min(255, Math.max(0, midR + (baseR - midR) * saturationBoost + randomOffset + artifactOffset));
        data[i + 1] = Math.min(255, Math.max(0, midG + (baseG - midG) * saturationBoost + randomOffset + artifactOffset * 0.5));
        data[i + 2] = Math.min(255, Math.max(0, midB + (baseB - midB) * saturationBoost + randomOffset));
        data[i + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [cfgScale]);

  const getScaleDescription = () => {
    if (cfgScale <= 2) return { text: "Very creative, ignores prompt", color: "var(--warning)" };
    if (cfgScale <= 5) return { text: "Creative, loose adherence", color: "var(--fg-muted)" };
    if (cfgScale <= 9) return { text: "Balanced (recommended)", color: "var(--success)" };
    if (cfgScale <= 15) return { text: "Strong adherence, less variety", color: "var(--fg-muted)" };
    return { text: "Over-saturated, artifacts likely", color: "var(--error)" };
  };

  const description = getScaleDescription();

  return (
    <div className="w-full max-w-md">
      {/* Canvas display */}
      <div className="relative mb-4 rounded-lg overflow-hidden border border-[var(--border)]">
        <canvas
          ref={canvasRef}
          width={256}
          height={256}
          className="w-full aspect-square"
          style={{ imageRendering: "pixelated" }}
        />
        {/* CFG value indicator */}
        <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-[var(--bg)]/80 backdrop-blur-sm border border-[var(--border)]">
          <span className="font-mono text-sm text-[var(--fg)]">
            CFG = {cfgScale}
          </span>
        </div>
      </div>

      {/* Description */}
      <motion.div
        key={cfgScale}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-4 p-3 rounded-lg border border-[var(--border)]"
        style={{ backgroundColor: `color-mix(in srgb, ${description.color} 10%, transparent)` }}
      >
        <p className="text-sm text-center" style={{ color: description.color }}>
          {description.text}
        </p>
      </motion.div>

      {/* Slider */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-[var(--fg-muted)] mb-2">
          <span>Creative</span>
          <span>CFG Scale: {cfgScale}</span>
          <span>Strict</span>
        </div>
        <input
          type="range"
          min={1}
          max={20}
          value={cfgScale}
          onChange={(e) => setCfgScale(parseInt(e.target.value))}
          className="w-full h-2 bg-[var(--border)] rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-[var(--fg)]
            [&::-webkit-slider-thumb]:cursor-pointer"
        />
        {/* Scale markers */}
        <div className="flex justify-between mt-1">
          <span className="text-xs text-[var(--fg-muted)]">1</span>
          <span className="text-xs text-[var(--success)]">7</span>
          <span className="text-xs text-[var(--fg-muted)]">20</span>
        </div>
      </div>

      {/* Preset buttons */}
      <div className="flex gap-2 mb-4">
        {[1, 3, 7, 12, 20].map((scale) => (
          <button
            key={scale}
            onClick={() => setCfgScale(scale)}
            className={`flex-1 px-2 py-1.5 rounded-lg text-xs transition-colors ${
              cfgScale === scale
                ? "bg-[var(--fg)] text-[var(--bg)]"
                : "bg-[var(--bg-secondary)] text-[var(--fg-secondary)] hover:bg-[var(--bg-hover)]"
            }`}
          >
            {scale}
          </button>
        ))}
      </div>

      {/* Z-Image note */}
      <div className="p-3 rounded-lg bg-[var(--success)]/10 border border-[var(--success)]/30">
        <p className="text-xs text-[var(--success)]">
          <strong>Z-Image-Turbo uses CFG=0!</strong> The guidance is &quot;baked in&quot; during distillation,
          so it doesn&apos;t need runtime guidance (2× faster).
        </p>
      </div>
    </div>
  );
}

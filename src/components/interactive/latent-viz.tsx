"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function LatentViz() {
  const [view, setView] = useState<"original" | "latent" | "reconstructed">("original");
  const [isAnimating, setIsAnimating] = useState(false);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const latentCanvasRef = useRef<HTMLCanvasElement>(null);
  const reconstructedCanvasRef = useRef<HTMLCanvasElement>(null);

  // Draw original image
  useEffect(() => {
    const canvas = originalCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Draw a colorful pattern
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const hue = (x / width) * 360;
        const saturation = 70 + (y / height) * 30;
        const lightness = 40 + Math.sin((x + y) / 20) * 20;
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, []);

  // Draw latent representation (compressed, abstract)
  useEffect(() => {
    const canvas = latentCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Latent is 8x smaller, show as abstract blocks
    const blockSize = 8;
    for (let y = 0; y < height; y += blockSize) {
      for (let x = 0; x < width; x += blockSize) {
        // Abstract representation of latent values
        const value = Math.sin(x / 30) * Math.cos(y / 30) * 127 + 128;
        const channel = Math.floor((x / width) * 4);
        const colors = ["#ff6b6b", "#4dabf7", "#ffd43b", "#00d084"];
        ctx.fillStyle = colors[channel];
        ctx.globalAlpha = value / 255;
        ctx.fillRect(x, y, blockSize - 1, blockSize - 1);
      }
    }
    ctx.globalAlpha = 1;
  }, []);

  // Draw reconstructed image (slightly different from original)
  useEffect(() => {
    const canvas = reconstructedCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Similar to original but with slight differences
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const hue = (x / width) * 360 + 2; // Slight hue shift
        const saturation = 70 + (y / height) * 30;
        const lightness = 40 + Math.sin((x + y) / 20) * 20;
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, []);

  const runAnimation = async () => {
    setIsAnimating(true);
    setView("original");
    await new Promise((r) => setTimeout(r, 1000));
    setView("latent");
    await new Promise((r) => setTimeout(r, 1500));
    setView("reconstructed");
    await new Promise((r) => setTimeout(r, 1000));
    setIsAnimating(false);
  };

  return (
    <div className="w-full max-w-lg">
      {/* Visualization */}
      <div className="relative mb-6">
        <div className="flex items-center justify-between gap-2">
          {/* Original */}
          <div className={`flex-1 transition-opacity ${view === "original" || view === "reconstructed" ? "opacity-100" : "opacity-30"}`}>
            <div className="text-xs text-[var(--fg-muted)] text-center mb-2">Original</div>
            <div className="aspect-square rounded-lg overflow-hidden border border-[var(--border)]">
              <canvas ref={originalCanvasRef} width={128} height={128} className="w-full h-full" />
            </div>
            <div className="text-xs text-center mt-1 font-mono text-[var(--fg-muted)]">
              1024×1024×3
            </div>
          </div>

          {/* Arrow 1 */}
          <motion.div
            animate={{ opacity: view === "latent" || isAnimating ? 1 : 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="text-xs text-[var(--fg-muted)] mb-1">Encode</div>
            <svg className="w-6 h-6 text-[var(--fg-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <div className="text-xs text-[var(--success)]">48×</div>
          </motion.div>

          {/* Latent */}
          <div className={`transition-opacity ${view === "latent" ? "opacity-100" : "opacity-30"}`}>
            <div className="text-xs text-[var(--fg-muted)] text-center mb-2">Latent</div>
            <div className="aspect-square rounded-lg overflow-hidden border-2 border-[var(--success)]" style={{ width: 64 }}>
              <canvas ref={latentCanvasRef} width={64} height={64} className="w-full h-full" />
            </div>
            <div className="text-xs text-center mt-1 font-mono text-[var(--success)]">
              128×128×4
            </div>
          </div>

          {/* Arrow 2 */}
          <motion.div
            animate={{ opacity: view === "reconstructed" ? 1 : 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="text-xs text-[var(--fg-muted)] mb-1">Decode</div>
            <svg className="w-6 h-6 text-[var(--fg-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <div className="text-xs text-[var(--warning)]">×48</div>
          </motion.div>

          {/* Reconstructed */}
          <div className={`flex-1 transition-opacity ${view === "reconstructed" ? "opacity-100" : "opacity-30"}`}>
            <div className="text-xs text-[var(--fg-muted)] text-center mb-2">Reconstructed</div>
            <div className="aspect-square rounded-lg overflow-hidden border border-[var(--border)]">
              <canvas ref={reconstructedCanvasRef} width={128} height={128} className="w-full h-full" />
            </div>
            <div className="text-xs text-center mt-1 font-mono text-[var(--fg-muted)]">
              1024×1024×3
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-center">
          <div className="text-lg font-bold text-[var(--fg)]">3.1M</div>
          <div className="text-xs text-[var(--fg-muted)]">Original values</div>
        </div>
        <div className="p-3 rounded-lg bg-[var(--success)]/10 border border-[var(--success)]/30 text-center">
          <div className="text-lg font-bold text-[var(--success)]">65K</div>
          <div className="text-xs text-[var(--fg-muted)]">Latent values</div>
        </div>
        <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-center">
          <div className="text-lg font-bold text-[var(--fg)]">48×</div>
          <div className="text-xs text-[var(--fg-muted)]">Compression</div>
        </div>
      </div>

      {/* Play button */}
      <button
        onClick={runAnimation}
        disabled={isAnimating}
        className="w-full px-4 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium text-sm
          hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAnimating ? "Processing..." : "Run Encode → Decode"}
      </button>

      {/* View selector */}
      <div className="flex gap-2 mt-4">
        {(["original", "latent", "reconstructed"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`flex-1 px-3 py-1.5 rounded text-xs capitalize transition-colors ${
              view === v
                ? "bg-[var(--fg)] text-[var(--bg)]"
                : "bg-[var(--bg-secondary)] text-[var(--fg-secondary)] hover:bg-[var(--bg-hover)]"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}

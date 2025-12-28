"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function ReverseProcess() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maxSteps = 8;

  // Generate image with decreasing noise (reverse process)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    // Noise decreases as step increases (reverse of forward)
    const noiseAmount = 1 - step / maxSteps;

    // Use seeded random for consistent noise pattern
    const seed = 12345;
    const seededRandom = (i: number) => {
      const x = Math.sin(seed + i) * 10000;
      return x - Math.floor(x);
    };

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const pixelIndex = y * width + x;

        // Target image: a cat-like shape
        const cx = width / 2;
        const cy = height / 2;
        const dist = Math.sqrt((x - cx) ** 2 + ((y - cy) * 1.2) ** 2);

        // Create a simple cat face
        let baseR, baseG, baseB;

        // Face (orange)
        if (dist < 60) {
          baseR = 230;
          baseG = 160;
          baseB = 100;

          // Eyes
          const leftEyeDist = Math.sqrt((x - (cx - 20)) ** 2 + (y - (cy - 10)) ** 2);
          const rightEyeDist = Math.sqrt((x - (cx + 20)) ** 2 + (y - (cy - 10)) ** 2);
          if (leftEyeDist < 8 || rightEyeDist < 8) {
            baseR = 50;
            baseG = 180;
            baseB = 80;
          }

          // Nose
          const noseDist = Math.sqrt((x - cx) ** 2 + (y - (cy + 15)) ** 2);
          if (noseDist < 5) {
            baseR = 255;
            baseG = 150;
            baseB = 150;
          }
        } else {
          // Background
          baseR = 200;
          baseG = 220;
          baseB = 240;
        }

        // Add consistent noise based on noiseAmount
        const noise = (seededRandom(pixelIndex) - 0.5) * 255 * noiseAmount;

        data[i] = Math.min(255, Math.max(0, baseR * (1 - noiseAmount * 0.8) + 128 * noiseAmount * 0.8 + noise));
        data[i + 1] = Math.min(255, Math.max(0, baseG * (1 - noiseAmount * 0.8) + 128 * noiseAmount * 0.8 + noise));
        data[i + 2] = Math.min(255, Math.max(0, baseB * (1 - noiseAmount * 0.8) + 128 * noiseAmount * 0.8 + noise));
        data[i + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [step]);

  // Auto-play animation
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setStep((prev) => {
          if (prev >= maxSteps) {
            setIsPlaying(false);
            return maxSteps;
          }
          return prev + 1;
        });
      }, 600);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handlePlay = () => {
    setStep(0);
    setIsPlaying(true);
  };

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
        {/* Step indicator */}
        <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-[var(--bg)]/80 backdrop-blur-sm border border-[var(--border)]">
          <span className="font-mono text-xs text-[var(--fg)]">
            Step {step}/{maxSteps}
          </span>
        </div>
        {/* Noise removed indicator */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-3 right-3 px-2 py-1 rounded bg-[var(--success)]/20 border border-[var(--success)]/30"
        >
          <span className="text-xs text-[var(--success)]">
            {step > 0 ? `-${Math.round((step / maxSteps) * 100)}% noise` : "Pure noise"}
          </span>
        </motion.div>
      </div>

      {/* Step visualization */}
      <div className="mb-4 flex gap-1">
        {Array.from({ length: maxSteps + 1 }).map((_, i) => (
          <motion.div
            key={i}
            className={`flex-1 h-2 rounded-full ${
              i <= step ? "bg-[var(--success)]" : "bg-[var(--border)]"
            }`}
            animate={{ scale: i === step ? 1.2 : 1 }}
          />
        ))}
      </div>

      {/* Slider */}
      <div className="mb-4">
        <input
          type="range"
          min={0}
          max={maxSteps}
          value={step}
          onChange={(e) => {
            setIsPlaying(false);
            setStep(parseInt(e.target.value));
          }}
          className="w-full h-2 bg-[var(--border)] rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-[var(--success)]
            [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <div className="flex justify-between mt-1 text-xs text-[var(--fg-muted)]">
          <span>Noise</span>
          <span>Clean image</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="flex-1 px-4 py-2 rounded-lg bg-[var(--success)] text-white font-medium text-sm
            hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlaying ? "Denoising..." : "Play Reverse Process"}
        </button>
        <button
          onClick={() => { setIsPlaying(false); setStep(0); }}
          className="px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--fg-secondary)] text-sm
            hover:bg-[var(--bg-hover)] transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Model prediction explanation */}
      <motion.div
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]"
      >
        <p className="text-xs text-[var(--fg-muted)]">
          {step === 0 && "Starting with pure random noise..."}
          {step > 0 && step < maxSteps && (
            <>Model predicts noise to remove at step {step}. Each step reveals more of the image.</>
          )}
          {step === maxSteps && "Denoising complete! The model has revealed the final image."}
        </p>
      </motion.div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function NoiseSlider() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maxSteps = 8;

  // Generate procedural "image" with noise
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Create image data
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    // Noise amount based on step (reversed: 0 = full noise, 8 = clean)
    const noiseAmount = 1 - step / maxSteps;

    // Simple procedural "cat" pattern
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;

        // Create a simple gradient pattern as "base image"
        const cx = width / 2;
        const cy = height / 2;
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        const maxDist = Math.sqrt(cx ** 2 + cy ** 2);

        // Base colors (a warm sunset gradient)
        const baseR = Math.floor(255 - (dist / maxDist) * 100);
        const baseG = Math.floor(150 - (dist / maxDist) * 80 + Math.sin(y / 10) * 30);
        const baseB = Math.floor(100 + (dist / maxDist) * 50);

        // Add some pattern
        const pattern = Math.sin(x / 15) * Math.cos(y / 15) * 50;

        // Add noise
        const noise = (Math.random() - 0.5) * 255 * noiseAmount;

        // Blend
        data[i] = Math.min(255, Math.max(0, baseR + pattern + noise));
        data[i + 1] = Math.min(255, Math.max(0, baseG + pattern + noise));
        data[i + 2] = Math.min(255, Math.max(0, baseB + pattern + noise));
        data[i + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [step]);

  // Auto-play animation
  useEffect(() => {
    if (isPlaying) {
      const id = setInterval(() => {
        setStep((prev) => {
          if (prev >= maxSteps) {
            setIsPlaying(false);
            clearInterval(id);
            return maxSteps;
          }
          return prev + 1;
        });
      }, 400);
      intervalRef.current = id;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  const handlePlay = () => {
    setStep(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStep(0);
  };

  return (
    <div className="w-full max-w-md">
      {/* Canvas display */}
      <div className="relative mb-6 rounded-lg overflow-hidden border border-[var(--border)]">
        <canvas
          ref={canvasRef}
          width={256}
          height={256}
          className="w-full aspect-square"
          style={{ imageRendering: "pixelated" }}
        />
        {/* Step indicator overlay */}
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-[var(--bg)]/80 backdrop-blur-sm border border-[var(--border)]">
          <span className="font-mono text-xs text-[var(--fg)]">
            Step {step}/{maxSteps}
          </span>
        </div>
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
            [&::-webkit-slider-thumb]:bg-[var(--fg)]
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110"
        />
        <div className="flex justify-between mt-2 text-xs text-[var(--fg-muted)]">
          <span>Pure noise</span>
          <span>Clean image</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="flex-1 px-4 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium text-sm
            hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlaying ? "Playing..." : "Play Animation"}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--fg-secondary)] text-sm
            hover:bg-[var(--bg-hover)] transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Explanation */}
      <motion.p
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 text-sm text-[var(--fg-muted)] text-center"
      >
        {step === 0 && "Starting with pure random noise..."}
        {step > 0 && step < maxSteps && `Removing noise... (${Math.round((step / maxSteps) * 100)}% complete)`}
        {step === maxSteps && "Image fully denoised!"}
      </motion.p>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function ForwardProcess() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maxSteps = 10;

  // Generate image with increasing noise
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    // Noise amount increases with step
    const noiseAmount = step / maxSteps;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;

        // Create a simple pattern as "base image" (a circle/sun with gradient)
        const cx = width / 2;
        const cy = height / 2;
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);

        // Base image: warm sunset colors with a sun
        let baseR, baseG, baseB;
        if (dist < 30) {
          // Sun
          baseR = 255;
          baseG = 220;
          baseB = 100;
        } else {
          // Sky gradient
          const t = y / height;
          baseR = Math.floor(255 - t * 100);
          baseG = Math.floor(150 - t * 50 + Math.sin(x / 20) * 20);
          baseB = Math.floor(200 + t * 55);
        }

        // Add noise based on step
        const noise = (Math.random() - 0.5) * 255 * noiseAmount;

        // Blend original with noise
        data[i] = Math.min(255, Math.max(0, baseR * (1 - noiseAmount) + 128 * noiseAmount + noise));
        data[i + 1] = Math.min(255, Math.max(0, baseG * (1 - noiseAmount) + 128 * noiseAmount + noise));
        data[i + 2] = Math.min(255, Math.max(0, baseB * (1 - noiseAmount) + 128 * noiseAmount + noise));
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
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handlePlay = () => {
    setStep(0);
    setIsPlaying(true);
  };

  const getStepLabel = () => {
    if (step === 0) return "Clean image (t=0)";
    if (step < maxSteps * 0.3) return "Slightly noisy";
    if (step < maxSteps * 0.6) return "Moderately noisy";
    if (step < maxSteps * 0.9) return "Very noisy";
    return "Pure noise (t=T)";
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
            t = {step}/{maxSteps}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-[var(--bg)]/80 backdrop-blur-sm border border-[var(--border)]">
          <span className="text-xs text-[var(--fg-muted)]">
            {getStepLabel()}
          </span>
        </div>
      </div>

      {/* Progress bar showing noise schedule */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-[var(--fg-muted)] mb-2">
          <span>Clean</span>
          <span>Noise added: {Math.round((step / maxSteps) * 100)}%</span>
          <span>Pure noise</span>
        </div>
        <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--success)] via-[var(--warning)] to-[var(--error)]"
            animate={{ width: `${(step / maxSteps) * 100}%` }}
          />
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
            [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="flex-1 px-4 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium text-sm
            hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlaying ? "Adding noise..." : "Play Forward Process"}
        </button>
        <button
          onClick={() => { setIsPlaying(false); setStep(0); }}
          className="px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--fg-secondary)] text-sm
            hover:bg-[var(--bg-hover)] transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Explanation */}
      <p className="mt-4 text-xs text-[var(--fg-muted)] text-center">
        During training, we add Gaussian noise step-by-step until the image becomes pure static.
      </p>
    </div>
  );
}

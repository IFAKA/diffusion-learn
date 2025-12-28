"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const prompts = [
  { text: "a red apple", color: [220, 50, 50], shape: "circle" },
  { text: "a blue square", color: [50, 100, 220], shape: "square" },
  { text: "a green triangle", color: [50, 180, 80], shape: "triangle" },
];

export function GuidanceDemo() {
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maxSteps = 8;

  // Generate image guided by prompt
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    const prompt = prompts[selectedPrompt];
    const noiseAmount = 1 - step / maxSteps;

    // Seeded random for consistent results
    const seed = 42 + selectedPrompt;
    const seededRandom = (i: number) => {
      const x = Math.sin(seed + i * 0.01) * 10000;
      return x - Math.floor(x);
    };

    const cx = width / 2;
    const cy = height / 2;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const pixelIndex = y * width + x;

        let isInShape = false;

        // Check if pixel is in shape based on prompt
        if (prompt.shape === "circle") {
          const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          isInShape = dist < 50;
        } else if (prompt.shape === "square") {
          isInShape = Math.abs(x - cx) < 40 && Math.abs(y - cy) < 40;
        } else if (prompt.shape === "triangle") {
          const relX = x - cx;
          const relY = y - cy + 30;
          isInShape = relY > 0 && relY < 60 && Math.abs(relX) < relY * 0.8;
        }

        let baseR, baseG, baseB;

        if (isInShape) {
          [baseR, baseG, baseB] = prompt.color;
        } else {
          // Background
          baseR = 240;
          baseG = 240;
          baseB = 245;
        }

        // Add noise
        const noise = (seededRandom(pixelIndex) - 0.5) * 255 * noiseAmount;

        data[i] = Math.min(255, Math.max(0, baseR * (1 - noiseAmount * 0.9) + 128 * noiseAmount * 0.9 + noise));
        data[i + 1] = Math.min(255, Math.max(0, baseG * (1 - noiseAmount * 0.9) + 128 * noiseAmount * 0.9 + noise));
        data[i + 2] = Math.min(255, Math.max(0, baseB * (1 - noiseAmount * 0.9) + 128 * noiseAmount * 0.9 + noise));
        data[i + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [step, selectedPrompt]);

  // Auto-play animation
  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setStep((prev) => {
          if (prev >= maxSteps) {
            setIsGenerating(false);
            return maxSteps;
          }
          return prev + 1;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handleGenerate = () => {
    setStep(0);
    setIsGenerating(true);
  };

  return (
    <div className="w-full max-w-md">
      {/* Prompt selector */}
      <div className="mb-4">
        <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-2">
          Select a prompt
        </div>
        <div className="flex gap-2">
          {prompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedPrompt(i);
                setStep(0);
                setIsGenerating(false);
              }}
              className={`flex-1 px-3 py-2 rounded-lg text-xs transition-colors ${
                i === selectedPrompt
                  ? "bg-[var(--fg)] text-[var(--bg)]"
                  : "bg-[var(--bg-secondary)] text-[var(--fg-secondary)] hover:bg-[var(--bg-hover)]"
              }`}
            >
              &quot;{prompt.text}&quot;
            </button>
          ))}
        </div>
      </div>

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
      </div>

      {/* Guidance visualization */}
      <div className="mb-4 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div
              className="w-8 h-8 rounded"
              style={{ backgroundColor: `rgb(${prompts[selectedPrompt].color.join(",")})` }}
            />
          </div>
          <div className="flex-1">
            <div className="text-xs text-[var(--fg-muted)]">Text guidance:</div>
            <div className="text-sm text-[var(--fg)] font-medium">
              &quot;{prompts[selectedPrompt].text}&quot;
            </div>
          </div>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <svg className="w-5 h-5 text-[var(--success)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full px-4 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium text-sm
          hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? "Generating..." : "Generate with Text Guidance"}
      </button>

      {/* Explanation */}
      <p className="mt-4 text-xs text-[var(--fg-muted)] text-center">
        Same starting noise produces different images based on the text prompt.
        The prompt &quot;steers&quot; the denoising toward matching images.
      </p>
    </div>
  );
}

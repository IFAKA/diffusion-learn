"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function TeacherStudentDemo() {
  const [mode, setMode] = useState<"teacher" | "student">("teacher");
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const teacherSteps = 50;
  const studentSteps = 8;
  const maxSteps = mode === "teacher" ? teacherSteps : studentSteps;

  // Draw image based on denoising progress
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const progress = step / maxSteps;
    const noiseAmount = 1 - progress;

    // Seeded random
    const seed = 42;
    const seededRandom = (i: number) => {
      const x = Math.sin(seed + i * 0.01) * 10000;
      return x - Math.floor(x);
    };

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = y * width + x;

        // Target: mountain landscape
        const mountainHeight = 80 + Math.sin(x / 30) * 20 + Math.cos(x / 15) * 15;
        const isMountain = y > height - mountainHeight;
        const isSky = !isMountain;
        const isSun = Math.sqrt((x - 180) ** 2 + (y - 50) ** 2) < 25;

        let r, g, b;

        if (isSun) {
          r = 255;
          g = 220;
          b = 100;
        } else if (isSky) {
          // Gradient sky
          const t = y / (height - mountainHeight);
          r = 135 + t * 50;
          g = 180 + t * 30;
          b = 230;
        } else {
          // Mountain
          const shade = 1 - (y - (height - mountainHeight)) / mountainHeight * 0.3;
          r = 80 * shade;
          g = 100 * shade;
          b = 80 * shade;
        }

        // Add noise
        const noise = (seededRandom(i) - 0.5) * 255 * noiseAmount;
        r = Math.min(255, Math.max(0, r * (1 - noiseAmount * 0.8) + 128 * noiseAmount * 0.8 + noise));
        g = Math.min(255, Math.max(0, g * (1 - noiseAmount * 0.8) + 128 * noiseAmount * 0.8 + noise));
        b = Math.min(255, Math.max(0, b * (1 - noiseAmount * 0.8) + 128 * noiseAmount * 0.8 + noise));

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, [step, maxSteps, mode]);

  // Animation
  useEffect(() => {
    if (isRunning) {
      const stepDelay = mode === "teacher" ? 50 : 200;
      const interval = setInterval(() => {
        setStep((prev) => {
          if (prev >= maxSteps) {
            setIsRunning(false);
            return maxSteps;
          }
          return prev + 1;
        });
      }, stepDelay);
      return () => clearInterval(interval);
    }
  }, [isRunning, maxSteps, mode]);

  const handleRun = () => {
    setStep(0);
    setIsRunning(true);
  };

  const getElapsedTime = () => {
    // Simulated time based on steps
    const timePerStep = mode === "teacher" ? 0.2 : 0.1; // seconds
    return (step * timePerStep).toFixed(1);
  };

  return (
    <div className="w-full max-w-lg">
      {/* Mode toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setMode("teacher"); setStep(0); setIsRunning(false); }}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "teacher"
              ? "bg-[var(--warning)] text-white"
              : "bg-[var(--bg-secondary)] text-[var(--fg-secondary)] hover:bg-[var(--bg-hover)]"
          }`}
        >
          Teacher (50 steps)
        </button>
        <button
          onClick={() => { setMode("student"); setStep(0); setIsRunning(false); }}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "student"
              ? "bg-[var(--success)] text-white"
              : "bg-[var(--bg-secondary)] text-[var(--fg-secondary)] hover:bg-[var(--bg-hover)]"
          }`}
        >
          Student (8 steps)
        </button>
      </div>

      {/* Canvas */}
      <div className="relative mb-4 rounded-lg overflow-hidden border border-[var(--border)]">
        <canvas ref={canvasRef} width={256} height={192} className="w-full" />
        {/* Overlay info */}
        <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-[var(--bg)]/80 backdrop-blur-sm border border-[var(--border)]">
          <span className="font-mono text-xs text-[var(--fg)]">
            Step {step}/{maxSteps}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-[var(--bg)]/80 backdrop-blur-sm border border-[var(--border)]">
          <span className="font-mono text-xs text-[var(--fg)]">
            {getElapsedTime()}s
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
          <motion.div
            className="h-full"
            style={{
              width: `${(step / maxSteps) * 100}%`,
              backgroundColor: mode === "teacher" ? "var(--warning)" : "var(--success)",
            }}
          />
        </div>
      </div>

      {/* Run button */}
      <button
        onClick={handleRun}
        disabled={isRunning}
        className="w-full px-4 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium text-sm
          hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRunning ? `Running ${mode}...` : `Run ${mode === "teacher" ? "Teacher" : "Student"}`}
      </button>

      {/* Comparison stats */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className={`p-3 rounded-lg border ${mode === "teacher" ? "border-[var(--warning)]" : "border-[var(--border)]"}`}>
          <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-1">Teacher</div>
          <div className="text-lg font-bold text-[var(--warning)]">50 steps</div>
          <div className="text-xs text-[var(--fg-muted)]">~10 seconds</div>
        </div>
        <div className={`p-3 rounded-lg border ${mode === "student" ? "border-[var(--success)]" : "border-[var(--border)]"}`}>
          <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-1">Student</div>
          <div className="text-lg font-bold text-[var(--success)]">8 steps</div>
          <div className="text-xs text-[var(--fg-muted)]">~0.8 seconds</div>
        </div>
      </div>

      {/* Note */}
      <p className="mt-4 text-xs text-[var(--fg-muted)] text-center">
        The student learns to match teacher quality in 6× fewer steps through distillation.
      </p>
    </div>
  );
}

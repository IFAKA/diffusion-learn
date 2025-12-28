"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function DecoderDemo() {
  const [isDecoding, setIsDecoding] = useState(false);
  const [progress, setProgress] = useState(0);
  const latentCanvasRef = useRef<HTMLCanvasElement>(null);
  const outputCanvasRef = useRef<HTMLCanvasElement>(null);

  // Draw latent representation
  useEffect(() => {
    const canvas = latentCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // 4-channel latent visualization
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const r = Math.sin(x / 5 + y / 10) * 127 + 128;
        const g = Math.cos(x / 8 - y / 5) * 127 + 128;
        const b = Math.sin((x + y) / 7) * 127 + 128;
        const a = Math.cos((x - y) / 6) * 50 + 200;

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, []);

  // Draw output image progressively
  useEffect(() => {
    const canvas = outputCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, width, height);

    if (progress === 0) return;

    // Draw revealed portion
    const revealHeight = Math.floor(height * progress);

    for (let y = 0; y < revealHeight; y++) {
      for (let x = 0; x < width; x++) {
        // Generate a cat face
        const cx = width / 2;
        const cy = height / 2;
        const dist = Math.sqrt((x - cx) ** 2 + ((y - cy) * 1.1) ** 2);

        let r, g, b;

        if (dist < 90) {
          // Orange fur
          r = 230;
          g = 160;
          b = 100;

          // Eyes
          const leftEyeDist = Math.sqrt((x - (cx - 30)) ** 2 + (y - (cy - 15)) ** 2);
          const rightEyeDist = Math.sqrt((x - (cx + 30)) ** 2 + (y - (cy - 15)) ** 2);
          if (leftEyeDist < 12 || rightEyeDist < 12) {
            r = 50;
            g = 180;
            b = 80;
            // Pupil
            if (leftEyeDist < 5 || rightEyeDist < 5) {
              r = 20;
              g = 20;
              b = 20;
            }
          }

          // Nose
          const noseDist = Math.sqrt((x - cx) ** 2 + (y - (cy + 20)) ** 2);
          if (noseDist < 8) {
            r = 255;
            g = 150;
            b = 150;
          }

          // Mouth
          if (y > cy + 25 && y < cy + 35 && Math.abs(x - cx) < 20) {
            r = 180;
            g = 100;
            b = 80;
          }
        } else {
          // Background
          r = 200;
          g = 220;
          b = 240;
        }

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }

    // Draw decode line
    if (progress > 0 && progress < 1) {
      ctx.strokeStyle = "#00d084";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, revealHeight);
      ctx.lineTo(width, revealHeight);
      ctx.stroke();
    }
  }, [progress]);

  const runDecode = async () => {
    setIsDecoding(true);
    setProgress(0);

    for (let i = 0; i <= 100; i += 2) {
      setProgress(i / 100);
      await new Promise((r) => setTimeout(r, 30));
    }

    setIsDecoding(false);
  };

  return (
    <div className="w-full max-w-lg">
      {/* Visualization */}
      <div className="flex items-center gap-4 mb-6">
        {/* Latent */}
        <div className="flex-1">
          <div className="text-xs text-[var(--fg-muted)] text-center mb-2">Latent (128×128×4)</div>
          <div className="aspect-square rounded-lg overflow-hidden border border-[var(--border)]">
            <canvas ref={latentCanvasRef} width={128} height={128} className="w-full h-full" />
          </div>
        </div>

        {/* Arrow */}
        <motion.div
          animate={{ x: isDecoding ? [0, 10, 0] : 0 }}
          transition={{ duration: 0.5, repeat: isDecoding ? Infinity : 0 }}
          className="flex flex-col items-center"
        >
          <div className="text-xs text-[var(--fg-muted)] mb-1">VAE Decode</div>
          <svg className="w-8 h-8 text-[var(--success)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <div className="text-xs text-[var(--success)]">8× upscale</div>
        </motion.div>

        {/* Output */}
        <div className="flex-1">
          <div className="text-xs text-[var(--fg-muted)] text-center mb-2">Output (1024×1024×3)</div>
          <div className="aspect-square rounded-lg overflow-hidden border border-[var(--border)]">
            <canvas ref={outputCanvasRef} width={256} height={256} className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-[var(--fg-muted)] mb-1">
          <span>Decoding progress</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
        <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[var(--success)]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Run button */}
      <button
        onClick={runDecode}
        disabled={isDecoding}
        className="w-full px-4 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium text-sm
          hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isDecoding ? "Decoding..." : "Run VAE Decoder"}
      </button>

      {/* Explanation */}
      <div className="mt-4 p-3 rounded-lg bg-[var(--bg)] border border-dashed border-[var(--border)]">
        <p className="text-xs text-[var(--fg-muted)] text-center">
          The VAE decoder is a neural network that learns to reconstruct high-resolution images
          from compressed latent representations. It&apos;s trained on millions of images.
        </p>
      </div>
    </div>
  );
}

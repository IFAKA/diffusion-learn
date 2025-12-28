"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

export function GaussianDemo() {
  const [samples, setSamples] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate Gaussian random number using Box-Muller transform
  const gaussianRandom = useCallback(() => {
    const u1 = Math.random();
    const u2 = Math.random();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  }, []);

  // Draw histogram
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#0a0a0a';
    ctx.fillRect(0, 0, width, height);

    if (samples.length === 0) {
      // Draw placeholder text
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--fg-muted').trim() || '#666';
      ctx.font = '12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('Generate samples to see distribution', width / 2, height / 2);
      return;
    }

    // Create histogram bins
    const numBins = 30;
    const bins = new Array(numBins).fill(0);
    const minVal = -4;
    const maxVal = 4;
    const binWidth = (maxVal - minVal) / numBins;

    samples.forEach(s => {
      const binIndex = Math.floor((s - minVal) / binWidth);
      if (binIndex >= 0 && binIndex < numBins) {
        bins[binIndex]++;
      }
    });

    const maxBin = Math.max(...bins);

    // Draw histogram bars
    const barWidth = width / numBins;
    const successColor = getComputedStyle(document.documentElement).getPropertyValue('--success').trim() || '#00d084';

    bins.forEach((count, i) => {
      const barHeight = (count / maxBin) * (height - 40);
      const x = i * barWidth;
      const y = height - barHeight - 20;

      ctx.fillStyle = successColor;
      ctx.globalAlpha = 0.7;
      ctx.fillRect(x + 1, y, barWidth - 2, barHeight);
    });

    ctx.globalAlpha = 1;

    // Draw bell curve overlay
    ctx.beginPath();
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--fg').trim() || '#fff';
    ctx.lineWidth = 2;

    for (let i = 0; i <= width; i++) {
      const x = minVal + (i / width) * (maxVal - minVal);
      // Gaussian PDF
      const y = Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
      const canvasY = height - 20 - (y * (height - 40) * 2.5);

      if (i === 0) {
        ctx.moveTo(i, canvasY);
      } else {
        ctx.lineTo(i, canvasY);
      }
    }
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--fg-muted').trim() || '#666';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('-3σ', width * 0.125, height - 5);
    ctx.fillText('0', width * 0.5, height - 5);
    ctx.fillText('+3σ', width * 0.875, height - 5);
  }, [samples]);

  const generateSamples = () => {
    setIsGenerating(true);
    setSamples([]);

    let count = 0;
    const totalSamples = 1000;
    const batchSize = 50;

    const addBatch = () => {
      const newSamples: number[] = [];
      for (let i = 0; i < batchSize && count < totalSamples; i++) {
        newSamples.push(gaussianRandom());
        count++;
      }
      setSamples(prev => [...prev, ...newSamples]);

      if (count < totalSamples) {
        requestAnimationFrame(addBatch);
      } else {
        setIsGenerating(false);
      }
    };

    addBatch();
  };

  const stats = {
    mean: samples.length > 0 ? samples.reduce((a, b) => a + b, 0) / samples.length : 0,
    std: samples.length > 0
      ? Math.sqrt(samples.reduce((sum, s) => sum + (s - samples.reduce((a, b) => a + b, 0) / samples.length) ** 2, 0) / samples.length)
      : 0,
  };

  return (
    <div className="w-full max-w-md">
      {/* Canvas */}
      <div className="mb-4 rounded-lg overflow-hidden border border-[var(--border)]">
        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          className="w-full"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-center">
          <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-1">Samples</div>
          <div className="font-mono text-lg text-[var(--fg)]">{samples.length}</div>
        </div>
        <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-center">
          <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-1">Mean</div>
          <div className="font-mono text-lg text-[var(--fg)]">{stats.mean.toFixed(3)}</div>
        </div>
        <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-center">
          <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-1">Std Dev</div>
          <div className="font-mono text-lg text-[var(--fg)]">{stats.std.toFixed(3)}</div>
        </div>
      </div>

      {/* Expected values */}
      <div className="mb-4 p-3 rounded-lg bg-[var(--bg)] border border-dashed border-[var(--border)]">
        <div className="text-xs text-[var(--fg-muted)] mb-2">Expected for standard Gaussian:</div>
        <div className="flex gap-4 text-xs font-mono">
          <span>Mean ≈ 0</span>
          <span>Std Dev ≈ 1</span>
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={generateSamples}
        disabled={isGenerating}
        className="w-full px-4 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium text-sm
          hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block w-4 h-4 border-2 border-[var(--bg)] border-t-transparent rounded-full"
            />
            Generating...
          </span>
        ) : (
          "Generate 1000 Samples"
        )}
      </button>

      {/* Explanation */}
      <p className="mt-4 text-xs text-[var(--fg-muted)] text-center">
        Gaussian (Normal) distribution: most values cluster around the mean, with fewer extreme values.
        This is the noise used in diffusion models.
      </p>
    </div>
  );
}

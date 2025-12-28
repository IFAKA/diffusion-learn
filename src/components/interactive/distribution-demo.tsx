"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

export function DistributionDemo() {
  const [teacherSamples, setTeacherSamples] = useState<number[]>([]);
  const [studentSamples, setStudentSamples] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const teacherCanvasRef = useRef<HTMLCanvasElement>(null);
  const studentCanvasRef = useRef<HTMLCanvasElement>(null);

  // Generate samples from a mixture of Gaussians (simulating image quality distribution)
  const generateTeacherSample = useCallback(() => {
    // Teacher produces high-quality outputs centered around 0.85
    const u1 = Math.random();
    const u2 = Math.random();
    const gaussian = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return Math.min(1, Math.max(0, 0.85 + gaussian * 0.08));
  }, []);

  const generateStudentSample = useCallback(() => {
    // Student tries to match teacher distribution
    const u1 = Math.random();
    const u2 = Math.random();
    const gaussian = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    // Slightly wider distribution, slightly lower mean
    return Math.min(1, Math.max(0, 0.82 + gaussian * 0.1));
  }, []);

  // Draw histogram on canvas
  const drawHistogram = useCallback((canvas: HTMLCanvasElement, samples: number[], color: string) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#0a0a0a';
    ctx.fillRect(0, 0, width, height);

    if (samples.length === 0) return;

    // Create bins
    const numBins = 20;
    const bins = new Array(numBins).fill(0);

    samples.forEach(s => {
      const binIndex = Math.min(numBins - 1, Math.floor(s * numBins));
      bins[binIndex]++;
    });

    const maxBin = Math.max(...bins);
    const barWidth = width / numBins;

    bins.forEach((count, i) => {
      const barHeight = maxBin > 0 ? (count / maxBin) * (height - 20) : 0;
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.7;
      ctx.fillRect(i * barWidth + 1, height - barHeight - 10, barWidth - 2, barHeight);
    });

    ctx.globalAlpha = 1;

    // Draw axis labels
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--fg-muted').trim() || '#666';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('0', 10, height - 2);
    ctx.fillText('Quality', width / 2, height - 2);
    ctx.fillText('1', width - 10, height - 2);
  }, []);

  useEffect(() => {
    if (teacherCanvasRef.current) {
      drawHistogram(teacherCanvasRef.current, teacherSamples, '#ffd43b');
    }
  }, [teacherSamples, drawHistogram]);

  useEffect(() => {
    if (studentCanvasRef.current) {
      drawHistogram(studentCanvasRef.current, studentSamples, '#00d084');
    }
  }, [studentSamples, drawHistogram]);

  const generateSamples = async () => {
    setIsGenerating(true);
    setTeacherSamples([]);
    setStudentSamples([]);

    const totalSamples = 500;
    const batchSize = 25;

    for (let i = 0; i < totalSamples; i += batchSize) {
      const newTeacher: number[] = [];
      const newStudent: number[] = [];

      for (let j = 0; j < batchSize; j++) {
        newTeacher.push(generateTeacherSample());
        newStudent.push(generateStudentSample());
      }

      setTeacherSamples(prev => [...prev, ...newTeacher]);
      setStudentSamples(prev => [...prev, ...newStudent]);

      await new Promise(r => setTimeout(r, 50));
    }

    setIsGenerating(false);
  };

  const calcStats = (samples: number[]) => {
    if (samples.length === 0) return { mean: 0, std: 0 };
    const mean = samples.reduce((a, b) => a + b, 0) / samples.length;
    const std = Math.sqrt(samples.reduce((sum, s) => sum + (s - mean) ** 2, 0) / samples.length);
    return { mean, std };
  };

  const teacherStats = calcStats(teacherSamples);
  const studentStats = calcStats(studentSamples);

  return (
    <div className="w-full max-w-lg">
      {/* Histograms */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs text-[var(--warning)] uppercase tracking-wider mb-2 text-center">
            Teacher Distribution
          </div>
          <div className="rounded-lg overflow-hidden border border-[var(--border)]">
            <canvas ref={teacherCanvasRef} width={200} height={120} className="w-full" />
          </div>
        </div>
        <div>
          <div className="text-xs text-[var(--success)] uppercase tracking-wider mb-2 text-center">
            Student Distribution
          </div>
          <div className="rounded-lg overflow-hidden border border-[var(--border)]">
            <canvas ref={studentCanvasRef} width={200} height={120} className="w-full" />
          </div>
        </div>
      </div>

      {/* Stats comparison */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 rounded-lg bg-[var(--warning)]/10 border border-[var(--warning)]/30">
          <div className="text-xs text-[var(--fg-muted)]">Teacher</div>
          <div className="font-mono text-sm text-[var(--fg)]">
            μ = {teacherStats.mean.toFixed(3)} | σ = {teacherStats.std.toFixed(3)}
          </div>
        </div>
        <div className="p-3 rounded-lg bg-[var(--success)]/10 border border-[var(--success)]/30">
          <div className="text-xs text-[var(--fg-muted)]">Student</div>
          <div className="font-mono text-sm text-[var(--fg)]">
            μ = {studentStats.mean.toFixed(3)} | σ = {studentStats.std.toFixed(3)}
          </div>
        </div>
      </div>

      {/* KL divergence approximation */}
      {teacherSamples.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-center"
        >
          <div className="text-xs text-[var(--fg-muted)] mb-1">Distribution Match Score</div>
          <div className="text-2xl font-bold text-[var(--success)]">
            {Math.max(0, 100 - Math.abs(teacherStats.mean - studentStats.mean) * 200 - Math.abs(teacherStats.std - studentStats.std) * 500).toFixed(0)}%
          </div>
          <div className="text-xs text-[var(--fg-muted)] mt-1">
            Student matches teacher&apos;s output distribution
          </div>
        </motion.div>
      )}

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
            Generating {teacherSamples.length} samples...
          </span>
        ) : (
          "Generate 500 Samples"
        )}
      </button>

      {/* Explanation */}
      <p className="mt-4 text-xs text-[var(--fg-muted)] text-center">
        Distribution matching ensures the student produces the same <em>range</em> of outputs
        as the teacher—not just individual matches, but consistent overall quality.
      </p>
    </div>
  );
}

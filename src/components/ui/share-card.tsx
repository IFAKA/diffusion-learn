"use client";

import { useRef, useCallback } from "react";

interface ShareCardProps {
  stats: {
    strong: number;
    partial: number;
    weak: number;
  };
  totalChallenges: number;
}

export function ShareCard({ stats, totalChallenges }: ShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const width = 600;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    // Solid background
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, width, height);

    // Border
    ctx.strokeStyle = "#262626";
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, width - 1, height - 1);

    // Checkmark icon (simple circle with check)
    ctx.save();
    ctx.translate(width / 2, 65);

    // Circle
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 28, 0, Math.PI * 2);
    ctx.stroke();

    // Checkmark
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(-12, 0);
    ctx.lineTo(-4, 8);
    ctx.lineTo(14, -10);
    ctx.stroke();

    ctx.restore();

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Course Completed", width / 2, 130);

    // Subtitle
    ctx.fillStyle = "#666";
    ctx.font = "14px system-ui, -apple-system, sans-serif";
    ctx.fillText("Diffusion Models from Scratch", width / 2, 155);

    // Stats section
    const statsY = 190;
    const total = stats.strong + stats.partial + stats.weak;

    // Stats background
    ctx.fillStyle = "#141414";
    ctx.beginPath();
    ctx.roundRect(60, statsY, width - 120, 130, 8);
    ctx.fill();

    ctx.strokeStyle = "#262626";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Stats header
    ctx.fillStyle = "#888";
    ctx.font = "11px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${totalChallenges} CHALLENGES`, width / 2, statsY + 28);

    // Stats bars
    const barY = statsY + 50;
    const barWidth = 380;
    const barX = (width - barWidth) / 2;
    const barHeight = 20;

    // Background bar
    ctx.fillStyle = "#262626";
    ctx.beginPath();
    ctx.roundRect(barX, barY, barWidth, barHeight, 4);
    ctx.fill();

    // Strong segment
    const strongWidth = (stats.strong / total) * barWidth;
    if (strongWidth > 0) {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.roundRect(barX, barY, strongWidth, barHeight, stats.partial === 0 && stats.weak === 0 ? 4 : [4, 0, 0, 4]);
      ctx.fill();
    }

    // Partial segment
    const partialWidth = (stats.partial / total) * barWidth;
    if (partialWidth > 0) {
      ctx.fillStyle = "#888";
      ctx.fillRect(barX + strongWidth, barY, partialWidth, barHeight);
    }

    // Weak segment
    const weakWidth = (stats.weak / total) * barWidth;
    if (weakWidth > 0) {
      ctx.fillStyle = "#444";
      ctx.beginPath();
      ctx.roundRect(barX + strongWidth + partialWidth, barY, weakWidth, barHeight, stats.strong === 0 && stats.partial === 0 ? 4 : [0, 4, 4, 0]);
      ctx.fill();
    }

    // Legend
    const legendY = barY + 50;
    ctx.font = "12px system-ui, -apple-system, sans-serif";

    // Strong
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(barX + 6, legendY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#888";
    ctx.textAlign = "left";
    ctx.fillText(`${stats.strong} strong`, barX + 16, legendY + 4);

    // Partial
    ctx.fillStyle = "#888";
    ctx.beginPath();
    ctx.arc(barX + 130, legendY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#888";
    ctx.fillText(`${stats.partial} partial`, barX + 140, legendY + 4);

    // Weak
    ctx.fillStyle = "#444";
    ctx.beginPath();
    ctx.arc(barX + 250, legendY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#888";
    ctx.fillText(`${stats.weak} review`, barX + 260, legendY + 4);

    // Footer
    ctx.fillStyle = "#444";
    ctx.font = "11px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("diffusion-learn.vercel.app", width / 2, height - 25);

    return canvas;
  }, [stats, totalChallenges]);

  const downloadImage = useCallback(() => {
    const canvas = generateImage();
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "diffusion-course-complete.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [generateImage]);

  const shareToTwitter = useCallback(() => {
    const text = "i finally understand how AI generates images from text\n\nthis free course made everything click\n\ndiffusion-learn.vercel.app";
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
  }, []);

  const shareToLinkedIn = useCallback(() => {
    const text = "Finally had the aha moment for how AI image generation actually works.\n\nTook this free course on Diffusion Models and it all clicked.\n\nTokenization, embeddings, denoising - the whole pipeline finally makes sense.\n\nIf you're curious about how AI turns text into images, worth a look: diffusion-learn.vercel.app";
    navigator.clipboard.writeText(text).catch(() => {});
    window.open("https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent("https://diffusion-learn.vercel.app"), "_blank");
  }, []);

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex gap-2">
        {/* Twitter/X */}
        <button
          onClick={shareToTwitter}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--fg)] text-sm font-medium hover:bg-[var(--bg-elevated)] transition-colors"
          title="Downloads image + opens Twitter"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Twitter
        </button>

        {/* LinkedIn */}
        <button
          onClick={shareToLinkedIn}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--fg)] text-sm font-medium hover:bg-[var(--bg-elevated)] transition-colors"
          title="Downloads image + opens LinkedIn"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </button>

        {/* Download */}
        <button
          onClick={downloadImage}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--fg)] text-sm font-medium hover:bg-[var(--bg-elevated)] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Save
        </button>
      </div>

      <p className="text-[10px] text-[var(--fg-muted)] text-center">
        LinkedIn: text copied to clipboard, paste in your post
      </p>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Module } from "@/lib/lessons";
import { useProgress } from "@/lib/progress-context";

const icons: Record<string, React.ReactNode> = {
  eye: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  type: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  ),
  sparkles: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z" />
      <path d="M5 3L5.5 5L7 5.5L5.5 6L5 8L4.5 6L3 5.5L4.5 5L5 3Z" />
      <path d="M19 17L19.5 19L21 19.5L19.5 20L19 22L18.5 20L17 19.5L18.5 19L19 17Z" />
    </svg>
  ),
  cpu: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="15" x2="23" y2="15" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="15" x2="4" y2="15" />
    </svg>
  ),
  box: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  zap: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  puzzle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.452-.802-.932v-.464c0-1.105-.895-2-2-2s-2 .895-2 2v.465c0 .479-.332.86-.801.932a.98.98 0 0 1-.837-.276l-1.611-1.611a2.41 2.41 0 0 1-.706-1.704c0-.617.236-1.234.706-1.704l1.568-1.568c.23-.23.338-.556.289-.878-.06-.397-.293-.76-.603-.942C7.84 6.38 7.283 5.15 7.283 3.75V3.5a.5.5 0 0 1 .5-.5h8.434a.5.5 0 0 1 .5.5v.25c0 1.4-.557 2.63-1.517 3.158-.31.182-.543.545-.603.942z" />
    </svg>
  ),
};

interface ModuleCardProps {
  module: Module;
  index: number;
}

export function ModuleCard({ module, index }: ModuleCardProps) {
  const { isLessonCompleted } = useProgress();

  // Calculate module completion
  const completedInModule = Array.from({ length: module.lessonCount }, (_, i) =>
    isLessonCompleted(`${module.id}-${i + 1}`)
  ).filter(Boolean).length;

  const modulePercent = Math.round((completedInModule / module.lessonCount) * 100);
  const isCompleted = modulePercent === 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link href={`/learn/${module.id}`}>
        <div className="group relative p-6 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] transition-all duration-200">
          {/* Module number badge */}
          <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center">
            <span className="text-xs font-mono text-[var(--fg-muted)]">
              {module.id}
            </span>
          </div>

          {/* Completion badge */}
          {isCompleted && (
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--success)] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--bg)" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}

          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="w-10 h-10 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--fg-secondary)] group-hover:text-[var(--fg)] transition-colors">
              {icons[module.icon]}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-[var(--fg)] mb-1 group-hover:text-[var(--fg)] transition-colors">
                {module.title}
              </h3>
              <p className="text-sm text-[var(--fg-muted)] mb-3">
                {module.description}
              </p>

              {/* Progress bar */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1 bg-[var(--border)] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: isCompleted ? "var(--success)" : "var(--fg)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${modulePercent}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  />
                </div>
                <span className="text-xs font-mono text-[var(--fg-muted)] w-12 text-right">
                  {completedInModule}/{module.lessonCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Section } from "@/lib/types";
import { LoadingPlaceholder } from "@/components/ui/spinner";

const InteractiveWrapper = dynamic(
  () => import("@/components/interactive/interactive-wrapper").then(m => m.InteractiveWrapper),
  { loading: () => <LoadingPlaceholder />, ssr: false }
);

interface LessonSectionProps {
  section: Section;
  index: number;
}

export function LessonSection({ section, index }: LessonSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="mb-8"
    >
      {section.type === "text" && <TextSection content={section.content!} />}
      {section.type === "analogy" && (
        <AnalogySection title={section.title!} content={section.content!} />
      )}
      {section.type === "quickwin" && <QuickWinSection content={section.content!} />}
      {section.type === "code" && (
        <CodeSection
          title={section.title}
          code={section.code!}
        />
      )}
      {section.type === "interactive" && (
        <InteractiveSection
          component={section.component!}
          caption={section.caption}
        />
      )}
      {section.type === "diagram" && (
        <DiagramSection
          component={section.component!}
          caption={section.caption}
        />
      )}
    </motion.div>
  );
}

function TextSection({ content }: { content: string }) {
  return (
    <p className="text-[var(--fg-secondary)] leading-relaxed text-base">
      {content}
    </p>
  );
}

function AnalogySection({ title, content }: { title: string; content: string }) {
  return (
    <div className="relative pl-6 py-4 border-l-2 border-[var(--fg)]">
      <div className="absolute -left-2.5 top-4 w-5 h-5 rounded-full bg-[var(--bg)] border-2 border-[var(--fg)] flex items-center justify-center">
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-[var(--fg)]"
        >
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <h4 className="font-medium text-[var(--fg)] mb-2 text-sm uppercase tracking-wider">
        {title}
      </h4>
      <p className="text-[var(--fg-secondary)] leading-relaxed">{content}</p>
    </div>
  );
}

function QuickWinSection({ content }: { content: string }) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative p-6 rounded-xl bg-[var(--success)]/10 border border-[var(--success)]/30"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[var(--success)]/20 flex items-center justify-center flex-shrink-0">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--success)"
            strokeWidth="2"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <h4 className="font-medium text-[var(--success)] mb-1 text-sm uppercase tracking-wider">
            Quick Win
          </h4>
          <p className="text-[var(--fg)] leading-relaxed">{content}</p>
        </div>
      </div>
    </motion.div>
  );
}

function CodeSection({
  title,
  code,
}: {
  title?: string;
  code: string;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-[var(--border)]">
      {title && (
        <div className="px-4 py-2 bg-[var(--bg-elevated)] border-b border-[var(--border)]">
          <span className="text-sm text-[var(--fg-muted)]">{title}</span>
        </div>
      )}
      <pre className="p-4 bg-[var(--bg-secondary)] overflow-x-auto">
        <code className="text-sm font-mono text-[var(--fg-secondary)] leading-relaxed">
          {code}
        </code>
      </pre>
    </div>
  );
}

function InteractiveSection({
  component,
  caption,
}: {
  component: string;
  caption?: string;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="p-6 min-h-[200px] flex items-center justify-center">
        <InteractiveWrapper component={component} />
      </div>
      {caption && (
        <div className="px-4 py-3 bg-[var(--bg-elevated)] border-t border-[var(--border)]">
          <p className="text-sm text-[var(--fg-muted)] text-center">{caption}</p>
        </div>
      )}
    </div>
  );
}

function DiagramSection({
  component,
  caption,
}: {
  component: string;
  caption?: string;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="p-6 min-h-[150px] flex items-center justify-center">
        <InteractiveWrapper component={component} />
      </div>
      {caption && (
        <div className="px-4 py-3 bg-[var(--bg-elevated)] border-t border-[var(--border)]">
          <p className="text-sm text-[var(--fg-muted)] text-center">{caption}</p>
        </div>
      )}
    </div>
  );
}

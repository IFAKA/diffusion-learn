"use client";

import { Section } from "@/lib/types";
import { LessonSection } from "./lesson-section";

interface LessonContentProps {
  sections: Section[];
}

export default function LessonContent({ sections }: LessonContentProps) {
  return (
    <div className="space-y-6 mb-12">
      {sections.map((section, index) => (
        <LessonSection key={index} section={section} index={index} />
      ))}
    </div>
  );
}

// Shared types - no data, just type definitions

export interface Section {
  type: "text" | "analogy" | "interactive" | "code" | "quickwin" | "diagram";
  title?: string;
  content?: string;
  component?: string;
  code?: string;
  language?: string;
  caption?: string;
}

export interface Lesson {
  id: string;
  moduleId: number;
  lessonNumber: number;
  title: string;
  subtitle: string;
  estimatedTime: string;
  sections: Section[];
}

export interface Module {
  id: number;
  title: string;
  description: string;
  lessonCount: number;
  icon: string;
}

export type ChallengeType =
  | "predict"
  | "explain"
  | "identify"
  | "build"
  | "diagnose"
  | "recall";

export interface Choice {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface Challenge {
  id: string;
  type: ChallengeType;
  prompt: string;
  context?: string;
  choices?: Choice[];
  correctOrder?: string[];
  hints: string[];
  insight: string;
  modelAnswer?: string;
  misconceptions?: string[];
}

export interface ChallengeLesson {
  id: string;
  moduleId: number;
  lessonNumber: number;
  title: string;
  subtitle: string;
  challenges: Challenge[];
  transferQuestion?: Challenge;
}

export interface ChallengeModule {
  id: number;
  title: string;
  description: string;
  coreConcepts: string[];
}

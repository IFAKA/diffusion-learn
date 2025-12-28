// Core types used by content.ts and components

export interface Section {
  type: "text" | "analogy" | "interactive" | "code" | "quickwin" | "diagram";
  title?: string;
  content?: string;
  component?: string;
  code?: string;
  language?: string;
  caption?: string;
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

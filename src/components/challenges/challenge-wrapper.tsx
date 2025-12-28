"use client";

import { Challenge } from "@/lib/types";
import { PredictChallenge } from "./predict-challenge";
import { ExplainChallenge } from "./explain-challenge";
import { BuildChallenge } from "./build-challenge";

interface ChallengeWrapperProps {
  challenge: Challenge;
  onComplete: (understood: "yes" | "partial" | "no") => void;
}

export function ChallengeWrapper({ challenge, onComplete }: ChallengeWrapperProps) {
  switch (challenge.type) {
    case "predict":
    case "identify":
    case "diagnose":
      // All use multiple choice with reveal
      return <PredictChallenge challenge={challenge} onComplete={onComplete} />;

    case "explain":
      return <ExplainChallenge challenge={challenge} onComplete={onComplete} />;

    case "build":
      return <BuildChallenge challenge={challenge} onComplete={onComplete} />;

    case "recall":
      // Recall uses explain format
      return <ExplainChallenge challenge={challenge} onComplete={onComplete} />;

    default:
      return (
        <div className="text-center text-[var(--fg-muted)]">
          Unknown challenge type: {challenge.type}
        </div>
      );
  }
}

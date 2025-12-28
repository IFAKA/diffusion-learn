"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Each challenge has concepts with synonyms/alternatives for flexible matching
// Designed to be accessible for non-native English speakers
const challenges = [
  {
    target: "A red ball on green grass",
    concepts: [
      { name: "ball", words: ["ball", "sphere", "circle", "round"] },
      { name: "red", words: ["red"] },
      { name: "grass", words: ["grass", "ground", "floor", "field", "lawn", "garden"] },
      { name: "green", words: ["green"], optional: true },
    ],
    hints: ["What shape?", "What color?", "On what?"],
    illustration: "red-ball",
  },
  {
    target: "A black cat in a window with an orange sky",
    concepts: [
      { name: "cat", words: ["cat", "kitty", "kitten", "animal"] },
      { name: "black", words: ["black", "dark", "shadow", "silhouette"], optional: true },
      { name: "window", words: ["window", "glass", "inside", "house"] },
      { name: "orange/sunset", words: ["orange", "sunset", "sun", "yellow", "red", "warm", "evening", "afternoon"] },
      { name: "sky", words: ["sky", "outside", "background"], optional: true },
    ],
    hints: ["What animal?", "Where is it?", "What color is the sky?"],
    illustration: "cat-sunset",
  },
  {
    target: "A snowman with a hat at night with stars",
    concepts: [
      { name: "snowman", words: ["snowman", "snow man", "snow", "white", "winter"] },
      { name: "hat", words: ["hat", "cap", "head"] },
      { name: "night", words: ["night", "dark", "evening", "black sky", "blue"] },
      { name: "stars", words: ["stars", "star", "lights", "dots", "sky"] },
    ],
    hints: ["What is it made of?", "What is on its head?", "Day or night?", "What is in the sky?"],
    illustration: "snowman-night",
  },
];

// SVG Illustrations for each challenge
function ChallengeIllustration({ type }: { type: string }) {
  switch (type) {
    case "red-ball":
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full">
          {/* Sky */}
          <rect x="0" y="0" width="200" height="70" fill="#87CEEB" />
          {/* Grass */}
          <rect x="0" y="70" width="200" height="50" fill="#228B22" />
          {/* Grass texture - fixed heights for consistent rendering */}
          <g stroke="#1a6b1a" strokeWidth="1">
            <line x1="10" y1="70" x2="10" y2="77" />
            <line x1="20" y1="70" x2="20" y2="79" />
            <line x1="30" y1="70" x2="30" y2="76" />
            <line x1="40" y1="70" x2="40" y2="78" />
            <line x1="50" y1="70" x2="50" y2="75" />
            <line x1="60" y1="70" x2="60" y2="79" />
            <line x1="70" y1="70" x2="70" y2="77" />
            <line x1="80" y1="70" x2="80" y2="76" />
            <line x1="90" y1="70" x2="90" y2="78" />
            <line x1="100" y1="70" x2="100" y2="75" />
            <line x1="110" y1="70" x2="110" y2="79" />
            <line x1="120" y1="70" x2="120" y2="76" />
            <line x1="130" y1="70" x2="130" y2="78" />
            <line x1="140" y1="70" x2="140" y2="77" />
            <line x1="150" y1="70" x2="150" y2="75" />
            <line x1="160" y1="70" x2="160" y2="79" />
            <line x1="170" y1="70" x2="170" y2="76" />
            <line x1="180" y1="70" x2="180" y2="78" />
            <line x1="190" y1="70" x2="190" y2="77" />
          </g>
          {/* Red ball with gradient */}
          <defs>
            <radialGradient id="ballGradient" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#ff6666" />
              <stop offset="100%" stopColor="#cc0000" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="65" r="25" fill="url(#ballGradient)" />
          {/* Ball shadow */}
          <ellipse cx="100" cy="92" rx="20" ry="5" fill="rgba(0,0,0,0.2)" />
        </svg>
      );

    case "cat-sunset":
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full">
          {/* Sunset sky gradient */}
          <defs>
            <linearGradient id="sunsetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="30%" stopColor="#e94560" />
              <stop offset="60%" stopColor="#ff6b35" />
              <stop offset="100%" stopColor="#ffd93d" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="200" height="120" fill="url(#sunsetGradient)" />
          {/* Sun */}
          <circle cx="150" cy="85" r="20" fill="#ffd93d" opacity="0.9" />
          {/* Window frame */}
          <rect x="20" y="30" width="120" height="85" fill="#4a4a4a" />
          <rect x="25" y="35" width="110" height="75" fill="url(#sunsetGradient)" />
          {/* Window cross */}
          <rect x="78" y="35" width="4" height="75" fill="#4a4a4a" />
          <rect x="25" y="70" width="110" height="4" fill="#4a4a4a" />
          {/* Windowsill */}
          <rect x="15" y="110" width="130" height="10" fill="#8b7355" />
          {/* Cat silhouette */}
          <g fill="#1a1a1a">
            {/* Body */}
            <ellipse cx="80" cy="100" rx="18" ry="12" />
            {/* Head */}
            <circle cx="65" cy="88" r="10" />
            {/* Ears */}
            <polygon points="58,80 55,70 62,78" />
            <polygon points="72,80 75,70 68,78" />
            {/* Tail */}
            <path d="M98,98 Q115,85 110,75" stroke="#1a1a1a" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      );

    case "snowman-night":
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full">
          {/* Night sky */}
          <rect x="0" y="0" width="200" height="120" fill="#1a1a3e" />
          {/* Stars - fixed positions for consistency */}
          <circle cx="20" cy="15" r="1.5" fill="white" />
          <circle cx="45" cy="30" r="1" fill="white" />
          <circle cx="70" cy="10" r="1.2" fill="white" />
          <circle cx="95" cy="25" r="1" fill="white" />
          <circle cx="120" cy="8" r="1.5" fill="white" />
          <circle cx="140" cy="35" r="1" fill="white" />
          <circle cx="160" cy="15" r="1.3" fill="white" />
          <circle cx="180" cy="28" r="1" fill="white" />
          <circle cx="35" cy="45" r="1" fill="white" />
          <circle cx="165" cy="50" r="1.2" fill="white" />
          <circle cx="55" cy="55" r="0.8" fill="white" />
          <circle cx="185" cy="42" r="1" fill="white" />
          {/* Snow ground */}
          <ellipse cx="100" cy="115" rx="100" ry="15" fill="#e8e8f0" />
          {/* Snowman body - bottom */}
          <circle cx="100" cy="90" r="25" fill="white" stroke="#d0d0d8" strokeWidth="1" />
          {/* Snowman body - middle */}
          <circle cx="100" cy="58" r="18" fill="white" stroke="#d0d0d8" strokeWidth="1" />
          {/* Snowman head */}
          <circle cx="100" cy="32" r="13" fill="white" stroke="#d0d0d8" strokeWidth="1" />
          {/* Top hat */}
          <rect x="88" y="8" width="24" height="16" fill="#1a1a1a" />
          <rect x="82" y="22" width="36" height="4" fill="#1a1a1a" />
          {/* Hat band */}
          <rect x="88" y="18" width="24" height="3" fill="#8b0000" />
          {/* Eyes */}
          <circle cx="94" cy="28" r="2" fill="#1a1a1a" />
          <circle cx="106" cy="28" r="2" fill="#1a1a1a" />
          {/* Carrot nose */}
          <polygon points="100,33 100,36 115,35" fill="#ff6b35" />
          {/* Smile */}
          <circle cx="92" cy="38" r="1" fill="#1a1a1a" />
          <circle cx="96" cy="40" r="1" fill="#1a1a1a" />
          <circle cx="100" cy="41" r="1" fill="#1a1a1a" />
          <circle cx="104" cy="40" r="1" fill="#1a1a1a" />
          <circle cx="108" cy="38" r="1" fill="#1a1a1a" />
          {/* Buttons */}
          <circle cx="100" cy="52" r="2" fill="#1a1a1a" />
          <circle cx="100" cy="62" r="2" fill="#1a1a1a" />
          <circle cx="100" cy="72" r="2" fill="#1a1a1a" />
          {/* Stick arms */}
          <line x1="118" y1="55" x2="145" y2="45" stroke="#5c4033" strokeWidth="3" strokeLinecap="round" />
          <line x1="82" y1="55" x2="55" y2="45" stroke="#5c4033" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    default:
      return null;
  }
}

interface Concept {
  name: string;
  words: string[];
  optional?: boolean;
}

interface MatchedConcept {
  name: string;
  matched: boolean;
  optional?: boolean;
}

export function PromptChallenge() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userPrompt, setUserPrompt] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [matchedConcepts, setMatchedConcepts] = useState<MatchedConcept[]>([]);

  const challenge = challenges[currentChallenge];

  // Concept-based scoring: check if user mentioned key concepts using synonyms
  const calculateScore = (): { score: number; concepts: MatchedConcept[] } => {
    const userText = userPrompt.toLowerCase();
    const results: MatchedConcept[] = [];

    // Check each concept
    challenge.concepts.forEach((concept: Concept) => {
      const matched = concept.words.some(word => {
        // Check for word boundary matches to avoid partial matches
        const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        return regex.test(userText);
      });
      results.push({ name: concept.name, matched, optional: concept.optional });
    });

    // Calculate score based on required concepts matched
    const requiredConcepts = results.filter(c => !c.optional);
    const optionalConcepts = results.filter(c => c.optional);

    const requiredMatches = requiredConcepts.filter(c => c.matched).length;
    const optionalMatches = optionalConcepts.filter(c => c.matched).length;

    // Required concepts are worth 90%, optional add bonus up to 10%
    const requiredScore = requiredConcepts.length > 0
      ? (requiredMatches / requiredConcepts.length) * 90
      : 90;
    const optionalScore = optionalConcepts.length > 0
      ? (optionalMatches / optionalConcepts.length) * 10
      : 0;

    return {
      score: Math.round(requiredScore + optionalScore),
      concepts: results,
    };
  };

  const handleCheck = () => {
    const result = calculateScore();
    setScore(result.score);
    setMatchedConcepts(result.concepts);
    setShowAnswer(true);
  };

  const handleNext = () => {
    setCurrentChallenge((prev) => (prev + 1) % challenges.length);
    setUserPrompt("");
    setShowAnswer(false);
    setScore(null);
    setMatchedConcepts([]);
  };

  return (
    <div className="w-full max-w-md">
      {/* Challenge display */}
      <div className="mb-6 p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
        <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-2">
          Describe this image precisely:
        </div>
        <div className="h-32 rounded-lg bg-[var(--bg)] border border-[var(--border)] overflow-hidden">
          <ChallengeIllustration type={challenge.illustration} />
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {challenge.hints.map((hint, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full bg-[var(--bg)] text-[var(--fg-muted)]">
              {hint}
            </span>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="mb-4">
        <textarea
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Write your prompt description..."
          className="w-full px-4 py-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]
            text-[var(--fg)] placeholder:text-[var(--fg-muted)] resize-none
            focus:outline-none focus:border-[var(--fg-muted)] transition-colors"
          rows={3}
          disabled={showAnswer}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {!showAnswer ? (
          <button
            onClick={handleCheck}
            disabled={!userPrompt.trim()}
            className="flex-1 px-4 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium text-sm
              hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check My Prompt
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 px-4 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium text-sm
              hover:opacity-90 transition-opacity"
          >
            Next Challenge
          </button>
        )}
      </div>

      {/* Result */}
      <AnimatePresence>
        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[var(--fg-secondary)]">Match score:</span>
              <span className={`text-lg font-mono font-bold ${
                score! >= 70 ? "text-[var(--success)]" :
                score! >= 40 ? "text-[var(--warning)]" : "text-[var(--error)]"
              }`}>
                {score}%
              </span>
            </div>

            {/* Concept breakdown */}
            <div className="mb-3">
              <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-2">
                Concepts detected:
              </div>
              <div className="flex flex-wrap gap-1">
                {matchedConcepts.map((concept, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                      concept.matched
                        ? "bg-[var(--success)]/20 text-[var(--success)]"
                        : concept.optional
                        ? "bg-[var(--fg-muted)]/10 text-[var(--fg-muted)]"
                        : "bg-[var(--error)]/20 text-[var(--error)]"
                    }`}
                  >
                    {concept.matched ? "✓" : concept.optional ? "○" : "✗"} {concept.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-xs text-[var(--fg-muted)] uppercase tracking-wider mb-1">
              Example description:
            </div>
            <p className="text-sm text-[var(--fg)] font-medium">
              &quot;{challenge.target}&quot;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress */}
      <div className="mt-4 flex justify-center gap-2">
        {challenges.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === currentChallenge ? "bg-[var(--fg)]" : "bg-[var(--border)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

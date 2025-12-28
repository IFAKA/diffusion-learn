"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    question: "What is the core insight behind diffusion models?",
    options: [
      "Generating images from scratch using rules",
      "Learning to remove noise is easier than creating from scratch",
      "Using GANs to create realistic images",
      "Compressing images into smaller representations",
    ],
    correct: 1,
    explanation: "Diffusion models learn to denoise images step by step, which is mathematically tractable and produces high-quality results.",
  },
  {
    question: "What is the purpose of the VAE in the pipeline?",
    options: [
      "To generate random noise",
      "To encode text prompts",
      "To compress images for efficient processing",
      "To add color to images",
    ],
    correct: 2,
    explanation: "The VAE compresses images to a smaller latent space, making self-attention computationally feasible.",
  },
  {
    question: "Why does Z-Image-Turbo not need CFG (Classifier-Free Guidance)?",
    options: [
      "It uses a different noise schedule",
      "The guidance is baked in during distillation",
      "It processes images at a higher resolution",
      "It uses a larger model",
    ],
    correct: 1,
    explanation: "Through distillation, Z-Image-Turbo learns to produce guided outputs without needing runtime CFG, saving compute.",
  },
  {
    question: "What does self-attention enable in image generation?",
    options: [
      "Faster noise removal",
      "Better text understanding",
      "Global coherence across the entire image",
      "Higher resolution outputs",
    ],
    correct: 2,
    explanation: "Self-attention allows each patch to consider all other patches, ensuring consistent style, colors, and structure across the image.",
  },
  {
    question: "How many denoising steps does Z-Image-Turbo use?",
    options: [
      "50 steps",
      "25 steps",
      "8 steps",
      "1 step",
    ],
    correct: 2,
    explanation: "Through distillation, Z-Image-Turbo achieves high quality in just 8 steps, compared to 50 in traditional models.",
  },
];

export function FinalQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (showExplanation) return;

    setSelectedAnswer(index);
    setShowExplanation(true);

    if (index === question.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="w-full max-w-md text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-6"
        >
          {percentage >= 80 ? (
            <div className="w-20 h-20 mx-auto rounded-full bg-[var(--success)] flex items-center justify-center">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          ) : (
            <div className="w-20 h-20 mx-auto rounded-full bg-[var(--warning)] flex items-center justify-center">
              <span className="text-3xl">📚</span>
            </div>
          )}
        </motion.div>

        <h3 className="text-2xl font-bold text-[var(--fg)] mb-2">
          {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good job!" : "Keep learning!"}
        </h3>

        <p className="text-[var(--fg-secondary)] mb-4">
          You scored {score} out of {questions.length} ({percentage}%)
        </p>

        <div className="w-full h-3 bg-[var(--border)] rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            style={{
              backgroundColor: percentage >= 80 ? "var(--success)" : percentage >= 60 ? "var(--warning)" : "var(--error)",
            }}
          />
        </div>

        <button
          onClick={handleRestart}
          className="px-6 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium text-sm
            hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-[var(--fg-muted)]">
          Question {currentQuestion + 1} of {questions.length}
        </span>
        <span className="text-sm text-[var(--success)]">
          Score: {score}
        </span>
      </div>

      <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-[var(--fg)]"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h3 className="text-lg font-medium text-[var(--fg)] mb-4">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-2 mb-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correct;
              const showResult = showExplanation;

              let bgColor = "var(--bg-secondary)";
              let borderColor = "var(--border)";

              if (showResult) {
                if (isCorrect) {
                  bgColor = "var(--success)";
                  borderColor = "var(--success)";
                } else if (isSelected && !isCorrect) {
                  bgColor = "var(--error)";
                  borderColor = "var(--error)";
                }
              } else if (isSelected) {
                borderColor = "var(--fg)";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                    showResult && (isCorrect || isSelected) ? "text-white" : "text-[var(--fg)]"
                  }`}
                  style={{
                    backgroundColor: showResult && (isCorrect || (isSelected && !isCorrect)) ? bgColor : "var(--bg-secondary)",
                    borderColor,
                  }}
                >
                  <span className="text-sm">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)] mb-4"
            >
              <p className="text-sm text-[var(--fg-secondary)]">
                {question.explanation}
              </p>
            </motion.div>
          )}

          {/* Next button */}
          {showExplanation && (
            <button
              onClick={handleNext}
              className="w-full px-4 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium text-sm
                hover:opacity-90 transition-opacity"
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

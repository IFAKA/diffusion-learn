"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Simplified tokenizer simulation
const vocabulary: Record<string, number> = {
  a: 64,
  the: 42,
  cat: 2857,
  dog: 2864,
  on: 319,
  in: 287,
  with: 411,
  wearing: 5765,
  sunglasses: 41031,
  beach: 8921,
  sunset: 18294,
  ocean: 8241,
  photo: 3428,
  realistic: 12847,
  of: 315,
  and: 290,
  red: 2266,
  blue: 4012,
  green: 4776,
  happy: 3772,
  sad: 6587,
  big: 1263,
  small: 1402,
  beautiful: 5765,
  mountain: 7834,
  forest: 6845,
  city: 1783,
  sky: 5765,
  clouds: 15887,
  tree: 3392,
  flower: 14314,
  bird: 5743,
  fish: 5765,
  horse: 8223,
  car: 1842,
  house: 2156,
  person: 2039,
  woman: 2308,
  man: 893,
  child: 2891,
};

function tokenize(text: string): { word: string; token: number }[] {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  return words.map((word) => ({
    word,
    token: vocabulary[word] || Math.floor(Math.random() * 40000) + 10000,
  }));
}

export function TokenizerDemo() {
  const [input, setInput] = useState("a cat wearing sunglasses");
  const tokens = useMemo(() => tokenize(input), [input]);

  return (
    <div className="w-full max-w-md">
      {/* Input field */}
      <div className="mb-6">
        <label className="block text-xs text-[var(--fg-muted)] mb-2 uppercase tracking-wider">
          Enter a prompt
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something..."
          className="w-full px-4 py-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]
            text-[var(--fg)] placeholder:text-[var(--fg-muted)]
            focus:outline-none focus:border-[var(--fg-muted)] transition-colors"
        />
      </div>

      {/* Tokens display */}
      <div className="mb-4">
        <label className="block text-xs text-[var(--fg-muted)] mb-3 uppercase tracking-wider">
          Tokens ({tokens.length})
        </label>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {tokens.map((t, i) => (
              <motion.div
                key={`${t.word}-${i}`}
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: i * 0.05 }}
                className="group relative"
              >
                <div className="px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)]
                  hover:border-[var(--fg-muted)] transition-colors cursor-default">
                  <span className="text-sm text-[var(--fg)]">{t.word}</span>
                </div>
                {/* Token ID tooltip */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100
                  transition-opacity pointer-events-none">
                  <span className="font-mono text-xs text-[var(--fg-muted)]">
                    {t.token}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Output array */}
      <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
        <label className="block text-xs text-[var(--fg-muted)] mb-2 uppercase tracking-wider">
          Token IDs
        </label>
        <code className="font-mono text-sm text-[var(--fg-secondary)] break-all">
          [{tokens.map((t) => t.token).join(", ")}]
        </code>
      </div>

      {/* Hint */}
      <p className="mt-4 text-xs text-[var(--fg-muted)] text-center">
        Hover over tokens to see their numeric IDs
      </p>
    </div>
  );
}

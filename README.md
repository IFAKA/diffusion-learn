# Diffusion Models: Active Learning Course

An interactive web app that teaches you how AI image generation (diffusion models) actually works. Built for people who learn by doing, not just reading.

## Why This Exists

Most ML explanations are either:
- Too simple: "AI learns from data" (useless)
- Too complex: Pages of math (overwhelming)

This course makes you **work before you get answers**. You predict, explain, build, and diagnose - then discover the concepts through your own reasoning.

## What You'll Learn

8 modules, ~80 challenges:

1. **The Big Picture** - Why AI image generation exists and how it works
2. **Text to Numbers** - How words become something a model can use
3. **The Diffusion Process** - How noise becomes images
4. **The Transformer** - The architecture that makes it work
5. **Latent Space** - Why we compress before generating
6. **Distillation** - How to make it fast (why Z-Image needs only 8 steps)
7. **Putting It Together** - The complete mental model
8. **Path to Contributing** - From understanding to building your own

## Features

- **Active learning**: Predict → Struggle → Discover → Verify
- **Spaced retrieval**: Review system that resurfaces concepts at optimal intervals
- **Progress tracking**: localStorage persistence, understanding scores
- **Accessible**: Keyboard navigation, screen reader support
- **No fluff**: Minimal design, focused on learning

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/diffusion-learn)

## Target Audience

- Web developers curious about ML
- Anyone who wants to understand diffusion models without a PhD
- People who learn better by doing than reading papers

## License

MIT

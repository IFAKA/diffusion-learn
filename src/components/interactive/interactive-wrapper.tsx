"use client";

import { useState, useEffect, ComponentType } from "react";

// Registry of lazy-loaded components
// To add a new component: add one line here
const registry: Record<string, () => Promise<{ default?: ComponentType; [key: string]: unknown }>> = {
  NoiseSlider: () => import("./noise-slider"),
  TokenizerDemo: () => import("./tokenizer-demo"),
  PipelineFlow: () => import("./pipeline-flow"),
  EmbeddingViz: () => import("./embedding-viz"),
  StepComparison: () => import("./step-comparison"),
  DiffusionDiagram: () => import("./diffusion-diagram"),
  TradeoffExplorer: () => import("./tradeoff-explorer"),
  FullPipeline: () => import("./full-pipeline"),
  PromptChallenge: () => import("./prompt-challenge"),
  TrainingDataDemo: () => import("./training-data-demo"),
  EncoderDemo: () => import("./encoder-demo"),
  BilingualDemo: () => import("./bilingual-demo"),
  ForwardProcess: () => import("./forward-process"),
  ReverseProcess: () => import("./reverse-process"),
  GaussianDemo: () => import("./gaussian-demo"),
  GuidanceDemo: () => import("./guidance-demo"),
  CFGDemo: () => import("./cfg-demo"),
  AttentionBasics: () => import("./attention-basics"),
  SelfAttentionViz: () => import("./self-attention-viz"),
  ArchitectureComparison: () => import("./architecture-comparison"),
  S3DiTDemo: () => import("./s3-dit-demo"),
  LatentViz: () => import("./latent-viz"),
  ComputeComparison: () => import("./compute-comparison"),
  DecoderDemo: () => import("./decoder-demo"),
  TeacherStudentDemo: () => import("./teacher-student-demo"),
  DistributionDemo: () => import("./distribution-demo"),
  DecoupledDemo: () => import("./decoupled-demo"),
  FinalQuiz: () => import("./final-quiz"),
};

type LoadState =
  | { status: "loading" }
  | { status: "loaded"; Component: ComponentType }
  | { status: "error" };

interface InteractiveWrapperProps {
  component: string;
}

export function InteractiveWrapper({ component }: InteractiveWrapperProps) {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let mounted = true;

    const loader = registry[component];
    if (!loader) {
      setState({ status: "error" });
      return;
    }

    loader()
      .then((module) => {
        if (!mounted) return;
        // Component is exported as named export matching the key
        const Component = module[component] as ComponentType | undefined;
        if (Component) {
          setState({ status: "loaded", Component });
        } else {
          setState({ status: "error" });
        }
      })
      .catch(() => {
        if (mounted) setState({ status: "error" });
      });

    return () => { mounted = false; };
  }, [component]);

  if (state.status === "loaded") {
    return <state.Component />;
  }

  if (state.status === "error") {
    return (
      <div className="w-full py-8 flex flex-col items-center justify-center gap-2 text-[var(--fg-muted)]">
        <span className="text-sm">Demo unavailable</span>
      </div>
    );
  }

  return (
    <div className="w-full py-8 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[var(--fg-muted)] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

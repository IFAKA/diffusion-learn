"use client";

import { useState, useEffect, ComponentType } from "react";

interface InteractiveWrapperProps {
  component: string;
}

type LoadState =
  | { status: "loading" }
  | { status: "loaded"; Component: ComponentType }
  | { status: "error" };

// Load component dynamically - only the requested one runs
async function loadComponent(name: string): Promise<ComponentType | null> {
  try {
    switch (name) {
      case "NoiseSlider": return (await import("./noise-slider")).NoiseSlider;
      case "TokenizerDemo": return (await import("./tokenizer-demo")).TokenizerDemo;
      case "PipelineFlow": return (await import("./pipeline-flow")).PipelineFlow;
      case "EmbeddingViz": return (await import("./embedding-viz")).EmbeddingViz;
      case "StepComparison": return (await import("./step-comparison")).StepComparison;
      case "DiffusionDiagram": return (await import("./diffusion-diagram")).DiffusionDiagram;
      case "TradeoffExplorer": return (await import("./tradeoff-explorer")).TradeoffExplorer;
      case "FullPipeline": return (await import("./full-pipeline")).FullPipeline;
      case "PromptChallenge": return (await import("./prompt-challenge")).PromptChallenge;
      case "TrainingDataDemo": return (await import("./training-data-demo")).TrainingDataDemo;
      case "EncoderDemo": return (await import("./encoder-demo")).EncoderDemo;
      case "BilingualDemo": return (await import("./bilingual-demo")).BilingualDemo;
      case "ForwardProcess": return (await import("./forward-process")).ForwardProcess;
      case "ReverseProcess": return (await import("./reverse-process")).ReverseProcess;
      case "GaussianDemo": return (await import("./gaussian-demo")).GaussianDemo;
      case "GuidanceDemo": return (await import("./guidance-demo")).GuidanceDemo;
      case "CFGDemo": return (await import("./cfg-demo")).CFGDemo;
      case "AttentionBasics": return (await import("./attention-basics")).AttentionBasics;
      case "SelfAttentionViz": return (await import("./self-attention-viz")).SelfAttentionViz;
      case "ArchitectureComparison": return (await import("./architecture-comparison")).ArchitectureComparison;
      case "S3DiTDemo": return (await import("./s3-dit-demo")).S3DiTDemo;
      case "LatentViz": return (await import("./latent-viz")).LatentViz;
      case "ComputeComparison": return (await import("./compute-comparison")).ComputeComparison;
      case "DecoderDemo": return (await import("./decoder-demo")).DecoderDemo;
      case "TeacherStudentDemo": return (await import("./teacher-student-demo")).TeacherStudentDemo;
      case "DistributionDemo": return (await import("./distribution-demo")).DistributionDemo;
      case "DecoupledDemo": return (await import("./decoupled-demo")).DecoupledDemo;
      case "FinalQuiz": return (await import("./final-quiz")).FinalQuiz;
      default: return null;
    }
  } catch {
    return null;
  }
}

export function InteractiveWrapper({ component }: InteractiveWrapperProps) {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  // Auto-load on mount
  useEffect(() => {
    let mounted = true;
    loadComponent(component).then((Comp) => {
      if (!mounted) return;
      if (Comp) {
        setState({ status: "loaded", Component: Comp });
      } else {
        setState({ status: "error" });
      }
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

  // Loading state
  return (
    <div className="w-full py-8 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[var(--fg-muted)] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

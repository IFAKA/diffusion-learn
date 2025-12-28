"use client";

import dynamic from "next/dynamic";

// Dynamically import interactive components
const NoiseSlider = dynamic(() => import("./noise-slider").then(m => m.NoiseSlider), {
  loading: () => <LoadingPlaceholder />,
});
const TokenizerDemo = dynamic(() => import("./tokenizer-demo").then(m => m.TokenizerDemo), {
  loading: () => <LoadingPlaceholder />,
});
const PipelineFlow = dynamic(() => import("./pipeline-flow").then(m => m.PipelineFlow), {
  loading: () => <LoadingPlaceholder />,
});
const EmbeddingViz = dynamic(() => import("./embedding-viz").then(m => m.EmbeddingViz), {
  loading: () => <LoadingPlaceholder />,
});
const StepComparison = dynamic(() => import("./step-comparison").then(m => m.StepComparison), {
  loading: () => <LoadingPlaceholder />,
});
const DiffusionDiagram = dynamic(() => import("./diffusion-diagram").then(m => m.DiffusionDiagram), {
  loading: () => <LoadingPlaceholder />,
});
const TradeoffExplorer = dynamic(() => import("./tradeoff-explorer").then(m => m.TradeoffExplorer), {
  loading: () => <LoadingPlaceholder />,
});
const FullPipeline = dynamic(() => import("./full-pipeline").then(m => m.FullPipeline), {
  loading: () => <LoadingPlaceholder />,
});

// New components
const PromptChallenge = dynamic(() => import("./prompt-challenge").then(m => m.PromptChallenge), {
  loading: () => <LoadingPlaceholder />,
});
const TrainingDataDemo = dynamic(() => import("./training-data-demo").then(m => m.TrainingDataDemo), {
  loading: () => <LoadingPlaceholder />,
});
const EncoderDemo = dynamic(() => import("./encoder-demo").then(m => m.EncoderDemo), {
  loading: () => <LoadingPlaceholder />,
});
const BilingualDemo = dynamic(() => import("./bilingual-demo").then(m => m.BilingualDemo), {
  loading: () => <LoadingPlaceholder />,
});
const ForwardProcess = dynamic(() => import("./forward-process").then(m => m.ForwardProcess), {
  loading: () => <LoadingPlaceholder />,
});
const ReverseProcess = dynamic(() => import("./reverse-process").then(m => m.ReverseProcess), {
  loading: () => <LoadingPlaceholder />,
});
const GaussianDemo = dynamic(() => import("./gaussian-demo").then(m => m.GaussianDemo), {
  loading: () => <LoadingPlaceholder />,
});
const GuidanceDemo = dynamic(() => import("./guidance-demo").then(m => m.GuidanceDemo), {
  loading: () => <LoadingPlaceholder />,
});
const CFGDemo = dynamic(() => import("./cfg-demo").then(m => m.CFGDemo), {
  loading: () => <LoadingPlaceholder />,
});
const AttentionBasics = dynamic(() => import("./attention-basics").then(m => m.AttentionBasics), {
  loading: () => <LoadingPlaceholder />,
});
const SelfAttentionViz = dynamic(() => import("./self-attention-viz").then(m => m.SelfAttentionViz), {
  loading: () => <LoadingPlaceholder />,
});
const ArchitectureComparison = dynamic(() => import("./architecture-comparison").then(m => m.ArchitectureComparison), {
  loading: () => <LoadingPlaceholder />,
});
const S3DiTDemo = dynamic(() => import("./s3-dit-demo").then(m => m.S3DiTDemo), {
  loading: () => <LoadingPlaceholder />,
});
const LatentViz = dynamic(() => import("./latent-viz").then(m => m.LatentViz), {
  loading: () => <LoadingPlaceholder />,
});
const ComputeComparison = dynamic(() => import("./compute-comparison").then(m => m.ComputeComparison), {
  loading: () => <LoadingPlaceholder />,
});
const DecoderDemo = dynamic(() => import("./decoder-demo").then(m => m.DecoderDemo), {
  loading: () => <LoadingPlaceholder />,
});
const TeacherStudentDemo = dynamic(() => import("./teacher-student-demo").then(m => m.TeacherStudentDemo), {
  loading: () => <LoadingPlaceholder />,
});
const DistributionDemo = dynamic(() => import("./distribution-demo").then(m => m.DistributionDemo), {
  loading: () => <LoadingPlaceholder />,
});
const DecoupledDemo = dynamic(() => import("./decoupled-demo").then(m => m.DecoupledDemo), {
  loading: () => <LoadingPlaceholder />,
});
const FinalQuiz = dynamic(() => import("./final-quiz").then(m => m.FinalQuiz), {
  loading: () => <LoadingPlaceholder />,
});

function LoadingPlaceholder() {
  return (
    <div className="w-full h-40 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[var(--fg-muted)] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// Placeholder for components not yet implemented
function ComingSoon({ name }: { name: string }) {
  return (
    <div className="w-full py-8 flex flex-col items-center justify-center gap-2 text-[var(--fg-muted)]">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span className="text-sm">{name}</span>
      <span className="text-xs opacity-60">Interactive demo</span>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMap: Record<string, React.ComponentType<any>> = {
  NoiseSlider,
  TokenizerDemo,
  PipelineFlow,
  EmbeddingViz,
  StepComparison,
  DiffusionDiagram,
  TradeoffExplorer,
  FullPipeline,
  // New components
  PromptChallenge,
  TrainingDataDemo,
  EncoderDemo,
  BilingualDemo,
  ForwardProcess,
  ReverseProcess,
  GaussianDemo,
  GuidanceDemo,
  CFGDemo,
  AttentionBasics,
  SelfAttentionViz,
  ArchitectureComparison,
  S3DiTDemo,
  LatentViz,
  ComputeComparison,
  DecoderDemo,
  TeacherStudentDemo,
  DistributionDemo,
  DecoupledDemo,
  FinalQuiz,
};

interface InteractiveWrapperProps {
  component: string;
}

export function InteractiveWrapper({ component }: InteractiveWrapperProps) {
  const Component = componentMap[component];

  if (!Component) {
    return <ComingSoon name={component} />;
  }

  return <Component />;
}

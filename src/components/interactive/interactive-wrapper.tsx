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

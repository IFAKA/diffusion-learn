export interface Section {
  type: "text" | "analogy" | "interactive" | "code" | "quickwin" | "diagram";
  title?: string;
  content?: string;
  component?: string;
  code?: string;
  language?: string;
  caption?: string;
}

export interface Lesson {
  id: string;
  moduleId: number;
  lessonNumber: number;
  title: string;
  subtitle: string;
  estimatedTime: string;
  sections: Section[];
}

export interface Module {
  id: number;
  title: string;
  description: string;
  lessonCount: number;
  icon: string;
}

export const modules: Module[] = [
  {
    id: 1,
    title: "The Big Picture",
    description: "What problem does AI image generation solve?",
    lessonCount: 5,
    icon: "eye",
  },
  {
    id: 2,
    title: "Text to Numbers",
    description: "How tokenization and embeddings work",
    lessonCount: 4,
    icon: "type",
  },
  {
    id: 3,
    title: "The Diffusion Process",
    description: "How noise becomes images",
    lessonCount: 5,
    icon: "sparkles",
  },
  {
    id: 4,
    title: "The Transformer",
    description: "The brain of the model",
    lessonCount: 4,
    icon: "cpu",
  },
  {
    id: 5,
    title: "The VAE",
    description: "Compression and decompression",
    lessonCount: 3,
    icon: "box",
  },
  {
    id: 6,
    title: "Distillation",
    description: "Why Z-Image is fast",
    lessonCount: 3,
    icon: "zap",
  },
  {
    id: 7,
    title: "Full Picture",
    description: "Putting it all together",
    lessonCount: 3,
    icon: "puzzle",
  },
];

export const TOTAL_LESSONS = modules.reduce((sum, m) => sum + m.lessonCount, 0);

export const lessons: Record<string, Lesson> = {
  // Module 1: The Big Picture
  "1-1": {
    id: "1-1",
    moduleId: 1,
    lessonNumber: 1,
    title: "The Problem",
    subtitle: "Why can't computers just draw?",
    estimatedTime: "2 min",
    sections: [
      {
        type: "analogy",
        title: "Imagine this scenario",
        content:
          "You're on a phone call with someone who's never seen a cat. You try to describe it: \"Four legs, fur, pointy ears, whiskers, a tail...\" They start drawing based on your words. The result? Probably not great.",
      },
      {
        type: "text",
        content:
          "This is exactly the challenge computers face. They don't \"see\" the world—they only understand numbers. So how do you go from \"a cat wearing sunglasses on a beach\" to actual pixels?",
      },
      {
        type: "interactive",
        component: "PromptChallenge",
        caption:
          "Try describing an image precisely enough for a computer to draw it",
      },
      {
        type: "text",
        content:
          "The traditional approach was to program explicit rules: \"If the text says 'cat', draw these specific shapes.\" But there are infinite ways to draw a cat. You'd need infinite rules.",
      },
      {
        type: "quickwin",
        content:
          "You now understand the core challenge: computers need a way to learn the mapping from text descriptions to images, not just follow fixed rules.",
      },
    ],
  },
  "1-2": {
    id: "1-2",
    moduleId: 1,
    lessonNumber: 2,
    title: "How Machines Learn",
    subtitle: "The training concept",
    estimatedTime: "2 min",
    sections: [
      {
        type: "analogy",
        title: "Think about art school",
        content:
          "How did you learn what a cat looks like? You saw thousands of cats—in real life, in photos, in drawings. Your brain built an internal model of \"cat-ness\" from all these examples.",
      },
      {
        type: "text",
        content:
          "AI image generators learn the same way. They're shown millions of image-text pairs: photos with captions, artwork with descriptions. Over time, they build a statistical model of what things look like.",
      },
      {
        type: "interactive",
        component: "TrainingDataDemo",
        caption: "See how a model learns from image-text pairs",
      },
      {
        type: "code",
        title: "The training data looks like this",
        language: "json",
        code: `{
  "image": "photo_001.jpg",
  "caption": "A golden retriever playing fetch in a park"
}
{
  "image": "photo_002.jpg",
  "caption": "Sunset over the ocean with orange clouds"
}
// ... millions more pairs`,
      },
      {
        type: "text",
        content:
          "The model never memorizes these images. Instead, it learns patterns: \"When text mentions 'sunset', the image usually has warm colors at the top.\" It learns to associate words with visual features.",
      },
      {
        type: "quickwin",
        content:
          "You now understand training data: models learn from millions of examples, building statistical associations between text and visual patterns.",
      },
    ],
  },
  "1-3": {
    id: "1-3",
    moduleId: 1,
    lessonNumber: 3,
    title: "The Clever Trick",
    subtitle: "Why removing noise is easier than creating from scratch",
    estimatedTime: "3 min",
    sections: [
      {
        type: "analogy",
        title: "The dirty window insight",
        content:
          "Imagine you have a dirty window. What's easier: cleaning the dirt off to reveal what's behind, or painting the view from scratch on a blank canvas?",
      },
      {
        type: "text",
        content:
          "Diffusion models use this exact insight. Instead of learning to generate images from nothing (incredibly hard), they learn to clean up noisy images (much easier).",
      },
      {
        type: "interactive",
        component: "NoiseSlider",
        caption:
          "Drag the slider to see how noise is progressively removed to reveal an image",
      },
      {
        type: "text",
        content:
          "The training process works backwards: take a clean image, add noise step by step until it's pure static, then train the model to reverse each step. The model learns: \"Given this noisy image, what should the slightly cleaner version look like?\"",
      },
      {
        type: "diagram",
        component: "DiffusionDiagram",
        caption: "The forward process adds noise, the model learns to reverse it",
      },
      {
        type: "quickwin",
        content:
          "You now understand diffusion's core insight: it's easier to learn denoising (cleanup) than generation (creation from scratch).",
      },
    ],
  },
  "1-4": {
    id: "1-4",
    moduleId: 1,
    lessonNumber: 4,
    title: "The Pipeline",
    subtitle: "Text → Numbers → Image",
    estimatedTime: "2 min",
    sections: [
      {
        type: "analogy",
        title: "It's like a recipe",
        content:
          "When you follow a recipe, you go: Recipe (text) → Gather ingredients → Cook → Dish. An image generator works similarly: Prompt (text) → Convert to numbers → Process through the model → Image.",
      },
      {
        type: "interactive",
        component: "PipelineFlow",
        caption: "See data flow through each stage of the pipeline",
      },
      {
        type: "text",
        content: "Here's what happens at each stage:",
      },
      {
        type: "code",
        title: "The pipeline stages",
        language: "text",
        code: `1. TOKENIZE: "a cat on a beach" → [1, 5847, 23, 1, 8921]
   (Words become number IDs)

2. ENCODE: [1, 5847, ...] → [[0.2, -0.5, 0.8, ...], ...]
   (IDs become meaning vectors)

3. DENOISE: Start with random noise, guided by the text vectors
   (8 steps of cleanup)

4. DECODE: Latent representation → RGB pixels
   (Decompress to actual image)`,
      },
      {
        type: "quickwin",
        content:
          "You now understand the data flow: text gets converted to numbers, which guide the denoising process, which produces an image.",
      },
    ],
  },
  "1-5": {
    id: "1-5",
    moduleId: 1,
    lessonNumber: 5,
    title: "Why Z-Image is Fast",
    subtitle: "The distillation shortcut",
    estimatedTime: "2 min",
    sections: [
      {
        type: "analogy",
        title: "The master chef shortcut",
        content:
          "A master chef (slow, meticulous) teaches a line cook (fast, efficient) to make the same dish. The line cook can't replicate every nuance, but gets 95% of the quality in 1/6 the time.",
      },
      {
        type: "text",
        content:
          "Traditional diffusion models need 50 denoising steps. That means running the neural network 50 times per image. Z-Image-Turbo uses only 8 steps—and produces nearly the same quality.",
      },
      {
        type: "interactive",
        component: "StepComparison",
        caption:
          "Compare 50-step vs 8-step generation (same prompt, same starting noise)",
      },
      {
        type: "text",
        content:
          "How? Through \"distillation\"—training a fast student model to match a slow teacher model. The student learns to take bigger steps, jumping from noisy to clean in fewer iterations.",
      },
      {
        type: "code",
        title: "Speed comparison",
        language: "text",
        code: `Standard model:  50 steps × 200ms = 10 seconds
Z-Image-Turbo:   8 steps × 100ms = 0.8 seconds

12x faster, 95% quality retention`,
      },
      {
        type: "quickwin",
        content:
          "You've completed Module 1! You now understand: the core challenge, how models learn, the denoising insight, the pipeline, and why Z-Image is fast.",
      },
    ],
  },

  // Module 2: Text to Numbers
  "2-1": {
    id: "2-1",
    moduleId: 2,
    lessonNumber: 1,
    title: "Words to Numbers",
    subtitle: "Tokenization basics",
    estimatedTime: "2 min",
    sections: [
      {
        type: "analogy",
        title: "Think of a library catalog",
        content:
          "Every book has a unique ID number (ISBN). When you search, the system uses IDs, not titles. Tokenization does the same: every word (or part of a word) gets a unique number.",
      },
      {
        type: "interactive",
        component: "TokenizerDemo",
        caption: "Type text and see it converted to tokens in real-time",
      },
      {
        type: "text",
        content:
          "But here's the twist: tokens aren't always full words. Common words like \"the\" get one token. Rare words get split into pieces. \"Photorealistic\" might become [\"photo\", \"real\", \"istic\"].",
      },
      {
        type: "code",
        title: "Tokenization example",
        language: "javascript",
        code: `// Input text
const prompt = "a cat wearing sunglasses"

// After tokenization
const tokens = [64, 2857, 5765, 41031]
// "a" → 64
// "cat" → 2857
// "wearing" → 5765
// "sunglasses" → 41031

// Vocabulary size: ~50,000 tokens`,
      },
      {
        type: "quickwin",
        content:
          "You now understand tokenization: text becomes a sequence of integer IDs from a fixed vocabulary.",
      },
    ],
  },
  "2-2": {
    id: "2-2",
    moduleId: 2,
    lessonNumber: 2,
    title: "Numbers with Meaning",
    subtitle: "What are embeddings?",
    estimatedTime: "3 min",
    sections: [
      {
        type: "analogy",
        title: "GPS coordinates for concepts",
        content:
          "Every city has GPS coordinates. Cities that are close geographically have similar coordinates. Embeddings work the same way: words with similar meanings have similar \"coordinates\" in a high-dimensional space.",
      },
      {
        type: "text",
        content:
          "Token IDs are just arbitrary numbers—they don't encode meaning. The ID for \"cat\" isn't mathematically close to \"kitten\". Embeddings fix this by mapping each token to a vector (list of numbers) where similar concepts cluster together.",
      },
      {
        type: "interactive",
        component: "EmbeddingViz",
        caption:
          "Explore how words cluster by meaning in embedding space (2D projection)",
      },
      {
        type: "code",
        title: "Embeddings in code",
        language: "javascript",
        code: `// Token ID is just an index
const catTokenId = 2857

// Embedding is a vector of ~768 numbers
const catEmbedding = [0.23, -0.87, 0.45, 0.12, ..., -0.33]
//                   768 dimensions

// Similar words have similar vectors
cosineSimilarity(catEmbed, kittenEmbed)  // 0.89 (high!)
cosineSimilarity(catEmbed, databaseEmbed) // 0.02 (low)`,
      },
      {
        type: "quickwin",
        content:
          "You now understand embeddings: vectors that encode meaning, where similar concepts are mathematically close.",
      },
    ],
  },
  "2-3": {
    id: "2-3",
    moduleId: 2,
    lessonNumber: 3,
    title: "The Text Encoder",
    subtitle: "Understanding context",
    estimatedTime: "2 min",
    sections: [
      {
        type: "analogy",
        title: "A translator who gets context",
        content:
          "Imagine a translator who doesn't just swap words, but understands the whole sentence. \"Bank\" means something different in \"river bank\" vs \"bank account\". The encoder figures this out.",
      },
      {
        type: "text",
        content:
          "The text encoder (usually T5 or CLIP) takes your tokenized prompt and produces contextualized embeddings. Each word's vector is influenced by the words around it.",
      },
      {
        type: "interactive",
        component: "EncoderDemo",
        caption: "See how context changes word representations",
      },
      {
        type: "code",
        title: "Context matters",
        language: "text",
        code: `Input: "a bright red apple on a table"

Without context (basic embeddings):
  "bright" → generic brightness vector
  "red" → generic red color vector
  "apple" → could be fruit or company

With encoder (contextualized):
  "bright" → intensity modifier for color
  "red" → specifically apple-red hue
  "apple" → definitely the fruit (table context)`,
      },
      {
        type: "quickwin",
        content:
          "You understand text encoders: they produce context-aware embeddings where each word's meaning is influenced by surrounding words.",
      },
    ],
  },
  "2-4": {
    id: "2-4",
    moduleId: 2,
    lessonNumber: 4,
    title: "Bilingual Magic",
    subtitle: "How it handles multiple languages",
    estimatedTime: "2 min",
    sections: [
      {
        type: "text",
        content:
          "Z-Image-Turbo can understand both English and Chinese prompts. How? The encoder was trained on text in both languages, learning that \"cat\" and \"猫\" should produce similar embeddings.",
      },
      {
        type: "analogy",
        title: "A bilingual librarian",
        content:
          "Imagine a librarian who can find the same book whether you ask in English or Chinese. They've learned that different words in different languages can mean the same thing.",
      },
      {
        type: "interactive",
        component: "BilingualDemo",
        caption: 'Compare embeddings for "cat" vs "猫"',
      },
      {
        type: "code",
        title: "Same meaning, different tokens",
        language: "javascript",
        code: `// Different tokens
tokenize("sunset over ocean")  // [18294, 962, 8241]
tokenize("海上日落")            // [45982, 23847]

// But similar embeddings after encoding!
encode("sunset over ocean")     // [0.82, -0.34, ...]
encode("海上日落")               // [0.79, -0.31, ...]
// Cosine similarity: 0.94`,
      },
      {
        type: "quickwin",
        content:
          "Module 2 complete! You understand: tokenization, embeddings, context-aware encoding, and multilingual support.",
      },
    ],
  },

  // Module 3: The Diffusion Process
  "3-1": {
    id: "3-1",
    moduleId: 3,
    lessonNumber: 1,
    title: "Forward Process",
    subtitle: "Adding noise step by step",
    estimatedTime: "2 min",
    sections: [
      {
        type: "analogy",
        title: "Photocopying a photocopy",
        content:
          "Remember making copies of copies? Each generation gets a bit more degraded. The forward process is similar: we add a tiny bit of random noise at each step until the image becomes pure static.",
      },
      {
        type: "interactive",
        component: "ForwardProcess",
        caption: "Watch an image get progressively noisier",
      },
      {
        type: "text",
        content:
          "This is how we create training data. We take millions of clean images, add noise in controlled steps, and save each intermediate result. The model then learns to reverse each step.",
      },
      {
        type: "code",
        title: "The math (simplified)",
        language: "python",
        code: `# At each step t, we add a bit of Gaussian noise
def add_noise(image, t):
    noise = random_gaussian(shape=image.shape)
    # alpha controls how much original image vs noise
    alpha = noise_schedule[t]  # decreases over time
    return sqrt(alpha) * image + sqrt(1 - alpha) * noise

# After ~1000 steps, image is pure noise
step_0:    clean image
step_100:  slightly fuzzy
step_500:  mostly noise, vague shapes
step_1000: pure random static`,
      },
      {
        type: "quickwin",
        content:
          "You understand the forward process: progressively adding noise creates the training targets for the model.",
      },
    ],
  },
  "3-2": {
    id: "3-2",
    moduleId: 3,
    lessonNumber: 2,
    title: "Reverse Process",
    subtitle: "Removing noise to reveal images",
    estimatedTime: "3 min",
    sections: [
      {
        type: "analogy",
        title: "Forensic photo restoration",
        content:
          "Crime scene investigators enhance blurry photos to reveal details. They use knowledge of how cameras work to reverse the blur. Diffusion models do the same: they learn how noise was added, then reverse it.",
      },
      {
        type: "text",
        content:
          "The model's job: given a noisy image and a text prompt, predict what the slightly cleaner version should look like. Repeat this 8-50 times, and you go from pure noise to a clean image.",
      },
      {
        type: "interactive",
        component: "ReverseProcess",
        caption: "Step through the denoising process one step at a time",
      },
      {
        type: "code",
        title: "Reverse process in code",
        language: "python",
        code: `def generate_image(prompt, num_steps=8):
    # Start with pure random noise
    image = random_noise(shape=(1024, 1024))

    # Text guides the denoising
    text_embedding = encode(prompt)

    # Denoise step by step
    for step in range(num_steps):
        # Model predicts the noise to remove
        predicted_noise = model(image, text_embedding, step)
        # Subtract predicted noise
        image = image - predicted_noise * step_size

    return image`,
      },
      {
        type: "quickwin",
        content:
          "You understand the reverse process: the model predicts and removes noise iteratively, guided by the text prompt.",
      },
    ],
  },
  "3-3": {
    id: "3-3",
    moduleId: 3,
    lessonNumber: 3,
    title: "The Math Intuition",
    subtitle: "Gaussian noise explained simply",
    estimatedTime: "2 min",
    sections: [
      {
        type: "analogy",
        title: "The bell curve of randomness",
        content:
          "If you measure the heights of 1000 random people, most cluster around average, with fewer very tall or very short people. This \"bell curve\" pattern is called Gaussian (or Normal) distribution.",
      },
      {
        type: "interactive",
        component: "GaussianDemo",
        caption: "Generate random noise and see its distribution",
      },
      {
        type: "text",
        content:
          "Why Gaussian? Because it's mathematically well-behaved. We can precisely calculate how much noise was added at each step, which helps the model learn to reverse it accurately.",
      },
      {
        type: "code",
        title: "Properties of Gaussian noise",
        language: "text",
        code: `Gaussian noise has nice properties:

1. PREDICTABLE: We know the exact distribution
   - Mean: 0 (centered)
   - Std dev: controlled by schedule

2. ADDITIVE: Adding two Gaussians = another Gaussian
   - Makes math tractable

3. REVERSIBLE: Given the noise schedule, we can
   calculate exact forward/reverse transitions

This is why diffusion works—the math is clean.`,
      },
      {
        type: "quickwin",
        content:
          "You understand why Gaussian noise: it has mathematical properties that make the forward and reverse processes tractable.",
      },
    ],
  },
  "3-4": {
    id: "3-4",
    moduleId: 3,
    lessonNumber: 4,
    title: "Text Guidance",
    subtitle: "How the prompt steers denoising",
    estimatedTime: "3 min",
    sections: [
      {
        type: "analogy",
        title: 'The "warmer/colder" game',
        content:
          "Remember the game where someone hides an object and says \"warmer\" or \"colder\" as you search? Text guidance works similarly: the prompt tells the model which direction to steer the denoising.",
      },
      {
        type: "text",
        content:
          "Without text guidance, denoising would produce random images—whatever patterns the model learned. The text embedding acts as a compass, pointing the denoising toward images that match the description.",
      },
      {
        type: "interactive",
        component: "GuidanceDemo",
        caption:
          "Same starting noise, different prompts → different images",
      },
      {
        type: "code",
        title: "How guidance works",
        language: "python",
        code: `def denoise_step(noisy_image, text_embed, step):
    # Without guidance: "what does ANY clean image look like?"
    unconditional = model(noisy_image, null_embed, step)

    # With guidance: "what does THIS SPECIFIC image look like?"
    conditional = model(noisy_image, text_embed, step)

    # Amplify the difference (CFG scale)
    guided = unconditional + scale * (conditional - unconditional)

    return guided`,
      },
      {
        type: "quickwin",
        content:
          "You understand text guidance: the prompt embedding steers the denoising toward images matching the description.",
      },
    ],
  },
  "3-5": {
    id: "3-5",
    moduleId: 3,
    lessonNumber: 5,
    title: "CFG Scale",
    subtitle: "The creativity vs accuracy dial",
    estimatedTime: "2 min",
    sections: [
      {
        type: "analogy",
        title: "How literally to follow instructions",
        content:
          'If you ask an artist for "a cat", they might paint anything from a photorealistic portrait to an abstract interpretation. CFG (Classifier-Free Guidance) scale controls how literally the model follows your prompt.',
      },
      {
        type: "interactive",
        component: "CFGDemo",
        caption: "Adjust CFG scale and see how outputs change",
      },
      {
        type: "text",
        content:
          "Low CFG (1-3): More creative, diverse outputs, might drift from prompt. High CFG (10-20): Strictly follows prompt, but can look \"overcooked\" or artificial. Sweet spot is usually 7-9.",
      },
      {
        type: "code",
        title: "CFG scale effects",
        language: "text",
        code: `CFG Scale Effects:

1.0  → Ignores prompt, random generation
3.0  → Loose adherence, very creative
7.0  → Balanced (default for most models)
12.0 → Strong adherence, less variety
20.0 → Over-saturated, artifacts likely

Z-Image-Turbo uses CFG=0 (!)
It was trained to not need CFG—the guidance
is "baked in" during distillation.`,
      },
      {
        type: "quickwin",
        content:
          "Module 3 complete! You understand the full diffusion process: forward noise addition, reverse denoising, Gaussian math, text guidance, and CFG scale.",
      },
    ],
  },

  // Module 4: The Transformer
  "4-1": {
    id: "4-1",
    moduleId: 4,
    lessonNumber: 1,
    title: "Attention Basics",
    subtitle: "What is attention?",
    estimatedTime: "2 min",
    sections: [
      {
        type: "analogy",
        title: "Highlighting a document",
        content:
          "When you read a long document, you don't treat every word equally. You highlight key parts and skim others. Attention does the same: it lets the model focus on relevant parts of the input.",
      },
      {
        type: "text",
        content:
          "For each position in the output, attention computes weights over the input: \"How much should I pay attention to each input element?\" High weights = high attention.",
      },
      {
        type: "interactive",
        component: "AttentionBasics",
        caption: "See which words attend to which in a sentence",
      },
      {
        type: "code",
        title: "Attention in pseudocode",
        language: "python",
        code: `def attention(query, keys, values):
    # How similar is query to each key?
    scores = dot_product(query, keys)  # shape: [num_keys]

    # Convert to probabilities (sum to 1)
    weights = softmax(scores)  # [0.1, 0.7, 0.1, 0.1]

    # Weighted sum of values
    output = sum(weights * values)

    return output

# "cat" might attend strongly to "fluffy" and "orange"
# but weakly to "the" and "on"`,
      },
      {
        type: "quickwin",
        content:
          "You understand attention: a mechanism that computes relevance weights between different parts of the input.",
      },
    ],
  },
  "4-2": {
    id: "4-2",
    moduleId: 4,
    lessonNumber: 2,
    title: "Self-Attention",
    subtitle: "How patches relate to each other",
    estimatedTime: "3 min",
    sections: [
      {
        type: "analogy",
        title: "Everyone looking at everyone",
        content:
          "Imagine a room where everyone can see everyone else, and they're all updating their opinions based on what others think. Self-attention lets every part of the image \"see\" every other part.",
      },
      {
        type: "text",
        content:
          "In image generation, the picture is divided into patches (like tiles). Self-attention lets each patch consider all other patches when deciding its final value. This creates global coherence.",
      },
      {
        type: "interactive",
        component: "SelfAttentionViz",
        caption: "Click a patch to see what it attends to",
      },
      {
        type: "code",
        title: "Self-attention for images",
        language: "python",
        code: `# Divide 1024x1024 image into 16x16 patches
# That's 64x64 = 4096 patches

def self_attention(patches):
    # Each patch creates query, key, value
    Q = linear_q(patches)  # "What am I looking for?"
    K = linear_k(patches)  # "What do I contain?"
    V = linear_v(patches)  # "What information do I offer?"

    # Every patch attends to every other patch
    attention_matrix = softmax(Q @ K.T)  # 4096 x 4096

    # Aggregate information
    output = attention_matrix @ V

    return output`,
      },
      {
        type: "text",
        content:
          "Why is this powerful? A patch showing a cat's ear can attend to the patch showing its body, learning they should have matching fur color. Without self-attention, patches would be processed independently, losing coherence.",
      },
      {
        type: "quickwin",
        content:
          "You understand self-attention: every patch considers every other patch, enabling global coherence in generated images.",
      },
    ],
  },
  "4-3": {
    id: "4-3",
    moduleId: 4,
    lessonNumber: 3,
    title: "DiT Architecture",
    subtitle: "Transformers for diffusion",
    estimatedTime: "2 min",
    sections: [
      {
        type: "analogy",
        title: "Assembly line vs all-in-one machine",
        content:
          "Old diffusion models (U-Net) were like an assembly line: process at different scales, then combine. DiT (Diffusion Transformer) is like an all-in-one machine: everything flows through the same transformer blocks.",
      },
      {
        type: "text",
        content:
          "DiT replaced the traditional U-Net architecture with pure transformers. Why? Transformers scale better—double the size, roughly double the quality. Plus, they're well-understood from language models.",
      },
      {
        type: "interactive",
        component: "ArchitectureComparison",
        caption: "Compare U-Net vs DiT architectures",
      },
      {
        type: "code",
        title: "DiT block",
        language: "python",
        code: `class DiTBlock:
    def forward(self, x, time_embed, text_embed):
        # 1. Self-attention (patches see each other)
        x = self_attention(x) + x

        # 2. Cross-attention (patches see text)
        x = cross_attention(x, text_embed) + x

        # 3. Feed-forward (process each patch)
        x = feed_forward(x) + x

        # Time embedding modulates everything
        # (model knows which denoising step it's on)
        return modulate(x, time_embed)`,
      },
      {
        type: "quickwin",
        content:
          "You understand DiT: a transformer-based architecture that replaced U-Net for better scaling and quality.",
      },
    ],
  },
  "4-4": {
    id: "4-4",
    moduleId: 4,
    lessonNumber: 4,
    title: "S3-DiT",
    subtitle: "Z-Image's single-stream approach",
    estimatedTime: "2 min",
    sections: [
      {
        type: "analogy",
        title: "Single conveyor belt",
        content:
          "Traditional models have separate conveyor belts for text, image semantics, and pixels. S3-DiT puts everything on ONE belt—text tokens, semantic tokens, and image tokens flow through together.",
      },
      {
        type: "text",
        content:
          "Z-Image uses S3-DiT (Scalable Single-Stream DiT). Instead of processing text and images separately then combining, it concatenates all tokens and processes them together. Fewer moving parts = faster.",
      },
      {
        type: "interactive",
        component: "S3DiTDemo",
        caption: "See how tokens flow through the single-stream architecture",
      },
      {
        type: "code",
        title: "Single-stream processing",
        language: "python",
        code: `# Traditional: separate streams
text_features = text_encoder(prompt)      # Stream 1
image_features = image_encoder(noisy)     # Stream 2
semantic = semantic_encoder(noisy)        # Stream 3
combined = complex_fusion(text, image, semantic)

# S3-DiT: single stream
tokens = concatenate([
    text_tokens,      # From prompt
    semantic_tokens,  # High-level meaning
    image_tokens      # Patch representations
])

# Everything processed together!
output = transformer(tokens)  # Single stream`,
      },
      {
        type: "quickwin",
        content:
          "Module 4 complete! You understand attention, self-attention, DiT architecture, and S3-DiT's single-stream approach.",
      },
    ],
  },

  // Module 5: The VAE
  "5-1": {
    id: "5-1",
    moduleId: 5,
    lessonNumber: 1,
    title: "Latent Space",
    subtitle: "Working in compressed form",
    estimatedTime: "2 min",
    sections: [
      {
        type: "analogy",
        title: "Sheet music vs audio",
        content:
          "Sheet music is a compressed representation of a song—it captures the essence in a fraction of the size. Musicians can reproduce the full audio from it. Latent space is like sheet music for images.",
      },
      {
        type: "text",
        content:
          "A 1024×1024 RGB image has ~3 million numbers. Processing that directly is expensive. The VAE compresses it to a 128×128 latent (about 49K numbers)—60× smaller while preserving essential information.",
      },
      {
        type: "interactive",
        component: "LatentViz",
        caption: "See an image compressed to latent space and back",
      },
      {
        type: "code",
        title: "Compression ratios",
        language: "text",
        code: `Original image:  1024 × 1024 × 3 = 3,145,728 values
Latent:          128 × 128 × 4   = 65,536 values

Compression: ~48× smaller!

The diffusion process happens entirely in latent space.
Only at the end do we decompress to pixels.`,
      },
      {
        type: "quickwin",
        content:
          "You understand latent space: a compressed representation where diffusion operates efficiently.",
      },
    ],
  },
  "5-2": {
    id: "5-2",
    moduleId: 5,
    lessonNumber: 2,
    title: "Why Latent?",
    subtitle: "Speed and memory benefits",
    estimatedTime: "2 min",
    sections: [
      {
        type: "analogy",
        title: "Editing a sketch vs a mural",
        content:
          "It's easier to edit a small sketch and then scale it up than to paint a huge mural directly. Working in latent space is like working on the sketch—same creative process, much less effort.",
      },
      {
        type: "text",
        content:
          "Self-attention compares every element to every other element. For a 1024×1024 image, that's 1M × 1M comparisons—impossible. For a 128×128 latent, it's only 16K × 16K—4000× fewer operations!",
      },
      {
        type: "interactive",
        component: "ComputeComparison",
        caption: "Compare compute requirements: pixel space vs latent space",
      },
      {
        type: "code",
        title: "The computational savings",
        language: "text",
        code: `Self-attention complexity: O(n²)

Pixel space (1024×1024 = 1M tokens):
  1M² = 1,000,000,000,000 operations 💀

Latent space (128×128 = 16K tokens):
  16K² = 262,144,000 operations ✓

That's 4,000× less compute per attention layer!

Plus: 48× less memory for activations
Plus: Fewer channels to process
Result: Feasible on consumer GPUs`,
      },
      {
        type: "quickwin",
        content:
          "You understand why latent space: it makes self-attention computationally tractable.",
      },
    ],
  },
  "5-3": {
    id: "5-3",
    moduleId: 5,
    lessonNumber: 3,
    title: "The Decoder",
    subtitle: "Back to pixels",
    estimatedTime: "2 min",
    sections: [
      {
        type: "analogy",
        title: "Unzipping a file",
        content:
          "When you unzip a file, you get back all the original data from the compressed version. The VAE decoder takes the latent representation and reconstructs a full-resolution image.",
      },
      {
        type: "interactive",
        component: "DecoderDemo",
        caption: "Watch the decoder expand latent space to full resolution",
      },
      {
        type: "text",
        content:
          "The decoder is a learned neural network—not a simple algorithm. It was trained on millions of images to learn how to reconstruct fine details from the compressed representation.",
      },
      {
        type: "code",
        title: "VAE encode/decode",
        language: "python",
        code: `# The full VAE pipeline
class VAE:
    def encode(self, image):
        # 1024×1024×3 → 128×128×4
        return self.encoder(image)

    def decode(self, latent):
        # 128×128×4 → 1024×1024×3
        return self.decoder(latent)

# In generation:
# 1. Start with noise in latent space
# 2. Denoise in latent space (all the diffusion magic)
# 3. Decode final latent to pixels
pixels = vae.decode(denoised_latent)`,
      },
      {
        type: "quickwin",
        content:
          "Module 5 complete! You understand VAEs: compression to latent space for efficient processing, then decoding back to pixels.",
      },
    ],
  },

  // Module 6: Distillation
  "6-1": {
    id: "6-1",
    moduleId: 6,
    lessonNumber: 1,
    title: "Teacher-Student",
    subtitle: "Learning to be fast",
    estimatedTime: "2 min",
    sections: [
      {
        type: "analogy",
        title: "Master chef to line cook",
        content:
          "A master chef takes an hour to make a perfect dish. They teach a line cook shortcuts—not every technique, but enough to make a 95% quality dish in 10 minutes. That's distillation.",
      },
      {
        type: "text",
        content:
          "The \"teacher\" is a slow 50-step model that produces high-quality images. The \"student\" learns to match the teacher's outputs but in only 8 steps. It learns to take bigger leaps per step.",
      },
      {
        type: "interactive",
        component: "TeacherStudentDemo",
        caption: "Compare teacher (slow) vs student (fast) outputs",
      },
      {
        type: "code",
        title: "Distillation training",
        language: "python",
        code: `# Teacher: slow but high quality
teacher_output = teacher.generate(prompt, steps=50)

# Student: trying to match teacher with fewer steps
student_output = student.generate(prompt, steps=8)

# Loss: how different is student from teacher?
loss = mse(student_output, teacher_output)

# Train student to minimize this difference
student.backward(loss)

# After training, student produces similar quality
# in 6× fewer steps!`,
      },
      {
        type: "quickwin",
        content:
          "You understand distillation basics: a fast student model learns to match a slow teacher model's outputs.",
      },
    ],
  },
  "6-2": {
    id: "6-2",
    moduleId: 6,
    lessonNumber: 2,
    title: "Distribution Matching",
    subtitle: "Learning the style, not the specifics",
    estimatedTime: "2 min",
    sections: [
      {
        type: "analogy",
        title: "Learning to cook \"in the style of\"",
        content:
          "You don't learn to replicate every dish a chef makes. You learn their style—their flavor profiles, techniques, presentation. Then you can make your own dishes in their style. That's distribution matching.",
      },
      {
        type: "text",
        content:
          "DMD (Distribution Matching Distillation) doesn't just match individual outputs. It ensures the student produces the same distribution of outputs as the teacher—same range of quality, diversity, and characteristics.",
      },
      {
        type: "interactive",
        component: "DistributionDemo",
        caption: "See how distribution matching ensures consistent quality",
      },
      {
        type: "code",
        title: "Distribution vs point matching",
        language: "text",
        code: `Point matching:
  "This specific image from teacher = this specific student output"
  Problem: Student might overfit to specific examples

Distribution matching:
  "The set of all teacher outputs ≈ the set of all student outputs"
  Benefit: Student learns the general capability

For the same prompt, teacher produces many valid images.
Student should be able to produce the same variety.`,
      },
      {
        type: "quickwin",
        content:
          "You understand distribution matching: learning to match the overall output distribution, not just specific examples.",
      },
    ],
  },
  "6-3": {
    id: "6-3",
    moduleId: 6,
    lessonNumber: 3,
    title: "Decoupled-DMD",
    subtitle: "Z-Image's specific technique",
    estimatedTime: "2 min",
    sections: [
      {
        type: "analogy",
        title: "Separating engine from steering",
        content:
          "In a car, the engine provides power and the steering provides direction. They work together but can be tuned separately. Decoupled-DMD separates the \"power\" (CFG augmentation) from the \"direction\" (distribution matching).",
      },
      {
        type: "text",
        content:
          "Traditional distillation ties CFG guidance into the training. Decoupled-DMD separates them: train the core ability separately from the guidance mechanism. This allows better optimization of each.",
      },
      {
        type: "interactive",
        component: "DecoupledDemo",
        caption: "Visualize how decoupling improves training",
      },
      {
        type: "code",
        title: "Decoupled-DMD components",
        language: "text",
        code: `Traditional DMD:
  loss = distribution_match + cfg_guided_match
  (Tangled together, hard to optimize)

Decoupled-DMD:
  1. CFG Augmentation (the "engine")
     - Teaches strong prompt following
     - Trained separately

  2. Distribution Matching (the "steering")
     - Ensures output diversity matches teacher
     - Trained separately

  3. DMDR bonus
     - Adds RL fine-tuning for aesthetics
     - Polishes final quality

Result: 8 steps, CFG=0, high quality`,
      },
      {
        type: "quickwin",
        content:
          "Module 6 complete! You understand why Z-Image is fast: distillation, distribution matching, and decoupled training.",
      },
    ],
  },

  // Module 7: Full Picture
  "7-1": {
    id: "7-1",
    moduleId: 7,
    lessonNumber: 1,
    title: "The Full Pipeline",
    subtitle: "End-to-end walkthrough",
    estimatedTime: "3 min",
    sections: [
      {
        type: "text",
        content:
          "Let's trace what happens when you type \"a cat wearing sunglasses on a beach\" and hit generate. Every concept we've learned comes together.",
      },
      {
        type: "interactive",
        component: "FullPipeline",
        caption: "Interactive: step through the complete generation process",
      },
      {
        type: "code",
        title: "Complete pipeline",
        language: "python",
        code: `def generate(prompt: str) -> Image:
    # STEP 1: Tokenization
    # "a cat wearing sunglasses" → [1, 5847, 5765, 41031]
    tokens = tokenizer.encode(prompt)

    # STEP 2: Text Encoding
    # Token IDs → contextual embeddings
    # Each token becomes a 768-dim vector
    text_embed = text_encoder(tokens)

    # STEP 3: Start with Noise
    # Random Gaussian noise in latent space
    latent = torch.randn(1, 4, 128, 128)

    # STEP 4: Iterative Denoising (8 steps)
    for step in range(8):
        # S3-DiT predicts noise to remove
        # Uses self-attention + cross-attention
        noise_pred = transformer(
            latent,
            text_embed,
            step
        )
        # Remove predicted noise
        latent = scheduler.step(latent, noise_pred, step)

    # STEP 5: VAE Decode
    # 128×128 latent → 1024×1024 RGB
    image = vae.decode(latent)

    return image`,
      },
      {
        type: "quickwin",
        content:
          "You can now trace the full pipeline: tokenize → encode → noise → denoise × 8 → decode.",
      },
    ],
  },
  "7-2": {
    id: "7-2",
    moduleId: 7,
    lessonNumber: 2,
    title: "Tradeoffs",
    subtitle: "Engineering decisions and their consequences",
    estimatedTime: "3 min",
    sections: [
      {
        type: "text",
        content:
          "Every design choice involves tradeoffs. Understanding them helps you appreciate why Z-Image works the way it does—and what alternatives exist.",
      },
      {
        type: "interactive",
        component: "TradeoffExplorer",
        caption: "Explore the tradeoff space: speed vs quality vs memory",
      },
      {
        type: "code",
        title: "Key tradeoffs",
        language: "text",
        code: `STEPS (8 vs 50)
├─ Fewer steps = faster generation
├─ Fewer steps = potentially lower quality
└─ Z-Image: Distillation recovers quality

MODEL SIZE (6B parameters)
├─ Larger = higher quality, more knowledge
├─ Larger = more memory, slower inference
└─ Z-Image: 6B fits in 16GB VRAM (sweet spot)

LATENT SIZE (128×128)
├─ Smaller = faster attention, less memory
├─ Smaller = less detail preserved
└─ Z-Image: Powerful decoder compensates

CFG SCALE (0 vs 7)
├─ Higher = better prompt following
├─ Higher = requires 2× compute (conditional + unconditional)
└─ Z-Image: CFG=0, guidance baked into distillation`,
      },
      {
        type: "quickwin",
        content:
          "You understand the tradeoff space: every choice optimizes for something at the cost of something else.",
      },
    ],
  },
  "7-3": {
    id: "7-3",
    moduleId: 7,
    lessonNumber: 3,
    title: "What's Next?",
    subtitle: "Future directions and your journey",
    estimatedTime: "2 min",
    sections: [
      {
        type: "text",
        content:
          "You now understand diffusion models deeply! Here's where the field is heading, and how you can continue learning.",
      },
      {
        type: "code",
        title: "Future research directions",
        language: "text",
        code: `1. FEWER STEPS
   Current: 8 steps
   Future: 1-4 steps with flow matching

2. SMALLER MODELS
   Current: 6B parameters
   Future: Mixture of Experts (activate only part)

3. ON-DEVICE
   Current: Needs GPU
   Future: Mobile-optimized architectures

4. VIDEO
   Current: Single images
   Future: Consistent video generation

5. 3D
   Current: 2D images
   Future: Native 3D object generation`,
      },
      {
        type: "text",
        content:
          "Your mental model is now solid. You can read ML papers about diffusion, understand architecture discussions, and appreciate engineering tradeoffs. The concepts will click.",
      },
      {
        type: "interactive",
        component: "FinalQuiz",
        caption: "Test your knowledge with a final quiz",
      },
      {
        type: "quickwin",
        content:
          "Congratulations! You've completed the course. You now understand diffusion models from first principles to implementation details.",
      },
    ],
  },
};

export function getLesson(moduleId: number, lessonId: number): Lesson | null {
  return lessons[`${moduleId}-${lessonId}`] || null;
}

export function getModule(moduleId: number): Module | null {
  return modules.find((m) => m.id === moduleId) || null;
}

export function getModuleLessons(moduleId: number): Lesson[] {
  return Object.values(lessons).filter((l) => l.moduleId === moduleId);
}

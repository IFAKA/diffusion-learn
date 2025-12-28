// GENERATED FILE - Do not edit directly
// Generated from lessons.ts and challenges.ts merge
// Run: npx tsx scripts/generate-unified-content.ts

import type { Section, Challenge } from "./types";

export interface Lesson {
  id: string;
  moduleId: number;
  lessonNumber: number;
  title: string;
  subtitle: string;
  estimatedTime?: string;
  sections: Section[];
  challenges: Challenge[];
  transferQuestion?: Challenge;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  lessonCount: number;
  icon: string;
  coreConcepts: string[];
}

export const modules: Module[] = [
  {
    "id": 1,
    "title": "The Big Picture",
    "description": "What problem does AI image generation solve?",
    "lessonCount": 5,
    "icon": "eye",
    "coreConcepts": [
      "Why rule-based image generation fails",
      "Why learning from data is necessary",
      "Why denoising is easier than generation",
      "The basic text→image pipeline",
      "Why fewer steps can still work (distillation)"
    ]
  },
  {
    "id": 2,
    "title": "Text to Numbers",
    "description": "How tokenization and embeddings work",
    "lessonCount": 4,
    "icon": "type",
    "coreConcepts": [
      "Why text must become numbers",
      "What embeddings represent",
      "Why context changes meaning"
    ]
  },
  {
    "id": 3,
    "title": "The Diffusion Process",
    "description": "How noise becomes images",
    "lessonCount": 5,
    "icon": "sparkles",
    "coreConcepts": [
      "Forward process: adding noise",
      "Reverse process: removing noise",
      "How text guides denoising",
      "The quality-diversity tradeoff (CFG)"
    ]
  },
  {
    "id": 4,
    "title": "The Transformer",
    "description": "The brain of the model",
    "lessonCount": 4,
    "icon": "cpu",
    "coreConcepts": [
      "What attention does",
      "Why self-attention matters for images",
      "How text and image interact"
    ]
  },
  {
    "id": 5,
    "title": "The VAE",
    "description": "Compression and decompression",
    "lessonCount": 3,
    "icon": "box",
    "coreConcepts": [
      "Why pixel space is too expensive",
      "What latent space preserves",
      "The encode-decode tradeoff"
    ]
  },
  {
    "id": 6,
    "title": "Distillation",
    "description": "Why Z-Image is fast",
    "lessonCount": 3,
    "icon": "zap",
    "coreConcepts": [
      "Teacher-student learning",
      "Quality-speed tradeoff",
      "Why Z-Image needs only 8 steps"
    ]
  },
  {
    "id": 7,
    "title": "Full Picture",
    "description": "Putting it all together",
    "lessonCount": 3,
    "icon": "puzzle",
    "coreConcepts": [
      "End-to-end pipeline understanding",
      "Where each component fits",
      "Tradeoffs in model design"
    ]
  },
  {
    "id": 8,
    "title": "Path to Contributing",
    "description": "From understanding to building",
    "lessonCount": 4,
    "icon": "book",
    "coreConcepts": [
      "Skills gap: concepts vs implementation",
      "Reading real model codebases",
      "Entry points for contribution",
      "Learning path for building your own"
    ]
  }
];

export const lessons: Record<string, Lesson> = {
  "1-1": {
    "id": "1-1",
    "moduleId": 1,
    "lessonNumber": 1,
    "title": "The Problem",
    "subtitle": "Why can't computers just draw?",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "analogy",
        "title": "Imagine this scenario",
        "content": "You're on a phone call with someone who's never seen a cat. You try to describe it: \"Four legs, fur, pointy ears, whiskers, a tail...\" They start drawing based on your words. The result? Probably not great."
      },
      {
        "type": "text",
        "content": "This is exactly the challenge computers face. They don't \"see\" the world—they only understand numbers. So how CAN a computer go from \"a cat wearing sunglasses on a beach\" to actual pixels? We'll answer this step by step."
      },
      {
        "type": "interactive",
        "component": "PromptChallenge",
        "caption": "Try describing an image precisely enough for a computer to draw it"
      },
      {
        "type": "text",
        "content": "The traditional approach was to program explicit rules: \"If the text says 'cat', draw these specific shapes.\" But there are infinite ways to draw a cat. You'd need infinite rules."
      },
      {
        "type": "quickwin",
        "content": "You now understand the core challenge: computers need a way to learn the mapping from text descriptions to images, not just follow fixed rules."
      }
    ],
    "challenges": [
      {
        "id": "1-1-1",
        "type": "predict",
        "prompt": "Try to write instructions for a robot to draw 'a cat wearing sunglasses on a beach'. Now imagine doing this for EVERY possible picture someone could ask for.",
        "context": "The robot has never seen a cat, a beach, or sunglasses before. You need to explain everything from scratch.",
        "hints": [
          "There are millions of different cats - fat cats, skinny cats, fluffy cats...",
          "A beach could look so many different ways too",
          "And that's just ONE picture. What about 'a dog playing chess in space'? Or 'a medieval knight eating pizza'?"
        ],
        "insight": "You'd be writing rules forever! There are endless ways to draw a cat, endless types of beaches, endless combinations. No matter how many instructions you write, someone can always ask for something new.",
        "misconceptions": [
          "You might think: just save a bunch of pictures and pick one! But what if someone asks for something you don't have saved?",
          "You might think: just describe how to draw each thing! But there are infinite ways to draw anything."
        ]
      },
      {
        "id": "1-1-2",
        "type": "identify",
        "prompt": "Which way could actually work to make a computer draw ANY picture you ask for?",
        "choices": [
          {
            "id": "a",
            "text": "Save millions of pictures and search for the right one",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Write step-by-step drawing instructions for every object",
            "isCorrect": false
          },
          {
            "id": "c",
            "text": "Show the computer millions of examples so it learns the patterns itself",
            "isCorrect": true
          },
          {
            "id": "d",
            "text": "Hire artists to draw pictures when people ask",
            "isCorrect": false
          }
        ],
        "hints": [
          "What if someone asks for a picture that was never saved?",
          "Could you really write instructions for EVERY possible thing?"
        ],
        "insight": "The only way that works is letting the computer LEARN from examples - just like how you learned what a cat looks like by seeing lots of cats! The computer looks at millions of pictures with descriptions and figures out the patterns on its own."
      },
      {
        "id": "1-1-3",
        "type": "explain",
        "prompt": "Pretend your little cousin asks: 'Why can't a computer just draw a cat?' What would you say?",
        "hints": [
          "Think about how YOU learned what a cat looks like",
          "Did someone give you a rulebook, or did you just see lots of cats?"
        ],
        "modelAnswer": "A computer doesn't know what a cat looks like - it's never seen one! When you were little, you saw cats everywhere: in real life, in books, on TV. Your brain learned what makes a cat look like a cat. A computer needs to learn the same way - by looking at tons of pictures. You can't just tell it 'a cat has pointy ears' because there are a million ways to draw pointy ears!",
        "insight": "Computers learn just like we do - by seeing lots of examples. You can't just give them a rulebook because there are too many possibilities!"
      }
    ],
    "transferQuestion": {
      "id": "1-1-transfer",
      "type": "predict",
      "prompt": "If a computer only ever saw pictures of cats while learning, what would happen if you asked it to draw a dog?",
      "hints": [
        "Has it ever seen a dog before?",
        "What's the only thing it knows how to draw?"
      ],
      "insight": "It would probably draw something that looks like a weird cat! The computer can only draw what it learned from. If it only saw cats, it doesn't know what dogs look like."
    }
  },
  "1-2": {
    "id": "1-2",
    "moduleId": 1,
    "lessonNumber": 2,
    "title": "How Machines Learn",
    "subtitle": "The training concept",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "analogy",
        "title": "Think about how you learned",
        "content": "How did you learn what a cat looks like? You saw thousands of cats—in real life, in photos, in drawings. Your brain built an internal understanding of \"cat-ness\" from all these examples."
      },
      {
        "type": "text",
        "content": "AI image generators do something similar, but simpler. They're shown millions of image-text pairs: photos with captions, artwork with descriptions. They don't \"understand\" cats the way you do—they learn statistical patterns: \"When text says 'cat', these pixel patterns tend to appear.\""
      },
      {
        "type": "interactive",
        "component": "TrainingDataDemo",
        "caption": "See how a model learns from image-text pairs"
      },
      {
        "type": "code",
        "title": "The training data looks like this",
        "language": "json",
        "code": "{\n  \"image\": \"photo_001.jpg\",\n  \"caption\": \"A golden retriever playing fetch in a park\"\n}\n{\n  \"image\": \"photo_002.jpg\",\n  \"caption\": \"Sunset over the ocean with orange clouds\"\n}\n// ... millions more pairs"
      },
      {
        "type": "text",
        "content": "The model never memorizes these images. Instead, it learns patterns: \"When text mentions 'sunset', the image usually has warm colors at the top.\" It learns to associate words with visual features."
      },
      {
        "type": "quickwin",
        "content": "You now understand training data: models learn from millions of examples, building statistical associations between text and visual patterns."
      }
    ],
    "challenges": [
      {
        "id": "1-2-1",
        "type": "predict",
        "prompt": "You show a computer 1 million pictures of dogs, each with a description like 'fluffy dog running'. What does it actually learn?",
        "choices": [
          {
            "id": "a",
            "text": "It saves all 1 million pictures in its memory",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "It figures out patterns: 'fluffy' means certain textures, 'running' means certain poses",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "It makes smaller copies of each picture",
            "isCorrect": false
          }
        ],
        "hints": [
          "What if someone asks for a picture it's never seen before?",
          "If it only saved pictures, could it make NEW ones?"
        ],
        "insight": "The computer learns PATTERNS, not pictures! It figures out: 'fluffy' = soft-looking fur. 'Running' = legs in motion. 'Golden retriever' = golden color + certain shape. Then it can MIX these patterns to make new pictures!"
      },
      {
        "id": "1-2-2",
        "type": "diagnose",
        "prompt": "Someone taught a computer using only fancy restaurant food photos. When they asked for 'a messy homemade sandwich', it made a perfect-looking restaurant sandwich. Why?",
        "hints": [
          "What kind of pictures did it learn from?",
          "Has it ever seen messy food?"
        ],
        "insight": "The computer only knows what it learned from! It never saw messy homemade food, so it doesn't know what that looks like. It can only make the fancy restaurant-style food it was shown.",
        "modelAnswer": "The computer learned that food = fancy and perfect-looking, because that's ALL it ever saw. It has no idea what 'messy' or 'homemade' looks like because those weren't in its examples."
      },
      {
        "id": "1-2-3",
        "type": "explain",
        "prompt": "Why doesn't the computer just save all the pictures instead of learning patterns?",
        "hints": [
          "What if you ask for 'a purple elephant eating ice cream'?",
          "Was that exact picture in the examples?"
        ],
        "modelAnswer": "Two reasons! First, millions of pictures take up way too much space. Second, even if you saved them all, what happens when someone asks for 'a dragon riding a skateboard'? That picture doesn't exist! The computer needs to learn the IDEAS behind pictures so it can create brand new ones.",
        "insight": "Saving pictures doesn't work because you can't save every possible picture. Learning patterns lets the computer create things it's never seen before!"
      }
    ]
  },
  "1-3": {
    "id": "1-3",
    "moduleId": 1,
    "lessonNumber": 3,
    "title": "The Clever Trick",
    "subtitle": "Why removing noise is easier than creating from scratch",
    "estimatedTime": "3 min",
    "sections": [
      {
        "type": "analogy",
        "title": "The dirty window insight",
        "content": "Imagine you have a dirty window. What's easier: cleaning the dirt off to reveal what's behind, or painting the view from scratch on a blank canvas?"
      },
      {
        "type": "text",
        "content": "Diffusion models use this exact insight. Instead of learning to generate images from nothing (incredibly hard), they learn to clean up noisy images (much easier)."
      },
      {
        "type": "interactive",
        "component": "NoiseSlider",
        "caption": "Drag the slider to see how noise is progressively removed to reveal an image"
      },
      {
        "type": "text",
        "content": "But wait—where do we get dirty windows to practice on? We make them ourselves! During training, we take clean images and add noise step by step until they become pure static. Then we teach the model to reverse each step. The model learns: \"Given this noisy image, what should the slightly cleaner version look like?\""
      },
      {
        "type": "diagram",
        "component": "DiffusionDiagram",
        "caption": "The forward process adds noise, the model learns to reverse it"
      },
      {
        "type": "quickwin",
        "content": "You now understand diffusion's core insight: it's easier to learn denoising (cleanup) than generation (creation from scratch)."
      }
    ],
    "challenges": [
      {
        "id": "1-3-1",
        "type": "predict",
        "prompt": "Which job would be easier?",
        "context": "Job A: Draw a cat from a blank page\nJob B: Take a fuzzy/grainy photo of a cat and make it a tiny bit clearer",
        "choices": [
          {
            "id": "a",
            "text": "Job A - drawing from nothing",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Job B - cleaning up the fuzzy picture",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "They're both equally hard",
            "isCorrect": false
          }
        ],
        "hints": [
          "With Job A, where do you even start? What color? What pose?",
          "With Job B, you can already see the cat - you just need to make it clearer"
        ],
        "insight": "Cleaning up a fuzzy picture is WAY easier than drawing from nothing! When you clean up, the picture already tells you what to draw. This is the secret trick that makes AI image generation work!"
      },
      {
        "id": "1-3-2",
        "type": "build",
        "prompt": "Put these in order from MOST fuzzy/noisy to CLEAREST:",
        "choices": [
          {
            "id": "noise",
            "text": "Complete TV static - just random dots"
          },
          {
            "id": "vague",
            "text": "Blurry colored blobs - can't tell what it is"
          },
          {
            "id": "shapes",
            "text": "Can see shapes but details are fuzzy"
          },
          {
            "id": "almost",
            "text": "Almost clear with just a little grain"
          },
          {
            "id": "clean",
            "text": "Perfect clear picture"
          }
        ],
        "correctOrder": [
          "noise",
          "vague",
          "shapes",
          "almost",
          "clean"
        ],
        "hints": [
          "Start with the one that looks like nothing at all",
          "End with the perfect picture"
        ],
        "insight": "The computer cleans up the picture step by step! First it figures out the basic shapes from the static, then adds more detail, then more, until it's crystal clear. Each small step is easy!"
      },
      {
        "id": "1-3-3",
        "type": "predict",
        "prompt": "To teach a computer how to clean up fuzzy pictures, what do you need to show it?",
        "choices": [
          {
            "id": "a",
            "text": "Both fuzzy versions AND clean versions of the same pictures",
            "isCorrect": true
          },
          {
            "id": "b",
            "text": "Just clean pictures (then add fuzz yourself to make examples)",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "Only fuzzy pictures",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "Written descriptions of what 'fuzzy' and 'clean' mean",
            "isCorrect": false
          }
        ],
        "hints": [
          "The computer needs to see what 'less fuzzy' looks like",
          "If you have a clean picture, could YOU add fuzz to it?"
        ],
        "insight": "You take clean pictures, add different amounts of fuzz to them, and teach the computer: 'when you see THIS fuzzy version, make it look like THAT cleaner version.' It's like showing someone how to clean up step by step!"
      },
      {
        "id": "1-3-4",
        "type": "explain",
        "prompt": "Why is it easier to teach a computer to clean up fuzzy pictures than to draw from nothing?",
        "hints": [
          "When drawing from nothing, how many different things could you draw?",
          "When cleaning up, what's already there to help you?"
        ],
        "modelAnswer": "Drawing from nothing is super hard because there are infinite possibilities - you could draw ANYTHING! But when cleaning up a fuzzy picture, the answer is already hiding in there. The computer just has to reveal it. It's like the difference between 'draw something' vs 'trace over this blurry shape'.",
        "insight": "Here's the genius trick: instead of asking the computer to create pictures from nothing (super hard!), we ask it to clean up fuzzy pictures (much easier!). Start with static, clean it up bit by bit, and boom - you get a picture!"
      }
    ]
  },
  "1-4": {
    "id": "1-4",
    "moduleId": 1,
    "lessonNumber": 4,
    "title": "The Pipeline",
    "subtitle": "Text → Numbers → Image",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "analogy",
        "title": "It's like a recipe",
        "content": "When you follow a recipe, you go: Recipe (text) → Gather ingredients → Cook → Dish. An image generator works similarly: Prompt (text) → Convert to numbers → Process through the model → Image."
      },
      {
        "type": "interactive",
        "component": "PipelineFlow",
        "caption": "See data flow through each stage of the pipeline"
      },
      {
        "type": "text",
        "content": "Here's what happens at each stage:"
      },
      {
        "type": "code",
        "title": "The pipeline stages",
        "language": "text",
        "code": "1. TOKENIZE: \"a cat on a beach\" → [1, 5847, 23, 1, 8921]\n   (Words become number IDs)\n\n2. ENCODE: [1, 5847, ...] → [[0.2, -0.5, 0.8, ...], ...]\n   (IDs become meaning vectors)\n\n3. DENOISE: Start with random noise, guided by the text vectors\n   (8 steps of cleanup)\n\n4. DECODE: Latent representation → RGB pixels\n   (Decompress to actual image)"
      },
      {
        "type": "quickwin",
        "content": "You now understand the data flow: text gets converted to numbers, which guide the denoising process, which produces an image."
      }
    ],
    "challenges": [
      {
        "id": "1-4-1",
        "type": "build",
        "prompt": "Put these steps in order - what happens when you ask for 'a cat on a beach':",
        "choices": [
          {
            "id": "text",
            "text": "You type: 'a cat on a beach'"
          },
          {
            "id": "tokens",
            "text": "Computer breaks your words into pieces it knows"
          },
          {
            "id": "embed",
            "text": "Computer figures out what those words MEAN"
          },
          {
            "id": "noise",
            "text": "Start with TV static (random dots)"
          },
          {
            "id": "denoise",
            "text": "Clean up the static step by step, guided by your words"
          },
          {
            "id": "decode",
            "text": "Turn the result into a picture you can see"
          }
        ],
        "correctOrder": [
          "text",
          "tokens",
          "embed",
          "noise",
          "denoise",
          "decode"
        ],
        "hints": [
          "First the computer needs to understand your words",
          "Then it starts with noise and cleans it up"
        ],
        "insight": "It goes: Your words → Computer understands them → Starts with random static → Cleans up the static while thinking about your words → Shows you the final picture!"
      },
      {
        "id": "1-4-2",
        "type": "predict",
        "prompt": "The computer first breaks 'cat' into a piece, then figures out what it MEANS. Why two steps?",
        "choices": [
          {
            "id": "a",
            "text": "First step just labels the word, second step understands it",
            "isCorrect": true
          },
          {
            "id": "b",
            "text": "It's just to make things slower",
            "isCorrect": false
          },
          {
            "id": "c",
            "text": "First step is for English, second is for other languages",
            "isCorrect": false
          }
        ],
        "hints": [
          "Labeling something #2857 doesn't tell you what it IS",
          "You need another step to know 'cat' is similar to 'kitten'"
        ],
        "insight": "Step 1: Give the word a number label (like #2857 for 'cat'). Step 2: Figure out what that actually MEANS (furry, four legs, says meow). The computer needs to understand meaning, not just labels!"
      },
      {
        "id": "1-4-3",
        "type": "diagnose",
        "prompt": "Someone's AI just shows random noise instead of a picture. The words were understood correctly. What's broken?",
        "choices": [
          {
            "id": "a",
            "text": "The cleanup step isn't paying attention to the words",
            "isCorrect": true
          },
          {
            "id": "b",
            "text": "The words aren't being used to guide the cleanup",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "There wasn't enough static to start with",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "The words were spelled wrong",
            "isCorrect": false
          }
        ],
        "hints": [
          "If you clean up static without knowing what to make...",
          "You need the words to GUIDE the cleanup"
        ],
        "insight": "If the cleanup step doesn't listen to your words, it just makes random stuff! Your words need to guide every step of the cleanup, telling it 'make this look more like a cat on a beach'."
      }
    ]
  },
  "1-5": {
    "id": "1-5",
    "moduleId": 1,
    "lessonNumber": 5,
    "title": "Why Z-Image is Fast",
    "subtitle": "The distillation shortcut",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "analogy",
        "title": "The master chef shortcut",
        "content": "A master chef (slow, meticulous) teaches a line cook (fast, efficient) to make the same dish. The line cook can't replicate every nuance, but gets 95% of the quality in 1/6 the time."
      },
      {
        "type": "text",
        "content": "Traditional diffusion models need 50 denoising steps. That means running the neural network 50 times per image. Z-Image-Turbo uses only 8 steps—and produces nearly the same quality."
      },
      {
        "type": "interactive",
        "component": "StepComparison",
        "caption": "Compare 50-step vs 8-step generation (same prompt, same starting noise)"
      },
      {
        "type": "text",
        "content": "How? Through \"distillation\"—training a fast student model to match a slow teacher model. The student learns to take bigger steps, jumping from noisy to clean in fewer iterations."
      },
      {
        "type": "code",
        "title": "Speed comparison",
        "language": "text",
        "code": "Standard model:  50 steps × 200ms = 10 seconds\nZ-Image-Turbo:   8 steps × 100ms = 0.8 seconds\n\n12x faster, 95% quality retention"
      },
      {
        "type": "quickwin",
        "content": "You've completed Module 1! You now understand: the core challenge, how models learn, the denoising insight, the pipeline, and why Z-Image is fast."
      }
    ],
    "challenges": [
      {
        "id": "1-5-1",
        "type": "predict",
        "prompt": "Most AI image makers need 50 cleanup steps. Why can't we just use 8 steps to go faster?",
        "choices": [
          {
            "id": "a",
            "text": "Each step can only clean up a little bit at a time",
            "isCorrect": true
          },
          {
            "id": "b",
            "text": "50 is just a random number someone picked",
            "isCorrect": false
          },
          {
            "id": "c",
            "text": "More steps keeps the computer busy",
            "isCorrect": false
          }
        ],
        "hints": [
          "What if you tried to go from total static to perfect picture in one jump?",
          "The computer learned to take small steps, not giant leaps"
        ],
        "insight": "The computer learned to take tiny steps - clean up just a little bit each time. If you ask it to do a HUGE jump, it gets confused! It's like asking someone who walks slowly to suddenly run a race."
      },
      {
        "id": "1-5-2",
        "type": "explain",
        "prompt": "A master chef takes 2 hours to cook a dish using 50 careful steps. A student watches the chef cook, then tries to make the same dish. The student gets it done in 20 minutes. What did the student do differently?",
        "hints": [
          "Did the student copy every single step?",
          "Or did the student learn shortcuts to get the same result?"
        ],
        "modelAnswer": "The student focused on what the FINAL dish should look like, then found shortcuts to get there faster. Instead of copying all 50 steps, they skipped some and took bigger jumps. They get 95% of the quality in way less time!",
        "insight": "This is how fast AI image makers work! A slow careful AI (the chef) makes good pictures. A fast AI (the student) watches those results and learns shortcuts to make similar pictures in fewer steps."
      },
      {
        "id": "1-5-3",
        "type": "predict",
        "prompt": "Z-Image uses 8 steps instead of 50. How good are its pictures compared to the slow version?",
        "choices": [
          {
            "id": "a",
            "text": "Way worse - you can't skip that many steps",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "About 95% as good - tiny quality loss for huge speed gain",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "Exactly the same - steps don't matter",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "Actually better somehow",
            "isCorrect": false
          }
        ],
        "hints": [
          "Taking shortcuts usually means losing a little quality",
          "But is it worth it to be 6x faster?"
        ],
        "insight": "Z-Image is about 95% as good as the slow version, but 6 times faster! Most people can't even tell the difference. That's a great trade - almost the same quality in way less time."
      },
      {
        "id": "1-5-4",
        "type": "diagnose",
        "prompt": "Someone tried to make an AI that does it in just 1 step. The pictures were terrible. Why?",
        "hints": [
          "Think about jumping from random static to perfect picture in ONE step",
          "Is that even possible to learn?"
        ],
        "insight": "One step is too big a jump! Going from random noise to a perfect picture in a single step is basically impossible to learn. You need at least a few steps. 4-8 seems to be the minimum for good results.",
        "modelAnswer": "It's like asking the student chef to make the dish in 2 seconds instead of 20 minutes. Some things just can't be rushed that much! The AI needs at least a few steps to gradually clean up the picture."
      }
    ]
  },
  "2-1": {
    "id": "2-1",
    "moduleId": 2,
    "lessonNumber": 1,
    "title": "Words to Numbers",
    "subtitle": "Tokenization basics",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "analogy",
        "title": "Think of a library catalog",
        "content": "Every book has a unique ID number (ISBN). When you search, the system uses IDs, not titles. Tokenization does the same: every word (or part of a word) gets a unique number."
      },
      {
        "type": "interactive",
        "component": "TokenizerDemo",
        "caption": "Type text and see it converted to tokens in real-time"
      },
      {
        "type": "text",
        "content": "But here's the twist: tokens aren't always full words. Common words like \"the\" get one token. Rare words get split into pieces. \"Photorealistic\" might become [\"photo\", \"real\", \"istic\"]."
      },
      {
        "type": "code",
        "title": "Tokenization example",
        "language": "javascript",
        "code": "// Input text\nconst prompt = \"a cat wearing sunglasses\"\n\n// After tokenization\nconst tokens = [64, 2857, 5765, 41031]\n// \"a\" → 64\n// \"cat\" → 2857\n// \"wearing\" → 5765\n// \"sunglasses\" → 41031\n\n// Vocabulary size: ~50,000 tokens"
      },
      {
        "type": "quickwin",
        "content": "You now understand tokenization: text becomes a sequence of integer IDs from a fixed vocabulary."
      }
    ],
    "challenges": [
      {
        "id": "2-1-1",
        "type": "predict",
        "prompt": "When you type 'cat', what does the computer actually see?",
        "choices": [
          {
            "id": "a",
            "text": "The letters c-a-t",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "A picture of a cat",
            "isCorrect": false
          },
          {
            "id": "c",
            "text": "Numbers that represent 'cat'",
            "isCorrect": true
          },
          {
            "id": "d",
            "text": "The dictionary definition",
            "isCorrect": false
          }
        ],
        "hints": [
          "Computers only understand numbers",
          "Everything has to become math!"
        ],
        "insight": "Computers ONLY understand numbers! Before the computer can do anything with 'cat', it has to turn it into numbers. Same with pictures, sounds, everything - it all becomes numbers."
      },
      {
        "id": "2-1-2",
        "type": "explain",
        "prompt": "We could turn letters into numbers like a=1, b=2, c=3. So 'cat' = 3,1,20. Why doesn't this work well?",
        "hints": [
          "Is 'cat' similar to 'car' with these numbers?",
          "What about 'kitty' - does it have similar numbers to 'cat'?"
        ],
        "modelAnswer": "These numbers don't capture MEANING! 'cat' and 'car' have almost the same numbers (3,1,20 vs 3,1,18) but mean totally different things. And 'cat' and 'kitty' mean the same thing but have completely different numbers. We need numbers that understand meaning!",
        "insight": "Simple letter-to-number doesn't work because similar SPELLINGS don't mean similar MEANINGS. We need smarter numbers that put similar ideas close together."
      },
      {
        "id": "2-1-3",
        "type": "predict",
        "prompt": "The word 'bank' appears in 'river bank' and 'bank account'. Should the computer give it the same numbers both times?",
        "choices": [
          {
            "id": "a",
            "text": "Yes - same word, same numbers",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "No - different meanings need different numbers",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "It doesn't matter",
            "isCorrect": false
          }
        ],
        "hints": [
          "What does 'bank' mean in each sentence?",
          "Are they the same thing?"
        ],
        "insight": "Same spelling but different meanings! A river bank and a money bank are totally different. Smart computers give 'bank' different numbers depending on the words around it. The surrounding words help figure out which meaning!"
      }
    ],
    "transferQuestion": {
      "id": "2-1-transfer",
      "type": "predict",
      "prompt": "If the computer sees 'I love my cat' and 'I love my car', which words get similar numbers?",
      "hints": [],
      "insight": "'I', 'love', 'my' get similar numbers in both. But 'cat' and 'car' get very different numbers even though they're spelled almost the same - because they mean totally different things!"
    }
  },
  "2-2": {
    "id": "2-2",
    "moduleId": 2,
    "lessonNumber": 2,
    "title": "Numbers with Meaning",
    "subtitle": "What are embeddings?",
    "estimatedTime": "3 min",
    "sections": [
      {
        "type": "analogy",
        "title": "GPS coordinates for concepts",
        "content": "Every city has GPS coordinates. Cities that are close geographically have similar coordinates. Embeddings work the same way: words with similar meanings have similar \"coordinates\" in a high-dimensional space."
      },
      {
        "type": "text",
        "content": "Token IDs are just arbitrary numbers—they don't encode meaning. The ID for \"cat\" isn't mathematically close to \"kitten\". Embeddings fix this by mapping each token to a vector (list of numbers) where similar concepts cluster together."
      },
      {
        "type": "interactive",
        "component": "EmbeddingViz",
        "caption": "Explore how words cluster by meaning in embedding space (2D projection)"
      },
      {
        "type": "code",
        "title": "Embeddings in code",
        "language": "javascript",
        "code": "// Token ID is just an index\nconst catTokenId = 2857\n\n// Embedding is a vector of ~768 numbers\nconst catEmbedding = [0.23, -0.87, 0.45, 0.12, ..., -0.33]\n//                   768 dimensions\n\n// Similar words have similar vectors\ncosineSimilarity(catEmbed, kittenEmbed)  // 0.89 (high!)\ncosineSimilarity(catEmbed, databaseEmbed) // 0.02 (low)"
      },
      {
        "type": "quickwin",
        "content": "You now understand embeddings: vectors that encode meaning, where similar concepts are mathematically close."
      }
    ],
    "challenges": [
      {
        "id": "2-2-1",
        "type": "predict",
        "prompt": "The computer needs to break up 'unbelievable'. How might it split it?",
        "choices": [
          {
            "id": "a",
            "text": "Keep it as one piece: 'unbelievable'",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Every letter: u-n-b-e-l-i-e-v-a-b-l-e",
            "isCorrect": false
          },
          {
            "id": "c",
            "text": "Meaningful chunks: 'un' + 'believe' + 'able'",
            "isCorrect": true
          },
          {
            "id": "d",
            "text": "Random chunks",
            "isCorrect": false
          }
        ],
        "hints": [
          "Breaking into single letters loses meaning",
          "Keeping long words whole wastes memory",
          "What's a good middle ground?"
        ],
        "insight": "The computer breaks words into meaningful chunks! 'un' means 'not', 'believe' is the main word, 'able' means 'can be'. These pieces have meaning on their own, which helps the computer understand!"
      },
      {
        "id": "2-2-2",
        "type": "diagnose",
        "prompt": "You ask an AI to spell 'ChatGPT' and it gets it right. But when you ask it to spell 'Anthropic', it struggles. Why?",
        "hints": [
          "The AI sees words in chunks, not letters",
          "It might see 'Anthropic' as 'Anthrop' + 'ic'"
        ],
        "insight": "The AI doesn't see individual letters - it sees chunks! 'ChatGPT' might break into familiar chunks it knows how to spell. But 'Anthropic' might become weird chunks like 'Anthrop' + 'ic', and it doesn't know how to spell 'Anthrop'!",
        "modelAnswer": "The computer learns words in chunks, not letter by letter. Some chunks are easy to spell (like 'Chat'), but weird chunks (like 'Anthrop') are harder because the AI never learned what letters are inside them."
      },
      {
        "id": "2-2-3",
        "type": "explain",
        "prompt": "Why does the computer break words into chunks instead of keeping every word whole?",
        "hints": [
          "How many different words exist?",
          "How many different chunks do you need?"
        ],
        "modelAnswer": "There are millions of possible words! The computer can't remember them all. But with just 50,000 chunks, it can build almost any word. It's like having LEGO pieces - you don't need a piece for everything, just enough pieces to build anything!",
        "insight": "Chunks are like LEGO pieces for language! With a limited set of chunks, you can build any word. It's way more efficient than trying to remember every possible word."
      }
    ]
  },
  "2-3": {
    "id": "2-3",
    "moduleId": 2,
    "lessonNumber": 3,
    "title": "The Text Encoder",
    "subtitle": "Understanding context",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "analogy",
        "title": "A translator who gets context",
        "content": "Imagine a translator who doesn't just swap words, but understands the whole sentence. \"Bank\" means something different in \"river bank\" vs \"bank account\". The encoder figures this out."
      },
      {
        "type": "text",
        "content": "The text encoder (usually T5 or CLIP) takes your tokenized prompt and produces contextualized embeddings. Each word's vector is influenced by the words around it."
      },
      {
        "type": "interactive",
        "component": "EncoderDemo",
        "caption": "See how context changes word representations"
      },
      {
        "type": "code",
        "title": "Context matters",
        "language": "text",
        "code": "Input: \"a bright red apple on a table\"\n\nWithout context (basic embeddings):\n  \"bright\" → generic brightness vector\n  \"red\" → generic red color vector\n  \"apple\" → could be fruit or company\n\nWith encoder (contextualized):\n  \"bright\" → intensity modifier for color\n  \"red\" → specifically apple-red hue\n  \"apple\" → definitely the fruit (table context)"
      },
      {
        "type": "quickwin",
        "content": "You understand text encoders: they produce context-aware embeddings where each word's meaning is influenced by surrounding words."
      }
    ],
    "challenges": [
      {
        "id": "2-3-1",
        "type": "predict",
        "prompt": "The computer turns words into 'smart numbers' where similar meanings are close together. Which pair should have the most similar numbers?",
        "choices": [
          {
            "id": "a",
            "text": "'king' and 'queen' (both royalty)",
            "isCorrect": true
          },
          {
            "id": "b",
            "text": "'king' and 'kingdom' (share letters)",
            "isCorrect": false
          },
          {
            "id": "c",
            "text": "'king' and 'ring' (rhyme)",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "'king' and 'kong' (similar spelling)",
            "isCorrect": false
          }
        ],
        "hints": [
          "We want numbers that capture MEANING",
          "Rhyming or similar spelling doesn't mean similar meaning"
        ],
        "insight": "'King' and 'queen' are both royalty, both people, both rulers - so they should have similar numbers. 'Ring' and 'kong' just SOUND similar but mean completely different things. Smart numbers care about meaning, not spelling!"
      },
      {
        "id": "2-3-2",
        "type": "predict",
        "prompt": "Here's something wild you can do with smart numbers: take 'king', subtract 'man', add 'woman'. What do you get?",
        "context": "Remember: smart numbers put similar meanings close together. What if you could do MATH with meanings?",
        "choices": [
          {
            "id": "a",
            "text": "Random garbage - math doesn't work on words",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Something close to 'queen'",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "Something close to 'princess'",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "Something close to 'kingdom'",
            "isCorrect": false
          }
        ],
        "hints": [
          "King is a male ruler. Queen is a female ruler.",
          "What's the relationship between king/queen and man/woman?"
        ],
        "insight": "It gives you 'queen'! King minus the 'male' part plus the 'female' part = female ruler = queen. The smart numbers capture these relationships so well that you can do MATH with meanings!"
      },
      {
        "id": "2-3-3",
        "type": "explain",
        "prompt": "You just saw that king - man + woman = queen. In your own words, why does this math-with-meanings actually work?",
        "hints": [
          "What concept connects king→queen and man→woman?",
          "The numbers must be capturing something about that concept..."
        ],
        "modelAnswer": "The difference between 'king' and 'queen' is gender. The difference between 'man' and 'woman' is also gender. The smart numbers encode gender as a 'direction' in the numbers. So subtracting 'man' removes the male direction, adding 'woman' adds the female direction, and you end up at 'queen'!",
        "insight": "The smart numbers understand relationships! They encode concepts like gender, size, or category as directions. That's why you can do math with them - you're really doing math with meanings!"
      },
      {
        "id": "2-3-4",
        "type": "identify",
        "prompt": "Which is NOT true about how the computer turns words into smart numbers?",
        "choices": [
          {
            "id": "a",
            "text": "Similar meanings get similar numbers",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "The computer learns this from reading lots of text",
            "isCorrect": false
          },
          {
            "id": "c",
            "text": "Words with similar spelling get similar numbers",
            "isCorrect": true
          },
          {
            "id": "d",
            "text": "Context affects what numbers a word gets",
            "isCorrect": false
          }
        ],
        "hints": [
          "Do 'cat' and 'car' have similar meanings?",
          "They have similar spelling..."
        ],
        "insight": "Spelling doesn't matter - meaning does! 'Cat' and 'car' are spelled almost the same but get very different numbers. 'Cat' and 'kitten' are spelled differently but get similar numbers because they mean similar things!"
      }
    ]
  },
  "2-4": {
    "id": "2-4",
    "moduleId": 2,
    "lessonNumber": 4,
    "title": "Bilingual Magic",
    "subtitle": "How it handles multiple languages",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "text",
        "content": "Z-Image-Turbo can understand both English and Chinese prompts. How? The encoder was trained on text in both languages, learning that \"cat\" and \"猫\" should produce similar embeddings."
      },
      {
        "type": "analogy",
        "title": "A bilingual librarian",
        "content": "Imagine a librarian who can find the same book whether you ask in English or Chinese. They've learned that different words in different languages can mean the same thing."
      },
      {
        "type": "interactive",
        "component": "BilingualDemo",
        "caption": "Compare embeddings for \"cat\" vs \"猫\""
      },
      {
        "type": "code",
        "title": "Same meaning, different tokens",
        "language": "javascript",
        "code": "// Different tokens\ntokenize(\"sunset over ocean\")  // [18294, 962, 8241]\ntokenize(\"海上日落\")            // [45982, 23847]\n\n// But similar embeddings after encoding!\nencode(\"sunset over ocean\")     // [0.82, -0.34, ...]\nencode(\"海上日落\")               // [0.79, -0.31, ...]\n// Cosine similarity: 0.94"
      },
      {
        "type": "quickwin",
        "content": "Module 2 complete! You understand: tokenization, embeddings, context-aware encoding, and multilingual support."
      }
    ],
    "challenges": []
  },
  "3-1": {
    "id": "3-1",
    "moduleId": 3,
    "lessonNumber": 1,
    "title": "Forward Process",
    "subtitle": "Adding noise step by step",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "analogy",
        "title": "Photocopying a photocopy",
        "content": "Remember making copies of copies? Each generation gets a bit more degraded. The forward process is similar: we add a tiny bit of random noise at each step until the image becomes pure static."
      },
      {
        "type": "interactive",
        "component": "ForwardProcess",
        "caption": "Watch an image get progressively noisier"
      },
      {
        "type": "text",
        "content": "This is how we create training data. We take millions of clean images, add noise in controlled steps, and save each intermediate result. The model then learns to reverse each step."
      },
      {
        "type": "code",
        "title": "The math (simplified)",
        "language": "python",
        "code": "# At each step t, we add a bit of Gaussian noise\ndef add_noise(image, t):\n    noise = random_gaussian(shape=image.shape)\n    # alpha controls how much original image vs noise\n    alpha = noise_schedule[t]  # decreases over time\n    return sqrt(alpha) * image + sqrt(1 - alpha) * noise\n\n# After ~1000 steps, image is pure noise\nstep_0:    clean image\nstep_100:  slightly fuzzy\nstep_500:  mostly noise, vague shapes\nstep_1000: pure random static"
      },
      {
        "type": "quickwin",
        "content": "You understand the forward process: progressively adding noise creates the training targets for the model."
      }
    ],
    "challenges": [
      {
        "id": "3-1-1",
        "type": "predict",
        "prompt": "You add a tiny bit of TV static to a picture. Then a bit more. Then more. After 1000 times, what do you have?",
        "choices": [
          {
            "id": "a",
            "text": "A slightly fuzzy picture",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Just random dots - picture is gone",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "A blurry version of the picture",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "A pixelated picture",
            "isCorrect": false
          }
        ],
        "hints": [
          "Each time you add more random dots",
          "Eventually, the random dots cover everything up"
        ],
        "insight": "Keep adding random static and eventually the picture completely disappears! It just looks like TV static. This is important - we use this to TRAIN the AI."
      },
      {
        "id": "3-1-2",
        "type": "explain",
        "prompt": "Why add static bit by bit instead of all at once?",
        "hints": [
          "Which is easier: 'clean up this slightly fuzzy picture' or 'turn pure static into a cat'?",
          "Small steps are easier to learn!"
        ],
        "modelAnswer": "Learning to clean up a slightly fuzzy picture is easy - you can see what it's supposed to be! But turning pure static into a picture is super hard because it could be ANYTHING. Small steps make each task learnable.",
        "insight": "Small steps = small easy tasks! The computer learns each tiny cleanup step. Then it chains them all together to go from pure static to a perfect picture."
      },
      {
        "id": "3-1-3",
        "type": "build",
        "prompt": "Put these in order from CLEAN picture to PURE static:",
        "choices": [
          {
            "id": "clean",
            "text": "Original perfect picture"
          },
          {
            "id": "light",
            "text": "Tiny bit of grain, still clear"
          },
          {
            "id": "medium",
            "text": "Noticeable fuzz, can still tell what it is"
          },
          {
            "id": "heavy",
            "text": "Lots of static, can barely see shapes"
          },
          {
            "id": "pure",
            "text": "Just random dots - pure static"
          }
        ],
        "correctOrder": [
          "clean",
          "light",
          "medium",
          "heavy",
          "pure"
        ],
        "hints": [
          "Start with the clean picture",
          "End with pure static"
        ],
        "insight": "We slowly destroy the picture step by step! The computer watches this happen, then learns to do it BACKWARDS - turning static back into a picture!"
      }
    ]
  },
  "3-2": {
    "id": "3-2",
    "moduleId": 3,
    "lessonNumber": 2,
    "title": "Reverse Process",
    "subtitle": "Removing noise to reveal images",
    "estimatedTime": "3 min",
    "sections": [
      {
        "type": "analogy",
        "title": "Forensic photo restoration",
        "content": "Crime scene investigators enhance blurry photos to reveal details. They use knowledge of how cameras work to reverse the blur. Diffusion models do the same: they learn how noise was added, then reverse it."
      },
      {
        "type": "text",
        "content": "The model's job: given a noisy image and a text prompt, predict what the slightly cleaner version should look like. Repeat this 8-50 times, and you go from pure noise to a clean image."
      },
      {
        "type": "interactive",
        "component": "ReverseProcess",
        "caption": "Step through the denoising process one step at a time"
      },
      {
        "type": "code",
        "title": "Reverse process in code",
        "language": "python",
        "code": "def generate_image(prompt, num_steps=8):\n    # Start with pure random noise\n    image = random_noise(shape=(1024, 1024))\n\n    # Text guides the denoising\n    text_embedding = encode(prompt)\n\n    # Denoise step by step\n    for step in range(num_steps):\n        # Model predicts the noise to remove\n        predicted_noise = model(image, text_embedding, step)\n        # Subtract predicted noise\n        image = image - predicted_noise * step_size\n\n    return image"
      },
      {
        "type": "quickwin",
        "content": "You understand the reverse process: the model predicts and removes noise iteratively, guided by the text prompt."
      }
    ],
    "challenges": [
      {
        "id": "3-2-1",
        "type": "predict",
        "prompt": "The computer is looking at a fuzzy picture. What does it try to figure out?",
        "choices": [
          {
            "id": "a",
            "text": "What the final clean picture looks like",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Just the static/fuzz that was added",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "What the next step looks like",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "What object is in the picture",
            "isCorrect": false
          }
        ],
        "hints": [
          "If you know exactly what fuzz was added...",
          "You can subtract it!"
        ],
        "insight": "Clever trick: instead of guessing the clean picture, the computer just guesses what STATIC was added. Then it subtracts that static to make the picture a bit cleaner!"
      },
      {
        "id": "3-2-2",
        "type": "diagnose",
        "prompt": "Someone's AI makes pictures but they're always blurry. What's probably wrong?",
        "choices": [
          {
            "id": "a",
            "text": "Not enough cleanup steps",
            "isCorrect": true
          },
          {
            "id": "b",
            "text": "Too many training pictures",
            "isCorrect": false
          },
          {
            "id": "c",
            "text": "The static is too random",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "The text is too short",
            "isCorrect": false
          }
        ],
        "hints": [
          "Sharp details come in the FINAL steps",
          "Each step adds more detail"
        ],
        "insight": "The first steps figure out the basic shapes. The middle steps add features. The LAST steps add sharp details! If you don't do enough steps, you never get the sharp details."
      },
      {
        "id": "3-2-3",
        "type": "explain",
        "prompt": "Why is it easier to guess 'what static was added' than to guess 'what the clean picture looks like'?",
        "hints": [
          "Static is just random dots - you can predict random patterns",
          "The clean picture could be ANYTHING"
        ],
        "modelAnswer": "Static always looks similar - just random dots. The computer can learn to spot that pattern. But the clean picture could be a cat, a dog, a car, anything! It's way easier to identify 'which random dots' than to guess 'which of millions of possible pictures'.",
        "insight": "Static follows a pattern (random dots). Pictures could be literally anything! It's easier to learn 'what random dots look like' than 'what any possible picture looks like'."
      }
    ]
  },
  "3-3": {
    "id": "3-3",
    "moduleId": 3,
    "lessonNumber": 3,
    "title": "The Math Intuition",
    "subtitle": "Gaussian noise explained simply",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "analogy",
        "title": "The bell curve of randomness",
        "content": "If you measure the heights of 1000 random people, most cluster around average, with fewer very tall or very short people. This \"bell curve\" pattern is called Gaussian (or Normal) distribution."
      },
      {
        "type": "interactive",
        "component": "GaussianDemo",
        "caption": "Generate random noise and see its distribution"
      },
      {
        "type": "text",
        "content": "Why Gaussian? Because it's mathematically well-behaved. We can precisely calculate how much noise was added at each step, which helps the model learn to reverse it accurately."
      },
      {
        "type": "code",
        "title": "Properties of Gaussian noise",
        "language": "text",
        "code": "Gaussian noise has nice properties:\n\n1. PREDICTABLE: We know the exact distribution\n   - Mean: 0 (centered)\n   - Std dev: controlled by schedule\n\n2. ADDITIVE: Adding two Gaussians = another Gaussian\n   - Makes math tractable\n\n3. REVERSIBLE: Given the noise schedule, we can\n   calculate exact forward/reverse transitions\n\nThis is why diffusion works—the math is clean."
      },
      {
        "type": "quickwin",
        "content": "You understand why Gaussian noise: it has mathematical properties that make the forward and reverse processes tractable."
      }
    ],
    "challenges": [
      {
        "id": "3-3-1",
        "type": "predict",
        "prompt": "You type 'a red sports car'. When does the computer look at your words while making the picture?",
        "choices": [
          {
            "id": "a",
            "text": "Only at the very beginning",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "At every single step of cleaning up the fuzzy picture",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "Only at the very end",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "It doesn't - it just picks a random car picture",
            "isCorrect": false
          }
        ],
        "hints": [
          "Remember: the computer cleans up a fuzzy picture step by step",
          "At each step, it needs to know WHAT to make clearer"
        ],
        "insight": "The computer checks your words at EVERY step! Each time it cleans up the picture a little, it asks 'what did they want again? Oh right, a RED SPORTS CAR' and makes sure it's heading in that direction."
      },
      {
        "id": "3-3-2",
        "type": "predict",
        "prompt": "There's a setting called 'guidance strength' that controls how the computer uses your words. What do you think it controls?",
        "choices": [
          {
            "id": "a",
            "text": "How fast the picture generates",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "How strictly the computer follows your words",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "How big the picture is",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "How many colors to use",
            "isCorrect": false
          }
        ],
        "hints": [
          "The word 'guidance' is a clue - your words GUIDE the picture",
          "Think about following instructions loosely vs strictly"
        ],
        "insight": "Guidance strength controls how strictly the computer follows your words! Low guidance = relaxed, might ignore some words. High guidance = very strict, follows every word closely. It's like the volume knob for your instructions!"
      },
      {
        "id": "3-3-3",
        "type": "predict",
        "prompt": "If guidance strength is set really HIGH, what happens to the picture?",
        "choices": [
          {
            "id": "a",
            "text": "More random and creative",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Matches your words better but looks overdone/fake",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "Generates faster",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "Picture becomes blurry",
            "isCorrect": false
          }
        ],
        "hints": [
          "High guidance = follows your words VERY strictly",
          "What happens when you overdo anything?"
        ],
        "insight": "High guidance = the computer tries REALLY hard to match your words, but overdoes it. Colors get too bright, everything looks 'too perfect' in a fake way. It's like adding too many filters to a photo!"
      },
      {
        "id": "3-3-4",
        "type": "explain",
        "prompt": "You learned that low guidance = more natural, high guidance = more overdone. Why does following words MORE strictly make things look LESS natural?",
        "hints": [
          "Think about real photos - are things ever 'perfectly' red or 'perfectly' big?",
          "What happens when you turn up any slider to maximum?"
        ],
        "modelAnswer": "High guidance tells the model: 'Make SURE this is red! Make SURE this is big!' The model overcorrects to be certain it matches your words. It's like if you asked someone to 'definitely make the text readable' and they made it HUGE. The model plays it safe by exaggerating.",
        "insight": "The tradeoff exists because certainty requires exaggeration. To GUARANTEE something is red, the model makes it SUPER red. Real photos have subtle, imperfect colors because nothing needs to prove itself. Most people use a middle setting (7-12) for the best balance."
      }
    ],
    "transferQuestion": {
      "id": "3-3-transfer",
      "type": "diagnose",
      "prompt": "You asked for 'a photo of a cat' but it looks like a cartoon drawing. What could help?",
      "hints": [
        "Is 'photo' specific enough?",
        "Could you describe more clearly what kind of picture you want?"
      ],
      "insight": "Be more specific! Try 'a photograph of a cat, realistic, taken with a camera'. The computer learned from many styles of cat pictures - you need to clearly say you want the photo kind, not the drawing kind."
    }
  },
  "3-4": {
    "id": "3-4",
    "moduleId": 3,
    "lessonNumber": 4,
    "title": "Text Guidance",
    "subtitle": "How the prompt steers denoising",
    "estimatedTime": "3 min",
    "sections": [
      {
        "type": "analogy",
        "title": "The \"warmer/colder\" game",
        "content": "Remember the game where someone hides an object and says \"warmer\" or \"colder\" as you search? Text guidance works similarly: the prompt tells the model which direction to steer the denoising."
      },
      {
        "type": "text",
        "content": "Without text guidance, denoising would produce random images—whatever patterns the model learned. The text embedding acts as a compass, pointing the denoising toward images that match the description."
      },
      {
        "type": "interactive",
        "component": "GuidanceDemo",
        "caption": "Same starting noise, different prompts → different images"
      },
      {
        "type": "code",
        "title": "How guidance works",
        "language": "python",
        "code": "def denoise_step(noisy_image, text_embed, step):\n    # Without guidance: \"what does ANY clean image look like?\"\n    unconditional = model(noisy_image, null_embed, step)\n\n    # With guidance: \"what does THIS SPECIFIC image look like?\"\n    conditional = model(noisy_image, text_embed, step)\n\n    # Amplify the difference (CFG scale)\n    guided = unconditional + scale * (conditional - unconditional)\n\n    return guided"
      },
      {
        "type": "quickwin",
        "content": "You understand text guidance: the prompt embedding steers the denoising toward images matching the description."
      }
    ],
    "challenges": []
  },
  "3-5": {
    "id": "3-5",
    "moduleId": 3,
    "lessonNumber": 5,
    "title": "CFG Scale",
    "subtitle": "The creativity vs accuracy dial",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "analogy",
        "title": "How literally to follow instructions",
        "content": "If you ask an artist for \"a cat\", they might paint anything from a photorealistic portrait to an abstract interpretation. CFG (Classifier-Free Guidance) scale controls how literally the model follows your prompt."
      },
      {
        "type": "interactive",
        "component": "CFGDemo",
        "caption": "Adjust CFG scale and see how outputs change"
      },
      {
        "type": "text",
        "content": "Low CFG (1-3): More creative, diverse outputs, might drift from prompt. High CFG (10-20): Strictly follows prompt, but can look \"overcooked\" or artificial. Sweet spot is usually 7-9."
      },
      {
        "type": "code",
        "title": "CFG scale effects",
        "language": "text",
        "code": "CFG Scale Effects:\n\n1.0  → Ignores prompt, random generation\n3.0  → Loose adherence, very creative\n7.0  → Balanced (default for most models)\n12.0 → Strong adherence, less variety\n20.0 → Over-saturated, artifacts likely\n\nZ-Image-Turbo uses CFG=0 (!)\nIt was trained to not need CFG—the guidance\nis \"baked in\" during distillation."
      },
      {
        "type": "quickwin",
        "content": "Module 3 complete! You understand the full diffusion process: forward noise addition, reverse denoising, Gaussian math, text guidance, and CFG scale."
      }
    ],
    "challenges": []
  },
  "4-1": {
    "id": "4-1",
    "moduleId": 4,
    "lessonNumber": 1,
    "title": "Attention Basics",
    "subtitle": "What is attention?",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "analogy",
        "title": "Highlighting a document",
        "content": "When you read a long document, you don't treat every word equally. You highlight key parts and skim others. Attention does the same: it lets the model focus on relevant parts of the input."
      },
      {
        "type": "text",
        "content": "For each position in the output, attention computes weights over the input: \"How much should I pay attention to each input element?\" High weights = high attention."
      },
      {
        "type": "interactive",
        "component": "AttentionBasics",
        "caption": "See which words attend to which in a sentence"
      },
      {
        "type": "code",
        "title": "Attention in pseudocode",
        "language": "python",
        "code": "def attention(query, keys, values):\n    # How similar is query to each key?\n    scores = dot_product(query, keys)  # shape: [num_keys]\n\n    # Convert to probabilities (sum to 1)\n    weights = softmax(scores)  # [0.1, 0.7, 0.1, 0.1]\n\n    # Weighted sum of values\n    output = sum(weights * values)\n\n    return output\n\n# \"cat\" might attend strongly to \"fluffy\" and \"orange\"\n# but weakly to \"the\" and \"on\""
      },
      {
        "type": "quickwin",
        "content": "You understand attention: a mechanism that computes relevance weights between different parts of the input."
      }
    ],
    "challenges": [
      {
        "id": "4-1-1",
        "type": "predict",
        "prompt": "In the sentence 'The cat sat on the mat because it was tired', what does 'it' refer to?",
        "choices": [
          {
            "id": "a",
            "text": "The mat (because it's the closest word)",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "The cat (because cats get tired, mats don't)",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "Both equally",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "The word 'sat'",
            "isCorrect": false
          }
        ],
        "hints": [
          "Which thing in the sentence can actually BE tired?",
          "Does a mat get tired?"
        ],
        "insight": "You figured that out instantly! But for a computer, it's hard. 'Attention' is how we teach computers to look at the RIGHT words. The computer learns that 'it' should pay attention to 'cat' because that's what makes sense."
      },
      {
        "id": "4-1-2",
        "type": "explain",
        "prompt": "Why does a computer need to 'pay attention' to certain parts of your text when making a picture?",
        "hints": [
          "If you say 'a BIG red car', which word matters most for size?",
          "What if the computer ignored some words?"
        ],
        "modelAnswer": "When you say 'a big red sports car driving fast', the computer needs to know: 'big' goes with the car's size, 'red' goes with color, 'fast' goes with motion blur. It can't just look at words randomly - it needs to connect the right descriptions to the right things!",
        "insight": "Attention helps the computer understand which words go together. 'Big RED car' means the CAR is red, not the road. The computer learns to focus on the right connections!"
      },
      {
        "id": "4-1-3",
        "type": "predict",
        "prompt": "In 'a cat wearing a tiny hat', the computer needs to know: does 'tiny' describe the cat or the hat? What should 'tiny' connect to?",
        "choices": [
          {
            "id": "a",
            "text": "The cat (making the whole cat tiny)",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "The hat (making just the hat tiny)",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "Everything equally",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "Nothing - 'tiny' is ignored",
            "isCorrect": false
          }
        ],
        "hints": [
          "Read the phrase carefully: 'a tiny hat'",
          "Which noun comes right after 'tiny'?"
        ],
        "insight": "'Tiny' connects to 'hat', not 'cat'. This word-to-object connection is exactly what attention computes. Without attention, the model might make a tiny cat with a normal hat—or worse, make everything tiny!"
      }
    ]
  },
  "4-2": {
    "id": "4-2",
    "moduleId": 4,
    "lessonNumber": 2,
    "title": "Self-Attention",
    "subtitle": "How patches relate to each other",
    "estimatedTime": "3 min",
    "sections": [
      {
        "type": "analogy",
        "title": "Everyone looking at everyone",
        "content": "Imagine a room where everyone can see everyone else, and they're all updating their opinions based on what others think. Self-attention lets every part of the image \"see\" every other part."
      },
      {
        "type": "text",
        "content": "In image generation, the picture is divided into patches (like tiles). Self-attention lets each patch consider all other patches when deciding its final value. This creates global coherence."
      },
      {
        "type": "interactive",
        "component": "SelfAttentionViz",
        "caption": "Click a patch to see what it attends to"
      },
      {
        "type": "code",
        "title": "Self-attention for images",
        "language": "python",
        "code": "# Divide 1024x1024 image into 16x16 patches\n# That's 64x64 = 4096 patches\n\ndef self_attention(patches):\n    # Each patch creates query, key, value\n    Q = linear_q(patches)  # \"What am I looking for?\"\n    K = linear_k(patches)  # \"What do I contain?\"\n    V = linear_v(patches)  # \"What information do I offer?\"\n\n    # Every patch attends to every other patch\n    attention_matrix = softmax(Q @ K.T)  # 4096 x 4096\n\n    # Aggregate information\n    output = attention_matrix @ V\n\n    return output"
      },
      {
        "type": "text",
        "content": "Why is this powerful? A patch showing a cat's ear can attend to the patch showing its body, learning they should have matching fur color. Without self-attention, patches would be processed independently, losing coherence."
      },
      {
        "type": "quickwin",
        "content": "You understand self-attention: every patch considers every other patch, enabling global coherence in generated images."
      }
    ],
    "challenges": [
      {
        "id": "4-2-1",
        "type": "predict",
        "prompt": "The computer is making a picture and needs to color one area red. How does it know which part should be red?",
        "choices": [
          {
            "id": "a",
            "text": "Random guess",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "It looks at your text to see what you said should be red",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "Red is always in the same spot",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "It copies from another picture",
            "isCorrect": false
          }
        ],
        "hints": [
          "You typed 'a red car on a green field'",
          "How does it know the car is red and the field is green?"
        ],
        "insight": "Each part of the picture 'asks' your text: 'what should I look like?' The car part finds 'red car' in your words. The background finds 'green field'. That's how text controls the picture!"
      },
      {
        "id": "4-2-2",
        "type": "diagnose",
        "prompt": "You asked for 'a blue cat and a red dog'. The picture shows a red cat and a blue dog - colors are swapped! Why might this happen?",
        "choices": [
          {
            "id": "a",
            "text": "The computer doesn't know colors",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "The computer mixed up which color goes with which animal",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "There weren't enough steps",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "The picture is too small",
            "isCorrect": false
          }
        ],
        "hints": [
          "It knows blue, it knows red, it knows cat, it knows dog...",
          "But matching them correctly is tricky!"
        ],
        "insight": "This is a real problem! The computer knows all the words separately, but connecting 'blue' to 'cat' and 'red' to 'dog' correctly is HARD. It sometimes mixes them up. This is something researchers are still trying to fix!"
      },
      {
        "id": "4-2-3",
        "type": "explain",
        "prompt": "Why do AI image generators sometimes mess up when you ask for 'X on the left and Y on the right'?",
        "hints": [
          "The computer learned what things LOOK like",
          "But did it learn where 'left' and 'right' are?"
        ],
        "modelAnswer": "The computer is great at knowing what a cat or dog looks like, but 'left' and 'right' are harder to learn. Most training pictures don't come with labels saying 'the cat is on the left'. So the computer isn't as good at positions as it is at appearances!",
        "insight": "AI image generators are better at WHAT things look like than WHERE things should go. Asking for 'cat on the left, dog on the right' is harder than just 'cat and dog'. Positions are still tricky!"
      }
    ]
  },
  "4-3": {
    "id": "4-3",
    "moduleId": 4,
    "lessonNumber": 3,
    "title": "DiT Architecture",
    "subtitle": "Transformers for diffusion",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "analogy",
        "title": "Assembly line vs all-in-one machine",
        "content": "Old diffusion models (U-Net) were like an assembly line: process at different scales, then combine. DiT (Diffusion Transformer) is like an all-in-one machine: everything flows through the same transformer blocks."
      },
      {
        "type": "text",
        "content": "DiT replaced the traditional U-Net architecture with pure transformers. Why? Transformers scale better—double the size, roughly double the quality. Plus, they're well-understood from language models."
      },
      {
        "type": "interactive",
        "component": "ArchitectureComparison",
        "caption": "Compare U-Net vs DiT architectures"
      },
      {
        "type": "code",
        "title": "DiT block",
        "language": "python",
        "code": "class DiTBlock:\n    def forward(self, x, time_embed, text_embed):\n        # 1. Self-attention (patches see each other)\n        x = self_attention(x) + x\n\n        # 2. Cross-attention (patches see text)\n        x = cross_attention(x, text_embed) + x\n\n        # 3. Feed-forward (process each patch)\n        x = feed_forward(x) + x\n\n        # Time embedding modulates everything\n        # (model knows which denoising step it's on)\n        return modulate(x, time_embed)"
      },
      {
        "type": "quickwin",
        "content": "You understand DiT: a transformer-based architecture that replaced U-Net for better scaling and quality."
      }
    ],
    "challenges": []
  },
  "4-4": {
    "id": "4-4",
    "moduleId": 4,
    "lessonNumber": 4,
    "title": "S3-DiT",
    "subtitle": "Z-Image's single-stream approach",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "analogy",
        "title": "Single conveyor belt",
        "content": "Traditional models have separate conveyor belts for text, image semantics, and pixels. S3-DiT puts everything on ONE belt—text tokens, semantic tokens, and image tokens flow through together."
      },
      {
        "type": "text",
        "content": "Z-Image uses S3-DiT (Scalable Single-Stream DiT). Instead of processing text and images separately then combining, it concatenates all tokens and processes them together. Fewer moving parts = faster."
      },
      {
        "type": "interactive",
        "component": "S3DiTDemo",
        "caption": "See how tokens flow through the single-stream architecture"
      },
      {
        "type": "code",
        "title": "Single-stream processing",
        "language": "python",
        "code": "# Traditional: separate streams\ntext_features = text_encoder(prompt)      # Stream 1\nimage_features = image_encoder(noisy)     # Stream 2\nsemantic = semantic_encoder(noisy)        # Stream 3\ncombined = complex_fusion(text, image, semantic)\n\n# S3-DiT: single stream\ntokens = concatenate([\n    text_tokens,      # From prompt\n    semantic_tokens,  # High-level meaning\n    image_tokens      # Patch representations\n])\n\n# Everything processed together!\noutput = transformer(tokens)  # Single stream"
      },
      {
        "type": "quickwin",
        "content": "Module 4 complete! You understand attention, self-attention, DiT architecture, and S3-DiT's single-stream approach."
      }
    ],
    "challenges": []
  },
  "5-1": {
    "id": "5-1",
    "moduleId": 5,
    "lessonNumber": 1,
    "title": "Latent Space",
    "subtitle": "Working in compressed form",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "analogy",
        "title": "Sheet music vs audio",
        "content": "Sheet music is a compressed representation of a song—it captures the essence in a fraction of the size. Musicians can reproduce the full audio from it. Latent space is like sheet music for images."
      },
      {
        "type": "text",
        "content": "A 1024×1024 RGB image has ~3 million numbers. Processing that directly is expensive. The VAE compresses it to a 128×128 latent (about 49K numbers)—60× smaller while preserving essential information."
      },
      {
        "type": "interactive",
        "component": "LatentViz",
        "caption": "See an image compressed to latent space and back"
      },
      {
        "type": "code",
        "title": "Compression ratios",
        "language": "text",
        "code": "Original image:  1024 × 1024 × 3 = 3,145,728 values\nLatent:          128 × 128 × 4   = 65,536 values\n\nCompression: ~48× smaller!\n\nThe diffusion process happens entirely in latent space.\nOnly at the end do we decompress to pixels."
      },
      {
        "type": "quickwin",
        "content": "You understand latent space: a compressed representation where diffusion operates efficiently."
      }
    ],
    "challenges": [
      {
        "id": "5-1-1",
        "type": "predict",
        "prompt": "A full picture has almost 800,000 numbers to describe it. A shrunken version might have only 16,000 numbers. Why is this helpful?",
        "choices": [
          {
            "id": "a",
            "text": "Smaller means the computer works 2x faster",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Smaller means the computer works a bit faster",
            "isCorrect": false
          },
          {
            "id": "c",
            "text": "Smaller means the computer works MUCH faster (like 50x!)",
            "isCorrect": true
          },
          {
            "id": "d",
            "text": "Size doesn't affect speed",
            "isCorrect": false
          }
        ],
        "hints": [
          "Less numbers = less work",
          "The speedup is HUGE, not small"
        ],
        "insight": "Working on a smaller version makes things about 50x faster! The computer does all the hard work on the small version, then expands it back to full size at the end."
      },
      {
        "id": "5-1-2",
        "type": "explain",
        "prompt": "If we shrink the picture 50x, don't we lose important details?",
        "hints": [
          "Most of a picture is repeated stuff - sky, grass, walls...",
          "What's REALLY important in a picture?"
        ],
        "modelAnswer": "Most of a picture is boring repeated stuff - blue sky, solid walls, grass. The important stuff is the shapes, edges, and main colors. When we shrink, we keep the important stuff and throw away the boring repetition!",
        "insight": "Pictures have lots of repetitive parts. The shrunken version keeps what matters - shapes, main colors, where things are. When we expand back to full size, we fill in the boring repetitive parts!"
      },
      {
        "id": "5-1-3",
        "type": "diagnose",
        "prompt": "A picture looks great when small, but when you zoom in, it has weird blocky squares. Why?",
        "choices": [
          {
            "id": "a",
            "text": "Not enough cleanup steps",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "The expand-back-to-full-size step can't add tiny details perfectly",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "The description was too short",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "Wrong file format",
            "isCorrect": false
          }
        ],
        "hints": [
          "The AI works on a small version",
          "Then it expands to full size",
          "Expanding can't perfectly recreate tiny details"
        ],
        "insight": "The computer works on a shrunken version, then expands it. But when expanding, it has to 'guess' the tiny details. Sometimes those guesses look blocky! This is a trade-off for the huge speed boost."
      }
    ]
  },
  "5-2": {
    "id": "5-2",
    "moduleId": 5,
    "lessonNumber": 2,
    "title": "Why Latent?",
    "subtitle": "Speed and memory benefits",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "analogy",
        "title": "Editing a sketch vs a mural",
        "content": "It's easier to edit a small sketch and then scale it up than to paint a huge mural directly. Working in latent space is like working on the sketch—same creative process, much less effort."
      },
      {
        "type": "text",
        "content": "Self-attention compares every element to every other element. For a 1024×1024 image, that's 1M × 1M comparisons—impossible. For a 128×128 latent, it's only 16K × 16K—4000× fewer operations!"
      },
      {
        "type": "interactive",
        "component": "ComputeComparison",
        "caption": "Compare compute requirements: pixel space vs latent space"
      },
      {
        "type": "code",
        "title": "The computational savings",
        "language": "text",
        "code": "Self-attention complexity: O(n²)\n\nPixel space (1024×1024 = 1M tokens):\n  1M² = 1,000,000,000,000 operations 💀\n\nLatent space (128×128 = 16K tokens):\n  16K² = 262,144,000 operations ✓\n\nThat's 4,000× less compute per attention layer!\n\nPlus: 48× less memory for activations\nPlus: Fewer channels to process\nResult: Feasible on consumer GPUs"
      },
      {
        "type": "quickwin",
        "content": "You understand why latent space: it makes self-attention computationally tractable."
      }
    ],
    "challenges": [
      {
        "id": "5-2-1",
        "type": "build",
        "prompt": "Put these steps in order - how does the AI actually make a picture?",
        "choices": [
          {
            "id": "encode",
            "text": "First: Shrink training pictures to learn from"
          },
          {
            "id": "noise_latent",
            "text": "Add static to those shrunken pictures"
          },
          {
            "id": "train",
            "text": "Train the AI to clean up the static"
          },
          {
            "id": "sample_noise",
            "text": "Later: Start with shrunken random static"
          },
          {
            "id": "denoise",
            "text": "Clean up the static using your words"
          },
          {
            "id": "decode",
            "text": "Finally: Expand to full size picture"
          }
        ],
        "correctOrder": [
          "encode",
          "noise_latent",
          "train",
          "sample_noise",
          "denoise",
          "decode"
        ],
        "hints": [
          "First the AI has to LEARN (training)",
          "Then it can MAKE pictures (the last 3 steps)"
        ],
        "insight": "Training: shrink pictures → add static → teach AI to clean it. Making pictures: start with static → clean it up → expand to full size. All the hard work happens on the small version!"
      },
      {
        "id": "5-2-2",
        "type": "predict",
        "prompt": "The 'shrinker' and 'expander' are taught first, separately. Then the static-cleaner is taught. Why not teach them all at once?",
        "choices": [
          {
            "id": "a",
            "text": "They ARE taught all at once",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Teaching one thing at a time is simpler and works better",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "Only the shrinker matters",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "It's random which order",
            "isCorrect": false
          }
        ],
        "hints": [
          "Teaching many things at once is confusing",
          "Step by step is easier"
        ],
        "insight": "One thing at a time! First teach the shrinker/expander to work well. THEN teach the static-cleaner. Simpler = more reliable = better results."
      },
      {
        "id": "5-2-3",
        "type": "explain",
        "prompt": "Why is this shrinking method called 'smart' shrinking? How is it different from just making the picture smaller?",
        "hints": [
          "Regular shrinking just averages pixels together",
          "Smart shrinking tries to keep the important stuff"
        ],
        "modelAnswer": "Regular shrinking (like saving a smaller JPEG) just squishes pixels together. Smart shrinking LEARNS what matters - it keeps edges, shapes, and meaningful features. When you expand back, you get a better result!",
        "insight": "The shrinker is trained to keep what matters! It doesn't just squish - it's smart about what to keep. That's why the expanded pictures look good instead of blocky garbage."
      }
    ]
  },
  "5-3": {
    "id": "5-3",
    "moduleId": 5,
    "lessonNumber": 3,
    "title": "The Decoder",
    "subtitle": "Back to pixels",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "analogy",
        "title": "Unzipping a file",
        "content": "When you unzip a file, you get back all the original data from the compressed version. The VAE decoder takes the latent representation and reconstructs a full-resolution image."
      },
      {
        "type": "interactive",
        "component": "DecoderDemo",
        "caption": "Watch the decoder expand latent space to full resolution"
      },
      {
        "type": "text",
        "content": "The decoder is a learned neural network—not a simple algorithm. It was trained on millions of images to learn how to reconstruct fine details from the compressed representation."
      },
      {
        "type": "code",
        "title": "VAE encode/decode",
        "language": "python",
        "code": "# The full VAE pipeline\nclass VAE:\n    def encode(self, image):\n        # 1024×1024×3 → 128×128×4\n        return self.encoder(image)\n\n    def decode(self, latent):\n        # 128×128×4 → 1024×1024×3\n        return self.decoder(latent)\n\n# In generation:\n# 1. Start with noise in latent space\n# 2. Denoise in latent space (all the diffusion magic)\n# 3. Decode final latent to pixels\npixels = vae.decode(denoised_latent)"
      },
      {
        "type": "quickwin",
        "content": "Module 5 complete! You understand VAEs: compression to latent space for efficient processing, then decoding back to pixels."
      }
    ],
    "challenges": []
  },
  "6-1": {
    "id": "6-1",
    "moduleId": 6,
    "lessonNumber": 1,
    "title": "Teacher-Student",
    "subtitle": "Learning to be fast",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "analogy",
        "title": "Master chef to line cook",
        "content": "A master chef takes an hour to make a perfect dish. They teach a line cook shortcuts—not every technique, but enough to make a 95% quality dish in 10 minutes. That's distillation."
      },
      {
        "type": "text",
        "content": "The \"teacher\" is a slow 50-step model that produces high-quality images. The \"student\" learns to match the teacher's outputs but in only 8 steps. It learns to take bigger leaps per step."
      },
      {
        "type": "interactive",
        "component": "TeacherStudentDemo",
        "caption": "Compare teacher (slow) vs student (fast) outputs"
      },
      {
        "type": "code",
        "title": "Distillation training",
        "language": "python",
        "code": "# Teacher: slow but high quality\nteacher_output = teacher.generate(prompt, steps=50)\n\n# Student: trying to match teacher with fewer steps\nstudent_output = student.generate(prompt, steps=8)\n\n# Loss: how different is student from teacher?\nloss = mse(student_output, teacher_output)\n\n# Train student to minimize this difference\nstudent.backward(loss)\n\n# After training, student produces similar quality\n# in 6× fewer steps!"
      },
      {
        "type": "quickwin",
        "content": "You understand distillation basics: a fast student model learns to match a slow teacher model's outputs."
      }
    ],
    "challenges": [
      {
        "id": "6-1-1",
        "type": "predict",
        "prompt": "A slow AI takes 50 steps to make a picture. A fast AI wants to do it in 8 steps. What does the fast AI learn from?",
        "choices": [
          {
            "id": "a",
            "text": "The original training pictures",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Each of the slow AI's 50 steps",
            "isCorrect": false
          },
          {
            "id": "c",
            "text": "Just the slow AI's FINAL picture",
            "isCorrect": true
          },
          {
            "id": "d",
            "text": "Nothing - it figures it out alone",
            "isCorrect": false
          }
        ],
        "hints": [
          "The fast AI can't copy all 50 steps in only 8 steps",
          "It just needs to end up at the same result"
        ],
        "insight": "The fast AI doesn't copy every step - it just learns to reach the same FINAL picture! 'I don't care how you got there, just match that end result in fewer steps.'"
      },
      {
        "id": "6-1-2",
        "type": "explain",
        "prompt": "Why not just train a fast 8-step AI from scratch? Why does it need to learn from a slow AI?",
        "hints": [
          "The slow AI already knows what good pictures look like",
          "8 steps alone is really hard to learn"
        ],
        "modelAnswer": "8 steps is too few to learn from scratch - each step would have to do way too much work! But if a slow AI shows it what the END result should look like, the fast AI can learn shortcuts to get there.",
        "insight": "Learning from a teacher is easier! The slow AI already knows how to make good pictures. The fast AI just learns: 'make something that looks like what the slow AI makes, but do it faster.'"
      },
      {
        "id": "6-1-3",
        "type": "diagnose",
        "prompt": "The fast AI's pictures look a bit 'smooth' compared to the slow AI - less tiny details. Why?",
        "choices": [
          {
            "id": "a",
            "text": "The fast AI is broken",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Fewer steps means less time to add tiny details",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "The slow AI was trained wrong",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "The pictures are too big",
            "isCorrect": false
          }
        ],
        "hints": [
          "Tiny details come in the last few steps",
          "With fewer steps, there's less time for details"
        ],
        "insight": "Tiny details (like hair texture or grass blades) come in the final steps. When you skip steps, you skip some of that detail work. That's the trade-off: faster = slightly less detailed."
      }
    ]
  },
  "6-2": {
    "id": "6-2",
    "moduleId": 6,
    "lessonNumber": 2,
    "title": "Distribution Matching",
    "subtitle": "Learning the style, not the specifics",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "analogy",
        "title": "Learning to cook \"in the style of\"",
        "content": "You don't learn to replicate every dish a chef makes. You learn their style—their flavor profiles, techniques, presentation. Then you can make your own dishes in their style. That's distribution matching."
      },
      {
        "type": "text",
        "content": "DMD (Distribution Matching Distillation) doesn't just match individual outputs. It ensures the student produces the same distribution of outputs as the teacher—same range of quality, diversity, and characteristics."
      },
      {
        "type": "interactive",
        "component": "DistributionDemo",
        "caption": "See how distribution matching ensures consistent quality"
      },
      {
        "type": "code",
        "title": "Distribution vs point matching",
        "language": "text",
        "code": "Point matching:\n  \"This specific image from teacher = this specific student output\"\n  Problem: Student might overfit to specific examples\n\nDistribution matching:\n  \"The set of all teacher outputs ≈ the set of all student outputs\"\n  Benefit: Student learns the general capability\n\nFor the same prompt, teacher produces many valid images.\nStudent should be able to produce the same variety."
      },
      {
        "type": "quickwin",
        "content": "You understand distribution matching: learning to match the overall output distribution, not just specific examples."
      }
    ],
    "challenges": [
      {
        "id": "6-2-1",
        "type": "predict",
        "prompt": "To go from 1000 steps to 8 steps, which works better?",
        "choices": [
          {
            "id": "a",
            "text": "Jump directly: 1000 → 8",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Gradually: 1000 → 500 → 250 → 125 → 64 → 32 → 16 → 8",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "Both work equally well",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "Neither works",
            "isCorrect": false
          }
        ],
        "hints": [
          "Is a giant leap easier or harder than small jumps?",
          "Each small jump is learnable"
        ],
        "insight": "Small jumps! Going from 1000 to 500 is hard but doable. Going from 1000 to 8 directly is way too big a leap. By halving repeatedly, each step is achievable!"
      },
      {
        "id": "6-2-2",
        "type": "predict",
        "prompt": "Each time we halve the steps (1000→500→250...), what happens to quality?",
        "choices": [
          {
            "id": "a",
            "text": "Drops by half each time",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Drops a tiny bit each time, adds up slowly",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "Stays perfectly the same",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "Gets better somehow",
            "isCorrect": false
          }
        ],
        "hints": [
          "Each shortcut loses a little bit",
          "But it's a SMALL loss each time",
          "The losses accumulate"
        ],
        "insight": "Each halving loses maybe 1-2% quality. After 7 halvings (1024→8), you might have lost 10-15% total. Still very good, but not perfect. This is the empirically-validated tradeoff."
      },
      {
        "id": "6-2-3",
        "type": "explain",
        "prompt": "Z-Image uses 8 steps and still looks almost as good as the slow 50-step version. How?",
        "hints": [
          "It's not just one trick",
          "Lots of smart people worked on this!"
        ],
        "modelAnswer": "It's many tricks combined! Gradual speedup (halving steps repeatedly), smarter architecture, better training techniques, and lots of tweaking. It took years of research to get 8 steps working this well!",
        "insight": "8 steps with 95% quality isn't just one trick - it's many improvements stacked together. Z-Image represents years of research and optimization by lots of smart people!"
      }
    ],
    "transferQuestion": {
      "id": "6-2-transfer",
      "type": "predict",
      "prompt": "Could we get down to just 1 step and still look good?",
      "hints": [],
      "insight": "Not yet! 1 step is too big a jump - you're asking the AI to go from pure static to a perfect picture instantly. 4-8 steps seems to be the minimum for good quality. Maybe someday!"
    }
  },
  "6-3": {
    "id": "6-3",
    "moduleId": 6,
    "lessonNumber": 3,
    "title": "Decoupled-DMD",
    "subtitle": "Z-Image's specific technique",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "analogy",
        "title": "Separating engine from steering",
        "content": "In a car, the engine provides power and the steering provides direction. They work together but can be tuned separately. Decoupled-DMD separates the \"power\" (CFG augmentation) from the \"direction\" (distribution matching)."
      },
      {
        "type": "text",
        "content": "Traditional distillation ties CFG guidance into the training. Decoupled-DMD separates them: train the core ability separately from the guidance mechanism. This allows better optimization of each."
      },
      {
        "type": "interactive",
        "component": "DecoupledDemo",
        "caption": "Visualize how decoupling improves training"
      },
      {
        "type": "code",
        "title": "Decoupled-DMD components",
        "language": "text",
        "code": "Traditional DMD:\n  loss = distribution_match + cfg_guided_match\n  (Tangled together, hard to optimize)\n\nDecoupled-DMD:\n  1. CFG Augmentation (the \"engine\")\n     - Teaches strong prompt following\n     - Trained separately\n\n  2. Distribution Matching (the \"steering\")\n     - Ensures output diversity matches teacher\n     - Trained separately\n\n  3. DMDR bonus\n     - Adds RL fine-tuning for aesthetics\n     - Polishes final quality\n\nResult: 8 steps, CFG=0, high quality"
      },
      {
        "type": "quickwin",
        "content": "Module 6 complete! You understand why Z-Image is fast: distillation, distribution matching, and decoupled training."
      }
    ],
    "challenges": []
  },
  "7-1": {
    "id": "7-1",
    "moduleId": 7,
    "lessonNumber": 1,
    "title": "The Full Pipeline",
    "subtitle": "End-to-end walkthrough",
    "estimatedTime": "3 min",
    "sections": [
      {
        "type": "text",
        "content": "Let's trace what happens when you type \"a cat wearing sunglasses on a beach\" and hit generate. Every concept we've learned comes together."
      },
      {
        "type": "interactive",
        "component": "FullPipeline",
        "caption": "Interactive: step through the complete generation process"
      },
      {
        "type": "code",
        "title": "Complete pipeline",
        "language": "python",
        "code": "def generate(prompt: str) -> Image:\n    # STEP 1: Tokenization\n    # \"a cat wearing sunglasses\" → [1, 5847, 5765, 41031]\n    tokens = tokenizer.encode(prompt)\n\n    # STEP 2: Text Encoding\n    # Token IDs → contextual embeddings\n    # Each token becomes a 768-dim vector\n    text_embed = text_encoder(tokens)\n\n    # STEP 3: Start with Noise\n    # Random Gaussian noise in latent space\n    latent = torch.randn(1, 4, 128, 128)\n\n    # STEP 4: Iterative Denoising (8 steps)\n    for step in range(8):\n        # S3-DiT predicts noise to remove\n        # Uses self-attention + cross-attention\n        noise_pred = transformer(\n            latent,\n            text_embed,\n            step\n        )\n        # Remove predicted noise\n        latent = scheduler.step(latent, noise_pred, step)\n\n    # STEP 5: VAE Decode\n    # 128×128 latent → 1024×1024 RGB\n    image = vae.decode(latent)\n\n    return image"
      },
      {
        "type": "quickwin",
        "content": "You can now trace the full pipeline: tokenize → encode → noise → denoise × 8 → decode."
      }
    ],
    "challenges": [
      {
        "id": "7-1-1",
        "type": "build",
        "prompt": "Put all the steps in order - what happens when you type 'a cat astronaut':",
        "choices": [
          {
            "id": "text",
            "text": "You type: 'a cat astronaut'"
          },
          {
            "id": "tokenize",
            "text": "Break words into chunks the AI knows"
          },
          {
            "id": "embed",
            "text": "Turn those chunks into 'smart numbers'"
          },
          {
            "id": "noise",
            "text": "Start with random static (small version)"
          },
          {
            "id": "denoise",
            "text": "Clean up the static in 8 steps, guided by your words"
          },
          {
            "id": "decode",
            "text": "Expand to full size picture"
          },
          {
            "id": "display",
            "text": "Show you the final picture!"
          }
        ],
        "correctOrder": [
          "text",
          "tokenize",
          "embed",
          "noise",
          "denoise",
          "decode",
          "display"
        ],
        "hints": [
          "First the AI needs to understand your words",
          "Then it makes the picture from static",
          "Finally it shows you the result"
        ],
        "insight": "That's the whole thing! Your words → break into chunks → understand meaning → start with static → clean up 8 times → expand to full size → done! Each part we learned fits together."
      },
      {
        "id": "7-1-2",
        "type": "predict",
        "prompt": "Making a picture takes about 1 second. Where does most of that time go?",
        "choices": [
          {
            "id": "a",
            "text": "Half on understanding words, half on making the picture",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Most of the time (80%) on the 8 cleanup steps",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "Most on expanding to full size",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "Equal time on each step",
            "isCorrect": false
          }
        ],
        "hints": [
          "The cleanup step runs 8 times",
          "Understanding words is fast - just once"
        ],
        "insight": "The 8 cleanup steps take most of the time! Understanding your words is fast (done once). Expanding to full size is quick. The cleanup is the hard part - that's why the 50→8 step speedup matters so much!"
      },
      {
        "id": "7-1-3",
        "type": "explain",
        "prompt": "In your own words, why does Z-Image-Turbo work so well?",
        "hints": [
          "Think about all the clever tricks",
          "How is it both FAST and GOOD?"
        ],
        "modelAnswer": "It stacks clever tricks: (1) cleaning up static is easier than creating from nothing, (2) working on a small version is way faster, (3) using 'attention' connects your words to the picture, (4) learning from a slow AI to take shortcuts, (5) years of improvements by researchers!",
        "insight": "Z-Image-Turbo combines all the clever tricks we learned! Static cleanup + small version + attention + shortcuts from slow AI = fast AND high quality. Each trick solves one problem, and together they're amazing!"
      }
    ]
  },
  "7-2": {
    "id": "7-2",
    "moduleId": 7,
    "lessonNumber": 2,
    "title": "Tradeoffs",
    "subtitle": "Engineering decisions and their consequences",
    "estimatedTime": "3 min",
    "sections": [
      {
        "type": "text",
        "content": "Every design choice involves tradeoffs. Understanding them helps you appreciate why Z-Image works the way it does—and what alternatives exist."
      },
      {
        "type": "interactive",
        "component": "TradeoffExplorer",
        "caption": "Explore the tradeoff space: speed vs quality vs memory"
      },
      {
        "type": "code",
        "title": "Key tradeoffs",
        "language": "text",
        "code": "STEPS (8 vs 50)\n├─ Fewer steps = faster generation\n├─ Fewer steps = potentially lower quality\n└─ Z-Image: Distillation recovers quality\n\nMODEL SIZE (6B parameters)\n├─ Larger = higher quality, more knowledge\n├─ Larger = more memory, slower inference\n└─ Z-Image: 6B fits in 16GB VRAM (sweet spot)\n\nLATENT SIZE (128×128)\n├─ Smaller = faster attention, less memory\n├─ Smaller = less detail preserved\n└─ Z-Image: Powerful decoder compensates\n\nCFG SCALE (0 vs 7)\n├─ Higher = better prompt following\n├─ Higher = requires 2× compute (conditional + unconditional)\n└─ Z-Image: CFG=0, guidance baked into distillation"
      },
      {
        "type": "quickwin",
        "content": "You understand the tradeoff space: every choice optimizes for something at the cost of something else."
      }
    ],
    "challenges": [
      {
        "id": "7-2-1",
        "type": "identify",
        "prompt": "Which is something AI image makers are actually GOOD at?",
        "choices": [
          {
            "id": "a",
            "text": "Writing specific text on signs",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Counting exactly 5 apples",
            "isCorrect": false
          },
          {
            "id": "c",
            "text": "Making pictures in any art style",
            "isCorrect": true
          },
          {
            "id": "d",
            "text": "Putting red on the cat and blue on the dog (not mixed up)",
            "isCorrect": false
          }
        ],
        "hints": [
          "What do these AIs struggle with?",
          "What are they really good at?"
        ],
        "insight": "AI image makers are GREAT at different styles - cartoon, realistic, painting, etc. But they struggle with: writing text, counting things, putting things in exact positions, and keeping colors matched to the right objects!"
      },
      {
        "id": "7-2-2",
        "type": "diagnose",
        "prompt": "You ask for 'a person holding a sign that says HELLO'. The sign has weird scrambled letters. Why is text so hard?",
        "hints": [
          "Letters need to be EXACTLY right",
          "The AI learned what text LOOKS like, not how to spell"
        ],
        "insight": "Text needs to be perfect - 'HELO' is wrong! The AI learned that text is squiggly lines on signs, but it didn't learn actual spelling. It can make things that LOOK like text but can't actually write specific words reliably.",
        "modelAnswer": "The AI sees text as a pattern - 'squiggly lines on a sign'. It didn't learn that H-E-L-L-O has to be in that exact order. Close enough is fine for a cat (still looks like a cat!), but 'HLLEO' is NOT 'HELLO'."
      },
      {
        "id": "7-2-3",
        "type": "predict",
        "prompt": "Guidance strength setting: low (3) vs high (15). What's the trade-off?",
        "choices": [
          {
            "id": "a",
            "text": "Speed vs quality",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Follows your words more vs looks more natural",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "Bigger picture vs smaller picture",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "More colors vs less colors",
            "isCorrect": false
          }
        ],
        "hints": [
          "Low = AI ignores some of your words",
          "High = AI follows your words TOO much"
        ],
        "insight": "Low guidance = natural looking but might ignore parts of what you said. High guidance = follows your words exactly but looks overdone (too bright, too perfect). The middle (7-12) usually works best!"
      }
    ],
    "transferQuestion": {
      "id": "7-2-transfer",
      "type": "explain",
      "prompt": "Someone asks for 'a red dog on the left and a blue dog on the right' but the colors are swapped. Why does this happen?",
      "hints": [],
      "insight": "The AI knows 'red', 'blue', 'dog', 'left', 'right' separately, but connecting them correctly is hard! It might accidentally put 'red' on the wrong dog. Complex prompts with multiple objects and colors are tricky. Simpler prompts work better!"
    }
  },
  "7-3": {
    "id": "7-3",
    "moduleId": 7,
    "lessonNumber": 3,
    "title": "What's Next?",
    "subtitle": "Future directions and your journey",
    "estimatedTime": "2 min",
    "sections": [
      {
        "type": "text",
        "content": "You now understand diffusion models deeply! Here's where the field is heading, and how you can continue learning."
      },
      {
        "type": "code",
        "title": "Future research directions",
        "language": "text",
        "code": "1. FEWER STEPS\n   Current: 8 steps\n   Future: 1-4 steps with flow matching\n\n2. SMALLER MODELS\n   Current: 6B parameters\n   Future: Mixture of Experts (activate only part)\n\n3. ON-DEVICE\n   Current: Needs GPU\n   Future: Mobile-optimized architectures\n\n4. VIDEO\n   Current: Single images\n   Future: Consistent video generation\n\n5. 3D\n   Current: 2D images\n   Future: Native 3D object generation"
      },
      {
        "type": "text",
        "content": "Your mental model is now solid. You can read ML papers about diffusion, understand architecture discussions, and appreciate engineering tradeoffs. The concepts will click."
      },
      {
        "type": "interactive",
        "component": "FinalQuiz",
        "caption": "Test your knowledge with a final quiz"
      },
      {
        "type": "quickwin",
        "content": "Congratulations! You've completed the course. You now understand diffusion models from first principles to implementation details."
      }
    ],
    "challenges": []
  },
  "8-1": {
    "id": "8-1",
    "moduleId": 8,
    "lessonNumber": 1,
    "title": "What's Next?",
    "subtitle": "You understand it - now what?",
    "sections": [],
    "challenges": [
      {
        "id": "8-1-1",
        "type": "identify",
        "prompt": "You now understand the concepts behind AI image makers. But understanding how a car engine works doesn't mean you can build one. What else would you need?",
        "choices": [
          {
            "id": "a",
            "text": "More conceptual understanding",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Programming skills to turn concepts into code",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "Knowing why the small version is faster",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "Understanding attention better",
            "isCorrect": false
          }
        ],
        "hints": [
          "You understand WHAT happens, but could you MAKE it happen?",
          "Concepts live in your head. Code runs on computers."
        ],
        "insight": "Understanding and building are different skills! You know WHAT these AIs do and WHY, but turning that into working code requires programming (Python) and AI tools (PyTorch). This course gave you the foundation—the next step is learning to code."
      },
      {
        "id": "8-1-2",
        "type": "build",
        "prompt": "Put these skills in order from 'you have now' to 'needed to build AI':",
        "choices": [
          {
            "id": "concepts",
            "text": "Understanding how AI image makers work"
          },
          {
            "id": "python",
            "text": "Python programming"
          },
          {
            "id": "pytorch",
            "text": "PyTorch (AI programming tool)"
          },
          {
            "id": "training",
            "text": "Training AI models"
          },
          {
            "id": "gpu",
            "text": "Working with powerful graphics cards"
          }
        ],
        "correctOrder": [
          "concepts",
          "python",
          "pytorch",
          "training",
          "gpu"
        ],
        "hints": [
          "You just finished this course!",
          "Each skill builds on the previous one"
        ],
        "insight": "Your path: concepts (done!) → learn Python → learn PyTorch → learn to train AI → learn about graphics cards. Each step prepares you for the next!"
      },
      {
        "id": "8-1-3",
        "type": "predict",
        "prompt": "How long would it take to go from 'finished this course' to 'can actually work on Z-Image-Turbo'?",
        "choices": [
          {
            "id": "a",
            "text": "A weekend",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "A few weeks",
            "isCorrect": false
          },
          {
            "id": "c",
            "text": "A few months of learning",
            "isCorrect": true
          },
          {
            "id": "d",
            "text": "Many years of study",
            "isCorrect": false
          }
        ],
        "hints": [
          "You need to learn programming first",
          "But you don't need to become a professor!"
        ],
        "insight": "Honest answer: a few months of learning. You already understand the ideas (huge head start!). You'd need to learn programming and AI tools. Not years, but not days either. Totally doable if you're motivated!"
      },
      {
        "id": "8-1-4",
        "type": "predict",
        "prompt": "To work with AI image makers (running them, training on new pictures, tweaking settings), how much math do you actually need?",
        "choices": [
          {
            "id": "a",
            "text": "A lot - you need calculus and linear algebra",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Very little - mostly just understanding what settings do",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "None at all - computers do everything",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "You need a PhD in mathematics",
            "isCorrect": false
          }
        ],
        "hints": [
          "What do most people actually DO with these AIs?",
          "Running experiments vs inventing new algorithms"
        ],
        "insight": "Good news: you don't need much math! For practical work, you need to understand 'this setting makes pictures follow words more' - not the equations behind it. Deep math is only needed if you want to invent NEW techniques (that's research, not practical work)."
      },
      {
        "id": "8-1-5",
        "type": "explain",
        "prompt": "You just learned that practical AI work doesn't need deep math. Why do you think that is? What's the difference between USING these tools and INVENTING them?",
        "hints": [
          "Think about driving a car vs designing an engine",
          "The tools are already built - you just need to know how to use them"
        ],
        "modelAnswer": "The hard math was done by researchers who INVENTED these techniques. But to USE them, you just need to know what buttons do - like driving a car without understanding the engine. 'Guidance = 7 looks good, guidance = 15 looks weird' - that's practical knowledge, not math!",
        "insight": "Using tools vs inventing them are different skills! Researchers need deep math to create new techniques. But you can do amazing practical work by understanding what the tools DO, not how they were built. Programming skills matter more than math for most work."
      }
    ],
    "transferQuestion": {
      "id": "8-1-transfer",
      "type": "predict",
      "prompt": "Someone asks: 'Should I take a hard math class before playing with AI image makers?' What would you say?",
      "hints": [],
      "insight": "No way - just start playing! You learn by doing. Math can come later if you want to go really deep. For now, experimenting and having fun is the best way to learn!"
    }
  },
  "8-2": {
    "id": "8-2",
    "moduleId": 8,
    "lessonNumber": 2,
    "title": "Looking at Real Code",
    "subtitle": "How to explore AI projects",
    "sections": [],
    "challenges": [
      {
        "id": "8-2-1",
        "type": "build",
        "prompt": "If you open a real AI image project, what should you look at first to last?",
        "choices": [
          {
            "id": "readme",
            "text": "README: how to actually run it"
          },
          {
            "id": "config",
            "text": "Settings files: what can you change?"
          },
          {
            "id": "pipeline",
            "text": "Main flow: how words become pictures"
          },
          {
            "id": "unet",
            "text": "The cleanup part: how static becomes pictures"
          },
          {
            "id": "attention",
            "text": "Attention: how words connect to pictures"
          }
        ],
        "correctOrder": [
          "readme",
          "config",
          "pipeline",
          "unet",
          "attention"
        ],
        "hints": [
          "Start simple - how do you run it?",
          "Go from easy to hard"
        ],
        "insight": "Start simple! First figure out how to run it. Then look at settings. Then the main flow. Only later dive into the complicated parts. Don't start with the hardest stuff!"
      },
      {
        "id": "8-2-2",
        "type": "predict",
        "prompt": "Where in the code would you find the 'guidance strength' setting?",
        "choices": [
          {
            "id": "a",
            "text": "In the shrinking part",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "In the word-breaking part",
            "isCorrect": false
          },
          {
            "id": "c",
            "text": "In the main picture-making part",
            "isCorrect": true
          },
          {
            "id": "d",
            "text": "In the attention part",
            "isCorrect": false
          }
        ],
        "hints": [
          "Guidance affects how the AI follows your words",
          "This happens when making the picture"
        ],
        "insight": "Look in the main picture-making code! Files often named 'pipeline' or 'sample' or 'inference'. The guidance strength is applied during the cleanup steps."
      },
      {
        "id": "8-2-3",
        "type": "diagnose",
        "prompt": "Z-Image uses 8 steps. You change it to 4 steps. The pictures look terrible. Why?",
        "choices": [
          {
            "id": "a",
            "text": "The AI was specifically trained for 8 steps",
            "isCorrect": true
          },
          {
            "id": "b",
            "text": "4 is an unlucky number",
            "isCorrect": false
          },
          {
            "id": "c",
            "text": "Your computer ran out of power",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "The words broke",
            "isCorrect": false
          }
        ],
        "hints": [
          "Remember how the fast AI learned from the slow AI?",
          "It learned to do exactly 8 steps"
        ],
        "insight": "The AI was trained specifically for 8 steps! You can't just change the number. The AI learned 'in exactly 8 jumps, go from static to picture'. Different number of jumps = confusion!"
      },
      {
        "id": "8-2-4",
        "type": "predict",
        "prompt": "In AI image code, you'll see something called a 'scheduler'. What do you think it controls?",
        "context": "Hint: It's not about timing or when things run. Think about the cleanup process from static to picture.",
        "choices": [
          {
            "id": "a",
            "text": "When the AI runs during the day",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "How much static there is at each cleanup step",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "How many pictures to make at once",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "The order of words in your prompt",
            "isCorrect": false
          }
        ],
        "hints": [
          "Step 1 has lots of static, step 8 has almost none",
          "Something needs to define the 'path' from noisy to clear"
        ],
        "insight": "The scheduler controls the noise level at each step! Step 1 = 100% static, step 4 = 50%, step 8 = almost 0%. It defines the 'path' from pure static to clear picture. Different schedulers take different paths (some go slow then fast, others stay steady)."
      },
      {
        "id": "8-2-5",
        "type": "explain",
        "prompt": "You learned that the scheduler defines how much static there is at each step. Why might different schedulers give different results? Why isn't there just one 'best' scheduler?",
        "hints": [
          "Think about going from static to clear - you could go slow at first then fast, or steady the whole way",
          "Different 'paths' might work better for different types of pictures"
        ],
        "modelAnswer": "Different paths work better for different things! Some schedulers spend more time on the early steps (figuring out the big shapes) and rush through details. Others do the opposite. Some pictures need more careful detail work, others need better composition. There's no single 'best' path!",
        "insight": "Schedulers are like different routes to the same destination. Some go through the mountains (slow start, fast finish), others take the highway (steady pace). Different routes work better for different trips - same with schedulers and different types of pictures!"
      }
    ]
  },
  "8-3": {
    "id": "8-3",
    "moduleId": 8,
    "lessonNumber": 3,
    "title": "How to Help",
    "subtitle": "Ways you can contribute right now",
    "sections": [],
    "challenges": [
      {
        "id": "8-3-1",
        "type": "identify",
        "prompt": "What's the BEST way to help an AI project right after finishing this course?",
        "choices": [
          {
            "id": "a",
            "text": "Redesign the whole thing",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Fix typos, improve explanations, add examples",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "Invent new techniques",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "Rewrite all the code",
            "isCorrect": false
          }
        ],
        "hints": [
          "What can you actually do RIGHT NOW?",
          "What uses your new knowledge without needing programming?"
        ],
        "insight": "Start small! You understand how this works now - use that to improve explanations that confuse others. Fix typos. Add examples. This is genuinely helpful and gets you familiar with the project!"
      },
      {
        "id": "8-3-2",
        "type": "build",
        "prompt": "Order these from 'easiest to do' to 'needs lots of experience':",
        "choices": [
          {
            "id": "docs",
            "text": "Fixing explanations and typos"
          },
          {
            "id": "bugs",
            "text": "Reporting problems you find"
          },
          {
            "id": "finetune",
            "text": "Training on new pictures"
          },
          {
            "id": "params",
            "text": "Testing different settings"
          },
          {
            "id": "arch",
            "text": "Changing how the AI works inside"
          }
        ],
        "correctOrder": [
          "docs",
          "bugs",
          "finetune",
          "params",
          "arch"
        ],
        "hints": [
          "What needs zero coding?",
          "What needs deep understanding?"
        ],
        "insight": "Start simple, work your way up! Docs → reporting bugs → training experiments → testing settings → changing the AI itself. Each level teaches you things for the next level!"
      },
      {
        "id": "8-3-3",
        "type": "predict",
        "prompt": "You train Z-Image on 1000 photos of YOUR cat. What happens?",
        "choices": [
          {
            "id": "a",
            "text": "Great at YOUR cat, worse at other stuff",
            "isCorrect": true
          },
          {
            "id": "b",
            "text": "Great at all cats",
            "isCorrect": false
          },
          {
            "id": "c",
            "text": "Better at everything",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "Nothing changes, 1000 is too few",
            "isCorrect": false
          }
        ],
        "hints": [
          "You're making it specialize",
          "When you focus on one thing..."
        ],
        "insight": "It becomes an expert on YOUR cat but might 'forget' other stuff! It's like studying only math and forgetting history. This is called 'catastrophic forgetting' - a real problem in AI!"
      },
      {
        "id": "8-3-4",
        "type": "predict",
        "prompt": "You find a bug in Z-Image but don't know how to fix the code. What's MOST helpful to the project owners?",
        "choices": [
          {
            "id": "a",
            "text": "Just say 'it's broken' and wait",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Write exactly how to trigger the bug: 'Do X, expect Y, get Z instead'",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "Guess at a fix even if you might be wrong",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "Don't report it - only experts should report bugs",
            "isCorrect": false
          }
        ],
        "hints": [
          "What does someone need to fix a problem?",
          "Can you fix something you can't see or reproduce?"
        ],
        "insight": "A clear bug report is incredibly valuable! 'When I do X, I expect Y, but I get Z instead' - that's often 80% of the work. The project owners know the code - they just need to SEE the problem. Your report helps them see it!"
      },
      {
        "id": "8-3-5",
        "type": "explain",
        "prompt": "You just learned that a good bug report is 'do X, expect Y, get Z'. Why is this format so helpful? Why can't project owners just fix things without reports?",
        "hints": [
          "The owners can't test every possible thing users might try",
          "They need to reproduce the problem to fix it"
        ],
        "modelAnswer": "Project owners can't possibly test everything! They might never use the AI the exact way you do. When you report 'I did X, expected Y, got Z', they can reproduce the problem on their computer. Once they can SEE it happening, they can figure out why and fix it. Without reproduction steps, they're searching blind!",
        "insight": "Reproducibility is everything in bug fixing! Developers can't fix what they can't see. Your detailed report turns an invisible problem into a visible one they can investigate. That's why good bug reports are often more valuable than attempted fixes!"
      }
    ],
    "transferQuestion": {
      "id": "8-3-transfer",
      "type": "predict",
      "prompt": "You have a cool idea for Z-Image. Should you write all the code first, or talk about your idea first?",
      "hints": [],
      "insight": "Talk first! Open a discussion: 'Hey, what if we did X?' The owners might say 'great idea!' or 'we tried that, here's why it failed' or 'do it this way instead'. Avoids wasted work!"
    }
  },
  "8-4": {
    "id": "8-4",
    "moduleId": 8,
    "lessonNumber": 4,
    "title": "Where to Go From Here",
    "subtitle": "Your next steps",
    "sections": [],
    "challenges": [
      {
        "id": "8-4-1",
        "type": "build",
        "prompt": "If you want to learn more, order these from 'start here' to 'advanced':",
        "choices": [
          {
            "id": "pytorch",
            "text": "PyTorch tutorials (learn the AI tool)"
          },
          {
            "id": "andrej",
            "text": "Andrej Karpathy's videos (great explainer!)"
          },
          {
            "id": "hugging",
            "text": "HuggingFace Diffusers (easy AI image library)"
          },
          {
            "id": "papers",
            "text": "Research papers (the hard stuff)"
          },
          {
            "id": "code",
            "text": "Read the actual Z-Image code"
          }
        ],
        "correctOrder": [
          "pytorch",
          "andrej",
          "hugging",
          "code",
          "papers"
        ],
        "hints": [
          "Start with the basics",
          "Save the hard stuff for later"
        ],
        "insight": "Path: Learn Python/PyTorch → watch Karpathy videos (he's amazing at explaining) → try HuggingFace (easy to use) → look at real code → read papers when you're ready. Don't start with papers!"
      },
      {
        "id": "8-4-2",
        "type": "predict",
        "prompt": "Should you start with the easy tools or learn everything from scratch?",
        "choices": [
          {
            "id": "a",
            "text": "Easy tools first - get results, then learn deeper",
            "isCorrect": true
          },
          {
            "id": "b",
            "text": "Learn everything from scratch first",
            "isCorrect": false
          },
          {
            "id": "c",
            "text": "Only use easy tools, never go deeper",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "Try to learn everything at once",
            "isCorrect": false
          }
        ],
        "hints": [
          "What keeps you excited?",
          "Seeing results vs studying for months"
        ],
        "insight": "Start with easy tools! Getting results keeps you excited. Use simple tools to make cool stuff, THEN go deeper to understand how it works. Much more fun than studying for months before making anything!"
      },
      {
        "id": "8-4-3",
        "type": "identify",
        "prompt": "What's the BEST way to learn from real AI code?",
        "choices": [
          {
            "id": "a",
            "text": "Read every file from start to finish",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Run it and see what happens, add test messages",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "Memorize diagrams",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "Only read the math parts",
            "isCorrect": false
          }
        ],
        "hints": [
          "Reading vs doing",
          "What actually helps you understand?"
        ],
        "insight": "Run it! Add messages like 'I'm here now!' to see what the code actually does. You'll learn in 1 hour what would take days of just reading. Learning by doing beats learning by reading!"
      },
      {
        "id": "8-4-4",
        "type": "predict",
        "prompt": "After a few months of weekend learning, which of these could you realistically do?",
        "choices": [
          {
            "id": "a",
            "text": "Invent new AI techniques that beat the experts",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "Run experiments, understand code, help improve docs, report bugs",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "Nothing useful - a few months isn't enough",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "Lead a team of AI researchers",
            "isCorrect": false
          }
        ],
        "hints": [
          "What skills do a few months of practice build?",
          "Think about the contribution ladder from earlier"
        ],
        "insight": "A few months gets you a lot! You can run experiments, understand real code, help the community with docs and bug reports, and train models on your own data. That's meaningful! Inventing new techniques takes years - but you don't need that to contribute."
      },
      {
        "id": "8-4-5",
        "type": "explain",
        "prompt": "You just learned that a few months of learning lets you contribute meaningfully. Why is this good news? What does it mean for someone just starting out?",
        "hints": [
          "You don't need to be an expert to help",
          "Small contributions add up over time"
        ],
        "modelAnswer": "It means you can START contributing soon! You don't need years of study before being useful. Run experiments, report bugs, improve explanations - these are real contributions that help the project. And each contribution teaches you more. Small steps lead to big expertise over time!",
        "insight": "The barrier to contributing is lower than most people think! You don't need a PhD to help. A few months of consistent learning puts you in a position to contribute meaningfully - and contributing is how you learn faster!"
      },
      {
        "id": "8-4-6",
        "type": "predict",
        "prompt": "A friend says 'I'll start learning AI once I fully understand all the math and theory.' What will probably happen?",
        "choices": [
          {
            "id": "a",
            "text": "They'll become an expert before starting",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "They'll never start - there's always more to learn first",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "They'll learn faster than everyone else",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "This is the best approach",
            "isCorrect": false
          }
        ],
        "hints": [
          "Is there ever a point where you 'fully understand everything'?",
          "What do successful learners actually do?"
        ],
        "insight": "They'll probably never start! There's always more to learn, so 'fully understanding first' means waiting forever. The people who actually get good are the ones who start before feeling ready, learn by doing, and figure things out as they go."
      }
    ],
    "transferQuestion": {
      "id": "8-4-transfer",
      "type": "explain",
      "prompt": "You just learned that waiting to 'fully understand' means never starting. In your own words, what's a better approach? What should someone do instead?",
      "hints": [
        "Think about learn-by-doing",
        "What's the relationship between doing and understanding?"
      ],
      "insight": "Just start! Doing builds understanding faster than studying. Make mistakes, ask questions, try things. The experts you admire? They started before they were ready too. Understanding comes FROM doing, not before it. You're ready enough right now!"
    }
  }
};

export function getLesson(moduleId: number, lessonNumber: number): Lesson | null {
  return lessons[`${moduleId}-${lessonNumber}`] || null;
}

export function getModule(moduleId: number): Module | null {
  return modules.find((m) => m.id === moduleId) || null;
}

export const TOTAL_CHALLENGES = Object.values(lessons).reduce(
  (sum, lesson) => sum + lesson.challenges.length + (lesson.transferQuestion ? 1 : 0),
  0
);


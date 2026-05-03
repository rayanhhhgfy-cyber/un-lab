// Refreshed Biology Data
import { Dna, Microscope, Heart, Leaf, Brain, Activity, Biohazard } from "lucide-react";

export interface BiologyBranch {
  id: string;
  title: string;
  icon: any;
  color: string;
  border: string;
  description: string;
  details: string;
}

export const biologyBranches: BiologyBranch[] = [
  {
    id: "genetics",
    title: "Genetics & DNA",
    icon: Dna,
    color: "text-emerald-400",
    border: "border-emerald-400/30",
    description: "Explore the code of life, heredity, and gene expression.",
    details: "Learn about DNA structure, Mendelian inheritance, CRISPR technology, and the future of genomics."
  },
  {
    id: "anatomy",
    title: "Human Anatomy",
    icon: Heart,
    color: "text-rose-400",
    border: "border-rose-400/30",
    description: "The complex systems that power the human body.",
    details: "Interactive models of the circulatory, nervous, and respiratory systems. Understand how your body works."
  },
  {
    id: "ecology",
    title: "Ecology & Nature",
    icon: Leaf,
    color: "text-green-400",
    border: "border-green-400/30",
    description: "Ecosystems, biodiversity, and conservation biology.",
    details: "Study the relationships between organisms and their environments. Protect our planet's biodiversity."
  },
  {
    id: "microbiology",
    title: "Microbiology",
    icon: Biohazard,
    color: "text-cyan-400",
    border: "border-cyan-400/30",
    description: "The invisible world of bacteria, viruses, and fungi.",
    details: "Discover how microorganisms affect our health, food, and the global environment."
  },
  {
    id: "cells",
    title: "Cell Biology",
    icon: Microscope,
    color: "text-teal-400",
    border: "border-teal-400/30",
    description: "The building blocks of all living organisms.",
    details: "Dive deep into organelles, cell membranes, and the fascinating process of mitosis."
  },
  {
    id: "neuroscience",
    title: "Neuroscience",
    icon: Brain,
    color: "text-purple-400",
    border: "border-purple-400/30",
    description: "The mysteries of the brain and nervous system.",
    details: "Explore neural networks, memory formation, and the biology of consciousness."
  }
];

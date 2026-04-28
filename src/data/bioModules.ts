import { Dna, Microscope, Heart, Leaf, Brain, Activity, Biohazard } from "lucide-react";

export interface BiologyBranch {
  path: string;
  title: string;
  titleAr: string;
  icon: any;
  color: string;
  border: string;
  description: string;
  descriptionAr: string;
  details: string;
  detailsAr: string;
}

export const biologyBranches: BiologyBranch[] = [
  {
    path: "/biology/genetics",
    title: "Genetics & DNA",
    titleAr: "الوراثة والحمض النووي",
    icon: Dna,
    color: "text-emerald-400",
    border: "border-emerald-400/30",
    description: "Explore the code of life, heredity, and gene expression.",
    descriptionAr: "استكشف شفرة الحياة، الوراثة، والتعبير الجيني.",
    details: "Learn about DNA structure, Mendelian inheritance, CRISPR technology, and the future of genomics.",
    detailsAr: "تعرف على هيكل الحمض النووي، قوانين مندل للوراثة، تقنية كريسبر، ومستقبل الجينوم."
  },
  {
    path: "/biology/anatomy",
    title: "Human Anatomy",
    titleAr: "تشريح الإنسان",
    icon: Heart,
    color: "text-rose-400",
    border: "border-rose-400/30",
    description: "The complex systems that power the human body.",
    descriptionAr: "الأنظمة المعقدة التي تشغل جسم الإنسان.",
    details: "Interactive models of the circulatory, nervous, and respiratory systems. Understand how your body works.",
    detailsAr: "نماذج تفاعلية لأجهزة الدوران والأعصاب والتنفس. افهم كيف يعمل جسمك."
  },
  {
    path: "/biology/ecology",
    title: "Ecology & Nature",
    titleAr: "البيئة والطبيعة",
    icon: Leaf,
    color: "text-green-400",
    border: "border-green-400/30",
    description: "Ecosystems, biodiversity, and conservation biology.",
    descriptionAr: "الأنظمة البيئية، التنوع البيولوجي، وعلم حفظ الأحياء.",
    details: "Study the relationships between organisms and their environments. Protect our planet's biodiversity.",
    detailsAr: "ادرس العلاقات بين الكائنات الحية وبيئاتها. احمِ التنوع البيولوجي لكوكبنا."
  },
  {
    path: "/biology/microbiology",
    title: "Microbiology",
    titleAr: "علم الأحياء الدقيقة",
    icon: Biohazard,
    color: "text-cyan-400",
    border: "border-cyan-400/30",
    description: "The invisible world of bacteria, viruses, and fungi.",
    descriptionAr: "العالم غير المرئي للبكتيريا والفيروسات والفطريات.",
    details: "Discover how microorganisms affect our health, food, and the global environment.",
    detailsAr: "اكتشف كيف تؤثر الكائنات الدقيقة على صحتنا وطعامنا والبيئة العالمية."
  },
  {
    path: "/biology/cells",
    title: "Cell Biology",
    titleAr: "بيولوجيا الخلية",
    icon: Microscope,
    color: "text-teal-400",
    border: "border-teal-400/30",
    description: "The building blocks of all living organisms.",
    descriptionAr: "وحدات البناء لجميع الكائنات الحية.",
    details: "Dive deep into organelles, cell membranes, and the fascinating process of mitosis.",
    detailsAr: "تعمق في العضيات، وأغشية الخلايا، وعملية الانقسام المتساوي الرائعة."
  },
  {
    path: "/biology/neuroscience",
    title: "Neuroscience",
    titleAr: "علم الأعصاب",
    icon: Brain,
    color: "text-purple-400",
    border: "border-purple-400/30",
    description: "The mysteries of the brain and nervous system.",
    descriptionAr: "أسرار الدماغ والجهاز العصبي.",
    details: "Explore neural networks, memory formation, and the biology of consciousness.",
    detailsAr: "استكشف الشبكات العصبية، وتكوين الذاكرة، وبيولوجيا الوعي."
  }
];

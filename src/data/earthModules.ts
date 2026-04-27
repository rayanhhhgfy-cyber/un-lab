import { Mountain, Wind, Droplets, Flame, Thermometer, Compass } from "lucide-react";

export interface EarthScienceBranch {
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

export const earthScienceBranches: EarthScienceBranch[] = [
  {
    path: "/earth-science/geology",
    title: "Geology",
    titleAr: "الجيولوجيا",
    icon: Mountain,
    color: "text-amber-400",
    border: "border-amber-400/30",
    description: "Rocks, minerals, and the Earth's crust.",
    descriptionAr: "الصخور، المعادن، وقشرة الأرض.",
    details: "Explore plate tectonics, earthquake mechanics, and the fascinating history of our planet's formation.",
    detailsAr: "استكشف الصفائح التكتونية، ميكانيكا الزلازل، والتاريخ المذهل لتكوين كوكبنا."
  },
  {
    path: "/earth-science/meteorology",
    title: "Meteorology",
    titleAr: "الأرصاد الجوية",
    icon: Wind,
    color: "text-sky-400",
    border: "border-sky-400/30",
    description: "Atmospheric science and weather patterns.",
    descriptionAr: "علوم الغلاف الجوي وأنماط الطقس.",
    details: "Understand how high and low pressure zones, the jet stream, and global warming affect our daily weather.",
    detailsAr: "افهم كيف تؤثر مناطق الضغط المرتفع والمنخفض، والتيار النفاث، والاحتباس الحراري على طقسنا اليومي."
  },
  {
    path: "/earth-science/volcanology",
    title: "Volcanology",
    titleAr: "علم البراكين",
    icon: Flame,
    color: "text-orange-500",
    border: "border-orange-500/30",
    description: "Magma, eruptions, and volcanic landscapes.",
    descriptionAr: "الصهارة، الثورات، والمناظر الطبيعية البركانية.",
    details: "Study the fiery heart of our planet, from deep-sea vents to massive stratovolcanoes.",
    detailsAr: "ادرس القلب الناري لكوكبنا، من الفتحات في أعماق البحار إلى البراكين الطبقية الضخمة."
  },
  {
    path: "/earth-science/hydrology",
    title: "Hydrology",
    titleAr: "الهيدرولوجيا",
    icon: Droplets,
    color: "text-blue-400",
    border: "border-blue-400/30",
    description: "The movement and distribution of water.",
    descriptionAr: "حركة وتوزيع المياه.",
    details: "Master the water cycle, ocean currents, and the critical science of groundwater preservation.",
    detailsAr: "أتقن دورة المياه، وتيارات المحيطات، والعلم الحاسم للحفاظ على المياه الجوفية."
  },
  {
    path: "/earth-science/climatology",
    title: "Climatology",
    titleAr: "علم المناخ",
    icon: Thermometer,
    color: "text-red-400",
    border: "border-red-400/30",
    description: "Long-term climate trends and global changes.",
    descriptionAr: "اتجاهات المناخ طويلة المدى والتغيرات العالمية.",
    details: "Analyze historical climate data and future projections to understand our changing world.",
    detailsAr: "حلل بيانات المناخ التاريخية والتوقعات المستقبلية لفهم عالمنا المتغير."
  },
  {
    path: "/earth-science/cartography",
    title: "Cartography & GPS",
    titleAr: "الخرائط والـ GPS",
    icon: Compass,
    color: "text-emerald-400",
    border: "border-emerald-400/30",
    description: "Mapping the world with precision.",
    descriptionAr: "رسم خرائط العالم بدقة.",
    details: "Learn the science of coordinates, topographic mapping, and modern satellite navigation systems.",
    detailsAr: "تعلم علم الإحداثيات، ورسم الخرائط الطبوغرافية، وأنظمة الملاحة الحديثة عبر الأقمار الصناعية."
  }
];

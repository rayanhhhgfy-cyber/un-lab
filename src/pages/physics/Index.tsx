import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Suspense, lazy } from "react";
import {
  Zap,
  Flame,
  Waves,
  Atom,
  Rocket,
  BookOpen,
  Calculator,
  ArrowRightLeft,
  BookA,
  Trophy,
  Eye,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  FlaskConical,
  Cpu,
  Activity,
  type LucideIcon,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

interface Branch {
  path: string;
  labelKey: string;
  descKey: string;
  icon: LucideIcon;
  gradient: string;
  glow: string;
  accent: string;
  chip: string;
  category: "core" | "tool";
}

const branches: Branch[] = [
  // Core branches
  { path: "/physics/mechanics", labelKey: "physics.branches.classical_mechanics", descKey: "physics.branches.classical_mechanics_desc", icon: Rocket, gradient: "from-cyan-400 via-sky-500 to-blue-600", glow: "shadow-cyan-500/40", accent: "text-cyan-300", chip: "border-cyan-400/25 bg-cyan-500/10 text-cyan-300", category: "core" },
  { path: "/physics/electromagnetism", labelKey: "physics.branches.electricity_magnetism", descKey: "physics.branches.electricity_magnetism_desc", icon: Zap, gradient: "from-yellow-400 via-amber-500 to-orange-500", glow: "shadow-amber-500/40", accent: "text-amber-300", chip: "border-amber-400/25 bg-amber-500/10 text-amber-300", category: "core" },
  { path: "/physics/thermodynamics", labelKey: "physics.branches.thermodynamics", descKey: "physics.branches.thermodynamics_desc", icon: Flame, gradient: "from-orange-500 via-red-500 to-rose-600", glow: "shadow-red-500/40", accent: "text-red-300", chip: "border-red-400/25 bg-red-500/10 text-red-300", category: "core" },
  { path: "/physics/waves", labelKey: "physics.branches.waves_optics", descKey: "physics.branches.waves_optics_desc", icon: Waves, gradient: "from-teal-400 via-cyan-500 to-blue-500", glow: "shadow-teal-500/40", accent: "text-teal-300", chip: "border-teal-400/25 bg-teal-500/10 text-teal-300", category: "core" },
  { path: "/physics/optics", labelKey: "physics.navigation.optics", descKey: "physics.optics.description", icon: Eye, gradient: "from-indigo-400 via-violet-500 to-purple-600", glow: "shadow-violet-500/40", accent: "text-violet-300", chip: "border-violet-400/25 bg-violet-500/10 text-violet-300", category: "core" },
  { path: "/physics/modern", labelKey: "physics.branches.modern_physics", descKey: "physics.branches.modern_physics_desc", icon: Atom, gradient: "from-fuchsia-400 via-purple-500 to-indigo-600", glow: "shadow-fuchsia-500/40", accent: "text-fuchsia-300", chip: "border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-300", category: "core" },
  // Tools
  { path: "/physics/library", labelKey: "physics.branches.physics_library", descKey: "physics.branches.physics_library_desc", icon: BookOpen, gradient: "from-emerald-400 via-teal-500 to-cyan-500", glow: "shadow-emerald-500/40", accent: "text-emerald-300", chip: "border-emerald-400/25 bg-emerald-500/10 text-emerald-300", category: "tool" },
  { path: "/physics/calculator", labelKey: "physics.branches.formula_calculator", descKey: "physics.branches.formula_calculator_desc", icon: Calculator, gradient: "from-sky-400 via-blue-500 to-indigo-500", glow: "shadow-sky-500/40", accent: "text-sky-300", chip: "border-sky-400/25 bg-sky-500/10 text-sky-300", category: "tool" },
  { path: "/physics/converter", labelKey: "physics.branches.unit_converter", descKey: "physics.branches.unit_converter_desc", icon: ArrowRightLeft, gradient: "from-pink-400 via-rose-500 to-red-500", glow: "shadow-pink-500/40", accent: "text-pink-300", chip: "border-pink-400/25 bg-pink-500/10 text-pink-300", category: "tool" },
  { path: "/physics/glossary", labelKey: "physics.branches.physics_glossary", descKey: "physics.branches.physics_glossary_desc", icon: BookA, gradient: "from-purple-400 via-fuchsia-500 to-pink-500", glow: "shadow-purple-500/40", accent: "text-purple-300", chip: "border-purple-400/25 bg-purple-500/10 text-purple-300", category: "tool" },
  { path: "/physics/challenges", labelKey: "physics.branches.challenges", descKey: "physics.branches.challenges_desc", icon: Trophy, gradient: "from-yellow-400 via-orange-500 to-red-500", glow: "shadow-orange-500/40", accent: "text-orange-300", chip: "border-orange-400/25 bg-orange-500/10 text-orange-300", category: "tool" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function PhysicsHomePage() {
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();
  const isArabic = i18n.language === "ar";

  const coreBranches = branches.filter((b) => b.category === "core");
  const toolBranches = branches.filter((b) => b.category === "tool");

  return (
    <div className={`min-h-screen relative w-full bg-black text-white overflow-x-hidden ${isArabic ? "rtl font-arabic" : "font-sans"}`}>
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[180px]"
              animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-violet-500/10 rounded-full blur-[180px]"
              animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[200px]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* 3D scene (desktop) */}
      {!isMobile && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12 pb-16 sm:pb-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <motion.div variants={itemVariants}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all group mb-10 sm:mb-14"
          >
            <ArrowLeft size={14} className={isArabic ? "rotate-180" : ""} />
            <span className="font-bold tracking-[0.2em] text-[10px] uppercase">
              {isArabic ? "العودة للرئيسية" : "Back to Home"}
            </span>
          </Link>
        </motion.div>

        {/* HERO */}
        <motion.section variants={itemVariants} className="mb-14 sm:mb-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-5 sm:mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-mono text-[10px] tracking-[0.3em] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              {isArabic ? "القطاع 01 · الفيزياء" : "Sector 01 · Physics"}
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tighter mb-5 sm:mb-7 leading-[0.85]">
            <span className="bg-gradient-to-br from-white via-cyan-100 to-blue-700/60 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              {t("physics.page_title")}
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light px-2">
            {t("physics.explore_subtitle")}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 mt-4 font-mono tracking-wider">
            {t("physics.stats")}
          </p>

          <motion.div
            variants={itemVariants}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center"
          >
            <Link
              to="/physics/mechanics"
              className="group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white font-bold text-sm shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-shadow"
            >
              <Rocket size={16} />
              <span>{t("physics.start_exploring")}</span>
              <ArrowRight size={16} className={`transition-transform group-hover:translate-x-1 ${isArabic ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
            </Link>
            <Link
              to="/physics/library"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md text-slate-200 font-bold text-sm hover:bg-white/[0.08] hover:border-white/25 transition-all"
            >
              <BookOpen size={15} />
              <span>{t("physics.branches.physics_library")}</span>
            </Link>
          </motion.div>
        </motion.section>

        {/* CORE BRANCHES */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-4">
            <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-300 font-bold">
              {isArabic ? "الفروع الأساسية" : "Core Branches"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-400 bg-clip-text text-transparent">
              {isArabic ? "استكشف الفيزياء" : "Explore Physics"}
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 mb-14 sm:mb-20"
        >
          {coreBranches.map((b, i) => (
            <BranchCard key={b.path} branch={b} index={i} total={coreBranches.length} isArabic={isArabic} t={t} />
          ))}
        </motion.div>

        {/* TOOLS SECTION */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-4">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-300 font-bold">
              {isArabic ? "الأدوات والمراجع" : "Tools & References"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-orange-400 bg-clip-text text-transparent">
              {isArabic ? "مجموعة الأدوات" : "Toolkit"}
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5"
        >
          {toolBranches.map((b, i) => (
            <ToolCard key={b.path} branch={b} index={i} isArabic={isArabic} t={t} />
          ))}
        </motion.div>

        {/* Footer signature */}
        <motion.div
          variants={itemVariants}
          className="mt-16 sm:mt-24 pt-8 sm:pt-10 border-t border-white/[0.06] text-center flex items-center justify-center gap-3 text-slate-600"
        >
          <Sparkles size={12} className="text-cyan-500/40" />
          <span className="text-[10px] font-mono tracking-[0.5em] uppercase">
            {isArabic ? "قسم الفيزياء" : "UN · Physics Division"}
          </span>
          <Activity size={12} className="text-cyan-500/40" />
        </motion.div>
      </motion.div>
    </div>
  );
}

interface BranchCardProps {
  branch: Branch;
  index: number;
  total: number;
  isArabic: boolean;
  t: (key: string) => string;
}

function BranchCard({ branch, index, total, isArabic, t }: BranchCardProps) {
  const Icon = branch.icon;
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <Link to={branch.path} className="block group h-full">
        <div className={`relative overflow-hidden rounded-3xl p-[1.5px] bg-gradient-to-br ${branch.gradient} shadow-2xl ${branch.glow} hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] transition-shadow duration-500 h-full`}>
          <div className="relative overflow-hidden rounded-[22px] bg-black/95 backdrop-blur-2xl p-6 sm:p-7 md:p-8 h-full min-h-[290px] sm:min-h-[320px] flex flex-col">
            <div className={`absolute -top-24 ${isArabic ? "-left-24" : "-right-24"} w-56 h-56 rounded-full bg-gradient-to-br ${branch.gradient} opacity-20 blur-3xl group-hover:opacity-35 transition-opacity duration-700`} />
            <div className={`absolute -bottom-20 ${isArabic ? "-right-20" : "-left-20"} w-44 h-44 rounded-full bg-gradient-to-tr ${branch.gradient} opacity-10 blur-3xl group-hover:opacity-25 transition-opacity duration-700`} />

            <motion.svg
              className={`absolute top-5 ${isArabic ? "left-5" : "right-5"} w-24 h-24 sm:w-28 sm:h-28 ${branch.accent} opacity-[0.08] group-hover:opacity-25 transition-opacity duration-500`}
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
              <ellipse cx="50" cy="50" rx="45" ry="18" strokeWidth="0.8" />
              <ellipse cx="50" cy="50" rx="45" ry="18" strokeWidth="0.8" transform="rotate(60 50 50)" />
              <ellipse cx="50" cy="50" rx="45" ry="18" strokeWidth="0.8" transform="rotate(120 50 50)" />
              <circle cx="50" cy="50" r="4" fill="currentColor" />
            </motion.svg>

            <div className="relative flex flex-col h-full">
              <div className="flex items-start justify-between mb-5">
                <motion.div
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${branch.gradient} flex items-center justify-center shadow-2xl ${branch.glow} ring-4 ring-white/[0.06]`}
                  whileHover={{ rotate: [0, -6, 6, 0], scale: 1.06 }}
                  transition={{ duration: 0.55 }}
                >
                  <Icon size={28} strokeWidth={2} className="text-white relative z-10 drop-shadow-lg" />
                  <span className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${branch.gradient} opacity-40 blur-md group-hover:blur-xl group-hover:opacity-70 transition-all duration-500`} />
                </motion.div>
                <span className={`text-[10px] uppercase tracking-[0.25em] font-black ${branch.accent} opacity-60 mt-1`}>
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-[1.5rem] font-black text-white mb-2 leading-tight tracking-tight group-hover:text-cyan-200 transition-colors">
                {t(branch.labelKey)}
              </h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed line-clamp-3">
                {t(branch.descKey)}
              </p>

              <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-bold text-slate-200 group-hover:text-white transition-colors uppercase tracking-[0.2em]">
                  {isArabic ? "ادخل" : "Enter"}
                </span>
                <motion.div
                  className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${branch.gradient} flex items-center justify-center shadow-lg ${branch.glow} group-hover:shadow-xl`}
                  whileHover={{ x: isArabic ? -4 : 4, scale: 1.08 }}
                >
                  <ArrowRight size={16} strokeWidth={2.5} className={`text-white ${isArabic ? "rotate-180" : ""}`} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ToolCard({ branch, index, isArabic, t }: { branch: Branch; index: number; isArabic: boolean; t: (key: string) => string }) {
  const Icon = branch.icon;
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <Link to={branch.path} className="block group h-full">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl p-5 sm:p-6 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 h-full">
          <div className={`absolute -top-12 ${isArabic ? "-left-12" : "-right-12"} w-32 h-32 rounded-full bg-gradient-to-br ${branch.gradient} opacity-10 blur-2xl group-hover:opacity-25 transition-opacity duration-500`} />

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${branch.gradient} flex items-center justify-center shadow-lg ${branch.glow}`}>
                <Icon size={20} strokeWidth={2} className="text-white" />
              </div>
              <ArrowRight size={14} className={`${branch.accent} opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all ${isArabic ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-tight">
              {t(branch.labelKey)}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
              {t(branch.descKey)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Database,
  ShieldCheck,
  FlaskConical,
  Sparkles,
  Sigma,
  Wrench,
  BookOpen,
  RefreshCw,
  BookMarked,
  Settings2,
  Star,
} from "lucide-react";
import { mathBranches } from "@/data/mathModules";
import { mathFormulaCategories } from "@/data/mathFormulas";
import { mathGlossary } from "@/data/mathGlossary";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMathPortalPrefs } from "@/contexts/MathPortalPrefsContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

const topicsByPath: Record<string, { en: string[]; ar: string[] }> = {
  "/mathematics/calculus": { en: ["Riemann", "Newton", "Euler", "Descent"], ar: ["ريمان", "نيوتن", "أويلر", "انحدار"] },
  "/mathematics/algebra": { en: ["Quadratics", "Complex plane", "Roots"], ar: ["تربيعي", "المركب", "الجذور"] },
  "/mathematics/trigonometry": { en: ["Unit circle", "Fourier", "Lissajous"], ar: ["دائرة الوحدة", "فورييه", "ليساجو"] },
  "/mathematics/geometry": { en: ["Mandelbrot", "Julia", "Vectors"], ar: ["ماندلبرو", "جوليا", "متجهات"] },
  "/mathematics/statistics": { en: ["Gaussian", "Binomial", "MC π"], ar: ["نورمال", "ثنائي الحدين", "π مونت كارلو"] },
  "/mathematics/dynamics": { en: ["Logistic", "Fibonacci", "Lotka"], ar: ["لوجستي", "فيبوناتشي", "لوطكا"] },
};

export default function MathematicsPage() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isMobile = useIsMobile();
  const { toggleBookmark, isBookmarked, bookmarks } = useMathPortalPrefs();

  const totalLabs = mathBranches.reduce((n, b) => n + b.experiments.length, 0);
  const formulaCount = mathFormulaCategories.reduce((n, c) => n + c.items.length, 0);
  const glossaryCount = mathGlossary.length;

  const portalLinks = [
    {
      to: "/mathematics/tools/solver",
      Icon: Wrench,
      title: isArabic ? "حلّ المعادلات" : "Equation solver",
      desc: isArabic
        ? "تربيعي، خطي، C(n,k)، هيرون، %، قرض، gcd، تناسب، متتاليات…"
        : "Quadratic, linear, C(n,k), Heron, %, loan, gcd, proportion, sequences…",
      gradient: "from-violet-500/30 to-fuchsia-600/20",
    },
    {
      to: "/mathematics/tools/formulas",
      Icon: BookOpen,
      title: isArabic ? "موسوعة الصيغ" : "Formula library",
      desc: `${formulaCount}+ ${isArabic ? "صيغة في الجبر والتحليل والإحصاء" : "identities across algebra, calculus, stats"}`,
      gradient: "from-fuchsia-500/30 to-pink-600/20",
    },
    {
      to: "/mathematics/tools/converter",
      Icon: RefreshCw,
      title: isArabic ? "محولات" : "Converters",
      desc: isArabic
        ? "زوايا، قطبي، مساحة، حجم، حرارة، كتلة، بيانات (ثنائي)…"
        : "Angles, polar, area, volume, temp, mass, binary data…",
      gradient: "from-cyan-500/25 to-violet-600/20",
    },
    {
      to: "/mathematics/glossary",
      Icon: BookMarked,
      title: isArabic ? "المسرد" : "Glossary",
      desc: `${glossaryCount}+ ${isArabic ? "مصطلحًا" : "curated terms"}`,
      gradient: "from-indigo-500/30 to-violet-600/20",
    },
    {
      to: "/mathematics/workspace",
      Icon: Settings2,
      title: isArabic ? "مساحة العمل" : "Workspace",
      desc: isArabic ? "المنازل العشرية، النجوم، المفضلة" : "Decimals, notation, starred branches",
      gradient: "from-amber-500/20 to-orange-600/15",
    },
  ];

  return (
    <div
      className={`min-h-screen relative w-full bg-black text-white selection:bg-violet-500/30 overflow-x-hidden ${
        isArabic ? "rtl font-arabic" : "font-sans"
      }`}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-[720px] h-[720px] bg-violet-500/12 rounded-full blur-[180px]"
              animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-[640px] h-[640px] bg-fuchsia-500/10 rounded-full blur-[180px]"
              animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-indigo-500/6 rounded-full blur-[200px]"
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

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12 pb-16 sm:pb-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section variants={itemVariants} className="mb-14 sm:mb-20">
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-violet-500/60 to-violet-500/40" />
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 font-mono text-[10px] tracking-[0.3em] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400" />
              </span>
              {isArabic ? "بوابة رياضية متكاملة" : "Integrated mathematics portal"}
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tighter mb-5 sm:mb-7 leading-[0.85]">
            <span className="bg-gradient-to-br from-white via-violet-100 to-fuchsia-700/55 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.28)]">
              {isArabic ? "بوابة الرياضيات" : "Mathematics Portal"}
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed font-light">
            {isArabic
              ? `منصة واحدة: ${totalLabs}+ محاكاة تفاعلية، حلول معادلات خطوة بخطوة، موسوعة صيغ، محولات، مسرد، وتخصيص كامل من مساحة العمل. مصممة لتكون مرجعك اليومي — كموقع رياضي مستقل داخل UN-Labs.`
              : `One hub: ${totalLabs}+ simulations, step-style solvers, a searchable formula library, converters, glossary, and a workspace to tune precision & bookmarks. Built to feel like a dedicated math site inside UN-Labs.`}
          </p>

          <div className="mt-10 sm:mt-14 flex flex-wrap gap-3 sm:gap-4 items-center border-t border-white/[0.06] pt-8 sm:pt-10">
            <div className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]">
              <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              <div className="text-[10px] font-black text-violet-300 uppercase tracking-[0.25em]">
                {isArabic ? "محرك الرسم: Canvas عالي الدقة" : "Render engine · Hi-DPI canvas"}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400">
              <Sigma size={12} className="text-violet-400" />
              <div className="text-[10px] font-bold uppercase tracking-[0.25em]">
                {isArabic ? "وحدات SI رياضية" : "Math · SI-consistent"}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400">
              <Database size={12} />
              <div className="text-[10px] font-bold uppercase tracking-[0.25em]">
                {isArabic ? "تحديث لحظي للقيم" : "Live recomputation"}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400">
              <ShieldCheck size={12} />
              <div className="text-[10px] font-bold uppercase tracking-[0.25em]">
                {isArabic ? "بدون تقريب عشوائي إلا حيث يُذكر" : "Stochastic only where noted"}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-fuchsia-500/25 bg-fuchsia-500/10 backdrop-blur-md mb-5">
            <Sigma className="w-3.5 h-3.5 text-fuchsia-300" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-fuchsia-200 font-bold">
              {isArabic ? "المركز — أدوات وحلول" : "Mission control · Tools & solve"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
            {isArabic ? "كل ما تحتاجه في مكان واحد" : "Everything in one place"}
          </h2>
          <p className="text-sm text-slate-500 mb-8 max-w-2xl">
            {isArabic
              ? "استخدم الشريط العلوي للتنقل السريع بين الفروع، أو ادخل مباشرة من البطاقات أدناه."
              : "Use the top math bar to jump between branches, or dive in from the tiles below."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {portalLinks.map((p) => (
              <Link key={p.to} to={p.to} className="group block">
                <div
                  className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${p.gradient} p-[1px] h-full hover:border-violet-400/35 transition-colors`}
                >
                  <div className="rounded-[15px] bg-black/90 backdrop-blur-xl p-5 h-full flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <p.Icon className="w-6 h-6 text-violet-300" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-white group-hover:text-violet-200 transition-colors">{p.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        {bookmarks.length > 0 && (
          <motion.section variants={itemVariants} className="mb-10 sm:mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-amber-200 uppercase tracking-widest">
                {isArabic ? "مسارك السريع (المفضلة)" : "Your starred tracks"}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {mathBranches
                .filter((b) => bookmarks.includes(b.slug))
                .map((b) => (
                  <Link
                    key={b.slug}
                    to={b.path}
                    className="px-4 py-2 rounded-full text-xs font-semibold border border-amber-400/30 bg-amber-500/10 text-amber-100 hover:bg-amber-500/20 transition-colors"
                  >
                    {isArabic ? b.titleAr : b.title}
                  </Link>
                ))}
            </div>
          </motion.section>
        )}

        <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-4">
            <FlaskConical className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-300 font-bold">
              {isArabic ? "المسارات والتجارب" : "Tracks & experiments"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-indigo-400 bg-clip-text text-transparent">
              {isArabic ? "اختر فرعًا — ثم جرّب كل تبويب" : "Pick a branch — then explore every tab"}
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7"
        >
          {mathBranches.map((branch, i) => {
            const topics = topicsByPath[branch.path];
            const chips = topics ? (isArabic ? topics.ar : topics.en) : [];
            return (
              <motion.div
                key={branch.path}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() => toggleBookmark(branch.slug)}
                  className={`absolute top-4 z-20 flex h-9 w-9 items-center justify-center rounded-xl border backdrop-blur-md transition-colors ${
                    isArabic ? "left-4" : "right-4"
                  } ${
                    isBookmarked(branch.slug)
                      ? "border-amber-400/40 bg-amber-500/20 text-amber-200"
                      : "border-white/10 bg-black/50 text-slate-500 hover:text-amber-200 hover:border-amber-400/30"
                  }`}
                  aria-label={isArabic ? "مفضلة" : "Bookmark"}
                >
                  <Star className={`h-4 w-4 ${isBookmarked(branch.slug) ? "fill-amber-300" : ""}`} />
                </button>
                <Link to={branch.path} className="block group h-full">
                  <div className="relative overflow-hidden rounded-3xl p-[1.5px] bg-gradient-to-br from-violet-500/60 via-fuchsia-500/40 to-indigo-600/60 shadow-2xl shadow-violet-500/10 hover:shadow-[0_25px_60px_-15px_rgba(139,92,246,0.38)] transition-shadow duration-500 h-full">
                    <div className="relative overflow-hidden rounded-[22px] bg-black/95 backdrop-blur-2xl p-6 sm:p-7 md:p-8 h-full min-h-[300px] sm:min-h-[340px] flex flex-col">
                      <div
                        className={`absolute -top-24 ${
                          isArabic ? "-left-24" : "-right-24"
                        } w-56 h-56 rounded-full bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-transparent blur-3xl group-hover:opacity-70 opacity-30 transition-opacity duration-700`}
                      />
                      <div
                        className={`absolute -bottom-20 ${
                          isArabic ? "-right-20" : "-left-20"
                        } w-44 h-44 rounded-full bg-gradient-to-tr from-indigo-500/20 to-violet-500/15 blur-3xl opacity-20 group-hover:opacity-50 transition-opacity duration-700`}
                      />

                      <motion.svg
                        className={`absolute top-5 ${
                          isArabic ? "left-5" : "right-5"
                        } w-24 h-24 sm:w-28 sm:h-28 text-violet-300 opacity-[0.07] group-hover:opacity-25 transition-opacity duration-500`}
                        viewBox="0 0 100 100"
                        fill="none"
                        stroke="currentColor"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
                      >
                        <polygon points="50,5 95,95 5,95" strokeWidth="0.8" />
                        <circle cx="50" cy="55" r="28" strokeWidth="0.6" />
                      </motion.svg>

                      <div className="relative flex flex-col h-full">
                        <div className="flex items-start justify-between mb-5">
                          <motion.div
                            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-violet-400 via-fuchsia-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-violet-500/40 ring-4 ring-white/[0.06]"
                            whileHover={{ rotate: [0, -6, 6, 0], scale: 1.06 }}
                            transition={{ duration: 0.55 }}
                          >
                            <branch.icon size={28} strokeWidth={2} className="text-white relative z-10 drop-shadow-lg" />
                            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-600 opacity-40 blur-md group-hover:blur-xl group-hover:opacity-70 transition-all duration-500" />
                          </motion.div>
                          <span className="text-[10px] uppercase tracking-[0.25em] font-black text-violet-300/60 mt-1">
                            {String(i + 1).padStart(2, "0")} / {String(mathBranches.length).padStart(2, "0")}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl md:text-[1.65rem] font-black text-white mb-2 leading-tight tracking-tight group-hover:text-violet-200 transition-colors">
                          {isArabic ? branch.titleAr : branch.title}
                        </h3>

                        <p className="text-sm text-slate-400 mb-5 leading-relaxed line-clamp-3">
                          {isArabic ? branch.detailsAr : branch.details}
                        </p>

                        {chips.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {chips.map((chip) => (
                              <span
                                key={chip}
                                className="px-2.5 py-1 text-[10px] font-bold rounded-full border border-violet-400/25 bg-violet-500/10 text-violet-300 backdrop-blur-md"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-center justify-between">
                          <span className="text-[11px] sm:text-xs font-bold text-slate-200 group-hover:text-white transition-colors uppercase tracking-[0.2em]">
                            {branch.experiments.length} {isArabic ? "تجارب" : "labs"}
                          </span>
                          <motion.div
                            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/40 group-hover:shadow-xl"
                            whileHover={{ x: isArabic ? -4 : 4, scale: 1.08 }}
                          >
                            <ArrowRight
                              size={16}
                              strokeWidth={2.5}
                              className={`text-white ${isArabic ? "rotate-180" : ""}`}
                            />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 sm:mt-24 pt-8 sm:pt-10 border-t border-white/[0.06] text-center flex items-center justify-center gap-3 text-slate-600"
        >
          <Sparkles size={12} className="text-violet-500/40" />
          <span className="text-[10px] font-mono tracking-[0.5em] uppercase">
            {isArabic ? "UN · قسم النمذجة الرياضية" : "UN · Mathematical Modeling Division"}
          </span>
          <Sigma size={12} className="text-violet-500/40" />
        </motion.div>

        <motion.section variants={itemVariants} className="mt-10 sm:mt-12">
          <div className="max-w-5xl mx-auto rounded-2xl border border-violet-400/20 bg-violet-500/[0.06] p-5 sm:p-6">
            <p className="text-[10px] font-bold text-violet-300 uppercase tracking-widest mb-2">
              {isArabic ? "وصف آلية الشرح" : "Explanation behavior"}
            </p>
            <p
              className={`text-sm sm:text-base text-slate-300 leading-relaxed ${
                isArabic ? "font-arabic text-right" : ""
              }`}
              dir={isArabic ? "rtl" : "ltr"}
            >
              {isArabic
                ? "داخل كل فرع من فروع الرياضيات، ستجد شرحًا نصيًا واضحًا أسفل كل تبويب محاكاة يشرح الفكرة الرياضية، المتغيرات المتاحة، وكيف تؤثر القيم على النتيجة خطوةً بخطوة. هذا الشرح يتغير تلقائيًا حسب لغة الواجهة المختارة، لذلك عند اختيار العربية سيظهر المحتوى بالعربية فقط بصياغة تعليمية موسعة تساعدك على الفهم قبل التجربة."
                : "Inside every mathematics branch, you will find a clear explanatory note under each simulation tab that describes the core concept, available parameters, and how value changes affect the output step by step. This explanation now switches automatically with the selected interface language, so when English is active you see English-only educational text with expanded wording that helps you understand the idea before interacting with controls."}
            </p>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}

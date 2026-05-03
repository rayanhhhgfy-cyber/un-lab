import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Atom,
  Zap,
  ArrowRight,
  Leaf,
  Mountain,
  ExternalLink,
  Facebook,
  FlaskConical,
  Sparkles,
  Sigma,
} from "lucide-react";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import PwaLandingInstall from "@/components/pwa/PwaLandingInstall";
import { useIsMobile } from "@/hooks/use-mobile";
import { Suspense, lazy } from "react";

const GravityOverlayAnti = lazy(() => import("@/components/three/AntiGravityOverlay"));

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();
  const isArabic = i18n.language === "ar";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const labs = [
    {
      name: isArabic ? "مختبر الفيزياء" : "Physics Lab",
      description: isArabic
        ? "اكتشف الميكانيكا والموجات والكم بمحاكاة حية"
        : "Mechanics, waves & quantum brought to life",
      path: "/physics",
      Icon: Zap,
      gradient: "from-cyan-400 via-sky-500 to-blue-600",
      softBg: "from-cyan-500/15 to-blue-600/10",
      glow: "shadow-cyan-500/40",
      accent: "text-cyan-300",
      chip: "bg-cyan-500/10 border-cyan-400/25 text-cyan-300",
      stroke: "text-cyan-300",
      chips: isArabic
        ? ["ميكانيكا", "الموجات", "البصريات"]
        : ["Mechanics", "Waves", "Optics"],
    },
    {
      name: isArabic ? "مختبر الرياضيات" : "Mathematics Lab",
      description: isArabic
        ? "تكامل عددي، مركبات، فورييه، ماندلبرو، واحتمال — أكثر من 15 محاكاة دقيقة"
        : "Numerical calculus, complex plane, Fourier, Mandelbrot, probability — 15+ precise simulations",
      path: "/mathematics",
      Icon: Sigma,
      gradient: "from-rose-400 via-pink-500 to-red-600",
      softBg: "from-rose-500/15 to-red-600/10",
      glow: "shadow-rose-500/35",
      accent: "text-rose-300",
      chip: "bg-rose-500/10 border-rose-400/25 text-rose-300",
      stroke: "text-rose-300",
      chips: isArabic
        ? ["تفاضل", "هندسة", "إحصاء"]
        : ["Calculus", "Geometry", "Statistics"],
    },
    {
      name: isArabic ? "مختبر الكيمياء" : "Chemistry Lab",
      description: isArabic
        ? "تفاعلات، عناصر، وجدول دوري تفاعلي"
        : "Reactions, elements & an interactive periodic table",
      path: "/chemistry",
      Icon: Atom,
      gradient: "from-fuchsia-400 via-purple-500 to-indigo-600",
      softBg: "from-fuchsia-500/15 to-indigo-600/10",
      glow: "shadow-purple-500/40",
      accent: "text-fuchsia-300",
      chip: "bg-purple-500/10 border-purple-400/25 text-fuchsia-300",
      stroke: "text-fuchsia-300",
      chips: isArabic
        ? ["العناصر", "التفاعلات", "المركبات"]
        : ["Elements", "Reactions", "Compounds"],
    },
    {
      name: isArabic ? "مختبر الأحياء" : "Biology Lab",
      description: isArabic
        ? "الخلايا، الوراثة، التشريح وعلم الأعصاب"
        : "Cells, genetics, anatomy & neuroscience",
      path: "/biology",
      Icon: Leaf,
      gradient: "from-emerald-400 via-teal-500 to-green-600",
      softBg: "from-emerald-500/15 to-green-600/10",
      glow: "shadow-emerald-500/40",
      accent: "text-emerald-300",
      chip: "bg-emerald-500/10 border-emerald-400/25 text-emerald-300",
      stroke: "text-emerald-300",
      chips: isArabic
        ? ["الخلايا", "الوراثة", "التشريح"]
        : ["Cells", "Genetics", "Anatomy"],
    },
    {
      name: isArabic ? "علوم الأرض" : "Earth Science Lab",
      description: isArabic
        ? "الجيولوجيا، الطقس، البراكين والهيدرولوجيا"
        : "Geology, weather, volcanology & hydrology",
      path: "/earth-science",
      Icon: Mountain,
      gradient: "from-amber-400 via-orange-500 to-rose-500",
      softBg: "from-amber-500/15 to-rose-500/10",
      glow: "shadow-amber-500/40",
      accent: "text-amber-300",
      chip: "bg-amber-500/10 border-amber-400/25 text-amber-300",
      stroke: "text-amber-300",
      chips: isArabic
        ? ["الجيولوجيا", "الطقس", "البراكين"]
        : ["Geology", "Weather", "Volcanoes"],
    },
  ];

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden bg-black ${
        isArabic ? "rtl font-arabic" : "font-sans"
      }`}
    >
      {/* ── Background Effects ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {isMobile ? (
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-purple-900/20" />
        ) : (
          <>
            <motion.div
              className="absolute top-0 right-0 w-[700px] h-[700px] bg-cyan-500/8 rounded-full blur-[200px]"
              animate={{ y: [0, 40, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/8 rounded-full blur-[200px]"
              animate={{ y: [0, -40, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[200px]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
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

      {!isMobile && (
        <Suspense fallback={null}>
          <GravityOverlayAnti />
        </Suspense>
      )}

      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {/* ─── COMPACT GLASS HEADER ─── */}
        <motion.header
          className="w-full px-3 sm:px-6 lg:px-10 pt-4 sm:pt-6"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mx-auto max-w-6xl flex items-center justify-between gap-2 sm:gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl px-3 sm:px-5 py-2.5 sm:py-3 shadow-2xl shadow-black/40">
            {/* School Logo - Left */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0 group">
              <div className="relative shrink-0">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-purple-500/40 via-fuchsia-500/40 to-purple-600/40 blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
                <img
                  src="/school logo.jpg"
                  alt="School Logo"
                  className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover ring-1 ring-white/15"
                />
              </div>
              <div className="hidden sm:block min-w-0">
                <div className="text-[11px] font-bold text-white truncate leading-tight">
                  {isArabic ? "الحسين بن طلال" : "King Hussein"}
                </div>
                <div className="text-[9px] text-slate-400 font-medium tracking-wide truncate">
                  {isArabic ? "الثانوية للبنين" : "Secondary School"}
                </div>
              </div>
            </Link>

            {/* Center Brand & Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div
                className="hidden md:flex items-center gap-1.5 text-[10px] font-semibold text-cyan-300 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-3 h-3" />
                <span>{t("global.brand.tagline")}</span>
              </motion.div>
              <LanguageSwitcher />
            </div>

            {/* Ministry Logo - Right */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="hidden sm:block min-w-0 text-right">
                <div className="text-[11px] font-bold text-white truncate leading-tight">
                  {isArabic ? "وزارة التربية" : "Ministry of Edu."}
                </div>
                <div className="text-[9px] text-slate-400 font-medium tracking-wide truncate">
                  {isArabic ? "الأردن" : "Jordan"}
                </div>
              </div>
              <div className="relative shrink-0">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-emerald-500/40 via-green-500/40 to-emerald-600/40 blur-md opacity-70" />
                <img
                  src="/ministery of education logo.webp"
                  alt={isArabic ? "وزارة التربية والتعليم" : "Ministry of Education"}
                  className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-contain ring-1 ring-white/15 bg-white/5 p-1"
                />
              </div>
            </div>
          </div>
        </motion.header>

        {/* ─── MAIN CONTENT ─── */}
        <motion.div
          className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ─── HERO ─── */}
          <motion.div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-5 sm:mb-7"
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-300 font-bold">
                {isArabic ? "منصة المختبرات الرقمية" : "Digital Labs Platform"}
              </span>
            </motion.div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.35)]">
                UN-Labs
              </span>
            </h1>
            <p className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-300 tracking-wide">
              {isArabic ? "المعرفة الرقمية" : "Ultimate Knowledge"}
            </p>
            <div className="mt-5 h-[1px] w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
          </motion.div>

          {/* ─── LABORATORIES (HERO SECTION) ─── */}
          <motion.div className="w-full max-w-6xl" variants={itemVariants}>
            <div className="text-center mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-4">
                <FlaskConical className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-300 font-bold">
                  {isArabic ? "المختبرات العلمية" : "Science Laboratories"}
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-3">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {isArabic ? "استكشف المختبرات" : "Explore Our Labs"}
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto px-4">
                {isArabic
                  ? "اختر مختبرًا للدخول إلى عالم التجارب التفاعلية والمحاكاة الحية"
                  : "Pick a lab and step into a world of interactive experiments and live simulations."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
              {labs.map((lab, i) => (
                <motion.div
                  key={lab.path}
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Link to={lab.path} className="block group h-full">
                    <div
                      className={`relative overflow-hidden rounded-3xl p-[1.5px] bg-gradient-to-br ${lab.gradient} shadow-2xl ${lab.glow} hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] transition-shadow duration-500 h-full`}
                    >
                      <div className="relative overflow-hidden rounded-[22px] bg-slate-950/95 backdrop-blur-2xl p-6 sm:p-8 md:p-10 h-full min-h-[320px] sm:min-h-[360px] flex flex-col">
                        {/* Animated decorative orbs */}
                        <div
                          className={`absolute -top-24 ${
                            isArabic ? "-left-24" : "-right-24"
                          } w-60 h-60 rounded-full bg-gradient-to-br ${
                            lab.gradient
                          } opacity-[0.18] blur-3xl group-hover:opacity-30 transition-opacity duration-700`}
                        />
                        <div
                          className={`absolute -bottom-20 ${
                            isArabic ? "-right-20" : "-left-20"
                          } w-44 h-44 rounded-full bg-gradient-to-tr ${
                            lab.gradient
                          } opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-700`}
                        />

                        {/* Soft inner gradient wash */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${lab.softBg} opacity-40 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none`}
                        />

                        {/* Floating atom-style decorative SVG */}
                        <motion.svg
                          className={`absolute top-5 ${
                            isArabic ? "left-5" : "right-5"
                          } w-24 h-24 sm:w-28 sm:h-28 ${lab.stroke} opacity-[0.08] group-hover:opacity-25 transition-opacity duration-500`}
                          viewBox="0 0 100 100"
                          fill="none"
                          stroke="currentColor"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        >
                          <ellipse cx="50" cy="50" rx="45" ry="18" strokeWidth="1" />
                          <ellipse
                            cx="50"
                            cy="50"
                            rx="45"
                            ry="18"
                            strokeWidth="1"
                            transform="rotate(60 50 50)"
                          />
                          <ellipse
                            cx="50"
                            cy="50"
                            rx="45"
                            ry="18"
                            strokeWidth="1"
                            transform="rotate(120 50 50)"
                          />
                          <circle cx="50" cy="50" r="4" fill="currentColor" />
                        </motion.svg>

                        {/* ── Card content ── */}
                        <div className="relative flex flex-col h-full">
                          {/* Top row: icon + index */}
                          <div className="flex items-start justify-between mb-5 sm:mb-6">
                            <motion.div
                              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${lab.gradient} flex items-center justify-center shadow-2xl ${lab.glow} ring-4 ring-white/[0.06]`}
                              whileHover={{ rotate: [0, -6, 6, -3, 0], scale: 1.05 }}
                              transition={{ duration: 0.6 }}
                            >
                              <lab.Icon
                                className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-lg relative z-10"
                                strokeWidth={2}
                              />
                              <span
                                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${lab.gradient} opacity-40 blur-md group-hover:blur-xl group-hover:opacity-70 transition-all duration-500`}
                              />
                            </motion.div>
                            <span
                              className={`text-[10px] uppercase tracking-[0.25em] font-black ${lab.accent} opacity-60 mt-2`}
                            >
                              {String(i + 1).padStart(2, "0")} / {String(labs.length).padStart(2, "0")}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl sm:text-3xl md:text-[2rem] font-black text-white mb-2 sm:mb-3 leading-tight tracking-tight">
                            {lab.name}
                          </h3>

                          {/* Description */}
                          <p className="text-sm sm:text-base text-slate-400 mb-5 sm:mb-6 leading-relaxed">
                            {lab.description}
                          </p>

                          {/* Topic chips */}
                          <div className="flex flex-wrap gap-2 mb-6 sm:mb-7">
                            {lab.chips.map((chip) => (
                              <span
                                key={chip}
                                className={`px-2.5 py-1 text-[10px] sm:text-[11px] font-bold rounded-full border ${lab.chip} backdrop-blur-md`}
                              >
                                {chip}
                              </span>
                            ))}
                          </div>

                          {/* Bottom CTA */}
                          <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white transition-colors uppercase tracking-[0.2em]">
                              {isArabic ? "ادخل المختبر" : "Enter Lab"}
                            </span>
                            <motion.div
                              className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br ${lab.gradient} flex items-center justify-center shadow-lg ${lab.glow} group-hover:shadow-xl`}
                              whileHover={{ x: isArabic ? -4 : 4, scale: 1.08 }}
                            >
                              <ArrowRight
                                className={`w-4 h-4 sm:w-5 sm:h-5 text-white ${
                                  isArabic ? "rotate-180" : ""
                                }`}
                                strokeWidth={2.5}
                              />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ─── INSTITUTIONAL FACEBOOK PAGES ─── */}
          <motion.div
            className="w-full max-w-3xl mt-20 sm:mt-24"
            variants={itemVariants}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-3">
                <Facebook className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-300 font-bold">
                  {isArabic ? "منصاتنا الرسمية" : "Official Pages"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4 items-center">
              {/* 1. Ministry of Education */}
              <motion.a
                href="https://web.facebook.com/edugovjo"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full max-w-xl relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-emerald-500/60 via-green-500/50 to-emerald-600/60"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative rounded-[15px] bg-slate-950/90 backdrop-blur-xl px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3 sm:gap-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/25 transition-colors shrink-0">
                      <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] sm:text-[10px] text-emerald-400/70 uppercase tracking-[0.2em] font-bold mb-0.5">
                        {isArabic ? "صفحة فيسبوك" : "Facebook Page"}
                      </div>
                      <div className="text-sm sm:text-base font-bold text-white truncate">
                        {isArabic ? "وزارة التربية والتعليم" : "Ministry of Education"}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="relative w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
                </div>
              </motion.a>

              {/* 2. Directorate of Education - Irbid */}
              <motion.a
                href="https://web.facebook.com/edugovjo.1"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full max-w-xl relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-blue-500/60 via-indigo-500/50 to-blue-600/60"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative rounded-[15px] bg-slate-950/90 backdrop-blur-xl px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3 sm:gap-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/25 transition-colors shrink-0">
                      <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] sm:text-[10px] text-blue-400/70 uppercase tracking-[0.2em] font-bold mb-0.5">
                        {isArabic ? "صفحة فيسبوك" : "Facebook Page"}
                      </div>
                      <div className="text-sm sm:text-base font-bold text-white truncate">
                        {isArabic
                          ? "مديرية التربية والتعليم - إربد"
                          : "Directorate of Education – Irbid"}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="relative w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                </div>
              </motion.a>

              {/* 3. King Hussein bin Talal School */}
              <motion.a
                href="https://web.facebook.com/AlHusseinBnTalal"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full max-w-xl relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-purple-500/60 via-fuchsia-500/50 to-purple-600/60"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative rounded-[15px] bg-slate-950/90 backdrop-blur-xl px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3 sm:gap-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/25 transition-colors shrink-0">
                      <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] sm:text-[10px] text-purple-400/70 uppercase tracking-[0.2em] font-bold mb-0.5">
                        {isArabic ? "صفحة فيسبوك" : "Facebook Page"}
                      </div>
                      <div className="text-sm sm:text-base font-bold text-white truncate">
                        {isArabic
                          ? "مدرسة الحسين بن طلال الثانوية للبنين"
                          : "King Hussein Bin Talal School"}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="relative w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* ─── FEATURES ─── */}
          <motion.div
            className="w-full max-w-5xl mt-20 sm:mt-24"
            variants={itemVariants}
          >
            <h3 className="text-2xl sm:text-3xl font-black text-white text-center mb-8 tracking-tight">
              {t("landing.features.title")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: "⚡",
                  title: t("landing.features.feature1.title"),
                  desc: t("landing.features.feature1.description"),
                  bg: "from-cyan-500/10 to-blue-500/5",
                },
                {
                  icon: "🎓",
                  title: t("landing.features.feature2.title"),
                  desc: t("landing.features.feature2.description"),
                  bg: "from-purple-500/10 to-fuchsia-500/5",
                },
                {
                  icon: "🚀",
                  title: t("landing.features.feature3.title"),
                  desc: t("landing.features.feature3.description"),
                  bg: "from-emerald-500/10 to-teal-500/5",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`relative overflow-hidden p-6 rounded-2xl border border-white/[0.06] bg-gradient-to-br ${feature.bg} hover:border-white/15 transition-all`}
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h4 className="text-base sm:text-lg font-bold text-white mb-1.5">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <PwaLandingInstall itemVariants={itemVariants} />

          {/* Development Notice */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-xl">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-amber-400"
              />
              <span className="text-amber-300 text-sm font-medium">
                {isArabic ? "هذا الموقع قيد التطوير المستمر — يتم إضافة ميزات جديدة كل يوم!" : "This website is under active development — new features added daily!"}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

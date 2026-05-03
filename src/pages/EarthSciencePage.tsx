import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Radio,
  Zap,
  FlaskConical,
  Sparkles,
  Activity,
} from "lucide-react";
import { earthScienceBranches } from "@/data/earthModules";
import { useIsMobile } from "@/hooks/use-mobile";

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

const topicsByPath: Record<string, { en: string[]; ar: string[]; gradient: string; glow: string }> = {
  "/earth-science/geology": {
    en: ["Plate Tectonics", "Minerals", "Earthquakes"],
    ar: ["الصفائح", "المعادن", "الزلازل"],
    gradient: "from-amber-400 via-orange-500 to-yellow-600",
    glow: "shadow-amber-500/40",
  },
  "/earth-science/meteorology": {
    en: ["Pressure", "Jet Stream", "Storms"],
    ar: ["الضغط", "التيار النفاث", "العواصف"],
    gradient: "from-sky-400 via-blue-500 to-cyan-500",
    glow: "shadow-sky-500/40",
  },
  "/earth-science/volcanology": {
    en: ["Magma", "Eruptions", "Calderas"],
    ar: ["الصهارة", "الثورات", "الفوهات"],
    gradient: "from-orange-500 via-red-500 to-rose-600",
    glow: "shadow-orange-500/40",
  },
  "/earth-science/hydrology": {
    en: ["Water Cycle", "Currents", "Aquifers"],
    ar: ["دورة المياه", "التيارات", "المياه الجوفية"],
    gradient: "from-blue-400 via-cyan-500 to-teal-500",
    glow: "shadow-blue-500/40",
  },
  "/earth-science/climatology": {
    en: ["Trends", "Greenhouse", "Projections"],
    ar: ["الاتجاهات", "الاحتباس", "التوقعات"],
    gradient: "from-rose-500 via-red-500 to-orange-500",
    glow: "shadow-rose-500/40",
  },
  "/earth-science/cartography": {
    en: ["Coordinates", "Topography", "GPS"],
    ar: ["الإحداثيات", "الطبوغرافيا", "GPS"],
    gradient: "from-emerald-400 via-teal-500 to-green-600",
    glow: "shadow-emerald-500/40",
  },
};

export default function EarthSciencePage() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isArabic = i18n.language === "ar";
  const isMobile = useIsMobile();

  const isIndex = location.pathname === "/earth-science" || location.pathname === "/earth-science/";
  if (!isIndex) return null;

  return (
    <div
      className={`min-h-screen relative w-full bg-black text-white selection:bg-blue-500/30 overflow-x-hidden ${
        isArabic ? "rtl font-arabic" : "font-sans"
      }`}
    >
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[180px]"
              animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-amber-500/8 rounded-full blur-[180px]"
              animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-sky-500/5 rounded-full blur-[200px]"
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
        {/* Back Button */}
        <motion.div variants={itemVariants}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-slate-400 hover:text-blue-300 hover:border-blue-500/30 hover:bg-blue-500/10 transition-all group mb-10 sm:mb-14"
          >
            <ArrowLeft size={14} className={isArabic ? "rotate-180" : ""} />
            <span className="font-bold tracking-[0.2em] text-[10px] uppercase">
              {isArabic ? "العودة للرئيسية" : "Back to Home"}
            </span>
          </Link>
        </motion.div>

        {/* HERO */}
        <motion.section variants={itemVariants} className="mb-14 sm:mb-20">
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-blue-500/60 to-blue-500/40" />
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 font-mono text-[10px] tracking-[0.3em] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
              </span>
              {isArabic ? "القطاع 03 · علوم الأرض والفضاء" : "Sector 03 · Earth & Space"}
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tighter mb-5 sm:mb-7 leading-[0.85]">
            <span className="bg-gradient-to-br from-white via-sky-100 to-blue-700/60 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.25)]">
              {isArabic ? "علوم الأرض" : "Earth Science"}
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed font-light">
            {isArabic
              ? "نظام مراقبة وتحليل عالمي لدراسة العمليات الجيوفيزيائية والمناخية التي تشكل نظام دعم الحياة على كوكبنا."
              : "Global surveillance and analysis system for the geophysical and climatic processes that shape our planet's life-support systems."}
          </p>

          {/* Status HUD */}
          <div className="mt-10 sm:mt-14 flex flex-wrap gap-3 sm:gap-4 items-center border-t border-white/[0.06] pt-8 sm:pt-10">
            <div className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <div className="text-[10px] font-black text-blue-300 uppercase tracking-[0.25em]">
                {isArabic ? "رابط القمر الصناعي: آمن" : "Satellite Link · Secure"}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400">
              <Radio size={12} />
              <div className="text-[10px] font-bold uppercase tracking-[0.25em]">
                {isArabic ? "تيليميتري حي: مزامنة" : "Telemetry · Syncing"}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400">
              <Zap size={12} />
              <div className="text-[10px] font-bold uppercase tracking-[0.25em]">
                {isArabic ? "حساسية الزلازل: قصوى" : "Seismic · Max"}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section Heading */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-4">
            <FlaskConical className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-300 font-bold">
              {isArabic ? "الأنظمة الكوكبية" : "Planetary Systems"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-blue-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
              {isArabic ? "اختر نظامًا" : "Choose a System"}
            </span>
          </h2>
        </motion.div>

        {/* MODULE CARDS */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7"
        >
          {earthScienceBranches.map((branch, i) => {
            const meta = topicsByPath[branch.path];
            const chips = meta ? (isArabic ? meta.ar : meta.en) : [];
            const gradient = meta?.gradient || "from-blue-400 via-sky-500 to-cyan-500";
            const glow = meta?.glow || "shadow-blue-500/40";
            return (
              <motion.div
                key={branch.path}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                <Link to={branch.path} className="block group h-full">
                  <div
                    className={`relative overflow-hidden rounded-3xl p-[1.5px] bg-gradient-to-br ${gradient} shadow-2xl ${glow} hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] transition-shadow duration-500 h-full`}
                  >
                    <div className="relative overflow-hidden rounded-[22px] bg-black/95 backdrop-blur-2xl p-6 sm:p-7 md:p-8 h-full min-h-[300px] sm:min-h-[340px] flex flex-col">
                      <div
                        className={`absolute -top-24 ${
                          isArabic ? "-left-24" : "-right-24"
                        } w-56 h-56 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-3xl group-hover:opacity-35 transition-opacity duration-700`}
                      />
                      <div
                        className={`absolute -bottom-20 ${
                          isArabic ? "-right-20" : "-left-20"
                        } w-44 h-44 rounded-full bg-gradient-to-tr ${gradient} opacity-10 blur-3xl group-hover:opacity-25 transition-opacity duration-700`}
                      />

                      {/* Floating planet/orbit decoration */}
                      <motion.svg
                        className={`absolute top-5 ${
                          isArabic ? "left-5" : "right-5"
                        } w-24 h-24 sm:w-28 sm:h-28 ${branch.color} opacity-[0.08] group-hover:opacity-25 transition-opacity duration-500`}
                        viewBox="0 0 100 100"
                        fill="none"
                        stroke="currentColor"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      >
                        <circle cx="50" cy="50" r="44" strokeWidth="0.8" />
                        <ellipse cx="50" cy="50" rx="44" ry="14" strokeWidth="0.8" />
                        <ellipse cx="50" cy="50" rx="14" ry="44" strokeWidth="0.8" />
                        <circle cx="50" cy="50" r="4" fill="currentColor" />
                      </motion.svg>

                      <div className="relative flex flex-col h-full">
                        {/* Top row */}
                        <div className="flex items-start justify-between mb-5">
                          <motion.div
                            className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-2xl ${glow} ring-4 ring-white/[0.06]`}
                            whileHover={{ rotate: [0, -6, 6, 0], scale: 1.06 }}
                            transition={{ duration: 0.55 }}
                          >
                            <branch.icon size={28} strokeWidth={2} className="text-white relative z-10 drop-shadow-lg" />
                            <span className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-40 blur-md group-hover:blur-xl group-hover:opacity-70 transition-all duration-500`} />
                          </motion.div>
                          <span className={`text-[10px] uppercase tracking-[0.25em] font-black ${branch.color} opacity-60 mt-1`}>
                            GEO-{String(i + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl md:text-[1.65rem] font-black text-white mb-2 leading-tight tracking-tight group-hover:text-blue-200 transition-colors">
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
                                className={`px-2.5 py-1 text-[10px] font-bold rounded-full border border-white/10 bg-white/[0.04] ${branch.color} backdrop-blur-md`}
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-center justify-between">
                          <span className="text-[11px] sm:text-xs font-bold text-slate-200 group-hover:text-white transition-colors uppercase tracking-[0.2em]">
                            {isArabic ? "مزامنة البيانات" : "Sync Data"}
                          </span>
                          <motion.div
                            className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg ${glow} group-hover:shadow-xl`}
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

        {/* Footer signature */}
        <motion.div
          variants={itemVariants}
          className="mt-16 sm:mt-24 pt-8 sm:pt-10 border-t border-white/[0.06] text-center flex items-center justify-center gap-3 text-slate-600"
        >
          <Sparkles size={12} className="text-blue-500/40" />
          <span className="text-[10px] font-mono tracking-[0.5em] uppercase">
            {isArabic ? "قسم الجيومكانية" : "UN · Geospatial Division"}
          </span>
          <Globe size={12} className="text-blue-500/40" />
          <Activity size={12} className="text-blue-500/40 hidden sm:block" />
        </motion.div>
      </motion.div>
    </div>
  );
}

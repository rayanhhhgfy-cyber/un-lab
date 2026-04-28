import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Database,
  ShieldCheck,
  FlaskConical,
  Sparkles,
  Activity,
} from "lucide-react";
import { biologyBranches } from "@/data/bioModules";
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

const topicsByPath: Record<string, { en: string[]; ar: string[] }> = {
  "/biology/genetics": { en: ["DNA", "Heredity", "CRISPR"], ar: ["الحمض النووي", "الوراثة", "كريسبر"] },
  "/biology/anatomy": { en: ["Circulatory", "Nervous", "Respiratory"], ar: ["الدورة الدموية", "العصبي", "التنفسي"] },
  "/biology/ecology": { en: ["Biodiversity", "Ecosystems", "Conservation"], ar: ["التنوع الحيوي", "الأنظمة البيئية", "الحفظ"] },
  "/biology/microbiology": { en: ["Bacteria", "Viruses", "Fungi"], ar: ["البكتيريا", "الفيروسات", "الفطريات"] },
  "/biology/cells": { en: ["Organelles", "Mitosis", "Membranes"], ar: ["العضيات", "الانقسام", "الأغشية"] },
  "/biology/neuroscience": { en: ["Neural Nets", "Memory", "Consciousness"], ar: ["الشبكات العصبية", "الذاكرة", "الوعي"] },
};

export default function BiologyPage() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isArabic = i18n.language === "ar";
  const isMobile = useIsMobile();

  const isIndex = location.pathname === "/biology" || location.pathname === "/biology/";
  if (!isIndex) return null;

  return (
    <div
      className={`min-h-screen relative w-full bg-black text-white selection:bg-emerald-500/30 overflow-x-hidden ${
        isArabic ? "rtl font-arabic" : "font-sans"
      }`}
    >
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[180px]"
              animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[180px]"
              animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-green-500/5 rounded-full blur-[200px]"
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
            className="inline-flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-slate-400 hover:text-emerald-300 hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all group mb-10 sm:mb-14"
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
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-emerald-500/60 to-emerald-500/40" />
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-mono text-[10px] tracking-[0.3em] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              {isArabic ? "القطاع 02 · العلوم البيولوجية" : "Sector 02 · Biological Sciences"}
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tighter mb-5 sm:mb-7 leading-[0.85]">
            <span className="bg-gradient-to-br from-white via-emerald-100 to-emerald-700/60 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(16,185,129,0.25)]">
              {isArabic ? "مختبر الأحياء" : "Biology Lab"}
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed font-light">
            {isArabic
              ? "منصة أبحاث بيولوجية متقدمة لفك تشفير النظم المعقدة، من الجينوم الجزيئي إلى التوازن البيئي العالمي."
              : "Advanced biological research platform decoding complex systems — from molecular genomics to global ecological equilibrium."}
          </p>

          {/* Status HUD */}
          <div className="mt-10 sm:mt-14 flex flex-wrap gap-3 sm:gap-4 items-center border-t border-white/[0.06] pt-8 sm:pt-10">
            <div className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div className="text-[10px] font-black text-emerald-300 uppercase tracking-[0.25em]">
                {isArabic ? "النظام متصل" : "Mainframe Online"}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400">
              <Database size={12} />
              <div className="text-[10px] font-bold uppercase tracking-[0.25em]">
                {isArabic ? "تزامن GenBank: نشط" : "GenBank Sync · Active"}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400">
              <ShieldCheck size={12} />
              <div className="text-[10px] font-bold uppercase tracking-[0.25em]">
                {isArabic ? "الأمن الحيوي: المستوى 5" : "Bio-Security · Level 5"}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section Heading */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-4">
            <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-300 font-bold">
              {isArabic ? "الفروع البحثية" : "Research Branches"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-green-400 bg-clip-text text-transparent">
              {isArabic ? "اختر تخصصًا" : "Choose a Discipline"}
            </span>
          </h2>
        </motion.div>

        {/* MODULE CARDS */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7"
        >
          {biologyBranches.map((branch, i) => {
            const topics = topicsByPath[branch.path];
            const chips = topics ? (isArabic ? topics.ar : topics.en) : [];
            return (
              <motion.div
                key={branch.path}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                <Link to={branch.path} className="block group h-full">
                  <div className="relative overflow-hidden rounded-3xl p-[1.5px] bg-gradient-to-br from-emerald-500/60 via-teal-500/40 to-green-600/60 shadow-2xl shadow-emerald-500/10 hover:shadow-[0_25px_60px_-15px_rgba(16,185,129,0.4)] transition-shadow duration-500 h-full">
                    <div className="relative overflow-hidden rounded-[22px] bg-black/95 backdrop-blur-2xl p-6 sm:p-7 md:p-8 h-full min-h-[300px] sm:min-h-[340px] flex flex-col">
                      {/* Decorative orbs */}
                      <div
                        className={`absolute -top-24 ${
                          isArabic ? "-left-24" : "-right-24"
                        } w-56 h-56 rounded-full bg-gradient-to-br from-emerald-500/30 via-teal-500/20 to-transparent blur-3xl group-hover:opacity-70 opacity-30 transition-opacity duration-700`}
                      />
                      <div
                        className={`absolute -bottom-20 ${
                          isArabic ? "-right-20" : "-left-20"
                        } w-44 h-44 rounded-full bg-gradient-to-tr from-green-500/20 to-emerald-500/15 blur-3xl opacity-20 group-hover:opacity-50 transition-opacity duration-700`}
                      />

                      {/* Floating orbital decoration */}
                      <motion.svg
                        className={`absolute top-5 ${
                          isArabic ? "left-5" : "right-5"
                        } w-24 h-24 sm:w-28 sm:h-28 text-emerald-300 opacity-[0.07] group-hover:opacity-25 transition-opacity duration-500`}
                        viewBox="0 0 100 100"
                        fill="none"
                        stroke="currentColor"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                      >
                        <circle cx="50" cy="50" r="44" strokeWidth="0.8" />
                        <circle cx="50" cy="50" r="32" strokeWidth="0.8" />
                        <circle cx="50" cy="50" r="20" strokeWidth="0.8" />
                        <circle cx="50" cy="6" r="2.5" fill="currentColor" />
                        <circle cx="82" cy="50" r="2" fill="currentColor" />
                      </motion.svg>

                      <div className="relative flex flex-col h-full">
                        {/* Top row: icon + index */}
                        <div className="flex items-start justify-between mb-5">
                          <motion.div
                            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600 flex items-center justify-center shadow-2xl shadow-emerald-500/40 ring-4 ring-white/[0.06]"
                            whileHover={{ rotate: [0, -6, 6, 0], scale: 1.06 }}
                            transition={{ duration: 0.55 }}
                          >
                            <branch.icon size={28} strokeWidth={2} className="text-white relative z-10 drop-shadow-lg" />
                            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 opacity-40 blur-md group-hover:blur-xl group-hover:opacity-70 transition-all duration-500" />
                          </motion.div>
                          <span className="text-[10px] uppercase tracking-[0.25em] font-black text-emerald-300/60 mt-1">
                            {String(i + 1).padStart(2, "0")} / {String(biologyBranches.length).padStart(2, "0")}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl md:text-[1.65rem] font-black text-white mb-2 leading-tight tracking-tight group-hover:text-emerald-200 transition-colors">
                          {isArabic ? branch.titleAr : branch.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-slate-400 mb-5 leading-relaxed line-clamp-3">
                          {isArabic ? branch.detailsAr : branch.details}
                        </p>

                        {/* Topic chips */}
                        {chips.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {chips.map((chip) => (
                              <span
                                key={chip}
                                className="px-2.5 py-1 text-[10px] font-bold rounded-full border border-emerald-400/25 bg-emerald-500/10 text-emerald-300 backdrop-blur-md"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* CTA */}
                        <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-center justify-between">
                          <span className="text-[11px] sm:text-xs font-bold text-slate-200 group-hover:text-white transition-colors uppercase tracking-[0.2em]">
                            {isArabic ? "بدء التشغيل" : "Initialize"}
                          </span>
                          <motion.div
                            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/40 group-hover:shadow-xl"
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
          <Sparkles size={12} className="text-emerald-500/40" />
          <span className="text-[10px] font-mono tracking-[0.5em] uppercase">
            {isArabic ? "الأمم المتحدة · قسم التكنولوجيا الحيوية" : "UN · Bio-Tech Division"}
          </span>
          <Activity size={12} className="text-emerald-500/40" />
        </motion.div>
      </motion.div>
    </div>
  );
}

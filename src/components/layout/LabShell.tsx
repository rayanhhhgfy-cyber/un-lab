import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export type LabTheme =
  | "emerald"
  | "rose"
  | "sky"
  | "amber"
  | "violet"
  | "cyan"
  | "fuchsia"
  | "blue";

interface LabShellProps {
  /** Hub label and link displayed at the top (e.g. "Biology Hub"). */
  backHref: string;
  backLabelEn: string;
  backLabelAr: string;
  /** Mini eyebrow tag (e.g. "Sector 02 · Biological Sciences"). */
  sectorEn?: string;
  sectorAr?: string;
  /** Big hero title. */
  titleEn: string;
  titleAr: string;
  /** Optional short description shown beneath the title. */
  descriptionEn?: string;
  descriptionAr?: string;
  /** Theme color for accents and decorations. */
  theme?: LabTheme;
  /** Page contents. */
  children: ReactNode;
}

const themeMap: Record<
  LabTheme,
  {
    sectorText: string;
    sectorBar: string;
    titleGradient: string;
    haloA: string;
    haloB: string;
    sectorPill: string;
    glow: string;
  }
> = {
  emerald: {
    sectorText: "text-emerald-300",
    sectorBar: "bg-emerald-400/60",
    titleGradient: "from-white via-emerald-50 to-emerald-400",
    haloA: "bg-emerald-500/30",
    haloB: "bg-teal-500/25",
    sectorPill: "border-emerald-400/30 bg-emerald-500/[0.08] text-emerald-200",
    glow: "shadow-[0_0_60px_-15px_rgba(16,185,129,0.45)]",
  },
  rose: {
    sectorText: "text-rose-300",
    sectorBar: "bg-rose-400/60",
    titleGradient: "from-white via-rose-50 to-rose-400",
    haloA: "bg-rose-500/30",
    haloB: "bg-fuchsia-500/25",
    sectorPill: "border-rose-400/30 bg-rose-500/[0.08] text-rose-200",
    glow: "shadow-[0_0_60px_-15px_rgba(244,63,94,0.45)]",
  },
  sky: {
    sectorText: "text-sky-300",
    sectorBar: "bg-sky-400/60",
    titleGradient: "from-white via-sky-50 to-sky-400",
    haloA: "bg-sky-500/30",
    haloB: "bg-cyan-500/25",
    sectorPill: "border-sky-400/30 bg-sky-500/[0.08] text-sky-200",
    glow: "shadow-[0_0_60px_-15px_rgba(14,165,233,0.45)]",
  },
  amber: {
    sectorText: "text-amber-300",
    sectorBar: "bg-amber-400/60",
    titleGradient: "from-white via-amber-50 to-amber-400",
    haloA: "bg-amber-500/30",
    haloB: "bg-orange-500/25",
    sectorPill: "border-amber-400/30 bg-amber-500/[0.08] text-amber-200",
    glow: "shadow-[0_0_60px_-15px_rgba(245,158,11,0.45)]",
  },
  violet: {
    sectorText: "text-violet-300",
    sectorBar: "bg-violet-400/60",
    titleGradient: "from-white via-violet-50 to-violet-400",
    haloA: "bg-violet-500/30",
    haloB: "bg-fuchsia-500/25",
    sectorPill: "border-violet-400/30 bg-violet-500/[0.08] text-violet-200",
    glow: "shadow-[0_0_60px_-15px_rgba(139,92,246,0.45)]",
  },
  cyan: {
    sectorText: "text-cyan-300",
    sectorBar: "bg-cyan-400/60",
    titleGradient: "from-white via-cyan-50 to-cyan-400",
    haloA: "bg-cyan-500/30",
    haloB: "bg-blue-500/25",
    sectorPill: "border-cyan-400/30 bg-cyan-500/[0.08] text-cyan-200",
    glow: "shadow-[0_0_60px_-15px_rgba(34,211,238,0.45)]",
  },
  fuchsia: {
    sectorText: "text-fuchsia-300",
    sectorBar: "bg-fuchsia-400/60",
    titleGradient: "from-white via-fuchsia-50 to-fuchsia-400",
    haloA: "bg-fuchsia-500/30",
    haloB: "bg-pink-500/25",
    sectorPill: "border-fuchsia-400/30 bg-fuchsia-500/[0.08] text-fuchsia-200",
    glow: "shadow-[0_0_60px_-15px_rgba(217,70,239,0.45)]",
  },
  blue: {
    sectorText: "text-blue-300",
    sectorBar: "bg-blue-400/60",
    titleGradient: "from-white via-blue-50 to-blue-400",
    haloA: "bg-blue-500/30",
    haloB: "bg-indigo-500/25",
    sectorPill: "border-blue-400/30 bg-blue-500/[0.08] text-blue-200",
    glow: "shadow-[0_0_60px_-15px_rgba(59,130,246,0.45)]",
  },
};

export default function LabShell({
  backHref,
  backLabelEn,
  backLabelAr,
  sectorEn,
  sectorAr,
  titleEn,
  titleAr,
  descriptionEn,
  descriptionAr,
  theme = "cyan",
  children,
}: LabShellProps) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const t = themeMap[theme];

  return (
    <div
      className={`min-h-screen w-full relative overflow-hidden bg-black text-white ${
        isArabic ? "rtl font-arabic" : "font-sans"
      }`}
    >
      {/* Animated ambient background — desktop only for performance */}
      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
        <motion.div
          className={`lab-orb ${t.haloA}`}
          style={{ width: 520, height: 520, top: -120, left: -120 }}
          animate={{ x: [0, 40, -10, 0], y: [0, 20, -10, 0], opacity: [0.32, 0.4, 0.3, 0.32] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`lab-orb ${t.haloB}`}
          style={{ width: 600, height: 600, bottom: -180, right: -160 }}
          animate={{ x: [0, -50, 20, 0], y: [0, -30, 10, 0], opacity: [0.28, 0.36, 0.25, 0.28] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="lab-orb bg-white/[0.05]"
          style={{ width: 380, height: 380, top: "30%", left: "55%" }}
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0], opacity: [0.18, 0.24, 0.16, 0.18] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Subtle grid overlay (very faint) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden
      />

      <div className="relative z-10 pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 px-3 sm:px-6 md:px-10 lg:px-14">
        <div className="max-w-[1600px] mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 sm:mb-10 md:mb-12"
          >
            <Link
              to={backHref}
              className="inline-flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all group"
            >
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.05] flex items-center justify-center group-hover:bg-white/15 transition-colors">
                <ArrowLeft size={14} className={isArabic ? "rotate-180" : ""} />
              </span>
              <span className="font-semibold tracking-[0.2em] text-[10px] sm:text-[11px] uppercase">
                {isArabic ? backLabelAr : backLabelEn}
              </span>
            </Link>
          </motion.div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-8 sm:mb-10 md:mb-12"
          >
            {(sectorEn || sectorAr) && (
              <div
                className={`inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 rounded-full border ${t.sectorPill} backdrop-blur-md mb-4 sm:mb-5`}
              >
                <span className={`relative flex w-2 h-2`}>
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full ${t.sectorBar} animate-ping opacity-70`}
                  />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${t.sectorBar}`} />
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase">
                  {isArabic ? sectorAr : sectorEn}
                </span>
              </div>
            )}

            <h1
              className={`text-[2.5rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter bg-clip-text text-transparent bg-gradient-to-br ${t.titleGradient} drop-shadow-[0_4px_24px_rgba(255,255,255,0.06)]`}
            >
              {isArabic ? titleAr : titleEn}
            </h1>

            {(descriptionEn || descriptionAr) && (
              <p className="mt-5 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-slate-300/80 leading-relaxed">
                {isArabic ? descriptionAr : descriptionEn}
              </p>
            )}
          </motion.div>

          {children}
        </div>
      </div>
    </div>
  );
}

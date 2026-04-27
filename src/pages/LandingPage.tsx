import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { Atom, Zap, ArrowRight, Zap as ZapIcon, Headset, Leaf, Mountain, ExternalLink, Facebook, FlaskConical, Microscope, Globe2, Beaker } from "lucide-react";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useIsMobile } from "@/hooks/use-mobile";
import { Suspense, lazy } from "react";

const GravityOverlayAnti = lazy(() => import("@/components/three/AntiGravityOverlay"));

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();
  const isArabic = i18n.language === 'ar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const labs = [
    { name: isArabic ? "مختبر الفيزياء" : "Physics Lab", path: "/physics", icon: <Zap className="w-7 h-7" />, color: "from-cyan-500 to-blue-600", shadow: "shadow-cyan-500/30", border: "border-cyan-500/30" },
    { name: isArabic ? "مختبر الكيمياء" : "Chemistry Lab", path: "/chemistry", icon: <Atom className="w-7 h-7" />, color: "from-purple-500 to-pink-600", shadow: "shadow-purple-500/30", border: "border-purple-500/30" },
    { name: isArabic ? "مختبر الأحياء" : "Biology Lab", path: "/biology", icon: <Leaf className="w-7 h-7" />, color: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/30", border: "border-emerald-500/30" },
    { name: isArabic ? "مختبر علوم الأرض" : "Earth Science Lab", path: "/earth-science", icon: <Mountain className="w-7 h-7" />, color: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/30", border: "border-amber-500/30" },
  ];

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-[#030308] ${isArabic ? 'rtl font-arabic' : 'font-sans'}`}>
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {isMobile ? (
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/15 via-blue-900/10 to-purple-900/15" />
        ) : (
          <>
            <motion.div className="absolute top-0 right-0 w-[700px] h-[700px] bg-cyan-500/8 rounded-full blur-[200px]" animate={{ y: [0, 40, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/8 rounded-full blur-[200px]" animate={{ y: [0, -40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[200px]" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
          </>
        )}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
      </div>

      {!isMobile && <Suspense fallback={null}><GravityOverlayAnti /></Suspense>}

      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {/* ─── HEADER ─── */}
        <motion.header className="w-full px-5 sm:px-8 lg:px-12 pt-8 sm:pt-10 flex items-center justify-center" variants={itemVariants} initial="hidden" animate="visible">
          {/* Center Controls Only */}
          <div className="flex items-center gap-3">
            <motion.div className="text-[10px] sm:text-xs font-semibold text-cyan-300 px-3 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10" whileHover={{ scale: 1.05 }}>
              {t('global.brand.tagline')}
            </motion.div>
            <LanguageSwitcher />
          </div>
        </motion.header>

        {/* ─── MAIN CONTENT ─── */}
        <motion.div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8" variants={containerVariants} initial="hidden" animate="visible">

          {/* ─── HERO: UN-Labs with Logos on Sides (Horizontal Mobile Layout) ─── */}
          <motion.div className="w-full max-w-[1800px] flex flex-row items-center justify-center gap-2 xs:gap-4 sm:gap-12 lg:gap-20 mb-10 xs:mb-12 sm:mb-14 text-center px-1 xs:px-2 sm:px-4" variants={itemVariants}>
            
            {/* School Logo - Left Side */}
            <div className="flex flex-col items-center gap-2 xs:gap-4 sm:gap-6 w-1/4 lg:w-1/3 order-1">
              <img src="/school logo.jpg" alt="School Logo" className="w-12 h-12 xs:w-16 xs:h-16 sm:w-48 lg:w-64 sm:h-48 lg:h-64 rounded-lg xs:rounded-2xl sm:rounded-3xl object-cover border border-white/10 shadow-[0_0_40px_rgba(34,211,238,0.2)]" />
              <div className="space-y-0.5 sm:space-y-2">
                <div className="text-[7px] xs:text-[9px] sm:text-2xl lg:text-3xl font-black text-white tracking-tight sm:tracking-wide leading-tight drop-shadow-md">{isArabic ? "مدرسة الملك حسين" : "King Hussein"}</div>
                <div className="text-[6px] xs:text-[8px] sm:text-lg lg:text-xl text-white font-bold tracking-tighter sm:tracking-wider leading-tight uppercase opacity-90">{isArabic ? "الثانوية" : "School"}</div>
              </div>
            </div>

            {/* UN-Labs Title - Center */}
            <div className="flex flex-col items-center w-1/2 lg:w-1/3 order-2">
              <h1 className="text-3xl xs:text-4xl sm:text-8xl lg:text-9xl font-black tracking-tighter mb-1 xs:mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">UN-Labs</span>
              </h1>
              <p className="text-[9px] xs:text-[11px] sm:text-3xl font-bold text-slate-300 tracking-tight sm:tracking-wide">
                {isArabic ? "المعرفة الرقمية" : "Ultimate Knowledge"}
              </p>
              <div className="mt-2 xs:mt-6 h-[1px] xs:h-[2px] w-12 xs:w-48 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            </div>

            {/* Ministry Logo - Right Side */}
            <div className="flex flex-col items-center gap-2 xs:gap-4 sm:gap-6 w-1/4 lg:w-1/3 order-3">
              <img src="/ministery of education logo.webp" alt={isArabic ? "وزارة التربية والتعليم" : "Ministry of Education"} className="w-12 h-12 xs:w-16 xs:h-16 sm:w-48 lg:w-64 sm:h-48 lg:h-64 rounded-lg xs:rounded-2xl sm:rounded-3xl object-contain border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.2)] bg-white/5" />
              <div className="space-y-0.5 sm:space-y-2">
                <div className="text-[7px] xs:text-[9px] sm:text-2xl lg:text-3xl font-black text-white tracking-tight sm:tracking-wide leading-tight drop-shadow-md">{isArabic ? "وزارة التربية" : "Ministry"}</div>
                <div className="text-[6px] xs:text-[8px] sm:text-lg lg:text-xl text-white font-bold tracking-tighter sm:tracking-wider leading-tight uppercase opacity-90">{isArabic ? "الأردن" : "Jordan"}</div>
              </div>
            </div>

          </motion.div>

          {/* ─── INSTITUTIONAL SECTION ─── */}
          <motion.div className="w-full max-w-3xl mb-16" variants={itemVariants}>
            {/* Institutional Buttons */}
            <div className="flex flex-col gap-4 items-center">
              {/* 1. Ministry of Education */}
              <motion.a
                href="https://web.facebook.com/edugovjo"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full max-w-xl relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-emerald-500/60 via-green-500/50 to-emerald-600/60"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative rounded-[15px] bg-slate-950/90 backdrop-blur-xl px-6 py-5 flex items-center justify-between gap-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/25 transition-colors">
                      <Facebook className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-[10px] text-emerald-400/70 uppercase tracking-[0.2em] font-bold mb-0.5">{isArabic ? "صفحة فيسبوك" : "Facebook Page"}</div>
                      <div className="text-sm sm:text-base font-bold text-white">{isArabic ? "وزارة التربية والتعليم" : "Ministry of Education"}</div>
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
                <div className="relative rounded-[15px] bg-slate-950/90 backdrop-blur-xl px-6 py-5 flex items-center justify-between gap-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/25 transition-colors">
                      <Facebook className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-[10px] text-blue-400/70 uppercase tracking-[0.2em] font-bold mb-0.5">{isArabic ? "صفحة فيسبوك" : "Facebook Page"}</div>
                      <div className="text-sm sm:text-base font-bold text-white">{isArabic ? "مديرية التربية والتعليم للواء قصبة إربد" : "Directorate of Education – Irbid"}</div>
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
                <div className="relative rounded-[15px] bg-slate-950/90 backdrop-blur-xl px-6 py-5 flex items-center justify-between gap-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/25 transition-colors">
                      <Facebook className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-[10px] text-purple-400/70 uppercase tracking-[0.2em] font-bold mb-0.5">{isArabic ? "صفحة فيسبوك" : "Facebook Page"}</div>
                      <div className="text-sm sm:text-base font-bold text-white">{isArabic ? "مدرسة الملك حسين بن طلال الثانوية للبنين" : "King Hussein Bin Talal School"}</div>
                    </div>
                  </div>
                  <ExternalLink className="relative w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* ─── LABORATORIES SECTION ─── */}
          <motion.div className="w-full max-w-5xl" variants={itemVariants}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur mb-4">
                <FlaskConical className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-300 font-bold">{isArabic ? "المختبرات العلمية" : "Science Laboratories"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">{isArabic ? "استكشف المختبرات" : "Explore Our Labs"}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {labs.map((lab, i) => (
                <motion.div key={lab.path} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link to={lab.path}>
                    <div className={`relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-br ${lab.color} shadow-xl ${lab.shadow} hover:shadow-2xl transition-shadow duration-300`}>
                      <div className="relative overflow-hidden rounded-[15px] bg-slate-950/95 backdrop-blur-xl p-7 sm:p-8 text-center h-full">
                        <div className={`absolute inset-0 bg-gradient-to-br ${lab.color} opacity-[0.03]`} />
                        <div className="relative">
                          <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${lab.color} flex items-center justify-center text-white shadow-lg ${lab.shadow}`}>
                            {lab.icon}
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-white mb-3">{lab.name}</h3>
                          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                            <span>{isArabic ? "دخول" : "Enter"}</span>
                            <ArrowRight className={`w-3 h-3 ${isArabic ? 'rotate-180' : ''}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div className="w-full max-w-5xl mt-16" variants={itemVariants}>
            <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
              {t('landing.features.title')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: "⚡", title: t('landing.features.feature1.title'), desc: t('landing.features.feature1.description') },
                { icon: "🎓", title: t('landing.features.feature2.title'), desc: t('landing.features.feature2.description') },
                { icon: "🚀", title: t('landing.features.feature3.title'), desc: t('landing.features.feature3.description') },
              ].map((feature, i) => (
                <motion.div key={i} variants={itemVariants} whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="text-base font-bold text-white mb-1.5">{feature.title}</h4>
                  <p className="text-sm text-slate-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

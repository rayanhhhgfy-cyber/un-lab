import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Headset, Sparkles, Zap, ArrowRight, Star, Rocket, Eye } from "lucide-react";
import { Suspense, lazy } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load the 3D component
const GravityOverlayAnti = lazy(() => import("@/components/three/AntiGravityOverlay"));

export default function VRLabsPage() {
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();
  const isArabic = i18n.language === 'ar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const floatingVariants = {
    animate: {
      y: [0, -30, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 1, 0.5],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-black ${isArabic ? 'rtl' : 'ltr'}`}>
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {isMobile ? (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/25 via-red-900/15 to-purple-900/25" />
        ) : (
          <>
            {/* Orange orb - top right */}
            <motion.div
              className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-3xl motion-safe"
              animate={{ y: [0, 60, 0], x: [0, 50, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              style={{ willChange: 'transform' }}
            />
            
            {/* Purple orb - bottom left */}
            <motion.div
              className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl motion-safe"
              animate={{ y: [0, -60, 0], x: [0, -50, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              style={{ willChange: 'transform' }}
            />

            {/* Red accent - center */}
            <motion.div
              className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-red-500/15 rounded-full blur-3xl motion-safe"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              style={{ willChange: 'transform' }}
            />

            {/* Cyan accent - bottom right */}
            <motion.div
              className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl motion-safe"
              animate={{ scale: [1, 1.2, 1], x: [0, 40, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              style={{ willChange: 'transform' }}
            />
          </>
        )}
      </div>

      {/* 3D Background */}
      {!isMobile && (
        <Suspense fallback={null}>
          <GravityOverlayAnti />
        </Suspense>
      )}

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          className="w-full max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Icon - Enhanced */}
          <motion.div
            variants={itemVariants}
            className="mb-8 sm:mb-12 flex justify-center"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative"
            >
              {/* Background Glow */}
              <motion.div
                variants={pulseVariants}
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full blur-3xl opacity-40"
              />
              
              {/* Icon Container */}
              <div className="relative inline-flex items-center justify-center w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 shadow-2xl border-4 border-orange-300/30">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-orange-500 to-red-500 blur-xl opacity-50" />
                <Headset className="relative w-16 h-16 sm:w-24 sm:h-24 text-white drop-shadow-lg" />
              </div>
            </motion.div>
          </motion.div>

          {/* Animated Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-400/40 bg-orange-500/10 backdrop-blur-xl mb-6 sm:mb-10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-orange-300" />
            </motion.div>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-orange-200 font-bold">
              {t('vr_labs.page_title')}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-8xl font-black tracking-tighter mb-4 sm:mb-6 leading-[1.05]"
          >
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
              {t('vr_labs.coming_soon')}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12 px-2"
          >
            {t('vr_labs.description')}
          </motion.p>

          {/* Animated Stats Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 max-w-3xl mx-auto"
          >
            {[
              {
                icon: Eye,
                title: t('vr_labs.features.immersive.title'),
                desc: t('vr_labs.features.immersive.desc'),
                color: "from-orange-500 to-red-500",
                delay: 0,
              },
              {
                icon: Rocket,
                title: t('vr_labs.features.innovative.title'),
                desc: t('vr_labs.features.innovative.desc'),
                color: "from-red-500 to-pink-500",
                delay: 0.1,
              },
              {
                icon: Zap,
                title: t('vr_labs.features.interactive.title'),
                desc: t('vr_labs.features.interactive.desc'),
                color: "from-pink-500 to-orange-500",
                delay: 0.2,
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  transition={{ delay: feature.delay }}
                  whileHover={{ y: -12, scale: 1.08 }}
                  className="relative group"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl`}
                  />
                  <div className="relative p-6 sm:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md hover:border-orange-400/30 transition-all duration-300 group-hover:bg-slate-800/80">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-400">{feature.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="/"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-xl shadow-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/60 transition-all duration-300 flex items-center gap-3 text-sm sm:text-base group"
            >
              {t('vr_labs.cta.explore')}
              <motion.div
                group-hover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.a>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg border-2 border-orange-500/60 text-orange-300 font-bold hover:bg-orange-500/10 hover:border-orange-400 transition-all duration-300 text-sm sm:text-base"
            >
              {t('vr_labs.cta.back')}
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Floating Background Elements */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-32 left-12 w-24 h-24 border-2 border-orange-500/20 rounded-full"
              animate={{ rotate: 360, y: [0, 20, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-40 right-16 w-36 h-36 border-2 border-pink-500/10 rounded-full"
              animate={{ rotate: -360, y: [0, -20, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-1/2 left-1/4 w-16 h-16 border border-red-500/15 rounded-full"
              animate={{ scale: [1, 1.2, 1], rotate: 180 }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
      </div>
    </div>
  );
}

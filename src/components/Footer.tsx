import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Sparkles, Mail, Phone, Github, Linkedin, Heart } from "lucide-react";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();
  const isArabic = i18n.language === 'ar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: "un.sciences.lab@gmail.com",
      link: "mailto:un.sciences.lab@gmail.com",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Phone,
      label: "Phone 1",
      value: "0788809843",
      link: "tel:0788809843",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Phone,
      label: "Phone 2",
      value: "0790825302",
      link: "tel:0790825302",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative w-full overflow-hidden mt-16 xs:mt-20 sm:mt-24 md:mt-32 lg:mt-40 ${isArabic ? 'rtl' : 'ltr'}`}
    >
      {/* Enhanced animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Cyan orb - bottom left */}
        <motion.div
          className="absolute -bottom-20 xs:-bottom-24 sm:-bottom-32 -left-20 xs:-left-24 sm:-left-32 w-60 xs:w-80 sm:w-96 h-60 xs:h-80 sm:h-96 bg-gradient-to-br from-cyan-600/15 via-cyan-500/8 to-transparent rounded-full blur-3xl"
          animate={{ y: [0, 60, 0], x: [0, -40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Purple orb - bottom right */}
        <motion.div
          className="absolute -bottom-24 xs:-bottom-32 sm:-bottom-40 -right-20 xs:-right-24 sm:-right-32 w-60 xs:w-80 sm:w-96 h-60 xs:h-80 sm:h-96 bg-gradient-to-bl from-purple-600/15 via-pink-500/8 to-transparent rounded-full blur-3xl"
          animate={{ y: [0, -60, 0], x: [0, 40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        {/* Orange accent - top center */}
        <motion.div
          className="absolute -top-32 xs:-top-40 sm:-top-48 left-1/2 transform -translate-x-1/2 w-48 xs:w-64 sm:w-96 h-48 xs:h-64 sm:h-96 bg-gradient-to-b from-orange-600/10 via-orange-500/5 to-transparent rounded-full blur-3xl"
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Premium top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
      <div className="absolute top-1 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent blur-sm" />
      <div className="absolute top-2 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      {/* Animated accent lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-48 xs:w-64 sm:w-80 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          animate={{ opacity: [0.2, 0.6, 0.2], x: [-20, 0, -20] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-48 xs:w-64 sm:w-80 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"
          animate={{ opacity: [0.2, 0.6, 0.2], x: [20, 0, 20] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 px-4 xs:px-5 sm:px-8 md:px-12 lg:px-16 py-10 xs:py-12 sm:py-16 md:py-20 lg:py-24">
        <motion.div
          className="flex flex-col items-center justify-center max-w-6xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Top animated accent */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 xs:gap-3 sm:gap-4 mb-4 xs:mb-6 sm:mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="p-2 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/40"
            >
              <Sparkles className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-cyan-400" />
            </motion.div>
            <div className="h-px w-4 xs:w-6 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="p-2 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/40"
            >
              <Heart className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-purple-400" />
            </motion.div>
          </motion.div>

          {/* Main heading section */}
          <motion.div variants={itemVariants} className="text-center mb-6 xs:mb-8 sm:mb-10 w-full px-2 xs:px-0">
            <div className="mb-4 xs:mb-5">
              <p className="text-sm xs:text-base sm:text-lg md:text-xl uppercase tracking-widest text-cyan-400 font-black mb-4 xs:mb-6 mt-4 drop-shadow-md">
                {t('footer.madeBy')}
              </p>
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg mb-3 xs:mb-4 leading-tight">
                {t('footer.schoolName')}
              </h2>
            </div>

            {/* Tagline with enhanced styling */}
            <p className="text-sm xs:text-sm sm:text-base md:text-lg text-gray-300 font-light italic mb-4 xs:mb-5">
              {t('footer.tagline')}
            </p>

            {/* Supervisor with enhanced styling */}
            <motion.p
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-sm xs:text-base sm:text-lg md:text-xl text-purple-300 font-bold inline-flex items-center gap-3 justify-center mt-6 xs:mt-8 px-5 xs:px-6 py-3 rounded-full border border-purple-400/50 bg-purple-500/20 backdrop-blur-md whitespace-nowrap shadow-lg shadow-purple-500/20"
            >
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              {t('footer.supervisor')}
            </motion.p>
          </motion.div>

          {/* Contact cards section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 w-full mb-8 xs:mb-10 sm:mb-12 max-w-4xl mx-auto"
          >
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={i}
                  href={item.link}
                  whileHover={{ y: -6, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  {/* Animated glow background */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-all duration-300 group-hover:blur-2xl`} />

                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-slate-900/70 to-slate-800/50 backdrop-blur-xl border border-white/10 group-hover:border-white/20 rounded-2xl p-4 xs:p-5 sm:p-6 transition-all duration-300 overflow-hidden h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 group-hover:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10 flex flex-col items-start gap-2 xs:gap-2.5">
                      <div className={`inline-flex items-center justify-center w-10 xs:w-11 h-10 xs:h-11 rounded-lg bg-gradient-to-br ${item.color} shadow-lg group-hover:shadow-xl transition-all flex-shrink-0`}>
                        <Icon className="w-5 xs:w-6 h-5 xs:h-6 text-white" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-xs xs:text-sm font-bold text-gray-300 mb-0.5">{item.label}</h3>
                        <p className="text-xs xs:text-sm text-gray-400 group-hover:text-white transition-colors break-words line-clamp-2">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Enhanced divider */}
          <motion.div
            variants={itemVariants}
            className="w-24 xs:w-32 sm:w-40 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent mb-8 xs:mb-10 sm:mb-12 rounded-full relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full blur-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Bottom info section with enhanced styling */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-3 xs:gap-4 text-center w-full"
          >
            <div className="flex items-center justify-center gap-2 xs:gap-2.5">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-yellow-400 flex-shrink-0" />
              </motion.div>
              <span className="text-xs xs:text-sm sm:text-base text-gray-300 font-medium">
                {t('footer.empowering')}
              </span>
            </div>

            {/* Copyright with enhanced styling */}
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs xs:text-xs sm:text-sm text-gray-400 font-light">
                {t('footer.copyright', { year: currentYear })}
              </p>
            </div>
          </motion.div>

          {/* Decorative animated dots */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 xs:gap-2.5 pt-6 xs:pt-8 sm:pt-10"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 flex-shrink-0"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 xs:h-32 sm:h-40 md:h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
    </motion.footer>
  );
}

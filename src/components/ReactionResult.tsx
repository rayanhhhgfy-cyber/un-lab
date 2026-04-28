import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FlaskConical, Flame, AlertTriangle, Thermometer, BookOpen, Sparkles, Zap } from 'lucide-react';
import { type Reaction } from '@/data/reactions';
import ShareReactionButton from '@/components/ShareReactionButton';

const ReactionResult = ({ reaction: r }: { reaction: Reaction | null }) => {
  const { t } = useTranslation();
  if (!r) return null;
  const exo = r.enthalpy < 0;

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      className="relative overflow-hidden rounded-3xl border border-cyan-500/20 backdrop-blur-xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5" />
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-cyan-500/10 to-transparent rounded-full blur-3xl" 
        animate={{ scale: [1, 1.2, 1] }} 
        transition={{ duration: 4, repeat: Infinity }} 
      />

      <div className="relative z-10 p-5 sm:p-6 md:p-7 lg:p-8 space-y-5 sm:space-y-7">
        {/* Equation Section */}
        <motion.div className="text-center space-y-3 sm:space-y-4" variants={itemVariants}>
          <motion.div 
            className="text-xl sm:text-3xl lg:text-4xl font-mono font-bold tracking-widest break-all text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            {r.balanced}
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-2 justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/20 text-cyan-200 border border-cyan-500/40 shadow-lg shadow-cyan-500/10">
              <Zap className="w-3.5 h-3.5" />
              {t(`chemistry.reaction_types.${r.type}`)}
            </span>
            <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold px-4 py-2 rounded-full bg-white/5 text-cyan-300 border border-cyan-500/20">
              {t('chemistry.reaction')}
            </span>
            <ShareReactionButton reaction={r} />
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {/* Products Section */}
          <motion.div 
            className="space-y-3 p-4 sm:p-5 md:p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2.5">
              <motion.div 
                className="p-2 rounded-lg bg-cyan-500/30 border border-cyan-500/40"
                whileHover={{ scale: 1.1 }}
              >
                <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
              </motion.div>
              <span className="text-sm sm:text-base font-bold text-cyan-200">{t('chemistry.products')}</span>
            </div>
            <div className="flex flex-col gap-2.5 mt-4">
              {r.products.map((p, i) => (
                <motion.div 
                  key={i} 
                  className="bg-white/5 hover:bg-white/10 hover:border-cyan-500/40 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-cyan-100 border border-cyan-500/20 transition-all duration-300 shadow-md hover:shadow-lg"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  whileHover={{ x: 4, scale: 1.02 }}
                >
                  {p}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Energy Section */}
          <motion.div 
            className="space-y-3 p-4 sm:p-5 md:p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/30 shadow-lg shadow-orange-500/10"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2.5">
              <motion.div 
                className="p-2 rounded-lg bg-orange-500/30 border border-orange-500/40"
                animate={exo ? { scale: [1, 1.15, 1] } : {}}
                transition={exo ? { duration: 1, repeat: Infinity } : {}}
              >
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-300" />
              </motion.div>
              <span className="text-sm sm:text-base font-bold text-orange-200">{t('chemistry.energy')}</span>
            </div>
            
            <motion.div 
              className={`flex items-center gap-2.5 rounded-xl px-3.5 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-mono font-bold transition-all border-2 shadow-lg ${
                exo 
                  ? 'bg-gradient-to-r from-orange-500/20 to-red-500/10 text-orange-300 border-orange-500/40 shadow-orange-500/20' 
                  : 'bg-gradient-to-r from-blue-500/20 to-cyan-500/10 text-blue-300 border-blue-500/40 shadow-blue-500/20'
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>{r.enthalpy > 0 ? '+' : ''}{r.enthalpy} kJ/mol</span>
              <span className="text-[0.65rem] opacity-70 ml-auto">({exo ? 'Exothermic' : 'Endothermic'})</span>
            </motion.div>

            {r.temp && (
              <motion.div 
                className="flex items-center gap-2.5 text-xs sm:text-sm bg-white/5 hover:bg-white/10 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 border border-cyan-500/20 transition-all"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Thermometer className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-cyan-300 font-medium">{r.temp}</span>
              </motion.div>
            )}

            {r.catalyst && (
              <motion.div 
                className="flex items-center gap-2.5 text-xs sm:text-sm bg-purple-500/20 hover:bg-purple-500/30 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 border border-purple-500/40 transition-all"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.55 }}
              >
                <Sparkles className="w-4 h-4 text-purple-300 flex-shrink-0" />
                <span className="text-purple-300 font-medium">{r.catalyst}</span>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Description */}
        <motion.div 
          className="space-y-2.5 p-4 sm:p-5 md:p-6 rounded-2xl bg-gradient-to-br from-white/5 to-blue-500/5 border border-blue-500/20 shadow-md"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2.5">
            <motion.div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
            </motion.div>
            <span className="text-xs sm:text-sm font-bold text-blue-200">{t('chemistry.about_reaction')}</span>
          </div>
          <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed ml-8">{r.desc}</p>
        </motion.div>

        {/* Real World Use */}
        <motion.div 
          className="p-4 sm:p-5 md:p-6 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-green-500/10 border border-emerald-500/30 text-xs sm:text-sm shadow-lg shadow-emerald-500/10"
          variants={itemVariants}
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-emerald-300 font-bold block mb-1">{t('chemistry.real_world_use')}</span>
              <span className="text-emerald-200/80">{r.realUse}</span>
            </div>
          </div>
        </motion.div>

        {/* Safety Warning */}
        {r.safety && (
          <motion.div 
            className="flex items-start gap-3 p-4 sm:p-5 md:p-6 rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-500/10 border-2 border-red-500/40 shadow-lg shadow-red-500/10"
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 mt-0.5 shrink-0 flex-shrink-0 animate-pulse" />
            <span className="text-xs sm:text-sm text-red-200 font-bold leading-relaxed">{r.safety}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ReactionResult;

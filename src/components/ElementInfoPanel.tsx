import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Atom, Thermometer, Droplets, Zap, Weight, Layers, X, Flame } from 'lucide-react';
import { type Element, catLabel, catColor } from '@/data/elements';
import { getReactionsForElement } from '@/data/reactions';

const Stat = ({ icon, label, value, small }: { icon: any; label: string; value: string; small?: boolean }) => (
  <motion.div 
    className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-white/5 border border-blue-500/20 hover:border-blue-500/40 hover:bg-white/10 transition-all"
    whileHover={{ scale: 1.05, y: -2 }}
  >
    <div className="text-blue-400 mb-1 opacity-70">{icon}</div>
    <div className={`${small ? 'text-[0.55rem]' : 'text-xs'} text-blue-300/60 text-center leading-tight`}>{label}</div>
    <div className={`${small ? 'text-[0.65rem]' : 'text-xs'} font-bold text-blue-200 text-center mt-0.5 leading-tight`}>{value}</div>
  </motion.div>
);

const ElementInfoPanel = ({ element: el, onClose }: { element: Element | null; onClose: () => void }) => {
  const { t } = useTranslation();
  if (!el) return null;
  const rxns = getReactionsForElement(el.sym);

  return (
    <motion.div 
      className="relative overflow-hidden rounded-3xl p-5 sm:p-6 md:p-7 border border-blue-500/20 backdrop-blur-xl"
      initial={{ opacity: 0, x: 30, y: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      exit={{ opacity: 0, x: 30 }}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />
      <motion.div 
        className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-l from-blue-500/10 to-transparent rounded-full blur-3xl" 
        animate={{ scale: [1, 1.1, 1] }} 
        transition={{ duration: 6, repeat: Infinity }} 
      />

      <div className="relative z-10 space-y-4 sm:space-y-5 md:space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 flex-1">
            <motion.div 
              className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl ${catColor[el.cat]} flex flex-col items-center justify-center border-2 border-white/30 shadow-lg shadow-white/20`}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="text-[0.45rem] sm:text-xs md:text-sm opacity-70 font-mono font-bold">{el.z}</span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-black">{el.sym}</span>
              <span className="text-[0.5rem] sm:text-[0.6rem] md:text-xs opacity-60">{el.mass.toFixed(1)}</span>
            </motion.div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-200">{el.name}</h3>
              <span className="text-xs sm:text-sm text-blue-300/70 block mt-1">{t(`elements.categories.${el.cat}`)}</span>
              <p className="text-xs text-blue-200/60 line-clamp-2 mt-1">{el.desc}</p>
            </div>
          </div>
          <motion.button 
            onClick={onClose} 
            className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors flex-shrink-0"
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5 text-blue-300/70 hover:text-blue-300" />
          </motion.button>
        </div>

        {/* Properties Grid */}
        <motion.div 
          className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, staggerChildren: 0.05 }}
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
            <Stat icon={<Weight className="w-4 h-4 sm:w-5 sm:h-5" />} label={t('chemistry.element_info.mass')} value={`${el.mass.toFixed(2)}`} />
          </motion.div>
          {el.en !== null && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.05 }}>
              <Stat icon={<Zap className="w-4 h-4 sm:w-5 sm:h-5" />} label={t('chemistry.element_info.electronegativity')} value={String(el.en)} />
            </motion.div>
          )}
          {el.mp !== null && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
              <Stat icon={<Thermometer className="w-4 h-4 sm:w-5 sm:h-5" />} label={t('chemistry.element_info.melting_point')} value={`${el.mp}°C`} />
            </motion.div>
          )}
          {el.bp !== null && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.15 }}>
              <Stat icon={<Droplets className="w-4 h-4 sm:w-5 sm:h-5" />} label={t('chemistry.element_info.boiling_point')} value={`${el.bp}°C`} />
            </motion.div>
          )}
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
            <Stat icon={<Atom className="w-4 h-4 sm:w-5 sm:h-5" />} label={t('chemistry.element_info.config')} value={el.econf} small />
          </motion.div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.25 }}>
            <Stat icon={<Layers className="w-4 h-4 sm:w-5 sm:h-5" />} label={t('chemistry.element_info.phase')} value={el.phase} />
          </motion.div>
        </motion.div>

        {/* Oxidation States */}
        <AnimatePresence>
          {el.ox.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <div className="text-xs font-bold text-blue-300 uppercase tracking-wider">{t('chemistry.element_info.oxidation_states')}</div>
              <div className="flex gap-1.5 flex-wrap">
                {el.ox.map((s, i) => (
                  <motion.span 
                    key={s} 
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500/30 to-cyan-500/20 text-blue-300 text-xs font-mono font-bold border border-blue-500/40 shadow-md"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.05, type: 'spring' }}
                    whileHover={{ scale: 1.08, y: -2 }}
                  >
                    {s > 0 ? `+${s}` : s}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Related Reactions */}
        <AnimatePresence>
          {rxns.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <div className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-2">
                <Flame className="w-3.5 h-3.5" />
                {t('chemistry.element_info.related_reactions')} ({rxns.length})
              </div>
              <div className="space-y-1.5 max-h-32 overflow-y-auto custom-scrollbar">
                {rxns.slice(0, 6).map((r, i) => (
                  <motion.div 
                    key={r.id}
                    className="text-xs font-mono bg-gradient-to-r from-blue-500/20 to-cyan-500/10 border border-blue-500/30 hover:border-blue-500/50 rounded-lg px-2.5 py-2 text-blue-300/90 truncate transition-all hover:bg-blue-500/30"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    {r.balanced}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ElementInfoPanel;

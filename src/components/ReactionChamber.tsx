import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Beaker, X, Zap, Sparkles } from 'lucide-react';
import { type Element, catColor } from '@/data/elements';
import { preAddedCompounds } from '@/data/reactions';

interface Props {
  elements: Element[];
  compounds: string[];
  onRemoveElement: (sym: string) => void;
  onRemoveCompound: (formula: string) => void;
  onReact: () => void;
  reacting: boolean;
}

const ReactionChamber = ({ elements: els, compounds: comps, onRemoveElement, onRemoveCompound, onReact, reacting }: Props) => {
  const { t } = useTranslation();
  const allReactants = [...els, ...comps.map(formula => ({ formula, isCompound: true }))];

  return (
    <motion.div 
      className="relative overflow-hidden rounded-3xl border border-cyan-500/20 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5" />
      
      {reacting && (
        <>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10" 
            animate={{ opacity: [0, 0.4, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity }} 
          />
          <motion.div 
            className="absolute inset-0 border-2 border-cyan-500/30 rounded-3xl" 
            animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.3, 0.6, 0.3] }} 
            transition={{ duration: 1.2, repeat: Infinity }} 
          />
          <motion.div 
            className="absolute top-0 left-1/2 w-96 h-96 bg-gradient-to-b from-cyan-500/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" 
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} 
            transition={{ duration: 2, repeat: Infinity }} 
          />
        </>
      )}
      
      <div className="relative z-10 p-5 sm:p-6 md:p-7 lg:p-8">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <motion.div 
            className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-500/20 border border-cyan-500/40 shadow-lg shadow-cyan-500/20"
            animate={reacting ? { scale: [1, 1.15, 1] } : {}}
            transition={reacting ? { duration: 0.6, repeat: Infinity } : {}}
          >
            <Beaker className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300" />
          </motion.div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              {t('chemistry.reaction_chamber.title')}
            </h3>
            <p className="text-xs sm:text-sm text-cyan-300/60 mt-1">{t('chemistry.reaction_chamber.description')}</p>
          </div>
        </div>

        {/* Reactants Display */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 min-h-[160px] sm:min-h-[200px] flex-wrap rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-white/5 to-cyan-500/5 border border-cyan-500/10">
          <AnimatePresence mode="popLayout">
            {allReactants.map((reactant, i) => {
              const isCompound = 'isCompound' in reactant;
              const key = isCompound ? reactant.formula : reactant.sym;
              
              return (
                <motion.div 
                  key={key} 
                  initial={{ scale: 0, rotate: -180, y: -20 }} 
                  animate={{ scale: 1, rotate: 0, y: 0 }} 
                  exit={{ scale: 0, rotate: 180, y: 20 }} 
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }} 
                  className="relative"
                >
                  {i > 0 && (
                    <motion.div 
                      className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 z-20"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <span className="text-cyan-400/80 font-bold text-2xl sm:text-3xl drop-shadow-lg">+</span>
                    </motion.div>
                  )}
                  <motion.div
                    className={`flex flex-col items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 ${
                      isCompound 
                        ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/20 border-purple-500/50 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40'
                        : `${catColor[reactant.cat]} border-white/30 shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-white/30`
                    }`}
                    animate={reacting ? { rotate: [0, 8, -8, 0], y: [0, -12, 0], scale: [1, 1.1, 1] } : { scale: 1, rotate: 0 }}
                    transition={reacting ? { duration: 0.7, repeat: Infinity, ease: 'easeInOut' } : {}}
                    whileHover={!reacting ? { scale: 1.08, y: -4 } : {}}
                  >
                    <motion.button 
                      onClick={() => isCompound ? onRemoveCompound(reactant.formula) : onRemoveElement(reactant.sym)} 
                      className="absolute -top-3 -right-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-full p-1.5 hover:scale-110 transition-all shadow-lg shadow-red-500/40 border border-red-400/50"
                      whileHover={{ scale: 1.3, rotate: 90 }}
                      whileTap={{ scale: 0.85 }}
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-white font-bold" />
                    </motion.button>
                    <span className="text-2xl sm:text-4xl font-black leading-none text-white drop-shadow-lg">
                      {isCompound ? reactant.formula : reactant.sym}
                    </span>
                    <span className="text-[0.65rem] sm:text-xs opacity-80 mt-1 text-center font-semibold max-w-full truncate px-2 text-white">
                      {isCompound 
                        ? preAddedCompounds.find(c => c.formula === reactant.formula)?.name || reactant.formula
                        : reactant.name
                      }
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {allReactants.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center gap-3 py-4"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
                <Beaker className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400/40" />
              </motion.div>
              <p className="text-sm sm:text-base text-cyan-300/60 text-center max-w-xs font-medium">
                {t('chemistry.reaction_chamber.empty_state')}
              </p>
            </motion.div>
          )}
        </div>

        {/* React Button */}
        {allReactants.length >= 2 && (
          <motion.div 
            className="flex justify-center mt-7 sm:mt-8" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={onReact} 
              disabled={reacting}
              className="flex items-center gap-2.5 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-white font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-cyan-300/50 disabled:border-cyan-300/20"
              whileHover={!reacting ? { scale: 1.08, y: -3 } : {}} 
              whileTap={!reacting ? { scale: 0.92 } : {}}
            >
              {!reacting ? (
                <>
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>{t('chemistry.reaction_chamber.button')}</span>
                </>
              ) : (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                  <span>Reacting...</span>
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ReactionChamber;

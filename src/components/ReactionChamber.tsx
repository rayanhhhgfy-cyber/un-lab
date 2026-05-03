import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Beaker, X, Zap, Sparkles, Plus } from 'lucide-react';
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

const ReactionChamber = ({
  elements: els,
  compounds: comps,
  onRemoveElement,
  onRemoveCompound,
  onReact,
  reacting,
}: Props) => {
  const { t } = useTranslation();
  const allReactants: Array<
    Element | { formula: string; isCompound: true }
  > = [...els, ...comps.map((formula) => ({ formula, isCompound: true as const }))];

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl border border-white/10 backdrop-blur-xl bg-white/[0.02]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.06] via-blue-500/[0.04] to-purple-500/[0.05] pointer-events-none" />

      {/* Reactive overlay */}
      {reacting && (
        <>
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(120deg, rgba(56,189,248,0.10), rgba(168,85,247,0.10), rgba(56,189,248,0.10))',
              backgroundSize: '200% 200%',
            }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 pointer-events-none"
            style={{ borderColor: 'rgba(56,189,248,0.35)' }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        </>
      )}

      <div className="relative z-10 p-5 sm:p-6 md:p-7 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <motion.div
            className="relative p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-lg shadow-cyan-500/40"
            animate={reacting ? { scale: [1, 1.12, 1], rotate: [0, 8, -8, 0] } : {}}
            transition={reacting ? { duration: 0.9, repeat: Infinity } : {}}
          >
            <Beaker className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 opacity-50 blur-md -z-10" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-2xl font-black bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent leading-tight">
              {t('chemistry.reaction_chamber.title')}
            </h3>
            <p className="text-[11px] sm:text-sm text-slate-400 mt-0.5">
              {t('chemistry.reaction_chamber.description')}
            </p>
          </div>
        </div>

        {/* Reactant stage */}
        <div className="relative flex items-center justify-center gap-3 sm:gap-5 min-h-[180px] sm:min-h-[220px] flex-wrap rounded-2xl p-5 sm:p-7 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 overflow-hidden">
          {/* Backdrop pattern */}
          <div
            className="absolute inset-0 opacity-[0.12] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(rgba(56,189,248,0.6) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Reactive radial glow */}
          {reacting && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(56,189,248,0.18) 0%, transparent 60%)',
              }}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          )}

          <AnimatePresence mode="popLayout">
            {allReactants.map((reactant, i) => {
              const isCompound = 'isCompound' in reactant;
              const formula = isCompound ? reactant.formula : reactant.sym;
              const key = formula;
              const displayName = isCompound
                ? preAddedCompounds.find((c) => c.formula === reactant.formula)?.name ||
                  reactant.formula
                : reactant.name;

              return (
                <motion.div
                  key={key}
                  layout
                  initial={{ scale: 0.4, opacity: 0, y: -20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.4, opacity: 0, y: 20 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  className="relative group"
                >
                  {/* Plus separator */}
                  {i > 0 && (
                    <motion.div
                      className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15 }}
                    >
                      <motion.div
                        className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-500/15 border border-cyan-400/40 backdrop-blur-md"
                        animate={{
                          scale: reacting ? [1, 1.25, 1] : [1, 1.08, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                        style={{
                          boxShadow:
                            '0 0 12px rgba(56,189,248,0.55), inset 0 0 6px rgba(56,189,248,0.3)',
                        }}
                      >
                        <Plus
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300"
                          strokeWidth={3}
                        />
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Tile */}
                  <motion.div
                    className={`relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl overflow-hidden border ${
                      isCompound
                        ? 'border-purple-400/40'
                        : 'border-white/30'
                    }`}
                    style={{
                      background: isCompound
                        ? 'linear-gradient(140deg, rgba(168,85,247,0.45) 0%, rgba(217,70,239,0.35) 50%, rgba(236,72,153,0.30) 100%)'
                        : undefined,
                      boxShadow: isCompound
                        ? '0 12px 28px -10px rgba(168,85,247,0.55), 0 4px 10px -2px rgba(168,85,247,0.35)'
                        : '0 12px 28px -10px rgba(255,255,255,0.18), 0 4px 10px -2px rgba(255,255,255,0.10)',
                    }}
                    animate={
                      reacting
                        ? {
                            y: [0, -10, 0],
                            scale: [1, 1.05, 1],
                          }
                        : {}
                    }
                    transition={
                      reacting
                        ? {
                            duration: 1.2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.15,
                          }
                        : {}
                    }
                    whileHover={!reacting ? { y: -6, scale: 1.05 } : {}}
                  >
                    {/* Element category background (if element) */}
                    {!isCompound && (
                      <div
                        className={`absolute inset-0 ${
                          catColor[(reactant as Element).cat]
                        }`}
                      />
                    )}

                    {/* Specular gradient highlight */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(140deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.12) 22%, rgba(255,255,255,0) 50%)',
                      }}
                    />

                    {/* Subtle radial center glow */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(circle at 50% 60%, rgba(255,255,255,0.18) 0%, transparent 55%)',
                      }}
                    />

                    {/* Bottom inner shadow for depth */}
                    <div
                      className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl"
                      style={{
                        boxShadow:
                          'inset 0 -10px 20px rgba(0,0,0,0.32), inset 0 0 20px rgba(255,255,255,0.05)',
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-1.5">
                      <span
                        className="text-2xl sm:text-4xl font-black text-white leading-none"
                        style={{
                          textShadow:
                            '0 2px 6px rgba(0,0,0,0.45), 0 0 12px rgba(255,255,255,0.15)',
                        }}
                      >
                        {formula}
                      </span>
                      <span
                        className="text-[0.65rem] sm:text-xs text-white/85 mt-1.5 font-semibold max-w-full truncate"
                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                      >
                        {displayName}
                      </span>
                    </div>

                    {/* Refined remove (X) button */}
                    <motion.button
                      onClick={() =>
                        isCompound
                          ? onRemoveCompound(reactant.formula)
                          : onRemoveElement((reactant as Element).sym)
                      }
                      className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center backdrop-blur-md border border-white/25 bg-black/40 text-white/80 hover:bg-red-500 hover:border-red-400 hover:text-white transition-colors duration-200 z-20"
                      whileHover={{ rotate: 90, scale: 1.15 }}
                      whileTap={{ scale: 0.85 }}
                      aria-label="Remove"
                      style={{
                        boxShadow:
                          '0 2px 8px rgba(0,0,0,0.4), inset 0 0 4px rgba(255,255,255,0.1)',
                      }}
                    >
                      <X
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                        strokeWidth={2.8}
                      />
                    </motion.button>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty state */}
          {allReactants.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="flex flex-col items-center gap-3 py-4"
            >
              <motion.div
                animate={{ rotate: [0, -8, 8, 0], y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <Beaker className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400/50" />
                <span className="absolute inset-0 blur-xl bg-cyan-400/20 rounded-full" />
              </motion.div>
              <p className="text-sm sm:text-base text-cyan-300/70 text-center max-w-xs font-medium">
                {t('chemistry.reaction_chamber.empty_state')}
              </p>
            </motion.div>
          )}
        </div>

        {/* React button */}
        {allReactants.length >= 2 && (
          <motion.div
            className="flex justify-center mt-7 sm:mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={onReact}
              disabled={reacting}
              className="relative flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white font-bold text-sm sm:text-base shadow-2xl shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-shadow duration-300 hover:shadow-cyan-500/60 border border-cyan-300/30 overflow-hidden"
              whileHover={!reacting ? { scale: 1.06, y: -3 } : {}}
              whileTap={!reacting ? { scale: 0.94 } : {}}
            >
              {/* Shimmer */}
              {!reacting && (
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)',
                  }}
                  animate={{ x: ['-100%', '120%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}

              {!reacting ? (
                <>
                  <Zap className="relative z-10 w-5 h-5" />
                  <span className="relative z-10">
                    {t('chemistry.reaction_chamber.button')}
                  </span>
                </>
              ) : (
                <>
                  <motion.div
                    className="relative z-10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  <span className="relative z-10">Reacting...</span>
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

import { History, FlaskConical } from 'lucide-react';
import { type Reaction } from '@/data/reactions';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ReactionHistory = ({ history, onSelect }: { history: Reaction[]; onSelect: (r: Reaction) => void }) => {
  const { t } = useTranslation();
  if (history.length === 0) return null;

  return (
    <motion.div 
      className="relative overflow-hidden rounded-3xl border border-purple-500/20 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-purple-500/5" />
      <motion.div 
        className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-l from-purple-500/10 to-transparent rounded-full blur-3xl" 
        animate={{ scale: [1, 1.15, 1] }} 
        transition={{ duration: 5, repeat: Infinity }} 
      />

      <div className="relative z-10 p-5 sm:p-6 md:p-7">
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
          <motion.div 
            className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/20 border border-purple-500/40 shadow-lg shadow-purple-500/20"
            whileHover={{ scale: 1.05 }}
          >
            <History className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
          </motion.div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              {t('chemistry.reaction_history.title')}
            </h3>
            <p className="text-xs sm:text-sm text-purple-300/60 mt-1">
              {history.length} {history.length !== 1 ? t('chemistry.reaction_history.reaction_count_plural') : t('chemistry.reaction_history.reaction_count_singular')}
            </p>
          </div>
        </div>

        {/* History Items */}
        <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar pr-1">
          {history.map((r, i) => (
            <motion.button 
              key={`${r.id}-${i}`} 
              onClick={() => onSelect(r)}
              className="w-full flex items-start gap-3 text-left bg-gradient-to-r from-purple-500/15 to-pink-500/10 hover:from-purple-500/25 hover:to-pink-500/20 rounded-xl sm:rounded-2xl px-3.5 sm:px-4 py-3 sm:py-4 transition-all duration-300 border border-purple-500/25 hover:border-purple-500/50 group shadow-md hover:shadow-lg hover:shadow-purple-500/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.3) }}
              whileHover={{ x: 6, scale: 1.01 }}
            >
              <motion.div
                className="p-2 rounded-lg bg-purple-500/30 border border-purple-500/40 flex-shrink-0 mt-0.5"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-mono font-bold truncate text-purple-200 leading-tight">
                  {r.balanced}
                </p>
                <p className="text-[0.65rem] text-purple-300/60 capitalize mt-1">
                  {t(`chemistry.reaction_types.${r.type}`)}
                </p>
              </div>
              <motion.div 
                className="flex-shrink-0 text-purple-400/60 group-hover:text-purple-300 transition-colors ml-2"
                whileHover={{ x: 4 }}
              >
                →
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ReactionHistory;

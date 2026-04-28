import { elements, ptGrid, catColor, type Element } from '@/data/elements';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface Props {
  onElementClick: (el: Element) => void;
  selected: string[];
}

const PeriodicTable = ({ onElementClick, selected }: Props) => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState<number | null>(null);
  
  const elMap = useMemo(() => {
    const m = new Map<number, Element>();
    elements.forEach(e => m.set(e.z, e));
    return m;
  }, []);

  return (
    <div className="w-full" dir="ltr">
      <div className="w-full text-left">
      {/* Table Grid */}
      <div className="w-full overflow-x-auto custom-scrollbar pb-2">
        <div className="w-full">
          {ptGrid.map((row, ri) => {
            // Skip empty gap row
            if (ri === 7) return <div key={ri} className="h-4 sm:h-5 md:h-6" />;
            
            return (
              <motion.div 
                key={ri} 
                className="grid periodic-table-row gap-0.5 sm:gap-1 md:gap-1.5 mb-0.5 sm:mb-1 md:mb-1.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ri * 0.02 }}
              >
                {row.map((z, ci) => {
                  if (z === null) return <div key={ci} />;
                  const el = elMap.get(z);
                  if (!el) return <div key={ci} />;
                  const isSel = selected.includes(el.sym);
                  const isHov = hovered === z;

                  return (
                    <motion.button
                      key={ci}
                      onClick={() => onElementClick(el)}
                      onMouseEnter={() => setHovered(z)}
                      onMouseLeave={() => setHovered(null)}
                      className={`elem-cell transition-all duration-200 relative group ${catColor[el.cat]} ${
                        isSel 
                          ? 'ring-2 ring-cyan-400 scale-110 shadow-lg shadow-cyan-500/50 z-20 border-2 border-cyan-300' 
                          : isHov 
                          ? 'scale-105 shadow-lg shadow-white/30 z-10 border-2 border-white/40'
                          : 'shadow-md border border-white/20'
                      } hover:brightness-125 rounded-md sm:rounded-lg`}
                      title={`${el.name} (${el.sym}) - ${el.mass}`}
                      whileHover={!isSel ? { scale: 1.12, y: -2 } : {}}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: ri * 0.02 + ci * 0.01 }}
                    >
                      <div className="flex flex-col items-center justify-center h-full w-full p-0.5 sm:p-1">
                        <span className="text-[0.4rem] sm:text-[0.5rem] md:text-[0.65rem] opacity-60 font-mono leading-none">{el.z}</span>
                        <span className="text-[0.55rem] sm:text-[0.7rem] md:text-[0.9rem] font-bold leading-none">{el.sym}</span>
                        <span className="text-[0.3rem] sm:text-[0.4rem] md:text-[0.5rem] opacity-50 leading-none">{el.mass.toFixed(1)}</span>
                      </div>

                      {/* Tooltip on hover */}
                      <motion.div 
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1.5 bg-black/95 backdrop-blur text-white text-[0.65rem] sm:text-xs rounded-lg whitespace-nowrap z-50 pointer-events-none border border-white/20 shadow-xl hidden group-hover:block"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        {el.name}
                      </motion.div>
                    </motion.button>
                  );
                })}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <motion.div 
        className="flex flex-wrap gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-2 mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 border-t border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-[0.65rem] sm:text-xs md:text-sm text-cyan-300/70 w-full font-bold uppercase tracking-wide">{t('periodic.categories')}:</span>
        <div className="w-full flex flex-wrap gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-1.5">
          {(Object.entries(catColor) as [string, string][]).map(([cat, cls]) => (
            <motion.div 
              key={cat} 
              className="flex items-center gap-1.5"
              whileHover={{ scale: 1.08 }}
            >
              <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-md ${cls} border border-white/30 hover:border-white/60 shadow-md transition-all`} />
              <span className="text-[0.65rem] sm:text-xs text-cyan-300/80 font-medium">{t(`elements.categories.${cat}`)}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default PeriodicTable;

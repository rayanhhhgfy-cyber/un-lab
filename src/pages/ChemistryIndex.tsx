// when adding a library
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Atom, FlaskConical, Calculator, Home, ArrowRightLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PeriodicTable from '@/components/PeriodicTable';
import CompoundSelector from '@/components/CompoundSelector';
import ReactionChamber from '@/components/ReactionChamber';
import ReactionVisualizer from '@/components/ReactionVisualizer';
import ReactionResult from '@/components/ReactionResult';
import ReactionHistory from '@/components/ReactionHistory';
import ElementInfoPanel from '@/components/ElementInfoPanel';
import ChemCalculators from '@/components/ChemCalculators';
import { type Element } from '@/data/elements';
import { findReaction, type Reaction } from '@/data/reactions';

const ChemistryIndex = () => {
  const { t } = useTranslation();
  const [selectedElements, setSelectedElements] = useState<Element[]>([]);
  const [selectedCompounds, setSelectedCompounds] = useState<string[]>([]);
  const [info, setInfo] = useState<Element | null>(null);
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [reacting, setReacting] = useState(false);
  const [history, setHistory] = useState<Reaction[]>([]);
  const [noMatch, setNoMatch] = useState(false);
  const [tab, setTab] = useState<'sim' | 'calc'>('sim');

  const handleElementClick = useCallback((el: Element) => {
    setInfo(el);
    setSelectedElements(prev => {
      if (prev.find(e => e.sym === el.sym)) return prev.filter(e => e.sym !== el.sym);
      if (prev.length >= 2) return prev;
      return [...prev, el];
    });
    setNoMatch(false);
    setReaction(null);
  }, []);

  const handleCompoundClick = useCallback((formula: string) => {
    setSelectedCompounds(prev => {
      if (prev.includes(formula)) return prev.filter(f => f !== formula);
      if (prev.length >= 2) return prev;
      return [...prev, formula];
    });
    setNoMatch(false);
    setReaction(null);
  }, []);

  const handleReact = useCallback(() => {
    const reactants = [...selectedElements.map(e => e.sym), ...selectedCompounds];
    setReaction(null);
    setNoMatch(false);
    const r = findReaction(reactants);
    if (!r) {
      setNoMatch(true);
      return;
    }

    setReacting(true);
    setReaction(r);
    // Delay adding to history to match the animation timer
    setTimeout(() => {
      setReacting(false);
      setHistory(p => [r, ...p.slice(0, 29)]);
    }, 4000);
  }, [selectedElements, selectedCompounds]);

  return (
    <div className="min-h-screen bg-black w-full overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[180px]"
          animate={{ scale: [1, 1.2, 1], y: [0, 50, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[180px]"
          animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[200px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* Header */}
      <header className="border-b border-white/[0.06] backdrop-blur-xl sticky top-0 z-40 bg-black/85 w-full">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/"
                className="flex-shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-slate-400 hover:text-cyan-300 transition-colors hover:bg-cyan-500/10 border border-white/[0.06]"
                title="Back to home"
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </motion.div>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <motion.div
                className="relative p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 shadow-lg shadow-cyan-500/40 flex-shrink-0"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Atom className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                <span className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-600 opacity-40 blur-md -z-10" />
              </motion.div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent truncate leading-tight">
                  {t('chemistry.page_title')}
                </h1>
                <p className="text-[10px] sm:text-xs text-slate-500 truncate hidden sm:block">{t('chemistry.page_description')}</p>
              </div>
            </div>
          </div>

          <motion.div
            className="flex-shrink-0 flex items-center gap-1 sm:gap-1.5 bg-white/[0.03] rounded-full p-1 sm:p-1.5 border border-white/[0.06]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={() => setTab('sim')}
              className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full font-bold text-[11px] sm:text-xs transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 ${tab === 'sim'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
                }`}
              whileHover={tab === 'sim' ? {} : { scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FlaskConical className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t('index.tabs.simulator')}</span>
            </motion.button>
            <motion.button
              onClick={() => setTab('calc')}
              className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full font-bold text-[11px] sm:text-xs transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 ${tab === 'calc'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/40'
                  : 'text-slate-400 hover:text-white'
                }`}
              whileHover={tab === 'calc' ? {} : { scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t('index.tabs.calculator')}</span>
            </motion.button>
          </motion.div>
        </div>
      </header>

      <main className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 space-y-6 sm:space-y-8 md:space-y-10 relative z-10">
        {tab === 'sim' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 sm:space-y-8 md:space-y-10"
          >
            {/* Periodic Table Section */}
            <motion.section
              className="relative overflow-hidden rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.04] to-blue-500/[0.03]" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 md:mb-8">
                  <motion.div
                    className="relative p-2.5 sm:p-3 md:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 shadow-lg shadow-cyan-500/40"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Atom className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                    <span className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-600 opacity-40 blur-md -z-10" />
                  </motion.div>
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent leading-tight">
                      {t('index.sections.periodic_table')}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">{t('index.sections.periodic_table_description')}</p>
                  </div>
                </div>

                <div className="w-full overflow-x-auto custom-scrollbar relative">
                  {/* Mobile Scroll Hint */}
                  <motion.div
                    className="lg:hidden flex items-center justify-center gap-2 mb-3 p-2.5 bg-cyan-500/20 rounded-lg text-cyan-300/80 text-[10px] uppercase tracking-widest font-bold border border-cyan-500/30 shadow-md"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5 flex-shrink-0" /> Swipe to View All Elements
                  </motion.div>
                  <div className="min-w-[800px] lg:min-w-0">
                    <PeriodicTable onElementClick={handleElementClick} selected={selectedElements.map(e => e.sym)} />
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Compound Selector Section */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
            >
              <CompoundSelector
                onCompoundClick={handleCompoundClick}
                selected={selectedCompounds}
                maxSelection={2}
              />
            </motion.div>

            {/* Main Content Grid */}
            <motion.div
              className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Left Column - Reaction Area */}
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <ReactionChamber
                    elements={selectedElements}
                    compounds={selectedCompounds}
                    onRemoveElement={sym => { setSelectedElements(p => p.filter(e => e.sym !== sym)); setNoMatch(false); setReaction(null); }}
                    onRemoveCompound={formula => { setSelectedCompounds(p => p.filter(f => f !== formula)); setNoMatch(false); setReaction(null); }}
                    onReact={handleReact}
                    reacting={reacting}
                  />
                </motion.div>

                {noMatch && (
                  <motion.div
                    className="text-center py-8 sm:py-12 rounded-3xl border-2 border-dashed border-orange-500/40 bg-gradient-to-br from-orange-500/15 to-red-500/10 shadow-lg shadow-orange-500/10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                      <FlaskConical className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-orange-400/70" />
                    </motion.div>
                    <p className="text-sm sm:text-base font-semibold text-orange-300/80 mb-2">{t('chemistry.no_reaction.message')}</p>
                    <p className="text-xs text-orange-300/60">{t('chemistry.no_reaction.suggestion')}</p>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <ReactionVisualizer reaction={reaction} reacting={reacting} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <ReactionResult reaction={reacting ? null : reaction} />
                </motion.div>
              </div>

              {/* Right Column - Info & History */}
              <motion.div
                className="space-y-6 md:space-y-8"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <ElementInfoPanel element={info} onClose={() => setInfo(null)} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <ReactionHistory history={history} onSelect={r => { setReaction(r); setReacting(false); }} />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="relative overflow-hidden rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.04] to-pink-500/[0.03]" />
            <div className="relative z-10">
              <ChemCalculators />
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default ChemistryIndex;

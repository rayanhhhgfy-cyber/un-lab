import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Beaker, Search, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { preAddedCompounds } from '@/data/reactions';

interface Props {
  onCompoundClick: (formula: string) => void;
  selected: string[];
  maxSelection?: number;
}

const CompoundSelector = ({ onCompoundClick, selected, maxSelection = 2 }: Props) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Group compounds by category
  const categories = {
    'all': t('compound.categories.all'),
    'acids': t('compound.categories.acids'),
    'bases': t('compound.categories.bases'),
    'salts': t('compound.categories.salts'),
    'oxides': t('compound.categories.oxides'),
    'organic': t('compound.categories.organic'),
    'gases': t('compound.categories.gases'),
    'metals': t('compound.categories.metals'),
    'halides': t('compound.categories.halides'),
    'carbonates': t('compound.categories.carbonates'),
    'sulfates': t('compound.categories.sulfates'),
    'nitrates': t('compound.categories.nitrates'),
    'hydroxides': t('compound.categories.hydroxides'),
    'peroxides': t('compound.categories.peroxides'),
    'complexes': t('compound.categories.complexes')
  };

  // Common synonyms for better search including Arabic
  const synonyms: Record<string, string[]> = {
    'salt': ['NaCl', 'KCl', 'CaCl2'],
    'ملح': ['NaCl'],
    'ماء': ['H2O'],
    'ميه': ['H2O'],
    'soda': ['NaOH', 'Na2CO3'],
    'صودا': ['NaOH', 'Na2CO3'],
    'ammonia': ['NH3'],
    'امونيا': ['NH3'],
    'methane': ['CH4'],
    'ميثان': ['CH4'],
    'ethanol': ['C2H5OH', 'CH3CH2OH'],
    'كحول': ['C2H5OH'],
    'sugar': ['C6H12O6'],
    'سكر': ['C6H12O6', 'C12H22O11'],
    'bleach': ['NaClO'],
    'مبيض': ['NaClO'],
    'كلور': ['Cl2', 'NaClO'],
    'rust': ['Fe2O3', 'Fe3O4'],
    'صدأ': ['Fe2O3'],
    'limestone': ['CaCO3'],
    'chalk': ['CaCO3'],
    'طبشور': ['CaCO3'],
    'plaster': ['CaSO4'],
    'sulfuric': ['H2SO4'],
    'كبريتيك': ['H2SO4'],
    'hydrochloric': ['HCl'],
    'هيدروكلوريك': ['HCl'],
    'nitric': ['HNO3'],
    'نيتريك': ['HNO3'],
    'acetic': ['CH3COOH'],
    'vinegar': ['CH3COOH'],
    'خل': ['CH3COOH'],
    'baking': ['NaHCO3'],
    'hydrogen': ['H2'],
    'هيدروجين': ['H2'],
    'oxygen': ['O2'],
    'اكسجين': ['O2'],
    'أكسجين': ['O2'],
    'nitrogen': ['N2'],
    'نيتروجين': ['N2'],
    'حمض': ['HCl', 'H2SO4', 'HNO3', 'CH3COOH'],
    'قاعدة': ['NaOH', 'KOH', 'NH3'],
  };

  const getCategory = (formula: string, name: string): string => {
    const nameLower = name.toLowerCase();
    const formulaLower = formula.toLowerCase();

    // Check for specific categories with proper precedence
    if (nameLower.includes('peroxide')) return 'peroxides';
    if (nameLower.includes('carbonate')) return 'carbonates';
    if (nameLower.includes('sulfate')) return 'sulfates';
    if (nameLower.includes('nitrate')) return 'nitrates';
    if (nameLower.includes('hydroxide')) return 'hydroxides';
    if (nameLower.includes('chloride') || nameLower.includes('bromide') || nameLower.includes('iodide') || nameLower.includes('fluoride')) return 'halides';
    
    // Complex ions check
    if (formula.includes('[') && formula.includes(']')) return 'complexes';
    
    // Acids - check for H at start and common acid patterns
    if ((formula.startsWith('H') || formulaLower.startsWith('h')) && 
        (formula.includes('O') || formula.includes('Cl') || formula.includes('F') || 
         formula.includes('Br') || formula.includes('S') || formula.includes('N')) &&
        !formula.includes('OH')) {
      return 'acids';
    }
    
    // Bases - metal hydroxides
    if (nameLower.includes('hydroxide')) return 'bases';
    
    // Oxides
    if (nameLower.includes('oxide')) return 'oxides';
    
    // Organic compounds
    if (formula.includes('C') && formula.includes('H') && !formulaLower.startsWith('co')) {
      if (!formula.includes('Ca') && !formula.includes('Cu') && !formula.includes('Cd')) {
        return 'organic';
      }
    }
    
    // Common gases
    const commonGases = ['H2', 'O2', 'N2', 'Cl2', 'F2', 'Br2', 'CO', 'CO2', 'NO', 'NO2', 'N2O', 'SO2', 'SO3', 'H2S', 'NH3', 'CH4', 'C2H6', 'C3H8'];
    if (commonGases.includes(formula) || nameLower.includes('gas')) return 'gases';
    
    // Pure metals
    const pureMetals = ['Na', 'K', 'Ca', 'Mg', 'Al', 'Fe', 'Cu', 'Zn', 'Ag', 'Au', 'Pt', 'Li', 'Be'];
    if (pureMetals.includes(formula)) return 'metals';
    
    // Default to salts
    return 'salts';
  };

  // Calculate search relevance score (higher = better match)
  const calculateRelevance = (compound: any, query: string): number => {
    if (!query.trim()) return 0;
    
    const queryLower = query.toLowerCase().trim();
    const nameLower = compound.name.toLowerCase();
    const formulaLower = compound.formula.toLowerCase();
    let score = 0;

    // 1. Exact match (Highest Priority)
    if (formulaLower === queryLower) score += 10000;
    else if (nameLower === queryLower) score += 10000;

    // 2. Starts with (High Priority)
    else if (formulaLower.startsWith(queryLower)) score += 1000;
    else if (nameLower.startsWith(queryLower)) score += 1000;

    // 3. Substring match (Low Priority)
    else {
      if (formulaLower.includes(queryLower)) score += 100;
      if (nameLower.includes(queryLower)) score += 100;
    }

    // 4. Word by word matching (for partial searches like "sod chlo")
    const queryWords = queryLower.split(/\s+/);
    let allWordsMatch = true;
    queryWords.forEach(word => {
      if (word.length < 2) return; // Skip single letters to reduce noise
      if (formulaLower.includes(word)) {
        score += 50;
      } else if (nameLower.includes(word)) {
        score += 40;
      } else {
        allWordsMatch = false;
      }
    });

    // Bonus if ALL typed words match something in the name (e.g. "so chl" -> "sodium chloride")
    if (allWordsMatch && queryWords.length > 1) {
      score += 400;
    }

    // 5. Arabic / English Synonyms (Smart Alias Matching)
    const allSynonyms = Object.entries(synonyms);
    for (const [syn, formulas] of allSynonyms) {
      if (queryLower.includes(syn) || syn.includes(queryLower)) {
        if (formulas.includes(compound.formula)) {
          // If they typed the synonym exactly, give a huge boost
          if (queryLower === syn) score += 10000;
          else score += 1000;
        }
      }
    }

    return score;
  };

  // Filter and sort compounds
  let processedItems = preAddedCompounds
    .map(compound => ({
      compound,
      category: getCategory(compound.formula, compound.name),
      relevance: calculateRelevance(compound, searchTerm)
    }))
    .filter((item, index, self) => 
      // Deduplicate by formula to prevent React duplicate key warnings
      index === self.findIndex((t) => t.compound.formula === item.compound.formula)
    )
    .filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = searchTerm.trim() === '' || item.relevance > 0;
      return matchesSearch && matchesCategory;
    });

  // STRICT FILTERING: If there is an exact match, hide all weak partial matches
  if (searchTerm.trim() !== '') {
    const maxScore = Math.max(...processedItems.map(i => i.relevance), 0);
    if (maxScore >= 10000) {
      // Exact match found! Only show exact matches.
      processedItems = processedItems.filter(i => i.relevance >= 10000);
    } else if (maxScore >= 1000) {
      // Strong start-with match found. Hide weak substring matches.
      processedItems = processedItems.filter(i => i.relevance >= 1000);
    }
  }

  const filteredCompounds = processedItems
    .sort((a, b) => b.relevance - a.relevance)
    .map(item => item.compound);

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-6 lg:p-8 border border-cyan-500/10">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="p-2.5 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
          <Beaker className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white">{t('chemistry.compound_library.title')}</h2>
          <p className="text-xs sm:text-sm text-purple-300/60">{t('chemistry.compound_library.description')}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/60" />
          <input
            type="text"
            placeholder={t('chemistry.compound_library.search_placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 bg-black/40 border border-cyan-500/30 rounded-lg text-white placeholder-cyan-400/60 focus:border-cyan-400 focus:outline-none transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400/60 hover:text-cyan-400 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 bg-black/40 border border-cyan-500/30 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
        >
          {Object.entries(categories).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        {filteredCompounds.length > 0 && (
          <div className="px-3 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg text-sm text-purple-300 font-medium">
            {filteredCompounds.length} {filteredCompounds.length === 1 ? 'result' : 'results'}
          </div>
        )}
      </div>

      {/* Selected Compounds */}
      {selected.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <h3 className="text-sm font-semibold text-white mb-2">{t('chemistry.compound_library.selected_label')}</h3>
          <div className="flex flex-wrap gap-2">
            {selected.map(formula => {
              const compound = preAddedCompounds.find(c => c.formula === formula);
              return (
                <div key={formula} className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg px-3 py-1">
                  <span className="text-sm font-medium text-white">{compound?.formula}</span>
                  <button
                    onClick={() => onCompoundClick(formula)}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Compound Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-h-96 overflow-y-auto">
        {filteredCompounds.map((compound) => {
          const isSelected = selected.includes(compound.formula);
          const canSelect = !isSelected && selected.length < maxSelection;

          return (
            <button
              key={compound.formula}
              onClick={() => canSelect && onCompoundClick(compound.formula)}
              disabled={!canSelect && !isSelected}
              className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-400 shadow-lg shadow-purple-500/20'
                  : canSelect
                    ? 'bg-black/40 border-cyan-500/30 hover:border-purple-400 hover:bg-purple-500/10'
                    : 'bg-black/20 border-gray-600/30 cursor-not-allowed opacity-50'
              }`}
            >
              <div className="text-sm font-bold text-white mb-1">{compound.formula}</div>
              <div className="text-xs text-cyan-300/70 line-clamp-2">{compound.name}</div>
            </button>
          );
        })}
      </div>

      {filteredCompounds.length === 0 && (
        <div className="text-center py-8 text-cyan-400/60">
          {t('chemistry.compound_library.no_match')}
        </div>
      )}
    </div>
  );
};

export default CompoundSelector;
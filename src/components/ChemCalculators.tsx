import { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator, Beaker, Flame, Thermometer, Droplets, Zap, FlaskConical, Atom, Scale, TestTubes, Activity, Gauge, CheckCircle2, AlertCircle, Info, Copy, RefreshCw, Search, ChevronDown } from 'lucide-react';
import * as calc from '@/data/chemCalc';

type CalcId = 'ph' | 'molarity' | 'moles' | 'dilution' | 'gas' | 'gibbs' | 'keq' | 'nernst' | 'arrhenius' | 'bpe' | 'fpd' | 'osmotic' | 'hh' | 'molality' | 'pcomp' | 'activity' | 'bonds' | 'potentials' | 'solubility' | 'polyatomic';

const calcs: { id: CalcId; nameKey: string; icon: React.ReactNode; descKey: string }[] = [
  { id: 'molarity', nameKey: 'calc.molarity.name', icon: <Beaker className="w-4 h-4" />, descKey: 'calc.molarity.desc' },
  { id: 'moles', nameKey: 'calc.moles.name', icon: <Scale className="w-4 h-4" />, descKey: 'calc.moles.desc' },
  { id: 'pcomp', nameKey: 'calc.pcomp.name', icon: <Atom className="w-4 h-4" />, descKey: 'calc.pcomp.desc' },
  { id: 'ph', nameKey: 'calc.ph.name', icon: <Droplets className="w-4 h-4" />, descKey: 'calc.ph.desc' },
  { id: 'dilution', nameKey: 'calc.dilution.name', icon: <TestTubes className="w-4 h-4" />, descKey: 'calc.dilution.desc' },
  { id: 'gas', nameKey: 'calc.gas.name', icon: <Gauge className="w-4 h-4" />, descKey: 'calc.gas.desc' },
  { id: 'gibbs', nameKey: 'calc.gibbs.name', icon: <Flame className="w-4 h-4" />, descKey: 'calc.gibbs.desc' },
  { id: 'keq', nameKey: 'calc.keq.name', icon: <Activity className="w-4 h-4" />, descKey: 'calc.keq.desc' },
  { id: 'nernst', nameKey: 'calc.nernst.name', icon: <Zap className="w-4 h-4" />, descKey: 'calc.nernst.desc' },
  { id: 'arrhenius', nameKey: 'calc.arrhenius.name', icon: <Thermometer className="w-4 h-4" />, descKey: 'calc.arrhenius.desc' },
  { id: 'bpe', nameKey: 'calc.bpe.name', icon: <Thermometer className="w-4 h-4" />, descKey: 'calc.bpe.desc' },
  { id: 'fpd', nameKey: 'calc.fpd.name', icon: <Thermometer className="w-4 h-4" />, descKey: 'calc.fpd.desc' },
  { id: 'osmotic', nameKey: 'calc.osmotic.name', icon: <Gauge className="w-4 h-4" />, descKey: 'calc.osmotic.desc' },
  { id: 'hh', nameKey: 'calc.hh.name', icon: <FlaskConical className="w-4 h-4" />, descKey: 'calc.hh.desc' },
  { id: 'molality', nameKey: 'calc.molality.name', icon: <Beaker className="w-4 h-4" />, descKey: 'calc.molality.desc' },
  { id: 'bonds', nameKey: 'calc.bonds.name', icon: <Zap className="w-4 h-4" />, descKey: 'calc.bonds.desc' },
  { id: 'potentials', nameKey: 'calc.potentials.name', icon: <Zap className="w-4 h-4" />, descKey: 'calc.potentials.desc' },
  { id: 'solubility', nameKey: 'calc.solubility.name', icon: <Droplets className="w-4 h-4" />, descKey: 'calc.solubility.desc' },
  { id: 'polyatomic', nameKey: 'calc.polyatomic.name', icon: <Atom className="w-4 h-4" />, descKey: 'calc.polyatomic.desc' },
  { id: 'activity', nameKey: 'calc.activity.name', icon: <Scale className="w-4 h-4" />, descKey: 'calc.activity.desc' },
];

const ExplanationBanner = ({ title, desc }: { title: string; desc: string }) => (
  <div className="relative overflow-hidden bg-gradient-to-r from-blue-900/40 to-cyan-900/20 border border-cyan-500/30 rounded-2xl p-5 mb-8 flex gap-4 shadow-[0_0_30px_rgba(34,211,238,0.1)] backdrop-blur-xl group hover:border-cyan-400/50 transition-colors duration-500">
    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
    <div className="p-2 bg-cyan-500/10 rounded-xl h-fit border border-cyan-500/20 group-hover:scale-110 transition-transform duration-500 shadow-inner">
      <Info className="w-6 h-6 text-cyan-400" />
    </div>
    <div>
      <div className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 tracking-wide">{title}</div>
      <div className="text-sm leading-relaxed text-cyan-100/70 mt-1.5 font-medium">{desc}</div>
    </div>
  </div>
);

type InputProps = {
  label: string; value: string; onChange: (v: string) => void;
  unit?: string; units?: string[]; activeUnit?: string; onUnitChange?: (u: string) => void;
  placeholder?: string;
};

const Input = ({ label, value, onChange, unit, units, activeUnit, onUnitChange, placeholder = '0' }: InputProps) => {
  const isInvalid = value !== '' && isNaN(Number(value));
  return (
    <div className="relative group flex flex-col gap-1.5">
      <label className="text-[0.65rem] font-bold text-cyan-400/80 uppercase tracking-widest ml-1">{label}</label>
      <div className="flex items-stretch gap-2 group-hover:-translate-y-0.5 transition-transform duration-300">
        <div className="relative flex-1 group/input">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-md opacity-0 group-hover/input:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
          <input
            type="number"
            value={value}
            onChange={e => onChange(e.target.value)}
            className={`w-full bg-black/60 backdrop-blur-xl border-2 rounded-xl px-4 py-3.5 text-sm font-mono font-medium outline-none transition-all duration-300 shadow-inner relative z-10 ${isInvalid ? 'border-red-500/50 text-red-300 focus:border-red-400 focus:shadow-[0_0_15px_rgba(248,113,113,0.3)]' : 'border-cyan-900/50 text-cyan-100 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:border-cyan-500/50'}`}
            placeholder={placeholder}
          />
        </div>
        {units && onUnitChange ? (
          <select
            value={activeUnit}
            onChange={e => onUnitChange(e.target.value)}
            className="bg-black/60 backdrop-blur-xl border-2 border-cyan-900/50 rounded-xl px-3 py-3.5 text-xs text-cyan-300 font-mono font-bold outline-none cursor-pointer hover:border-cyan-400 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 shadow-inner relative z-10"
          >
            {units.map(u => <option key={u} value={u} className="bg-black text-cyan-300">{u}</option>)}
          </select>
        ) : unit ? (
          <div className="flex items-center justify-center bg-black/60 backdrop-blur-xl border-2 border-cyan-900/50 rounded-xl px-4 py-3.5 min-w-[4rem] shadow-inner relative z-10">
            <span className="text-xs text-cyan-300/80 font-mono font-bold whitespace-nowrap">{unit}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const commonCompounds = [
  { name: 'Water', formula: 'H2O', category: 'Compounds' },
  { name: 'Table Salt', formula: 'NaCl', category: 'Compounds' },
  { name: 'Hydrochloric Acid', formula: 'HCl', category: 'Compounds' },
  { name: 'Sulfuric Acid', formula: 'H2SO4', category: 'Compounds' },
  { name: 'Sodium Hydroxide', formula: 'NaOH', category: 'Compounds' },
  { name: 'Ammonia', formula: 'NH3', category: 'Compounds' },
  { name: 'Carbon Dioxide', formula: 'CO2', category: 'Compounds' },
  { name: 'Methane', formula: 'CH4', category: 'Compounds' },
  { name: 'Glucose', formula: 'C6H12O6', category: 'Compounds' },
  { name: 'Ethanol', formula: 'C2H5OH', category: 'Compounds' },
  { name: 'Baking Soda', formula: 'NaHCO3', category: 'Compounds' },
  { name: 'Acetic Acid (Vinegar)', formula: 'CH3COOH', category: 'Compounds' },
  { name: 'Calcium Carbonate', formula: 'CaCO3', category: 'Compounds' },
  { name: 'Sodium Hypochlorite (Bleach)', formula: 'NaClO', category: 'Compounds' }
];

// Dynamically add common elements to the list
const dropdownOptions = [
  ...calc.elements.slice(0, 118).map(el => ({ name: el.name, formula: el.sym, category: 'Elements' })),
  ...commonCompounds
];

const FormulaInput = ({ label, value, onChange, placeholder = 'e.g. CuSO4(H2O)5' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mm = calc.calculateMolarMass(value);
  const isValid = mm > 0;
  const isNotEmpty = value.trim().length > 0;

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative group flex flex-col gap-1.5 z-30" ref={dropdownRef}>
      <label className="text-[0.65rem] font-bold text-cyan-400/80 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group/input group-hover:-translate-y-0.5 transition-transform duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-md opacity-0 group-hover/input:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
        <input
          type="text"
          value={value}
          onFocus={() => setIsOpen(true)}
          onChange={e => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          className={`w-full bg-black/60 backdrop-blur-xl border-2 rounded-xl pl-4 pr-10 py-3.5 text-sm font-mono font-medium outline-none transition-all duration-300 shadow-inner relative z-10 ${isNotEmpty && !isValid ? 'border-red-500/40 text-red-300 focus:border-red-400 focus:shadow-[0_0_15px_rgba(248,113,113,0.3)]' : isValid ? 'border-cyan-400/70 text-cyan-100 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] shadow-[0_0_15px_rgba(34,211,238,0.15)]' : 'border-cyan-900/50 text-cyan-100 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:border-cyan-500/50'}`}
          placeholder={placeholder}
        />

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-1 rounded-md hover:bg-cyan-900/50 text-cyan-500/70 hover:text-cyan-300 transition-colors"
        >
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isValid && !isOpen && (
          <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none bg-cyan-950/80 px-2 py-1 rounded-lg border border-cyan-500/40 backdrop-blur-md shadow-[0_0_10px_rgba(34,211,238,0.2)] z-20">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[0.65rem] font-mono text-cyan-300 font-bold">{mm.toFixed(2)}</span>
          </div>
        )}

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-black/80 backdrop-blur-2xl border border-cyan-500/30 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-h-[300px] overflow-y-auto chem-scroll py-2">
              {['Elements', 'Compounds'].map(cat => {
                const filtered = dropdownOptions.filter(c =>
                  c.category === cat &&
                  (c.name.toLowerCase().includes(value.toLowerCase()) || c.formula.toLowerCase().includes(value.toLowerCase()))
                ).slice(0, cat === 'Elements' && value === '' ? 20 : 50); // Limit elements if no search to avoid lag

                if (filtered.length === 0) return null;

                return (
                  <div key={cat}>
                    <div className="px-3 py-1.5 text-[0.65rem] font-bold text-cyan-500/50 uppercase tracking-widest bg-white/5 border-y border-white/5 my-1">{cat}</div>
                    {filtered.map(c => (
                      <button
                        key={c.formula + cat}
                        onClick={() => {
                          onChange(c.formula);
                          setIsOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-cyan-500/10 flex items-center justify-between group/btn border-l-2 border-transparent hover:border-cyan-400 transition-all"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-cyan-100 group-hover/btn:text-white">{c.name}</span>
                          {cat === 'Elements' && (
                            <span className="text-[0.6rem] text-cyan-500/50 font-mono">
                              Atomic Mass: {calc.elements.find(e => e.sym === c.formula)?.mass?.toFixed(2) || 'N/A'}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-900/40 px-2 py-0.5 rounded shadow-inner border border-cyan-500/20">{c.formula}</span>
                      </button>
                    ))}
                  </div>
                );
              })}
              {dropdownOptions.filter(c => c.name.toLowerCase().includes(value.toLowerCase()) || c.formula.toLowerCase().includes(value.toLowerCase())).length === 0 && (
                <div className="px-4 py-3 text-sm text-white/40 text-center italic">No matches found. You can still type any formula!</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Result = ({ label, value, highlight = false, subtext }: { label: string; value: string; highlight?: boolean; subtext?: string }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
  };
  return (
    <div className={`relative overflow-hidden rounded-2xl px-6 py-5 ${highlight ? 'bg-black/60 border-cyan-400/50 shadow-[0_0_40px_rgba(34,211,238,0.15)]' : 'bg-black/40 border-white/10 shadow-lg'} border backdrop-blur-2xl transition-all duration-500 hover:border-cyan-400 hover:shadow-[0_0_50px_rgba(34,211,238,0.3)] group hover:-translate-y-1 mt-4`}>
      {highlight && <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-600/10 opacity-50" />}
      {highlight && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />}

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <div className="text-[0.7rem] font-bold text-cyan-300/80 uppercase tracking-widest">{label}</div>
          <button onClick={copyToClipboard} className="text-cyan-400/50 hover:text-cyan-300 transition-colors opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 bg-cyan-900/40 p-1.5 rounded-md" title="Copy result">
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <div className={`text-2xl sm:text-3xl font-mono font-black ${highlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300' : 'text-cyan-100'} break-words tracking-tight`}>{value}</div>
        {subtext && <div className="mt-3 text-xs sm:text-sm text-cyan-100/70 font-medium leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">{subtext}</div>}
      </div>
    </div>
  );
};

// Converters
const massToG = (val: number, unit: string) => unit === 'mg' ? val / 1000 : unit === 'kg' ? val * 1000 : val;
const volToL = (val: number, unit: string) => unit === 'mL' ? val / 1000 : val;
const pressureToAtm = (val: number, unit: string) => unit === 'mmHg' ? val / 760 : unit === 'kPa' ? val / 101.325 : val;
const tempToK = (val: number, unit: string) => unit === '°C' ? val + 273.15 : val;

const MolarityCalc = () => {
  const [mode, setMode] = useState<'standard' | 'density' | 'element'>('standard');
  const [formula, setFormula] = useState('NaCl');
  const [molarity, setMolarity] = useState('');
  const [mass, setMass] = useState('58.44');
  const [massUnit, setMassUnit] = useState('g');
  const [vol, setVol] = useState('1');
  const [volUnit, setVolUnit] = useState('L');

  // Density Mode
  const [massPct, setMassPct] = useState('37');
  const [density, setDensity] = useState('1.19');

  const mm = calc.calculateMolarMass(formula) || 0;

  if (mode === 'density') {
    const m = mm > 0 ? calc.molarityFromDensity(Number(massPct) || 0, Number(density) || 0, mm) : 0;
    return (
      <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <ExplanationBanner title="Liquid Stock Solution" desc="Find the Molarity of a concentrated liquid (like Hydrochloric Acid) using its mass percentage and density off the bottle!" />
        <div className="flex gap-2 p-1 bg-black/40 rounded-lg w-fit">
          <button onClick={() => setMode('standard')} className="px-4 py-1.5 rounded-md text-xs font-bold transition-all text-muted-foreground hover:text-white">Standard Mode</button>
          <button onClick={() => setMode('density')} className="px-4 py-1.5 rounded-md text-xs font-bold transition-all bg-cyan-500/20 text-cyan-300 shadow-sm">Density Mode</button>
        </div>
        <FormulaInput label="Chemical Formula" value={formula} onChange={setFormula} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Mass Percentage (%)" value={massPct} onChange={setMassPct} unit="%" />
          <Input label="Density" value={density} onChange={setDensity} unit="g/mL" />
        </div>
        <div className="pt-2">
          <Result label="Molarity (M)" value={m.toFixed(5) + ' M (mol/L)'} highlight />
        </div>
      </div>
    );
  }

  // Standard Mode (Omni-directional)
  const actM = molarity === '' ? undefined : Number(molarity);
  const actMass = mass === '' ? undefined : massToG(Number(mass), massUnit);
  const actVol = vol === '' ? undefined : volToL(Number(vol), volUnit);

  const result = calc.molarityOmni(actM, actMass, mm > 0 ? mm : 1, actVol);
  const solvedMassInUnit = (result.mass || 0) * (massUnit === 'mg' ? 1000 : massUnit === 'kg' ? 0.001 : 1);
  const solvedVolInUnit = (result.volumeL || 0) * (volUnit === 'mL' ? 1000 : 1);

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ExplanationBanner
        title="Omni-Molarity Calculator"
        desc="Molarity measures the concentration of a solute in a solution (mol/L). 
        How to use: 1. Pick a mode (Standard for formulas, Element for pure substances). 
        2. Enter the chemical formula. 
        3. Provide any two values (Molarity, Mass, or Volume). 
        4. Leave the value you want to find EMPTY, and it will solve automatically!"
      />
      <div className="flex flex-wrap gap-2 p-1 bg-black/40 rounded-lg w-fit">
        <button onClick={() => setMode('standard')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'standard' ? 'bg-cyan-500/20 text-cyan-300 shadow-sm' : 'text-muted-foreground hover:text-white'}`}>Standard Mode</button>
        <button onClick={() => setMode('element')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'element' ? 'bg-cyan-500/20 text-cyan-300 shadow-sm' : 'text-muted-foreground hover:text-white'}`}>Element Mode</button>
        <button onClick={() => setMode('density')} className="px-4 py-1.5 rounded-md text-xs font-bold transition-all text-muted-foreground hover:text-white">Density Mode</button>
      </div>

      {mode === 'element' ? (
        <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-2xl p-4 space-y-3">
          <label className="text-[0.65rem] font-bold text-cyan-400/80 uppercase tracking-widest ml-1">Select Element</label>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-[160px] overflow-y-auto chem-scroll pr-2">
            {calc.elements.slice(0, 118).map(el => (
              <button
                key={el.sym}
                onClick={() => setFormula(el.sym)}
                className={`p-2 rounded-lg border flex flex-col items-center justify-center transition-all ${formula === el.sym ? 'bg-cyan-500 border-cyan-400 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-black/40 border-white/5 text-cyan-100/60 hover:border-cyan-500/40 hover:text-cyan-300'}`}
              >
                <span className="text-xs font-black">{el.sym}</span>
                <span className="text-[0.5rem] opacity-70 font-mono">{el.mass.toFixed(1)}</span>
              </button>
            ))}
          </div>
          <div className="text-center py-1">
            <span className="text-xs font-bold text-cyan-300 tracking-wider">Active: {calc.elements.find(e => e.sym === formula)?.name || formula} ({mm.toFixed(2)} g/mol)</span>
          </div>
        </div>
      ) : (
        <FormulaInput label="Chemical Formula" value={formula} onChange={setFormula} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Molarity (M)" value={molarity} onChange={setMolarity} unit="M" placeholder="Leave blank to solve" />
        <Input label="Mass of Solute" value={mass} onChange={setMass} units={['mg', 'g', 'kg']} activeUnit={massUnit} onUnitChange={setMassUnit} placeholder="Leave blank to solve" />
        <div className="md:col-span-2"><Input label="Final Volume of Liquid" value={vol} onChange={setVol} units={['mL', 'L']} activeUnit={volUnit} onUnitChange={setVolUnit} placeholder="Leave blank to solve" /></div>
      </div>
      <div className="pt-2 grid grid-cols-1 gap-3">
        {molarity === '' && <Result label="Solved Molarity" value={result.molarity.toFixed(5) + ' M'} highlight />}
        {mass === '' && <Result label="Solved Mass" value={solvedMassInUnit.toFixed(4) + ' ' + massUnit} highlight subtext={`Recipe: Weigh ${solvedMassInUnit.toFixed(4)}${massUnit} of ${formula}, add to flask, fill with water to ${vol}${volUnit}.`} />}
        {vol === '' && <Result label="Solved Volume" value={solvedVolInUnit.toFixed(4) + ' ' + volUnit} highlight subtext={`Recipe: Dissolve ${mass}${massUnit} of ${formula} in water until you reach ${solvedVolInUnit.toFixed(4)}${volUnit}.`} />}
        {molarity !== '' && mass !== '' && vol !== '' && <div className="text-sm text-cyan-300/60 p-4 border border-dashed border-white/10 rounded-xl">Clear one of the input fields to calculate it automatically.</div>}
      </div>
    </div>
  );
};

const MolesCalc = () => {
  const [mode, setMode] = useState<'standard' | 'element'>('standard');
  const [formula, setFormula] = useState('H2O');
  const [mass, setMass] = useState('18.015');
  const [massUnit, setMassUnit] = useState('g');
  const [moles, setMoles] = useState('');

  const mm = calc.calculateMolarMass(formula) || 1;
  const actMass = mass === '' ? undefined : massToG(Number(mass), massUnit);
  const actMoles = moles === '' ? undefined : Number(moles);

  const result = calc.molesOmni(actMoles, actMass, mm);
  const solvedMassInUnit = (result.mass || 0) * (massUnit === 'mg' ? 1000 : massUnit === 'kg' ? 0.001 : 1);

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ExplanationBanner
        title="Omni-Moles Calculator"
        desc="Moles represent the amount of substance based on Avogadro's number. 
        How to use: 1. Enter the chemical formula to determine molar mass. 
        2. Enter either the Sample Mass OR the Amount of Moles. 
        3. Leave the target field empty to calculate the relationship between weight and particle count."
      />
      <div className="flex gap-2 p-1 bg-black/40 rounded-lg w-fit">
        <button onClick={() => setMode('standard')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'standard' ? 'bg-cyan-500/20 text-cyan-300 shadow-sm' : 'text-muted-foreground hover:text-white'}`}>Standard Mode</button>
        <button onClick={() => setMode('element')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'element' ? 'bg-cyan-500/20 text-cyan-300 shadow-sm' : 'text-muted-foreground hover:text-white'}`}>Element Mode</button>
      </div>

      {mode === 'element' ? (
        <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-2xl p-4 space-y-3">
          <label className="text-[0.65rem] font-bold text-cyan-400/80 uppercase tracking-widest ml-1">Select Element</label>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-[160px] overflow-y-auto chem-scroll pr-2">
            {calc.elements.slice(0, 118).map(el => (
              <button
                key={el.sym}
                onClick={() => setFormula(el.sym)}
                className={`p-2 rounded-lg border flex flex-col items-center justify-center transition-all ${formula === el.sym ? 'bg-cyan-500 border-cyan-400 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-black/40 border-white/5 text-cyan-100/60 hover:border-cyan-500/40 hover:text-cyan-300'}`}
              >
                <span className="text-xs font-black">{el.sym}</span>
                <span className="text-[0.5rem] opacity-70 font-mono">{el.mass.toFixed(1)}</span>
              </button>
            ))}
          </div>
          <div className="text-center py-1">
            <span className="text-xs font-bold text-cyan-300 tracking-wider">Active: {calc.elements.find(e => e.sym === formula)?.name || formula} ({mm.toFixed(2)} g/mol)</span>
          </div>
        </div>
      ) : (
        <FormulaInput label="Chemical Formula" value={formula} onChange={setFormula} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Sample Mass" value={mass} onChange={setMass} units={['mg', 'g', 'kg']} activeUnit={massUnit} onUnitChange={setMassUnit} placeholder="Leave blank to solve" />
        <Input label="Amount of Particles (Moles)" value={moles} onChange={setMoles} unit="mol" placeholder="Leave blank to solve" />
      </div>
      <div className="pt-2 grid grid-cols-1 gap-3">
        {moles === '' && <Result label="Solved Moles" value={(result.moles || 0).toExponential(4) + ' mol'} highlight subtext={`Contains exactly ${((result.moles || 0) * 6.022e23).toExponential(3)} actual molecules/atoms!`} />}
        {mass === '' && <Result label="Solved Mass" value={solvedMassInUnit.toFixed(4) + ' ' + massUnit} highlight subtext={`To get ${moles} moles, weigh out this much mass.`} />}
        {moles !== '' && mass !== '' && <div className="text-sm text-cyan-300/60 p-4 border border-dashed border-white/10 rounded-xl">Clear one of the input fields to calculate it automatically.</div>}
      </div>
    </div>
  );
};

const DilutionCalc = () => {
  const [m1, setM1] = useState('1');
  const [v1, setV1] = useState('100');
  const [v1Unit, setV1Unit] = useState('mL');
  const [m2, setM2] = useState('');
  const [v2, setV2] = useState('1');
  const [v2Unit, setV2Unit] = useState('L');

  const actM1 = m1 === '' ? undefined : Number(m1);
  const actV1 = v1 === '' ? undefined : volToL(Number(v1), v1Unit);
  const actM2 = m2 === '' ? undefined : Number(m2);
  const actV2 = v2 === '' ? undefined : volToL(Number(v2), v2Unit);

  const result = calc.dilutionOmni(actM1, actV1, actM2, actV2);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ExplanationBanner
        title="Omni-Dilution Calculator (M₁V₁ = M₂V₂)"
        desc="Used to determine how to create a lower concentration solution from a concentrated stock. 
        How to use: 1. Enter the known concentrations (M) and volumes (V). 
        2. Leave exactly one field empty (e.g., V₁ to find how much stock solution is needed). 
        3. The calculator ensures the total number of moles remains constant."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Starting Conc. (M₁)" value={m1} onChange={setM1} unit="M" placeholder="Solve" />
        <Input label="Starting Vol. (V₁)" value={v1} onChange={setV1} units={['mL', 'L']} activeUnit={v1Unit} onUnitChange={setV1Unit} placeholder="Solve" />
        <div className="md:col-span-2 border-t border-white/5 my-2"></div>
        <Input label="Final Conc. (M₂)" value={m2} onChange={setM2} unit="M" placeholder="Solve" />
        <Input label="Final Vol. (V₂)" value={v2} onChange={setV2} units={['mL', 'L']} activeUnit={v2Unit} onUnitChange={setV2Unit} placeholder="Solve" />
      </div>
      <div className="pt-2 space-y-3">
        {m1 === '' && <Result label="Solved Starting Concentration" value={result.m1.toFixed(5) + ' M'} highlight />}
        {v1 === '' && <Result label="Solved Starting Volume" value={(v1Unit === 'mL' ? result.v1 * 1000 : result.v1).toFixed(4) + ' ' + v1Unit} highlight subtext={`Recipe: Take this much strong solution and add water until you reach ${v2}${v2Unit}.`} />}
        {m2 === '' && <Result label="Solved Final Concentration" value={result.m2.toFixed(5) + ' M'} highlight />}
        {v2 === '' && <Result label="Solved Final Volume" value={(v2Unit === 'mL' ? result.v2 * 1000 : result.v2).toFixed(4) + ' ' + v2Unit} highlight subtext={`Recipe: Take ${v1}${v1Unit} of strong solution, add water until you hit this total volume.`} />}
        {m1 !== '' && v1 !== '' && m2 !== '' && v2 !== '' && <div className="text-sm text-cyan-300/60 p-4 border border-dashed border-white/10 rounded-xl">Clear one of the input fields to calculate it automatically.</div>}
      </div>
    </div>
  );
};

const acidBasePresets = [
  { name: 'Hydrochloric Acid (HCl)', type: 'strong-acid' },
  { name: 'Sulfuric Acid (H2SO4)', type: 'strong-acid' },
  { name: 'Nitric Acid (HNO3)', type: 'strong-acid' },
  { name: 'Acetic Acid (Vinegar)', type: 'weak-acid', pK: '4.76' },
  { name: 'Citric Acid (Lemon)', type: 'weak-acid', pK: '3.13' },
  { name: 'Lactic Acid (Milk)', type: 'weak-acid', pK: '3.86' },
  { name: 'Formic Acid (Ant Sting)', type: 'weak-acid', pK: '3.75' },
  { name: 'Phosphoric Acid', type: 'weak-acid', pK: '2.15' },
  { name: 'Sodium Hydroxide (Lye)', type: 'strong-base' },
  { name: 'Potassium Hydroxide', type: 'strong-base' },
  { name: 'Ammonia (NH3)', type: 'weak-base', pK: '4.75' },
  { name: 'Methylamine', type: 'weak-base', pK: '3.36' },
  { name: 'Pyridine', type: 'weak-base', pK: '8.77' },
  { name: 'Aniline', type: 'weak-base', pK: '9.38' },
];

const AcidBaseInput = ({ value, onChange, onSelectPreset }: { value: string; onChange: (v: string) => void; onSelectPreset: (preset: any) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative group flex flex-col gap-1.5 z-30" ref={dropdownRef}>
      <label className="text-[0.65rem] font-bold text-cyan-400/80 uppercase tracking-widest ml-1">Compound (Optional Preset)</label>
      <div className="relative group/input group-hover:-translate-y-0.5 transition-transform duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-md opacity-0 group-hover/input:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
        <input
          type="text"
          value={value}
          onFocus={() => setIsOpen(true)}
          onChange={e => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          className="w-full bg-black/60 backdrop-blur-xl border-2 border-cyan-900/50 rounded-xl pl-4 pr-10 py-3.5 text-sm font-mono font-medium outline-none transition-all duration-300 shadow-inner relative z-10 text-cyan-100 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:border-cyan-500/50"
          placeholder="e.g. Click to search presets..."
        />

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-1 rounded-md hover:bg-cyan-900/50 text-cyan-500/70 hover:text-cyan-300 transition-colors"
        >
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-black/80 backdrop-blur-2xl border border-cyan-500/30 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-h-[250px] overflow-y-auto chem-scroll py-2">
              <div className="px-3 py-1.5 text-[0.65rem] font-bold text-cyan-500/50 uppercase tracking-widest">Common Acids & Bases</div>
              {acidBasePresets.filter(c => c.name.toLowerCase().includes(value.toLowerCase())).map(c => (
                <button
                  key={c.name}
                  onClick={() => {
                    onChange(c.name);
                    onSelectPreset(c);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white/80 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors flex justify-between items-center group/btn"
                >
                  <span>{c.name}</span>
                  <span className={`text-[0.6rem] font-mono px-2 py-0.5 rounded border border-white/5 ${c.type.includes('acid') ? 'text-orange-500/80 group-hover/btn:text-orange-400 group-hover/btn:border-orange-500/30' : 'text-blue-500/80 group-hover/btn:text-blue-400 group-hover/btn:border-blue-500/30'
                    }`}>{c.type.replace('-', ' ')}</span>
                </button>
              ))}
              {acidBasePresets.filter(c => c.name.toLowerCase().includes(value.toLowerCase())).length === 0 && (
                <div className="px-4 py-3 text-sm text-white/40 text-center">No presets found. You can still calculate manually!</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PHCalc = () => {
  const [calcMode, setCalcMode] = useState<'manual' | 'element'>('manual');
  const [mode, setMode] = useState<'strong-acid' | 'weak-acid' | 'strong-base' | 'weak-base'>('strong-acid');
  const [compoundName, setCompoundName] = useState('');
  const [conc, setConc] = useState('0.001');
  const [pK, setPK] = useState('4.76'); // pKa or pKb default

  const handleElementSelect = (sym: string) => {
    const map: Record<string, { name: string, type: 'strong-acid' | 'weak-acid' | 'strong-base' | 'weak-base', pK?: string }> = {
      'Li': { name: 'Lithium Hydroxide (LiOH)', type: 'strong-base' },
      'Na': { name: 'Sodium Hydroxide (NaOH)', type: 'strong-base' },
      'K': { name: 'Potassium Hydroxide (KOH)', type: 'strong-base' },
      'Ca': { name: 'Calcium Hydroxide (Ca(OH)2)', type: 'strong-base' },
      'Ba': { name: 'Barium Hydroxide (Ba(OH)2)', type: 'strong-base' },
      'Mg': { name: 'Magnesium Hydroxide (Mg(OH)2)', type: 'strong-base' },
      'Cl': { name: 'Hydrochloric Acid (HCl)', type: 'strong-acid' },
      'Br': { name: 'Hydrobromic Acid (HBr)', type: 'strong-acid' },
      'I': { name: 'Hydroiodic Acid (HI)', type: 'strong-acid' },
      'F': { name: 'Hydrofluoric Acid (HF)', type: 'weak-acid', pK: '3.17' },
      'N': { name: 'Ammonia (NH3)', type: 'weak-base', pK: '4.75' },
      'S': { name: 'Hydrogen Sulfide (H2S)', type: 'weak-acid', pK: '7.04' },
      'P': { name: 'Phosphoric Acid (H3PO4)', type: 'weak-acid', pK: '2.15' },
      'C': { name: 'Acetic Acid (Vinegar)', type: 'weak-acid', pK: '4.76' },
    };

    const preset = map[sym];
    if (preset) {
      setCompoundName(preset.name);
      setMode(preset.type);
      if (preset.pK) setPK(preset.pK);
    }
  };

  const actConc = Number(conc) || 0;
  const actPK = Number(pK) || 0;
  // pKaToKa mathematically identical to pKbToKb -> 10^-pK
  const actK = calc.pKaToKa(actPK);

  let ph = 7;
  let poh = 7;

  if (actConc > 0) {
    if (mode === 'strong-acid') {
      ph = calc.calcPH(actConc);
      poh = calc.phToPOH(ph);
    } else if (mode === 'weak-acid') {
      ph = calc.weakAcidPH(actK, actConc);
      poh = calc.phToPOH(ph);
    } else if (mode === 'strong-base') {
      poh = calc.calcPOH(actConc);
      ph = calc.phToPOH(poh);
    } else if (mode === 'weak-base') {
      poh = calc.weakBasePOH(actK, actConc);
      ph = calc.phToPOH(poh);
    }
  }

  // Cap at 0 and 14 for display sanity in extreme edge cases
  ph = Math.min(Math.max(ph, 0), 14);
  poh = Math.min(Math.max(poh, 0), 14);

  let example = 'Water';
  if (ph < 1) example = 'Battery Acid';
  else if (ph < 3) example = 'Lemon Juice / Vinegar';
  else if (ph < 5) example = 'Orange Juice / Soda';
  else if (ph < 6) example = 'Black Coffee';
  else if (ph < 7) example = 'Milk';
  else if (ph < 8) example = 'Pure Water / Blood';
  else if (ph < 10) example = 'Baking Soda';
  else if (ph < 12) example = 'Ammonia';
  else if (ph <= 14) example = 'Bleach / Lye';

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ExplanationBanner
        title="pH & pOH Calculator"
        desc="Measures the acidity or basicity of an aqueous solution. 
        How to use: 1. Select the type of substance (Strong/Weak Acid or Base). 
        2. Enter the molar concentration. 
        3. For weak substances, provide the pKa or pKb. 
        4. View the pH level and its comparison to common household items."
      />
      <div className="flex gap-2 p-1 bg-black/40 rounded-lg w-fit">
        <button onClick={() => setCalcMode('manual')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${calcMode === 'manual' ? 'bg-cyan-500/20 text-cyan-300 shadow-sm' : 'text-muted-foreground hover:text-white'}`}>Manual Mode</button>
        <button onClick={() => setCalcMode('element')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${calcMode === 'element' ? 'bg-cyan-500/20 text-cyan-300 shadow-sm' : 'text-muted-foreground hover:text-white'}`}>Element Mode</button>
      </div>

      {calcMode === 'element' ? (
        <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-2xl p-4 space-y-3">
          <div className="flex justify-between items-center px-1">
            <label className="text-[0.65rem] font-bold text-cyan-400/80 uppercase tracking-widest">Select Element (Reactive)</label>
            <span className="text-[0.6rem] text-cyan-500/50 italic font-medium">Maps element to its common Acid/Base</span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-[160px] overflow-y-auto chem-scroll pr-2">
            {['Li', 'Na', 'K', 'Mg', 'Ca', 'Ba', 'C', 'N', 'P', 'S', 'F', 'Cl', 'Br', 'I'].map(sym => {
              const el = calc.elements.find(e => e.sym === sym);
              const isActive = compoundName.includes(`(${sym}`) || (sym === 'C' && compoundName.includes('Acetic'));
              return (
                <button
                  key={sym}
                  onClick={() => handleElementSelect(sym)}
                  className={`p-2 rounded-lg border flex flex-col items-center justify-center transition-all ${isActive ? 'bg-cyan-500 border-cyan-400 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-black/40 border-white/5 text-cyan-100/60 hover:border-cyan-500/40 hover:text-cyan-300'}`}
                >
                  <span className="text-xs font-black">{sym}</span>
                  <span className="text-[0.5rem] opacity-70 font-mono">{el?.mass.toFixed(0)}</span>
                </button>
              );
            })}
          </div>
          <div className="text-center py-1 bg-cyan-900/10 rounded-lg border border-cyan-500/10">
            <span className="text-xs font-bold text-cyan-300 tracking-wider">{compoundName || 'Select an element to begin'}</span>
          </div>
        </div>
      ) : (
        <AcidBaseInput
          value={compoundName}
          onChange={setCompoundName}
          onSelectPreset={(preset) => {
            setMode(preset.type as any);
            if (preset.pK) setPK(preset.pK);
          }}
        />
      )}

      <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
        <div className="flex flex-wrap gap-2 p-1 bg-black/40 rounded-lg w-fit">
          <button onClick={() => setMode('strong-acid')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'strong-acid' ? 'bg-red-500/20 text-red-300 shadow-sm' : 'text-muted-foreground hover:text-white'}`}>Strong Acid</button>
          <button onClick={() => setMode('weak-acid')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'weak-acid' ? 'bg-orange-500/20 text-orange-300 shadow-sm' : 'text-muted-foreground hover:text-white'}`}>Weak Acid</button>
          <button onClick={() => setMode('weak-base')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'weak-base' ? 'bg-blue-500/20 text-blue-300 shadow-sm' : 'text-muted-foreground hover:text-white'}`}>Weak Base</button>
          <button onClick={() => setMode('strong-base')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'strong-base' ? 'bg-purple-500/20 text-purple-300 shadow-sm' : 'text-muted-foreground hover:text-white'}`}>Strong Base</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Concentration" value={conc} onChange={setConc} unit="M" placeholder="e.g. 1e-3" />
          {mode.includes('weak') && <Input label={mode === 'weak-acid' ? "Acid Strength (pKa)" : "Base Strength (pKb)"} value={pK} onChange={setPK} />}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Result label="pH Level" value={ph.toFixed(3)} highlight subtext={`Similar to: ${example}`} />
        <Result label="pOH Level" value={poh.toFixed(3)} />
      </div>
      <div className="pt-4 px-2">
        <div className="flex justify-between text-[0.65rem] font-bold uppercase tracking-wider mb-2">
          <span className="text-red-400">Acidic</span>
          <span className="text-green-400">Neutral</span>
          <span className="text-blue-400">Basic</span>
        </div>
        <div className="w-full h-6 rounded-full bg-gradient-to-r from-red-600 via-yellow-400 via-green-500 via-blue-500 to-purple-800 relative shadow-inner border border-white/10">
          <div
            className="absolute top-1/2 -translate-y-1/2 h-8 w-2 bg-white border border-black/50 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-500"
            style={{ left: `clamp(0%, ${(ph / 14) * 100}%, 100%)` }}
          />
        </div>
        <div className="flex justify-between text-[0.6rem] font-mono text-muted-foreground mt-2 px-1">
          <span>0</span><span>2</span><span>4</span><span>6</span><span>7</span><span>8</span><span>10</span><span>12</span><span>14</span>
        </div>
      </div>
    </div>
  );
};

const GasCalc = () => {
  const [p, setP] = useState('1'); const [pU, setPU] = useState('atm');
  const [v, setV] = useState(''); const [vU, setVU] = useState('L');
  const [n, setN] = useState('1');
  const [t, setT] = useState('25'); const [tU, setTU] = useState('°C');

  const actP = p ? pressureToAtm(Number(p), pU) : undefined;
  const actV = v ? volToL(Number(v), vU) : undefined;
  const actT = t ? tempToK(Number(t), tU) : undefined;

  const result = calc.idealGas(actP, actV, Number(n) || undefined, actT);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ExplanationBanner
        title="Ideal Gas Law (PV = nRT)"
        desc="Relates pressure, volume, temperature, and amount of gas. 
        How to use: 1. Enter three of the four variables. 
        2. Select the correct units (atm, L, °C, etc.). 
        3. Leave the variable you wish to solve for empty. 
        4. The calculator uses the universal gas constant (R = 0.08206) for precision."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Pressure (P)" value={p} onChange={setP} units={['atm', 'mmHg', 'kPa']} activeUnit={pU} onUnitChange={setPU} placeholder="Leave blank to solve" />
        <Input label="Volume (V)" value={v} onChange={setV} units={['L', 'mL']} activeUnit={vU} onUnitChange={setVU} placeholder="Leave blank to solve" />
        <Input label="Amount of Gas (Moles)" value={n} onChange={setN} unit="mol" placeholder="Leave blank to solve" />
        <Input label="Temperature (T)" value={t} onChange={setT} units={['°C', 'K']} activeUnit={tU} onUnitChange={setTU} placeholder="Leave blank to solve" />
      </div>
      <div className="grid grid-cols-2 gap-3 pt-2">
        <Result label="Solved Pressure" value={result.P.toFixed(4) + ' atm'} highlight={!p} />
        <Result label="Solved Volume" value={result.V.toFixed(4) + ' L'} highlight={!v} />
        <Result label="Solved Moles" value={result.n.toFixed(4) + ' mol'} highlight={!n} />
        <Result label="Solved Temp" value={result.T.toFixed(2) + ' K'} highlight={!t} />
      </div>
    </div>
  );
};

const PCompCalc = () => {
  const [mode, setMode] = useState<'standard' | 'element'>('standard');
  const [formula, setFormula] = useState('C6H12O6');
  const parsed = calc.parseFormula(formula);
  const mm = calc.calculateMolarMass(formula);

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ExplanationBanner
        title="Percent Composition"
        desc="Calculates the percentage by mass of each element in a compound. 
        How to use: 1. Enter a formula or select an element. 
        2. The tool breaks down the total molar mass into individual elements. 
        3. View the visual mass distribution bars and exact percentages for each atom."
      />

      <div className="flex gap-2 p-1 bg-black/40 rounded-lg w-fit">
        <button onClick={() => setMode('standard')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'standard' ? 'bg-cyan-500/20 text-cyan-300 shadow-sm' : 'text-muted-foreground hover:text-white'}`}>Standard Mode</button>
        <button onClick={() => setMode('element')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'element' ? 'bg-cyan-500/20 text-cyan-300 shadow-sm' : 'text-muted-foreground hover:text-white'}`}>Element Mode</button>
      </div>

      {mode === 'element' ? (
        <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-2xl p-4 space-y-3">
          <label className="text-[0.65rem] font-bold text-cyan-400/80 uppercase tracking-widest ml-1">Select Element</label>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-[160px] overflow-y-auto chem-scroll pr-2">
            {calc.elements.slice(0, 118).map(el => (
              <button
                key={el.sym}
                onClick={() => setFormula(el.sym)}
                className={`p-2 rounded-lg border flex flex-col items-center justify-center transition-all ${formula === el.sym ? 'bg-cyan-500 border-cyan-400 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-black/40 border-white/5 text-cyan-100/60 hover:border-cyan-500/40 hover:text-cyan-300'}`}
              >
                <span className="text-xs font-black">{el.sym}</span>
                <span className="text-[0.5rem] opacity-70 font-mono">{el.mass.toFixed(1)}</span>
              </button>
            ))}
          </div>
          <div className="text-center py-1">
            <span className="text-xs font-bold text-cyan-300 tracking-wider">Active: {calc.elements.find(e => e.sym === formula)?.name || formula} ({mm.toFixed(2)} g/mol)</span>
          </div>
        </div>
      ) : (
        <FormulaInput label="Chemical Formula" value={formula} onChange={setFormula} />
      )}

      {mm > 0 ? (
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(parsed).map(([sym, count], idx) => {
              const el = calc.elements.find(e => e.sym === sym);
              if (!el) return null;
              const elMass = el.mass * count;
              const percent = (elMass / mm) * 100;
              const colors = ['bg-cyan-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-green-500', 'bg-yellow-500'];
              const color = colors[idx % colors.length];

              return (
                <div key={sym} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded bg-black/40 border border-white/10 flex items-center justify-center font-bold text-sm text-cyan-300 font-mono`}>{sym}</div>
                      <div>
                        <div className="text-xs font-bold text-white/80">{el.name}</div>
                        <div className="text-[0.65rem] text-muted-foreground font-mono">{count} atom(s) × {el.mass.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-cyan-300 font-mono">{percent.toFixed(2)}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden border border-white/5">
                    <div className={`h-full ${color} shadow-[0_0_10px_currentColor] transition-all duration-1000`} style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 border-t border-white/10 pt-4">
            <Result label="Total Molar Mass" value={mm.toFixed(4) + ' g/mol'} />
          </div>
        </div>
      ) : (
        <div className="h-32 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
          <span className="text-sm text-muted-foreground">Enter a valid chemical formula above</span>
        </div>
      )}
    </div>
  );
};

// ... To keep file manageable but complete, I will include abbreviated versions of other calculators, but ensure they are fully functional.

const GibbsCalc = () => {
  const [dh, setDH] = useState('-285.8');
  const [t, setT] = useState('25'); const [tU, setTU] = useState('°C');
  const [ds, setDS] = useState('-163.6');

  const actT = tempToK(Number(t), tU);
  const dg = calc.gibbsFreeEnergy(Number(dh) * 1000, actT, Number(ds));
  const isSpont = dg < 0;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ExplanationBanner
        title="Gibbs Free Energy (ΔG = ΔH - TΔS)"
        desc="Predicts the spontaneity of a chemical reaction. 
        How to use: 1. Enter the change in Enthalpy (ΔH) and Entropy (ΔS). 
        2. Provide the temperature. 
        3. A negative ΔG indicates the reaction is spontaneous (happens on its own), while positive requires energy input."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Enthalpy (ΔH) - Heat absorbed/released" value={dh} onChange={setDH} unit="kJ/mol" />
        <Input label="Entropy (ΔS) - Disorder" value={ds} onChange={setDS} unit="J/(mol·K)" />
        <div className="sm:col-span-2">
          <Input label="Temperature" value={t} onChange={setT} units={['°C', 'K']} activeUnit={tU} onUnitChange={setTU} />
        </div>
      </div>
      <div className="pt-2 space-y-3">
        <Result label="Gibbs Free Energy (ΔG)" value={(dg / 1000).toFixed(3) + ' kJ/mol'} highlight />
        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 ${isSpont ? 'bg-green-500/10 border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.15)]' : 'bg-red-500/10 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)]'}`}>
          <div className="flex items-center gap-2">
            {isSpont ? <CheckCircle2 className={`w-5 h-5 text-green-400`} /> : <AlertCircle className={`w-5 h-5 text-red-400`} />}
            <span className={`text-base font-bold uppercase tracking-wider ${isSpont ? 'text-green-400' : 'text-red-400'}`}>{isSpont ? 'Reaction Happens (Spontaneous)' : 'Needs Energy (Non-spontaneous)'}</span>
          </div>
          <span className="text-xs opacity-70 text-center mt-1">
            {Number(dh) < 0 ? 'Exothermic (releases heat).' : 'Endothermic (absorbs heat).'}
            {Number(ds) > 0 ? ' Gets messier (Entropy increases).' : ' Gets more ordered (Entropy decreases).'}
          </span>
        </div>
      </div>
    </div>
  );
};

const DataTable = ({ title, desc, data, searchPlaceholder }: { title: string; desc: string; data: any[]; searchPlaceholder: string }) => {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ExplanationBanner title={title} desc={desc} />
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/50" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-black/40 border border-cyan-500/20 rounded-xl pl-10 pr-4 py-3 text-sm text-cyan-100 outline-none focus:border-cyan-400 transition-all shadow-inner"
          placeholder={searchPlaceholder}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[400px] overflow-y-auto chem-scroll pr-2">
        {data.filter(item => JSON.stringify(item).toLowerCase().includes(search.toLowerCase())).map((item, i) => (
          item.render(i)
        ))}
      </div>
    </div>
  );
};

const BondsTable = () => (
  <DataTable
    title="Bond Energies"
    desc="A reference table showing the energy required to break various chemical bonds. 
    How to deal with it: 1. Use the search bar to find specific bonds (e.g., 'C=O'). 
    2. Higher values indicate stronger, more stable bonds that require more heat to break."
    searchPlaceholder="Search bonds (e.g. C-H)"
    data={Object.entries(calc.bondEnergies).map(([bond, e]) => ({
      bond, e,
      render: (i: number) => (
        <div key={i} className="flex justify-between items-center bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-sm font-mono hover:bg-white/10 transition-colors">
          <span className="font-bold text-cyan-100">{bond}</span>
          <span className="text-cyan-400 font-bold">{e} kJ/mol</span>
        </div>
      )
    }))}
  />
);

const PotentialsTable = () => (
  <DataTable
    title="Standard Potentials"
    desc="Lists the standard reduction potentials (E°) for various half-reactions in volts. 
    How to deal with it: 1. Search for elements or ions. 
    2. Positive voltages represent strong oxidizers (electron stealers), while negative values represent strong reducers."
    searchPlaceholder="Search elements (e.g. Cu)"
    data={Object.entries(calc.standardPotentials).map(([half, e]) => ({
      half, e,
      render: (i: number) => (
        <div key={i} className="flex justify-between items-center bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-sm font-mono hover:bg-white/10 transition-colors">
          <span className="font-bold text-cyan-100">{half}</span>
          <span className={`font-bold ${e >= 0 ? 'text-green-400' : 'text-red-400'}`}>{e > 0 ? '+' : ''}{e.toFixed(2)} V</span>
        </div>
      )
    }))}
  />
);

const KeqCalc = () => {
  const [dg, setDG] = useState('-237.1');
  const [t, setT] = useState('25'); const [tU, setTU] = useState('°C');
  const actT = tempToK(Number(t), tU);
  const k = calc.equilibriumConstant(Number(dg) * 1000, actT);
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ExplanationBanner
        title="Equilibrium Constant (K)"
        desc="Measures the ratio of products to reactants at chemical equilibrium. 
        How to use: 1. Enter the Gibbs Free Energy (ΔG) and the system temperature. 
        2. K > 1 means the reaction favors products. 
        3. K < 1 means the reaction favors reactants."
      />
      <Input label="Gibbs Free Energy (ΔG)" value={dg} onChange={setDG} unit="kJ/mol" />
      <Input label="Temperature" value={t} onChange={setT} units={['°C', 'K']} activeUnit={tU} onUnitChange={setTU} />
      <div className="pt-2">
        <Result label="Equilibrium Constant (K)" value={k.toExponential(4)} highlight subtext={k > 1 ? "Reaction heavily favors making products." : "Reaction barely happens; favors reactants."} />
      </div>
    </div>
  );
};

const NernstCalc = () => {
  const [e0, setE0] = useState('1.10');
  const [n, setN] = useState('2');
  const [q, setQ] = useState('1');
  const [t, setT] = useState('25'); const [tU, setTU] = useState('°C');
  const actT = tempToK(Number(t), tU);
  const e = calc.nernstPotential(Number(e0), Number(n) || 1, Number(q) || 1, actT);
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ExplanationBanner
        title="Nernst Equation (Battery Voltage)"
        desc="Calculates the actual voltage of an electrochemical cell under non-standard conditions. 
        How to use: 1. Enter the Standard Potential (E°). 
        2. Enter the number of electrons transferred (n). 
        3. Provide the reaction quotient (Q) and Temperature. 
        4. Use this to see how concentration affects battery power."
      />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Standard Voltage (E°)" value={e0} onChange={setE0} unit="V" />
        <Input label="Electrons Moved (n)" value={n} onChange={setN} />
        <Input label="Reaction Quotient (Q)" value={q} onChange={setQ} />
        <Input label="Temperature" value={t} onChange={setT} units={['°C', 'K']} activeUnit={tU} onUnitChange={setTU} />
      </div>
      <div className="pt-2"><Result label="Actual Cell Voltage (E)" value={e.toFixed(5) + ' V'} highlight /></div>
    </div>
  );
};

const ArrheniusCalc = () => {
  const [a, setA] = useState('1e13');
  const [ea, setEa] = useState('75');
  const [t, setT] = useState('25'); const [tU, setTU] = useState('°C');
  const actT = tempToK(Number(t), tU);
  const k = calc.arrheniusRate(Number(a), Number(ea) * 1000, actT);
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ExplanationBanner
        title="Arrhenius Rate Equation"
        desc="Explains how the rate of a chemical reaction depends on temperature and energy barriers. 
        How to use: 1. Enter the Frequency Factor (A). 
        2. Enter the Activation Energy (Ea) needed to start the reaction. 
        3. Adjust the Temperature to see how heat accelerates the reaction speed (k)."
      />
      <Input label="Frequency Factor (A)" value={a} onChange={setA} unit="s⁻¹" />
      <Input label="Activation Energy (Ea)" value={ea} onChange={setEa} unit="kJ/mol" />
      <Input label="Temperature" value={t} onChange={setT} units={['°C', 'K']} activeUnit={tU} onUnitChange={setTU} />
      <div className="pt-2"><Result label="Reaction Speed (Rate Constant k)" value={k.toExponential(4) + ' s⁻¹'} highlight subtext="A higher k means the reaction finishes faster." /></div>
    </div>
  );
};

const BPECalc = () => {
  const [i, setI] = useState('1');
  const [kb, setKb] = useState('0.512');
  const [m, setM] = useState('1');
  const dt = calc.boilingPointElevation(Number(i), Number(kb), Number(m));
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ExplanationBanner
        title="Boiling Point Elevation"
        desc="Calculates how much the boiling point of a solvent increases when a solute is added. 
        How to use: 1. Enter the van't Hoff factor (i) (e.g., NaCl = 2). 
        2. Provide the solvent's boiling point constant (Kb). 
        3. Enter the concentration (Molality) to find the new boiling temperature."
      />
      <Input label="Particles per molecule (i)" value={i} onChange={setI} placeholder="e.g., NaCl = 2" />
      <Input label="Solvent Constant (Kb)" value={kb} onChange={setKb} unit="°C/m" placeholder="Water = 0.512" />
      <Input label="Concentration (Molality)" value={m} onChange={setM} unit="m" />
      <div className="pt-2"><Result label="Boiling Point Increase" value={'+' + dt.toFixed(3) + ' °C'} highlight subtext={`Water would now boil at ${(100 + dt).toFixed(3)} °C.`} /></div>
    </div>
  );
};

const FPDCalc = () => {
  const [i, setI] = useState('1');
  const [kf, setKf] = useState('1.86');
  const [m, setM] = useState('1');
  const dt = calc.freezingPointDepression(Number(i), Number(kf), Number(m));
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ExplanationBanner
        title="Freezing Point Depression"
        desc="Calculates how much a solute lowers the freezing point of a solvent. 
        How to use: 1. Enter the van't Hoff factor (i). 
        2. Provide the freezing point constant (Kf) for the liquid. 
        3. Enter the molal concentration to see how cold the mixture must get to freeze."
      />
      <Input label="Particles per molecule (i)" value={i} onChange={setI} placeholder="e.g., NaCl = 2" />
      <Input label="Solvent Constant (Kf)" value={kf} onChange={setKf} unit="°C/m" placeholder="Water = 1.86" />
      <Input label="Concentration (Molality)" value={m} onChange={setM} unit="m" />
      <div className="pt-2"><Result label="Freezing Point Decrease" value={'-' + dt.toFixed(3) + ' °C'} highlight subtext={`Water would now freeze at ${(0 - dt).toFixed(3)} °C.`} /></div>
    </div>
  );
};

const OsmoticCalc = () => {
  const [i, setI] = useState('1');
  const [m, setM] = useState('1');
  const [t, setT] = useState('25'); const [tU, setTU] = useState('°C');
  const actT = tempToK(Number(t), tU);
  const pi = calc.osmoticPressure(Number(i), Number(m), actT);
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ExplanationBanner
        title="Osmotic Pressure (π = iMRT)"
        desc="The pressure required to stop the flow of solvent across a semipermeable membrane. 
        How to use: 1. Enter the particle factor (i) and concentration (M). 
        2. Provide the Temperature. 
        3. The result shows the pressure (atm) exerted by the solution."
      />
      <Input label="Particles per molecule (i)" value={i} onChange={setI} />
      <Input label="Molarity (Concentration)" value={m} onChange={setM} unit="M" />
      <Input label="Temperature" value={t} onChange={setT} units={['°C', 'K']} activeUnit={tU} onUnitChange={setTU} />
      <div className="pt-2"><Result label="Osmotic Pressure (π)" value={pi.toFixed(3) + ' atm'} highlight /></div>
    </div>
  );
};

const HHCalc = () => {
  const [pka, setPka] = useState('4.76');
  const [a, setA] = useState('0.1');
  const [ha, setHA] = useState('0.1');
  const ph = calc.hendersonHasselbalch(Number(pka), Number(a) || 0.001, Number(ha) || 0.001);
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ExplanationBanner
        title="Henderson-Hasselbalch Equation"
        desc="Calculates the pH of a buffer solution composed of a weak acid and its conjugate base. 
        How to use: 1. Enter the acid strength (pKa). 
        2. Provide the molar concentrations of both the base [A⁻] and the acid [HA]. 
        3. This determines the buffer's capacity to resist pH changes."
      />
      <Input label="Acid Strength (pKa)" value={pka} onChange={setPka} />
      <Input label="Base Concentration [A⁻]" value={a} onChange={setA} unit="M" />
      <Input label="Acid Concentration [HA]" value={ha} onChange={setHA} unit="M" />
      <div className="pt-2"><Result label="Buffer pH" value={ph.toFixed(4)} highlight /></div>
    </div>
  );
};

const MolalityCalc = () => {
  const [mol, setMol] = useState('0.5');
  const [kg, setKg] = useState('1');
  const m = calc.calcMolality(Number(mol), Number(kg) || 1);
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ExplanationBanner
        title="Molality (m)"
        desc="Concentration expressed as moles of solute per kilogram of solvent. 
        How to use: 1. Enter the amount of solute in moles. 
        2. Enter the weight of the solvent (the liquid) in kilograms. 
        3. Use molality for calculations involving temperature changes, like boiling or freezing points."
      />
      <Input label="Amount of Particles (Moles)" value={mol} onChange={setMol} unit="mol" />
      <Input label="Weight of Liquid (Solvent)" value={kg} onChange={setKg} unit="kg" />
      <div className="pt-2"><Result label="Molality" value={m.toFixed(4) + ' mol/kg'} highlight /></div>
    </div>
  );
};

const SolubilityTable = () => (
  <DataTable
    title="Solubility Rules"
    desc="Guidelines for predicting whether an ionic compound will be soluble or insoluble in water. 
    How to deal with it: 1. Search for anions (like 'Nitrate') or cations. 
    2. Check the 'Except' column for specific combinations that defy the general rule."
    searchPlaceholder="Search rules (e.g. Nitrate)"
    data={calc.solubilityRules.map((r) => ({
      ...r,
      render: (i: number) => (
        <div key={i} className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors w-full">
          <div className="flex items-center gap-2 mb-1.5">
            <div className={`p-1 rounded-full ${r.soluble ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {r.soluble ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            </div>
            <span className="text-sm font-bold text-cyan-100">{r.rule}</span>
          </div>
          {r.exceptions && <div className="text-xs text-cyan-300/60 ml-9 font-mono">Except: {r.exceptions}</div>}
        </div>
      )
    }))}
  />
);

const PolyatomicTable = () => (
  <DataTable
    title="Polyatomic Ions"
    desc="Common ions composed of multiple atoms covalently bonded together, carrying a net charge. 
    How to deal with it: 1. Search by name or formula. 
    2. Use this reference for balancing complex chemical equations and naming compounds."
    searchPlaceholder="Search ions (e.g. Sulfate)"
    data={calc.polyatomicIons.map((ion) => ({
      ...ion,
      render: (i: number) => (
        <div key={i} className="flex justify-between items-center bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-sm hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded shadow-inner">{ion.formula}</span>
            <span className="text-cyan-100/80 font-bold">{ion.name}</span>
          </div>
          <span className={`font-mono font-bold ${ion.charge > 0 ? 'text-blue-400' : 'text-red-400'}`}>{ion.charge > 0 ? '+' : ''}{ion.charge}</span>
        </div>
      )
    }))}
  />
);

const ActivityTable = () => (
  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <ExplanationBanner
      title="Activity Series"
      desc="An empirical progression of metals from most reactive to least reactive. 
      How to deal with it: 1. Elements at the top (Red) react violently with water and acids. 
      2. Elements at the bottom (Green/Blue) are noble and resist corrosion. 
      3. Use this to predict single-displacement reactions."
    />
    <div className="flex flex-wrap gap-2">
      {calc.activitySeries.map((el, i) => {
        let colorClass = 'bg-green-500/10 text-green-400 border-green-500/30';
        if (i < 6) colorClass = 'bg-red-500/10 text-red-400 border-red-500/30';
        else if (i < 12) colorClass = 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
        return <div key={el} className={`px-4 py-2 rounded-lg border text-base font-mono font-bold shadow-sm ${colorClass}`}>{el}</div>;
      })}
    </div>
  </div>
);

const calcComponents: Record<CalcId, React.FC> = {
  molarity: MolarityCalc, moles: MolesCalc, pcomp: PCompCalc, ph: PHCalc, dilution: DilutionCalc,
  gas: GasCalc, gibbs: GibbsCalc,
  keq: KeqCalc,
  nernst: NernstCalc,
  arrhenius: ArrheniusCalc,
  bpe: BPECalc,
  fpd: FPDCalc,
  osmotic: OsmoticCalc,
  hh: HHCalc,
  molality: MolalityCalc,
  bonds: BondsTable, potentials: PotentialsTable,
  solubility: SolubilityTable,
  polyatomic: PolyatomicTable,
  activity: ActivityTable,
};

const ChemCalculators = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState<CalcId>('molarity');
  const ActiveComp = calcComponents[active];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
      {/* Hyper-ambient animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />

      <div className="lg:col-span-4 xl:col-span-3 glass-panel rounded-[2rem] p-5 max-h-[85vh] overflow-y-auto chem-scroll border border-cyan-500/30 bg-black/60 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10">
        <div className="flex items-center gap-4 mb-6 sticky top-0 bg-black/80 backdrop-blur-2xl p-4 -mx-5 px-6 rounded-t-[2rem] z-20 border-b border-cyan-500/20 shadow-lg">
          <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.4)] ring-1 ring-white/20">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 tracking-wide uppercase">Calculators</h2>
        </div>

        <div className="space-y-1.5 px-1 pb-4">
          {calcs.map((c) => {
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`w-full flex items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition-all duration-500 relative overflow-hidden group ${isActive ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.15)] scale-[1.02]' : 'hover:bg-white/5 border border-transparent text-cyan-100/60 hover:text-cyan-100 hover:border-white/10'}`}
              >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-400 to-blue-500 shadow-[0_0_15px_#22d3ee] rounded-r-full" />}
                <div className={`transition-all duration-500 p-2 rounded-lg ${isActive ? 'text-cyan-300 bg-cyan-900/50 shadow-inner' : 'group-hover:scale-110 group-hover:text-cyan-300 group-hover:bg-white/5'}`}>
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-bold tracking-wide transition-colors ${isActive ? 'text-cyan-100' : ''}`}>{t(c.nameKey)}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-8 xl:col-span-9 glass-panel rounded-[2.5rem] p-8 sm:p-10 border border-cyan-500/30 bg-black/60 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 flex flex-col min-h-[700px]">
        <div className="flex items-center justify-between mb-10 pb-8 border-b border-cyan-500/20">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.4)] ring-1 ring-white/20">
              {calcs.find(c => c.id === active)?.icon}
            </div>
            <div>
              <h3 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 tracking-tight">
                {t(calcs.find(c => c.id === active)?.nameKey || '')}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-3xl relative mx-auto">
          <ActiveComp />
        </div>
      </div>
    </div>
  );
};

export default ChemCalculators;

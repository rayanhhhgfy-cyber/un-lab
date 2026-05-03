// Chemical computation utilities
import { elements } from './elements';
import { SCIENCE_CONSTANTS } from '@/lib/science/constants';
export { elements };

/**
 * Parse a chemical formula into its constituent elements and their counts.
 * Handles nested parentheses and hydrates, e.g., "Ca(OH)2", "CuSO4.5H2O"
 */
export const parseFormula = (formula: string): Record<string, number> => {
  const stack: Record<string, number>[] = [{}];
  let i = 0;
  const n = formula.length;

  while (i < n) {
    const char = formula[i];

    if (char === '(' || char === '[') {
      stack.push({});
      i++;
    } else if (char === ')' || char === ']') {
      const top = stack.pop()!;
      i++;
      let multStr = '';
      while (i < n && /[0-9]/.test(formula[i])) {
        multStr += formula[i];
        i++;
      }
      const mult = multStr ? parseInt(multStr, 10) : 1;
      const current = stack[stack.length - 1];
      for (const [elem, count] of Object.entries(top)) {
        current[elem] = (current[elem] || 0) + count * mult;
      }
    } else if (char === '·' || char === '.') {
      i++;
      let multStr = '';
      while (i < n && /[0-9]/.test(formula[i])) {
        multStr += formula[i];
        i++;
      }
      const mult = multStr ? parseInt(multStr, 10) : 1;
      const restParsed = parseFormula(formula.substring(i));
      const current = stack[stack.length - 1];
      for (const [elem, count] of Object.entries(restParsed)) {
        current[elem] = (current[elem] || 0) + count * mult;
      }
      break; 
    } else if (/[A-Z]/.test(char)) {
      let elem = char;
      i++;
      while (i < n && /[a-z]/.test(formula[i])) {
        elem += formula[i];
        i++;
      }
      let countStr = '';
      while (i < n && /[0-9]/.test(formula[i])) {
        countStr += formula[i];
        i++;
      }
      const count = countStr ? parseInt(countStr, 10) : 1;
      const current = stack[stack.length - 1];
      current[elem] = (current[elem] || 0) + count;
    } else {
      i++;
    }
  }

  return stack[0] || {};
};

/**
 * Compute the molar mass from a formula string.
 * Returns 0 if formula is invalid.
 */
export const calculateMolarMass = (formula: string): number => {
  if (!formula || formula.trim() === '') return 0;
  try {
    const parsed = parseFormula(formula);
    let totalMass = 0;
    for (const [sym, count] of Object.entries(parsed)) {
      const el = elements.find(e => e.sym === sym);
      if (el) {
        totalMass += el.mass * count;
      } else {
        return 0; // Invalid element
      }
    }
    return totalMass;
  } catch (e) {
    return 0;
  }
};

/** Calculate pH from H⁺ concentration */
export const calcPH = (hConc: number): number => -Math.log10(hConc);

/** Calculate pOH from OH⁻ concentration */
export const calcPOH = (ohConc: number): number => -Math.log10(ohConc);

/** pH + pOH = 14 at 25°C */
export const phToPOH = (ph: number): number => SCIENCE_CONSTANTS.WATER_PH_POH_SUM_AT_25C - ph;

/** H⁺ concentration from pH */
export const phToHConc = (ph: number): number => Math.pow(10, -ph);

/** OH⁻ concentration from pOH */
export const pohToOHConc = (poh: number): number => Math.pow(10, -poh);

/** Weak Acid pH using approximation [H+] = sqrt(Ka * C) */
export const weakAcidPH = (ka: number, concentration: number): number => {
  const hConc = Math.sqrt(ka * concentration);
  return -Math.log10(hConc);
};

export const pKaToKa = (pKa: number): number => Math.pow(10, -pKa);

/** Weak Base pOH using approximation [OH-] = sqrt(Kb * C) */
export const weakBasePOH = (kb: number, concentration: number): number => {
  const ohConc = Math.sqrt(kb * concentration);
  return -Math.log10(ohConc);
};

export const pKbToKb = (pKb: number): number => Math.pow(10, -pKb);

/** Molarity = moles / liters */
export const calcMolarity = (moles: number, liters: number): number => moles / liters;

/** Omni-directional Molarity. M = mass / (mm * V) */
export const molarityOmni = (molarity?: number, mass?: number, molarMass?: number, volumeL?: number): { molarity: number, mass: number, molarMass: number, volumeL: number } => {
  if (molarity === undefined) return { molarity: mass! / (molarMass! * volumeL!), mass: mass!, molarMass: molarMass!, volumeL: volumeL! };
  if (mass === undefined) return { molarity: molarity!, mass: molarity! * molarMass! * volumeL!, molarMass: molarMass!, volumeL: volumeL! };
  if (volumeL === undefined) return { molarity: molarity!, mass: mass!, molarMass: molarMass!, volumeL: mass! / (molarity! * molarMass!) };
  return { molarity: molarity!, mass: mass!, molarMass: molarMass!, volumeL: volumeL! };
};

/** Molarity from mass percentage and density (g/mL) */
export const molarityFromDensity = (massPercent: number, density: number, molarMass: number): number => {
  return (massPercent * density * 10) / molarMass;
};

/** Moles = mass / molar mass */
export const calcMoles = (massG: number, molarMass: number): number => massG / molarMass;

/** Omni-directional Moles. n = mass / mm */
export const molesOmni = (moles?: number, mass?: number, molarMass?: number): { moles: number, mass: number, molarMass: number } => {
  if (moles === undefined) return { moles: mass! / molarMass!, mass: mass!, molarMass: molarMass! };
  if (mass === undefined) return { moles: moles!, mass: moles! * molarMass!, molarMass: molarMass! };
  return { moles: moles!, mass: mass!, molarMass: molarMass! };
};

/** Dilution: M1V1 = M2V2. Returns missing value. */
export const dilution = (m1: number, v1: number, m2?: number, v2?: number): number => {
  if (m2 === undefined) return (m1 * v1) / (v2!);
  return (m1 * v1) / m2;
};

/** Omni-directional Dilution: M1V1 = M2V2 */
export const dilutionOmni = (m1?: number, v1?: number, m2?: number, v2?: number): { m1: number; v1: number; m2: number; v2: number } => {
  if (m1 === undefined) return { m1: (m2! * v2!) / v1!, v1: v1!, m2: m2!, v2: v2! };
  if (v1 === undefined) return { m1: m1!, v1: (m2! * v2!) / m1!, m2: m2!, v2: v2! };
  if (m2 === undefined) return { m1: m1!, v1: v1!, m2: (m1! * v1!) / v2!, v2: v2! };
  if (v2 === undefined) return { m1: m1!, v1: v1!, m2: m2!, v2: (m1! * v1!) / m2! };
  return { m1: m1!, v1: v1!, m2: m2!, v2: v2! };
};

/** Ideal Gas Law: PV = nRT. Returns missing value. R = 0.08206 L·atm/(mol·K) */
export const idealGas = (
  P?: number, V?: number, n?: number, T?: number
): { P: number; V: number; n: number; T: number } => {
  const R = SCIENCE_CONSTANTS.GAS_CONSTANT_L_ATM_PER_MOL_K;
  if (P === undefined) return { P: (n! * R * T!) / V!, V: V!, n: n!, T: T! };
  if (V === undefined) return { P, V: (n! * R * T!) / P, n: n!, T: T! };
  if (n === undefined) return { P, V, n: (P * V) / (R * T!), T: T! };
  return { P, V, n, T: (P * V) / (n * R) };
};

/** Molality = moles solute / kg solvent */
export const calcMolality = (molesSolute: number, kgSolvent: number): number => molesSolute / kgSolvent;

/** Percent composition = (mass of element / molar mass of compound) * 100 */
export const percentComposition = (elementMass: number, molarMass: number): number =>
  (elementMass / molarMass) * 100;

/** Gibbs free energy: ΔG = ΔH - TΔS */
export const gibbsFreeEnergy = (deltaH: number, T: number, deltaS: number): number =>
  deltaH - T * deltaS;

/** Equilibrium constant from Gibbs: ΔG = -RT ln(K) → K = e^(-ΔG/RT) */
export const equilibriumConstant = (deltaG: number, T: number): number => {
  const R = SCIENCE_CONSTANTS.GAS_CONSTANT_J_PER_MOL_K;
  return Math.exp(-deltaG / (R * T));
};

/** Nernst equation: E = E° - (RT/nF) ln(Q) */
export const nernstPotential = (E0: number, n: number, Q: number, T: number = 298.15): number => {
  const R = SCIENCE_CONSTANTS.GAS_CONSTANT_J_PER_MOL_K;
  const F = SCIENCE_CONSTANTS.FARADAY_C_PER_MOL;
  return E0 - (R * T) / (n * F) * Math.log(Q);
};

/** Rate constant (Arrhenius): k = A * e^(-Ea/RT) */
export const arrheniusRate = (A: number, Ea: number, T: number): number => {
  const R = SCIENCE_CONSTANTS.GAS_CONSTANT_J_PER_MOL_K;
  return A * Math.exp(-Ea / (R * T));
};

/** Boiling point elevation: ΔTb = i * Kb * m */
export const boilingPointElevation = (i: number, Kb: number, molality: number): number =>
  i * Kb * molality;

/** Freezing point depression: ΔTf = i * Kf * m */
export const freezingPointDepression = (i: number, Kf: number, molality: number): number =>
  i * Kf * molality;

/** Osmotic pressure: π = iMRT */
export const osmoticPressure = (i: number, M: number, T: number): number => {
  const R = SCIENCE_CONSTANTS.GAS_CONSTANT_L_ATM_PER_MOL_K;
  return i * M * R * T;
};

/** Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]) */
export const hendersonHasselbalch = (pKa: number, conjBase: number, weakAcid: number): number =>
  pKa + Math.log10(conjBase / weakAcid);

/** Oxidation number helper for common compounds */
export const getOxidationState = (element: string, compound: string): number | null => {
  const rules: Record<string, Record<string, number>> = {
    'H2O': { H: 1, O: -2 },
    'NaCl': { Na: 1, Cl: -1 },
    'CO2': { C: 4, O: -2 },
    'H2SO4': { H: 1, S: 6, O: -2 },
    'HNO3': { H: 1, N: 5, O: -2 },
    'NaOH': { Na: 1, O: -2, H: 1 },
    'KMnO4': { K: 1, Mn: 7, O: -2 },
    'Fe2O3': { Fe: 3, O: -2 },
    'CuSO4': { Cu: 2, S: 6, O: -2 },
  };
  return rules[compound]?.[element] ?? null;
};

/** Electron configuration shorthand */
export const electronShells = (z: number): number[] => {
  const shells: number[] = [];
  const maxPerShell = [2, 8, 18, 32, 32, 18, 8];
  let remaining = z;
  for (const max of maxPerShell) {
    if (remaining <= 0) break;
    shells.push(Math.min(remaining, max));
    remaining -= max;
  }
  return shells;
};

/** Bond energy estimate (common bonds in kJ/mol) */
export const bondEnergies: Record<string, number> = {
  'H-H': 436, 'O=O': 498, 'N≡N': 945, 'C-H': 413, 'C-C': 348,
  'C=C': 614, 'C≡C': 839, 'C-O': 360, 'C=O': 743, 'O-H': 463,
  'N-H': 391, 'C-N': 305, 'C=N': 615, 'C≡N': 891, 'C-Cl': 339,
  'C-F': 485, 'H-Cl': 431, 'H-F': 567, 'H-Br': 366, 'H-I': 298,
  'Cl-Cl': 242, 'F-F': 155, 'Br-Br': 193, 'I-I': 151, 'S-H': 363,
  'S=O': 523, 'P-O': 335, 'P=O': 544, 'Si-O': 452,
};

/** Standard electrode potentials (V) */
export const standardPotentials: Record<string, number> = {
  'Li⁺/Li': -3.04, 'K⁺/K': -2.93, 'Ca²⁺/Ca': -2.87, 'Na⁺/Na': -2.71,
  'Mg²⁺/Mg': -2.37, 'Al³⁺/Al': -1.66, 'Zn²⁺/Zn': -0.76, 'Fe²⁺/Fe': -0.44,
  'Ni²⁺/Ni': -0.26, 'Sn²⁺/Sn': -0.14, 'Pb²⁺/Pb': -0.13, 'H⁺/H₂': 0.00,
  'Cu²⁺/Cu': 0.34, 'Ag⁺/Ag': 0.80, 'Pt²⁺/Pt': 1.20, 'Au³⁺/Au': 1.50,
  'F₂/F⁻': 2.87, 'Cl₂/Cl⁻': 1.36, 'Br₂/Br⁻': 1.07, 'I₂/I⁻': 0.54,
};

/** Solubility rules */
export const solubilityRules: { rule: string; soluble: boolean; exceptions?: string }[] = [
  { rule: 'All Na⁺, K⁺, NH₄⁺ salts', soluble: true },
  { rule: 'All NO₃⁻ salts', soluble: true },
  { rule: 'All Cl⁻, Br⁻, I⁻ salts', soluble: true, exceptions: 'Except Ag⁺, Pb²⁺, Hg₂²⁺' },
  { rule: 'All SO₄²⁻ salts', soluble: true, exceptions: 'Except Ba²⁺, Pb²⁺, Ca²⁺' },
  { rule: 'All OH⁻ salts', soluble: false, exceptions: 'Except Na⁺, K⁺, Ba²⁺, Ca²⁺' },
  { rule: 'All S²⁻ salts', soluble: false, exceptions: 'Except Na⁺, K⁺, NH₄⁺' },
  { rule: 'All CO₃²⁻ salts', soluble: false, exceptions: 'Except Na⁺, K⁺, NH₄⁺' },
  { rule: 'All PO₄³⁻ salts', soluble: false, exceptions: 'Except Na⁺, K⁺, NH₄⁺' },
];

/** Activity series */
export const activitySeries = [
  'Li', 'K', 'Ba', 'Ca', 'Na', 'Mg', 'Al', 'Zn', 'Fe', 'Ni',
  'Sn', 'Pb', 'H₂', 'Cu', 'Hg', 'Ag', 'Pt', 'Au'
];

/** Polyatomic ions */
export const polyatomicIons: { formula: string; name: string; charge: number }[] = [
  { formula: 'NH₄⁺', name: 'Ammonium', charge: 1 },
  { formula: 'NO₃⁻', name: 'Nitrate', charge: -1 },
  { formula: 'NO₂⁻', name: 'Nitrite', charge: -1 },
  { formula: 'SO₄²⁻', name: 'Sulfate', charge: -2 },
  { formula: 'SO₃²⁻', name: 'Sulfite', charge: -2 },
  { formula: 'CO₃²⁻', name: 'Carbonate', charge: -2 },
  { formula: 'HCO₃⁻', name: 'Bicarbonate', charge: -1 },
  { formula: 'PO₄³⁻', name: 'Phosphate', charge: -3 },
  { formula: 'OH⁻', name: 'Hydroxide', charge: -1 },
  { formula: 'ClO₃⁻', name: 'Chlorate', charge: -1 },
  { formula: 'ClO₄⁻', name: 'Perchlorate', charge: -1 },
  { formula: 'MnO₄⁻', name: 'Permanganate', charge: -1 },
  { formula: 'CrO₄²⁻', name: 'Chromate', charge: -2 },
  { formula: 'Cr₂O₇²⁻', name: 'Dichromate', charge: -2 },
  { formula: 'C₂O₄²⁻', name: 'Oxalate', charge: -2 },
  { formula: 'CN⁻', name: 'Cyanide', charge: -1 },
  { formula: 'SCN⁻', name: 'Thiocyanate', charge: -1 },
  { formula: 'CH₃COO⁻', name: 'Acetate', charge: -1 },
];

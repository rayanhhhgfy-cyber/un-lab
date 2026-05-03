import { elements } from './elements.js';


export type ReactionType = 'synthesis' | 'decomposition' | 'single-replacement' | 'double-replacement' | 'combustion' | 'acid-base' | 'redox' | 'precipitation' | 'neutralization' | 'oxidation' | 'reduction' | 'hydrolysis' | 'esterification' | 'polymerization' | 'fermentation' | 'photosynthesis' | 'electrolysis' | 'nuclear' | 'dehydration';
export type Visual = 'explosion' | 'fire' | 'bubbles' | 'precipitate' | 'color-change' | 'gas-release' | 'glow' | 'smoke' | 'dissolve' | 'crystallize' | 'spark' | 'vapor' | 'freeze' | 'melt' | 'boil' | 'condense' | 'effervescence' | 'luminescence' | 'absorb' | 'hydride';

export interface Reaction {
  id: string;
  reactants: string[];
  eq: string;
  balanced: string;
  products: string[];
  type: ReactionType;
  visual: Visual;
  color: string;
  enthalpy: number;
  desc: string;
  safety?: string;
  temp?: string;
  catalyst?: string;
  realUse: string;
  smiles?: string;
}

// Pre-added compounds that users can select
export const preAddedCompounds: Array<{ formula: string, name: string, smiles?: string }> = [
  { formula: 'H2O', name: 'Water', smiles: 'O' },
  { formula: 'H2', name: 'Hydrogen Gas', smiles: '[H][H]' },
  { formula: 'O2', name: 'Oxygen Gas', smiles: 'O=O' },
  { formula: 'N2', name: 'Nitrogen Gas', smiles: 'N#N' },
  { formula: 'CO2', name: 'Carbon Dioxide', smiles: 'O=C=O' },
  { formula: 'CH4', name: 'Methane', smiles: 'C' },
  { formula: 'NH3', name: 'Ammonia', smiles: 'N' },
  { formula: 'HCl', name: 'Hydrochloric Acid', smiles: 'Cl' },
  { formula: 'NaCl', name: 'Table Salt', smiles: '[Na+].[Cl-]' },
  { formula: 'H2SO4', name: 'Sulfuric Acid', smiles: 'OS(=O)(=O)O' },
  { formula: 'NaOH', name: 'Sodium Hydroxide', smiles: '[OH-].[Na+]' },
  { formula: 'CaCO3', name: 'Calcium Carbonate', smiles: '[Ca+2].[O-]C([O-])=O' },
  { formula: 'Fe2O3', name: 'Iron(III) Oxide', smiles: '[Fe+3].[Fe+3].[O-2].[O-2].[O-2]' },
  { formula: 'Al2O3', name: 'Aluminum Oxide', smiles: '[Al+3].[Al+3].[O-2].[O-2].[O-2]' },
  { formula: 'SiO2', name: 'Silicon Dioxide', smiles: 'O=[Si]=O' },
  { formula: 'CuSO4', name: 'Copper(II) Sulfate', smiles: '[Cu+2].[O-]S(=O)(=O)[O-]' },
  { formula: 'ZnO', name: 'Zinc Oxide', smiles: '[Zn+2].[O-2]' },
  { formula: 'AgNO3', name: 'Silver Nitrate', smiles: '[Ag+].[O-][N+](=O)[O-]' },
  { formula: 'BaSO4', name: 'Barium Sulfate', smiles: '[Ba+2].[O-]S(=O)(=O)[O-]' },
  { formula: 'PbO', name: 'Lead(II) Oxide', smiles: '[Pb+2].[O-2]' },
  { formula: 'HgO', name: 'Mercury(II) Oxide', smiles: '[Hg+2].[O-2]' },
  { formula: 'SnO2', name: 'Tin(IV) Oxide', smiles: '[Sn+4].[O-2].[O-2]' },
  { formula: 'TiO2', name: 'Titanium Dioxide', smiles: '[Ti+4].[O-2].[O-2]' },
  { formula: 'Cr2O3', name: 'Chromium(III) Oxide', smiles: '[Cr+3].[Cr+3].[O-2].[O-2].[O-2]' },
  { formula: 'MnO2', name: 'Manganese Dioxide', smiles: '[Mn+4].[O-2].[O-2]' },
  { formula: 'KOH', name: 'Potassium Hydroxide', smiles: '[OH-].[K+]' },
  { formula: 'Ca(OH)2', name: 'Calcium Hydroxide', smiles: '[Ca+2].[OH-].[OH-]' },
  { formula: 'Mg(OH)2', name: 'Magnesium Hydroxide', smiles: '[Mg+2].[OH-].[OH-]' },
  { formula: 'Na2CO3', name: 'Sodium Carbonate', smiles: '[Na+].[Na+].[O-]C([O-])=O' },
  { formula: 'NaHCO3', name: 'Sodium Bicarbonate', smiles: '[Na+].[O-]C(=O)[O-]' },
  { formula: 'HNO3', name: 'Nitric Acid', smiles: 'O[N+](=O)[O-]' },
  { formula: 'H2CO3', name: 'Carbonic Acid', smiles: 'O=C(O)O' },
  { formula: 'CH3COOH', name: 'Acetic Acid', smiles: 'CC(=O)O' },
  { formula: 'C2H5OH', name: 'Ethanol', smiles: 'CCO' },
  { formula: 'C6H12O6', name: 'Glucose', smiles: 'OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O' },
  { formula: 'C12H22O11', name: 'Sucrose', smiles: 'OC[C@H]1O[C@@H](OC[C@H]2O[C@@H](O)[C@H](O)[C@@H]2O)[C@H](O)[C@@H](O)[C@@H]1O' },
  { formula: 'NaNO3', name: 'Sodium Nitrate', smiles: '[Na+].[O-][N+](=O)[O-]' },
  { formula: 'KNO3', name: 'Potassium Nitrate', smiles: '[K+].[O-][N+](=O)[O-]' },
  { formula: 'Ca(NO3)2', name: 'Calcium Nitrate', smiles: '[Ca+2].[O-][N+](=O)[O-].[O-][N+](=O)[O-]' },
  { formula: 'NH4Cl', name: 'Ammonium Chloride', smiles: '[NH4+].[Cl-]' },
  { formula: 'NH4NO3', name: 'Ammonium Nitrate', smiles: '[NH4+].[O-][N+](=O)[O-]' },
  { formula: 'CuCl2', name: 'Copper(II) Chloride', smiles: '[Cu+2].[Cl-].[Cl-]' },
  { formula: 'FeCl3', name: 'Iron(III) Chloride', smiles: '[Fe+3].[Cl-].[Cl-].[Cl-]' },
  { formula: 'AlCl3', name: 'Aluminum Chloride', smiles: '[Al+3].[Cl-].[Cl-].[Cl-]' },
  { formula: 'ZnCl2', name: 'Zinc Chloride', smiles: '[Zn+2].[Cl-].[Cl-]' },
  { formula: 'MgCl2', name: 'Magnesium Chloride', smiles: '[Mg+2].[Cl-].[Cl-]' },
  { formula: 'CaCl2', name: 'Calcium Chloride', smiles: '[Ca+2].[Cl-].[Cl-]' },
  { formula: 'Na2SO4', name: 'Sodium Sulfate', smiles: '[Na+].[Na+].[O-]S(=O)(=O)[O-]' },
  { formula: 'K2SO4', name: 'Potassium Sulfate', smiles: '[K+].[K+].[O-]S(=O)(=O)[O-]' },
  { formula: 'MgSO4', name: 'Magnesium Sulfate', smiles: '[Mg+2].[O-]S(=O)(=O)[O-]' },
  { formula: 'Cu(NO3)2', name: 'Copper(II) Nitrate', smiles: '[Cu+2].[O-][N+](=O)[O-].[O-][N+](=O)[O-]' },
  { formula: 'Zn(NO3)2', name: 'Zinc Nitrate', smiles: '[Zn+2].[O-][N+](=O)[O-].[O-][N+](=O)[O-]' },
  { formula: 'Pb(NO3)2', name: 'Lead(II) Nitrate', smiles: '[Pb+2].[O-][N+](=O)[O-].[O-][N+](=O)[O-]' },
  { formula: 'AgCl', name: 'Silver Chloride', smiles: '[Ag+].[Cl-]' },
  { formula: 'PbCl2', name: 'Lead(II) Chloride', smiles: '[Pb+2].[Cl-].[Cl-]' },
  { formula: 'HgCl2', name: 'Mercury(II) Chloride', smiles: '[Hg+2].[Cl-].[Cl-]' },
  { formula: 'ZnS', name: 'Zinc Sulfide', smiles: '[Zn+2].[S-2]' },
  { formula: 'PbS', name: 'Lead(II) Sulfide', smiles: '[Pb+2].[S-2]' },
  { formula: 'HgS', name: 'Mercury(II) Sulfide', smiles: '[Hg+2].[S-2]' },
  { formula: 'CuO', name: 'Copper(II) Oxide', smiles: '[Cu+2].[O-2]' },
  { formula: 'FeO', name: 'Iron(II) Oxide', smiles: '[Fe+2].[O-2]' },
  { formula: 'Fe3O4', name: 'Iron(II,III) Oxide', smiles: '[Fe+2].[Fe+3].[Fe+3].[O-2].[O-2].[O-2].[O-2]' },
  { formula: 'MnO', name: 'Manganese(II) Oxide', smiles: '[Mn+2].[O-2]' },
  { formula: 'CoO', name: 'Cobalt(II) Oxide', smiles: '[Co+2].[O-2]' },
  { formula: 'NiO', name: 'Nickel(II) Oxide', smiles: '[Ni+2].[O-2]' },
  { formula: 'CaO', name: 'Calcium Oxide', smiles: '[Ca+2].[O-2]' },
  { formula: 'MgO', name: 'Magnesium Oxide', smiles: '[Mg+2].[O-2]' },
  { formula: 'Na2O', name: 'Sodium Oxide', smiles: '[Na+].[Na+].[O-2]' },
  { formula: 'K2O', name: 'Potassium Oxide', smiles: '[K+].[K+].[O-2]' },
  { formula: 'Li2O', name: 'Lithium Oxide', smiles: '[Li+].[Li+].[O-2]' },
  { formula: 'P4O10', name: 'Phosphorus Pentoxide', smiles: 'O=P(=O)(O)O' },
  { formula: 'SO2', name: 'Sulfur Dioxide', smiles: 'O=S=O' },
  { formula: 'SO3', name: 'Sulfur Trioxide', smiles: 'O=S(=O)=O' },
  { formula: 'NO', name: 'Nitric Oxide', smiles: '[N]=O' },
  { formula: 'NO2', name: 'Nitrogen Dioxide', smiles: '[N+](=O)[O-]' },
  { formula: 'N2O', name: 'Nitrous Oxide', smiles: 'N#N=O' },
  { formula: 'CO', name: 'Carbon Monoxide', smiles: '[C-]#[O+]' },
  { formula: 'H2S', name: 'Hydrogen Sulfide', smiles: 'S' },
  { formula: 'PH3', name: 'Phosphine', smiles: 'P' },
  { formula: 'SiH4', name: 'Silane', smiles: '[SiH4]' },
  { formula: 'BF3', name: 'Boron Trifluoride', smiles: 'FB(F)F' },
  { formula: 'NF3', name: 'Nitrogen Trifluoride', smiles: 'FN(F)F' },
  { formula: 'CH3OH', name: 'Methanol', smiles: 'CO' },
  { formula: 'C2H4', name: 'Ethylene', smiles: 'C=C' },
  { formula: 'C2H2', name: 'Acetylene', smiles: 'C#C' },
  { formula: 'C6H6', name: 'Benzene', smiles: 'c1ccccc1' },
  { formula: 'CH3COONa', name: 'Sodium Acetate', smiles: '[Na+].CC([O-])=O' },
  { formula: 'Na3PO4', name: 'Sodium Phosphate', smiles: '[Na+].[Na+].[Na+].[O-]P(=O)([O-])[O-]' },
  { formula: 'Ca3(PO4)2', name: 'Calcium Phosphate', smiles: '[Ca+2].[Ca+2].[Ca+2].[O-]P(=O)([O-])[O-].[O-]P(=O)([O-])[O-]' },
  { formula: 'Al(OH)3', name: 'Aluminum Hydroxide', smiles: '[Al+3].[OH-].[OH-].[OH-]' },
  { formula: 'Fe(OH)3', name: 'Iron(III) Hydroxide', smiles: '[Fe+3].[OH-].[OH-].[OH-]' },
  { formula: 'Cu(OH)2', name: 'Copper(II) Hydroxide', smiles: '[Cu+2].[OH-].[OH-]' },
  { formula: 'Zn(OH)2', name: 'Zinc Hydroxide', smiles: '[Zn+2].[OH-].[OH-]' },
  { formula: 'NaBr', name: 'Sodium Bromide', smiles: '[Na+].[Br-]' },
  { formula: 'KBr', name: 'Potassium Bromide', smiles: '[K+].[Br-]' },
  { formula: 'NaI', name: 'Sodium Iodide', smiles: '[Na+].[I-]' },
  { formula: 'KI', name: 'Potassium Iodide', smiles: '[K+].[I-]' },
  { formula: 'CaBr2', name: 'Calcium Bromide', smiles: '[Ca+2].[Br-].[Br-]' },
  { formula: 'CaI2', name: 'Calcium Iodide', smiles: '[Ca+2].[I-].[I-]' },
  { formula: 'MgBr2', name: 'Magnesium Bromide', smiles: '[Mg+2].[Br-].[Br-]' },
  { formula: 'MgI2', name: 'Magnesium Iodide', smiles: '[Mg+2].[I-].[I-]' },
  { formula: 'BaCl2', name: 'Barium Chloride', smiles: '[Ba+2].[Cl-].[Cl-]' },
  { formula: 'BaBr2', name: 'Barium Bromide', smiles: '[Ba+2].[Br-].[Br-]' },
  { formula: 'BaI2', name: 'Barium Iodide', smiles: '[Ba+2].[I-].[I-]' },
  { formula: 'SrCl2', name: 'Strontium Chloride', smiles: '[Sr+2].[Cl-].[Cl-]' },
  { formula: 'SrBr2', name: 'Strontium Bromide', smiles: '[Sr+2].[Br-].[Br-]' },
  { formula: 'SrI2', name: 'Strontium Iodide', smiles: '[Sr+2].[I-].[I-]' },
  { formula: 'BeCl2', name: 'Beryllium Chloride', smiles: '[Be+2].[Cl-].[Cl-]' },
  { formula: 'BeBr2', name: 'Beryllium Bromide', smiles: '[Be+2].[Br-].[Br-]' },
  { formula: 'BeI2', name: 'Beryllium Iodide', smiles: '[Be+2].[I-].[I-]' },
  { formula: 'LiCl', name: 'Lithium Chloride', smiles: '[Li+].[Cl-]' },
  { formula: 'LiBr', name: 'Lithium Bromide', smiles: '[Li+].[Br-]' },
  { formula: 'LiI', name: 'Lithium Iodide', smiles: '[Li+].[I-]' },
  { formula: 'CsCl', name: 'Cesium Chloride', smiles: '[Cs+].[Cl-]' },
  { formula: 'CsBr', name: 'Cesium Bromide', smiles: '[Cs+].[Br-]' },
  { formula: 'CsI', name: 'Cesium Iodide', smiles: '[Cs+].[I-]' },
  { formula: 'RbCl', name: 'Rubidium Chloride', smiles: '[Rb+].[Cl-]' },
  { formula: 'RbBr', name: 'Rubidium Bromide', smiles: '[Rb+].[Br-]' },
  { formula: 'RbI', name: 'Rubidium Iodide', smiles: '[Rb+].[I-]' },
  { formula: 'AgBr', name: 'Silver Bromide', smiles: '[Ag+].[Br-]' },
  { formula: 'AgI', name: 'Silver Iodide', smiles: '[Ag+].[I-]' },
  { formula: 'HgBr2', name: 'Mercury(II) Bromide', smiles: '[Hg+2].[Br-].[Br-]' },
  { formula: 'HgI2', name: 'Mercury(II) Iodide', smiles: '[Hg+2].[I-].[I-]' },
  { formula: 'TlCl', name: 'Thallium(I) Chloride', smiles: '[Tl+].[Cl-]' },
  { formula: 'TlBr', name: 'Thallium(I) Bromide', smiles: '[Tl+].[Br-]' },
  { formula: 'TlI', name: 'Thallium(I) Iodide', smiles: '[Tl+].[I-]' },
  { formula: 'SnCl2', name: 'Tin(II) Chloride', smiles: '[Sn+2].[Cl-].[Cl-]' },
  { formula: 'SnBr2', name: 'Tin(II) Bromide', smiles: '[Sn+2].[Br-].[Br-]' },
  { formula: 'SnI2', name: 'Tin(II) Iodide', smiles: '[Sn+2].[I-].[I-]' },
  { formula: 'PbBr2', name: 'Lead(II) Bromide', smiles: '[Pb+2].[Br-].[Br-]' },
  { formula: 'PbI2', name: 'Lead(II) Iodide', smiles: '[Pb+2].[I-].[I-]' },
  { formula: 'BiCl3', name: 'Bismuth(III) Chloride', smiles: '[Bi+3].[Cl-].[Cl-].[Cl-]' },
  { formula: 'SbCl3', name: 'Antimony(III) Chloride', smiles: '[Sb+3].[Cl-].[Cl-].[Cl-]' },
  { formula: 'AsCl3', name: 'Arsenic(III) Chloride', smiles: 'Cl[As](Cl)Cl' },
  { formula: 'PCl3', name: 'Phosphorus Trichloride', smiles: 'ClP(Cl)Cl' },
  { formula: 'PCl5', name: 'Phosphorus Pentachloride', smiles: 'ClP(Cl)(Cl)(Cl)Cl' },
  { formula: 'SCl2', name: 'Sulfur Dichloride', smiles: 'ClSCl' },
  { formula: 'SeCl2', name: 'Selenium Dichloride', smiles: 'Cl[Se]Cl' },
  { formula: 'ICl', name: 'Iodine Monochloride', smiles: 'ClI' },
  { formula: 'ICl3', name: 'Iodine Trichloride', smiles: 'ClI(Cl)Cl' },
  { formula: 'BrCl', name: 'Bromine Monochloride', smiles: 'BrCl' },
  { formula: 'ClF', name: 'Chlorine Monofluoride', smiles: 'ClF' },
  { formula: 'ClF3', name: 'Chlorine Trifluoride', smiles: 'ClF(F)F' },
  { formula: 'BrF3', name: 'Bromine Trifluoride', smiles: 'BrF(F)F' },
  { formula: 'IF3', name: 'Iodine Trifluoride', smiles: 'FI(F)F' },
  { formula: 'IF5', name: 'Iodine Pentafluoride', smiles: 'FI(F)(F)(F)F' },
  { formula: 'IF7', name: 'Iodine Heptafluoride', smiles: 'FI(F)(F)(F)(F)(F)F' },
  { formula: 'XeF2', name: 'Xenon Difluoride', smiles: 'F[Xe]F' },
  { formula: 'XeF4', name: 'Xenon Tetrafluoride', smiles: 'F[Xe](F)(F)F' },
  { formula: 'XeF6', name: 'Xenon Hexafluoride', smiles: 'F[Xe](F)(F)(F)(F)F' },
  { formula: 'KrF2', name: 'Krypton Difluoride', smiles: 'F[Kr]F' },
  { formula: 'RnF2', name: 'Radon Difluoride', smiles: 'F[Rn]F' },
  { formula: 'H2O2', name: 'Hydrogen Peroxide', smiles: 'OO' },
  { formula: 'Na2O2', name: 'Sodium Peroxide', smiles: '[Na+].[Na+].[O-].[O-]' },
  { formula: 'BaO2', name: 'Barium Peroxide', smiles: '[Ba+2].[O-].[O-]' },
  { formula: 'MgO2', name: 'Magnesium Peroxide', smiles: '[Mg+2].[O-].[O-]' },
  { formula: 'CaO2', name: 'Calcium Peroxide', smiles: '[Ca+2].[O-].[O-]' },
  { formula: 'Li2O2', name: 'Lithium Peroxide', smiles: '[Li+].[Li+].[O-].[O-]' },
  { formula: 'K2O2', name: 'Potassium Peroxide', smiles: '[K+].[K+].[O-].[O-]' },
  { formula: 'NaOCl', name: 'Sodium Hypochlorite', smiles: '[Na+].[O-]Cl' },
  { formula: 'Ca(OCl)2', name: 'Calcium Hypochlorite', smiles: '[Ca+2].[O-]Cl.[O-]Cl' },
  { formula: 'KMnO4', name: 'Potassium Permanganate', smiles: '[K+].[O-][Mn](=O)(=O)=O' },
  { formula: 'K2Cr2O7', name: 'Potassium Dichromate', smiles: '[K+].[K+].[O-][Cr](=O)(=O)O[Cr](=O)(=O)[O-]' },
  { formula: 'Na2Cr2O7', name: 'Sodium Dichromate', smiles: '[Na+].[Na+].[O-][Cr](=O)(=O)O[Cr](=O)(=O)[O-]' },
  { formula: 'K2CrO4', name: 'Potassium Chromate', smiles: '[K+].[K+].[O-][Cr](=O)(=O)[O-]' },
  { formula: 'Na2CrO4', name: 'Sodium Chromate', smiles: '[Na+].[Na+].[O-][Cr](=O)(=O)[O-]' },
  { formula: 'Na2S2O3', name: 'Sodium Thiosulfate', smiles: '[Na+].[Na+].[O-]S(=O)(=S)[O-]' },
  { formula: 'Na2S', name: 'Sodium Sulfide', smiles: '[Na+].[Na+].[S-2]' },
  { formula: 'K2S', name: 'Potassium Sulfide', smiles: '[K+].[K+].[S-2]' },
  { formula: 'CaS', name: 'Calcium Sulfide', smiles: '[Ca+2].[S-2]' },
  { formula: 'MgS', name: 'Magnesium Sulfide', smiles: '[Mg+2].[S-2]' },
  { formula: 'BaS', name: 'Barium Sulfide', smiles: '[Ba+2].[S-2]' },
  { formula: 'SrS', name: 'Strontium Sulfide', smiles: '[Sr+2].[S-2]' },
  { formula: 'BeS', name: 'Beryllium Sulfide', smiles: '[Be+2].[S-2]' },
  { formula: 'Al2S3', name: 'Aluminum Sulfide', smiles: '[Al+3].[Al+3].[S-2].[S-2].[S-2]' },
  { formula: 'FeS', name: 'Iron(II) Sulfide', smiles: '[Fe+2].[S-2]' },
  { formula: 'Fe2S3', name: 'Iron(III) Sulfide', smiles: '[Fe+3].[Fe+3].[S-2].[S-2].[S-2]' },
  { formula: 'CuS', name: 'Copper(II) Sulfide', smiles: '[Cu+2].[S-2]' },
  { formula: 'Cu2S', name: 'Copper(I) Sulfide', smiles: '[Cu+].[Cu+].[S-2]' },
  { formula: 'ZnS', name: 'Zinc Sulfide', smiles: '[Zn+2].[S-2]' },
  { formula: 'CdS', name: 'Cadmium Sulfide', smiles: '[Cd+2].[S-2]' },
  { formula: 'HgS', name: 'Mercury(II) Sulfide', smiles: '[Hg+2].[S-2]' },
  { formula: 'SnS', name: 'Tin(II) Sulfide', smiles: '[Sn+2].[S-2]' },
  { formula: 'SnS2', name: 'Tin(IV) Sulfide', smiles: '[Sn+4].[S-2].[S-2]' },
  { formula: 'PbS', name: 'Lead(II) Sulfide', smiles: '[Pb+2].[S-2]' },
  { formula: 'Bi2S3', name: 'Bismuth(III) Sulfide', smiles: '[Bi+3].[Bi+3].[S-2].[S-2].[S-2]' },
  { formula: 'Sb2S3', name: 'Antimony(III) Sulfide', smiles: '[Sb+3].[Sb+3].[S-2].[S-2].[S-2]' },
  { formula: 'As2S3', name: 'Arsenic(III) Sulfide', smiles: 'S[As]1SS[As](S1)S' },
  { formula: 'P4S3', name: 'Tetraphosphorus Trisulfide', smiles: 'P12SP3S1P2S2' },
  { formula: 'P4S10', name: 'Tetraphosphorus Decasulfide', smiles: 'P12SP3S1P2S2P3S3' },
  { formula: 'NaCN', name: 'Sodium Cyanide', smiles: '[Na+].[C-]#N' },
  { formula: 'KCN', name: 'Potassium Cyanide', smiles: '[K+].[C-]#N' },
  { formula: 'HCN', name: 'Hydrogen Cyanide', smiles: 'C#N' },
  { formula: 'NaSCN', name: 'Sodium Thiocyanate', smiles: '[Na+].[S-]C#N' },
  { formula: 'KSCN', name: 'Potassium Thiocyanate', smiles: '[K+].[S-]C#N' },
  { formula: 'NH4SCN', name: 'Ammonium Thiocyanate', smiles: '[NH4+].[S-]C#N' },
  { formula: 'Na2SiO3', name: 'Sodium Metasilicate', smiles: '[Na+].[Na+].[O-][Si](=O)[O-]' },
  { formula: 'Na4SiO4', name: 'Sodium Orthosilicate', smiles: '[Na+].[Na+].[Na+].[Na+].[O-][Si]([O-])([O-])[O-]' },
  { formula: 'CaSiO3', name: 'Calcium Metasilicate', smiles: '[Ca+2].[O-][Si](=O)[O-]' },
  { formula: 'MgSiO3', name: 'Magnesium Metasilicate', smiles: '[Mg+2].[O-][Si](=O)[O-]' },
  { formula: 'Al2SiO5', name: 'Aluminum Silicate', smiles: '[Al+3].[Al+3].[O-][Si](=O)[O-].[O-][Si](=O)[O-]' },
  { formula: 'NaAlSi3O8', name: 'Albite', smiles: '[Na+].[Al+3].[O-][Si](=O)[O-].[O-][Si](=O)[O-].[O-][Si](=O)[O-]' },
  { formula: 'KAlSi3O8', name: 'Orthoclase', smiles: '[K+].[Al+3].[O-][Si](=O)[O-].[O-][Si](=O)[O-].[O-][Si](=O)[O-]' },
  { formula: 'CaAl2Si2O8', name: 'Anorthite', smiles: '[Ca+2].[Al+3].[Al+3].[O-][Si](=O)[O-].[O-][Si](=O)[O-].[O-][Si](=O)[O-].[O-][Si](=O)[O-]' },
  { formula: 'Mg3Si4O10(OH)2', name: 'Talc', smiles: '[Mg+2].[Mg+2].[Mg+2].[O-][Si](=O)[O-].[O-][Si](=O)[O-].[O-][Si](=O)[O-].[O-][Si](=O)[O-].[OH-].[OH-]' },
  { formula: 'Al2Si2O5(OH)4', name: 'Kaolinite', smiles: '[Al+3].[Al+3].[O-][Si](=O)[O-].[O-][Si](=O)[O-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Ca5(PO4)3F', name: 'Fluorapatite', smiles: '[Ca+2].[Ca+2].[Ca+2].[Ca+2].[Ca+2].[O-]P(=O)([O-])[O-].[O-]P(=O)([O-])[O-].[O-]P(=O)([O-])[O-].[F-]' },
  { formula: 'Ca5(PO4)3OH', name: 'Hydroxyapatite', smiles: '[Ca+2].[Ca+2].[Ca+2].[Ca+2].[Ca+2].[O-]P(=O)([O-])[O-].[O-]P(=O)([O-])[O-].[O-]P(=O)([O-])[O-].[OH-]' },
  { formula: 'Ca5(PO4)3Cl', name: 'Chlorapatite', smiles: '[Ca+2].[Ca+2].[Ca+2].[Ca+2].[Ca+2].[O-]P(=O)([O-])[O-].[O-]P(=O)([O-])[O-].[O-]P(=O)([O-])[O-].[Cl-]' },
  { formula: 'CaF2', name: 'Fluorite', smiles: '[Ca+2].[F-].[F-]' },
  { formula: 'BaF2', name: 'Barium Fluoride', smiles: '[Ba+2].[F-].[F-]' },
  { formula: 'SrF2', name: 'Strontium Fluoride', smiles: '[Sr+2].[F-].[F-]' },
  { formula: 'MgF2', name: 'Magnesium Fluoride', smiles: '[Mg+2].[F-].[F-]' },
  { formula: 'BeF2', name: 'Beryllium Fluoride', smiles: '[Be+2].[F-].[F-]' },
  { formula: 'LiF', name: 'Lithium Fluoride', smiles: '[Li+].[F-]' },
  { formula: 'NaF', name: 'Sodium Fluoride', smiles: '[Na+].[F-]' },
  { formula: 'KF', name: 'Potassium Fluoride', smiles: '[K+].[F-]' },
  { formula: 'CsF', name: 'Cesium Fluoride', smiles: '[Cs+].[F-]' },
  { formula: 'RbF', name: 'Rubidium Fluoride', smiles: '[Rb+].[F-]' },
  { formula: 'AgF', name: 'Silver Fluoride', smiles: '[Ag+].[F-]' },
  { formula: 'HgF2', name: 'Mercury(II) Fluoride', smiles: '[Hg+2].[F-].[F-]' },
  { formula: 'SnF2', name: 'Tin(II) Fluoride', smiles: '[Sn+2].[F-].[F-]' },
  { formula: 'SnF4', name: 'Tin(IV) Fluoride', smiles: '[Sn+4].[F-].[F-].[F-].[F-]' },
  { formula: 'PbF2', name: 'Lead(II) Fluoride', smiles: '[Pb+2].[F-].[F-]' },
  { formula: 'BiF3', name: 'Bismuth(III) Fluoride', smiles: '[Bi+3].[F-].[F-].[F-]' },
  { formula: 'SbF3', name: 'Antimony(III) Fluoride', smiles: '[Sb+3].[F-].[F-].[F-]' },
  { formula: 'AsF3', name: 'Arsenic(III) Fluoride', smiles: 'F[As](F)F' },
  { formula: 'PF3', name: 'Phosphorus Trifluoride', smiles: 'FP(F)F' },
  { formula: 'PF5', name: 'Phosphorus Pentafluoride', smiles: 'FP(F)(F)(F)F' },
  { formula: 'SF4', name: 'Sulfur Tetrafluoride', smiles: 'FS(F)(F)F' },
  { formula: 'SF6', name: 'Sulfur Hexafluoride', smiles: 'FS(F)(F)(F)(F)F' },
  { formula: 'SeF4', name: 'Selenium Tetrafluoride', smiles: 'F[Se](F)(F)F' },
  { formula: 'SeF6', name: 'Selenium Hexafluoride', smiles: 'F[Se](F)(F)(F)(F)F' },
  { formula: 'TeF4', name: 'Tellurium Tetrafluoride', smiles: 'F[Te](F)(F)F' },
  { formula: 'TeF6', name: 'Tellurium Hexafluoride', smiles: 'F[Te](F)(F)(F)(F)F' },
  { formula: 'ClF', name: 'Chlorine Monofluoride', smiles: 'FCl' },
  { formula: 'ClF3', name: 'Chlorine Trifluoride', smiles: 'FCl(F)F' },
  { formula: 'ClF5', name: 'Chlorine Pentafluoride', smiles: 'FCl(F)(F)(F)F' },
  { formula: 'BrF', name: 'Bromine Monofluoride', smiles: 'FBr' },
  { formula: 'BrF3', name: 'Bromine Trifluoride', smiles: 'FBr(F)F' },
  { formula: 'BrF5', name: 'Bromine Pentafluoride', smiles: 'FBr(F)(F)(F)F' },
  { formula: 'IF', name: 'Iodine Monofluoride', smiles: 'FI' },
  { formula: 'IF3', name: 'Iodine Trifluoride', smiles: 'FI(F)F' },
  { formula: 'IF5', name: 'Iodine Pentafluoride', smiles: 'FI(F)(F)(F)F' },
  { formula: 'IF7', name: 'Iodine Heptafluoride', smiles: 'FI(F)(F)(F)(F)(F)F' },
  { formula: 'KrF2', name: 'Krypton Difluoride', smiles: 'F[Kr]F' },
  { formula: 'XeF2', name: 'Xenon Difluoride', smiles: 'F[Xe]F' },
  { formula: 'XeF4', name: 'Xenon Tetrafluoride', smiles: 'F[Xe](F)(F)F' },
  { formula: 'XeF6', name: 'Xenon Hexafluoride', smiles: 'F[Xe](F)(F)(F)(F)F' },
  { formula: 'RnF2', name: 'Radon Difluoride', smiles: 'F[Rn]F' },
  { formula: 'O3', name: 'Ozone', smiles: '[O-][O+]=O' },
  { formula: 'NO3-', name: 'Nitrate Ion', smiles: '[O-][N+](=O)[O-]' },
  { formula: 'SO4^2-', name: 'Sulfate Ion', smiles: '[O-]S(=O)(=O)[O-]' },
  { formula: 'PO4^3-', name: 'Phosphate Ion', smiles: '[O-]P(=O)([O-])[O-]' },
  { formula: 'CO3^2-', name: 'Carbonate Ion', smiles: '[O-]C([O-])=O' },
  { formula: 'HCO3-', name: 'Bicarbonate Ion', smiles: '[O-]C(=O)[O-]' },
  { formula: 'OH-', name: 'Hydroxide Ion', smiles: '[OH-]' },
  { formula: 'NH4+', name: 'Ammonium Ion', smiles: '[NH4+]' },
  { formula: 'H3O+', name: 'Hydronium Ion', smiles: '[OH3+]' },
  { formula: 'CN-', name: 'Cyanide Ion', smiles: '[C-]#N' },
  { formula: 'SCN-', name: 'Thiocyanate Ion', smiles: '[S-]C#N' },
  { formula: 'ClO-', name: 'Hypochlorite Ion', smiles: '[O-]Cl' },
  { formula: 'ClO2-', name: 'Chlorite Ion', smiles: '[O-]Cl=O' },
  { formula: 'ClO3-', name: 'Chlorate Ion', smiles: '[O-]Cl(=O)=O' },
  { formula: 'ClO4-', name: 'Perchlorate Ion', smiles: '[O-]Cl(=O)(=O)=O' },
  { formula: 'MnO4-', name: 'Permanganate Ion', smiles: '[O-][Mn](=O)(=O)=O' },
  { formula: 'CrO4^2-', name: 'Chromate Ion', smiles: '[O-][Cr](=O)(=O)[O-]' },
  { formula: 'Cr2O7^2-', name: 'Dichromate Ion', smiles: '[O-][Cr](=O)(=O)O[Cr](=O)(=O)[O-]' },
  { formula: 'S2O3^2-', name: 'Thiosulfate Ion', smiles: '[O-]S(=O)(=S)[O-]' },
  { formula: 'SiO3^2-', name: 'Metasilicate Ion', smiles: '[O-][Si](=O)[O-]' },
  { formula: 'AlO2-', name: 'Aluminate Ion', smiles: '[O-][Al]=O' },
  { formula: 'BO3^3-', name: 'Borate Ion', smiles: '[O-]B([O-])[O-]' },
  { formula: 'PO3-', name: 'Metaphosphate Ion', smiles: '[O-]P=O' },
  { formula: 'AsO4^3-', name: 'Arsenate Ion', smiles: '[O-]As(=O)([O-])[O-]' },
  { formula: 'VO3-', name: 'Vanadate Ion', smiles: '[O-][V](=O)=O' },
  { formula: 'MoO4^2-', name: 'Molybdate Ion', smiles: '[O-][Mo](=O)(=O)[O-]' },
  { formula: 'WO4^2-', name: 'Tungstate Ion', smiles: '[O-][W](=O)(=O)[O-]' },
  { formula: 'TiO3^2-', name: 'Titanate Ion', smiles: '[O-][Ti](=O)[O-]' },
  { formula: 'ZrO3^2-', name: 'Zirconate Ion', smiles: '[O-][Zr](=O)[O-]' },
  { formula: 'NbO3-', name: 'Niobate Ion', smiles: '[O-][Nb](=O)=O' },
  { formula: 'TaO3-', name: 'Tantalate Ion', smiles: '[O-][Ta](=O)=O' },
  { formula: 'UO2^2+', name: 'Uranyl Ion', smiles: '[O+]=[U+4]=[O+]' },
  { formula: 'ThO2^2+', name: 'Thorium Dioxide Ion', smiles: '[O+]=[Th+4]=[O+]' },
  { formula: 'NpO2^2+', name: 'Neptunyl Ion', smiles: '[O+]=[Np+5]=[O+]' },
  { formula: 'PuO2^2+', name: 'Plutonium Dioxide Ion', smiles: '[O+]=[Pu+5]=[O+]' },
  { formula: 'AmO2^2+', name: 'Americium Dioxide Ion', smiles: '[O+]=[Am+5]=[O+]' },
  { formula: 'CmO2^2+', name: 'Curium Dioxide Ion', smiles: '[O+]=[Cm+5]=[O+]' },
  { formula: 'BkO2^2+', name: 'Berkelium Dioxide Ion', smiles: '[O+]=[Bk+5]=[O+]' },
  { formula: 'CfO2^2+', name: 'Californium Dioxide Ion', smiles: '[O+]=[Cf+5]=[O+]' },
  { formula: 'EsO2^2+', name: 'Einsteinium Dioxide Ion', smiles: '[O+]=[Es+5]=[O+]' },
  { formula: 'FmO2^2+', name: 'Fermium Dioxide Ion', smiles: '[O+]=[Fm+5]=[O+]' },
  { formula: 'MdO2^2+', name: 'Mendelevium Dioxide Ion', smiles: '[O+]=[Md+5]=[O+]' },
  { formula: 'NoO2^2+', name: 'Nobelium Dioxide Ion', smiles: '[O+]=[No+5]=[O+]' },
  { formula: 'LrO2^2+', name: 'Lawrencium Dioxide Ion', smiles: '[O+]=[Lr+5]=[O+]' },
  { formula: 'RfO2^2+', name: 'Rutherfordium Dioxide Ion', smiles: '[O+]=[Rf+5]=[O+]' },
  { formula: 'DbO2^2+', name: 'Dubnium Dioxide Ion', smiles: '[O+]=[Db+5]=[O+]' },
  { formula: 'SgO2^2+', name: 'Seaborgium Dioxide Ion', smiles: '[O+]=[Sg+5]=[O+]' },
  { formula: 'BhO2^2+', name: 'Bohrium Dioxide Ion', smiles: '[O+]=[Bh+5]=[O+]' },
  { formula: 'HsO2^2+', name: 'Hassium Dioxide Ion', smiles: '[O+]=[Hs+5]=[O+]' },
  { formula: 'MtO2^2+', name: 'Meitnerium Dioxide Ion', smiles: '[O+]=[Mt+5]=[O+]' },
  { formula: 'DsO2^2+', name: 'Darmstadtium Dioxide Ion', smiles: '[O+]=[Ds+5]=[O+]' },
  { formula: 'RgO2^2+', name: 'Roentgenium Dioxide Ion', smiles: '[O+]=[Rg+5]=[O+]' },
  { formula: 'CnO2^2+', name: 'Copernicium Dioxide Ion', smiles: '[O+]=[Cn+5]=[O+]' },
  { formula: 'NhO2^2+', name: 'Nihonium Dioxide Ion', smiles: '[O+]=[Nh+5]=[O+]' },
  { formula: 'FlO2^2+', name: 'Flerovium Dioxide Ion', smiles: '[O+]=[Fl+5]=[O+]' },
  { formula: 'McO2^2+', name: 'Moscovium Dioxide Ion', smiles: '[O+]=[Mc+5]=[O+]' },
  { formula: 'LvO2^2+', name: 'Livermorium Dioxide Ion', smiles: '[O+]=[Lv+5]=[O+]' },
  { formula: 'TsO2^2+', name: 'Tennessine Dioxide Ion', smiles: '[O+]=[Ts+5]=[O+]' },
  { formula: 'OgO2^2+', name: 'Oganesson Dioxide Ion', smiles: '[O+]=[Og+5]=[O+]' },
  { formula: 'FeO', name: 'Iron(II) Oxide', smiles: '[Fe+2].[O-2]' },
  { formula: 'CuO', name: 'Copper(II) Oxide', smiles: '[Cu+2].[O-2]' },
  { formula: 'AgCl', name: 'Silver Chloride', smiles: '[Ag+].[Cl-]' },
  { formula: 'CaO', name: 'Calcium Oxide', smiles: '[Ca+2].[O-2]' },
  { formula: 'MgO', name: 'Magnesium Oxide', smiles: '[Mg+2].[O-2]' },
  { formula: 'Na2O', name: 'Sodium Oxide', smiles: '[Na+].[Na+].[O-2]' },
  { formula: 'K2O', name: 'Potassium Oxide', smiles: '[K+].[K+].[O-2]' },
  { formula: 'Li2O', name: 'Lithium Oxide', smiles: '[Li+].[Li+].[O-2]' },
  { formula: 'BeO', name: 'Beryllium Oxide', smiles: '[Be+2].[O-2]' },
  { formula: 'B2O3', name: 'Boric Oxide', smiles: 'O=BOB=O' },
  { formula: 'CO', name: 'Carbon Monoxide', smiles: '[C-]#[O+]' },
  { formula: 'NO', name: 'Nitric Oxide', smiles: 'N=O' },
  { formula: 'SO2', name: 'Sulfur Dioxide', smiles: 'O=S=O' },
  { formula: 'SO3', name: 'Sulfur Trioxide', smiles: 'O=S(=O)=O' },
  { formula: 'H2S', name: 'Hydrogen Sulfide', smiles: 'S' },
  { formula: 'P4O10', name: 'Phosphorus Pentoxide', smiles: 'O=P12(OP3)(OP4)OP5.O=P67(OP8)(OP9)OP%10.O=P%11%12(OP%13)(OP%14)OP%15.O=P%16%17(OP%18)(OP%19)OP%20' },
  { formula: 'C2H5OH', name: 'Ethanol', smiles: 'CCO' },
  { formula: 'C6H12O6', name: 'Glucose', smiles: 'OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O' },
  { formula: 'C12H22O11', name: 'Sucrose', smiles: 'OC[C@H]1O[C@@H](OC2[C@H](O)[C@@H](O)[C@H](O)O2)[C@H](O)[C@@H](O)[C@@H]1O' },
  { formula: 'C2H4', name: 'Ethylene', smiles: 'C=C' },
  { formula: 'C2H6', name: 'Ethane', smiles: 'CC' },
  { formula: 'C3H8', name: 'Propane', smiles: 'CCC' },
  { formula: 'C4H10', name: 'Butane', smiles: 'CCCC' },
  { formula: 'C6H6', name: 'Benzene', smiles: 'c1ccccc1' },
  { formula: 'CH3COOH', name: 'Acetic Acid', smiles: 'CC(=O)O' },
  { formula: 'NH4Cl', name: 'Ammonium Chloride', smiles: '[NH4+].[Cl-]' },
  { formula: 'CaCl2', name: 'Calcium Chloride', smiles: '[Ca+2].[Cl-].[Cl-]' },
  { formula: 'MgCl2', name: 'Magnesium Chloride', smiles: '[Mg+2].[Cl-].[Cl-]' },
  { formula: 'AlCl3', name: 'Aluminum Chloride', smiles: '[Al+3].[Cl-].[Cl-].[Cl-]' },
  { formula: 'FeCl3', name: 'Iron(III) Chloride', smiles: '[Fe+3].[Cl-].[Cl-].[Cl-]' },
  { formula: 'CuCl2', name: 'Copper(II) Chloride', smiles: '[Cu+2].[Cl-].[Cl-]' },
  { formula: 'ZnCl2', name: 'Zinc Chloride', smiles: '[Zn+2].[Cl-].[Cl-]' },
  { formula: 'Na2CO3', name: 'Sodium Carbonate', smiles: '[Na+].[Na+].[O-]C([O-])=O' },
  { formula: 'MgCO3', name: 'Magnesium Carbonate', smiles: '[Mg+2].[O-]C([O-])=O' },
  { formula: 'BaCO3', name: 'Barium Carbonate', smiles: '[Ba+2].[O-]C([O-])=O' },
  { formula: 'NaHCO3', name: 'Sodium Bicarbonate', smiles: '[Na+].OC([O-])=O' },
  { formula: 'KHCO3', name: 'Potassium Bicarbonate', smiles: '[K+].OC([O-])=O' },
  { formula: 'CaSO4', name: 'Calcium Sulfate', smiles: '[Ca+2].[O-]S(=O)(=O)[O-]' },
  { formula: 'MgSO4', name: 'Magnesium Sulfate', smiles: '[Mg+2].[O-]S(=O)(=O)[O-]' },
  { formula: 'ZnSO4', name: 'Zinc Sulfate', smiles: '[Zn+2].[O-]S(=O)(=O)[O-]' },
  { formula: 'FeSO4', name: 'Iron(II) Sulfate', smiles: '[Fe+2].[O-]S(=O)(=O)[O-]' },
  { formula: 'Al2(SO4)3', name: 'Aluminum Sulfate', smiles: '[Al+3].[Al+3].[O-]S(=O)(=O)[O-].[O-]S(=O)(=O)[O-].[O-]S(=O)(=O)[O-]' },
  { formula: 'Na3PO4', name: 'Sodium Phosphate', smiles: '[Na+].[Na+].[Na+].[O-]P([O-])([O-])=O' },
  { formula: 'Ca3(PO4)2', name: 'Calcium Phosphate', smiles: '[Ca+2].[Ca+2].[Ca+2].[O-]P([O-])([O-])=O.[O-]P([O-])([O-])=O' },
  { formula: 'H3PO4', name: 'Phosphoric Acid', smiles: 'OP(O)(O)=O' },
  { formula: 'HNO3', name: 'Nitric Acid', smiles: 'O[N+](=O)[O-]' },
  { formula: 'HClO4', name: 'Perchloric Acid', smiles: 'OCl(=O)(=O)=O' },
  { formula: 'HCN', name: 'Hydrogen Cyanide', smiles: 'C#N' },
  { formula: 'H2O2', name: 'Hydrogen Peroxide', smiles: 'OO' },
  { formula: 'NaOCl', name: 'Sodium Hypochlorite', smiles: '[Na+].[O-]Cl' },
  { formula: 'KMnO4', name: 'Potassium Permanganate', smiles: '[K+].[O-][Mn](=O)(=O)=O' },
  { formula: 'K2Cr2O7', name: 'Potassium Dichromate', smiles: '[K+].[K+].[O-][Cr](=O)(=O)O[Cr](=O)(=O)[O-]' },
  { formula: 'Na2S2O3', name: 'Sodium Thiosulfate', smiles: '[Na+].[Na+].[O-]S(=O)SS(=O)[O-]' },
  { formula: 'Cu(OH)2', name: 'Copper(II) Hydroxide', smiles: '[Cu+2].[OH-].[OH-]' },
  { formula: 'Fe(OH)3', name: 'Iron(III) Hydroxide', smiles: '[Fe+3].[OH-].[OH-].[OH-]' },
  { formula: 'Al(OH)3', name: 'Aluminum Hydroxide', smiles: '[Al+3].[OH-].[OH-].[OH-]' },
  { formula: 'Ca(OH)2', name: 'Calcium Hydroxide', smiles: '[Ca+2].[OH-].[OH-]' },
  { formula: 'Mg(OH)2', name: 'Magnesium Hydroxide', smiles: '[Mg+2].[OH-].[OH-]' },
  { formula: 'KOH', name: 'Potassium Hydroxide', smiles: '[OH-].[K+]' },
  { formula: 'LiOH', name: 'Lithium Hydroxide', smiles: '[OH-].[Li+]' },
  { formula: 'Ba(OH)2', name: 'Barium Hydroxide', smiles: '[Ba+2].[OH-].[OH-]' },
  { formula: 'Sr(OH)2', name: 'Strontium Hydroxide', smiles: '[Sr+2].[OH-].[OH-]' },
  { formula: 'Be(OH)2', name: 'Beryllium Hydroxide', smiles: '[Be+2].[OH-].[OH-]' },
  { formula: 'Zn(OH)2', name: 'Zinc Hydroxide', smiles: '[Zn+2].[OH-].[OH-]' },
  { formula: 'Pb(OH)2', name: 'Lead(II) Hydroxide', smiles: '[Pb+2].[OH-].[OH-]' },
  { formula: 'Hg(OH)2', name: 'Mercury(II) Hydroxide', smiles: '[Hg+2].[OH-].[OH-]' },
  { formula: 'AgOH', name: 'Silver Hydroxide', smiles: '[Ag+].[OH-]' },
  { formula: 'CuOH', name: 'Copper(I) Hydroxide', smiles: '[Cu+].[OH-]' },
  { formula: 'FeOH', name: 'Iron(II) Hydroxide', smiles: '[Fe+].[OH-]' },
  { formula: 'Ni(OH)2', name: 'Nickel(II) Hydroxide', smiles: '[Ni+2].[OH-].[OH-]' },
  { formula: 'Co(OH)2', name: 'Cobalt(II) Hydroxide', smiles: '[Co+2].[OH-].[OH-]' },
  { formula: 'Mn(OH)2', name: 'Manganese(II) Hydroxide', smiles: '[Mn+2].[OH-].[OH-]' },
  { formula: 'Cr(OH)3', name: 'Chromium(III) Hydroxide', smiles: '[Cr+3].[OH-].[OH-].[OH-]' },
  { formula: 'Sn(OH)2', name: 'Tin(II) Hydroxide', smiles: '[Sn+2].[OH-].[OH-]' },
  { formula: 'Sb(OH)3', name: 'Antimony(III) Hydroxide', smiles: '[Sb+3].[OH-].[OH-].[OH-]' },
  { formula: 'Bi(OH)3', name: 'Bismuth(III) Hydroxide', smiles: '[Bi+3].[OH-].[OH-].[OH-]' },
  { formula: 'Ti(OH)4', name: 'Titanium(IV) Hydroxide', smiles: '[Ti+4].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Zr(OH)4', name: 'Zirconium(IV) Hydroxide', smiles: '[Zr+4].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Hf(OH)4', name: 'Hafnium(IV) Hydroxide', smiles: '[Hf+4].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'V(OH)4', name: 'Vanadium(IV) Hydroxide', smiles: '[V+4].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Nb(OH)5', name: 'Niobium(V) Hydroxide', smiles: '[Nb+5].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Ta(OH)5', name: 'Tantalum(V) Hydroxide', smiles: '[Ta+5].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Mo(OH)6', name: 'Molybdenum(VI) Hydroxide', smiles: '[Mo+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'W(OH)6', name: 'Tungsten(VI) Hydroxide', smiles: '[W+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'U(OH)6', name: 'Uranium(VI) Hydroxide', smiles: '[U+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Np(OH)4', name: 'Neptunium(IV) Hydroxide', smiles: '[Np+4].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Pu(OH)4', name: 'Plutonium(IV) Hydroxide', smiles: '[Pu+4].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Am(OH)3', name: 'Americium(III) Hydroxide', smiles: '[Am+3].[OH-].[OH-].[OH-]' },
  { formula: 'Cm(OH)3', name: 'Curium(III) Hydroxide', smiles: '[Cm+3].[OH-].[OH-].[OH-]' },
  { formula: 'Bk(OH)3', name: 'Berkelium(III) Hydroxide', smiles: '[Bk+3].[OH-].[OH-].[OH-]' },
  { formula: 'Cf(OH)3', name: 'Californium(III) Hydroxide', smiles: '[Cf+3].[OH-].[OH-].[OH-]' },
  { formula: 'Es(OH)3', name: 'Einsteinium(III) Hydroxide', smiles: '[Es+3].[OH-].[OH-].[OH-]' },
  { formula: 'Fm(OH)3', name: 'Fermium(III) Hydroxide', smiles: '[Fm+3].[OH-].[OH-].[OH-]' },
  { formula: 'Md(OH)3', name: 'Mendelevium(III) Hydroxide', smiles: '[Md+3].[OH-].[OH-].[OH-]' },
  { formula: 'No(OH)3', name: 'Nobelium(III) Hydroxide', smiles: '[No+3].[OH-].[OH-].[OH-]' },
  { formula: 'Lr(OH)3', name: 'Lawrencium(III) Hydroxide', smiles: '[Lr+3].[OH-].[OH-].[OH-]' },
  { formula: 'Rf(OH)4', name: 'Rutherfordium(IV) Hydroxide', smiles: '[Rf+4].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Db(OH)5', name: 'Dubnium(V) Hydroxide', smiles: '[Db+5].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Sg(OH)6', name: 'Seaborgium(VI) Hydroxide', smiles: '[Sg+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Bh(OH)7', name: 'Bohrium(VII) Hydroxide', smiles: '[Bh+7].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Hs(OH)8', name: 'Hassium(VIII) Hydroxide', smiles: '[Hs+8].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Mt(OH)9', name: 'Meitnerium(IX) Hydroxide', smiles: '[Mt+9].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Ds(OH)10', name: 'Darmstadtium(X) Hydroxide', smiles: '[Ds+10].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Rg(OH)11', name: 'Roentgenium(XI) Hydroxide', smiles: '[Rg+11].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Cn(OH)2', name: 'Copernicium(II) Hydroxide', smiles: '[Cn+2].[OH-].[OH-]' },
  { formula: 'Nh(OH)3', name: 'Nihonium(III) Hydroxide', smiles: '[Nh+3].[OH-].[OH-].[OH-]' },
  { formula: 'Fl(OH)4', name: 'Flerovium(IV) Hydroxide', smiles: '[Fl+4].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Mc(OH)5', name: 'Moscovium(V) Hydroxide', smiles: '[Mc+5].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Lv(OH)6', name: 'Livermorium(VI) Hydroxide', smiles: '[Lv+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Ts(OH)7', name: 'Tennessine(VII) Hydroxide', smiles: '[Ts+7].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Og(OH)8', name: 'Oganesson(VIII) Hydroxide', smiles: '[Og+8].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
];

export const reactions: Reaction[] = [
  // METAL HYDRIDE FORMATION
  { id: 'lih', reactants: ['Li', 'H2'], eq: 'Li + H₂ → LiH', balanced: '2Li + H₂ → 2LiH', products: ['LiH'], type: 'synthesis', visual: 'absorb', color: 'hsl(0,0%,90%)', enthalpy: -90.5, desc: 'Lithium reacts with hydrogen gas to form lithium hydride.', temp: '300-400°C', realUse: 'Hydrogen storage, reducing agent' },
  { id: 'nah', reactants: ['Na', 'H2'], eq: 'Na + H₂ → NaH', balanced: '2Na + H₂ → 2NaH', products: ['NaH'], type: 'synthesis', visual: 'absorb', color: 'hsl(45,90%,60%)', enthalpy: -56.3, desc: 'Sodium reacts with hydrogen to form sodium hydride.', temp: '200-300°C', realUse: 'Strong base in organic synthesis' },
  { id: 'kh', reactants: ['K', 'H2'], eq: 'K + H₂ → KH', balanced: '2K + H₂ → 2KH', products: ['KH'], type: 'synthesis', visual: 'absorb', color: 'hsl(280,60%,65%)', enthalpy: -58.2, desc: 'Potassium reacts with hydrogen to form potassium hydride.', temp: '200-300°C', realUse: 'Superbase, organic synthesis' },
  { id: 'cah2', reactants: ['Ca', 'H2'], eq: 'Ca + H₂ → CaH₂', balanced: 'Ca + H₂ → CaH₂', products: ['CaH2'], type: 'synthesis', visual: 'absorb', color: 'hsl(0,0%,95%)', enthalpy: -186.2, desc: 'Calcium reacts with hydrogen to form calcium hydride.', temp: '300-400°C', realUse: 'Drying agent, portable hydrogen source' },
  { id: 'mgh2', reactants: ['Mg', 'H2'], eq: 'Mg + H₂ → MgH₂', balanced: 'Mg + H₂ → MgH₂', products: ['MgH2'], type: 'synthesis', visual: 'absorb', color: 'hsl(120,50%,60%)', enthalpy: -75.3, desc: 'Magnesium reacts with hydrogen to form magnesium hydride.', temp: '300-400°C, high pressure', realUse: 'Hydrogen storage research' },

  // METAL OXIDE FORMATION
  { id: 'li-o2', reactants: ['Li', 'O2'], eq: 'Li + O₂ → Li₂O', balanced: '4Li + O₂ → 2Li₂O', products: ['Li₂O'], type: 'oxidation', visual: 'glow', color: 'hsl(0,0%,90%)', enthalpy: -598.0, desc: 'Lithium burns with crimson flame forming lithium oxide.', temp: '>180°C', realUse: 'Glass, ceramics, batteries' },
  { id: 'na-o2', reactants: ['Na', 'O2'], eq: 'Na + O₂ → Na₂O', balanced: '4Na + O₂ → 2Na₂O', products: ['Na₂O'], type: 'oxidation', visual: 'fire', color: 'hsl(45,100%,60%)', enthalpy: -414.0, desc: 'Sodium burns with yellow flame forming sodium oxide.', temp: '>200°C', realUse: 'Glass manufacture, chemical reagent' },
  { id: 'k-o2', reactants: ['K', 'O2'], eq: 'K + O₂ → K₂O', balanced: '4K + O₂ → 2K₂O', products: ['K₂O'], type: 'oxidation', visual: 'fire', color: 'hsl(280,60%,65%)', enthalpy: -363.0, desc: 'Potassium burns with lilac flame forming potassium oxide.', temp: 'Room temp (slow)', realUse: 'Fertilizers, glass' },
  { id: 'ca-o2', reactants: ['Ca', 'O2'], eq: 'Ca + O₂ → CaO', balanced: '2Ca + O₂ → 2CaO', products: ['CaO'], type: 'oxidation', visual: 'glow', color: 'hsl(0,0%,85%)', enthalpy: -635.0, desc: 'Calcium burns in air forming calcium oxide.', temp: '~300°C', realUse: 'Cement, steelmaking', smiles: 'O=[Ca]' },
  { id: 'mg-o2', reactants: ['Mg', 'O2'], eq: 'Mg + O₂ → MgO', balanced: '2Mg + O₂ → 2MgO', products: ['MgO'], type: 'combustion', visual: 'glow', color: 'hsl(0,0%,95%)', enthalpy: -601.6, desc: 'Magnesium burns with intense white flame producing MgO.', safety: '⚠️ Very bright! Do NOT look!', temp: 'Ignition ~473°C', realUse: 'Fireworks, flares, insulation', smiles: 'O=[Mg]' },

  // METAL HALIDE FORMATION
  { id: 'na-cl2', reactants: ['Na', 'Cl2'], eq: 'Na + Cl₂ → NaCl', balanced: '2Na + Cl₂ → 2NaCl', products: ['NaCl'], type: 'synthesis', visual: 'spark', color: 'hsl(45,90%,70%)', enthalpy: -411.2, desc: 'Sodium reacts vigorously with chlorine gas forming sodium chloride.', safety: '⚠️ Violent! Cl₂ is toxic.', temp: '~250°C', realUse: 'Table salt, brine electrolysis', smiles: '[Na+].[Cl-]' },
  { id: 'k-cl2', reactants: ['K', 'Cl2'], eq: 'K + Cl₂ → KCl', balanced: '2K + Cl₂ → 2KCl', products: ['KCl'], type: 'synthesis', visual: 'spark', color: 'hsl(280,50%,55%)', enthalpy: -436.7, desc: 'Potassium reacts with chlorine forming KCl.', safety: '⚠️ Very violent!', temp: 'Room temp', realUse: 'Fertilizer, salt substitute', smiles: '[K+].[Cl-]' },
  { id: 'ca-cl2', reactants: ['Ca', 'Cl2'], eq: 'Ca + Cl₂ → CaCl₂', balanced: 'Ca + Cl₂ → CaCl₂', products: ['CaCl2'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,90%)', enthalpy: -795.8, desc: 'Calcium reacts with chlorine.', safety: '⚠️ Cl₂ is toxic!', temp: 'Room temp', realUse: 'De-icing, food additive', smiles: '[Ca+2].[Cl-].[Cl-]' },
  { id: 'mg-cl2', reactants: ['Mg', 'Cl2'], eq: 'Mg + Cl₂ → MgCl₂', balanced: 'Mg + Cl₂ → MgCl₂', products: ['MgCl2'], type: 'synthesis', visual: 'spark', color: 'hsl(120,50%,55%)', enthalpy: -641.3, desc: 'Magnesium reacts with chlorine.', safety: '⚠️ Cl₂ is toxic!', temp: 'Room temp', realUse: 'Magnesium chloride production', smiles: '[Mg+2].[Cl-].[Cl-]' },
  { id: 'al-cl2', reactants: ['Al', 'Cl2'], eq: 'Al + Cl₂ → AlCl₃', balanced: '2Al + 3Cl₂ → 2AlCl₃', products: ['AlCl3'], type: 'synthesis', visual: 'spark', color: 'hsl(200,30%,70%)', enthalpy: -1407.0, desc: 'Aluminum reacts with chlorine.', safety: '⚠️ Cl₂ is toxic!', temp: 'Room temp', realUse: 'Catalysis, aluminum chloride production', smiles: '[Al+3].[Cl-].[Cl-].[Cl-]' },

  // WATER + METAL REACTIONS (Consolidated)
  { id: 'lih2o', reactants: ['Li', 'H2O'], eq: 'Li + H₂O → LiOH + H₂', balanced: '2Li + 2H₂O → 2LiOH + H₂↑', products: ['LiOH', 'H2'], type: 'single-replacement', visual: 'bubbles', color: 'hsl(0,70%,55%)', enthalpy: -222.8, desc: 'Lithium reacts with water producing hydrogen.', temp: 'Room temp', realUse: 'Battery chemistry, lithium extraction', smiles: '[Li+].[OH-]' },
  { id: 'nah2o', reactants: ['Na', 'H2O'], eq: 'Na + H₂O → NaOH + H₂', balanced: '2Na + 2H₂O → 2NaOH + H₂↑', products: ['NaOH', 'H2'], type: 'single-replacement', visual: 'fire', color: 'hsl(45,100%,60%)', enthalpy: -184.0, desc: 'Sodium reacts vigorously with water.', safety: '⚠️ VIOLENT!', temp: 'Spontaneous', realUse: 'NaOH production', smiles: '[Na+].[OH-]' },
  { id: 'kh2o', reactants: ['K', 'H2O'], eq: 'K + H₂O → KOH + H₂', balanced: '2K + 2H₂O → 2KOH + H₂↑', products: ['KOH', 'H2'], type: 'single-replacement', visual: 'explosion', color: 'hsl(280,60%,65%)', enthalpy: -196.0, desc: 'Potassium explodes in water.', safety: '⚠️ CATASTROPHIC!', temp: 'Spontaneous', realUse: 'KOH production', smiles: '[K+].[OH-]' },
  { id: 'cah2o', reactants: ['Ca', 'H2O'], eq: 'Ca + H₂O → Ca(OH)₂ + H₂', balanced: 'Ca + 2H₂O → Ca(OH)₂ + H₂↑', products: ['Ca(OH)2', 'H2'], type: 'single-replacement', visual: 'bubbles', color: 'hsl(180,40%,60%)', enthalpy: -109.0, desc: 'Calcium reacts steadily with water.', temp: 'Room temp', realUse: 'Hydrogen generation', smiles: '[Ca+2].[OH-].[OH-]' },
  { id: 'mgh2o', reactants: ['Mg', 'H2O'], eq: 'Mg + H₂O → Mg(OH)₂ + H₂', balanced: 'Mg + 2H₂O → Mg(OH)₂ + H₂↑', products: ['Mg(OH)2', 'H2'], type: 'single-replacement', visual: 'bubbles', color: 'hsl(120,50%,55%)', enthalpy: -83.0, desc: 'Magnesium reacts with hot water.', temp: '~100°C', realUse: 'Hydrogen generation', smiles: '[Mg+2].[OH-].[OH-]' },


  // ACID + METAL REACTIONS
  { id: 'hcl-na', reactants: ['HCl', 'Na'], eq: 'HCl + Na → NaCl + H₂', balanced: '2HCl + 2Na → 2NaCl + H₂↑', products: ['NaCl', 'H2'], type: 'single-replacement', visual: 'bubbles', color: 'hsl(45,90%,70%)', enthalpy: -191.0, desc: 'Sodium dissolves in acid producing hydrogen.', safety: '⚠️ Violent reaction!', temp: 'Room temp', realUse: 'Salt production, hydrogen generation', smiles: '[Na+].[Cl-]' },
  { id: 'hcl-k', reactants: ['HCl', 'K'], eq: 'HCl + K → KCl + H₂', balanced: '2HCl + 2K → 2KCl + H₂↑', products: ['KCl', 'H2'], type: 'single-replacement', visual: 'bubbles', color: 'hsl(280,60%,65%)', enthalpy: -202.0, desc: 'Potassium dissolves in acid producing hydrogen.', safety: '⚠️ Violent reaction!', temp: 'Room temp', realUse: 'Hydrogen generation, salt production', smiles: '[K+].[Cl-]' },
  { id: 'hcl-ca', reactants: ['HCl', 'Ca'], eq: 'HCl + Ca → CaCl₂ + H₂', balanced: '2HCl + Ca → CaCl₂ + H₂↑', products: ['CaCl2', 'H2'], type: 'single-replacement', visual: 'bubbles', color: 'hsl(180,40%,60%)', enthalpy: -144.0, desc: 'Calcium dissolves in acid producing hydrogen.', temp: 'Room temp', realUse: 'Hydrogen generation, calcium chloride production', smiles: '[Ca+2].[Cl-].[Cl-]' },
  { id: 'hcl-mg', reactants: ['HCl', 'Mg'], eq: 'HCl + Mg → MgCl₂ + H₂', balanced: '2HCl + Mg → MgCl₂ + H₂↑', products: ['MgCl2', 'H2'], type: 'single-replacement', visual: 'bubbles', color: 'hsl(120,50%,55%)', enthalpy: -111.0, desc: 'Magnesium dissolves in acid producing hydrogen.', temp: 'Room temp', realUse: 'Hydrogen generation, magnesium chloride production', smiles: '[Mg+2].[Cl-].[Cl-]' },
  { id: 'hcl-zn', reactants: ['HCl', 'Zn'], eq: 'HCl + Zn → ZnCl₂ + H₂', balanced: '2HCl + Zn → ZnCl₂ + H₂↑', products: ['ZnCl2', 'H2'], type: 'single-replacement', visual: 'bubbles', color: 'hsl(180,20%,60%)', enthalpy: -153.9, desc: 'Zinc dissolves in acid producing hydrogen bubbles.', temp: 'Room temp', realUse: 'Hydrogen generation, galvanizing', smiles: '[Zn+2].[Cl-].[Cl-]' },
  { id: 'hcl-fe', reactants: ['HCl', 'Fe'], eq: 'HCl + Fe → FeCl₂ + H₂', balanced: '2HCl + Fe → FeCl₂ + H₂↑', products: ['FeCl2', 'H2'], type: 'single-replacement', visual: 'bubbles', color: 'hsl(15,40%,50%)', enthalpy: -87.9, desc: 'Iron dissolves in acid producing hydrogen.', temp: 'Room temp', realUse: 'Steel pickling, hydrogen generation', smiles: '[Fe+2].[Cl-].[Cl-]' },
  { id: 'hcl-al', reactants: ['HCl', 'Al'], eq: 'HCl + Al → AlCl₃ + H₂', balanced: '6HCl + 2Al → 2AlCl₃ + 3H₂↑', products: ['AlCl3', 'H2'], type: 'single-replacement', visual: 'bubbles', color: 'hsl(200,30%,70%)', enthalpy: -104.0, desc: 'Aluminum dissolves in acid producing hydrogen.', temp: 'Room temp', realUse: 'Aluminum etching, hydrogen generation', smiles: '[Al+3].[Cl-].[Cl-].[Cl-]' },

  // ACID-BASE NEUTRALIZATION REACTIONS
  { id: 'hcl-naoh', reactants: ['HCl', 'NaOH'], eq: 'HCl + NaOH → NaCl + H₂O', balanced: 'HCl + NaOH → NaCl + H₂O', products: ['NaCl', 'H2O'], type: 'acid-base', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -55.8, desc: 'Neutralization: acid + base → salt + water.', temp: 'Room temp', realUse: 'pH control, salt production', smiles: '[Na+].[Cl-]' },
  { id: 'hcl-koh', reactants: ['HCl', 'KOH'], eq: 'HCl + KOH → KCl + H₂O', balanced: 'HCl + KOH → KCl + H₂O', products: ['KCl', 'H2O'], type: 'acid-base', visual: 'dissolve', color: 'hsl(280,50%,60%)', enthalpy: -57.3, desc: 'Potassium hydroxide neutralizes hydrochloric acid.', temp: 'Room temp', realUse: 'Salt production, pH control', smiles: '[K+].[Cl-]' },
  { id: 'hcl-caoh2', reactants: ['HCl', 'Ca(OH)2'], eq: 'HCl + Ca(OH)₂ → CaCl₂ + H₂O', balanced: '2HCl + Ca(OH)₂ → CaCl₂ + 2H₂O', products: ['CaCl2', 'H2O'], type: 'acid-base', visual: 'dissolve', color: 'hsl(180,40%,60%)', enthalpy: -114.0, desc: 'Calcium hydroxide neutralizes hydrochloric acid.', temp: 'Room temp', realUse: 'Water treatment, antacid', smiles: '[Ca+2].[Cl-].[Cl-]' },
  { id: 'hcl-mgoh2', reactants: ['HCl', 'Mg(OH)2'], eq: 'HCl + Mg(OH)₂ → MgCl₂ + H₂O', balanced: '2HCl + Mg(OH)₂ → MgCl₂ + 2H₂O', products: ['MgCl2', 'H2O'], type: 'acid-base', visual: 'dissolve', color: 'hsl(120,50%,60%)', enthalpy: -106.0, desc: 'Magnesium hydroxide neutralizes hydrochloric acid.', temp: 'Room temp', realUse: 'Antacid production', smiles: '[Mg+2].[Cl-].[Cl-]' },
  { id: 'h2so4-naoh', reactants: ['H2SO4', 'NaOH'], eq: 'H₂SO₄ + NaOH → NaHSO₄ + H₂O', balanced: 'H₂SO₄ + NaOH → NaHSO₄ + H₂O', products: ['NaHSO4', 'H2O'], type: 'acid-base', visual: 'dissolve', color: 'hsl(45,60%,70%)', enthalpy: -57.3, desc: 'Partial neutralization of sulfuric acid.', temp: 'Room temp', realUse: 'pH control, detergents', smiles: '[Na+].OS(=O)(=O)[O-]' },
  { id: 'h2so4-caoh2', reactants: ['H2SO4', 'Ca(OH)2'], eq: 'H₂SO₄ + Ca(OH)₂ → CaSO₄ + 2H₂O', balanced: 'H₂SO₄ + Ca(OH)₂ → CaSO₄ + 2H₂O', products: ['CaSO4', 'H2O'], type: 'acid-base', visual: 'precipitate', color: 'hsl(0,0%,90%)', enthalpy: -106.7, desc: 'Calcium hydroxide neutralizes sulfuric acid.', temp: 'Room temp', realUse: 'Gypsum production, water treatment', smiles: '[Ca+2].OS(=O)(=O)[O-]' },
  { id: 'h2so4-mgoh2', reactants: ['H2SO4', 'Mg(OH)2'], eq: 'H₂SO₄ + Mg(OH)₂ → MgSO₄ + 2H₂O', balanced: 'H₂SO₄ + Mg(OH)₂ → MgSO₄ + 2H₂O', products: ['MgSO4', 'H2O'], type: 'acid-base', visual: 'dissolve', color: 'hsl(120,50%,60%)', enthalpy: -106.0, desc: 'Magnesium hydroxide neutralizes sulfuric acid.', temp: 'Room temp', realUse: 'Magnesium sulfate production, antacid', smiles: '[Mg+2].OS(=O)(=O)[O-]' },
  { id: 'hno3-naoh', reactants: ['HNO3', 'NaOH'], eq: 'HNO₃ + NaOH → NaNO₃ + H₂O', balanced: 'HNO₃ + NaOH → NaNO₃ + H₂O', products: ['NaNO3', 'H2O'], type: 'acid-base', visual: 'dissolve', color: 'hsl(45,60%,70%)', enthalpy: -57.3, desc: 'Nitric acid neutralizes sodium hydroxide.', temp: 'Room temp', realUse: 'Fertilizer production', smiles: '[Na+].[O-][N+](=O)[O-]' },
  { id: 'hno3-koh', reactants: ['HNO3', 'KOH'], eq: 'HNO₃ + KOH → KNO₃ + H₂O', balanced: 'HNO₃ + KOH → KNO₃ + H₂O', products: ['KNO3', 'H2O'], type: 'acid-base', visual: 'dissolve', color: 'hsl(280,50%,60%)', enthalpy: -57.3, desc: 'Potassium hydroxide neutralizes nitric acid.', temp: 'Room temp', realUse: 'Salt production, explosives', smiles: '[K+].[O-][N+](=O)[O-]' },

  // CARBONATE + ACID REACTIONS
  { id: 'caco3-hcl', reactants: ['CaCO3', 'HCl'], eq: 'CaCO₃ + HCl → CaCl₂ + H₂O + CO₂', balanced: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑', products: ['CaCl2', 'H2O', 'CO2'], type: 'acid-base', visual: 'effervescence', color: 'hsl(180,40%,60%)', enthalpy: -15.0, desc: 'Carbonate reacts with acid producing CO₂ gas.', temp: 'Room temp', realUse: 'Limestone caves, digestion', smiles: '[Ca+2].[Cl-].[Cl-]' },
  { id: 'caco3-h2so4', reactants: ['CaCO3', 'H2SO4'], eq: 'CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂', balanced: 'CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑', products: ['CaSO4', 'H2O', 'CO2'], type: 'acid-base', visual: 'effervescence', color: 'hsl(0,0%,90%)', enthalpy: -16.0, desc: 'Sulfuric acid reacts with limestone.', temp: 'Room temp', realUse: 'Gypsum production, mining', smiles: '[Ca+2].OS(=O)(=O)[O-]' },
  { id: 'caco3-hno3', reactants: ['CaCO3', 'HNO3'], eq: 'CaCO₃ + HNO₃ → Ca(NO₃)₂ + H₂O + CO₂', balanced: 'CaCO₃ + 2HNO₃ → Ca(NO₃)₂ + H₂O + CO₂↑', products: ['Ca(NO3)2', 'H2O', 'CO2'], type: 'acid-base', visual: 'effervescence', color: 'hsl(45,60%,70%)', enthalpy: -15.0, desc: 'Nitric acid dissolves calcium carbonate.', temp: 'Room temp', realUse: 'Fertilizer production', smiles: '[Ca+2].[O-][N+](=O)[O-].[O-][N+](=O)[O-]' },
  { id: 'mgco3-hcl', reactants: ['MgCO3', 'HCl'], eq: 'MgCO₃ + HCl → MgCl₂ + H₂O + CO₂', balanced: 'MgCO₃ + 2HCl → MgCl₂ + H₂O + CO₂↑', products: ['MgCl2', 'H2O', 'CO2'], type: 'acid-base', visual: 'effervescence', color: 'hsl(120,50%,55%)', enthalpy: -15.0, desc: 'Magnesium carbonate reacts with acid.', temp: 'Room temp', realUse: 'Antacid production', smiles: '[Mg+2].[Cl-].[Cl-]' },
  { id: 'naco3-hcl', reactants: ['Na2CO3', 'HCl'], eq: 'Na₂CO₃ + HCl → NaHCO₃ + NaCl', balanced: 'Na₂CO₃ + HCl → NaHCO₃ + NaCl', products: ['NaHCO3', 'NaCl'], type: 'acid-base', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -28.0, desc: 'Partial neutralization of sodium carbonate.', temp: 'Room temp', realUse: 'Baking soda production', smiles: '[Na+].[Na+].[Cl-]' },

  // PRECIPITATION REACTIONS
  { id: 'agno3-nacl', reactants: ['AgNO3', 'NaCl'], eq: 'AgNO₃ + NaCl → AgCl + NaNO₃', balanced: 'AgNO₃ + NaCl → AgCl↓ + NaNO₃', products: ['AgCl', 'NaNO3'], type: 'precipitation', visual: 'precipitate', color: 'hsl(0,0%,75%)', enthalpy: -33.4, desc: 'Double replacement forms insoluble AgCl.', temp: 'Room temp', realUse: 'Qualitative analysis, photography', smiles: '[Ag+].[Cl-]' },
  { id: 'pbno32-nacl', reactants: ['Pb(NO3)2', 'NaCl'], eq: 'Pb(NO₃)₂ + NaCl → PbCl₂ + NaNO₃', balanced: 'Pb(NO₃)₂ + 2NaCl → PbCl₂↓ + 2NaNO₃', products: ['PbCl2', 'NaNO3'], type: 'precipitation', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -26.8, desc: 'Lead chloride precipitates from solution.', safety: '⚠️ Pb is toxic!', temp: 'Room temp', realUse: 'Research, pigments', smiles: '[Pb+2].[Cl-].[Cl-]' },
  { id: 'bacl2-na2so4', reactants: ['BaCl2', 'Na2SO4'], eq: 'BaCl₂ + Na₂SO₄ → BaSO₄ + NaCl', balanced: 'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl', products: ['BaSO4', 'NaCl'], type: 'precipitation', visual: 'precipitate', color: 'hsl(0,0%,95%)', enthalpy: -35.7, desc: 'Barium sulfate forms white precipitate.', temp: 'Room temp', realUse: 'X-ray contrast, paints', smiles: '[Ba+2].OS(=O)(=O)[O-]' },
  { id: 'cacl2-na2co3', reactants: ['CaCl2', 'Na2CO3'], eq: 'CaCl₂ + Na₂CO₃ → CaCO₃ + NaCl', balanced: 'CaCl₂ + Na₂CO₃ → CaCO₃↓ + 2NaCl', products: ['CaCO3', 'NaCl'], type: 'precipitation', visual: 'precipitate', color: 'hsl(180,40%,60%)', enthalpy: -12.6, desc: 'Calcium carbonate precipitates.', temp: 'Room temp', realUse: 'Water softening, chalk production', smiles: '[Ca+2].[O-]C([O-])=O' },
  { id: 'znso4-na2s', reactants: ['ZnSO4', 'Na2S'], eq: 'ZnSO₄ + Na₂S → ZnS + Na₂SO₄', balanced: 'ZnSO₄ + Na₂S → ZnS↓ + Na₂SO₄', products: ['ZnS', 'Na2SO4'], type: 'precipitation', visual: 'precipitate', color: 'hsl(60,60%,60%)', enthalpy: -24.7, desc: 'Zinc sulfide forms white precipitate.', temp: 'Room temp', realUse: 'Phosphors, pigments', smiles: '[Zn+2].[S-2]' },

  // REDOX REACTIONS
  { id: 'kmno4-feso4', reactants: ['KMnO4', 'FeSO4', 'H2SO4'], eq: 'KMnO₄ + FeSO₄ + H₂SO₄ → MnSO₄ + Fe₂(SO₄)₃ + K₂SO₄ + H₂O', balanced: '2KMnO₄ + 10FeSO₄ + 8H₂SO₄ → 2MnSO₄ + 5Fe₂(SO₄)₃ + K₂SO₄ + 8H₂O', products: ['MnSO4', 'Fe2(SO4)3', 'K2SO4', 'H2O'], type: 'redox', visual: 'color-change', color: 'hsl(300,60%,40%)', enthalpy: -165.0, desc: 'Potassium permanganate oxidizes iron(II) in acidic solution.', temp: 'Room temp', realUse: 'Analytical chemistry, water treatment', smiles: '[Mn+2].[O-]S(=O)(=O)[O-]' },
  { id: 'h2o2-mno2', reactants: ['H2O2', 'MnO2'], eq: 'H₂O₂ —(MnO₂)→ H₂O + O₂', balanced: '2H₂O₂ → 2H₂O + O₂↑', products: ['H2O', 'O2'], type: 'decomposition', visual: 'bubbles', color: 'hsl(200,50%,70%)', enthalpy: -196.0, desc: 'Hydrogen peroxide decomposes rapidly in the presence of MnO₂ catalyst.', catalyst: 'MnO₂', temp: 'Room temp', realUse: 'Oxygen generation', smiles: 'O=O' },
  { id: 'cu2-ag', reactants: ['CuSO4', 'Ag'], eq: 'Cu²⁺ + Ag → Cu + Ag⁺', balanced: 'Cu²⁺ + 2Ag → Cu + 2Ag⁺', products: ['Cu', 'Ag+'], type: 'redox', visual: 'precipitate', color: 'hsl(45,80%,60%)', enthalpy: -146.0, desc: 'Copper displaces silver from solution.', temp: 'Room temp', realUse: 'Silver recovery, electroplating', smiles: '[Cu]' },

  // COMBUSTION REACTIONS
  { id: 'ch4-o2', reactants: ['CH4', 'O2'], eq: 'CH₄ + O₂ → CO₂ + H₂O', balanced: 'CH₄ + 2O₂ → CO₂ + 2H₂O', products: ['CO2', 'H2O'], type: 'combustion', visual: 'fire', color: 'hsl(0,0%,95%)', enthalpy: -890.4, desc: 'Methane combustion — natural gas burning.', temp: 'Ignition ~595°C', realUse: 'Heating, cooking, energy', smiles: 'O=C=O' },
  { id: 'c-o2', reactants: ['C', 'O2'], eq: 'C + O₂ → CO₂', balanced: 'C + O₂ → CO₂', products: ['CO2'], type: 'combustion', visual: 'glow', color: 'hsl(0,0%,20%)', enthalpy: -393.5, desc: 'Carbon burns to form carbon dioxide.', temp: 'Ignition ~700°C', realUse: 'Steel production, respiration', smiles: 'O=C=O' },
  { id: 'h2-o2', reactants: ['H2', 'O2'], eq: 'H₂ + O₂ → H₂O', balanced: '2H₂ + O₂ → 2H₂O', products: ['H2O'], type: 'combustion', visual: 'explosion', color: 'hsl(200,80%,60%)', enthalpy: -285.8, desc: 'Hydrogen combusts in oxygen producing water. Extremely exothermic.', safety: '⚠️ EXPLOSIVE mixture!', temp: 'Ignition ~500°C', realUse: 'Rocket fuel, fuel cells, energy', smiles: 'O' },
  { id: 'co-o2', reactants: ['CO', 'O2'], eq: 'CO + O₂ → CO₂', balanced: '2CO + O₂ → 2CO₂', products: ['CO2'], type: 'combustion', visual: 'fire', color: 'hsl(0,0%,90%)', enthalpy: -283.0, desc: 'Carbon monoxide burns to carbon dioxide.', safety: '⚠️ CO is toxic!', temp: 'Room temp', realUse: 'Industrial furnaces', smiles: 'O=C=O' },
  { id: 'c2h5oh-o2', reactants: ['C2H5OH', 'O2'], eq: 'C₂H₅OH + O₂ → CO₂ + H₂O', balanced: 'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O', products: ['CO2', 'H2O'], type: 'combustion', visual: 'fire', color: 'hsl(45,60%,70%)', enthalpy: -1367.0, desc: 'Ethanol combustion — alcohol burning.', temp: 'Ignition ~365°C', realUse: 'Biofuels, spirits', smiles: 'O=C=O' },

  // DECOMPOSITION REACTIONS
  { id: 'h2o2-decomp', reactants: ['H2O2'], eq: 'H₂O₂ → H₂O + O₂', balanced: '2H₂O₂ → 2H₂O + O₂↑', products: ['H2O', 'O2'], type: 'decomposition', visual: 'bubbles', color: 'hsl(200,50%,70%)', enthalpy: 196.0, desc: 'Hydrogen peroxide decomposes to water and oxygen.', catalyst: 'MnO₂ or enzyme', temp: 'Room temp', realUse: 'Disinfectant, bleaching', smiles: 'O=O' },
  { id: 'caco3-decomp', reactants: ['CaCO3'], eq: 'CaCO₃ → CaO + CO₂', balanced: 'CaCO₃ → CaO + CO₂↑', products: ['CaO', 'CO2'], type: 'decomposition', visual: 'effervescence', color: 'hsl(0,0%,85%)', enthalpy: 178.0, desc: 'Limestone decomposes to lime and carbon dioxide.', temp: '~900°C', realUse: 'Cement production, lime kilns', smiles: 'O=[Ca]' },
  { id: 'nacl-decomp', reactants: ['NaCl'], eq: 'NaCl → Na + Cl₂', balanced: '2NaCl → 2Na + Cl₂↑', products: ['Na', 'Cl2'], type: 'decomposition', visual: 'spark', color: 'hsl(45,90%,70%)', enthalpy: 411.0, desc: 'Electrolysis of sodium chloride.', temp: 'Molten salt electrolysis', realUse: 'Chlorine production, sodium metal', smiles: '[Na]' },
  { id: 'h2so4-decomp', reactants: ['H2SO4'], eq: 'H₂SO₄ → SO₃ + H₂O', balanced: 'H₂SO₄ → SO₃ + H₂O', products: ['SO3', 'H2O'], type: 'decomposition', visual: 'vapor', color: 'hsl(45,60%,70%)', enthalpy: 132.0, desc: 'Sulfuric acid decomposes on heating.', temp: '~300°C', realUse: 'Oleum production', smiles: 'O=S(=O)=O' },

  // SYNTHESIS REACTIONS
  { id: 'h2-s', reactants: ['H2', 'S'], eq: 'H₂ + S → H₂S', balanced: 'H₂ + S → H₂S', products: ['H2S'], type: 'synthesis', visual: 'gas-release', color: 'hsl(120,60%,45%)', enthalpy: -20.6, desc: 'Hydrogen and sulfur form toxic rotten-egg gas.', safety: '⚠️ H₂S is toxic!', temp: '>100°C', realUse: 'Analytical chemistry, waste treatment', smiles: 'S' },
  { id: 'n2-h2', reactants: ['N2', 'H2'], eq: 'N₂ + H₂ → NH₃', balanced: 'N₂ + 3H₂ ⇌ 2NH₃', products: ['NH3'], type: 'synthesis', visual: 'gas-release', color: 'hsl(200,30%,70%)', enthalpy: -92.2, desc: 'Haber process — feeds billions through fertilizers! Industrial scale.', catalyst: 'Iron catalyst', temp: '400-500°C, 150-300 atm', realUse: 'Fertilizers, explosives, coolant', smiles: 'N' },
  { id: 'co-h2', reactants: ['CO', 'H2'], eq: 'CO + H₂ → CH₃OH', balanced: 'CO + 2H₂ → CH₃OH', products: ['CH3OH'], type: 'synthesis', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -90.7, desc: 'Methanol synthesis from syngas.', catalyst: 'Cu/ZnO/Al₂O₃', temp: '200-300°C, 50-100 atm', realUse: 'Fuel production, chemicals', smiles: 'CO' },


  // METAL HALIDE FORMATION


  // DOUBLE REPLACEMENT REACTIONS
  { id: 'nacl-agno3', reactants: ['NaCl', 'AgNO3'], eq: 'NaCl + AgNO₃ → NaNO₃ + AgCl', balanced: 'NaCl + AgNO₃ → NaNO₃ + AgCl↓', products: ['NaNO3', 'AgCl'], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,75%)', enthalpy: -33.4, desc: 'Silver chloride precipitates in double replacement.', temp: 'Room temp', realUse: 'Qualitative analysis, photography', smiles: '[Ag+].[Cl-]' },
  { id: 'nacl-pbno32', reactants: ['NaCl', 'Pb(NO3)2'], eq: 'NaCl + Pb(NO₃)₂ → NaNO₃ + PbCl₂', balanced: '2NaCl + Pb(NO₃)₂ → 2NaNO₃ + PbCl₂↓', products: ['NaNO3', 'PbCl2'], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -26.8, desc: 'Lead chloride forms white precipitate.', safety: '⚠️ Pb is toxic!', temp: 'Room temp', realUse: 'Research, qualitative analysis', smiles: '[Pb+2].[Cl-].[Cl-]' },
  { id: 'nacl-bacl2', reactants: ['NaCl', 'BaCl2'], eq: 'NaCl + BaCl₂ → No reaction', balanced: 'NaCl + BaCl₂ → No reaction', products: [], type: 'double-replacement', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: 0, desc: 'No reaction — all ions remain in solution.', temp: 'Room temp', realUse: 'Solubility rules demonstration' },
  { id: 'na2so4-bacl2', reactants: ['Na2SO4', 'BaCl2'], eq: 'Na₂SO₄ + BaCl₂ → BaSO₄ + NaCl', balanced: 'Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl', products: ['BaSO4', 'NaCl'], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,95%)', enthalpy: -35.7, desc: 'Barium sulfate precipitates.', temp: 'Room temp', realUse: 'X-ray contrast, gravimetric analysis', smiles: '[Ba+2].OS(=O)(=O)[O-]' },
  { id: 'na2co3-cacl2', reactants: ['Na2CO3', 'CaCl2'], eq: 'Na₂CO₃ + CaCl₂ → CaCO₃ + NaCl', balanced: 'Na₂CO₃ + CaCl₂ → CaCO₃↓ + 2NaCl', products: ['CaCO3', 'NaCl'], type: 'double-replacement', visual: 'precipitate', color: 'hsl(180,40%,60%)', enthalpy: -12.6, desc: 'Calcium carbonate precipitates.', temp: 'Room temp', realUse: 'Water softening, scale formation', smiles: '[Ca+2].[O-]C([O-])=O' },

  // COMPLEX FORMATION
  { id: 'nh4cl-naoh', reactants: ['NH4Cl', 'NaOH'], eq: 'NH₄Cl + NaOH → NH₃ + NaCl + H₂O', balanced: 'NH₄Cl + NaOH → NH₃↑ + NaCl + H₂O', products: ['NH3', 'NaCl', 'H2O'], type: 'acid-base', visual: 'gas-release', color: 'hsl(200,30%,70%)', enthalpy: -3.6, desc: 'Ammonia gas is released from ammonium salt.', temp: 'Room temp', realUse: 'Ammonia detection, qualitative analysis', smiles: 'N' },
  { id: 'cu-hno3', reactants: ['Cu', 'HNO3'], eq: 'Cu + HNO₃ → Cu(NO₃)₂ + NO₂ + H₂O', balanced: 'Cu + 4HNO₃ → Cu(NO₃)₂ + 2NO₂↑ + 2H₂O', products: ['Cu(NO3)2', 'NO2', 'H2O'], type: 'redox', visual: 'color-change', color: 'hsl(0,60%,50%)', enthalpy: -145.0, desc: 'Copper dissolves in nitric acid with brown NO₂ gas.', safety: '⚠️ NO₂ is toxic!', temp: 'Room temp', realUse: 'Copper nitrate production', smiles: '[Cu+2].[O-][N+](=O)[O-].[O-][N+](=O)[O-]' },
  { id: 'zn-hno3', reactants: ['Zn', 'HNO3'], eq: 'Zn + HNO₃ → Zn(NO₃)₂ + N₂O + H₂O', balanced: '4Zn + 10HNO₃ → 4Zn(NO₃)₂ + N₂O↑ + 5H₂O', products: ['Zn(NO3)2', 'N2O', 'H2O'], type: 'redox', visual: 'gas-release', color: 'hsl(180,20%,60%)', enthalpy: -240.0, desc: 'Zinc reduces nitric acid to nitrous oxide.', temp: 'Room temp', realUse: 'Nitrous oxide production', smiles: '[Zn+2].[O-][N+](=O)[O-].[O-][N+](=O)[O-]' },

  // ORGANIC REACTIONS
  { id: 'ch3cooh-naoh', reactants: ['CH3COOH', 'NaOH'], eq: 'CH₃COOH + NaOH → CH₃COONa + H₂O', balanced: 'CH₃COOH + NaOH → CH₃COONa + H₂O', products: ['CH3COONa', 'H2O'], type: 'acid-base', visual: 'dissolve', color: 'hsl(45,60%,70%)', enthalpy: -55.2, desc: 'Acetic acid neutralizes sodium hydroxide.', temp: 'Room temp', realUse: 'Vinegar neutralization, soap making', smiles: '[Na+].[O-]C(=O)C' },
  { id: 'c6h12o6-o2', reactants: ['C6H12O6', 'O2'], eq: 'C₆H₁₂O₆ + O₂ → CO₂ + H₂O', balanced: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', products: ['CO2', 'H2O'], type: 'combustion', visual: 'fire', color: 'hsl(0,0%,95%)', enthalpy: -2808.0, desc: 'Glucose combustion — cellular respiration.', temp: 'Body temp ~37°C', realUse: 'Energy production, metabolism', smiles: 'O=C=O' },
  { id: 'c2h5oh-h2so4', reactants: ['C2H5OH', 'H2SO4'], eq: 'C₂H₅OH + H₂SO₄ → C₂H₄ + H₂SO₄·H₂O', balanced: 'C₂H₅OH → C₂H₄↑ + H₂O', products: ['C2H4', 'H2SO4·H2O'], type: 'dehydration', visual: 'vapor', color: 'hsl(45,60%,70%)', enthalpy: 45.0, desc: 'Ethanol dehydrates to ethylene.', catalyst: 'H₂SO₄', temp: '140-170°C', realUse: 'Plastic production, ripening', smiles: 'C=C' },

  // SPECIAL REACTIONS
  { id: 'h2o-co2', reactants: ['H2O', 'CO2'], eq: 'H₂O + CO₂ ⇌ H₂CO₃', balanced: 'H₂O + CO₂ ⇌ H₂CO₃', products: ['H2CO3'], type: 'acid-base', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -20.3, desc: 'Carbon dioxide dissolves in water forming carbonic acid.', temp: 'Room temp', realUse: 'Ocean acidification, soda production', smiles: 'O=C(O)O' },
  { id: 'na2co3-co2', reactants: ['Na2CO3', 'CO2'], eq: 'Na₂CO₃ + CO₂ + H₂O → NaHCO₃', balanced: 'Na₂CO₃ + CO₂ + H₂O → 2NaHCO₃', products: ['NaHCO3'], type: 'acid-base', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -36.0, desc: 'Sodium carbonate absorbs CO₂ forming bicarbonate.', temp: 'Room temp', realUse: 'Fire extinguishers, baking soda', smiles: '[Na+].[Na+].[O-]C(=O)[O-]' },
  { id: 'ca-oh2-co2', reactants: ['Ca(OH)2', 'CO2'], eq: 'Ca(OH)₂ + CO₂ → CaCO₃ + H₂O', balanced: 'Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O', products: ['CaCO3', 'H2O'], type: 'acid-base', visual: 'precipitate', color: 'hsl(180,40%,60%)', enthalpy: -113.0, desc: 'Lime water turns milky with CO₂.', temp: 'Room temp', realUse: 'CO₂ detection, cement setting', smiles: '[Ca+2].[O-]C([O-])=O' },

  // NOBLE GAS COMPOUNDS
  { id: 'xe-f2', reactants: ['Xe', 'F2'], eq: 'Xe + F₂ → XeF₂', balanced: 'Xe + F₂ → XeF₂', products: ['XeF2'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,90%)', enthalpy: -108.0, desc: 'Xenon reacts with fluorine — noble gas compound!', safety: '⚠️ F₂ is toxic!', temp: 'Room temp', realUse: 'Research, oxidizers', smiles: 'F[Xe]F' },
  { id: 'xe-2f2', reactants: ['Xe', 'F2'], eq: 'Xe + 2F₂ → XeF₄', balanced: 'Xe + 2F₂ → XeF₄', products: ['XeF4'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,85%)', enthalpy: -251.0, desc: 'Xenon forms XeF₄ with excess fluorine.', safety: '⚠️ F₂ is toxic!', temp: 'Room temp', realUse: 'Research, fluorinating agent', smiles: 'F[Xe](F)(F)F' },
  { id: 'xe-3f2', reactants: ['Xe', 'F2'], eq: 'Xe + 3F₂ → XeF₆', balanced: 'Xe + 3F₂ → XeF₆', products: ['XeF6'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,80%)', enthalpy: -294.0, desc: 'Xenon forms XeF₆ — highest oxidation state noble gas compound.', safety: '⚠️ F₂ is toxic!', temp: 'Room temp', realUse: 'Research, superconductors', smiles: 'F[Xe](F)(F)(F)(F)F' },

  // SUPERHEAVY ELEMENTS
  { id: 'unununium-o2', reactants: ['Uuu', 'O2'], eq: 'Uuu + O₂ → UuuO₂', balanced: 'Uuu + O₂ → UuuO₂', products: ['Unununium Dioxide'], type: 'oxidation', visual: 'glow', color: 'hsl(300,60%,50%)', enthalpy: -500.0, desc: 'Theoretical oxidation of element 111.', temp: 'High temp', realUse: 'Research, nuclear physics' },
  { id: 'feo2', reactants: ['Fe', 'O2'], eq: 'Fe + O₂ → Fe₂O₃', balanced: '4Fe + 3O₂ → 2Fe₂O₃', products: ['Fe2O3'], type: 'oxidation', visual: 'color-change', color: 'hsl(15,70%,45%)', enthalpy: -824.2, desc: 'Iron oxidizes forming rust — iron(III) oxide.', temp: 'Room temp (slow)', realUse: 'Understanding corrosion, air quality' },
  { id: 'fes', reactants: ['Fe', 'S'], eq: 'Fe + S → FeS', balanced: 'Fe + S → FeS', products: ['FeS'], type: 'synthesis', visual: 'glow', color: 'hsl(45,40%,30%)', enthalpy: -100.0, desc: 'Iron and sulfur combine when heated, releasing heat.', safety: '⚠️ Exothermic!', temp: '~600°C', realUse: 'Teaching chemical bonds, compound formation' },
  { id: 'fecl3', reactants: ['Fe', 'Cl2'], eq: 'Fe + Cl₂ → FeCl₃', balanced: '2Fe + 3Cl₂ → 2FeCl₃', products: ['FeCl3'], type: 'synthesis', visual: 'crystallize', color: 'hsl(35,60%,40%)', enthalpy: -399.5, desc: 'Iron reacts with chlorine gas forming brown FeCl₃.', safety: '⚠️ Cl₂ is toxic!', temp: 'Room temp', realUse: 'Water treatment, etching' },
  { id: 'fe3o4', reactants: ['Fe', 'O2'], eq: 'Fe + O₂ → Fe₃O₄', balanced: '3Fe + 2O₂ → Fe₃O₄', products: ['Fe3O4'], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,15%)', enthalpy: -1118.4, desc: 'Iron oxidizes to form black magnetite at specific conditions.', temp: '>300°C', realUse: 'Magnetic materials, metallurgy' },
  { id: 'fe-hcl', reactants: ['Fe', 'HCl'], eq: 'Fe + HCl → FeCl₂ + H₂', balanced: 'Fe + 2HCl → FeCl₂ + H₂↑', products: ['FeCl2', 'H2'], type: 'single-replacement', visual: 'bubbles', color: 'hsl(15,70%,45%)', enthalpy: -87.9, desc: 'Iron dissolves in acid producing hydrogen.', temp: 'Room temp', realUse: 'Hydrogen generation, iron chloride production' },
  { id: 'fe-oh-h2so4', reactants: ['Fe(OH)3', 'H2SO4'], eq: 'Fe(OH)₃ + H₂SO₄ → Fe₂(SO₄)₃ + 6H₂O', balanced: '2Fe(OH)₃ + 3H₂SO₄ → Fe₂(SO₄)₃ + 6H₂O', products: ['Fe2(SO4)3', 'H2O'], type: 'acid-base', visual: 'dissolve', color: 'hsl(15,70%,50%)', enthalpy: -120.0, desc: 'Iron hydroxide dissolves in acid.', temp: 'Room temp', realUse: 'Iron sulfate production, water treatment' },

  // COPPER REACTIONS
  { id: 'cuo', reactants: ['Cu', 'O2'], eq: 'Cu + O₂ → CuO', balanced: '2Cu + O₂ → 2CuO', products: ['CuO'], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,10%)', enthalpy: -157.3, desc: 'Copper turns from reddish-brown to black when heated in air.', temp: '~300°C', realUse: 'Catalysts, pigments, ceramics' },
  { id: 'cus', reactants: ['Cu', 'S'], eq: 'Cu + S → CuS', balanced: 'Cu + S → CuS', products: ['CuS'], type: 'synthesis', visual: 'color-change', color: 'hsl(220,20%,15%)', enthalpy: -53.1, desc: 'Copper and sulfur form black copper sulfide when heated.', temp: '~400°C', realUse: 'Semiconductor manufacturing, tests' },
  { id: 'cucl2', reactants: ['Cu', 'Cl2'], eq: 'Cu + Cl₂ → CuCl₂', balanced: 'Cu + Cl₂ → CuCl₂', products: ['CuCl2'], type: 'synthesis', visual: 'color-change', color: 'hsl(170,60%,40%)', enthalpy: -220.1, desc: 'Copper reacts with chlorine forming green CuCl₂ solution.', temp: '~300°C', realUse: 'Etching, catalysis, pigments' },
  { id: 'cu-oh-h2so4', reactants: ['Cu(OH)2', 'H2SO4'], eq: 'Cu(OH)₂ + H₂SO₄ → CuSO₄ + 2H₂O', balanced: 'Cu(OH)₂ + H₂SO₄ → CuSO₄ + 2H₂O', products: ['CuSO4', 'H2O'], type: 'acid-base', visual: 'dissolve', color: 'hsl(170,60%,50%)', enthalpy: -85.0, desc: 'Copper hydroxide dissolves in acid.', temp: 'Room temp', realUse: 'Copper sulfate production' },

  // ZINC REACTIONS
  { id: 'zno', reactants: ['Zn', 'O2'], eq: 'Zn + O₂ → ZnO', balanced: '2Zn + O₂ → 2ZnO', products: ['ZnO'], type: 'oxidation', visual: 'glow', color: 'hsl(0,0%,95%)', enthalpy: -350.5, desc: 'Zinc burns with blue-green flame forming white ZnO.', temp: 'Ignition ~900°C', realUse: 'Sunscreen, rubber, pigments' },
  { id: 'zns', reactants: ['Zn', 'S'], eq: 'Zn + S → ZnS', balanced: 'Zn + S → ZnS', products: ['ZnS'], type: 'synthesis', visual: 'glow', color: 'hsl(60,60%,60%)', enthalpy: -206.0, desc: 'Zinc and sulfur form ZnS.', temp: '~800°C', realUse: 'Phosphors, pigments' },
  { id: 'zncl2', reactants: ['Zn', 'Cl2'], eq: 'Zn + Cl₂ → ZnCl₂', balanced: 'Zn + Cl₂ → ZnCl₂', products: ['ZnCl2'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,85%)', enthalpy: -415.1, desc: 'Zinc reacts with chlorine gas.', safety: '⚠️ Cl₂ is toxic!', temp: 'Room temp', realUse: 'Flux, batteries' },
  { id: 'zn-hcl', reactants: ['Zn', 'HCl'], eq: 'Zn + HCl → ZnCl₂ + H₂', balanced: 'Zn + 2HCl → ZnCl₂ + H₂↑', products: ['ZnCl2', 'H2'], type: 'single-replacement', visual: 'bubbles', color: 'hsl(180,20%,60%)', enthalpy: -153.9, desc: 'Zinc dissolves in acid producing hydrogen bubbles.', temp: 'Room temp', realUse: 'Hydrogen generation, galvanizing' },
  { id: 'zn-oh-h2so4', reactants: ['Zn(OH)2', 'H2SO4'], eq: 'Zn(OH)₂ + H₂SO₄ → ZnSO₄ + 2H₂O', balanced: 'Zn(OH)₂ + H₂SO₄ → ZnSO₄ + 2H₂O', products: ['ZnSO4', 'H2O'], type: 'acid-base', visual: 'dissolve', color: 'hsl(180,20%,65%)', enthalpy: -95.0, desc: 'Zinc hydroxide dissolves in acid.', temp: 'Room temp', realUse: 'Zinc sulfate production' },

  // ACID-BASE REACTIONS

  // PRECIPITATION REACTIONS
  { id: 'fes-cuso4', reactants: ['FeS', 'CuSO4'], eq: 'FeS + CuSO₄ → CuS + FeSO₄', balanced: 'FeS + CuSO₄ → CuS↓ + FeSO₄', products: ['CuS', 'FeSO4'], type: 'precipitation', visual: 'precipitate', color: 'hsl(220,20%,15%)', enthalpy: -50.0, desc: 'Copper sulfide precipitates, displacing iron.', temp: 'Room temp', realUse: 'Qualitative analysis, copper extraction' },

  // REDOX REACTIONS
  { id: 'cu-agno3', reactants: ['Cu', 'AgNO3'], eq: 'Cu + Ag⁺ → Cu²⁺ + Ag', balanced: 'Cu + 2Ag⁺ → Cu²⁺ + 2Ag', products: ['Cu2+', 'Ag'], type: 'redox', visual: 'precipitate', color: 'hsl(45,80%,60%)', enthalpy: -146.0, desc: 'Copper displaces silver from solution.', temp: 'Room temp', realUse: 'Silver recovery, electroplating' },
  { id: 'zn-cuso4', reactants: ['Zn', 'CuSO4'], eq: 'Zn + CuSO₄ → ZnSO₄ + Cu', balanced: 'Zn + CuSO₄ → ZnSO₄ + Cu', products: ['ZnSO4', 'Cu'], type: 'redox', visual: 'color-change', color: 'hsl(45,80%,60%)', enthalpy: -212.0, desc: 'Zinc displaces copper from solution.', temp: 'Room temp', realUse: 'Copper purification, Daniell cell' },
  { id: 'fe-cuso4', reactants: ['Fe', 'CuSO4'], eq: 'Fe + CuSO₄ → FeSO₄ + Cu', balanced: 'Fe + CuSO₄ → FeSO₄ + Cu', products: ['FeSO4', 'Cu'], type: 'redox', visual: 'color-change', color: 'hsl(15,70%,45%)', enthalpy: -135.0, desc: 'Iron displaces copper from solution.', temp: 'Room temp', realUse: 'Copper extraction, reactivity series' },

  // COMBUSTION REACTIONS
  { id: 'c3h8-o2', reactants: ['C3H8', 'O2'], eq: 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O', balanced: 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O', products: ['CO2', 'H2O'], type: 'combustion', visual: 'fire', color: 'hsl(0,0%,90%)', enthalpy: -2219.0, desc: 'Propane combustion — BBQ gas burning.', temp: 'Ignition ~470°C', realUse: 'Heating, cooking, camping' },
  { id: 'c8h18-o2', reactants: ['C8H18', 'O2'], eq: 'C₈H₁₈ + 12½O₂ → 8CO₂ + 9H₂O', balanced: '2C₈H₁₈ + 25O₂ → 16CO₂ + 18H₂O', products: ['CO2', 'H2O'], type: 'combustion', visual: 'fire', color: 'hsl(0,0%,85%)', enthalpy: -5074.0, desc: 'Octane combustion — gasoline burning.', temp: 'Ignition ~220°C', realUse: 'Automobiles, engines' },

  // INDUSTRIAL REACTIONS
  { id: 'haber-bosch', reactants: ['N2', 'H2'], eq: 'N₂ + 3H₂ → 2NH₃', balanced: 'N₂ + 3H₂ ⇌ 2NH₃', products: ['NH3'], type: 'synthesis', visual: 'gas-release', color: 'hsl(200,40%,60%)', enthalpy: -92.4, desc: 'Haber-Bosch process for ammonia synthesis.', temp: '400-500°C, 200 atm', catalyst: 'Fe', realUse: 'Fertilizers, explosives' },
  { id: 'contact-process', reactants: ['SO2', 'O2'], eq: '2SO₂ + O₂ → 2SO₃', balanced: '2SO₂ + O₂ ⇌ 2SO₃', products: ['SO3'], type: 'oxidation', visual: 'gas-release', color: 'hsl(0,0%,90%)', enthalpy: -198.2, desc: 'Contact process for sulfuric acid production.', temp: '400-600°C', catalyst: 'V₂O₅', realUse: 'Sulfuric acid, detergents' },
  { id: 'ostwald', reactants: ['NH3', 'O2'], eq: '4NH₃ + 5O₂ → 4NO + 6H₂O', balanced: '4NH₃ + 5O₂ → 4NO + 6H₂O', products: ['NO', 'H2O'], type: 'oxidation', visual: 'gas-release', color: 'hsl(0,0%,80%)', enthalpy: -905.6, desc: 'Ostwald process first step for nitric acid.', temp: '800-900°C', catalyst: 'Pt-Rh', realUse: 'Nitric acid, fertilizers' },
  { id: 'lime-kiln', reactants: ['CaCO3'], eq: 'CaCO₃ → CaO + CO₂', balanced: 'CaCO₃ → CaO + CO₂↑', products: ['CaO', 'CO2'], type: 'decomposition', visual: 'gas-release', color: 'hsl(0,0%,90%)', enthalpy: 178.0, desc: 'Limestone decomposition in lime kilns.', temp: '900°C', realUse: 'Cement, steelmaking' },
  { id: 'blast-furnace', reactants: ['Fe2O3', 'CO'], eq: 'Fe₂O₃ + 3CO → 2Fe + 3CO₂', balanced: 'Fe₂O₃ + 3CO → 2Fe + 3CO₂', products: ['Fe', 'CO2'], type: 'redox', visual: 'glow', color: 'hsl(15,70%,45%)', enthalpy: -26.8, desc: 'Iron reduction in blast furnace.', temp: '1500°C', realUse: 'Steel production' },

  // BIOCHEMICAL REACTIONS
  { id: 'fermentation', reactants: ['C6H12O6'], eq: 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂', balanced: 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂', products: ['C2H5OH', 'CO2'], type: 'fermentation', visual: 'bubbles', color: 'hsl(45,60%,70%)', enthalpy: -67.0, desc: 'Yeast fermentation of glucose to ethanol.', temp: '30-37°C', realUse: 'Beer, wine, bread' },
  { id: 'respiration', reactants: ['C6H12O6', 'O2'], eq: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', balanced: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', products: ['CO2', 'H2O'], type: 'combustion', visual: 'gas-release', color: 'hsl(0,0%,95%)', enthalpy: -2808.0, desc: 'Aerobic respiration in cells.', temp: '37°C', realUse: 'Energy production in organisms' },
  { id: 'photosynthesis', reactants: ['CO2', 'H2O'], eq: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', balanced: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', products: ['C6H12O6', 'O2'], type: 'photosynthesis', visual: 'glow', color: 'hsl(120,60%,50%)', enthalpy: 2808.0, desc: 'Plants convert CO₂ and water to glucose using sunlight.', temp: 'Room temp (with chlorophyll)', realUse: 'Food production, oxygen generation' },

  // ELECTROCHEMICAL REACTIONS
  { id: 'electrolysis-h2o', reactants: ['H2O'], eq: '2H₂O → 2H₂ + O₂', balanced: '2H₂O → 2H₂↑ + O₂↑', products: ['H2', 'O2'], type: 'electrolysis', visual: 'bubbles', color: 'hsl(200,60%,70%)', enthalpy: 285.8, desc: 'Water electrolysis produces hydrogen and oxygen.', temp: 'Room temp', realUse: 'Hydrogen fuel, oxygen production' },
  { id: 'daniel-cell', reactants: ['Zn', 'CuSO4'], eq: 'Zn + CuSO₄ → ZnSO₄ + Cu', balanced: 'Zn + CuSO₄ → ZnSO₄ + Cu', products: ['ZnSO4', 'Cu'], type: 'redox', visual: 'color-change', color: 'hsl(45,80%,60%)', enthalpy: -212.0, desc: 'Daniel cell: zinc anode, copper cathode.', temp: 'Room temp', realUse: 'Batteries, electrochemistry teaching' },

  // DECOMPOSITION REACTIONS
  { id: 'caco3-heat', reactants: ['CaCO3'], eq: 'CaCO₃ → CaO + CO₂', balanced: 'CaCO₃ → CaO + CO₂↑', products: ['CaO', 'CO2'], type: 'decomposition', visual: 'gas-release', color: 'hsl(0,0%,90%)', enthalpy: 178.0, desc: 'Calcium carbonate decomposes when heated.', temp: '825°C', realUse: 'Limestone processing, cement' },
  { id: 'nacl-electrolysis', reactants: ['NaCl'], eq: '2NaCl → 2Na + Cl₂', balanced: '2NaCl → 2Na + Cl₂↑', products: ['Na', 'Cl2'], type: 'electrolysis', visual: 'spark', color: 'hsl(45,90%,70%)', enthalpy: 411.0, desc: 'Sodium chloride electrolysis produces sodium and chlorine.', temp: '800°C', realUse: 'Sodium metal, chlorine gas production' },

  // ATMOSPHERIC REACTIONS
  { id: 'ozone-formation', reactants: ['O2'], eq: '3O₂ → 2O₃', balanced: '3O₂ → 2O₃', products: ['O3'], type: 'synthesis', visual: 'glow', color: 'hsl(200,60%,60%)', enthalpy: 142.0, desc: 'Ozone formation from oxygen in atmosphere.', temp: 'High energy (UV)', realUse: 'Ozone layer, air purification' },
  { id: 'acid-rain', reactants: ['SO2', 'H2O'], eq: 'SO₂ + H₂O → H₂SO₃', balanced: 'SO₂ + H₂O → H₂SO₃', products: ['H2SO3'], type: 'acid-base', visual: 'dissolve', color: 'hsl(0,0%,85%)', enthalpy: -52.0, desc: 'Sulfur dioxide forms acid in water vapor.', temp: 'Room temp', realUse: 'Acid rain formation' },

  // EXPLOSIVE REACTIONS
  { id: 'black-powder', reactants: ['KNO3', 'C', 'S'], eq: '2KNO₃ + 3C + S → K₂S + N₂ + 3CO₂', balanced: '2KNO₃ + 3C + S → K₂S + N₂ + 3CO₂', products: ['K2S', 'N2', 'CO2'], type: 'redox', visual: 'explosion', color: 'hsl(0,0%,20%)', enthalpy: -600.0, desc: 'Black powder explosion reaction.', safety: '⚠️ EXPLOSIVE!', temp: 'Ignition ~300°C', realUse: 'Fireworks, mining' },
  { id: 'tnt', reactants: ['C7H5N3O6'], eq: '2C₇H₅N₃O₆ → 3N₂ + 5H₂O + 7CO + 7C', balanced: '2C₇H₅N₃O₆ → 3N₂ + 5H₂O + 7CO + 7C', products: ['N2', 'H2O', 'CO', 'C'], type: 'decomposition', visual: 'explosion', color: 'hsl(45,60%,50%)', enthalpy: -2800.0, desc: 'TNT detonation reaction.', safety: '⚠️ HIGH EXPLOSIVE!', temp: 'Detonation', realUse: 'Explosives, demolition' },

  // NOBLE GAS REACTIONS
  { id: 'xef2', reactants: ['Xe', 'F2'], eq: 'Xe + F₂ → XeF₂', balanced: 'Xe + F₂ → XeF₂', products: ['XeF2'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,90%)', enthalpy: -108.0, desc: 'Xenon reacts with fluorine — noble gas compound!', safety: '⚠️ F₂ is toxic!', temp: 'Room temp', realUse: 'Research, oxidizers' },
  { id: 'xef4', reactants: ['Xe', 'F2'], eq: 'Xe + 2F₂ → XeF₄', balanced: 'Xe + 2F₂ → XeF₄', products: ['XeF4'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,85%)', enthalpy: -251.0, desc: 'Xenon forms XeF₄ with excess fluorine.', safety: '⚠️ F₂ is toxic!', temp: 'Room temp', realUse: 'Research, fluorinating agent' },
  { id: 'xef6', reactants: ['Xe', 'F2'], eq: 'Xe + 3F₂ → XeF₆', balanced: 'Xe + 3F₂ → XeF₆', products: ['XeF6'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,80%)', enthalpy: -294.0, desc: 'Xenon forms XeF₆ — highest oxidation state noble gas compound.', safety: '⚠️ F₂ is toxic!', temp: 'Room temp', realUse: 'Research, superconductors' },

  // RARE EARTH REACTIONS
  { id: 'la2o3', reactants: ['La', 'O2'], eq: 'La + O₂ → La₂O₃', balanced: '4La + 3O₂ → 2La₂O₃', products: ['La2O3'], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,85%)', enthalpy: -1794.0, desc: 'Lanthanum oxidizes to La₂O₃.', temp: '>400°C', realUse: 'Catalysts, optics' },
  { id: 'ce2o3', reactants: ['Ce', 'O2'], eq: 'Ce + O₂ → Ce₂O₃', balanced: '4Ce + 3O₂ → 2Ce₂O₃', products: ['Ce2O3'], type: 'oxidation', visual: 'color-change', color: 'hsl(50,40%,60%)', enthalpy: -1778.0, desc: 'Cerium oxidizes to Ce₂O₃.', temp: '>300°C', realUse: 'Catalysts, glass polishing' },
  { id: 'nd2o3', reactants: ['Nd', 'O2'], eq: 'Nd + O₂ → Nd₂O₃', balanced: '4Nd + 3O₂ → 2Nd₂O₃', products: ['Nd2O3'], type: 'oxidation', visual: 'color-change', color: 'hsl(280,40%,50%)', enthalpy: -1808.0, desc: 'Neodymium oxidizes to Nd₂O₃.', temp: '>300°C', realUse: 'Magnets, lasers' },

  // MERCURY REACTIONS
  { id: 'hgo', reactants: ['Hg', 'O2'], eq: 'Hg + O₂ → HgO', balanced: '2Hg + O₂ → 2HgO', products: ['HgO'], type: 'oxidation', visual: 'color-change', color: 'hsl(15,60%,40%)', enthalpy: -90.8, desc: 'Mercury oxidizes to red HgO.', safety: '⚠️ Hg is toxic!', temp: '>300°C', realUse: 'Batteries, pigments' },
  { id: 'hgcl2', reactants: ['Hg', 'Cl2'], eq: 'Hg + Cl₂ → HgCl₂', balanced: 'Hg + Cl₂ → HgCl₂', products: ['HgCl2'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,85%)', enthalpy: -230.1, desc: 'Mercury reacts with chlorine.', safety: '⚠️ Cl₂ and Hg are toxic!', temp: 'Room temp', realUse: 'Catalysis, medicine' },
  { id: 'hgs', reactants: ['Hg', 'S'], eq: 'Hg + S → HgS', balanced: 'Hg + S → HgS', products: ['HgS'], type: 'synthesis', visual: 'color-change', color: 'hsl(0,0%,20%)', enthalpy: -58.2, desc: 'Mercury and sulfur form black HgS.', safety: '⚠️ Hg is toxic!', temp: 'Room temp', realUse: 'Pigments, detectors' },

  // LEAD REACTIONS
  { id: 'pbo', reactants: ['Pb', 'O2'], eq: 'Pb + O₂ → PbO', balanced: '2Pb + O₂ → 2PbO', products: ['PbO'], type: 'oxidation', visual: 'color-change', color: 'hsl(30,40%,50%)', enthalpy: -219.0, desc: 'Lead oxidizes to PbO.', safety: '⚠️ Pb is toxic!', temp: '>300°C', realUse: 'Glass, batteries' },
  { id: 'pbcl2', reactants: ['Pb', 'Cl2'], eq: 'Pb + Cl₂ → PbCl₂', balanced: 'Pb + Cl₂ → PbCl₂', products: ['PbCl2'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,80%)', enthalpy: -359.4, desc: 'Lead reacts with chlorine.', safety: '⚠️ Cl₂ and Pb are toxic!', temp: 'Room temp', realUse: 'Research, pigments' },
  { id: 'pbs', reactants: ['Pb', 'S'], eq: 'Pb + S → PbS', balanced: 'Pb + S → PbS', products: ['PbS'], type: 'synthesis', visual: 'color-change', color: 'hsl(0,0%,15%)', enthalpy: -94.3, desc: 'Lead and sulfur form PbS.', safety: '⚠️ Pb is toxic!', temp: 'Room temp', realUse: 'Detectors, pigments' },

  // SILVER REACTIONS
  { id: 'agcl', reactants: ['Ag', 'Cl2'], eq: 'Ag + Cl₂ → AgCl', balanced: '2Ag + Cl₂ → 2AgCl', products: ['AgCl'], type: 'synthesis', visual: 'precipitate', color: 'hsl(0,0%,75%)', enthalpy: -127.0, desc: 'Silver reacts with chlorine forming white precipitate.', safety: '⚠️ Cl₂ is toxic!', temp: 'Room temp', realUse: 'Photography, mirrors' },
  { id: 'ags', reactants: ['Ag', 'S'], eq: 'Ag + S → Ag₂S', balanced: '2Ag + S → Ag₂S', products: ['Ag2S'], type: 'synthesis', visual: 'color-change', color: 'hsl(0,0%,20%)', enthalpy: -32.6, desc: 'Silver and sulfur form Ag₂S.', temp: 'Room temp', realUse: 'Jewelry, detectors' },

  // CADMIUM REACTIONS
  { id: 'cdo', reactants: ['Cd', 'O2'], eq: 'Cd + O₂ → CdO', balanced: '2Cd + O₂ → 2CdO', products: ['CdO'], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,25%)', enthalpy: -258.4, desc: 'Cadmium oxidizes to CdO.', safety: '⚠️ Cd is toxic!', temp: '>300°C', realUse: 'Batteries, pigments' },
  { id: 'cdcl2', reactants: ['Cd', 'Cl2'], eq: 'Cd + Cl₂ → CdCl₂', balanced: 'Cd + Cl₂ → CdCl₂', products: ['CdCl2'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,80%)', enthalpy: -391.5, desc: 'Cadmium reacts with chlorine.', safety: '⚠️ Cl₂ and Cd are toxic!', temp: 'Room temp', realUse: 'Electroplating, research' },

  // TIN REACTIONS
  { id: 'sno2', reactants: ['Sn', 'O2'], eq: 'Sn + O₂ → SnO₂', balanced: 'Sn + O₂ → SnO₂', products: ['SnO2'], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,90%)', enthalpy: -580.7, desc: 'Tin oxidizes to SnO₂.', temp: '>1000°C', realUse: 'Glass, ceramics' },
  { id: 'sncl2', reactants: ['Sn', 'Cl2'], eq: 'Sn + Cl₂ → SnCl₂', balanced: 'Sn + Cl₂ → SnCl₂', products: ['SnCl2'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,70%)', enthalpy: -325.1, desc: 'Tin reacts with chlorine forming stannous chloride.', temp: 'Room temp', realUse: 'Reducing agent, tin plating' },

  // ANTIMONY REACTIONS
  { id: 'sb2o3', reactants: ['Sb', 'O2'], eq: 'Sb + O₂ → Sb₂O₃', balanced: '4Sb + 3O₂ → 2Sb₂O₃', products: ['Sb2O3'], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,85%)', enthalpy: -699.6, desc: 'Antimony oxidizes to Sb₂O₃.', temp: '>600°C', realUse: 'Flame retardants, glass' },

  // BISMUTH REACTIONS
  { id: 'bicl3', reactants: ['Bi', 'Cl2'], eq: 'Bi + Cl₂ → BiCl₃', balanced: '2Bi + 3Cl₂ → 2BiCl₃', products: ['BiCl3'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,75%)', enthalpy: -379.1, desc: 'Bismuth reacts with chlorine.', safety: '⚠️ Cl₂ is toxic!', temp: 'Room temp', realUse: 'Catalysis, research' },

  // PHOSPHORUS REACTIONS
  { id: 'p4o10', reactants: ['P4', 'O2'], eq: 'P₄ + 5O₂ → P₄O₁₀', balanced: 'P₄ + 5O₂ → P₄O₁₀', products: ['P4O10'], type: 'oxidation', visual: 'smoke', color: 'hsl(0,0%,85%)', enthalpy: -2984.0, desc: 'Phosphorus burns producing dense white smoke of P₄O₁₀.', safety: '⚠️ Toxic!', temp: 'Ignition ~34°C', realUse: 'Phosphoric acid' },
  { id: 'pcl3', reactants: ['P4', 'Cl2'], eq: 'P₄ + 6Cl₂ → 4PCl₃', balanced: 'P₄ + 6Cl₂ → 4PCl₃', products: ['PCl3'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,80%)', enthalpy: -319.0, desc: 'Phosphorus reacts with chlorine.', safety: '⚠️ Cl₂ is toxic!', temp: 'Room temp', realUse: 'Organic synthesis' },

  // ARSENIC REACTIONS
  { id: 'as2o3', reactants: ['As', 'O2'], eq: 'As + O₂ → As₂O₃', balanced: '4As + 3O₂ → 2As₂O₃', products: ['As2O3'], type: 'oxidation', visual: 'crystallize', color: 'hsl(0,0%,85%)', enthalpy: -657.0, desc: 'Arsenic oxidizes to As₂O₃.', safety: '⚠️ As is toxic!', temp: '>200°C', realUse: 'Glass, pesticides' },
  { id: 'ascl3', reactants: ['As', 'Cl2'], eq: 'As + Cl₂ → AsCl₃', balanced: '2As + 3Cl₂ → 2AsCl₃', products: ['AsCl3'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,75%)', enthalpy: -305.0, desc: 'Arsenic reacts with chlorine.', safety: '⚠️ Cl₂ and As are toxic!', temp: 'Room temp', realUse: 'Semiconductors' },

  // SELENIUM REACTIONS
  { id: 'se2o3', reactants: ['Se', 'O2'], eq: 'Se + O₂ → SeO₂', balanced: 'Se + O₂ → SeO₂', products: ['SeO2'], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,80%)', enthalpy: -230.0, desc: 'Selenium oxidizes to SeO₂.', temp: '>200°C', realUse: 'Catalysis, glass' },
  { id: 'sef4', reactants: ['Se', 'F2'], eq: 'Se + F₂ → SeF₄', balanced: 'Se + 2F₂ → SeF₄', products: ['SeF4'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,85%)', enthalpy: -850.0, desc: 'Selenium reacts with fluorine.', safety: '⚠️ F₂ is toxic!', temp: 'Room temp', realUse: 'Research' },

  // BERYLLIUM REACTIONS
  { id: 'beo', reactants: ['Be', 'O2'], eq: 'Be + O₂ → BeO', balanced: '2Be + O₂ → 2BeO', products: ['BeO'], type: 'oxidation', visual: 'glow', color: 'hsl(0,0%,90%)', enthalpy: -609.4, desc: 'Beryllium oxidizes to form BeO.', temp: '>800°C', realUse: 'Ceramics, nuclear applications' },
  { id: 'bef2', reactants: ['Be', 'F2'], eq: 'Be + F₂ → BeF₂', balanced: 'Be + F₂ → BeF₂', products: ['BeF2'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,95%)', enthalpy: -1022.0, desc: 'Beryllium reacts with fluorine.', safety: '⚠️ F₂ is toxic! Be is toxic!', temp: 'Room temp', realUse: 'Nuclear reactors, research' },
  { id: 'becl2', reactants: ['Be', 'Cl2'], eq: 'Be + Cl₂ → BeCl₂', balanced: 'Be + Cl₂ → BeCl₂', products: ['BeCl2'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,85%)', enthalpy: -495.8, desc: 'Beryllium reacts with chlorine.', safety: '⚠️ Cl₂ is toxic! Be is toxic!', temp: 'Room temp', realUse: 'Catalysis, research' },

  // STRONTIUM REACTIONS
  { id: 'sro', reactants: ['Sr', 'O2'], eq: 'Sr + O₂ → SrO', balanced: '2Sr + O₂ → 2SrO', products: ['SrO'], type: 'oxidation', visual: 'glow', color: 'hsl(0,0%,85%)', enthalpy: -592.0, desc: 'Strontium burns forming SrO.', temp: '>300°C', realUse: 'Fireworks, ceramics' },
  { id: 'srcl2', reactants: ['Sr', 'Cl2'], eq: 'Sr + Cl₂ → SrCl₂', balanced: 'Sr + Cl₂ → SrCl₂', products: ['SrCl2'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,85%)', enthalpy: -828.4, desc: 'Strontium reacts with chlorine.', safety: '⚠️ Cl₂ is toxic!', temp: 'Room temp', realUse: 'Fireworks, medicine' },

  // BARIUM REACTIONS
  { id: 'bao', reactants: ['Ba', 'O2'], eq: 'Ba + O₂ → BaO', balanced: '2Ba + O₂ → 2BaO', products: ['BaO'], type: 'synthesis', visual: 'glow', color: 'hsl(120,60%,50%)', enthalpy: -553.5, desc: 'Barium burns with characteristic green flame.', safety: '⚠️ All barium compounds are toxic!', temp: '>550°C', realUse: 'Fireworks (green), glass, ceramics' },
  { id: 'bacl2', reactants: ['Ba', 'Cl2'], eq: 'Ba + Cl₂ → BaCl₂', balanced: 'Ba + Cl₂ → BaCl₂', products: ['BaCl2'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,85%)', enthalpy: -858.6, desc: 'Barium reacts with chlorine.', safety: '⚠️ Cl₂ is toxic! Ba is toxic!', temp: 'Room temp', realUse: 'Fireworks, water softening' },

  // CESIUM REACTIONS
  { id: 'csh2o', reactants: ['Cs', 'H2O'], eq: 'Cs + H₂O → CsOH + H₂', balanced: '2Cs + 2H₂O → 2CsOH + H₂↑', products: ['CsOH', 'H2'], type: 'single-replacement', visual: 'explosion', color: 'hsl(200,70%,55%)', enthalpy: -256.0, desc: 'Most violent alkali-water reaction! Massive explosion!', safety: '⚠️ CATASTROPHIC!', temp: 'Spontaneous', realUse: 'Alkali metal reactivity studies' },
  { id: 'cscl', reactants: ['Cs', 'Cl2'], eq: 'Cs + Cl₂ → CsCl', balanced: '2Cs + Cl₂ → 2CsCl', products: ['CsCl'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,80%)', enthalpy: -433.0, desc: 'Cesium reacts with chlorine.', safety: '⚠️ Cl₂ is toxic!', temp: 'Room temp', realUse: 'Crystallography, medicine' },

  // RUBIDIUM REACTIONS
  { id: 'rbh2o', reactants: ['Rb', 'H2O'], eq: 'Rb + H₂O → RbOH + H₂', balanced: '2Rb + 2H₂O → 2RbOH + H₂↑', products: ['RbOH', 'H2'], type: 'single-replacement', visual: 'explosion', color: 'hsl(340,60%,55%)', enthalpy: -236.0, desc: 'Rubidium reacts explosively with water!', safety: '⚠️ EXPLOSIVE!', temp: 'Spontaneous', realUse: 'Alkali reactivity series demonstration' },
  { id: 'rbcl', reactants: ['Rb', 'Cl2'], eq: 'Rb + Cl₂ → RbCl', balanced: '2Rb + Cl₂ → 2RbCl', products: ['RbCl'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,80%)', enthalpy: -435.0, desc: 'Rubidium reacts with chlorine.', safety: '⚠️ Cl₂ is toxic!', temp: 'Room temp', realUse: 'Research, medicine' },

  // LITHIUM REACTIONS
  { id: 'lif', reactants: ['Li', 'F2'], eq: 'Li + F₂ → LiF', balanced: '2Li + F₂ → 2LiF', products: ['LiF'], type: 'synthesis', visual: 'spark', color: 'hsl(180,70%,60%)', enthalpy: -616.0, desc: 'Lithium reacts vigorously with fluorine gas forming LiF.', safety: '⚠️ Violent! F₂ is extremely toxic.', temp: 'Room temp', realUse: 'Nuclear reactors, ceramics' },
  { id: 'licl', reactants: ['Li', 'Cl2'], eq: 'Li + Cl₂ → LiCl', balanced: '2Li + Cl₂ → 2LiCl', products: ['LiCl'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,90%)', enthalpy: -408.6, desc: 'Lithium burns in chlorine gas.', safety: '⚠️ Cl₂ is toxic!', temp: 'Room temp', realUse: 'Batteries, air conditioning' },
  { id: 'libr', reactants: ['Li', 'Br2'], eq: 'Li + Br₂ → LiBr', balanced: '2Li + Br₂ → 2LiBr', products: ['LiBr'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,85%)', enthalpy: -351.2, desc: 'Lithium reacts with bromine forming crystalline lithium bromide.', safety: '⚠️ Br₂ is corrosive!', temp: 'Room temp', realUse: 'Medicine, photography' },
  { id: 'lii', reactants: ['Li', 'I2'], eq: 'Li + I₂ → LiI', balanced: '2Li + I₂ → 2LiI', products: ['LiI'], type: 'synthesis', visual: 'color-change', color: 'hsl(45,60%,70%)', enthalpy: -270.4, desc: 'Lithium and iodine form LiI.', temp: 'Room temp', realUse: 'Organic synthesis, electrolytes' },

  // MAGNESIUM HALIDES
  { id: 'mgf2', reactants: ['Mg', 'F2'], eq: 'Mg + F₂ → MgF₂', balanced: 'Mg + F₂ → MgF₂', products: ['MgF2'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,95%)', enthalpy: -1124.0, desc: 'Magnesium reacts with fluorine.', safety: '⚠️ F₂ is toxic!', temp: 'Room temp', realUse: 'Optics, ceramics' },
  { id: 'mgbr2', reactants: ['Mg', 'Br2'], eq: 'Mg + Br₂ → MgBr₂', balanced: 'Mg + Br₂ → MgBr₂', products: ['MgBr2'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,80%)', enthalpy: -524.3, desc: 'Magnesium reacts with bromine.', safety: '⚠️ Br₂ is toxic!', temp: 'Room temp', realUse: 'Medicine, synthesis' },
  { id: 'mgi2', reactants: ['Mg', 'I2'], eq: 'Mg + I₂ → MgI₂', balanced: 'Mg + I₂ → MgI₂', products: ['MgI2'], type: 'synthesis', visual: 'color-change', color: 'hsl(0,0%,70%)', enthalpy: -364.0, desc: 'Magnesium and iodine form MgI₂.', temp: 'Room temp', realUse: 'Organic synthesis, batteries' },

  // CALCIUM HALIDES
  { id: 'caf2', reactants: ['Ca', 'F2'], eq: 'Ca + F₂ → CaF₂', balanced: 'Ca + F₂ → CaF₂', products: ['CaF2'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,95%)', enthalpy: -1219.6, desc: 'Calcium reacts with fluorine forming fluorite.', safety: '⚠️ F₂ is toxic!', temp: 'Room temp', realUse: 'Optics, metallurgy' },
  { id: 'cabr2', reactants: ['Ca', 'Br2'], eq: 'Ca + Br₂ → CaBr₂', balanced: 'Ca + Br₂ → CaBr₂', products: ['CaBr2'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,85%)', enthalpy: -675.3, desc: 'Calcium reacts with bromine.', safety: '⚠️ Br₂ is toxic!', temp: 'Room temp', realUse: 'Oil drilling, medicine' },
  { id: 'cai2', reactants: ['Ca', 'I2'], eq: 'Ca + I₂ → CaI₂', balanced: 'Ca + I₂ → CaI₂', products: ['CaI2'], type: 'synthesis', visual: 'color-change', color: 'hsl(0,0%,75%)', enthalpy: -533.5, desc: 'Calcium and iodine form CaI₂.', temp: 'Room temp', realUse: 'Photography, medicine' },

  // STRONTIUM HALIDES
  { id: 'srf2', reactants: ['Sr', 'F2'], eq: 'Sr + F₂ → SrF₂', balanced: 'Sr + F₂ → SrF₂', products: ['SrF2'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,90%)', enthalpy: -1217.0, desc: 'Strontium reacts with fluorine.', safety: '⚠️ F₂ is toxic!', temp: 'Room temp', realUse: 'Research, optics' },
  { id: 'srbr2', reactants: ['Sr', 'Br2'], eq: 'Sr + Br₂ → SrBr₂', balanced: 'Sr + Br₂ → SrBr₂', products: ['SrBr2'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,80%)', enthalpy: -709.6, desc: 'Strontium reacts with bromine.', safety: '⚠️ Br₂ is toxic!', temp: 'Room temp', realUse: 'Research, medicine' },
  { id: 'sri2', reactants: ['Sr', 'I2'], eq: 'Sr + I₂ → SrI₂', balanced: 'Sr + I₂ → SrI₂', products: ['SrI2'], type: 'synthesis', visual: 'color-change', color: 'hsl(0,0%,70%)', enthalpy: -566.9, desc: 'Strontium and iodine form SrI₂.', temp: 'Room temp', realUse: 'Research, optics' },

  // BARIUM HALIDES
  { id: 'baf2', reactants: ['Ba', 'F2'], eq: 'Ba + F₂ → BaF₂', balanced: 'Ba + F₂ → BaF₂', products: ['BaF2'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,90%)', enthalpy: -1203.0, desc: 'Barium reacts with fluorine.', safety: '⚠️ F₂ is toxic! Ba is toxic!', temp: 'Room temp', realUse: 'Optics, scintillation' },
  { id: 'babr2', reactants: ['Ba', 'Br2'], eq: 'Ba + Br₂ → BaBr₂', balanced: 'Ba + Br₂ → BaBr₂', products: ['BaBr2'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,80%)', enthalpy: -743.5, desc: 'Barium reacts with bromine.', safety: '⚠️ Br₂ is toxic! Ba is toxic!', temp: 'Room temp', realUse: 'Research, medicine' },
  { id: 'bai2', reactants: ['Ba', 'I2'], eq: 'Ba + I₂ → BaI₂', balanced: 'Ba + I₂ → BaI₂', products: ['BaI2'], type: 'synthesis', visual: 'color-change', color: 'hsl(0,0%,70%)', enthalpy: -602.1, desc: 'Barium and iodine form BaI₂.', safety: '⚠️ Ba is toxic!', temp: 'Room temp', realUse: 'Research, medicine' },

  // SODIUM HALIDES
  { id: 'naf', reactants: ['Na', 'F2'], eq: 'Na + F₂ → NaF', balanced: '2Na + F₂ → 2NaF', products: ['NaF'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,95%)', enthalpy: -575.3, desc: 'Sodium reacts with fluorine forming NaF.', safety: '⚠️ F₂ is toxic!', temp: 'Room temp', realUse: 'Toothpaste, water fluoridation' },
  { id: 'nabr', reactants: ['Na', 'Br2'], eq: 'Na + Br₂ → NaBr', balanced: '2Na + Br₂ → 2NaBr', products: ['NaBr'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,85%)', enthalpy: -361.0, desc: 'Sodium reacts with bromine.', safety: '⚠️ Br₂ is toxic!', temp: 'Room temp', realUse: 'Medicine, photography' },

  // POTASSIUM HALIDES
  { id: 'kf', reactants: ['K', 'F2'], eq: 'K + F₂ → KF', balanced: '2K + F₂ → 2KF', products: ['KF'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,90%)', enthalpy: -567.0, desc: 'Potassium reacts with fluorine.', safety: '⚠️ F₂ is toxic!', temp: 'Room temp', realUse: 'Research, optics' },
  { id: 'kbr', reactants: ['K', 'Br2'], eq: 'K + Br₂ → KBr', balanced: '2K + Br₂ → 2KBr', products: ['KBr'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,80%)', enthalpy: -392.0, desc: 'Potassium reacts with bromine.', safety: '⚠️ Br₂ is toxic!', temp: 'Room temp', realUse: 'Medicine, photography' },
  { id: 'ki', reactants: ['K', 'I2'], eq: 'K + I₂ → KI', balanced: '2K + I₂ → 2KI', products: ['KI'], type: 'synthesis', visual: 'color-change', color: 'hsl(0,0%,70%)', enthalpy: -328.0, desc: 'Potassium and iodine form KI.', temp: 'Room temp', realUse: 'Iodine supplement, photography' },

  // CESIUM HALIDES
  { id: 'csf', reactants: ['Cs', 'F2'], eq: 'Cs + F₂ → CsF', balanced: '2Cs + F₂ → 2CsF', products: ['CsF'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,85%)', enthalpy: -530.9, desc: 'Cesium reacts with fluorine.', safety: '⚠️ F₂ is toxic!', temp: 'Room temp', realUse: 'Catalysis, research' },
  { id: 'csbr', reactants: ['Cs', 'Br2'], eq: 'Cs + Br₂ → CsBr', balanced: '2Cs + Br₂ → 2CsBr', products: ['CsBr'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,75%)', enthalpy: -395.4, desc: 'Cesium reacts with bromine.', safety: '⚠️ Br₂ is toxic!', temp: 'Room temp', realUse: 'Research, optics' },


  // LITHIUM REACTIONS
  { id: 'lih2o', reactants: ['Li', 'H2O'], eq: 'Li + H₂O → LiOH + H₂', balanced: '2Li + 2H₂O → 2LiOH + H₂↑', products: ['LiOH', 'Hydrogen Gas'], type: 'single-replacement', visual: 'bubbles', color: 'hsl(0,70%,55%)', enthalpy: -222.8, desc: 'Lithium gently fizzes in water with crimson flame.', temp: 'Room temp', realUse: 'Battery chemistry, lithium extraction' },

  // ZINC REACTIONS
  { id: 'znhcl', reactants: ['Zn', 'HCl'], eq: 'Zn + HCl → ZnCl₂ + H₂', balanced: 'Zn + 2HCl → ZnCl₂ + H₂↑', products: ['ZnCl₂', 'Hydrogen Gas'], type: 'single-replacement', visual: 'bubbles', color: 'hsl(180,20%,60%)', enthalpy: -153.9, desc: 'Zinc dissolves in acid producing hydrogen bubbles.', temp: 'Room temp', realUse: 'Hydrogen generation, galvanizing' },

  // LEAD REACTIONS
  { id: 'pbi2', reactants: ['Pb', 'I2'], eq: 'Pb²⁺ + I⁻ → PbI₂', balanced: 'Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃', products: ['Golden Rain (PbI₂)'], type: 'precipitation', visual: 'precipitate', color: 'hsl(50,90%,55%)', enthalpy: -175.5, desc: 'Beautiful golden-yellow precipitate — "golden rain" demo!', safety: '⚠️ Lead is toxic!', temp: 'Room temp', realUse: 'Solar cells, qualitative analysis' },

  // SILVER REACTIONS
  { id: 'ag2s', reactants: ['Ag', 'S'], eq: 'Ag + S → Ag₂S', balanced: '2Ag + S → Ag₂S', products: ['Silver Tarnish (Ag₂S)'], type: 'synthesis', visual: 'color-change', color: 'hsl(0,0%,20%)', enthalpy: -32.6, desc: 'Silver tarnishes forming black silver sulfide.', temp: 'Room temp (slow)', realUse: 'Photography, silver care, chemistry' },

  // PHOSPHORUS REACTIONS
  { id: 'p2o5', reactants: ['P', 'O2'], eq: 'P + O₂ → P₂O₅', balanced: '4P + 5O₂ → 2P₂O₅', products: ['Phosphorus Pentoxide'], type: 'combustion', visual: 'smoke', color: 'hsl(0,0%,85%)', enthalpy: -1492.0, desc: 'White phosphorus ignites in air producing dense white smoke.', safety: '⚠️ PYROPHORIC! Ignites at 34°C!', temp: 'Spontaneous >34°C', realUse: 'Phosphoric acid, drying agent' },

  // CHLORINE REACTIONS
  { id: 'hcl', reactants: ['H2', 'Cl2'], eq: 'H₂ + Cl₂ → HCl', balanced: 'H₂ + Cl₂ → 2HCl', products: ['Hydrochloric Acid (HCl)'], type: 'synthesis', visual: 'gas-release', color: 'hsl(120,40%,50%)', enthalpy: -184.6, desc: 'Hydrogen and chlorine form hydrochloric acid gas.', safety: '⚠️ HCl is corrosive!', temp: 'UV or >250°C', realUse: 'Industrial HCl, PVC production' },

  // FLUORINE REACTIONS
  { id: 'hf', reactants: ['H2', 'F2'], eq: 'H₂ + F₂ → HF', balanced: 'H₂ + F₂ → 2HF', products: ['Hydrofluoric Acid (HF)'], type: 'synthesis', visual: 'explosion', color: 'hsl(160,50%,60%)', enthalpy: -271.1, desc: 'Most violent chemical reaction! Spontaneous even at -250°C!', safety: '⚠️ EXTREMELY DANGEROUS! HF is fatal.', temp: 'Spontaneous!', realUse: 'Glass etching, Teflon production' },

  // CARBON REACTIONS
  { id: 'co2', reactants: ['C', 'O2'], eq: 'C + O₂ → CO₂', balanced: 'C + O₂ → CO₂', products: ['Carbon Dioxide (CO₂)'], type: 'combustion', visual: 'fire', color: 'hsl(20,90%,55%)', enthalpy: -393.5, desc: 'Carbon combustion — fundamental to energy production.', temp: 'Ignition ~700°C', realUse: 'Fossil fuel energy, CO₂ production' },
  { id: 'ch4', reactants: ['C', 'H2'], eq: 'C + H₂ → CH₄', balanced: 'C + 2H₂ → CH₄', products: ['Methane (CH₄)'], type: 'synthesis', visual: 'gas-release', color: 'hsl(180,40%,50%)', enthalpy: -74.8, desc: 'Carbon and hydrogen form methane — natural gas.', temp: '>500°C + catalyst', realUse: 'Natural gas, fuel, energy' },

  // SILICON REACTIONS
  { id: 'sio2', reactants: ['Si', 'O2'], eq: 'Si + O₂ → SiO₂', balanced: 'Si + O₂ → SiO₂', products: ['Silicon Dioxide (SiO₂)'], type: 'oxidation', visual: 'crystallize', color: 'hsl(0,0%,88%)', enthalpy: -911.0, desc: 'Silicon oxidizes to form quartz/glass.', temp: '>1000°C', realUse: 'Glass, semiconductors, sand' },

  // TIN REACTIONS

  // NICKEL REACTIONS
  { id: 'nio', reactants: ['Ni', 'O2'], eq: 'Ni + O₂ → NiO', balanced: '2Ni + O₂ → 2NiO', products: ['Nickel Oxide (NiO)'], type: 'oxidation', visual: 'color-change', color: 'hsl(120,20%,30%)', enthalpy: -239.7, desc: 'Nickel oxidizes to green-black nickel oxide.', temp: '>400°C', realUse: 'Ceramics, batteries, alloys' },

  // COBALT REACTIONS
  { id: 'coo', reactants: ['Co', 'O2'], eq: 'Co + O₂ → Co₃O₄', balanced: '3Co + 2O₂ → Co₃O₄', products: ['Cobalt Oxide'], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,20%)', enthalpy: -891.0, desc: 'Cobalt forms blue-black oxide.', temp: '>300°C', realUse: 'Blue glass, pigments, catalysis' },

  // MANGANESE REACTIONS
  { id: 'mno2', reactants: ['Mn', 'O2'], eq: 'Mn + O₂ → MnO₂', balanced: 'Mn + O₂ → MnO₂', products: ['Manganese Dioxide'], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,15%)', enthalpy: -520.0, desc: 'Manganese forms dark MnO₂ — battery material.', temp: '>500°C', realUse: 'Dry cell batteries, catalysis' },

  // CHROMIUM REACTIONS
  { id: 'cr2o3', reactants: ['Cr', 'O2'], eq: 'Cr + O₂ → Cr₂O₃', balanced: '4Cr + 3O₂ → 2Cr₂O₃', products: ['Chromium(III) Oxide'], type: 'oxidation', visual: 'color-change', color: 'hsl(120,50%,30%)', enthalpy: -1139.7, desc: 'Chromium forms green Cr₂O₃ — protective coating.', temp: '>600°C', realUse: 'Pigments, stainless steel' },

  // TITANIUM REACTIONS
  { id: 'tio2', reactants: ['Ti', 'O2'], eq: 'Ti + O₂ → TiO₂', balanced: 'Ti + O₂ → TiO₂', products: ['Titanium Dioxide (TiO₂)'], type: 'oxidation', visual: 'glow', color: 'hsl(0,0%,98%)', enthalpy: -944.0, desc: 'TiO₂ — brilliant white pigment used everywhere.', temp: '>600°C', realUse: 'White paint, sunscreen, cosmetics' },
  { id: 'tin', reactants: ['Ti', 'N2'], eq: 'Ti + N₂ → TiN', balanced: '2Ti + N₂ → 2TiN', products: ['Titanium Nitride (TiN)'], type: 'synthesis', visual: 'glow', color: 'hsl(45,80%,50%)', enthalpy: -337.7, desc: 'Golden-colored ceramic coating.', temp: '>1200°C', realUse: 'Tool coatings, implants, wear resistance' },

  // VANADIUM REACTIONS
  { id: 'v2o5', reactants: ['V', 'O2'], eq: 'V + O₂ → V₂O₅', balanced: '4V + 5O₂ → 2V₂O₅', products: ['Vanadium Pentoxide'], type: 'oxidation', visual: 'color-change', color: 'hsl(50,40%,45%)', enthalpy: -1550.2, desc: 'Vanadium forms orange-red V₂O₅.', temp: '>1000°C', realUse: 'Catalysts, batteries, alloys' },

  // BARIUM REACTIONS

  // CESIUM REACTIONS

  // RUBIDIUM REACTIONS

  // TUNGSTEN REACTIONS
  { id: 'wo3', reactants: ['W', 'O2'], eq: 'W + O₂ → WO₃', balanced: '2W + 3O₂ → 2WO₃', products: ['Tungsten Trioxide'], type: 'oxidation', visual: 'glow', color: 'hsl(55,60%,50%)', enthalpy: -842.9, desc: 'Tungsten oxidizes at high temp forming yellow WO₃.', temp: '>400°C', realUse: 'Smart windows, catalysis, ceramics' },

  // PLATINUM REACTIONS
  { id: 'pto2', reactants: ['Pt', 'O2'], eq: 'Pt + O₂ → PtO₂', balanced: 'Pt + O₂ → PtO₂', products: ['Platinum Dioxide'], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,30%)', enthalpy: -80.0, desc: 'Platinum resists oxidation — noble metal catalyst.', temp: '>450°C', realUse: 'Catalytic converters, jewelry' },

  // BISMUTH REACTIONS
  { id: 'bi2o3', reactants: ['Bi', 'O2'], eq: 'Bi + O₂ → Bi₂O₃', balanced: '4Bi + 3O₂ → 2Bi₂O₃', products: ['Bismuth Oxide'], type: 'oxidation', visual: 'color-change', color: 'hsl(50,40%,50%)', enthalpy: -573.9, desc: 'Bismuth forms yellow bismuth oxide.', temp: '>271°C', realUse: 'Cosmetics, pharmaceuticals, ceramics' },

  // GOLD REACTIONS
  { id: 'aucl3', reactants: ['Au', 'Cl2'], eq: 'Au + Cl₂ → AuCl₃', balanced: '2Au + 3Cl₂ → 2AuCl₃', products: ['Gold Chloride (AuCl₃)'], type: 'synthesis', visual: 'dissolve', color: 'hsl(45,90%,50%)', enthalpy: -117.6, desc: 'Gold dissolved by chlorine — gold refining.', safety: '⚠️ Cl₂ is toxic!', temp: '~200°C', realUse: 'Gold refining, jewelry chemical processes' },

  // ALUMINUM BROMIDE
  { id: 'albr3', reactants: ['Al', 'Br2'], eq: 'Al + Br₂ → AlBr₃', balanced: '2Al + 3Br₂ → 2AlBr₃', products: ['Aluminum Bromide'], type: 'synthesis', visual: 'crystallize', color: 'hsl(15,60%,50%)', enthalpy: -527.2, desc: 'Vigorous reaction producing solid aluminum bromide crystals.', safety: '⚠️ Bromine is very corrosive!', temp: 'Room temp', realUse: 'Friedel-Crafts catalyst, synthesis' },
  { id: 'bebr2', reactants: ['Be', 'Br2'], eq: 'Be + Br₂ → BeBr₂', balanced: 'Be + Br₂ → BeBr₂', products: ['Beryllium Bromide (BeBr₂)'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,80%)', enthalpy: -378.2, desc: 'Beryllium reacts with bromine.', safety: '⚠️ Br₂ is toxic! Be is toxic!', temp: 'Room temp', realUse: 'Research, synthesis' },
  { id: 'bei2', reactants: ['Be', 'I2'], eq: 'Be + I₂ → BeI₂', balanced: 'Be + I₂ → BeI₂', products: ['Beryllium Iodide (BeI₂)'], type: 'synthesis', visual: 'color-change', color: 'hsl(0,0%,75%)', enthalpy: -206.3, desc: 'Beryllium and iodine form BeI₂.', safety: '⚠️ Be is toxic!', temp: 'Room temp', realUse: 'Research, synthesis' },
  { id: 'cacl2', reactants: ['Ca', 'Cl2'], eq: 'Ca + Cl₂ → CaCl₂', balanced: 'Ca + Cl₂ → CaCl₂', products: ['Calcium Chloride (CaCl₂)'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,90%)', enthalpy: -795.8, desc: 'Calcium reacts with chlorine.', safety: '⚠️ Cl₂ is toxic!', temp: 'Room temp', realUse: 'De-icing, food additive' },
  { id: 'rao', reactants: ['Ra', 'O2'], eq: 'Ra + O₂ → RaO', balanced: '2Ra + O₂ → 2RaO', products: ['Radium Oxide (RaO)'], type: 'oxidation', visual: 'glow', color: 'hsl(0,0%,80%)', enthalpy: -530.0, desc: 'Radium oxidizes to RaO.', safety: '⚠️ Ra is radioactive!', temp: '>100°C', realUse: 'Research, historical' },
  { id: 'raf2', reactants: ['Ra', 'F2'], eq: 'Ra + F₂ → RaF₂', balanced: 'Ra + F₂ → RaF₂', products: ['Radium Fluoride (RaF₂)'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,85%)', enthalpy: -1200.0, desc: 'Radium reacts with fluorine.', safety: '⚠️ F₂ is toxic! Ra is radioactive!', temp: 'Room temp', realUse: 'Research' },
  { id: 'racl2', reactants: ['Ra', 'Cl2'], eq: 'Ra + Cl₂ → RaCl₂', balanced: 'Ra + Cl₂ → RaCl₂', products: ['Radium Chloride (RaCl₂)'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,80%)', enthalpy: -850.0, desc: 'Radium reacts with chlorine.', safety: '⚠️ Cl₂ is toxic! Ra is radioactive!', temp: 'Room temp', realUse: 'Research' },
  { id: 'rabr2', reactants: ['Ra', 'Br2'], eq: 'Ra + Br₂ → RaBr₂', balanced: 'Ra + Br₂ → RaBr₂', products: ['Radium Bromide (RaBr₂)'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,75%)', enthalpy: -735.0, desc: 'Radium reacts with bromine.', safety: '⚠️ Br₂ is toxic! Ra is radioactive!', temp: 'Room temp', realUse: 'Research' },
  { id: 'rai2', reactants: ['Ra', 'I2'], eq: 'Ra + I₂ → RaI₂', balanced: 'Ra + I₂ → RaI₂', products: ['Radium Iodide (RaI₂)'], type: 'synthesis', visual: 'color-change', color: 'hsl(0,0%,65%)', enthalpy: -595.0, desc: 'Radium and iodine form RaI₂.', safety: '⚠️ Ra is radioactive!', temp: 'Room temp', realUse: 'Research' },
  { id: 'b2o3', reactants: ['B', 'O2'], eq: 'B + O₂ → B₂O₃', balanced: '4B + 3O₂ → 2B₂O₃', products: ['Boric Oxide (B₂O₃)'], type: 'oxidation', visual: 'glow', color: 'hsl(0,0%,90%)', enthalpy: -1273.0, desc: 'Boron burns to form boric oxide.', temp: '>700°C', realUse: 'Glass, ceramics' },
  { id: 'bf3', reactants: ['B', 'F2'], eq: 'B + F₂ → BF₃', balanced: '2B + 3F₂ → 2BF₃', products: ['Boron Trifluoride (BF₃)'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,95%)', enthalpy: -1136.0, desc: 'Boron reacts with fluorine.', safety: '⚠️ F₂ is toxic!', temp: 'Room temp', realUse: 'Catalysis, research' },
  { id: 'bcl3', reactants: ['B', 'Cl2'], eq: 'B + Cl₂ → BCl₃', balanced: '2B + 3Cl₂ → 2BCl₃', products: ['Boron Trichloride (BCl₃)'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,85%)', enthalpy: -427.0, desc: 'Boron reacts with chlorine.', safety: '⚠️ Cl₂ is toxic!', temp: 'Room temp', realUse: 'Catalysis, semiconductors' },
  { id: 'ga2o3', reactants: ['Ga', 'O2'], eq: 'Ga + O₂ → Ga₂O₃', balanced: '4Ga + 3O₂ → 2Ga₂O₃', products: ['Gallium Oxide (Ga₂O₃)'], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,85%)', enthalpy: -1089.0, desc: 'Gallium oxidizes to Ga₂O₃.', temp: '>200°C', realUse: 'LEDs, semiconductors' },
  { id: 'gaf3', reactants: ['Ga', 'F2'], eq: 'Ga + F₂ → GaF₃', balanced: '2Ga + 3F₂ → 2GaF₃', products: ['Gallium Trifluoride (GaF₃)'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,90%)', enthalpy: -1163.0, desc: 'Gallium reacts with fluorine.', safety: '⚠️ F₂ is toxic!', temp: 'Room temp', realUse: 'Research, catalysis' },
  { id: 'gacl3', reactants: ['Ga', 'Cl2'], eq: 'Ga + Cl₂ → GaCl₃', balanced: '2Ga + 3Cl₂ → 2GaCl₃', products: ['Gallium Trichloride (GaCl₃)'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,80%)', enthalpy: -523.0, desc: 'Gallium reacts with chlorine.', safety: '⚠️ Cl₂ is toxic!', temp: 'Room temp', realUse: 'Semiconductors, research' },
  { id: 'in2o3', reactants: ['In', 'O2'], eq: 'In + O₂ → In₂O₃', balanced: '4In + 3O₂ → 2In₂O₃', products: ['Indium Oxide (In₂O₃)'], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,80%)', enthalpy: -925.0, desc: 'Indium oxidizes to In₂O₃.', temp: '>200°C', realUse: 'Transparent conductors, LCDs' },
  { id: 'inf3', reactants: ['In', 'F2'], eq: 'In + F₂ → InF₃', balanced: '2In + 3F₂ → 2InF₃', products: ['Indium Trifluoride (InF₃)'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,85%)', enthalpy: -1190.0, desc: 'Indium reacts with fluorine.', safety: '⚠️ F₂ is toxic!', temp: 'Room temp', realUse: 'Research, optics' },
  { id: 'incl3', reactants: ['In', 'Cl2'], eq: 'In + Cl₂ → InCl₃', balanced: '2In + 3Cl₂ → 2InCl₃', products: ['Indium Trichloride (InCl₃)'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,75%)', enthalpy: -537.0, desc: 'Indium reacts with chlorine.', safety: '⚠️ Cl₂ is toxic!', temp: 'Room temp', realUse: 'Catalysis, research' },
  { id: 'tl2o3', reactants: ['Tl', 'O2'], eq: 'Tl + O₂ → Tl₂O₃', balanced: '4Tl + 3O₂ → 2Tl₂O₃', products: ['Thallium Oxide (Tl₂O₃)'], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,70%)', enthalpy: -390.0, desc: 'Thallium oxidizes to Tl₂O₃.', safety: '⚠️ Tl is toxic!', temp: '>100°C', realUse: 'Research, optics' },
  { id: 'tlf', reactants: ['Tl', 'F2'], eq: 'Tl + F₂ → TlF', balanced: '2Tl + F₂ → 2TlF', products: ['Thallium Fluoride (TlF)'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,80%)', enthalpy: -327.0, desc: 'Thallium reacts with fluorine.', safety: '⚠️ F₂ is toxic! Tl is toxic!', temp: 'Room temp', realUse: 'Research' },
  { id: 'tlcl', reactants: ['Tl', 'Cl2'], eq: 'Tl + Cl₂ → TlCl', balanced: '2Tl + Cl₂ → 2TlCl', products: ['Thallium Chloride (TlCl)'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,75%)', enthalpy: -205.0, desc: 'Thallium reacts with chlorine.', safety: '⚠️ Cl₂ is toxic! Tl is toxic!', temp: 'Room temp', realUse: 'Research' },
  { id: 'cn2', reactants: ['C', 'N2'], eq: 'C + N₂ → CN₂', balanced: 'C + N₂ → CN₂', products: ['Cyanogen (CN₂)'], type: 'synthesis', visual: 'gas-release', color: 'hsl(180,40%,50%)', enthalpy: 306.0, desc: 'Carbon and nitrogen form cyanogen.', safety: '⚠️ CN₂ is toxic!', temp: '>1000°C', realUse: 'Research, synthesis' },
  { id: 'sif4', reactants: ['Si', 'F2'], eq: 'Si + F₂ → SiF₄', balanced: 'Si + 2F₂ → SiF₄', products: ['Silicon Tetrafluoride (SiF₄)'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,95%)', enthalpy: -1615.0, desc: 'Silicon reacts with fluorine.', safety: '⚠️ F₂ is toxic!', temp: 'Room temp', realUse: 'Semiconductors, research' },
  { id: 'sic', reactants: ['Si', 'C'], eq: 'Si + C → SiC', balanced: 'Si + C → SiC', products: ['Silicon Carbide (SiC)'], type: 'synthesis', visual: 'glow', color: 'hsl(0,0%,85%)', enthalpy: -73.0, desc: 'Silicon and carbon form SiC.', temp: '>1600°C', realUse: 'Abrasives, ceramics' },
  { id: 'sin', reactants: ['Si', 'N2'], eq: 'Si + N₂ → Si₃N₄', balanced: '3Si + 2N₂ → Si₃N₄', products: ['Silicon Nitride (Si₃N₄)'], type: 'synthesis', visual: 'glow', color: 'hsl(0,0%,90%)', enthalpy: -743.0, desc: 'Silicon reacts with nitrogen.', temp: '>1300°C', realUse: 'Ceramics, electronics' },
  { id: 'pf3', reactants: ['P', 'F2'], eq: 'P + F₂ → PF₃', balanced: '2P + 3F₂ → 2PF₃', products: ['Phosphorus Trifluoride (PF₃)'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,90%)', enthalpy: -958.0, desc: 'Phosphorus reacts with fluorine.', safety: '⚠️ F₂ is toxic!', temp: 'Room temp', realUse: 'Catalysis, research' },
  { id: 'asf3', reactants: ['As', 'F2'], eq: 'As + F₂ → AsF₃', balanced: '2As + 3F₂ → 2AsF₃', products: ['Arsenic Trifluoride (AsF₃)'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,90%)', enthalpy: -821.0, desc: 'Arsenic reacts with fluorine.', safety: '⚠️ F₂ is toxic! As is toxic!', temp: 'Room temp', realUse: 'Research' },
  { id: 'nai', reactants: ['Na', 'I2'], eq: 'Na + I₂ → NaI', balanced: '2Na + I₂ → 2NaI', products: ['Sodium Iodide (NaI)'], type: 'synthesis', visual: 'color-change', color: 'hsl(0,0%,80%)', enthalpy: -288.0, desc: 'Sodium and iodine form NaI.', temp: 'Room temp', realUse: 'Medicine, photography' },

  // ZINC REACTIONS (additional)
  { id: 'znbr2', reactants: ['Zn', 'Br2'], eq: 'Zn + Br₂ → ZnBr₂', balanced: 'Zn + Br₂ → ZnBr₂', products: ['Zinc Bromide (ZnBr₂)'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,80%)', enthalpy: -329.7, desc: 'Zinc reacts with bromine.', safety: '⚠️ Br₂ is toxic!', temp: 'Room temp', realUse: 'Research, medicine' },
  { id: 'zni2', reactants: ['Zn', 'I2'], eq: 'Zn + I₂ → ZnI₂', balanced: 'Zn + I₂ → ZnI₂', products: ['Zinc Iodide (ZnI₂)'], type: 'synthesis', visual: 'color-change', color: 'hsl(0,0%,70%)', enthalpy: -208.0, desc: 'Zinc and iodine form ZnI₂.', temp: 'Room temp', realUse: 'Catalysis, research' },

  // MERCURY REACTIONS

  // LEAD REACTIONS

  // SILVER REACTIONS

  // CADMIUM REACTIONS

  // TIN REACTIONS (additional)

  // ANTIMONY REACTIONS

  // BISMUTH REACTIONS (additional)

  // DISPROPORTIONATION REACTIONS
  { id: 'na2o-h2o', reactants: ['Na2O', 'H2O'], eq: 'Na₂O + H₂O → 2NaOH', balanced: 'Na₂O + H₂O → 2NaOH', products: ['NaOH'], type: 'synthesis', visual: 'glow', color: 'hsl(45,60%,70%)', enthalpy: -125.0, desc: 'Sodium oxide reacts vigorously with water.', temp: 'Room temp', realUse: 'NaOH production' },
  { id: 'cl2-h2o', reactants: ['Cl2', 'H2O'], eq: 'Cl₂ + H₂O ⇌ HCl + HClO', balanced: 'Cl₂ + H₂O ⇌ HCl + HClO', products: ['HCl', 'HClO'], type: 'redox', visual: 'color-change', color: 'hsl(90,60%,50%)', enthalpy: -14.5, desc: 'Chlorine disproportionates in water forming HCl and HClO.', temp: 'Room temp', realUse: 'Disinfection, bleaching', smiles: 'Cl' },
  { id: 'br2-h2o', reactants: ['Br2', 'H2O'], eq: 'Br₂ + H₂O ⇌ HBr + HBrO', balanced: 'Br₂ + H₂O ⇌ HBr + HBrO', products: ['HBr', 'HBrO'], type: 'redox', visual: 'color-change', color: 'hsl(10,70%,50%)', enthalpy: -11.0, desc: 'Bromine disproportionates in water.', temp: 'Room temp', realUse: 'Analysis, oxidation', smiles: 'Br' },
  { id: 'i2-oh', reactants: ['I2', 'KOH'], eq: 'I₂ + 2KOH → KI + KIO + H₂O', balanced: 'I₂ + 2KOH → KI + KIO + H₂O', products: ['KI', 'KIO', 'H2O'], type: 'redox', visual: 'color-change', color: 'hsl(45,80%,50%)', enthalpy: -55.6, desc: 'Iodine disproportionates in alkaline solution.', temp: 'Room temp', realUse: 'Qualitative analysis', smiles: '[K+].[I-]' },
  { id: 's-oh', reactants: ['S', 'NaOH'], eq: '3S + 6NaOH → 5NaHS + NaSO₃', balanced: '3S + 6NaOH → 5NaHS + NaSO₃', products: ['NaHS', 'NaSO3', 'H2O'], type: 'redox', visual: 'dissolve', color: 'hsl(45,60%,60%)', enthalpy: -180.0, desc: 'Sulfur disproportionates in strong base.', temp: 'Room temp', realUse: 'Chemistry laboratory reactions' },

  // HYDROLYSIS REACTIONS
  { id: 'sio2-h2o', reactants: ['SiCl4', 'H2O'], eq: 'SiCl₄ + 3H₂O → SiO₂ + 4HCl', balanced: 'SiCl₄ + 3H₂O → SiO₂ + 4HCl', products: ['SiO2', 'HCl'], type: 'hydrolysis', visual: 'precipitate', color: 'hsl(0,0%,90%)', enthalpy: -160.0, desc: 'Silicon tetrachloride hydrolyzes producing silica gel.', temp: 'Room temp', realUse: 'Glass production, silica materials' },
  { id: 'pcl3-h2o', reactants: ['PCl3', 'H2O'], eq: 'PCl₃ + 3H₂O → H₃PO₃ + 3HCl', balanced: 'PCl₃ + 3H₂O → H₃PO₃ + 3HCl', products: ['H3PO3', 'HCl'], type: 'hydrolysis', visual: 'spark', color: 'hsl(0,0%,85%)', enthalpy: -223.0, desc: 'Phosphorus trichloride hydrolyzes violently to phosphorous acid.', temp: 'Room temp', realUse: 'Phosphorus chemistry' },
  { id: 'nacn-h2o', reactants: ['NaCN', 'H2O'], eq: 'NaCN + H₂O ⇌ NaOH + HCN', balanced: 'NaCN + H₂O ⇌ NaOH + HCN', products: ['NaOH', 'HCN'], type: 'hydrolysis', visual: 'dissolve', color: 'hsl(0,0%,85%)', enthalpy: 2.6, desc: 'Sodium cyanide undergoes partial hydrolysis producing toxic HCN.', safety: '⚠️ HCN is extremely toxic!', temp: 'Room temp', realUse: 'Hydrolysis reactions' },
  { id: 'na2s-h2o', reactants: ['Na2S', 'H2O'], eq: 'Na₂S + H₂O ⇌ NaHS + NaOH', balanced: 'Na₂S + H₂O ⇌ NaHS + NaOH', products: ['NaHS', 'NaOH'], type: 'hydrolysis', visual: 'dissolve', color: 'hsl(45,60%,70%)', enthalpy: -42.0, desc: 'Sodium sulfide hydrolyzes producing alkaline solution.', temp: 'Room temp', realUse: 'Leather processing, chemistry' },

  // ESTERIFICATION REACTIONS
  { id: 'ethanol-acetic', reactants: ['C2H5OH', 'CH3COOH'], eq: 'C₂H₅OH + CH₃COOH ⇌ CH₃COOC₂H₅ + H₂O', balanced: 'C₂H₅OH + CH₃COOH ⇌ CH₃COOC₂H₅ + H₂O', products: ['CH3COOC2H5', 'H2O'], type: 'esterification', visual: 'dissolve', color: 'hsl(45,60%,70%)', enthalpy: -11.0, desc: 'Ethanol reacts with acetic acid to form ethyl acetate (reversible).', catalyst: 'H₂SO₄', temp: '60-70°C', realUse: 'Solvent production, fragrances' },
  { id: 'methanol-formic', reactants: ['CH3OH', 'HCOOH'], eq: 'CH₃OH + HCOOH ⇌ HCOOCH₃ + H₂O', balanced: 'CH₃OH + HCOOH ⇌ HCOOCH₃ + H₂O', products: ['HCOOCH3', 'H2O'], type: 'esterification', visual: 'dissolve', color: 'hsl(200,40%,70%)', enthalpy: -10.0, desc: 'Methanol reacts with formic acid forming methyl formate.', catalyst: 'H₂SO₄', temp: 'Room temp', realUse: 'Fumigant, synthesis' },

  // ADDITIONAL WELL-ESTABLISHED REACTIONS
  { id: 'cao-h2o', reactants: ['CaO', 'H2O'], eq: 'CaO + H₂O → Ca(OH)₂', balanced: 'CaO + H₂O → Ca(OH)₂', products: ['Ca(OH)2'], type: 'synthesis', visual: 'glow', color: 'hsl(0,0%,85%)', enthalpy: -65.2, desc: 'Quicklime reacts with water releasing heat (slaking).', temp: 'Room temp', realUse: 'Cement production, liming' },
  { id: 'p4o10-h2o', reactants: ['P4O10', 'H2O'], eq: 'P₄O₁₀ + 6H₂O → 4H₃PO₄', balanced: 'P₄O₁₀ + 6H₂O → 4H₃PO₄', products: ['H3PO4'], type: 'synthesis', visual: 'glow', color: 'hsl(0,0%,85%)', enthalpy: -168.0, desc: 'Phosphorus pentoxide reacts with water to form phosphoric acid.', temp: 'Room temp', realUse: 'Phosphoric acid production' },
  { id: 'so3-h2o', reactants: ['SO3', 'H2O'], eq: 'SO₃ + H₂O → H₂SO₄', balanced: 'SO₃ + H₂O → H₂SO₄', products: ['H2SO4'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,80%)', enthalpy: -132.0, desc: 'Sulfur trioxide reacts violently with water forming sulfuric acid.', temp: 'Room temp (violent)', realUse: 'Sulfuric acid production' },
  { id: 'n2o5-h2o', reactants: ['N2O5', 'H2O'], eq: 'N₂O₅ + H₂O → 2HNO₃', balanced: 'N₂O₅ + H₂O → 2HNO₃', products: ['HNO3'], type: 'synthesis', visual: 'dissolve', color: 'hsl(0,0%,90%)', enthalpy: -138.0, desc: 'Dinitrogen pentoxide reacts with water forming nitric acid.', temp: 'Room temp', realUse: 'Nitric acid production' },

  // REDOX REACTIONS - ADDITIONAL
  { id: 'c-co2', reactants: ['C', 'CO2'], eq: '2C + O₂ → 2CO', balanced: '2C + O₂ → 2CO', products: ['CO'], type: 'redox', visual: 'gas-release', color: 'hsl(0,0%,85%)', enthalpy: -221.0, desc: 'Carbon burns with limited oxygen forming carbon monoxide.', temp: '~700°C', realUse: 'Industrial chemistry, metallurgy' },
  { id: 'fe-o2-limited', reactants: ['Fe', 'O2'], eq: '3Fe + 2O₂ → Fe₃O₄', balanced: '3Fe + 2O₂ → Fe₃O₄', products: ['Fe3O4'], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,15%)', enthalpy: -1118.4, desc: 'Iron oxidizes to magnetic iron oxide under specific conditions.', temp: '>570°C', realUse: 'Magnetic materials' },
  { id: 's-hno3-dilute', reactants: ['S', 'HNO3'], eq: 'S + 2HNO₃ → H₂SO₄ + 2NO↑', balanced: 'S + 6HNO₃ → H₂SO₄ + 6NO↑', products: ['H2SO4', 'NO'], type: 'redox', visual: 'gas-release', color: 'hsl(0,60%,50%)', enthalpy: -300.0, desc: 'Sulfur reacts with dilute nitric acid forming sulfuric acid.', temp: 'Room temp', realUse: 'Sulfuric acid production' },
  { id: 'p-hno3', reactants: ['P', 'HNO3'], eq: 'P + 5HNO₃ → H₃PO₄ + 5NO₂', balanced: 'P + 5HNO₃ → H₃PO₄ + 5NO₂', products: ['H3PO4', 'NO2'], type: 'redox', visual: 'gas-release', color: 'hsl(0,60%,50%)', enthalpy: -280.0, desc: 'White phosphorus oxidizes in nitric acid forming phosphoric acid.', temp: 'Room temp', realUse: 'Phosphoric acid synthesis' },

  // CHLORINE REACTIONS
  { id: 'h2-cl2', reactants: ['H2', 'Cl2'], eq: 'H₂ + Cl₂ → 2HCl', balanced: 'H₂ + Cl₂ → 2HCl', products: ['HCl'], type: 'synthesis', visual: 'spark', color: 'hsl(180,60%,60%)', enthalpy: -184.6, desc: 'Hydrogen reacts with chlorine in sunlight (explosive).', safety: '⚠️ Explosive with light!', temp: '>200°C or with UV', realUse: 'Hydrogen chloride production' },
  { id: 'c-cl2', reactants: ['C', 'Cl2'], eq: 'C + 2Cl₂ → CCl₄', balanced: 'C + 2Cl₂ → CCl₄', products: ['CCl4'], type: 'synthesis', visual: 'spark', color: 'hsl(0,0%,75%)', enthalpy: -320.0, desc: 'Carbon reacts with chlorine forming carbon tetrachloride.', temp: 'Room temp', realUse: 'Solvents, refrigerants' },
  { id: 'p4-cl2', reactants: ['P4', 'Cl2'], eq: 'P₄ + 10Cl₂ → 4PCl₅', balanced: 'P₄ + 10Cl₂ → 4PCl₅', products: ['PCl5'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,80%)', enthalpy: -2450.0, desc: 'White phosphorus reacts with excess chlorine forming PCl₅.', temp: 'Room temp', realUse: 'Organic synthesis, chlorination' },

  // SULFUR REACTIONS  
  { id: 'fe-s', reactants: ['Fe', 'S'], eq: 'Fe + S → FeS', balanced: 'Fe + S → FeS', products: ['FeS'], type: 'synthesis', visual: 'glow', color: 'hsl(45,40%,30%)', enthalpy: -100.0, desc: 'Iron and sulfur combine when heated, releasing heat.', safety: '⚠️ Exothermic!', temp: '~600°C', realUse: 'Teaching chemical bonds' },
  { id: 'cu-s', reactants: ['Cu', 'S'], eq: 'Cu + S → CuS', balanced: 'Cu + S → CuS', products: ['CuS'], type: 'synthesis', visual: 'color-change', color: 'hsl(220,20%,15%)', enthalpy: -53.1, desc: 'Copper and sulfur form black copper sulfide when heated.', temp: '~400°C', realUse: 'Semiconductors' },

  // NUCLEAR REACTIONS (simplified)
  { id: 'u235n', reactants: ['U', 'n'], eq: '²³⁵U + n → ¹⁴²Ba + ⁹²Kr + 3n', balanced: '²³⁵U + n → ¹⁴²Ba + ⁹²Kr + 3n', products: ['Barium-142', 'Krypton-92', 'Neutrons'], type: 'redox', visual: 'explosion', color: 'hsl(60,100%,70%)', enthalpy: -2.0e8, desc: 'Nuclear fission of uranium-235.', safety: '⚠️ RADIOACTIVE!', temp: 'Critical mass', realUse: 'Nuclear power, weapons' },

  // PHOTOSYNTHESIS

  // INDUSTRIAL REACTIONS
  { id: 'haberbosch', reactants: ['N2', 'H2'], eq: 'N₂ + 3H₂ → 2NH₃', balanced: 'N₂ + 3H₂ ⇌ 2NH₃', products: ['Ammonia'], type: 'synthesis', visual: 'gas-release', color: 'hsl(200,40%,60%)', enthalpy: -92.4, desc: 'Haber-Bosch process for ammonia synthesis.', temp: '400-500°C, 200 atm', catalyst: 'Fe', realUse: 'Fertilizers, explosives', smiles: 'N' },
  { id: 'contactprocess', reactants: ['S', 'O2'], eq: '2SO₂ + O₂ → 2SO₃', balanced: '2SO₂ + O₂ ⇌ 2SO₃', products: ['Sulfur Trioxide'], type: 'oxidation', visual: 'gas-release', color: 'hsl(0,0%,90%)', enthalpy: -198.2, desc: 'Contact process for sulfuric acid production.', temp: '400-600°C', catalyst: 'V₂O₅', realUse: 'Sulfuric acid, detergents' },

  // BIOCHEMICAL REACTIONS

  // CATALYTIC REACTIONS
  { id: 'catalyticcracking', reactants: ['C', 'H2'], eq: 'C₁₆H₃₄ → C₈H₁₈ + C₈H₁₆', balanced: 'C₁₆H₃₄ → C₈H₁₈ + C₈H₁₆', products: ['Octane', 'Octene'], type: 'decomposition', visual: 'vapor', color: 'hsl(0,0%,80%)', enthalpy: 50.0, desc: 'Catalytic cracking of hydrocarbons.', temp: '500°C', catalyst: 'Zeolite', realUse: 'Petroleum refining, gasoline' },

  // ELECTROCHEMICAL REACTIONS
  { id: 'electrolysis', reactants: ['H2', 'O2'], eq: '2H₂O → 2H₂ + O₂', balanced: '2H₂O → 2H₂↑ + O₂↑', products: ['Hydrogen Gas', 'Oxygen Gas'], type: 'decomposition', visual: 'bubbles', color: 'hsl(200,60%,70%)', enthalpy: 285.8, desc: 'Water electrolysis produces hydrogen and oxygen.', temp: 'Room temp', realUse: 'Hydrogen fuel, oxygen production' },
  { id: 'danielcell', reactants: ['Zn', 'Cu'], eq: 'Zn + Cu²⁺ → Zn²⁺ + Cu', balanced: 'Zn + Cu²⁺ → Zn²⁺ + Cu', products: ['Zinc Ion', 'Copper Metal'], type: 'redox', visual: 'color-change', color: 'hsl(45,80%,60%)', enthalpy: -212.0, desc: 'Daniel cell: zinc anode, copper cathode.', temp: 'Room temp', realUse: 'Batteries, electrochemistry teaching' },

  // HIGH-TEMPERATURE REACTIONS
  { id: 'limekiln', reactants: ['Ca', 'C', 'O2'], eq: 'CaCO₃ → CaO + CO₂', balanced: 'CaCO₃ → CaO + CO₂↑', products: ['Calcium Oxide', 'Carbon Dioxide'], type: 'decomposition', visual: 'gas-release', color: 'hsl(0,0%,90%)', enthalpy: 178.0, desc: 'Limestone decomposition in lime kilns.', temp: '900°C', realUse: 'Cement, steelmaking' },
  { id: 'blastfurnace', reactants: ['Fe', 'C', 'O2'], eq: 'Fe₂O₃ + 3CO → 2Fe + 3CO₂', balanced: 'Fe₂O₃ + 3CO → 2Fe + 3CO₂', products: ['Iron Metal', 'Carbon Dioxide'], type: 'redox', visual: 'glow', color: 'hsl(15,70%,45%)', enthalpy: -26.8, desc: 'Iron reduction in blast furnace.', temp: '1500°C', realUse: 'Steel production' },

  // ATMOSPHERIC REACTIONS
  { id: 'ozoneformation', reactants: ['O2'], eq: '3O₂ → 2O₃', balanced: '3O₂ → 2O₃', products: ['Ozone'], type: 'synthesis', visual: 'glow', color: 'hsl(200,60%,60%)', enthalpy: 142.0, desc: 'Ozone formation from oxygen in atmosphere.', temp: 'High energy (UV)', realUse: 'Ozone layer, air purification' },
  { id: 'acidrain', reactants: ['S', 'O2', 'H2', 'O2'], eq: 'SO₂ + H₂O → H₂SO₃', balanced: 'SO₂ + H₂O → H₂SO₃', products: ['Sulfurous Acid'], type: 'acid-base', visual: 'dissolve', color: 'hsl(0,0%,85%)', enthalpy: -52.0, desc: 'Sulfur dioxide forms acid in water vapor.', temp: 'Room temp', realUse: 'Acid rain formation' },

  // EXPLOSIVE REACTIONS
  { id: 'blackpowder', reactants: ['K', 'C', 'S', 'O2'], eq: '2KNO₃ + 3C + S → K₂S + N₂ + 3CO₂', balanced: '2KNO₃ + 3C + S → K₂S + N₂ + 3CO₂', products: ['Potassium Sulfide', 'Nitrogen', 'Carbon Dioxide'], type: 'redox', visual: 'explosion', color: 'hsl(0,0%,20%)', enthalpy: -600.0, desc: 'Black powder explosion reaction.', safety: '⚠️ EXPLOSIVE!', temp: 'Ignition ~300°C', realUse: 'Fireworks, mining' },

  // RARE EARTH REACTIONS

  // NOBLE GAS REACTIONS (limited)


  { id: 'auto_Li_F2', reactants: ["Li", "F2"], eq: 'Li + F2 → LiF', balanced: '2Li + F2 → 2LiF', products: ["LiF"], type: 'synthesis', visual: 'spark', color: 'hsl(0,70%,60%)', enthalpy: -400, desc: 'Li reacts with F2 to form LiF.', realUse: 'Salt formation' },
  { id: 'auto_Li_Cl2', reactants: ["Li", "Cl2"], eq: 'Li + Cl2 → LiCl', balanced: '2Li + Cl2 → 2LiCl', products: ["LiCl"], type: 'synthesis', visual: 'spark', color: 'hsl(0,70%,60%)', enthalpy: -400, desc: 'Li reacts with Cl2 to form LiCl.', realUse: 'Salt formation' },
  { id: 'auto_Li_Br2', reactants: ["Li", "Br2"], eq: 'Li + Br2 → LiBr', balanced: '2Li + Br2 → 2LiBr', products: ["LiBr"], type: 'synthesis', visual: 'spark', color: 'hsl(0,70%,60%)', enthalpy: -400, desc: 'Li reacts with Br2 to form LiBr.', realUse: 'Salt formation' },
  { id: 'auto_Li_I2', reactants: ["Li", "I2"], eq: 'Li + I2 → LiI', balanced: '2Li + I2 → 2LiI', products: ["LiI"], type: 'synthesis', visual: 'spark', color: 'hsl(0,70%,60%)', enthalpy: -400, desc: 'Li reacts with I2 to form LiI.', realUse: 'Salt formation' },
  { id: 'auto_Na_F2', reactants: ["Na", "F2"], eq: 'Na + F2 → NaF', balanced: '2Na + F2 → 2NaF', products: ["NaF"], type: 'synthesis', visual: 'spark', color: 'hsl(45,90%,60%)', enthalpy: -400, desc: 'Na reacts with F2 to form NaF.', realUse: 'Salt formation' },
  { id: 'auto_Na_Cl2', reactants: ["Na", "Cl2"], eq: 'Na + Cl2 → NaCl', balanced: '2Na + Cl2 → 2NaCl', products: ["NaCl"], type: 'synthesis', visual: 'spark', color: 'hsl(45,90%,60%)', enthalpy: -400, desc: 'Na reacts with Cl2 to form NaCl.', realUse: 'Salt formation' },
  { id: 'auto_Na_Br2', reactants: ["Na", "Br2"], eq: 'Na + Br2 → NaBr', balanced: '2Na + Br2 → 2NaBr', products: ["NaBr"], type: 'synthesis', visual: 'spark', color: 'hsl(45,90%,60%)', enthalpy: -400, desc: 'Na reacts with Br2 to form NaBr.', realUse: 'Salt formation' },
  { id: 'auto_Na_I2', reactants: ["Na", "I2"], eq: 'Na + I2 → NaI', balanced: '2Na + I2 → 2NaI', products: ["NaI"], type: 'synthesis', visual: 'spark', color: 'hsl(45,90%,60%)', enthalpy: -400, desc: 'Na reacts with I2 to form NaI.', realUse: 'Salt formation' },
  { id: 'auto_K_F2', reactants: ["K", "F2"], eq: 'K + F2 → KF', balanced: '2K + F2 → 2KF', products: ["KF"], type: 'synthesis', visual: 'spark', color: 'hsl(280,60%,65%)', enthalpy: -400, desc: 'K reacts with F2 to form KF.', realUse: 'Salt formation' },
  { id: 'auto_K_Cl2', reactants: ["K", "Cl2"], eq: 'K + Cl2 → KCl', balanced: '2K + Cl2 → 2KCl', products: ["KCl"], type: 'synthesis', visual: 'spark', color: 'hsl(280,60%,65%)', enthalpy: -400, desc: 'K reacts with Cl2 to form KCl.', realUse: 'Salt formation' },
  { id: 'auto_K_Br2', reactants: ["K", "Br2"], eq: 'K + Br2 → KBr', balanced: '2K + Br2 → 2KBr', products: ["KBr"], type: 'synthesis', visual: 'spark', color: 'hsl(280,60%,65%)', enthalpy: -400, desc: 'K reacts with Br2 to form KBr.', realUse: 'Salt formation' },
  { id: 'auto_K_I2', reactants: ["K", "I2"], eq: 'K + I2 → KI', balanced: '2K + I2 → 2KI', products: ["KI"], type: 'synthesis', visual: 'spark', color: 'hsl(280,60%,65%)', enthalpy: -400, desc: 'K reacts with I2 to form KI.', realUse: 'Salt formation' },
  { id: 'auto_Rb_F2', reactants: ["Rb", "F2"], eq: 'Rb + F2 → RbF', balanced: '2Rb + F2 → 2RbF', products: ["RbF"], type: 'synthesis', visual: 'spark', color: 'hsl(340,60%,55%)', enthalpy: -400, desc: 'Rb reacts with F2 to form RbF.', realUse: 'Salt formation' },
  { id: 'auto_Rb_Cl2', reactants: ["Rb", "Cl2"], eq: 'Rb + Cl2 → RbCl', balanced: '2Rb + Cl2 → 2RbCl', products: ["RbCl"], type: 'synthesis', visual: 'spark', color: 'hsl(340,60%,55%)', enthalpy: -400, desc: 'Rb reacts with Cl2 to form RbCl.', realUse: 'Salt formation' },
  { id: 'auto_Rb_Br2', reactants: ["Rb", "Br2"], eq: 'Rb + Br2 → RbBr', balanced: '2Rb + Br2 → 2RbBr', products: ["RbBr"], type: 'synthesis', visual: 'spark', color: 'hsl(340,60%,55%)', enthalpy: -400, desc: 'Rb reacts with Br2 to form RbBr.', realUse: 'Salt formation' },
  { id: 'auto_Rb_I2', reactants: ["Rb", "I2"], eq: 'Rb + I2 → RbI', balanced: '2Rb + I2 → 2RbI', products: ["RbI"], type: 'synthesis', visual: 'spark', color: 'hsl(340,60%,55%)', enthalpy: -400, desc: 'Rb reacts with I2 to form RbI.', realUse: 'Salt formation' },
  { id: 'auto_Cs_F2', reactants: ["Cs", "F2"], eq: 'Cs + F2 → CsF', balanced: '2Cs + F2 → 2CsF', products: ["CsF"], type: 'synthesis', visual: 'spark', color: 'hsl(200,70%,55%)', enthalpy: -400, desc: 'Cs reacts with F2 to form CsF.', realUse: 'Salt formation' },
  { id: 'auto_Cs_Cl2', reactants: ["Cs", "Cl2"], eq: 'Cs + Cl2 → CsCl', balanced: '2Cs + Cl2 → 2CsCl', products: ["CsCl"], type: 'synthesis', visual: 'spark', color: 'hsl(200,70%,55%)', enthalpy: -400, desc: 'Cs reacts with Cl2 to form CsCl.', realUse: 'Salt formation' },
  { id: 'auto_Cs_Br2', reactants: ["Cs", "Br2"], eq: 'Cs + Br2 → CsBr', balanced: '2Cs + Br2 → 2CsBr', products: ["CsBr"], type: 'synthesis', visual: 'spark', color: 'hsl(200,70%,55%)', enthalpy: -400, desc: 'Cs reacts with Br2 to form CsBr.', realUse: 'Salt formation' },
  { id: 'auto_Cs_I2', reactants: ["Cs", "I2"], eq: 'Cs + I2 → CsI', balanced: '2Cs + I2 → 2CsI', products: ["CsI"], type: 'synthesis', visual: 'spark', color: 'hsl(200,70%,55%)', enthalpy: -400, desc: 'Cs reacts with I2 to form CsI.', realUse: 'Salt formation' },
  { id: 'auto_Be_F2', reactants: ["Be", "F2"], eq: 'Be + F2 → BeF2', balanced: 'Be + F2 → BeF2', products: ["BeF2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,85%)', enthalpy: -600, desc: 'Be reacts with F2 to form BeF2.', realUse: 'Halide formation' },
  { id: 'auto_Be_Cl2', reactants: ["Be", "Cl2"], eq: 'Be + Cl2 → BeCl2', balanced: 'Be + Cl2 → BeCl2', products: ["BeCl2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,85%)', enthalpy: -600, desc: 'Be reacts with Cl2 to form BeCl2.', realUse: 'Halide formation' },
  { id: 'auto_Be_Br2', reactants: ["Be", "Br2"], eq: 'Be + Br2 → BeBr2', balanced: 'Be + Br2 → BeBr2', products: ["BeBr2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,85%)', enthalpy: -600, desc: 'Be reacts with Br2 to form BeBr2.', realUse: 'Halide formation' },
  { id: 'auto_Be_I2', reactants: ["Be", "I2"], eq: 'Be + I2 → BeI2', balanced: 'Be + I2 → BeI2', products: ["BeI2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,85%)', enthalpy: -600, desc: 'Be reacts with I2 to form BeI2.', realUse: 'Halide formation' },
  { id: 'auto_Mg_F2', reactants: ["Mg", "F2"], eq: 'Mg + F2 → MgF2', balanced: 'Mg + F2 → MgF2', products: ["MgF2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(120,50%,60%)', enthalpy: -600, desc: 'Mg reacts with F2 to form MgF2.', realUse: 'Halide formation' },
  { id: 'auto_Mg_Cl2', reactants: ["Mg", "Cl2"], eq: 'Mg + Cl2 → MgCl2', balanced: 'Mg + Cl2 → MgCl2', products: ["MgCl2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(120,50%,60%)', enthalpy: -600, desc: 'Mg reacts with Cl2 to form MgCl2.', realUse: 'Halide formation' },
  { id: 'auto_Mg_Br2', reactants: ["Mg", "Br2"], eq: 'Mg + Br2 → MgBr2', balanced: 'Mg + Br2 → MgBr2', products: ["MgBr2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(120,50%,60%)', enthalpy: -600, desc: 'Mg reacts with Br2 to form MgBr2.', realUse: 'Halide formation' },
  { id: 'auto_Mg_I2', reactants: ["Mg", "I2"], eq: 'Mg + I2 → MgI2', balanced: 'Mg + I2 → MgI2', products: ["MgI2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(120,50%,60%)', enthalpy: -600, desc: 'Mg reacts with I2 to form MgI2.', realUse: 'Halide formation' },
  { id: 'auto_Ca_F2', reactants: ["Ca", "F2"], eq: 'Ca + F2 → CaF2', balanced: 'Ca + F2 → CaF2', products: ["CaF2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,90%)', enthalpy: -600, desc: 'Ca reacts with F2 to form CaF2.', realUse: 'Halide formation' },
  { id: 'auto_Ca_Cl2', reactants: ["Ca", "Cl2"], eq: 'Ca + Cl2 → CaCl2', balanced: 'Ca + Cl2 → CaCl2', products: ["CaCl2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,90%)', enthalpy: -600, desc: 'Ca reacts with Cl2 to form CaCl2.', realUse: 'Halide formation' },
  { id: 'auto_Ca_Br2', reactants: ["Ca", "Br2"], eq: 'Ca + Br2 → CaBr2', balanced: 'Ca + Br2 → CaBr2', products: ["CaBr2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,90%)', enthalpy: -600, desc: 'Ca reacts with Br2 to form CaBr2.', realUse: 'Halide formation' },
  { id: 'auto_Ca_I2', reactants: ["Ca", "I2"], eq: 'Ca + I2 → CaI2', balanced: 'Ca + I2 → CaI2', products: ["CaI2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,90%)', enthalpy: -600, desc: 'Ca reacts with I2 to form CaI2.', realUse: 'Halide formation' },
  { id: 'auto_Sr_F2', reactants: ["Sr", "F2"], eq: 'Sr + F2 → SrF2', balanced: 'Sr + F2 → SrF2', products: ["SrF2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,85%)', enthalpy: -600, desc: 'Sr reacts with F2 to form SrF2.', realUse: 'Halide formation' },
  { id: 'auto_Sr_Cl2', reactants: ["Sr", "Cl2"], eq: 'Sr + Cl2 → SrCl2', balanced: 'Sr + Cl2 → SrCl2', products: ["SrCl2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,85%)', enthalpy: -600, desc: 'Sr reacts with Cl2 to form SrCl2.', realUse: 'Halide formation' },
  { id: 'auto_Sr_Br2', reactants: ["Sr", "Br2"], eq: 'Sr + Br2 → SrBr2', balanced: 'Sr + Br2 → SrBr2', products: ["SrBr2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,85%)', enthalpy: -600, desc: 'Sr reacts with Br2 to form SrBr2.', realUse: 'Halide formation' },
  { id: 'auto_Sr_I2', reactants: ["Sr", "I2"], eq: 'Sr + I2 → SrI2', balanced: 'Sr + I2 → SrI2', products: ["SrI2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,85%)', enthalpy: -600, desc: 'Sr reacts with I2 to form SrI2.', realUse: 'Halide formation' },
  { id: 'auto_Ba_F2', reactants: ["Ba", "F2"], eq: 'Ba + F2 → BaF2', balanced: 'Ba + F2 → BaF2', products: ["BaF2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(120,60%,50%)', enthalpy: -600, desc: 'Ba reacts with F2 to form BaF2.', realUse: 'Halide formation' },
  { id: 'auto_Ba_Cl2', reactants: ["Ba", "Cl2"], eq: 'Ba + Cl2 → BaCl2', balanced: 'Ba + Cl2 → BaCl2', products: ["BaCl2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(120,60%,50%)', enthalpy: -600, desc: 'Ba reacts with Cl2 to form BaCl2.', realUse: 'Halide formation' },
  { id: 'auto_Ba_Br2', reactants: ["Ba", "Br2"], eq: 'Ba + Br2 → BaBr2', balanced: 'Ba + Br2 → BaBr2', products: ["BaBr2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(120,60%,50%)', enthalpy: -600, desc: 'Ba reacts with Br2 to form BaBr2.', realUse: 'Halide formation' },
  { id: 'auto_Ba_I2', reactants: ["Ba", "I2"], eq: 'Ba + I2 → BaI2', balanced: 'Ba + I2 → BaI2', products: ["BaI2"], type: 'synthesis', visual: 'crystallize', color: 'hsl(120,60%,50%)', enthalpy: -600, desc: 'Ba reacts with I2 to form BaI2.', realUse: 'Halide formation' },
  { id: 'auto_HCl_NaOH', reactants: ["HCl", "NaOH"], eq: 'HCl + NaOH → NaCl + H2O', balanced: 'HCl + NaOH → NaCl + H₂O', products: ["NaCl", "H2O"], type: 'acid-base', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -55, desc: 'Neutralization of HCl with NaOH.', realUse: 'Salt production' },
  { id: 'auto_HCl_KOH', reactants: ["HCl", "KOH"], eq: 'HCl + KOH → KCl + H2O', balanced: 'HCl + KOH → KCl + H₂O', products: ["KCl", "H2O"], type: 'acid-base', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -55, desc: 'Neutralization of HCl with KOH.', realUse: 'Salt production' },
  { id: 'auto_HCl_LiOH', reactants: ["HCl", "LiOH"], eq: 'HCl + LiOH → LiCl + H2O', balanced: 'HCl + LiOH → LiCl + H₂O', products: ["LiCl", "H2O"], type: 'acid-base', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -55, desc: 'Neutralization of HCl with LiOH.', realUse: 'Salt production' },
  { id: 'auto_HCl_Ca(OH)2', reactants: ["HCl", "Ca(OH)2"], eq: 'HCl + Ca(OH)2 → CaCl2 + H2O', balanced: '₂HCl + Ca(OH)₂ → CaCl₂ + ₂H₂O', products: ["CaCl2", "H2O"], type: 'acid-base', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -55, desc: 'Neutralization of HCl with Ca(OH)2.', realUse: 'Salt production' },
  { id: 'auto_HCl_Mg(OH)2', reactants: ["HCl", "Mg(OH)2"], eq: 'HCl + Mg(OH)2 → MgCl2 + H2O', balanced: '₂HCl + Mg(OH)₂ → MgCl₂ + ₂H₂O', products: ["MgCl2", "H2O"], type: 'acid-base', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -55, desc: 'Neutralization of HCl with Mg(OH)2.', realUse: 'Salt production' },
  { id: 'auto_HNO3_NaOH', reactants: ["HNO3", "NaOH"], eq: 'HNO3 + NaOH → NaNO3 + H2O', balanced: 'HNO₃ + NaOH → NaNO₃ + H₂O', products: ["NaNO3", "H2O"], type: 'acid-base', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -55, desc: 'Neutralization of HNO3 with NaOH.', realUse: 'Salt production' },
  { id: 'auto_HNO3_KOH', reactants: ["HNO3", "KOH"], eq: 'HNO3 + KOH → KNO3 + H2O', balanced: 'HNO₃ + KOH → KNO₃ + H₂O', products: ["KNO3", "H2O"], type: 'acid-base', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -55, desc: 'Neutralization of HNO3 with KOH.', realUse: 'Salt production' },
  { id: 'auto_HNO3_LiOH', reactants: ["HNO3", "LiOH"], eq: 'HNO3 + LiOH → LiNO3 + H2O', balanced: 'HNO₃ + LiOH → LiNO₃ + H₂O', products: ["LiNO3", "H2O"], type: 'acid-base', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -55, desc: 'Neutralization of HNO3 with LiOH.', realUse: 'Salt production' },
  { id: 'auto_HNO3_Ca(OH)2', reactants: ["HNO3", "Ca(OH)2"], eq: 'HNO3 + Ca(OH)2 → Ca(NO3)2 + H2O', balanced: '₂HNO₃ + Ca(OH)₂ → Ca(NO₃)₂ + ₂H₂O', products: ["Ca(NO3)2", "H2O"], type: 'acid-base', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -55, desc: 'Neutralization of HNO3 with Ca(OH)2.', realUse: 'Salt production' },
  { id: 'auto_HNO3_Mg(OH)2', reactants: ["HNO3", "Mg(OH)2"], eq: 'HNO3 + Mg(OH)2 → Mg(NO3)2 + H2O', balanced: '₂HNO₃ + Mg(OH)₂ → Mg(NO₃)₂ + ₂H₂O', products: ["Mg(NO3)2", "H2O"], type: 'acid-base', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -55, desc: 'Neutralization of HNO3 with Mg(OH)2.', realUse: 'Salt production' },
  { id: 'auto_H2SO4_NaOH', reactants: ["H2SO4", "NaOH"], eq: 'H2SO4 + NaOH → Na2SO4 + H2O', balanced: 'H₂SO₄ + ₂NaOH → Na₂SO₄ + ₂H₂O', products: ["Na2SO4", "H2O"], type: 'acid-base', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -55, desc: 'Neutralization of H2SO4 with NaOH.', realUse: 'Salt production' },
  { id: 'auto_H2SO4_KOH', reactants: ["H2SO4", "KOH"], eq: 'H2SO4 + KOH → K2SO4 + H2O', balanced: 'H₂SO₄ + ₂KOH → K₂SO₄ + ₂H₂O', products: ["K2SO4", "H2O"], type: 'acid-base', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -55, desc: 'Neutralization of H2SO4 with KOH.', realUse: 'Salt production' },
  { id: 'auto_H2SO4_LiOH', reactants: ["H2SO4", "LiOH"], eq: 'H2SO4 + LiOH → Li2SO4 + H2O', balanced: 'H₂SO₄ + ₂LiOH → Li₂SO₄ + ₂H₂O', products: ["Li2SO4", "H2O"], type: 'acid-base', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -55, desc: 'Neutralization of H2SO4 with LiOH.', realUse: 'Salt production' },
  { id: 'auto_H2SO4_Ca(OH)2', reactants: ["H2SO4", "Ca(OH)2"], eq: 'H2SO4 + Ca(OH)2 → CaSO4 + H2O', balanced: 'H₂SO₄ + Ca(OH)₂ → CaSO₄ + ₂H₂O', products: ["CaSO4", "H2O"], type: 'acid-base', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -55, desc: 'Neutralization of H2SO4 with Ca(OH)2.', realUse: 'Salt production' },
  { id: 'auto_H2SO4_Mg(OH)2', reactants: ["H2SO4", "Mg(OH)2"], eq: 'H2SO4 + Mg(OH)2 → MgSO4 + H2O', balanced: 'H₂SO₄ + Mg(OH)₂ → MgSO₄ + ₂H₂O', products: ["MgSO4", "H2O"], type: 'acid-base', visual: 'dissolve', color: 'hsl(200,50%,70%)', enthalpy: -55, desc: 'Neutralization of H2SO4 with Mg(OH)2.', realUse: 'Salt production' },
  { id: 'auto_CH4_combust', reactants: ["CH4", "O2"], eq: 'CH4 + O2 → CO2 + H2O', balanced: 'Combustion of CH4 (Unbalanced for simplicity in basic view)', products: ["CO2", "H2O"], type: 'combustion', visual: 'fire', color: 'hsl(0,0%,90%)', enthalpy: -2000, desc: 'Combustion of CH4.', realUse: 'Energy generation' },
  { id: 'auto_C2H6_combust', reactants: ["C2H6", "O2"], eq: 'C2H6 + O2 → CO2 + H2O', balanced: 'Combustion of C2H6 (Unbalanced for simplicity in basic view)', products: ["CO2", "H2O"], type: 'combustion', visual: 'fire', color: 'hsl(0,0%,90%)', enthalpy: -2000, desc: 'Combustion of C2H6.', realUse: 'Energy generation' },
  { id: 'auto_C3H8_combust', reactants: ["C3H8", "O2"], eq: 'C3H8 + O2 → CO2 + H2O', balanced: 'Combustion of C3H8 (Unbalanced for simplicity in basic view)', products: ["CO2", "H2O"], type: 'combustion', visual: 'fire', color: 'hsl(0,0%,90%)', enthalpy: -2000, desc: 'Combustion of C3H8.', realUse: 'Energy generation' },
  { id: 'auto_C4H10_combust', reactants: ["C4H10", "O2"], eq: 'C4H10 + O2 → CO2 + H2O', balanced: 'Combustion of C4H10 (Unbalanced for simplicity in basic view)', products: ["CO2", "H2O"], type: 'combustion', visual: 'fire', color: 'hsl(0,0%,90%)', enthalpy: -2000, desc: 'Combustion of C4H10.', realUse: 'Energy generation' },
  { id: 'auto_C5H12_combust', reactants: ["C5H12", "O2"], eq: 'C5H12 + O2 → CO2 + H2O', balanced: 'Combustion of C5H12 (Unbalanced for simplicity in basic view)', products: ["CO2", "H2O"], type: 'combustion', visual: 'fire', color: 'hsl(0,0%,90%)', enthalpy: -2000, desc: 'Combustion of C5H12.', realUse: 'Energy generation' },
  { id: 'auto_C6H14_combust', reactants: ["C6H14", "O2"], eq: 'C6H14 + O2 → CO2 + H2O', balanced: 'Combustion of C6H14 (Unbalanced for simplicity in basic view)', products: ["CO2", "H2O"], type: 'combustion', visual: 'fire', color: 'hsl(0,0%,90%)', enthalpy: -2000, desc: 'Combustion of C6H14.', realUse: 'Energy generation' },
  { id: 'auto_C7H16_combust', reactants: ["C7H16", "O2"], eq: 'C7H16 + O2 → CO2 + H2O', balanced: 'Combustion of C7H16 (Unbalanced for simplicity in basic view)', products: ["CO2", "H2O"], type: 'combustion', visual: 'fire', color: 'hsl(0,0%,90%)', enthalpy: -2000, desc: 'Combustion of C7H16.', realUse: 'Energy generation' },
  { id: 'auto_C8H18_combust', reactants: ["C8H18", "O2"], eq: 'C8H18 + O2 → CO2 + H2O', balanced: 'Combustion of C8H18 (Unbalanced for simplicity in basic view)', products: ["CO2", "H2O"], type: 'combustion', visual: 'fire', color: 'hsl(0,0%,90%)', enthalpy: -2000, desc: 'Combustion of C8H18.', realUse: 'Energy generation' },
  { id: 'auto_C9H20_combust', reactants: ["C9H20", "O2"], eq: 'C9H20 + O2 → CO2 + H2O', balanced: 'Combustion of C9H20 (Unbalanced for simplicity in basic view)', products: ["CO2", "H2O"], type: 'combustion', visual: 'fire', color: 'hsl(0,0%,90%)', enthalpy: -2000, desc: 'Combustion of C9H20.', realUse: 'Energy generation' },
  { id: 'auto_C10H22_combust', reactants: ["C10H22", "O2"], eq: 'C10H22 + O2 → CO2 + H2O', balanced: 'Combustion of C10H22 (Unbalanced for simplicity in basic view)', products: ["CO2", "H2O"], type: 'combustion', visual: 'fire', color: 'hsl(0,0%,90%)', enthalpy: -2000, desc: 'Combustion of C10H22.', realUse: 'Energy generation' },
  { id: 'auto_Fe_O2', reactants: ["Fe", "O2"], eq: 'Fe + O2 → FexOy', balanced: 'Oxidation of Fe', products: ["Fe Oxide"], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,50%)', enthalpy: -500, desc: 'Oxidation of Fe.', realUse: 'Material degradation / protection' },
  { id: 'auto_Cu_O2', reactants: ["Cu", "O2"], eq: 'Cu + O2 → CuxOy', balanced: 'Oxidation of Cu', products: ["Cu Oxide"], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,50%)', enthalpy: -500, desc: 'Oxidation of Cu.', realUse: 'Material degradation / protection' },
  { id: 'auto_Zn_O2', reactants: ["Zn", "O2"], eq: 'Zn + O2 → ZnxOy', balanced: 'Oxidation of Zn', products: ["Zn Oxide"], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,50%)', enthalpy: -500, desc: 'Oxidation of Zn.', realUse: 'Material degradation / protection' },
  { id: 'auto_Al_O2', reactants: ["Al", "O2"], eq: 'Al + O2 → AlxOy', balanced: 'Oxidation of Al', products: ["Al Oxide"], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,50%)', enthalpy: -500, desc: 'Oxidation of Al.', realUse: 'Material degradation / protection' },
  { id: 'auto_Mg_O2', reactants: ["Mg", "O2"], eq: 'Mg + O2 → MgxOy', balanced: 'Oxidation of Mg', products: ["Mg Oxide"], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,50%)', enthalpy: -500, desc: 'Oxidation of Mg.', realUse: 'Material degradation / protection' },
  { id: 'auto_Ni_O2', reactants: ["Ni", "O2"], eq: 'Ni + O2 → NixOy', balanced: 'Oxidation of Ni', products: ["Ni Oxide"], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,50%)', enthalpy: -500, desc: 'Oxidation of Ni.', realUse: 'Material degradation / protection' },
  { id: 'auto_Co_O2', reactants: ["Co", "O2"], eq: 'Co + O2 → CoxOy', balanced: 'Oxidation of Co', products: ["Co Oxide"], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,50%)', enthalpy: -500, desc: 'Oxidation of Co.', realUse: 'Material degradation / protection' },
  { id: 'auto_Mn_O2', reactants: ["Mn", "O2"], eq: 'Mn + O2 → MnxOy', balanced: 'Oxidation of Mn', products: ["Mn Oxide"], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,50%)', enthalpy: -500, desc: 'Oxidation of Mn.', realUse: 'Material degradation / protection' },
  { id: 'auto_Cr_O2', reactants: ["Cr", "O2"], eq: 'Cr + O2 → CrxOy', balanced: 'Oxidation of Cr', products: ["Cr Oxide"], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,50%)', enthalpy: -500, desc: 'Oxidation of Cr.', realUse: 'Material degradation / protection' },
  { id: 'auto_Ti_O2', reactants: ["Ti", "O2"], eq: 'Ti + O2 → TixOy', balanced: 'Oxidation of Ti', products: ["Ti Oxide"], type: 'oxidation', visual: 'color-change', color: 'hsl(0,0%,50%)', enthalpy: -500, desc: 'Oxidation of Ti.', realUse: 'Material degradation / protection' },
  { id: 'auto_double_NaCl_KBr', reactants: ["NaCl", "KBr"], eq: 'NaCl + KBr → NaBr + KCl', balanced: 'Double replacement: NaCl + KBr', products: ["NaBr", "KCl"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between NaCl and KBr.', realUse: 'Chemical analysis' },
  { id: 'auto_double_NaBr_KI', reactants: ["NaBr", "KI"], eq: 'NaBr + KI → NaI + KBr', balanced: 'Double replacement: NaBr + KI', products: ["NaI", "KBr"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between NaBr and KI.', realUse: 'Chemical analysis' },
  { id: 'auto_double_NaI_KNO3', reactants: ["NaI", "KNO3"], eq: 'NaI + KNO3 → NaNO3 + KI', balanced: 'Double replacement: NaI + KNO3', products: ["NaNO3", "KI"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between NaI and KNO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_NaNO3_KSO4', reactants: ["NaNO3", "KSO4"], eq: 'NaNO3 + KSO4 → NaSO4 + KNO3', balanced: 'Double replacement: NaNO3 + KSO4', products: ["NaSO4", "KNO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between NaNO3 and KSO4.', realUse: 'Chemical analysis' },
  { id: 'auto_double_NaSO4_KCO3', reactants: ["NaSO4", "KCO3"], eq: 'NaSO4 + KCO3 → NaCO3 + KSO4', balanced: 'Double replacement: NaSO4 + KCO3', products: ["NaCO3", "KSO4"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between NaSO4 and KCO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_NaCO3_KCl', reactants: ["NaCO3", "KCl"], eq: 'NaCO3 + KCl → NaCl + KCO3', balanced: 'Double replacement: NaCO3 + KCl', products: ["NaCl", "KCO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between NaCO3 and KCl.', realUse: 'Chemical analysis' },
  { id: 'auto_double_KCl_CaBr', reactants: ["KCl", "CaBr"], eq: 'KCl + CaBr → KBr + CaCl', balanced: 'Double replacement: KCl + CaBr', products: ["KBr", "CaCl"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between KCl and CaBr.', realUse: 'Chemical analysis' },
  { id: 'auto_double_KBr_CaI', reactants: ["KBr", "CaI"], eq: 'KBr + CaI → KI + CaBr', balanced: 'Double replacement: KBr + CaI', products: ["KI", "CaBr"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between KBr and CaI.', realUse: 'Chemical analysis' },
  { id: 'auto_double_KI_CaNO3', reactants: ["KI", "CaNO3"], eq: 'KI + CaNO3 → KNO3 + CaI', balanced: 'Double replacement: KI + CaNO3', products: ["KNO3", "CaI"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between KI and CaNO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_KNO3_CaSO4', reactants: ["KNO3", "CaSO4"], eq: 'KNO3 + CaSO4 → KSO4 + CaNO3', balanced: 'Double replacement: KNO3 + CaSO4', products: ["KSO4", "CaNO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between KNO3 and CaSO4.', realUse: 'Chemical analysis' },
  { id: 'auto_double_KSO4_CaCO3', reactants: ["KSO4", "CaCO3"], eq: 'KSO4 + CaCO3 → KCO3 + CaSO4', balanced: 'Double replacement: KSO4 + CaCO3', products: ["KCO3", "CaSO4"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between KSO4 and CaCO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_KCO3_CaCl', reactants: ["KCO3", "CaCl"], eq: 'KCO3 + CaCl → KCl + CaCO3', balanced: 'Double replacement: KCO3 + CaCl', products: ["KCl", "CaCO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between KCO3 and CaCl.', realUse: 'Chemical analysis' },
  { id: 'auto_double_CaCl_MgBr', reactants: ["CaCl", "MgBr"], eq: 'CaCl + MgBr → CaBr + MgCl', balanced: 'Double replacement: CaCl + MgBr', products: ["CaBr", "MgCl"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between CaCl and MgBr.', realUse: 'Chemical analysis' },
  { id: 'auto_double_CaBr_MgI', reactants: ["CaBr", "MgI"], eq: 'CaBr + MgI → CaI + MgBr', balanced: 'Double replacement: CaBr + MgI', products: ["CaI", "MgBr"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between CaBr and MgI.', realUse: 'Chemical analysis' },
  { id: 'auto_double_CaI_MgNO3', reactants: ["CaI", "MgNO3"], eq: 'CaI + MgNO3 → CaNO3 + MgI', balanced: 'Double replacement: CaI + MgNO3', products: ["CaNO3", "MgI"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between CaI and MgNO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_CaNO3_MgSO4', reactants: ["CaNO3", "MgSO4"], eq: 'CaNO3 + MgSO4 → CaSO4 + MgNO3', balanced: 'Double replacement: CaNO3 + MgSO4', products: ["CaSO4", "MgNO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between CaNO3 and MgSO4.', realUse: 'Chemical analysis' },
  { id: 'auto_double_CaSO4_MgCO3', reactants: ["CaSO4", "MgCO3"], eq: 'CaSO4 + MgCO3 → CaCO3 + MgSO4', balanced: 'Double replacement: CaSO4 + MgCO3', products: ["CaCO3", "MgSO4"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between CaSO4 and MgCO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_CaCO3_MgCl', reactants: ["CaCO3", "MgCl"], eq: 'CaCO3 + MgCl → CaCl + MgCO3', balanced: 'Double replacement: CaCO3 + MgCl', products: ["CaCl", "MgCO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between CaCO3 and MgCl.', realUse: 'Chemical analysis' },
  { id: 'auto_double_MgCl_AlBr', reactants: ["MgCl", "AlBr"], eq: 'MgCl + AlBr → MgBr + AlCl', balanced: 'Double replacement: MgCl + AlBr', products: ["MgBr", "AlCl"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between MgCl and AlBr.', realUse: 'Chemical analysis' },
  { id: 'auto_double_MgBr_AlI', reactants: ["MgBr", "AlI"], eq: 'MgBr + AlI → MgI + AlBr', balanced: 'Double replacement: MgBr + AlI', products: ["MgI", "AlBr"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between MgBr and AlI.', realUse: 'Chemical analysis' },
  { id: 'auto_double_MgI_AlNO3', reactants: ["MgI", "AlNO3"], eq: 'MgI + AlNO3 → MgNO3 + AlI', balanced: 'Double replacement: MgI + AlNO3', products: ["MgNO3", "AlI"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between MgI and AlNO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_MgNO3_AlSO4', reactants: ["MgNO3", "AlSO4"], eq: 'MgNO3 + AlSO4 → MgSO4 + AlNO3', balanced: 'Double replacement: MgNO3 + AlSO4', products: ["MgSO4", "AlNO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between MgNO3 and AlSO4.', realUse: 'Chemical analysis' },
  { id: 'auto_double_MgSO4_AlCO3', reactants: ["MgSO4", "AlCO3"], eq: 'MgSO4 + AlCO3 → MgCO3 + AlSO4', balanced: 'Double replacement: MgSO4 + AlCO3', products: ["MgCO3", "AlSO4"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between MgSO4 and AlCO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_MgCO3_AlCl', reactants: ["MgCO3", "AlCl"], eq: 'MgCO3 + AlCl → MgCl + AlCO3', balanced: 'Double replacement: MgCO3 + AlCl', products: ["MgCl", "AlCO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between MgCO3 and AlCl.', realUse: 'Chemical analysis' },
  { id: 'auto_double_AlCl_ZnBr', reactants: ["AlCl", "ZnBr"], eq: 'AlCl + ZnBr → AlBr + ZnCl', balanced: 'Double replacement: AlCl + ZnBr', products: ["AlBr", "ZnCl"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between AlCl and ZnBr.', realUse: 'Chemical analysis' },
  { id: 'auto_double_AlBr_ZnI', reactants: ["AlBr", "ZnI"], eq: 'AlBr + ZnI → AlI + ZnBr', balanced: 'Double replacement: AlBr + ZnI', products: ["AlI", "ZnBr"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between AlBr and ZnI.', realUse: 'Chemical analysis' },
  { id: 'auto_double_AlI_ZnNO3', reactants: ["AlI", "ZnNO3"], eq: 'AlI + ZnNO3 → AlNO3 + ZnI', balanced: 'Double replacement: AlI + ZnNO3', products: ["AlNO3", "ZnI"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between AlI and ZnNO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_AlNO3_ZnSO4', reactants: ["AlNO3", "ZnSO4"], eq: 'AlNO3 + ZnSO4 → AlSO4 + ZnNO3', balanced: 'Double replacement: AlNO3 + ZnSO4', products: ["AlSO4", "ZnNO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between AlNO3 and ZnSO4.', realUse: 'Chemical analysis' },
  { id: 'auto_double_AlSO4_ZnCO3', reactants: ["AlSO4", "ZnCO3"], eq: 'AlSO4 + ZnCO3 → AlCO3 + ZnSO4', balanced: 'Double replacement: AlSO4 + ZnCO3', products: ["AlCO3", "ZnSO4"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between AlSO4 and ZnCO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_AlCO3_ZnCl', reactants: ["AlCO3", "ZnCl"], eq: 'AlCO3 + ZnCl → AlCl + ZnCO3', balanced: 'Double replacement: AlCO3 + ZnCl', products: ["AlCl", "ZnCO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between AlCO3 and ZnCl.', realUse: 'Chemical analysis' },
  { id: 'auto_double_ZnCl_FeBr', reactants: ["ZnCl", "FeBr"], eq: 'ZnCl + FeBr → ZnBr + FeCl', balanced: 'Double replacement: ZnCl + FeBr', products: ["ZnBr", "FeCl"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between ZnCl and FeBr.', realUse: 'Chemical analysis' },
  { id: 'auto_double_ZnBr_FeI', reactants: ["ZnBr", "FeI"], eq: 'ZnBr + FeI → ZnI + FeBr', balanced: 'Double replacement: ZnBr + FeI', products: ["ZnI", "FeBr"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between ZnBr and FeI.', realUse: 'Chemical analysis' },
  { id: 'auto_double_ZnI_FeNO3', reactants: ["ZnI", "FeNO3"], eq: 'ZnI + FeNO3 → ZnNO3 + FeI', balanced: 'Double replacement: ZnI + FeNO3', products: ["ZnNO3", "FeI"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between ZnI and FeNO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_ZnNO3_FeSO4', reactants: ["ZnNO3", "FeSO4"], eq: 'ZnNO3 + FeSO4 → ZnSO4 + FeNO3', balanced: 'Double replacement: ZnNO3 + FeSO4', products: ["ZnSO4", "FeNO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between ZnNO3 and FeSO4.', realUse: 'Chemical analysis' },
  { id: 'auto_double_ZnSO4_FeCO3', reactants: ["ZnSO4", "FeCO3"], eq: 'ZnSO4 + FeCO3 → ZnCO3 + FeSO4', balanced: 'Double replacement: ZnSO4 + FeCO3', products: ["ZnCO3", "FeSO4"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between ZnSO4 and FeCO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_ZnCO3_FeCl', reactants: ["ZnCO3", "FeCl"], eq: 'ZnCO3 + FeCl → ZnCl + FeCO3', balanced: 'Double replacement: ZnCO3 + FeCl', products: ["ZnCl", "FeCO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between ZnCO3 and FeCl.', realUse: 'Chemical analysis' },
  { id: 'auto_double_FeCl_CuBr', reactants: ["FeCl", "CuBr"], eq: 'FeCl + CuBr → FeBr + CuCl', balanced: 'Double replacement: FeCl + CuBr', products: ["FeBr", "CuCl"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between FeCl and CuBr.', realUse: 'Chemical analysis' },
  { id: 'auto_double_FeBr_CuI', reactants: ["FeBr", "CuI"], eq: 'FeBr + CuI → FeI + CuBr', balanced: 'Double replacement: FeBr + CuI', products: ["FeI", "CuBr"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between FeBr and CuI.', realUse: 'Chemical analysis' },
  { id: 'auto_double_FeI_CuNO3', reactants: ["FeI", "CuNO3"], eq: 'FeI + CuNO3 → FeNO3 + CuI', balanced: 'Double replacement: FeI + CuNO3', products: ["FeNO3", "CuI"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between FeI and CuNO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_FeNO3_CuSO4', reactants: ["FeNO3", "CuSO4"], eq: 'FeNO3 + CuSO4 → FeSO4 + CuNO3', balanced: 'Double replacement: FeNO3 + CuSO4', products: ["FeSO4", "CuNO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between FeNO3 and CuSO4.', realUse: 'Chemical analysis' },
  { id: 'auto_double_FeSO4_CuCO3', reactants: ["FeSO4", "CuCO3"], eq: 'FeSO4 + CuCO3 → FeCO3 + CuSO4', balanced: 'Double replacement: FeSO4 + CuCO3', products: ["FeCO3", "CuSO4"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between FeSO4 and CuCO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_FeCO3_CuCl', reactants: ["FeCO3", "CuCl"], eq: 'FeCO3 + CuCl → FeCl + CuCO3', balanced: 'Double replacement: FeCO3 + CuCl', products: ["FeCl", "CuCO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between FeCO3 and CuCl.', realUse: 'Chemical analysis' },
  { id: 'auto_double_CuCl_AgBr', reactants: ["CuCl", "AgBr"], eq: 'CuCl + AgBr → CuBr + AgCl', balanced: 'Double replacement: CuCl + AgBr', products: ["CuBr", "AgCl"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between CuCl and AgBr.', realUse: 'Chemical analysis' },
  { id: 'auto_double_CuBr_AgI', reactants: ["CuBr", "AgI"], eq: 'CuBr + AgI → CuI + AgBr', balanced: 'Double replacement: CuBr + AgI', products: ["CuI", "AgBr"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between CuBr and AgI.', realUse: 'Chemical analysis' },
  { id: 'auto_double_CuI_AgNO3', reactants: ["CuI", "AgNO3"], eq: 'CuI + AgNO3 → CuNO3 + AgI', balanced: 'Double replacement: CuI + AgNO3', products: ["CuNO3", "AgI"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between CuI and AgNO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_CuNO3_AgSO4', reactants: ["CuNO3", "AgSO4"], eq: 'CuNO3 + AgSO4 → CuSO4 + AgNO3', balanced: 'Double replacement: CuNO3 + AgSO4', products: ["CuSO4", "AgNO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between CuNO3 and AgSO4.', realUse: 'Chemical analysis' },
  { id: 'auto_double_CuSO4_AgCO3', reactants: ["CuSO4", "AgCO3"], eq: 'CuSO4 + AgCO3 → CuCO3 + AgSO4', balanced: 'Double replacement: CuSO4 + AgCO3', products: ["CuCO3", "AgSO4"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between CuSO4 and AgCO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_CuCO3_AgCl', reactants: ["CuCO3", "AgCl"], eq: 'CuCO3 + AgCl → CuCl + AgCO3', balanced: 'Double replacement: CuCO3 + AgCl', products: ["CuCl", "AgCO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between CuCO3 and AgCl.', realUse: 'Chemical analysis' },
  { id: 'auto_double_AgCl_PbBr', reactants: ["AgCl", "PbBr"], eq: 'AgCl + PbBr → AgBr + PbCl', balanced: 'Double replacement: AgCl + PbBr', products: ["AgBr", "PbCl"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between AgCl and PbBr.', realUse: 'Chemical analysis' },
  { id: 'auto_double_AgBr_PbI', reactants: ["AgBr", "PbI"], eq: 'AgBr + PbI → AgI + PbBr', balanced: 'Double replacement: AgBr + PbI', products: ["AgI", "PbBr"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between AgBr and PbI.', realUse: 'Chemical analysis' },
  { id: 'auto_double_AgI_PbNO3', reactants: ["AgI", "PbNO3"], eq: 'AgI + PbNO3 → AgNO3 + PbI', balanced: 'Double replacement: AgI + PbNO3', products: ["AgNO3", "PbI"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between AgI and PbNO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_AgNO3_PbSO4', reactants: ["AgNO3", "PbSO4"], eq: 'AgNO3 + PbSO4 → AgSO4 + PbNO3', balanced: 'Double replacement: AgNO3 + PbSO4', products: ["AgSO4", "PbNO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between AgNO3 and PbSO4.', realUse: 'Chemical analysis' },
  { id: 'auto_double_AgSO4_PbCO3', reactants: ["AgSO4", "PbCO3"], eq: 'AgSO4 + PbCO3 → AgCO3 + PbSO4', balanced: 'Double replacement: AgSO4 + PbCO3', products: ["AgCO3", "PbSO4"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between AgSO4 and PbCO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_AgCO3_PbCl', reactants: ["AgCO3", "PbCl"], eq: 'AgCO3 + PbCl → AgCl + PbCO3', balanced: 'Double replacement: AgCO3 + PbCl', products: ["AgCl", "PbCO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between AgCO3 and PbCl.', realUse: 'Chemical analysis' },
  { id: 'auto_double_PbCl_SnBr', reactants: ["PbCl", "SnBr"], eq: 'PbCl + SnBr → PbBr + SnCl', balanced: 'Double replacement: PbCl + SnBr', products: ["PbBr", "SnCl"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between PbCl and SnBr.', realUse: 'Chemical analysis' },
  { id: 'auto_double_PbBr_SnI', reactants: ["PbBr", "SnI"], eq: 'PbBr + SnI → PbI + SnBr', balanced: 'Double replacement: PbBr + SnI', products: ["PbI", "SnBr"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between PbBr and SnI.', realUse: 'Chemical analysis' },
  { id: 'auto_double_PbI_SnNO3', reactants: ["PbI", "SnNO3"], eq: 'PbI + SnNO3 → PbNO3 + SnI', balanced: 'Double replacement: PbI + SnNO3', products: ["PbNO3", "SnI"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between PbI and SnNO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_PbNO3_SnSO4', reactants: ["PbNO3", "SnSO4"], eq: 'PbNO3 + SnSO4 → PbSO4 + SnNO3', balanced: 'Double replacement: PbNO3 + SnSO4', products: ["PbSO4", "SnNO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between PbNO3 and SnSO4.', realUse: 'Chemical analysis' },
  { id: 'auto_double_PbSO4_SnCO3', reactants: ["PbSO4", "SnCO3"], eq: 'PbSO4 + SnCO3 → PbCO3 + SnSO4', balanced: 'Double replacement: PbSO4 + SnCO3', products: ["PbCO3", "SnSO4"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between PbSO4 and SnCO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_PbCO3_SnCl', reactants: ["PbCO3", "SnCl"], eq: 'PbCO3 + SnCl → PbCl + SnCO3', balanced: 'Double replacement: PbCO3 + SnCl', products: ["PbCl", "SnCO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between PbCO3 and SnCl.', realUse: 'Chemical analysis' },
  { id: 'auto_double_SnCl_NiBr', reactants: ["SnCl", "NiBr"], eq: 'SnCl + NiBr → SnBr + NiCl', balanced: 'Double replacement: SnCl + NiBr', products: ["SnBr", "NiCl"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between SnCl and NiBr.', realUse: 'Chemical analysis' },
  { id: 'auto_double_SnBr_NiI', reactants: ["SnBr", "NiI"], eq: 'SnBr + NiI → SnI + NiBr', balanced: 'Double replacement: SnBr + NiI', products: ["SnI", "NiBr"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between SnBr and NiI.', realUse: 'Chemical analysis' },
  { id: 'auto_double_SnI_NiNO3', reactants: ["SnI", "NiNO3"], eq: 'SnI + NiNO3 → SnNO3 + NiI', balanced: 'Double replacement: SnI + NiNO3', products: ["SnNO3", "NiI"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between SnI and NiNO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_SnNO3_NiSO4', reactants: ["SnNO3", "NiSO4"], eq: 'SnNO3 + NiSO4 → SnSO4 + NiNO3', balanced: 'Double replacement: SnNO3 + NiSO4', products: ["SnSO4", "NiNO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between SnNO3 and NiSO4.', realUse: 'Chemical analysis' },
  { id: 'auto_double_SnSO4_NiCO3', reactants: ["SnSO4", "NiCO3"], eq: 'SnSO4 + NiCO3 → SnCO3 + NiSO4', balanced: 'Double replacement: SnSO4 + NiCO3', products: ["SnCO3", "NiSO4"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between SnSO4 and NiCO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_SnCO3_NiCl', reactants: ["SnCO3", "NiCl"], eq: 'SnCO3 + NiCl → SnCl + NiCO3', balanced: 'Double replacement: SnCO3 + NiCl', products: ["SnCl", "NiCO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between SnCO3 and NiCl.', realUse: 'Chemical analysis' },
  { id: 'auto_double_NiCl_NaBr', reactants: ["NiCl", "NaBr"], eq: 'NiCl + NaBr → NiBr + NaCl', balanced: 'Double replacement: NiCl + NaBr', products: ["NiBr", "NaCl"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between NiCl and NaBr.', realUse: 'Chemical analysis' },
  { id: 'auto_double_NiBr_NaI', reactants: ["NiBr", "NaI"], eq: 'NiBr + NaI → NiI + NaBr', balanced: 'Double replacement: NiBr + NaI', products: ["NiI", "NaBr"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between NiBr and NaI.', realUse: 'Chemical analysis' },
  { id: 'auto_double_NiI_NaNO3', reactants: ["NiI", "NaNO3"], eq: 'NiI + NaNO3 → NiNO3 + NaI', balanced: 'Double replacement: NiI + NaNO3', products: ["NiNO3", "NaI"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between NiI and NaNO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_NiNO3_NaSO4', reactants: ["NiNO3", "NaSO4"], eq: 'NiNO3 + NaSO4 → NiSO4 + NaNO3', balanced: 'Double replacement: NiNO3 + NaSO4', products: ["NiSO4", "NaNO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between NiNO3 and NaSO4.', realUse: 'Chemical analysis' },
  { id: 'auto_double_NiSO4_NaCO3', reactants: ["NiSO4", "NaCO3"], eq: 'NiSO4 + NaCO3 → NiCO3 + NaSO4', balanced: 'Double replacement: NiSO4 + NaCO3', products: ["NiCO3", "NaSO4"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between NiSO4 and NaCO3.', realUse: 'Chemical analysis' },
  { id: 'auto_double_NiCO3_NaCl', reactants: ["NiCO3", "NaCl"], eq: 'NiCO3 + NaCl → NiCl + NaCO3', balanced: 'Double replacement: NiCO3 + NaCl', products: ["NiCl", "NaCO3"], type: 'double-replacement', visual: 'precipitate', color: 'hsl(0,0%,80%)', enthalpy: -10, desc: 'Generic double replacement reaction between NiCO3 and NaCl.', realUse: 'Chemical analysis' },

  // ════════════════════════════════════════════════════════════════
  //  EXPANSION PACK · 110+ MOST IMPORTANT REACTIONS IN CHEMISTRY
  // ════════════════════════════════════════════════════════════════

  // ─── FAMOUS NAMED & DEMONSTRATION REACTIONS ───
  { id: 'thermite', reactants: ['Al', 'Fe2O3'], eq: '2Al + Fe₂O₃ → Al₂O₃ + 2Fe', balanced: '2Al + Fe₂O₃ → Al₂O₃ + 2Fe', products: ['Al2O3', 'Fe'], type: 'redox', visual: 'fire', color: 'hsl(20,100%,55%)', enthalpy: -851.5, desc: 'The thermite reaction: aluminum reduces iron(III) oxide producing molten iron and a brilliant white-orange flame.', safety: '⚠️ Extremely exothermic — molten metal at >2500°C. Never look directly!', temp: 'Self-sustaining ~2500°C', realUse: 'Welding railroad tracks, incendiary devices' },
  { id: 'na-h2o', reactants: ['Na', 'H2O'], eq: '2Na + 2H₂O → 2NaOH + H₂', balanced: '2Na + 2H₂O → 2NaOH + H₂', products: ['NaOH', 'H2'], type: 'single-replacement', visual: 'fire', color: 'hsl(45,100%,60%)', enthalpy: -184.0, desc: 'Sodium reacts violently with water producing hydrogen and sodium hydroxide. Often ignites with a yellow flame.', safety: '⚠️ Violent — may explode!', temp: 'Spontaneous', realUse: 'Classic demonstration of alkali-metal reactivity' },
  { id: 'k-h2o', reactants: ['K', 'H2O'], eq: '2K + 2H₂O → 2KOH + H₂', balanced: '2K + 2H₂O → 2KOH + H₂', products: ['KOH', 'H2'], type: 'single-replacement', visual: 'fire', color: 'hsl(280,80%,65%)', enthalpy: -200.0, desc: 'Potassium reacts explosively with water producing a lilac-violet flame from H₂ ignition.', safety: '⚠️ Highly explosive!', temp: 'Spontaneous', realUse: 'Classroom demo of group-1 trends' },
  { id: 'cs-h2o', reactants: ['Cs', 'H2O'], eq: '2Cs + 2H₂O → 2CsOH + H₂', balanced: '2Cs + 2H₂O → 2CsOH + H₂', products: ['CsOH', 'H2'], type: 'single-replacement', visual: 'explosion', color: 'hsl(45,100%,70%)', enthalpy: -212.0, desc: 'Cesium detonates on contact with water — the most reactive alkali metal commonly studied.', safety: '⚠️ Detonation hazard!', temp: 'Spontaneous', realUse: 'Demonstrating periodic-trend reactivity' },
  { id: 'briggs-rauscher', reactants: ['KIO3', 'H2O2'], eq: 'KIO₃ + H₂O₂ + CH₂(COOH)₂ → oscillating I/I₂', balanced: 'Complex oscillating mechanism', products: ['I2'], type: 'oxidation', visual: 'color-change', color: 'hsl(45,80%,55%)', enthalpy: -150, desc: 'Briggs–Rauscher oscillating reaction: solution flashes between colorless, amber and deep blue.', temp: 'Room temp', catalyst: 'Mn²⁺', realUse: 'Demonstrating non-equilibrium chemical oscillation', safety: '⚠️ I₂ vapor irritant' },
  { id: 'iodine-clock', reactants: ['KIO3', 'Na2SO3'], eq: 'KIO₃ + 3Na₂SO₃ → KI + 3Na₂SO₄ (clock)', balanced: 'Complex multistep clock reaction', products: ['KI', 'Na2SO4'], type: 'redox', visual: 'color-change', color: 'hsl(220,80%,40%)', enthalpy: -90, desc: 'The classic iodine clock — colorless solution turns dark blue-black after a delay when iodine binds starch.', temp: 'Room temp', realUse: 'Kinetics teaching, reaction-rate determination' },
  { id: 'elephant-toothpaste', reactants: ['H2O2', 'KI'], eq: '2H₂O₂ → 2H₂O + O₂ (catalyzed)', balanced: '2H₂O₂ → 2H₂O + O₂', products: ['H2O', 'O2'], type: 'decomposition', visual: 'effervescence', color: 'hsl(50,90%,65%)', enthalpy: -196.0, desc: 'Concentrated hydrogen peroxide decomposes explosively when catalyzed by KI, producing a foaming column.', safety: '⚠️ Hot foam! Wear goggles.', temp: 'Room temp → ~60°C', catalyst: 'KI / catalase', realUse: 'Iconic chemistry demonstration' },
  { id: 'luminol', reactants: ['C8H7N3O2', 'H2O2'], eq: 'Luminol + H₂O₂ → 3-aminophthalate + light', balanced: 'C₈H₇N₃O₂ + H₂O₂ → C₈H₅NO₄²⁻ + N₂ + hν', products: ['Light'], type: 'oxidation', visual: 'luminescence', color: 'hsl(180,90%,60%)', enthalpy: -300, desc: 'Luminol chemiluminescence — emits eerie blue light when oxidized in the presence of iron.', temp: 'Room temp', catalyst: 'Fe²⁺ / hemoglobin', realUse: 'Forensic blood detection at crime scenes' },
  { id: 'tollens', reactants: ['RCHO', 'AgNO3'], eq: 'RCHO + 2[Ag(NH₃)₂]⁺ → RCOO⁻ + 2Ag↓ + ...', balanced: 'Tollens silver-mirror test', products: ['Ag', 'RCOO-'], type: 'oxidation', visual: 'crystallize', color: 'hsl(0,0%,90%)', enthalpy: -210, desc: 'Aldehydes reduce silver(I) to elemental silver, depositing a brilliant mirror on the glass wall.', temp: '~60°C water bath', realUse: 'Classic test distinguishing aldehydes from ketones' },
  { id: 'fehling', reactants: ['RCHO', 'Cu(OH)2'], eq: 'RCHO + 2Cu²⁺ + 5OH⁻ → RCOO⁻ + Cu₂O↓ + 3H₂O', balanced: 'Fehling test', products: ['Cu2O'], type: 'oxidation', visual: 'precipitate', color: 'hsl(15,80%,45%)', enthalpy: -180, desc: 'Aldehydes reduce blue Cu²⁺ to a brick-red Cu₂O precipitate.', temp: '~60°C', realUse: 'Detection of reducing sugars and aldehydes' },
  { id: 'brown-ring', reactants: ['Fe2+', 'NO3-'], eq: 'Fe²⁺ + NO → [Fe(H₂O)₅NO]²⁺', balanced: 'Brown-ring test', products: ['[Fe(H2O)5NO]2+'], type: 'redox', visual: 'color-change', color: 'hsl(25,70%,40%)', enthalpy: -85, desc: 'A brown ring of nitrosyl-iron complex forms at the interface — classic test for nitrate ions.', temp: 'Room temp', realUse: 'Qualitative analysis for NO₃⁻' },
  { id: 'beilstein', reactants: ['RCl', 'Cu'], eq: 'RX + Cu (hot wire) → green flame', balanced: 'Beilstein flame test', products: ['CuX2'], type: 'redox', visual: 'fire', color: 'hsl(120,90%,50%)', enthalpy: -120, desc: 'Organic halides give a vivid green flame on a heated copper wire — diagnostic for halogen presence.', temp: 'Hot copper wire', realUse: 'Halide detection in organic compounds' },
  { id: 'flame-li', reactants: ['Li', 'flame'], eq: 'Li (heat) → crimson emission', balanced: 'Atomic emission', products: ['Li*'], type: 'oxidation', visual: 'fire', color: 'hsl(355,90%,55%)', enthalpy: 0, desc: 'Lithium ions emit a deep crimson red color in a flame — used in fireworks.', temp: 'Bunsen flame', realUse: 'Flame test, pyrotechnics' },
  { id: 'flame-cu', reactants: ['Cu', 'flame'], eq: 'Cu (heat) → blue-green emission', balanced: 'Atomic emission', products: ['Cu*'], type: 'oxidation', visual: 'fire', color: 'hsl(170,80%,55%)', enthalpy: 0, desc: 'Copper salts produce a blue-green flame — used in fireworks for green hues.', temp: 'Bunsen flame', realUse: 'Flame analysis, fireworks' },
  { id: 'flame-sr', reactants: ['Sr', 'flame'], eq: 'Sr (heat) → red emission', balanced: 'Atomic emission', products: ['Sr*'], type: 'oxidation', visual: 'fire', color: 'hsl(0,90%,55%)', enthalpy: 0, desc: 'Strontium gives an intense red flame, a classic colorant in red fireworks and emergency flares.', temp: 'Bunsen flame', realUse: 'Pyrotechnics, flame test' },
  { id: 'flame-ba', reactants: ['Ba', 'flame'], eq: 'Ba (heat) → green emission', balanced: 'Atomic emission', products: ['Ba*'], type: 'oxidation', visual: 'fire', color: 'hsl(120,70%,50%)', enthalpy: 0, desc: 'Barium ions emit pale green light in a flame — used in green fireworks.', temp: 'Bunsen flame', realUse: 'Flame test, pyrotechnics' },

  // ─── INDUSTRIAL & COMMERCIAL PROCESSES ───
  { id: 'solvay', reactants: ['NaCl', 'CO2'], eq: 'NaCl + NH₃ + CO₂ + H₂O → NaHCO₃ + NH₄Cl', balanced: 'NaCl + NH₃ + CO₂ + H₂O → NaHCO₃ + NH₄Cl', products: ['NaHCO3', 'NH4Cl'], type: 'double-replacement', visual: 'crystallize', color: 'hsl(0,0%,92%)', enthalpy: -64.0, desc: 'Solvay process — industrial synthesis of sodium carbonate via the bicarbonate intermediate.', temp: '60-80°C', realUse: 'Manufacture of soda ash for glass, paper, detergents' },
  { id: 'hall-heroult', reactants: ['Al2O3', 'C'], eq: '2Al₂O₃ + 3C → 4Al + 3CO₂', balanced: '2Al₂O₃ + 3C → 4Al + 3CO₂ (electrolysis)', products: ['Al', 'CO2'], type: 'electrolysis', visual: 'glow', color: 'hsl(40,30%,75%)', enthalpy: 1675.0, desc: 'Hall–Héroult process — electrolytic reduction of bauxite (alumina) to produce aluminum metal.', temp: '~960°C in cryolite', realUse: 'World aluminum production' },
  { id: 'steam-reforming', reactants: ['CH4', 'H2O'], eq: 'CH₄ + H₂O → CO + 3H₂', balanced: 'CH₄ + H₂O → CO + 3H₂', products: ['CO', 'H2'], type: 'redox', visual: 'gas-release', color: 'hsl(0,0%,85%)', enthalpy: 206.0, desc: 'Steam-methane reforming — primary industrial source of hydrogen for ammonia and refining.', temp: '700-1100°C', catalyst: 'Ni', realUse: 'Hydrogen, methanol, ammonia synthesis' },
  { id: 'water-gas-shift', reactants: ['CO', 'H2O'], eq: 'CO + H₂O → CO₂ + H₂', balanced: 'CO + H₂O → CO₂ + H₂', products: ['CO2', 'H2'], type: 'redox', visual: 'gas-release', color: 'hsl(220,30%,80%)', enthalpy: -41.2, desc: 'Water-gas shift reaction — boosts hydrogen yield from synthesis gas.', temp: '200-450°C', catalyst: 'Fe₂O₃ / Cu-ZnO', realUse: 'Refining, fuel-cell hydrogen, ammonia process' },
  { id: 'methanol-synthesis', reactants: ['CO', 'H2'], eq: 'CO + 2H₂ → CH₃OH', balanced: 'CO + 2H₂ → CH₃OH', products: ['CH3OH'], type: 'synthesis', visual: 'condense', color: 'hsl(190,60%,70%)', enthalpy: -90.6, desc: 'Industrial methanol synthesis from syngas — feedstock for plastics, fuel and formaldehyde.', temp: '250°C, 50-100 atm', catalyst: 'Cu/ZnO/Al₂O₃', realUse: 'Methanol production for chemicals & fuel' },
  { id: 'fischer-tropsch', reactants: ['CO', 'H2'], eq: '(2n+1)H₂ + nCO → CₙH₂ₙ₊₂ + nH₂O', balanced: 'Fischer–Tropsch synthesis', products: ['CnH2n+2', 'H2O'], type: 'synthesis', visual: 'vapor', color: 'hsl(45,40%,55%)', enthalpy: -165.0, desc: 'Catalytic conversion of syngas into liquid hydrocarbons — synthetic diesel and jet fuel.', temp: '150-300°C', catalyst: 'Fe / Co', realUse: 'Synthetic-fuel production (e.g., GTL, CTL plants)' },
  { id: 'ethylene-oxide', reactants: ['C2H4', 'O2'], eq: '2C₂H₄ + O₂ → 2C₂H₄O', balanced: '2C₂H₄ + O₂ → 2C₂H₄O', products: ['C2H4O'], type: 'oxidation', visual: 'gas-release', color: 'hsl(190,60%,60%)', enthalpy: -105.0, desc: 'Catalytic oxidation of ethylene to ethylene oxide — a key chemical intermediate.', temp: '~250°C', catalyst: 'Ag', realUse: 'Antifreeze, polyester, surfactants' },
  { id: 'wacker', reactants: ['C2H4', 'O2'], eq: '2C₂H₄ + O₂ → 2CH₃CHO', balanced: 'Wacker process: 2C₂H₄ + O₂ → 2CH₃CHO', products: ['CH3CHO'], type: 'oxidation', visual: 'vapor', color: 'hsl(35,80%,60%)', enthalpy: -244.0, desc: 'Wacker process — palladium-catalyzed oxidation of ethylene to acetaldehyde.', temp: '~110°C', catalyst: 'PdCl₂ / CuCl₂', realUse: 'Acetaldehyde and acetic-acid manufacturing' },
  { id: 'chlor-alkali', reactants: ['NaCl', 'H2O'], eq: '2NaCl + 2H₂O → 2NaOH + Cl₂ + H₂', balanced: '2NaCl + 2H₂O → 2NaOH + Cl₂ + H₂', products: ['NaOH', 'Cl2', 'H2'], type: 'electrolysis', visual: 'gas-release', color: 'hsl(60,80%,60%)', enthalpy: 451.0, desc: 'Chlor-alkali process — electrolysis of brine producing chlorine, hydrogen and caustic soda.', temp: '~90°C', realUse: 'PVC, bleach, paper pulping, NaOH production' },
  { id: 'frasch', reactants: ['S', 'H2O'], eq: 'Underground S(s) + superheated H₂O → S(l)', balanced: 'Frasch extraction (physical/chem)', products: ['S'], type: 'redox', visual: 'melt', color: 'hsl(50,90%,55%)', enthalpy: 1.7, desc: 'Frasch process — superheated water is pumped underground to melt elemental sulfur for extraction.', temp: '~165°C steam', realUse: 'Sulfur mining for sulfuric acid' },
  { id: 'bayer', reactants: ['Al2O3', 'NaOH'], eq: 'Al₂O₃ + 2NaOH + 3H₂O → 2NaAl(OH)₄', balanced: 'Bayer digestion', products: ['NaAl(OH)4'], type: 'double-replacement', visual: 'dissolve', color: 'hsl(15,30%,60%)', enthalpy: -120, desc: 'Bayer process — extracts pure alumina from bauxite ore using hot caustic soda.', temp: '150-200°C', realUse: 'Aluminum oxide refining for Hall-Héroult' },
  { id: 'mond', reactants: ['Ni', 'CO'], eq: 'Ni + 4CO ⇌ Ni(CO)₄', balanced: 'Mond purification', products: ['Ni(CO)4'], type: 'synthesis', visual: 'gas-release', color: 'hsl(45,30%,55%)', enthalpy: -161.0, desc: 'Mond process — volatile nickel carbonyl forms below 80°C and decomposes above 200°C, yielding ultra-pure nickel.', temp: '50-200°C', safety: '⚠️ Ni(CO)₄ is highly toxic!', realUse: 'High-purity nickel refining' },
  { id: 'haber-detail', reactants: ['N2', 'H2'], eq: 'N₂ + 3H₂ ⇌ 2NH₃', balanced: 'N₂ + 3H₂ ⇌ 2NH₃', products: ['NH3'], type: 'synthesis', visual: 'gas-release', color: 'hsl(200,40%,70%)', enthalpy: -91.8, desc: 'Haber–Bosch ammonia synthesis — the most important industrial reaction supporting modern agriculture.', temp: '400-500°C, 200 atm', catalyst: 'Fe + K₂O', realUse: 'Fertilizer industry — feeds half the world' },
  { id: 'ostwald-detail', reactants: ['NH3', 'O2'], eq: '4NH₃ + 5O₂ → 4NO + 6H₂O', balanced: '4NH₃ + 5O₂ → 4NO + 6H₂O', products: ['NO', 'H2O'], type: 'oxidation', visual: 'gas-release', color: 'hsl(25,70%,55%)', enthalpy: -905.0, desc: 'Ostwald process — catalytic oxidation of ammonia to nitric oxide, then further oxidized to nitric acid.', temp: '~900°C', catalyst: 'Pt-Rh gauze', realUse: 'Nitric-acid and fertilizer production' },

  // ─── ORGANIC & NAMED ORGANIC REACTIONS ───
  { id: 'esterification', reactants: ['CH3COOH', 'C2H5OH'], eq: 'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O', balanced: 'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O', products: ['CH3COOC2H5', 'H2O'], type: 'esterification', visual: 'vapor', color: 'hsl(40,80%,70%)', enthalpy: -10, desc: 'Fischer esterification — acetic acid and ethanol form fragrant ethyl acetate.', temp: 'Reflux 70°C', catalyst: 'H₂SO₄', realUse: 'Solvents, fragrances, flavorings' },
  { id: 'saponification', reactants: ['Fat', 'NaOH'], eq: 'Triglyceride + 3NaOH → Soap + Glycerol', balanced: 'C₃H₅(OOCR)₃ + 3NaOH → 3RCOONa + C₃H₈O₃', products: ['Soap', 'C3H8O3'], type: 'hydrolysis', visual: 'dissolve', color: 'hsl(35,70%,80%)', enthalpy: -150, desc: 'Saponification — base-catalyzed hydrolysis of fats producing soap and glycerol.', temp: '80-100°C', realUse: 'Soap and detergent manufacturing' },
  { id: 'aldol', reactants: ['CH3CHO', 'CH3CHO'], eq: '2CH₃CHO → CH₃CH(OH)CH₂CHO', balanced: 'Aldol addition', products: ['C4H8O2'], type: 'synthesis', visual: 'condense', color: 'hsl(35,60%,55%)', enthalpy: -45, desc: 'Aldol condensation — two carbonyl molecules join to form a β-hydroxy aldehyde.', temp: 'Room temp', catalyst: 'NaOH or HCl', realUse: 'C–C bond formation in synthesis' },
  { id: 'cannizzaro', reactants: ['HCHO', 'NaOH'], eq: '2HCHO + NaOH → HCOONa + CH₃OH', balanced: '2HCHO + NaOH → HCOONa + CH₃OH', products: ['HCOONa', 'CH3OH'], type: 'redox', visual: 'dissolve', color: 'hsl(0,0%,90%)', enthalpy: -78, desc: 'Cannizzaro disproportionation — non-enolizable aldehyde becomes both acid and alcohol.', temp: 'Room temp', realUse: 'Production of sodium formate, methanol from formaldehyde' },
  { id: 'wittig', reactants: ['R3P=CR2', 'R2C=O'], eq: 'R₃P=CR₂ + R₂C=O → R₂C=CR₂ + R₃P=O', balanced: 'Wittig olefination', products: ['Alkene', 'R3PO'], type: 'synthesis', visual: 'precipitate', color: 'hsl(0,0%,85%)', enthalpy: -200, desc: 'Wittig reaction — phosphorus ylides convert ketones into alkenes with great selectivity.', temp: 'Room temp', realUse: 'Vitamin A and steroid synthesis' },
  { id: 'grignard', reactants: ['RMgX', 'R2C=O'], eq: 'RMgX + R₂C=O → R₂C(OMgX)R', balanced: 'Grignard addition', products: ['Alcohol'], type: 'synthesis', visual: 'spark', color: 'hsl(140,40%,55%)', enthalpy: -110, desc: 'Grignard reaction — organomagnesium reagents add to carbonyls forming new C–C bonds.', safety: '⚠️ Pyrophoric in moisture!', temp: 'Anhydrous ether', realUse: 'Pharmaceuticals, alcohols, fine chemicals' },
  { id: 'friedel-crafts-alk', reactants: ['C6H6', 'RCl'], eq: 'C₆H₆ + RCl → C₆H₅R + HCl', balanced: 'Friedel–Crafts alkylation', products: ['C6H5R', 'HCl'], type: 'synthesis', visual: 'gas-release', color: 'hsl(45,80%,60%)', enthalpy: -120, desc: 'Friedel–Crafts alkylation — Lewis-acid catalyzed alkylation of aromatic rings.', temp: '0-50°C', catalyst: 'AlCl₃', realUse: 'Cumene, ethylbenzene, polystyrene precursors' },
  { id: 'friedel-crafts-acyl', reactants: ['C6H6', 'RCOCl'], eq: 'C₆H₆ + RCOCl → C₆H₅COR + HCl', balanced: 'Friedel–Crafts acylation', products: ['C6H5COR', 'HCl'], type: 'synthesis', visual: 'crystallize', color: 'hsl(35,70%,60%)', enthalpy: -130, desc: 'Friedel–Crafts acylation — installs an acyl group on aromatic rings (no rearrangement).', temp: '0-25°C', catalyst: 'AlCl₃', realUse: 'Aryl ketone manufacturing for fragrances and drugs' },
  { id: 'diels-alder', reactants: ['C4H6', 'C2H4'], eq: '1,3-butadiene + ethene → cyclohexene', balanced: 'C₄H₆ + C₂H₄ → C₆H₁₀', products: ['C6H10'], type: 'synthesis', visual: 'condense', color: 'hsl(160,40%,55%)', enthalpy: -160, desc: 'Diels–Alder cycloaddition — diene + dienophile produces a six-membered ring in one step.', temp: '~200°C', realUse: 'Steroids, terpenes, polymer ring closures' },
  { id: 'sn1', reactants: ['(CH3)3CCl', 'H2O'], eq: '(CH₃)₃CCl + H₂O → (CH₃)₃COH + HCl', balanced: 'SN1 substitution', products: ['(CH3)3COH', 'HCl'], type: 'hydrolysis', visual: 'dissolve', color: 'hsl(220,50%,70%)', enthalpy: -45, desc: 'SN1 nucleophilic substitution — t-butyl chloride hydrolyzes via a carbocation intermediate.', temp: 'Room temp', realUse: 'Mechanism teaching, alcohol synthesis' },
  { id: 'sn2', reactants: ['CH3Br', 'OH-'], eq: 'CH₃Br + OH⁻ → CH₃OH + Br⁻', balanced: 'SN2 substitution', products: ['CH3OH', 'Br-'], type: 'single-replacement', visual: 'dissolve', color: 'hsl(170,50%,60%)', enthalpy: -88, desc: 'SN2 substitution — backside attack inverts the stereochemistry at carbon.', temp: 'Room temp', realUse: 'Methanol synthesis, mechanism teaching' },
  { id: 'hydroboration', reactants: ['C2H4', 'BH3'], eq: '3C₂H₄ + BH₃ → (C₂H₅)₃B', balanced: 'Anti-Markovnikov hydroboration', products: ['(C2H5)3B'], type: 'synthesis', visual: 'condense', color: 'hsl(50,40%,55%)', enthalpy: -130, desc: 'Hydroboration of alkenes — adds B–H across double bond with anti-Markovnikov selectivity.', temp: '0°C', realUse: 'Anti-Markovnikov alcohols (after H₂O₂/OH⁻)' },
  { id: 'ozonolysis', reactants: ['C2H4', 'O3'], eq: 'R₂C=CR₂ + O₃ → 2R₂C=O', balanced: 'Ozonolysis cleavage', products: ['Aldehydes', 'Ketones'], type: 'oxidation', visual: 'vapor', color: 'hsl(200,60%,70%)', enthalpy: -360, desc: 'Ozonolysis cleaves a C=C double bond into two carbonyl fragments.', temp: '-78°C in CH₂Cl₂', realUse: 'Determining alkene structure; rubber chemistry' },
  { id: 'hydrogenation', reactants: ['C2H4', 'H2'], eq: 'C₂H₄ + H₂ → C₂H₆', balanced: 'C₂H₄ + H₂ → C₂H₆', products: ['C2H6'], type: 'reduction', visual: 'absorb', color: 'hsl(0,0%,85%)', enthalpy: -137.0, desc: 'Catalytic hydrogenation — adds H₂ across C=C bond producing alkanes.', temp: '25-150°C, 1-100 atm', catalyst: 'Pt / Pd / Ni', realUse: 'Margarine, fuel saturation, fine chemicals' },
  { id: 'polymer-pe', reactants: ['C2H4', 'C2H4'], eq: 'n C₂H₄ → -(C₂H₄)-ₙ', balanced: 'Polyethylene chain growth', products: ['(C2H4)n'], type: 'polymerization', visual: 'crystallize', color: 'hsl(0,0%,95%)', enthalpy: -94.0, desc: 'Polyethylene synthesis — the world\'s most produced plastic.', temp: '~80°C, low pressure (Ziegler–Natta)', catalyst: 'TiCl₄/AlEt₃', realUse: 'Plastic bags, bottles, pipes, films' },
  { id: 'polymer-pp', reactants: ['C3H6', 'C3H6'], eq: 'n CH₂=CHCH₃ → -(CH₂CH(CH₃))-ₙ', balanced: 'Propylene polymerization', products: ['(C3H6)n'], type: 'polymerization', visual: 'crystallize', color: 'hsl(35,30%,90%)', enthalpy: -85.0, desc: 'Polypropylene synthesis — high-strength plastic for packaging and fibers.', temp: '60-80°C', catalyst: 'Ziegler–Natta', realUse: 'Containers, automotive parts, ropes' },
  { id: 'polymer-pvc', reactants: ['C2H3Cl', 'C2H3Cl'], eq: 'n CH₂=CHCl → -(CH₂CHCl)-ₙ', balanced: 'PVC polymerization', products: ['(C2H3Cl)n'], type: 'polymerization', visual: 'crystallize', color: 'hsl(0,0%,90%)', enthalpy: -72.0, desc: 'Polyvinyl chloride formation — vinyl chloride monomers polymerize via radicals.', temp: '50-70°C', catalyst: 'Peroxide initiator', realUse: 'Pipes, flooring, cable insulation' },
  { id: 'polymer-ps', reactants: ['C8H8', 'C8H8'], eq: 'n C₆H₅CH=CH₂ → -(CH₂CH(C₆H₅))-ₙ', balanced: 'Styrene polymerization', products: ['(C8H8)n'], type: 'polymerization', visual: 'crystallize', color: 'hsl(0,0%,98%)', enthalpy: -65.0, desc: 'Polystyrene synthesis — rigid plastic used in foam and packaging.', temp: '60-100°C', realUse: 'Styrofoam cups, packaging, insulation' },
  { id: 'polymer-ptfe', reactants: ['C2F4', 'C2F4'], eq: 'n CF₂=CF₂ → -(CF₂CF₂)-ₙ', balanced: 'Teflon polymerization', products: ['(C2F4)n'], type: 'polymerization', visual: 'crystallize', color: 'hsl(0,0%,98%)', enthalpy: -150.0, desc: 'Teflon (PTFE) — perfluorinated polymer with extreme chemical resistance.', temp: 'Room temp - 80°C', realUse: 'Non-stick cookware, gaskets, valves' },
  { id: 'polymer-nylon', reactants: ['C6H14N2', 'C6H10O4'], eq: 'Hexamethylenediamine + Adipic acid → Nylon-6,6 + H₂O', balanced: 'Nylon-6,6 condensation', products: ['Nylon66', 'H2O'], type: 'polymerization', visual: 'crystallize', color: 'hsl(40,30%,80%)', enthalpy: -45.0, desc: 'Nylon-6,6 synthesis — condensation polymerization producing strong synthetic fiber.', temp: '~270°C', realUse: 'Textiles, ropes, gears, parachutes' },
  { id: 'polymer-pet', reactants: ['C8H6O4', 'C2H6O2'], eq: 'Terephthalic acid + Ethylene glycol → PET + H₂O', balanced: 'PET condensation', products: ['PET', 'H2O'], type: 'polymerization', visual: 'crystallize', color: 'hsl(190,40%,85%)', enthalpy: -50.0, desc: 'Polyethylene terephthalate — clear, recyclable polyester used in bottles.', temp: '250-300°C', catalyst: 'Sb₂O₃', realUse: 'Drink bottles, polyester fibers' },
  { id: 'polymer-bakelite', reactants: ['C6H6O', 'CH2O'], eq: 'Phenol + Formaldehyde → Bakelite + H₂O', balanced: 'Bakelite condensation', products: ['Bakelite', 'H2O'], type: 'polymerization', visual: 'crystallize', color: 'hsl(20,60%,30%)', enthalpy: -55.0, desc: 'Bakelite — the first fully synthetic plastic, a phenol-formaldehyde thermoset.', temp: '150-200°C', realUse: 'Electrical insulators, vintage telephones' },

  // ─── BIOCHEMISTRY ───
  { id: 'atp-hydrolysis', reactants: ['ATP', 'H2O'], eq: 'ATP + H₂O → ADP + Pᵢ + energy', balanced: 'C₁₀H₁₆N₅O₁₃P₃ + H₂O → C₁₀H₁₅N₅O₁₀P₂ + HPO₄²⁻', products: ['ADP', 'Pi'], type: 'hydrolysis', visual: 'dissolve', color: 'hsl(60,90%,60%)', enthalpy: -30.5, desc: 'ATP hydrolysis — releases 30.5 kJ/mol, the universal energy currency of cells.', temp: '37°C (body temp)', catalyst: 'ATPase', realUse: 'Powering muscle contraction, biosynthesis, transport' },
  { id: 'glycolysis', reactants: ['C6H12O6', 'ADP'], eq: 'Glucose + 2NAD⁺ + 2ADP → 2 Pyruvate + 2NADH + 2ATP', balanced: 'C₆H₁₂O₆ → 2 CH₃COCOO⁻', products: ['Pyruvate', 'ATP', 'NADH'], type: 'redox', visual: 'effervescence', color: 'hsl(35,80%,65%)', enthalpy: -85.0, desc: 'Glycolysis — 10-step metabolic pathway converting glucose to pyruvate, producing ATP.', temp: '37°C', catalyst: 'Enzymes (cytosol)', realUse: 'Universal energy generation in living cells' },
  { id: 'krebs', reactants: ['Acetyl-CoA', 'OAA'], eq: 'Acetyl-CoA + OAA → Citrate → ... → CO₂ + NADH + FADH₂ + ATP', balanced: 'Citric-acid cycle (multistep)', products: ['CO2', 'NADH', 'FADH2', 'ATP'], type: 'redox', visual: 'gas-release', color: 'hsl(40,70%,55%)', enthalpy: -30, desc: 'Krebs (citric-acid) cycle — central oxidative pathway in mitochondria.', temp: '37°C', catalyst: 'Mitochondrial enzymes', realUse: 'Cellular respiration, ATP & precursor production' },
  { id: 'oxphos', reactants: ['NADH', 'O2'], eq: 'NADH + ½O₂ + H⁺ → NAD⁺ + H₂O + ATP', balanced: 'Oxidative phosphorylation', products: ['NAD+', 'H2O', 'ATP'], type: 'redox', visual: 'glow', color: 'hsl(280,70%,55%)', enthalpy: -220, desc: 'Oxidative phosphorylation — electron transport chain pumps protons to drive ATP synthase.', temp: '37°C', catalyst: 'ETC + ATP synthase', realUse: 'Aerobic ATP production (~90% of cell energy)' },
  { id: 'photosynthesis-detail', reactants: ['CO2', 'H2O'], eq: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', balanced: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', products: ['C6H12O6', 'O2'], type: 'photosynthesis', visual: 'glow', color: 'hsl(120,80%,50%)', enthalpy: 2802.0, desc: 'Photosynthesis — chlorophyll-driven conversion of CO₂ and water into glucose and O₂.', temp: 'Sunlight + 25°C', catalyst: 'Chlorophyll', realUse: 'Foundation of nearly all food chains on Earth' },
  { id: 'fermentation-yeast', reactants: ['C6H12O6', 'enzyme'], eq: 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂', balanced: 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂', products: ['C2H5OH', 'CO2'], type: 'fermentation', visual: 'effervescence', color: 'hsl(40,80%,70%)', enthalpy: -67.0, desc: 'Alcoholic fermentation — yeast converts glucose to ethanol and carbon dioxide.', temp: '20-30°C', catalyst: 'Saccharomyces enzymes', realUse: 'Beer, wine, bioethanol, bread leavening' },
  { id: 'lactic-fermentation', reactants: ['C6H12O6', 'enzyme'], eq: 'C₆H₁₂O₆ → 2 CH₃CH(OH)COOH', balanced: 'Glucose → 2 Lactate', products: ['C3H6O3'], type: 'fermentation', visual: 'dissolve', color: 'hsl(40,40%,85%)', enthalpy: -110, desc: 'Lactic-acid fermentation — anaerobic glycolysis in muscle and bacteria producing lactate.', temp: '30-45°C', catalyst: 'Lactate dehydrogenase', realUse: 'Yogurt, sauerkraut, muscle metabolism' },
  { id: 'urea-cycle', reactants: ['NH3', 'CO2'], eq: '2NH₃ + CO₂ → CO(NH₂)₂ + H₂O', balanced: '2NH₃ + CO₂ → CO(NH₂)₂ + H₂O', products: ['CON2H4', 'H2O'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,90%)', enthalpy: -133.0, desc: 'Urea cycle — liver removes toxic ammonia by converting it to urea for excretion.', temp: '37°C', realUse: 'Nitrogen excretion in mammals; fertilizer' },
  { id: 'hemoglobin-o2', reactants: ['Hemoglobin', 'O2'], eq: 'Hb + 4O₂ ⇌ Hb(O₂)₄', balanced: 'Hb + 4O₂ ⇌ Hb(O₂)₄', products: ['Hb(O2)4'], type: 'synthesis', visual: 'color-change', color: 'hsl(0,80%,45%)', enthalpy: -120, desc: 'Hemoglobin oxygen binding — switches between bright (oxy) and dark (deoxy) red as O₂ is loaded/unloaded.', temp: '37°C', realUse: 'Oxygen transport in blood' },
  { id: 'carbonic-anhydrase', reactants: ['CO2', 'H2O'], eq: 'CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻', balanced: 'Carbonic anhydrase equilibrium', products: ['H2CO3', 'HCO3-'], type: 'hydrolysis', visual: 'bubbles', color: 'hsl(190,60%,70%)', enthalpy: -20.3, desc: 'Carbonic anhydrase — enzyme accelerating CO₂ ↔ bicarbonate by 10⁷ in blood and tissues.', temp: '37°C', catalyst: 'Carbonic anhydrase', realUse: 'CO₂ transport, blood pH buffering' },

  // ─── ENVIRONMENTAL & ATMOSPHERIC ───
  { id: 'cfc-ozone', reactants: ['Cl', 'O3'], eq: 'Cl• + O₃ → ClO• + O₂', balanced: 'CFC ozone destruction', products: ['ClO', 'O2'], type: 'redox', visual: 'gas-release', color: 'hsl(195,80%,55%)', enthalpy: -160.0, desc: 'Chlorine radicals from CFCs catalytically destroy stratospheric ozone — cause of the ozone hole.', temp: '-50°C stratosphere', realUse: 'Climate science; banned by Montreal Protocol' },
  { id: 'no-ozone', reactants: ['NO', 'O3'], eq: 'NO + O₃ → NO₂ + O₂', balanced: 'NO + O₃ → NO₂ + O₂', products: ['NO2', 'O2'], type: 'redox', visual: 'gas-release', color: 'hsl(25,80%,55%)', enthalpy: -200.0, desc: 'Nitric-oxide titration of ozone — important in stratospheric chemistry and air-quality monitoring.', temp: 'Atmospheric', realUse: 'Ozone analyzers; tropospheric chemistry' },
  { id: 'photochemical-smog', reactants: ['NO2', 'hv'], eq: 'NO₂ + hν → NO + O', balanced: 'Photodissociation', products: ['NO', 'O'], type: 'decomposition', visual: 'glow', color: 'hsl(35,80%,50%)', enthalpy: 306.0, desc: 'Sunlight splits NO₂, generating atomic oxygen that combines with O₂ to form ozone — the engine of urban smog.', temp: 'Daylight', realUse: 'Atmospheric chemistry modeling' },
  { id: 'ocean-acidification', reactants: ['CO2', 'H2O'], eq: 'CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻', balanced: 'Ocean acidification', products: ['H2CO3', 'HCO3-'], type: 'hydrolysis', visual: 'dissolve', color: 'hsl(200,60%,55%)', enthalpy: -19.0, desc: 'CO₂ dissolution in oceans lowers pH, threatening shell-forming organisms.', temp: 'Sea temp ~15°C', realUse: 'Climate change research' },
  { id: 'nox-formation', reactants: ['N2', 'O2'], eq: 'N₂ + O₂ → 2NO', balanced: 'N₂ + O₂ → 2NO', products: ['NO'], type: 'synthesis', visual: 'gas-release', color: 'hsl(25,60%,50%)', enthalpy: 180.0, desc: 'High-temperature combustion (engines, lightning) splits N₂ and O₂ to form NOx — primary smog precursor.', temp: '>1500°C', realUse: 'Engine emissions science' },
  { id: 'so2-h2o2', reactants: ['SO2', 'H2O2'], eq: 'SO₂ + H₂O₂ → H₂SO₄', balanced: 'SO₂ + H₂O₂ → H₂SO₄', products: ['H2SO4'], type: 'oxidation', visual: 'condense', color: 'hsl(220,40%,40%)', enthalpy: -240.0, desc: 'Atmospheric oxidation of SO₂ by H₂O₂ in clouds — the dominant pathway for sulfate aerosol and acid rain.', temp: 'Cloud temps', realUse: 'Atmospheric chemistry; acid-rain studies' },
  { id: 'methane-greenhouse', reactants: ['CH4', 'OH'], eq: 'CH₄ + OH• → CH₃• + H₂O', balanced: 'Methane oxidation initiation', products: ['CH3', 'H2O'], type: 'oxidation', visual: 'vapor', color: 'hsl(40,30%,70%)', enthalpy: -64.0, desc: 'Hydroxyl radicals destroy atmospheric methane — the main natural sink for this potent greenhouse gas.', temp: 'Tropospheric', realUse: 'Climate science; methane lifetime estimates' },

  // ─── HOUSEHOLD / DEMONSTRATION CHEMISTRY ───
  { id: 'baking-vinegar', reactants: ['NaHCO3', 'CH3COOH'], eq: 'NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂', balanced: 'NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂', products: ['CH3COONa', 'H2O', 'CO2'], type: 'acid-base', visual: 'effervescence', color: 'hsl(45,50%,80%)', enthalpy: -45.0, desc: 'Baking-soda + vinegar — the classic kitchen demo producing fizzing CO₂.', temp: 'Room temp', realUse: 'Volcano demos, leavening, cleaning' },
  { id: 'baking-decomp', reactants: ['NaHCO3', 'heat'], eq: '2NaHCO₃ → Na₂CO₃ + H₂O + CO₂', balanced: '2NaHCO₃ → Na₂CO₃ + H₂O + CO₂', products: ['Na2CO3', 'H2O', 'CO2'], type: 'decomposition', visual: 'gas-release', color: 'hsl(0,0%,90%)', enthalpy: 85.0, desc: 'Baking soda thermal decomposition — releases CO₂ that leavens dough during baking.', temp: '~80°C', realUse: 'Baking; fire extinguishers' },
  { id: 'bleach-acid', reactants: ['NaOCl', 'HCl'], eq: 'NaOCl + 2HCl → NaCl + H₂O + Cl₂', balanced: 'NaOCl + 2HCl → NaCl + H₂O + Cl₂', products: ['NaCl', 'H2O', 'Cl2'], type: 'redox', visual: 'gas-release', color: 'hsl(60,80%,50%)', enthalpy: -160.0, desc: 'Bleach mixed with acid releases toxic chlorine gas — one of the most dangerous household combinations!', safety: '⚠️ TOXIC! Never mix.', temp: 'Room temp', realUse: 'Safety education; never perform!' },
  { id: 'bleach-ammonia', reactants: ['NaOCl', 'NH3'], eq: 'NaOCl + NH₃ → NaCl + NH₂Cl + H₂O', balanced: 'NaOCl + NH₃ → NaCl + NH₂Cl + H₂O', products: ['NaCl', 'NH2Cl', 'H2O'], type: 'redox', visual: 'gas-release', color: 'hsl(60,40%,75%)', enthalpy: -200.0, desc: 'Bleach + ammonia produces toxic chloramine vapors — extremely hazardous in enclosed spaces.', safety: '⚠️ TOXIC vapors!', temp: 'Room temp', realUse: 'Hazard education' },
  { id: 'rust', reactants: ['Fe', 'O2'], eq: '4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃', balanced: '4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃', products: ['Fe(OH)3'], type: 'oxidation', visual: 'crystallize', color: 'hsl(20,80%,40%)', enthalpy: -1648.0, desc: 'Iron oxidation in moist air forms reddish-brown rust (Fe(OH)₃ → Fe₂O₃·xH₂O).', temp: 'Room temp', realUse: 'Corrosion engineering; protective coatings' },
  { id: 'silver-tarnish', reactants: ['Ag', 'H2S'], eq: '4Ag + 2H₂S + O₂ → 2Ag₂S + 2H₂O', balanced: '4Ag + 2H₂S + O₂ → 2Ag₂S + 2H₂O', products: ['Ag2S', 'H2O'], type: 'oxidation', visual: 'crystallize', color: 'hsl(30,10%,30%)', enthalpy: -290.0, desc: 'Silver tarnish — H₂S in air forms a black Ag₂S layer on silverware.', temp: 'Room temp', realUse: 'Why silver darkens; cleaning chemistry' },
  { id: 'antacid-hcl', reactants: ['CaCO3', 'HCl'], eq: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂', balanced: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂', products: ['CaCl2', 'H2O', 'CO2'], type: 'acid-base', visual: 'effervescence', color: 'hsl(0,0%,95%)', enthalpy: -190.0, desc: 'Antacid neutralization — calcium carbonate quenches stomach acid producing CO₂.', temp: '37°C', realUse: 'Tums, indigestion relief' },
  { id: 'fire-extinguisher', reactants: ['NaHCO3', 'heat'], eq: '2NaHCO₃ + heat → Na₂CO₃ + H₂O + CO₂', balanced: '2NaHCO₃ → Na₂CO₃ + H₂O + CO₂', products: ['Na2CO3', 'H2O', 'CO2'], type: 'decomposition', visual: 'smoke', color: 'hsl(0,0%,80%)', enthalpy: 85.0, desc: 'Dry-chemical extinguishers release CO₂ and water vapor that smother flames.', temp: '>50°C activates', realUse: 'BC-class fire extinguishers' },
  { id: 'dehydrator-h2so4', reactants: ['C6H12O6', 'H2SO4'], eq: 'C₆H₁₂O₆ → 6C + 6H₂O', balanced: 'Concentrated H₂SO₄ dehydration of sugar', products: ['C', 'H2O'], type: 'redox', visual: 'smoke', color: 'hsl(0,0%,15%)', enthalpy: -290.0, desc: 'Sulfuric-acid dehydration of sugar — the spectacular "black snake" carbon column.', safety: '⚠️ Highly exothermic; toxic SO₂!', temp: 'Room temp - rapid', realUse: 'Dehydration demonstration' },
  { id: 'glow-in-dark', reactants: ['ZnS', 'Cu'], eq: 'ZnS:Cu (UV) → green afterglow', balanced: 'Phosphorescence excitation', products: ['ZnS:Cu*'], type: 'oxidation', visual: 'luminescence', color: 'hsl(120,90%,60%)', enthalpy: 0, desc: 'Copper-doped zinc sulfide absorbs UV and re-emits green light for hours — classic glow-in-the-dark phosphor.', temp: 'Room temp', realUse: 'Glow-in-the-dark toys, watch dials' },

  // ─── ELECTROCHEMISTRY & BATTERIES ───
  { id: 'lead-acid', reactants: ['Pb', 'PbO2'], eq: 'Pb + PbO₂ + 2H₂SO₄ → 2PbSO₄ + 2H₂O', balanced: 'Pb + PbO₂ + 2H₂SO₄ → 2PbSO₄ + 2H₂O', products: ['PbSO4', 'H2O'], type: 'redox', visual: 'dissolve', color: 'hsl(220,30%,40%)', enthalpy: -394.0, desc: 'Lead-acid battery discharge — generates 2.05 V per cell; reversible by recharging.', temp: 'Room temp', realUse: 'Car batteries, backup power' },
  { id: 'lithium-ion', reactants: ['Li', 'CoO2'], eq: 'LiC₆ + CoO₂ → C₆ + LiCoO₂', balanced: 'Li-ion intercalation', products: ['C', 'LiCoO2'], type: 'redox', visual: 'absorb', color: 'hsl(280,70%,55%)', enthalpy: -200.0, desc: 'Lithium intercalation in cobalt oxide — the rechargeable Li-ion battery cycle.', temp: '20-45°C', realUse: 'Phones, laptops, EVs' },
  { id: 'alkaline-cell', reactants: ['Zn', 'MnO2'], eq: 'Zn + 2MnO₂ + H₂O → ZnO + 2MnO(OH)', balanced: 'Alkaline-cell discharge', products: ['ZnO', 'MnO(OH)'], type: 'redox', visual: 'dissolve', color: 'hsl(35,40%,55%)', enthalpy: -280.0, desc: 'Alkaline battery — Zn anode + MnO₂ cathode in KOH electrolyte; 1.5 V.', temp: 'Room temp', realUse: 'AA, AAA, 9V household batteries' },
  { id: 'fuel-cell', reactants: ['H2', 'O2'], eq: '2H₂ + O₂ → 2H₂O + electricity', balanced: '2H₂ + O₂ → 2H₂O', products: ['H2O', 'Electricity'], type: 'redox', visual: 'glow', color: 'hsl(190,90%,60%)', enthalpy: -571.6, desc: 'Hydrogen fuel cell — clean electrochemical conversion of H₂ + O₂ to water and electricity.', temp: '60-90°C (PEM)', catalyst: 'Pt', realUse: 'Zero-emission vehicles, spacecraft (Apollo)' },
  { id: 'galvanic-cell', reactants: ['Zn', 'Cu2+'], eq: 'Zn(s) + Cu²⁺ → Zn²⁺ + Cu(s)', balanced: 'Galvanic spontaneous redox', products: ['Zn2+', 'Cu'], type: 'redox', visual: 'crystallize', color: 'hsl(15,60%,45%)', enthalpy: -213.0, desc: 'Daniell-cell reaction — zinc reduces copper(II), depositing shiny copper while zinc dissolves. EMF ≈ 1.10 V.', temp: 'Room temp', realUse: 'Foundation of electrochemistry' },

  // ─── ACID-BASE & EQUILIBRIA ───
  { id: 'h2co3-eq', reactants: ['CO2', 'H2O'], eq: 'CO₂ + H₂O ⇌ H₂CO₃', balanced: 'Carbonic-acid equilibrium', products: ['H2CO3'], type: 'synthesis', visual: 'dissolve', color: 'hsl(195,60%,75%)', enthalpy: -19.0, desc: 'CO₂ dissolves in water forming carbonic acid — drives soda fizz and ocean chemistry.', temp: 'Room temp', realUse: 'Carbonated drinks, blood pH buffering' },
  { id: 'phenol-naoh', reactants: ['C6H5OH', 'NaOH'], eq: 'C₆H₅OH + NaOH → C₆H₅ONa + H₂O', balanced: 'C₆H₅OH + NaOH → C₆H₅ONa + H₂O', products: ['C6H5ONa', 'H2O'], type: 'acid-base', visual: 'dissolve', color: 'hsl(35,40%,70%)', enthalpy: -60.0, desc: 'Phenol is acidic enough to react with NaOH forming sodium phenoxide.', temp: 'Room temp', realUse: 'Aspirin synthesis, organic intermediates' },
  { id: 'nh3-h2o', reactants: ['NH3', 'H2O'], eq: 'NH₃ + H₂O ⇌ NH₄⁺ + OH⁻', balanced: 'NH₃ + H₂O ⇌ NH₄⁺ + OH⁻', products: ['NH4+', 'OH-'], type: 'acid-base', visual: 'dissolve', color: 'hsl(220,30%,80%)', enthalpy: -34.0, desc: 'Ammonia dissolves in water to give a weak base (pKb ≈ 4.75).', temp: 'Room temp', realUse: 'Cleaning solutions, fertilizer' },
  { id: 'phenolphthalein', reactants: ['C20H14O4', 'OH-'], eq: 'Phenolphthalein + base → pink form', balanced: 'Acid-base indicator', products: ['Pink form'], type: 'acid-base', visual: 'color-change', color: 'hsl(330,80%,60%)', enthalpy: 0, desc: 'Phenolphthalein turns from colorless to vivid pink at pH ≈ 8.2.', temp: 'Room temp', realUse: 'Titrations, pH indicators' },
  { id: 'methyl-orange', reactants: ['C14H14N3NaO3S', 'H+'], eq: 'Methyl orange + acid → red form', balanced: 'Indicator protonation', products: ['Red form'], type: 'acid-base', visual: 'color-change', color: 'hsl(15,90%,55%)', enthalpy: 0, desc: 'Methyl orange transitions yellow → red at pH ≈ 3.5.', temp: 'Room temp', realUse: 'Acid-base titrations' },

  // ─── REDOX & TRANSITION-METAL CHEMISTRY ───
  { id: 'cr-redox', reactants: ['K2Cr2O7', 'Fe2+'], eq: 'Cr₂O₇²⁻ + 6Fe²⁺ + 14H⁺ → 2Cr³⁺ + 6Fe³⁺ + 7H₂O', balanced: 'Cr(VI) oxidizes Fe(II)', products: ['Cr3+', 'Fe3+', 'H2O'], type: 'redox', visual: 'color-change', color: 'hsl(120,80%,40%)', enthalpy: -350.0, desc: 'Dichromate (orange) oxidizes Fe²⁺ to Fe³⁺, becoming green Cr³⁺. Used in titrations.', temp: 'Room temp', realUse: 'Iron-content titration; alcohol breath tests (historic)' },
  { id: 'kmno4-warm', reactants: ['KMnO4', 'C2H2O4'], eq: '2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O', balanced: 'KMnO₄ + oxalate redox', products: ['Mn2+', 'CO2', 'H2O'], type: 'redox', visual: 'color-change', color: 'hsl(330,80%,55%)', enthalpy: -360.0, desc: 'Permanganate (deep purple) oxidizes oxalate to CO₂, fading to colorless Mn²⁺.', temp: '60°C', realUse: 'Permanganate standardization' },
  { id: 'vanadium-states', reactants: ['VO2+', 'Zn'], eq: 'VO₂⁺ → VO²⁺ → V³⁺ → V²⁺', balanced: 'Stepwise zinc reduction', products: ['VO2+', 'VO2+', 'V3+', 'V2+'], type: 'reduction', visual: 'color-change', color: 'hsl(280,80%,55%)', enthalpy: -280.0, desc: 'Reducing vanadium with zinc cycles through yellow → blue → green → violet — the rainbow demo.', temp: 'Room temp', realUse: 'Demonstrating multiple oxidation states' },
  { id: 'cu-tetrammine', reactants: ['Cu2+', 'NH3'], eq: 'Cu²⁺ + 4NH₃ → [Cu(NH₃)₄]²⁺', balanced: 'Cu²⁺ + 4NH₃ → [Cu(NH₃)₄]²⁺', products: ['[Cu(NH3)4]2+'], type: 'synthesis', visual: 'color-change', color: 'hsl(220,90%,55%)', enthalpy: -110.0, desc: 'Pale-blue Cu²⁺ becomes deep royal-blue tetraammine complex on adding ammonia.', temp: 'Room temp', realUse: 'Qualitative test for Cu²⁺' },
  { id: 'fe-thiocyanate', reactants: ['Fe3+', 'SCN-'], eq: 'Fe³⁺ + SCN⁻ → [Fe(SCN)]²⁺', balanced: 'Fe³⁺ + SCN⁻ → [Fe(SCN)]²⁺', products: ['[Fe(SCN)]2+'], type: 'synthesis', visual: 'color-change', color: 'hsl(0,80%,40%)', enthalpy: -80.0, desc: 'Iron(III) + thiocyanate forms blood-red complex — extremely sensitive Fe³⁺ test.', temp: 'Room temp', realUse: 'Fe³⁺ detection; Le Châtelier demos' },
  { id: 'iron-rust-detail', reactants: ['Fe', 'O2'], eq: '2Fe + O₂ + 2H₂O → 2Fe(OH)₂ → 2FeO(OH)', balanced: 'Multistep rusting', products: ['FeO(OH)'], type: 'oxidation', visual: 'crystallize', color: 'hsl(20,75%,40%)', enthalpy: -825.0, desc: 'Detailed rusting pathway via iron(II) hydroxide intermediate to hydrated iron(III) oxide.', temp: 'Room temp + humidity', realUse: 'Corrosion mitigation engineering' },

  // ─── NUCLEAR ───
  { id: 'alpha-decay', reactants: ['U-238'], eq: '²³⁸U → ²³⁴Th + ⁴He', balanced: 'Alpha decay of U-238', products: ['Th-234', 'He-4'], type: 'nuclear', visual: 'spark', color: 'hsl(60,70%,55%)', enthalpy: -422000.0, desc: 'Alpha decay — U-238 emits a helium-4 nucleus (α particle), becoming thorium-234. Half-life 4.47 Gyr.', temp: 'N/A', realUse: 'Geological dating, smoke detectors (Am-241)' },
  { id: 'beta-decay', reactants: ['C-14'], eq: '¹⁴C → ¹⁴N + e⁻ + ν̄', balanced: 'β⁻ decay of C-14', products: ['N-14', 'e-'], type: 'nuclear', visual: 'spark', color: 'hsl(120,70%,50%)', enthalpy: -15000.0, desc: 'Beta-minus decay — C-14 emits an electron, transforming into N-14. Half-life 5730 yr; basis of radiocarbon dating.', temp: 'N/A', realUse: 'Radiocarbon dating archaeology' },
  { id: 'positron-decay', reactants: ['F-18'], eq: '¹⁸F → ¹⁸O + e⁺ + ν', balanced: 'β⁺ decay of F-18', products: ['O-18', 'e+'], type: 'nuclear', visual: 'glow', color: 'hsl(195,90%,60%)', enthalpy: -650000.0, desc: 'Fluorine-18 positron emission — used in PET medical imaging (FDG tracer). Half-life ~110 min.', temp: 'N/A', realUse: 'Positron-emission tomography (PET scans)' },
  { id: 'fission-u235', reactants: ['U-235', 'n'], eq: '²³⁵U + n → ¹⁴¹Ba + ⁹²Kr + 3n + γ', balanced: 'Nuclear fission of U-235', products: ['Ba-141', 'Kr-92', 'n'], type: 'nuclear', visual: 'explosion', color: 'hsl(60,100%,50%)', enthalpy: -200000000.0, desc: 'Fission of U-235 by neutron — releases ~200 MeV per event, sustains chain reactions in reactors.', safety: '⚠️ Massive energy release!', temp: 'Reactor core ~600°C', realUse: 'Nuclear power, weapons' },
  { id: 'fusion-d-t', reactants: ['H-2', 'H-3'], eq: '²H + ³H → ⁴He + n + 17.6 MeV', balanced: 'D + T fusion', products: ['He-4', 'n'], type: 'nuclear', visual: 'explosion', color: 'hsl(45,100%,55%)', enthalpy: -1700000000.0, desc: 'Deuterium–tritium fusion — releases 17.6 MeV per fusion. Powers the Sun and prospective fusion reactors.', temp: '~100 million °C plasma', realUse: 'Stars, ITER, hydrogen bombs' },

  // ─── MISCELLANEOUS COMMON REACTIONS ───
  { id: 'limewater-co2', reactants: ['Ca(OH)2', 'CO2'], eq: 'Ca(OH)₂ + CO₂ → CaCO₃ + H₂O', balanced: 'Ca(OH)₂ + CO₂ → CaCO₃ + H₂O', products: ['CaCO3', 'H2O'], type: 'precipitation', visual: 'precipitate', color: 'hsl(0,0%,95%)', enthalpy: -113.0, desc: 'Limewater clouding — CO₂ test producing white CaCO₃ precipitate.', temp: 'Room temp', realUse: 'Detecting CO₂ in breath/respiration' },
  { id: 'mortar-set', reactants: ['Ca(OH)2', 'CO2'], eq: 'Ca(OH)₂ + CO₂ → CaCO₃ + H₂O', balanced: 'Mortar carbonation', products: ['CaCO3', 'H2O'], type: 'precipitation', visual: 'crystallize', color: 'hsl(40,15%,85%)', enthalpy: -113.0, desc: 'Lime mortar slowly hardens by absorbing atmospheric CO₂, reverting to limestone.', temp: 'Room temp - years', realUse: 'Traditional masonry, restoration' },
  { id: 'gypsum-set', reactants: ['CaSO4', 'H2O'], eq: 'CaSO₄·½H₂O + 1.5H₂O → CaSO₄·2H₂O', balanced: 'Gypsum hydration', products: ['CaSO4·2H2O'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,98%)', enthalpy: -17.0, desc: 'Plaster of Paris hardens by absorbing water and crystallizing into gypsum.', temp: 'Room temp', realUse: 'Casts, drywall, sculpture' },
  { id: 'cement-hydration', reactants: ['Ca3SiO5', 'H2O'], eq: '2Ca₃SiO₅ + 7H₂O → 3CaO·2SiO₂·4H₂O + 3Ca(OH)₂', balanced: 'Cement hydration', products: ['CSH', 'Ca(OH)2'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,75%)', enthalpy: -517.0, desc: 'Portland-cement hydration — calcium silicates form interlocking C–S–H gel that gives concrete strength.', temp: 'Room temp - days', realUse: 'Construction worldwide' },
  { id: 'glass-formation', reactants: ['SiO2', 'Na2CO3'], eq: 'SiO₂ + Na₂CO₃ → Na₂SiO₃ + CO₂', balanced: 'SiO₂ + Na₂CO₃ → Na₂SiO₃ + CO₂', products: ['Na2SiO3', 'CO2'], type: 'synthesis', visual: 'melt', color: 'hsl(195,40%,60%)', enthalpy: 165.0, desc: 'Soda-lime glass formation — silica fluxed with sodium carbonate at ~1500°C.', temp: '1400-1600°C', realUse: 'Window glass, bottles, fiberglass' },
  { id: 'gunpowder', reactants: ['KNO3', 'C'], eq: '2KNO₃ + 3C + S → K₂S + N₂ + 3CO₂', balanced: 'Black-powder combustion', products: ['K2S', 'N2', 'CO2'], type: 'combustion', visual: 'fire', color: 'hsl(15,90%,55%)', enthalpy: -3000.0, desc: 'Classical gunpowder combustion — explosive deflagration producing hot gases.', safety: '⚠️ Explosive!', temp: 'Ignition ~427°C', realUse: 'Fireworks, historical firearms' },
  { id: 'hcn-synthesis', reactants: ['CH4', 'NH3'], eq: '2CH₄ + 2NH₃ + 3O₂ → 2HCN + 6H₂O', balanced: 'Andrussow process', products: ['HCN', 'H2O'], type: 'synthesis', visual: 'gas-release', color: 'hsl(45,30%,80%)', enthalpy: -474.0, desc: 'Andrussow process — industrial HCN production from methane and ammonia.', safety: '⚠️ HCN extremely toxic!', temp: '1000°C', catalyst: 'Pt-Rh', realUse: 'Nitrile and acrylic-fiber industry' },
  { id: 'urea-synth', reactants: ['NH3', 'CO2'], eq: '2NH₃ + CO₂ → CO(NH₂)₂ + H₂O', balanced: 'Bosch–Meiser urea synthesis', products: ['CON2H4', 'H2O'], type: 'synthesis', visual: 'crystallize', color: 'hsl(0,0%,90%)', enthalpy: -101.0, desc: 'Bosch–Meiser process — industrial urea synthesis for fertilizer at high pressure.', temp: '180°C, 150 atm', realUse: 'World fertilizer; melamine and resins' },
  { id: 'hydrazine-synth', reactants: ['NH3', 'NaOCl'], eq: '2NH₃ + NaOCl → N₂H₄ + NaCl + H₂O', balanced: 'Olin Raschig hydrazine', products: ['N2H4', 'NaCl', 'H2O'], type: 'synthesis', visual: 'gas-release', color: 'hsl(220,40%,60%)', enthalpy: -129.0, desc: 'Hydrazine synthesis from ammonia and bleach (Olin Raschig).', safety: '⚠️ N₂H₄ toxic, carcinogenic!', temp: 'Room temp - 60°C', realUse: 'Rocket fuel, foaming agents' },
  { id: 'aspirin', reactants: ['C7H6O3', 'C4H6O3'], eq: 'Salicylic acid + Acetic anhydride → Aspirin + Acetic acid', balanced: 'Aspirin synthesis', products: ['C9H8O4', 'CH3COOH'], type: 'esterification', visual: 'crystallize', color: 'hsl(0,0%,95%)', enthalpy: -125.0, desc: 'Aspirin (acetylsalicylic acid) — synthesized via acetylation of salicylic acid.', temp: '50-60°C', catalyst: 'H₂SO₄ trace', realUse: 'Painkiller, anti-inflammatory' },
  { id: 'soap-from-fat', reactants: ['Fat', 'KOH'], eq: 'Triglyceride + 3KOH → 3RCOOK + Glycerol', balanced: 'Potash saponification', products: ['Soap', 'C3H8O3'], type: 'hydrolysis', visual: 'dissolve', color: 'hsl(45,40%,80%)', enthalpy: -150, desc: 'Potash saponification — produces soft, water-soluble potassium soaps.', temp: '80-100°C', realUse: 'Liquid soaps, shaving creams' },
  { id: 'mentos-coke', reactants: ['CO2', 'Mentos'], eq: 'Dissolved CO₂ → CO₂ gas (nucleation)', balanced: 'Physical nucleation reaction', products: ['CO2'], type: 'decomposition', visual: 'effervescence', color: 'hsl(35,80%,55%)', enthalpy: -19.0, desc: 'Mentos in cola — surface texture provides massive nucleation, expelling dissolved CO₂ in a geyser.', temp: 'Room temp', realUse: 'Surface-area / nucleation demos' },
  { id: 'silver-mirror-glucose', reactants: ['C6H12O6', 'AgNO3'], eq: 'RCHO + 2[Ag(NH₃)₂]⁺ + 2OH⁻ → RCOO⁻ + 2Ag↓ + 4NH₃ + H₂O', balanced: 'Glucose silver mirror', products: ['Ag', 'RCOO-'], type: 'oxidation', visual: 'crystallize', color: 'hsl(0,0%,90%)', enthalpy: -210, desc: 'Silver mirror with glucose — produces a brilliant metallic silver coat on glass.', temp: '60°C bath', realUse: 'Mirror manufacturing; reducing-sugar test' },
  { id: 'gibbs-rxn', reactants: ['C6H12O6', 'O2'], eq: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', balanced: 'Cellular respiration', products: ['CO2', 'H2O'], type: 'combustion', visual: 'glow', color: 'hsl(35,80%,55%)', enthalpy: -2802.0, desc: 'Aerobic respiration — full oxidation of glucose driving ~38 ATP per molecule.', temp: '37°C', catalyst: 'Cellular enzymes', realUse: 'Powering animal life' },
  { id: 'h2-flame', reactants: ['H2', 'O2'], eq: '2H₂ + O₂ → 2H₂O', balanced: '2H₂ + O₂ → 2H₂O', products: ['H2O'], type: 'combustion', visual: 'fire', color: 'hsl(220,90%,65%)', enthalpy: -571.6, desc: 'Hydrogen burns with a nearly invisible pale-blue flame producing water vapor.', safety: '⚠️ H₂/O₂ mixtures explosive!', temp: 'Ignition ~500°C', realUse: 'Rocket engines, fuel cells' },
  { id: 'limewater-clear', reactants: ['CaCO3', 'CO2'], eq: 'CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂', balanced: 'Bicarbonate dissolution', products: ['Ca(HCO3)2'], type: 'synthesis', visual: 'dissolve', color: 'hsl(195,40%,75%)', enthalpy: 35.0, desc: 'Excess CO₂ redissolves the CaCO₃ precipitate as calcium bicarbonate (cave formation).', temp: 'Cave temps', realUse: 'Karst geology, hard water' },
  { id: 'stalactite', reactants: ['Ca(HCO3)2'], eq: 'Ca(HCO₃)₂ → CaCO₃ + H₂O + CO₂', balanced: 'Stalactite formation', products: ['CaCO3', 'H2O', 'CO2'], type: 'decomposition', visual: 'crystallize', color: 'hsl(40,15%,80%)', enthalpy: -35.0, desc: 'Reverse of cave dissolution — Ca(HCO₃)₂ precipitates back to CaCO₃, slowly building stalactites.', temp: 'Cave temps', realUse: 'Cave formation over millennia' },
  { id: 'bleach-decomp', reactants: ['NaOCl'], eq: '2NaOCl → 2NaCl + O₂', balanced: '2NaOCl → 2NaCl + O₂', products: ['NaCl', 'O2'], type: 'decomposition', visual: 'gas-release', color: 'hsl(0,0%,90%)', enthalpy: -200.0, desc: 'Household bleach slowly decomposes releasing O₂ — why bleach loses strength on shelves.', temp: 'Room temp', realUse: 'Bleach shelf-life chemistry' },
  { id: 'kclo3-decomp', reactants: ['KClO3'], eq: '2KClO₃ → 2KCl + 3O₂', balanced: '2KClO₃ → 2KCl + 3O₂', products: ['KCl', 'O2'], type: 'decomposition', visual: 'gas-release', color: 'hsl(0,0%,90%)', enthalpy: -89.4, desc: 'Potassium chlorate decomposes producing oxygen — classic O₂ generator.', temp: '~400°C', catalyst: 'MnO₂', realUse: 'Oxygen candles, classroom O₂ source' },
  { id: 'h2so4-dilution', reactants: ['H2SO4', 'H2O'], eq: 'H₂SO₄(conc) + H₂O → H₃O⁺ + HSO₄⁻ (heat)', balanced: 'Acid hydration', products: ['H3O+', 'HSO4-'], type: 'hydrolysis', visual: 'vapor', color: 'hsl(40,60%,70%)', enthalpy: -75.0, desc: 'Diluting concentrated H₂SO₄ releases tremendous heat — always add acid to water!', safety: '⚠️ Splatter risk if reversed!', temp: 'Exothermic surge', realUse: 'Lab safety teaching' },
  { id: 'naoh-dissolve', reactants: ['NaOH', 'H2O'], eq: 'NaOH(s) + H₂O → Na⁺(aq) + OH⁻(aq) (heat)', balanced: 'NaOH dissolution', products: ['Na+', 'OH-'], type: 'hydrolysis', visual: 'dissolve', color: 'hsl(220,40%,80%)', enthalpy: -44.5, desc: 'NaOH pellets dissolve exothermically, warming the solution noticeably.', temp: 'Exothermic to ~60°C', realUse: 'Drain cleaners, soap manufacturing' },
  { id: 'nh4no3-dissolve', reactants: ['NH4NO3', 'H2O'], eq: 'NH₄NO₃(s) → NH₄⁺(aq) + NO₃⁻(aq) (cooling)', balanced: 'NH₄NO₃ dissolution', products: ['NH4+', 'NO3-'], type: 'hydrolysis', visual: 'freeze', color: 'hsl(195,80%,70%)', enthalpy: 25.7, desc: 'Ammonium nitrate dissolves endothermically — used in instant cold packs (drops to ~0°C).', temp: 'Endothermic to ~0°C', realUse: 'Cold packs, fertilizers' }
];



export const generateSMILES = (formula: string): string => {
  try {
    // Simple formula to SMILES conversion for basic molecules
    const simpleMolecules: Record<string, string> = {
      'H2O': 'O',
      'H2': '[H][H]',
      'O2': 'O=O',
      'N2': 'N#N',
      'CO2': 'O=C=O',
      'CH4': 'C',
      'NH3': 'N',
      'HCl': 'Cl',
      'NaCl': '[Na+].[Cl-]',
      'Fe2O3': '[Fe+3].[Fe+3].[O-2].[O-2].[O-2]',
      'Al2O3': '[Al+3].[Al+3].[O-2].[O-2].[O-2]',
      'SiO2': 'O=[Si]=O',
      'ZnO': '[Zn+2].[O-2]',
      'BaSO4': '[Ba+2].[O-]S(=O)(=O)[O-]',
      'PbO': '[Pb+2].[O-2]',
      'HgO': '[Hg+2].[O-2]',
      'SnO2': '[Sn+4].[O-2].[O-2]',
      'TiO2': '[Ti+4].[O-2].[O-2]',
      'Cr2O3': '[Cr+3].[Cr+3].[O-2].[O-2].[O-2]',
      'MnO2': '[Mn+4].[O-2].[O-2]',
      'FeO': '[Fe+2].[O-2]',
      'CuO': '[Cu+2].[O-2]',
      'AgCl': '[Ag+].[Cl-]',
      'CaO': '[Ca+2].[O-2]',
      'MgO': '[Mg+2].[O-2]',
      'Na2O': '[Na+].[Na+].[O-2]',
      'K2O': '[K+].[K+].[O-2]',
      'Li2O': '[Li+].[Li+].[O-2]',
      'BeO': '[Be+2].[O-2]',
      'B2O3': 'O=BOB=O',
      'CO': '[C-]#[O+]',
      'NO': 'N=O',
      'SO2': 'O=S=O',
      'SO3': 'O=S(=O)=O',
      'H2S': 'S',
      'P4': 'P12=P23P45=P56P78=P89P%10%11=P%12%13P%14%15=P%16%17',
      'P4O10': 'O=P12(OP3)(OP4)OP5.O=P67(OP8)(OP9)OP%10.O=P%11%12(OP%13)(OP%14)OP%15.O=P%16%17(OP%18)(OP%19)OP%20',
      'C6H12O6': 'OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O',
      'C12H22O11': 'OC[C@H]1O[C@@H](OC2[C@H](O)[C@@H](O)[C@H](O)O2)[C@H](O)[C@@H](O)[C@@H]1O',
      'C2H4': 'C=C',
      'C2H6': 'CC',
      'C3H8': 'CCC',
      'C4H10': 'CCCC',
      'C6H6': 'c1ccccc1',
      'C2H5OH': 'CCO',
      'CH3COOH': 'CC(=O)O',
      'NH4Cl': '[NH4+].[Cl-]',
      'CaCl2': '[Ca+2].[Cl-].[Cl-]',
      'MgCl2': '[Mg+2].[Cl-].[Cl-]',
      'AlCl3': '[Al+3].[Cl-].[Cl-].[Cl-]',
      'FeCl3': '[Fe+3].[Cl-].[Cl-].[Cl-]',
      'CuCl2': '[Cu+2].[Cl-].[Cl-]',
      'ZnCl2': '[Zn+2].[Cl-].[Cl-]',
      'AgNO3': '[Ag+].[O-][N+](=O)[O-]',
      'Na2CO3': '[Na+].[Na+].[O-]C([O-])=O',
      'CaCO3': '[Ca+2].[O-]C([O-])=O',
      'MgCO3': '[Mg+2].[O-]C([O-])=O',
      'BaCO3': '[Ba+2].[O-]C([O-])=O',
      'NaHCO3': '[Na+].OC([O-])=O',
      'KHCO3': '[K+].OC([O-])=O',
      'CaSO4': '[Ca+2].[O-]S(=O)(=O)[O-]',
      'MgSO4': '[Mg+2].[O-]S(=O)(=O)[O-]',
      'CuSO4': '[Cu+2].[O-]S(=O)(=O)[O-]',
      'ZnSO4': '[Zn+2].[O-]S(=O)(=O)[O-]',
      'FeSO4': '[Fe+2].[O-]S(=O)(=O)[O-]',
      'Al2(SO4)3': '[Al+3].[Al+3].[O-]S(=O)(=O)[O-].[O-]S(=O)(=O)[O-].[O-]S(=O)(=O)[O-]',
      'Na3PO4': '[Na+].[Na+].[Na+].[O-]P([O-])([O-])=O',
      'Ca3(PO4)2': '[Ca+2].[Ca+2].[Ca+2].[O-]P([O-])([O-])=O.[O-]P([O-])([O-])=O',
      'H3PO4': 'OP(O)(O)=O',
      'H2SO4': 'OS(=O)(=O)O',
      'HNO3': 'O[N+](=O)[O-]',
      'HClO4': 'OCl(=O)(=O)=O',
      'HCN': 'C#N',
      'H2O2': 'OO',
      'NaOCl': '[Na+].[O-]Cl',
      'KMnO4': '[K+].[O-][Mn](=O)(=O)=O',
      'K2Cr2O7': '[K+].[K+].[O-][Cr](=O)(=O)O[Cr](=O)(=O)[O-]',
      'Na2S2O3': '[Na+].[Na+].[O-]S(=O)SS(=O)[O-]',
      'Cu(OH)2': '[Cu+2].[OH-].[OH-]',
      'Fe(OH)3': '[Fe+3].[OH-].[OH-].[OH-]',
      'Al(OH)3': '[Al+3].[OH-].[OH-].[OH-]',
      'Ca(OH)2': '[Ca+2].[OH-].[OH-]',
      'Mg(OH)2': '[Mg+2].[OH-].[OH-]',
      'NaOH': '[OH-].[Na+]',
      'KOH': '[OH-].[K+]',
      'LiOH': '[OH-].[Li+]',
      'Ba(OH)2': '[Ba+2].[OH-].[OH-]',
      'Sr(OH)2': '[Sr+2].[OH-].[OH-]',
      'Be(OH)2': '[Be+2].[OH-].[OH-]',
      'Zn(OH)2': '[Zn+2].[OH-].[OH-]',
      'Pb(OH)2': '[Pb+2].[OH-].[OH-]',
      'Hg(OH)2': '[Hg+2].[OH-].[OH-]',
      'AgOH': '[Ag+].[OH-]',
      'CuOH': '[Cu+].[OH-]',
      'FeOH': '[Fe+].[OH-]',
      'Ni(OH)2': '[Ni+2].[OH-].[OH-]',
      'Co(OH)2': '[Co+2].[OH-].[OH-]',
      'Mn(OH)2': '[Mn+2].[OH-].[OH-]',
      'Cr(OH)3': '[Cr+3].[OH-].[OH-].[OH-]',
      'Sn(OH)2': '[Sn+2].[OH-].[OH-]',
      'Sb(OH)3': '[Sb+3].[OH-].[OH-].[OH-]',
      'Bi(OH)3': '[Bi+3].[OH-].[OH-].[OH-]',
      'Ti(OH)4': '[Ti+4].[OH-].[OH-].[OH-].[OH-]',
      'Zr(OH)4': '[Zr+4].[OH-].[OH-].[OH-].[OH-]',
      'Hf(OH)4': '[Hf+4].[OH-].[OH-].[OH-].[OH-]',
      'V(OH)4': '[V+4].[OH-].[OH-].[OH-].[OH-]',
      'Nb(OH)5': '[Nb+5].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Ta(OH)5': '[Ta+5].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Mo(OH)6': '[Mo+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'W(OH)6': '[W+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'U(OH)6': '[U+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Np(OH)4': '[Np+4].[OH-].[OH-].[OH-].[OH-]',
      'Pu(OH)4': '[Pu+4].[OH-].[OH-].[OH-].[OH-]',
      'Am(OH)3': '[Am+3].[OH-].[OH-].[OH-]',
      'Cm(OH)3': '[Cm+3].[OH-].[OH-].[OH-]',
      'Bk(OH)3': '[Bk+3].[OH-].[OH-].[OH-]',
      'Cf(OH)3': '[Cf+3].[OH-].[OH-].[OH-]',
      'Es(OH)3': '[Es+3].[OH-].[OH-].[OH-]',
      'Fm(OH)3': '[Fm+3].[OH-].[OH-].[OH-]',
      'Md(OH)3': '[Md+3].[OH-].[OH-].[OH-]',
      'No(OH)3': '[No+3].[OH-].[OH-].[OH-]',
      'Lr(OH)3': '[Lr+3].[OH-].[OH-].[OH-]',
      'Rf(OH)4': '[Rf+4].[OH-].[OH-].[OH-].[OH-]',
      'Db(OH)5': '[Db+5].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Sg(OH)6': '[Sg+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Bh(OH)7': '[Bh+7].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Hs(OH)8': '[Hs+8].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Mt(OH)9': '[Mt+9].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Ds(OH)10': '[Ds+10].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Rg(OH)11': '[Rg+11].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Cn(OH)2': '[Cn+2].[OH-].[OH-]',
      'Nh(OH)3': '[Nh+3].[OH-].[OH-].[OH-]',
      'Fl(OH)4': '[Fl+4].[OH-].[OH-].[OH-].[OH-]',
      'Mc(OH)5': '[Mc+5].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Lv(OH)6': '[Lv+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Ts(OH)7': '[Ts+7].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Og(OH)8': '[Og+8].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
    };

    return simpleMolecules[formula] || '';
  } catch (error) {
    console.warn(`Failed to generate SMILES for ${formula}:`, error);
    return '';
  }
};

export const findReaction = (symbols: string[]): Reaction | null => {
  if (symbols.length < 2) return null;

  // Normalize symbols: handle case-insensitivity and whitespace
  const normalized = symbols.map(s => {
    const trimmed = s.trim();
    // Try to find the correct casing from elements or preAddedCompounds
    const el = elements.find(e => e.sym.toLowerCase() === trimmed.toLowerCase());
    if (el) return el.sym;
    const comp = preAddedCompounds.find(c => c.formula.toLowerCase() === trimmed.toLowerCase());
    if (comp) return comp.formula;
    return trimmed;
  });

  const sorted = [...normalized].sort();

  // 1. Try exact match with normalized casing
  const exactMatch = reactions.find(r => {
    const rs = [...r.reactants].sort();
    return rs.length === sorted.length && rs.every((s, i) => s === sorted[i]);
  });
  if (exactMatch) return exactMatch;

  // 2. Try matching with diatomic elements (H -> H2, Cl -> Cl2, etc.)
  const diatomicMap: Record<string, string> = {
    'H': 'H2', 'N': 'N2', 'O': 'O2', 'F': 'F2', 'Cl': 'Cl2', 'Br': 'Br2', 'I': 'I2'
  };
  const withDiatomics = normalized.map(s => diatomicMap[s] || s);
  const sortedDiatomics = [...withDiatomics].sort();

  const diatomicMatch = reactions.find(r => {
    const rs = [...r.reactants].sort();
    return rs.length === sortedDiatomics.length && rs.every((s, i) => s === sortedDiatomics[i]);
  });
  if (diatomicMatch) return diatomicMatch;

  // 3. Fallback for common synthesis if user picked elements
  // Water formation (H + O)
  if (sorted.includes('H') && sorted.includes('O') && sorted.length === 2) {
    return reactions.find(r => r.id === 'h2-o2' || (r.reactants.includes('H2') && r.reactants.includes('O2'))) || null;
  }

  // Salt formation (Na + Cl)
  if (sorted.includes('Na') && sorted.includes('Cl') && sorted.length === 2) {
    return reactions.find(r => r.id === 'na-cl2' || (r.reactants.includes('Na') && r.reactants.includes('Cl2'))) || null;
  }

  // 4. Check for generalized patterns (Carbonates, Acids, Bases)
  const hasAcid = normalized.some(s => ['HCl', 'H2SO4', 'HNO3', 'CH3COOH'].includes(s));
  const hasBase = normalized.some(s => s.endsWith('OH') || s === 'NH3');
  const hasCarbonate = normalized.some(s => s.endsWith('CO3'));
  const hasMetal = normalized.some(s => elements.find(e => e.sym === s && (e.cat === 'alkali' || e.cat === 'alkaline' || e.cat === 'transition')));

  // Metal + Acid
  if (hasMetal && hasAcid && normalized.length === 2) {
    return reactions.find(r =>
      normalized.every(s => r.reactants.includes(s)) ||
      (withDiatomics.every(s => r.reactants.includes(s)))
    ) || null;
  }

  // Acid + Base
  if (hasAcid && hasBase && normalized.length === 2) {
    return reactions.find(r =>
      normalized.every(s => r.reactants.includes(s))
    ) || null;
  }

  // Carbonate + Acid
  if (hasCarbonate && hasAcid && normalized.length === 2) {
    return reactions.find(r =>
      normalized.every(s => r.reactants.includes(s))
    ) || null;
  }

  // 5. Last resort: subset match (find any reaction that contains these reactants)
  const subsetMatch = reactions.find(r =>
    normalized.every(s => r.reactants.includes(s))
  );
  if (subsetMatch) return subsetMatch;

  return null;
};

export const getReactionsForElement = (symbol: string): Reaction[] => {
  const regex = new RegExp(`(^|[^a-zA-Z])${symbol}(?![a-z])`);
  return reactions.filter(r =>
    r.reactants.some(reactant => regex.test(reactant)) ||
    r.products.some(product => regex.test(product))
  );
};

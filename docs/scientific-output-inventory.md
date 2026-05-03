# Scientific Output Inventory

This document inventories user-facing scientific outputs and classifies each source as:

- `exact`: deterministic equations/conversions that should match reference values.
- `approximate`: simplified numerical models; validated with tolerance/range checks.
- `pedagogical`: educational simulations; validated for internal consistency and domain warnings.

Reference baseline for deterministic validation:

- `NIST/CODATA` constants for SI physics values,
- `CRC Handbook` for chemistry/thermodynamic reference tables where applicable,
- `IUPAC` nomenclature/definition references for chemistry quantities.

## Chemistry

- `src/data/chemCalc.ts` (`exact`, `approximate`)
  - Exact-style utilities: molarity/moles, ideal gas rearrangements, pH/pOH conversions.
  - Approximate utilities: weak acid/base approximations (`sqrt(Ka*C)` and `sqrt(Kb*C)`).
- `src/components/ChemCalculators.tsx` (`exact`)
  - User-visible results for chemistry calculators sourced from `chemCalc.ts`.
- `src/data/reactions.ts` (`pedagogical`)
  - Curated reaction and metadata tables.

## Mathematics

- `src/pages/mathematics/MathSolverPage.tsx` (`exact`)
  - Algebraic and arithmetic solvers (quadratic, linear systems, combinatorics, percentages).
- `src/pages/mathematics/MathConverterPage.tsx` (`exact`)
  - Unit and representation conversions.
- `src/pages/mathematics/MathBranchLab.tsx` + sim components (`pedagogical`)
  - Visual simulations with explanatory outputs.

## Physics

- `src/pages/physics/FormulaCalcPage.tsx` (`exact`, with domain constraints)
  - Closed-form formulas (kinematics, electromagnetism, relativistic factor).
- `src/pages/physics/UnitConverterPage.tsx` (`exact`)
  - Unit conversions.
- Other physics lab pages and visuals (`pedagogical`)
  - Concept simulations and rendered dynamics.

## Biology

- `src/pages/biology/*.tsx` (`pedagogical`, `approximate`)
  - Outputs are educational model projections (replication progress, mutation effects, trait ratios).
- `src/data/biologyData.ts`, `src/data/bioModules.ts` (`pedagogical`)
  - Curated model inputs and educational metadata.

## Earth Science

- `src/pages/earth/*.tsx` (`pedagogical`, `approximate`)
  - Outputs use toy linearized climate/weather/geophysical models for teaching.
- `src/data/earthScienceData.ts`, `src/data/earthModules.ts` (`pedagogical`)
  - Curated models, modules, and metadata.

## Shared output surfaces

- `src/components/ui/ResultDisplay.tsx`
- `src/components/ui/ExperimentTabs.tsx`
- `src/components/layout/LabShell.tsx`

These components do not compute science values directly, but they present values and require clear unit labels and model-validity notes.


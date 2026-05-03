import {
  arrheniusRate,
  boilingPointElevation,
  calculateMolarMass,
  calcMolarity,
  calcMoles,
  calcPH,
  calcPOH,
  dilution,
  electronShells,
  equilibriumConstant,
  freezingPointDepression,
  getOxidationState,
  gibbsFreeEnergy,
  hendersonHasselbalch,
  idealGas,
  nernstPotential,
  osmoticPressure,
  parseFormula,
  pKaToKa,
  pKbToKb,
  phToHConc,
  phToPOH,
  pohToOHConc,
  weakAcidPH,
  weakBasePOH,
} from "@/data/chemCalc";
import { chemCalcReferenceCases } from "@/data/__tests__/fixtures/chemCalc.reference";
import { withinTolerance } from "@/test/scientificReference";

describe("chemCalc reference validation", () => {
  it("matches fixture-based reference values within tolerance", () => {
    const evaluators: Record<string, (input: Record<string, number | string>) => number> = {
      calcPH: (input) => calcPH(input.hConc as number),
      calcPOH: (input) => calcPOH(input.ohConc as number),
      phToPOH: (input) => phToPOH(input.ph as number),
      idealGas: (input) =>
        idealGas(undefined, input.V as number, input.n as number, input.T as number).P,
      equilibriumConstant: (input) => equilibriumConstant(input.deltaG as number, input.T as number),
      nernstPotential: (input) =>
        nernstPotential(input.E0 as number, input.n as number, input.Q as number, input.T as number),
      arrheniusRate: (input) => arrheniusRate(input.A as number, input.Ea as number, input.T as number),
      osmoticPressure: (input) => osmoticPressure(input.i as number, input.M as number, input.T as number),
    };

    for (const testCase of chemCalcReferenceCases) {
      const fn = evaluators[testCase.source];
      expect(fn, `No evaluator for source ${testCase.source}`).toBeDefined();
      const actual = fn(testCase.input);
      const ok = withinTolerance(actual, testCase.expected, testCase.absTol, testCase.relTol);
      expect(ok, `${testCase.id}: expected ${testCase.expected}, got ${actual}`).toBe(true);
    }
  });

  it("parses nested formulas and hydrates", () => {
    expect(parseFormula("Ca(OH)2")).toEqual({ Ca: 1, O: 2, H: 2 });
    expect(parseFormula("CuSO4.5H2O")).toEqual({ Cu: 1, S: 1, O: 9, H: 10 });
  });

  it("computes molar mass for common compounds", () => {
    expect(calculateMolarMass("H2O")).toBeCloseTo(18.015, 3);
    expect(calculateMolarMass("CO2")).toBeCloseTo(44.009, 3);
    expect(calculateMolarMass("NaCl")).toBeCloseTo(58.44, 2);
  });

  it("keeps acid/base conversions consistent", () => {
    expect(phToHConc(3)).toBeCloseTo(1e-3, 12);
    expect(pohToOHConc(4)).toBeCloseTo(1e-4, 12);
    expect(pKaToKa(4.76)).toBeCloseTo(1.7378008287493764e-5, 15);
    expect(pKbToKb(4.75)).toBeCloseTo(1.7782794100389228e-5, 15);
    expect(weakAcidPH(1.8e-5, 0.1)).toBeCloseTo(2.872, 3);
    expect(weakBasePOH(1.8e-5, 0.2)).toBeCloseTo(2.722, 3);
  });

  it("validates core stoichiometry and colligative equations", () => {
    expect(calcMolarity(0.5, 0.25)).toBeCloseTo(2, 12);
    expect(calcMoles(18.015, 18.015)).toBeCloseTo(1, 12);
    expect(dilution(1, 0.1, 0.2)).toBeCloseTo(0.5, 12);
    expect(boilingPointElevation(2, 0.512, 1)).toBeCloseTo(1.024, 12);
    expect(freezingPointDepression(2, 1.86, 1)).toBeCloseTo(3.72, 12);
    expect(hendersonHasselbalch(4.76, 0.1, 0.1)).toBeCloseTo(4.76, 12);
  });

  it("checks thermo/electrochem sanity relations", () => {
    expect(gibbsFreeEnergy(-40000, 298.15, -100)).toBeCloseTo(-10185, 0);
    expect(getOxidationState("Mn", "KMnO4")).toBe(7);
    expect(getOxidationState("X", "KMnO4")).toBeNull();
  });

  it("documents current shell model behavior", () => {
    // The current helper is educational and uses shell capacities [2,8,18,32,...].
    expect(electronShells(20)).toEqual([2, 8, 10]);
  });
});


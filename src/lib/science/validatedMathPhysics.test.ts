import {
  combination,
  coulombForce,
  currentFromVoltage,
  deBroglieWavelength,
  escapeVelocity,
  idealGasPressurePa,
  lorentzFactor,
  solveLinear2x2,
  solveQuadraticReal,
} from "@/lib/science/validatedMathPhysics";

describe("validated math and physics utilities", () => {
  it("solves quadratic equations for real roots", () => {
    expect(solveQuadraticReal(1, -3, 2)).toEqual([2, 1]);
    expect(solveQuadraticReal(1, 2, 5)).toBeNull();
  });

  it("solves 2x2 linear systems and rejects singular matrices", () => {
    expect(solveLinear2x2(2, 1, 5, 1, -1, 1)).toEqual({ x: 2, y: 1 });
    expect(solveLinear2x2(1, 2, 3, 2, 4, 6)).toBeNull();
  });

  it("computes combinations with integer domain checks", () => {
    expect(combination(5, 2)).toBe(10);
    expect(combination(10, 3)).toBe(120);
    expect(combination(5, 8)).toBeNull();
  });

  it("applies physics domain guards for nonphysical inputs", () => {
    expect(lorentzFactor(299792458)).toBeNull();
    expect(currentFromVoltage(10, 0)).toBeNull();
    expect(coulombForce(1e-6, 1e-6, 0)).toBeNull();
    expect(deBroglieWavelength(0)).toBeNull();
    expect(escapeVelocity(5.972e24, 0)).toBeNull();
    expect(idealGasPressurePa(1, -1, 22.4)).toBeNull();
  });

  it("matches trusted reference magnitudes for physical formulas", () => {
    expect(lorentzFactor(100000000)).toBeCloseTo(1.06075, 5);
    expect(currentFromVoltage(12, 4)).toBeCloseTo(3, 12);
    expect(coulombForce(1e-6, 1e-6, 0.1)).toBeCloseTo(0.899, 3);
    expect(deBroglieWavelength(1e-24)).toBeCloseTo(6.62607015e-10, 15);
    expect(idealGasPressurePa(1, 273.15, 22.414)).toBeCloseTo(101324.8623, 3);
    expect(escapeVelocity(5.972e24, 6.371e6)).toBeCloseTo(11185.9779, 3);
  });
});


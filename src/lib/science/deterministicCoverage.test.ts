import { idealGas } from "@/data/chemCalc";
import {
  celsiusToFahrenheit,
  celsiusToKelvin,
  degToRad,
  polarToRect,
  radToDeg,
  rectToPolar,
} from "@/lib/science/deterministicConverters";
import { idealGasPressurePa } from "@/lib/science/validatedMathPhysics";

describe("deterministic converter and cross-path coverage", () => {
  it("keeps degree/radian conversions reversible", () => {
    expect(radToDeg(degToRad(180))).toBeCloseTo(180, 12);
    expect(radToDeg(Math.PI)).toBeCloseTo(180, 12);
    expect(degToRad(90)).toBeCloseTo(Math.PI / 2, 12);
  });

  it("keeps rectangular/polar conversions consistent", () => {
    const p = rectToPolar(3, 4);
    expect(p.r).toBeCloseTo(5, 12);
    const back = polarToRect(p.r, p.thetaRad, "rad");
    expect(back.x).toBeCloseTo(3, 12);
    expect(back.y).toBeCloseTo(4, 12);
  });

  it("matches temperature conversion references", () => {
    expect(celsiusToFahrenheit(0)).toBeCloseTo(32, 12);
    expect(celsiusToKelvin(0)).toBeCloseTo(273.15, 12);
    expect(celsiusToFahrenheit(100)).toBeCloseTo(212, 12);
  });

  it("matches ideal gas pressure across chemistry and physics compute paths", () => {
    const n = 1;
    const t = 273.15;
    const vL = 22.414;

    const fromChemAtm = idealGas(undefined, vL, n, t).P;
    const fromPhysicsPa = idealGasPressurePa(n, t, vL);

    expect(fromPhysicsPa).not.toBeNull();
    const atmToPa = 101325;
    expect((fromChemAtm * atmToPa) / (fromPhysicsPa as number)).toBeCloseTo(1, 6);
  });
});


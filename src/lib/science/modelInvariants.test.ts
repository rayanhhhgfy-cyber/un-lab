import {
  dominantOffspringCount,
  estimatedSeaLevelRise,
  greenhouseSurfaceTemp,
  mendelianCross,
  stormRainChance,
  stormWindSpeed,
} from "@/lib/science/modelInvariants";

describe("biology and earth model invariants", () => {
  it("keeps storm metrics bounded and monotonic in model space", () => {
    expect(stormRainChance(40)).toBe(0);
    expect(stormRainChance(60)).toBe(0);
    expect(stormRainChance(80)).toBeCloseTo(50, 12);
    expect(stormWindSpeed(1013, 20)).toBeCloseTo(10, 12);
    expect(stormWindSpeed(960, 20)).toBeGreaterThan(stormWindSpeed(1000, 20));
  });

  it("keeps greenhouse derived values internally consistent", () => {
    const tempBaseline = greenhouseSurfaceTemp(280, 30);
    const tempHigherCo2 = greenhouseSurfaceTemp(600, 30);
    const tempHigherAlbedo = greenhouseSurfaceTemp(600, 40);
    expect(tempHigherCo2).toBeGreaterThan(tempBaseline);
    expect(tempHigherAlbedo).toBeLessThan(tempHigherCo2);
    expect(estimatedSeaLevelRise(10)).toBe(0);
    expect(estimatedSeaLevelRise(16)).toBeCloseTo(1.4, 12);
  });

  it("preserves Mendelian cross combinatorics", () => {
    const aaByAa = mendelianCross("aa", "Aa");
    expect(aaByAa).toHaveLength(4);
    expect(dominantOffspringCount(aaByAa)).toBe(2);

    const aaByAa2 = mendelianCross("Aa", "Aa");
    expect(dominantOffspringCount(aaByAa2)).toBe(3);
  });
});


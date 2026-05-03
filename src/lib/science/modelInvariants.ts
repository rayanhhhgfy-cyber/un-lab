export const stormWindSpeed = (pressureHpa: number, tempC: number): number =>
  Math.abs(1013 - pressureHpa) * 2 + tempC / 2;

export const stormRainChance = (humidityPercent: number): number =>
  humidityPercent > 60 ? (humidityPercent - 60) * 2.5 : 0;

export const greenhouseSurfaceTemp = (co2Ppm: number, albedoPercent: number): number => {
  const solarConstant = 1361;
  const absorbed = (solarConstant * (1 - albedoPercent / 100)) / 4;
  const sigma = 5.67e-8;
  const greenhouseFactor = 1 + ((co2Ppm - 280) / 1000) * 0.5;
  return Math.pow((absorbed * greenhouseFactor) / sigma, 0.25) - 273.15;
};

export const estimatedSeaLevelRise = (surfaceTempC: number): number =>
  Math.max(0, (surfaceTempC - 14) * 0.7);

export const mendelianCross = (parentA: "AA" | "Aa" | "aa", parentB: "AA" | "Aa" | "aa"): string[] => {
  const a1 = parentA[0];
  const a2 = parentA[1];
  const b1 = parentB[0];
  const b2 = parentB[1];
  return [`${a1}${b1}`, `${a1}${b2}`, `${a2}${b1}`, `${a2}${b2}`];
};

export const dominantOffspringCount = (offspring: string[]): number =>
  offspring.filter((genotype) => genotype.includes("A")).length;


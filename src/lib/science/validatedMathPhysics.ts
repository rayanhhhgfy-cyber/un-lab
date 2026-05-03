import { SCIENCE_CONSTANTS } from "@/lib/science/constants";

export const solveQuadraticReal = (a: number, b: number, c: number): [number, number] | null => {
  if (a === 0) return null;
  const d = b * b - 4 * a * c;
  if (d < 0) return null;
  const root = Math.sqrt(d);
  return [(-b + root) / (2 * a), (-b - root) / (2 * a)];
};

export const solveLinear2x2 = (
  a11: number,
  a12: number,
  b1: number,
  a21: number,
  a22: number,
  b2: number,
): { x: number; y: number } | null => {
  const det = a11 * a22 - a12 * a21;
  if (det === 0) return null;
  return {
    x: (b1 * a22 - a12 * b2) / det,
    y: (a11 * b2 - b1 * a21) / det,
  };
};

export const combination = (n: number, k: number): number | null => {
  if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0 || k > n) return null;
  let result = 1;
  const kk = Math.min(k, n - k);
  for (let i = 1; i <= kk; i += 1) {
    result = (result * (n - kk + i)) / i;
  }
  return result;
};

export const lorentzFactor = (velocity: number): number | null => {
  if (!Number.isFinite(velocity) || velocity < 0 || velocity >= SCIENCE_CONSTANTS.SPEED_OF_LIGHT_M_PER_S) return null;
  return 1 / Math.sqrt(1 - (velocity * velocity) / (SCIENCE_CONSTANTS.SPEED_OF_LIGHT_M_PER_S * SCIENCE_CONSTANTS.SPEED_OF_LIGHT_M_PER_S));
};

export const currentFromVoltage = (voltage: number, resistance: number): number | null => {
  if (!Number.isFinite(resistance) || resistance === 0) return null;
  return voltage / resistance;
};

export const coulombForce = (q1: number, q2: number, distance: number): number | null => {
  if (!Number.isFinite(distance) || distance <= 0) return null;
  return (SCIENCE_CONSTANTS.COULOMB_CONSTANT_N_M2_PER_C2 * q1 * q2) / (distance * distance);
};

export const deBroglieWavelength = (momentum: number): number | null => {
  if (!Number.isFinite(momentum) || momentum <= 0) return null;
  return SCIENCE_CONSTANTS.PLANCK_J_S / momentum;
};

export const idealGasPressurePa = (moles: number, temperatureK: number, volumeL: number): number | null => {
  if (moles < 0 || temperatureK <= 0 || volumeL <= 0) return null;
  return (moles * SCIENCE_CONSTANTS.GAS_CONSTANT_J_PER_MOL_K * temperatureK) / (volumeL * 0.001);
};

export const escapeVelocity = (massKg: number, radiusM: number): number | null => {
  if (massKg < 0 || radiusM <= 0) return null;
  return Math.sqrt((2 * SCIENCE_CONSTANTS.GRAVITATIONAL_CONSTANT_M3_PER_KG_S2 * massKg) / radiusM);
};


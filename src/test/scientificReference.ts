export interface ScientificReferenceCase {
  id: string;
  source: string;
  input: Record<string, number | string>;
  expected: number;
  absTol?: number;
  relTol?: number;
  units?: string;
  citation?: string;
  referenceId?: string;
  referenceUrl?: string;
}

export const withinTolerance = (
  actual: number,
  expected: number,
  absTol = 1e-9,
  relTol = 1e-9,
): boolean => {
  if (!Number.isFinite(actual) || !Number.isFinite(expected)) return false;
  const absErr = Math.abs(actual - expected);
  if (absErr <= absTol) return true;
  const denom = Math.max(Math.abs(expected), 1e-12);
  const relErr = absErr / denom;
  return relErr <= relTol;
};


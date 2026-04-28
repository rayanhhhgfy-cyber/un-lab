import { useEffect, useState, useMemo } from "react";

export type DeviceTier = "low" | "mid" | "high";

export interface DeviceCapability {
  tier: DeviceTier;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  prefersReducedMotion: boolean;
  hardwareConcurrency: number;
  deviceMemoryGB: number;
  saveData: boolean;
  /** Recommended capped device pixel ratio for <Canvas> */
  dpr: [number, number];
  /** Multiplier (0..1) to scale particle counts by device tier */
  particleScale: number;
}

/** Compute device capability from current environment (called once per resize). */
function compute(): DeviceCapability {
  const win = typeof window !== "undefined" ? window : undefined;
  const nav = typeof navigator !== "undefined" ? navigator : undefined;

  const width = win?.innerWidth ?? 1200;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  const prefersReducedMotion =
    !!win?.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const cores = nav?.hardwareConcurrency ?? 4;
  // navigator.deviceMemory is a Chrome-only Number in GB
  const memory =
    typeof (nav as unknown as { deviceMemory?: number })?.deviceMemory ===
    "number"
      ? ((nav as unknown as { deviceMemory: number }).deviceMemory as number)
      : 4;

  // Network Information API (Chrome/Edge)
  const conn = (nav as unknown as { connection?: { saveData?: boolean } })
    ?.connection;
  const saveData = !!conn?.saveData;

  let tier: DeviceTier = "high";
  if (
    prefersReducedMotion ||
    saveData ||
    cores <= 2 ||
    memory <= 2 ||
    (isMobile && cores <= 4)
  ) {
    tier = "low";
  } else if (cores <= 4 || memory <= 4 || isMobile) {
    tier = "mid";
  }

  const dpr: [number, number] =
    tier === "low" ? [1, 1] : tier === "mid" ? [1, 1.5] : [1, 2];

  const particleScale =
    tier === "low" ? 0.35 : tier === "mid" ? 0.65 : 1;

  return {
    tier,
    isMobile,
    isTablet,
    isDesktop,
    prefersReducedMotion,
    hardwareConcurrency: cores,
    deviceMemoryGB: memory,
    saveData,
    dpr,
    particleScale,
  };
}

const DEFAULT: DeviceCapability = {
  tier: "high",
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  prefersReducedMotion: false,
  hardwareConcurrency: 8,
  deviceMemoryGB: 8,
  saveData: false,
  dpr: [1, 2],
  particleScale: 1,
};

export function useDeviceCapability(): DeviceCapability {
  const [cap, setCap] = useState<DeviceCapability>(() => {
    if (typeof window === "undefined") return DEFAULT;
    return compute();
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setCap(compute()));
    };

    window.addEventListener("resize", update, { passive: true });
    const motionMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionMQ.addEventListener?.("change", update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
      motionMQ.removeEventListener?.("change", update);
    };
  }, []);

  return cap;
}

/** Scale a base particle count by current device tier (clamped to a minimum). */
export function useScaledCount(base: number, min = 4): number {
  const { particleScale } = useDeviceCapability();
  return useMemo(
    () => Math.max(min, Math.round(base * particleScale)),
    [base, min, particleScale]
  );
}

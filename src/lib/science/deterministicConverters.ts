export const degToRad = (deg: number): number => (deg * Math.PI) / 180;
export const radToDeg = (rad: number): number => (rad * 180) / Math.PI;

export const rectToPolar = (x: number, y: number): { r: number; thetaRad: number; thetaDeg: number } => {
  const r = Math.hypot(x, y);
  const thetaRad = Math.atan2(y, x);
  return { r, thetaRad, thetaDeg: radToDeg(thetaRad) };
};

export const polarToRect = (
  radius: number,
  theta: number,
  mode: "deg" | "rad",
): { x: number; y: number } => {
  const angle = mode === "deg" ? degToRad(theta) : theta;
  return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
};

export const celsiusToFahrenheit = (celsius: number): number => (celsius * 9) / 5 + 32;
export const celsiusToKelvin = (celsius: number): number => celsius + 273.15;


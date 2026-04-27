import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

const COLORS = [
  { name: "Red", hex: "#ff0000", wavelength: 700, n: 1.512 },
  { name: "Orange", hex: "#ff8800", wavelength: 620, n: 1.514 },
  { name: "Yellow", hex: "#ffff00", wavelength: 580, n: 1.517 },
  { name: "Green", hex: "#00ff00", wavelength: 530, n: 1.519 },
  { name: "Blue", hex: "#0066ff", wavelength: 470, n: 1.524 },
  { name: "Indigo", hex: "#4400cc", wavelength: 440, n: 1.528 },
  { name: "Violet", hex: "#8800ff", wavelength: 400, n: 1.532 },
];

export default function PrismSim() {
  const { t } = useTranslation();
  const [prismAngle, setPrismAngle] = useState(60);
  const [incidentAngle, setIncidentAngle] = useState(45);
  const [baseN, setBaseN] = useState(1.52);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const r = canvas.parentElement!.getBoundingClientRect();
      canvas.width = r.width; canvas.height = r.height;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const calcDev = useCallback((n: number) => {
    const A = prismAngle * Math.PI / 180;
    const i1 = incidentAngle * Math.PI / 180;
    const sinR1 = Math.sin(i1) / n;
    if (Math.abs(sinR1) > 1) return NaN;
    const r1 = Math.asin(sinR1);
    const r2 = A - r1;
    const sinI2 = n * Math.sin(r2);
    if (Math.abs(sinI2) > 1) return NaN;
    const i2 = Math.asin(sinI2);
    return (i1 + i2 - A) * 180 / Math.PI;
  }, [prismAngle, incidentAngle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const draw = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.5, cy = h * 0.55;
      const sz = Math.min(w, h) * 0.28;
      const A = prismAngle * Math.PI / 180;
      // Prism vertices
      const p1 = { x: cx, y: cy - sz * 0.85 };
      const p2 = { x: cx - sz * Math.sin(A / 2), y: cy + sz * 0.35 };
      const p3 = { x: cx + sz * Math.sin(A / 2), y: cy + sz * 0.35 };
      // Draw prism
      ctx.fillStyle = "rgba(100,200,255,0.08)";
      ctx.strokeStyle = "#00d4aa"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y); ctx.closePath(); ctx.fill(); ctx.stroke();
      // Entry point on left face
      const et = 0.5;
      const ex = p1.x + (p2.x - p1.x) * et;
      const ey = p1.y + (p2.y - p1.y) * et;
      const rayL = sz * 1.6;
      const fAng = Math.atan2(p2.y - p1.y, p2.x - p1.x);
      const nAng = fAng - Math.PI / 2;
      const iDir = nAng + Math.PI + incidentAngle * Math.PI / 180;
      // White incident ray
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 3;
      ctx.shadowColor = "#fff"; ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(ex - Math.cos(iDir) * rayL, ey - Math.sin(iDir) * rayL);
      ctx.lineTo(ex, ey); ctx.stroke(); ctx.shadowBlur = 0;
      // Exit face
      const efAng = Math.atan2(p3.y - p1.y, p3.x - p1.x);
      COLORS.forEach((c, i) => {
        const nS = baseN / 1.52;
        const n = c.n * nS;
        const dev = calcDev(n);
        if (isNaN(dev)) return;
        const eNorm = efAng + Math.PI / 2;
        const spread = (i - 3) * 0.04;
        const eDir = eNorm + spread + dev * Math.PI / 180 * 0.12;
        const ox = (i - 3) * 3, oy = (i - 3) * 2;
        // Internal ray
        ctx.strokeStyle = c.hex + "44"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(ex, ey);
        const midX = p1.x + (p3.x - p1.x) * 0.5 + ox;
        const midY = p1.y + (p3.y - p1.y) * 0.5 + oy;
        ctx.lineTo(midX, midY); ctx.stroke();
        // Exit ray
        ctx.strokeStyle = c.hex; ctx.lineWidth = 2.5;
        ctx.shadowColor = c.hex; ctx.shadowBlur = 5;
        ctx.beginPath(); ctx.moveTo(midX, midY);
        ctx.lineTo(midX + Math.cos(eDir) * rayL, midY + Math.sin(eDir) * rayL);
        ctx.stroke(); ctx.shadowBlur = 0;
        ctx.fillStyle = c.hex; ctx.font = "bold 10px monospace";
        ctx.fillText(c.name, midX + Math.cos(eDir) * rayL * 0.85 + 4,
          midY + Math.sin(eDir) * rayL * 0.85);
      });
      ctx.fillStyle = "#fff8"; ctx.font = "bold 12px monospace";
      ctx.fillText(`A=${prismAngle}°`, p1.x - 16, p1.y - 8);
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [prismAngle, incidentAngle, baseN, calcDev]);

  const avgDev = calcDev(baseN);
  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-3 sm:gap-4 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-3 sm:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 space-y-3">
          <h3 className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">{t('physics.common.controls')}</h3>
          <ParamSlider label="Prism Angle / زاوية المنشور" value={prismAngle} min={30} max={90} step={1} unit="°" onChange={setPrismAngle} />
          <ParamSlider label="Incident Angle / زاوية السقوط" value={incidentAngle} min={15} max={80} step={1} unit="°" onChange={setIncidentAngle} />
          <ParamSlider label="Refractive Index / معامل الانكسار" value={baseN} min={1.3} max={2.0} step={0.01} unit="" onChange={setBaseN} />
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4">
          <h3 className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider mb-3">{t('physics.common.results')}</h3>
          <ResultDisplay items={[
            { label: "Deviation / الانحراف", value: isNaN(avgDev) ? "TIR" : avgDev.toFixed(1), unit: "°" },
            { label: "Dispersion / التشتت", value: ((COLORS[6].n - COLORS[0].n) * (baseN / 1.52)).toFixed(4), unit: "" },
          ]} />
        </div>
      </div>
    </div>
  );
}

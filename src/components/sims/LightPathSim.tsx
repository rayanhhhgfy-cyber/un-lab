import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function LightPathSim() {
  const { t } = useTranslation();
  const [angle, setAngle] = useState(30);
  const [n1, setN1] = useState(1.0);
  const [n2, setN2] = useState(1.5);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const criticalAngle = n1 < n2 ? 90 : Math.asin(n2 / n1) * 180 / Math.PI;
  const isTIR = n1 > n2 && angle > criticalAngle;
  const sinR = (n1 * Math.sin(angle * Math.PI / 180)) / n2;
  const refAngle = Math.abs(sinR) <= 1 ? Math.asin(sinR) * 180 / Math.PI : NaN;

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const draw = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const bY = h * 0.5;
      // Media backgrounds
      ctx.fillStyle = `rgba(100,180,255,${0.03 + (n1 - 1) * 0.05})`;
      ctx.fillRect(0, 0, w, bY);
      ctx.fillStyle = `rgba(100,180,255,${0.03 + (n2 - 1) * 0.05})`;
      ctx.fillRect(0, bY, w, h - bY);
      // Boundary line
      ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, bY); ctx.lineTo(w, bY); ctx.stroke();
      // Labels
      ctx.fillStyle = "#88ccff"; ctx.font = "bold 13px monospace";
      ctx.fillText(`n₁ = ${n1.toFixed(2)}`, 12, 25);
      ctx.fillText(`n₂ = ${n2.toFixed(2)}`, 12, bY + 25);
      // Normal line
      const cx = w * 0.5;
      ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#ffffff66"; ctx.font = "11px monospace";
      ctx.fillText("Normal", cx + 4, 16);
      // Incident ray
      const rayLen = Math.min(w, h) * 0.4;
      const iRad = angle * Math.PI / 180;
      const ix = cx - rayLen * Math.sin(iRad);
      const iy = bY - rayLen * Math.cos(iRad);
      ctx.strokeStyle = "#00d4aa"; ctx.lineWidth = 2.5;
      ctx.shadowColor = "#00d4aa"; ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.moveTo(ix, iy); ctx.lineTo(cx, bY); ctx.stroke();
      ctx.shadowBlur = 0;
      // Arrow on incident
      const aDx = cx - ix, aDy = bY - iy;
      const aLen = Math.sqrt(aDx * aDx + aDy * aDy);
      const aMx = ix + aDx * 0.6, aMy = iy + aDy * 0.6;
      const aAng = Math.atan2(aDy, aDx);
      ctx.fillStyle = "#00d4aa";
      ctx.beginPath();
      ctx.moveTo(aMx + 8 * Math.cos(aAng), aMy + 8 * Math.sin(aAng));
      ctx.lineTo(aMx + 6 * Math.cos(aAng + 2.5), aMy + 6 * Math.sin(aAng + 2.5));
      ctx.lineTo(aMx + 6 * Math.cos(aAng - 2.5), aMy + 6 * Math.sin(aAng - 2.5));
      ctx.closePath(); ctx.fill();
      // Angle arc (incident)
      ctx.strokeStyle = "#00d4aa88"; ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, bY, 40, -Math.PI / 2, -Math.PI / 2 + iRad, false);
      ctx.stroke();
      ctx.fillStyle = "#00d4aa"; ctx.font = "bold 11px monospace";
      ctx.fillText(`θ₁=${angle}°`, cx + 45, bY - 15);
      // Reflected ray
      const rx = cx + rayLen * Math.sin(iRad);
      const ry = bY - rayLen * Math.cos(iRad);
      ctx.strokeStyle = "#ff664488"; ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(cx, bY); ctx.lineTo(rx, ry); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#ff6644"; ctx.font = "10px monospace";
      ctx.fillText("Reflected", rx - 30, ry - 8);
      // Refracted ray
      if (!isTIR && !isNaN(refAngle)) {
        const rRad = refAngle * Math.PI / 180;
        const rfx = cx + rayLen * Math.sin(rRad);
        const rfy = bY + rayLen * Math.cos(rRad);
        ctx.strokeStyle = "#ffcc00"; ctx.lineWidth = 2.5;
        ctx.shadowColor = "#ffcc00"; ctx.shadowBlur = 6;
        ctx.beginPath(); ctx.moveTo(cx, bY); ctx.lineTo(rfx, rfy); ctx.stroke();
        ctx.shadowBlur = 0;
        // Angle arc (refracted)
        ctx.strokeStyle = "#ffcc0088"; ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, bY, 40, Math.PI / 2, Math.PI / 2 - rRad, true);
        ctx.stroke();
        ctx.fillStyle = "#ffcc00"; ctx.font = "bold 11px monospace";
        ctx.fillText(`θ₂=${refAngle.toFixed(1)}°`, cx + 45, bY + 30);
      } else {
        // TIR label
        ctx.fillStyle = "#ff4444"; ctx.font = "bold 14px monospace";
        ctx.fillText("Total Internal Reflection!", cx - 90, bY + 40);
        // Full reflected ray
        ctx.strokeStyle = "#ff6644"; ctx.lineWidth = 2.5;
        ctx.shadowColor = "#ff6644"; ctx.shadowBlur = 6;
        ctx.beginPath(); ctx.moveTo(cx, bY); ctx.lineTo(rx, ry); ctx.stroke();
        ctx.shadowBlur = 0;
      }
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [angle, n1, n2, isTIR, refAngle, criticalAngle]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-3 sm:gap-4 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-3 sm:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 space-y-3">
          <h3 className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">{t('physics.common.controls')}</h3>
          <ParamSlider label="Incident Angle / زاوية السقوط" value={angle} min={0} max={89} step={1} unit="°" onChange={setAngle} />
          <ParamSlider label="n₁ (Medium 1)" value={n1} min={1.0} max={2.5} step={0.01} unit="" onChange={setN1} />
          <ParamSlider label="n₂ (Medium 2)" value={n2} min={1.0} max={2.5} step={0.01} unit="" onChange={setN2} />
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4">
          <h3 className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider mb-3">{t('physics.common.results')}</h3>
          <ResultDisplay items={[
            { label: "Refracted Angle / زاوية الانكسار", value: isTIR ? "TIR" : (isNaN(refAngle) ? "N/A" : refAngle.toFixed(1)), unit: "°" },
            { label: "Critical Angle / الزاوية الحرجة", value: n1 <= n2 ? "N/A" : criticalAngle.toFixed(1), unit: "°" },
            { label: "Snell: n₁sin(θ₁)", value: (n1 * Math.sin(angle * Math.PI / 180)).toFixed(4), unit: "" },
          ]} />
        </div>
      </div>
    </div>
  );
}

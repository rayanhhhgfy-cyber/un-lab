import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function OpticsRefractionSim() {
  const { t } = useTranslation();
  const [n1, setN1] = useState(1.0);
  const [n2, setN2] = useState(1.5);
  const [angle, setAngle] = useState(45);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    const R = Math.max(w, h); // Ray length

    ctx.clearRect(0, 0, w, h);
    
    const cx = w / 2;
    const cy = h / 2;

    // Draw Backgrounds (Medium 1 and Medium 2)
    ctx.fillStyle = `rgba(15, 23, 42, 0.8)`; // Base dark
    ctx.fillRect(0, 0, w, cy);
    
    // Medium 1 visual
    ctx.fillStyle = n1 > 1.2 ? `rgba(56, 189, 248, ${(n1 - 1) * 0.15})` : "transparent";
    ctx.fillRect(0, 0, w, cy);
    
    // Medium 2 visual (Water/Glass)
    const m2grad = ctx.createLinearGradient(0, cy, 0, h);
    m2grad.addColorStop(0, `rgba(56, 189, 248, ${(n2 - 1) * 0.3})`);
    m2grad.addColorStop(1, `rgba(2, 132, 199, ${(n2 - 1) * 0.5})`);
    ctx.fillStyle = m2grad;
    ctx.fillRect(0, cy, w, h - cy);

    // High-tech grid
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
    for (let i = 0; i < h; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke(); }

    // Interface line
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(56, 189, 248, 0.8)";
    ctx.shadowColor = "#38bdf8";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(w, cy);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Normal line
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, h);
    ctx.stroke();
    ctx.setLineDash([]);

    // Protractors arc
    const arcRadius = Math.min(w, h) * 0.35;
    ctx.beginPath();
    ctx.arc(cx, cy, arcRadius, Math.PI, Math.PI*2);
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.stroke();
    
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "10px monospace";
    ctx.textAlign = "center";
    for(let i=0; i<=90; i+=15) {
      const th1 = (i - 90) * Math.PI / 180;
      ctx.fillText(`${i}°`, cx + (arcRadius+15) * Math.cos(th1), cy + (arcRadius+15) * Math.sin(th1) + 4);
      const th2 = (-i - 90) * Math.PI / 180;
      if (i !== 0) ctx.fillText(`${i}°`, cx + (arcRadius+15) * Math.cos(th2), cy + (arcRadius+15) * Math.sin(th2) + 4);
    }

    const rad = (angle * Math.PI) / 180;
    const startX = cx - arcRadius * Math.sin(rad);
    const startY = cy - arcRadius * Math.cos(rad);

    // Laser ray
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#eab308";
    ctx.shadowColor = "#eab308";
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(cx - R * Math.sin(rad), cy - R * Math.cos(rad));
    ctx.lineTo(cx, cy);
    ctx.stroke();

    // Laser Emitter Box
    ctx.save();
    ctx.translate(startX, startY);
    ctx.rotate(-rad + Math.PI/2);
    ctx.fillStyle = "#1e293b";
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-15, -15, 30, 30, 4);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#eab308";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#eab308";
    ctx.fillRect(15, -4, 6, 8);
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI*2); ctx.fill();
    ctx.restore();

    ctx.shadowBlur = 15;
    const sinTheta2 = (n1 / n2) * Math.sin(rad);
    
    if (Math.abs(sinTheta2) <= 1) {
      const rad2 = Math.asin(sinTheta2);
      const endX = cx + R * Math.sin(rad2);
      const endY = cy + R * Math.cos(rad2);
      
      // Refracted ray
      ctx.strokeStyle = "#38bdf8";
      ctx.shadowColor = "#38bdf8";
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      // Weak Reflected ray
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(234, 179, 8, 0.4)";
      ctx.shadowBlur = 5;
      const refX = cx + R * Math.sin(rad);
      const refY = cy - R * Math.cos(rad);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(refX, refY);
      ctx.stroke();
    } else {
      // Total Internal Reflection
      const endX = cx + R * Math.sin(rad);
      const endY = cy - R * Math.cos(rad);
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#f87171";
      ctx.shadowColor = "#f87171";
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      // Show TIR Warning
      ctx.fillStyle = "rgba(248, 113, 113, 0.1)";
      ctx.fillRect(0, cy, w, h - cy);
    }
    ctx.shadowBlur = 0;

  }, [angle, n1, n2]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      draw();
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [draw]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handlePointerDown = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    
    // Check if clicked in top half
    if (y < cy + 20) {
      setIsDragging(true);
      updateAngleFromPoint(x, y, cx, cy);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    
    updateAngleFromPoint(x, y, cx, cy);
  };

  const updateAngleFromPoint = (x: number, y: number, cx: number, cy: number) => {
    if (y > cy - 10) y = cy - 10; // Prevent dragging below surface
    let newAngle = Math.atan2(cx - x, cy - y) * (180 / Math.PI);
    newAngle = Math.max(0, Math.min(89, newAngle));
    setAngle(Math.round(newAngle));
  };

  const handlePointerUp = () => setIsDragging(false);

  const sinTheta2 = (n1 / n2) * Math.sin((angle * Math.PI) / 180);
  const isTIR = Math.abs(sinTheta2) > 1;
  const angle2 = isTIR ? angle : (Math.asin(sinTheta2) * 180) / Math.PI;
  const criticalAngle = n1 > n2 ? (Math.asin(n2 / n1) * 180 / Math.PI).toFixed(1) : "---";

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-4 md:gap-5 w-full">
      <div className="glass rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-video relative w-full border border-sky-500/20 bg-[#0f172a]">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full touch-none cursor-move" 
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
        <div className="absolute top-4 left-4 pointer-events-none">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 backdrop-blur-md text-xs font-mono text-slate-300">
            {t('physics.optics.drag_refraction', 'اسحب جهاز الليزر لتغيير زاوية السقوط')}
          </div>
        </div>
      </div>
      <div className="space-y-4 w-full">
        <div className="glass rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider">{t('physics.optics.refraction_controls', 'معامل الانكسار')}</h3>
          <ParamSlider label={t('physics.optics.n1', 'الوسط الأول (n1)')} value={n1} min={1} max={3} step={0.01} unit="" onChange={setN1} />
          <ParamSlider label={t('physics.optics.n2', 'الوسط الثاني (n2)')} value={n2} min={1} max={3} step={0.01} unit="" onChange={setN2} />
          <ParamSlider label={t('physics.optics.incident_angle', 'زاوية السقوط')} value={angle} min={0} max={89} step={1} unit="°" onChange={setAngle} />
        </div>
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-3">{t('physics.optics.results', 'النتائج')}</h3>
          <ResultDisplay items={[
            { label: t('physics.optics.refraction_angle', 'زاوية الانكسار'), value: angle2.toFixed(1), unit: "°" },
            { label: t('physics.optics.state', 'الحالة'), value: isTIR ? t('physics.optics.tir', 'انعكاس كلي (TIR)') : t('physics.optics.refracted', 'انكسار'), unit: "" },
            { label: t('physics.optics.critical_angle', 'الزاوية الحرجة'), value: criticalAngle, unit: "°" },
          ]} />
        </div>
      </div>
    </div>
  );
}

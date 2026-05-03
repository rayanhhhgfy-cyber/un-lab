import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function OpticsFiberSim() {
  const { t } = useTranslation();
  const [angle, setAngle] = useState(15);
  const [coreIndex, setCoreIndex] = useState(1.45);
  const [cladIndex, setCladIndex] = useState(1.40);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    
    // Background Grid
    ctx.strokeStyle = "rgba(239, 68, 68, 0.03)";
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
    for (let i = 0; i < h; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke(); }

    const cy = h / 2;
    const fiberHeight = 60;
    const startX = 100;

    // Cladding Top and Bottom
    ctx.fillStyle = "rgba(148, 163, 184, 0.1)";
    ctx.fillRect(startX, cy - fiberHeight - 20, w, 20);
    ctx.fillRect(startX, cy + fiberHeight, w, 20);
    
    // Cladding Borders
    ctx.strokeStyle = "rgba(148, 163, 184, 0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(startX, cy - fiberHeight - 20); ctx.lineTo(w, cy - fiberHeight - 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(startX, cy + fiberHeight + 20); ctx.lineTo(w, cy + fiberHeight + 20); ctx.stroke();

    // Core
    const coreGrad = ctx.createLinearGradient(0, cy - fiberHeight, 0, cy + fiberHeight);
    coreGrad.addColorStop(0, `rgba(56, 189, 248, ${(coreIndex - 1) * 0.4})`);
    coreGrad.addColorStop(0.5, `rgba(56, 189, 248, ${(coreIndex - 1) * 0.1})`);
    coreGrad.addColorStop(1, `rgba(56, 189, 248, ${(coreIndex - 1) * 0.4})`);
    ctx.fillStyle = coreGrad;
    ctx.fillRect(startX, cy - fiberHeight, w, fiberHeight * 2);
    
    // Core borders (Core-Clad Interface)
    ctx.strokeStyle = "rgba(56, 189, 248, 0.8)";
    ctx.shadowColor = "#38bdf8";
    ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.moveTo(startX, cy - fiberHeight); ctx.lineTo(w, cy - fiberHeight); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(startX, cy + fiberHeight); ctx.lineTo(w, cy + fiberHeight); ctx.stroke();
    ctx.shadowBlur = 0;

    // Optical Axis
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(w, cy);
    ctx.stroke();
    ctx.setLineDash([]);

    // Laser Entry Face
    ctx.strokeStyle = "rgba(56, 189, 248, 0.8)";
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(startX, cy - fiberHeight); ctx.lineTo(startX, cy + fiberHeight); ctx.stroke();

    const startY = cy;
    const rad = (angle * Math.PI) / 180;
    const R = 80;
    
    // External Laser Beam
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ef4444";
    ctx.shadowColor = "#ef4444";
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(startX - R * Math.cos(rad), startY - R * Math.sin(rad));
    ctx.lineTo(startX, startY);
    ctx.stroke();

    // Laser Emitter Box
    ctx.save();
    ctx.translate(startX - R * Math.cos(rad), startY - R * Math.sin(rad));
    ctx.rotate(rad);
    ctx.fillStyle = "#1e293b";
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(-20, -15, 40, 30, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#ef4444";
    ctx.shadowBlur = 10;
    ctx.fillRect(20, -5, 8, 10);
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI*2); ctx.fill();
    ctx.restore();

    // Protractor Arc for Laser
    ctx.beginPath();
    ctx.arc(startX, startY, 50, Math.PI, Math.PI * 1.5);
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1;
    ctx.stroke();

    const n0 = 1.0;
    const sinTheta1 = (n0 / coreIndex) * Math.sin(rad);
    
    if (Math.abs(sinTheta1) <= 1) {
      const theta1 = Math.asin(sinTheta1);
      
      let currX = startX;
      let currY = startY;
      const currentAngle = theta1;
      let isUpward = angle > 0;
      let bounces = 0;
      let escaped = false;

      ctx.beginPath();
      ctx.moveTo(currX, currY);

      // Ray Tracing inside fiber
      while (currX < w && bounces < 50 && !escaped) {
        const distToWall = fiberHeight;
        const dx = distToWall / Math.tan(currentAngle);
        
        const nextX = currX + dx;
        const nextY = isUpward ? cy - fiberHeight : cy + fiberHeight;
        
        ctx.lineTo(nextX, nextY);
        
        currX = nextX;
        currY = nextY;

        const internalIncidentAngle = Math.PI / 2 - currentAngle;
        const sinThetaClad = (coreIndex / cladIndex) * Math.sin(internalIncidentAngle);

        if (Math.abs(sinThetaClad) > 1) {
          // Total Internal Reflection
          isUpward = !isUpward;
          bounces++;
        } else {
          // Refraction (Escape)
          escaped = true;
          const thetaClad = Math.asin(sinThetaClad);
          const escapeAngle = Math.PI / 2 - thetaClad;
          const escDx = w * Math.cos(escapeAngle);
          const escDy = isUpward ? -w * Math.sin(escapeAngle) : w * Math.sin(escapeAngle);
          
          ctx.strokeStyle = "#f87171"; // Escaped ray loses energy
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(currX, currY);
          ctx.lineTo(currX + escDx, currY + escDy);
          ctx.strokeStyle = "rgba(248, 113, 113, 0.4)";
          ctx.lineWidth = 2;
        }
      }
      
      // Line extended automatically outside canvas bounds
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

  }, [angle, coreIndex, cladIndex]);

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

    const startX = 100;
    const cy = canvas.height / 2;

    if (x < startX + 20) {
      setIsDragging(true);
      updateAngle(x, y, startX, cy);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const startX = 100;
    const cy = canvas.height / 2;
    updateAngle(x, y, startX, cy);
  };

  const updateAngle = (x: number, y: number, startX: number, cy: number) => {
    if (x > startX - 10) x = startX - 10;
    let newAngle = Math.atan2(cy - y, startX - x) * (180 / Math.PI);
    newAngle = Math.max(-89, Math.min(89, newAngle));
    setAngle(Math.round(newAngle));
  };

  const handlePointerUp = () => setIsDragging(false);

  const criticalAngle = Math.asin(cladIndex / coreIndex) * 180 / Math.PI;
  const rad = (angle * Math.PI) / 180;
  const theta1 = Math.asin((1.0 / coreIndex) * Math.sin(Math.abs(rad)));
  const internalIncidentAngle = (Math.PI / 2 - theta1) * 180 / Math.PI;
  const isTIR = internalIncidentAngle > criticalAngle;

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-4 md:gap-5 w-full">
      <div className="glass rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-video relative w-full border border-red-500/20 bg-[#0f172a]">
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
            {t('physics.optics.drag_fiber', 'اسحب جهاز الليزر لتغيير زاوية الدخول')}
          </div>
        </div>
      </div>
      <div className="space-y-4 w-full">
        <div className="glass rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider">{t('physics.optics.fiber_controls', 'التحكم بالليفة البصرية')}</h3>
          <ParamSlider label={t('physics.optics.core_index', 'معامل انكسار اللب')} value={coreIndex} min={1.4} max={2.0} step={0.01} unit="" onChange={setCoreIndex} />
          <ParamSlider label={t('physics.optics.clad_index', 'معامل انكسار الغلاف')} value={cladIndex} min={1.0} max={1.9} step={0.01} unit="" onChange={(v) => { if (v <= coreIndex) setCladIndex(v); }} />
          <ParamSlider label={t('physics.optics.entry_angle', 'زاوية الدخول')} value={angle} min={-89} max={89} step={1} unit="°" onChange={setAngle} />
        </div>
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-3">{t('physics.optics.results', 'النتائج')}</h3>
          <ResultDisplay items={[
            { label: t('physics.optics.internal_angle', 'الزاوية الداخلية'), value: internalIncidentAngle.toFixed(1), unit: "°" },
            { label: t('physics.optics.critical_angle', 'الزاوية الحرجة'), value: isNaN(criticalAngle) ? "---" : criticalAngle.toFixed(1), unit: "°" },
            { label: t('physics.optics.state', 'الحالة'), value: isTIR ? t('physics.optics.tir_success', 'انعكاس كلي (توصيل ممتاز)') : t('physics.optics.tir_fail', 'تسرب الضوء (فقدان إشارة)'), unit: "" },
          ]} />
        </div>
      </div>
    </div>
  );
}

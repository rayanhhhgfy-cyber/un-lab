import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import ParamSlider from "@/components/ui/ParamSlider";

export default function OpticsRainbowSim() {
  const { t } = useTranslation();
  const [baseIndex, setBaseIndex] = useState(1.333);
  const [rayHeight, setRayHeight] = useState(65);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    
    // Background glow
    const bgGrad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w);
    bgGrad.addColorStop(0, "rgba(14, 165, 233, 0.05)");
    bgGrad.addColorStop(1, "transparent");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
    for (let i = 0; i < h; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke(); }

    const cx = w * 0.6;
    const cy = h / 2;
    const R = Math.min(w, h) * 0.35;

    // Draw the 3D water drop
    const dropGrad = ctx.createRadialGradient(cx - R*0.3, cy - R*0.3, R*0.1, cx, cy, R);
    dropGrad.addColorStop(0, "rgba(255, 255, 255, 0.4)");
    dropGrad.addColorStop(0.4, "rgba(56, 189, 248, 0.15)");
    dropGrad.addColorStop(1, "rgba(2, 132, 199, 0.4)");
    
    ctx.fillStyle = dropGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();
    
    // Drop outline
    ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw Sun
    const sunY = cy - (rayHeight / 100) * R;
    ctx.save();
    ctx.translate(50, sunY);
    ctx.shadowColor = "#fcd34d";
    ctx.shadowBlur = 30;
    ctx.fillStyle = "#fde047";
    ctx.beginPath(); ctx.arc(0, 0, 20, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    const yHit = sunY;
    const xHit = cx - Math.sqrt(R * R - Math.pow(cy - yHit, 2));

    // Incoming white ray
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(50, yHit);
    ctx.lineTo(xHit, yHit);
    ctx.stroke();
    ctx.shadowBlur = 0;

    const hNorm = (cy - yHit) / R; 
    const theta1 = Math.asin(hNorm);

    // Spectrum colors to simulate dispersion
    const spectrum = [
      { c: "#ef4444", dn: -0.010 }, // Red
      { c: "#f97316", dn: -0.006 }, // Orange
      { c: "#eab308", dn: -0.002 }, // Yellow
      { c: "#22c55e", dn: 0.002 },  // Green
      { c: "#3b82f6", dn: 0.008 },  // Blue
      { c: "#8b5cf6", dn: 0.014 },  // Violet
    ];

    ctx.globalCompositeOperation = "screen";

    let lastExitAngle = 0;
    
    spectrum.forEach(({ c, dn }) => {
      const n = baseIndex + dn;
      const theta2 = Math.asin(Math.sin(theta1) / n);
      
      const hitAngle1 = Math.PI + theta1; 
      const hitAngle2 = hitAngle1 + Math.PI - 2 * theta2;
      
      const xHit2 = cx + R * Math.cos(hitAngle2);
      const yHit2 = cy - R * Math.sin(hitAngle2);

      ctx.lineWidth = 3;
      ctx.strokeStyle = c;
      ctx.beginPath();
      ctx.moveTo(xHit, yHit);
      ctx.lineTo(xHit2, yHit2);
      ctx.stroke();

      const hitAngle3 = hitAngle2 + Math.PI - 2 * theta2;
      const xHit3 = cx + R * Math.cos(hitAngle3);
      const yHit3 = cy - R * Math.sin(hitAngle3);

      ctx.beginPath();
      ctx.moveTo(xHit2, yHit2);
      ctx.lineTo(xHit3, yHit3);
      ctx.stroke();

      const totalDeviation = Math.PI + 2 * theta1 - 4 * theta2;
      const exitAngle = Math.PI * 2 - totalDeviation;
      lastExitAngle = exitAngle;
      
      const rayLen = w;
      const xExitEnd = xHit3 + rayLen * Math.cos(exitAngle);
      const yExitEnd = yHit3 - rayLen * Math.sin(exitAngle);

      // Thicker exiting rays to simulate spreading
      ctx.lineWidth = 4;
      ctx.shadowColor = c;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(xHit3, yHit3);
      ctx.lineTo(xExitEnd, yExitEnd);
      ctx.stroke();
      ctx.shadowBlur = 0;
    });

    ctx.globalCompositeOperation = "source-over";

    // Show the angle of the primary rainbow ray relative to incoming light
    // Rainbow angle is approximately 42 degrees (or 180 - 42 = 138 deviation)
    // exitAngle is the angle relative to +x axis.
    // Incoming is +x (0 degrees).
    // Angle between incoming and outgoing is exactly the exitAngle.
    // Let's display it near the exit point
    const deg = (lastExitAngle * 180 / Math.PI).toFixed(1);
    ctx.fillStyle = "rgba(15, 23, 42, 0.7)";
    ctx.beginPath();
    ctx.roundRect(cx - R - 60, cy + Math.sin(lastExitAngle)*150 - 15, 70, 30, 5);
    ctx.fill();
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${deg}°`, cx - R - 25, cy + Math.sin(lastExitAngle)*150);

  }, [baseIndex, rayHeight]);

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

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-4 md:gap-5 w-full">
      <div className="glass rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-video relative w-full border border-sky-500/20 bg-[#082f49]/20">
        <canvas ref={canvasRef} className="w-full h-full touch-none" />
        <div className="absolute top-4 left-4 pointer-events-none">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 backdrop-blur-md text-xs font-mono text-slate-300 shadow-xl">
            DISPERSION ENGINE
          </div>
        </div>
      </div>
      <div className="space-y-4 w-full">
        <div className="glass rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider">{t('physics.optics.rainbow_controls', 'التحكم بقوس قزح')}</h3>
          <p className="text-xs text-slate-400 mb-2 leading-relaxed">
            اضبط ارتفاع شعاع الشمس المار عبر القطرة. ستلاحظ أن الألوان تتجمع بشكل مكثف (وتشكل قوس قزح) عندما يكون الارتفاع حول 86%، حيث تكون زاوية الخروج قريبة من 42 درجة.
          </p>
          <ParamSlider label={t('physics.optics.drop_index', 'معامل انكسار القطرة')} value={baseIndex} min={1.2} max={1.6} step={0.01} unit="" onChange={setBaseIndex} />
          <ParamSlider label={t('physics.optics.ray_height', 'ارتفاع شعاع الشمس')} value={rayHeight} min={0} max={99} step={1} unit="%" onChange={setRayHeight} />
        </div>
      </div>
    </div>
  );
}

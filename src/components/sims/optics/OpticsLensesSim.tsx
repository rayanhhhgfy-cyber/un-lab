import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function OpticsLensesSim() {
  const { t } = useTranslation();
  const [lensType, setLensType] = useState<"convex" | "concave">("convex");
  const [objectDist, setObjectDist] = useState(250);
  const [focalLength, setFocalLength] = useState(120);
  const [objectHeight, setObjectHeight] = useState(50);
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
    ctx.strokeStyle = "rgba(139, 92, 246, 0.03)";
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
    for (let i = 0; i < h; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke(); }

    const cx = w / 2;
    const cy = h / 2;

    // Optical Axis
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(w, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, h);
    ctx.stroke();
    ctx.setLineDash([]);

    // Focal Points
    ctx.fillStyle = "#fbbf24";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#fbbf24";
    
    ctx.beginPath(); ctx.arc(cx - focalLength, cy, 4, 0, Math.PI * 2); ctx.fill();
    ctx.font = "bold 12px sans-serif";
    ctx.fillText("F", cx - focalLength - 4, cy + 18);
    
    ctx.beginPath(); ctx.arc(cx + focalLength, cy, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillText("F'", cx + focalLength - 4, cy + 18);
    
    ctx.fillStyle = "rgba(251, 191, 36, 0.5)";
    ctx.beginPath(); ctx.arc(cx - focalLength*2, cy, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillText("2F", cx - focalLength*2 - 8, cy + 18);
    ctx.beginPath(); ctx.arc(cx + focalLength*2, cy, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillText("2F'", cx + focalLength*2 - 8, cy + 18);
    
    ctx.shadowBlur = 0;

    // Draw Lens (Glassmorphic)
    const thickness = Math.max(8, 600 / focalLength);
    const lensHeight = Math.min(h * 0.8, 200);
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(167, 139, 250, 0.8)";
    ctx.fillStyle = "rgba(167, 139, 250, 0.15)";
    ctx.shadowColor = "rgba(167, 139, 250, 0.5)";
    ctx.shadowBlur = 15;
    
    ctx.beginPath();
    if (lensType === "convex") {
      ctx.moveTo(cx, cy - lensHeight/2);
      ctx.quadraticCurveTo(cx + thickness, cy, cx, cy + lensHeight/2);
      ctx.quadraticCurveTo(cx - thickness, cy, cx, cy - lensHeight/2);
    } else {
      ctx.moveTo(cx - thickness, cy - lensHeight/2);
      ctx.lineTo(cx + thickness, cy - lensHeight/2);
      ctx.quadraticCurveTo(cx + thickness/3, cy, cx + thickness, cy + lensHeight/2);
      ctx.lineTo(cx - thickness, cy + lensHeight/2);
      ctx.quadraticCurveTo(cx - thickness/3, cy, cx - thickness, cy - lensHeight/2);
    }
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    const objX = cx - objectDist;
    const objY = cy - objectHeight;
    
    // Draw Object
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#4ade80";
    ctx.shadowColor = "#4ade80";
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(objX, cy);
    ctx.lineTo(objX, objY);
    ctx.moveTo(objX - 8, objY + 8);
    ctx.lineTo(objX, objY);
    ctx.lineTo(objX + 8, objY + 8);
    ctx.stroke();
    ctx.shadowBlur = 0;

    const f = lensType === "convex" ? focalLength : -focalLength;
    const d_o = objectDist;
    const d_i = d_o === f ? Infinity : (d_o * f) / (d_o - f);
    const m = d_o === f ? Infinity : -d_i / d_o;

    const imgX = cx + d_i;
    const imgY = cy - objectHeight * m;
    const rayLen = Math.max(w, h);

    if (Math.abs(d_i) !== Infinity) {
      ctx.lineWidth = 2;
      
      // Ray 1: Parallel to focal
      ctx.strokeStyle = "rgba(250, 204, 21, 0.8)";
      ctx.beginPath();
      ctx.moveTo(objX, objY);
      ctx.lineTo(cx, objY);
      ctx.stroke();

      ctx.beginPath();
      if (lensType === "convex") {
        ctx.moveTo(cx, objY);
        const slope1 = (cy - objY) / focalLength;
        ctx.lineTo(cx + rayLen, objY + slope1 * rayLen);
      } else {
        ctx.moveTo(cx, objY);
        const slope1 = (objY - cy) / focalLength;
        ctx.lineTo(cx + rayLen, objY + slope1 * rayLen);
        
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = "rgba(234, 179, 8, 0.4)";
        ctx.beginPath();
        ctx.moveTo(cx, objY);
        ctx.lineTo(cx - focalLength, cy);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.stroke();

      // Ray 2: Through optical center
      ctx.strokeStyle = "rgba(56, 189, 248, 0.8)";
      ctx.beginPath();
      ctx.moveTo(objX, objY);
      ctx.lineTo(cx, cy);
      const slope2 = (cy - objY) / objectDist;
      ctx.lineTo(cx + rayLen, cy + slope2 * rayLen);
      ctx.stroke();
      
      // Virtual extensions
      if (d_i < 0) {
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(imgX - rayLen, imgY - slope2 * rayLen);
        ctx.stroke();
        
        ctx.strokeStyle = "rgba(234, 179, 8, 0.4)";
        ctx.beginPath();
        ctx.moveTo(cx, objY);
        const slope1 = lensType === "convex" ? (cy - objY)/focalLength : (objY - cy)/focalLength;
        ctx.lineTo(imgX - rayLen, imgY - slope1 * rayLen);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw Image
      if (Math.abs(d_i) < rayLen * 2) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = d_i > 0 ? "#f43f5e" : "rgba(244, 63, 94, 0.5)";
        ctx.shadowColor = d_i > 0 ? "#f43f5e" : "transparent";
        ctx.shadowBlur = d_i > 0 ? 15 : 0;
        ctx.setLineDash(d_i < 0 ? [5, 5] : []);
        ctx.beginPath();
        ctx.moveTo(imgX, cy);
        ctx.lineTo(imgX, imgY);
        ctx.moveTo(imgX - 8, imgY + (m > 0 ? 8 : -8));
        ctx.lineTo(imgX, imgY);
        ctx.lineTo(imgX + 8, imgY + (m > 0 ? 8 : -8));
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.shadowBlur = 0;
      }
    }
  }, [lensType, objectDist, focalLength, objectHeight]);

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
    const objX = cx - objectDist;
    const objY = cy - objectHeight;

    if (Math.hypot(x - objX, y - objY) < 30 || Math.hypot(x - objX, y - cy) < 30) {
      setIsDragging(true);
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

    const newDist = Math.max(30, cx - x);
    const newHeight = Math.max(10, Math.min(cy - y, 200));

    setObjectDist(newDist);
    setObjectHeight(newHeight);
  };

  const handlePointerUp = () => setIsDragging(false);

  const f = lensType === "convex" ? focalLength : -focalLength;
  const d_i = objectDist === f ? Infinity : (objectDist * f) / (objectDist - f);
  const m = objectDist === f ? Infinity : -d_i / objectDist;

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-4 md:gap-5 w-full">
      <div className="glass rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-video relative w-full border border-violet-500/20 bg-[#0f172a]">
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
            {t('physics.optics.drag_lenses', 'اسحب الجسم (السهم الأخضر) لتغيير موقعه')}
          </div>
        </div>
      </div>
      <div className="space-y-4 w-full">
        <div className="glass rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wider">{t('physics.optics.lenses_controls', 'التحكم بالعدسات')}</h3>
          
          <div className="flex gap-2">
            {(["convex", "concave"] as const).map(type => (
              <button
                key={type}
                onClick={() => setLensType(type)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                  lensType === type ? "bg-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]" : "bg-slate-800/50 text-slate-400 hover:text-white"
                }`}
              >
                {t(`physics.optics.lens_${type}`, type)}
              </button>
            ))}
          </div>

          <ParamSlider label={t('physics.optics.object_dist', 'بعد الجسم')} value={objectDist} min={30} max={600} step={1} unit="px" onChange={setObjectDist} />
          <ParamSlider label={t('physics.optics.focal_length', 'البعد البؤري')} value={focalLength} min={30} max={300} step={1} unit="px" onChange={setFocalLength} />
          <ParamSlider label={t('physics.optics.object_height', 'طول الجسم')} value={objectHeight} min={10} max={200} step={1} unit="px" onChange={setObjectHeight} />
        </div>
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-3">{t('physics.optics.results', 'النتائج')}</h3>
          <ResultDisplay items={[
            { label: t('physics.optics.image_dist', 'بعد الصورة'), value: d_i === Infinity ? "∞" : Math.abs(d_i).toFixed(1), unit: "px" },
            { label: t('physics.optics.magnification', 'التكبير'), value: m === Infinity ? "∞" : Math.abs(m).toFixed(2), unit: "x" },
            { label: t('physics.optics.image_type', 'الصورة'), value: d_i > 0 ? t('physics.optics.real', 'حقيقية (مقلوبة)') : t('physics.optics.virtual', 'وهمية (معتدلة)'), unit: "" },
          ]} />
        </div>
      </div>
    </div>
  );
}

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function OpticsReflectionSim() {
  const { t } = useTranslation();
  const [mirrorType, setMirrorType] = useState<"plane" | "concave" | "convex">("concave");
  const [objectDist, setObjectDist] = useState(150);
  const [focalLength, setFocalLength] = useState(100);
  const [objectHeight, setObjectHeight] = useState(40);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    
    ctx.strokeStyle = "rgba(24acc, 21, 0, 0.03)";
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
    for (let i = 0; i < h; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke(); }

    // Mirror center is fixed to the right side so there's room on the left for the object
    const cx = w * 0.7; 
    const cy = h / 2;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(w, cy);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Mirror
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#cbd5e1"; // Silver glass
    ctx.shadowColor = "rgba(203, 213, 225, 0.5)";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    
    if (mirrorType === "plane") {
      ctx.moveTo(cx, cy - 120);
      ctx.lineTo(cx, cy + 120);
      ctx.stroke();
      ctx.lineWidth = 2;
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(148, 163, 184, 0.5)";
      for(let i = -110; i <= 110; i += 10) {
        ctx.beginPath();
        ctx.moveTo(cx, cy + i);
        ctx.lineTo(cx + 10, cy + i + 10);
        ctx.stroke();
      }
    } else {
      const R = focalLength * 2;
      const angle = Math.asin(Math.min(1, 150 / R));
      
      ctx.beginPath();
      if (mirrorType === "concave") {
        ctx.arc(cx + R, cy, R, Math.PI - angle, Math.PI + angle);
      } else {
        ctx.arc(cx - R, cy, R, -angle, angle);
      }
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.fillStyle = "#fbbf24";
      const fX = mirrorType === "concave" ? cx - focalLength : cx + focalLength;
      const cX = mirrorType === "concave" ? cx - R : cx + R;
      
      ctx.beginPath(); ctx.arc(fX, cy, 4, 0, Math.PI * 2); ctx.fill();
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("F", fX - 4, cy + 18);
      
      ctx.beginPath(); ctx.arc(cX, cy, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillText("C", cX - 4, cy + 18);
    }

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

    let d_i = 0;
    let m = 1;
    
    if (mirrorType === "plane") {
      d_i = -objectDist;
      m = 1;
    } else {
      const f = mirrorType === "concave" ? focalLength : -focalLength;
      if (objectDist === f) {
        d_i = Infinity;
      } else {
        d_i = (objectDist * f) / (objectDist - f);
        m = -d_i / objectDist;
      }
    }

    const imgX = cx - d_i;
    const imgY = cy - objectHeight * m;

    if (Math.abs(d_i) !== Infinity) {
      ctx.lineWidth = 2;
      
      // Ray 1: Parallel to focal point
      ctx.strokeStyle = "rgba(250, 204, 21, 0.8)";
      ctx.beginPath();
      ctx.moveTo(objX, objY);
      ctx.lineTo(cx, objY);
      
      if (mirrorType === "plane") {
        ctx.lineTo(cx - w, cy + objectHeight * (w/objectDist));
      } else if (mirrorType === "concave") {
        const fX = cx - focalLength;
        const slope = (cy - objY) / (fX - cx);
        ctx.lineTo(cx - w, objY + slope * (-w));
      } else {
        const fX = cx + focalLength;
        const slope = (cy - objY) / (fX - cx);
        ctx.lineTo(cx - w, objY - slope * (-w));
        
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = "rgba(250, 204, 21, 0.4)";
        ctx.beginPath();
        ctx.moveTo(cx, objY);
        ctx.lineTo(fX, cy);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.stroke();

      // Ray 2: Through center
      ctx.strokeStyle = "rgba(56, 189, 248, 0.8)";
      ctx.beginPath();
      ctx.moveTo(objX, objY);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx - w, cy + (cy - objY) * (-w / -objectDist));
      ctx.stroke();

      // Virtual extensions
      if (mirrorType === "plane" || d_i < 0) {
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(imgX, imgY);
        ctx.stroke();
        ctx.strokeStyle = "rgba(250, 204, 21, 0.4)";
        ctx.beginPath();
        ctx.moveTo(cx, objY);
        ctx.lineTo(imgX, imgY);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw Image
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
  }, [mirrorType, objectDist, focalLength, objectHeight]);

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

    const w = canvas.width;
    const h = canvas.height;
    const cx = w * 0.7;
    const cy = h / 2;
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

    const w = canvas.width;
    const h = canvas.height;
    const cx = w * 0.7;
    const cy = h / 2;

    const newDist = Math.max(20, Math.min(cx - x, 600));
    const newHeight = Math.max(10, Math.min(cy - y, 200));

    setObjectDist(newDist);
    setObjectHeight(newHeight);
  };

  const handlePointerUp = () => setIsDragging(false);

  let d_i = 0;
  let m = 1;
  if (mirrorType === "plane") {
    d_i = -objectDist;
    m = 1;
  } else {
    const f = mirrorType === "concave" ? focalLength : -focalLength;
    d_i = objectDist === f ? Infinity : (objectDist * f) / (objectDist - f);
    m = objectDist === f ? Infinity : -d_i / objectDist;
  }

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-4 md:gap-5 w-full">
      <div className="glass rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-video relative w-full border border-yellow-500/20 bg-[#0f172a]">
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
            {t('physics.optics.drag_reflection', 'اسحب الجسم (السهم الأخضر) لتغيير موقعه')}
          </div>
        </div>
      </div>
      <div className="space-y-4 w-full">
        <div className="glass rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">{t('physics.optics.reflection_controls', 'التحكم بالانعكاس')}</h3>
          
          <div className="flex gap-2">
            {(["plane", "concave", "convex"] as const).map(type => (
              <button
                key={type}
                onClick={() => setMirrorType(type)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                  mirrorType === type ? "bg-yellow-500 text-white shadow-[0_0_15px_rgba(234,179,8,0.3)]" : "bg-slate-800/50 text-slate-400 hover:text-white"
                }`}
              >
                {t(`physics.optics.${type}`, type)}
              </button>
            ))}
          </div>

          <ParamSlider label={t('physics.optics.object_dist', 'بعد الجسم')} value={objectDist} min={20} max={600} step={1} unit="px" onChange={setObjectDist} />
          {mirrorType !== "plane" && (
            <ParamSlider label={t('physics.optics.focal_length', 'البعد البؤري')} value={focalLength} min={30} max={300} step={1} unit="px" onChange={setFocalLength} />
          )}
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

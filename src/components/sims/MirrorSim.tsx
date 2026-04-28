import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function MirrorSim() {
  const { t } = useTranslation();
  const [mirrorType, setMirrorType] = useState<'concave' | 'convex'>('concave');
  const [focalLength, setFocalLength] = useState(120);
  const [objectDist, setObjectDist] = useState(250);
  const [objectHeight, setObjectHeight] = useState(60);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // Mirror equation: 1/f = 1/do + 1/di => di = (f * do) / (do - f)
  const f = mirrorType === 'concave' ? focalLength : -focalLength;
  const di = (f * objectDist) / (objectDist - f);
  const magnification = -di / objectDist;
  const imageHeight = magnification * objectHeight;
  const isReal = mirrorType === 'concave' ? di > 0 : false;
  const isInverted = magnification < 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const r = canvas.parentElement!.getBoundingClientRect();
      canvas.width = r.width;
      canvas.height = r.height;
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

      const mirrorX = w * 0.75;
      const axisY = h * 0.5;
      const scale = Math.min(w, h) / 700;

      // Draw principal axis
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, axisY);
      ctx.lineTo(w, axisY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw mirror surface
      const mirrorH = h * 0.6;
      ctx.strokeStyle = "#00d4aa";
      ctx.lineWidth = 3;
      ctx.beginPath();
      if (mirrorType === 'concave') {
        ctx.arc(mirrorX + mirrorH * 0.4, axisY, mirrorH * 0.5, Math.PI * 0.65, Math.PI * 1.35);
      } else {
        ctx.arc(mirrorX - mirrorH * 0.4, axisY, mirrorH * 0.5, -Math.PI * 0.35, Math.PI * 0.35);
      }
      ctx.stroke();

      // Mark focal point and center of curvature
      const fPx = mirrorX - f * scale;
      const cPx = mirrorX - 2 * f * scale;

      // Focal point F
      ctx.fillStyle = "#ffcc00";
      ctx.beginPath();
      ctx.arc(fPx, axisY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffcc00";
      ctx.font = "bold 12px monospace";
      ctx.fillText("F", fPx - 3, axisY + 18);

      // Center C
      ctx.fillStyle = "#ff6644";
      ctx.beginPath();
      ctx.arc(cPx, axisY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText("C", cPx - 3, axisY + 18);

      // Draw object (arrow)
      const objX = mirrorX - objectDist * scale;
      const objTop = axisY - objectHeight * scale;
      ctx.strokeStyle = "#00aaff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(objX, axisY);
      ctx.lineTo(objX, objTop);
      ctx.stroke();
      // Arrowhead
      ctx.fillStyle = "#00aaff";
      ctx.beginPath();
      ctx.moveTo(objX, objTop);
      ctx.lineTo(objX - 6, objTop + 12);
      ctx.lineTo(objX + 6, objTop + 12);
      ctx.closePath();
      ctx.fill();
      ctx.font = "bold 11px monospace";
      ctx.fillText("Object", objX - 18, axisY + 16);

      // Draw image
      if (isFinite(di) && Math.abs(di) < 2000) {
        const imgX = mirrorX - di * scale;
        const imgTop = axisY - imageHeight * scale;

        ctx.strokeStyle = isReal ? "#ff44aa" : "#ff44aa88";
        ctx.lineWidth = 2.5;
        if (!isReal) ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(imgX, axisY);
        ctx.lineTo(imgX, imgTop);
        ctx.stroke();
        ctx.setLineDash([]);
        // Arrowhead
        ctx.fillStyle = isReal ? "#ff44aa" : "#ff44aa88";
        ctx.beginPath();
        const arrowDir = imageHeight * scale > 0 ? 12 : -12;
        ctx.moveTo(imgX, imgTop);
        ctx.lineTo(imgX - 6, imgTop + arrowDir);
        ctx.lineTo(imgX + 6, imgTop + arrowDir);
        ctx.closePath();
        ctx.fill();
        ctx.font = "bold 11px monospace";
        ctx.fillText("Image", imgX - 16, axisY + 16);

        // Draw ray 1: parallel to axis → through F
        ctx.strokeStyle = "#ffcc0088";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(objX, objTop);
        ctx.lineTo(mirrorX, objTop);
        ctx.lineTo(imgX, imgTop);
        ctx.stroke();

        // Draw ray 2: through F → parallel
        ctx.strokeStyle = "#44ff8888";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(objX, objTop);
        ctx.lineTo(mirrorX, axisY - (objTop - axisY) * (mirrorX - fPx) / (objX - fPx) + axisY);
        ctx.stroke();

        // Draw ray 3: through C → reflects back
        ctx.strokeStyle = "#ff664488";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(objX, objTop);
        ctx.lineTo(mirrorX, axisY + (objTop - axisY) * (mirrorX - cPx) / (objX - cPx));
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [mirrorType, focalLength, objectDist, objectHeight, f, di, magnification, imageHeight, isReal]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-3 sm:gap-4 md:gap-5 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-3 sm:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 space-y-3">
          <h3 className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">{t('physics.common.controls')}</h3>
          <div className="flex gap-2">
            <button onClick={() => setMirrorType('concave')} className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${mirrorType === 'concave' ? 'bg-primary/30 text-primary border border-primary/50' : 'bg-muted text-foreground'}`}>
              Concave / مقعرة
            </button>
            <button onClick={() => setMirrorType('convex')} className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${mirrorType === 'convex' ? 'bg-secondary/30 text-secondary border border-secondary/50' : 'bg-muted text-foreground'}`}>
              Convex / محدبة
            </button>
          </div>
          <ParamSlider label="Focal Length / البعد البؤري" value={focalLength} min={40} max={200} step={5} unit="px" onChange={setFocalLength} />
          <ParamSlider label="Object Distance / بعد الجسم" value={objectDist} min={50} max={500} step={5} unit="px" onChange={setObjectDist} />
          <ParamSlider label="Object Height / ارتفاع الجسم" value={objectHeight} min={20} max={120} step={5} unit="px" onChange={setObjectHeight} />
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5">
          <h3 className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider mb-3">{t('physics.common.results')}</h3>
          <ResultDisplay items={[
            { label: "Image Distance / بعد الصورة", value: isFinite(di) ? di.toFixed(1) : "∞", unit: "px" },
            { label: "Magnification / التكبير", value: isFinite(magnification) ? magnification.toFixed(2) : "∞", unit: "×" },
            { label: "Image Type / نوع الصورة", value: isReal ? "Real / حقيقية" : "Virtual / وهمية", unit: "" },
            { label: "Orientation / الاتجاه", value: isInverted ? "Inverted / مقلوبة" : "Upright / معتدلة", unit: "" },
          ]} />
        </div>
      </div>
    </div>
  );
}

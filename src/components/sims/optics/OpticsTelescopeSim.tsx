import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import ParamSlider from "@/components/ui/ParamSlider";

export default function OpticsTelescopeSim() {
  const { t } = useTranslation();
  const [fObj, setFObj] = useState(250);
  const [fEye, setFEye] = useState(60);
  const [lensDist, setLensDist] = useState(310);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
    for (let i = 0; i < h; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke(); }

    const cy = h / 2;
    const objX = w * 0.4;
    const eyeX = objX + lensDist;

    // Optical axis
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(w, cy);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw distant object (Saturn-like)
    ctx.save();
    ctx.translate(50, cy - 80);
    ctx.fillStyle = "#fbbf24";
    ctx.shadowColor = "#fbbf24";
    ctx.shadowBlur = 15;
    ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(0, 0, 15, 4, Math.PI / 8, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();

    const drawLens = (x: number, y: number, f: number, height: number, color: string) => {
      const thickness = Math.max(8, 600 / f);
      ctx.fillStyle = `rgba(${color}, 0.15)`;
      ctx.strokeStyle = `rgba(${color}, 0.8)`;
      ctx.lineWidth = 2;
      ctx.shadowColor = `rgba(${color}, 0.5)`;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(x, y - height);
      ctx.quadraticCurveTo(x + thickness, y, x, y + height);
      ctx.quadraticCurveTo(x - thickness, y, x, y - height);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    drawLens(objX, cy, fObj, 100, "167, 139, 250"); // Objective
    drawLens(eyeX, cy, fEye, 50, "56, 189, 248"); // Eyepiece

    // Focal points
    ctx.fillStyle = "#a78bfa";
    ctx.beginPath(); ctx.arc(objX + fObj, cy, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath(); ctx.arc(eyeX - fEye, cy, 3, 0, Math.PI * 2); ctx.fill();

    const incomingAngle = 0.08; // Distant object angle
    const rayHeights = [-60, -30, 0, 30, 60];
    
    // Intermediate image position
    const imageY = cy - fObj * Math.tan(incomingAngle);
    const focalX = objX + fObj;

    // Draw intermediate image (inverted Saturn)
    ctx.save();
    ctx.translate(focalX, imageY);
    ctx.fillStyle = "rgba(251, 191, 36, 0.6)";
    ctx.beginPath(); ctx.arc(0, 0, 4, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(251, 191, 36, 0.6)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(0, 0, 8, 2, -Math.PI / 8, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();

    ctx.lineWidth = 2;
    rayHeights.forEach(rh => {
      const startX = 0;
      const startY = cy + rh - objX * Math.tan(incomingAngle);
      const hitObjY = cy + rh;

      // Ray to objective
      ctx.strokeStyle = "rgba(251, 191, 36, 0.8)"; // Golden rays
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(objX, hitObjY);
      ctx.stroke();

      // Ray from objective to intermediate image and eyepiece
      const slope1 = (imageY - hitObjY) / (focalX - objX);
      const hitEyeY = hitObjY + slope1 * (eyeX - objX);
      
      ctx.strokeStyle = "rgba(167, 139, 250, 0.8)"; // Violet rays between lenses
      ctx.beginPath();
      ctx.moveTo(objX, hitObjY);
      ctx.lineTo(eyeX, hitEyeY);
      ctx.stroke();

      // Through eyepiece
      const d_o = lensDist - fObj;
      let finalSlope = 0;

      if (Math.abs(d_o - fEye) < 1) {
        finalSlope = (cy - imageY) / (eyeX - focalX);
      } else {
        const d_i = (d_o * fEye) / (d_o - fEye);
        const m = -d_i / d_o;
        const finalImageY = cy + (imageY - cy) * m;
        const finalImageX = eyeX + d_i;
        finalSlope = (hitEyeY - finalImageY) / (eyeX - finalImageX);
      }

      ctx.strokeStyle = "rgba(56, 189, 248, 0.8)"; // Sky blue exit rays
      ctx.beginPath();
      ctx.moveTo(eyeX, hitEyeY);
      const rayLen = w;
      ctx.lineTo(eyeX + rayLen, hitEyeY + finalSlope * rayLen);
      ctx.stroke();

      // Virtual extended rays (dashed)
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
      ctx.beginPath();
      ctx.moveTo(eyeX, hitEyeY);
      ctx.lineTo(eyeX - rayLen, hitEyeY - finalSlope * rayLen);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Draw huge virtual image if it exists within reasonable bounds
    const d_o = lensDist - fObj;
    if (Math.abs(d_o - fEye) > 1 && d_o < fEye) {
      const d_i = (d_o * fEye) / (d_o - fEye);
      const m = -d_i / d_o;
      const finalImageY = cy + (imageY - cy) * m;
      const finalImageX = eyeX + d_i;

      if (finalImageX > -w * 2 && finalImageX < w) {
        ctx.save();
        ctx.translate(finalImageX, finalImageY);
        ctx.fillStyle = "rgba(251, 191, 36, 0.15)";
        ctx.shadowColor = "#fbbf24";
        ctx.shadowBlur = 30;
        const size = Math.abs(m * 4);
        ctx.beginPath(); ctx.arc(0, 0, size, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "rgba(251, 191, 36, 0.2)";
        ctx.lineWidth = size / 4;
        ctx.beginPath(); ctx.ellipse(0, 0, size * 2, size / 2, -Math.PI / 8, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      }
    }

  }, [fObj, fEye, lensDist]);

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

  const mag = fObj / fEye;
  const isFocused = Math.abs(lensDist - (fObj + fEye)) < 5;

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-4 md:gap-5 w-full">
      <div className="glass rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-video relative w-full border border-violet-500/20 bg-[#0f172a]">
        <canvas ref={canvasRef} className="w-full h-full touch-none" />
        <div className="absolute top-4 right-4 text-right pointer-events-none">
          <div className="text-violet-400 font-mono text-xl font-bold bg-slate-900/50 px-3 py-1 rounded-lg backdrop-blur-sm border border-violet-500/20">
            {mag.toFixed(1)}x MAGNIFICATION
          </div>
          {isFocused && (
            <div className="text-green-400 text-xs font-mono mt-2 tracking-widest uppercase bg-green-500/10 px-2 py-1 rounded border border-green-500/20 inline-block">
              FOCUSED AT INFINITY
            </div>
          )}
        </div>
      </div>
      <div className="space-y-4 w-full">
        <div className="glass rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wider">{t('physics.optics.telescope_controls', 'التحكم بالتلسكوب')}</h3>
          <p className="text-xs text-slate-400 mb-2 leading-relaxed">
            للحصول على أفضل صورة (تلسكوب كبلر)، اجعل المسافة بين العدستين مساوية لمجموع البعدين البؤريين.
          </p>
          <ParamSlider label={t('physics.optics.f_objective', 'البعد البؤري الشيئية')} value={fObj} min={150} max={400} step={10} unit="px" onChange={setFObj} />
          <ParamSlider label={t('physics.optics.f_eyepiece', 'البعد البؤري العينية')} value={fEye} min={30} max={100} step={5} unit="px" onChange={setFEye} />
          <ParamSlider label={t('physics.optics.lens_dist', 'المسافة بين العدستين')} value={lensDist} min={150} max={500} step={10} unit="px" onChange={setLensDist} />
        </div>
      </div>
    </div>
  );
}

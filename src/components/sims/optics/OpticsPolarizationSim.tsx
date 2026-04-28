import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function OpticsPolarizationSim() {
  const { t } = useTranslation();
  const [angle1, setAngle1] = useState(0);
  const [angle2, setAngle2] = useState(45);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dragState, setDragState] = useState<'pol1' | 'pol2' | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    
    // Background Grid
    ctx.strokeStyle = "rgba(14, 165, 233, 0.03)";
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
    for (let i = 0; i < h; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke(); }

    const cy = h / 2;
    const pol1X = w * 0.33;
    const pol2X = w * 0.66;

    // Optical Axis
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(w, cy);
    ctx.stroke();
    ctx.setLineDash([]);

    const drawPolarizer = (x: number, angle: number, label: string) => {
      ctx.save();
      ctx.translate(x, cy);
      
      // Glass disc
      ctx.fillStyle = "rgba(14, 165, 233, 0.1)";
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 3;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "rgba(56, 189, 248, 0.4)";
      
      ctx.beginPath();
      ctx.ellipse(0, 0, 15, 90, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Polarization slits
      const rad = (angle * Math.PI) / 180;
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Draw 3 slits
      for(let offset = -4; offset <= 4; offset += 4) {
        ctx.moveTo(offset * Math.cos(rad + Math.PI/2), offset * Math.sin(rad + Math.PI/2) - 80 * Math.cos(rad));
        ctx.lineTo(offset * Math.cos(rad + Math.PI/2), offset * Math.sin(rad + Math.PI/2) + 80 * Math.cos(rad));
      }
      ctx.stroke();

      // Label and Angle
      ctx.fillStyle = "#fff";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`${label} (${angle}°)`, 0, 120);
      
      // Drag Hint
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.font = "10px sans-serif";
      ctx.fillText("↕ اسحب للتدوير", 0, 135);
      
      ctx.restore();
    };

    drawPolarizer(pol1X, angle1, t('physics.optics.polarizer1', 'مستقطب 1'));
    drawPolarizer(pol2X, angle2, t('physics.optics.polarizer2', 'مستقطب 2 (محلل)'));

    const drawWave = (startX: number, endX: number, amplitude: number, polarizationAngle: number, isUnpolarized: boolean) => {
      if (amplitude <= 0) return;
      
      const rad = (polarizationAngle * Math.PI) / 180;
      ctx.lineWidth = 2;
      
      if (isUnpolarized) {
        // Draw chaotic wave
        const colors = ["#ef4444", "#eab308", "#3b82f6", "#a855f7"];
        colors.forEach((color, i) => {
          ctx.strokeStyle = color;
          ctx.globalAlpha = 0.6;
          const a = (i * Math.PI) / colors.length;
          ctx.beginPath();
          for (let x = startX; x <= endX; x += 2) {
            const yOffset = Math.sin((x - startX) * 0.05 + i) * amplitude;
            ctx.lineTo(x, cy + yOffset * Math.cos(a));
          }
          ctx.stroke();
        });
        ctx.globalAlpha = 1.0;
      } else {
        ctx.strokeStyle = "#eab308";
        ctx.shadowColor = "#eab308";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        for (let x = startX; x <= endX; x += 2) {
          const yOffset = Math.sin((x - startX) * 0.05) * amplitude;
          ctx.lineTo(x, cy + yOffset * Math.cos(rad));
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    };

    const initialAmplitude = 50;
    
    // Light Source icon
    ctx.fillStyle = "#fff";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#fff";
    ctx.beginPath(); ctx.arc(20, cy, 10, 0, Math.PI*2); ctx.fill();
    ctx.shadowBlur = 0;

    drawWave(20, pol1X, initialAmplitude, 0, true);

    const amp1 = initialAmplitude * 0.707;
    drawWave(pol1X, pol2X, amp1, angle1, false);

    const deltaAngle = angle2 - angle1;
    const amp2 = amp1 * Math.abs(Math.cos((deltaAngle * Math.PI) / 180));
    drawWave(pol2X, w, amp2, angle2, false);

  }, [angle1, angle2, t]);

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
    
    const w = canvas.width;
    const pol1X = w * 0.33;
    const pol2X = w * 0.66;

    if (Math.abs(x - pol1X) < 40) {
      setDragState('pol1');
    } else if (Math.abs(x - pol2X) < 40) {
      setDragState('pol2');
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const h = canvas.height;
    
    // map y from 0->h to 180->0 degrees
    let newAngle = 180 - Math.round((y / h) * 180);
    newAngle = Math.max(0, Math.min(180, newAngle));
    
    if (dragState === 'pol1') setAngle1(newAngle);
    if (dragState === 'pol2') setAngle2(newAngle);
  };

  const handlePointerUp = () => setDragState(null);

  const intensity1 = 50.0;
  const deltaTheta = angle2 - angle1;
  const intensity2 = intensity1 * Math.pow(Math.cos((deltaTheta * Math.PI) / 180), 2);

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-4 md:gap-5 w-full">
      <div className="glass rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-video relative w-full border border-sky-500/20 bg-[#0f172a]">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full touch-none cursor-ns-resize"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
        <div className="absolute top-4 left-4 pointer-events-none">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 backdrop-blur-md text-xs font-mono text-slate-300">
            {t('physics.optics.drag_polarization', 'اسحب المستقطب للأعلى والأسفل لتدويره')}
          </div>
        </div>
      </div>
      <div className="space-y-4 w-full">
        <div className="glass rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider">{t('physics.optics.polarization_controls', 'التحكم بالاستقطاب')}</h3>
          <ParamSlider label={t('physics.optics.angle1', 'زاوية المستقطب 1')} value={angle1} min={0} max={180} step={1} unit="°" onChange={setAngle1} />
          <ParamSlider label={t('physics.optics.angle2', 'زاوية المستقطب 2')} value={angle2} min={0} max={180} step={1} unit="°" onChange={setAngle2} />
        </div>
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-3">{t('physics.optics.results', 'النتائج')}</h3>
          <ResultDisplay items={[
            { label: t('physics.optics.intensity0', 'الشدة الأصلية (I₀)'), value: "100", unit: "%" },
            { label: t('physics.optics.intensity1', 'الشدة بعد المستقطب 1 (I₁)'), value: intensity1.toFixed(1), unit: "%" },
            { label: t('physics.optics.intensity2', 'الشدة النهائية (I₂)'), value: intensity2.toFixed(1), unit: "%" },
          ]} />
        </div>
      </div>
    </div>
  );
}

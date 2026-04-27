import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import { Info, ChevronDown } from "lucide-react";

const ExplanationSection = ({ title, content }: { title: string; content: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="mt-6 pt-6 border-t border-primary/20">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-primary/80 hover:text-primary transition-colors group w-full"
      >
        <div className="p-1.5 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-colors">
          <Info className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-black uppercase tracking-[0.2em]">{title}</span>
        <ChevronDown className={`w-3.5 h-3.5 ml-auto transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      
      {isExpanded && (
        <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-xs sm:text-sm leading-relaxed text-foreground/70 text-justify font-medium">
            {content}
          </p>
        </div>
      )}
    </div>
  );
};

export default function ReflectionSim() {
  const { t } = useTranslation();
  const [angle, setAngle] = useState(35);
  const [showNormal, setShowNormal] = useState(true);
  const [surfaceType, setSurfaceType] = useState<'flat' | 'rough'>('flat');
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let time = 0;

    const draw = () => {
      time += 0.016;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const surfY = h * 0.6;
      const cx = w * 0.5;
      const rayLen = Math.min(w, h) * 0.4;

      // Mirror surface
      ctx.fillStyle = "rgba(150,200,255,0.06)";
      ctx.fillRect(w * 0.1, surfY, w * 0.8, h * 0.35);
      // Surface line
      if (surfaceType === 'flat') {
        ctx.strokeStyle = "#00d4aa"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(w * 0.1, surfY); ctx.lineTo(w * 0.9, surfY); ctx.stroke();
        // Mirror hatching
        for (let i = 0; i < 20; i++) {
          const hx = w * 0.1 + i * (w * 0.8 / 20);
          ctx.strokeStyle = "#00d4aa33"; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(hx, surfY); ctx.lineTo(hx - 8, surfY + 12); ctx.stroke();
        }
      } else {
        // Rough surface
        ctx.strokeStyle = "#00d4aa"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(w * 0.1, surfY);
        for (let x = w * 0.1; x <= w * 0.9; x += 5) {
          ctx.lineTo(x, surfY + (Math.random() - 0.5) * 6);
        }
        ctx.stroke();
      }

      // Normal line
      if (showNormal) {
        ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath(); ctx.moveTo(cx, surfY - rayLen - 20); ctx.lineTo(cx, surfY + 60); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "#ffffff55"; ctx.font = "11px monospace";
        ctx.fillText("Normal / العمود", cx + 5, surfY - rayLen - 5);
      }

      const iRad = angle * Math.PI / 180;

      // Incident ray with animation pulse
      const pulse = 0.7 + 0.3 * Math.sin(time * 3);
      const ix = cx - rayLen * Math.sin(iRad);
      const iy = surfY - rayLen * Math.cos(iRad);
      ctx.strokeStyle = `rgba(0,212,170,${pulse})`; ctx.lineWidth = 2.5;
      ctx.shadowColor = "#00d4aa"; ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.moveTo(ix, iy); ctx.lineTo(cx, surfY); ctx.stroke();
      ctx.shadowBlur = 0;

      // Arrow on incident ray
      const mid1X = (ix + cx) / 2, mid1Y = (iy + surfY) / 2;
      const a1 = Math.atan2(surfY - iy, cx - ix);
      ctx.fillStyle = "#00d4aa";
      ctx.beginPath();
      ctx.moveTo(mid1X + 8 * Math.cos(a1), mid1Y + 8 * Math.sin(a1));
      ctx.lineTo(mid1X + 7 * Math.cos(a1 + 2.5), mid1Y + 7 * Math.sin(a1 + 2.5));
      ctx.lineTo(mid1X + 7 * Math.cos(a1 - 2.5), mid1Y + 7 * Math.sin(a1 - 2.5));
      ctx.closePath(); ctx.fill();

      // Reflected ray(s)
      if (surfaceType === 'flat') {
        const rx = cx + rayLen * Math.sin(iRad);
        const ry = surfY - rayLen * Math.cos(iRad);
        ctx.strokeStyle = `rgba(255,204,0,${pulse})`; ctx.lineWidth = 2.5;
        ctx.shadowColor = "#ffcc00"; ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.moveTo(cx, surfY); ctx.lineTo(rx, ry); ctx.stroke();
        ctx.shadowBlur = 0;

        // Arrow on reflected ray
        const mid2X = (cx + rx) / 2, mid2Y = (surfY + ry) / 2;
        const a2 = Math.atan2(ry - surfY, rx - cx);
        ctx.fillStyle = "#ffcc00";
        ctx.beginPath();
        ctx.moveTo(mid2X + 8 * Math.cos(a2), mid2Y + 8 * Math.sin(a2));
        ctx.lineTo(mid2X + 7 * Math.cos(a2 + 2.5), mid2Y + 7 * Math.sin(a2 + 2.5));
        ctx.lineTo(mid2X + 7 * Math.cos(a2 - 2.5), mid2Y + 7 * Math.sin(a2 - 2.5));
        ctx.closePath(); ctx.fill();
      } else {
        // Diffuse reflection — multiple scattered rays
        for (let i = 0; i < 7; i++) {
          const scatter = (i - 3) * 15 * Math.PI / 180;
          const rx = cx + rayLen * 0.6 * Math.sin(iRad + scatter);
          const ry = surfY - rayLen * 0.6 * Math.cos(iRad + scatter);
          ctx.strokeStyle = `rgba(255,204,0,${0.3 + Math.random() * 0.3})`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(cx, surfY); ctx.lineTo(rx, ry); ctx.stroke();
        }
      }

      // Angle arcs
      ctx.strokeStyle = "#00d4aa66"; ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, surfY, 50, -Math.PI / 2, -Math.PI / 2 + iRad, false);
      ctx.stroke();
      ctx.fillStyle = "#00d4aa"; ctx.font = "bold 12px monospace";
      ctx.fillText(`θᵢ = ${angle}°`, cx - 80, surfY - 55);

      if (surfaceType === 'flat') {
        ctx.strokeStyle = "#ffcc0066"; ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, surfY, 55, -Math.PI / 2 - iRad, -Math.PI / 2, false);
        ctx.stroke();
        ctx.fillStyle = "#ffcc00"; ctx.font = "bold 12px monospace";
        ctx.fillText(`θᵣ = ${angle}°`, cx + 30, surfY - 55);

        // Law statement
        ctx.fillStyle = "#ffffff88"; ctx.font = "bold 14px monospace";
        ctx.fillText("θᵢ = θᵣ (Law of Reflection)", w * 0.1, h * 0.12);
        ctx.fillStyle = "#ffffff44"; ctx.font = "12px monospace";
        ctx.fillText("زاوية السقوط = زاوية الانعكاس", w * 0.1, h * 0.17);
      } else {
        ctx.fillStyle = "#ffffff88"; ctx.font = "bold 13px monospace";
        ctx.fillText("Diffuse Reflection / انعكاس منتشر", w * 0.1, h * 0.12);
      }

      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [angle, showNormal, surfaceType]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-3 sm:gap-4 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-3 sm:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 space-y-3">
          <h3 className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">{t('physics.common.controls')}</h3>
          <ParamSlider label="Angle of Incidence / زاوية السقوط" value={angle} min={5} max={85} step={1} unit="°" onChange={setAngle} />
          <div className="flex gap-2">
            <button onClick={() => setSurfaceType('flat')} className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${surfaceType === 'flat' ? 'bg-primary/30 text-primary border border-primary/50' : 'bg-muted text-foreground'}`}>
              Flat / مستوي
            </button>
            <button onClick={() => setSurfaceType('rough')} className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${surfaceType === 'rough' ? 'bg-secondary/30 text-secondary border border-secondary/50' : 'bg-muted text-foreground'}`}>
              Rough / خشن
            </button>
          </div>
          <button onClick={() => setShowNormal(!showNormal)} className={`w-full py-2 rounded-lg text-xs font-semibold transition ${showNormal ? 'bg-primary/20 text-primary' : 'bg-muted text-foreground'}`}>
            {showNormal ? 'Hide' : 'Show'} Normal / العمود
          </button>
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4">
          <h3 className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider mb-3">{t('physics.common.results')}</h3>
          <ResultDisplay items={[
            { label: "Incident Angle / زاوية السقوط", value: angle.toFixed(0), unit: "°" },
            { label: "Reflected Angle / زاوية الانعكاس", value: surfaceType === 'flat' ? angle.toFixed(0) : "Diffuse", unit: surfaceType === 'flat' ? "°" : "" },
            { label: "Type / النوع", value: surfaceType === 'flat' ? "Specular / منتظم" : "Diffuse / منتشر", unit: "" },
          ]} />
        </div>
      </div>
      <div className="lg:col-span-2">
        <ExplanationSection title="Scientific Explanation / الشرح العلمي" content={t('physics.branches.reflection_explanation')} />
      </div>
    </div>
  );
}

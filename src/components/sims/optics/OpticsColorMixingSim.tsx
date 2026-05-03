import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import ParamSlider from "@/components/ui/ParamSlider";

export default function OpticsColorMixingSim() {
  const { t } = useTranslation();
  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(255);
  const [blue, setBlue] = useState(255);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, w, h);
    
    ctx.globalCompositeOperation = "screen";

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.25;

    const rY = cy - radius * 0.4;
    const gY = cy + radius * 0.5;
    const bY = cy + radius * 0.5;
    
    const rX = cx;
    const gX = cx - radius * 0.6;
    const bX = cx + radius * 0.6;

    const drawSpot = (x: number, y: number, colorStr: string, intensity: number) => {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.2);
      grad.addColorStop(0, colorStr.replace("INT", (intensity/255).toString()));
      grad.addColorStop(0.5, colorStr.replace("INT", (intensity/255 * 0.8).toString()));
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, radius * 1.2, 0, Math.PI * 2);
      ctx.fill();
    };

    drawSpot(rX, rY, `rgba(${red}, 0, 0, INT)`, red);
    drawSpot(gX, gY, `rgba(0, ${green}, 0, INT)`, green);
    drawSpot(bX, bY, `rgba(0, 0, ${blue}, INT)`, blue);

    ctx.globalCompositeOperation = "source-over";

  }, [red, green, blue]);

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
      <div className="glass rounded-2xl overflow-hidden aspect-video relative w-full border border-slate-700/50">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-4 w-full">
        <div className="glass rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">{t('physics.optics.colormixing_controls', 'التحكم بمزج الألوان')}</h3>
          <ParamSlider label={t('physics.optics.red_intensity', 'شدة الأحمر')} value={red} min={0} max={255} step={1} unit="" onChange={setRed} />
          <ParamSlider label={t('physics.optics.green_intensity', 'شدة الأخضر')} value={green} min={0} max={255} step={1} unit="" onChange={setGreen} />
          <ParamSlider label={t('physics.optics.blue_intensity', 'شدة الأزرق')} value={blue} min={0} max={255} step={1} unit="" onChange={setBlue} />
        </div>
        <div className="glass rounded-2xl p-5 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-300">{t('physics.optics.resulting_color', 'اللون الناتج')}</span>
          <div className="w-12 h-12 rounded-full border border-slate-600 shadow-lg" style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}></div>
        </div>
      </div>
    </div>
  );
}

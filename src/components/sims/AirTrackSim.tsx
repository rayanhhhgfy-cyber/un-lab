import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";

export default function AirTrackSim() {
  const { t } = useTranslation();
  const [m1, setM1] = useState(2);
  const [m2, setM2] = useState(1);
  const [v1, setV1] = useState(3);
  const [v2, setV2] = useState(-1);
  const [elastic, setElastic] = useState(true);
  const [running, setRunning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const stateRef = useRef({ x1: 0, x2: 0, v1c: 0, v2c: 0, collided: false });

  const reset = useCallback(() => {
    stateRef.current = { x1: 0.25, x2: 0.75, v1c: v1 * 0.003, v2c: v2 * 0.003, collided: false };
    setRunning(false);
  }, [v1, v2]);

  useEffect(() => { reset(); }, [reset]);

  // Final velocities for elastic collision
  const v1f_elastic = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
  const v1f_inelastic = (m1 * v1 + m2 * v2) / (m1 + m2);
  const v2f_elastic = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);

  const pInitial = m1 * v1 + m2 * v2;
  const keInitial = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2;
  const keFinal = elastic
    ? 0.5 * m1 * v1f_elastic * v1f_elastic + 0.5 * m2 * v2f_elastic * v2f_elastic
    : 0.5 * (m1 + m2) * v1f_inelastic * v1f_inelastic;

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
    const s = stateRef.current;

    const draw = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const trackY = h * 0.55;
      const trackH = 8;
      const gW1 = 30 + m1 * 8, gW2 = 30 + m2 * 8;
      const gH = 40;

      // Air track
      ctx.fillStyle = "rgba(100,200,255,0.08)";
      ctx.fillRect(w * 0.05, trackY - trackH / 2, w * 0.9, trackH);
      ctx.strokeStyle = "#00d4aa44"; ctx.lineWidth = 1;
      ctx.strokeRect(w * 0.05, trackY - trackH / 2, w * 0.9, trackH);
      // Air holes
      for (let i = 0; i < 30; i++) {
        const hx = w * 0.06 + i * (w * 0.88 / 30);
        ctx.fillStyle = "#00d4aa22";
        ctx.beginPath(); ctx.arc(hx, trackY, 2, 0, Math.PI * 2); ctx.fill();
      }
      // Track labels
      ctx.fillStyle = "#ffffff44"; ctx.font = "10px monospace";
      ctx.fillText("Air Track / المدرج الهوائي", w * 0.05, trackY + 25);

      // Update positions
      if (running) {
        s.x1 += s.v1c;
        s.x2 += s.v2c;
        // Check collision
        const px1 = w * 0.05 + s.x1 * w * 0.9;
        const px2 = w * 0.05 + s.x2 * w * 0.9;
        if (!s.collided && px1 + gW1 / 2 >= px2 - gW2 / 2) {
          s.collided = true;
          if (elastic) {
            s.v1c = ((m1 - m2) * s.v1c + 2 * m2 * s.v2c) / (m1 + m2);
            s.v2c = ((m2 - m1) * s.v2c + 2 * m1 * (s.v1c - ((m1 - m2) * s.v1c) / (m1 + m2))) / (m1 + m2);
            // Recalculate properly
            const ov1 = stateRef.current.v1c;
            s.v1c = v1f_elastic * 0.003;
            s.v2c = v2f_elastic * 0.003;
          } else {
            const vf = (m1 * s.v1c + m2 * s.v2c) / (m1 + m2);
            s.v1c = vf;
            s.v2c = vf;
          }
        }
        // Wall bounces
        if (s.x1 < 0.02) { s.x1 = 0.02; s.v1c = Math.abs(s.v1c); }
        if (s.x2 > 0.98) { s.x2 = 0.98; s.v2c = -Math.abs(s.v2c); }
        if (s.x1 > 0.98) { s.x1 = 0.98; s.v1c = -Math.abs(s.v1c); }
        if (s.x2 < 0.02) { s.x2 = 0.02; s.v2c = Math.abs(s.v2c); }
      }

      // Draw gliders
      const drawGlider = (x: number, gw: number, mass: number, color: string, label: string, vel: number) => {
        const px = w * 0.05 + x * w * 0.9;
        const gy = trackY - gH - trackH / 2;
        // Shadow
        ctx.fillStyle = color + "22";
        ctx.fillRect(px - gw / 2 + 3, gy + 3, gw, gH);
        // Body
        ctx.fillStyle = color + "33";
        ctx.strokeStyle = color; ctx.lineWidth = 2;
        ctx.fillRect(px - gw / 2, gy, gw, gH);
        ctx.strokeRect(px - gw / 2, gy, gw, gH);
        // Mass label
        ctx.fillStyle = color; ctx.font = "bold 12px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`${label}`, px, gy + 16);
        ctx.font = "10px monospace";
        ctx.fillText(`${mass}kg`, px, gy + 30);
        // Velocity arrow
        if (Math.abs(vel) > 0.0001) {
          const arrowLen = vel * 15;
          ctx.strokeStyle = color; ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(px, gy - 8);
          ctx.lineTo(px + arrowLen, gy - 8);
          ctx.stroke();
          // Arrow head
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.moveTo(px + arrowLen, gy - 8);
          ctx.lineTo(px + arrowLen - Math.sign(arrowLen) * 6, gy - 13);
          ctx.lineTo(px + arrowLen - Math.sign(arrowLen) * 6, gy - 3);
          ctx.closePath(); ctx.fill();
        }
        ctx.textAlign = "start";
      };

      drawGlider(s.x1, gW1, m1, "#00d4aa", "m₁", s.v1c);
      drawGlider(s.x2, gW2, m2, "#8b5cf6", "m₂", s.v2c);

      // Collision spark
      if (s.collided && running) {
        const px1 = w * 0.05 + s.x1 * w * 0.9;
        const px2 = w * 0.05 + s.x2 * w * 0.9;
        const sparkX = (px1 + px2) / 2;
        ctx.fillStyle = "#ffcc0066";
        ctx.beginPath(); ctx.arc(sparkX, trackY - gH / 2, 15 * Math.random(), 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [running, m1, m2, elastic, v1f_elastic, v2f_elastic]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-3 sm:gap-4 w-full">
      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden aspect-video relative w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="space-y-3 sm:space-y-4 w-full">
        <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 space-y-3">
          <h3 className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">{t('physics.common.controls')}</h3>
          <ParamSlider label="Mass 1 / كتلة ١" value={m1} min={0.5} max={5} step={0.5} unit="kg" onChange={v => { setM1(v); reset(); }} />
          <ParamSlider label="Mass 2 / كتلة ٢" value={m2} min={0.5} max={5} step={0.5} unit="kg" onChange={v => { setM2(v); reset(); }} />
          <ParamSlider label="Velocity 1 / سرعة ١" value={v1} min={-5} max={5} step={0.5} unit="m/s" onChange={v => { setV1(v); reset(); }} />
          <ParamSlider label="Velocity 2 / سرعة ٢" value={v2} min={-5} max={5} step={0.5} unit="m/s" onChange={v => { setV2(v); reset(); }} />
          <div className="flex gap-2">
            <button onClick={() => setElastic(true)} className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${elastic ? 'bg-primary/30 text-primary border border-primary/50' : 'bg-muted text-foreground'}`}>
              Elastic / مرن
            </button>
            <button onClick={() => setElastic(false)} className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${!elastic ? 'bg-secondary/30 text-secondary border border-secondary/50' : 'bg-muted text-foreground'}`}>
              Inelastic / غير مرن
            </button>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { reset(); setRunning(true); }} className="flex-1 py-2 rounded-lg text-xs font-bold bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30 transition">
              ▶ Start
            </button>
            <button onClick={reset} className="flex-1 py-2 rounded-lg text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30 transition">
              ↺ Reset
            </button>
          </div>
        </div>
        <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4">
          <h3 className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider mb-3">{t('physics.common.results')}</h3>
          <ResultDisplay items={[
            { label: "Momentum / الزخم", value: pInitial.toFixed(2), unit: "kg·m/s" },
            { label: "KE Initial / الطاقة الحركية", value: keInitial.toFixed(2), unit: "J" },
            { label: "KE Final / بعد التصادم", value: keFinal.toFixed(2), unit: "J" },
            { label: "KE Lost / الطاقة المفقودة", value: (keInitial - keFinal).toFixed(2), unit: "J" },
          ]} />
        </div>
      </div>
    </div>
  );
}

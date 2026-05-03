import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import { useTranslation } from "react-i18next";

function useCanvasSize() {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<() => void>(() => {});
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      const p = canvas.parentElement;
      if (!p) return;
      const r = p.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(r.width * dpr));
      canvas.height = Math.max(1, Math.floor(r.height * dpr));
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      drawRef.current();
    });
    ro.observe(canvas.parentElement!);
    return () => ro.disconnect();
  }, []);
  return { ref, drawRef };
}

function glass(className = "") {
  return `glass rounded-xl sm:rounded-2xl border border-white/[0.08] bg-white/[0.02] ${className}`;
}

/** Newton–Raphson on f(x)=x³−2x−5 */
export function NewtonMethodSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [x0, setX0] = useState(2.5);
  const [steps, setSteps] = useState(8);
  const f = (x: number) => x * x * x - 2 * x - 5;
  const fp = (x: number) => 3 * x * x - 2;

  const iter = useMemo(() => {
    const out: number[] = [];
    let x = x0;
    for (let i = 0; i <= steps; i++) {
      out.push(x);
      if (i < steps && Math.abs(fp(x)) > 1e-12) x = x - f(x) / fp(x);
    }
    return out;
  }, [x0, steps]);

  const { ref, drawRef } = useCanvasSize();
  const draw = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    const pad = 44 * (w / canvas.clientWidth);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, w, h);
    const xmin = -1;
    const xmax = 3.5;
    const ymin = -8;
    const ymax = 8;
    const sx = (x: number) => pad + ((x - xmin) / (xmax - xmin)) * (w - pad * 2);
    const sy = (y: number) => h - pad - ((y - ymin) / (ymax - ymin)) * (h - pad * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.beginPath();
    ctx.moveTo(sx(0), pad);
    ctx.lineTo(sx(0), h - pad);
    ctx.moveTo(pad, sy(0));
    ctx.lineTo(w - pad, sy(0));
    ctx.stroke();
    ctx.strokeStyle = "#a78bfa";
    ctx.lineWidth = 2 * (w / canvas.clientWidth);
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const x = xmin + (i / 200) * (xmax - xmin);
      const y = f(x);
      const px = sx(x);
      const py = sy(y);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    iter.forEach((xv, i) => {
      ctx.beginPath();
      ctx.arc(sx(xv), sy(0), 5 * (w / canvas.clientWidth), 0, Math.PI * 2);
      ctx.fillStyle = i === iter.length - 1 ? "#34d399" : "#f472b6";
      ctx.fill();
    });
  }, [iter, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  const last = iter[iter.length - 1];
  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glass()} overflow-hidden aspect-[16/10]`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className="space-y-3">
        <div className={`${glass()} p-4 space-y-2`}>
          <ParamSlider label="x₀" value={x0} min={-0.5} max={3.2} step={0.01} unit="" accent="violet" onChange={setX0} />
          <ParamSlider label={ar ? "خطوات" : "Steps"} value={steps} min={1} max={12} step={1} unit="" accent="violet" onChange={setSteps} />
          <p className="text-[11px] text-slate-500">f(x)=x³−2x−5 · x←x−f/f′</p>
        </div>
        <div className={`${glass()} p-4`}>
          <ResultDisplay items={[{ label: "x", value: last.toFixed(10), unit: "" }, { label: "f(x)", value: f(last).toExponential(4), unit: "" }]} />
        </div>
      </div>
    </div>
  );
}

/** Euler method: y′ = λy */
export function EulerOdeSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [lam, setLam] = useState(-0.8);
  const [y0, setY0] = useState(1);
  const [h, setH] = useState(0.15);
  const [n, setN] = useState(40);

  const { tArr, yEul, yExact } = useMemo(() => {
    const te: number[] = [];
    const ye: number[] = [];
    let y = y0;
    let t = 0;
    te.push(t);
    ye.push(y);
    for (let i = 0; i < n; i++) {
      y += h * lam * y;
      t += h;
      te.push(t);
      ye.push(y);
    }
    const yEx = te.map((tt) => y0 * Math.exp(lam * tt));
    return { tArr: te, yEul: ye, yExact: yEx };
  }, [lam, y0, h, n]);

  const { ref, drawRef } = useCanvasSize();
  const draw = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const hpx = canvas.height;
    const pad = 40 * (w / canvas.clientWidth);
    ctx.clearRect(0, 0, w, hpx);
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, w, hpx);
    const tmax = tArr[tArr.length - 1] || 1;
    const ymax = Math.max(1.2, ...yExact.map(Math.abs), ...yEul.map(Math.abs)) * 1.1;
    const sx = (t: number) => pad + (t / tmax) * (w - pad * 2);
    const sy = (y: number) => hpx - pad - (y / ymax) * (hpx - pad * 2);
    ctx.strokeStyle = "rgba(148,163,184,0.4)";
    ctx.lineWidth = 2 * (w / canvas.clientWidth);
    ctx.beginPath();
    yExact.forEach((yv, i) => {
      const px = sx(tArr[i]);
      const py = sy(yv);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
    ctx.strokeStyle = "#f472b6";
    ctx.lineWidth = 2 * (w / canvas.clientWidth);
    ctx.beginPath();
    yEul.forEach((yv, i) => {
      const px = sx(tArr[i]);
      const py = sy(yv);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
    yEul.forEach((yv, i) => {
      ctx.beginPath();
      ctx.arc(sx(tArr[i]), sy(yv), 3 * (w / canvas.clientWidth), 0, Math.PI * 2);
      ctx.fillStyle = "#fbbf24";
      ctx.fill();
    });
  }, [tArr, yEul, yExact, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glass()} overflow-hidden aspect-[16/10]`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className="space-y-3">
        <div className={`${glass()} p-4 space-y-2`}>
          <ParamSlider label="λ" value={lam} min={-2} max={0.5} step={0.02} unit="" accent="violet" onChange={setLam} />
          <ParamSlider label="y₀" value={y0} min={0.1} max={2} step={0.05} unit="" accent="violet" onChange={setY0} />
          <ParamSlider label="h" value={h} min={0.02} max={0.4} step={0.01} unit="" accent="violet" onChange={setH} />
          <ParamSlider label="n" value={n} min={5} max={80} step={1} unit="" accent="violet" onChange={setN} />
        </div>
        <p className="text-[11px] text-slate-500 px-1">
          {ar ? "رمادي: y₀e^{λt} — وردي: أويلر." : "Gray: exact y₀e^{λt} — pink: Euler."}
        </p>
      </div>
    </div>
  );
}

export function VectorAddSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [ux, setUx] = useState(2);
  const [uy, setUy] = useState(1);
  const [vx, setVx] = useState(1);
  const [vy, setVy] = useState(2);

  const { ref, drawRef } = useCanvasSize();
  const draw = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    const sc = Math.min(w, h) * 0.12;
    const p = (x: number, y: number) => ({ x: cx + x * sc, y: cy - y * sc });
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(w, cy);
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, h);
    ctx.stroke();
    const drawVec = (x: number, y: number, col: string, lw: number) => {
      const q = p(x, y);
      ctx.strokeStyle = col;
      ctx.lineWidth = lw * (w / canvas.clientWidth);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(q.x, q.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(q.x, q.y, 5 * (w / canvas.clientWidth), 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
    };
    drawVec(ux, uy, "#38bdf8", 2.5);
    drawVec(vx, vy, "#f472b6", 2.5);
    const sx = ux + vx;
    const sy = uy + vy;
    drawVec(sx, sy, "#a78bfa", 2.2);
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "rgba(167,139,250,0.35)";
    ctx.lineWidth = 1.2 * (w / canvas.clientWidth);
    ctx.beginPath();
    ctx.moveTo(p(ux, uy).x, p(ux, uy).y);
    ctx.lineTo(p(sx, sy).x, p(sx, sy).y);
    ctx.moveTo(p(vx, vy).x, p(vx, vy).y);
    ctx.lineTo(p(sx, sy).x, p(sx, sy).y);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [ux, uy, vx, vy, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  const area = ux * vy - uy * vx;

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glass()} overflow-hidden aspect-square max-h-[400px] mx-auto w-full`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className={`${glass()} p-4 space-y-2`}>
        <ParamSlider label="uₓ" value={ux} min={-4} max={4} step={0.05} unit="" accent="cyan" onChange={setUx} />
        <ParamSlider label="uᵧ" value={uy} min={-4} max={4} step={0.05} unit="" accent="cyan" onChange={setUy} />
        <ParamSlider label="vₓ" value={vx} min={-4} max={4} step={0.05} unit="" accent="cyan" onChange={setVx} />
        <ParamSlider label="vᵧ" value={vy} min={-4} max={4} step={0.05} unit="" accent="cyan" onChange={setVy} />
        <ResultDisplay
          items={[
            { label: "u+v", value: `(${ux + vx}, ${uy + vy})`, unit: "" },
            { label: ar ? "مساحة متوازي" : "|u×v|", value: Math.abs(area).toFixed(4), unit: "" },
          ]}
        />
      </div>
    </div>
  );
}

export function DotProductSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [ax, setAx] = useState(1);
  const [ay, setAy] = useState(0);
  const [bx, setBx] = useState(0.7);
  const [by, setBy] = useState(0.7);
  const dot = ax * bx + ay * by;
  const na = Math.hypot(ax, ay);
  const nb = Math.hypot(bx, by);
  const cos = na > 1e-12 && nb > 1e-12 ? dot / (na * nb) : 0;
  const ang = Math.acos(Math.max(-1, Math.min(1, cos)));

  const { ref, drawRef } = useCanvasSize();
  const draw = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    const sc = Math.min(w, h) * 0.18;
    const p = (x: number, y: number) => ({ x: cx + x * sc, y: cy - y * sc });
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.beginPath();
    ctx.moveTo(cx - sc * 5, cy);
    ctx.lineTo(cx + sc * 5, cy);
    ctx.moveTo(cx, cy - sc * 5);
    ctx.lineTo(cx, cy + sc * 5);
    ctx.stroke();
    for (const [x, y, c] of [
      [ax, ay, "#38bdf8"],
      [bx, by, "#f472b6"],
    ] as const) {
      const q = p(x, y);
      ctx.strokeStyle = c;
      ctx.lineWidth = 2.5 * (w / canvas.clientWidth);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(q.x, q.y);
      ctx.stroke();
    }
  }, [ax, ay, bx, by, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glass()} overflow-hidden aspect-square max-h-[400px] mx-auto w-full`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className={`${glass()} p-4 space-y-2`}>
        <ParamSlider label="aₓ" value={ax} min={-2} max={2} step={0.02} unit="" accent="violet" onChange={setAx} />
        <ParamSlider label="aᵧ" value={ay} min={-2} max={2} step={0.02} unit="" accent="violet" onChange={setAy} />
        <ParamSlider label="bₓ" value={bx} min={-2} max={2} step={0.02} unit="" accent="violet" onChange={setBx} />
        <ParamSlider label="bᵧ" value={by} min={-2} max={2} step={0.02} unit="" accent="violet" onChange={setBy} />
        <ResultDisplay
          items={[
            { label: "a·b", value: dot.toFixed(6), unit: "" },
            { label: "θ", value: ((ang * 180) / Math.PI).toFixed(2), unit: "°" },
          ]}
        />
        <p className="text-[11px] text-slate-500">cos θ = (a·b) / (|a||b|)</p>
      </div>
    </div>
  );
}

export function LissajousSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [A, setA] = useState(1);
  const [B, setB] = useState(1);
  const [a, setAfreq] = useState(3);
  const [b, setBfreq] = useState(2);
  const [phi, setPhi] = useState(0.5);

  const { ref, drawRef } = useCanvasSize();
  const draw = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    const sc = Math.min(w, h) * 0.35;
    ctx.strokeStyle = "#c4b5fd";
    ctx.lineWidth = 2 * (w / canvas.clientWidth);
    ctx.beginPath();
    for (let i = 0; i <= 800; i++) {
      const t = (i / 800) * Math.PI * 2;
      const x = A * Math.sin(a * t + phi);
      const y = B * Math.sin(b * t);
      const px = cx + x * sc;
      const py = cy - y * sc;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }, [A, B, a, b, phi, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glass()} overflow-hidden aspect-square max-h-[400px] mx-auto w-full`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className={`${glass()} p-4 space-y-2`}>
        <ParamSlider label="A" value={A} min={0.2} max={1.5} step={0.02} unit="" accent="violet" onChange={setA} />
        <ParamSlider label="B" value={B} min={0.2} max={1.5} step={0.02} unit="" accent="violet" onChange={setB} />
        <ParamSlider label="ω₁" value={a} min={1} max={6} step={1} unit="" accent="violet" onChange={setAfreq} />
        <ParamSlider label="ω₂" value={b} min={1} max={6} step={1} unit="" accent="violet" onChange={setBfreq} />
        <ParamSlider label="φ" value={phi} min={0} max={6.28} step={0.02} unit="rad" accent="violet" onChange={setPhi} />
        <p className="text-[11px] text-slate-500">{ar ? "x = A sin(ω₁t+φ), y = B sin(ω₂t)" : "Parametric Lissajous figure"}</p>
      </div>
    </div>
  );
}

type McPt = { x: number; y: number; ins: boolean };

export function MonteCarloPiSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [inside, setInside] = useState(0);
  const [total, setTotal] = useState(0);
  const [batch, setBatch] = useState(400);
  const [points, setPoints] = useState<McPt[]>([]);

  const addPoints = (n: number) => {
    let ins = inside;
    let tot = total;
    const next: McPt[] = [...points];
    for (let i = 0; i < n; i++) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const inn = x * x + y * y <= 1;
      tot++;
      if (inn) ins++;
      next.push({ x, y, ins: inn });
    }
    setPoints(next.slice(-4500));
    setInside(ins);
    setTotal(tot);
  };

  const reset = () => {
    setInside(0);
    setTotal(0);
    setPoints([]);
  };

  const piEst = total > 0 ? (4 * inside) / total : 0;

  const { ref, drawRef } = useCanvasSize();
  const draw = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, w, h);
    const pad = 24 * (w / canvas.clientWidth);
    const s = Math.min(w, h) - pad * 2;
    const cx = w / 2;
    const cy = h / 2;
    ctx.strokeStyle = "rgba(148,163,184,0.3)";
    ctx.strokeRect(cx - s / 2, cy - s / 2, s, s);
    ctx.beginPath();
    ctx.arc(cx, cy, s / 2, 0, Math.PI * 2);
    ctx.strokeStyle = "#a78bfa";
    ctx.lineWidth = 2 * (w / canvas.clientWidth);
    ctx.stroke();
    const dot = 1.8 * (w / canvas.clientWidth);
    points.forEach((p) => {
      const px = cx + (p.x * s) / 2;
      const py = cy - (p.y * s) / 2;
      ctx.fillStyle = p.ins ? "rgba(52,211,153,0.45)" : "rgba(244,114,182,0.25)";
      ctx.fillRect(px, py, dot, dot);
    });
  }, [points, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glass()} overflow-hidden aspect-square max-h-[400px] mx-auto w-full`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className="space-y-3">
        <div className={`${glass()} p-4 space-y-2`}>
          <ParamSlider label={ar ? "حجم الدفعة" : "Batch"} value={batch} min={50} max={2000} step={50} unit="" accent="violet" onChange={setBatch} />
          <div className="flex gap-2">
            <button type="button" onClick={() => addPoints(batch)} className="flex-1 py-2.5 rounded-xl bg-violet-500/25 border border-violet-400/35 text-sm font-semibold text-violet-100">
              {ar ? "أضف نقاطًا" : "Add points"}
            </button>
            <button type="button" onClick={reset} className="px-4 py-2.5 rounded-xl border border-white/10 text-sm text-slate-400 hover:text-white">
              {ar ? "صفر" : "Reset"}
            </button>
          </div>
        </div>
        <div className={`${glass()} p-4`}>
          <ResultDisplay
            items={[
              { label: "N", value: String(total), unit: "" },
              { label: ar ? "داخل" : "inside", value: String(inside), unit: "" },
              { label: "π ≈", value: total ? piEst.toFixed(8) : "—", unit: "" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export function GradientDescentSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [aa, setAa] = useState(1);
  const [bb, setBb] = useState(0.45);
  const [lr, setLr] = useState(0.15);
  const [steps, setSteps] = useState(25);

  const path = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    let x = 2.2;
    let y = 1.8;
    out.push({ x, y });
    for (let i = 0; i < steps; i++) {
      const gx = aa * x;
      const gy = bb * y;
      x -= lr * gx;
      y -= lr * gy;
      out.push({ x, y });
    }
    return out;
  }, [aa, bb, lr, steps]);

  const { ref, drawRef } = useCanvasSize();
  const draw = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    const sc = Math.min(w, h) * 0.14;
    const p = (x: number, y: number) => ({ x: cx + x * sc, y: cy - y * sc });
    ctx.strokeStyle = "rgba(139,92,246,0.12)";
    for (let k = 1; k <= 6; k++) {
      ctx.beginPath();
      ctx.arc(cx, cy, k * 22 * (w / canvas.clientWidth), 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.strokeStyle = "#a78bfa";
    ctx.lineWidth = 2 * (w / canvas.clientWidth);
    ctx.beginPath();
    path.forEach((pt, i) => {
      const q = p(pt.x, pt.y);
      if (i === 0) ctx.moveTo(q.x, q.y);
      else ctx.lineTo(q.x, q.y);
    });
    ctx.stroke();
    path.forEach((pt) => {
      const q = p(pt.x, pt.y);
      ctx.beginPath();
      ctx.arc(q.x, q.y, 4 * (w / canvas.clientWidth), 0, Math.PI * 2);
      ctx.fillStyle = "#34d399";
      ctx.fill();
    });
  }, [path, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  const last = path[path.length - 1];
  const f = 0.5 * (aa * last.x * last.x + bb * last.y * last.y);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glass()} overflow-hidden aspect-square max-h-[400px] mx-auto w-full`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className={`${glass()} p-4 space-y-2`}>
        <p className="text-[11px] text-slate-500 mb-1">f(x,y)=½(a x² + b y²)</p>
        <ParamSlider label="a" value={aa} min={0.2} max={2} step={0.02} unit="" accent="violet" onChange={setAa} />
        <ParamSlider label="b" value={bb} min={0.2} max={2} step={0.02} unit="" accent="violet" onChange={setBb} />
        <ParamSlider label="η" value={lr} min={0.02} max={0.35} step={0.01} unit="" accent="violet" onChange={setLr} />
        <ParamSlider label={ar ? "خطوات" : "Steps"} value={steps} min={5} max={60} step={1} unit="" accent="violet" onChange={setSteps} />
        <ResultDisplay items={[{ label: "f", value: f.toExponential(4), unit: "" }]} />
      </div>
    </div>
  );
}

export function LotkaVolterraSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [a, setA] = useState(0.08);
  const [b, setB] = useState(0.02);
  const [c, setC] = useState(0.03);
  const [d, setD] = useState(0.01);
  const [U0, setU0] = useState(40);
  const [V0, setV0] = useState(9);
  const [gens, setGens] = useState(200);

  const series = useMemo(() => {
    const U: number[] = [U0];
    const V: number[] = [V0];
    for (let i = 0; i < gens; i++) {
      const u = U[U.length - 1];
      const v = V[V.length - 1];
      const du = a * u - b * u * v;
      const dv = -c * v + d * u * v;
      U.push(Math.max(0.01, u + du));
      V.push(Math.max(0.01, v + dv));
    }
    return { U, V };
  }, [a, b, c, d, U0, V0, gens]);

  const { ref, drawRef } = useCanvasSize();
  const draw = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    const pad = 40 * (w / canvas.clientWidth);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, w, h);
    const maxU = Math.max(...series.U, 1);
    const maxV = Math.max(...series.V, 1);
    const sx = (i: number) => pad + (i / (series.U.length - 1)) * (w - pad * 2);
    const syU = (y: number) => h - pad - (y / maxU) * (h - pad * 2);
    const syV = (y: number) => h - pad - (y / maxV) * (h - pad * 2);
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2 * (w / canvas.clientWidth);
    ctx.beginPath();
    series.U.forEach((yv, i) => {
      const px = sx(i);
      const py = syU(yv);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
    ctx.strokeStyle = "#f472b6";
    ctx.beginPath();
    series.V.forEach((yv, i) => {
      const px = sx(i);
      const py = syV(yv);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
  }, [series, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glass()} overflow-hidden aspect-[16/9]`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className={`${glass()} p-4 space-y-2`}>
        <p className="text-[10px] text-slate-500 leading-relaxed">
          {ar ? "فريسة U، مفترس V — نموذج لوطكا-فولتيرا المنفصل" : "Prey U, predator V — discrete Lotka–Volterra"}
        </p>
        <ParamSlider label="a" value={a} min={0.01} max={0.2} step={0.005} unit="" accent="violet" onChange={setA} />
        <ParamSlider label="b" value={b} min={0.005} max={0.08} step={0.001} unit="" accent="violet" onChange={setB} />
        <ParamSlider label="c" value={c} min={0.01} max={0.12} step={0.005} unit="" accent="violet" onChange={setC} />
        <ParamSlider label="d" value={d} min={0.005} max={0.05} step={0.001} unit="" accent="violet" onChange={setD} />
        <ParamSlider label="U₀" value={U0} min={5} max={80} step={1} unit="" accent="violet" onChange={setU0} />
        <ParamSlider label="V₀" value={V0} min={1} max={40} step={1} unit="" accent="violet" onChange={setV0} />
        <ParamSlider label="T" value={gens} min={50} max={400} step={10} unit="" accent="violet" onChange={setGens} />
        <p className="text-[11px] text-slate-500">{ar ? "أزرق: فريسة — وردي: مفترس" : "Blue: prey — pink: predator"}</p>
      </div>
    </div>
  );
}

/** Julia set for c = re^{iθ}-style control (fixed iteration) */
export function JuliaSetSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [cx, setCx] = useState(-0.7269);
  const [cy, setCy] = useState(0.1889);
  const [zoom, setZoom] = useState(1.2);
  const [maxIter, setMaxIter] = useState(64);

  const { ref, drawRef } = useCanvasSize();
  const draw = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    const img = ctx.createImageData(w, h);
    const scale = 3.2 / (Math.min(w, h) * zoom);
    const jx = 0;
    const jy = 0;
    for (let j = 0; j < h; j++) {
      for (let i = 0; i < w; i++) {
        let zx = jx + (i - w / 2) * scale;
        let zy = jy - (j - h / 2) * scale;
        let n = 0;
        for (; n < maxIter; n++) {
          if (zx * zx + zy * zy > 4) break;
          const tmp = zx * zx - zy * zy + cx;
          zy = 2 * zx * zy + cy;
          zx = tmp;
        }
        const t = n / maxIter;
        const idx = (j * w + i) * 4;
        if (n === maxIter) {
          img.data[idx] = 8;
          img.data[idx + 1] = 6;
          img.data[idx + 2] = 20;
        } else {
          img.data[idx] = Math.floor(60 + 120 * t);
          img.data[idx + 1] = Math.floor(30 + 180 * (1 - t));
          img.data[idx + 2] = Math.floor(200 + 40 * t);
        }
        img.data[idx + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }, [cx, cy, zoom, maxIter, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glass()} overflow-hidden aspect-[4/3] max-h-[380px] mx-auto w-full`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className={`${glass()} p-4 space-y-2`}>
        <ParamSlider label="Re(c)" value={cx} min={-1} max={0.4} step={0.002} unit="" accent="violet" onChange={setCx} />
        <ParamSlider label="Im(c)" value={cy} min={-0.6} max={0.6} step={0.002} unit="" accent="violet" onChange={setCy} />
        <ParamSlider label={ar ? "تكبير" : "Zoom"} value={zoom} min={0.6} max={3} step={0.02} unit="×" accent="violet" onChange={setZoom} />
        <ParamSlider label={ar ? "تكرار" : "Iter"} value={maxIter} min={24} max={120} step={4} unit="" accent="violet" onChange={setMaxIter} />
        <p className="text-[11px] text-slate-500">z ← z² + c</p>
      </div>
    </div>
  );
}

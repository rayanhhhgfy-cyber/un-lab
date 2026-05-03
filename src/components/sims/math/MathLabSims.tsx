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

function glassPanel(className = "") {
  return `glass rounded-xl sm:rounded-2xl border border-white/[0.08] bg-white/[0.02] ${className}`;
}

/** ∫₀² x² dx vs Riemann rectangles (left endpoints) */
export function RiemannIntegralSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [n, setN] = useState(16);
  const a = 0;
  const b = 2;
  const f = (x: number) => x * x;
  const exact = (b ** 3 - a ** 3) / 3;
  const dx = (b - a) / n;
  let riemann = 0;
  for (let i = 0; i < n; i++) riemann += f(a + i * dx) * dx;
  const err = riemann - exact;

  const { ref, drawRef } = useCanvasSize();
  const draw = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    const pad = 48 * (w / canvas.clientWidth);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, w, h);
    const maxY = 5;
    const sx = (x: number) => pad + ((x - a) / (b - a)) * (w - pad * 2);
    const sy = (y: number) => h - pad - (y / maxY) * (h - pad * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    for (let g = 0; g <= 4; g++) {
      const yv = (g / 4) * maxY;
      ctx.beginPath();
      ctx.moveTo(pad, sy(yv));
      ctx.lineTo(w - pad, sy(yv));
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(139,92,246,0.35)";
    for (let i = 0; i < n; i++) {
      const x0 = a + i * dx;
      const x1 = x0 + dx;
      const fv = f(x0);
      ctx.fillStyle = "rgba(167,139,250,0.22)";
      ctx.fillRect(sx(x0), sy(fv), sx(x1) - sx(x0), sy(0) - sy(fv));
      ctx.strokeRect(sx(x0), sy(fv), sx(x1) - sx(x0), sy(0) - sy(fv));
    }
    ctx.strokeStyle = "#c4b5fd";
    ctx.lineWidth = 2.5 * (w / canvas.clientWidth);
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const x = a + (i / 200) * (b - a);
      const y = f(x);
      const px = sx(x);
      const py = sy(y);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.fillStyle = "#e9d5ff";
    ctx.font = `${12 * (w / canvas.clientWidth)}px ui-monospace, monospace`;
    ctx.fillText("y = x²", sx(0.15), sy(4.2));
  }, [n, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glassPanel()} overflow-hidden aspect-[16/10] relative w-full`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className="space-y-3">
        <div className={`${glassPanel()} p-4 space-y-3`}>
          <h3 className="text-xs font-semibold text-violet-300 uppercase tracking-wider">
            {ar ? "مجاميع ريمان" : "Riemann sum"}
          </h3>
          <ParamSlider label={ar ? "عدد المستطيلات (n)" : "Rectangles (n)"} value={n} min={2} max={80} step={1} unit="" accent="violet" onChange={setN} />
        </div>
        <div className={`${glassPanel()} p-4`}>
          <ResultDisplay
            items={[
              { label: ar ? "التكامل الحقيقي" : "Exact ∫₀² x² dx", value: exact.toFixed(6), unit: "" },
              { label: ar ? "مجموع ريمان" : "Riemann", value: riemann.toFixed(6), unit: "" },
              { label: ar ? "الخطأ" : "Error", value: err.toExponential(3), unit: "" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

/** Secant slope → derivative as h → 0 */
export function TangentSecantSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const f = (x: number) => x * x * x - 2 * x + 1;
  const fp = (x: number) => 3 * x * x - 2;
  const [x0, setX0] = useState(0.6);
  const [h, setH] = useState(0.35);
  const secant = (f(x0 + h) - f(x0)) / h;
  const trueD = fp(x0);

  const { ref, drawRef } = useCanvasSize();
  const draw = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const hpx = canvas.height;
    const pad = 44 * (w / canvas.clientWidth);
    ctx.clearRect(0, 0, w, hpx);
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, w, hpx);
    const xmin = -1.2;
    const xmax = 1.8;
    const ymin = -1.2;
    const ymax = 2.4;
    const sx = (x: number) => pad + ((x - xmin) / (xmax - xmin)) * (w - pad * 2);
    const sy = (y: number) => hpx - pad - ((y - ymin) / (ymax - ymin)) * (hpx - pad * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    for (let i = 0; i <= 10; i++) {
      const x = xmin + (i / 10) * (xmax - xmin);
      ctx.beginPath();
      ctx.moveTo(sx(x), pad);
      ctx.lineTo(sx(x), hpx - pad);
      ctx.stroke();
    }
    ctx.strokeStyle = "#a78bfa";
    ctx.lineWidth = 2.2 * (w / canvas.clientWidth);
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
    const y0 = f(x0);
    const y1 = f(x0 + h);
    ctx.strokeStyle = "#f472b6";
    ctx.lineWidth = 2 * (w / canvas.clientWidth);
    ctx.beginPath();
    ctx.moveTo(sx(xmin), sy(y0 + (secant * (xmin - x0))));
    ctx.lineTo(sx(xmax), sy(y0 + (secant * (xmax - x0))));
    ctx.stroke();
    ctx.strokeStyle = "#34d399";
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(sx(xmin), sy(y0 + (trueD * (xmin - x0))));
    ctx.lineTo(sx(xmax), sy(y0 + (trueD * (xmax - x0))));
    ctx.stroke();
    ctx.setLineDash([]);
    for (const [xv, yv, col] of [
      [x0, y0, "#fbbf24"],
      [x0 + h, y1, "#38bdf8"],
    ] as const) {
      ctx.beginPath();
      ctx.arc(sx(xv), sy(yv), 6 * (w / canvas.clientWidth), 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
    }
  }, [x0, h, secant, trueD, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glassPanel()} overflow-hidden aspect-[16/10]`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className="space-y-3">
        <div className={`${glassPanel()} p-4 space-y-3`}>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {ar
              ? "الخط الوردي: وتر (ميل تقريبي). الأخضر المنقط: مماس (f′ عند x₀)."
              : "Pink: secant slope. Green dashed: tangent (exact f′ at x₀)."}
          </p>
          <ParamSlider label="x₀" value={x0} min={-0.9} max={1.4} step={0.01} unit="" accent="violet" onChange={setX0} />
          <ParamSlider label="h" value={h} min={0.001} max={0.8} step={0.001} unit="" accent="violet" onChange={setH} />
        </div>
        <div className={`${glassPanel()} p-4`}>
          <ResultDisplay
            items={[
              { label: ar ? "ميل الوتر" : "Secant slope", value: secant.toFixed(6), unit: "" },
              { label: "f′(x₀)", value: trueD.toFixed(6), unit: "" },
              { label: ar ? "|فرق|" : "|Δ|", value: Math.abs(secant - trueD).toExponential(3), unit: "" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

/** Taylor polynomials for cos(x) at 0 */
export function TaylorCosSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [order, setOrder] = useState(6);
  const taylor = (x: number) => {
    let s = 0;
    let term = 1;
    s += term;
    for (let k = 1; k <= order; k += 2) {
      term *= (-x * x) / ((k + 1) * k);
      s += term;
    }
    return s;
  };

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
    const xmin = -4;
    const xmax = 4;
    const ymin = -1.6;
    const ymax = 1.6;
    const sx = (x: number) => pad + ((x - xmin) / (xmax - xmin)) * (w - pad * 2);
    const sy = (y: number) => h - pad - ((y - ymin) / (ymax - ymin)) * (h - pad * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.beginPath();
    ctx.moveTo(sx(0), pad);
    ctx.lineTo(sx(0), h - pad);
    ctx.moveTo(pad, sy(0));
    ctx.lineTo(w - pad, sy(0));
    ctx.stroke();
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 2 * (w / canvas.clientWidth);
    ctx.beginPath();
    for (let i = 0; i <= 240; i++) {
      const x = xmin + (i / 240) * (xmax - xmin);
      const y = Math.cos(x);
      const px = sx(x);
      const py = sy(y);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.strokeStyle = "#c084fc";
    ctx.lineWidth = 2.2 * (w / canvas.clientWidth);
    ctx.beginPath();
    for (let i = 0; i <= 240; i++) {
      const x = xmin + (i / 240) * (xmax - xmin);
      const y = taylor(x);
      if (Math.abs(y) > 8) continue;
      const px = sx(x);
      const py = sy(y);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }, [order, ref, taylor]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  const sampleX = 1.2;
  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glassPanel()} overflow-hidden aspect-[16/10]`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className="space-y-3">
        <div className={`${glassPanel()} p-4 space-y-3`}>
          <ParamSlider label={ar ? "أقصى درجة فردية" : "Max odd degree"} value={order} min={0} max={15} step={2} unit="" accent="violet" onChange={setOrder} />
          <p className="text-[11px] text-slate-500">{ar ? "رمادي: cos(x) — بنفسجي: متعددة حدود تايلور عند 0" : "Gray: cos(x) — Violet: Maclaurin poly"}</p>
        </div>
        <div className={`${glassPanel()} p-4`}>
          <ResultDisplay
            items={[
              { label: "cos(1.2)", value: Math.cos(sampleX).toFixed(6), unit: "" },
              { label: "T(1.2)", value: taylor(sampleX).toFixed(6), unit: "" },
              { label: ar ? "خطأ" : "err", value: (taylor(sampleX) - Math.cos(sampleX)).toExponential(2), unit: "" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export function QuadraticRootsSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(-1);
  const disc = b * b - 4 * a * c;
  const roots = useMemo(() => {
    if (Math.abs(a) < 1e-9) return { type: "linear" as const, x: -c / b };
    if (disc > 1e-8) {
      const s = Math.sqrt(disc);
      return { type: "two" as const, x1: (-b - s) / (2 * a), x2: (-b + s) / (2 * a) };
    }
    if (Math.abs(disc) <= 1e-8) return { type: "one" as const, x: -b / (2 * a) };
    const re = -b / (2 * a);
    const im = Math.sqrt(-disc) / (2 * a);
    return { type: "complex" as const, re, im };
  }, [a, b, c, disc]);

  const f = (x: number) => a * x * x + b * x + c;

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
    const xrange = 3.5;
    const xmin = -xrange;
    const xmax = xrange;
    const ymin = -3;
    const ymax = 4;
    const sx = (x: number) => pad + ((x - xmin) / (xmax - xmin)) * (w - pad * 2);
    const sy = (y: number) => h - pad - ((y - ymin) / (ymax - ymin)) * (h - pad * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.07)";
    ctx.beginPath();
    ctx.moveTo(sx(0), pad);
    ctx.lineTo(sx(0), h - pad);
    ctx.moveTo(pad, sy(0));
    ctx.lineTo(w - pad, sy(0));
    ctx.stroke();
    ctx.strokeStyle = "#22d3ee";
    ctx.lineWidth = 2.2 * (w / canvas.clientWidth);
    ctx.beginPath();
    for (let i = 0; i <= 300; i++) {
      const x = xmin + (i / 300) * (xmax - xmin);
      const y = f(x);
      if (Math.abs(y) > 20) continue;
      const px = sx(x);
      const py = sy(y);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    if (roots.type === "two") {
      for (const xr of [roots.x1, roots.x2]) {
        ctx.beginPath();
        ctx.arc(sx(xr), sy(0), 5 * (w / canvas.clientWidth), 0, Math.PI * 2);
        ctx.fillStyle = "#f472b6";
        ctx.fill();
      }
    } else if (roots.type === "one") {
      ctx.beginPath();
      ctx.arc(sx(roots.x), sy(0), 5 * (w / canvas.clientWidth), 0, Math.PI * 2);
      ctx.fillStyle = "#fbbf24";
      ctx.fill();
    }
  }, [a, b, c, f, roots, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glassPanel()} overflow-hidden aspect-[16/10]`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className="space-y-3">
        <div className={`${glassPanel()} p-4 space-y-2`}>
          <ParamSlider label="a" value={a} min={-2} max={2} step={0.05} unit="" accent="cyan" onChange={setA} />
          <ParamSlider label="b" value={b} min={-3} max={3} step={0.05} unit="" accent="cyan" onChange={setB} />
          <ParamSlider label="c" value={c} min={-3} max={3} step={0.05} unit="" accent="cyan" onChange={setC} />
        </div>
        <div className={`${glassPanel()} p-4 space-y-2 text-xs`}>
          <p className="text-violet-300 font-semibold">Δ = b² − 4ac = {disc.toFixed(4)}</p>
          {roots.type === "two" && (
            <ResultDisplay items={[{ label: "x₁", value: roots.x1.toFixed(4), unit: "" }, { label: "x₂", value: roots.x2.toFixed(4), unit: "" }]} />
          )}
          {roots.type === "one" && <ResultDisplay items={[{ label: "x", value: roots.x.toFixed(4), unit: "" }]} />}
          {roots.type === "complex" && (
            <p className="text-slate-300">
              {ar ? "جذران مركبان: " : "Complex roots: "}
              {roots.re.toFixed(3)} ± {roots.im.toFixed(3)}i
            </p>
          )}
          {roots.type === "linear" && <p className="text-amber-300">{ar ? "تفرد خطي (a≈0)" : "Nearly linear (a≈0)"}</p>}
        </div>
      </div>
    </div>
  );
}

export function ComplexMultiplySim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [r1, setR1] = useState(1.2);
  const [t1, setT1] = useState(0.5);
  const [r2, setR2] = useState(0.9);
  const [t2, setT2] = useState(1.1);
  const z1 = { re: r1 * Math.cos(t1), im: r1 * Math.sin(t1) };
  const z2 = { re: r2 * Math.cos(t2), im: r2 * Math.sin(t2) };
  const prod = { re: z1.re * z2.re - z1.im * z2.im, im: z1.re * z2.im + z1.im * z2.re };

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
    const scale = Math.min(w, h) * 0.32;
    const px = (re: number, im: number) => ({ x: cx + re * scale, y: cy - im * scale });
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.beginPath();
    ctx.arc(cx, cy, scale * 2.2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    for (let k = 1; k <= 2; k++) {
      ctx.beginPath();
      ctx.arc(cx, cy, scale * k, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.beginPath();
    ctx.moveTo(cx - scale * 2.5, cy);
    ctx.lineTo(cx + scale * 2.5, cy);
    ctx.moveTo(cx, cy - scale * 2.5);
    ctx.lineTo(cx, cy + scale * 2.5);
    ctx.stroke();
    const drawVec = (z: { re: number; im: number }, col: string) => {
      const p = px(z.re, z.im);
      ctx.strokeStyle = col;
      ctx.lineWidth = 2.5 * (w / canvas.clientWidth);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5 * (w / canvas.clientWidth), 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
    };
    drawVec(z1, "#38bdf8");
    drawVec(z2, "#f472b6");
    drawVec(prod, "#a78bfa");
  }, [z1, z2, prod, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glassPanel()} overflow-hidden aspect-square max-h-[420px] mx-auto w-full`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className="space-y-3">
        <div className={`${glassPanel()} p-4 space-y-2`}>
          <p className="text-[11px] text-slate-400 mb-1">{ar ? "z₁ أزرق، z₂ وردي، z₁z₂ بنفسجي" : "z₁ blue, z₂ pink, product violet"}</p>
          <ParamSlider label="|z₁|" value={r1} min={0.2} max={2.2} step={0.02} unit="" accent="cyan" onChange={setR1} />
          <ParamSlider label="arg z₁" value={t1} min={0} max={6.28} step={0.02} unit="rad" accent="cyan" onChange={setT1} />
          <ParamSlider label="|z₂|" value={r2} min={0.2} max={2.2} step={0.02} unit="" accent="cyan" onChange={setR2} />
          <ParamSlider label="arg z₂" value={t2} min={0} max={6.28} step={0.02} unit="rad" accent="cyan" onChange={setT2} />
        </div>
        <div className={`${glassPanel()} p-4`}>
          <ResultDisplay
            items={[
              { label: "z₁", value: `${z1.re.toFixed(3)} + ${z1.im.toFixed(3)}i`, unit: "" },
              { label: "z₂", value: `${z2.re.toFixed(3)} + ${z2.im.toFixed(3)}i`, unit: "" },
              { label: "z₁z₂", value: `${prod.re.toFixed(3)} + ${prod.im.toFixed(3)}i`, unit: "" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export function UnitCircleSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [theta, setTheta] = useState(0.7);
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  const tan = Math.cos(theta) !== 0 ? Math.sin(theta) / Math.cos(theta) : NaN;

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
    const R = Math.min(w, h) * 0.36;
    ctx.strokeStyle = "rgba(148,163,184,0.35)";
    ctx.lineWidth = 2 * (w / canvas.clientWidth);
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.beginPath();
    ctx.moveTo(cx - R * 1.3, cy);
    ctx.lineTo(cx + R * 1.3, cy);
    ctx.moveTo(cx, cy - R * 1.3);
    ctx.lineTo(cx, cy + R * 1.3);
    ctx.stroke();
    const px = cx + R * cos;
    const py = cy - R * sin;
    ctx.strokeStyle = "#34d399";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px, cy);
    ctx.stroke();
    ctx.strokeStyle = "#60a5fa";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, cy);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = "#fbbf24";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, py);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.18, -theta, 0, true);
    ctx.strokeStyle = "rgba(167,139,250,0.8)";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(px, py, 6 * (w / canvas.clientWidth), 0, Math.PI * 2);
    ctx.fillStyle = "#f472b6";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, 4 * (w / canvas.clientWidth), 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }, [theta, cos, sin, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glassPanel()} overflow-hidden aspect-square max-h-[400px] mx-auto w-full`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className="space-y-3">
        <div className={`${glassPanel()} p-4 space-y-3`}>
          <ParamSlider label="θ" value={theta} min={0} max={6.283} step={0.01} unit="rad" accent="violet" onChange={setTheta} />
        </div>
        <div className={`${glassPanel()} p-4`}>
          <ResultDisplay
            items={[
              { label: "cos θ", value: cos.toFixed(5), unit: "" },
              { label: "sin θ", value: sin.toFixed(5), unit: "" },
              { label: "tan θ", value: Number.isFinite(tan) ? tan.toFixed(5) : ar ? "∞" : "∞", unit: "" },
              { label: "θ°", value: ((theta * 180) / Math.PI).toFixed(2), unit: "°" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export function WaveSuperpositionSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [a1, setA1] = useState(1);
  const [a2, setA2] = useState(0.7);
  const [phi, setPhi] = useState(1.2);
  const k = 2;

  const { ref, drawRef } = useCanvasSize();
  const draw = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    const pad = 36 * (w / canvas.clientWidth);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, w, h);
    const xmin = 0;
    const xmax = Math.PI * 2;
    const ymin = -2.2;
    const ymax = 2.2;
    const sx = (x: number) => pad + ((x - xmin) / (xmax - xmin)) * (w - pad * 2);
    const sy = (y: number) => h - pad - ((y - ymin) / (ymax - ymin)) * (h - pad * 2);
    const plot = (fn: (x: number) => number, col: string) => {
      ctx.strokeStyle = col;
      ctx.lineWidth = 2 * (w / canvas.clientWidth);
      ctx.beginPath();
      for (let i = 0; i <= 280; i++) {
        const x = xmin + (i / 280) * (xmax - xmin);
        const y = fn(x);
        const px = sx(x);
        const py = sy(y);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    };
    plot((x) => a1 * Math.sin(k * x), "rgba(56,189,248,0.7)");
    plot((x) => a2 * Math.sin(k * x + phi), "rgba(244,114,182,0.7)");
    plot((x) => a1 * Math.sin(k * x) + a2 * Math.sin(k * x + phi), "#c4b5fd");
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.beginPath();
    ctx.moveTo(pad, sy(0));
    ctx.lineTo(w - pad, sy(0));
    ctx.stroke();
  }, [a1, a2, phi, k, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glassPanel()} overflow-hidden aspect-[16/9]`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className="space-y-3">
        <div className={`${glassPanel()} p-4 space-y-2`}>
          <ParamSlider label="A₁" value={a1} min={0} max={1.5} step={0.02} unit="" accent="violet" onChange={setA1} />
          <ParamSlider label="A₂" value={a2} min={0} max={1.5} step={0.02} unit="" accent="violet" onChange={setA2} />
          <ParamSlider label="φ" value={phi} min={0} max={6.28} step={0.02} unit="rad" accent="violet" onChange={setPhi} />
          <p className="text-[11px] text-slate-500">{ar ? "بنفسجي: المجموع — تداخل بنّاء وهادم" : "Violet: sum — try phase for beats"}</p>
        </div>
      </div>
    </div>
  );
}

export function FourierSquareSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [terms, setTerms] = useState(5);
  const partial = (x: number) => {
    let s = 0;
    for (let n = 0; n < terms; n++) {
      const k = 2 * n + 1;
      s += (4 / Math.PI) * Math.sin(k * x) / k;
    }
    return s;
  };

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
    const xmin = -0.2;
    const xmax = Math.PI * 2 + 0.2;
    const ymin = -1.4;
    const ymax = 1.4;
    const sx = (x: number) => pad + ((x - xmin) / (xmax - xmin)) * (w - pad * 2);
    const sy = (y: number) => h - pad - ((y - ymin) / (ymax - ymin)) * (h - pad * 2);
    ctx.strokeStyle = "rgba(248,113,113,0.35)";
    ctx.lineWidth = 1.5 * (w / canvas.clientWidth);
    ctx.beginPath();
    for (let i = 0; i <= 400; i++) {
      const x = xmin + (i / 400) * (xmax - xmin);
      const y = Math.sign(Math.sin(x));
      const px = sx(x);
      const py = sy(y);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.strokeStyle = "#a78bfa";
    ctx.lineWidth = 2.2 * (w / canvas.clientWidth);
    ctx.beginPath();
    for (let i = 0; i <= 400; i++) {
      const x = xmin + (i / 400) * (xmax - xmin);
      const y = partial(x);
      const px = sx(x);
      const py = sy(y);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }, [terms, partial, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glassPanel()} overflow-hidden aspect-[16/9]`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className={`${glassPanel()} p-4 space-y-3`}>
        <ParamSlider label={ar ? "عدد الجيبات" : "Sine terms"} value={terms} min={1} max={40} step={1} unit="" accent="violet" onChange={setTerms} />
        <p className="text-[11px] text-slate-400">
          {ar
            ? "أحمر: موجة مربعة مثالية — بنفسجي: مجموع فورييه (جيبات فردية)."
            : "Red: ideal square wave — violet: Fourier partial sum of odd harmonics."}
        </p>
      </div>
    </div>
  );
}

export function LinearTransform2DSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [a, setA] = useState(1.1);
  const [b, setB] = useState(0.35);
  const [c, setC] = useState(-0.2);
  const [d, setD] = useState(0.95);
  const det = a * d - b * c;

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
    const S = Math.min(w, h) * 0.1;
    const T = (x: number, y: number) => ({ x: a * x + b * y, y: c * x + d * y });
    const drawGrid = (alpha: number) => {
      ctx.strokeStyle = `rgba(148,163,184,${alpha})`;
      ctx.lineWidth = 1;
      for (let i = -6; i <= 6; i++) {
        const p0 = T(i * S, -6 * S);
        const p1 = T(i * S, 6 * S);
        ctx.beginPath();
        ctx.moveTo(cx + p0.x, cy - p0.y);
        ctx.lineTo(cx + p1.x, cy - p1.y);
        ctx.stroke();
        const q0 = T(-6 * S, i * S);
        const q1 = T(6 * S, i * S);
        ctx.beginPath();
        ctx.moveTo(cx + q0.x, cy - q0.y);
        ctx.lineTo(cx + q1.x, cy - q1.y);
        ctx.stroke();
      }
    };
    drawGrid(0.07);
    ctx.strokeStyle = "rgba(56,189,248,0.45)";
    ctx.lineWidth = 2 * (w / canvas.clientWidth);
    const u = T(S, 0);
    const v = T(0, S);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + u.x, cy - u.y);
    ctx.stroke();
    ctx.strokeStyle = "rgba(244,114,182,0.45)";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + v.x, cy - v.y);
    ctx.stroke();
    ctx.fillStyle = "rgba(167,139,250,0.12)";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + u.x, cy - u.y);
    ctx.lineTo(cx + u.x + v.x, cy - u.y - v.y);
    ctx.lineTo(cx + v.x, cy - v.y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(196,181,253,0.5)";
    ctx.stroke();
  }, [a, b, c, d, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glassPanel()} overflow-hidden aspect-square max-h-[420px] mx-auto w-full`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className="space-y-3">
        <div className={`${glassPanel()} p-4 space-y-2`}>
          <p className="text-[10px] font-mono text-slate-500 mb-1">[x′, y′]ᵀ = [[a,b],[c,d]] [x,y]ᵀ</p>
          <ParamSlider label="a" value={a} min={-1.5} max={1.5} step={0.02} unit="" accent="violet" onChange={setA} />
          <ParamSlider label="b" value={b} min={-1.5} max={1.5} step={0.02} unit="" accent="violet" onChange={setB} />
          <ParamSlider label="c" value={c} min={-1.5} max={1.5} step={0.02} unit="" accent="violet" onChange={setC} />
          <ParamSlider label="d" value={d} min={-1.5} max={1.5} step={0.02} unit="" accent="violet" onChange={setD} />
        </div>
        <div className={`${glassPanel()} p-4`}>
          <ResultDisplay items={[{ label: ar ? "المحدد det" : "det", value: det.toFixed(4), unit: ar ? "(مساحة)" : "(area)" }]} />
        </div>
      </div>
    </div>
  );
}

export function BezierCurveSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [x1, setX1] = useState(0.15);
  const [y1, setY1] = useState(0.85);
  const [x2, setX2] = useState(0.75);
  const [y2, setY2] = useState(0.85);
  const p0 = { x: 0.1, y: 0.5 };
  const p3 = { x: 0.9, y: 0.5 };
  const bez = (t: number) => {
    const u = 1 - t;
    return {
      x: u ** 3 * p0.x + 3 * u ** 2 * t * x1 + 3 * u * t ** 2 * x2 + t ** 3 * p3.x,
      y: u ** 3 * p0.y + 3 * u ** 2 * t * y1 + 3 * u * t ** 2 * y2 + t ** 3 * p3.y,
    };
  };

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
    const sx = (x: number) => x * w;
    const sy = (y: number) => y * h;
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.strokeRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(148,163,184,0.25)";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(sx(p0.x), sy(p0.y));
    ctx.lineTo(sx(x1), sy(y1));
    ctx.moveTo(sx(p3.x), sy(p3.y));
    ctx.lineTo(sx(x2), sy(y2));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = "#c4b5fd";
    ctx.lineWidth = 2.5 * (w / canvas.clientWidth);
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const p = bez(t);
      const px = sx(p.x);
      const py = sy(p.y);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    for (const [pt, col] of [
      [p0, "#38bdf8"],
      [{ x: x1, y: y1 }, "#fbbf24"],
      [{ x: x2, y: y2 }, "#f472b6"],
      [p3, "#34d399"],
    ] as const) {
      ctx.beginPath();
      ctx.arc(sx(pt.x), sy(pt.y), 6 * (w / canvas.clientWidth), 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
    }
  }, [x1, y1, x2, y2, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glassPanel()} overflow-hidden aspect-[16/10]`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className={`${glassPanel()} p-4 space-y-2`}>
        <ParamSlider label="P₁ x" value={x1} min={0.05} max={0.95} step={0.01} unit="" accent="violet" onChange={setX1} />
        <ParamSlider label="P₁ y" value={y1} min={0.05} max={0.95} step={0.01} unit="" accent="violet" onChange={setY1} />
        <ParamSlider label="P₂ x" value={x2} min={0.05} max={0.95} step={0.01} unit="" accent="violet" onChange={setX2} />
        <ParamSlider label="P₂ y" value={y2} min={0.05} max={0.95} step={0.01} unit="" accent="violet" onChange={setY2} />
        <p className="text-[11px] text-slate-500">{ar ? "منحنى بيزيير مكعب — نقاط التحكم الصفراء/الوردية" : "Cubic Bézier — yellow/pink control points"}</p>
      </div>
    </div>
  );
}

export function MandelbrotSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [maxIter, setMaxIter] = useState(80);
  const [zoom, setZoom] = useState(1);
  const [cx0, setCx0] = useState(-0.5);
  const [cy0, setCy0] = useState(0);

  const { ref, drawRef } = useCanvasSize();
  const draw = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    const img = ctx.createImageData(w, h);
    const scale = 4 / (Math.min(w, h) * zoom);
    for (let j = 0; j < h; j++) {
      for (let i = 0; i < w; i++) {
        const re = cx0 + (i - w / 2) * scale;
        const im = cy0 - (j - h / 2) * scale;
        let zr = 0;
        let zi = 0;
        let n = 0;
        for (; n < maxIter; n++) {
          const r2 = zr * zr + zi * zi;
          if (r2 > 4) break;
          const tmp = zr * zr - zi * zi + re;
          zi = 2 * zr * zi + im;
          zr = tmp;
        }
        const t = n / maxIter;
        const idx = (j * w + i) * 4;
        if (n === maxIter) {
          img.data[idx] = 10;
          img.data[idx + 1] = 8;
          img.data[idx + 2] = 18;
          img.data[idx + 3] = 255;
        } else {
          img.data[idx] = Math.floor(80 + 140 * t);
          img.data[idx + 1] = Math.floor(40 + 180 * (1 - t));
          img.data[idx + 2] = Math.floor(200 + 55 * t);
          img.data[idx + 3] = 255;
        }
      }
    }
    ctx.putImageData(img, 0, 0);
  }, [maxIter, zoom, cx0, cy0, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glassPanel()} overflow-hidden aspect-[4/3] max-h-[380px] mx-auto w-full`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className={`${glassPanel()} p-4 space-y-2`}>
        <ParamSlider label={ar ? "أقصى تكرار" : "Max iter"} value={maxIter} min={20} max={200} step={5} unit="" accent="violet" onChange={setMaxIter} />
        <ParamSlider label={ar ? "تكبير" : "Zoom"} value={zoom} min={0.5} max={6} step={0.05} unit="×" accent="violet" onChange={setZoom} />
        <ParamSlider label="Re(center)" value={cx0} min={-1.5} max={0.6} step={0.005} unit="" accent="violet" onChange={setCx0} />
        <ParamSlider label="Im(center)" value={cy0} min={-1.2} max={1.2} step={0.005} unit="" accent="violet" onChange={setCy0} />
        <p className="text-[11px] text-slate-500">z ← z² + c · escape radius 2</p>
      </div>
    </div>
  );
}

export function NormalDistributionSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);
  const pdf = (x: number) => (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sigma) ** 2);

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
    const xmin = mu - 4 * sigma;
    const xmax = mu + 4 * sigma;
    const ymax = pdf(mu) * 1.15;
    const sx = (x: number) => pad + ((x - xmin) / (xmax - xmin)) * (w - pad * 2);
    const sy = (y: number) => h - pad - (y / ymax) * (h - pad * 2);
    ctx.fillStyle = "rgba(167,139,250,0.2)";
    ctx.beginPath();
    ctx.moveTo(sx(mu - sigma), sy(0));
    for (let i = 0; i <= 120; i++) {
      const x = mu - sigma + (i / 120) * (2 * sigma);
      ctx.lineTo(sx(x), sy(pdf(x)));
    }
    ctx.lineTo(sx(mu + sigma), sy(0));
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#c4b5fd";
    ctx.lineWidth = 2.2 * (w / canvas.clientWidth);
    ctx.beginPath();
    for (let i = 0; i <= 240; i++) {
      const x = xmin + (i / 240) * (xmax - xmin);
      const y = pdf(x);
      const px = sx(x);
      const py = sy(y);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.beginPath();
    ctx.moveTo(pad, sy(0));
    ctx.lineTo(w - pad, sy(0));
    ctx.stroke();
  }, [mu, sigma, pdf, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  const approx68 = 0.68268949;

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glassPanel()} overflow-hidden aspect-[16/9]`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className="space-y-3">
        <div className={`${glassPanel()} p-4 space-y-2`}>
          <ParamSlider label="μ" value={mu} min={-2} max={2} step={0.05} unit="" accent="violet" onChange={setMu} />
          <ParamSlider label="σ" value={sigma} min={0.3} max={2} step={0.02} unit="" accent="violet" onChange={setSigma} />
        </div>
        <div className={`${glassPanel()} p-4 text-xs text-slate-300`}>
          <p>{ar ? "المنطقة المظللة: μ ± σ (≈68.3% للنورمال القياسي)." : "Shaded: μ ± σ (≈68.3% mass for Gaussian)."}</p>
          <p className="mt-2 font-mono text-violet-300">P(μ−σ &lt; X &lt; μ+σ) ≈ {(approx68 * 100).toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
}

export function BinomialGaltonSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [nTrials, setNTrials] = useState(24);
  const [p, setP] = useState(0.5);
  const [samples, setSamples] = useState<number[]>([]);

  const run = useCallback(() => {
    const bins = Array.from({ length: nTrials + 1 }, () => 0);
    for (let s = 0; s < 4000; s++) {
      let k = 0;
      for (let i = 0; i < nTrials; i++) if (Math.random() < p) k++;
      bins[k]++;
    }
    setSamples(bins);
  }, [nTrials, p]);

  useEffect(() => {
    run();
  }, [run]);

  const mean = nTrials * p;
  const var_ = nTrials * p * (1 - p);

  const { ref, drawRef } = useCanvasSize();
  const draw = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    const pad = 36 * (w / canvas.clientWidth);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, w, h);
    const maxC = Math.max(1, ...samples);
    const n = samples.length;
    for (let k = 0; k < n; k++) {
      const bw = (w - pad * 2) / n;
      const bh = ((h - pad * 2) * samples[k]) / maxC;
      const x = pad + k * bw;
      const y = h - pad - bh;
      const hue = 260 + (k / n) * 60;
      ctx.fillStyle = `hsla(${hue},70%,60%,0.75)`;
      ctx.fillRect(x + 1, y, bw - 2, bh);
    }
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.beginPath();
    ctx.moveTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();
  }, [samples, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glassPanel()} overflow-hidden aspect-[16/9]`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className="space-y-3">
        <div className={`${glassPanel()} p-4 space-y-2`}>
          <ParamSlider label={ar ? "تجارب n" : "Trials n"} value={nTrials} min={8} max={48} step={1} unit="" accent="violet" onChange={setNTrials} />
          <ParamSlider label="p" value={p} min={0.1} max={0.9} step={0.01} unit="" accent="violet" onChange={setP} />
          <button type="button" onClick={run} className="w-full py-2.5 rounded-xl bg-violet-500/20 border border-violet-400/30 text-violet-200 text-sm font-semibold hover:bg-violet-500/30 transition">
            {ar ? "إعادة محاكاة" : "Resample"}
          </button>
        </div>
        <div className={`${glassPanel()} p-4`}>
          <ResultDisplay
            items={[
              { label: "E[X]", value: mean.toFixed(3), unit: "" },
              { label: "Var(X)", value: var_.toFixed(3), unit: "" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export function LogisticMapSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [r, setR] = useState(3.2);
  const [x0, setX0] = useState(0.2);
  const series = useMemo(() => {
    const out: number[] = [];
    let x = x0;
    for (let i = 0; i < 120; i++) {
      out.push(x);
      x = r * x * (1 - x);
    }
    return out;
  }, [r, x0]);

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
    const sx = (i: number) => pad + (i / (series.length - 1)) * (w - pad * 2);
    const sy = (y: number) => h - pad - y * (h - pad * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.beginPath();
    ctx.moveTo(pad, sy(0));
    ctx.lineTo(w - pad, sy(0));
    ctx.moveTo(pad, sy(1));
    ctx.lineTo(w - pad, sy(1));
    ctx.stroke();
    ctx.strokeStyle = "#a78bfa";
    ctx.lineWidth = 2 * (w / canvas.clientWidth);
    ctx.beginPath();
    series.forEach((y, i) => {
      const px = sx(i);
      const py = sy(y);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
    ctx.fillStyle = "#f472b6";
    series.forEach((y, i) => {
      ctx.beginPath();
      ctx.arc(sx(i), sy(y), 2.2 * (w / canvas.clientWidth), 0, Math.PI * 2);
      ctx.fill();
    });
  }, [series, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glassPanel()} overflow-hidden aspect-[16/9]`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className="space-y-3">
        <div className={`${glassPanel()} p-4 space-y-2`}>
          <ParamSlider label="r" value={r} min={2.5} max={4} step={0.001} unit="" accent="violet" onChange={setR} />
          <ParamSlider label="x₀" value={x0} min={0.01} max={0.99} step={0.01} unit="" accent="violet" onChange={setX0} />
          <p className="text-[11px] text-slate-400">xₙ₊₁ = r xₙ (1 − xₙ)</p>
        </div>
        <div className={`${glassPanel()} p-4 text-xs text-slate-300`}>
          {ar
            ? "جرّب r > 3.57 لرؤية سلوك فوضوي تقريبي (منطقات نطاقية)."
            : "Try r ≳ 3.57 for chaotic bands — a discrete population model."}
        </div>
      </div>
    </div>
  );
}

export function FibonacciSpiralSim() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [count, setCount] = useState(10);
  const fib = useMemo(() => {
    const f = [1, 1];
    for (let i = 2; i < count; i++) f.push(f[i - 1] + f[i - 2]);
    return f;
  }, [count]);

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
    const scale = (Math.min(w, h) * 0.42) / fib.reduce((s, v) => s + v, 0);
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.strokeStyle = "rgba(148,163,184,0.22)";
    ctx.lineWidth = 1 * (w / canvas.clientWidth);
    ctx.strokeStyle = "#c4b5fd";
    ctx.lineWidth = 2.2 * (w / canvas.clientWidth);
    for (let i = fib.length - 1; i >= 0; i--) {
      const s = fib[i] * scale;
      ctx.strokeStyle = "rgba(148,163,184,0.2)";
      ctx.strokeRect(0, 0, s, s);
      ctx.beginPath();
      ctx.arc(s, 0, s, Math.PI / 2, Math.PI, false);
      ctx.strokeStyle = "#a78bfa";
      ctx.stroke();
      ctx.translate(s, 0);
      ctx.rotate(Math.PI / 2);
    }
    ctx.restore();
  }, [fib, ref]);
  drawRef.current = draw;
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4 w-full">
      <div className={`${glassPanel()} overflow-hidden aspect-square max-h-[400px] mx-auto w-full`}>
        <canvas ref={ref} className="w-full h-full block" />
      </div>
      <div className={`${glassPanel()} p-4 space-y-3`}>
        <ParamSlider label={ar ? "مربعات فيبوناتشي" : "Squares"} value={count} min={4} max={14} step={1} unit="" accent="violet" onChange={setCount} />
        <p className="text-[11px] text-slate-400">
          Fₙ = Fₙ₋₁ + Fₙ₋₂ · {ar ? "حلزون يقترب من النسبة الذهبية." : "spiral approaches the golden ratio."}
        </p>
        <ResultDisplay items={[{ label: "Fₙ", value: fib[fib.length - 1].toString(), unit: "" }]} />
      </div>
    </div>
  );
}

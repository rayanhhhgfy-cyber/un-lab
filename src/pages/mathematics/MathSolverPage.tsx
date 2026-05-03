import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowLeft, Wrench } from "lucide-react";
import ExperimentTabs from "@/components/ui/ExperimentTabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMathPortalPrefs } from "@/contexts/MathPortalPrefsContext";

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`glass rounded-xl sm:rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5 ${className}`}>{children}</div>;
}

function QuadraticSolver() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const { formatNum } = useMathPortalPrefs();
  const [a, setA] = useState("1");
  const [b, setB] = useState("0");
  const [c, setC] = useState("-1");

  const result = useMemo(() => {
    const A = parseFloat(a);
    const B = parseFloat(b);
    const C = parseFloat(c);
    if (![A, B, C].every(Number.isFinite)) return { ok: false as const, msg: ar ? "أدخل أرقامًا صالحة" : "Enter valid numbers" };
    if (Math.abs(A) < 1e-12) return { ok: false as const, msg: ar ? "a يجب أن يكون ≠ 0" : "a must be non-zero" };
    const D = B * B - 4 * A * C;
    const steps: string[] = [];
    steps.push(`Δ = b² − 4ac = ${formatNum(D)}`);
    if (D > 1e-12) {
      const s = Math.sqrt(D);
      const x1 = (-B - s) / (2 * A);
      const x2 = (-B + s) / (2 * A);
      steps.push(`x₁ = (−b − √Δ) / (2a) = ${formatNum(x1)}`);
      steps.push(`x₂ = (−b + √Δ) / (2a) = ${formatNum(x2)}`);
      return { ok: true as const, kind: "two" as const, D, x1, x2, steps };
    }
    if (Math.abs(D) <= 1e-12) {
      const x = -B / (2 * A);
      steps.push(`x = −b / (2a) = ${formatNum(x)}`);
      return { ok: true as const, kind: "one" as const, D, x, steps };
    }
    const re = -B / (2 * A);
    const im = Math.sqrt(-D) / (2 * A);
    steps.push(`z₁ = ${formatNum(re)} − ${formatNum(im)}i`);
    steps.push(`z₂ = ${formatNum(re)} + ${formatNum(im)}i`);
    return { ok: true as const, kind: "complex" as const, D, re, im, steps };
  }, [a, b, c, ar, formatNum]);

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-4">
      <Panel>
        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          {ar ? "حل ax² + bx + c = 0 بالخطوات (قانون الجذور)." : "Solve ax² + bx + c = 0 with discriminant steps."}
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <Label className="text-[10px] text-slate-500 uppercase">a</Label>
            <Input value={a} onChange={(e) => setA(e.target.value)} className="mt-1 bg-black/40 border-white/10" />
          </div>
          <div>
            <Label className="text-[10px] text-slate-500 uppercase">b</Label>
            <Input value={b} onChange={(e) => setB(e.target.value)} className="mt-1 bg-black/40 border-white/10" />
          </div>
          <div>
            <Label className="text-[10px] text-slate-500 uppercase">c</Label>
            <Input value={c} onChange={(e) => setC(e.target.value)} className="mt-1 bg-black/40 border-white/10" />
          </div>
        </div>
      </Panel>
      <Panel>
        <h4 className="text-[10px] font-bold text-violet-300 uppercase tracking-widest mb-2">{ar ? "النتيجة" : "Result"}</h4>
        {!result.ok && <p className="text-sm text-amber-300">{result.msg}</p>}
        {result.ok && (
          <ul className="text-sm text-slate-300 space-y-2 font-mono">
            {result.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

function Linear2Solver() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const { formatNum } = useMathPortalPrefs();
  const [a11, setA11] = useState("2");
  const [a12, setA12] = useState("3");
  const [b1, setB1] = useState("8");
  const [a21, setA21] = useState("1");
  const [a22, setA22] = useState("-1");
  const [b2, setB2] = useState("1");

  const result = useMemo(() => {
    const p = [a11, a12, b1, a21, a22, b2].map((s) => parseFloat(s));
    if (!p.every(Number.isFinite)) return { ok: false as const, msg: ar ? "أرقام غير صالحة" : "Invalid numbers" };
    const [A11, A12, B1, A21, A22, B2] = p;
    const D = A11 * A22 - A12 * A21;
    const Dx = B1 * A22 - A12 * B2;
    const Dy = A11 * B2 - B1 * A21;
    if (Math.abs(D) < 1e-12) {
      return { ok: false as const, msg: ar ? "المحدد = 0 (لا حل فريد أو لا نهاية حلول)" : "det = 0 (no unique solution)" };
    }
    const x = Dx / D;
    const y = Dy / D;
    return { ok: true as const, D, x, y, Dx, Dy };
  }, [a11, a12, b1, a21, a22, b2, ar]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-4">
      <Panel>
        <p className="text-xs text-slate-400 mb-3">{ar ? "قاعدة كرامر لنظام 2×2." : "Cramer’s rule for a 2×2 system."}</p>
        <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-2 items-center text-[10px] text-slate-500 mb-1">
          <span />
          <span className="text-center">x</span>
          <span className="text-center">y</span>
          <span className="text-center">=</span>
        </div>
        <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-2 items-center mb-2">
          <span className="text-xs text-slate-500">①</span>
          <Input value={a11} onChange={(e) => setA11(e.target.value)} className="bg-black/40 border-white/10 h-9" />
          <Input value={a12} onChange={(e) => setA12(e.target.value)} className="bg-black/40 border-white/10 h-9" />
          <Input value={b1} onChange={(e) => setB1(e.target.value)} className="bg-black/40 border-white/10 h-9" />
        </div>
        <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-2 items-center">
          <span className="text-xs text-slate-500">②</span>
          <Input value={a21} onChange={(e) => setA21(e.target.value)} className="bg-black/40 border-white/10 h-9" />
          <Input value={a22} onChange={(e) => setA22(e.target.value)} className="bg-black/40 border-white/10 h-9" />
          <Input value={b2} onChange={(e) => setB2(e.target.value)} className="bg-black/40 border-white/10 h-9" />
        </div>
      </Panel>
      <Panel>
        {!result.ok && <p className="text-sm text-amber-300">{result.msg}</p>}
        {result.ok && (
          <div className="text-sm text-slate-300 space-y-2 font-mono">
            <p>
              det = {formatNum(result.D)}, Dₓ = {formatNum(result.Dx)}, Dᵧ = {formatNum(result.Dy)}
            </p>
            <p>
              x = {formatNum(result.x)}, y = {formatNum(result.y)}
            </p>
          </div>
        )}
      </Panel>
    </div>
  );
}

function GcdLcmSolver() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [m, setM] = useState("48");
  const [n, setN] = useState("18");

  const result = useMemo(() => {
    const A = parseInt(m, 10);
    const B = parseInt(n, 10);
    if (!Number.isFinite(A) || !Number.isFinite(B) || A <= 0 || B <= 0)
      return { ok: false as const, msg: ar ? "أدخل أعدادًا صحيحة موجبة" : "Enter positive integers" };
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const g = gcd(A, B);
    const l = (A / g) * B;
    return { ok: true as const, g, l };
  }, [m, n, ar]);

  return (
    <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
      <Panel>
        <div className="flex gap-3">
          <div className="flex-1">
            <Label className="text-[10px] text-slate-500">m</Label>
            <Input value={m} onChange={(e) => setM(e.target.value)} className="mt-1 bg-black/40 border-white/10" />
          </div>
          <div className="flex-1">
            <Label className="text-[10px] text-slate-500">n</Label>
            <Input value={n} onChange={(e) => setN(e.target.value)} className="mt-1 bg-black/40 border-white/10" />
          </div>
        </div>
      </Panel>
      <Panel>
        {!result.ok && <p className="text-sm text-amber-300">{result.msg}</p>}
        {result.ok && (
          <p className="text-sm text-slate-200 font-mono">
            gcd = {result.g}, lcm = {result.l}
          </p>
        )}
      </Panel>
    </div>
  );
}

function ProportionSolver() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const { formatNum } = useMathPortalPrefs();
  const [a, setA] = useState("2");
  const [b, setB] = useState("5");
  const [c, setC] = useState("8");

  const d = useMemo(() => {
    const A = parseFloat(a);
    const B = parseFloat(b);
    const C = parseFloat(c);
    if (![A, B, C].every(Number.isFinite) || Math.abs(A) < 1e-12) return null;
    return (B * C) / A;
  }, [a, b, c]);

  return (
    <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
      <Panel>
        <p className="text-xs text-slate-400 mb-3">{ar ? "إذا a : b = c : d فإن d = bc / a" : "If a : b = c : d then d = bc / a"}</p>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <Label className="text-[10px]">a</Label>
            <Input value={a} onChange={(e) => setA(e.target.value)} className="mt-1 bg-black/40 border-white/10" />
          </div>
          <div>
            <Label className="text-[10px]">b</Label>
            <Input value={b} onChange={(e) => setB(e.target.value)} className="mt-1 bg-black/40 border-white/10" />
          </div>
          <div>
            <Label className="text-[10px]">c</Label>
            <Input value={c} onChange={(e) => setC(e.target.value)} className="mt-1 bg-black/40 border-white/10" />
          </div>
        </div>
      </Panel>
      <Panel>
        <p className="text-sm text-slate-300">
          d ={" "}
          <span className="font-mono text-violet-300">{d === null ? "—" : formatNum(d)}</span>
        </p>
      </Panel>
    </div>
  );
}

function Linear1DSolver() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const { formatNum } = useMathPortalPrefs();
  const [a, setA] = useState("3");
  const [b, setB] = useState("-7");
  const res = useMemo(() => {
    const A = parseFloat(a);
    const B = parseFloat(b);
    if (!Number.isFinite(A) || !Number.isFinite(B)) return { ok: false as const, msg: ar ? "أرقام غير صالحة" : "Invalid" };
    if (Math.abs(A) < 1e-12) return { ok: false as const, msg: ar ? "a = 0" : "a = 0" };
    return { ok: true as const, x: -B / A };
  }, [a, b, ar]);

  return (
    <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
      <Panel>
        <p className="text-xs text-slate-400 mb-3">ax + b = 0</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-[10px]">a</Label>
            <Input value={a} onChange={(e) => setA(e.target.value)} className="mt-1 bg-black/40 border-white/10" />
          </div>
          <div>
            <Label className="text-[10px]">b</Label>
            <Input value={b} onChange={(e) => setB(e.target.value)} className="mt-1 bg-black/40 border-white/10" />
          </div>
        </div>
      </Panel>
      <Panel>
        {!res.ok && <p className="text-sm text-amber-300">{res.msg}</p>}
        {res.ok && <p className="text-sm font-mono text-slate-200">x = {formatNum(res.x)}</p>}
      </Panel>
    </div>
  );
}

function BinomialCK() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [n, setN] = useState("10");
  const [k, setK] = useState("3");
  const res = useMemo(() => {
    const N = parseInt(n, 10);
    const K = parseInt(k, 10);
    if (!Number.isFinite(N) || !Number.isFinite(K) || N < 0 || K < 0 || K > N)
      return { ok: false as const, msg: ar ? "0 ≤ k ≤ n صحيحان" : "Need 0 ≤ k ≤ n integers" };
    let c = 1;
    for (let i = 0; i < K; i++) c = (c * (N - i)) / (i + 1);
    return { ok: true as const, c: Math.round(c) };
  }, [n, k, ar]);

  return (
    <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
      <Panel>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-[10px]">n</Label>
            <Input value={n} onChange={(e) => setN(e.target.value)} className="mt-1 bg-black/40 border-white/10" />
          </div>
          <div>
            <Label className="text-[10px]">k</Label>
            <Input value={k} onChange={(e) => setK(e.target.value)} className="mt-1 bg-black/40 border-white/10" />
          </div>
        </div>
      </Panel>
      <Panel>
        {!res.ok && <p className="text-sm text-amber-300">{res.msg}</p>}
        {res.ok && (
          <p className="text-sm font-mono text-slate-200">
            C(n,k) = {res.c.toLocaleString()}
          </p>
        )}
      </Panel>
    </div>
  );
}

function HeronSolver() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const { formatNum } = useMathPortalPrefs();
  const [a, setA] = useState("3");
  const [b, setB] = useState("4");
  const [c, setC] = useState("5");
  const res = useMemo(() => {
    const A = parseFloat(a);
    const B = parseFloat(b);
    const C = parseFloat(c);
    if (![A, B, C].every(Number.isFinite) || A <= 0 || B <= 0 || C <= 0)
      return { ok: false as const, msg: ar ? "أضلاع موجبة" : "Positive sides" };
    if (A + B <= C || A + C <= B || B + C <= A) return { ok: false as const, msg: ar ? "لا تحقق متباينة المثلث" : "Triangle inequality fails" };
    const s = (A + B + C) / 2;
    const area = Math.sqrt(s * (s - A) * (s - B) * (s - C));
    return { ok: true as const, s, area };
  }, [a, b, c, ar]);

  return (
    <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
      <Panel>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <Label className="text-[10px]">a</Label>
            <Input value={a} onChange={(e) => setA(e.target.value)} className="mt-1 bg-black/40 border-white/10 h-9" />
          </div>
          <div>
            <Label className="text-[10px]">b</Label>
            <Input value={b} onChange={(e) => setB(e.target.value)} className="mt-1 bg-black/40 border-white/10 h-9" />
          </div>
          <div>
            <Label className="text-[10px]">c</Label>
            <Input value={c} onChange={(e) => setC(e.target.value)} className="mt-1 bg-black/40 border-white/10 h-9" />
          </div>
        </div>
      </Panel>
      <Panel>
        {!res.ok && <p className="text-sm text-amber-300">{res.msg}</p>}
        {res.ok && (
          <div className="text-sm font-mono text-slate-200 space-y-1">
            <p>s = {formatNum(res.s)}</p>
            <p>Area = {formatNum(res.area)}</p>
          </div>
        )}
      </Panel>
    </div>
  );
}

function PercentSolver() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const { formatNum } = useMathPortalPrefs();
  const [mode, setMode] = useState<"of" | "is">("of");
  const [p, setP] = useState("15");
  const [x, setX] = useState("200");
  const res = useMemo(() => {
    const P = parseFloat(p);
    const X = parseFloat(x);
    if (!Number.isFinite(P) || !Number.isFinite(X)) return null;
    if (mode === "of") return (P / 100) * X;
    return (X / P) * 100;
  }, [mode, p, x]);

  return (
    <div className="max-w-xl space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("of")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${mode === "of" ? "bg-violet-500/25 text-violet-200" : "bg-white/5 text-slate-400"}`}
        >
          {ar ? "p٪ من x" : "p% of x"}
        </button>
        <button
          type="button"
          onClick={() => setMode("is")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${mode === "is" ? "bg-violet-500/25 text-violet-200" : "bg-white/5 text-slate-400"}`}
        >
          {ar ? "x نسبة من p" : "x is what % of p"}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Panel>
          <Label className="text-[10px]">p</Label>
          <Input value={p} onChange={(e) => setP(e.target.value)} className="mt-1 bg-black/40 border-white/10" />
        </Panel>
        <Panel>
          <Label className="text-[10px]">x</Label>
          <Input value={x} onChange={(e) => setX(e.target.value)} className="mt-1 bg-black/40 border-white/10" />
        </Panel>
      </div>
      {res !== null && (
        <p className="text-sm font-mono text-violet-200">
          {mode === "of" ? (ar ? "القيمة = " : "Value = ") : (ar ? "النسبة = " : "Percent = ")}
          {formatNum(res)}
          {mode === "is" ? " %" : ""}
        </p>
      )}
    </div>
  );
}

function LoanSolver() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const { formatNum } = useMathPortalPrefs();
  const [principal, setPrincipal] = useState("100000");
  const [apr, setApr] = useState("5.5");
  const [months, setMonths] = useState("240");
  const res = useMemo(() => {
    const P = parseFloat(principal);
    const rAnnual = parseFloat(apr) / 100;
    const n = parseInt(months, 10);
    if (!Number.isFinite(P) || !Number.isFinite(rAnnual) || !Number.isFinite(n) || P <= 0 || n < 1)
      return { ok: false as const, msg: ar ? "مدخلات غير صالحة" : "Invalid inputs" };
    const rm = rAnnual / 12;
    if (Math.abs(rm) < 1e-12) {
      const pay = P / n;
      return { ok: true as const, pay, total: pay * n };
    }
    const pow = (1 + rm) ** n;
    const pay = (P * rm * pow) / (pow - 1);
    return { ok: true as const, pay, total: pay * n };
  }, [principal, apr, months, ar]);

  return (
    <div className="grid sm:grid-cols-2 gap-4 max-w-lg">
      <Panel className="space-y-3">
        <p className="text-[10px] text-slate-500">{ar ? "قرض بفائدة سنوية، دفعات شهرية متساوية" : "Fixed monthly payment (nominal APR / 12)"}</p>
        <div>
          <Label className="text-[10px]">{ar ? "أصل الدين" : "Principal"}</Label>
          <Input value={principal} onChange={(e) => setPrincipal(e.target.value)} className="mt-1 bg-black/40 border-white/10" />
        </div>
        <div>
          <Label className="text-[10px]">APR %</Label>
          <Input value={apr} onChange={(e) => setApr(e.target.value)} className="mt-1 bg-black/40 border-white/10" />
        </div>
        <div>
          <Label className="text-[10px]">{ar ? "أشهر" : "Months"}</Label>
          <Input value={months} onChange={(e) => setMonths(e.target.value)} className="mt-1 bg-black/40 border-white/10" />
        </div>
      </Panel>
      <Panel>
        {!res.ok && <p className="text-sm text-amber-300">{res.msg}</p>}
        {res.ok && (
          <div className="text-sm font-mono text-slate-200 space-y-2">
            <p>{ar ? "القسط" : "Payment"}: {formatNum(res.pay)}</p>
            <p>{ar ? "المجموع" : "Total paid"}: {formatNum(res.total)}</p>
          </div>
        )}
      </Panel>
    </div>
  );
}

function SequenceSolver() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const { formatNum } = useMathPortalPrefs();
  const [u1, setU1] = useState("3");
  const [step, setStep] = useState("2");
  const [n, setN] = useState("10");
  const [r, setR] = useState("2");

  const arith = useMemo(() => {
    const a = parseFloat(u1);
    const d = parseFloat(step);
    const nn = parseInt(n, 10);
    if (!Number.isFinite(a) || !Number.isFinite(d) || !Number.isFinite(nn) || nn < 1) return null;
    const un = a + (nn - 1) * d;
    const sn = (nn / 2) * (2 * a + (nn - 1) * d);
    return { un, sn };
  }, [u1, step, n]);

  const geom = useMemo(() => {
    const a = parseFloat(u1);
    const rr = parseFloat(r);
    const nn = parseInt(n, 10);
    if (!Number.isFinite(a) || !Number.isFinite(rr) || !Number.isFinite(nn) || nn < 1 || Math.abs(rr) < 1e-12) return null;
    const un = a * rr ** (nn - 1);
    const sn = Math.abs(rr - 1) < 1e-12 ? nn * a : (a * (1 - rr ** nn)) / (1 - rr);
    return { un, sn };
  }, [u1, r, n]);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Panel>
        <h4 className="text-xs font-bold text-violet-300 mb-3 uppercase">{ar ? "حسابية" : "Arithmetic"}</h4>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <Label className="text-[10px]">u₁</Label>
            <Input value={u1} onChange={(e) => setU1(e.target.value)} className="mt-1 bg-black/40 border-white/10 h-9" />
          </div>
          <div>
            <Label className="text-[10px]">d</Label>
            <Input value={step} onChange={(e) => setStep(e.target.value)} className="mt-1 bg-black/40 border-white/10 h-9" />
          </div>
          <div>
            <Label className="text-[10px]">n</Label>
            <Input value={n} onChange={(e) => setN(e.target.value)} className="mt-1 bg-black/40 border-white/10 h-9" />
          </div>
        </div>
        {arith && (
          <p className="mt-3 text-sm font-mono text-slate-300">
            uₙ = {formatNum(arith.un)}, Sₙ = {formatNum(arith.sn)}
          </p>
        )}
      </Panel>
      <Panel>
        <h4 className="text-xs font-bold text-fuchsia-300 mb-3 uppercase">{ar ? "هندسية" : "Geometric"}</h4>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <Label className="text-[10px]">u₁</Label>
            <Input value={u1} onChange={(e) => setU1(e.target.value)} className="mt-1 bg-black/40 border-white/10 h-9" />
          </div>
          <div>
            <Label className="text-[10px]">r</Label>
            <Input value={r} onChange={(e) => setR(e.target.value)} className="mt-1 bg-black/40 border-white/10 h-9" />
          </div>
          <div>
            <Label className="text-[10px]">n</Label>
            <Input value={n} onChange={(e) => setN(e.target.value)} className="mt-1 bg-black/40 border-white/10 h-9" />
          </div>
        </div>
        {geom && (
          <p className="mt-3 text-sm font-mono text-slate-300">
            uₙ = {formatNum(geom.un)}, Sₙ = {formatNum(geom.sn)}
          </p>
        )}
      </Panel>
    </div>
  );
}

export default function MathSolverPage() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";

  const tabs = [
    { id: "quad", label: ar ? "تربيعي" : "Quadratic" },
    { id: "lin1", label: ar ? "خطي أول" : "Linear ax+b" },
    { id: "lin2", label: ar ? "خطي 2×2" : "Linear 2×2" },
    { id: "gcd", label: "gcd / lcm" },
    { id: "binom", label: "C(n,k)" },
    { id: "heron", label: ar ? "هيرون" : "Heron" },
    { id: "pct", label: "%" },
    { id: "loan", label: ar ? "قرض" : "Loan" },
    { id: "prop", label: ar ? "تناسب" : "Proportion" },
    { id: "seq", label: ar ? "متتاليات" : "Sequences" },
  ];

  return (
    <div className={`min-h-screen bg-black text-white ${ar ? "rtl font-arabic" : "font-sans"}`}>
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 md:px-10 pt-6 sm:pt-8 pb-16">
        <Link
          to="/mathematics"
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-violet-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
          {ar ? "الرئيسية" : "Hub"}
        </Link>

        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center">
            <Wrench className="w-6 h-6 text-violet-300" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
              {ar ? "حاسبة الحلول" : "Equation solver"}
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
              {ar
                ? "حلول خطوة بخطوة لأنظمة شائعة — تُستخدم إعدادات التقريب من مساحة العمل."
                : "Step-style results for common systems — rounding follows your workspace preferences."}
            </p>
          </div>
        </div>

        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          <div className="glass rounded-xl border border-violet-400/15 bg-violet-500/[0.04] p-4">
            <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-2">English</p>
            <p className="text-sm text-slate-300 leading-relaxed" dir="ltr">
              Pick a tab for the problem type. Type numbers; the panel shows short steps and the answer. Decimal places and scientific notation follow your{" "}
              <Link to="/mathematics/workspace" className="text-violet-400 hover:underline">
                Workspace
              </Link>{" "}
              settings.
            </p>
          </div>
          <div className="glass rounded-xl border border-violet-400/15 bg-violet-500/[0.04] p-4">
            <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-2">العربية</p>
            <p className="text-sm text-slate-300 leading-relaxed font-arabic" dir="rtl">
              اختر التبويب المناسب لنوع المسألة، ثم أدخل الأرقام؛ ستظهر خطوات مختصرة والنتيجة. عدد المنازل العشرية والتدوين العلمي يتبعان إعدادات{" "}
              <Link to="/mathematics/workspace" className="text-violet-400 hover:underline">
                مساحة العمل
              </Link>
              .
            </p>
          </div>
        </div>

        <ExperimentTabs tabs={tabs}>
          {(id) => {
            if (id === "quad") return <QuadraticSolver />;
            if (id === "lin1") return <Linear1DSolver />;
            if (id === "lin2") return <Linear2Solver />;
            if (id === "gcd") return <GcdLcmSolver />;
            if (id === "binom") return <BinomialCK />;
            if (id === "heron") return <HeronSolver />;
            if (id === "pct") return <PercentSolver />;
            if (id === "loan") return <LoanSolver />;
            if (id === "prop") return <ProportionSolver />;
            return <SequenceSolver />;
          }}
        </ExperimentTabs>
      </div>
    </div>
  );
}

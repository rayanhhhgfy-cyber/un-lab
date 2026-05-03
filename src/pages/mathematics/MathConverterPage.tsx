import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";
import ExperimentTabs from "@/components/ui/ExperimentTabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMathPortalPrefs } from "@/contexts/MathPortalPrefsContext";

function DegRad() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const { prefs } = useMathPortalPrefs();
  const [deg, setDeg] = useState("180");
  const [rad, setRad] = useState(String(Math.PI));

  const onDeg = (v: string) => {
    setDeg(v);
    const d = parseFloat(v);
    if (Number.isFinite(d)) setRad(String((d * Math.PI) / 180));
  };
  const onRad = (v: string) => {
    setRad(v);
    const r = parseFloat(v);
    if (Number.isFinite(r)) setDeg(String((r * 180) / Math.PI));
  };

  return (
    <div className="grid sm:grid-cols-2 gap-4 max-w-lg">
      <div className="glass rounded-xl border border-white/10 p-4">
        <Label className="text-[10px] text-slate-500">°</Label>
        <Input value={deg} onChange={(e) => onDeg(e.target.value)} className="mt-1 bg-black/40 border-white/10 font-mono" />
      </div>
      <div className="glass rounded-xl border border-white/10 p-4">
        <Label className="text-[10px] text-slate-500">rad</Label>
        <Input value={rad} onChange={(e) => onRad(e.target.value)} className="mt-1 bg-black/40 border-white/10 font-mono" />
      </div>
      <p className="sm:col-span-2 text-xs text-slate-500">
        {ar ? "وضع العرض العام:" : "Global display mode:"} <span className="text-violet-300">{prefs.angleMode}</span> ({ar ? "للمحاكيات" : "for sims"})
      </p>
    </div>
  );
}

function PolarRect() {
  const { formatNum } = useMathPortalPrefs();
  const [r, setR] = useState("2");
  const [theta, setTheta] = useState("1");
  const [mode, setMode] = useState<"rad" | "deg">("rad");

  const xy = useMemo(() => {
    const rr = parseFloat(r);
    let t = parseFloat(theta);
    if (!Number.isFinite(rr) || !Number.isFinite(t)) return null;
    if (mode === "deg") t = (t * Math.PI) / 180;
    return { x: rr * Math.cos(t), y: rr * Math.sin(t) };
  }, [r, theta, mode]);

  return (
    <div className="max-w-lg space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("rad")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${mode === "rad" ? "bg-violet-500/25 text-violet-200" : "bg-white/5 text-slate-400"}`}
        >
          rad
        </button>
        <button
          type="button"
          onClick={() => setMode("deg")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${mode === "deg" ? "bg-violet-500/25 text-violet-200" : "bg-white/5 text-slate-400"}`}
        >
          °
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="glass rounded-xl border border-white/10 p-4">
          <Label className="text-[10px]">r</Label>
          <Input value={r} onChange={(e) => setR(e.target.value)} className="mt-1 bg-black/40 border-white/10 font-mono" />
        </div>
        <div className="glass rounded-xl border border-white/10 p-4">
          <Label className="text-[10px]">θ</Label>
          <Input value={theta} onChange={(e) => setTheta(e.target.value)} className="mt-1 bg-black/40 border-white/10 font-mono" />
        </div>
      </div>
      {xy && (
        <p className="text-sm font-mono text-slate-200">
          x = {formatNum(xy.x)}, y = {formatNum(xy.y)}
        </p>
      )}
    </div>
  );
}

function LengthUnits() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [m, setM] = useState("1");
  const factors = useMemo(
    () => [
      { id: "km", label: "km", mul: 0.001 },
      { id: "m", label: "m", mul: 1 },
      { id: "cm", label: "cm", mul: 100 },
      { id: "mm", label: "mm", mul: 1000 },
      { id: "μm", label: "μm", mul: 1e6 },
      { id: "mi", label: "mi", mul: 1 / 1609.344 },
      { id: "ft", label: "ft", mul: 3.28084 },
      { id: "in", label: "in", mul: 39.3701 },
    ],
    []
  );
  const val = parseFloat(m);
  return (
    <div className="max-w-lg space-y-3">
      <div className="glass rounded-xl border border-white/10 p-4">
        <Label className="text-[10px]">{ar ? "أدخل المتر" : "Meters"}</Label>
        <Input value={m} onChange={(e) => setM(e.target.value)} className="mt-1 bg-black/40 border-white/10 font-mono" />
      </div>
      {Number.isFinite(val) && (
        <ul className="text-sm font-mono text-slate-300 space-y-1">
          {factors.map((f) => (
            <li key={f.id}>
              {f.label}: {(val * f.mul).toPrecision(6)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function RectToPolarTab() {
  const { formatNum } = useMathPortalPrefs();
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [x, setX] = useState("1");
  const [y, setY] = useState("1");
  const out = useMemo(() => {
    const X = parseFloat(x);
    const Y = parseFloat(y);
    if (!Number.isFinite(X) || !Number.isFinite(Y)) return null;
    const r = Math.hypot(X, Y);
    let th = Math.atan2(Y, X);
    return { r, th, deg: (th * 180) / Math.PI };
  }, [x, y]);

  return (
    <div className="max-w-lg space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="glass rounded-xl border border-white/10 p-4">
          <Label className="text-[10px]">x</Label>
          <Input value={x} onChange={(e) => setX(e.target.value)} className="mt-1 bg-black/40 border-white/10 font-mono" />
        </div>
        <div className="glass rounded-xl border border-white/10 p-4">
          <Label className="text-[10px]">y</Label>
          <Input value={y} onChange={(e) => setY(e.target.value)} className="mt-1 bg-black/40 border-white/10 font-mono" />
        </div>
      </div>
      {out && (
        <p className="text-sm font-mono text-slate-200">
          r = {formatNum(out.r)}, θ = {formatNum(out.th)} rad ({formatNum(out.deg)}°)
        </p>
      )}
      <p className="text-[11px] text-slate-500">{ar ? "عكس تبويب القطبي" : "Inverse of polar → (x,y) tab"}</p>
    </div>
  );
}

function AreaUnits() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [m2, setM2] = useState("100");
  const v = parseFloat(m2);
  const rows = Number.isFinite(v)
    ? [
        ["m²", v],
        ["km²", v / 1e6],
        ["cm²", v * 1e4],
        ["ha", v / 10000],
        ["acre", v / 4046.86],
        ["ft²", v * 10.7639],
      ]
    : [];
  return (
    <div className="max-w-lg space-y-3">
      <div className="glass rounded-xl border border-white/10 p-4">
        <Label className="text-[10px]">{ar ? "متر مربع" : "Square meters"}</Label>
        <Input value={m2} onChange={(e) => setM2(e.target.value)} className="mt-1 bg-black/40 border-white/10 font-mono" />
      </div>
      <ul className="text-sm font-mono text-slate-300 space-y-1">
        {rows.map(([lab, val]) => (
          <li key={String(lab)}>
            {lab}: {Number(val).toPrecision(7)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function VolumeUnits() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const [m3, setM3] = useState("1");
  const v = parseFloat(m3);
  const rows = Number.isFinite(v)
    ? [
        ["m³", v],
        ["L", v * 1000],
        ["mL", v * 1e6],
        ["US gal", v * 264.172],
        ["cm³", v * 1e6],
      ]
    : [];
  return (
    <div className="max-w-lg space-y-3">
      <div className="glass rounded-xl border border-white/10 p-4">
        <Label className="text-[10px]">{ar ? "متر مكعب" : "Cubic meters"}</Label>
        <Input value={m3} onChange={(e) => setM3(e.target.value)} className="mt-1 bg-black/40 border-white/10 font-mono" />
      </div>
      <ul className="text-sm font-mono text-slate-300 space-y-1">
        {rows.map(([lab, val]) => (
          <li key={String(lab)}>
            {lab}: {Number(val).toPrecision(7)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TempUnits() {
  const [c, setC] = useState("25");
  const out = useMemo(() => {
    const C = parseFloat(c);
    if (!Number.isFinite(C)) return null;
    return { f: (C * 9) / 5 + 32, k: C + 273.15 };
  }, [c]);
  return (
    <div className="max-w-lg space-y-3">
      <div className="glass rounded-xl border border-white/10 p-4">
        <Label className="text-[10px]">°C</Label>
        <Input value={c} onChange={(e) => setC(e.target.value)} className="mt-1 bg-black/40 border-white/10 font-mono" />
      </div>
      {out && (
        <ul className="text-sm font-mono text-slate-300 space-y-1">
          <li>°F: {out.f.toFixed(4)}</li>
          <li>K: {out.k.toFixed(4)}</li>
        </ul>
      )}
    </div>
  );
}

function MassUnits() {
  const [kg, setKg] = useState("1");
  const v = parseFloat(kg);
  const rows = Number.isFinite(v)
    ? [
        ["g", v * 1000],
        ["mg", v * 1e6],
        ["lb", v * 2.20462],
        ["oz", v * 35.274],
      ]
    : [];
  return (
    <div className="max-w-lg space-y-3">
      <div className="glass rounded-xl border border-white/10 p-4">
        <Label className="text-[10px]">kg</Label>
        <Input value={kg} onChange={(e) => setKg(e.target.value)} className="mt-1 bg-black/40 border-white/10 font-mono" />
      </div>
      <ul className="text-sm font-mono text-slate-300 space-y-1">
        {rows.map(([lab, val]) => (
          <li key={String(lab)}>
            {lab}: {Number(val).toPrecision(7)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DataUnits() {
  const [mb, setMb] = useState("1");
  const v = parseFloat(mb);
  const rows = Number.isFinite(v)
    ? [
        ["B", v * 1024 * 1024],
        ["KB", v * 1024],
        ["MB", v],
        ["GB", v / 1024],
        ["TB", v / (1024 * 1024)],
      ]
    : [];
  return (
    <div className="max-w-lg space-y-3">
      <div className="glass rounded-xl border border-white/10 p-4">
        <Label className="text-[10px]">MiB (1024² B)</Label>
        <Input value={mb} onChange={(e) => setMb(e.target.value)} className="mt-1 bg-black/40 border-white/10 font-mono" />
      </div>
      <ul className="text-sm font-mono text-slate-300 space-y-1">
        {rows.map(([lab, val]) => (
          <li key={String(lab)}>
            {lab}: {Number(val).toPrecision(7)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MathConverterPage() {
  const { i18n } = useTranslation();
  const ar = i18n.language === "ar";
  const tabs = [
    { id: "ang", label: ar ? "° / rad" : "° / rad" },
    { id: "polar", label: ar ? "قطبي→ديكارتي" : "Polar→xy" },
    { id: "rect", label: ar ? "ديكارتي→قطبي" : "xy→polar" },
    { id: "len", label: ar ? "طول" : "Length" },
    { id: "area", label: ar ? "مساحة" : "Area" },
    { id: "vol", label: ar ? "حجم" : "Volume" },
    { id: "temp", label: ar ? "حرارة" : "Temp" },
    { id: "mass", label: ar ? "كتلة" : "Mass" },
    { id: "data", label: ar ? "بيانات" : "Data" },
  ];

  return (
    <div className={`min-h-screen bg-black text-white ${ar ? "rtl font-arabic" : "font-sans"}`}>
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 md:px-10 pt-6 sm:pt-8 pb-16">
        <Link to="/mathematics" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-violet-300 mb-6">
          <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
          {ar ? "الرئيسية" : "Hub"}
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-400/25 flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black">{ar ? "محولات رياضية" : "Math converters"}</h1>
            <p className="text-xs text-slate-500">{ar ? "وحدات وزوايا شائعة" : "Common angles & units"}</p>
          </div>
        </div>

        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          <div className="glass rounded-xl border border-cyan-400/15 bg-cyan-500/[0.04] p-4">
            <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2">English</p>
            <p className="text-sm text-slate-300 leading-relaxed" dir="ltr">
              Choose a converter tab. Angles, polar coordinates, lengths, areas, volumes, temperature, mass, and data units update live as you type. Precision follows your workspace when applicable.
            </p>
          </div>
          <div className="glass rounded-xl border border-cyan-400/15 bg-cyan-500/[0.04] p-4">
            <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2">العربية</p>
            <p className="text-sm text-slate-300 leading-relaxed font-arabic" dir="rtl">
              اختر تبويب المحول: الزوايا، الإحداثيات القطبية، الأطوال، المساحات، الأحجام، الحرارة، الكتلة، ووحدات البيانات تتحدث فورًا مع الإدخال. الدقة تتبع مساحة العمل حيث ينطبق ذلك.
            </p>
          </div>
        </div>

        <ExperimentTabs tabs={tabs}>
          {(id) => {
            if (id === "ang") return <DegRad />;
            if (id === "polar") return <PolarRect />;
            if (id === "rect") return <RectToPolarTab />;
            if (id === "len") return <LengthUnits />;
            if (id === "area") return <AreaUnits />;
            if (id === "vol") return <VolumeUnits />;
            if (id === "temp") return <TempUnits />;
            if (id === "mass") return <MassUnits />;
            return <DataUnits />;
          }}
        </ExperimentTabs>
      </div>
    </div>
  );
}

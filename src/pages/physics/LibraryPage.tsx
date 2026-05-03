import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Search, Copy, Check, BookOpen } from "lucide-react";

const constants = [
  { name: "Speed of Light", symbol: "c", value: "2.998 × 10⁸", unit: "m/s" },
  { name: "Planck's Constant", symbol: "h", value: "6.626 × 10⁻³⁴", unit: "J·s" },
  { name: "Gravitational Constant", symbol: "G", value: "6.674 × 10⁻¹¹", unit: "N·m²/kg²" },
  { name: "Boltzmann Constant", symbol: "kB", value: "1.381 × 10⁻²³", unit: "J/K" },
  { name: "Elementary Charge", symbol: "e", value: "1.602 × 10⁻¹⁹", unit: "C" },
  { name: "Avogadro's Number", symbol: "NA", value: "6.022 × 10²³", unit: "mol⁻¹" },
  { name: "Gas Constant", symbol: "R", value: "8.314", unit: "J/(mol·K)" },
  { name: "Coulomb's Constant", symbol: "k", value: "8.988 × 10⁹", unit: "N·m²/C²" },
  { name: "Vacuum Permittivity", symbol: "ε₀", value: "8.854 × 10⁻¹²", unit: "F/m" },
  { name: "Vacuum Permeability", symbol: "μ₀", value: "1.257 × 10⁻⁶", unit: "H/m" },
  { name: "Electron Mass", symbol: "me", value: "9.109 × 10⁻³¹", unit: "kg" },
  { name: "Proton Mass", symbol: "mp", value: "1.673 × 10⁻²⁷", unit: "kg" },
  { name: "Stefan-Boltzmann", symbol: "σ", value: "5.670 × 10⁻⁸", unit: "W/(m²·K⁴)" },
  { name: "Rydberg Constant", symbol: "R∞", value: "1.097 × 10⁷", unit: "m⁻¹" },
];

const equations = [
  { category: "Mechanics", items: [
    { name: "Newton's 2nd Law", eq: "F = ma" },
    { name: "Kinetic Energy", eq: "KE = ½mv²" },
    { name: "Gravitational PE", eq: "PE = mgh" },
    { name: "Work-Energy", eq: "W = ΔKE" },
    { name: "Momentum", eq: "p = mv" },
    { name: "Projectile Range", eq: "R = v²sin(2θ)/g" },
  ]},
  { category: "E&M", items: [
    { name: "Coulomb's Law", eq: "F = kq₁q₂/r²" },
    { name: "Ohm's Law", eq: "V = IR" },
    { name: "Electric Field", eq: "E = F/q" },
    { name: "Capacitance", eq: "C = Q/V" },
    { name: "Power", eq: "P = IV" },
  ]},
  { category: "Thermo", items: [
    { name: "Ideal Gas Law", eq: "PV = nRT" },
    { name: "Heat Transfer", eq: "Q = mcΔT" },
    { name: "Entropy", eq: "ΔS = Q/T" },
    { name: "1st Law", eq: "ΔU = Q - W" },
  ]},
  { category: "Waves", items: [
    { name: "Wave Speed", eq: "v = fλ" },
    { name: "Snell's Law", eq: "n₁sinθ₁ = n₂sinθ₂" },
    { name: "Doppler Effect", eq: "f' = f(v±vo)/(v∓vs)" },
  ]},
  { category: "Modern", items: [
    { name: "Energy-Mass", eq: "E = mc²" },
    { name: "Photon Energy", eq: "E = hf" },
    { name: "de Broglie", eq: "λ = h/p" },
    { name: "Time Dilation", eq: "Δt' = γΔt" },
    { name: "Bohr Energy", eq: "Eₙ = -13.6/n² eV" },
    { name: "Heisenberg", eq: "ΔxΔp ≥ ℏ/2" },
  ]},
];

const categoryAccent: Record<string, { text: string; chip: string }> = {
  Mechanics: { text: "text-cyan-300", chip: "bg-cyan-500/10 border-cyan-400/30 text-cyan-200" },
  "E&M": { text: "text-violet-300", chip: "bg-violet-500/10 border-violet-400/30 text-violet-200" },
  Thermo: { text: "text-amber-300", chip: "bg-amber-500/10 border-amber-400/30 text-amber-200" },
  Waves: { text: "text-emerald-300", chip: "bg-emerald-500/10 border-emerald-400/30 text-emerald-200" },
  Modern: { text: "text-rose-300", chip: "bg-rose-500/10 border-rose-400/30 text-rose-200" },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition"
      title={copied ? "Copied" : "Copy"}
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function LibraryPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"constants" | "equations">("constants");
  const q = search.toLowerCase();

  return (
    <div className={`min-h-screen w-full pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 px-3 sm:px-6 md:px-8 lg:px-12 ${isArabic ? "rtl font-arabic" : ""}`}>
      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 backdrop-blur-md mb-4">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 animate-ping opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-amber-200">
              {isArabic ? "مكتبة · فيزياء" : "Library · Physics"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-amber-100 to-amber-300">
            {t("physics.library.page_title", isArabic ? "مكتبة الفيزياء" : "Physics Library")}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {t("physics.library.description", isArabic ? "الثوابت والمعادلات وقوانين الفيزياء الأساسية." : "Constants, equations, and fundamental laws of physics.")}
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
          <div className="relative flex-1">
            <Search
              className={`absolute ${isArabic ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500`}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isArabic ? "بحث..." : "Search..."}
              className={`w-full ${
                isArabic ? "pr-10 pl-3" : "pl-10 pr-3"
              } py-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/40 transition`}
            />
          </div>
          <div className="flex gap-1 p-1 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            {(["constants", "equations"] as const).map((tabKey) => {
              const isActive = tab === tabKey;
              return (
                <button
                  key={tabKey}
                  onClick={() => setTab(tabKey)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                    isActive
                      ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-[0_0_20px_-6px_rgba(251,191,36,0.6)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isArabic
                    ? tabKey === "constants"
                      ? "ثوابت"
                      : "معادلات"
                    : tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
                </button>
              );
            })}
          </div>
        </div>

        {tab === "constants" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      {t("physics.library.name", isArabic ? "الاسم" : "Name")}
                    </th>
                    <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      {t("physics.library.symbol", isArabic ? "الرمز" : "Symbol")}
                    </th>
                    <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      {t("physics.library.value", isArabic ? "القيمة" : "Value")}
                    </th>
                    <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      {t("physics.library.unit", isArabic ? "الوحدة" : "Unit")}
                    </th>
                    <th className="px-4 py-3 w-12" />
                  </tr>
                </thead>
                <tbody>
                  {constants
                    .filter(
                      (c) =>
                        c.name.toLowerCase().includes(q) ||
                        c.symbol.toLowerCase().includes(q),
                    )
                    .map((c, i) => (
                      <tr
                        key={c.symbol}
                        className={`group border-b border-white/[0.04] last:border-0 hover:bg-white/[0.03] transition ${
                          i % 2 === 1 ? "bg-white/[0.01]" : ""
                        }`}
                      >
                        <td className="px-4 py-3.5 text-white font-medium">{c.name}</td>
                        <td className="px-4 py-3.5 font-mono text-amber-300">{c.symbol}</td>
                        <td className="px-4 py-3.5 font-mono text-slate-200">{c.value}</td>
                        <td className="px-4 py-3.5 text-slate-400">{c.unit}</td>
                        <td className="px-4 py-3.5 text-right">
                          <CopyButton text={c.value} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {tab === "equations" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {equations
              .filter((cat) =>
                cat.items.some(
                  (e) =>
                    e.name.toLowerCase().includes(q) ||
                    e.eq.toLowerCase().includes(q),
                ),
              )
              .map((cat) => {
                const acc = categoryAccent[cat.category] ?? categoryAccent.Mechanics;
                return (
                  <div
                    key={cat.category}
                    className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-white/[0.12] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-3.5">
                      <BookOpen className={`w-4 h-4 ${acc.text}`} />
                      <h3 className={`text-xs font-mono uppercase tracking-[0.3em] ${acc.text}`}>
                        {cat.category}
                      </h3>
                    </div>
                    <div className="space-y-1.5">
                      {cat.items
                        .filter(
                          (e) =>
                            e.name.toLowerCase().includes(q) ||
                            e.eq.toLowerCase().includes(q),
                        )
                        .map((e) => (
                          <div
                            key={e.name}
                            className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/10 transition"
                          >
                            <div className="min-w-0">
                              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                                {e.name}
                              </div>
                              <div className="font-mono text-sm text-white truncate">{e.eq}</div>
                            </div>
                            <CopyButton text={e.eq} />
                          </div>
                        ))}
                    </div>
                  </div>
                );
              })}
          </motion.div>
        )}
      </div>
    </div>
  );
}

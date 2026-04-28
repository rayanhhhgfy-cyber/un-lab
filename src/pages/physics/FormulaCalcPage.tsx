import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Sparkles } from "lucide-react";

const formulas = {
  en: [
    { name: "Kinetic Energy", formula: "KE = ½mv²", inputs: ["mass (kg)", "velocity (m/s)"], calc: (v: number[]) => 0.5 * v[0] * v[1] * v[1], result: "J" },
    { name: "Gravitational PE", formula: "PE = mgh", inputs: ["mass (kg)", "gravity (m/s²)", "height (m)"], calc: (v: number[]) => v[0] * v[1] * v[2], result: "J" },
    { name: "Ohm's Law (V)", formula: "V = IR", inputs: ["current (A)", "resistance (Ω)"], calc: (v: number[]) => v[0] * v[1], result: "V" },
    { name: "Ohm's Law (I)", formula: "I = V/R", inputs: ["voltage (V)", "resistance (Ω)"], calc: (v: number[]) => v[0] / v[1], result: "A" },
    { name: "Force", formula: "F = ma", inputs: ["mass (kg)", "acceleration (m/s²)"], calc: (v: number[]) => v[0] * v[1], result: "N" },
    { name: "Ideal Gas (P)", formula: "P = nRT/V", inputs: ["moles", "temperature (K)", "volume (L)"], calc: (v: number[]) => v[0] * 8.314 * v[1] / (v[2] * 0.001), result: "Pa" },
    { name: "Wave Speed", formula: "v = fλ", inputs: ["frequency (Hz)", "wavelength (m)"], calc: (v: number[]) => v[0] * v[1], result: "m/s" },
    { name: "Coulomb Force", formula: "F = kq₁q₂/r²", inputs: ["q1 (C)", "q2 (C)", "distance (m)"], calc: (v: number[]) => 8.99e9 * v[0] * v[1] / (v[2] * v[2]), result: "N" },
    { name: "Photon Energy", formula: "E = hf", inputs: ["frequency (Hz)"], calc: (v: number[]) => 6.626e-34 * v[0], result: "J" },
    { name: "de Broglie λ", formula: "λ = h/p", inputs: ["momentum (kg·m/s)"], calc: (v: number[]) => 6.626e-34 / v[0], result: "m" },
    { name: "Lorentz Factor", formula: "γ = 1/√(1-v²/c²)", inputs: ["velocity (m/s)"], calc: (v: number[]) => 1 / Math.sqrt(1 - (v[0] * v[0]) / (9e16)), result: "" },
    { name: "Centripetal Force", formula: "F = mv²/r", inputs: ["mass (kg)", "velocity (m/s)", "radius (m)"], calc: (v: number[]) => v[0] * v[1] * v[1] / v[2], result: "N" },
    { name: "Gravitational Force", formula: "F = Gm₁m₂/r²", inputs: ["m1 (kg)", "m2 (kg)", "distance (m)"], calc: (v: number[]) => 6.674e-11 * v[0] * v[1] / (v[2] * v[2]), result: "N" },
    { name: "Escape Velocity", formula: "v = √(2GM/r)", inputs: ["mass (kg)", "radius (m)"], calc: (v: number[]) => Math.sqrt(2 * 6.674e-11 * v[0] / v[1]), result: "m/s" },
  ],
  ar: [
    { name: "الطاقة الحركية", formula: "KE = ½mv²", inputs: ["الكتلة (كغ)", "السرعة (م/ث)"], calc: (v: number[]) => 0.5 * v[0] * v[1] * v[1], result: "جول" },
    { name: "طاقة الوضع الجاذبية", formula: "PE = mgh", inputs: ["الكتلة (كغ)", "الجاذبية (م/ث²)", "الارتفاع (م)"], calc: (v: number[]) => v[0] * v[1] * v[2], result: "جول" },
    { name: "قانون أوم (ج)", formula: "V = IR", inputs: ["التيار (أ)", "المقاومة (Ω)"], calc: (v: number[]) => v[0] * v[1], result: "فولت" },
    { name: "قانون أوم (ت)", formula: "I = V/R", inputs: ["الجهد (ف)", "المقاومة (Ω)"], calc: (v: number[]) => v[0] / v[1], result: "أ" },
    { name: "القوة", formula: "F = ma", inputs: ["الكتلة (كغ)", "التسارع (م/ث²)"], calc: (v: number[]) => v[0] * v[1], result: "نيوتن" },
    { name: "الغاز المثالي (ض)", formula: "P = nRT/V", inputs: ["المولات", "الحرارة (ك)", "الحجم (ل)"], calc: (v: number[]) => v[0] * 8.314 * v[1] / (v[2] * 0.001), result: "باسكال" },
    { name: "سرعة الموجة", formula: "v = fλ", inputs: ["التردد (هرتز)", "الطول الموجي (م)"], calc: (v: number[]) => v[0] * v[1], result: "م/ث" },
    { name: "قوة كولوم", formula: "F = kq₁q₂/r²", inputs: ["q1 (ك)", "q2 (ك)", "المسافة (م)"], calc: (v: number[]) => 8.99e9 * v[0] * v[1] / (v[2] * v[2]), result: "نيوتن" },
    { name: "طاقة الفوتون", formula: "E = hf", inputs: ["التردد (هرتز)"], calc: (v: number[]) => 6.626e-34 * v[0], result: "جول" },
    { name: "طول دي بروجلي", formula: "λ = h/p", inputs: ["الزخم (كغ·م/ث)"], calc: (v: number[]) => 6.626e-34 / v[0], result: "م" },
    { name: "عامل لورنتز", formula: "γ = 1/√(1-v²/c²)", inputs: ["السرعة (م/ث)"], calc: (v: number[]) => 1 / Math.sqrt(1 - (v[0] * v[0]) / (9e16)), result: "" },
    { name: "القوة المركزية", formula: "F = mv²/r", inputs: ["الكتلة (كغ)", "السرعة (م/ث)", "نصف القطر (م)"], calc: (v: number[]) => v[0] * v[1] * v[1] / v[2], result: "نيوتن" },
    { name: "القوة الجاذبية", formula: "F = Gm₁m₂/r²", inputs: ["m1 (كغ)", "m2 (كغ)", "المسافة (م)"], calc: (v: number[]) => 6.674e-11 * v[0] * v[1] / (v[2] * v[2]), result: "نيوتن" },
    { name: "سرعة الهروب", formula: "v = √(2GM/r)", inputs: ["الكتلة (كغ)", "نصف القطر (م)"], calc: (v: number[]) => Math.sqrt(2 * 6.674e-11 * v[0] / v[1]), result: "م/ث" },
  ],
};

export default function FormulaCalcPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isArabic = lang === "ar";
  const currentFormulas = formulas[lang as keyof typeof formulas] || formulas.en;

  const [selected, setSelected] = useState(currentFormulas[0]);
  const [values, setValues] = useState<string[]>(currentFormulas[0].inputs.map(() => ""));
  const [answer, setAnswer] = useState<string | null>(null);

  const selectFormula = (f: typeof currentFormulas[0]) => {
    setSelected(f);
    setValues(f.inputs.map(() => ""));
    setAnswer(null);
  };

  const calculate = () => {
    const nums = values.map(Number);
    if (nums.some(isNaN)) return;
    try {
      const result = selected.calc(nums);
      setAnswer(isFinite(result) ? result.toPrecision(6) : "undefined");
    } catch {
      setAnswer("Error");
    }
  };

  return (
    <div className={`min-h-screen w-full pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 px-3 sm:px-6 md:px-8 lg:px-12 ${isArabic ? "rtl font-arabic" : ""}`}>
      <div className="w-full max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 backdrop-blur-md mb-4">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-ping opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-emerald-200">
              {isArabic ? "أداة · فيزياء" : "Tool · Physics"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-emerald-100 to-emerald-300">
            {t("physics.calculator.page_title", isArabic ? "حاسبة الصيغ" : "Formula Calculator")}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {t("physics.calculator.description", isArabic ? "احسب الكميات الفيزيائية فوراً." : "Compute physics quantities from fundamental equations.")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 sm:gap-5">
          {/* Formula list */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-2 max-h-[480px] md:max-h-[640px] overflow-y-auto scrollbar-none">
            {currentFormulas.map((f) => {
              const isActive = selected.name === f.name;
              return (
                <button
                  key={f.name}
                  onClick={() => selectFormula(f)}
                  className={`relative w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all my-0.5 ${
                    isActive
                      ? "bg-gradient-to-br from-emerald-500/20 to-emerald-700/10 border border-emerald-400/30 text-white shadow-[0_0_18px_-6px_rgba(16,185,129,0.4)]"
                      : "border border-transparent text-slate-300 hover:bg-white/[0.04] hover:text-white hover:border-white/10"
                  }`}
                >
                  <div className="font-semibold flex items-center gap-2">
                    {isActive && <Sparkles className="w-3 h-3 text-emerald-300 flex-shrink-0" />}
                    <span className="truncate">{f.name}</span>
                  </div>
                  <div className={`text-[11px] font-mono mt-0.5 ${isActive ? "text-emerald-200/80" : "text-slate-500"}`}>{f.formula}</div>
                </button>
              );
            })}
          </div>

          {/* Calculator pane */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-5 sm:p-7 space-y-5"
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-700/10 border border-emerald-400/20 flex items-center justify-center flex-shrink-0">
                  <Calculator className="w-5 h-5 text-emerald-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-white text-lg sm:text-xl truncate">{selected.name}</h2>
                  <p className="font-mono text-emerald-300 text-base sm:text-lg mt-0.5 break-all">{selected.formula}</p>
                </div>
              </div>

              <div className="space-y-3">
                {selected.inputs.map((input, i) => (
                  <div key={input} className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400">{input}</label>
                    <input
                      type="number"
                      value={values[i]}
                      onChange={(e) => {
                        const next = [...values];
                        next[i] = e.target.value;
                        setValues(next);
                      }}
                      placeholder={isArabic ? "أدخل قيمة" : "Enter value"}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white font-mono text-base focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40 placeholder:text-slate-600 transition"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={calculate}
                className="w-full py-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-bold text-sm tracking-wide shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] hover:shadow-[0_12px_32px_-8px_rgba(16,185,129,0.8)] transition-all"
              >
                {isArabic ? "احسب" : "Calculate"}
              </button>

              {answer && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-5 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-400/30 text-center"
                >
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300/80">
                    {isArabic ? "النتيجة" : "Result"}
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono text-white mt-1.5 break-all">
                    {answer}{" "}
                    <span className="text-base text-emerald-300/80">{selected.result}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

const categories = {
  en: [
    {
      name: "Length",
      units: [
        { name: "Meters", factor: 1 },
        { name: "Kilometers", factor: 1e-3 },
        { name: "Centimeters", factor: 100 },
        { name: "Millimeters", factor: 1000 },
        { name: "Miles", factor: 6.2137e-4 },
        { name: "Feet", factor: 3.28084 },
        { name: "Inches", factor: 39.3701 },
        { name: "Light-years", factor: 1.057e-16 },
        { name: "Angstroms", factor: 1e10 },
      ],
    },
    {
      name: "Mass",
      units: [
        { name: "Kilograms", factor: 1 },
        { name: "Grams", factor: 1000 },
        { name: "Milligrams", factor: 1e6 },
        { name: "Pounds", factor: 2.20462 },
        { name: "Ounces", factor: 35.274 },
        { name: "Atomic mass (u)", factor: 6.022e26 },
        { name: "Electron masses", factor: 1.098e30 },
      ],
    },
    {
      name: "Energy",
      units: [
        { name: "Joules", factor: 1 },
        { name: "Kilojoules", factor: 1e-3 },
        { name: "Calories", factor: 0.239006 },
        { name: "Kilocalories", factor: 2.39006e-4 },
        { name: "Electron volts", factor: 6.242e18 },
        { name: "Kilowatt-hours", factor: 2.778e-7 },
        { name: "Ergs", factor: 1e7 },
      ],
    },
    {
      name: "Temperature",
      units: [
        { name: "Kelvin", factor: 1 },
        { name: "Celsius", factor: 1, offset: -273.15 },
        { name: "Fahrenheit", factor: 9 / 5, offset: -459.67 },
      ],
    },
    {
      name: "Pressure",
      units: [
        { name: "Pascals", factor: 1 },
        { name: "Atmospheres", factor: 9.8692e-6 },
        { name: "Bar", factor: 1e-5 },
        { name: "mmHg (Torr)", factor: 7.5006e-3 },
        { name: "PSI", factor: 1.450e-4 },
      ],
    },
    {
      name: "Force",
      units: [
        { name: "Newtons", factor: 1 },
        { name: "Dynes", factor: 1e5 },
        { name: "Pound-force", factor: 0.224809 },
        { name: "Kilogram-force", factor: 0.101972 },
      ],
    },
  ],
  ar: [
    {
      name: "الطول",
      units: [
        { name: "المتر", factor: 1 },
        { name: "الكيلومتر", factor: 1e-3 },
        { name: "السنتيمتر", factor: 100 },
        { name: "المليمتر", factor: 1000 },
        { name: "الميل", factor: 6.2137e-4 },
        { name: "القدم", factor: 3.28084 },
        { name: "البوصة", factor: 39.3701 },
        { name: "السنة الضوئية", factor: 1.057e-16 },
        { name: "الأنغستروم", factor: 1e10 },
      ],
    },
    {
      name: "الكتلة",
      units: [
        { name: "كيلوغرام", factor: 1 },
        { name: "غرام", factor: 1000 },
        { name: "ميليغرام", factor: 1e6 },
        { name: "باوند", factor: 2.20462 },
        { name: "أونصة", factor: 35.274 },
        { name: "الكتلة الذرية (u)", factor: 6.022e26 },
        { name: "كتلة الإلكترون", factor: 1.098e30 },
      ],
    },
    {
      name: "الطاقة",
      units: [
        { name: "جول", factor: 1 },
        { name: "كيلو جول", factor: 1e-3 },
        { name: "سعرة", factor: 0.239006 },
        { name: "كيلو سعرة", factor: 2.39006e-4 },
        { name: "إلكترون فولت", factor: 6.242e18 },
        { name: "كيلوواط ساعة", factor: 2.778e-7 },
        { name: "إرج", factor: 1e7 },
      ],
    },
    {
      name: "الحرارة",
      units: [
        { name: "كلفن", factor: 1 },
        { name: "مئوية", factor: 1, offset: -273.15 },
        { name: "فهرنهايت", factor: 9 / 5, offset: -459.67 },
      ],
    },
    {
      name: "الضغط",
      units: [
        { name: "باسكال", factor: 1 },
        { name: "جو", factor: 9.8692e-6 },
        { name: "بار", factor: 1e-5 },
        { name: "مم زئبق", factor: 7.5006e-3 },
        { name: "باوند/بوصة²", factor: 1.450e-4 },
      ],
    },
    {
      name: "القوة",
      units: [
        { name: "نيوتن", factor: 1 },
        { name: "داين", factor: 1e5 },
        { name: "باوند-قوة", factor: 0.224809 },
        { name: "كيلوغرام-قوة", factor: 0.101972 },
      ],
    },
  ],
};

export default function UnitConverterPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isArabic = lang === "ar";
  const currentCategories = categories[lang as keyof typeof categories] || categories.en;

  const [category, setCategory] = useState(currentCategories[0]);
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(1);
  const [value, setValue] = useState("1");

  const swap = () => {
    setFromIdx(toIdx);
    setToIdx(fromIdx);
  };

  const convert = () => {
    const v = parseFloat(value);
    if (isNaN(v)) return "—";
    const from = category.units[fromIdx];
    const to = category.units[toIdx];
    const isTemp = category.name === "Temperature" || category.name === "الحرارة";
    if (isTemp) {
      let kelvin = v;
      const fromName = from.name;
      const toName = to.name;
      if (fromName === "Celsius" || fromName === "مئوية") kelvin = v + 273.15;
      else if (fromName === "Fahrenheit" || fromName === "فهرنهايت") kelvin = (v + 459.67) * 5 / 9;
      if (toName === "Celsius" || toName === "مئوية") return (kelvin - 273.15).toPrecision(6);
      if (toName === "Fahrenheit" || toName === "فهرنهايت") return (kelvin * 9 / 5 - 459.67).toPrecision(6);
      return kelvin.toPrecision(6);
    }
    const base = v / from.factor;
    return (base * to.factor).toPrecision(6);
  };

  return (
    <div className={`min-h-screen w-full pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 px-3 sm:px-6 md:px-8 lg:px-12 ${isArabic ? "rtl font-arabic" : ""}`}>
      <div className="w-full max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-violet-400/30 bg-violet-500/10 backdrop-blur-md mb-4">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-violet-400 animate-ping opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400" />
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-violet-200">
              {isArabic ? "أداة · فيزياء" : "Tool · Physics"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-violet-100 to-violet-300">
            {t("physics.converter.page_title", isArabic ? "محول الوحدات" : "Unit Converter")}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {t("physics.converter.description", isArabic ? "حول بين وحدات الفيزياء فوراً." : "Convert between physics units instantly.")}
          </p>
        </motion.div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap mb-5">
          {currentCategories.map((cat) => {
            const isActive = category.name === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  setCategory(cat);
                  setFromIdx(0);
                  setToIdx(1);
                }}
                className={`px-3.5 py-2 rounded-full text-[11px] sm:text-xs font-bold tracking-wide border transition-all ${
                  isActive
                    ? "bg-gradient-to-br from-violet-500 to-purple-700 text-white border-violet-400/60 shadow-[0_0_20px_-6px_rgba(139,92,246,0.6)]"
                    : "bg-white/[0.03] text-slate-300 border-white/10 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Conversion panel */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          key={category.name}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-5 sm:p-7"
        >
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-5 items-stretch">
            {/* From */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-violet-300/80">
                {t("physics.converter.from", isArabic ? "من" : "From")}
              </label>
              <select
                value={fromIdx}
                onChange={(e) => setFromIdx(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:border-violet-400/40 transition"
              >
                {category.units.map((u, i) => (
                  <option key={u.name} value={i} className="bg-slate-900">
                    {u.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-mono text-xl sm:text-2xl focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:border-violet-400/40 transition"
              />
            </div>

            {/* Swap button */}
            <div className="flex items-center justify-center">
              <button
                onClick={swap}
                className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-700/10 border border-violet-400/30 text-violet-200 hover:bg-violet-500/30 hover:text-white transition-all flex items-center justify-center group"
                title={isArabic ? "تبديل" : "Swap"}
              >
                <ArrowLeftRight className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>

            {/* To */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-violet-300/80">
                {t("physics.converter.to", isArabic ? "إلى" : "To")}
              </label>
              <select
                value={toIdx}
                onChange={(e) => setToIdx(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:border-violet-400/40 transition"
              >
                {category.units.map((u, i) => (
                  <option key={u.name} value={i} className="bg-slate-900">
                    {u.name}
                  </option>
                ))}
              </select>
              <div className="w-full px-4 py-3 rounded-xl bg-gradient-to-br from-violet-500/15 to-transparent border border-violet-400/30 text-violet-100 font-mono text-xl sm:text-2xl break-all min-h-[58px] flex items-center">
                {convert()}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

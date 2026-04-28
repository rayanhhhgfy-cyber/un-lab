import { useState, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Wind, CloudLightning, Globe, Radio, Info, AlertTriangle, Navigation, Thermometer } from "lucide-react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Stars } from '@react-three/drei';
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import ExperimentTabs from "@/components/ui/ExperimentTabs";
import EarthGlobe3D from "@/components/sims/earth/EarthGlobe3D";
import LabShell from "@/components/layout/LabShell";
import { motion, AnimatePresence } from "framer-motion";

/* ── Storm Dynamics ── */
function StormDynamicsSim() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [pressure, setPressure] = useState(1013);
  const [temp, setTemp] = useState(25);
  const [humidity, setHumidity] = useState(50);
  const windSpeed = Math.abs(1013 - pressure) * 2 + temp / 2;
  const rainChance = humidity > 60 ? (humidity - 60) * 2.5 : 0;
  
  const getCategory = (speed: number) => {
    if (speed > 120) return isArabic ? 'فئة-5' : 'Cat-5';
    if (speed > 100) return isArabic ? 'فئة-4' : 'Cat-4';
    if (speed > 80) return isArabic ? 'فئة-3' : 'Cat-3';
    if (speed > 60) return isArabic ? 'فئة-2' : 'Cat-2';
    if (speed > 40) return isArabic ? 'فئة-1' : 'Cat-1';
    return isArabic ? 'مداري' : 'Tropical';
  };

  const category = getCategory(windSpeed);

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="relative glass rounded-[2.5rem] min-h-[400px] lg:min-h-[600px] bg-[#050a1a] border-sky-500/20 overflow-hidden">
        <div className="absolute inset-0"><Canvas camera={{ position: [0, 0, 10], fov: 45 }}><ambientLight intensity={0.4} /><pointLight position={[10, 10, 10]} color="#38bdf8" intensity={2} /><Suspense fallback={null}><Float speed={1} rotationIntensity={0.2}><EarthGlobe3D stormIntensity={windSpeed} /></Float><Stars count={3000} fade /></Suspense><OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} /></Canvas></div>
        {/* HUD */}
        <div className="absolute top-6 left-6 z-10 space-y-3">
          <div className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 backdrop-blur-xl"><div className="flex items-center gap-2 text-blue-400 font-mono text-[10px]"><Radio size={12} className="animate-pulse" />{isArabic ? "عمليات الأرصاد // بث مباشر" : "MET-OPS // LIVE FEED"}</div></div>
          <div className="p-4 rounded-xl bg-black/60 border border-white/5 backdrop-blur-xl w-64 space-y-2 font-mono text-[10px]">
            <div className="flex justify-between"><span className="text-slate-500">{isArabic ? "تغير الضغط Δ:" : "ISOBARIC Δ:"}</span><span className="text-blue-400">{(pressure - 1013).toFixed(0)} {isArabic ? "هـ.باسكال" : "hPa"}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">{isArabic ? "الحمل الحراري:" : "CONVECTION:"}</span><span className="text-blue-400">{(temp / 4).toFixed(1)} {isArabic ? "ميجاجول/م²" : "MJ/m²"}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">{isArabic ? "سافير-سيمبسون:" : "SAFFIR-SIMPSON:"}</span><span className={windSpeed > 60 ? 'text-red-400' : 'text-blue-400'}>{category}</span></div>
          </div>
        </div>
        <AnimatePresence>{windSpeed > 60 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-6 right-6 z-10 px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-xl flex items-center gap-3"><AlertTriangle className="text-red-500 animate-bounce" size={20} /><div><div className="text-[10px] font-black text-red-500 uppercase tracking-widest">{isArabic ? "تنبيه إعصار" : "Cyclonic Alert"}</div></div></motion.div>)}</AnimatePresence>
      </div>
      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "إعدادات الغلاف الجوي" : "Atmospheric Config"}</h3>
          <ParamSlider label={isArabic ? "الضغط السطحي" : "Surface Pressure"} value={pressure} min={940} max={1050} step={1} unit="hPa" onChange={setPressure} />
          <ParamSlider label={isArabic ? "حرارة سطح البحر" : "Sea Surface Temp"} value={temp} min={-10} max={45} step={1} unit="°C" onChange={setTemp} />
          <ParamSlider label={isArabic ? "الرطوبة النسبية" : "Relative Humidity"} value={humidity} min={0} max={100} step={1} unit="%" onChange={setHumidity} />
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "التحليل" : "Analysis"}</h3>
          <ResultDisplay items={[{ label: isArabic ? "سرعة الرياح" : "Wind Speed", value: windSpeed.toFixed(1), unit: isArabic ? "كم/س" : "km/h" }, { label: isArabic ? "فرص الهطول" : "Precipitation", value: rainChance.toFixed(0), unit: "%" }, { label: isArabic ? "الطاقة" : "Energy", value: (temp * pressure / 1000).toFixed(1), unit: isArabic ? "كجول" : "kJ" }]} />
        </div>
      </div>
    </div>
  );
}

/* ── Coriolis Effect ── */
function CoriolisEffect() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [latitude, setLatitude] = useState(45);
  const [objectSpeed, setObjSpeed] = useState(100);
  const omega = 7.2921e-5;
  const f = 2 * omega * Math.sin(latitude * Math.PI / 180);
  const deflection = f * objectSpeed;

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="glass rounded-[2.5rem] p-6 lg:p-10 min-h-[400px] lg:min-h-[600px] bg-black/40 border-blue-500/20 flex flex-col items-center justify-center relative">
        {/* Earth Visualization */}
        <div className="w-64 h-64 rounded-full border-2 border-blue-500/20 relative bg-blue-950/20">
          {/* Latitude line */}
          <div className="absolute left-0 right-0 border-t border-dashed border-yellow-500/40" style={{ top: `${100 - latitude}%` }}>
            <span className={`absolute ${isArabic ? '-left-16' : '-right-16'} -top-2 text-[9px] font-mono text-yellow-400`}>{latitude}°{isArabic ? "شمالاً" : "N"}</span>
          </div>
          {/* Equator */}
          <div className="absolute left-0 right-0 top-1/2 border-t border-white/10"><span className={`absolute ${isArabic ? '-left-10' : '-right-10'} -top-2 text-[9px] font-mono text-slate-600`}>0°</span></div>
          {/* Moving object with deflection */}
          <motion.div animate={{ x: deflection * 5000, y: [-80, 80] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
          </motion.div>
          {/* Arrow showing deflection direction */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-cyan-400">
            {isArabic ? "الانحراف" : "Deflection"}: {latitude > 0 ? (isArabic ? "→ يميناً" : "→ Right") : (isArabic ? "← يساراً" : "← Left")}
          </div>
        </div>
        <div className="mt-8 text-center"><p className="text-lg font-black text-blue-400">f = {(f * 1e4).toFixed(3)} × 10⁻⁴ s⁻¹</p><p className="text-[10px] text-slate-500 font-mono mt-1">{isArabic ? "معامل كوريوليس" : "Coriolis Parameter"}</p></div>
      </div>
      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "المعلمات" : "Parameters"}</h3>
          <ParamSlider label={isArabic ? "خط العرض" : "Latitude"} value={latitude} min={0} max={90} step={1} unit={isArabic ? "°شمالاً" : "°N"} onChange={setLatitude} />
          <ParamSlider label={isArabic ? "سرعة الجسم" : "Object Speed"} value={objectSpeed} min={10} max={500} step={10} unit="m/s" onChange={setObjSpeed} />
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "الديناميكا" : "Dynamics"}</h3>
          <ResultDisplay items={[{ label: isArabic ? "كوريوليس f" : "Coriolis f", value: (f * 1e4).toFixed(4), unit: isArabic ? "×10⁻⁴/ث" : "×10⁻⁴/s" }, { label: isArabic ? "الانحراف" : "Deflection", value: (deflection * 1000).toFixed(2), unit: isArabic ? "م/ث²" : "m/s²" }, { label: isArabic ? "رقم روسبي" : "Rossby #", value: (objectSpeed / (f * 100000)).toFixed(2), unit: "" }]} />
        </div>
      </div>
    </div>
  );
}

/* ── Greenhouse Effect ── */
function GreenhouseSim() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [co2, setCo2] = useState(415);
  const [albedo, setAlbedo] = useState(30);
  const solarConstant = 1361;
  const absorbed = solarConstant * (1 - albedo / 100) / 4;
  const sigma = 5.67e-8;
  const greenhouse = 1 + (co2 - 280) / 1000 * 0.5;
  const surfaceTemp = Math.pow(absorbed * greenhouse / sigma, 0.25) - 273.15;
  const seaLevelRise = Math.max(0, (surfaceTemp - 14) * 0.7);

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="glass rounded-[2.5rem] p-6 lg:p-10 min-h-[400px] lg:min-h-[600px] bg-black/40 border-blue-500/20 flex flex-col items-center justify-center">
        <h3 className="text-xs font-black text-amber-400 uppercase tracking-widest mb-8">{isArabic ? "نموذج توازن الطاقة" : "Energy Balance Model"}</h3>
        {/* Layers Visualization */}
        <div className="w-full max-w-md space-y-2">
          <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center"><span className="text-[10px] font-mono text-yellow-400">☀ {isArabic ? "شمسي" : "SOLAR"}: {solarConstant} W/m²</span></div>
          <div className="flex justify-center"><div className="w-px h-8 bg-yellow-500/30" /></div>
          <div className="p-4 rounded-xl border border-white/10 text-center" style={{ backgroundColor: `rgba(251,191,36,${Math.min(0.3, (co2 - 280) / 1000)})` }}><span className="text-[10px] font-mono text-amber-400">{isArabic ? "طبقة CO₂" : "CO₂ LAYER"}: {co2} ppm // {isArabic ? "عامل الاحتباس" : "Greenhouse Factor"}: ×{greenhouse.toFixed(3)}</span></div>
          <div className="flex justify-center"><div className="w-px h-8 bg-orange-500/30" /></div>
          <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
            <div className="text-4xl font-black text-white">{surfaceTemp.toFixed(1)}°C</div>
            <div className="text-[10px] font-mono text-emerald-400 mt-1 uppercase">{isArabic ? "متوسط درجة حرارة السطح العالمية" : "GLOBAL MEAN SURFACE TEMPERATURE"}</div>
          </div>
          <div className="flex justify-center"><div className="w-px h-8 bg-blue-500/30" /></div>
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center"><span className="text-[10px] font-mono text-blue-400 uppercase">{isArabic ? "مستوى البحر" : "SEA LEVEL"}: +{seaLevelRise.toFixed(1)} m</span></div>
        </div>
      </div>
      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-amber-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "إعدادات الانبعاثات" : "Emissions Config"}</h3>
          <ParamSlider label={isArabic ? "تركيز CO₂" : "CO₂ Concentration"} value={co2} min={280} max={1000} step={5} unit="ppm" onChange={setCo2} />
          <ParamSlider label={isArabic ? "بياض الكوكب" : "Planetary Albedo"} value={albedo} min={10} max={60} step={1} unit="%" onChange={setAlbedo} />
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-amber-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "بيانات المناخ" : "Climate Data"}</h3>
          <ResultDisplay items={[{ label: isArabic ? "الممتص" : "Absorbed", value: absorbed.toFixed(0), unit: isArabic ? "واط/م²" : "W/m²" }, { label: isArabic ? "حرارة السطح" : "Surface T", value: surfaceTemp.toFixed(1), unit: "°C" }, { label: isArabic ? "ارتفاع البحر" : "Sea Rise", value: seaLevelRise.toFixed(1), unit: isArabic ? "م" : "m" }]} />
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function MeteorologyLab() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const tabs = [
    { id: "storm", label: isArabic ? "العواصف" : "Storm Dynamics", icon: <CloudLightning size={16} /> },
    { id: "coriolis", label: isArabic ? "كوريوليس" : "Coriolis Effect", icon: <Globe size={16} /> },
    { id: "greenhouse", label: isArabic ? "الاحتباس" : "Greenhouse Effect", icon: <Thermometer size={16} /> },
  ];
  const theories: Record<string, { en: string, ar: string }> = {
    storm: { 
      en: "How do giant storms like hurricanes form? They need two main ingredients: warm ocean water (like warm bath water) and the right kind of winds. When warm, wet air rises from the ocean, it creates a powerful swirling engine of clouds and rain. The warmer the water, the stronger the storm's 'engine' becomes! That's why scientists worry about ocean temperatures rising—it's like adding premium fuel to these massive, destructive storms.", 
      ar: "كيف تتشكل العواصف العملاقة مثل الأعاصير؟ إنها تحتاج إلى مكونين رئيسيين: مياه المحيط الدافئة (مثل ماء الاستحمام الدافئ) والنوع المناسب من الرياح. عندما يرتفع الهواء الدافئ الرطب من المحيط، يخلق محركاً دواراً قوياً من السحب والمطر. كلما زادت دفء المياه، أصبح 'محرك' العاصفة أقوى! لهذا السبب يشعر العلماء بالقلق من ارتفاع درجات حرارة المحيطات—فالأمر أشبه بإضافة وقود ممتاز لهذه العواصف الضخمة والمدمرة." 
    },
    coriolis: { 
      en: "Have you ever tried throwing a ball to a friend while riding a spinning merry-go-round? The ball seems to curve away magically! That's exactly what happens on Earth because our planet is constantly spinning. This invisible force is called the 'Coriolis Effect'. It makes winds and ocean currents curve to the right in the north and to the left in the south. It's the reason why hurricanes spin like giant pinwheels!", 
      ar: "هل حاولت يوماً رمي كرة لصديق أثناء ركوب دوامة الخيل الدوارة؟ تبدو الكرة وكأنها تنحرف بشكل سحري! هذا بالضبط ما يحدث على الأرض لأن كوكبنا يدور باستمرار. تسمى هذه القوة الخفية 'تأثير كوريوليس'. إنها تجعل الرياح والتيارات المحيطية تنحرف إلى اليمين في الشمال وإلى اليسار في الجنوب. وهذا هو السبب الذي يجعل الأعاصير تدور مثل عجلات الهواء العملاقة!" 
    },
    greenhouse: { 
      en: "Imagine Earth wearing a cozy blanket made of invisible gases (like Carbon Dioxide). This blanket traps the sun's heat, keeping our planet warm enough for life. But since humans started burning lots of coal, oil, and gas, we've essentially added extra, heavy layers to this blanket! The Earth is now trapping more heat than it should, causing 'Global Warming'. This extra heat melts ice caps, raises sea levels, and makes our weather much more extreme and unpredictable.", 
      ar: "تخيل أن الأرض ترتدي بطانية دافئة ومريحة مصنوعة من غازات غير مرئية (مثل ثاني أكسيد الكربون). تحبس هذه البطانية حرارة الشمس، مما يبقي كوكبنا دافئاً بما يكفي للحياة. ولكن منذ أن بدأ البشر بحرق الكثير من الفحم والنفط والغاز، أضفنا بشكل أساسي طبقات إضافية وثقيلة إلى هذه البطانية! أصبحت الأرض الآن تحبس حرارة أكثر مما ينبغي، مما يسبب 'الاحتباس الحراري'. هذه الحرارة الزائدة تذيب القمم الجليدية، وترفع مستويات سطح البحر، وتجعل طقسنا أكثر تطرفاً وتقلباً بكثير." 
    },
  };
  return (
    <LabShell
      backHref="/earth-science"
      backLabelEn="Earth Science Hub"
      backLabelAr="مركز علوم الأرض"
      sectorEn="Sector · Meteorology"
      sectorAr="القطاع · الأرصاد الجوية"
      titleEn="Meteorology Lab"
      titleAr="مختبر الأرصاد"
      descriptionEn="Spin up a virtual storm system, ride the Coriolis force across hemispheres, and dial up greenhouse gases to forecast a changing atmosphere."
      descriptionAr="حرّك نظاماً عاصفياً افتراضياً، ركب قوة كوريوليس عبر نصفَي الكرة، وارفع نسب غازات الدفيئة لتتنبأ بغلاف جوي متغيّر."
      theme="blue"
    >
      <ExperimentTabs tabs={tabs}>{(active) => (
        <div className="flex flex-col gap-5 sm:gap-6">
          {active === "storm" && <StormDynamicsSim />}
          {active === "coriolis" && <CoriolisEffect />}
          {active === "greenhouse" && <GreenhouseSim />}
          <div className="glass rounded-3xl p-6 sm:p-8 md:p-10 border-blue-500/15 bg-blue-500/[0.025]">
            <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-3 text-blue-300">
              <span className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center">
                <Info size={16} />
              </span>
              {isArabic ? "الإطار النظري" : "Theoretical Framework"}
            </h2>
            <p className="text-slate-300/90 leading-relaxed text-sm sm:text-base">{isArabic ? theories[active].ar : theories[active].en}</p>
          </div>
        </div>
      )}</ExperimentTabs>
    </LabShell>
  );
}

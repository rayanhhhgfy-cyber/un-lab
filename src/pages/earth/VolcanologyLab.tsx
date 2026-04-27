import { useState, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Flame, Mountain, Activity, Info, Play, RefreshCcw } from "lucide-react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import ExperimentTabs from "@/components/ui/ExperimentTabs";
import Volcano3D from "@/components/sims/earth/Volcano3D";
import LabShell from "@/components/layout/LabShell";
import { motion } from "framer-motion";

/* ── Eruption Sim ── */
function EruptionSim() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [intensity, setIntensity] = useState(0);
  const [viscosity, setViscosity] = useState(50);
  const [gasContent, setGasContent] = useState(30);
  const vei = Math.min(8, (intensity / 12 + gasContent / 20));
  const plumeHeight = intensity * 0.5;
  const lavaTemp = 1200 - viscosity * 3;
  
  const getEruptionType = (v: number) => {
    if (v > 70) return isArabic ? 'بليني' : 'Plinian';
    if (v > 40) return isArabic ? 'سترومبولي' : 'Strombolian';
    return isArabic ? 'هاواي' : 'Hawaiian';
  };

  const eruptionType = getEruptionType(viscosity);

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="relative glass rounded-[2.5rem] min-h-[400px] lg:min-h-[600px] bg-black/40 border-orange-500/20 overflow-hidden">
        <Canvas camera={{ position: [0, 5, 15], fov: 45 }}><ambientLight intensity={0.3} /><pointLight position={[10, 10, 10]} color="#ff4500" intensity={2} /><Suspense fallback={null}><Volcano3D eruptionIntensity={intensity} /><Stars count={3000} fade /></Suspense><OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} /></Canvas>
        {/* HUD */}
        <div className="absolute top-6 left-6 p-3 rounded-xl bg-black/60 border border-white/5 backdrop-blur-md"><div className="flex items-center gap-2 text-orange-400 font-mono text-[10px]"><Flame size={12} className="animate-pulse" />{isArabic ? "مراقبة غرفة الصهارة" : "MAGMA CHAMBER MONITOR"}</div></div>
        <div className="absolute top-6 right-6 text-right"><div className="text-4xl font-black text-orange-500">{lavaTemp}°C</div><div className="text-[10px] text-orange-400/50 font-mono uppercase">{isArabic ? "حرارة المركز" : "Core Temp"}</div></div>
        {intensity > 50 && <div className="absolute bottom-6 left-6 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-[10px] font-black text-red-400 uppercase tracking-widest animate-pulse">⚠ VEI {vei.toFixed(1)} — {isArabic ? "ثوران" : ""} {eruptionType}</div>}
      </div>
      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-orange-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "تحكم الثوران" : "Eruption Controls"}</h3>
          <ParamSlider label={isArabic ? "قوة الثوران" : "Eruption Power"} value={intensity} min={0} max={100} step={1} unit="MW" onChange={setIntensity} />
          <ParamSlider label={isArabic ? "لزوجة الصهارة" : "Magma Viscosity"} value={viscosity} min={10} max={100} step={1} unit="Pa·s" onChange={setViscosity} />
          <ParamSlider label={isArabic ? "الغاز المذاب" : "Dissolved Gas"} value={gasContent} min={5} max={80} step={1} unit="vol%" onChange={setGasContent} />
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-orange-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "قياسات بركانية" : "Volcanometry"}</h3>
          <ResultDisplay items={[{ label: isArabic ? "مؤشر الانفجار (VEI)" : "VEI", value: vei.toFixed(1), unit: "" }, { label: isArabic ? "العمود البركاني" : "Plume", value: plumeHeight.toFixed(0), unit: isArabic ? "كم" : "km" }, { label: isArabic ? "النوع" : "Type", value: eruptionType, unit: "" }, { label: isArabic ? "حرارة اللافـا" : "Lava Temp", value: lavaTemp.toString(), unit: "°C" }]} />
        </div>
      </div>
    </div>
  );
}

/* ── Magma Chemistry ── */
function MagmaChemistry() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [sio2, setSio2] = useState(52);
  
  const getMagmaType = (s: number) => {
    if (s < 45) return isArabic ? 'فائق القاعدية' : 'Ultramafic';
    if (s < 52) return isArabic ? 'قاعدي (بازلت)' : 'Mafic (Basalt)';
    if (s < 63) return isArabic ? 'متوسط (أنديزيت)' : 'Intermediate (Andesite)';
    if (s < 69) return isArabic ? 'حمضي (داسيت)' : 'Felsic (Dacite)';
    return isArabic ? 'حمضي (ريوليت)' : 'Felsic (Rhyolite)';
  };

  const magmaType = getMagmaType(sio2);
  const meltingT = 700 + (sio2 - 45) * 20;
  const density = 3.3 - sio2 / 200;
  const colors = ['#1a1a2e', '#16213e', '#0f3460', '#533483', '#e94560'];
  const colorIdx = Math.min(4, Math.floor((sio2 - 40) / 8));

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="glass rounded-[2.5rem] p-6 lg:p-10 min-h-[400px] lg:min-h-[600px] bg-black/40 border-orange-500/20 flex flex-col items-center justify-center">
        <h3 className="text-xs font-black text-orange-400 uppercase tracking-widest mb-8">{isArabic ? "مخطط الطور التركيبي" : "Compositional Phase Diagram"}</h3>
        {/* SiO2 bar visualization */}
        <div className="w-full max-w-md space-y-6">
          {/* Composition Bars */}
          {[
            { label: 'SiO₂', value: sio2, color: '#e94560' },
            { label: 'Al₂O₃', value: Math.max(0, 16 - (sio2 - 50) * 0.1), color: '#533483' },
            { label: 'FeO+MgO', value: Math.max(0, 25 - sio2 * 0.3), color: '#0f3460' },
            { label: 'CaO', value: Math.max(0, 12 - (sio2 - 45) * 0.15), color: '#16213e' },
            { label: 'Na₂O+K₂O', value: Math.max(0, (sio2 - 45) * 0.12), color: '#fbbf24' },
          ].map(c => (
            <div key={c.label}>
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1"><span>{c.label}</span><span>{c.value.toFixed(1)}%</span></div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden"><motion.div animate={{ width: `${c.value}%` }} className="h-full rounded-full" style={{ backgroundColor: c.color }} /></div>
            </div>
          ))}
          {/* Magma Type */}
          <div className="mt-8 p-6 rounded-2xl text-center" style={{ backgroundColor: `${colors[colorIdx]}30`, borderColor: `${colors[colorIdx]}50`, borderWidth: 1, borderStyle: 'solid' }}>
            <div className="text-2xl font-black text-white">{magmaType}</div>
            <div className="text-[10px] font-mono text-slate-400 mt-1 uppercase">{isArabic ? "التصنيف" : "CLASSIFICATION"}</div>
          </div>
        </div>
      </div>
      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-orange-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "علم الصخور" : "Petrology"}</h3>
          <ParamSlider label={isArabic ? "محتوى SiO₂" : "SiO₂ Content"} value={sio2} min={40} max={80} step={1} unit="wt%" onChange={setSio2} />
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-orange-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "الخصائص الفيزيائية" : "Physical Properties"}</h3>
          <ResultDisplay items={[{ label: isArabic ? "حرارة الانصهار" : "Melting T", value: meltingT.toFixed(0), unit: "°C" }, { label: isArabic ? "الكثافة" : "Density", value: density.toFixed(2), unit: isArabic ? "غم/سم³" : "g/cm³" }, { label: isArabic ? "اللزوجة" : "Viscosity", value: sio2 > 65 ? "10⁶" : sio2 > 52 ? "10⁴" : "10²", unit: isArabic ? "باسكال.ث" : "Pa·s" }]} />
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function VolcanologyLab() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const tabs = [
    { id: "eruption", label: isArabic ? "الانفجار" : "Eruption Dynamics", icon: <Flame size={16} /> },
    { id: "magma", label: isArabic ? "كيمياء الصهارة" : "Magma Chemistry", icon: <Activity size={16} /> },
  ];
  const theories: Record<string, { en: string, ar: string }> = {
    eruption: { 
      en: "Imagine shaking a bottle of soda and taking off the cap—that's exactly how volcanic eruptions work! The power of an eruption (measured by the VEI scale) depends on two things: how thick the magma is, and how much gas is trapped inside. If the magma is runny, the gases escape easily, giving us gentle lava rivers like in Hawaii. But if the magma is thick and sticky, it traps the gases until the pressure becomes too great, resulting in a massive, explosive eruption that blasts ash miles into the sky.", 
      ar: "تخيل أنك ترج زجاجة مشروب غازي ثم تفتح غطاءها فجأة—هكذا تماماً تعمل البراكين! تعتمد قوة الثوران البركاني على أمرين: مدى لزوجة الصهارة (الماجما)، وكمية الغازات المحبوسة بداخلها. إذا كانت الصهارة سائلة، تهرب الغازات بسهولة مكونة أنهاراً هادئة من الحمم كما في هاواي. أما إذا كانت شديدة اللزوجة، فإنها تحبس الغازات حتى يصبح الضغط هائلاً، مما يؤدي إلى انفجار ضخم يقذف الرماد لأميال في السماء." 
    },
    magma: { 
      en: "Think of magma as a hot, molten soup made of different rocks and minerals. The most important ingredient in this soup is silica. Silica acts like a thickener—the more silica the magma has, the thicker and cooler it becomes. Dark, runny magmas (like basalt) have low silica and create heavy ocean floors. Lighter, thicker magmas (like granite) have high silica and build our continents. As this molten soup cools down, different minerals form crystals at different temperatures, completely changing the final rock!", 
      ar: "تخيل أن الصهارة عبارة عن حساء ساخن ومذاب من الصخور والمعادن المختلفة. المكون الأهم في هذا الحساء هو 'السيليكا'. تعمل السيليكا كمادة مكثفة—فكلما زادت نسبة السيليكا، أصبحت الصهارة أكثر لزوجة وبرودة. الصهارة الداكنة والسائلة (مثل البازلت) تحتوي على سيليكا أقل وتكون قيعان المحيطات الثقيلة. بينما الصهارة الفاتحة والسميكة (مثل الجرانيت) تحتوي على سيليكا أكثر وتبني قاراتنا. ومع تبريد هذا الحساء، تتشكل بلورات معادن مختلفة عند درجات حرارة مختلفة لتصنع الصخور التي نعرفها!" 
    },
  };
  return (
    <LabShell
      backHref="/earth-science"
      backLabelEn="Earth Science Hub"
      backLabelAr="مركز علوم الأرض"
      sectorEn="Sector · Volcanology"
      sectorAr="القطاع · علم البراكين"
      titleEn="Volcanology Lab"
      titleAr="مختبر البراكين"
      descriptionEn="Stand at the rim of a virtual caldera — control magma viscosity, trigger pyroclastic eruptions, and decode the chemistry of molten rock."
      descriptionAr="قف على حافة فوهة افتراضية — تحكم في لزوجة الصهارة، أطلق ثورات بركانية، وافكّ شفرة كيمياء الصخور المنصهرة."
      theme="amber"
    >
      <ExperimentTabs tabs={tabs}>{(active) => (
        <div className="flex flex-col gap-5 sm:gap-6">
          {active === "eruption" && <EruptionSim />}
          {active === "magma" && <MagmaChemistry />}
          <div className="glass rounded-3xl p-6 sm:p-8 md:p-10 border-amber-500/15 bg-amber-500/[0.025]">
            <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-3 text-amber-300">
              <span className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center">
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

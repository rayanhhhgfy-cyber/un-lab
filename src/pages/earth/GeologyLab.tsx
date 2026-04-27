import { useState, Suspense, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { ArrowLeft, Mountain, MoveHorizontal, Activity, Info, Globe, Gem } from "lucide-react";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Box, Sphere } from '@react-three/drei';
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import ExperimentTabs from "@/components/ui/ExperimentTabs";
import * as THREE from 'three';
import { motion } from "framer-motion";

function PlateTectonics3D({ drift = 1 }) {
  const p1 = useRef<THREE.Mesh>(null); const p2 = useRef<THREE.Mesh>(null);
  useFrame((s) => { if (p1.current && p2.current) { const o = Math.sin(s.clock.getElapsedTime() * 0.5) * drift; p1.current.position.x = -2.1 + o; p2.current.position.x = 2.1 - o; } });
  return (<group><Box ref={p1} args={[4, 1, 4]} position={[-2.1, 0, 0]}><meshStandardMaterial color="#444" /></Box><Box ref={p2} args={[4, 1, 4]} position={[2.1, 0, 0]}><meshStandardMaterial color="#555" /></Box><Box args={[10, 0.5, 6]} position={[0, -0.8, 0]}><meshStandardMaterial color="#ff4500" emissive="#ff4500" emissiveIntensity={0.5} /></Box></group>);
}

/* ── Plate Tectonics ── */
function TectonicsSim() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [drift, setDrift] = useState(2);
  const [type, setType] = useState<'convergent' | 'divergent' | 'transform'>('convergent');
  
  const getLabel = (t: string) => {
    if (t === 'convergent') return isArabic ? 'متقاربة' : 'Convergent';
    if (t === 'divergent') return isArabic ? 'متباعدة' : 'Divergent';
    return isArabic ? 'تحويلية' : 'Transform';
  };

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="relative glass rounded-[2.5rem] min-h-[400px] lg:min-h-[600px] bg-black/40 border-amber-500/20 overflow-hidden">
        <Canvas camera={{ position: [0, 5, 10], fov: 45 }}><ambientLight intensity={0.5} /><pointLight position={[10, 10, 10]} color="#fbbf24" intensity={1.5} /><Suspense fallback={null}><PlateTectonics3D drift={drift} /><Stars count={3000} fade /></Suspense><OrbitControls enableZoom={false} /></Canvas>
        <div className="absolute top-6 left-6 p-3 rounded-xl bg-black/60 border border-white/5 backdrop-blur-md"><div className="flex items-center gap-2 text-amber-400 font-mono text-[10px]"><Globe size={12} className="animate-pulse" />{isArabic ? "ديناميكا القشرة" : "CRUSTAL DYNAMICS"}</div></div>
        <div className="absolute bottom-6 left-6 flex gap-2">{(['convergent', 'divergent', 'transform'] as const).map(t => <button key={t} onClick={() => setType(t)} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase ${type === t ? 'bg-amber-500 text-white' : 'bg-white/5 text-slate-400'}`}>{getLabel(t)}</button>)}</div>
      </div>
      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-amber-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "إعدادات الصفائح" : "Plate Config"}</h3>
          <ParamSlider label={isArabic ? "سرعة الانجراف" : "Drift Velocity"} value={drift} min={0.5} max={10} step={0.5} unit={isArabic ? "سم/سنة" : "cm/yr"} onChange={setDrift} />
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-amber-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "علم الزلازل" : "Seismology"}</h3>
          <ResultDisplay items={[{ label: isArabic ? "الإجهاد" : "Stress", value: (drift * 2.5).toFixed(1), unit: isArabic ? "جيجاباسكال" : "GPa" }, { label: isArabic ? "القدرة المتوقعة" : "Potential Mag", value: (drift * 0.9).toFixed(1), unit: isArabic ? "مقياس عزم" : "Mw" }, { label: isArabic ? "الحدود" : "Boundary", value: getLabel(type), unit: "" }]} />
        </div>
      </div>
    </div>
  );
}

/* ── Mineralogy ── */
function MineralogySim() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [hardness, setHardness] = useState(5);
  const [density, setDensity] = useState(2.7);
  
  const minerals = [
    { name: isArabic ? 'تالك' : 'Talc', h: 1, d: 2.75, color: '#e2e8f0', crystal: isArabic ? 'أحادي الميل' : 'Monoclinic' },
    { name: isArabic ? 'جبس' : 'Gypsum', h: 2, d: 2.32, color: '#f1f5f9', crystal: isArabic ? 'أحادي الميل' : 'Monoclinic' },
    { name: isArabic ? 'كالسيت' : 'Calcite', h: 3, d: 2.71, color: '#fef3c7', crystal: isArabic ? 'ثلاثي' : 'Trigonal' },
    { name: isArabic ? 'فلوريت' : 'Fluorite', h: 4, d: 3.18, color: '#a78bfa', crystal: isArabic ? 'متساوي القياس' : 'Isometric' },
    { name: isArabic ? 'أباتيت' : 'Apatite', h: 5, d: 3.19, color: '#34d399', crystal: isArabic ? 'سداسي' : 'Hexagonal' },
    { name: isArabic ? 'أورثوكليز' : 'Orthoclase', h: 6, d: 2.56, color: '#fca5a5', crystal: isArabic ? 'أحادي الميل' : 'Monoclinic' },
    { name: isArabic ? 'كوارتز' : 'Quartz', h: 7, d: 2.65, color: '#93c5fd', crystal: isArabic ? 'ثلاثي' : 'Trigonal' },
    { name: isArabic ? 'توباز' : 'Topaz', h: 8, d: 3.53, color: '#fbbf24', crystal: isArabic ? 'معيني متعامد' : 'Orthorhombic' },
    { name: isArabic ? 'كوروندوم' : 'Corundum', h: 9, d: 4.02, color: '#f43f5e', crystal: isArabic ? 'ثلاثي' : 'Trigonal' },
    { name: isArabic ? 'ماس' : 'Diamond', h: 10, d: 3.52, color: '#e2e8f0', crystal: isArabic ? 'متساوي القياس' : 'Isometric' },
  ];
  
  const closest = minerals.reduce((prev, curr) => Math.abs(curr.h - hardness) < Math.abs(prev.h - hardness) ? curr : prev);

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="glass rounded-[2.5rem] p-6 lg:p-10 min-h-[400px] lg:min-h-[600px] bg-black/40 border-amber-500/20 flex flex-col items-center justify-center">
        <h3 className="text-xs font-black text-amber-400 uppercase tracking-widest mb-8">{isArabic ? "مقياس موس للصلابة" : "Mohs Hardness Scale"}</h3>
        <div className="w-full max-w-lg space-y-2">
          {minerals.map((m) => (
            <div key={m.name} className={`flex items-center gap-4 p-3 rounded-xl transition-all ${m.h === closest.h ? 'bg-white/10 border border-white/20 scale-105' : 'bg-white/[0.02]'}`}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm" style={{ backgroundColor: `${m.color}20`, color: m.color }}>{m.h}</div>
              <div className="flex-1"><div className="font-bold text-sm">{m.name}</div><div className="text-[10px] text-slate-500">{m.crystal} • ρ = {m.d} {isArabic ? "غم/سم³" : "g/cm³"}</div></div>
              <div className="h-2 flex-1 bg-white/5 rounded-full overflow-hidden"><motion.div animate={{ width: `${m.h * 10}%` }} className="h-full rounded-full" style={{ backgroundColor: m.color }} /></div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-amber-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "التعريف" : "Identification"}</h3>
          <ParamSlider label={isArabic ? "الصلابة" : "Hardness"} value={hardness} min={1} max={10} step={0.5} unit="Mohs" onChange={setHardness} />
          <ParamSlider label={isArabic ? "الكثافة" : "Density"} value={density} min={1} max={5} step={0.1} unit="g/cm³" onChange={setDensity} />
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-amber-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "المطابقة" : "Match"}: {closest.name}</h3>
          <ResultDisplay items={[{ label: isArabic ? "البلورة" : "Crystal", value: closest.crystal, unit: "" }, { label: isArabic ? "الكثافة" : "Density", value: closest.d.toString(), unit: isArabic ? "غم/سم³" : "g/cm³" }, { label: isArabic ? "الفئة" : "Category", value: closest.h >= 7 ? (isArabic ? "حجر كريم" : "Gemstone") : (isArabic ? "مكون للصخور" : "Rock-forming"), unit: "" }]} />
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function GeologyLab() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const tabs = [
    { id: "tectonics", label: isArabic ? "الصفائح التكتونية" : "Plate Tectonics", icon: <MoveHorizontal size={16} /> },
    { id: "minerals", label: isArabic ? "المعادن" : "Mineralogy", icon: <Gem size={16} /> },
  ];
  const theories: Record<string, { en: string, ar: string }> = {
    tectonics: { 
      en: "Did you know the ground beneath your feet is moving? Earth's outer shell isn't one solid piece—it's cracked into giant puzzle pieces called 'tectonic plates'. These plates float on a layer of hot, flowing rock deep underground. Sometimes they crash into each other, pushing up massive mountains or causing earthquakes. Sometimes they pull apart, creating new ocean floors. And sometimes they just grind past each other. This slow, endless shifting is what shapes our entire planet!", 
      ar: "هل تعلم أن الأرض التي تحت قدميك تتحرك؟ القشرة الخارجية للأرض ليست قطعة صلبة واحدة—بل هي مشققة إلى قطع أحجية عملاقة تسمى 'الصفائح التكتونية'. تطفو هذه الصفائح على طبقة من الصخور الساخنة والمتدفقة في أعماق الأرض. أحياناً تصطدم ببعضها البعض، لترفع جبالاً ضخمة أو تسبب زلازل. وأحياناً تتباعد، لتخلق قيعان محيطات جديدة. وأحياناً تنزلق فقط بجانب بعضها البعض. هذه الحركة البطيئة والتي لا تنتهي هي ما يشكل كوكبنا بأكمله!" 
    },
    minerals: { 
      en: "Minerals are the basic building blocks of rocks, and scientists use a clever trick called the 'Mohs Scale' to tell them apart. It's simply a scratch test! The scale goes from 1 to 10. Talc is so soft (level 1) you can scratch it with your fingernail. Diamonds are so incredibly hard (level 10) that only another diamond can scratch them! By testing what scratches what, we can easily identify different minerals hidden in the Earth.", 
      ar: "المعادن هي اللبنات الأساسية للصخور، ويستخدم العلماء حيلة ذكية تسمى 'مقياس موس' للتمييز بينها. إنه ببساطة اختبار للخدش! يمتد المقياس من 1 إلى 10. التلك ناعم جداً (المستوى 1) لدرجة أنه يمكنك خدشه بظفرك. بينما الماس صلب للغاية (المستوى 10) لدرجة أن ماساً آخر فقط يمكنه خدشه! من خلال اختبار 'ماذا يخدش ماذا'، يمكننا بسهولة تحديد المعادن المختلفة المخبأة في الأرض." 
    },
  };
  return (
    <div className={`min-h-screen w-full pt-24 pb-20 px-4 md:px-12 bg-[#020202] text-white ${isArabic ? 'rtl font-arabic' : 'font-sans'}`}>
      <div className="max-w-[1600px] mx-auto">
        <Link to="/earth-science" className="inline-flex items-center gap-3 text-slate-500 hover:text-amber-400 mb-12 transition-all group"><div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-amber-500/10"><ArrowLeft size={20} className={isArabic ? 'rotate-180' : ''} /></div><span className="font-bold tracking-widest text-[10px] uppercase">{isArabic ? "مركز علوم الأرض" : "Earth Science Hub"}</span></Link>
        <div className="mb-12"><div className="flex items-center gap-4 mb-4"><div className="h-px w-12 bg-amber-500/50" /><span className="text-amber-500 font-mono text-xs tracking-[0.5em] uppercase">{isArabic ? "الجيولوجيا" : "Geology"}</span></div><h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-br from-white to-amber-500 bg-clip-text text-transparent">{isArabic ? "مختبر الجيولوجيا" : "Geology Lab"}</h1></div>
        <ExperimentTabs tabs={tabs}>{(active) => (
          <div className="flex flex-col gap-6 lg:p-10">
            {active === "tectonics" && <TectonicsSim />}
            {active === "minerals" && <MineralogySim />}
            <div className="glass rounded-[2.5rem] p-6 lg:p-10 border-amber-500/10 bg-amber-500/[0.02]"><h2 className="text-xl font-black mb-5 flex items-center gap-3 text-amber-400"><Info size={20} />{isArabic ? "الإطار النظري" : "Theoretical Framework"}</h2><p className="text-slate-300 leading-relaxed text-base">{isArabic ? theories[active].ar : theories[active].en}</p></div>
          </div>
        )}</ExperimentTabs>
      </div>
    </div>
  );
}

import { useState, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Biohazard, Info, Activity, Play, RefreshCcw } from "lucide-react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Stars } from '@react-three/drei';
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import ExperimentTabs from "@/components/ui/ExperimentTabs";
import Bacteria3D from "@/components/sims/biology/Bacteria3D";
import LabShell from "@/components/layout/LabShell";
import { motion } from "framer-motion";

/* ── Bacterial Growth Curve ── */
function BacterialGrowthSim() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [temp, setTemp] = useState(37);
  const [nutrients, setNutrients] = useState(80);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [population, setPopulation] = useState<number[]>([10]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTime(t => {
        const newT = t + 1;
        if (newT > 48) { setRunning(false); return t; }
        setPopulation(prev => {
          const last = prev[prev.length - 1];
          const growthRate = (temp > 25 && temp < 45) ? (nutrients / 100) * 0.3 : 0.05;
          const capacity = nutrients * 100;
          const newPop = last + last * growthRate * (1 - last / capacity);
          return [...prev, Math.max(1, Math.min(newPop, capacity))];
        });
        return newT;
      });
    }, 100);
    return () => clearInterval(id);
  }, [running, temp, nutrients]);

  const reset = () => { setTime(0); setPopulation([10]); setRunning(false); };

  const getPhaseLabel = (t: number) => {
    if (t < 4) return isArabic ? "مرحلة التأخر" : "Lag";
    if (t < 24) return isArabic ? "المرحلة اللوغاريتمية" : "Log";
    if (t < 40) return isArabic ? "مرحلة الثبات" : "Stationary";
    return isArabic ? "مرحلة الموت" : "Death";
  };

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="glass rounded-[2.5rem] min-h-[350px] lg:min-h-[550px] bg-black/40 border-cyan-500/20 relative overflow-hidden">
        {/* 3D Bacteria Background */}
        <div className="absolute inset-0 opacity-30"><Canvas camera={{ position: [0, 0, 8] }}><ambientLight intensity={0.5} /><pointLight position={[5, 5, 5]} color="#06b6d4" intensity={2} /><Suspense fallback={null}><Float speed={3}><Bacteria3D activity={running ? 3 : 1} /></Float><Stars count={2000} fade /></Suspense><OrbitControls enableZoom={false} autoRotate /></Canvas></div>
        
        {/* Growth Curve Graph */}
        <div className="relative z-10 p-6 lg:p-10 h-full flex flex-col justify-center">
          <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-4">{isArabic ? "منحنى النمو (المرحلة اللوغاريتمية)" : "Growth Curve (Log Phase)"}</h3>
          <div className="h-64 bg-black/40 rounded-2xl border border-white/5 p-4 relative">
            <svg viewBox="0 0 500 200" className="w-full h-full" preserveAspectRatio="none">
              {/* Grid */}
              {[0, 50, 100, 150, 200].map(y => <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="white" strokeWidth="0.3" opacity="0.05" />)}
              {/* Curve */}
              <polyline fill="none" stroke="#06b6d4" strokeWidth="2" points={population.map((p, i) => `${(i / 48) * 500},${200 - (Math.log10(Math.max(p, 1)) / Math.log10(nutrients * 100)) * 180}`).join(' ')} />
            </svg>
            <div className={`absolute bottom-2 ${isArabic ? 'right-4' : 'left-4'} text-[9px] font-mono text-slate-600`}>{isArabic ? "الزمن (س)" : "Time (h)"}</div>
            <div className={`absolute top-2 ${isArabic ? 'right-4' : 'left-4'} text-[9px] font-mono text-slate-600`}>Log₁₀(CFU/mL)</div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-[10px] font-mono text-cyan-400/60 uppercase">{isArabic ? "الزمن" : "T"} = {time}{isArabic ? "س" : "h"}</div>
            <div className="text-[10px] font-mono text-cyan-400/60 uppercase">{isArabic ? "العدد" : "N"} = {population[population.length - 1].toFixed(0)} CFU/mL</div>
          </div>
        </div>
      </div>
      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-cyan-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "تحكم المزرعة" : "Culture Controls"}</h3>
          <ParamSlider label={isArabic ? "حرارة التحضين" : "Incubation Temp"} value={temp} min={15} max={50} step={1} unit="°C" onChange={setTemp} />
          <ParamSlider label={isArabic ? "مستوى المغذيات" : "Nutrient Level"} value={nutrients} min={10} max={100} step={1} unit="%" onChange={setNutrients} />
          <div className="flex gap-3 mt-8"><button onClick={() => { reset(); setRunning(true); }} className="flex-1 py-4 rounded-xl bg-cyan-500 text-white font-black active:scale-95 flex items-center justify-center gap-2"><Play size={16} />{isArabic ? "تلقيح" : "Inoculate"}</button><button onClick={reset} className="p-4 rounded-xl bg-white/5 hover:bg-white/10"><RefreshCcw size={16} /></button></div>
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-cyan-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "تحليل المستعمرات" : "Colony Analysis"}</h3>
          <ResultDisplay items={[{ label: isArabic ? "التعداد" : "Population", value: population[population.length - 1].toFixed(0), unit: isArabic ? "وحدة" : "CFU" }, { label: isArabic ? "زمن الجيل" : "Generation Time", value: ((temp > 25 && temp < 45) ? (20 / (nutrients / 100)).toFixed(0) : "∞"), unit: isArabic ? "د" : "min" }, { label: isArabic ? "المرحلة" : "Phase", value: getPhaseLabel(time), unit: "" }]} />
        </div>
      </div>
    </div>
  );
}

/* ── Antibiotic Resistance Sim ── */
function AntibioticSim() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [dosage, setDosage] = useState(50);
  const [resistanceRate, setResistance] = useState(10);
  const totalBacteria = 1000;
  const killed = Math.floor(totalBacteria * (dosage / 100) * (1 - resistanceRate / 100));
  const survived = totalBacteria - killed;
  const resistant = Math.floor(survived * (resistanceRate / 100));

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="glass rounded-[2.5rem] p-6 lg:p-10 min-h-[350px] lg:min-h-[550px] bg-black/40 border-cyan-500/20 flex flex-col items-center justify-center">
        <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-8">{isArabic ? "تعداد البكتيريا بعد العلاج" : "Bacterial Population After Treatment"}</h3>
        {/* Petri Dish Visualization */}
        <div className="w-72 h-72 rounded-full border-2 border-white/10 relative bg-black/40 overflow-hidden">
          {/* Killed bacteria (faded dots) */}
          {Array.from({ length: Math.min(killed / 10, 50) }).map((_, i) => (
            <div key={`k${i}`} className="absolute w-2 h-2 rounded-full bg-slate-700" style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%` }} />
          ))}
          {/* Surviving bacteria (bright dots) */}
          {Array.from({ length: Math.min(survived / 10, 50) }).map((_, i) => (
            <motion.div key={`s${i}`} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1 + Math.random(), repeat: Infinity }} className="absolute w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.8)]" style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%` }} />
          ))}
          {/* Resistant (red dots) */}
          {Array.from({ length: Math.min(resistant / 5, 20) }).map((_, i) => (
            <motion.div key={`r${i}`} animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="absolute w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%` }} />
          ))}
          {/* Antibiotic zone */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-yellow-500/30" />
          </div>
        </div>
        <div className="flex gap-6 mt-8 text-[10px] font-mono uppercase tracking-widest">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-600" />{isArabic ? "ميتة" : "Dead"}: {killed}</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-cyan-500" />{isArabic ? "حية" : "Alive"}: {survived - resistant}</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" />{isArabic ? "مقاومة" : "Resistant"}: {resistant}</div>
        </div>
      </div>
      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-cyan-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "بروتوكول العلاج" : "Treatment Protocol"}</h3>
          <ParamSlider label={isArabic ? "جرعة المضاد" : "Antibiotic Dose"} value={dosage} min={0} max={100} step={1} unit="mg/L" onChange={setDosage} />
          <ParamSlider label={isArabic ? "المقاومة المسبقة" : "Pre-Resistance"} value={resistanceRate} min={0} max={50} step={1} unit="%" onChange={setResistance} />
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-cyan-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "فعالية العلاج" : "Treatment Efficacy"}</h3>
          <ResultDisplay items={[{ label: isArabic ? "معدل القتل" : "Kill Rate", value: (killed / totalBacteria * 100).toFixed(1), unit: "%" }, { label: isArabic ? "أقل تركيز مثبط (MIC)" : "MIC", value: (100 - dosage + resistanceRate).toFixed(0), unit: isArabic ? "ميكروغرام/مل" : "μg/mL" }, { label: isArabic ? "الخطر" : "Risk", value: resistant > 50 ? (isArabic ? "حرج" : "Critical") : resistant > 10 ? (isArabic ? "متوسط" : "Moderate") : (isArabic ? "منخفض" : "Low"), unit: "" }]} />
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function MicrobiologyLab() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const tabs = [
    { id: "growth", label: isArabic ? "منحنى النمو" : "Growth Curve", icon: <Activity size={16} /> },
    { id: "antibiotic", label: isArabic ? "مقاومة المضادات" : "Antibiotic Resistance", icon: <Biohazard size={16} /> },
  ];
  const theories: Record<string, { en: string, ar: string }> = {
    growth: { 
      en: "Bacteria grow differently than we do—they multiply by simply splitting in half! When placed in a new home, they go through four phases. First is the 'Lag Phase', where they just get comfortable and prepare to grow. Second is the 'Log Phase', where they multiply incredibly fast (like a snowball rolling down a hill). Third is the 'Stationary Phase', where food starts running out, so the number of new bacteria equals the number dying. Finally, in the 'Death Phase', food is gone and toxic waste builds up, causing the population to shrink.", 
      ar: "تنمو البكتيريا بطريقة مختلفة عنا—فهي تتكاثر ببساطة عن طريق الانقسام إلى نصفين! عندما توضع البكتيريا في بيئة جديدة، تمر بأربع مراحل. الأولى هي 'مرحلة التأخر'، حيث تعتاد على المكان وتستعد للنمو. الثانية هي 'المرحلة اللوغاريتمية'، حيث تتكاثر بسرعة هائلة (مثل كرة ثلج تتدحرج من تلة). الثالثة هي 'مرحلة الثبات'، حيث يبدأ الطعام بالنفاذ، فتصبح أعداد البكتيريا الجديدة مساوية للتي تموت. وأخيراً في 'مرحلة الموت'، ينتهي الطعام وتتراكم الفضلات السامة، مما يؤدي إلى تراجع أعدادها." 
    },
    antibiotic: { 
      en: "Antibiotics are like specialized weapons designed to destroy bacteria without harming us. But bacteria are great survivors! Sometimes, a random mutation gives a bacterium a 'shield' against the antibiotic. Even worse, bacteria can share these shield instructions with each other, like passing a cheat sheet during a test! If we use antibiotics too often or incorrectly, we accidentally kill off all the weak bacteria, leaving only the super-strong 'shielded' ones behind. This is how antibiotic-resistant 'superbugs' are created.", 
      ar: "المضادات الحيوية تشبه أسلحة متخصصة مصممة لتدمير البكتيريا دون الإضرار بنا. لكن البكتيريا بارعة جداً في البقاء! أحياناً، تمنح طفرة عشوائية بكتيريا معينة 'درعاً' يحميها من المضاد الحيوي. والأسوأ من ذلك، يمكن للبكتيريا أن تشارك تعليمات بناء هذا الدرع مع بكتيريا أخرى، وكأنها تمرر 'ورقة غش' أثناء الامتحان! إذا استخدمنا المضادات الحيوية بشكل متكرر أو خاطئ، فإننا نقتل البكتيريا الضعيفة بالخطأ، ونبقي فقط على البكتيريا الخارقة المزودة بـ 'الدروع'. هكذا تنشأ البكتيريا الخارقة المقاومة للمضادات." 
    },
  };
  return (
    <LabShell
      backHref="/biology"
      backLabelEn="Biology Hub"
      backLabelAr="مركز الأحياء"
      sectorEn="Sector · Microbiology"
      sectorAr="القطاع · الأحياء الدقيقة"
      titleEn="Microbiology Lab"
      titleAr="مختبر الأحياء الدقيقة"
      descriptionEn="Cultivate colonies under glass, watch growth curves rise through their phases, and challenge bacteria with antibiotics to study resistance."
      descriptionAr="استنبت المستعمرات تحت الزجاج، شاهد منحنيات النمو تصعد عبر مراحلها، واختبر مقاومة البكتيريا للمضادات الحيوية."
      theme="cyan"
    >
      <ExperimentTabs tabs={tabs}>{(active) => (
        <div className="flex flex-col gap-5 sm:gap-6">
          {active === "growth" && <BacterialGrowthSim />}
          {active === "antibiotic" && <AntibioticSim />}
          <div className="glass rounded-3xl p-6 sm:p-8 md:p-10 border-cyan-500/15 bg-cyan-500/[0.025]">
            <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-3 text-cyan-300">
              <span className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center">
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

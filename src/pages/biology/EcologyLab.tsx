import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Leaf, Trees, Bug, Info, Users } from "lucide-react";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import ExperimentTabs from "@/components/ui/ExperimentTabs";
import LabShell from "@/components/layout/LabShell";
import { motion } from "framer-motion";

/* ── Predator-Prey (Lotka-Volterra) ── */
function LotkaVolterra() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [preyGrowth, setPreyGrowth] = useState(1.0);
  const [predRate, setPredRate] = useState(0.1);
  const [preyInit, setPreyInit] = useState(40);
  const [predInit, setPredInit] = useState(9);
  const [data, setData] = useState<{prey:number,pred:number}[]>([]);

  useEffect(() => {
    const dt = 0.05; const steps = 600;
    let x = preyInit, y = predInit;
    const d: {prey:number,pred:number}[] = [];
    for (let i = 0; i < steps; i++) {
      const dx = (preyGrowth * x - predRate * x * y) * dt;
      const dy = (0.02 * x * y - 0.4 * y) * dt;
      x = Math.max(0, x + dx); y = Math.max(0, y + dy);
      d.push({ prey: x, pred: y });
    }
    setData(d);
  }, [preyGrowth, predRate, preyInit, predInit]);

  const maxVal = Math.max(...data.map(d => Math.max(d.prey, d.pred)), 1);

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="glass rounded-[2.5rem] p-6 lg:p-10 min-h-[350px] lg:min-h-[550px] bg-black/40 border-green-500/20 flex flex-col justify-center">
        <h3 className="text-xs font-black text-green-400 uppercase tracking-widest mb-6">{isArabic ? "ديناميكا عشيرة لوتكا-فولتيرا" : "Lotka-Volterra Population Dynamics"}</h3>
        <div className="h-64 bg-black/40 rounded-2xl border border-white/5 p-4 relative">
          <svg viewBox="0 0 600 200" className="w-full h-full" preserveAspectRatio="none">
            {[0,50,100,150,200].map(y=><line key={y} x1="0" y1={y} x2="600" y2={y} stroke="white" strokeWidth="0.3" opacity="0.05"/>)}
            <polyline fill="none" stroke="#22c55e" strokeWidth="1.5" points={data.map((d,i)=>`${(i/data.length)*600},${200-(d.prey/maxVal)*180}`).join(' ')}/>
            <polyline fill="none" stroke="#ef4444" strokeWidth="1.5" points={data.map((d,i)=>`${(i/data.length)*600},${200-(d.pred/maxVal)*180}`).join(' ')}/>
          </svg>
          <div className="absolute top-2 right-4 flex gap-4 text-[9px] font-mono">
            <span className="text-green-400">● {isArabic ? "الفريسة" : "Prey"}</span>
            <span className="text-red-400">● {isArabic ? "المفترس" : "Predator"}</span>
          </div>
        </div>
        {/* Phase Portrait */}
        <h3 className="text-xs font-black text-green-400 uppercase tracking-widest mt-8 mb-4">{isArabic ? "صورة الطور" : "Phase Portrait"}</h3>
        <div className="h-48 bg-black/40 rounded-2xl border border-white/5 p-4">
          <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            <polyline fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.6" points={data.map(d=>`${(d.prey/maxVal)*180+10},${190-(d.pred/maxVal)*180}`).join(' ')}/>
          </svg>
        </div>
      </div>
      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-green-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "معلمات العشيرة" : "Population Parameters"}</h3>
          <ParamSlider label={isArabic ? "نمو الفريسة α" : "Prey Growth α"} value={preyGrowth} min={0.1} max={3} step={0.1} unit="" onChange={setPreyGrowth}/>
          <ParamSlider label={isArabic ? "الافتراس β" : "Predation β"} value={predRate} min={0.01} max={0.5} step={0.01} unit="" onChange={setPredRate}/>
          <ParamSlider label={isArabic ? "الفريسة الأولية" : "Initial Prey"} value={preyInit} min={5} max={100} step={1} unit="" onChange={setPreyInit}/>
          <ParamSlider label={isArabic ? "المفترس الأولي" : "Initial Pred"} value={predInit} min={1} max={30} step={1} unit="" onChange={setPredInit}/>
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-green-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "تحليل التوازن" : "Equilibrium Analysis"}</h3>
          <ResultDisplay items={[{label:isArabic ? "ذروة الفريسة" : "Prey Peak",value:Math.max(...data.map(d=>d.prey)).toFixed(0),unit:""},{label:isArabic ? "ذروة المفترس" : "Pred Peak",value:Math.max(...data.map(d=>d.pred)).toFixed(0),unit:""},{label:isArabic ? "الفترة" : "Period",value:(data.length*0.05/2).toFixed(1),unit:isArabic ? "سنة" : "yrs"}]}/>
        </div>
      </div>
    </div>
  );
}

/* ── Food Web Energy Flow ── */
function EnergyFlowSim() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [sunEnergy, setSunEnergy] = useState(1000);
  const [efficiency, setEfficiency] = useState(10);
  const levels = [
    { name: isArabic ? "المنتجات" : 'Producers', energy: sunEnergy, color: '#22c55e', icon: '🌿' },
    { name: isArabic ? "المستهلكات الأولية" : 'Primary Consumers', energy: sunEnergy * (efficiency/100), color: '#3b82f6', icon: '🐛' },
    { name: isArabic ? "المستهلكات الثانوية" : 'Secondary Consumers', energy: sunEnergy * (efficiency/100)**2, color: '#f59e0b', icon: '🐸' },
    { name: isArabic ? "المستهلكات الثالثية" : 'Tertiary Consumers', energy: sunEnergy * (efficiency/100)**3, color: '#ef4444', icon: '🦅' },
    { name: isArabic ? "المحللات" : 'Decomposers', energy: sunEnergy * 0.6, color: '#8b5cf6', icon: '🍄' },
  ];

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="glass rounded-[2.5rem] p-6 lg:p-10 min-h-[350px] lg:min-h-[550px] bg-black/40 border-green-500/20 flex flex-col items-center justify-center">
        <h3 className="text-xs font-black text-green-400 uppercase tracking-widest mb-8">{isArabic ? "هرم الطاقة الغذائي" : "Trophic Energy Pyramid"}</h3>
        <div className="w-full max-w-md space-y-2">
          {levels.slice(0,4).reverse().map((l,i) => (
            <motion.div key={l.name} animate={{width:`${30+i*17}%`}} className="mx-auto p-4 rounded-xl text-center" style={{backgroundColor:`${l.color}15`,borderColor:`${l.color}40`,borderWidth:1,borderStyle:'solid'}}>
              <div className="text-lg">{l.icon}</div>
              <div className="text-xs font-black text-white">{l.name}</div>
              <div className="text-[10px] font-mono mt-1" style={{color:l.color}}>{l.energy.toFixed(1)} {isArabic ? "كجول/م²/سنة" : "kJ/m²/yr"}</div>
            </motion.div>
          ))}
        </div>
        {/* Energy loss arrows */}
        <div className="mt-8 flex gap-6 text-[10px] font-mono text-slate-500">
          <span>☀ {isArabic ? "المدخلات الشمسية" : "Solar Input"}: {sunEnergy} kJ</span>
          <span>🔥 {isArabic ? "فقدان الحرارة" : "Heat Loss"}: {(sunEnergy * (1 - efficiency/100)).toFixed(0)} kJ {isArabic ? "لكل مستوى" : "per level"}</span>
        </div>
      </div>
      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-green-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "إعدادات النظام البيئي" : "Ecosystem Config"}</h3>
          <ParamSlider label={isArabic ? "المدخلات الشمسية" : "Solar Input"} value={sunEnergy} min={100} max={3000} step={50} unit="kJ/m²" onChange={setSunEnergy}/>
          <ParamSlider label={isArabic ? "كفاءة الانتقال" : "Transfer Efficiency"} value={efficiency} min={5} max={20} step={1} unit="%" onChange={setEfficiency}/>
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-green-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "ميزانية الطاقة" : "Energy Budget"}</h3>
          <ResultDisplay items={[{label:isArabic ? "المفترس الأعلى" : "Top Predator",value:levels[3].energy.toFixed(2),unit:"kJ"},{label:isArabic ? "إجمالي الفقد" : "Total Loss",value:(sunEnergy-levels[3].energy).toFixed(0),unit:"kJ"},{label:isArabic ? "الكفاءة البيئية" : "Ecological Eff",value:((levels[3].energy/sunEnergy)*100).toFixed(3),unit:"%"}]}/>
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function EcologyLab() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const tabs = [
    { id: "lotka", label: isArabic ? "المفترس-الفريسة" : "Predator-Prey", icon: <Bug size={16}/> },
    { id: "energy", label: isArabic ? "تدفق الطاقة" : "Energy Flow", icon: <Trees size={16}/> },
  ];
  const theories: Record<string,{en:string,ar:string}> = {
    lotka: {
      en: "In nature, predators and prey are locked in an endless dance. Imagine a forest with wolves and rabbits. If there are lots of rabbits, the wolves have plenty of food, so they have lots of babies. But soon, these extra wolves eat too many rabbits, causing the rabbit population to crash. Without enough food, the wolf population crashes too! Now that there are fewer wolves, the rabbits can safely multiply again, starting the whole cycle over. It's a delicate, seesawing balance of life.",
      ar: "في الطبيعة، المفترس والفريسة منخرطان في رقصة لا تنتهي. تخيل غابة بها ذئاب وأرانب. إذا كان هناك الكثير من الأرانب، فإن الذئاب تجد طعاماً وفيراً فتتكاثر بشدة. ولكن سرعان ما تأكل هذه الذئاب الإضافية الكثير من الأرانب، مما يؤدي إلى انهيار أعداد الأرانب. ومع نقص الطعام، تنهار أعداد الذئاب أيضاً! والآن، مع وجود ذئاب أقل، يمكن للأرانب أن تتكاثر بأمان مرة أخرى، لتبدأ الدورة من جديد. إنه توازن دقيق ومستمر للحياة."
    },
    energy: {
      en: "Think of an ecosystem as a giant energy pyramid. Plants sit at the bottom, capturing sunlight to make their own food. But here's the catch: when an animal eats a plant, it only gets to keep about 10% of that energy! The rest is burned off simply living, moving, and staying warm. This means a predator has to eat a lot of herbivores to survive. Because so much energy is lost at every step, there can only be a few top predators (like lions or eagles) compared to thousands of plants and bugs below them.",
      ar: "تخيل النظام البيئي كهرم طاقة عملاق. النباتات تقبع في القاعدة، وتلتقط ضوء الشمس لتصنع طعامها. لكن إليك المفاجأة: عندما يأكل حيوان نباتاً، فإنه يحتفظ بحوالي 10% فقط من تلك الطاقة! أما الباقي فيُحرق ببساطة في العيش والحركة والحفاظ على الدفء. هذا يعني أن المفترس يجب أن يأكل الكثير من آكلات الأعشاب ليعيش. ولأن الكثير من الطاقة تُفقد في كل خطوة، لا يمكن أن يكون هناك سوى عدد قليل من كبار المفترسين (مثل الأسود أو النسور) مقارنة بآلاف النباتات والحشرات تحتهم."
    },
  };
  return (
    <LabShell
      backHref="/biology"
      backLabelEn="Biology Hub"
      backLabelAr="مركز الأحياء"
      sectorEn="Sector · Ecosystems"
      sectorAr="القطاع · النظم البيئية"
      titleEn="Ecology Lab"
      titleAr="مختبر البيئة"
      descriptionEn="Watch predator–prey populations dance through Lotka–Volterra cycles and trace how energy flows up the trophic pyramid."
      descriptionAr="شاهد رقصة المفترس والفريسة عبر دورات لوتكا-فولتيرا، وتتبع كيف تتدفق الطاقة عبر الهرم الغذائي."
      theme="emerald"
    >
      <ExperimentTabs tabs={tabs}>{(active)=>(
        <div className="flex flex-col gap-5 sm:gap-6">
          {active==="lotka"&&<LotkaVolterra/>}
          {active==="energy"&&<EnergyFlowSim/>}
          <div className="glass rounded-3xl p-6 sm:p-8 md:p-10 border-emerald-500/15 bg-emerald-500/[0.025]">
            <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-3 text-emerald-300">
              <span className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
                <Info size={16}/>
              </span>
              {isArabic?"الإطار النظري":"Theoretical Framework"}
            </h2>
            <p className="text-slate-300/90 leading-relaxed text-sm sm:text-base">{isArabic?theories[active].ar:theories[active].en}</p>
          </div>
        </div>
      )}</ExperimentTabs>
    </LabShell>
  );
}

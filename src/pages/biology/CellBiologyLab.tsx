import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Microscope, Circle, Info, Play, RefreshCcw, Zap } from "lucide-react";
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import ExperimentTabs from "@/components/ui/ExperimentTabs";
import LabShell from "@/components/layout/LabShell";
import { motion } from "framer-motion";

/* ── Mitosis Simulation ── */
function MitosisSim() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [phase, setPhase] = useState(0);
  const [running, setRunning] = useState(false);
  const [cycleTime, setCycleTime] = useState(24);
  const phases = [
    { name: isArabic ? 'الطور البيني (G1)' : 'Interphase (G1)', desc: isArabic ? 'تنمو الخلية وتتضاعف العضيات' : 'Cell grows, organelles duplicate, DNA is unwound chromatin', color: '#3b82f6', size: 100 },
    { name: isArabic ? 'الطور البيني (S)' : 'Interphase (S)', desc: isArabic ? 'يحدث تضاعف الحمض النووي' : 'DNA replication occurs — each chromosome duplicated into sister chromatids', color: '#8b5cf6', size: 110 },
    { name: isArabic ? 'الطور البيني (G2)' : 'Interphase (G2)', desc: isArabic ? 'تستعد الخلية للانقسام' : 'Cell prepares for division, centrosomes replicate, final protein synthesis', color: '#6366f1', size: 120 },
    { name: isArabic ? 'الطور التمهيدي' : 'Prophase', desc: isArabic ? 'يتكاثف الكروماتين إلى كروموسومات مرئية' : 'Chromatin condenses into visible chromosomes, nuclear envelope begins to break down', color: '#f59e0b', size: 115 },
    { name: isArabic ? 'الطور الاستوائي' : 'Metaphase', desc: isArabic ? 'تصطف الكروموسومات عند الصفيحة الاستوائية' : 'Chromosomes align at metaphase plate, spindle fibers attach to kinetochores', color: '#ef4444', size: 110 },
    { name: isArabic ? 'الطور الانفصالي' : 'Anaphase', desc: isArabic ? 'تنفصل الكروماتيدات الشقيقة وتتحرك نحو الأقطاب' : 'Sister chromatids separate and move to opposite poles via spindle shortening', color: '#f97316', size: 130 },
    { name: isArabic ? 'الطور النهائي' : 'Telophase', desc: isArabic ? 'تتشكل الأغلفة النووية من جديد' : 'Nuclear envelopes reform, chromosomes decondense, cleavage furrow forms', color: '#22c55e', size: 140 },
    { name: isArabic ? 'انقسام السيتوبلازم' : 'Cytokinesis', desc: isArabic ? 'ينقسم السيتوبلازم إلى خليتين ابنتين' : 'Cytoplasm divides — contractile ring pinches cell into two daughter cells', color: '#10b981', size: 80 },
  ];

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setPhase(p => { if (p >= phases.length - 1) { setRunning(false); return 0; } return p + 1; });
    }, (cycleTime / phases.length) * 100);
    return () => clearInterval(interval);
  }, [running, cycleTime]);

  const current = phases[phase];

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="glass rounded-[2.5rem] p-6 lg:p-10 min-h-[350px] lg:min-h-[550px] bg-black/40 border-teal-500/20 flex flex-col items-center justify-center">
        {/* Cell Visualization */}
        <div className="relative mb-8">
          <motion.div animate={{ width: current.size * 2, height: current.size * 2, borderColor: current.color }} className="rounded-full border-4 flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: `${current.color}10` }}>
            {/* Nucleus / Chromosomes */}
            {phase <= 2 && <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-16 h-16 rounded-full bg-purple-500/30 border-2 border-purple-500/40" />}
            {phase === 3 && <>{[0, 60, 120, 180, 240, 300].map(a => <motion.div key={a} animate={{ rotate: a }} className="absolute w-1 h-8 bg-yellow-500 rounded-full origin-center" />)}</>}
            {phase === 4 && <div className="flex gap-1">{[1,2,3,4].map(i => <div key={i} className="w-2 h-6 bg-red-500 rounded-full" />)}</div>}
            {phase === 5 && <><div className="absolute left-4 flex gap-1">{[1,2].map(i=><div key={i} className="w-2 h-4 bg-orange-500 rounded-full"/>)}</div><div className="absolute right-4 flex gap-1">{[1,2].map(i=><div key={i} className="w-2 h-4 bg-orange-500 rounded-full"/>)}</div></>}
            {phase === 6 && <div className="flex gap-8"><div className="w-10 h-10 rounded-full bg-green-500/30 border border-green-500/40"/><div className="w-10 h-10 rounded-full bg-green-500/30 border border-green-500/40"/></div>}
            {phase === 7 && <div className="w-full h-full flex items-center justify-center"><div className="w-px h-full bg-emerald-500/50 absolute"/></div>}
          </motion.div>
        </div>
        {/* Phase Info */}
        <div className="text-center max-w-md">
          <div className="text-2xl font-black mb-2" style={{ color: current.color }}>{current.name}</div>
          <p className="text-slate-400 text-sm leading-relaxed">{current.desc}</p>
        </div>
        {/* Timeline */}
        <div className="flex gap-1 mt-8">{phases.map((p, i) => (
          <button key={i} onClick={() => { setRunning(false); setPhase(i); }} className={`w-8 h-2 rounded-full transition-all ${i === phase ? 'scale-y-150' : ''}`} style={{ backgroundColor: i === phase ? p.color : `${p.color}30` }} />
        ))}</div>
      </div>
      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-teal-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "إعدادات دورة الخلية" : "Cell Cycle Config"}</h3>
          <ParamSlider label={isArabic ? "مدة الدورة" : "Cycle Duration"} value={cycleTime} min={8} max={48} step={1} unit={isArabic ? "ساعة" : "hrs"} onChange={setCycleTime} />
          <div className="flex gap-3 mt-8">
            <button onClick={() => { setPhase(0); setRunning(true); }} className="flex-1 py-4 rounded-xl bg-teal-500 text-white font-black active:scale-95 flex items-center justify-center gap-2"><Play size={16} />{isArabic ? "تشغيل الدورة" : "Run Cycle"}</button>
            <button onClick={() => { setRunning(false); setPhase(0); }} className="p-4 rounded-xl bg-white/5 hover:bg-white/10"><RefreshCcw size={16} /></button>
          </div>
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-teal-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "مقاييس الخلية" : "Cell Metrics"}</h3>
          <ResultDisplay items={[{ label: isArabic ? "الطور" : "Phase", value: `${phase + 1}/${phases.length}`, unit: "" }, { label: isArabic ? "محتوى الحمض النووي" : "DNA Content", value: phase >= 1 && phase <= 5 ? "4n" : "2n", unit: "" }, { label: isArabic ? "نقطة التفتيش" : "Checkpoint", value: phase === 4 ? (isArabic ? "SAC نشط" : "SAC Active") : (isArabic ? "اجتاز" : "Passed"), unit: "" }]} />
        </div>
      </div>
    </div>
  );
}

/* ── Osmosis Sim ── */
function OsmosisSim() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [soluteLeft, setSoluteLeft] = useState(10);
  const [soluteRight, setSoluteRight] = useState(50);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [waterLevel, setWaterLevel] = useState(50);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTime(t => t + 1);
      setWaterLevel(prev => {
        const diff = soluteRight - soluteLeft;
        const target = 50 + diff * 0.4;
        const step = (target - prev) * 0.05;
        if (Math.abs(target - prev) < 0.1) { setRunning(false); return target; }
        return prev + step;
      });
    }, 50);
    return () => clearInterval(id);
  }, [running, soluteLeft, soluteRight]);

  const osmPressure = Math.abs(soluteRight - soluteLeft) * 0.0821 * 310 / 1000;

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="glass rounded-[2.5rem] p-6 lg:p-10 min-h-[350px] lg:min-h-[550px] bg-black/40 border-teal-500/20 flex flex-col items-center justify-center">
        <h3 className="text-xs font-black text-teal-400 uppercase tracking-widest mb-8">{isArabic ? "التدرج الأسموزي" : "Osmotic Gradient"}</h3>
        <div className="flex items-end gap-0 w-full max-w-md h-64">
          {/* Left Chamber */}
          <div className="flex-1 relative bg-black/40 rounded-l-2xl border border-white/10 h-full overflow-hidden">
            <motion.div animate={{ height: `${100 - waterLevel}%` }} className="absolute bottom-0 left-0 right-0 bg-blue-500/30 border-t border-blue-500/50" />
            <div className="absolute top-4 left-0 right-0 text-center"><span className="text-[10px] font-mono text-slate-500">{isArabic ? "منخفض التوتر" : "Hypotonic"}</span></div>
            <div className="absolute bottom-4 left-0 right-0 text-center"><span className="text-xs font-black text-blue-400">{soluteLeft} mM</span></div>
          </div>
          {/* Membrane */}
          <div className="w-4 h-full bg-white/10 border-x border-dashed border-white/20 flex flex-col items-center justify-center gap-1 relative">
            {[0,1,2,3,4].map(i => <motion.div key={i} animate={{ y: waterLevel > 50 ? [-5, 5] : [5, -5] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }} className="w-1.5 h-1.5 rounded-full bg-blue-400" />)}
          </div>
          {/* Right Chamber */}
          <div className="flex-1 relative bg-black/40 rounded-r-2xl border border-white/10 h-full overflow-hidden">
            <motion.div animate={{ height: `${waterLevel}%` }} className="absolute bottom-0 left-0 right-0 bg-blue-500/30 border-t border-blue-500/50" />
            <div className="absolute top-4 left-0 right-0 text-center"><span className="text-[10px] font-mono text-slate-500">{isArabic ? "مرتفع التوتر" : "Hypertonic"}</span></div>
            <div className="absolute bottom-4 left-0 right-0 text-center"><span className="text-xs font-black text-blue-400">{soluteRight} mM</span></div>
          </div>
        </div>
        <p className="text-[10px] font-mono text-slate-500 mt-4">{isArabic ? "يتدفق الماء نحو التركيز العالي للمذاب (الأسموزية)" : "H₂O flows → high solute concentration (osmosis)"}</p>
      </div>
      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-teal-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "التركيزات" : "Concentrations"}</h3>
          <ParamSlider label={isArabic ? "التركيز الأيسر" : "Left [Solute]"} value={soluteLeft} min={0} max={100} step={1} unit="mM" onChange={setSoluteLeft} />
          <ParamSlider label={isArabic ? "التركيز الأيمن" : "Right [Solute]"} value={soluteRight} min={0} max={100} step={1} unit="mM" onChange={setSoluteRight} />
          <button onClick={() => { setWaterLevel(50); setTime(0); setRunning(true); }} className="w-full mt-8 py-4 rounded-xl bg-teal-500 text-white font-black active:scale-95 flex items-center justify-center gap-2"><Play size={16} />{isArabic ? "بدء الانتشار" : "Start Diffusion"}</button>
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-teal-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "الديناميكا الحرارية" : "Thermodynamics"}</h3>
          <ResultDisplay items={[{ label: isArabic ? "π (الضغط الأسموزي)" : "π (Osmotic P)", value: osmPressure.toFixed(2), unit: isArabic ? "ضغط جوي" : "atm" }, { label: isArabic ? "صافي التدفق" : "Net Flow", value: waterLevel > 50 ? (isArabic ? "← يميناً" : "→ Right") : waterLevel < 50 ? (isArabic ? "→ يساراً" : "← Left") : (isArabic ? "توازن" : "Equilibrium"), unit: "" }, { label: "ΔG", value: (soluteRight - soluteLeft === 0 ? 0 : -Math.abs(soluteRight - soluteLeft) * 0.01).toFixed(3), unit: isArabic ? "كجول/مول" : "kJ/mol" }]} />
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function CellBiologyLab() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const tabs = [
    { id: "mitosis", label: isArabic ? "الانقسام المتساوي" : "Mitosis", icon: <Circle size={16} /> },
    { id: "osmosis", label: isArabic ? "الأسموزية" : "Osmosis", icon: <Zap size={16} /> },
  ];
  const theories: Record<string, { en: string, ar: string }> = {
    mitosis: { 
      en: "Imagine a factory that needs to build an exact copy of itself. That's what a cell does during the cell cycle! First, it spends most of its time preparing—growing larger and making a perfect copy of its DNA instruction manual (this is Interphase). Then, it enters Mitosis, where it carefully lines up the copied DNA and pulls them apart to opposite sides. Finally, the cell pinches down the middle and splits into two brand new, identical cells! This incredible process is how we grow and heal.", 
      ar: "تخيل مصنعاً يحتاج إلى بناء نسخة مطابقة لنفسه. هذا بالضبط ما تفعله الخلية خلال دورة الخلية! أولاً، تقضي معظم وقتها في التحضير—حيث تنمو وتصنع نسخة مثالية من 'كتيب تعليمات' الحمض النووي الخاص بها (هذا هو الطور البيني). ثم تدخل في الانقسام المتساوي، حيث تصطف نسخ الحمض النووي بدقة ويتم سحبها إلى الجانبين المتقابلين. وأخيراً، تنقبض الخلية من المنتصف لتنقسم إلى خليتين جديدتين متطابقتين تماماً! هذه العملية المذهلة هي الطريقة التي ننمو ونتعافى بها." 
    },
    osmosis: { 
      en: "Have you ever noticed how your fingers get wrinkly in the bath? That's osmosis in action! Osmosis is simply water moving across a barrier to balance things out. If you put a cell in pure water, water rushes in to dilute the 'stuff' (like salts and sugars) inside, causing the cell to swell. If you put it in salty water, the water rushes out to dilute the salt outside, making the cell shrink. It's nature's way of keeping things perfectly balanced without needing any energy!", 
      ar: "هل لاحظت يوماً كيف تتجعد أصابعك بعد الاستحمام الطويل؟ هذا هو التدرج الأسموزي! الأسموزية هي ببساطة حركة الماء عبر حاجز للحفاظ على التوازن. إذا وضعت خلية في ماء نقي، يندفع الماء إلى داخلها لتخفيف 'المواد' (مثل الأملاح والسكريات) الموجودة بداخلها، مما يؤدي إلى انتفاخ الخلية. وإذا وضعتها في ماء مالح، يندفع الماء للخارج لتخفيف الملح الخارجي، فتنكمش الخلية. إنها طريقة الطبيعة للحفاظ على توازن مثالي دون الحاجة إلى أي طاقة!" 
    },
  };
  return (
    <LabShell
      backHref="/biology"
      backLabelEn="Biology Hub"
      backLabelAr="مركز الأحياء"
      sectorEn="Sector · Cell Biology"
      sectorAr="القطاع · بيولوجيا الخلية"
      titleEn="Cell Biology Lab"
      titleAr="مختبر بيولوجيا الخلية"
      descriptionEn="Zoom into the microcosm — guide a cell through mitosis, drive osmosis across a membrane, and feel biology pulse one step at a time."
      descriptionAr="ادخل إلى عالم الأحياء الدقيق — وجّه الخلية عبر الانقسام الفتيلي، حرّك الأسموزية عبر غشاء، واشعر بنبض الحياة خطوة بخطوة."
      theme="cyan"
    >
      <ExperimentTabs tabs={tabs}>{(active) => (
        <div className="flex flex-col gap-5 sm:gap-6">
          {active === "mitosis" && <MitosisSim />}
          {active === "osmosis" && <OsmosisSim />}
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

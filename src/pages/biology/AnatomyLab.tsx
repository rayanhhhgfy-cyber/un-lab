import { useState, Suspense, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Activity, Info, Zap, Brain } from "lucide-react";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Sphere } from '@react-three/drei';
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import ExperimentTabs from "@/components/ui/ExperimentTabs";
import Heart3D from "@/components/sims/biology/Heart3D";
import LabShell from "@/components/layout/LabShell";
import { motion } from "framer-motion";
import * as THREE from 'three';

/* ── Cardiovascular Sim ── */
function CardioSim() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [bpm, setBpm] = useState(72);
  const [resistance, setResistance] = useState(50);
  const co = ((bpm * 70) / 1000) * (1 - resistance / 200);
  const systolic = Math.floor(80 + bpm / 2 + resistance / 3);
  const diastolic = Math.floor(60 + resistance / 2);
  const ecgPoints = Array.from({ length: 60 }, (_, i) => {
    const x = i;
    const phase = (i % 20) / 20;
    let y = 50;
    if (phase > 0.3 && phase < 0.35) y = 20;
    if (phase > 0.35 && phase < 0.4) y = 80;
    if (phase > 0.4 && phase < 0.45) y = 50;
    if (phase > 0.6 && phase < 0.7) y = 40;
    return `${x * (400 / 60)},${y}`;
  }).join(' ');

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="glass rounded-[2.5rem] min-h-[350px] lg:min-h-[550px] bg-black/40 border-rose-500/20 relative overflow-hidden">
        <div className="absolute inset-0"><Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 1.75]} gl={{ antialias: true, powerPreference: 'high-performance' }} performance={{ min: 0.5 }}><ambientLight intensity={0.4} /><pointLight position={[10, 10, 10]} color="#f43f5e" intensity={2} /><Suspense fallback={null}><Float speed={2} rotationIntensity={0.4}><Heart3D bpm={bpm} /></Float><Stars count={3000} fade /></Suspense><OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} /></Canvas></div>
        {/* ECG Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <svg viewBox="0 0 400 100" className="w-full h-20"><motion.polyline points={ecgPoints} fill="none" stroke="#f43f5e" strokeWidth="2" animate={{ x: [-400, 0] }} transition={{ duration: 60 / bpm * 3, repeat: Infinity, ease: "linear" }} /></svg>
          <div className="flex justify-between text-[10px] font-mono text-rose-400/50 mt-1"><span>I</span><span>II</span><span>III</span><span>aVR</span><span>aVL</span><span>aVF</span></div>
        </div>
        <div className="absolute top-6 left-6 p-3 rounded-xl bg-black/60 border border-white/5 backdrop-blur-md"><div className="flex items-center gap-2 text-rose-400 font-mono text-xs"><Activity size={14} className="animate-pulse" />{isArabic ? "مراقبة القلب" : "CARDIAC MONITOR"}</div></div>
        <div className="absolute top-6 right-6 text-right"><div className="text-5xl font-black text-rose-500">{bpm}</div><div className="text-[10px] text-rose-400/50 font-mono uppercase tracking-widest">{isArabic ? "نبضة/د" : "BPM"}</div></div>
      </div>
      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-rose-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "ديناميكا الدم" : "Hemodynamics"}</h3>
          <ParamSlider label={isArabic ? "معدل ضربات القلب" : "Heart Rate"} value={bpm} min={40} max={200} step={1} unit={isArabic ? "نبضة/د" : "BPM"} onChange={setBpm} />
          <ParamSlider label={isArabic ? "المقاومة الوعائية" : "Vascular Resistance"} value={resistance} min={10} max={100} step={1} unit="%" onChange={setResistance} />
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-rose-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "لوحة المؤشرات الحيوية" : "Vitals Panel"}</h3>
          <ResultDisplay items={[{ label: isArabic ? "ضغط الدم" : "Blood Pressure", value: `${systolic}/${diastolic}`, unit: isArabic ? "ملم زئبق" : "mmHg" }, { label: isArabic ? "الناتج القلبي" : "Cardiac Output", value: co.toFixed(1), unit: isArabic ? "لتر/د" : "L/min" }, { label: isArabic ? "حجم الضربة" : "Stroke Volume", value: "70", unit: isArabic ? "مل" : "mL" }, { label: isArabic ? "تشبع الأكسجين" : "O₂ Saturation", value: bpm > 150 ? "94" : "98", unit: "%" }]} />
        </div>
      </div>
    </div>
  );
}

/* ── Neuron Signal Sim ── */
function NeuronSignalSim() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [voltage, setVoltage] = useState(-70);
  const [stimulus, setStimulus] = useState(0);
  const [fired, setFired] = useState(false);
  const [trace, setTrace] = useState<number[]>(Array(60).fill(-70));

  const vRef = useRef(voltage);
  const sRef = useRef(stimulus);

  useEffect(() => { vRef.current = voltage; }, [voltage]);
  useEffect(() => { sRef.current = stimulus; }, [stimulus]);

  useEffect(() => {
    let apSequence: number[] = [];
    const threshold = -55;
    
    const id = setInterval(() => {
      const currentTotal = vRef.current + sRef.current;
      
      if (apSequence.length > 0) {
        const val = apSequence.shift()!;
        setTrace(prev => [...prev.slice(1), val]);
        if (apSequence.length === 0) {
          setFired(false);
          setStimulus(0);
        }
      } else if (currentTotal >= threshold) {
        setFired(true);
        // Create the action potential spike sequence
        apSequence = [-55, 30, 40, 30, -10, -80, -90, vRef.current, vRef.current];
        const val = apSequence.shift()!;
        setTrace(prev => [...prev.slice(1), val]);
      } else {
        // Continuously scroll the trace when resting or sub-threshold
        setTrace(prev => [...prev.slice(1), currentTotal]);
      }
    }, 100);
    
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="glass rounded-[2.5rem] p-6 lg:p-10 min-h-[350px] lg:min-h-[550px] bg-black/40 border-purple-500/20 flex flex-col justify-center">
        {/* Membrane Potential Trace */}
        <h3 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-6">{isArabic ? "جهد الغشاء" : "Membrane Potential"}</h3>
        <div className="relative h-48 bg-black/40 rounded-2xl border border-white/5 overflow-hidden p-4">
          <svg viewBox="0 0 600 200" className="w-full h-full" preserveAspectRatio="none">
            {/* Threshold line */}
            <line x1="0" y1={200 - ((-55 + 90) / 130) * 200} x2="600" y2={200 - ((-55 + 90) / 130) * 200} stroke="#a855f7" strokeWidth="1" strokeDasharray="4" opacity="0.3" />
            <text x="605" y={200 - ((-55 + 90) / 130) * 200 + 4} fill="#a855f7" fontSize="10" opacity="0.5">-55mV</text>
            {/* Resting line */}
            <line x1="0" y1={200 - ((-70 + 90) / 130) * 200} x2="600" y2={200 - ((-70 + 90) / 130) * 200} stroke="#64748b" strokeWidth="1" strokeDasharray="4" opacity="0.2" />
            {/* Trace */}
            <polyline fill="none" stroke="#a855f7" strokeWidth="2" points={trace.map((v, i) => `${i * 10},${200 - ((v + 90) / 130) * 200}`).join(' ')} />
          </svg>
        </div>
        {/* Neuron Diagram */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-500/40 flex items-center justify-center"><Brain size={24} className="text-purple-400" /></div>
          <div className="flex-1 h-2 bg-white/5 rounded-full relative overflow-hidden max-w-xs">
            {fired && <motion.div className="absolute inset-y-0 left-0 w-8 bg-purple-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)]" animate={{ left: ['0%', '100%'] }} transition={{ duration: 0.3 }} />}
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20" />
        </div>
        <p className="text-center text-[10px] font-mono text-purple-400/50 mt-4 uppercase tracking-widest">{fired ? (isArabic ? "إطلاق جهد الفعل" : "ACTION POTENTIAL FIRING") : (isArabic ? "حالة الراحة" : "RESTING STATE")}</p>
      </div>
      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-purple-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "تحكم قنوات الأيونات" : "Ion Channel Control"}</h3>
          <ParamSlider label={isArabic ? "جهد الراحة" : "Resting Potential"} value={voltage} min={-90} max={-40} step={1} unit="mV" onChange={setVoltage} />
          <ParamSlider label={isArabic ? "المنبه" : "Stimulus"} value={stimulus} min={0} max={40} step={1} unit="mV" onChange={setStimulus} />
          <button onClick={() => { setStimulus(30); setTimeout(() => setStimulus(0), 500); }} className="w-full mt-8 py-4 rounded-xl bg-purple-500 text-white font-black active:scale-95 flex items-center justify-center gap-2"><Zap size={16} />{isArabic ? "إزالة الاستقطاب" : "Depolarize"}</button>
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]"><h3 className="text-xs font-black text-purple-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "الكهرباء الحيوية" : "Electrophysiology"}</h3>
          <ResultDisplay items={[{ label: isArabic ? "جهد الغشاء" : "Membrane V", value: (voltage + stimulus).toString(), unit: isArabic ? "مل فولت" : "mV" }, { label: isArabic ? "العتبة" : "Threshold", value: "-55", unit: isArabic ? "مل فولت" : "mV" }, { label: isArabic ? "الحالة" : "State", value: fired ? (isArabic ? "نشط" : "Firing") : (isArabic ? "راحة" : "Resting"), unit: "" }]} />
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function AnatomyLab() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const tabs = [
    { id: "cardio", label: isArabic ? "القلب والأوعية" : "Cardiovascular", icon: <Heart size={16} /> },
    { id: "neuro", label: isArabic ? "الإشارات العصبية" : "Neural Signaling", icon: <Brain size={16} /> },
  ];
  const theories: Record<string, { en: string, ar: string }> = {
    cardio: { 
      en: "Think of your heart as a brilliant, self-adjusting pump. When you exercise, your muscles need more oxygen. Your body responds by sending more blood back to the heart. This extra blood stretches the heart muscle, making it snap back and pump even stronger—a brilliant automatic reaction known as the Frank-Starling mechanism! The heart also has its own built-in electrical pacemaker (the SA node) that sends sparks of electricity to keep the beat steady. When doctors look at an ECG, those squiggly lines are actually a map of these electrical sparks traveling through your heart.", 
      ar: "تخيل قلبك كمضخة ذكية تعدل نفسها تلقائياً. عندما تمارس الرياضة، تحتاج عضلاتك لمزيد من الأكسجين، فيرسل جسمك المزيد من الدم عائداً إلى القلب. هذا الدم الإضافي يمدد عضلة القلب، مما يجعلها تنقبض وتضخ بقوة أكبر—وهو تفاعل تلقائي عبقري يُعرف بآلية فرانك-ستارلينغ! كما يمتلك القلب جهاز تنظيم ضربات كهربائي داخلي خاص به يرسل شرارات كهربائية للحفاظ على انتظام النبض. عندما ينظر الأطباء إلى تخطيط القلب (ECG)، فإن تلك الخطوط المتعرجة هي في الواقع خريطة لهذه الشرارات الكهربائية أثناء انتقالها عبر قلبك." 
    },
    neuro: { 
      en: "How do your brain and muscles communicate in a split second? Through tiny electrical lightning bolts! Your nerve cells (neurons) are like batteries, holding a negative charge when resting (Resting Potential). When they receive a strong enough message (Stimulus), tiny gates pop open, letting positive ions rush in to create an electric spark that races down the nerve. Notice what happens in the simulator if you lower the resting potential (make it more negative, like -90mV)? The neuron becomes 'hyperpolarized'. It falls into a deeper sleep, meaning you'll need a much stronger electrical stimulus to wake it up and reach the firing threshold (-55mV)! And if you increase the stimulus but don't reach the -55mV threshold, you'll just see a small bump on the graph—a failed attempt. But once you hit -55mV, BOOM! The neuron fires a full action potential. This is known as the 'All-or-Nothing' principle!", 
      ar: "كيف يتواصل دماغك مع عضلاتك في جزء من الثانية؟ من خلال صواعق كهربائية متناهية الصغر! خلاياك العصبية تشبه البطاريات؛ فهي تحمل شحنة سالبة عندما تكون في وضع الراحة (جهد الراحة). وعندما تتلقى رسالة قوية (منبه)، تفتح بوابات صغيرة لتسمح للأيونات الموجبة بالاندفاع للداخل لخلق شرارة كهربائية تتسابق عبر العصب. لاحظ ماذا يحدث في المحاكي إذا قمت بخفض جهد الراحة (جعله أكثر سالبية، مثل -90 مللي فولت)؟ تصبح الخلية العصبية 'مفرطة الاستقطاب'. إنها تدخل في نوم أعمق، مما يعني أنك ستحتاج إلى منبه كهربائي أقوى بكثير لإيقاظها والوصول إلى عتبة الإطلاق (-55 مللي فولت)! وإذا قمت بزيادة المنبه ولكنك لم تصل إلى عتبة -55، فسترى مجرد نتوء صغير على الرسم البياني—محاولة فاشلة. ولكن بمجرد وصولك إلى -55، بوم! تطلق الخلية العصبية جهد فعل كامل. يُعرف هذا بمبدأ 'الكل أو اللاشيء'!" 
    },
  };
  return (
    <LabShell
      backHref="/biology"
      backLabelEn="Biology Hub"
      backLabelAr="مركز الأحياء"
      sectorEn="Sector · Physiology"
      sectorAr="القطاع · علم وظائف الأعضاء"
      titleEn="Anatomy Lab"
      titleAr="مختبر التشريح"
      descriptionEn="Step inside the human body — pump a beating heart, fire neural action potentials, and watch life-support systems respond in real time."
      descriptionAr="ادخل إلى داخل جسم الإنسان — شغّل قلباً نابضاً، أطلق جهود فعل عصبية، وراقب استجابة أنظمة الحفاظ على الحياة في الوقت الفعلي."
      theme="rose"
    >
      <ExperimentTabs tabs={tabs}>{(active) => (
        <div className="flex flex-col gap-5 sm:gap-6">
          {active === "cardio" && <CardioSim />}
          {active === "neuro" && <NeuronSignalSim />}
          <div className="glass rounded-3xl p-6 sm:p-8 md:p-10 border-rose-500/15 bg-rose-500/[0.025]">
            <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-3 text-rose-300">
              <span className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-400/30 flex items-center justify-center">
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

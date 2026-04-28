import { useState, Suspense, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Info, Zap, Terminal } from "lucide-react";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Sphere, Points, PointMaterial } from '@react-three/drei';
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import ExperimentTabs from "@/components/ui/ExperimentTabs";
import LabShell from "@/components/layout/LabShell";
import { motion } from "framer-motion";
import * as THREE from 'three';

function NeuralNetwork3D({ activity = 1 }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002 * activity;
      pointsRef.current.rotation.z += 0.001 * activity;
    }
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#a855f7"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      {/* Central Core */}
      <Sphere args={[2, 32, 32]}>
        <meshStandardMaterial 
          color="#6b21a8" 
          emissive="#a855f7" 
          emissiveIntensity={0.5 * activity} 
          transparent 
          opacity={0.3} 
        />
      </Sphere>
    </group>
  );
}

/* ── Synaptic Transmission Sim ── */
function SynapseSim() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [neurotransmitters, setNeurotransmitters] = useState(50);
  const [receptorSensitivity, setSensitivity] = useState(60);
  const [running, setRunning] = useState(false);
  
  const signalStrength = (neurotransmitters / 100) * (receptorSensitivity / 100) * 100;
  const firingRate = Math.floor(signalStrength * 1.5);

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="glass rounded-[2.5rem] min-h-[350px] lg:min-h-[550px] bg-black/40 border-purple-500/20 relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 45 }}
            dpr={[1, 1.75]}
            gl={{ antialias: true, powerPreference: 'high-performance' }}
            performance={{ min: 0.5 }}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} color="#a855f7" intensity={2} />
            <Suspense fallback={null}>
              <Float speed={2} rotationIntensity={0.5}>
                <NeuralNetwork3D activity={running ? 3 : 1} />
              </Float>
              <Stars count={2000} fade />
            </Suspense>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
        
        {/* Signal Visualization */}
        <div className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-purple-500/30">
          <h3 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-6">{isArabic ? "كثافة الإشارة التشابكية" : "Synaptic Signal Density"}</h3>
          <div className="h-4 bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
              animate={{ width: `${signalStrength}%` }} 
              className="h-full bg-gradient-to-r from-purple-900 to-purple-400"
            />
            {running && (
              <motion.div 
                animate={{ x: ['0%', '100%'], opacity: [0, 1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="absolute inset-y-0 w-8 bg-white/40 blur-sm"
              />
            )}
          </div>
          <div className="flex justify-between mt-4">
            <div className="text-[10px] font-mono text-purple-400/50 uppercase tracking-tighter">{isArabic ? "العتبة" : "Threshold"}: 40%</div>
            <div className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">
              {signalStrength > 40 ? (isArabic ? "تم تحفيز جهد الفعل" : "Action Potential Triggered") : (isArabic ? "إشارة دون العتبة" : "Sub-threshold Signal")}
            </div>
          </div>
        </div>

        {/* Terminal HUD */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-purple-400/70 font-mono text-[9px] uppercase tracking-widest">
              <Terminal size={10} /> {isArabic ? "العقدة: ألفا قبل التشابك" : "Node: Pre-Synaptic Alpha"}
            </div>
            <div className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">
              {isArabic ? "الجهد" : "Voltage"}: -70mV {'->'} -55mV ({isArabic ? "العتبة" : "Threshold"})
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-purple-500">{firingRate}</div>
            <div className="text-[9px] text-purple-400/50 font-mono uppercase tracking-widest">{isArabic ? "نبضة/ث" : "Spikes/sec"}</div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]">
          <h3 className="text-xs font-black text-purple-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "المعدلات الكيميائية" : "Chemical Modulators"}</h3>
          <ParamSlider label={isArabic ? "حجم الناقل العصبي" : "Neurotransmitter Vol"} value={neurotransmitters} min={0} max={100} step={1} unit="pmol" onChange={setNeurotransmitters} />
          <ParamSlider label={isArabic ? "كثافة المستقبلات" : "Receptor Density"} value={receptorSensitivity} min={10} max={100} step={1} unit="ρ" onChange={setSensitivity} />
          <button 
            onClick={() => setRunning(!running)} 
            className={`w-full mt-8 py-4 rounded-xl font-black active:scale-95 flex items-center justify-center gap-2 transition-colors ${running ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-purple-500 text-white'}`}
          >
            <Zap size={16} />
            {running ? (isArabic ? "إيقاف النبض" : "Stop Pulse") : (isArabic ? "بدء التشابك" : "Initiate Synapse")}
          </button>
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]">
          <h3 className="text-xs font-black text-purple-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "التشخيص العصبي" : "Neural Diagnostics"}</h3>
          <ResultDisplay items={[
            { label: isArabic ? "شدة الإشارة" : "Signal Intensity", value: signalStrength.toFixed(1), unit: "%" },
            { label: isArabic ? "التأخير التشابكي" : "Synaptic Delay", value: (2.5 - neurotransmitters/50).toFixed(2), unit: isArabic ? "مل ثانية" : "ms" },
            { label: isArabic ? "السلامة" : "Integrity", value: signalStrength > 80 ? (isArabic ? "حرجة" : "Critical") : (isArabic ? "مستقرة" : "Stable"), unit: "" }
          ]} />
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function NeuroscienceLab() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const tabs = [
    { id: "synapse", label: isArabic ? "التشابك العصبي" : "Synaptic Transmission", icon: <Zap size={16}/> },
  ];

  const theories: Record<string,{en:string,ar:string}> = {
    synapse: { 
      en: "How do your brain cells talk to each other? They use a tiny gap called a 'synapse'! When an electrical signal reaches the end of a brain cell, it can't jump across the gap. Instead, it releases tiny chemical messengers (neurotransmitters). These chemicals float across the gap and lock into special receptors on the next cell, like a key fitting into a lock. This triggers a new electrical signal! This amazing relay race happens billions of times a second, allowing us to think, learn, and feel.", 
      ar: "كيف تتحدث خلايا دماغك مع بعضها البعض؟ إنها تستخدم فجوة صغيرة تسمى 'التشابك العصبي'! عندما تصل إشارة كهربائية إلى نهاية خلية دماغية، لا يمكنها القفز عبر الفجوة. بدلاً من ذلك، تطلق رسلاً كيميائية دقيقة (نواقل عصبية). تطفو هذه المواد الكيميائية عبر الفجوة وتثبت في مستقبلات خاصة على الخلية التالية، تماماً مثل مفتاح يوضع في قفل. هذا يطلق إشارة كهربائية جديدة! يحدث سباق التتابع المذهل هذا مليارات المرات في الثانية، مما يتيح لنا التفكير والتعلم والشعور." 
    },
  };

  return (
    <LabShell
      backHref="/biology"
      backLabelEn="Biology Hub"
      backLabelAr="مركز الأحياء"
      sectorEn="Sector · Neural Networks"
      sectorAr="القطاع · الشبكات العصبية"
      titleEn="Neuroscience Lab"
      titleAr="مختبر الأعصاب"
      descriptionEn="Tune neurotransmitter concentrations, ride action potentials across synapses, and explore how the brain transmits thought at lightspeed."
      descriptionAr="اضبط تراكيز النواقل العصبية، اتبع جهود الفعل عبر التشابكات، واكتشف كيف ينقل الدماغ الفكرة بسرعة الضوء."
      theme="violet"
    >
      <ExperimentTabs tabs={tabs}>{(active) => (
        <div className="flex flex-col gap-5 sm:gap-6">
          {active === "synapse" && <SynapseSim />}
          <div className="glass rounded-3xl p-6 sm:p-8 md:p-10 border-violet-500/15 bg-violet-500/[0.025]">
            <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-3 text-violet-300">
              <span className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-400/30 flex items-center justify-center">
                <Info size={16}/>
              </span>
              {isArabic ? "الإطار النظري" : "Theoretical Framework"}
            </h2>
            <p className="text-slate-300/90 leading-relaxed text-sm sm:text-base">
              {isArabic ? theories[active].ar : theories[active].en}
            </p>
          </div>
        </div>
      )}</ExperimentTabs>
    </LabShell>
  );
}

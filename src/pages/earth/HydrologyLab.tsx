import { useState, Suspense, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Waves, Info } from "lucide-react";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Sphere, MeshDistortMaterial } from '@react-three/drei';
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import ExperimentTabs from "@/components/ui/ExperimentTabs";
import LabShell from "@/components/layout/LabShell";
import { motion } from "framer-motion";
import * as THREE from 'three';

function WaterMolecule3D({ flow = 1 }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * flow;
      meshRef.current.rotation.y += 0.01 * flow;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * flow) * 0.5;
    }
  });
  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]}>
      <MeshDistortMaterial
        color="#0ea5e9"
        speed={2 * flow}
        distort={0.4}
        radius={1}
        roughness={0}
        metalness={0.5}
      />
    </Sphere>
  );
}

/* ── River Discharge Sim ── */
function RiverDischargeSim() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [width, setWidth] = useState(20);
  const [depth, setDepth] = useState(5);
  const [velocity, setVelocity] = useState(1.5);
  
  const discharge = width * depth * velocity;

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="glass rounded-[2.5rem] min-h-[350px] lg:min-h-[550px] bg-black/40 border-sky-500/20 relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} color="#0ea5e9" intensity={2} />
            <Suspense fallback={null}>
              <Float speed={2}>
                <WaterMolecule3D flow={velocity} />
              </Float>
              <Stars count={2000} fade />
            </Suspense>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        {/* Discharge Visualization */}
        <div className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-sky-500/30">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="text-xs font-black text-sky-400 uppercase tracking-widest mb-1">{isArabic ? "معدل التصريف" : "Discharge Rate"}</h3>
              <div className="text-4xl font-black text-white">{discharge.toFixed(1)}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-sky-400/50 uppercase">{isArabic ? "م³/ثانية" : "m³/sec"}</div>
            </div>
          </div>
          
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              animate={{ width: `${Math.min(100, discharge / 5)}%` }} 
              className="h-full bg-gradient-to-r from-sky-900 to-sky-400"
            />
          </div>
        </div>

        <div className="absolute bottom-6 left-6 p-4 rounded-xl bg-black/60 border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-sky-400 font-mono text-[9px] uppercase tracking-widest">
            <Waves size={12} className="animate-pulse" /> {isArabic ? "القناة: المقطع B-12" : "Channel: Segment B-12"}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]">
          <h3 className="text-xs font-black text-sky-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "هندسة القناة" : "Channel Geometry"}</h3>
          <ParamSlider label={isArabic ? "عرض المجرى" : "Stream Width"} value={width} min={5} max={100} step={1} unit={isArabic ? "م" : "m"} onChange={setWidth} />
          <ParamSlider label={isArabic ? "عمق المجرى" : "Stream Depth"} value={depth} min={0.5} max={15} step={0.1} unit={isArabic ? "م" : "m"} onChange={setDepth} />
          <ParamSlider label={isArabic ? "سرعة التدفق" : "Flow Velocity"} value={velocity} min={0.1} max={5} step={0.1} unit={isArabic ? "م/ث" : "m/s"} onChange={setVelocity} />
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]">
          <h3 className="text-xs font-black text-sky-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "ديناميكا السوائل" : "Fluid Dynamics"}</h3>
          <ResultDisplay items={[
            { label: isArabic ? "Q (التصريف)" : "Q (Discharge)", value: discharge.toFixed(1), unit: isArabic ? "م³/ث" : "m³/s" },
            { label: isArabic ? "المحيط المبلل" : "Wetted Perimeter", value: (width + 2 * depth).toFixed(1), unit: isArabic ? "م" : "m" },
            { label: isArabic ? "نظام التدفق" : "Flow Regime", value: velocity > 2 ? (isArabic ? "مضطرب" : "Turbulent") : (isArabic ? "صفائحي" : "Laminar"), unit: "" }
          ]} />
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function HydrologyLab() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const tabs = [
    { id: "discharge", label: isArabic ? "تصريف النهر" : "River Discharge", icon: <Waves size={16}/> },
  ];

  const theories: Record<string,{en:string,ar:string}> = {
    discharge: { 
      en: "Have you ever watched a river rush by after a heavy rain storm? Hydrologists measure how much water is flowing past a certain point using something called 'River Discharge'. It's like measuring how much water comes out of a hose, but on a massive scale! We calculate it by multiplying how wide and deep the river is by how fast the water is moving. If a river gets too much water too quickly—from a sudden storm or melting snow—the 'discharge' becomes so high that the river overflows its banks, causing a flood.", 
      ar: "هل راقبت يوماً نهراً يندفع بقوة بعد عاصفة مطرية غزيرة؟ يقيس علماء الهيدرولوجيا كمية المياه المتدفقة عبر نقطة معينة باستخدام ما يسمى 'تصريف النهر'. يشبه الأمر قياس كمية الماء التي تخرج من خرطوم، ولكن على نطاق هائل! نحسبه بضرب عرض النهر وعمقه في سرعة حركة الماء. إذا استقبل النهر الكثير من الماء بسرعة كبيرة—من عاصفة مفاجئة أو ذوبان ثلوج—يصبح 'التصريف' مرتفعاً جداً لدرجة أن النهر يفيض عن ضفافه، مما يسبب فيضاناً." 
    },
  };

  return (
    <LabShell
      backHref="/earth-science"
      backLabelEn="Earth Science Hub"
      backLabelAr="مركز علوم الأرض"
      sectorEn="Sector · Hydrology"
      sectorAr="القطاع · علم المياه"
      titleEn="Hydrology Lab"
      titleAr="مختبر الهيدرولوجيا"
      descriptionEn="Carve channels and command currents — model river discharge, distinguish laminar from turbulent flow, and measure the heartbeat of a watershed."
      descriptionAr="انحت القنوات وتحكم في التيارات — حاكِ تصريف الأنهار، ميّز التدفق الصفائحي عن المضطرب، وقس نبضات الحوض المائي."
      theme="sky"
    >
      <ExperimentTabs tabs={tabs}>{(active) => (
        <div className="flex flex-col gap-5 sm:gap-6">
          {active === "discharge" && <RiverDischargeSim />}
          <div className="glass rounded-3xl p-6 sm:p-8 md:p-10 border-sky-500/15 bg-sky-500/[0.025]">
            <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-3 text-sky-300">
              <span className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center">
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

import { useState, Suspense, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { ArrowLeft, Thermometer, Sun, Info, Radio, Zap, AlertTriangle, Cloud } from "lucide-react";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Sphere } from '@react-three/drei';
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import ExperimentTabs from "@/components/ui/ExperimentTabs";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from 'three';

function AtmosphericModel3D({ warming = 1 }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * warming) * 0.1;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
  });
  return (
    <group>
      <Sphere ref={meshRef} args={[3, 64, 64]}>
        <meshStandardMaterial 
          color="#f59e0b" 
          emissive="#fbbf24" 
          emissiveIntensity={warming * 0.5} 
          transparent 
          opacity={0.4} 
          wireframe
        />
      </Sphere>
      <Sphere args={[2.5, 32, 32]}>
        <meshStandardMaterial color="#3b82f6" />
      </Sphere>
    </group>
  );
}

/* ── Global Warming Sim ── */
function GlobalWarmingSim() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [co2, setCo2] = useState(415);
  const [solarOutput, setSolarOutput] = useState(100);
  
  const tempAnomaly = ((co2 - 280) / 100) * 0.8 + (solarOutput - 100) * 0.1;
  const seaLevelRise = tempAnomaly * 0.5;

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="glass rounded-[2.5rem] min-h-[350px] lg:min-h-[550px] bg-black/40 border-amber-500/20 relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} color="#f59e0b" intensity={2} />
            <Suspense fallback={null}>
              <Float speed={1}>
                <AtmosphericModel3D warming={1 + tempAnomaly} />
              </Float>
              <Stars count={2000} fade />
            </Suspense>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        {/* Data HUD */}
        <div className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-amber-500/30">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xs font-black text-amber-400 uppercase tracking-widest mb-1">{isArabic ? "شذوذ درجة الحرارة" : "Temp Anomaly"}</h3>
              <div className={`text-4xl font-black ${tempAnomaly > 1.5 ? 'text-red-500' : 'text-white'}`}>
                +{tempAnomaly.toFixed(2)}°C
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-amber-400/50 uppercase">{isArabic ? "الأساس: 1850-1900" : "Base: 1850-1900"}</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[9px] font-mono text-slate-500 uppercase mb-1">
                <span>{isArabic ? "الإجبار الإشعاعي" : "Radiative Forcing"}</span>
                <span>{(tempAnomaly * 5.35).toFixed(2)} {isArabic ? "واط/م²" : "W/m²"}</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: `${Math.min(100, (tempAnomaly / 3) * 100)}%` }} 
                  className="h-full bg-amber-500"
                />
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {tempAnomaly > 1.5 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute top-6 right-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-md flex items-center gap-3"
            >
              <AlertTriangle className="text-red-500 animate-pulse" size={20} />
              <div className="text-[10px] font-black text-red-500 uppercase tracking-widest">{isArabic ? "حلقة ردود الفعل نشطة" : "Feedback Loop Active"}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]">
          <h3 className="text-xs font-black text-amber-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "الإجبار المناخي" : "Climate Forcing"}</h3>
          <ParamSlider label={isArabic ? "تركيز CO₂" : "CO₂ Concentration"} value={co2} min={280} max={1200} step={5} unit={isArabic ? "جزء/مليون" : "ppm"} onChange={setCo2} />
          <ParamSlider label={isArabic ? "الإشعاع الشمسي" : "Solar Irradiance"} value={solarOutput} min={90} max={110} step={0.1} unit="%" onChange={setSolarOutput} />
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]">
          <h3 className="text-xs font-black text-amber-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "توقعات التأثير" : "Impact Projections"}</h3>
          <ResultDisplay items={[
            { label: isArabic ? "ارتفاع مستوى البحر" : "Sea Level Rise", value: seaLevelRise.toFixed(2), unit: isArabic ? "م" : "m" },
            { label: isArabic ? "تحمض المحيطات" : "Ocean Acidification", value: (8.1 - (co2-280)*0.0005).toFixed(3), unit: isArabic ? "رقم هيدروجيني" : "pH" },
            { label: isArabic ? "الأحداث المتطرفة" : "Extreme Events", value: (1 + tempAnomaly * 0.5).toFixed(1), unit: "x" }
          ]} />
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function ClimatologyLab() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const tabs = [
    { id: "warming", label: isArabic ? "الاحتباس الحراري" : "Global Warming", icon: <Sun size={16}/> },
  ];

  const theories: Record<string,{en:string,ar:string}> = {
    warming: { 
      en: "Imagine Earth wearing a cozy blanket made of invisible gases (like Carbon Dioxide). This blanket traps the sun's heat, keeping our planet warm enough for life. But since humans started burning lots of coal, oil, and gas, we've essentially added extra, heavy layers to this blanket! The Earth is now trapping more heat than it should, causing 'Global Warming'. This extra heat melts ice caps, raises sea levels, and makes our weather much more extreme and unpredictable.", 
      ar: "تخيل أن الأرض ترتدي بطانية دافئة ومريحة مصنوعة من غازات غير مرئية (مثل ثاني أكسيد الكربون). تحبس هذه البطانية حرارة الشمس، مما يبقي كوكبنا دافئاً بما يكفي للحياة. ولكن منذ أن بدأ البشر بحرق الكثير من الفحم والنفط والغاز، أضفنا بشكل أساسي طبقات إضافية وثقيلة إلى هذه البطانية! أصبحت الأرض الآن تحبس حرارة أكثر مما ينبغي، مما يسبب 'الاحتباس الحراري'. هذه الحرارة الزائدة تذيب القمم الجليدية، وترفع مستويات سطح البحر، وتجعل طقسنا أكثر تطرفاً وتقلباً بكثير." 
    },
  };

  return (
    <div className={`min-h-screen w-full pt-24 pb-20 px-4 md:px-12 bg-[#0a0500] text-white ${isArabic ? 'rtl font-arabic' : 'font-sans'}`}>
      <div className="max-w-[1600px] mx-auto">
        <Link to="/earth-science" className="inline-flex items-center gap-3 text-slate-500 hover:text-amber-400 mb-12 transition-all group">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-amber-500/10">
            <ArrowLeft size={20} className={isArabic ? 'rotate-180' : ''}/>
          </div>
          <span className="font-bold tracking-widest text-[10px] uppercase underline-offset-8">{isArabic ? "مركز علوم الأرض" : "Earth Science Hub"}</span>
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-amber-500/50" />
            <span className="text-amber-500 font-mono text-xs tracking-[0.5em] uppercase">{isArabic ? "علم المناخ" : "Climatology"}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-br from-white via-amber-50 to-amber-500 bg-clip-text text-transparent">
            {isArabic ? "مختبر المناخ" : "Climatology Lab"}
          </h1>
        </div>

        <ExperimentTabs tabs={tabs}>{(active) => (
          <div className="flex flex-col gap-6 lg:p-10">
            {active === "warming" && <GlobalWarmingSim />}
            <div className="glass rounded-[2.5rem] p-6 lg:p-10 border-amber-500/10 bg-amber-500/[0.02]">
              <h2 className="text-xl font-black mb-5 flex items-center gap-3 text-amber-400">
                <Info size={20}/>
                {isArabic ? "الإطار النظري" : "Theoretical Framework"}
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                {isArabic ? theories[active].ar : theories[active].en}
              </p>
            </div>
          </div>
        )}</ExperimentTabs>
      </div>
    </div>
  );
}

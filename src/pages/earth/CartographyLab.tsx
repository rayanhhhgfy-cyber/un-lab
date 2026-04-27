import { useState, Suspense, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { ArrowLeft, Map, Compass, Info, Radio, Globe, Navigation, Layers } from "lucide-react";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Sphere, Box } from '@react-three/drei';
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import ExperimentTabs from "@/components/ui/ExperimentTabs";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from 'three';

function MapProjection3D({ projection = 'spherical' }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });
  return (
    <group>
      {projection === 'spherical' ? (
        <Sphere ref={meshRef} args={[3, 64, 64]}>
          <meshStandardMaterial color="#22c55e" wireframe />
        </Sphere>
      ) : (
        <Box ref={meshRef} args={[6, 4, 0.1]}>
          <meshStandardMaterial color="#22c55e" wireframe />
        </Box>
      )}
    </group>
  );
}

/* ── Projection Sim ── */
function ProjectionSim() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [projection, setProjection] = useState<'spherical' | 'mercator'>('spherical');
  const [distortion, setDistortion] = useState(0);

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8">
      <div className="glass rounded-[2.5rem] min-h-[350px] lg:min-h-[550px] bg-black/40 border-green-500/20 relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} color="#22c55e" intensity={2} />
            <Suspense fallback={null}>
              <Float speed={1}>
                <MapProjection3D projection={projection} />
              </Float>
              <Stars count={2000} fade />
            </Suspense>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        {/* HUD */}
        <div className="absolute top-6 left-6 p-4 rounded-xl bg-black/60 border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-green-400 font-mono text-[9px] uppercase tracking-widest">
            <Compass size={12} className="animate-pulse" /> {isArabic ? "الإسقاط" : "Projection"}: {projection === 'spherical' ? (isArabic ? "كروي" : "SPHERICAL") : (isArabic ? "ميركاتور" : "MERCATOR")}
          </div>
        </div>

        <div className="absolute bottom-6 left-6 flex gap-2">
          <button 
            onClick={() => setProjection('spherical')}
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-colors ${projection === 'spherical' ? 'bg-green-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
          >
            {isArabic ? "كروي" : "Sphere"}
          </button>
          <button 
            onClick={() => setProjection('mercator')}
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-colors ${projection === 'mercator' ? 'bg-green-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
          >
            {isArabic ? "ميركاتور" : "Mercator"}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]">
          <h3 className="text-xs font-black text-green-400 uppercase tracking-[0.2em] mb-6">{isArabic ? "معلمات الإسقاط" : "Projection Params"}</h3>
          <ParamSlider label={isArabic ? "المقياس العرضي" : "Latitudinal Scale"} value={distortion} min={0} max={100} step={1} unit="%" onChange={setDistortion} />
        </div>
        <div className="glass rounded-[2rem] p-7 bg-white/[0.02]">
          <h3 className="text-xs font-black text-green-400 uppercase tracking-[0.2em] mb-5">{isArabic ? "التحليل الكارتومتري" : "Cartometric Analysis"}</h3>
          <ResultDisplay items={[
            { label: isArabic ? "تشويه المساحة" : "Areal Distortion", value: (projection === 'mercator' ? (distortion * 1.5).toFixed(1) : "0"), unit: "%" },
            { label: isArabic ? "دقة الشكل" : "Shape Fidelity", value: projection === 'mercator' ? (isArabic ? "متوافق" : "Conformal") : (isArabic ? "مطلق" : "Absolute"), unit: "" },
            { label: isArabic ? "الموازي القياسي" : "Standard Parallel", value: "0°", unit: "" }
          ]} />
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function CartographyLab() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const tabs = [
    { id: "projection", label: isArabic ? "إسقاط الخرائط" : "Map Projections", icon: <Map size={16}/> },
  ];

  const theories: Record<string,{en:string,ar:string}> = {
    projection: { 
      en: "Have you ever tried peeling an orange and flattening the skin? It always tears or stretches. That's exactly the problem mapmakers face when trying to put our round Earth onto a flat piece of paper! This is called a 'Map Projection'. Every flat map has to distort something: either the size of countries, their shape, or the distance between them. For example, the famous Mercator map is great for sailors because it keeps directions straight, but it makes places near the poles (like Greenland) look much larger than they really are!", 
      ar: "هل حاولت يوماً تقشير برتقالة وفرد قشرتها لتصبح مسطحة؟ إنها تتمزق أو تتمدد دائماً. هذه بالضبط المشكلة التي يواجهها رسامو الخرائط عند محاولة رسم أرضنا الكروية على ورقة مسطحة! يُسمى هذا 'إسقاط الخرائط'. كل خريطة مسطحة تضطر لتشويه شيء ما: إما حجم البلدان، أو شكلها، أو المسافة بينها. على سبيل المثال، خريطة مركاتور الشهيرة ممتازة للبحارة لأنها تحافظ على استقامة الاتجاهات، لكنها تجعل الأماكن القريبة من الأقطاب (مثل جرينلاند) تبدو أكبر بكثير من حجمها الحقيقي!" 
    },
  };

  return (
    <div className={`min-h-screen w-full pt-24 pb-20 px-4 md:px-12 bg-[#000500] text-white ${isArabic ? 'rtl font-arabic' : 'font-sans'}`}>
      <div className="max-w-[1600px] mx-auto">
        <Link to="/earth-science" className="inline-flex items-center gap-3 text-slate-500 hover:text-green-400 mb-12 transition-all group">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-green-500/10">
            <ArrowLeft size={20} className={isArabic ? 'rotate-180' : ''}/>
          </div>
          <span className="font-bold tracking-widest text-[10px] uppercase underline-offset-8">{isArabic ? "مركز علوم الأرض" : "Earth Science Hub"}</span>
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-green-500/50" />
            <span className="text-green-500 font-mono text-xs tracking-[0.5em] uppercase">{isArabic ? "رسم الخرائط" : "Cartography"}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-br from-white via-green-50 to-green-500 bg-clip-text text-transparent">
            {isArabic ? "مختبر الخرائط" : "Cartography Lab"}
          </h1>
        </div>

        <ExperimentTabs tabs={tabs}>{(active) => (
          <div className="flex flex-col gap-6 lg:p-10">
            {active === "projection" && <ProjectionSim />}
            <div className="glass rounded-[2.5rem] p-6 lg:p-10 border-green-500/10 bg-green-500/[0.02]">
              <h2 className="text-xl font-black mb-5 flex items-center gap-3 text-green-400">
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

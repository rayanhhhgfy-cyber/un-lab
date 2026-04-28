import { useState, Suspense, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Mountain, MoveHorizontal, Info, Globe, Gem } from "lucide-react";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Box, Cone, Sphere, Cylinder } from '@react-three/drei';
import ParamSlider from "@/components/ui/ParamSlider";
import ResultDisplay from "@/components/ui/ResultDisplay";
import ExperimentTabs from "@/components/ui/ExperimentTabs";
import LabShell from "@/components/layout/LabShell";
import * as THREE from 'three';
import { motion } from "framer-motion";
import { useDeviceCapability } from "@/lib/useDeviceCapability";

type TectonicMode = 'convergent' | 'divergent' | 'transform';

interface ConvectionParticle {
  pos: THREE.Vector3;
  speed: number;
  size: number;
  side: -1 | 1;
}

interface SurfaceFeature {
  x: number;
  z: number;
  size: number;
  rotation: number;
}

interface SeismicPulse {
  delay: number;
}

function PlateTectonics3D({ drift = 1, mode = 'convergent' as TectonicMode }) {
  const leftPlate = useRef<THREE.Group>(null);
  const rightPlate = useRef<THREE.Group>(null);
  const ridge = useRef<THREE.Group>(null);
  const magmaRift = useRef<THREE.Group>(null);
  const transformSparks = useRef<THREE.Group>(null);
  const seismicRingsRef = useRef<THREE.Group>(null);
  const convectionRef = useRef<THREE.Group>(null);

  const { particleScale, tier } = useDeviceCapability();
  const featureCount = tier === 'low' ? 6 : tier === 'mid' ? 10 : 14;
  const convectionCount = Math.max(8, Math.round(24 * particleScale));

  const k = Math.min(drift / 10, 1);

  const leftFeatures = useMemo<SurfaceFeature[]>(() => {
    const arr: SurfaceFeature[] = [];
    for (let i = 0; i < featureCount; i++) {
      arr.push({
        x: -3.6 + Math.random() * 3.0,
        z: -1.7 + Math.random() * 3.4,
        size: 0.18 + Math.random() * 0.32,
        rotation: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, [featureCount]);

  const rightFeatures = useMemo<SurfaceFeature[]>(() => {
    const arr: SurfaceFeature[] = [];
    for (let i = 0; i < featureCount; i++) {
      arr.push({
        x: 0.6 + Math.random() * 3.0,
        z: -1.7 + Math.random() * 3.4,
        size: 0.18 + Math.random() * 0.32,
        rotation: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, [featureCount]);

  const convectionParticles = useMemo<ConvectionParticle[]>(() => {
    const arr: ConvectionParticle[] = [];
    for (let i = 0; i < convectionCount; i++) {
      arr.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 9,
          -1.6 + Math.random() * 0.8,
          (Math.random() - 0.5) * 5
        ),
        speed: 0.3 + Math.random() * 0.6,
        size: 0.07 + Math.random() * 0.1,
        side: Math.random() > 0.5 ? 1 : -1,
      });
    }
    return arr;
  }, [convectionCount]);

  const seismicPulses = useMemo<SeismicPulse[]>(
    () => [{ delay: 0 }, { delay: 1.2 }, { delay: 2.4 }],
    []
  );

  useFrame((s) => {
    if (!leftPlate.current || !rightPlate.current) return;
    const t = s.clock.getElapsedTime();
    const speed = 0.5;
    const wave = Math.sin(t * speed) * 0.5 + 0.5;

    leftPlate.current.position.set(-2.1, 0, 0);
    rightPlate.current.position.set(2.1, 0, 0);
    leftPlate.current.rotation.set(0, 0, 0);
    rightPlate.current.rotation.set(0, 0, 0);

    if (ridge.current) {
      ridge.current.scale.set(0.0001, 0.0001, 0.0001);
      ridge.current.position.set(0, 0, 0);
    }
    if (magmaRift.current) {
      magmaRift.current.scale.set(0.0001, 0.0001, 0.0001);
      magmaRift.current.position.set(0, -0.1, 0);
    }
    if (transformSparks.current) {
      transformSparks.current.visible = false;
    }
    if (seismicRingsRef.current) {
      seismicRingsRef.current.visible = false;
    }

    if (mode === 'convergent') {
      const push = wave * 0.12 * k;
      leftPlate.current.position.x = -2.1 + push;
      rightPlate.current.position.x = 2.1 - push;
      rightPlate.current.rotation.z = -0.22 * k * wave;
      rightPlate.current.position.y = -0.08 * k * wave;

      if (ridge.current) {
        const grow = 0.55 + 0.45 * wave;
        ridge.current.scale.set(1, grow, 1);
        ridge.current.position.set(0, 0, 0);
      }
      if (seismicRingsRef.current) {
        seismicRingsRef.current.visible = true;
        seismicRingsRef.current.children.forEach((ring, i) => {
          const pulse = (t * 0.6 + (seismicPulses[i]?.delay ?? 0)) % 2.5;
          const progress = Math.min(1, pulse / 2.5);
          ring.scale.setScalar(0.2 + progress * 2.2);
          const m = (ring as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (m) m.opacity = (1 - progress) * 0.7 * (0.5 + k);
        });
      }
    } else if (mode === 'divergent') {
      const open = wave * drift * 0.2;
      leftPlate.current.position.x = -2.1 - open;
      rightPlate.current.position.x = 2.1 + open;
      if (magmaRift.current) {
        const w = 0.4 + open * 1.6;
        magmaRift.current.scale.set(w, 0.7 + open * 0.5, 1);
        magmaRift.current.position.set(0, -0.05 + Math.sin(t * 1.6) * 0.06, 0);
      }
    } else {
      const slide = Math.sin(t * speed) * drift * 0.32;
      leftPlate.current.position.x = -2.1;
      rightPlate.current.position.x = 2.1;
      leftPlate.current.position.z = slide;
      rightPlate.current.position.z = -slide;
      if (transformSparks.current) {
        transformSparks.current.visible = true;
        transformSparks.current.children.forEach((sp, i) => {
          const phase = (t * 2 + i * 0.7) % 1;
          sp.position.set(
            (Math.random() - 0.5) * 0.05,
            0.6 - phase * 0.8,
            -2 + i * 0.45 + Math.sin(t * 3 + i) * 0.1
          );
          sp.scale.setScalar((1 - phase) * (0.4 + k));
        });
      }
    }

    if (convectionRef.current) {
      convectionRef.current.children.forEach((p, i) => {
        const part = convectionParticles[i];
        if (!part) return;
        p.position.y += part.speed * 0.012 * (0.4 + k);
        p.position.x += part.side * 0.005 * (0.5 + k);
        if (p.position.y > -0.3) p.position.y = -2.1;
        if (p.position.x > 6 || p.position.x < -6) p.position.x = -p.position.x * 0.8;
        const m = (p as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (m) {
          m.emissiveIntensity =
            0.6 + Math.sin(t * 4 + i * 0.5) * 0.3 + k * 0.4;
        }
      });
    }
  });

  return (
    <group>
      <Box args={[16, 0.5, 8]} position={[0, -2.4, 0]}>
        <meshStandardMaterial
          color="#0a0a14"
          roughness={1}
          metalness={0}
        />
      </Box>

      <Box args={[12.5, 0.6, 6]} position={[0, -1.6, 0]}>
        <meshStandardMaterial
          color="#3a0a14"
          emissive="#dc2626"
          emissiveIntensity={0.55}
          roughness={0.6}
          metalness={0.1}
        />
      </Box>
      <Box args={[12.7, 0.05, 6.1]} position={[0, -1.25, 0]}>
        <meshStandardMaterial
          color="#7c2d12"
          emissive="#ff5500"
          emissiveIntensity={1.6}
          roughness={0.4}
        />
      </Box>

      <group ref={convectionRef}>
        {convectionParticles.map((p, i) => (
          <mesh key={`conv-${i}`} position={[p.pos.x, p.pos.y, p.pos.z]}>
            <sphereGeometry args={[p.size, 8, 8]} />
            <meshStandardMaterial
              color="#ff7a00"
              emissive="#ff5500"
              emissiveIntensity={1.2}
              transparent
              opacity={0.85}
            />
          </mesh>
        ))}
      </group>

      <group ref={leftPlate}>
        <Box args={[4, 0.7, 4]} position={[0, -0.35, 0]}>
          <meshStandardMaterial color="#2c3548" roughness={0.9} metalness={0.05} />
        </Box>
        <Box args={[4.05, 0.25, 4.05]} position={[0, 0.15, 0]}>
          <meshStandardMaterial color="#4a5567" roughness={0.85} metalness={0.08} />
        </Box>
        <Box args={[4, 0.05, 4]} position={[0, 0.31, 0]}>
          <meshStandardMaterial
            color="#7c8aa0"
            roughness={0.7}
            metalness={0.15}
            emissive="#1e293b"
            emissiveIntensity={0.4}
          />
        </Box>
        {leftFeatures.map((f, i) => (
          <Cone
            key={`lf-${i}`}
            args={[f.size, f.size * 1.4, 6]}
            position={[f.x + 2.1, 0.45 + f.size * 0.3, f.z]}
            rotation={[0, f.rotation, 0]}
          >
            <meshStandardMaterial
              color={i % 3 === 0 ? '#9aa6bd' : '#6b758a'}
              roughness={0.95}
            />
          </Cone>
        ))}
        <Cone
          args={[0.18, 0.4, 12]}
          position={[-3.7, 0.5, 0]}
          rotation={[0, 0, -Math.PI / 2]}
        >
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0ea5e9"
            emissiveIntensity={0.9}
          />
        </Cone>
      </group>

      <group ref={rightPlate}>
        <Box args={[4, 0.7, 4]} position={[0, -0.35, 0]}>
          <meshStandardMaterial color="#3a2c4a" roughness={0.9} metalness={0.05} />
        </Box>
        <Box args={[4.05, 0.25, 4.05]} position={[0, 0.15, 0]}>
          <meshStandardMaterial color="#5a4567" roughness={0.85} metalness={0.08} />
        </Box>
        <Box args={[4, 0.05, 4]} position={[0, 0.31, 0]}>
          <meshStandardMaterial
            color="#a08aa6"
            roughness={0.7}
            metalness={0.15}
            emissive="#3b1e3b"
            emissiveIntensity={0.4}
          />
        </Box>
        {rightFeatures.map((f, i) => (
          <Cone
            key={`rf-${i}`}
            args={[f.size, f.size * 1.4, 6]}
            position={[f.x - 2.1, 0.45 + f.size * 0.3, f.z]}
            rotation={[0, f.rotation, 0]}
          >
            <meshStandardMaterial
              color={i % 3 === 0 ? '#bda0c0' : '#8a708e'}
              roughness={0.95}
            />
          </Cone>
        ))}
        <Cone
          args={[0.18, 0.4, 12]}
          position={[3.7, 0.5, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#f59e0b"
            emissiveIntensity={0.9}
          />
        </Cone>
      </group>

      <group ref={ridge} position={[0, 0.3, 0]}>
        {[-1.4, -0.7, 0, 0.7, 1.4].map((z, i) => {
          const h = 0.7 + Math.abs(0.5 - i / 4) * 1.6;
          return (
            <Cone
              key={`peak-${i}`}
              args={[0.5 - Math.abs(z) * 0.1, h, 8]}
              position={[0, h / 2, z]}
            >
              <meshStandardMaterial
                color="#a78a5c"
                emissive="#fbbf24"
                emissiveIntensity={0.18}
                roughness={0.95}
              />
            </Cone>
          );
        })}
        <Cylinder args={[0.08, 0.08, 4, 8]} position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#ffe066"
            emissive="#fbbf24"
            emissiveIntensity={1.5}
            transparent
            opacity={0.85}
          />
        </Cylinder>
      </group>

      <group ref={seismicRingsRef} position={[0, 0.45, 0]}>
        {seismicPulses.map((_, i) => (
          <mesh key={`seismic-${i}`} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.35, 0.5, 48]} />
            <meshBasicMaterial
              color="#fbbf24"
              transparent
              opacity={0}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      <group ref={magmaRift}>
        <Box args={[0.5, 0.9, 4]} position={[0, -0.05, 0]}>
          <meshStandardMaterial
            color="#ff3300"
            emissive="#ff7a00"
            emissiveIntensity={2.0}
            roughness={0.3}
          />
        </Box>
        <Box args={[0.55, 0.05, 4.05]} position={[0, 0.4, 0]}>
          <meshStandardMaterial
            color="#ffe066"
            emissive="#ffcc00"
            emissiveIntensity={3.0}
          />
        </Box>
        {[-1.4, -0.7, 0, 0.7, 1.4].map((z, i) => (
          <Sphere
            key={`bubble-${i}`}
            args={[0.18, 12, 12]}
            position={[0, 0.5 + Math.sin(i * 0.7) * 0.1, z]}
          >
            <meshStandardMaterial
              color="#ffaa00"
              emissive="#ff5500"
              emissiveIntensity={2.5}
            />
          </Sphere>
        ))}
      </group>

      <group ref={transformSparks} position={[0, 0.4, 0]}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={`spark-${i}`}>
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshBasicMaterial color="#fde68a" />
          </mesh>
        ))}
      </group>

      <pointLight position={[0, 0.6, 0]} intensity={1.2} color="#fbbf24" distance={6} />
      <pointLight position={[-4, 2, 4]} intensity={0.6} color="#0ea5e9" distance={12} />
      <pointLight position={[4, 2, 4]} intensity={0.6} color="#a855f7" distance={12} />
    </group>
  );
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
        <Canvas
          camera={{ position: [0, 4.5, 9], fov: 50 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.45} color="#5d4a8a" />
          <directionalLight position={[8, 10, 6]} intensity={1.4} color="#ffe9c0" />
          <directionalLight position={[-8, 6, -4]} intensity={0.5} color="#7c5cff" />
          <Suspense fallback={null}>
            <PlateTectonics3D drift={drift} mode={type} />
            <Stars count={3500} radius={50} depth={40} factor={3} fade speed={0.3} />
          </Suspense>
          <OrbitControls
            enableZoom={true}
            minDistance={6}
            maxDistance={14}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.1}
            autoRotate
            autoRotateSpeed={0.4}
          />
        </Canvas>
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
    <LabShell
      backHref="/earth-science"
      backLabelEn="Earth Science Hub"
      backLabelAr="مركز علوم الأرض"
      sectorEn="Sector · Geology"
      sectorAr="القطاع · الجيولوجيا"
      titleEn="Geology Lab"
      titleAr="مختبر الجيولوجيا"
      descriptionEn="Drift continents at your fingertips, identify minerals on the Mohs scale, and uncover the deep architecture beneath our planet's crust."
      descriptionAr="حرّك القارات بأطراف أصابعك، حدد المعادن على مقياس موس، واكتشف البنية العميقة تحت قشرة كوكبنا."
      theme="amber"
    >
        <ExperimentTabs tabs={tabs}>{(active) => (
        <div className="flex flex-col gap-5 sm:gap-6">
            {active === "tectonics" && <TectonicsSim />}
            {active === "minerals" && <MineralogySim />}
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

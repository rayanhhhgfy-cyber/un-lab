import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cone, Cylinder, Sphere, Torus, MeshDistortMaterial, Ring } from '@react-three/drei';
import * as THREE from 'three';
import { useDeviceCapability } from '@/lib/useDeviceCapability';

interface AshParticle {
  pos: THREE.Vector3;
  speed: number;
  size: number;
  swirl: number;
}

interface SparkParticle {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  life: number;
  size: number;
}

interface FootHill {
  x: number;
  z: number;
  scale: number;
  rotation: number;
}

export default function Volcano3D({ eruptionIntensity = 0 }) {
  const ashRef = useRef<THREE.Group>(null);
  const sparksRef = useRef<THREE.Group>(null);
  const lavaRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const glowRingRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);

  const { particleScale, tier } = useDeviceCapability();
  const ashCount = Math.max(40, Math.round(220 * particleScale));
  const sparkCount = Math.max(16, Math.round(80 * particleScale));
  const footHillCount = tier === 'low' ? 5 : 10;

  const ashParticles = useMemo<AshParticle[]>(() => {
    const arr: AshParticle[] = [];
    for (let i = 0; i < ashCount; i++) {
      arr.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 1.4,
          Math.random() * 8,
          (Math.random() - 0.5) * 1.4
        ),
        speed: 0.04 + Math.random() * 0.12,
        size: 0.12 + Math.random() * 0.32,
        swirl: 0.2 + Math.random() * 1.2,
      });
    }
    return arr;
  }, [ashCount]);

  const sparkParticles = useMemo<SparkParticle[]>(() => {
    const arr: SparkParticle[] = [];
    for (let i = 0; i < sparkCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.05 + Math.random() * 0.18;
      arr.push({
        pos: new THREE.Vector3(0, Math.random() * 0.5, 0),
        vel: new THREE.Vector3(
          Math.cos(angle) * speed,
          0.18 + Math.random() * 0.25,
          Math.sin(angle) * speed
        ),
        life: Math.random(),
        size: 0.06 + Math.random() * 0.1,
      });
    }
    return arr;
  }, [sparkCount]);

  const footHills = useMemo<FootHill[]>(() => {
    const arr: FootHill[] = [];
    for (let i = 0; i < footHillCount; i++) {
      const a = (i / footHillCount) * Math.PI * 2 + Math.random() * 0.4;
      const r = 6.5 + Math.random() * 2.5;
      arr.push({
        x: Math.cos(a) * r,
        z: Math.sin(a) * r,
        scale: 0.4 + Math.random() * 0.6,
        rotation: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, [footHillCount]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const intensityNorm = Math.max(0, eruptionIntensity) / 100;

    if (ashRef.current && eruptionIntensity > 0) {
      ashRef.current.children.forEach((p, i) => {
        const part = ashParticles[i];
        if (!part) return;
        p.position.y += part.speed * (0.4 + intensityNorm * 1.6);
        const swirl = part.swirl;
        p.position.x += Math.sin(time * swirl + i * 0.3) * 0.05;
        p.position.z += Math.cos(time * swirl + i * 0.5) * 0.05;
        const spread = 1 + (p.position.y - 3) * 0.15 * intensityNorm;
        const cur = p.position;
        const dist = Math.hypot(cur.x, cur.z);
        if (dist > 0 && p.position.y > 3) {
          const desired = spread * (dist / Math.max(dist, 0.001));
          const factor = desired / Math.max(dist, 0.001);
          if (factor > 1) {
            p.position.x *= 1 + (factor - 1) * 0.02;
            p.position.z *= 1 + (factor - 1) * 0.02;
          }
        }
        const scale = 1 + Math.sin(time * 4 + i) * 0.25;
        p.scale.setScalar(scale * (0.7 + intensityNorm * 0.6));

        if (p.position.y > 14) {
          p.position.y = 0;
          p.position.x = (Math.random() - 0.5) * 0.8;
          p.position.z = (Math.random() - 0.5) * 0.8;
        }
      });
    }

    if (sparksRef.current && eruptionIntensity > 5) {
      sparksRef.current.children.forEach((s, i) => {
        const part = sparkParticles[i];
        if (!part) return;
        const lifeProgress = (time * 0.6 + part.life) % 1;
        const upward = part.vel.y * (1 + intensityNorm) - lifeProgress * 0.5;
        s.position.x = part.vel.x * lifeProgress * 14 * intensityNorm;
        s.position.y = upward * 16 * intensityNorm;
        s.position.z = part.vel.z * lifeProgress * 14 * intensityNorm;
        const fade = Math.max(0, 1 - lifeProgress);
        s.scale.setScalar(fade * (0.6 + intensityNorm));
      });
    }

    if (lightRef.current) {
      lightRef.current.intensity =
        intensityNorm * 6 * (1 + Math.sin(time * 14) * 0.3);
    }

    if (lavaRef.current) {
      lavaRef.current.position.y = 3.45 + Math.sin(time * 3) * 0.04 * (0.5 + intensityNorm);
    }

    if (glowRingRef.current) {
      glowRingRef.current.rotation.z = time * 0.3;
      const m = glowRingRef.current.material as THREE.MeshBasicMaterial;
      if (m) m.opacity = 0.3 + intensityNorm * 0.5 + Math.sin(time * 6) * 0.1;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = time * 0.5;
      innerCoreRef.current.scale.setScalar(
        1 + Math.sin(time * 5) * 0.05 * (0.4 + intensityNorm)
      );
    }
  });

  const eruptionGlow = Math.max(0.4, Math.min(2.5, eruptionIntensity / 25));

  return (
    <group position={[0, -2.2, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <circleGeometry args={[18, 64]} />
        <meshStandardMaterial color="#1a0712" roughness={0.95} />
      </mesh>

      {footHills.map((h, i) => (
        <Cone
          key={`foot-${i}`}
          args={[1.4 * h.scale, 1.6 * h.scale, 16]}
          position={[h.x, -0.7 + 0.8 * h.scale, h.z]}
          rotation={[0, h.rotation, 0]}
        >
          <meshStandardMaterial
            color="#1f0c2e"
            roughness={0.95}
            metalness={0.05}
          />
        </Cone>
      ))}

      <Cone args={[6, 1.2, 64]} position={[0, -0.8, 0]}>
        <meshStandardMaterial color="#241032" roughness={0.95} />
      </Cone>

      <Cone args={[5, 7.5, 64]} position={[0, 1.5, 0]}>
        <MeshDistortMaterial
          color="#180623"
          roughness={0.95}
          metalness={0.15}
          distort={0.08}
          speed={0}
        />
      </Cone>

      <Cone args={[5.05, 7.6, 64]} position={[0, 1.45, 0]}>
        <meshStandardMaterial
          color="#3a1450"
          emissive="#ff4500"
          emissiveIntensity={eruptionGlow * 0.18}
          roughness={1}
          metalness={0.05}
          transparent
          opacity={0.55}
        />
      </Cone>

      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2 + 0.4;
        const x = Math.cos(angle) * 1.4;
        const z = Math.sin(angle) * 1.4;
        return (
          <Cylinder
            key={`fissure-${i}`}
            args={[0.06, 0.18, 5, 8]}
            position={[x, 1.6, z]}
            rotation={[0, 0, (Math.random() - 0.5) * 0.3]}
          >
            <meshStandardMaterial
              color="#ff3300"
              emissive="#ff5e00"
              emissiveIntensity={1.2 + eruptionGlow}
            />
          </Cylinder>
        );
      })}

      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 1.0;
        const z = Math.sin(angle) * 1.0;
        return (
          <mesh
            key={`flow-${i}`}
            position={[x * 1.2, 1.0, z * 1.2]}
            rotation={[0, angle, -1.0]}
          >
            <boxGeometry args={[0.18, 4.5, 0.06]} />
            <meshStandardMaterial
              color="#ff5500"
              emissive="#ff7a00"
              emissiveIntensity={0.8 + eruptionGlow * 0.6}
            />
          </mesh>
        );
      })}

      <Cylinder args={[1.05, 1.05, 0.3, 32]} position={[0, 3.3, 0]}>
        <meshStandardMaterial
          color="#2a0e1f"
          emissive="#ff4500"
          emissiveIntensity={eruptionGlow * 0.4}
          roughness={0.85}
        />
      </Cylinder>

      <Torus args={[1.05, 0.12, 16, 48]} position={[0, 3.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#3d1530"
          emissive="#ff5500"
          emissiveIntensity={0.6 + eruptionGlow * 0.5}
          roughness={0.9}
        />
      </Torus>

      <mesh ref={lavaRef} position={[0, 3.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.92, 48]} />
        <MeshDistortMaterial
          color="#ff3300"
          emissive="#ff7a00"
          emissiveIntensity={2.5 + eruptionGlow}
          distort={0.45}
          speed={4}
          roughness={0.3}
        />
      </mesh>

      <Ring
        ref={glowRingRef}
        args={[1.0, 1.4, 64]}
        position={[0, 3.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial
          color="#ffaa00"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </Ring>

      <Sphere args={[2.2, 32, 32]} position={[0, -2, 0]}>
        <meshStandardMaterial
          color="#f43f5e"
          emissive="#ff0055"
          emissiveIntensity={0.8 + eruptionGlow * 0.6}
          transparent
          opacity={0.55}
        />
      </Sphere>

      <Sphere ref={innerCoreRef} args={[0.7, 16, 16]} position={[0, -2, 0]}>
        <meshStandardMaterial
          color="#ffe680"
          emissive="#ffcc00"
          emissiveIntensity={3 + eruptionGlow}
        />
      </Sphere>

      <group ref={ashRef} position={[0, 4.2, 0]}>
        {ashParticles.map((p, i) => (
          <mesh key={i} position={[p.pos.x, p.pos.y, p.pos.z]}>
            <sphereGeometry args={[p.size, 8, 8]} />
            <meshStandardMaterial
              color="#3a1f4a"
              emissive="#7c3aed"
              emissiveIntensity={0.45 + eruptionGlow * 0.2}
              transparent
              opacity={0.78}
            />
          </mesh>
        ))}
      </group>

      <group ref={sparksRef} position={[0, 3.6, 0]}>
        {sparkParticles.map((p, i) => (
          <mesh key={`spark-${i}`} position={[0, 0, 0]}>
            <sphereGeometry args={[p.size, 6, 6]} />
            <meshBasicMaterial color="#ffcc00" />
          </mesh>
        ))}
      </group>

      <pointLight
        ref={lightRef}
        position={[0, 4.5, 0]}
        intensity={0}
        color="#ff7a00"
        distance={40}
        decay={1.6}
      />
      <pointLight
        position={[0, -1.5, 0]}
        intensity={1.4 + eruptionGlow * 0.5}
        color="#ff0055"
        distance={12}
      />

      <Sphere args={[18, 32, 32]}>
        <meshStandardMaterial
          color="#c026d3"
          transparent
          opacity={0.025 * (eruptionGlow + 0.4)}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      <ambientLight intensity={0.35} color="#5d2b6f" />
      <directionalLight
        position={[8, 14, 6]}
        intensity={1.4}
        color="#ffeed0"
        castShadow
      />
      <directionalLight
        position={[-10, 6, -8]}
        intensity={0.55}
        color="#7c5cff"
      />
    </group>
  );
}

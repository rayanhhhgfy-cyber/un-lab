import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Tube } from "@react-three/drei";
import * as THREE from "three";

const BASE_COLORS = ["#22d3ee", "#e879f9", "#4ade80", "#facc15"];

function helixPoints(turns: number, height: number, radius: number, steps: number, phase = 0) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const ang = t * turns * Math.PI * 2 + phase;
    const y = (t - 0.5) * height;
    pts.push(new THREE.Vector3(Math.cos(ang) * radius, y, Math.sin(ang) * radius));
  }
  return pts;
}

export default function DnaHelix3D({ speed = 1, baseCount = 36 }) {
  const groupRef = useRef<THREE.Group>(null);

  const { curveA, curveB, rungs } = useMemo(() => {
    const turns = 5;
    const height = baseCount * 0.38;
    const radius = 1.45;
    const steps = Math.max(64, baseCount * 3);
    const a = helixPoints(turns, height, radius, steps, 0);
    const b = helixPoints(turns, height, radius, steps, Math.PI);
    const curveA = new THREE.CatmullRomCurve3(a);
    const curveB = new THREE.CatmullRomCurve3(b);
    const rungData: { a: THREE.Vector3; b: THREE.Vector3; c1: string; c2: string }[] = [];
    for (let i = 0; i < baseCount; i++) {
      const u = (i + 0.5) / baseCount;
      const ang = u * turns * Math.PI * 2;
      const y = (u - 0.5) * height;
      const p1 = new THREE.Vector3(Math.cos(ang) * radius, y, Math.sin(ang) * radius);
      const p2 = new THREE.Vector3(Math.cos(ang + Math.PI) * radius, y, Math.sin(ang + Math.PI) * radius);
      rungData.push({
        a: p1,
        b: p2,
        c1: BASE_COLORS[i % 4],
        c2: BASE_COLORS[(i + 2) % 4],
      });
    }
    return { curveA, curveB, rungs: rungData };
  }, [baseCount]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004 * speed;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={0.9} color="#f8fafc" />
      <pointLight position={[-4, 0, 4]} intensity={0.5} color="#38bdf8" />

      <Tube args={[curveA, 128, 0.07, 8, false]}>
        <meshStandardMaterial color="#e2e8f0" emissive="#334155" emissiveIntensity={0.15} roughness={0.35} metalness={0.45} />
      </Tube>
      <Tube args={[curveB, 128, 0.07, 8, false]}>
        <meshStandardMaterial color="#cbd5e1" emissive="#475569" emissiveIntensity={0.12} roughness={0.38} metalness={0.42} />
      </Tube>

      {rungs.map((rung, i) => {
        const mid = new THREE.Vector3().addVectors(rung.a, rung.b).multiplyScalar(0.5);
        const dir = new THREE.Vector3().subVectors(rung.b, rung.a);
        const len = Math.max(0.01, dir.length());
        dir.normalize();
        const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        return (
          <group key={i} position={mid}>
            <mesh quaternion={quat}>
              <cylinderGeometry args={[0.042, 0.042, len, 12]} />
              <meshStandardMaterial color="#e2e8f0" transparent opacity={0.65} roughness={0.22} metalness={0.55} />
            </mesh>
            <mesh position={rung.a}>
              <sphereGeometry args={[0.17, 22, 22]} />
              <meshStandardMaterial color={rung.c1} emissive={rung.c1} emissiveIntensity={0.5} roughness={0.2} metalness={0.4} />
            </mesh>
            <mesh position={rung.b}>
              <sphereGeometry args={[0.17, 22, 22]} />
              <meshStandardMaterial color={rung.c2} emissive={rung.c2} emissiveIntensity={0.5} roughness={0.2} metalness={0.4} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

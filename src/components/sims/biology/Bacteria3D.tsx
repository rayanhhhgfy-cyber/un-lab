import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Tube } from "@react-three/drei";
import * as THREE from "three";

export default function Bacteria3D({ activity = 1 }) {
  const cellRef = useRef<THREE.Group>(null);

  const flagella = useMemo(
    () => [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(1.1, 0.1, 0),
        new THREE.Vector3(2.2, 0.6, 0.4),
        new THREE.Vector3(3.2, 0.2, 0.2),
        new THREE.Vector3(4.0, -0.2, 0.6),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.9, 0.55, 0.1),
        new THREE.Vector3(2.0, 1.2, -0.5),
        new THREE.Vector3(3.4, 0.8, -0.8),
        new THREE.Vector3(4.2, 0.3, -0.2),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.9, -0.45, 0),
        new THREE.Vector3(2.0, -1.0, 0.55),
        new THREE.Vector3(3.3, -0.6, 0.9),
        new THREE.Vector3(4.1, -0.15, 0.4),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.0, 0.15, 0.2),
        new THREE.Vector3(-2.2, 0.5, -0.35),
        new THREE.Vector3(-3.0, 0.1, -0.7),
      ]),
    ],
    []
  );

  useFrame((state) => {
    if (cellRef.current) {
      const t = state.clock.getElapsedTime();
      cellRef.current.rotation.x = Math.sin(t * 0.35 * activity) * 0.12;
      cellRef.current.rotation.y += 0.008 * activity;
      cellRef.current.position.y = Math.sin(t * activity * 1.8) * 0.18;
    }
  });

  return (
    <group ref={cellRef}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 4]} intensity={1} color="#ecfdf5" />
      <pointLight position={[-4, -2, 5]} intensity={0.6} color="#34d399" />

      {/* Rod-shaped cell body (capsule) */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.95, 2.4, 12, 40]} />
        <MeshDistortMaterial
          color="#0d9488"
          distort={0.22}
          speed={1.4 * activity}
          roughness={0.18}
          metalness={0.55}
          emissive="#064e3b"
          emissiveIntensity={0.35}
          clearcoat={0.85}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Inner nucleoid hint */}
      <mesh scale={[0.92, 0.88, 0.92]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#115e59" emissive="#022c22" emissiveIntensity={0.5} roughness={0.55} transparent opacity={0.45} />
      </mesh>

      {flagella.map((curve, i) => (
        <Tube key={i} args={[curve, 48, 0.07 + (i % 2) * 0.02, 10, false]}>
          <MeshDistortMaterial
            color="#7c3aed"
            emissive="#a78bfa"
            emissiveIntensity={0.55}
            distort={0.35}
            speed={2.2 * activity}
            roughness={0.15}
            metalness={0.65}
          />
        </Tube>
      ))}
    </group>
  );
}

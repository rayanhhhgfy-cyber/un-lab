import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Tube } from "@react-three/drei";
import * as THREE from "three";

export default function Heart3D({ bpm = 70 }) {
  const bodyRef = useRef<THREE.Group>(null);
  const leftVentricleRef = useRef<THREE.Mesh>(null);
  const rightVentricleRef = useRef<THREE.Mesh>(null);
  const leftAtrium = useRef<THREE.Mesh>(null);
  const rightAtrium = useRef<THREE.Mesh>(null);

  const aortaCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.15, 2.0, 0),
        new THREE.Vector3(0.45, 3.0, 0.15),
        new THREE.Vector3(0.85, 3.6, 0.45),
        new THREE.Vector3(1.1, 3.3, 0.85),
      ]),
    []
  );

  const pulmonaryCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.35, 1.85, 0.2),
        new THREE.Vector3(-1.0, 2.6, 0.5),
        new THREE.Vector3(-1.45, 2.3, 0.95),
      ]),
    []
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const heartRate = bpm / 60;
    const t = (time * heartRate) % 1;
    let pump = 0;
    if (t < 0.14) pump = Math.sin((t * Math.PI) / 0.14);
    else if (t > 0.28 && t < 0.48) pump = Math.sin(((t - 0.28) * Math.PI) / 0.2) * 0.75;

    const s = 1 + pump * 0.12;
    if (bodyRef.current) {
      bodyRef.current.scale.set(s * 1.02, s * 1.08, s * 0.96);
      bodyRef.current.rotation.y = Math.sin(time * 0.45) * 0.06;
    }
    if (leftVentricleRef.current) {
      const lv = 1 + pump * 0.18;
      leftVentricleRef.current.scale.set(lv * 0.92, lv, lv * 0.9);
    }
    if (rightVentricleRef.current) {
      const rv = 1 + pump * 0.12;
      rightVentricleRef.current.scale.set(rv, rv * 0.95, rv);
    }

    const atriaT = (time * heartRate + 0.08) % 1;
    let atriaPump = 0;
    if (atriaT < 0.14) atriaPump = Math.sin((atriaT * Math.PI) / 0.14);
    if (leftAtrium.current) leftAtrium.current.scale.setScalar(1 + atriaPump * 0.14);
    if (rightAtrium.current) rightAtrium.current.scale.setScalar(1 + atriaPump * 0.14);
  });

  return (
    <group position={[0, -0.55, 0]}>
      <hemisphereLight color="#fecdd3" groundColor="#1a080c" intensity={0.55} />
      <directionalLight position={[6, 8, 4]} intensity={1.15} color="#fff5f5" />
      <directionalLight position={[-4, 2, -6]} intensity={0.45} color="#fb7185" />
      <pointLight position={[0, 1.5, 3]} intensity={0.85} color="#fda4af" distance={12} />

      <group ref={bodyRef}>
        <mesh scale={[1.05, 1.12, 0.94]}>
          <sphereGeometry args={[1.75, 64, 64]} />
          <meshPhysicalMaterial
            color="#c41e3a"
            emissive="#3d0a12"
            emissiveIntensity={0.35}
            roughness={0.38}
            metalness={0.12}
            clearcoat={0.45}
            clearcoatRoughness={0.35}
          />
        </mesh>
      </group>

      <mesh ref={leftVentricleRef} position={[-1.05, -0.15, 0.35]} scale={[0.95, 1.05, 0.9]}>
        <sphereGeometry args={[1.15, 48, 48]} />
        <meshPhysicalMaterial
          color="#9f1239"
          emissive="#450a0a"
          emissiveIntensity={0.3}
          roughness={0.32}
          metalness={0.18}
          clearcoat={0.35}
        />
      </mesh>

      <mesh ref={rightVentricleRef} position={[1.0, -0.05, 0.25]} scale={[0.88, 0.92, 0.85]}>
        <sphereGeometry args={[1.05, 48, 48]} />
        <meshPhysicalMaterial
          color="#be123c"
          emissive="#3f0d16"
          emissiveIntensity={0.28}
          roughness={0.4}
          metalness={0.1}
          clearcoat={0.3}
        />
      </mesh>

      <mesh ref={leftAtrium} position={[-1.05, 1.35, 0.45]}>
        <sphereGeometry args={[0.72, 40, 40]} />
        <MeshDistortMaterial
          color="#14b8a6"
          emissive="#0d9488"
          emissiveIntensity={0.35}
          roughness={0.28}
          metalness={0.2}
          distort={0.22}
          speed={1.2}
        />
      </mesh>

      <mesh ref={rightAtrium} position={[1.05, 1.4, 0.25]}>
        <sphereGeometry args={[0.78, 40, 40]} />
        <MeshDistortMaterial
          color="#fbbf24"
          emissive="#b45309"
          emissiveIntensity={0.32}
          roughness={0.3}
          metalness={0.15}
          distort={0.24}
          speed={1.1}
        />
      </mesh>

      <Tube args={[aortaCurve, 48, 0.32, 12, false]}>
        <meshPhysicalMaterial
          color="#9f1239"
          emissive="#500724"
          emissiveIntensity={0.4}
          roughness={0.25}
          metalness={0.35}
        />
      </Tube>

      <Tube args={[pulmonaryCurve, 32, 0.26, 10, false]}>
        <meshPhysicalMaterial
          color="#0369a1"
          emissive="#0c4a6e"
          emissiveIntensity={0.35}
          roughness={0.28}
          metalness={0.3}
        />
      </Tube>

      <mesh position={[1.35, 2.05, -0.15]} rotation={[0, 0, Math.PI / 9]}>
        <cylinderGeometry args={[0.22, 0.26, 2.2, 24]} />
        <meshPhysicalMaterial color="#7c3aed" emissive="#4c1d95" emissiveIntensity={0.25} roughness={0.35} metalness={0.25} />
      </mesh>
    </group>
  );
}

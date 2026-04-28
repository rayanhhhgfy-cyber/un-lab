import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Tube } from '@react-three/drei';
import * as THREE from 'three';

export default function Heart3D({ bpm = 70 }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const leftAtrium = useRef<THREE.Mesh>(null);
  const rightAtrium = useRef<THREE.Mesh>(null);
  
  // Create a curved path for an artery
  const tubeCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.5, 1.5, 0),
    new THREE.Vector3(1.2, 2.5, 0.5),
    new THREE.Vector3(1.5, 2.0, 1.0),
  ]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const heartRate = bpm / 60; // beats per second
    // Create a realistic heartbeat double-pump easing
    const t = (time * heartRate) % 1;
    let pump = 0;
    if (t < 0.15) pump = Math.sin(t * Math.PI / 0.15);
    else if (t > 0.25 && t < 0.45) pump = Math.sin((t - 0.25) * Math.PI / 0.2) * 0.8;
    
    const scale = 1 + pump * 0.15;
    
    if (meshRef.current) {
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    }
    
    // Atria pump slightly before ventricles
    const atriaT = ((time * heartRate) + 0.1) % 1;
    let atriaPump = 0;
    if (atriaT < 0.15) atriaPump = Math.sin(atriaT * Math.PI / 0.15);
    
    if (leftAtrium.current) leftAtrium.current.scale.setScalar(1 + atriaPump * 0.2);
    if (rightAtrium.current) rightAtrium.current.scale.setScalar(1 + atriaPump * 0.2);
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Main Ventricles */}
      <Sphere ref={meshRef} args={[2, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial 
          color="#ff0a54" 
          roughness={0.2} 
          metalness={0.3} 
          distort={0.2}
          speed={2}
          emissive="#ff477e"
          emissiveIntensity={0.6}
        />
      </Sphere>
      
      {/* Left Atrium */}
      <Sphere ref={leftAtrium} args={[0.8, 32, 32]} position={[-1.2, 1.2, 0.5]}>
        <MeshDistortMaterial color="#00f5d4" emissive="#00bbf9" emissiveIntensity={0.5} roughness={0.3} distort={0.3} speed={1} />
      </Sphere>

      {/* Right Atrium */}
      <Sphere ref={rightAtrium} args={[0.9, 32, 32]} position={[1.2, 1.3, 0.2]}>
        <MeshDistortMaterial color="#fee440" emissive="#f15bb5" emissiveIntensity={0.5} roughness={0.3} distort={0.3} speed={1} />
      </Sphere>

      {/* Aorta (Red) */}
      <Tube args={[tubeCurve, 20, 0.4, 16, false]}>
        <meshStandardMaterial color="#ff0054" emissive="#ff0054" emissiveIntensity={0.4} roughness={0.2} metalness={0.3} />
      </Tube>

      {/* Pulmonary Artery (Blue) */}
      <mesh position={[-0.8, 1.8, -0.5]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.4, 0.5, 2.5, 32]} />
        <meshStandardMaterial color="#00bbf9" emissive="#00f5d4" emissiveIntensity={0.3} roughness={0.2} />
      </mesh>
      
      {/* Superior Vena Cava */}
      <mesh position={[1.5, 2.0, -0.2]} rotation={[0, 0, Math.PI / 8]}>
        <cylinderGeometry args={[0.3, 0.3, 2, 32]} />
        <meshStandardMaterial color="#9b5de5" emissive="#f15bb5" emissiveIntensity={0.3} roughness={0.2} />
      </mesh>

      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, 0, 5]} intensity={0.5} color="#fb7185" />
    </group>
  );
}

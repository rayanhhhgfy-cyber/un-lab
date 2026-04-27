import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { TorusKnot, MeshDistortMaterial, Tube } from '@react-three/drei';
import * as THREE from 'three';

export default function Bacteria3D({ activity = 1 }) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Flagella curves
  const flagella = [
    new THREE.CatmullRomCurve3([new THREE.Vector3(1, 0, 0), new THREE.Vector3(2, 0.5, 0.5), new THREE.Vector3(3, 0, 0)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(1, 0.5, 0), new THREE.Vector3(2.5, 1, -0.5), new THREE.Vector3(3.5, 0.2, 0.2)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(1, -0.5, 0), new THREE.Vector3(2, -1, 0.5), new THREE.Vector3(3, -0.5, -0.5)]),
  ];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * activity;
      meshRef.current.rotation.y += 0.015 * activity;
      
      // Wobble effect
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * activity * 2) * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      <TorusKnot args={[1.5, 0.4, 128, 32]}>
        <MeshDistortMaterial 
          color="#06b6d4" 
          distort={0.4} 
          speed={2 * activity} 
          roughness={0.1} 
          metalness={0.8}
          emissive="#ec4899"
          emissiveIntensity={1.5}
          clearcoat={1}
        />
      </TorusKnot>
      
      {/* Flagella */}
      {flagella.map((curve, i) => (
        <Tube key={i} args={[curve, 20, 0.05, 8, false]}>
          <MeshDistortMaterial color="#8b5cf6" emissive="#c084fc" emissiveIntensity={0.8} distort={0.5} speed={3 * activity} />
        </Tube>
      ))}
      
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} color="#34d399" intensity={2} />
    </group>
  );
}

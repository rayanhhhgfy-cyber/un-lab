import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function DnaHelix3D({ speed = 1, baseCount = 30 }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const bases = useMemo(() => {
    const data = [];
    const colors = ['#00f2ff', '#ff00ff', '#00ff88', '#ffff00']; // Neon A, T, C, G
    for (let i = 0; i < baseCount; i++) {
      const angle = (i / baseCount) * Math.PI * 6; // More twists
      const y = (i - baseCount / 2) * 0.4;
      data.push({ 
        pos1: [Math.cos(angle) * 1.5, y, Math.sin(angle) * 1.5],
        pos2: [Math.cos(angle + Math.PI) * 1.5, y, Math.sin(angle + Math.PI) * 1.5],
        color1: colors[i % 4],
        color2: colors[(i + 2) % 4]
      });
    }
    return data;
  }, [baseCount]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005 * speed;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Axis Glow */}
      <mesh>
        <cylinderGeometry args={[0.05, 0.05, baseCount * 0.5, 16]} />
        <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={0.5} transparent opacity={0.1} />
      </mesh>

      {bases.map((base, i) => (
        <group key={i}>
          {/* Nucleotides */}
          <mesh position={base.pos1 as any}>
            <sphereGeometry args={[0.15, 24, 24]} />
            <meshStandardMaterial 
              color={base.color1} 
              emissive={base.color1} 
              emissiveIntensity={2} 
              roughness={0}
              metalness={1}
            />
          </mesh>
          <mesh position={base.pos2 as any}>
            <sphereGeometry args={[0.15, 24, 24]} />
            <meshStandardMaterial 
              color={base.color2} 
              emissive={base.color2} 
              emissiveIntensity={2} 
              roughness={0}
              metalness={1}
            />
          </mesh>
          
          {/* Sugar-Phosphate Backbone Connector */}
          <mesh position={[
            (base.pos1[0] + base.pos2[0]) / 2,
            base.pos1[1],
            (base.pos1[2] + base.pos2[2]) / 2
          ]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.03, 0.03, 3, 8]} />
            <meshStandardMaterial color="white" transparent opacity={0.15} />
          </mesh>

          {/* Atomic Glow Orbs around bases */}
          <mesh position={base.pos1 as any}>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshStandardMaterial color={base.color1} transparent opacity={0.05} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

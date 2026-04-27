import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cone, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function Volcano3D({ eruptionIntensity = 0 }) {
  const ashRef = useRef<THREE.Group>(null);
  const lavaRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Generate particles for ash
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 200; i++) {
      temp.push({
        pos: new THREE.Vector3((Math.random() - 0.5) * 3, Math.random() * 8, (Math.random() - 0.5) * 3),
        speed: 0.02 + Math.random() * 0.08,
        size: Math.random() * 0.3 + 0.1
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ashRef.current && eruptionIntensity > 0) {
      ashRef.current.children.forEach((p, i) => {
        p.position.y += particles[i].speed * (eruptionIntensity / 30);
        p.position.x += Math.sin(time + i) * 0.02;
        p.position.z += Math.cos(time + i) * 0.02;
        
        const scale = 1 + Math.sin(time * 5 + i) * 0.2;
        p.scale.setScalar(scale);

        if (p.position.y > 12) {
          p.position.y = 0;
          p.position.x = (Math.random() - 0.5) * 1;
          p.position.z = (Math.random() - 0.5) * 1;
        }
      });
    }
    if (lightRef.current) {
      lightRef.current.intensity = (eruptionIntensity / 5) * (1 + Math.sin(time * 15) * 0.3);
    }
    if (lavaRef.current) {
      lavaRef.current.position.y = 3.01 + Math.sin(time * 3) * 0.05 * (eruptionIntensity / 50);
    }
  });

  return (
    <group position={[0, -2, 0]}>
      {/* Volcano Base - Layered for Detail */}
      <Cone args={[5, 8, 64]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#180524" roughness={0.9} metalness={0.2} />
      </Cone>
      
      {/* Rocky outer layer with distort */}
      <Cone args={[5.2, 7.8, 64]} position={[0, 0.9, 0]}>
        <MeshDistortMaterial color="#2b0b3e" roughness={1} distort={0.1} speed={0} />
      </Cone>
      
      {/* Magma Chamber Glow Inside Base */}
      <Sphere args={[2, 32, 32]} position={[0, -1, 0]}>
        <meshStandardMaterial color="#f43f5e" emissive="#ff0055" emissiveIntensity={eruptionIntensity / 10} />
      </Sphere>
      
      {/* Lava in Crater */}
      <mesh ref={lavaRef} position={[0, 3.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <MeshDistortMaterial 
          color="#ff0055" 
          emissive="#f15bb5" 
          emissiveIntensity={1.5 + eruptionIntensity / 5} 
          distort={0.3}
          speed={3}
        />
      </mesh>

      {/* Ash Particles */}
      <group ref={ashRef} position={[0, 4, 0]}>
        {particles.map((p, i) => (
          <mesh key={i} position={[p.pos.x, p.pos.y, p.pos.z]}>
            <sphereGeometry args={[p.size, 8, 8]} />
            <meshStandardMaterial color="#a855f7" emissive="#d946ef" emissiveIntensity={0.5} transparent opacity={0.8} />
          </mesh>
        ))}
      </group>

      {/* Dynamic Light */}
      <pointLight ref={lightRef} position={[0, 5, 0]} intensity={0} color="#e81cff" distance={30} />
      
      {/* Atmosphere Glow */}
      <Sphere args={[12, 32, 32]}>
        <meshStandardMaterial color="#c026d3" transparent opacity={0.02 * (eruptionIntensity / 25)} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
      </Sphere>
      
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
    </group>
  );
}

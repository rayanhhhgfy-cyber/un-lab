import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

export default function EarthGlobe3D({ stormIntensity = 0 }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  
  // Generate random city lights
  const cities = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 400; i++) {
      const phi = Math.acos(-1 + (2 * i) / 400);
      const theta = Math.sqrt(400 * Math.PI) * phi;
      const r = 3.01;
      temp.push(new THREE.Vector3(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      ));
    }
    return temp;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.05;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y = time * 0.06;
      cloudRef.current.rotation.z = time * 0.01;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.01);
    }
  });

  return (
    <group>
      {/* Core Earth */}
      <Sphere ref={meshRef} args={[3, 128, 128]}>
        <meshStandardMaterial 
          color="#1e1b4b" 
          roughness={0.6} 
          metalness={0.4} 
        />
        {/* City Lights */}
        {cities.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.025, 4, 4]} />
            <meshBasicMaterial color={Math.random() > 0.5 ? "#22d3ee" : "#f472b6"} transparent opacity={Math.random() * 0.8 + 0.4} />
          </mesh>
        ))}
      </Sphere>

      {/* Dynamic Cloud Layer based on storms */}
      <Sphere ref={cloudRef} args={[3.08, 128, 128]}>
        <MeshDistortMaterial 
          color="#ffffff" 
          emissive="#0ea5e9"
          emissiveIntensity={0.2}
          transparent 
          opacity={0.3 + (stormIntensity / 200)} 
          distort={0.2 + (stormIntensity / 100)} 
          speed={1 + (stormIntensity / 20)} 
          roughness={0.9}
        />
      </Sphere>

      {/* Atmospheric Glow */}
      <Sphere ref={atmosphereRef} args={[3.3, 64, 64]}>
        <meshStandardMaterial 
          color="#a855f7" 
          transparent 
          opacity={0.2} 
          side={THREE.BackSide} 
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
      
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 5, 10]} intensity={1.5} color="#fff" />
      <directionalLight position={[-10, -5, -10]} intensity={0.5} color="#4da6ff" />
    </group>
  );
}

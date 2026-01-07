import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment } from '@react-three/drei';
import * as THREE from 'three';

const FloatingSphere = ({ position, color, speed, distort, size }: {
  position: [number, number, number];
  color: string;
  speed: number;
  distort: number;
  size: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const GoldRing = ({ position, scale }: { position: [number, number, number]; scale: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.05, 16, 100]} />
      <meshStandardMaterial
        color="#D4AF37"
        metalness={1}
        roughness={0.1}
        emissive="#8B7500"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 200; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#D4AF37"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Hero3DScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#D4AF37" />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#8B7500" />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#FFD700" />
        
        <Environment preset="city" />
        
        <FloatingSphere 
          position={[-3, 1, -2]} 
          color="#1a1a1a" 
          speed={1.5} 
          distort={0.4}
          size={1.2}
        />
        <FloatingSphere 
          position={[3.5, -1, -1]} 
          color="#D4AF37" 
          speed={1} 
          distort={0.3}
          size={0.8}
        />
        <FloatingSphere 
          position={[2, 2, -3]} 
          color="#2d2520" 
          speed={2} 
          distort={0.5}
          size={0.6}
        />
        <FloatingSphere 
          position={[-2.5, -2, -2]} 
          color="#8B7500" 
          speed={1.2} 
          distort={0.35}
          size={0.9}
        />
        
        <GoldRing position={[0, 0, -4]} scale={2} />
        <GoldRing position={[-4, 2, -5]} scale={1.2} />
        <GoldRing position={[4, -1.5, -6]} scale={1.5} />
        
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;

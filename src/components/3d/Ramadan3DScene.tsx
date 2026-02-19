import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

/** 3D Crescent Moon */
const CrescentMoon3D = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Outer sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} emissive="#8B7500" emissiveIntensity={0.3} />
      </mesh>
      {/* Inner cut sphere */}
      <mesh position={[0.45, 0.2, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0} roughness={1} />
      </mesh>
    </group>
  );
};

/** 3D Star */
const Star3D = ({ position, scale = 1, speed = 1 }: { position: [number, number, number]; scale?: number; speed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const starShape = useMemo(() => {
    const shape = new THREE.Shape();
    const outerRadius = 0.3;
    const innerRadius = 0.12;
    const spikes = 5;
    
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    return shape;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.scale.setScalar(scale + Math.sin(state.clock.elapsedTime * speed * 2) * 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <extrudeGeometry args={[starShape, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02 }]} />
      <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.05} emissive="#FFD700" emissiveIntensity={0.4} />
    </mesh>
  );
};

/** Lantern shape */
const Lantern3D = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Lantern body */}
      <mesh>
        <cylinderGeometry args={[0.25, 0.35, 0.8, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.2} transparent opacity={0.6} emissive="#FFD700" emissiveIntensity={0.3} />
      </mesh>
      {/* Top cap */}
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.2, 0.3, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Bottom cap */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.15, 0.25, 0.1, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Inner glow */}
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#FFD700" distance={3} />
    </group>
  );
};

/** Gold particles */
const GoldDust = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 150; i++) {
      temp.push(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
      );
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#D4AF37" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
};

/** Main 3D Ramadan Scene */
const Ramadan3DScene = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.4 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} color="#D4AF37" />
        <directionalLight position={[-5, -3, -5]} intensity={0.2} color="#8B7500" />

        {/* Crescent Moons */}
        <CrescentMoon3D position={[-4, 2.5, -3]} scale={0.6} />
        <CrescentMoon3D position={[4.5, 3, -4]} scale={0.4} />
        
        {/* Stars */}
        <Star3D position={[-3, -1, -2]} scale={0.8} speed={0.7} />
        <Star3D position={[3, 1.5, -2]} scale={0.6} speed={1.2} />
        <Star3D position={[0, 3.5, -3]} scale={0.5} speed={0.9} />
        <Star3D position={[-5, 0, -4]} scale={0.4} speed={1.5} />
        <Star3D position={[5, -2, -3]} scale={0.3} speed={1} />

        {/* Lanterns */}
        <Lantern3D position={[-2, 2, -1]} scale={0.5} />
        <Lantern3D position={[2.5, 1.5, -2]} scale={0.4} />
        <Lantern3D position={[0, -2, -1.5]} scale={0.35} />

        {/* Gold floating sphere */}
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
          <Sphere args={[0.5, 32, 32]} position={[-1, -2.5, -2]}>
            <MeshDistortMaterial color="#D4AF37" distort={0.3} speed={1.5} roughness={0.2} metalness={0.9} />
          </Sphere>
        </Float>

        <GoldDust />
      </Canvas>
    </div>
  );
};

export default Ramadan3DScene;

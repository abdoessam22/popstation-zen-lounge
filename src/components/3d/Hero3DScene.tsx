import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const GOLD = '#D4AF37';

// Central liquid-gold sculpture that follows the pointer softly
const Sculpture = () => {
  const group = useRef<THREE.Group>(null);
  const knot = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (knot.current) {
      knot.current.rotation.x += delta * 0.12;
      knot.current.rotation.y += delta * 0.18;
    }
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.4, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.25, 0.05);
    }
  });

  return (
    <group ref={group} position={[2.6, 0, 0]}>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh ref={knot}>
          <torusKnotGeometry args={[1.1, 0.32, 220, 32, 2, 3]} />
          <meshStandardMaterial color={GOLD} metalness={1} roughness={0.15} envMapIntensity={1.4} />
        </mesh>
      </Float>
      <Float speed={2} floatIntensity={1.5}>
        <mesh position={[-1.6, 1.4, 1]}>
          <sphereGeometry args={[0.45, 64, 64]} />
          <MeshTransmissionMaterial thickness={0.6} roughness={0.05} transmission={1} ior={1.4} chromaticAberration={0.06} backside color="#fff6dd" />
        </mesh>
      </Float>
      <Float speed={1.6} floatIntensity={1.2}>
        <mesh position={[1.4, -1.6, 0.5]}>
          <sphereGeometry args={[0.32, 64, 64]} />
          <MeshDistortMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} distort={0.35} speed={2} />
        </mesh>
      </Float>
    </group>
  );
};

const Hero3DScene = () => (
  <div className="absolute inset-0 z-0">
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <spotLight position={[6, 6, 6]} angle={0.4} penumbra={1} intensity={2} color="#ffe8a8" />
      <pointLight position={[-6, -3, 2]} intensity={1} color={GOLD} />
      <Environment preset="sunset" />
      <Sculpture />
      <Sparkles count={80} scale={[14, 8, 6]} size={2} speed={0.3} color={GOLD} opacity={0.6} />
    </Canvas>
  </div>
);

export default Hero3DScene;

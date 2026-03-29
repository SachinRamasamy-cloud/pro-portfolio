import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';

// --- 3D Scene Components ---
const SystemNode = ({ radius, speed, offset, size, color, shape, label }) => {
  const groupRef = useRef();
  const meshRef = useRef();
  const packetRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    // Extremely slow, subtle orbit
    groupRef.current.rotation.y = t * speed + offset;

    // Smooth hover scale & spin
    const targetScale = hovered ? 1.4 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    if (hovered) {
      meshRef.current.rotation.y += delta * 2;
      meshRef.current.rotation.x += delta * 2;
    }

    // Data Flow Packet Animation (moves from node to core)
    // The local X-axis points from the core to the node.
    // We map a cycle to move a tiny sphere from `radius` down to `0`.
    if (packetRef.current) {
      const cycle = (t * (speed * 6) + offset) % 1; // 0 to 1 looping value
      const currentPos = radius * (1 - cycle);
      packetRef.current.position.set(currentPos, 0, 0);
      
      // Fade out as it hits the center core
      const opacity = cycle < 0.8 ? 1 : (1 - cycle) * 5;
      packetRef.current.material.opacity = Math.max(0, opacity);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Thin Orbit Ring */}
      <mesh rotation-x={Math.PI / 2}>
        <torusGeometry args={[radius, 0.008, 16, 100]} />
        <meshBasicMaterial color="#555555" transparent opacity={0.2} />
      </mesh>
      {/* Dashed line connecting to core */}
      <Line
        points={[[0, 0, 0], [radius * 0.9, 0, 0]]}
        color="#555555"
        lineWidth={0.5}
        dashed
        dashSize={0.05}
        gapSize={0.08} />

      {/* Orbiting Element (DB, API, Queue) */}
      <mesh
        ref={meshRef}
        position={[radius, 0, 0]}
        rotation={[0.5, 0.5, 0]}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        {shape === 'box' ? (
          <boxGeometry args={[size, size, size]} />
        ) : shape === 'cylinder' ? (
          <cylinderGeometry args={[size * 0.8, size * 0.8, size * 1.4, 16]} />
        ) : shape === 'torus' ? (
          <torusGeometry args={[size * 0.7, size * 0.25, 16, 40]} />
        ) : shape === 'octahedron' ? (
          <octahedronGeometry args={[size, 0]} />
        ) : (
          <icosahedronGeometry args={[size, 1]} />
        )}
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 0.8 : 0.2} roughness={0.7} metalness={0.2} />
        
        {/* Semantic Hover Label */}
        {hovered && (
          <Html position={[0, size + 0.2, 0]} center>
            <div className="bg-surface-elevated text-text-primary px-3 py-1 rounded-md text-xs border border-accent shadow-lg font-body whitespace-nowrap">
              {label}
            </div>
          </Html>
        )}
      </mesh>

      {/* Data Flow Packet */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

const SystemScene = () => {
  const groupRef = useRef();
  const coreRef = useRef();
  const coreMaterialRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    
    // Mouse Parallax + Gentle float
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX + t * 0.05, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY + Math.sin(t * 0.3) * 0.05 + 0.15, 0.05);
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;

    // Core independent slow rotation & Emissive Pulse
    coreRef.current.rotation.y -= delta * 0.15;
    coreRef.current.rotation.x -= delta * 0.15;
    
    if (coreMaterialRef.current) {
      coreMaterialRef.current.emissiveIntensity = 0.3 + Math.sin(t * 2) * 0.2; // Breathing glow
    }
  });

  return (
    <group ref={groupRef}>
      {/* Subtle depth fog */}
      <fog attach="fog" args={['#0e0e0e', 10, 20]} />

      {/* Soft, non-intrusive lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />

      {/* Central Core (System/Server) */}
      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshStandardMaterial ref={coreMaterialRef} color="#1a1a1a" emissive="#b59a6d" emissiveIntensity={0.5} roughness={0.6} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.95, 2]} />
          {/* Warm accent wireframe mapping to your theme */}
          <meshBasicMaterial color="#b59a6d" wireframe transparent opacity={0.25} />
        </mesh>
      </group>

      {/* Infrastructure Nodes */}
      <SystemNode radius={2.2} speed={0.15} offset={0} size={0.25} color="#b59a6d" shape="cylinder" label="PostgreSQL DB" />
      <SystemNode radius={3.0} speed={0.1} offset={Math.PI / 1.5} size={0.3} color="#888888" shape="box" label="GraphQL API" />
      <SystemNode radius={3.8} speed={0.08} offset={Math.PI} size={0.25} color="#aaaaaa" shape="torus" label="RabbitMQ" />
      <SystemNode radius={4.5} speed={0.05} offset={Math.PI * 1.5} size={0.2} color="#888888" shape="octahedron" label="Redis Cache" />
    </group>
  );
};

export default function Hero() {

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4, // Delay after navbar fades in
      },
    },
  };

  return (
    <motion.section
      className='min-h-screen grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-12 gap-10'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left Column: Text Content */}
      <motion.div className="max-w-xl" variants={textContainerVariants}>
        <motion.p className='font-body text-accent mb-4' variants={itemVariants}>
          Sachin - Full Stack Dev @ Dromolys
        </motion.p>
        <motion.h1 className='font-display text-5xl lg:text-6xl font-medium text-text-primary leading-tight' variants={itemVariants}>
          I build and maintain robust backend systems and infrastructure.
        </motion.h1>
        <motion.div className="mt-6 text-text-secondary font-body text-lg" variants={itemVariants}>
          Working with Docker, CI/CD pipelines, and modern full-stack tools to ship and maintain scalable, real-world applications.
        </motion.div>
        <div className="mt-8 flex items-center gap-4">
          <motion.button
            className="bg-accent text-text-inverse font-body px-6 py-3 rounded"
            variants={itemVariants}
            whileHover={{ scale: 1.05, backgroundColor: '#7A5F3D' /* accent-hover */ }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Projects
          </motion.button>
          <motion.button
            className="bg-surface-elevated text-text-primary font-body px-6 py-3 rounded border border-border"
            variants={itemVariants}
            whileHover={{ scale: 1.05, borderColor: '#5C5C5C' /* text-secondary */ }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Resume
          </motion.button>
        </div>
      </motion.div>
      {/* Right Column: 3D System Orbit */}
      <motion.div className="relative h-96 w-full hidden md:flex items-center justify-center" variants={itemVariants}>
        <div className="absolute inset-0 w-full h-full cursor-default">
          <Canvas camera={{ position: [0, 2, 7.5], fov: 45 }} dpr={[1, 2]}>
            <SystemScene />
          </Canvas>
        </div>
      </motion.div>
    </motion.section>
  )
}

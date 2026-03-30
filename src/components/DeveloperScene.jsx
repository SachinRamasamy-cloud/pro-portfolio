import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Text, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// --------------------------------------------------------
// 1. Holographic Animated Code (Floating beside the model)
// --------------------------------------------------------
const AnimatedCode = () => {
  const textRef = useRef();
  
  // Connects conceptually to your existing SystemNode architecture
  const codeSnippet = useMemo(() => 
`import { SystemCore } from './infra';

async function optimizeSystem() {
  const nodes = await SystemCore.analyze();
  
  while (nodes.processing) {
    await scaleDatabase();
    yield rebalanceLoad();
  }
  
  return SystemCore.status('optimal');
}`, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Calculate characters to show based on time, loops smoothly
    const speed = 25;
    const currentLength = Math.floor((t * speed) % (codeSnippet.length + 50));
    
    if (textRef.current) {
      const isTyping = currentLength <= codeSnippet.length;
      const visibleText = codeSnippet.slice(0, Math.min(currentLength, codeSnippet.length));
      const cursor = (Math.floor(t * 4) % 2 === 0 && isTyping) ? '_' : ' ';
      textRef.current.text = visibleText + cursor;
    }
  });

  return (
    <Text
      ref={textRef}
      position={[-1.4, 0.5, 0.5]} // Shifted left to float like a hologram
      rotation={[0, 0.3, 0]}      // Angled slightly inward
      fontSize={0.08}
      color="#b59a6d" // Matches your gold accent
      maxWidth={1.2}
      lineHeight={1.4}
      anchorX="left"
      anchorY="top"
      emissive="#b59a6d"
      emissiveIntensity={0.4}
    >
      {''}
    </Text>
  );
};

// --------------------------------------------------------
// 2. Real 3D Model Loader
// --------------------------------------------------------
// Remote URL for a realistic 3D Macbook model
// const MODEL_URL = 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf';
const MODEL_URL = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
const RealisticDeveloperModel = () => {
  // Loads a realistic Macbook model directly from a CDN so it won't crash
  const { scene } = useGLTF(MODEL_URL);

  // Automatically apply the Gold/Dark theme to the imported model
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        // If the model part is metallic, tint it to your gold accent color
        if (child.material.metalness > 0.3) {
          child.material.color.set('#b59a6d');
        }
        // Optional: you can force rougher parts to be darker to match the carbon look
        // else {
        //   child.material.color.lerp(new THREE.Color('#111111'), 0.5);
        // }
      }
    });
  }, [scene]);

  return (
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1}>
      <primitive 
        object={scene} 
        position={[0.5, -0.8, 0]} 
        scale={1.2} 
        rotation={[0.1, -0.4, 0]} 
      />
    </Float>
  );
};

// --------------------------------------------------------
// 3. Camera Rig (Smooth Parallax based on mouse)
// --------------------------------------------------------
const CameraRig = ({ children }) => {
  const groupRef = useRef();

  useFrame((state) => {
    // Lerp rotation based on normalized mouse coordinates
    const targetX = (state.pointer.x * Math.PI) / 20;
    const targetY = (state.pointer.y * Math.PI) / 20;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
  });

  return <group ref={groupRef}>{children}</group>;
};

// --------------------------------------------------------
// 4. Main Export Component
// --------------------------------------------------------
export default function DeveloperHero3D() {
  return (
    <Suspense fallback={null}>
      <CameraRig>
        {/* Lighting tuned for the dark/gold aesthetic */}
        <ambientLight intensity={0.4} />
        <spotLight position={[5, 10, 5]} intensity={2.2} penumbra={1} color="#ffffff" />
        <pointLight position={[-2, 2, 2]} intensity={0.8} color="#b59a6d" distance={10} />
        
        {/* Environment map gives the shiny materials their premium reflections */}
        <Environment preset="city" />
        
        <AnimatedCode />
        <RealisticDeveloperModel />
        
        {/* Ground shadow for depth (highly optimized) */}
        <ContactShadows 
          position={[0, -1, 0]} 
          opacity={0.6} 
          scale={10} 
          blur={2.5} 
          far={2} 
          color="#000000" 
        />
      </CameraRig>
    </Suspense>
  );
}

// Preload the model for faster loading
useGLTF.preload(MODEL_URL);
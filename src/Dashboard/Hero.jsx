import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import DeveloperHero3D from '../components/DeveloperScene';

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
<motion.div className="relative h-[550px] w-full hidden md:flex items-center justify-center" variants={itemVariants}>
        <div className="absolute inset-0 w-full h-full cursor-default">
          <Canvas
            camera={{ position: [0, 1.5, 4.5], fov: 45 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            dpr={[1, 2]}
          >
            <DeveloperHero3D />
          </Canvas>
        </div>
      </motion.div>
    </motion.section>
  )
}

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, Float, Text } from '@react-three/drei'
import * as THREE from 'three'

const THEME = {
  accent: '#8b6f47',
  accentSoft: '#c2a57a',
  ink: '#201a14',
  surface: '#efe5d3',
}

function ServiceStack() {
  const stackRef = useRef(null)

  useFrame((state) => {
    if (!stackRef.current) return
    stackRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.08
  })

  return (
    <group ref={stackRef}>
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 0.2, 48]} />
        <meshStandardMaterial color={THEME.ink} roughness={0.6} metalness={0.25} />
      </mesh>

      <mesh position={[0, -0.22, 0]}>
        <boxGeometry args={[1.2, 0.26, 0.9]} />
        <meshStandardMaterial color="#2c241d" roughness={0.45} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[1.2, 0.26, 0.9]} />
        <meshStandardMaterial color="#342a22" roughness={0.4} metalness={0.32} />
      </mesh>
      <mesh position={[0, 0.38, 0]}>
        <boxGeometry args={[1.2, 0.26, 0.9]} />
        <meshStandardMaterial color={THEME.accent} roughness={0.3} metalness={0.45} />
      </mesh>

      <mesh position={[0, 0.38, 0.48]}>
        <boxGeometry args={[0.72, 0.04, 0.02]} />
        <meshStandardMaterial color={THEME.accentSoft} emissive={THEME.accentSoft} emissiveIntensity={0.35} />
      </mesh>
    </group>
  )
}

function OrbitLayer({ radius, speed, color, size, y = 0 }) {
  const packetRef = useRef(null)
  const angleOffset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (!packetRef.current) return
    const t = state.clock.elapsedTime * speed + angleOffset
    packetRef.current.position.x = Math.cos(t) * radius
    packetRef.current.position.z = Math.sin(t) * radius
    packetRef.current.position.y = y + Math.sin(t * 2) * 0.04
  })

  return (
    <>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, y, 0]}>
        <ringGeometry args={[radius - 0.01, radius + 0.01, 96]} />
        <meshBasicMaterial color="#b9aa90" transparent opacity={0.45} />
      </mesh>

      <mesh ref={packetRef}>
        <sphereGeometry args={[size, 20, 20]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
      </mesh>
    </>
  )
}

function TechLabels() {
  return (
    <group>
      <Text position={[1.7, 0.72, 0]} fontSize={0.12} color={THEME.ink} anchorX="center" anchorY="middle">
        REST API
      </Text>
      <Text position={[-1.7, 0.38, 0]} fontSize={0.12} color={THEME.ink} anchorX="center" anchorY="middle">
        REDIS
      </Text>
      <Text position={[0, 1.02, -1.48]} fontSize={0.12} color={THEME.ink} anchorX="center" anchorY="middle">
        BULLMQ
      </Text>
      <Text position={[0, -0.02, 1.56]} fontSize={0.12} color={THEME.ink} anchorX="center" anchorY="middle">
        DOCKER / VM
      </Text>
    </group>
  )
}

export default function DeveloperHero3D() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 2]} intensity={1.3} />
      <pointLight position={[-2, 1.4, 2]} intensity={0.9} color={THEME.accentSoft} />
      <Environment preset="apartment" />

      <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.2}>
        <ServiceStack />
        <OrbitLayer radius={1.55} speed={0.7} color={THEME.accentSoft} size={0.07} y={0.45} />
        <OrbitLayer radius={1.2} speed={-0.9} color={THEME.accent} size={0.06} y={0.12} />
        <OrbitLayer radius={0.86} speed={1.3} color="#d7c29d" size={0.05} y={-0.2} />
        <TechLabels />
      </Float>

      <Text position={[0, -1.2, 0]} fontSize={0.13} color={THEME.ink} anchorX="center" anchorY="middle">
        Full Stack + Infra Workflow
      </Text>
    </>
  )
}

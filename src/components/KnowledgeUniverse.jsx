import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Html, Line, Sparkles, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { knowledgeDomains } from '../data/knowledge'

const temp = new THREE.Vector3()

function CameraRig({ selected }) {
  const { camera, pointer } = useThree()

  useFrame((_, delta) => {
    const target = selected
      ? temp.set(selected.position.x * 0.42, selected.position.y + 0.35, 7.8)
      : temp.set(pointer.x * 0.45, pointer.y * 0.28, 11.2)

    camera.position.lerp(target, 1 - Math.pow(0.001, delta))
    camera.lookAt(0, 0, 0)
  })

  return null
}

function Orbit({ radius, tilt = 0 }) {
  const points = useMemo(() => {
    const list = []
    for (let i = 0; i <= 128; i += 1) {
      const a = (i / 128) * Math.PI * 2
      list.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius * 0.38, 0))
    }
    return list
  }, [radius])

  return (
    <group rotation={[tilt, 0, 0]}>
      <Line
        points={points}
        color="#6f6a8a"
        transparent
        opacity={0.16}
        lineWidth={0.65}
      />
    </group>
  )
}

function DeityCore() {
  const group = useRef()
  const halo = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (group.current) group.current.rotation.y = Math.sin(t * 0.22) * 0.08
    if (halo.current) {
      halo.current.rotation.z = t * 0.16
      halo.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.28) * 0.08
    }
  })

  return (
    <group ref={group}>
      <Float speed={1.15} rotationIntensity={0.08} floatIntensity={0.32}>
        <mesh position={[0, 0.75, 0]}>
          <sphereGeometry args={[0.31, 48, 48]} />
          <meshStandardMaterial color="#e9e4ff" emissive="#887adf" emissiveIntensity={1.6} roughness={0.25} />
        </mesh>

        <mesh position={[0, -0.22, 0]} scale={[1.15, 1.55, 0.72]}>
          <coneGeometry args={[0.82, 2.2, 64, 1, true]} />
          <meshStandardMaterial
            color="#242039"
            emissive="#443875"
            emissiveIntensity={0.55}
            transparent
            opacity={0.78}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh position={[-0.95, 0.02, 0]} rotation={[0, 0, -0.52]}>
          <cylinderGeometry args={[0.1, 0.14, 1.05, 16]} />
          <meshStandardMaterial color="#8f84c9" emissive="#5d4bb7" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.95, 0.02, 0]} rotation={[0, 0, 0.52]}>
          <cylinderGeometry args={[0.1, 0.14, 1.05, 16]} />
          <meshStandardMaterial color="#8f84c9" emissive="#5d4bb7" emissiveIntensity={0.8} />
        </mesh>

        <mesh position={[-1.25, -0.33, 0]}>
          <sphereGeometry args={[0.15, 24, 24]} />
          <meshStandardMaterial color="#f2ecff" emissive="#8d7cf2" emissiveIntensity={2.2} />
        </mesh>
        <mesh position={[1.25, -0.33, 0]}>
          <sphereGeometry args={[0.15, 24, 24]} />
          <meshStandardMaterial color="#f2ecff" emissive="#8d7cf2" emissiveIntensity={2.2} />
        </mesh>
      </Float>

      <group ref={halo}>
        <mesh>
          <torusGeometry args={[1.48, 0.025, 16, 160]} />
          <meshBasicMaterial color="#d5c7ff" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[0.48, 0.18, 0.45]}>
          <torusGeometry args={[1.82, 0.012, 12, 160]} />
          <meshBasicMaterial color="#74dfff" transparent opacity={0.25} />
        </mesh>
      </group>

      <pointLight color="#937cff" intensity={8} distance={8} decay={2} />
      <Sparkles count={46} scale={[3.5, 3.5, 1.2]} size={2.2} speed={0.35} opacity={0.7} color="#b5a8ff" />
    </group>
  )
}

function KnowledgePlanet({ domain, selectedId, setSelected }) {
  const group = useRef()
  const planet = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }, delta) => {
    if (!group.current || !planet.current) return
    const t = clock.getElapsedTime() * domain.speed + domain.phase
    const x = Math.cos(t) * domain.radius
    const y = Math.sin(t) * domain.radius * 0.38
    const z = Math.sin(t * 0.7) * 0.45

    group.current.position.set(x, y, z)
    group.current.rotation.z = domain.tilt
    planet.current.rotation.y += delta * 0.35
    planet.current.rotation.x += delta * 0.08

    const targetScale = hovered || selectedId === domain.id ? 1.28 : selectedId ? 0.78 : 1
    const s = THREE.MathUtils.lerp(planet.current.scale.x, targetScale, 1 - Math.pow(0.005, delta))
    planet.current.scale.setScalar(s)
  })

  const isSelected = selectedId === domain.id

  return (
    <group ref={group}>
      <group
        ref={planet}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'default'
        }}
        onClick={(e) => {
          e.stopPropagation()
          const currentPosition = group.current?.position?.clone?.() || new THREE.Vector3()
          setSelected(isSelected ? null : { ...domain, position: currentPosition })
        }}
      >
        <mesh>
          <sphereGeometry args={[domain.size, 48, 48]} />
          <meshStandardMaterial
            color={domain.color}
            emissive={domain.emissive}
            emissiveIntensity={hovered || isSelected ? 2.4 : 1.25}
            roughness={0.45}
            metalness={0.32}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2.25, 0.2, 0.5]}>
          <torusGeometry args={[domain.size * 1.42, domain.size * 0.055, 12, 96]} />
          <meshBasicMaterial color={domain.color} transparent opacity={0.46} />
        </mesh>
        <pointLight color={domain.color} intensity={hovered || isSelected ? 3.8 : 1.7} distance={3.8} decay={2} />
      </group>

      {(hovered || isSelected) && (
        <Html center distanceFactor={8} position={[0, domain.size + 0.78, 0]} className="planet-label-wrap">
          <div className={`planet-label ${isSelected ? 'is-selected' : ''}`}>
            <span className="planet-kicker">KNOWLEDGE DOMAIN</span>
            <strong>{domain.name}</strong>
            <small>{domain.subtitle}</small>
          </div>
        </Html>
      )}
    </group>
  )
}

function Scene({ selected, setSelected }) {
  return (
    <>
      <color attach="background" args={['#04040a']} />
      <fog attach="fog" args={['#04040a', 8, 24]} />
      <ambientLight intensity={0.5} color="#817da6" />
      <directionalLight position={[4, 7, 6]} intensity={2.2} color="#d8d5ff" />

      <Stars radius={45} depth={30} count={2600} factor={3.4} saturation={0.22} fade speed={0.18} />
      <Sparkles count={130} scale={[24, 14, 8]} size={1.2} speed={0.12} opacity={0.32} color="#b9b8ff" />

      {knowledgeDomains.map((domain) => (
        <Orbit key={`orbit-${domain.id}`} radius={domain.radius} tilt={domain.tilt} />
      ))}

      <DeityCore />

      {knowledgeDomains.map((domain) => (
        <KnowledgePlanet
          key={domain.id}
          domain={domain}
          selectedId={selected?.id}
          setSelected={setSelected}
        />
      ))}

      <CameraRig selected={selected} />
    </>
  )
}

export default function KnowledgeUniverse({ selected, setSelected }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 11.2], fov: 46, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      onPointerMissed={() => setSelected(null)}
    >
      <Scene selected={selected} setSelected={setSelected} />
    </Canvas>
  )
}

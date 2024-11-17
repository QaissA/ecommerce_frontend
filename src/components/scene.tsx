import { ReactNode, useMemo, useReducer, useRef } from "react"
import { Canvas, useFrame } from '@react-three/fiber'
import { RigidBody, BallCollider, RapierRigidBody, Physics, CuboidCollider } from '@react-three/rapier'
import * as THREE from 'three'
import { Environment, Lightformer, MeshTransmissionMaterial, useGLTF } from "@react-three/drei"
import { easing } from "maath"
import { EffectComposer, N8AO } from "@react-three/postprocessing"

interface ConnectorProps {
  position?: [number, number, number]
  children?: ReactNode
  vec?: THREE.Vector3
  scale?: number
  r?: (range: number) => number
  accent?: boolean
  color?: THREE.Color | string | number
}

interface ModelProps {
  children?: ReactNode
  color?: THREE.Color | string | number
  roughness?: number
}

const accents = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00']
const shuffle = (accent = 0) => [
  { color: '#444', roughness: 0.1 },
  { color: '#444', roughness: 0.75 },
  { color: '#444', roughness: 0.75 },
  { color: 'white', roughness: 0.1 },
  { color: 'white', roughness: 0.75 },
  { color: 'white', roughness: 0.1 },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: accents[accent], roughness: 0.75, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true }
]

const Scene = (props: any) => {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0);
  const connectors = useMemo(() => shuffle(accent), [accent])
  return (
    <Canvas
      onClick={click}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 20 }}
      {...props}>
      <color attach="background" args={["#141622"]} />
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <Physics /*debug*/ gravity={[0, 0, 0]}>
        <Pointer />
        {connectors.map((props, i) => <Connector key={i} {...props} />) /* prettier-ignore */}
        <Connector position={[10, 10, 5]}>
          <Model>
            <MeshTransmissionMaterial clearcoat={1} thickness={0.1} anisotropicBlur={0.1} chromaticAberration={0.1} samples={8} resolution={512} />
          </Model>
        </Connector>
      </Physics>
      <EffectComposer multisampling={8} enableNormalPass={false}>
        <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
      </EffectComposer>
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
        </group>
      </Environment>
    </Canvas>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef<RapierRigidBody>(null)
  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0))
  })
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[1]} />
    </RigidBody>
  )
}

function Connector({
  position,
  children,
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  accent,
  color,
  ...props
}: ConnectorProps) {
  // Define the ref with the type RapierRigidBody (from @react-three/rapier)
  const api = useRef<RapierRigidBody>(null)

  // Memoize the position, using the provided position or a randomly generated one
  const pos = useMemo<[number, number, number]>(() => position || [r(10), r(10), r(10)], [position, r])

  useFrame((state, delta) => {
    delta = Math.min(0.1, delta)
    if (api.current) {
      api.current.applyImpulse(
        vec.copy(api.current.translation()).negate().multiplyScalar(0.2),
        true
      )
    }
  })

  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={pos}
      ref={api}
      colliders={false}
    >
      <CuboidCollider args={[0.38, 1.27, 0.38]} />
      <CuboidCollider args={[1.27, 0.38, 0.38]} />
      <CuboidCollider args={[0.38, 0.38, 1.27]} />
      {children ? children : <Model {...props} />}
      {accent && <pointLight intensity={4} distance={2.5} color={color} />}
    </RigidBody>
  )
}

function Model({ children, color = 'white', roughness = 0, ...props }: ModelProps) {
  // Define ref with type THREE.Mesh
  const ref = useRef<THREE.Mesh>(null)

  // Load GLTF model
  const { nodes, materials } = useGLTF('/c-transformed.glb') as any // Adjust typing for your GLTF file if needed

  // Animation frame to update color
  useFrame((state, delta) => {
    if (ref.current) {
      const material = ref.current.material as THREE.MeshStandardMaterial
      easing.dampC(material.color, color, 0.2, delta)
    }
  })

  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      scale={10}
      geometry={nodes.connector.geometry}
      {...props}
    >
      <meshStandardMaterial
        metalness={0.2}
        roughness={roughness}
        map={materials.base.map}
      />
      {children}
    </mesh>
  )
}

export default Scene
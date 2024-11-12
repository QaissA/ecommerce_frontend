import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/rapier"
import { useMemo, useReducer } from "react"

const Scene = (props : any) => {

const accents : string[] = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00']
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

    const [accent, click] = useReducer((state) => ++state % accents.length, 0)
    const connectors = useMemo(() => shuffle(accent), [accent])
  return (
    <Canvas shadows dpr={[1, 1.5]} gl={{ antialias :false }} camera={{position : [0, 0, 15], fov : 17.5, near : 1, far : 20}} { ...props}>
        <color attach="background" args={["#141622"]} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10,10,10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        {/* <Physics gravity={[0,0,0]}>
            <Pointer />
        </Physics> */}
    </Canvas>
  )
}

export default Scene
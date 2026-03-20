import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls, Icosahedron, MeshDistortMaterial, Float } from '@react-three/drei';

// The abstract 3D background object
function AbstractArt() {
  return (
    <>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={3}>
        <Icosahedron args={[2, 0]} position={[-1, 0, -3]} scale={1.5}>
          <MeshDistortMaterial
            color="#a855f7"
            distort={0.4}
            speed={1.5}
            roughness={0.2}
            metalness={0.8}
            wireframe={true}
          />
        </Icosahedron>
      </Float>
    </>
  );
}

export default function DynamicBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ec4899" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#0ea5e9" />
        <Stars radius={50} depth={50} count={4000} factor={4} saturation={0} fade speed={1.5} />
        <AbstractArt />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}

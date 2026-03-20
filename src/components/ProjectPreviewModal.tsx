import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, PerspectiveCamera, MeshDistortMaterial, RoundedBox, useTexture } from '@react-three/drei';
import { Suspense } from 'react';

function Screen({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group rotation={[0, -Math.PI / 6, 0]}>
        {/* Laptop Base/Frame */}
        <RoundedBox args={[4, 2.5, 0.1]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </RoundedBox>

        {/* Screen Content */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[3.8, 2.3]} />
          <meshBasicMaterial map={texture} />
        </mesh>

        {/* Decorative Glow */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[4.2, 2.7]} />
          <MeshDistortMaterial
            color="#38bdf8"
            speed={2}
            distort={0.2}
            transparent
            opacity={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

interface ProjectPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    github: string;
    live: string;
  } | null;
}

export default function ProjectPreviewModal({ isOpen, onClose, project }: ProjectPreviewModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/90 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl glass rounded-3xl overflow-hidden flex flex-col lg:flex-row h-[80vh] lg:h-[70vh] border border-border shadow-2xl transition-colors duration-500"
          >
            {/* 3D Preview Side */}
            <div className="flex-1 bg-accent/5 relative min-h-[300px] lg:min-h-full">
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />

                <Suspense fallback={null}>
                  <Screen imageUrl={project.image} />
                </Suspense>

                <OrbitControls enableZoom={false} />
              </Canvas>

              <div className="absolute bottom-4 left-4 pointer-events-none">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Interactive 3D Preview • Drag to rotate
                </p>
              </div>
            </div>

            {/* Info Side */}
            <div className="w-full lg:w-[400px] p-8 flex flex-col justify-between bg-background/50 backdrop-blur-md">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">{project.title}</h2>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-accent/10 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  {project.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-accent/5 border border-border hover:bg-accent/10 text-foreground font-bold transition-all"
                  >
                    <Github size={18} />
                    Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white font-bold glow-button"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

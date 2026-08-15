import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Contact from './components/Contact';
import FloatingDock from './components/FloatingDock';
import MusicPlayer from './components/MusicPlayer';
import LoadingScreen from './components/LoadingScreen';
import DynamicBackground from './components/DynamicBackground';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background selection:bg-primary/30 selection:text-primary transition-colors duration-500">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <main key="main" className="relative">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-0 left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
              <div className="absolute bottom-0 right-[-10%] h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[120px]" />
            </div>

            <DynamicBackground />
            <Navbar />
            {/* <MusicPlayer /> */}
            <Hero />

            <Skills />
            <Projects />
            <Education />
            <Achievements />
            <Contact />
            <FloatingDock />

            {/* Footer */}
            <footer className="py-12 pb-44 border-t border-border/10 text-center text-foreground/40 text-sm relative z-30">
              <p className="font-medium">© {new Date().getFullYear()} Vikash Kumawat - Always building, always learning.</p>
              <a
                href="https://portfolio-beryl-mu-2txm47txd3.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 hover:text-primary transition-colors font-medium border-b border-transparent hover:border-primary/30 pb-0.5"
              >
                Previous portfolio <span>↗</span>
              </a>
            </footer>
          </main>
        )}
      </AnimatePresence>
    </div>
  );
}

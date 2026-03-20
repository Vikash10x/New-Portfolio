import { motion, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  // { name: 'Education', href: '#education' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Active section tracking with IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'skills', 'projects', 'achievements', 'contact', 'education'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent z-[60] origin-left"
        style={{ scaleX }}
      />

      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out px-4 py-6 pointer-events-none",
          scrolled ? "translate-y-0" : "translate-y-0"
        )}
      >
        <div className={cn(
          "max-w-fit mx-auto flex items-center gap-4 px-6 py-2.5 rounded-full transition-all duration-500 pointer-events-auto border border-white/5",
          scrolled
            ? "bg-background/40 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            : "bg-transparent border-transparent"
        )}>
          <motion.a
            href="#home"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center ml-1 mr-6"
          >
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-primary/20 hover:scale-110 transition-transform">
              VK
            </div>
          </motion.a>

          <div className="h-4 w-px bg-white/10 hidden md:block mr-2" />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "relative px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-full",
                    isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 border border-primary/20 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          <div className="h-4 w-px bg-white/10 mx-2 hidden md:block" />

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "hidden md:block px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-xl",
              activeSection === 'contact' 
                ? "bg-primary text-white shadow-primary/20" 
                : "bg-foreground text-background hover:bg-primary hover:text-white"
            )}
          >
            Hire Me
          </motion.a>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              className="text-foreground p-1 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden mt-4 max-w-[280px] mx-auto rounded-3xl bg-background/80 backdrop-blur-2xl border border-white/10 pointer-events-auto shadow-2xl"
        >
          <div className="flex flex-col gap-1 p-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-5 py-3 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-white/5"
                  )}
                >
                  {link.name}
                </a>
              );
            })}
            <motion.a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 px-5 py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white text-center font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-primary/20"
            >
              Hire Me
            </motion.a>
          </div>
        </motion.div>
      </nav>
    </>
  );
}


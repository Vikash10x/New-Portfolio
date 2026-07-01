import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Typewriter } from 'react-simple-typewriter';
import { useRef } from 'react';

// 3D Parallax Tilt Profile Image
function TiltProfileImage() {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17deg", "-17deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17deg", "17deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px] rounded-full border-[6px] border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] overflow-hidden cursor-crosshair"
    >
      {/* Inner image container lifted forward slightly for 3D depth */}
      <div
        style={{ transform: "translateZ(40px)" }}
        className="w-full h-full scale-110" // scale slightly to hide edges during tilt
      >
        <img
          src="/Image/self.jpg"
          alt="Vikash Kumawat"
          className="w-[110%] h-[110%] object-cover -ml-[5%] -mt-[5%]"
          referrerPolicy="no-referrer"
        />
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">

      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 pt-36 pb-13">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-[55%] flex flex-col items-center md:items-start text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mb-2 tracking-wide leading-tight">
            Hi, I am <motion.span
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
              className="inline-block origin-[70%_70%] ml-2"
            >
              👋
            </motion.span>
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mb-6 tracking-wide leading-tight drop-shadow-lg">
            Vikash Kumawat
          </h1>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-8 drop-shadow-md">
            I am a <span className="text-primary truncate">
              <Typewriter
                words={['Full Stack Developer', 'UI/UX Designer', 'MERN Expert']}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-sm md:text-base leading-[1.8] mb-10 max-w-xl relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md shadow-2xl group overflow-hidden text-center md:text-left"
          >
            {/* Subtle accent glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-[50px] pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />

            <span className="relative z-10">
              <span className="text-foreground font-bold">Full Stack Developer (MERN)</span> focused on <span className="text-primary font-semibold">React.js</span> and <span className="text-primary font-semibold">Tailwind CSS</span>, with hands-on experience building responsive user interfaces and backend features using <span className="text-primary font-semibold">Node.js</span>, <span className="text-primary font-semibold">Express</span>, and <span className="text-primary font-semibold">MongoDB</span>.
              Prioritizing clean UX, modular component architecture, REST APIs, and delivering production-ready, end-to-end web applications.
            </span>
          </motion.div>

          <a
            href="/Image/Resume.pdf"
            download
            className="px-8 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-[0_10px_30px_rgba(168,85,247,0.4)] hover:shadow-[0_15px_40px_rgba(168,85,247,0.6)] hover:-translate-y-1"
          >
            Download Resume
          </a>
        </motion.div>

        {/* Right Tilt Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-[45%] flex justify-center md:justify-end mb-8 md:mb-0 relative perspective-1000"
          style={{ perspective: "1000px" }}
        >
          {/* Subtle glowing aura behind the image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[350px] md:h-[350px] bg-primary/10 rounded-full blur-[60px] pointer-events-none" />

          <TiltProfileImage />
        </motion.div>

      </div>
    </section>
  );
}

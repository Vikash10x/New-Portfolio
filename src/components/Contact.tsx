import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Mail, Briefcase, MapPin, Send, MessageSquare, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse Spotlight Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const spotlightY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // 3D Tilt Logic for Cards
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltXSpring = useSpring(tiltX, { stiffness: 300, damping: 30 });
  const tiltYSpring = useSpring(tiltY, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(tiltYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(tiltXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    // Update tilt values
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const formData = new FormData(target);
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xbdzbynl", { // Replace ID
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSent(true);
        target.reset();
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#06b6d4', '#f59e0b']
        });
        setTimeout(() => setIsSent(false), 5000);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className="py-24 relative overflow-hidden bg-transparent group/section"
    >
      {/* Dynamic Mouse Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover/section:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => `radial-gradient(1200px circle at ${x}px ${y}px, rgba(168, 85, 247, 0.08), transparent 80%)`
          ),
        }}
      />

      {/* Decorative Floating Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -left-20 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px]"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-20 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute -top-10 text-7xl md:text-9xl font-black text-foreground/[0.03] select-none pointer-events-none uppercase tracking-[0.2em]"
          >
            CONTACT
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-widest mb-4 uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-info"
          >
            CONTACT
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-primary via-info to-transparent rounded-full"
          />
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Refined Info Cards */}
          <div className="space-y-12 lg:pt-6">
            <div className="space-y-10">
              {/* Status Pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-3xl group/pill hover:border-green-500/30 transition-all duration-500"
              >
                <div className="relative flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
                  <motion.div
                    animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute h-2 w-2 rounded-full bg-green-500"
                  />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500/90 group-hover/pill:text-green-500 transition-colors">Open to Work</span>
              </motion.div>

              <div className="space-y-7">
                {[
                  { icon: Mail, label: 'Email', value: 'vvikash0012@gmail.com', subtitle: 'Always active for discussion' },
                  { icon: MapPin, label: 'Location', value: 'Rajasthan, India', subtitle: 'Based in the Pink City' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="flex items-center gap-6 p-1 rounded-[2.2rem] bg-gradient-to-br from-white/10 to-transparent shadow-2xl transition-all group/card cursor-default"
                  >
                    <div className="flex items-center gap-6 p-6 w-full h-full rounded-[2.1rem] bg-black/60 backdrop-blur-3xl border border-white/5 transition-all group-hover/card:bg-black/40 group-hover/card:border-primary/20">
                      <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl flex items-center justify-center bg-primary/10 border border-primary/20 shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all group-hover/card:scale-110 group-hover/card:rotate-6 group-hover/card:shadow-primary/20">
                        <item.icon size={22} className="text-primary" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover/card:text-primary transition-colors">{item.label}</p>
                        <p className="text-base md:text-lg font-bold text-foreground tracking-tight leading-tight">{item.value}</p>
                        <p className="text-[9px] font-medium text-zinc-600 italic tracking-wider">{item.subtitle}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: 3D Form Card */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group/form"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-info/20 to-accent/20 rounded-[3.5rem] blur-2xl opacity-0 group-hover/form:opacity-100 transition duration-1000" />

            <div className="relative bg-black/50 backdrop-blur-3xl border border-white/10 p-9 md:p-11 rounded-[3rem] shadow-[0_45px_100px_rgba(0,0,0,0.7)] overflow-hidden">
              {/* Inner Glow Background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />

              <div className="text-center mb-10 relative z-10">
                <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tighter mb-2 uppercase tracking-[0.1em]">Connect <span className="text-primary italic">With Me</span></h3>
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
              </div>

              <form
                onSubmit={handleSubmit}
                className="relative z-10 space-y-6"
                style={{ transform: "translateZ(40px)" }}
                action="https://formspree.io/f/xbdzbynl"
                method="POST"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">Your Name</label>
                    <input
                      required
                      name="name"
                      type="text"
                      className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-primary/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-primary/20 outline-none transition-all text-white placeholder:text-zinc-700 font-semibold text-sm"
                      placeholder="Enter your name "
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">Email</label>
                    <input
                      required
                      name="email"
                      type="email"
                      className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-primary/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-primary/20 outline-none transition-all text-white placeholder:text-zinc-700 font-semibold text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">Message</label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-primary/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-primary/20 outline-none transition-all text-white placeholder:text-zinc-700 font-semibold text-sm resize-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting || isSent}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-primary via-purple-600 to-info text-white font-black uppercase tracking-[0.4em] text-[11px] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_20px_40px_rgba(168,85,247,0.3)] mt-4 relative overflow-hidden group/btn"
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                  ) : isSent ? (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✨ Message Sent! ✨</motion.span>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      <span>Shoot Message</span>
                    </div>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

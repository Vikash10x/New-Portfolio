import { motion } from 'motion/react';
import {
  Trophy,
  TrendingUp,
  Sparkles,
  Zap,
  Star,
  Award,
  Database,
  Bot,
  Code2,
  BrainCircuit,
  Medal,
  Cloud
} from 'lucide-react';

const achievements = [
  {
    title: 'ENIGMA Inter College Hackathon',
    subtitle: 'Participant',
    date: 'FEB 2026',
    description: 'Collaborated in a 2-day inter-college hackathon at AIT Pune, developing innovative solutions and enhancing real-time problem-solving skills.',
    icon: Trophy,
    emoji: '🏆',
    result: 'Participation',
    side: 'right',
    accentColor: '#f59e0b',
    bgColor: '#1c140a',
    borderColor: '#78350f',
    iconBg: '#92400e',
    type: 'hackathon',
    link: 'https://attendex.xyz/login',
  },
  {
    title: 'Google Cloud Launchpad',
    subtitle: 'Google Cloud | Generative AI Leader',
    date: 'FEB 2026',
    description: 'Mastered the Generative AI track, completing advanced courses and hands-on labs focused on LLMs and specialized AI agents.',
    icon: Cloud,
    emoji: '☁️',
    result: 'Generative AI Leader',
    side: 'left',
    accentColor: '#4285F4',
    bgColor: '#0d131f',
    borderColor: '#172b4d',
    iconBg: '#1e3a8a',
    type: 'certificate',
    link: 'https://drive.google.com/file/d/1OsEdifkISm10mDDPbB2HQMKCy1CYTtsv/view?usp=drive_link',
  },
  {
    title: 'Innerve X Grand Finale',
    subtitle: 'Software Track | Participant',
    date: 'JAN 2026',
    description: 'Selected as a finalist in the Innerve X Grand Finale at AIT Pune, working with a team to build tech-driven social solutions.',
    icon: TrendingUp,
    emoji: '🔥',
    result: 'Participation',
    side: 'right',
    accentColor: '#22d3ee',
    bgColor: '#041c22',
    borderColor: '#155e75',
    iconBg: '#164e63',
    type: 'hackathon',
    link: '#',
  },
  {
    title: 'OCI Developer Professional',
    subtitle: 'Oracle University | Certified Professional',
    date: 'OCT 2025',
    description: 'Expert-level certification demonstrating proficiency in developing, deploying, and managing applications on Oracle Cloud Infrastructure.',
    icon: Cloud,
    emoji: '☁️',
    result: 'Oracle Certified Professional',
    side: 'left',
    accentColor: '#ef4444',
    bgColor: '#1a0808',
    borderColor: '#7f1d1d',
    iconBg: '#991b1b',
    type: 'certificate',
    link: 'https://drive.google.com/file/d/1opWjwscDbYL-7zNpW62z0hV2mVjyEw0M/view?usp=drive_link',
  },
  {
    title: 'Building AI Agents',
    subtitle: 'MongoDB University',
    date: 'SEP 2025',
    description: 'Gained hands-on expertise in building AI-powered agents using MongoDB Atlas Vector Search and specialized data pipelines.',
    icon: Database,
    emoji: '🍃',
    result: 'Course Completion',
    side: 'right',
    accentColor: '#10b981',
    bgColor: '#071a15',
    borderColor: '#064e3b',
    iconBg: '#065f46',
    type: 'certificate',
    link: 'https://drive.google.com/file/d/1Du0PxWxP_lHxupsrM8MPwReZH9fb3Xte/view?usp=drive_link',
  },
  {
    title: '100 Days of Code',
    subtitle: 'Udemy | Dr. Angela Yu',
    date: 'MAY 2024',
    description: 'Completed a rigorous 100-day Python bootcamp covering data structures, automation, backend web dev, and game development.',
    icon: Award,
    emoji: '📜',
    result: 'Course Completion',
    side: 'left',
    accentColor: '#a855f7',
    bgColor: '#150a1f',
    borderColor: '#6b21a8',
    iconBg: '#5b21b6',
    type: 'certificate',
    link: 'https://drive.google.com/file/d/1wK5Ysh71sZQAieWJqqgGzCtXj4gPJhy7/view?usp=drive_link',
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-transparent">

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-20 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute -top-10 text-7xl md:text-8xl font-black text-foreground/[0.03] select-none pointer-events-none uppercase tracking-[0.2em]"
          >
            ACHIEVEMENTS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-widest mb-4 uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent"
          >
            ACHIEVEMENTS
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-primary to-transparent rounded-full" 
          />
        </div>

        {/* Alternating Timeline */}
        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-border to-transparent hidden md:block" />

          <div className="space-y-16">
            {achievements.map((item, index) => {
              const Icon = item.icon;
              const isRight = item.side === 'right';

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${isRight ? 'flex-col md:flex-row' : 'flex-col md:flex-row-reverse'}`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-[calc(50%-40px)]">
                    <div
                      className="rounded-2xl p-7 border transition-all duration-500 shadow-xl group cursor-default relative overflow-hidden backdrop-blur-sm"
                      style={{
                        backgroundColor: `${item.accentColor}10`,
                        borderColor: `${item.accentColor}20`,
                        boxShadow: `0 0 0px ${item.accentColor}00`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 10px 40px ${item.accentColor}15`;
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.borderColor = `${item.accentColor}40`;
                        e.currentTarget.style.backgroundColor = `${item.accentColor}15`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 0px ${item.accentColor}00`;
                        e.currentTarget.style.transform = 'translateY(0px)';
                        e.currentTarget.style.borderColor = `${item.accentColor}20`;
                        e.currentTarget.style.backgroundColor = `${item.accentColor}10`;
                      }}
                    >
                      {/* Subtitle Glow */}
                      <div
                        className="absolute -top-10 -right-10 w-32 h-32 blur-[60px] opacity-10 transition-opacity group-hover:opacity-25"
                        style={{ backgroundColor: item.accentColor }}
                      />

                      <p
                        className="text-xs font-bold tracking-[0.2em] uppercase mb-3 font-mono"
                        style={{ color: item.accentColor }}
                      >
                        {item.date}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-black text-foreground mb-1 group-hover:text-primary transition-colors tracking-tight">
                        {item.title}
                      </h3>
                      <p
                        className="text-sm font-semibold mb-2"
                        style={{ color: item.accentColor }}
                      >
                        {item.subtitle}
                      </p>
                      <p
                        className="text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2"
                        style={{ color: item.accentColor }}
                      >
                        <span className="text-base">{item.emoji}</span>
                        <span>{item.result}</span>
                      </p>
                      <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8">
                        {item.description}
                      </p>

                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all group/btn w-fit"
                        >
                          <div className="relative flex items-center">
                            <div className="w-5 h-[1px] bg-border group-hover/btn:w-8 group-hover/btn:bg-primary transition-all duration-500" />
                            <div className="absolute right-0 w-1 h-1 rounded-full bg-border group-hover/btn:bg-primary transition-all shadow-[0_0_8px_rgba(168,85,247,0)] group-hover/btn:shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                          </div>
                          {item.type === 'hackathon' ? 'View Project' : 'View Certificate'}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Center Icon Node (Now Rotatable) */}
                  <div className="shrink-0 z-10 hidden md:flex">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      whileTap={{ rotate: 360 }}
                      transition={{ duration: 0.5, ease: "backOut" }}
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl border cursor-pointer relative group-hover:z-50 backdrop-blur-md"
                      style={{
                        backgroundColor: `${item.accentColor}20`,
                        borderColor: `${item.accentColor}30`,
                        boxShadow: `0 0 20px ${item.accentColor}20`,
                      }}
                    >
                      <Icon size={24} style={{ color: item.accentColor }} />
                      
                      {/* Subtle Sparkle on hover/click */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-2xl pointer-events-none"
                      />
                    </motion.div>
                  </div>

                  {/* Empty Spacer for opposite side */}
                  <div className="hidden md:block w-full md:w-[calc(50%-40px)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

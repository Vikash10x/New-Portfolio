import { motion } from 'motion/react';
import { GraduationCap, BookOpen, Calendar, MapPin } from 'lucide-react';

const educationData = [
  {
    id: 1,
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'Poornima University',
    date: '2023 - 2027',
    location: 'Jaipur, India',
    description: 'Pursuing B.Tech in Computer Science with a focus on Web Technologies, Data Structures, and Software Engineering. Actively participating in coding activities and contributing to technical events and hackathons.',
    score: 'CGPA: 7.05/10',
    logo: '/Image/logo.jpeg',
  },
  {
    id: 2,
    degree: 'Senior Secondary (Class 12)',
    institution: 'Arya Public School',
    date: '2022 - 2023',
    location: 'Sikar, Rajasthan, India',
    description: 'Completed Senior Secondary education with a focus on Mathematics and Physics. Participated in national-level science exhibitions.',
    score: 'Percentage: 63%',
    logo: '/Image/logo1.avif',
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-4xl mx-auto px-6">

        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute -top-10 text-7xl md:text-8xl font-black text-foreground/[0.03] select-none pointer-events-none uppercase tracking-[0.2em]"
          >
            EDUCATION
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-widest mb-4 uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent"
          >
            EDUCATION
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-8"
          />
        </div>

        {/* Timeline Container */}
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-[28px] md:before:ml-[28px] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-border before:to-transparent">

          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative flex items-start gap-6 md:gap-8 group"
            >
              {/* Timeline Node */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full border-[4px] border-background bg-primary/20 backdrop-blur-md text-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 z-10 shrink-0 mt-2">
                <BookOpen size={20} />
              </div>

              {/* Content Card */}
              <div className="flex-1 bg-accent/5 hover:bg-accent/10 border border-border hover:border-primary/20 rounded-3xl p-6 md:p-8 transition-all duration-300 shadow-xl group-hover:shadow-[0_10px_30px_rgba(168,85,247,0.05)]">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.degree}
                  </h3>
                  <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary font-mono text-sm font-bold whitespace-nowrap">
                    {item.score}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <img src={item.logo} alt={item.institution} className="w-8 h-8 rounded-full border border-border bg-background/5" />
                  <h4 className="text-lg text-muted-foreground font-medium">
                    {item.institution}
                  </h4>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground/60 text-sm font-mono">
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground/60 text-sm font-mono">
                    <MapPin size={14} />
                    <span>{item.location}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}

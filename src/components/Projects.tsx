import { motion } from 'motion/react';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { useState } from 'react';
import ProjectPreviewModal from './ProjectPreviewModal';

const projects = [
  {
    title: 'Video Editing Services',
    description: `I’m a creative video editor delivering high-quality, impactful edits.
From short- form content to long - form videos, I tailor each project to the vision.
My goal is to bring stories to life through clean and modern editing.`,
    image: '/Image/card_1.png',
    tags: ['React.js', 'JavaScript', 'TailwindCSS'],
    github: 'https://github.com/Vikash10x/Editing-Page',
    live: 'https://editing-page.vercel.app/',
  },
  {
    title: 'Amazon-Clone',
    description: "The Amazon Clone replicates the core shopping experience with product listings, cart, and checkout functionality. It features a clean, responsive UI and smooth navigation, offering an e-commerce feel similar to the original platform.",
    image: '/Image/card_2.webp',
    tags: ['React.js', 'JavaScript', 'CSS'],
    github: "https://github.com/Vikash10x/Amazon-Clone",
    live: 'https://amazon-clone-orcin-two.vercel.app/',
  },
  {
    title: 'Weather App',
    description: "The Weather App provides real-time updates on any city’s weather, showing accurate temperature and conditions. Its clean and user-friendly design makes daily planning effortless.",
    image: '/Image/card_3.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: "https://github.com/Vikash10x/Weather-app",
    live: "https://vikash10x.github.io/Weather-app/",
  },
  {
    title: 'Social Media App',
    description: 'A modern social platform with real-time chat, post sharing, and user interactions. Built with Socket.io for instant messaging and AWS S3 for media storage.',
    image: 'https://picsum.photos/seed/social/800/600',
    tags: ['MERN', 'Socket.io', 'Redux'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePreview = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute -top-10 text-7xl md:text-8xl font-black text-foreground/[0.03] select-none pointer-events-none uppercase tracking-[0.2em]"
          >
            PROJECTS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-widest mb-4 uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent"
          >
            PROJECTS
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-8" 
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl font-medium tracking-tight"
          >
            Building digital experiences that push the boundaries of the web
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onPreview={() => handlePreview(project)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <a
            href="https://github.com/Vikash10x"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-border bg-background/50 hover:bg-background hover:border-primary/50 transition-all font-black uppercase tracking-widest text-sm text-muted-foreground hover:text-foreground group relative overflow-hidden active:scale-95 duration-200"
          >
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <Github size={20} className="group-hover:text-primary transition-colors" />
            Explore More on GitHub
          </a>
        </motion.div>
      </div>

      <ProjectPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onPreview
}: {
  project: typeof projects[0],
  index: number,
  onPreview: () => void
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-[1.5rem] border border-border bg-background backdrop-blur-xl overflow-hidden hover:shadow-[0_20px_60px_rgba(168,85,247,0.15)] hover:border-primary/30 transition-all duration-500 shadow-sm"
    >
      <div className="aspect-[16/10] overflow-hidden relative p-3 text-foreground">
        <motion.img
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover rounded-xl"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 backdrop-blur-[2px]">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-full bg-background/80 border border-border hover:bg-primary transition-all duration-300"
          >
            <Github size={22} className="text-foreground transition-colors group-hover:text-white" />
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-full bg-background/80 border border-border hover:bg-primary transition-all duration-300"
          >
            <ExternalLink size={22} className="text-foreground transition-colors group-hover:text-white" />
          </a>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-accent/10 border border-border text-muted-foreground text-[10px] font-bold uppercase tracking-tight group-hover:border-primary/40 group-hover:text-primary transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors tracking-tight">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8 line-clamp-2">
          {project.description}
        </p>

        <button
          onClick={onPreview}
          className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all group/btn"
        >
          <div className="relative flex items-center">
            <div className="w-8 h-[1px] bg-border group-hover/btn:w-12 group-hover/btn:bg-primary transition-all duration-500" />
            <div className="absolute right-0 w-1 h-1 rounded-full bg-border group-hover/btn:bg-primary transition-all shadow-[0_0_8px_rgba(168,85,247,0)] group-hover/btn:shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          </div>
          Explore Project
        </button>
      </div>
    </motion.div>
  );
}






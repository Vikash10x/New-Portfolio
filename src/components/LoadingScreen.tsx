import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <div className="relative h-24 w-24">
        <motion.div
          animate={{
            rotate: 360,
            borderRadius: ["20%", "50%", "20%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 border-4 border-primary/30"
        />
        <motion.div
          animate={{
            rotate: -360,
            borderRadius: ["50%", "20%", "50%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-2 border-4 border-secondary/30"
        />
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-foreground">
          VK
        </div>
      </div>
      
      <div className="mt-8 w-64 overflow-hidden rounded-full bg-accent/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-1 bg-gradient-to-r from-primary to-secondary"
        />
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 font-mono text-sm text-muted-foreground"
      >
        INITIALIZING NEURAL INTERFACE... {progress}%
      </motion.p>
    </motion.div>
  );
}

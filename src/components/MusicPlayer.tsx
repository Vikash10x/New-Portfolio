import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music2, VolumeX, Volume2 } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Use a highly reliable Pixabay lofi track
  const audioUrl = "https://cdn.pixabay.com/audio/2026/02/20/audio_91db1f3017.mp3";

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.error("Playback failed:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Clearer volume level
    }
  }, []);

  return (
    <div className="fixed top-24 right-6 z-[60] flex flex-col items-end gap-3">
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
      />

      <motion.div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative"
      >
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-xl border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest whitespace-nowrap shadow-2xl pointer-events-none"
            >
              {isPlaying ? 'Pause Ambient' : 'Play Ambient Music'}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleMusic}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`h-12 w-12 rounded-2xl flex items-center justify-center backdrop-blur-xl border transition-all duration-500 shadow-2xl group ${isPlaying
            ? 'bg-primary/20 border-primary/40 shadow-primary/20 animate-pulse'
            : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
        >
          {isPlaying ? (
            <div className="relative">
              <Volume2 className="text-primary h-5 w-5" />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-primary/40 rounded-full -z-10"
              />
            </div>
          ) : (
            <VolumeX className="text-zinc-500 group-hover:text-zinc-300 h-5 w-5" />
          )}
        </motion.button>
      </motion.div>

      {/* Visualizer bars when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-end gap-0.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/5"
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [4, 12, 6, 14, 4] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
                className="w-0.5 bg-primary/60 rounded-full"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

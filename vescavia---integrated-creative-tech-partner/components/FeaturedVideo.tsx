import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FeaturedVideo: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(true);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const videoY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const videoScale = useTransform(scrollYProgress, [0, 0.6, 1], [1.06, 1, 1.02]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.9, 1, 0.95]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", () => {
      setIsMuted(true);
      if (videoRef.current) {
        videoRef.current.muted = true;
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-white dark:bg-dark-surface transition-colors duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(42,69,245,0.08),transparent_55%)] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex justify-center mb-10 md:mb-14">
          <h2 className="font-display text-[72px] sm:text-[120px] md:text-[180px] lg:text-[200px] font-bold uppercase tracking-[0.03em] text-black dark:text-white text-center">
            Vescavia
          </h2>
        </div>

        <motion.div
          className="relative rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-black shadow-[0_25px_80px_rgba(0,0,0,0.25)]"
          style={{ willChange: 'transform', opacity: videoOpacity }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ y: videoY, scale: videoScale, willChange: 'transform' }}
          >
            <video
              ref={videoRef}
              src="/optimized/0222.mp4"
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="relative z-10 min-h-[280px] md:min-h-[480px]" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

          <button
            type="button"
            onClick={handleToggleMute}
            className="absolute bottom-5 right-5 z-20 px-4 py-2 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest border border-white/20 backdrop-blur-md hover:bg-white/20 transition-colors"
            aria-pressed={!isMuted}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedVideo;

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

interface PageTransitionCurtainProps {
  isVisible: boolean;
  label: string;
}

export function PageTransitionCurtain({
  isVisible,
  label,
}: PageTransitionCurtainProps) {
  const shouldReduce = useReducedMotion();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          data-testid="page-curtain"
          aria-hidden="true"
          initial={shouldReduce ? { opacity: 0 } : { y: '100%' }}
          animate={shouldReduce ? { opacity: 1 } : { y: '0%' }}
          exit={shouldReduce ? { opacity: 0 } : { y: '-100%' }}
          transition={{
            duration: shouldReduce ? 0.15 : 0.44,
            ease: [0.77, 0, 0.175, 1],
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#141923] via-[#450A0A] to-[#991B1B] pointer-events-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="text-center text-white px-6"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="font-mono text-xs tracking-widest uppercase text-amber-200">
                FAST Entrepreneurship &amp; Startup Society
              </span>
            </div>
            <div className="font-extrabold text-3xl sm:text-5xl tracking-tight text-white">
              {label}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

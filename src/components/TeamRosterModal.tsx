import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { TEAMS } from '../data/fessData';
import { FESS_EASE } from './MotionPrimitives';

interface TeamRosterModalProps {
  teamId: 'executive' | 'tech' | null;
  onClose: () => void;
}

export function TeamRosterModal({ teamId, onClose }: TeamRosterModalProps) {
  const data = teamId ? TEAMS[teamId] : null;

  useEffect(() => {
    if (!teamId) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [teamId, onClose]);

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.24, ease: FESS_EASE }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col"
          >
            <div className="bg-gradient-to-r from-[#7F1D1D] via-[#991B1B] to-[#141923] px-6 py-5 text-white flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block">
                  {data.tag}
                </span>
                <h2 id="team-modal-title" className="font-extrabold text-xl">
                  {data.modalTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close team roster modal"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto">
              <p className="text-sm text-slate-600 mb-6">{data.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.members.map((member, idx) => {
                  const initials = member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('');
                  return (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.05, ease: FESS_EASE }}
                      className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#991B1B]/12 flex items-start gap-3.5"
                    >
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#991B1B] to-[#141923] text-white font-bold flex items-center justify-center shrink-0 text-sm">
                        {initials}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">
                          {member.name}
                        </div>
                        <div className="text-xs font-semibold text-[#991B1B]">
                          {member.role}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          {member.focus}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

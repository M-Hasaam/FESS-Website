import React from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { TEAMS, type TeamGroup } from '../data/fessData';
import { Reveal } from './MotionPrimitives';

interface TeamsPageProps {
  onSelectTeam: (teamId: 'executive' | 'tech') => void;
}

export function TeamsPage({ onSelectTeam }: TeamsPageProps) {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF6F0] bg-arch-grid min-h-[85vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#991B1B] mb-3">
            The Powerhouse Behind FESS
          </p>
          <h1
            className="font-extrabold text-[#991B1B] tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.85rem)' }}
          >
            Meet Our Teams
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            The passionate innovators, visionaries, and builders making the impossible
            possible
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16 max-w-5xl mx-auto">
          <TeamShowcaseCard
            team={TEAMS.executive}
            variant="executive"
            onClick={() => onSelectTeam('executive')}
          />
          <TeamShowcaseCard
            team={TEAMS.tech}
            variant="tech"
            onClick={() => onSelectTeam('tech')}
          />
        </div>

        <div className="flex items-center justify-center gap-4 text-slate-500 text-xs sm:text-sm font-medium">
          <span className="w-12 sm:w-20 h-px bg-[#991B1B]/20" />
          <span>Driving Excellence Together</span>
          <span className="w-12 sm:w-20 h-px bg-[#991B1B]/20" />
        </div>
      </div>
    </section>
  );
}

interface TeamShowcaseCardProps {
  team: TeamGroup;
  variant: 'executive' | 'tech';
  onClick: () => void;
}

function TeamShowcaseCard({ team, variant, onClick }: TeamShowcaseCardProps) {
  const isExecutive = variant === 'executive';
  const shouldReduce = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), { stiffness: 240, damping: 22 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 240, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rotateX.set(((y - rect.height / 2) / (rect.height / 2)) * -6);
    rotateY.set(((x - rect.width / 2) / (rect.width / 2)) * 6);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <Reveal delay={isExecutive ? 0.05 : 0.14}>
      <motion.button
        type="button"
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          shouldReduce
            ? undefined
            : {
                transformPerspective: 1050,
                transformStyle: 'preserve-3d',
                rotateX,
                rotateY,
              }
        }
        whileHover={shouldReduce ? undefined : { y: -6 }}
        whileTap={shouldReduce ? undefined : { scale: 0.985 }}
        aria-label={`Open ${team.title} 3D team showcase`}
        className="w-full text-left rounded-3xl bg-white shadow-[0_18px_38px_-14px_rgba(20,25,35,0.08)] hover:shadow-[0_28px_52px_-12px_rgba(153,27,27,0.2)] border border-slate-200/80 overflow-hidden transition-shadow duration-200 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#991B1B]"
      >
        <div className="bg-gradient-to-r from-[#7F1D1D] via-[#991B1B] to-[#7F1D1D] px-7 py-6 text-white flex items-start justify-between">
          <div>
            <h2 className="font-extrabold text-2xl tracking-tight mb-1">{team.title}</h2>
            <p className="text-red-100 text-xs sm:text-sm">{team.cardSubtitle}</p>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-amber-200 mt-1">
            {team.members.length} Leads
          </span>
        </div>

        <div
          className="p-7 sm:p-8"
          style={shouldReduce ? undefined : { transformStyle: 'preserve-3d' }}
        >
          <div className="corner-brackets">
            {isExecutive ? (
              <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-[#1A0D0E] via-[#261113] to-[#12090A] flex flex-col items-center justify-between p-5 border border-red-950/40">
                <div
                  className="text-center z-10 pt-1 transition-transform duration-300 group-hover:scale-105"
                  style={shouldReduce ? undefined : { transform: 'translateZ(26px)' }}
                >
                  <div className="font-extrabold text-2xl sm:text-3xl tracking-wider uppercase">
                    <span className="text-white">Task</span>{' '}
                    <span className="text-red-400">Force 26–27</span>
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.22em] text-slate-300 uppercase mt-0.5">
                    {team.badgeText}
                  </div>
                </div>

                <div
                  className="relative z-10 flex items-end justify-center gap-2 sm:gap-3 mt-auto pt-4"
                  style={shouldReduce ? undefined : { transform: 'translateZ(36px)' }}
                >
                  {[
                    { code: 'VP OPS', h: 'h-20 w-12', lead: false },
                    { code: 'GEN SEC', h: 'h-24 w-14', lead: false },
                    { code: 'PRESIDENT', h: 'h-28 w-16', lead: true },
                    { code: 'VP STRAT', h: 'h-24 w-14', lead: false },
                    { code: 'TREAS', h: 'h-20 w-12', lead: false },
                  ].map((slot) => (
                    <div
                      key={slot.code}
                      className={`${slot.h} rounded-t-2xl flex flex-col items-center justify-start pt-2.5 shadow-lg transition-transform duration-300 group-hover:-translate-y-1 ${
                        slot.lead
                          ? 'bg-gradient-to-t from-slate-950 via-red-950 to-red-700 border-2 border-amber-400/50'
                          : 'bg-gradient-to-t from-red-950 to-red-800 border border-white/15'
                      }`}
                    >
                      <div
                        className={`${
                          slot.lead ? 'w-8 h-8 ring-2 ring-amber-400/50' : 'w-6 h-6'
                        } rounded-full bg-amber-50 mb-1.5`}
                      />
                      <span className="text-[8px] font-mono text-amber-200 font-bold">
                        {slot.code}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-red-950/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity flex items-end justify-center pb-4 z-20">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white font-semibold text-xs sm:text-sm group-hover:scale-105 transition-transform">
                    <span>Explore Executive Council</span>
                    <ArrowUpRight className="w-4 h-4 text-amber-300" />
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-200 via-stone-200 to-slate-300 flex flex-col items-center justify-between p-5 border border-slate-300/80">
                <div className="absolute inset-0 bg-arch-grid opacity-80" />

                <div
                  className="relative z-10 text-center pt-1 transition-transform duration-300 group-hover:scale-105"
                  style={shouldReduce ? undefined : { transform: 'translateZ(26px)' }}
                >
                  <div className="font-black text-4xl sm:text-5xl tracking-[0.22em] text-[#991B1B]">
                    TECH
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.2em] text-slate-700 uppercase font-bold">
                    {team.badgeText}
                  </div>
                </div>

                <div
                  className="relative z-10 flex items-end justify-center gap-2 sm:gap-3 mt-auto pt-4"
                  style={shouldReduce ? undefined : { transform: 'translateZ(36px)' }}
                >
                  {[
                    { code: 'UI/UX', h: 'h-20 w-12', lead: false },
                    { code: 'FULLSTACK', h: 'h-24 w-14', lead: false },
                    { code: 'TECH LEAD', h: 'h-28 w-16', lead: true },
                    { code: 'SYSTEMS', h: 'h-24 w-14', lead: false },
                    { code: 'DEVOPS', h: 'h-20 w-12', lead: false },
                  ].map((slot) => (
                    <div
                      key={slot.code}
                      className={`${slot.h} rounded-t-2xl flex flex-col items-center justify-start pt-2.5 shadow-lg transition-transform duration-300 group-hover:-translate-y-1 ${
                        slot.lead
                          ? 'bg-[#141923] border-2 border-[#991B1B]'
                          : 'bg-slate-800 border border-slate-600'
                      }`}
                    >
                      <div
                        className={`${
                          slot.lead ? 'w-8 h-8 ring-2 ring-red-600' : 'w-6 h-6'
                        } rounded-full bg-white mb-1.5`}
                      />
                      <span className="text-[8px] font-mono text-amber-200 font-bold">
                        {slot.code}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity flex items-end justify-center pb-4 z-20">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 text-[#991B1B] font-bold text-xs sm:text-sm shadow-md group-hover:scale-105 transition-transform">
                    <span>Explore Tech Team</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.button>
    </Reveal>
  );
}

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers,
  Quote,
  RotateCw,
  Sparkles,
} from 'lucide-react';
import {
  TEAMS,
  type PageId,
  type TeamId,
  type TeamMember,
} from '../data/fessData';
import { FESS_EASE, Reveal } from './MotionPrimitives';
import { Team3DCanvas } from './Team3DCanvas';

interface TeamDetailPageProps {
  teamId: TeamId;
  onNavigate: (page: PageId) => void;
}

export function TeamDetailPage({ teamId, onNavigate }: TeamDetailPageProps) {
  const team = TEAMS[teamId];
  const otherTeamId: TeamId = teamId === 'executive' ? 'tech' : 'executive';
  const otherTeam = TEAMS[otherTeamId];

  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const stageRef = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  const members = team.members;
  const activeMember = members[activeIndex] ?? members[0];

  const stepMember = (delta: number) => {
    setActiveIndex((prev) => (prev + delta + members.length) % members.length);
  };

  const toggleFlip = (memberId: string) => {
    setFlippedIds((prev) => ({ ...prev, [memberId]: !prev[memberId] }));
  };

  const focusMemberOnStage = (index: number) => {
    setActiveIndex(index);
    stageRef.current?.scrollIntoView({ behavior: shouldReduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div data-testid={`team-detail-page-${teamId}`} className="bg-[#FAF6F0]">
      {/* 1. Dark 3D Architectural Banner */}
      <section className="relative bg-[#141923] text-white py-14 sm:py-20 overflow-hidden">
        <div
          className={`absolute inset-0 ${
            teamId === 'executive'
              ? 'bg-[radial-gradient(circle_at_top_right,rgba(153,27,27,0.48),transparent_62%)]'
              : 'bg-[radial-gradient(circle_at_top_right,rgba(185,28,28,0.38),transparent_62%)]'
          }`}
        />
        <Team3DCanvas teamId={teamId} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          {/* Breadcrumb + Direct Team Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <button
              type="button"
              onClick={() => onNavigate('teams')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/18 border border-white/15 text-xs sm:text-sm font-semibold text-white transition-colors backdrop-blur-md"
            >
              <ArrowLeft className="w-4 h-4 text-amber-300" />
              <span>Back to Meet Our Teams</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate(`teams/${otherTeamId}`)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] text-xs sm:text-sm font-semibold text-white shadow-lg transition-colors"
            >
              <span>Switch to {otherTeam.title}</span>
              <ArrowRight className="w-4 h-4 text-amber-200" />
            </button>
          </div>

          <div className="max-w-3xl">
            <motion.p
              initial={shouldReduce ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: FESS_EASE }}
              className="font-mono text-xs uppercase tracking-[0.2em] text-amber-300 mb-3"
            >
              {team.tag === team.badgeText
                ? `${team.tag} · FESS Division`
                : `${team.tag} · ${team.badgeText}`}
            </motion.p>

            <motion.h1
              initial={shouldReduce ? undefined : { opacity: 0, y: 18, rotateX: 16 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: FESS_EASE }}
              style={shouldReduce ? undefined : { transformPerspective: 900 }}
              className="font-extrabold tracking-tight mb-4"
            >
              <span style={{ fontSize: 'clamp(2.35rem, 5vw, 4rem)' }} className="block">
                {team.title}
              </span>
            </motion.h1>

            <motion.p
              initial={shouldReduce ? undefined : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease: FESS_EASE }}
              className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8"
            >
              {team.heroVision}
            </motion.p>

            {/* 3D Floating KPI Depth Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {team.stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={shouldReduce ? undefined : { opacity: 0, y: 16, rotateX: 14 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.45, delay: 0.16 + idx * 0.07, ease: FESS_EASE }}
                  whileHover={shouldReduce ? undefined : { y: -4, rotateX: -4, rotateY: 4 }}
                  style={
                    shouldReduce
                      ? undefined
                      : { transformPerspective: 800, transformStyle: 'preserve-3d' }
                  }
                  className="rounded-2xl bg-white/8 backdrop-blur-md border border-white/12 px-4 py-3.5"
                >
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-amber-300">
                    {stat.label}
                  </span>
                  <span className="block font-bold text-sm sm:text-base text-white mt-0.5">
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive 3D Orbital Member Spotlight Stage */}
      <section
        ref={stageRef}
        className="py-16 sm:py-20 bg-gradient-to-b from-[#141923] via-[#1B2130] to-[#FAF6F0] text-white relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-amber-300">
                Interactive 3D Spotlight
              </span>
              <h2 className="font-extrabold text-2xl sm:text-4xl text-white mt-1.5">
                3D Leadership Carousel
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => stepMember(-1)}
                aria-label="Previous team member"
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-[#991B1B] border border-white/15 flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-mono text-xs px-3 py-2 rounded-xl bg-white/8 border border-white/10 text-amber-200">
                0{activeIndex + 1} / 0{members.length}
              </span>
              <button
                type="button"
                onClick={() => stepMember(1)}
                aria-label="Next team member"
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-[#991B1B] border border-white/15 flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 3D Perspective Coverflow Carousel */}
          <div
            data-testid="team-3d-carousel"
            className="relative min-h-[450px] sm:min-h-[420px] flex items-center justify-center mb-8"
            style={
              shouldReduce
                ? undefined
                : { perspective: '1500px', transformStyle: 'preserve-3d' }
            }
          >
            {members.map((member, idx) => {
              let offset = idx - activeIndex;
              if (offset > members.length / 2) offset -= members.length;
              if (offset < -members.length / 2) offset += members.length;

              const isActive = offset === 0;
              const absOffset = Math.abs(offset);
              const initials = member.name
                .split(' ')
                .map((n) => n[0])
                .join('');

              // Position each card on a 3D arc
              const translateX = offset * 280;
              const translateZ = isActive ? 40 : -150 * absOffset;
              const rotateY = shouldReduce ? 0 : offset * -24;
              const scale = isActive ? 1 : Math.max(0.76, 1 - absOffset * 0.14);
              const opacity = absOffset > 1 ? 0.35 : isActive ? 1 : 0.72;

              return (
                <motion.div
                  key={member.id}
                  animate={
                    shouldReduce
                      ? { opacity: isActive ? 1 : 0 }
                      : {
                          x: translateX,
                          z: translateZ,
                          rotateY,
                          scale,
                          opacity,
                        }
                  }
                  transition={{ duration: 0.55, ease: FESS_EASE }}
                  style={{
                    transformStyle: 'preserve-3d',
                    zIndex: members.length - absOffset,
                    pointerEvents: isActive || absOffset === 1 ? 'auto' : 'none',
                  }}
                  onClick={!isActive ? () => setActiveIndex(idx) : undefined}
                  className={`w-full max-w-2xl rounded-3xl p-6 sm:p-8 border shadow-2xl ${
                    isActive
                      ? 'relative bg-gradient-to-br from-white via-[#FAF6F0] to-white text-slate-900 border-amber-400/50 shadow-[0_32px_70px_-15px_rgba(0,0,0,0.55)]'
                      : 'hidden md:block absolute bg-[#1E2430]/95 text-white border-white/12 cursor-pointer hover:border-amber-300/40'
                  }`}
                >
                  {isActive ? (
                    <div
                      className="space-y-5"
                      style={shouldReduce ? undefined : { transformStyle: 'preserve-3d' }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
                        <div
                          style={
                            shouldReduce
                              ? undefined
                              : { transform: 'translateZ(36px)' }
                          }
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#991B1B] via-[#7F1D1D] to-[#141923] text-white font-extrabold text-xl sm:text-2xl flex items-center justify-center shadow-[0_14px_30px_-8px_rgba(153,27,27,0.55)] border border-amber-300/30 shrink-0"
                        >
                          {initials}
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="px-2.5 py-0.5 rounded-md bg-[#991B1B] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                              {member.code}
                            </span>
                            <span className="font-mono text-[11px] text-slate-500">
                              {member.batch}
                            </span>
                          </div>
                          <h3 className="font-extrabold text-2xl sm:text-3xl text-slate-900">
                            {member.name}
                          </h3>
                          <p className="text-sm font-bold text-[#991B1B]">{member.role}</p>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                        {member.bio}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                        <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#991B1B]/12">
                          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#991B1B] mb-2">
                            Key Contributions
                          </div>
                          <ul className="space-y-2">
                            {member.highlights.map((item) => (
                              <li
                                key={item}
                                className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#991B1B] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#141923] text-white flex flex-col justify-between gap-3">
                          <div>
                            <Quote className="w-4 h-4 text-amber-300 mb-1.5" />
                            <p className="font-serif italic text-xs sm:text-sm text-slate-200 leading-relaxed">
                              &ldquo;{member.quote}&rdquo;
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {member.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono text-amber-200"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 px-4">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#991B1B] to-[#450A0A] text-white font-extrabold text-xl flex items-center justify-center mb-4">
                        {initials}
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300 block mb-1">
                        {member.code}
                      </span>
                      <div className="font-extrabold text-xl text-white">{member.name}</div>
                      <div className="text-xs text-slate-300 mt-1">{member.role}</div>
                      <span className="inline-block mt-4 text-[11px] font-mono text-amber-200">
                        Click to rotate into focus
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* 3D Carousel Member Selector Dock */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {members.map((member, idx) => {
              const selected = idx === activeIndex;
              return (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                    selected
                      ? 'bg-[#991B1B] text-white shadow-lg ring-2 ring-amber-300/60'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-[#991B1B]/40'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-80">0{idx + 1}</span>
                  <span>{member.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Full Roster 3D Tilt & 180-Degree Flip Dossier Cards */}
      <section className="py-16 sm:py-20 bg-[#FAF6F0] bg-arch-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#991B1B]">
                Complete Team Showcase
              </span>
              <h2 className="font-extrabold text-3xl sm:text-4xl text-slate-900 mt-1.5">
                Every {team.title} Member in Detail
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md">
              Move across any card for 3D depth tilt, or flip a dossier in 3D space to
              inspect full deliverables and leadership focus.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {members.map((member, idx) => (
              <Member3DFlipCard
                key={member.id}
                member={member}
                index={idx}
                isFlipped={Boolean(flippedIds[member.id])}
                isSpotlighted={activeMember.id === member.id}
                onToggleFlip={() => toggleFlip(member.id)}
                onFocusStage={() => focusMemberOnStage(idx)}
              />
            ))}
          </div>

          {/* Bottom Cross-Team Navigation Banner */}
          <Reveal delay={0.1} className="mt-16">
            <div className="rounded-3xl bg-[#141923] text-white p-7 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl border border-[#991B1B]/30">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-amber-300">
                  Explore Next Division
                </span>
                <h3 className="font-extrabold text-2xl sm:text-3xl mt-1">
                  Meet the {otherTeam.title}
                </h3>
                <p className="text-sm text-slate-300 mt-1 max-w-xl">
                  {otherTeam.heroVision}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigate(`teams/${otherTeamId}`)}
                  className="px-6 py-3.5 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-bold text-sm inline-flex items-center gap-2 transition-colors"
                >
                  <span>View {otherTeam.title}</span>
                  <ArrowRight className="w-4 h-4 text-amber-200" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('connect')}
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
                >
                  Connect With Us
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

interface Member3DFlipCardProps {
  member: TeamMember;
  index: number;
  isFlipped: boolean;
  isSpotlighted: boolean;
  onToggleFlip: () => void;
  onFocusStage: () => void;
}

function Member3DFlipCard({
  member,
  index,
  isFlipped,
  isSpotlighted,
  onToggleFlip,
  onFocusStage,
}: Member3DFlipCardProps) {
  const shouldReduce = useReducedMotion();
  const tiltX = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });

  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    tiltX.set(((y - rect.height / 2) / (rect.height / 2)) * -7);
    tiltY.set(((x - rect.width / 2) / (rect.width / 2)) * 7);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <Reveal delay={index * 0.08}>
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          shouldReduce
            ? undefined
            : { perspective: '1300px' }
        }
        className="h-full"
      >
        <motion.div
          style={
            shouldReduce
              ? undefined
              : {
                  transformStyle: 'preserve-3d',
                  rotateX: tiltX,
                  rotateY: tiltY,
                }
          }
          className="h-full"
        >
          <motion.div
            animate={
              shouldReduce
                ? undefined
                : { rotateY: isFlipped ? 180 : 0 }
            }
            transition={{ duration: 0.68, ease: FESS_EASE }}
            style={
              shouldReduce
                ? undefined
                : { transformStyle: 'preserve-3d' }
            }
            className="relative min-h-[480px] h-full rounded-3xl"
          >
            {/* FRONT FACE */}
            <div
              aria-hidden={isFlipped}
              style={
                shouldReduce
                  ? { display: isFlipped ? 'none' : 'flex' }
                  : {
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      pointerEvents: isFlipped ? 'none' : 'auto',
                    }
              }
              className={`h-full rounded-3xl bg-white p-7 sm:p-8 shadow-[0_18px_40px_-14px_rgba(20,25,35,0.09)] border flex flex-col justify-between ${
                isSpotlighted ? 'border-[#991B1B]/45' : 'border-slate-200/80'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      style={
                        shouldReduce
                          ? undefined
                          : { transform: 'translateZ(28px)' }
                      }
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#991B1B] via-[#7F1D1D] to-[#141923] text-white font-extrabold text-xl flex items-center justify-center shadow-lg shrink-0"
                    >
                      {initials}
                    </div>
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#FAF6F0] border border-[#991B1B]/20 text-[10px] font-mono font-bold uppercase tracking-wider text-[#991B1B] mb-1">
                        0{index + 1} · {member.code}
                      </span>
                      <h3 className="font-extrabold text-2xl text-slate-900 leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-sm font-bold text-[#991B1B]">{member.role}</p>
                    </div>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-500 mb-3">
                  {member.batch}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed mb-5">
                  {member.bio}
                </p>

                <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-slate-200/80 mb-5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#991B1B] font-bold mb-1">
                    Primary Focus
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800">
                    {member.focus}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-mono font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onToggleFlip}
                  tabIndex={isFlipped ? -1 : 0}
                  className="flex-1 min-w-[160px] py-3 px-4 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Flip 3D Dossier</span>
                </button>
                <button
                  type="button"
                  onClick={onFocusStage}
                  tabIndex={isFlipped ? -1 : 0}
                  className="py-3 px-4 rounded-xl bg-[#FAF6F0] hover:bg-slate-200/70 border border-slate-200 text-slate-800 font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#991B1B]" />
                  <span>3D Stage</span>
                </button>
              </div>
            </div>

            {/* BACK FACE (180-deg rotated in 3D) */}
            <div
              aria-hidden={!isFlipped}
              style={
                shouldReduce
                  ? { display: isFlipped ? 'flex' : 'none' }
                  : {
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      pointerEvents: isFlipped ? 'auto' : 'none',
                    }
              }
              className="absolute inset-0 h-full rounded-3xl bg-gradient-to-br from-[#141923] via-[#1B2231] to-[#2B1216] text-white p-7 sm:p-8 shadow-2xl border border-[#991B1B]/45 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300 block">
                      {member.dept} · {member.code}
                    </span>
                    <h4 className="font-extrabold text-xl text-white">{member.name}</h4>
                  </div>
                  <Award className="w-6 h-6 text-amber-300 shrink-0" />
                </div>

                <div className="p-4 rounded-2xl bg-white/8 border border-white/10 mb-5">
                  <Quote className="w-4 h-4 text-amber-300 mb-1.5" />
                  <p className="font-serif italic text-sm text-slate-200 leading-relaxed">
                    &ldquo;{member.quote}&rdquo;
                  </p>
                </div>

                <div>
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Flagship Initiatives &amp; Impact</span>
                  </div>
                  <ul className="space-y-2.5">
                    {member.highlights.map((item) => (
                      <li
                        key={item}
                        className="text-xs sm:text-sm text-slate-200 flex items-start gap-2.5 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/12">
                <button
                  type="button"
                  onClick={onToggleFlip}
                  tabIndex={isFlipped ? 0 : -1}
                  className="flex-1 py-3 px-4 rounded-xl bg-white text-[#991B1B] hover:bg-amber-50 font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Flip Back to Profile</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Reveal>
  );
}

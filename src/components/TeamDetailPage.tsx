import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { TEAMS, type PageId, type TeamId } from '../data/fessData';
import { FESS_EASE, Reveal } from './MotionPrimitives';
import { PageHero } from './ui/page-hero';
import { MemberPortrait } from './ui/member-portrait';

interface TeamDetailPageProps {
  teamId: TeamId;
  onNavigate: (page: PageId) => void;
  introDelay?: number;
}

const HEADLINE = 'font-[family-name:var(--font-headline)]';

export function TeamDetailPage({ teamId, onNavigate, introDelay = 0 }: TeamDetailPageProps) {
  const team = TEAMS[teamId];
  const otherTeamId: TeamId = teamId === 'executive' ? 'tech' : 'executive';
  const otherTeam = TEAMS[otherTeamId];

  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  const members = team.members;
  const activeMember = members[activeIndex] ?? members[0];

  const stepMember = (delta: number) => {
    setActiveIndex((prev) => (prev + delta + members.length) % members.length);
  };

  const focusMemberOnStage = (index: number) => {
    setActiveIndex(index);
    stageRef.current?.scrollIntoView({
      behavior: shouldReduce ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  // "Executive Council" -> title "Executive", accent "Council."
  const words = team.title.split(' ');
  const accent = `${words.pop()}.`;
  const title = words.join(' ') || team.title;

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div data-testid={`team-detail-page-${teamId}`} className="bg-[#FAF6F0]">
      {/* 1. HEADER */}
      <PageHero
        eyebrow={
          team.tag === team.badgeText
            ? `${team.tag} · FESS Division`
            : `${team.tag} · ${team.badgeText}`
        }
        title={title}
        accent={words.length ? accent : undefined}
        subtitle={team.heroVision}
        introDelay={introDelay}
      >
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold">
          <button
            type="button"
            onClick={() => onNavigate('teams')}
            className="group inline-flex items-center gap-2 text-[#FAF6F0] underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-amber-300"
          >
            <ArrowLeft className="h-4 w-4 text-amber-300 transition-transform group-hover:-translate-x-0.5" />
            Back to all teams
          </button>
          <button
            type="button"
            onClick={() => onNavigate(`teams/${otherTeamId}`)}
            className="group inline-flex items-center gap-2 text-[#FAF6F0] underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-amber-300"
          >
            Switch to {otherTeam.title}
            <ArrowRight className="h-4 w-4 text-amber-300 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <dl className="mt-12 grid max-w-3xl border-t border-dashed border-white/30 sm:grid-cols-3 sm:gap-x-8">
          {team.stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-dashed border-white/30 py-4 sm:border-b-0 sm:pb-0"
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                {stat.label}
              </dt>
              <dd className="mt-2 font-serif text-2xl leading-none text-[#FAF6F0]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* 2. SPOTLIGHT */}
      <section ref={stageRef} className="scroll-mt-16 bg-[#0C0F16] pb-20 text-[#FAF6F0] sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 border-t border-dashed border-white/30 pt-8 sm:flex-row sm:items-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-300">
              Leadership · {pad(activeIndex + 1)} / {pad(members.length)}
            </p>
            <div className="flex items-center gap-8 text-sm font-semibold">
              <button
                type="button"
                onClick={() => stepMember(-1)}
                aria-label="Previous team member"
                className="group inline-flex min-h-[44px] items-center gap-2 transition-colors hover:text-amber-300"
              >
                <ArrowLeft className="h-4 w-4 text-amber-300 transition-transform group-hover:-translate-x-0.5" />
                Previous
              </button>
              <button
                type="button"
                onClick={() => stepMember(1)}
                aria-label="Next team member"
                className="group inline-flex min-h-[44px] items-center gap-2 transition-colors hover:text-amber-300"
              >
                Next
                <ArrowRight className="h-4 w-4 text-amber-300 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeMember.id}
              initial={shouldReduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: FESS_EASE }}
              className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"
            >
              <MemberPortrait
                memberId={activeMember.id}
                name={activeMember.name}
                className="aspect-[4/5] w-full max-w-md rounded-xl lg:max-w-none"
              />

              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-300">
                  {pad(activeIndex + 1)} · {activeMember.code}
                </p>
                <h2
                  className={`${HEADLINE} mt-5 text-4xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-6xl`}
                >
                  {activeMember.name}
                </h2>
                <p className="mt-4 font-serif text-2xl italic text-[#C4121F]">
                  {activeMember.role}
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  {activeMember.batch}
                </p>

                <p className="mt-8 max-w-xl text-base leading-relaxed text-slate-300">
                  {activeMember.bio}
                </p>

                <dl className="mt-8 border-t border-dashed border-white/30">
                  <div className="grid gap-1 border-b border-dashed border-white/30 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber-300">
                      Primary focus
                    </dt>
                    <dd className="text-sm text-[#FAF6F0]">{activeMember.focus}</dd>
                  </div>
                  <div className="grid gap-1 border-b border-dashed border-white/30 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber-300">
                      Key contributions
                    </dt>
                    <dd>
                      <ul className="space-y-2.5">
                        {activeMember.highlights.map((item) => (
                          <li key={item} className="text-sm leading-relaxed text-slate-300">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div className="grid gap-1 border-b border-dashed border-white/30 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber-300">
                      Skills
                    </dt>
                    <dd className="font-mono text-xs leading-relaxed text-slate-300">
                      {activeMember.skills.join(' · ')}
                    </dd>
                  </div>
                </dl>

                <blockquote className="mt-8 max-w-xl font-serif text-xl italic leading-relaxed text-[#FAF6F0]/85">
                  &ldquo;{activeMember.quote}&rdquo;
                </blockquote>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 3. ROSTER */}
      <section className="bg-[#FAF6F0] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#991B1B]">
              Complete team
            </p>
            <h2
              className={`${HEADLINE} mt-6 max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-0.03em] text-[#141923] sm:text-6xl`}
            >
              Every {team.title} <span className="text-[#991B1B]">member.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:mt-16 md:grid-cols-3 lg:grid-cols-4">
            {members.map((member, idx) => {
              const selected = idx === activeIndex;
              return (
                <Reveal key={member.id} delay={(idx % 4) * 0.06}>
                  <button
                    type="button"
                    onClick={() => focusMemberOnStage(idx)}
                    aria-label={`Open ${member.name}, ${member.role}`}
                    className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#991B1B]"
                  >
                    <div className="overflow-hidden rounded-lg">
                      <MemberPortrait
                        memberId={member.id}
                        name={member.name}
                        className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div
                      className={`mt-4 border-t border-dashed pt-4 transition-colors ${
                        selected ? 'border-[#991B1B]' : 'border-[#141923]/30'
                      }`}
                    >
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#991B1B]">
                        {pad(idx + 1)} · {member.code}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl leading-tight text-[#141923] transition-colors group-hover:text-[#991B1B]">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">{member.role}</p>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. NEXT DIVISION */}
      <section className="bg-[#8B0A14] py-20 text-[#FAF6F0] sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-24 lg:px-8">
          <Reveal className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-300">
              Explore the next division
            </p>
            <h2
              className={`${HEADLINE} mt-6 text-5xl font-medium leading-[0.98] tracking-[-0.035em] sm:text-7xl`}
            >
              Meet the
              <br />
              {otherTeam.title}.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#FAF6F0]/75">
              {otherTeam.heroVision}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0">
            <div className="border-t border-dashed border-white/30">
              <button
                type="button"
                onClick={() => onNavigate(`teams/${otherTeamId}`)}
                className="group flex w-full items-center justify-between gap-6 border-b border-dashed border-white/30 py-7 text-left transition-colors hover:bg-white/[0.04] sm:px-3"
              >
                <span className="font-serif text-3xl leading-none sm:text-4xl">
                  View {otherTeam.title}
                </span>
                <ArrowUpRight className="h-6 w-6 shrink-0 text-amber-300 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('connect')}
                className="group flex w-full items-center justify-between gap-6 border-b border-dashed border-white/30 py-7 text-left transition-colors hover:bg-white/[0.04] sm:px-3"
              >
                <span className="font-serif text-3xl leading-none sm:text-4xl">Connect with us</span>
                <ArrowUpRight className="h-6 w-6 shrink-0 text-amber-300 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

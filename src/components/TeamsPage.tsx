import { ArrowUpRight } from 'lucide-react';
import { TEAMS, type TeamGroup } from '../data/fessData';
import { Reveal } from './MotionPrimitives';
import { PageHero } from './ui/page-hero';

interface TeamsPageProps {
  onSelectTeam: (teamId: 'executive' | 'tech') => void;
  introDelay?: number;
}

export function TeamsPage({ onSelectTeam, introDelay = 0 }: TeamsPageProps) {
  return (
    <div>
      <PageHero
        eyebrow="The people behind FESS · Task Force 26–27"
        title="Meet our"
        accent="teams."
        subtitle="Two teams, one society: the council that sets the vision and the builders who ship it."
        introDelay={introDelay}
      />

      <TeamBand
        index="01"
        team={TEAMS.executive}
        tone="light"
        cta="Explore the Executive Council"
        onClick={() => onSelectTeam('executive')}
      />
      <TeamBand
        index="02"
        team={TEAMS.tech}
        tone="dark"
        cta="Explore the Tech Team"
        onClick={() => onSelectTeam('tech')}
      />
    </div>
  );
}

interface TeamBandProps {
  index: string;
  team: TeamGroup;
  tone: 'light' | 'dark';
  cta: string;
  onClick: () => void;
}

function TeamBand({ index, team, tone, cta, onClick }: TeamBandProps) {
  const dark = tone === 'dark';

  return (
    <section className={dark ? 'bg-[#0C0F16] text-[#FAF6F0]' : 'bg-[#FAF6F0] text-[#141923]'}>
      <button
        type="button"
        onClick={onClick}
        aria-label={`Open ${team.title} team showcase`}
        className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-[#991B1B]"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.15fr_1fr] lg:gap-24 lg:px-8">
          <Reveal className="min-w-0">
            <p
              className={`font-mono text-xs uppercase tracking-[0.2em] ${
                dark ? 'text-amber-300' : 'text-[#991B1B]'
              }`}
            >
              {index} · {team.tag}
            </p>
            <h2 className="mt-6 font-[family-name:var(--font-headline)] text-5xl font-medium leading-[1] tracking-[-0.03em] sm:text-7xl">
              {team.title}
              <span className={dark ? 'text-[#C4121F]' : 'text-[#991B1B]'}>.</span>
            </h2>
            <p
              className={`mt-6 max-w-md font-serif text-2xl italic leading-snug ${
                dark ? 'text-[#FAF6F0]/80' : 'text-[#141923]/75'
              }`}
            >
              {team.cardSubtitle}
            </p>

            <span
              className={`mt-10 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-[6px] transition-colors ${
                dark
                  ? 'decoration-white/30 group-hover:decoration-amber-300'
                  : 'decoration-[#141923]/30 group-hover:decoration-[#991B1B]'
              }`}
            >
              {cta}
              <ArrowUpRight
                className={`h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                  dark ? 'text-amber-300' : 'text-[#991B1B]'
                }`}
              />
            </span>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0 self-end">
            <dl
              className={`border-t border-dashed ${
                dark ? 'border-white/30' : 'border-[#141923]/30'
              }`}
            >
              {[
                ...team.stats,
                { label: 'Team leads', value: `${team.members.length} members` },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`flex items-baseline justify-between gap-6 border-b border-dashed py-5 ${
                    dark ? 'border-white/30' : 'border-[#141923]/30'
                  }`}
                >
                  <dt
                    className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
                      dark ? 'text-slate-400' : 'text-[#141923]/55'
                    }`}
                  >
                    {stat.label}
                  </dt>
                  <dd className="text-right font-serif text-2xl leading-none sm:text-3xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </button>
    </section>
  );
}

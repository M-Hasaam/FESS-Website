export type TeamId = 'executive' | 'tech';

export type PageId =
  | 'home'
  | 'events'
  | 'teams'
  | 'teams/executive'
  | 'teams/tech'
  | 'connect';

export type CompetitionName = 'Enterprise Expo' | 'Pitch Arena' | 'Sell Me This Pen';

export type DayFilter = 'all' | '1' | '2';

export interface CompetitionDetail {
  id: CompetitionName;
  number: string;
  dayLabel: string;
  timing: string;
  feeNumeric: number;
  feeLabel: string;
  feeShort: string;
  participantsLabel: string;
  prizeSummary: string;
  ctaLabel: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  imageAlt: string;
  facts: { label: string; value: string; highlight?: boolean; spanTwo?: boolean }[];
}

export interface ScheduleItem {
  day: '1' | '2';
  time: string;
  title: string;
  desc: string;
  category: 'competition' | 'evening';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  code: string;
  dept: string;
  batch: string;
  focus: string;
  bio: string;
  highlights: string[];
  skills: string[];
  quote: string;
}

export interface TeamGroup {
  id: TeamId;
  tag: string;
  title: string;
  cardSubtitle: string;
  modalTitle: string;
  desc: string;
  heroVision: string;
  badgeText: string;
  stats: { label: string; value: string }[];
  members: TeamMember[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const HERO_MEDIA = {
  image: '/src/assets/images/hero_fess_architecture_1795208286661.jpg',
  alt: 'Modern glass university innovation towers illuminated at twilight',
};

export const EVENING_MEDIA = {
  image: '/src/assets/images/evening_qawali_cinema_1795208285128.jpg',
  alt: 'University courtyard draped with golden lights for Movie Night and Qawali Night',
};

export const SOCIETY_PILLARS = [
  {
    id: 'ideas',
    title: 'Breakthrough Ideas',
    description: 'Turn your wildest concepts into game-changing ventures',
    tone: 'amber' as const,
  },
  {
    id: 'network',
    title: 'Elite Network',
    description: 'Connect with top founders, business leaders, and game-changers',
    tone: 'blue' as const,
  },
  {
    id: 'launch',
    title: 'Rapid Launch',
    description: 'Go from idea to market faster than your competition',
    tone: 'emerald' as const,
  },
];

export const COMPETITIONS: CompetitionDetail[] = [
  {
    id: 'Enterprise Expo',
    number: '01',
    dayLabel: 'Day 1 & 2',
    timing: '10:30 AM – 10:00 PM',
    feeNumeric: 8000,
    feeLabel: 'PKR 8,000 per stall',
    feeShort: 'PKR 8,000 / stall',
    participantsLabel: 'Student business owners',
    prizeSummary: 'Audience Favourite & Most Unique Stall awards',
    ctaLabel: 'Register Stall (PKR 8,000)',
    shortDesc:
      'Student entrepreneurs who already run a business (jewellery, food, candles and more) register for a stall and showcase their products across both days (10:30 AM – 10:00 PM).',
    fullDesc:
      'Student entrepreneurs who already run a business (jewellery, food, candles and more) register for a stall and showcase their products to visitors across both days of the event. At the end of the event, two awards are announced: Audience Favourite and Most Unique Stall.',
    image: '/src/assets/images/flagship_enterprise_expo_1795208285204.jpg',
    imageAlt: 'Student entrepreneurship marketplace booths with candles, jewellery, and artisan goods',
    facts: [
      { label: 'Format', value: 'Stall-based exhibition for 2 days' },
      { label: 'Timing', value: '10:30 AM – 10:00 PM' },
      { label: 'Registration Fee', value: 'PKR 8,000 per stall', highlight: true },
      { label: 'Awards', value: 'Audience Favourite; Most Unique Stall' },
    ],
  },
  {
    id: 'Pitch Arena',
    number: '02',
    dayLabel: 'Day 1 · 2:00 PM',
    timing: 'Day 1 | 2:00 PM – 4:00 PM',
    feeNumeric: 3000,
    feeLabel: 'PKR 3,000',
    feeShort: 'PKR 3,000',
    participantsLabel: 'Individuals or groups (max 3)',
    prizeSummary: 'Winner: PKR 15,000 + shield + certificate · Runner-up: Shield + certificate',
    ctaLabel: 'Register Team (PKR 3,000)',
    shortDesc:
      'Individuals or groups (max 3 members, max 10 mins) present a startup idea or prototype before a panel of well-known businessmen.',
    fullDesc:
      'Individuals or teams with a startup idea or prototype present it to a panel of well-known businessmen. Winners are chosen on how useful, creative and rational the idea is.',
    image: '/src/assets/images/flagship_pitch_arena_1795208285141.jpg',
    imageAlt: 'Startup founder pitching on auditorium stage before a panel of business leaders',
    facts: [
      { label: 'Day & Time', value: 'Day 1 | 2:00 PM – 4:00 PM' },
      { label: 'Registration Fee', value: 'PKR 3,000', highlight: true },
      { label: 'Rules', value: 'Groups of max 3 members. Max 10 mins per group.' },
      { label: 'Judging', value: 'Panel of well-known businessmen' },
      { label: 'Winner', value: 'PKR 15,000 cash prize + shield + certificate', highlight: true },
      { label: 'Runner-up', value: 'Shield + certificate' },
    ],
  },
  {
    id: 'Sell Me This Pen',
    number: '03',
    dayLabel: 'Day 2 · 3:00 PM',
    timing: 'Day 2 | 3:00 PM – 5:00 PM',
    feeNumeric: 2500,
    feeLabel: 'PKR 2,500',
    feeShort: 'PKR 2,500',
    participantsLabel: 'Individuals',
    prizeSummary: 'Winner: PKR 15,000 + shield + certificate',
    ctaLabel: 'Register Individual (PKR 2,500)',
    shortDesc:
      'Individual challenge: receive a deliberately boring product or idea and take 10 minutes to prepare a creative pitch that sells it to the panel.',
    fullDesc:
      'An individual challenge. Each participant receives a deliberately boring product or idea and has 10 minutes to prepare a creative pitch that sells it to the panel.',
    image: '/src/assets/images/flagship_pitch_arena_1795208285141.jpg',
    imageAlt: 'Speaker delivering a persuasive sales pitch on stage',
    facts: [
      { label: 'Day & Time', value: 'Day 2 | 3:00 PM – 5:00 PM' },
      { label: 'Registration Fee', value: 'PKR 2,500', highlight: true },
      { label: 'Participation', value: 'Individual' },
      {
        label: 'Scoring Criteria',
        value: 'Persuasion, confidence, handling objections, creativity and time management',
        spanTwo: true,
      },
      { label: 'Winner', value: 'PKR 15,000 cash prize + shield + certificate', highlight: true },
    ],
  },
];

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    day: '1',
    time: '10:30 AM – 10:00 PM',
    title: 'Enterprise Expo',
    desc: 'Student stalls open to visitors',
    category: 'competition',
  },
  {
    day: '1',
    time: '2:00 PM – 4:00 PM',
    title: 'Pitch Arena',
    desc: 'Startup pitches before a panel of business leaders',
    category: 'competition',
  },
  {
    day: '1',
    time: '7:00 PM – 10:00 PM',
    title: 'Movie Night',
    desc: 'Evening entertainment closing Day 1',
    category: 'evening',
  },
  {
    day: '2',
    time: '10:30 AM – 10:00 PM',
    title: 'Enterprise Expo',
    desc: 'Stalls continue; winners announced at the end',
    category: 'competition',
  },
  {
    day: '2',
    time: '3:00 PM – 5:00 PM',
    title: 'Sell Me This Pen',
    desc: 'Individual sales challenge before the panel',
    category: 'competition',
  },
  {
    day: '2',
    time: '7:00 PM – 10:00 PM',
    title: 'Qawali Night',
    desc: 'Evening entertainment closing Day 2',
    category: 'evening',
  },
];

export const EVENING_NIGHTS = [
  {
    day: 'Day 1',
    time: '7:00 PM – 10:00 PM',
    title: 'Movie Night',
    desc: 'Evening entertainment closing Day 1.',
    type: 'movie' as const,
  },
  {
    day: 'Day 2',
    time: '7:00 PM – 10:00 PM',
    title: 'Qawali Night',
    desc: 'Evening entertainment closing Day 2.',
    type: 'qawali' as const,
  },
];

export const TEAMS: Record<TeamId, TeamGroup> = {
  executive: {
    id: 'executive',
    tag: 'Task Force 26–27',
    title: 'Executive Council',
    cardSubtitle: 'Leading the vision and strategy of FESS',
    modalTitle: 'Executive Council Roster',
    desc: 'Leading the vision and strategy of FAST Entrepreneurship and Startup Society.',
    heroVision:
      'Setting the strategic compass for FAST’s founder ecosystem—from boardroom-level industry panels and flagship competitions to cross-campus startup mentorship.',
    badgeText: 'FESS Executive Board',
    stats: [
      { label: 'Tenure', value: '2026 – 2027' },
      { label: 'Core Portfolios', value: '4 Leads' },
      { label: 'Flagship Tracks', value: '3 Competitions · 2 Nights' },
    ],
    members: [
      {
        id: 'hamza-tariq',
        name: 'Hamza Tariq',
        role: 'President FESS',
        code: 'PRES',
        dept: 'Executive Council',
        batch: 'FAST Batch ’23 · BS Computer Science',
        focus: 'Vision, Industry Partnerships & Flagship Strategy',
        bio: 'Architects the society’s annual roadmap, forging direct alliances with angel investors, corporate founders, and campus incubators so student builders pitch on real industry stages.',
        highlights: [
          'Leads executive sponsorship & business leader panel curation for Pitch Arena',
          'Spearheads the 2-Day Flagship Enterprise Expo & evening cultural nights',
          'Mentors early-stage student founders from ideation through demo day',
        ],
        skills: ['Strategic Leadership', 'Venture Partnerships', 'Public Speaking', 'Fundraising'],
        quote: 'We do not wait for opportunities to arrive on campus—we engineer the stage for them.',
      },
      {
        id: 'ayesha-siddiqui',
        name: 'Ayesha Siddiqui',
        role: 'General Secretary',
        code: 'GEN SEC',
        dept: 'Executive Council',
        batch: 'FAST Batch ’23 · BS Software Engineering',
        focus: 'Governance, Society Operations & Coordination',
        bio: 'The operational backbone of FESS—orchestrating cross-wing charters, faculty clearances, delegate communications, and seamless execution across every campus touchpoint.',
        highlights: [
          'Manages inter-departmental workflows across 40+ active society ambassadors',
          'Oversees official FESS governance, competition rulebooks, and judging rubrics',
          'Coordinates registration desks, certificates, and winner shields distribution',
        ],
        skills: ['Governance', 'Program Management', 'Stakeholder Alignment', 'Documentation'],
        quote: 'Precision behind the scenes is what lets founders shine on stage.',
      },
      {
        id: 'bilal-ahmed',
        name: 'Bilal Ahmed',
        role: 'Vice President Operations',
        code: 'VP OPS',
        dept: 'Executive Council',
        batch: 'FAST Batch ’24 · BS FinTech',
        focus: 'Enterprise Expo Logistics & Event Execution',
        bio: 'Turns floorplans into thriving student marketplaces—managing stall infrastructure, vendor onboarding, crowd flow, and rapid logistics across all two days of the flagship fest.',
        highlights: [
          'Directs 12-hour daily Enterprise Expo stall operations (10:30 AM – 10:00 PM)',
          'Produces Movie Night and Qawali Night courtyard staging & sound logistics',
          'Runs real-time resource dispatch and campus security coordination',
        ],
        skills: ['Venue Logistics', 'Vendor Ops', 'Crisis Execution', 'Budget Control'],
        quote: 'Great events feel effortless because every hour was stress-tested weeks ahead.',
      },
      {
        id: 'mahnoor-raza',
        name: 'Mahnoor Raza',
        role: 'Vice President Strategy',
        code: 'VP STRAT',
        dept: 'Executive Council',
        batch: 'FAST Batch ’24 · BS Business Analytics',
        focus: 'Pitch Arena Judging Panels & Startup Mentorship',
        bio: 'Designs the competitive rigor behind Pitch Arena and Sell Me This Pen—calibrating scoring criteria, founder prep workshops, and alumni mentorship cohorts.',
        highlights: [
          'Curates the judging rubric for Pitch Arena & Sell Me This Pen challenges',
          'Pairs competing teams with industry operators for pre-event pitch clinics',
          'Drives Audience Favourite & Most Unique Stall analytics at Enterprise Expo',
        ],
        skills: ['Market Strategy', 'Pitch Coaching', 'Evaluation Design', 'Growth Analytics'],
        quote: 'A bold idea becomes fundable the moment clarity meets conviction.',
      },
    ],
  },
  tech: {
    id: 'tech',
    tag: 'Digital Infrastructure',
    title: 'Tech Team',
    cardSubtitle: 'Building the digital infrastructure of FESS',
    modalTitle: 'FESS Tech Team Roster',
    desc: 'Building the digital infrastructure of FESS.',
    heroVision:
      'Engineering FESS’s high-craft web platforms, competition pass pipelines, interactive 3D experiences, and zero-downtime flagship event tooling.',
    badgeText: 'Digital Infrastructure',
    stats: [
      { label: 'Division', value: 'Engineering & Design' },
      { label: 'Core Builders', value: '4 Leads' },
      { label: 'Stack', value: 'React · TypeScript · Node' },
    ],
    members: [
      {
        id: 'zaim-abbasi',
        name: 'Zaim Abbasi',
        role: 'Head of Tech Team',
        code: 'TECH LEAD',
        dept: 'Digital Infrastructure',
        batch: 'FAST Batch ’23 · BS Computer Science',
        focus: 'Systems Architecture & Engineering Leadership',
        bio: 'Leads technical direction across every digital initiative at FESS—setting architectural standards, reviewing production releases, and mentoring student developers.',
        highlights: [
          'Architected the FESS flagship digital platform and automated pass workflows',
          'Leads engineering sprints, code reviews, and production cloud deployments',
          'Designs scalable event-day check-in and leaderboard telemetry tools',
        ],
        skills: ['System Architecture', 'TypeScript', 'Cloud Infra', 'Team Leadership'],
        quote: 'Our software should match the ambition of the founders using it.',
      },
      {
        id: 'usman-khalid',
        name: 'Usman Khalid',
        role: 'Frontend & UI Lead',
        code: 'UI / 3D',
        dept: 'Digital Infrastructure',
        batch: 'FAST Batch ’24 · BS Software Engineering',
        focus: 'Design Systems, Motion & Interactive 3D Interfaces',
        bio: 'Crafts expressive typography, tactile 3D interactions, and responsive layouts—translating FESS’s signature crimson and ivory identity into memorable web motion.',
        highlights: [
          'Built the 3D perspective canvas scenes, tilt showcases, and curtain transitions',
          'Maintains the FESS design system tokens and accessible component library',
          'Optimizes 60fps GPU-composited animations across mobile and desktop viewports',
        ],
        skills: ['React & Motion', '3D Web Canvas', 'Design Systems', 'Accessibility'],
        quote: 'Motion isn’t decoration—it’s spatial storytelling that guides attention.',
      },
      {
        id: 'sara-javed',
        name: 'Sara Javed',
        role: 'Backend & Systems Lead',
        code: 'SYSTEMS',
        dept: 'Digital Infrastructure',
        batch: 'FAST Batch ’23 · BS Artificial Intelligence',
        focus: 'Registrations, Data Integrity & API Reliability',
        bio: 'Builds resilient APIs, validation pipelines, and transactional messaging integrations—ensuring every stall booking, pitch registration, and inquiry lands reliably.',
        highlights: [
          'Engineered server-side validation, Resend email delivery, and pass ID pipelines',
          'Implements strict input sanitization and zero-leak credential boundaries',
          'Automates automated test suites covering core routing and registration rules',
        ],
        skills: ['Node.js & Express', 'API Security', 'Transactional Mail', 'Automated Testing'],
        quote: 'Reliability under peak registration traffic is non-negotiable.',
      },
      {
        id: 'daniyal-mir',
        name: 'Daniyal Mir',
        role: 'Web Operations Lead',
        code: 'DEVOPS',
        dept: 'Digital Infrastructure',
        batch: 'FAST Batch ’24 · BS Cyber Security',
        focus: 'Performance, Deployments & Event Tooling',
        bio: 'Keeps FESS digital services fast, hardened, and battle-ready—handling CI checks, bundle optimization, and live flagship event uptime monitoring.',
        highlights: [
          'Optimizes build pipelines, asset delivery, and Core Web Vitals performance',
          'Manages production environment variables, domain DNS, and SSL health',
          'Supports live AV screen graphics and real-time schedule boards at the venue',
        ],
        skills: ['DevOps & CI/CD', 'Web Security', 'Performance Tuning', 'Event Ops'],
        quote: 'Zero downtime on flagship day starts with ruthless pre-flight checks.',
      },
    ],
  },
};

export const CONNECT_FAQS: FaqItem[] = [
  {
    question: 'Who can book a stall at Enterprise Expo?',
    answer:
      'Student entrepreneurs who already run a business (jewellery, food, candles and more) can register for a stall at PKR 8,000 across both days (10:30 AM – 10:00 PM).',
  },
  {
    question: 'What is the team limit for Pitch Arena?',
    answer:
      'Individuals or groups of no more than 3 members can participate (PKR 3,000 fee). Each group gets a maximum of 10 minutes to pitch before the panel of business leaders on Day 1 (2:00 PM – 4:00 PM).',
  },
  {
    question: 'How does Sell Me This Pen work?',
    answer:
      'It is an individual challenge on Day 2 (3:00 PM – 5:00 PM, PKR 2,500 fee). You receive a deliberately boring product or idea and have 10 minutes to prepare a creative pitch for the panel.',
  },
];

export const CONNECT_TOPICS = [
  'General FESS Society Inquiry',
  'Enterprise Expo Stall Inquiry (PKR 8,000)',
  'Pitch Arena Inquiry (PKR 3,000)',
  'Sell Me This Pen Inquiry (PKR 2,500)',
  'Movie Night & Qawali Night',
];

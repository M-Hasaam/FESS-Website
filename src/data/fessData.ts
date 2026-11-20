export type PageId = 'home' | 'events' | 'teams' | 'connect';

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
  name: string;
  role: string;
  dept: string;
  focus: string;
}

export interface TeamGroup {
  id: 'executive' | 'tech';
  tag: string;
  title: string;
  cardSubtitle: string;
  modalTitle: string;
  desc: string;
  badgeText: string;
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

export const TEAMS: Record<'executive' | 'tech', TeamGroup> = {
  executive: {
    id: 'executive',
    tag: 'Task Force 26–27',
    title: 'Executive Council',
    cardSubtitle: 'Leading the vision and strategy of FESS',
    modalTitle: 'Executive Council Roster',
    desc: 'Leading the vision and strategy of FAST Entrepreneurship and Startup Society.',
    badgeText: 'FESS Executive Board',
    members: [
      {
        name: 'Hamza Tariq',
        role: 'President FESS',
        dept: 'Executive Council',
        focus: 'Vision, Industry Partnerships & Flagship Strategy',
      },
      {
        name: 'Ayesha Siddiqui',
        role: 'General Secretary',
        dept: 'Executive Council',
        focus: 'Governance, Society Operations & Governance',
      },
      {
        name: 'Bilal Ahmed',
        role: 'Vice President Operations',
        dept: 'Executive Council',
        focus: 'Enterprise Expo Logistics & Event Execution',
      },
      {
        name: 'Mahnoor Raza',
        role: 'Vice President Strategy',
        dept: 'Executive Council',
        focus: 'Pitch Arena Judging Panels & Startup Mentorship',
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
    badgeText: 'Digital Infrastructure',
    members: [
      {
        name: 'Zaim Abbasi',
        role: 'Head of Tech Team',
        dept: 'Digital Infrastructure',
        focus: 'Systems Architecture & Engineering Leadership',
      },
      {
        name: 'Usman Khalid',
        role: 'Frontend & UI Lead',
        dept: 'Digital Infrastructure',
        focus: 'Design Systems, Motion & Interactive Interfaces',
      },
      {
        name: 'Sara Javed',
        role: 'Backend & Systems Lead',
        dept: 'Digital Infrastructure',
        focus: 'Registrations, Data Integrity & API Reliability',
      },
      {
        name: 'Daniyal Mir',
        role: 'Web Operations Lead',
        dept: 'Digital Infrastructure',
        focus: 'Performance, Deployments & Event Tooling',
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

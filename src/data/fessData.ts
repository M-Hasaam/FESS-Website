export type TeamId =
  | 'executive'
  | 'tech'
  | 'people'
  | 'media'
  | 'venture'
  | 'ops'
  | 'finance'
  | 'marketing'
  | 'pr';

export type PageId =
  | 'home'
  | 'events'
  | 'teams'
  | 'teams/executive'
  | 'teams/tech'
  | 'teams/people'
  | 'teams/media'
  | 'teams/venture'
  | 'teams/ops'
  | 'teams/finance'
  | 'teams/marketing'
  | 'teams/pr'
  | 'connect';

export type CompetitionName =
  | 'Enterprise Expo'
  | 'Pitch Arena'
  | 'Sell Me This Pen';

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
  facts: {
    label: string;
    value: string;
    highlight?: boolean;
    spanTwo?: boolean;
  }[];
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

export type PastEventCategory =
  | 'All'
  | 'Summit'
  | 'Expo'
  | 'Hackathon'
  | 'Workshop'
  | 'Cultural';

export interface PastEventItem {
  id: string;
  title: string;
  edition: string;
  category: Exclude<PastEventCategory, 'All'>;
  dateLabel: string;
  venue: string;
  attendanceLabel: string;
  outcomeLabel: string;
  summary: string;
  highlights: string[];
  image: string;
  imageAlt: string;
}

export interface SocialLink {
  label: string;
  handle: string;
  url: string;
}

/** Official social profiles. Set `linkedin` to a profile URL to show it across the site. */
export const SOCIAL_LINKS: { instagram: SocialLink; linkedin: SocialLink | null } = {
  instagram: {
    label: 'Instagram',
    handle: '@officialfess',
    url: 'https://www.instagram.com/officialfess/',
  },
  linkedin: null,
};

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
    description:
      'Connect with top founders, business leaders, and game-changers',
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
    imageAlt:
      'Student entrepreneurship marketplace booths with candles, jewellery, and artisan goods',
    facts: [
      { label: 'Format', value: 'Stall-based exhibition for 2 days' },
      { label: 'Timing', value: '10:30 AM – 10:00 PM' },
      {
        label: 'Registration Fee',
        value: 'PKR 8,000 per stall',
        highlight: true,
      },
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
    prizeSummary:
      'Winner: PKR 15,000 + shield + certificate · Runner-up: Shield + certificate',
    ctaLabel: 'Register Team (PKR 3,000)',
    shortDesc:
      'Individuals or groups (max 3 members, max 10 mins) present a startup idea or prototype before a panel of well-known businessmen.',
    fullDesc:
      'Individuals or teams with a startup idea or prototype present it to a panel of well-known businessmen. Winners are chosen on how useful, creative and rational the idea is.',
    image: '/src/assets/images/flagship_pitch_arena_1795208285141.jpg',
    imageAlt:
      'Startup founder pitching on auditorium stage before a panel of business leaders',
    facts: [
      { label: 'Day & Time', value: 'Day 1 | 2:00 PM – 4:00 PM' },
      { label: 'Registration Fee', value: 'PKR 3,000', highlight: true },
      {
        label: 'Rules',
        value: 'Groups of max 3 members. Max 10 mins per group.',
      },
      { label: 'Judging', value: 'Panel of well-known businessmen' },
      {
        label: 'Winner',
        value: 'PKR 15,000 cash prize + shield + certificate',
        highlight: true,
      },
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
        value:
          'Persuasion, confidence, handling objections, creativity and time management',
        spanTwo: true,
      },
      {
        label: 'Winner',
        value: 'PKR 15,000 cash prize + shield + certificate',
        highlight: true,
      },
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
      { label: 'Core Portfolios', value: '8 Departments' },
      { label: 'Flagship Tracks', value: '3 Competitions · 2 Nights' },
    ],
    members: [
      {
        id: 'shanzay-zahid',
        name: 'Shanzay Zahid',
        role: 'President FESS',
        code: 'PRES',
        dept: 'Executive Council',
        batch: 'FAST Batch ’23 · BS Business Analytics',
        focus: 'Vision, Industry Partnerships & Flagship Strategy',
        bio: 'Architects the society’s annual roadmap, forging direct alliances with angel investors, corporate founders, and campus incubators so student builders pitch on real industry stages.',
        highlights: [
          'Leads executive sponsorship & business leader panel curation for Pitch Arena',
          'Spearheads the 2-Day Flagship Enterprise Expo & evening cultural nights',
          'Mentors early-stage student founders from ideation through demo day',
        ],
        skills: [
          'Strategic Leadership',
          'Venture Partnerships',
          'Public Speaking',
          'Fundraising',
        ],
        quote:
          'We do not wait for opportunities to arrive on campus—we engineer the stage for them.',
      },
      {
        id: 'ahad-naqvi',
        name: 'Ahad Naqvi',
        role: 'Vice President Internals',
        code: 'VP INT',
        dept: 'Executive Council',
        batch: 'FAST Batch ’23 · BS Business Analytics',
        focus: 'Governance, Society Operations & Coordination',
        bio: 'The operational backbone of FESS—orchestrating cross-wing charters, faculty clearances, delegate communications, and seamless execution across every campus touchpoint.',
        highlights: [
          'Manages inter-departmental workflows across 40+ active society ambassadors',
          'Oversees official FESS governance, competition rulebooks, and judging rubrics',
          'Coordinates registration desks, certificates, and winner shields distribution',
        ],
        skills: [
          'Governance',
          'Program Management',
          'Stakeholder Alignment',
          'Documentation',
        ],
        quote:
          'Precision behind the scenes is what lets founders shine on stage.',
      },
      {
        id: 'shaheer-ahmed',
        name: 'Shaheer Ahmed',
        role: 'Vice President Externals',
        code: 'VP EXT',
        dept: 'Executive Council',
        batch: 'FAST Batch ’23 · BBA',
        focus: 'Enterprise Expo Logistics & Event Execution',
        bio: 'Turns floorplans into thriving student marketplaces—managing stall infrastructure, vendor onboarding, crowd flow, and rapid logistics across all two days of the flagship fest.',
        highlights: [
          'Directs 12-hour daily Enterprise Expo stall operations (10:30 AM – 10:00 PM)',
          'Produces Movie Night and Qawali Night courtyard staging & sound logistics',
          'Runs real-time resource dispatch and campus security coordination',
        ],
        skills: [
          'Venue Logistics',
          'Vendor Ops',
          'Crisis Execution',
          'Budget Control',
        ],
        quote:
          'Great events feel effortless because every hour was stress-tested weeks ahead.',
      },
      {
        id: 'muhammad-ali',
        name: 'Muhammad Ali',
        role: 'Secretary People and Culture',
        code: 'P&C SEC',
        dept: 'Executive Council',
        batch: 'FAST Batch ’24 · BS Business Analytics',
        focus: 'Team Culture, Member Engagement & Retention',
        bio: 'Builds the culture that holds FESS together—nurturing member engagement, internal bonding, and a team environment where every volunteer feels ownership of the mission.',
        highlights: [
          'Oversees the People and Culture department and its general body officers',
          'Plans team-building activities and member recognition across the tenure',
          'Supports onboarding, volunteer wellbeing, and cross-department collaboration',
        ],
        skills: [
          'People Management',
          'Team Building',
          'Conflict Resolution',
          'Communication',
        ],
        quote:
          'A society is only as strong as the people who choose to show up for it.',
      },
      {
        id: 'raeha-zahid',
        name: 'Raeha Zahid',
        role: 'Secretary Media & Content',
        code: 'M&C SEC',
        dept: 'Executive Council',
        batch: 'FAST Batch ’25 · BS Financial Technology',
        focus: 'Content Strategy, Storytelling & Event Coverage',
        bio: 'Shapes how FESS looks and sounds to the world—leading photography, videography, and content creation that captures every competition, panel, and flagship moment.',
        highlights: [
          'Oversees the Media & Content department and its general body officers',
          'Directs event coverage, photography, and short-form video production',
          'Maintains a consistent content calendar and visual voice across FESS channels',
        ],
        skills: [
          'Content Strategy',
          'Visual Storytelling',
          'Team Coordination',
          'Brand Voice',
        ],
        quote: 'Every founder story deserves to be told well.',
      },
      {
        id: 'raheen',
        name: 'Raheen',
        role: 'Secretary Venture Development',
        code: 'VD SEC',
        dept: 'Executive Council',
        batch: 'FAST Batch ’24 · BS Artificial Intelligence',
        focus: 'Startup Mentorship, Incubation & Founder Support',
        bio: 'Bridges student ideas and real ventures—guiding early-stage founders through validation, business model refinement, and preparation for investor-facing stages.',
        highlights: [
          'Oversees the Venture Development department and its general body officers',
          'Coordinates startup mentorship and competition readiness for student teams',
          'Connects aspiring founders with resources, advisors, and pitch opportunities',
        ],
        skills: [
          'Startup Mentorship',
          'Business Modeling',
          'Idea Validation',
          'Pitch Coaching',
        ],
        quote:
          'Great ventures start as ideas someone refused to leave on paper.',
      },
      {
        id: 'burhan-ahmed',
        name: 'Burhan Ahmed',
        role: 'Secretary Tech & Innovation',
        code: 'T&I SEC',
        dept: 'Executive Council',
        batch: 'FAST Batch ’24 · BS Software Engineering',
        focus: 'Technology Initiatives & Digital Innovation',
        bio: 'Champions the technical side of FESS—aligning engineering efforts with society goals and ensuring every digital tool serves founders and delegates reliably.',
        highlights: [
          'Oversees the Tech & Innovation department and its general body officers',
          'Coordinates digital platforms, registrations, and event-day technology needs',
          'Aligns technical roadmaps with the Executive Council’s priorities',
        ],
        skills: [
          'Technical Leadership',
          'Product Thinking',
          'Project Delivery',
          'Collaboration',
        ],
        quote:
          'Technology should quietly power the stage, not compete with it.',
      },
      {
        id: 'maaz-hussain',
        name: 'Maaz Hussain',
        role: 'Secretary Ops & Logistics',
        code: 'O&L SEC',
        dept: 'Executive Council',
        batch: 'FAST Batch ’24 · BS Computer Science',
        focus: 'Event Operations, Logistics & On-Ground Execution',
        bio: 'Keeps FESS events running on time—planning venue setups, resource allocation, and the on-ground logistics that turn plans into smooth, well-run events.',
        highlights: [
          'Oversees the Ops & Logistics department and its general body officers',
          'Coordinates venue setup, equipment, and volunteer deployment for events',
          'Manages schedules and day-of execution across competitions and the flagship fest',
        ],
        skills: [
          'Logistics Planning',
          'Event Operations',
          'Resource Allocation',
          'Problem Solving',
        ],
        quote: 'Flawless execution is planned long before the doors open.',
      },
      {
        id: 'habib-naqvi',
        name: 'Habib Naqvi',
        role: 'Secretary Finance & Administration',
        code: 'F&A SEC',
        dept: 'Executive Council',
        batch: 'FAST Batch ’23 · BS Accounting & Finance',
        focus: 'Budgeting, Financial Control & Administration',
        bio: 'Safeguards the financial health of FESS—managing budgets, expenditure tracking, and administrative processes so every event is fiscally sound and well documented.',
        highlights: [
          'Oversees the Finance & Administration department and its general body officers',
          'Tracks budgets, expenses, and financial records across all society events',
          'Handles administrative approvals, documentation, and reporting',
        ],
        skills: [
          'Budgeting',
          'Financial Reporting',
          'Administration',
          'Accountability',
        ],
        quote: 'Disciplined budgets are what make ambitious events possible.',
      },
      {
        id: 'abdullah-bin-amir',
        name: 'Abdullah bin Amir',
        role: 'Secretary Marketing & Brand Strategy',
        code: 'MBS SEC',
        dept: 'Executive Council',
        batch: 'FAST Batch ’24 · BS Business Analytics',
        focus: 'Brand Positioning, Campaigns & Audience Growth',
        bio: 'Drives how FESS is seen and remembered—leading marketing campaigns, brand positioning, and promotional strategy that grow participation across campus and beyond.',
        highlights: [
          'Oversees the Marketing & Brand Strategy department and its general body officers',
          'Plans and runs promotional campaigns for competitions and the flagship fest',
          'Maintains a consistent brand identity across all FESS touchpoints',
        ],
        skills: [
          'Brand Strategy',
          'Campaign Planning',
          'Market Research',
          'Creative Direction',
        ],
        quote: 'A strong brand makes people want to be part of the story.',
      },
      {
        id: 'ashnab-safdar',
        name: 'Ashnab Safdar',
        role: 'Secretary PR & Outreach',
        code: 'PRO SEC',
        dept: 'Executive Council',
        batch: 'FAST Batch ’24 · BS Computer Engineering',
        focus: 'Public Relations, Partnerships & Outreach',
        bio: 'Builds FESS’s network outside campus—managing communication with sponsors, partners, speakers, and other societies to widen the society’s reach and credibility.',
        highlights: [
          'Oversees the PR & Outreach department and its general body officers',
          'Manages outreach to sponsors, guests, and partner organizations',
          'Represents FESS in external communication and collaborations',
        ],
        skills: [
          'Public Relations',
          'Sponsor Outreach',
          'Negotiation',
          'Networking',
        ],
        quote: 'Strong relationships open doors that no flyer ever could.',
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
      { label: 'Core Builders', value: '7 Members' },
      { label: 'Stack', value: 'React · TypeScript · Node' },
    ],
    members: [
      {
        id: 'salman-ahmed-khan',
        name: 'Salman Ahmed Khan',
        role: 'Head of Tech Team',
        code: 'TECH LEAD',
        dept: 'Digital Infrastructure',
        batch: 'FAST Batch ’24 · BS Software Engineering',
        focus: 'Systems Architecture & Engineering Leadership',
        bio: 'Leads technical direction across every digital initiative at FESS—setting architectural standards, reviewing production releases, and mentoring student developers.',
        highlights: [
          'Architected the FESS flagship digital platform and automated pass workflows',
          'Leads engineering sprints, code reviews, and production cloud deployments',
          'Designs scalable event-day check-in and leaderboard telemetry tools',
        ],
        skills: [
          'System Architecture',
          'TypeScript',
          'Cloud Infra',
          'Team Leadership',
        ],
        quote:
          'Our software should match the ambition of the founders using it.',
      },
      {
        id: 'eman-hassan',
        name: 'Eman Hassan',
        role: 'Vice Head of Tech Team',
        code: 'TECH VICE HEAD',
        dept: 'Digital Infrastructure',
        batch: 'FAST Batch ’24 · BS Software Engineering',
        focus: 'Design Systems, Motion & Interactive 3D Interfaces',
        bio: 'Crafts expressive typography, tactile 3D interactions, and responsive layouts—translating FESS’s signature crimson and ivory identity into memorable web motion.',
        highlights: [
          'Built the 3D perspective canvas scenes, tilt showcases, and curtain transitions',
          'Maintains the FESS design system tokens and accessible component library',
          'Optimizes 60fps GPU-composited animations across mobile and desktop viewports',
        ],
        skills: [
          'React & Motion',
          '3D Web Canvas',
          'Design Systems',
          'Accessibility',
        ],
        quote:
          'Motion isn’t decoration—it’s spatial storytelling that guides attention.',
      },
      {
        id: 'muhammad-bin-naveed',
        name: 'Muhammad bin Naveed',
        role: 'Officer Team Tech',
        code: 'TECH OFFICER',
        dept: 'Digital Infrastructure',
        batch: 'FAST Batch ’25 · BS Computer Science',
        focus: 'Registrations, Data Integrity & API Reliability',
        bio: 'Builds resilient APIs, validation pipelines, and transactional messaging integrations—ensuring every stall booking, pitch registration, and inquiry lands reliably.',
        highlights: [
          'Engineered server-side validation, Resend email delivery, and pass ID pipelines',
          'Implements strict input sanitization and zero-leak credential boundaries',
          'Automates automated test suites covering core routing and registration rules',
        ],
        skills: [
          'Node.js & Express',
          'API Security',
          'Transactional Mail',
          'Automated Testing',
        ],
        quote: 'Reliability under peak registration traffic is non-negotiable.',
      },
      {
        id: 'abdul-basit',
        name: 'Abdul Basit',
        role: 'Officer Team Tech',
        code: 'TECH OFFICER',
        dept: 'Digital Infrastructure',
        batch: 'FAST Batch ’26 · BS Artificial Intelligence',
        focus: 'Performance, Deployments & Event Tooling',
        bio: 'Keeps FESS digital services fast, hardened, and battle-ready—handling CI checks, bundle optimization, and live flagship event uptime monitoring.',
        highlights: [
          'Optimizes build pipelines, asset delivery, and Core Web Vitals performance',
          'Manages production environment variables, domain DNS, and SSL health',
          'Supports live AV screen graphics and real-time schedule boards at the venue',
        ],
        skills: [
          'DevOps & CI/CD',
          'Web Security',
          'Performance Tuning',
          'Event Ops',
        ],
        quote:
          'Zero downtime on flagship day starts with ruthless pre-flight checks.',
      },
      {
        id: 'muhammad-hasaam',
        name: 'Muhammad Hasaam',
        role: 'Officer Team Tech',
        code: 'TECH OFFICER',
        dept: 'Digital Infrastructure',
        batch: 'FAST Batch ’24 · BS Software Engineering',
        focus: 'Performance, Deployments & Event Tooling',
        bio: 'Keeps FESS digital services fast, hardened, and battle-ready—handling CI checks, bundle optimization, and live flagship event uptime monitoring.',
        highlights: [
          'Optimizes build pipelines, asset delivery, and Core Web Vitals performance',
          'Manages production environment variables, domain DNS, and SSL health',
          'Supports live AV screen graphics and real-time schedule boards at the venue',
        ],
        skills: [
          'DevOps & CI/CD',
          'Web Security',
          'Performance Tuning',
          'Event Ops',
        ],
        quote:
          'Zero downtime on flagship day starts with ruthless pre-flight checks.',
      },
      {
        id: 'aoun-raza',
        name: 'Aoun Raza',
        role: 'Officer Team Tech',
        code: 'TECH OFFICER',
        dept: 'Digital Infrastructure',
        batch: 'FAST Batch ’24 · BS Data Science',
        focus: 'Performance, Deployments & Event Tooling',
        bio: 'Keeps FESS digital services fast, hardened, and battle-ready—handling CI checks, bundle optimization, and live flagship event uptime monitoring.',
        highlights: [
          'Optimizes build pipelines, asset delivery, and Core Web Vitals performance',
          'Manages production environment variables, domain DNS, and SSL health',
          'Supports live AV screen graphics and real-time schedule boards at the venue',
        ],
        skills: [
          'DevOps & CI/CD',
          'Web Security',
          'Performance Tuning',
          'Event Ops',
        ],
        quote:
          'Zero downtime on flagship day starts with ruthless pre-flight checks.',
      },
      {
        id: 'muhammad-asif-jah',
        name: 'Muhammad Asif Jah',
        role: 'Officer Team Tech',
        code: 'TECH OFFICER',
        dept: 'Digital Infrastructure',
        batch: 'FAST Batch ’25 · BS Computer Engineering',
        focus: 'Performance, Deployments & Event Tooling',
        bio: 'Keeps FESS digital services fast, hardened, and battle-ready—handling CI checks, bundle optimization, and live flagship event uptime monitoring.',
        highlights: [
          'Optimizes build pipelines, asset delivery, and Core Web Vitals performance',
          'Manages production environment variables, domain DNS, and SSL health',
          'Supports live AV screen graphics and real-time schedule boards at the venue',
        ],
        skills: [
          'DevOps & CI/CD',
          'Web Security',
          'Performance Tuning',
          'Event Ops',
        ],
        quote:
          'Zero downtime on flagship day starts with ruthless pre-flight checks.',
      },
    ],
  },
  people: {
    id: 'people',
    tag: 'Culture & Community',
    title: 'People & Culture Team',
    cardSubtitle: 'Nurturing the community behind FESS',
    modalTitle: 'FESS People & Culture Roster',
    desc: 'Nurturing the culture, wellbeing, and community behind FESS.',
    heroVision:
      'Building a society where every member feels welcome, heard, and motivated—through onboarding, team bonding, recognition, and a culture that keeps volunteers engaged all year.',
    badgeText: 'Culture & Community',
    stats: [
      { label: 'Division', value: 'Community & Engagement' },
      { label: 'Core Members', value: '11 Members' },
      { label: 'Focus', value: 'Engagement · Onboarding · Culture' },
    ],
    members: [
      {
        id: 'shariq-kashif',
        name: 'Shariq Kashif',
        role: 'Head of People and Culture Team',
        code: 'P&C HEAD',
        dept: 'People & Culture',
        batch: 'FAST Batch ’25 · BS Financial Technology',
        focus: 'Team Culture, Engagement & Member Experience',
        bio: 'Sets the tone for how FESS members work and grow together—leading engagement initiatives, member onboarding, and a supportive culture across all departments.',
        highlights: [
          'Leads People and Culture planning alongside the Secretary and Vice Head',
          'Designs onboarding and team-bonding experiences for new members',
          'Keeps member feedback loops open and acts on them',
        ],
        skills: [
          'Team Leadership',
          'Engagement Planning',
          'Empathy',
          'Communication',
        ],
        quote: 'Culture is built in the small moments teammates share.',
      },
      {
        id: 'amna-naseem',
        name: 'Amna Naseem',
        role: 'Head of People and Culture Team',
        code: 'P&C HEAD',
        dept: 'People & Culture',
        batch: 'FAST Batch ’25 · BS Business Analytics',
        focus: 'Member Retention, Recognition & Internal Events',
        bio: 'Keeps FESS volunteers motivated—running recognition drives, internal socials, and check-ins that make members want to stay and contribute.',
        highlights: [
          'Co-leads People and Culture initiatives and internal events',
          'Coordinates member recognition and appreciation programs',
          'Mentors officers on running engagement activities',
        ],
        skills: [
          'Event Planning',
          'Mentorship',
          'Recognition Programs',
          'Collaboration',
        ],
        quote: 'People stay where they feel seen.',
      },
      {
        id: 'aftab-ahmed',
        name: 'Aftab Ahmed',
        role: 'Vice Head of People and Culture Team',
        code: 'P&C VICE HEAD',
        dept: 'People & Culture',
        batch: 'FAST Batch ’24 · BS Artificial Intelligence',
        focus: 'Internal Coordination & Member Support',
        bio: 'Backs the department head in planning and delivery—coordinating officers, tracking tasks, and making sure every culture initiative lands smoothly.',
        highlights: [
          'Coordinates officer tasks and timelines within the department',
          'Supports planning and execution of team-bonding events',
          'Acts as a point of contact for member concerns',
        ],
        skills: [
          'Coordination',
          'Task Management',
          'Interpersonal Skills',
          'Planning',
        ],
        quote: 'Good teams are held together by reliable follow-through.',
      },
      {
        id: 'abeera-masud',
        name: 'Abeera Masud',
        role: 'Officer Team People and Culture',
        code: 'P&C OFFICER',
        dept: 'People & Culture',
        batch: 'FAST Batch ’26 · BS Computer Engineering',
        focus: 'Member Engagement & Team Activities',
        bio: 'Helps run FESS’s internal activities—welcoming new members, setting up bonding events, and keeping the team connected and energized.',
        highlights: [
          'Assists in organizing team-bonding and social events',
          'Supports onboarding of new society members',
          'Helps gather member feedback and participation data',
        ],
        skills: ['Event Support', 'Teamwork', 'Communication', 'Adaptability'],
        quote: 'Showing up for the team is where culture starts.',
      },
      {
        id: 'ammar-asif',
        name: 'Ammar Asif',
        role: 'Officer Team People and Culture',
        code: 'P&C OFFICER',
        dept: 'People & Culture',
        batch: 'FAST Batch ’25 · BS Financial Technology',
        focus: 'Volunteer Wellbeing & Internal Communication',
        bio: 'Supports the people side of FESS operations—keeping volunteers informed, appreciated, and comfortable throughout busy event cycles.',
        highlights: [
          'Supports volunteer check-ins during major events',
          'Helps prepare recognition and appreciation initiatives',
          'Assists with internal announcements and reminders',
        ],
        skills: [
          'Volunteer Support',
          'Active Listening',
          'Organization',
          'Reliability',
        ],
        quote: 'A cared-for team delivers better events.',
      },
      {
        id: 'rafia',
        name: 'Rafia',
        role: 'Officer Team People and Culture',
        code: 'P&C OFFICER',
        dept: 'People & Culture',
        batch: 'FAST Batch ’26 · BBA',
        focus: 'Member Engagement & Team Activities',
        bio: 'Helps run FESS’s internal activities—welcoming new members, setting up bonding events, and keeping the team connected and energized.',
        highlights: [
          'Assists in organizing team-bonding and social events',
          'Supports onboarding of new society members',
          'Helps gather member feedback and participation data',
        ],
        skills: ['Event Support', 'Teamwork', 'Communication', 'Adaptability'],
        quote: 'Showing up for the team is where culture starts.',
      },
      {
        id: 'fizza-maqsood',
        name: 'Fizza Maqsood',
        role: 'Officer Team People and Culture',
        code: 'P&C OFFICER',
        dept: 'People & Culture',
        batch: 'FAST Batch ’26 · BS Computer Science',
        focus: 'Volunteer Wellbeing & Internal Communication',
        bio: 'Supports the people side of FESS operations—keeping volunteers informed, appreciated, and comfortable throughout busy event cycles.',
        highlights: [
          'Supports volunteer check-ins during major events',
          'Helps prepare recognition and appreciation initiatives',
          'Assists with internal announcements and reminders',
        ],
        skills: [
          'Volunteer Support',
          'Active Listening',
          'Organization',
          'Reliability',
        ],
        quote: 'A cared-for team delivers better events.',
      },
      {
        id: 'muhammad-abdur-rafay',
        name: 'Muhammad Abdur Rafay',
        role: 'Officer Team People and Culture',
        code: 'P&C OFFICER',
        dept: 'People & Culture',
        batch: 'FAST Batch ’24 · BS Electrical Engineering',
        focus: 'Member Engagement & Team Activities',
        bio: 'Helps run FESS’s internal activities—welcoming new members, setting up bonding events, and keeping the team connected and energized.',
        highlights: [
          'Assists in organizing team-bonding and social events',
          'Supports onboarding of new society members',
          'Helps gather member feedback and participation data',
        ],
        skills: ['Event Support', 'Teamwork', 'Communication', 'Adaptability'],
        quote: 'Showing up for the team is where culture starts.',
      },
      {
        id: 'warda-qasim',
        name: 'Warda Qasim',
        role: 'Officer Team People and Culture',
        code: 'P&C OFFICER',
        dept: 'People & Culture',
        batch: 'FAST Batch ’26 · BBA',
        focus: 'Volunteer Wellbeing & Internal Communication',
        bio: 'Supports the people side of FESS operations—keeping volunteers informed, appreciated, and comfortable throughout busy event cycles.',
        highlights: [
          'Supports volunteer check-ins during major events',
          'Helps prepare recognition and appreciation initiatives',
          'Assists with internal announcements and reminders',
        ],
        skills: [
          'Volunteer Support',
          'Active Listening',
          'Organization',
          'Reliability',
        ],
        quote: 'A cared-for team delivers better events.',
      },
      {
        id: 'muhammad-ibrahim-shoaib',
        name: 'Muhammad Ibrahim Shoaib',
        role: 'Officer Team People and Culture',
        code: 'P&C OFFICER',
        dept: 'People & Culture',
        batch: 'FAST Batch ’24 · BS Software Engineering',
        focus: 'Member Engagement & Team Activities',
        bio: 'Helps run FESS’s internal activities—welcoming new members, setting up bonding events, and keeping the team connected and energized.',
        highlights: [
          'Assists in organizing team-bonding and social events',
          'Supports onboarding of new society members',
          'Helps gather member feedback and participation data',
        ],
        skills: ['Event Support', 'Teamwork', 'Communication', 'Adaptability'],
        quote: 'Showing up for the team is where culture starts.',
      },
      {
        id: 'muhammad-aryaan-niazi',
        name: 'Muhammad Aryaan Niazi',
        role: 'Officer Team People and Culture',
        code: 'P&C OFFICER',
        dept: 'People & Culture',
        batch: 'FAST Batch ’25 · BS Financial Technology',
        focus: 'Volunteer Wellbeing & Internal Communication',
        bio: 'Supports the people side of FESS operations—keeping volunteers informed, appreciated, and comfortable throughout busy event cycles.',
        highlights: [
          'Supports volunteer check-ins during major events',
          'Helps prepare recognition and appreciation initiatives',
          'Assists with internal announcements and reminders',
        ],
        skills: [
          'Volunteer Support',
          'Active Listening',
          'Organization',
          'Reliability',
        ],
        quote: 'A cared-for team delivers better events.',
      },
    ],
  },
  media: {
    id: 'media',
    tag: 'Storytelling & Visuals',
    title: 'Media & Content Team',
    cardSubtitle: 'Capturing and telling the FESS story',
    modalTitle: 'FESS Media & Content Roster',
    desc: 'Capturing and telling the story of FESS through visuals, video, and content.',
    heroVision:
      'Turning every pitch, panel, and flagship moment into scroll-stopping photography, video, and written content that carries the FESS story far beyond campus.',
    badgeText: 'Storytelling & Visuals',
    stats: [
      { label: 'Division', value: 'Creative & Content' },
      { label: 'Core Members', value: '10 Members' },
      { label: 'Focus', value: 'Photo · Video · Social' },
    ],
    members: [
      {
        id: 'noraiz',
        name: 'Noraiz',
        role: 'Head of Media & Content Team',
        code: 'M&C HEAD',
        dept: 'Media & Content',
        batch: 'FAST Batch ’24 · BS Financial Technology',
        focus: 'Content Direction, Photography & Video',
        bio: 'Directs the creative output of FESS—setting visual standards, planning event coverage, and leading a team that documents and promotes every major moment.',
        highlights: [
          'Leads content planning and event coverage with the Secretary and Vice Head',
          'Sets visual and editing standards across FESS media',
          'Reviews and approves final photo, video, and social content',
        ],
        skills: [
          'Creative Direction',
          'Visual Storytelling',
          'Content Planning',
          'Team Leadership',
        ],
        quote: 'Every event is a story waiting for the right frame.',
      },
      {
        id: 'fatima-zulqarnain',
        name: 'Fatima Zulqarnain',
        role: 'Vice Head of Media & Content Team',
        code: 'M&C VICE HEAD',
        dept: 'Media & Content',
        batch: 'FAST Batch ’25 · BS Business Analytics',
        focus: 'Content Production, Editing & Scheduling',
        bio: 'Keeps the content pipeline moving—coordinating shoots, managing editing timelines, and ensuring posts go out polished and on schedule.',
        highlights: [
          'Coordinates shoot schedules and coverage assignments',
          'Oversees editing timelines and content quality checks',
          'Manages the posting calendar across FESS channels',
        ],
        skills: [
          'Content Production',
          'Editing',
          'Scheduling',
          'Quality Control',
        ],
        quote: 'Consistency turns good content into a recognizable brand.',
      },
      {
        id: 'haya-nosheen',
        name: 'Haya Nosheen',
        role: 'Officer Team Media & Content',
        code: 'M&C OFFICER',
        dept: 'Media & Content',
        batch: 'FAST Batch ’25 · BS Business Analytics',
        focus: 'Photography, Videography & Event Coverage',
        bio: 'Captures FESS events as they happen—shooting photos and video, collecting highlights, and delivering raw material the team can turn into polished content.',
        highlights: [
          'Covers competitions, panels, and flagship events on the ground',
          'Shoots and organizes photo and video assets',
          'Delivers highlights for same-day social posts',
        ],
        skills: [
          'Photography',
          'Videography',
          'Event Coverage',
          'Attention to Detail',
        ],
        quote: 'The best moments never repeat—capture them once, well.',
      },
      {
        id: 'faiz-muhammad',
        name: 'Faiz Muhammad',
        role: 'Officer Team Media & Content',
        code: 'M&C OFFICER',
        dept: 'Media & Content',
        batch: 'FAST Batch ’25 · BS Business Analytics',
        focus: 'Design, Editing & Social Content',
        bio: 'Shapes how FESS appears online—creating graphics, editing short-form video, and writing captions that keep audiences engaged.',
        highlights: [
          'Designs posters, announcements, and social graphics',
          'Edits reels and highlight videos for FESS channels',
          'Writes captions and supports content calendar delivery',
        ],
        skills: [
          'Graphic Design',
          'Video Editing',
          'Copywriting',
          'Creativity',
        ],
        quote: 'Good design makes people stop scrolling.',
      },
      {
        id: 'hassan-sajid',
        name: 'Hassan Sajid',
        role: 'Officer Team Media & Content',
        code: 'M&C OFFICER',
        dept: 'Media & Content',
        batch: 'FAST Batch ’24 · BS Financial Technology',
        focus: 'Photography, Videography & Event Coverage',
        bio: 'Captures FESS events as they happen—shooting photos and video, collecting highlights, and delivering raw material the team can turn into polished content.',
        highlights: [
          'Covers competitions, panels, and flagship events on the ground',
          'Shoots and organizes photo and video assets',
          'Delivers highlights for same-day social posts',
        ],
        skills: [
          'Photography',
          'Videography',
          'Event Coverage',
          'Attention to Detail',
        ],
        quote: 'The best moments never repeat—capture them once, well.',
      },
      {
        id: 'amna-wali',
        name: 'Amna Wali',
        role: 'Officer Team Media & Content',
        code: 'M&C OFFICER',
        dept: 'Media & Content',
        batch: 'FAST Batch ’26 · BS Business Analytics',
        focus: 'Design, Editing & Social Content',
        bio: 'Shapes how FESS appears online—creating graphics, editing short-form video, and writing captions that keep audiences engaged.',
        highlights: [
          'Designs posters, announcements, and social graphics',
          'Edits reels and highlight videos for FESS channels',
          'Writes captions and supports content calendar delivery',
        ],
        skills: [
          'Graphic Design',
          'Video Editing',
          'Copywriting',
          'Creativity',
        ],
        quote: 'Good design makes people stop scrolling.',
      },
      {
        id: 'sameen-fatima',
        name: 'Sameen Fatima',
        role: 'Officer Team Media & Content',
        code: 'M&C OFFICER',
        dept: 'Media & Content',
        batch: 'FAST Batch ’26 · BS Business Analytics',
        focus: 'Photography, Videography & Event Coverage',
        bio: 'Captures FESS events as they happen—shooting photos and video, collecting highlights, and delivering raw material the team can turn into polished content.',
        highlights: [
          'Covers competitions, panels, and flagship events on the ground',
          'Shoots and organizes photo and video assets',
          'Delivers highlights for same-day social posts',
        ],
        skills: [
          'Photography',
          'Videography',
          'Event Coverage',
          'Attention to Detail',
        ],
        quote: 'The best moments never repeat—capture them once, well.',
      },
      {
        id: 'jena-ayaz',
        name: 'Jena Ayaz',
        role: 'Officer Team Media & Content',
        code: 'M&C OFFICER',
        dept: 'Media & Content',
        batch: 'FAST Batch ’26 · BBA',
        focus: 'Design, Editing & Social Content',
        bio: 'Shapes how FESS appears online—creating graphics, editing short-form video, and writing captions that keep audiences engaged.',
        highlights: [
          'Designs posters, announcements, and social graphics',
          'Edits reels and highlight videos for FESS channels',
          'Writes captions and supports content calendar delivery',
        ],
        skills: [
          'Graphic Design',
          'Video Editing',
          'Copywriting',
          'Creativity',
        ],
        quote: 'Good design makes people stop scrolling.',
      },
      {
        id: 'hibah',
        name: 'Hibah',
        role: 'Officer Team Media & Content',
        code: 'M&C OFFICER',
        dept: 'Media & Content',
        batch: 'FAST Batch ’26 · BS Business Analytics',
        focus: 'Photography, Videography & Event Coverage',
        bio: 'Captures FESS events as they happen—shooting photos and video, collecting highlights, and delivering raw material the team can turn into polished content.',
        highlights: [
          'Covers competitions, panels, and flagship events on the ground',
          'Shoots and organizes photo and video assets',
          'Delivers highlights for same-day social posts',
        ],
        skills: [
          'Photography',
          'Videography',
          'Event Coverage',
          'Attention to Detail',
        ],
        quote: 'The best moments never repeat—capture them once, well.',
      },
      {
        id: 'fatima-awais',
        name: 'Fatima Awais',
        role: 'Officer Team Media & Content',
        code: 'M&C OFFICER',
        dept: 'Media & Content',
        batch: 'FAST Batch ’26 · BBA',
        focus: 'Design, Editing & Social Content',
        bio: 'Shapes how FESS appears online—creating graphics, editing short-form video, and writing captions that keep audiences engaged.',
        highlights: [
          'Designs posters, announcements, and social graphics',
          'Edits reels and highlight videos for FESS channels',
          'Writes captions and supports content calendar delivery',
        ],
        skills: [
          'Graphic Design',
          'Video Editing',
          'Copywriting',
          'Creativity',
        ],
        quote: 'Good design makes people stop scrolling.',
      },
    ],
  },
  venture: {
    id: 'venture',
    tag: 'Founders & Startups',
    title: 'Venture Development Team',
    cardSubtitle: 'Helping student ideas become real ventures',
    modalTitle: 'FESS Venture Development Roster',
    desc: 'Helping student ideas grow into real, investable ventures.',
    heroVision:
      'Guiding student founders from first idea to pitch-ready venture—through mentorship, validation, competition design, and connections to the people who can back them.',
    badgeText: 'Founders & Startups',
    stats: [
      { label: 'Division', value: 'Startups & Mentorship' },
      { label: 'Core Members', value: '11 Members' },
      { label: 'Focus', value: 'Ideation · Validation · Pitching' },
    ],
    members: [
      {
        id: 'qanita-ali',
        name: 'Qanita Ali',
        role: 'Head of Venture Development Team',
        code: 'VD HEAD',
        dept: 'Venture Development',
        batch: 'FAST Batch ’24 · BS Artificial Intelligence',
        focus: 'Startup Mentorship, Competitions & Founder Support',
        bio: 'Leads FESS’s founder-facing work—shaping competitions, mentoring student startups, and preparing teams to pitch in front of real industry panels.',
        highlights: [
          'Leads Venture Development planning with the Secretary and Vice Head',
          'Oversees competition structure, judging, and startup mentorship',
          'Connects student teams with mentors and advisors',
        ],
        skills: [
          'Startup Mentorship',
          'Competition Design',
          'Business Strategy',
          'Team Leadership',
        ],
        quote: 'Our job is to make every student founder’s next step clearer.',
      },
      {
        id: 'sajal-sajjad',
        name: 'Sajal Sajjad',
        role: 'Vice Head of Venture Development Team',
        code: 'VD VICE HEAD',
        dept: 'Venture Development',
        batch: 'FAST Batch ’24 · BS Financial Technology',
        focus: 'Founder Pipeline, Mentor Coordination & Competition Support',
        bio: 'Supports the head in running the founder pipeline—coordinating mentors, tracking startup progress, and helping teams prepare for competition rounds.',
        highlights: [
          'Coordinates mentor matching and startup check-ins',
          'Tracks team progress through competition stages',
          'Supports preparation of rubrics and participant materials',
        ],
        skills: [
          'Coordination',
          'Mentor Relations',
          'Program Support',
          'Analytical Thinking',
        ],
        quote: 'Momentum comes from teams knowing exactly what to do next.',
      },
      {
        id: 'muhammad-adil-saleem',
        name: 'Muhammad Adil Saleem',
        role: 'Officer Team Venture Development',
        code: 'VD OFFICER',
        dept: 'Venture Development',
        batch: 'FAST Batch ’25 · BS Computer Science',
        focus: 'Idea Validation, Research & Startup Support',
        bio: 'Helps student teams test their ideas—researching markets, giving structured feedback, and supporting the logistics of startup competitions.',
        highlights: [
          'Researches markets and competitors for participating teams',
          'Supports mentoring sessions and feedback rounds',
          'Assists with competition registration and tracking',
        ],
        skills: [
          'Market Research',
          'Business Analysis',
          'Feedback',
          'Organization',
        ],
        quote: 'A tested idea beats a perfect plan every time.',
      },
      {
        id: 'muhammad-mobeen-ahmed',
        name: 'Muhammad Mobeen Ahmed',
        role: 'Officer Team Venture Development',
        code: 'VD OFFICER',
        dept: 'Venture Development',
        batch: 'FAST Batch ’25 · BS Computer Science',
        focus: 'Pitch Preparation, Judging Support & Founder Outreach',
        bio: 'Prepares founders for the stage—reviewing pitch decks, supporting judging panels, and reaching out to student entrepreneurs across campus.',
        highlights: [
          'Reviews pitch decks and offers structured feedback',
          'Supports judges and scoring during competitions',
          'Reaches out to prospective student founders',
        ],
        skills: [
          'Pitch Support',
          'Presentation Skills',
          'Outreach',
          'Attention to Detail',
        ],
        quote: 'A clear pitch can change a founder’s trajectory.',
      },
      {
        id: 'abdul-jawad',
        name: 'Abdul Jawad',
        role: 'Officer Team Venture Development',
        code: 'VD OFFICER',
        dept: 'Venture Development',
        batch: 'FAST Batch ’25 · BS Software Engineering',
        focus: 'Idea Validation, Research & Startup Support',
        bio: 'Helps student teams test their ideas—researching markets, giving structured feedback, and supporting the logistics of startup competitions.',
        highlights: [
          'Researches markets and competitors for participating teams',
          'Supports mentoring sessions and feedback rounds',
          'Assists with competition registration and tracking',
        ],
        skills: [
          'Market Research',
          'Business Analysis',
          'Feedback',
          'Organization',
        ],
        quote: 'A tested idea beats a perfect plan every time.',
      },
      {
        id: 'namra-malik',
        name: 'Namra Malik',
        role: 'Officer Team Venture Development',
        code: 'VD OFFICER',
        dept: 'Venture Development',
        batch: 'FAST Batch ’25 · BS Computer Science',
        focus: 'Pitch Preparation, Judging Support & Founder Outreach',
        bio: 'Prepares founders for the stage—reviewing pitch decks, supporting judging panels, and reaching out to student entrepreneurs across campus.',
        highlights: [
          'Reviews pitch decks and offers structured feedback',
          'Supports judges and scoring during competitions',
          'Reaches out to prospective student founders',
        ],
        skills: [
          'Pitch Support',
          'Presentation Skills',
          'Outreach',
          'Attention to Detail',
        ],
        quote: 'A clear pitch can change a founder’s trajectory.',
      },
      {
        id: 'muhammad-abdullah-moazzam',
        name: 'Muhammad Abdullah Moazzam',
        role: 'Officer Team Venture Development',
        code: 'VD OFFICER',
        dept: 'Venture Development',
        batch: 'FAST Batch ’25 · BS Software Engineering',
        focus: 'Idea Validation, Research & Startup Support',
        bio: 'Helps student teams test their ideas—researching markets, giving structured feedback, and supporting the logistics of startup competitions.',
        highlights: [
          'Researches markets and competitors for participating teams',
          'Supports mentoring sessions and feedback rounds',
          'Assists with competition registration and tracking',
        ],
        skills: [
          'Market Research',
          'Business Analysis',
          'Feedback',
          'Organization',
        ],
        quote: 'A tested idea beats a perfect plan every time.',
      },
      {
        id: 'taha-yasin',
        name: 'Taha Yasin',
        role: 'Officer Team Venture Development',
        code: 'VD OFFICER',
        dept: 'Venture Development',
        batch: 'FAST Batch ’25 · BS Software Engineering',
        focus: 'Pitch Preparation, Judging Support & Founder Outreach',
        bio: 'Prepares founders for the stage—reviewing pitch decks, supporting judging panels, and reaching out to student entrepreneurs across campus.',
        highlights: [
          'Reviews pitch decks and offers structured feedback',
          'Supports judges and scoring during competitions',
          'Reaches out to prospective student founders',
        ],
        skills: [
          'Pitch Support',
          'Presentation Skills',
          'Outreach',
          'Attention to Detail',
        ],
        quote: 'A clear pitch can change a founder’s trajectory.',
      },
      {
        id: 'aima-naveed',
        name: 'Aima Naveed',
        role: 'Officer Team Venture Development',
        code: 'VD OFFICER',
        dept: 'Venture Development',
        batch: 'FAST Batch ’24 · BS Artificial Intelligence',
        focus: 'Idea Validation, Research & Startup Support',
        bio: 'Helps student teams test their ideas—researching markets, giving structured feedback, and supporting the logistics of startup competitions.',
        highlights: [
          'Researches markets and competitors for participating teams',
          'Supports mentoring sessions and feedback rounds',
          'Assists with competition registration and tracking',
        ],
        skills: [
          'Market Research',
          'Business Analysis',
          'Feedback',
          'Organization',
        ],
        quote: 'A tested idea beats a perfect plan every time.',
      },
      {
        id: 'humna-wasim',
        name: 'Humna Wasim',
        role: 'Officer Team Venture Development',
        code: 'VD OFFICER',
        dept: 'Venture Development',
        batch: 'FAST Batch ’24 · BS Artificial Intelligence',
        focus: 'Pitch Preparation, Judging Support & Founder Outreach',
        bio: 'Prepares founders for the stage—reviewing pitch decks, supporting judging panels, and reaching out to student entrepreneurs across campus.',
        highlights: [
          'Reviews pitch decks and offers structured feedback',
          'Supports judges and scoring during competitions',
          'Reaches out to prospective student founders',
        ],
        skills: [
          'Pitch Support',
          'Presentation Skills',
          'Outreach',
          'Attention to Detail',
        ],
        quote: 'A clear pitch can change a founder’s trajectory.',
      },
      {
        id: 'zarwa-nadeem',
        name: 'Zarwa Nadeem',
        role: 'Officer Team Venture Development',
        code: 'VD OFFICER',
        dept: 'Venture Development',
        batch: 'FAST Batch ’24 · BS Artificial Intelligence',
        focus: 'Idea Validation, Research & Startup Support',
        bio: 'Helps student teams test their ideas—researching markets, giving structured feedback, and supporting the logistics of startup competitions.',
        highlights: [
          'Researches markets and competitors for participating teams',
          'Supports mentoring sessions and feedback rounds',
          'Assists with competition registration and tracking',
        ],
        skills: [
          'Market Research',
          'Business Analysis',
          'Feedback',
          'Organization',
        ],
        quote: 'A tested idea beats a perfect plan every time.',
      },
    ],
  },
  ops: {
    id: 'ops',
    tag: 'Operations & Execution',
    title: 'Ops & Logistics Team',
    cardSubtitle: 'Making every FESS event run smoothly',
    modalTitle: 'FESS Ops & Logistics Roster',
    desc: 'Executing FESS events on the ground—setup, logistics, and flow.',
    heroVision:
      'Turning plans into flawless events—handling venue setup, equipment, stalls, volunteers, and the real-time logistics that keep every FESS day on schedule.',
    badgeText: 'Operations & Execution',
    stats: [
      { label: 'Division', value: 'Operations & Events' },
      { label: 'Core Members', value: '16 Members' },
      { label: 'Focus', value: 'Setup · Logistics · Volunteers' },
    ],
    members: [
      {
        id: 'sanaullah',
        name: 'Sanaullah',
        role: 'Head of Ops and Logistics Team',
        code: 'O&L HEAD',
        dept: 'Ops & Logistics',
        batch: 'FAST Batch ’24 · BBA',
        focus: 'Venue Setup, Resource Planning & Event-Day Execution',
        bio: 'Leads on-ground delivery—planning layouts, allocating equipment and volunteers, and keeping event-day operations running to schedule.',
        highlights: [
          'Leads Ops & Logistics planning with the Secretary and Vice Head',
          'Plans venue layouts, stall setups, and resource allocation',
          'Directs volunteer deployment and event-day coordination',
        ],
        skills: [
          'Operations Management',
          'Event Logistics',
          'Team Leadership',
          'Problem Solving',
        ],
        quote: 'Great events are won in the planning, not the panic.',
      },
      {
        id: 'saad',
        name: 'Saad',
        role: 'Head of Ops and Logistics Team',
        code: 'O&L HEAD',
        dept: 'Ops & Logistics',
        batch: 'FAST Batch ’24 · BS Computer Engineering',
        focus: 'Vendor Coordination, Equipment & Crowd Flow',
        bio: 'Handles the practical side of events—vendors, equipment, entry points, and crowd flow—so attendees and participants never notice the complexity.',
        highlights: [
          'Co-leads event logistics and equipment management',
          'Coordinates with vendors and campus facilities',
          'Plans crowd flow and entry management for events',
        ],
        skills: [
          'Vendor Coordination',
          'Resource Management',
          'Crowd Management',
          'Communication',
        ],
        quote: 'When logistics work, nobody notices—and that’s the goal.',
      },
      {
        id: 'abdullah-yasien',
        name: 'Abdullah Yasien',
        role: 'Vice Head of Ops and Logistics Team',
        code: 'O&L VICE HEAD',
        dept: 'Ops & Logistics',
        batch: 'FAST Batch ’25 · BBA',
        focus: 'Logistics Coordination & Volunteer Scheduling',
        bio: 'Supports the heads in turning logistics plans into daily action—scheduling volunteers, tracking equipment, and resolving issues as they come up.',
        highlights: [
          'Schedules and coordinates volunteer shifts',
          'Tracks equipment, supplies, and setup checklists',
          'Handles real-time issue resolution during events',
        ],
        skills: [
          'Coordination',
          'Scheduling',
          'Adaptability',
          'Crisis Handling',
        ],
        quote: 'A calm response in the moment saves the whole event.',
      },
      {
        id: 'hibba-asad',
        name: 'Hibba Asad',
        role: 'Officer Team Ops and Logistics',
        code: 'O&L OFFICER',
        dept: 'Ops & Logistics',
        batch: 'FAST Batch ’25 · BS Financial Technology',
        focus: 'Setup, Stalls & On-Ground Support',
        bio: 'Makes the physical event happen—setting up stalls and stages, managing equipment, and supporting participants and guests on the ground.',
        highlights: [
          'Sets up stalls, stages, and signage before events',
          'Manages equipment and supplies during events',
          'Assists participants and guests with on-ground needs',
        ],
        skills: [
          'Event Setup',
          'Physical Logistics',
          'Teamwork',
          'Reliability',
        ],
        quote: 'Every detail on the ground is part of the experience.',
      },
      {
        id: 'muhammad-muzammil',
        name: 'Muhammad Muzammil',
        role: 'Officer Team Ops and Logistics',
        code: 'O&L OFFICER',
        dept: 'Ops & Logistics',
        batch: 'FAST Batch ’25 · BS Financial Technology',
        focus: 'Volunteer Coordination, Registration Desks & Flow Control',
        bio: 'Keeps entry points and activities moving—staffing registration desks, guiding attendees, and coordinating volunteers across event zones.',
        highlights: [
          'Staffs registration and information desks',
          'Guides attendees and manages queues and entry points',
          'Coordinates volunteers across event zones',
        ],
        skills: [
          'Volunteer Coordination',
          'Customer Handling',
          'Time Management',
          'Composure',
        ],
        quote: 'Smooth flow starts with a welcoming first minute.',
      },
      {
        id: 'syeda-afnan',
        name: 'Syeda Afnan',
        role: 'Officer Team Ops and Logistics',
        code: 'O&L OFFICER',
        dept: 'Ops & Logistics',
        batch: 'FAST Batch ’24 · BS Software Engineering',
        focus: 'Setup, Stalls & On-Ground Support',
        bio: 'Makes the physical event happen—setting up stalls and stages, managing equipment, and supporting participants and guests on the ground.',
        highlights: [
          'Sets up stalls, stages, and signage before events',
          'Manages equipment and supplies during events',
          'Assists participants and guests with on-ground needs',
        ],
        skills: [
          'Event Setup',
          'Physical Logistics',
          'Teamwork',
          'Reliability',
        ],
        quote: 'Every detail on the ground is part of the experience.',
      },
      {
        id: 'mohid-iqbal',
        name: 'Mohid Iqbal',
        role: 'Officer Team Ops and Logistics',
        code: 'O&L OFFICER',
        dept: 'Ops & Logistics',
        batch: 'FAST Batch ’25 · BS Business Analytics',
        focus: 'Volunteer Coordination, Registration Desks & Flow Control',
        bio: 'Keeps entry points and activities moving—staffing registration desks, guiding attendees, and coordinating volunteers across event zones.',
        highlights: [
          'Staffs registration and information desks',
          'Guides attendees and manages queues and entry points',
          'Coordinates volunteers across event zones',
        ],
        skills: [
          'Volunteer Coordination',
          'Customer Handling',
          'Time Management',
          'Composure',
        ],
        quote: 'Smooth flow starts with a welcoming first minute.',
      },
      {
        id: 'salman-ahmed',
        name: 'Salman Ahmed',
        role: 'Officer Team Ops and Logistics',
        code: 'O&L OFFICER',
        dept: 'Ops & Logistics',
        batch: 'FAST Batch ’25 · BS Computer Engineering',
        focus: 'Setup, Stalls & On-Ground Support',
        bio: 'Makes the physical event happen—setting up stalls and stages, managing equipment, and supporting participants and guests on the ground.',
        highlights: [
          'Sets up stalls, stages, and signage before events',
          'Manages equipment and supplies during events',
          'Assists participants and guests with on-ground needs',
        ],
        skills: [
          'Event Setup',
          'Physical Logistics',
          'Teamwork',
          'Reliability',
        ],
        quote: 'Every detail on the ground is part of the experience.',
      },
      {
        id: 'abdullah-irfan',
        name: 'Abdullah Irfan',
        role: 'Officer Team Ops and Logistics',
        code: 'O&L OFFICER',
        dept: 'Ops & Logistics',
        batch: 'FAST Batch ’26 · BS Business Analytics',
        focus: 'Volunteer Coordination, Registration Desks & Flow Control',
        bio: 'Keeps entry points and activities moving—staffing registration desks, guiding attendees, and coordinating volunteers across event zones.',
        highlights: [
          'Staffs registration and information desks',
          'Guides attendees and manages queues and entry points',
          'Coordinates volunteers across event zones',
        ],
        skills: [
          'Volunteer Coordination',
          'Customer Handling',
          'Time Management',
          'Composure',
        ],
        quote: 'Smooth flow starts with a welcoming first minute.',
      },
      {
        id: 'arooj-abrar',
        name: 'Arooj Abrar',
        role: 'Officer Team Ops and Logistics',
        code: 'O&L OFFICER',
        dept: 'Ops & Logistics',
        batch: 'FAST Batch ’24 · BS Software Engineering',
        focus: 'Setup, Stalls & On-Ground Support',
        bio: 'Makes the physical event happen—setting up stalls and stages, managing equipment, and supporting participants and guests on the ground.',
        highlights: [
          'Sets up stalls, stages, and signage before events',
          'Manages equipment and supplies during events',
          'Assists participants and guests with on-ground needs',
        ],
        skills: [
          'Event Setup',
          'Physical Logistics',
          'Teamwork',
          'Reliability',
        ],
        quote: 'Every detail on the ground is part of the experience.',
      },
      {
        id: 'abdul-moiz-khan',
        name: 'Abdul Moiz Khan',
        role: 'Officer Team Ops and Logistics',
        code: 'O&L OFFICER',
        dept: 'Ops & Logistics',
        batch: 'FAST Batch ’25 · BBA',
        focus: 'Volunteer Coordination, Registration Desks & Flow Control',
        bio: 'Keeps entry points and activities moving—staffing registration desks, guiding attendees, and coordinating volunteers across event zones.',
        highlights: [
          'Staffs registration and information desks',
          'Guides attendees and manages queues and entry points',
          'Coordinates volunteers across event zones',
        ],
        skills: [
          'Volunteer Coordination',
          'Customer Handling',
          'Time Management',
          'Composure',
        ],
        quote: 'Smooth flow starts with a welcoming first minute.',
      },
      {
        id: 'anas-ali',
        name: 'Anas Ali',
        role: 'Officer Team Ops and Logistics',
        code: 'O&L OFFICER',
        dept: 'Ops & Logistics',
        batch: 'FAST Batch ’25 · BS Business Analytics',
        focus: 'Setup, Stalls & On-Ground Support',
        bio: 'Makes the physical event happen—setting up stalls and stages, managing equipment, and supporting participants and guests on the ground.',
        highlights: [
          'Sets up stalls, stages, and signage before events',
          'Manages equipment and supplies during events',
          'Assists participants and guests with on-ground needs',
        ],
        skills: [
          'Event Setup',
          'Physical Logistics',
          'Teamwork',
          'Reliability',
        ],
        quote: 'Every detail on the ground is part of the experience.',
      },
      {
        id: 'ahmed-faraz',
        name: 'Ahmed Faraz',
        role: 'Officer Team Ops and Logistics',
        code: 'O&L OFFICER',
        dept: 'Ops & Logistics',
        batch: 'FAST Batch ’26 · BS Electrical Engineering',
        focus: 'Volunteer Coordination, Registration Desks & Flow Control',
        bio: 'Keeps entry points and activities moving—staffing registration desks, guiding attendees, and coordinating volunteers across event zones.',
        highlights: [
          'Staffs registration and information desks',
          'Guides attendees and manages queues and entry points',
          'Coordinates volunteers across event zones',
        ],
        skills: [
          'Volunteer Coordination',
          'Customer Handling',
          'Time Management',
          'Composure',
        ],
        quote: 'Smooth flow starts with a welcoming first minute.',
      },
      {
        id: 'omar-khan-jadoon',
        name: 'Omar Khan Jadoon',
        role: 'Officer Team Ops and Logistics',
        code: 'O&L OFFICER',
        dept: 'Ops & Logistics',
        batch: 'FAST Batch ’25 · BS Computer Engineering',
        focus: 'Setup, Stalls & On-Ground Support',
        bio: 'Makes the physical event happen—setting up stalls and stages, managing equipment, and supporting participants and guests on the ground.',
        highlights: [
          'Sets up stalls, stages, and signage before events',
          'Manages equipment and supplies during events',
          'Assists participants and guests with on-ground needs',
        ],
        skills: [
          'Event Setup',
          'Physical Logistics',
          'Teamwork',
          'Reliability',
        ],
        quote: 'Every detail on the ground is part of the experience.',
      },
      {
        id: 'muhammad-hashim',
        name: 'Muhammad Hashim',
        role: 'Officer Team Ops and Logistics',
        code: 'O&L OFFICER',
        dept: 'Ops & Logistics',
        batch: 'FAST Batch ’26 · BBA',
        focus: 'Volunteer Coordination, Registration Desks & Flow Control',
        bio: 'Keeps entry points and activities moving—staffing registration desks, guiding attendees, and coordinating volunteers across event zones.',
        highlights: [
          'Staffs registration and information desks',
          'Guides attendees and manages queues and entry points',
          'Coordinates volunteers across event zones',
        ],
        skills: [
          'Volunteer Coordination',
          'Customer Handling',
          'Time Management',
          'Composure',
        ],
        quote: 'Smooth flow starts with a welcoming first minute.',
      },
      {
        id: 'hamza-changaiz',
        name: 'Hamza Changaiz',
        role: 'Officer Team Ops and Logistics',
        code: 'O&L OFFICER',
        dept: 'Ops & Logistics',
        batch: 'FAST Batch ’25 · BS Accounting & Finance',
        focus: 'Setup, Stalls & On-Ground Support',
        bio: 'Makes the physical event happen—setting up stalls and stages, managing equipment, and supporting participants and guests on the ground.',
        highlights: [
          'Sets up stalls, stages, and signage before events',
          'Manages equipment and supplies during events',
          'Assists participants and guests with on-ground needs',
        ],
        skills: [
          'Event Setup',
          'Physical Logistics',
          'Teamwork',
          'Reliability',
        ],
        quote: 'Every detail on the ground is part of the experience.',
      },
    ],
  },
  finance: {
    id: 'finance',
    tag: 'Budgets & Administration',
    title: 'Finance & Administration Team',
    cardSubtitle: 'Keeping FESS financially sound and organized',
    modalTitle: 'FESS Finance & Administration Roster',
    desc: 'Managing the budgets, records, and administrative backbone of FESS.',
    heroVision:
      'Safeguarding the society’s finances and paperwork—budgeting, expense tracking, approvals, and documentation that let every event be ambitious and accountable.',
    badgeText: 'Budgets & Administration',
    stats: [
      { label: 'Division', value: 'Finance & Admin' },
      { label: 'Core Members', value: '7 Members' },
      { label: 'Focus', value: 'Budgeting · Records · Approvals' },
    ],
    members: [
      {
        id: 'muhammad-waqar',
        name: 'Muhammad Waqar',
        role: 'Head of Finance and Administration Team',
        code: 'F&A HEAD',
        dept: 'Finance & Administration',
        batch: 'FAST Batch ’24 · BS Business Analytics',
        focus: 'Budgeting, Financial Control & Reporting',
        bio: 'Owns the society’s financial planning—setting event budgets, tracking spend, and ensuring every expense is approved and documented.',
        highlights: [
          'Leads Finance & Administration with the Secretary and Vice Head',
          'Prepares and monitors event and society budgets',
          'Oversees expense approvals and financial reporting',
        ],
        skills: [
          'Budgeting',
          'Financial Planning',
          'Reporting',
          'Team Leadership',
        ],
        quote: 'Responsible budgeting is what lets ambitious ideas happen.',
      },
      {
        id: 'muzammil-junaid',
        name: 'Muzammil Junaid',
        role: 'Vice Head of Finance and Administration Team',
        code: 'F&A VICE HEAD',
        dept: 'Finance & Administration',
        batch: 'FAST Batch ’25 · BS Accounting & Finance',
        focus: 'Expense Tracking, Records & Administrative Support',
        bio: 'Backs the head in daily financial work—recording expenses, maintaining files, and preparing the paperwork behind every approval.',
        highlights: [
          'Records and reconciles event expenses',
          'Maintains financial and administrative documentation',
          'Supports preparation of budget and spending reports',
        ],
        skills: ['Bookkeeping', 'Documentation', 'Accuracy', 'Coordination'],
        quote: 'Clean records make every audit easy.',
      },
      {
        id: 'zarmeen-yasir',
        name: 'Zarmeen Yasir',
        role: 'Officer Team Finance and Administration',
        code: 'F&A OFFICER',
        dept: 'Finance & Administration',
        batch: 'FAST Batch ’25 · BS Accounting & Finance',
        focus: 'Expense Tracking & Financial Record-Keeping',
        bio: 'Keeps the numbers right—logging expenses, collecting receipts, and maintaining organized records for each FESS event.',
        highlights: [
          'Logs expenses and collects receipts for events',
          'Maintains organized financial records',
          'Assists with budget-versus-actual tracking',
        ],
        skills: [
          'Record-Keeping',
          'Accuracy',
          'Spreadsheet Skills',
          'Integrity',
        ],
        quote: 'Accurate records are a form of respect for the team’s work.',
      },
      {
        id: 'muhammad-hassan',
        name: 'Muhammad Hassan',
        role: 'Officer Team Finance and Administration',
        code: 'F&A OFFICER',
        dept: 'Finance & Administration',
        batch: 'FAST Batch ’26 · BS Accounting & Finance',
        focus: 'Administrative Support, Approvals & Payment Coordination',
        bio: 'Handles the paperwork flow—preparing approval requests, coordinating payments, and keeping administrative processes on schedule.',
        highlights: [
          'Prepares approval requests and supporting documents',
          'Coordinates payments and reimbursements',
          'Assists with administrative follow-ups across departments',
        ],
        skills: [
          'Administration',
          'Process Coordination',
          'Documentation',
          'Follow-through',
        ],
        quote: 'Good process quietly removes friction for everyone.',
      },
      {
        id: 'laiba',
        name: 'Laiba',
        role: 'Officer Team Finance and Administration',
        code: 'F&A OFFICER',
        dept: 'Finance & Administration',
        batch: 'FAST Batch ’26 · BS Accounting & Finance',
        focus: 'Expense Tracking & Financial Record-Keeping',
        bio: 'Keeps the numbers right—logging expenses, collecting receipts, and maintaining organized records for each FESS event.',
        highlights: [
          'Logs expenses and collects receipts for events',
          'Maintains organized financial records',
          'Assists with budget-versus-actual tracking',
        ],
        skills: [
          'Record-Keeping',
          'Accuracy',
          'Spreadsheet Skills',
          'Integrity',
        ],
        quote: 'Accurate records are a form of respect for the team’s work.',
      },
      {
        id: 'zain-imran',
        name: 'Zain Imran',
        role: 'Officer Team Finance and Administration',
        code: 'F&A OFFICER',
        dept: 'Finance & Administration',
        batch: 'FAST Batch ’26 · BS Accounting & Finance',
        focus: 'Administrative Support, Approvals & Payment Coordination',
        bio: 'Handles the paperwork flow—preparing approval requests, coordinating payments, and keeping administrative processes on schedule.',
        highlights: [
          'Prepares approval requests and supporting documents',
          'Coordinates payments and reimbursements',
          'Assists with administrative follow-ups across departments',
        ],
        skills: [
          'Administration',
          'Process Coordination',
          'Documentation',
          'Follow-through',
        ],
        quote: 'Good process quietly removes friction for everyone.',
      },
      {
        id: 'muhammad-ali-imran-shah',
        name: 'Muhammad Ali Imran Shah',
        role: 'Officer Team Finance and Administration',
        code: 'F&A OFFICER',
        dept: 'Finance & Administration',
        batch: 'FAST Batch ’26 · BS Artificial Intelligence',
        focus: 'Expense Tracking & Financial Record-Keeping',
        bio: 'Keeps the numbers right—logging expenses, collecting receipts, and maintaining organized records for each FESS event.',
        highlights: [
          'Logs expenses and collects receipts for events',
          'Maintains organized financial records',
          'Assists with budget-versus-actual tracking',
        ],
        skills: [
          'Record-Keeping',
          'Accuracy',
          'Spreadsheet Skills',
          'Integrity',
        ],
        quote: 'Accurate records are a form of respect for the team’s work.',
      },
    ],
  },
  marketing: {
    id: 'marketing',
    tag: 'Brand & Growth',
    title: 'Marketing & Brand Strategy Team',
    cardSubtitle: 'Growing the FESS brand and audience',
    modalTitle: 'FESS Marketing & Brand Strategy Roster',
    desc: 'Positioning FESS and growing its audience across campus and beyond.',
    heroVision:
      'Building a recognizable FESS brand—through campaigns, positioning, partnerships, and promotion that draw founders, participants, and audiences to every event.',
    badgeText: 'Brand & Growth',
    stats: [
      { label: 'Division', value: 'Marketing & Growth' },
      { label: 'Core Members', value: '10 Members' },
      { label: 'Focus', value: 'Campaigns · Branding · Promotion' },
    ],
    members: [
      {
        id: 'uzair-baig',
        name: 'Uzair Baig',
        role: 'Head of Marketing and Brand Strategy Team',
        code: 'MBS HEAD',
        dept: 'Marketing & Brand Strategy',
        batch: 'FAST Batch ’24 · BS Business Analytics',
        focus: 'Brand Positioning, Campaigns & Audience Growth',
        bio: 'Leads FESS’s marketing direction—setting brand positioning, planning campaigns, and driving registrations and attendance for competitions and the flagship fest.',
        highlights: [
          'Leads Marketing & Brand Strategy with the Secretary and Vice Head',
          'Plans promotional campaigns for competitions and events',
          'Maintains a consistent FESS brand identity across channels',
        ],
        skills: [
          'Brand Strategy',
          'Campaign Planning',
          'Market Insight',
          'Team Leadership',
        ],
        quote: 'A brand is a promise people remember.',
      },
      {
        id: 'arwa-ali',
        name: 'Arwa Ali',
        role: 'Vice Head of Marketing and Brand Strategy Team',
        code: 'MBS VICE HEAD',
        dept: 'Marketing & Brand Strategy',
        batch: 'FAST Batch ’24 · BS Business Analytics',
        focus: 'Campaign Execution, Analytics & Promotion Coordination',
        bio: 'Keeps campaigns on track—coordinating promotional tasks, monitoring engagement, and adjusting plans based on what resonates with audiences.',
        highlights: [
          'Coordinates campaign tasks and promotion timelines',
          'Tracks engagement and registration metrics',
          'Supports collaboration with media and PR teams',
        ],
        skills: [
          'Campaign Execution',
          'Analytics',
          'Coordination',
          'Creativity',
        ],
        quote: 'Measure what works, then do more of it.',
      },
      {
        id: 'hadia-amjad',
        name: 'Hadia Amjad',
        role: 'Officer Team Marketing and Brand Strategy',
        code: 'MBS OFFICER',
        dept: 'Marketing & Brand Strategy',
        batch: 'FAST Batch ’25 · BS Business Analytics',
        focus: 'Promotion, Campus Campaigns & Audience Engagement',
        bio: 'Brings FESS events to the campus audience—running on-ground promotions, spreading the word, and encouraging participation.',
        highlights: [
          'Promotes events through campus campaigns',
          'Engages students to boost registrations and attendance',
          'Supports on-ground brand activations',
        ],
        skills: ['Promotion', 'Audience Engagement', 'Communication', 'Energy'],
        quote: 'The best promotion feels like an invitation.',
      },
      {
        id: 'ahmed-mushtaq',
        name: 'Ahmed Mushtaq',
        role: 'Officer Team Marketing and Brand Strategy',
        code: 'MBS OFFICER',
        dept: 'Marketing & Brand Strategy',
        batch: 'FAST Batch ’26 · BS Accounting & Finance',
        focus: 'Brand Content, Copy & Market Research',
        bio: 'Supports the brand’s voice—drafting copy and campaign ideas, and researching audience interests to keep messaging relevant.',
        highlights: [
          'Drafts campaign copy and promotional messaging',
          'Researches audience preferences and trends',
          'Supports consistent brand tone across materials',
        ],
        skills: [
          'Copywriting',
          'Market Research',
          'Brand Consistency',
          'Creativity',
        ],
        quote: 'Clear words make strong brands.',
      },
      {
        id: 'tahira-musharraf',
        name: 'Tahira Musharraf',
        role: 'Officer Team Marketing and Brand Strategy',
        code: 'MBS OFFICER',
        dept: 'Marketing & Brand Strategy',
        batch: 'FAST Batch ’26 · BS Accounting & Finance',
        focus: 'Promotion, Campus Campaigns & Audience Engagement',
        bio: 'Brings FESS events to the campus audience—running on-ground promotions, spreading the word, and encouraging participation.',
        highlights: [
          'Promotes events through campus campaigns',
          'Engages students to boost registrations and attendance',
          'Supports on-ground brand activations',
        ],
        skills: ['Promotion', 'Audience Engagement', 'Communication', 'Energy'],
        quote: 'The best promotion feels like an invitation.',
      },
      {
        id: 'aun',
        name: 'Aun',
        role: 'Officer Team Marketing and Brand Strategy',
        code: 'MBS OFFICER',
        dept: 'Marketing & Brand Strategy',
        batch: 'FAST Batch ’26 · BS Financial Technology',
        focus: 'Brand Content, Copy & Market Research',
        bio: 'Supports the brand’s voice—drafting copy and campaign ideas, and researching audience interests to keep messaging relevant.',
        highlights: [
          'Drafts campaign copy and promotional messaging',
          'Researches audience preferences and trends',
          'Supports consistent brand tone across materials',
        ],
        skills: [
          'Copywriting',
          'Market Research',
          'Brand Consistency',
          'Creativity',
        ],
        quote: 'Clear words make strong brands.',
      },
      {
        id: 'duaa-mutashma-mudassir',
        name: 'Duaa Mutashma Mudassir',
        role: 'Officer Team Marketing and Brand Strategy',
        code: 'MBS OFFICER',
        dept: 'Marketing & Brand Strategy',
        batch: 'FAST Batch ’26 · BS Business Analytics',
        focus: 'Promotion, Campus Campaigns & Audience Engagement',
        bio: 'Brings FESS events to the campus audience—running on-ground promotions, spreading the word, and encouraging participation.',
        highlights: [
          'Promotes events through campus campaigns',
          'Engages students to boost registrations and attendance',
          'Supports on-ground brand activations',
        ],
        skills: ['Promotion', 'Audience Engagement', 'Communication', 'Energy'],
        quote: 'The best promotion feels like an invitation.',
      },
      {
        id: 'ahmed-ali-zahid',
        name: 'Ahmed Ali Zahid',
        role: 'Officer Team Marketing and Brand Strategy',
        code: 'MBS OFFICER',
        dept: 'Marketing & Brand Strategy',
        batch: 'FAST Batch ’26 · BS Financial Technology',
        focus: 'Brand Content, Copy & Market Research',
        bio: 'Supports the brand’s voice—drafting copy and campaign ideas, and researching audience interests to keep messaging relevant.',
        highlights: [
          'Drafts campaign copy and promotional messaging',
          'Researches audience preferences and trends',
          'Supports consistent brand tone across materials',
        ],
        skills: [
          'Copywriting',
          'Market Research',
          'Brand Consistency',
          'Creativity',
        ],
        quote: 'Clear words make strong brands.',
      },
      {
        id: 'ahmed-tariq',
        name: 'Ahmed Tariq',
        role: 'Officer Team Marketing and Brand Strategy',
        code: 'MBS OFFICER',
        dept: 'Marketing & Brand Strategy',
        batch: 'FAST Batch ’24 · BS Electrical Engineering',
        focus: 'Promotion, Campus Campaigns & Audience Engagement',
        bio: 'Brings FESS events to the campus audience—running on-ground promotions, spreading the word, and encouraging participation.',
        highlights: [
          'Promotes events through campus campaigns',
          'Engages students to boost registrations and attendance',
          'Supports on-ground brand activations',
        ],
        skills: ['Promotion', 'Audience Engagement', 'Communication', 'Energy'],
        quote: 'The best promotion feels like an invitation.',
      },
      {
        id: 'hajra-hussain',
        name: 'Hajra Hussain',
        role: 'Officer Team Marketing and Brand Strategy',
        code: 'MBS OFFICER',
        dept: 'Marketing & Brand Strategy',
        batch: 'FAST Batch ’25 · BS Business Analytics',
        focus: 'Brand Content, Copy & Market Research',
        bio: 'Supports the brand’s voice—drafting copy and campaign ideas, and researching audience interests to keep messaging relevant.',
        highlights: [
          'Drafts campaign copy and promotional messaging',
          'Researches audience preferences and trends',
          'Supports consistent brand tone across materials',
        ],
        skills: [
          'Copywriting',
          'Market Research',
          'Brand Consistency',
          'Creativity',
        ],
        quote: 'Clear words make strong brands.',
      },
    ],
  },
  pr: {
    id: 'pr',
    tag: 'Partnerships & Outreach',
    title: 'PR & Outreach Team',
    cardSubtitle: 'Connecting FESS with sponsors, partners, and guests',
    modalTitle: 'FESS PR & Outreach Roster',
    desc: 'Building FESS’s relationships with sponsors, partners, speakers, and the wider community.',
    heroVision:
      'Opening doors beyond campus—securing sponsors, inviting speakers and judges, and building the partnerships that give FESS events their reach and credibility.',
    badgeText: 'Partnerships & Outreach',
    stats: [
      { label: 'Division', value: 'Outreach & Partnerships' },
      { label: 'Core Members', value: '10 Members' },
      { label: 'Focus', value: 'Sponsors · Speakers · Partners' },
    ],
    members: [
      {
        id: 'rameen',
        name: 'Rameen',
        role: 'Head of PR and Outreach Team',
        code: 'PRO HEAD',
        dept: 'PR & Outreach',
        batch: 'FAST Batch ’25 · BS Financial Technology',
        focus: 'Sponsorships, Partnerships & External Relations',
        bio: 'Leads FESS’s external relationships—pursuing sponsors, inviting speakers and judges, and representing the society in every outside conversation.',
        highlights: [
          'Leads PR & Outreach with the Secretary and Vice Head',
          'Manages sponsor, partner, and guest outreach pipelines',
          'Represents FESS in external communication and collaborations',
        ],
        skills: [
          'Public Relations',
          'Sponsorship Outreach',
          'Negotiation',
          'Team Leadership',
        ],
        quote: 'Every partnership begins with one good conversation.',
      },
      {
        id: 'zulqarnain',
        name: 'Zulqarnain',
        role: 'Vice Head of PR and Outreach Team',
        code: 'PRO VICE HEAD',
        dept: 'PR & Outreach',
        batch: 'FAST Batch ’24 · BS Computer Engineering',
        focus: 'Outreach Coordination, Follow-ups & Guest Relations',
        bio: 'Supports the head in keeping outreach organized—tracking leads, following up with partners, and looking after guests and speakers.',
        highlights: [
          'Tracks outreach leads and follow-up status',
          'Coordinates communication with partners and guests',
          'Supports guest handling during events',
        ],
        skills: [
          'Coordination',
          'Relationship Management',
          'Communication',
          'Organization',
        ],
        quote: 'Persistent, polite follow-up wins partnerships.',
      },
      {
        id: 'hamza-asif',
        name: 'Hamza Asif',
        role: 'Officer Team PR and Outreach',
        code: 'PRO OFFICER',
        dept: 'PR & Outreach',
        batch: 'FAST Batch ’26 · BS Financial Technology',
        focus: 'Sponsor Outreach & Partnership Communication',
        bio: 'Reaches out to potential sponsors and partners—preparing proposals, sending emails, and keeping contacts warm.',
        highlights: [
          'Contacts prospective sponsors and partners',
          'Prepares outreach emails and proposal materials',
          'Maintains contact records and follow-up notes',
        ],
        skills: [
          'Outreach',
          'Professional Writing',
          'Persuasion',
          'Follow-through',
        ],
        quote: 'Confident, respectful outreach opens doors.',
      },
      {
        id: 'zain-shakeel',
        name: 'Zain Shakeel',
        role: 'Officer Team PR and Outreach',
        code: 'PRO OFFICER',
        dept: 'PR & Outreach',
        batch: 'FAST Batch ’25 · BS Computer Science',
        focus: 'Guest, Speaker & Society Relations',
        bio: 'Looks after the people who come to FESS—coordinating with speakers, judges, and partner societies before and during events.',
        highlights: [
          'Coordinates with speakers, judges, and guests',
          'Liaises with partner societies and organizations',
          'Hosts and supports guests during events',
        ],
        skills: ['Guest Relations', 'Networking', 'Hospitality', 'Composure'],
        quote: 'How guests are treated is how FESS is remembered.',
      },
      {
        id: 'abdullah-irfan-pr',
        name: 'Abdullah Irfan',
        role: 'Officer Team PR and Outreach',
        code: 'PRO OFFICER',
        dept: 'PR & Outreach',
        batch: 'FAST Batch ’26 · BS Business Analytics',
        focus: 'Sponsor Outreach & Partnership Communication',
        bio: 'Reaches out to potential sponsors and partners—preparing proposals, sending emails, and keeping contacts warm.',
        highlights: [
          'Contacts prospective sponsors and partners',
          'Prepares outreach emails and proposal materials',
          'Maintains contact records and follow-up notes',
        ],
        skills: [
          'Outreach',
          'Professional Writing',
          'Persuasion',
          'Follow-through',
        ],
        quote: 'Confident, respectful outreach opens doors.',
      },
      {
        id: 'bushra-gondal',
        name: 'Bushra Gondal',
        role: 'Officer Team PR and Outreach',
        code: 'PRO OFFICER',
        dept: 'PR & Outreach',
        batch: 'FAST Batch ’25 · BS Accounting & Finance',
        focus: 'Guest, Speaker & Society Relations',
        bio: 'Looks after the people who come to FESS—coordinating with speakers, judges, and partner societies before and during events.',
        highlights: [
          'Coordinates with speakers, judges, and guests',
          'Liaises with partner societies and organizations',
          'Hosts and supports guests during events',
        ],
        skills: ['Guest Relations', 'Networking', 'Hospitality', 'Composure'],
        quote: 'How guests are treated is how FESS is remembered.',
      },
      {
        id: 'ahmed-tariq-pr',
        name: 'Ahmed Tariq',
        role: 'Officer Team PR and Outreach',
        code: 'PRO OFFICER',
        dept: 'PR & Outreach',
        batch: 'FAST Batch ’24 · BS Computer Engineering',
        focus: 'Sponsor Outreach & Partnership Communication',
        bio: 'Reaches out to potential sponsors and partners—preparing proposals, sending emails, and keeping contacts warm.',
        highlights: [
          'Contacts prospective sponsors and partners',
          'Prepares outreach emails and proposal materials',
          'Maintains contact records and follow-up notes',
        ],
        skills: [
          'Outreach',
          'Professional Writing',
          'Persuasion',
          'Follow-through',
        ],
        quote: 'Confident, respectful outreach opens doors.',
      },
      {
        id: 'hassan-ul-haq',
        name: 'Hassan ul Haq',
        role: 'Officer Team PR and Outreach',
        code: 'PRO OFFICER',
        dept: 'PR & Outreach',
        batch: 'FAST Batch ’24 · BS Computer Engineering',
        focus: 'Guest, Speaker & Society Relations',
        bio: 'Looks after the people who come to FESS—coordinating with speakers, judges, and partner societies before and during events.',
        highlights: [
          'Coordinates with speakers, judges, and guests',
          'Liaises with partner societies and organizations',
          'Hosts and supports guests during events',
        ],
        skills: ['Guest Relations', 'Networking', 'Hospitality', 'Composure'],
        quote: 'How guests are treated is how FESS is remembered.',
      },
      {
        id: 'jawad-ahmed',
        name: 'Jawad Ahmed',
        role: 'Officer Team PR and Outreach',
        code: 'PRO OFFICER',
        dept: 'PR & Outreach',
        batch: 'FAST Batch ’24 · BS Computer Engineering',
        focus: 'Sponsor Outreach & Partnership Communication',
        bio: 'Reaches out to potential sponsors and partners—preparing proposals, sending emails, and keeping contacts warm.',
        highlights: [
          'Contacts prospective sponsors and partners',
          'Prepares outreach emails and proposal materials',
          'Maintains contact records and follow-up notes',
        ],
        skills: [
          'Outreach',
          'Professional Writing',
          'Persuasion',
          'Follow-through',
        ],
        quote: 'Confident, respectful outreach opens doors.',
      },
      {
        id: 'talha-hasan',
        name: 'Talha Hasan',
        role: 'Officer Team PR and Outreach',
        code: 'PRO OFFICER',
        dept: 'PR & Outreach',
        batch: 'FAST Batch ’24 · BS Computer Engineering',
        focus: 'Guest, Speaker & Society Relations',
        bio: 'Looks after the people who come to FESS—coordinating with speakers, judges, and partner societies before and during events.',
        highlights: [
          'Coordinates with speakers, judges, and guests',
          'Liaises with partner societies and organizations',
          'Hosts and supports guests during events',
        ],
        skills: ['Guest Relations', 'Networking', 'Hospitality', 'Composure'],
        quote: 'How guests are treated is how FESS is remembered.',
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

export const PAST_EVENT_CATEGORIES: PastEventCategory[] = [
  'All',
  'Summit',
  'Expo',
  'Hackathon',
  'Workshop',
  'Cultural',
];

export const PAST_EVENTS: PastEventItem[] = [
  {
    id: 'startup-summit-25',
    title: 'FESS Startup Summit ’25',
    edition: 'Spring 2025',
    category: 'Summit',
    dateLabel: 'March 2025',
    venue: 'Main Auditorium, FAST Campus',
    attendanceLabel: '420+ Delegates',
    outcomeLabel: '14 Finalist Ventures Pitched',
    summary:
      'Our largest student-led entrepreneurship conference featuring founder keynotes, live investor Q&A panels, and rapid product teardowns on the main auditorium stage.',
    highlights: [
      '420+ student founders, builders, and industry mentors in attendance',
      '14 student teams pitched directly to Lahore & Islamabad angel operators',
      '3 finalists fast-tracked into regional summer accelerator cohorts',
    ],
    image: '/src/assets/images/past_startup_summit_1795261831569.jpg',
    imageAlt:
      'Packed university auditorium watching a student founder keynote at FESS Startup Summit 2025',
  },
  {
    id: 'makers-expo-24',
    title: 'FAST Makers Expo ’24',
    edition: 'Autumn 2024',
    category: 'Expo',
    dateLabel: 'November 2024',
    venue: 'Central Courtyard Bazaar',
    attendanceLabel: '34 Student Stalls',
    outcomeLabel: 'PKR 1.1M+ Weekend GMV',
    summary:
      'A two-day open-air campus marketplace where student-owned lifestyle, specialty coffee, candle, and hardware brands launched new seasonal lines directly to campus visitors.',
    highlights: [
      '34 independent student-operated stalls across food, craft, apparel, and gadgets',
      'Over PKR 1.1M in combined weekend student vendor sales across 2 days',
      'Live crowd voting for Audience Favourite and Most Unique Stall honors',
    ],
    image: '/src/assets/images/past_makers_expo_1795261831691.jpg',
    imageAlt:
      'Vibrant daytime university courtyard marketplace filled with student entrepreneurship stalls',
  },
  {
    id: 'prototype-sprint-24',
    title: '24-Hour Prototype Sprint',
    edition: 'Winter 2024',
    category: 'Hackathon',
    dateLabel: 'December 2024',
    venue: 'Innovation Atrium, CS Block',
    attendanceLabel: '28 Engineering Teams',
    outcomeLabel: '22 Working MVPs Shipped',
    summary:
      'An overnight engineering and product sprint challenging multidisciplinary FAST teams to validate a campus or fintech bottleneck and ship an interactive prototype by sunrise.',
    highlights: [
      '28 engineering, UI/UX, and business teams competing overnight',
      '22 live clickable & hardware-backed MVPs demoed at 8:00 AM judging',
      'Dedicated design clinic and architecture mentors on floor all night',
    ],
    image: '/src/assets/images/past_prototype_sprint_1795261832112.jpg',
    imageAlt:
      'Student engineers collaborating on laptops and hardware prototypes at night inside a glass atrium',
  },
  {
    id: 'founder-fireside-24',
    title: 'Founder Fireside & Venture Clinic',
    edition: 'Fall 2024',
    category: 'Workshop',
    dateLabel: 'October 2024',
    venue: 'Executive Seminar Hall',
    attendanceLabel: '18 Early Ventures',
    outcomeLabel: '1:1 Pitch Deck Audits',
    summary:
      'Closed-door mentorship tables pairing early student teams with alumni founders and venture operators for candid feedback on pricing, go-to-market, and unit economics.',
    highlights: [
      '18 pre-seed student ventures matched with industry operators',
      'Hands-on teardown of financial models, customer discovery scripts, and pitch decks',
      '9 participating teams later placed top ranks in regional pitch arenas',
    ],
    image: '/src/assets/images/past_founder_fireside_1795261832743.jpg',
    imageAlt:
      'Seasoned tech founder mentoring university students around a seminar table with laptops',
  },
  {
    id: 'qawali-alumni-gala-24',
    title: 'Qawali & Alumni Founders Night',
    edition: 'Spring 2024',
    category: 'Cultural',
    dateLabel: 'April 2024',
    venue: 'Main Lawn Courtyard',
    attendanceLabel: '600+ Community Guests',
    outcomeLabel: 'Closing Cultural Tradition',
    summary:
      'A lantern-lit evening uniting alumni entrepreneurs, competition finalists, and the student body with acoustic Qawali performances and courtyard storytelling after demo day.',
    highlights: [
      '600+ students, judges, and alumni celebrating after flagship prize distribution',
      'Open courtyard networking between graduating founders and incoming freshmen',
      'Established the annual Movie Night & Qawali Night flagship closing tradition',
    ],
    image: '/src/assets/images/evening_qawali_cinema_1795208285128.jpg',
    imageAlt:
      'University courtyard illuminated by warm golden string lights for Qawali Night',
  },
];

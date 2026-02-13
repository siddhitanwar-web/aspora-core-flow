// Aspora OS Mock Data

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  team: string;
  level: string;
  location: string;
  manager: string;
  startDate: string;
  avatar: string;
  status: 'active' | 'onboarding' | 'offboarding';
  performanceRating?: number;
  learningProgress?: number;
}

export interface Role {
  id: string;
  title: string;
  department: string;
  team: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  level: string;
  hiringManager: string;
  status: 'open' | 'closed' | 'on-hold';
  candidates: number;
  openDate: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  roleId: string;
  role: string;
  stage: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedDate: string;
  avatar: string;
  rating: number;
  source: string;
  resumeUrl?: string;
}

export interface Offer {
  id: string;
  candidateId: string;
  candidateName: string;
  roleId: string;
  role: string;
  salary: number;
  startDate: string;
  status: 'draft' | 'pending-approval' | 'approved' | 'sent' | 'accepted' | 'declined';
  approvers: string[];
  createdDate: string;
}

export interface KPI {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  metric: 'number' | 'percentage' | 'currency';
  targetValue: number;
  currentValue: number;
  weight: number;
  owner: string;
  type: 'individual' | 'team' | 'company';
  progress: number;
  dueDate: string;
  status: 'on-track' | 'at-risk' | 'behind' | 'completed';
}

// Keep Goal as alias for backward compat
export type Goal = KPI;

export interface Review {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewerId: string;
  reviewerName: string;
  cycle: string;
  status: 'pending' | 'self-review' | 'manager-review' | 'calibration' | 'completed';
  aiStatus?: 'not-generated' | 'ai-draft' | 'manager-reviewed' | 'approved';
  rating?: number;
  dueDate: string;
}

export interface AIReviewScorecard {
  employeeId: string;
  overallRating: number;
  categories: {
    name: string;
    score: number;
    reasoning: string;
  }[];
  strengths: string[];
  improvements: string[];
  summary: string;
  dataSources: {
    meetingNotes: number;
    kpiProgress: string;
    contributions: string;
    interviews: number;
    peerFeedback: number;
    learningProgress: string;
  };
}

export interface MeetingNote {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  attendees: string[];
  template: 'weekly-checkin' | 'monthly-review' | 'career-discussion';
  topics: string[];
  actionItems: { text: string; done: boolean }[];
  sentiment: 'positive' | 'neutral' | 'concerned';
}

export interface ENPSSurvey {
  id: string;
  title: string;
  status: 'active' | 'scheduled' | 'completed';
  frequency: 'monthly' | 'quarterly';
  responses: number;
  totalEmployees: number;
  score: number;
  date: string;
  departmentScores: { department: string; score: number }[];
}

export interface Document {
  id: string;
  title: string;
  category: 'policy' | 'handbook' | 'template' | 'presentation' | 'letter';
  description: string;
  lastUpdated: string;
  author: string;
  views: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  role: string;
  duration: string;
  modules: number;
  progress: number;
  skills: string[];
}

export interface Approval {
  id: string;
  type: 'offer' | 'policy' | 'role-change' | 'access';
  title: string;
  requestedBy: string;
  requestedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'high' | 'medium' | 'low';
}

// Mock Employees
export const employees: Employee[] = [
  {
    id: 'emp-001',
    name: 'Sarah Chen',
    email: 'sarah.chen@aspora.io',
    role: 'Senior Product Manager',
    department: 'Product',
    team: 'Core Platform',
    level: 'L5',
    location: 'San Francisco, CA',
    manager: 'Michael Torres',
    startDate: '2022-03-15',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    performanceRating: 4.5,
    learningProgress: 78,
  },
  {
    id: 'emp-002',
    name: 'James Wilson',
    email: 'james.wilson@aspora.io',
    role: 'Staff Software Engineer',
    department: 'Engineering',
    team: 'Infrastructure',
    level: 'L6',
    location: 'New York, NY',
    manager: 'Emily Rodriguez',
    startDate: '2021-08-01',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    performanceRating: 4.8,
    learningProgress: 92,
  },
  {
    id: 'emp-003',
    name: 'Priya Sharma',
    email: 'priya.sharma@aspora.io',
    role: 'UX Designer',
    department: 'Design',
    team: 'Product Design',
    level: 'L4',
    location: 'Austin, TX',
    manager: 'David Kim',
    startDate: '2023-01-10',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    performanceRating: 4.2,
    learningProgress: 65,
  },
  {
    id: 'emp-004',
    name: 'Marcus Johnson',
    email: 'marcus.johnson@aspora.io',
    role: 'Engineering Manager',
    department: 'Engineering',
    team: 'Frontend',
    level: 'L6',
    location: 'Seattle, WA',
    manager: 'Emily Rodriguez',
    startDate: '2020-06-20',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    performanceRating: 4.6,
    learningProgress: 85,
  },
  {
    id: 'emp-005',
    name: 'Ana Martinez',
    email: 'ana.martinez@aspora.io',
    role: 'HR Business Partner',
    department: 'People',
    team: 'HR',
    level: 'L5',
    location: 'San Francisco, CA',
    manager: 'Rachel Green',
    startDate: '2022-09-05',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    performanceRating: 4.4,
    learningProgress: 72,
  },
  {
    id: 'emp-006',
    name: 'Kevin Park',
    email: 'kevin.park@aspora.io',
    role: 'Data Scientist',
    department: 'Engineering',
    team: 'ML Platform',
    level: 'L4',
    location: 'Boston, MA',
    manager: 'James Wilson',
    startDate: '2023-04-18',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    status: 'onboarding',
    performanceRating: undefined,
    learningProgress: 25,
  },
];

// Mock Roles
export const roles: Role[] = [
  {
    id: 'role-001',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    team: 'Frontend',
    location: 'Remote',
    type: 'full-time',
    level: 'L5',
    hiringManager: 'Marcus Johnson',
    status: 'open',
    candidates: 24,
    openDate: '2024-01-08',
    priority: 'high',
  },
  {
    id: 'role-002',
    title: 'Product Designer',
    department: 'Design',
    team: 'Product Design',
    location: 'San Francisco, CA',
    type: 'full-time',
    level: 'L4',
    hiringManager: 'David Kim',
    status: 'open',
    candidates: 18,
    openDate: '2024-01-15',
    priority: 'medium',
  },
  {
    id: 'role-003',
    title: 'Technical Program Manager',
    department: 'Product',
    team: 'Core Platform',
    location: 'New York, NY',
    type: 'full-time',
    level: 'L5',
    hiringManager: 'Sarah Chen',
    status: 'open',
    candidates: 12,
    openDate: '2024-01-20',
    priority: 'high',
  },
  {
    id: 'role-004',
    title: 'ML Engineer',
    department: 'Engineering',
    team: 'ML Platform',
    location: 'Remote',
    type: 'full-time',
    level: 'L4',
    hiringManager: 'James Wilson',
    status: 'open',
    candidates: 31,
    openDate: '2024-01-05',
    priority: 'high',
  },
  {
    id: 'role-005',
    title: 'Sales Development Rep',
    department: 'Sales',
    team: 'SDR',
    location: 'Austin, TX',
    type: 'full-time',
    level: 'L2',
    hiringManager: 'Tom Bradley',
    status: 'on-hold',
    candidates: 45,
    openDate: '2023-12-10',
    priority: 'low',
  },
];

// Mock Candidates
export const candidates: Candidate[] = [
  {
    id: 'cand-001',
    name: 'Alexandra Foster',
    email: 'alex.foster@email.com',
    roleId: 'role-001',
    role: 'Senior Frontend Engineer',
    stage: 'offer',
    appliedDate: '2024-01-12',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    source: 'LinkedIn',
  },
  {
    id: 'cand-002',
    name: 'Ryan Mitchell',
    email: 'ryan.m@email.com',
    roleId: 'role-001',
    role: 'Senior Frontend Engineer',
    stage: 'interview',
    appliedDate: '2024-01-14',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 4.2,
    source: 'Referral',
  },
  {
    id: 'cand-003',
    name: 'Maya Patel',
    email: 'maya.p@email.com',
    roleId: 'role-002',
    role: 'Product Designer',
    stage: 'screening',
    appliedDate: '2024-01-18',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    rating: 4.5,
    source: 'Portfolio',
  },
  {
    id: 'cand-004',
    name: 'Daniel Thompson',
    email: 'daniel.t@email.com',
    roleId: 'role-004',
    role: 'ML Engineer',
    stage: 'interview',
    appliedDate: '2024-01-10',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    rating: 4.6,
    source: 'Direct',
  },
  {
    id: 'cand-005',
    name: 'Sophie Lee',
    email: 'sophie.lee@email.com',
    roleId: 'role-003',
    role: 'Technical Program Manager',
    stage: 'applied',
    appliedDate: '2024-01-25',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    rating: 0,
    source: 'Career Page',
  },
];

// Mock Offers
export const offers: Offer[] = [
  {
    id: 'offer-001',
    candidateId: 'cand-001',
    candidateName: 'Alexandra Foster',
    roleId: 'role-001',
    role: 'Senior Frontend Engineer',
    salary: 185000,
    startDate: '2024-03-01',
    status: 'pending-approval',
    approvers: ['Marcus Johnson', 'Emily Rodriguez'],
    createdDate: '2024-01-28',
  },
];

// Mock KPIs (formerly Goals/OKRs)
export const kpis: KPI[] = [
  {
    id: 'kpi-001',
    employeeId: 'emp-001',
    title: 'Launch v2.0 Platform Features',
    description: 'Successfully launch all planned features for v2.0 release',
    metric: 'percentage',
    targetValue: 100,
    currentValue: 72,
    weight: 30,
    owner: 'Sarah Chen',
    type: 'individual',
    progress: 72,
    dueDate: '2024-03-31',
    status: 'on-track',
  },
  {
    id: 'kpi-002',
    employeeId: 'emp-002',
    title: 'Reduce Infrastructure Costs by 20%',
    description: 'Optimize cloud infrastructure to reduce monthly costs',
    metric: 'currency',
    targetValue: 50000,
    currentValue: 22500,
    weight: 25,
    owner: 'James Wilson',
    type: 'team',
    progress: 45,
    dueDate: '2024-06-30',
    status: 'on-track',
  },
  {
    id: 'kpi-003',
    employeeId: 'emp-003',
    title: 'Design System Documentation',
    description: 'Complete comprehensive documentation for design system',
    metric: 'percentage',
    targetValue: 100,
    currentValue: 90,
    weight: 20,
    owner: 'Priya Sharma',
    type: 'individual',
    progress: 90,
    dueDate: '2024-02-28',
    status: 'on-track',
  },
  {
    id: 'kpi-004',
    employeeId: 'emp-004',
    title: 'Team Growth & Development',
    description: 'Hire 3 engineers and establish mentorship program',
    metric: 'number',
    targetValue: 3,
    currentValue: 1,
    weight: 25,
    owner: 'Marcus Johnson',
    type: 'team',
    progress: 33,
    dueDate: '2024-04-30',
    status: 'at-risk',
  },
];

// Backward compat alias
export const goals = kpis;

// Mock Reviews
export const reviews: Review[] = [
  {
    id: 'review-001',
    employeeId: 'emp-001',
    employeeName: 'Sarah Chen',
    reviewerId: 'emp-004',
    reviewerName: 'Michael Torres',
    cycle: 'Q1 2024',
    status: 'self-review',
    aiStatus: 'ai-draft',
    dueDate: '2024-02-15',
  },
  {
    id: 'review-002',
    employeeId: 'emp-002',
    employeeName: 'James Wilson',
    reviewerId: 'emp-004',
    reviewerName: 'Emily Rodriguez',
    cycle: 'Q1 2024',
    status: 'manager-review',
    aiStatus: 'manager-reviewed',
    rating: 4.8,
    dueDate: '2024-02-15',
  },
  {
    id: 'review-003',
    employeeId: 'emp-003',
    employeeName: 'Priya Sharma',
    reviewerId: 'emp-004',
    reviewerName: 'David Kim',
    cycle: 'Q1 2024',
    status: 'pending',
    aiStatus: 'not-generated',
    dueDate: '2024-02-15',
  },
  {
    id: 'review-004',
    employeeId: 'emp-004',
    employeeName: 'Marcus Johnson',
    reviewerId: 'emp-004',
    reviewerName: 'Emily Rodriguez',
    cycle: 'Q1 2024',
    status: 'completed',
    aiStatus: 'approved',
    rating: 4.6,
    dueDate: '2024-02-15',
  },
  {
    id: 'review-005',
    employeeId: 'emp-005',
    employeeName: 'Ana Martinez',
    reviewerId: 'emp-004',
    reviewerName: 'Rachel Green',
    cycle: 'Q1 2024',
    status: 'pending',
    aiStatus: 'not-generated',
    dueDate: '2024-02-15',
  },
];

// Mock AI Review Scorecards
export const aiScorecards: AIReviewScorecard[] = [
  {
    employeeId: 'emp-001',
    overallRating: 4.5,
    categories: [
      { name: 'Technical Skills', score: 4.2, reasoning: 'Demonstrates strong product analytics and data-driven decision making. Consistently leverages quantitative analysis to inform product strategy.' },
      { name: 'Collaboration', score: 4.8, reasoning: 'Exceptional cross-functional collaboration. Successfully partnered with Engineering, Design, and Sales teams on v2.0 launch.' },
      { name: 'Leadership', score: 4.3, reasoning: 'Effectively mentored 2 junior PMs. Growing influence on team processes and strategic direction.' },
      { name: 'Impact', score: 4.7, reasoning: 'v2.0 features contributed to 15% improvement in user retention. Successfully delivered high-priority initiatives on schedule.' },
      { name: 'Growth', score: 4.5, reasoning: '78% completion on Advanced PM learning path. Actively seeking feedback and development opportunities.' },
    ],
    strengths: [
      'Outstanding cross-functional leadership on the v2.0 platform initiative',
      'Consistently data-driven approach to product decisions',
      'Strong mentorship of junior product managers',
      'Proactive stakeholder communication and alignment',
    ],
    improvements: [
      'Develop deeper technical architecture understanding for more effective engineering partnership',
      'Expand strategic thinking from feature-level to portfolio-level vision',
      'Increase participation in company-wide initiatives beyond product scope',
    ],
    summary: 'Sarah has had an exceptional quarter, driving the v2.0 platform launch while maintaining strong team relationships and mentoring junior PMs. Her data-driven approach and stakeholder management skills are key strengths. To reach the next level, she should focus on deepening technical knowledge and expanding her strategic scope beyond individual product areas.',
    dataSources: {
      meetingNotes: 12,
      kpiProgress: '4/5 KPIs on track',
      contributions: '47 tickets closed, 3 epics contributed to',
      interviews: 8,
      peerFeedback: 5,
      learningProgress: '78% path completed',
    },
  },
  {
    employeeId: 'emp-002',
    overallRating: 4.8,
    categories: [
      { name: 'Technical Skills', score: 5.0, reasoning: 'Industry-leading expertise in infrastructure. Designed and implemented critical systems serving millions of requests.' },
      { name: 'Collaboration', score: 4.5, reasoning: 'Actively contributes to engineering-wide architecture decisions. Strong partnership with platform team.' },
      { name: 'Leadership', score: 4.7, reasoning: 'De facto technical leader for infrastructure. Mentors multiple engineers across teams.' },
      { name: 'Impact', score: 5.0, reasoning: 'Infrastructure cost reduction initiative on track to save $500K annually. Zero downtime during Q4 migration.' },
      { name: 'Growth', score: 4.8, reasoning: '92% learning path completion. Actively expanding into ML infrastructure domain.' },
    ],
    strengths: [
      'World-class infrastructure engineering and system design',
      'Significant cost optimization impact ($500K projected savings)',
      'Technical mentorship that elevates entire engineering org',
      'Reliable delivery with zero-downtime track record',
    ],
    improvements: [
      'Could increase visibility of infrastructure wins to broader organization',
      'Consider more active participation in hiring and interview process',
      'Develop written communication for broader technical influence (blog posts, RFCs)',
    ],
    summary: 'James continues to be one of our strongest technical contributors. His infrastructure cost reduction initiative alone justifies his impact rating. He combines deep technical expertise with strong mentorship, making the entire engineering team stronger. Growth areas include increasing organizational visibility and written communication.',
    dataSources: {
      meetingNotes: 15,
      kpiProgress: '3/4 KPIs on track',
      contributions: '62 tickets closed, 5 epics contributed to',
      interviews: 12,
      peerFeedback: 7,
      learningProgress: '92% path completed',
    },
  },
];

// Mock Meeting Notes
export const meetingNotes: MeetingNote[] = [
  {
    id: 'note-001',
    employeeId: 'emp-001',
    employeeName: 'Sarah Chen',
    date: '2024-01-29',
    attendees: ['Sarah Chen', 'Michael Torres'],
    template: 'weekly-checkin',
    topics: ['v2.0 launch timeline', 'Team capacity planning', 'Q1 KPI review'],
    actionItems: [
      { text: 'Finalize v2.0 feature list by Friday', done: true },
      { text: 'Schedule design review for new onboarding flow', done: false },
      { text: 'Update Q1 KPI tracking dashboard', done: false },
    ],
    sentiment: 'positive',
  },
  {
    id: 'note-002',
    employeeId: 'emp-002',
    employeeName: 'James Wilson',
    date: '2024-01-28',
    attendees: ['James Wilson', 'Emily Rodriguez'],
    template: 'monthly-review',
    topics: ['Infrastructure cost reduction progress', 'ML platform roadmap', 'Team hiring'],
    actionItems: [
      { text: 'Complete cost analysis report', done: true },
      { text: 'Interview 2 ML engineer candidates', done: true },
      { text: 'Draft RFC for new caching layer', done: false },
    ],
    sentiment: 'positive',
  },
  {
    id: 'note-003',
    employeeId: 'emp-004',
    employeeName: 'Marcus Johnson',
    date: '2024-01-27',
    attendees: ['Marcus Johnson', 'Emily Rodriguez'],
    template: 'career-discussion',
    topics: ['Frontend team growth', 'Hiring challenges', 'Career development goals'],
    actionItems: [
      { text: 'Revise job description for senior role', done: false },
      { text: 'Set up mentorship program kickoff', done: false },
      { text: 'Complete leadership training module', done: true },
    ],
    sentiment: 'concerned',
  },
  {
    id: 'note-004',
    employeeId: 'emp-003',
    employeeName: 'Priya Sharma',
    date: '2024-01-26',
    attendees: ['Priya Sharma', 'David Kim'],
    template: 'weekly-checkin',
    topics: ['Design system progress', 'Component library updates', 'Accessibility audit'],
    actionItems: [
      { text: 'Complete button component variants', done: true },
      { text: 'Run accessibility audit on new components', done: false },
    ],
    sentiment: 'positive',
  },
];

// Mock eNPS Surveys
export const enpsSurveys: ENPSSurvey[] = [
  {
    id: 'enps-001',
    title: 'Q1 2024 Employee Pulse',
    status: 'completed',
    frequency: 'quarterly',
    responses: 210,
    totalEmployees: 248,
    score: 42,
    date: '2024-01-15',
    departmentScores: [
      { department: 'Engineering', score: 48 },
      { department: 'Product', score: 45 },
      { department: 'Design', score: 52 },
      { department: 'Sales', score: 35 },
      { department: 'People', score: 55 },
    ],
  },
  {
    id: 'enps-002',
    title: 'Q4 2023 Employee Pulse',
    status: 'completed',
    frequency: 'quarterly',
    responses: 195,
    totalEmployees: 240,
    score: 38,
    date: '2023-10-15',
    departmentScores: [
      { department: 'Engineering', score: 42 },
      { department: 'Product', score: 40 },
      { department: 'Design', score: 48 },
      { department: 'Sales', score: 30 },
      { department: 'People', score: 50 },
    ],
  },
  {
    id: 'enps-003',
    title: 'February 2024 Monthly Pulse',
    status: 'active',
    frequency: 'monthly',
    responses: 156,
    totalEmployees: 248,
    score: 45,
    date: '2024-02-01',
    departmentScores: [
      { department: 'Engineering', score: 50 },
      { department: 'Product', score: 47 },
      { department: 'Design', score: 55 },
      { department: 'Sales', score: 38 },
      { department: 'People', score: 58 },
    ],
  },
];

// Mock Documents
export const documents: Document[] = [
  {
    id: 'doc-001',
    title: 'Employee Handbook 2024',
    category: 'handbook',
    description: 'Comprehensive guide to company policies, benefits, and culture',
    lastUpdated: '2024-01-15',
    author: 'People Team',
    views: 342,
  },
  {
    id: 'doc-002',
    title: 'Remote Work Policy',
    category: 'policy',
    description: 'Guidelines for remote and hybrid work arrangements',
    lastUpdated: '2024-01-20',
    author: 'HR Team',
    views: 256,
  },
  {
    id: 'doc-003',
    title: 'Engineering Ladder Framework',
    category: 'handbook',
    description: 'Career levels and expectations for engineering roles',
    lastUpdated: '2023-12-10',
    author: 'Engineering Leadership',
    views: 189,
  },
  {
    id: 'doc-004',
    title: 'PTO & Leave Policy',
    category: 'policy',
    description: 'Vacation, sick leave, and parental leave guidelines',
    lastUpdated: '2024-01-05',
    author: 'People Team',
    views: 423,
  },
  {
    id: 'doc-005',
    title: 'Offer Letter Template',
    category: 'template',
    description: 'Standard offer letter template for new hires',
    lastUpdated: '2024-01-25',
    author: 'Recruiting',
    views: 87,
  },
  {
    id: 'doc-006',
    title: 'Q1 2024 All Hands',
    category: 'presentation',
    description: 'Company-wide presentation slides from Q1 All Hands',
    lastUpdated: '2024-01-28',
    author: 'Leadership Team',
    views: 512,
  },
];

// Mock Learning Paths
export const learningPaths: LearningPath[] = [
  {
    id: 'learn-001',
    title: 'Engineering Leadership',
    description: 'Path to becoming an engineering manager',
    role: 'Engineering Manager',
    duration: '12 weeks',
    modules: 8,
    progress: 45,
    skills: ['Leadership', 'Communication', 'Project Management', 'Mentoring'],
  },
  {
    id: 'learn-002',
    title: 'Advanced Product Management',
    description: 'Master product strategy and execution',
    role: 'Senior Product Manager',
    duration: '8 weeks',
    modules: 6,
    progress: 78,
    skills: ['Strategy', 'Analytics', 'Stakeholder Management', 'Roadmapping'],
  },
  {
    id: 'learn-003',
    title: 'Design Systems Mastery',
    description: 'Build and maintain enterprise design systems',
    role: 'Senior Designer',
    duration: '6 weeks',
    modules: 5,
    progress: 92,
    skills: ['Design Systems', 'Documentation', 'Component Design', 'Accessibility'],
  },
  {
    id: 'learn-004',
    title: 'ML Engineering Fundamentals',
    description: 'Foundation course for ML engineers',
    role: 'ML Engineer',
    duration: '10 weeks',
    modules: 8,
    progress: 25,
    skills: ['Python', 'TensorFlow', 'Data Pipeline', 'Model Deployment'],
  },
];

// Mock Approvals
export const approvals: Approval[] = [
  {
    id: 'appr-001',
    type: 'offer',
    title: 'Offer: Alexandra Foster - Senior Frontend Engineer',
    requestedBy: 'Marcus Johnson',
    requestedDate: '2024-01-28',
    status: 'pending',
    priority: 'high',
  },
  {
    id: 'appr-002',
    type: 'policy',
    title: 'Update: Travel Expense Policy',
    requestedBy: 'Finance Team',
    requestedDate: '2024-01-25',
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 'appr-003',
    type: 'role-change',
    title: 'Promotion: Kevin Park to Senior Data Scientist',
    requestedBy: 'James Wilson',
    requestedDate: '2024-01-27',
    status: 'pending',
    priority: 'medium',
  },
];

// Dashboard Stats
export const dashboardStats = {
  totalEmployees: 248,
  openRoles: 12,
  activeOffers: 3,
  pendingReviews: 45,
  performanceCycleProgress: 68,
  learningEngagement: 82,
  avgTimeToHire: 28,
  attritionRate: 8.2,
};

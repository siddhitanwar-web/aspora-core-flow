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

export interface Goal {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  type: 'individual' | 'team' | 'company';
  progress: number;
  dueDate: string;
  status: 'on-track' | 'at-risk' | 'completed' | 'overdue';
}

export interface Review {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewerId: string;
  reviewerName: string;
  cycle: string;
  status: 'pending' | 'self-review' | 'manager-review' | 'calibration' | 'completed';
  rating?: number;
  dueDate: string;
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

// Mock Goals
export const goals: Goal[] = [
  {
    id: 'goal-001',
    employeeId: 'emp-001',
    title: 'Launch v2.0 Platform Features',
    description: 'Successfully launch all planned features for v2.0 release',
    type: 'individual',
    progress: 72,
    dueDate: '2024-03-31',
    status: 'on-track',
  },
  {
    id: 'goal-002',
    employeeId: 'emp-002',
    title: 'Reduce Infrastructure Costs by 20%',
    description: 'Optimize cloud infrastructure to reduce monthly costs',
    type: 'team',
    progress: 45,
    dueDate: '2024-06-30',
    status: 'on-track',
  },
  {
    id: 'goal-003',
    employeeId: 'emp-003',
    title: 'Design System Documentation',
    description: 'Complete comprehensive documentation for design system',
    type: 'individual',
    progress: 90,
    dueDate: '2024-02-28',
    status: 'on-track',
  },
  {
    id: 'goal-004',
    employeeId: 'emp-004',
    title: 'Team Growth & Development',
    description: 'Hire 3 engineers and establish mentorship program',
    type: 'team',
    progress: 33,
    dueDate: '2024-04-30',
    status: 'at-risk',
  },
];

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
    dueDate: '2024-02-15',
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

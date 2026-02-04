// Pre-onboarding and Document Collection Data

export interface OnboardingDocument {
  id: string;
  name: string;
  category: 'identity' | 'tax' | 'banking' | 'compliance' | 'personal';
  required: boolean;
  description: string;
  status: 'pending' | 'submitted' | 'verified' | 'rejected';
  submittedDate?: string;
  verifiedDate?: string;
  fileUrl?: string;
}

export interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  category: 'documents' | 'setup' | 'training' | 'team';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: string;
  completedDate?: string;
  assignee?: string;
}

export interface PreOnboardingCandidate {
  id: string;
  candidateId: string;
  name: string;
  email: string;
  role: string;
  department: string;
  team: string;
  manager: string;
  startDate: string;
  offerAcceptedDate: string;
  avatar: string;
  documents: OnboardingDocument[];
  tasks: OnboardingTask[];
  welcomeMessageSent: boolean;
  equipmentOrdered: boolean;
  accountsCreated: boolean;
}

// Required documents for pre-onboarding
export const requiredDocuments: Omit<OnboardingDocument, 'id' | 'status' | 'submittedDate' | 'verifiedDate' | 'fileUrl'>[] = [
  {
    name: 'Government ID',
    category: 'identity',
    required: true,
    description: 'Valid passport, driver\'s license, or national ID card',
  },
  {
    name: 'Proof of Address',
    category: 'identity',
    required: true,
    description: 'Utility bill or bank statement from the last 3 months',
  },
  {
    name: 'W-4 Tax Form',
    category: 'tax',
    required: true,
    description: 'Federal tax withholding form',
  },
  {
    name: 'I-9 Employment Eligibility',
    category: 'compliance',
    required: true,
    description: 'Employment eligibility verification form',
  },
  {
    name: 'Direct Deposit Form',
    category: 'banking',
    required: true,
    description: 'Bank account details for salary deposit',
  },
  {
    name: 'Emergency Contact Form',
    category: 'personal',
    required: true,
    description: 'Emergency contact information',
  },
  {
    name: 'Background Check Consent',
    category: 'compliance',
    required: true,
    description: 'Authorization for background verification',
  },
  {
    name: 'NDA & Confidentiality Agreement',
    category: 'compliance',
    required: true,
    description: 'Non-disclosure and confidentiality agreement',
  },
  {
    name: 'Benefits Enrollment Form',
    category: 'personal',
    required: false,
    description: 'Health insurance and benefits selection',
  },
  {
    name: 'Work Authorization',
    category: 'compliance',
    required: false,
    description: 'Visa or work permit documentation if applicable',
  },
];

// Pre-onboarding tasks template
export const onboardingTaskTemplates: Omit<OnboardingTask, 'id' | 'status' | 'completedDate'>[] = [
  {
    title: 'Submit required documents',
    description: 'Upload all required documentation for verification',
    category: 'documents',
    dueDate: '5 days before start',
  },
  {
    title: 'Complete background check',
    description: 'Background verification process',
    category: 'documents',
    assignee: 'HR Team',
  },
  {
    title: 'Set up company email',
    description: 'Create corporate email and workspace accounts',
    category: 'setup',
    assignee: 'IT Team',
  },
  {
    title: 'Order equipment',
    description: 'Laptop, monitor, and other required equipment',
    category: 'setup',
    assignee: 'IT Team',
  },
  {
    title: 'Schedule orientation',
    description: 'Book first week orientation sessions',
    category: 'training',
    assignee: 'HR Team',
  },
  {
    title: 'Team introduction',
    description: 'Send introduction email to the team',
    category: 'team',
    assignee: 'Manager',
  },
  {
    title: 'Assign buddy',
    description: 'Pair with a team member for onboarding support',
    category: 'team',
    assignee: 'Manager',
  },
  {
    title: 'Prepare workspace',
    description: 'Set up desk/workspace and access cards',
    category: 'setup',
    assignee: 'Facilities',
  },
];

// Mock pre-onboarding candidates
export const preOnboardingCandidates: PreOnboardingCandidate[] = [
  {
    id: 'preonboard-001',
    candidateId: 'cand-001',
    name: 'Alexandra Foster',
    email: 'alex.foster@email.com',
    role: 'Senior Frontend Engineer',
    department: 'Engineering',
    team: 'Frontend',
    manager: 'Marcus Johnson',
    startDate: '2024-03-01',
    offerAcceptedDate: '2024-01-30',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    welcomeMessageSent: true,
    equipmentOrdered: true,
    accountsCreated: false,
    documents: [
      { id: 'doc-001', name: 'Government ID', category: 'identity', required: true, description: 'Valid passport', status: 'verified', submittedDate: '2024-02-01', verifiedDate: '2024-02-02' },
      { id: 'doc-002', name: 'Proof of Address', category: 'identity', required: true, description: 'Utility bill', status: 'verified', submittedDate: '2024-02-01', verifiedDate: '2024-02-02' },
      { id: 'doc-003', name: 'W-4 Tax Form', category: 'tax', required: true, description: 'Federal tax form', status: 'submitted', submittedDate: '2024-02-05' },
      { id: 'doc-004', name: 'I-9 Employment Eligibility', category: 'compliance', required: true, description: 'Eligibility verification', status: 'submitted', submittedDate: '2024-02-05' },
      { id: 'doc-005', name: 'Direct Deposit Form', category: 'banking', required: true, description: 'Bank details', status: 'pending' },
      { id: 'doc-006', name: 'Emergency Contact Form', category: 'personal', required: true, description: 'Emergency contacts', status: 'pending' },
      { id: 'doc-007', name: 'Background Check Consent', category: 'compliance', required: true, description: 'Background check authorization', status: 'verified', submittedDate: '2024-02-01', verifiedDate: '2024-02-03' },
      { id: 'doc-008', name: 'NDA & Confidentiality Agreement', category: 'compliance', required: true, description: 'NDA', status: 'verified', submittedDate: '2024-02-01', verifiedDate: '2024-02-01' },
    ],
    tasks: [
      { id: 'task-001', title: 'Submit required documents', description: 'Upload all required documentation', category: 'documents', status: 'in-progress' },
      { id: 'task-002', title: 'Complete background check', description: 'Background verification', category: 'documents', status: 'completed', completedDate: '2024-02-03' },
      { id: 'task-003', title: 'Set up company email', description: 'Create corporate email', category: 'setup', status: 'pending', assignee: 'IT Team' },
      { id: 'task-004', title: 'Order equipment', description: 'Laptop and monitor', category: 'setup', status: 'completed', completedDate: '2024-02-04', assignee: 'IT Team' },
      { id: 'task-005', title: 'Schedule orientation', description: 'Book orientation sessions', category: 'training', status: 'pending', assignee: 'HR Team' },
    ],
  },
  {
    id: 'preonboard-002',
    candidateId: 'cand-006',
    name: 'Michael Zhang',
    email: 'michael.zhang@email.com',
    role: 'Product Designer',
    department: 'Design',
    team: 'Product Design',
    manager: 'David Kim',
    startDate: '2024-03-15',
    offerAcceptedDate: '2024-02-10',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    welcomeMessageSent: true,
    equipmentOrdered: false,
    accountsCreated: false,
    documents: [
      { id: 'doc-101', name: 'Government ID', category: 'identity', required: true, description: 'Valid passport', status: 'pending' },
      { id: 'doc-102', name: 'Proof of Address', category: 'identity', required: true, description: 'Utility bill', status: 'pending' },
      { id: 'doc-103', name: 'W-4 Tax Form', category: 'tax', required: true, description: 'Federal tax form', status: 'pending' },
      { id: 'doc-104', name: 'I-9 Employment Eligibility', category: 'compliance', required: true, description: 'Eligibility verification', status: 'pending' },
      { id: 'doc-105', name: 'Direct Deposit Form', category: 'banking', required: true, description: 'Bank details', status: 'pending' },
      { id: 'doc-106', name: 'Emergency Contact Form', category: 'personal', required: true, description: 'Emergency contacts', status: 'pending' },
      { id: 'doc-107', name: 'Background Check Consent', category: 'compliance', required: true, description: 'Background check authorization', status: 'submitted', submittedDate: '2024-02-12' },
      { id: 'doc-108', name: 'NDA & Confidentiality Agreement', category: 'compliance', required: true, description: 'NDA', status: 'pending' },
    ],
    tasks: [
      { id: 'task-101', title: 'Submit required documents', description: 'Upload all required documentation', category: 'documents', status: 'pending' },
      { id: 'task-102', title: 'Complete background check', description: 'Background verification', category: 'documents', status: 'in-progress' },
      { id: 'task-103', title: 'Set up company email', description: 'Create corporate email', category: 'setup', status: 'pending', assignee: 'IT Team' },
      { id: 'task-104', title: 'Order equipment', description: 'Laptop and monitor', category: 'setup', status: 'pending', assignee: 'IT Team' },
    ],
  },
];

// Employee document types (for active employees)
export interface EmployeeDocument {
  id: string;
  name: string;
  category: 'onboarding' | 'performance' | 'compensation' | 'training' | 'personal' | 'compliance';
  uploadDate: string;
  expiryDate?: string;
  status: 'active' | 'expired' | 'pending-renewal';
  fileUrl?: string;
  addedBy: string;
}

// Mock employee documents
export const employeeDocuments: Record<string, EmployeeDocument[]> = {
  'emp-001': [
    { id: 'edoc-001', name: 'Offer Letter', category: 'onboarding', uploadDate: '2022-03-01', status: 'active', addedBy: 'HR Team' },
    { id: 'edoc-002', name: 'Employment Contract', category: 'onboarding', uploadDate: '2022-03-15', status: 'active', addedBy: 'HR Team' },
    { id: 'edoc-003', name: 'Government ID', category: 'compliance', uploadDate: '2022-03-10', expiryDate: '2027-03-10', status: 'active', addedBy: 'Sarah Chen' },
    { id: 'edoc-004', name: 'W-4 Tax Form', category: 'compliance', uploadDate: '2022-03-10', status: 'active', addedBy: 'Sarah Chen' },
    { id: 'edoc-005', name: 'Performance Review Q4 2023', category: 'performance', uploadDate: '2024-01-15', status: 'active', addedBy: 'Michael Torres' },
    { id: 'edoc-006', name: 'Compensation Change Letter', category: 'compensation', uploadDate: '2024-01-20', status: 'active', addedBy: 'HR Team' },
    { id: 'edoc-007', name: 'Product Management Certificate', category: 'training', uploadDate: '2023-09-15', status: 'active', addedBy: 'Sarah Chen' },
    { id: 'edoc-008', name: 'NDA Agreement', category: 'compliance', uploadDate: '2022-03-15', status: 'active', addedBy: 'Legal Team' },
  ],
  'emp-002': [
    { id: 'edoc-101', name: 'Offer Letter', category: 'onboarding', uploadDate: '2021-07-15', status: 'active', addedBy: 'HR Team' },
    { id: 'edoc-102', name: 'Employment Contract', category: 'onboarding', uploadDate: '2021-08-01', status: 'active', addedBy: 'HR Team' },
    { id: 'edoc-103', name: 'Government ID', category: 'compliance', uploadDate: '2021-07-20', expiryDate: '2026-07-20', status: 'active', addedBy: 'James Wilson' },
    { id: 'edoc-104', name: 'Performance Review Q4 2023', category: 'performance', uploadDate: '2024-01-12', status: 'active', addedBy: 'Emily Rodriguez' },
    { id: 'edoc-105', name: 'AWS Solutions Architect Cert', category: 'training', uploadDate: '2023-06-20', expiryDate: '2026-06-20', status: 'active', addedBy: 'James Wilson' },
    { id: 'edoc-106', name: 'Patent Agreement', category: 'compliance', uploadDate: '2021-08-01', status: 'active', addedBy: 'Legal Team' },
  ],
  'emp-003': [
    { id: 'edoc-201', name: 'Offer Letter', category: 'onboarding', uploadDate: '2023-01-05', status: 'active', addedBy: 'HR Team' },
    { id: 'edoc-202', name: 'Employment Contract', category: 'onboarding', uploadDate: '2023-01-10', status: 'active', addedBy: 'HR Team' },
    { id: 'edoc-203', name: 'Government ID', category: 'compliance', uploadDate: '2023-01-08', expiryDate: '2028-01-08', status: 'active', addedBy: 'Priya Sharma' },
    { id: 'edoc-204', name: 'Design Portfolio', category: 'training', uploadDate: '2023-01-05', status: 'active', addedBy: 'Priya Sharma' },
  ],
};

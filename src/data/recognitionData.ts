export interface RecognitionEntry {
  id: string;
  giverId: string;
  giverName: string;
  giverAvatar: string;
  receiverId: string;
  receiverName: string;
  receiverAvatar: string;
  value: string;
  message: string;
  date: string;
  department: string;
}

export interface EmployeeForest {
  id: string;
  name: string;
  avatar: string;
  department: string;
  team: string;
  leavesReceived: number;
  leavesGiven: number;
  treeLevel: 'seedling' | 'sapling' | 'young' | 'mature' | 'ancient';
}

export const coreValues = [
  { name: 'Customer Impact', emoji: '🎯', description: 'Delivering value that customers love', count: 47, color: 'bg-blue-500' },
  { name: 'Velocity & Ownership', emoji: '🚀', description: 'Moving fast and taking full ownership', count: 38, color: 'bg-purple-500' },
  { name: 'Deep Expertise', emoji: '🧠', description: 'Building world-class domain knowledge', count: 32, color: 'bg-indigo-500' },
  { name: 'Ambition & Quality', emoji: '💎', description: 'Setting high bars and exceeding them', count: 29, color: 'bg-pink-500' },
  { name: 'Collaboration', emoji: '🤝', description: 'Winning together as one team', count: 44, color: 'bg-teal-500' },
  { name: 'Radical Honesty', emoji: '💬', description: 'Being direct, transparent, and kind', count: 25, color: 'bg-amber-500' },
];

export const employeeForest: EmployeeForest[] = [
  { id: 'emp-001', name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face', department: 'Product', team: 'Core Platform', leavesReceived: 24, leavesGiven: 18, treeLevel: 'mature' },
  { id: 'emp-002', name: 'James Wilson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', department: 'Engineering', team: 'Infrastructure', leavesReceived: 31, leavesGiven: 22, treeLevel: 'ancient' },
  { id: 'emp-003', name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', department: 'Design', team: 'Product Design', leavesReceived: 19, leavesGiven: 15, treeLevel: 'young' },
  { id: 'emp-004', name: 'Marcus Johnson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', department: 'Engineering', team: 'Frontend', leavesReceived: 27, leavesGiven: 30, treeLevel: 'mature' },
  { id: 'emp-005', name: 'Ana Martinez', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face', department: 'People', team: 'HR', leavesReceived: 15, leavesGiven: 28, treeLevel: 'young' },
  { id: 'emp-006', name: 'Kevin Park', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face', department: 'Engineering', team: 'ML Platform', leavesReceived: 8, leavesGiven: 5, treeLevel: 'seedling' },
];

export const recognitionTrend = [
  { month: 'Aug', count: 28 },
  { month: 'Sep', count: 35 },
  { month: 'Oct', count: 42 },
  { month: 'Nov', count: 38 },
  { month: 'Dec', count: 31 },
  { month: 'Jan', count: 45 },
  { month: 'Feb', count: 52 },
];

export const teamInsights = [
  { team: 'Engineering', given: 45, received: 52 },
  { team: 'Product', given: 28, received: 24 },
  { team: 'Design', given: 19, received: 22 },
  { team: 'People', given: 32, received: 18 },
  { team: 'Sales', given: 12, received: 15 },
];

export const leaderboardGivers = [
  { rank: 1, name: 'Ana Martinez', email: 'ana.martinez@aspora.io', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face', count: 30, department: 'People' },
  { rank: 2, name: 'Marcus Johnson', email: 'marcus.johnson@aspora.io', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', count: 28, department: 'Engineering' },
  { rank: 3, name: 'James Wilson', email: 'james.wilson@aspora.io', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', count: 22, department: 'Engineering' },
  { rank: 4, name: 'Sarah Chen', email: 'sarah.chen@aspora.io', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face', count: 18, department: 'Product' },
  { rank: 5, name: 'Priya Sharma', email: 'priya.sharma@aspora.io', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', count: 15, department: 'Design' },
];

export const leaderboardReceivers = [
  { rank: 1, name: 'James Wilson', email: 'james.wilson@aspora.io', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', count: 31, department: 'Engineering' },
  { rank: 2, name: 'Marcus Johnson', email: 'marcus.johnson@aspora.io', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', count: 27, department: 'Engineering' },
  { rank: 3, name: 'Sarah Chen', email: 'sarah.chen@aspora.io', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face', count: 24, department: 'Product' },
  { rank: 4, name: 'Priya Sharma', email: 'priya.sharma@aspora.io', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', count: 19, department: 'Design' },
  { rank: 5, name: 'Ana Martinez', email: 'ana.martinez@aspora.io', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face', count: 15, department: 'People' },
];

export const flaggedPairs = [
  { pair: 'Marcus Johnson ↔ James Wilson', exchanges: 5, period: 'Last 6 weeks', status: 'flagged' },
  { pair: 'Sarah Chen ↔ Ana Martinez', exchanges: 4, period: 'Last 8 weeks', status: 'monitoring' },
];

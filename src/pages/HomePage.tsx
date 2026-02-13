import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users,
  Briefcase,
  Target,
  GraduationCap,
  Plus,
  FileText,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Leaf,
  Calendar,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ProgressBar } from '@/components/common/ProgressBar';
import { dashboardStats, roles, kpis, reviews, approvals } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const quickActions = [
  { name: 'Create Offer', icon: FileText, href: '/hiring', color: 'primary' },
  { name: 'Add Role', icon: Plus, href: '/hiring', color: 'accent' },
  { name: 'Generate Doc', icon: FileText, href: '/knowledge', color: 'primary' },
  { name: 'Ask Gene', icon: Sparkles, href: '/gene', color: 'accent' },
];

const recentRecognitions = [
  { giver: 'Marcus Johnson', receiver: 'Priya Sharma', value: 'Collaboration', time: '3 hours ago' },
  { giver: 'Ana Martinez', receiver: 'James Wilson', value: 'Deep Expertise', time: '1 day ago' },
  { giver: 'Sarah Chen', receiver: 'Kevin Park', value: 'Velocity & Ownership', time: '2 days ago' },
];

export default function HomePage() {
  const { toast } = useToast();
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const recentActivity = [
    { type: 'offer', message: 'Offer sent to Alexandra Foster', time: '2 hours ago', icon: FileText, href: '/hiring' },
    { type: 'hire', message: 'Kevin Park completed onboarding', time: '5 hours ago', icon: CheckCircle2, href: '/employees/emp-006' },
    { type: 'review', message: 'Q1 2024 review cycle started', time: '1 day ago', icon: Target, href: '/performance' },
    { type: 'approval', message: 'Travel policy update approved', time: '2 days ago', icon: CheckCircle2, href: '/governance' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Greeting */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Welcome back, Sarah 👋</h1>
        <p className="text-muted-foreground mt-1">{dateStr} • Aspora OS</p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action) => (
          <motion.div key={action.name} variants={item}>
            <Link to={action.href}>
              <div className="aspora-card-hover flex items-center gap-3 cursor-pointer group">
                <div className={`p-2.5 rounded-lg ${action.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">{action.name}</span>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* My Quick Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="aspora-card mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">My Quick Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/employees/emp-001" className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Leave Balance</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">14 days</p>
            <p className="text-xs text-muted-foreground mt-1">8 casual • 6 earned</p>
          </Link>
          <Link to="/performance" className="p-4 rounded-lg bg-warning/5 border border-warning/10 hover:border-warning/30 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-warning" />
              <span className="text-xs text-muted-foreground">Pending Reviews</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">2</p>
            <p className="text-xs text-muted-foreground mt-1">Due Feb 15, 2024</p>
          </Link>
          <Link to="/performance" className="p-4 rounded-lg bg-accent/5 border border-accent/10 hover:border-accent/30 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">KPI Progress</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">72%</p>
            <p className="text-xs text-muted-foreground mt-1">1 KPI on track</p>
          </Link>
          <Link to="/performance" className="p-4 rounded-lg bg-success/5 border border-success/10 hover:border-success/30 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-success" />
              <span className="text-xs text-muted-foreground">Upcoming 1:1s</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">1</p>
            <p className="text-xs text-muted-foreground mt-1">Tomorrow @ 2pm</p>
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link to="/hiring"><StatCard title="Open Roles" value={dashboardStats.openRoles} change={{ value: 8, positive: true }} icon={<Briefcase className="w-5 h-5" />} color="primary" /></Link>
        <Link to="/employees"><StatCard title="Total Employees" value={dashboardStats.totalEmployees} change={{ value: 3.2, positive: true }} icon={<Users className="w-5 h-5" />} color="accent" /></Link>
        <Link to="/performance"><StatCard title="Performance Cycle" value={`${dashboardStats.performanceCycleProgress}%`} icon={<Target className="w-5 h-5" />} color="success" /></Link>
        <Link to="/learning"><StatCard title="Learning Engagement" value={`${dashboardStats.learningEngagement}%`} icon={<GraduationCap className="w-5 h-5" />} color="warning" /></Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Hiring */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 aspora-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Active Hiring</h2>
            <Link to="/hiring"><Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">View all <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
          <div className="space-y-3">
            {roles.filter(r => r.status === 'open').slice(0, 4).map((role) => (
              <Link key={role.id} to={`/hiring/${role.id}`}>
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{role.title}</p>
                    <p className="text-sm text-muted-foreground">{role.department} • {role.location}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{role.candidates}</p>
                      <p className="text-xs text-muted-foreground">candidates</p>
                    </div>
                    <StatusBadge status={role.priority} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Pending Approvals */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="aspora-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Pending Approvals</h2>
            <Link to="/governance"><span className="aspora-badge-warning">{approvals.filter(a => a.status === 'pending').length}</span></Link>
          </div>
          <div className="space-y-3">
            {approvals.filter(a => a.status === 'pending').map((approval) => (
              <div key={approval.id} className="p-3 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground line-clamp-1">{approval.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{approval.requestedBy}</p>
                  </div>
                  <StatusBadge status={approval.priority} />
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" className="flex-1 h-8" onClick={() => toast({ title: "Approved", description: `"${approval.title}" has been approved.` })}>Approve</Button>
                  <Button size="sm" variant="outline" className="flex-1 h-8" asChild><Link to="/governance">Review</Link></Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Performance Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="aspora-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Performance Cycle</h2>
            <Link to="/performance"><Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">View all <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Q1 2024 Review Progress</span>
              <span className="text-sm font-medium text-foreground">68%</span>
            </div>
            <ProgressBar value={68} variant="primary" size="lg" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <p className="text-2xl font-semibold text-foreground">{reviews.filter(r => r.status === 'completed').length}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <p className="text-2xl font-semibold text-foreground">{reviews.filter(r => r.status === 'self-review' || r.status === 'manager-review').length}</p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <p className="text-2xl font-semibold text-foreground">{reviews.filter(r => r.status === 'pending').length}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </div>
        </motion.div>

        {/* Recognition Widget */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="aspora-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Leaf className="w-5 h-5 text-accent" /> Recognition
            </h2>
            <Link to="/recognition"><Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">View all <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
          <div className="space-y-3">
            {recentRecognitions.map((r, i) => (
              <div key={i} className="p-3 rounded-lg bg-accent/5 border border-accent/10">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-3 h-3 text-accent" />
                  <span className="text-xs font-medium text-accent">{r.value}</span>
                </div>
                <p className="text-sm text-foreground">
                  <span className="font-medium">{r.giver}</span>
                  <span className="text-muted-foreground"> → </span>
                  <span className="font-medium">{r.receiver}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{r.time}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="aspora-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <Link key={index} to={activity.href} className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-muted/50">
                  <activity.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground group-hover:text-primary transition-colors">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

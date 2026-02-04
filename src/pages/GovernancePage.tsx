import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Users,
  Key,
  History,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { approvals } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const auditLogs = [
  { action: 'Offer approved', user: 'Emily Rodriguez', target: 'Alexandra Foster - Senior FE', time: '2 hours ago', type: 'offer' },
  { action: 'Policy updated', user: 'HR Team', target: 'Remote Work Policy v2.1', time: '5 hours ago', type: 'policy' },
  { action: 'Access granted', user: 'IT Admin', target: 'Kevin Park - Engineering tools', time: '1 day ago', type: 'access' },
  { action: 'Role change approved', user: 'Michael Torres', target: 'Priya Sharma - Senior Designer', time: '2 days ago', type: 'role' },
  { action: 'Document created', user: 'People Team', target: 'Q1 2024 Benefits Update', time: '3 days ago', type: 'document' },
];

const accessRoles = [
  { name: 'Super Admin', users: 2, permissions: 'Full access to all modules and settings' },
  { name: 'HR Manager', users: 5, permissions: 'Manage employees, hiring, and performance' },
  { name: 'Hiring Manager', users: 12, permissions: 'Create roles, review candidates, make offers' },
  { name: 'Employee', users: 230, permissions: 'View profile, goals, and learning paths' },
  { name: 'Finance', users: 4, permissions: 'View compensation, approve budgets' },
];

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState('approvals');

  const pendingApprovals = approvals.filter(a => a.status === 'pending');

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Governance"
        description="Approvals, audit logs, and access control"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Pending Approvals"
          value={pendingApprovals.length}
          icon={<Clock className="w-5 h-5" />}
          color="warning"
        />
        <StatCard
          title="Approved This Week"
          value={12}
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="success"
        />
        <StatCard
          title="Access Roles"
          value={accessRoles.length}
          icon={<Key className="w-5 h-5" />}
          color="primary"
        />
        <StatCard
          title="Audit Events"
          value={156}
          icon={<History className="w-5 h-5" />}
          color="accent"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
        </TabsList>

        <TabsContent value="approvals">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {pendingApprovals.length === 0 ? (
              <div className="aspora-card text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">All caught up!</h3>
                <p className="text-muted-foreground">No pending approvals at the moment.</p>
              </div>
            ) : (
              pendingApprovals.map((approval) => (
                <motion.div key={approval.id} variants={item} className="aspora-card">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`p-2.5 rounded-lg ${
                        approval.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                        approval.priority === 'medium' ? 'bg-warning/10 text-warning' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {approval.type === 'offer' && <FileText className="w-5 h-5" />}
                        {approval.type === 'policy' && <Shield className="w-5 h-5" />}
                        {approval.type === 'role-change' && <Users className="w-5 h-5" />}
                        {approval.type === 'access' && <Key className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{approval.title}</h3>
                          <StatusBadge status={approval.priority} />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Requested by {approval.requestedBy} • {approval.requestedDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
                      <Button size="sm" className="gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="audit">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="aspora-card"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Action</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Target</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log, index) => (
                    <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <History className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium text-foreground">{log.action}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{log.user}</td>
                      <td className="py-3 px-4 text-sm text-foreground">{log.target}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="access">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {accessRoles.map((role) => (
              <motion.div key={role.name} variants={item}>
                <div className="aspora-card-hover">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-foreground">{role.name}</h3>
                      <p className="text-sm text-muted-foreground">{role.permissions}</p>
                    </div>
                    <span className="aspora-badge-primary">{role.users} users</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Role
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

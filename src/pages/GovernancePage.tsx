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
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { approvals } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
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

const approvalHistory = [
  { title: 'Offer: Ryan Mitchell - ML Engineer', action: 'Approved', by: 'James Wilson', date: 'Jan 20, 2024', time: '10:34 AM' },
  { title: 'Remote Work Policy v2.0', action: 'Approved', by: 'Rachel Green', date: 'Jan 18, 2024', time: '3:15 PM' },
  { title: 'Budget: Q1 Engineering Tools', action: 'Rejected', by: 'Finance Team', date: 'Jan 15, 2024', time: '11:00 AM' },
  { title: 'Transfer: Ana Martinez to Product', action: 'Approved', by: 'Michael Torres', date: 'Jan 12, 2024', time: '2:45 PM' },
];

const policyVersions = [
  { name: 'Remote Work Policy', version: 'v2.1', status: 'active', acknowledged: '92%', updated: 'Jan 20, 2024' },
  { name: 'Code of Conduct', version: 'v3.0', status: 'active', acknowledged: '98%', updated: 'Dec 1, 2023' },
  { name: 'Travel & Expenses', version: 'v1.4', status: 'under review', acknowledged: '85%', updated: 'Jan 25, 2024' },
  { name: 'Data Privacy Policy', version: 'v2.0', status: 'active', acknowledged: '95%', updated: 'Nov 15, 2023' },
];

const complianceChecklists = [
  { name: 'New Hire Compliance', items: 8, completed: 6, status: 'in-progress' },
  { name: 'Annual Security Review', items: 12, completed: 12, status: 'complete' },
  { name: 'GDPR Data Audit', items: 10, completed: 4, status: 'in-progress' },
  { name: 'SOC 2 Requirements', items: 15, completed: 15, status: 'complete' },
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
  const [localApprovals, setLocalApprovals] = useState(approvals);
  const [showConfirm, setShowConfirm] = useState<{ id: string; action: 'approve' | 'reject' } | null>(null);
  const [reason, setReason] = useState('');
  const { toast } = useToast();

  const pendingApprovals = localApprovals.filter(a => a.status === 'pending');

  const handleAction = () => {
    if (!showConfirm) return;
    const action = showConfirm.action;
    setLocalApprovals(prev => prev.map(a => a.id === showConfirm.id ? { ...a, status: action === 'approve' ? 'approved' as const : 'rejected' as const } : a));
    toast({ title: action === 'approve' ? 'Approved' : 'Rejected', description: `The request has been ${action === 'approve' ? 'approved' : 'rejected'}.` });
    setShowConfirm(null);
    setReason('');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader title="Governance" description="Approvals, audit logs, and access control" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Pending Approvals" value={pendingApprovals.length} icon={<Clock className="w-5 h-5" />} color="warning" />
        <StatCard title="Approved This Week" value={12} icon={<CheckCircle2 className="w-5 h-5" />} color="success" />
        <StatCard title="Access Roles" value={accessRoles.length} icon={<Key className="w-5 h-5" />} color="primary" />
        <StatCard title="Audit Events" value={156} icon={<History className="w-5 h-5" />} color="accent" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="history">Approval History</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
        </TabsList>

        <TabsContent value="approvals">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
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
                      <div className={`p-2.5 rounded-lg ${approval.priority === 'high' ? 'bg-destructive/10 text-destructive' : approval.priority === 'medium' ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'}`}>
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
                        <p className="text-sm text-muted-foreground mt-1">Requested by {approval.requestedBy} • {approval.requestedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1" onClick={() => setShowConfirm({ id: approval.id, action: 'reject' })}>
                        <XCircle className="w-4 h-4" /> Reject
                      </Button>
                      <Button size="sm" className="gap-1" onClick={() => setShowConfirm({ id: approval.id, action: 'approve' })}>
                        <CheckCircle2 className="w-4 h-4" /> Approve
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="history">
          <div className="aspora-card">
            <h2 className="text-lg font-semibold text-foreground mb-4">Approval History</h2>
            <div className="space-y-3">
              {approvalHistory.map((h, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    {h.action === 'Approved' ? <CheckCircle2 className="w-4 h-4 text-success" /> : <XCircle className="w-4 h-4 text-destructive" />}
                    <div>
                      <p className="text-sm font-medium text-foreground">{h.title}</p>
                      <p className="text-xs text-muted-foreground">By {h.by}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-foreground">{h.date}</p>
                    <p className="text-xs text-muted-foreground">{h.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="policies">
          <div className="aspora-card">
            <h2 className="text-lg font-semibold text-foreground mb-4">Policy Versioning & Acknowledgment</h2>
            <div className="space-y-3">
              {policyVersions.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.version} • Updated {p.updated}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{p.acknowledged}</p>
                      <p className="text-xs text-muted-foreground">acknowledged</p>
                    </div>
                    <StatusBadge status={p.status === 'active' ? 'active' : 'pending'} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="compliance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complianceChecklists.map((cl, i) => (
              <div key={i} className="aspora-card">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-foreground">{cl.name}</h3>
                  <StatusBadge status={cl.status === 'complete' ? 'completed' : 'in-progress'} />
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">{cl.completed}/{cl.items} items</span>
                  <span className="font-medium text-foreground">{Math.round(cl.completed / cl.items * 100)}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${cl.status === 'complete' ? 'bg-success' : 'bg-primary'}`} style={{ width: `${cl.completed / cl.items * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audit">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="aspora-card">
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
                      <td className="py-3 px-4"><div className="flex items-center gap-2"><History className="w-4 h-4 text-muted-foreground" /><span className="font-medium text-foreground">{log.action}</span></div></td>
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
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Button variant="outline" size="sm" className="w-full" onClick={() => toast({ title: "Managing Role", description: `Editing permissions for ${role.name}.` })}>
                    Manage Role
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Confirm Dialog */}
      <Dialog open={!!showConfirm} onOpenChange={() => setShowConfirm(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{showConfirm?.action === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <p className="text-sm text-muted-foreground">
              {showConfirm?.action === 'approve' ? 'Are you sure you want to approve this request?' : 'Please provide a reason for rejection.'}
            </p>
            {showConfirm?.action === 'reject' && (
              <div>
                <Label>Reason</Label>
                <Textarea className="mt-1" value={reason} onChange={e => setReason(e.target.value)} placeholder="Enter reason..." rows={3} />
              </div>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowConfirm(null)}>Cancel</Button>
            <Button variant={showConfirm?.action === 'reject' ? 'destructive' : 'default'} onClick={handleAction}>
              {showConfirm?.action === 'approve' ? 'Approve' : 'Reject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

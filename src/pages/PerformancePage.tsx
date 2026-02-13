import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target,
  TrendingUp,
  Users,
  Clock,
  Plus,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Circle,
  Sparkles,
  MessageSquare,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ProgressBar } from '@/components/common/ProgressBar';
import { kpis, reviews, employees } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KPITab } from '@/components/performance/KPITab';
import { AIReviewTab } from '@/components/performance/AIReviewTab';
import { MeetingNotesTab } from '@/components/performance/MeetingNotesTab';
import { SurveysTab } from '@/components/performance/SurveysTab';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function PerformancePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateKPI, setShowCreateKPI] = useState(false);
  const [showStartCycle, setShowStartCycle] = useState(false);
  const { toast } = useToast();

  const cycleProgress = 68;
  const completedReviews = reviews.filter(r => r.status === 'completed').length;
  const inProgressReviews = reviews.filter(r => r.status === 'self-review' || r.status === 'manager-review').length;
  const pendingReviews = reviews.filter(r => r.status === 'pending').length;

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Performance"
        description="Track KPIs, reviews, and team performance"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => setShowCreateKPI(true)}>
              <Target className="w-4 h-4" />
              Create KPI
            </Button>
            <Button className="gap-2" onClick={() => setShowStartCycle(true)}>
              <Plus className="w-4 h-4" />
              Start Review Cycle
            </Button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Cycle Progress"
          value={`${cycleProgress}%`}
          icon={<TrendingUp className="w-5 h-5" />}
          color="primary"
        />
        <StatCard
          title="Reviews Completed"
          value={completedReviews}
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="success"
        />
        <StatCard
          title="In Progress"
          value={inProgressReviews}
          icon={<Clock className="w-5 h-5" />}
          color="warning"
        />
        <StatCard
          title="Pending"
          value={pendingReviews}
          icon={<Circle className="w-5 h-5" />}
          color="primary"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="kpis">KPIs & Goals</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="ai-reviews" className="gap-1">
            <Sparkles className="w-3 h-3" />
            AI Reviews
          </TabsTrigger>
          <TabsTrigger value="meeting-notes" className="gap-1">
            <MessageSquare className="w-3 h-3" />
            1:1 Notes
          </TabsTrigger>
          <TabsTrigger value="surveys" className="gap-1">
            <BarChart3 className="w-3 h-3" />
            Surveys
          </TabsTrigger>
          <TabsTrigger value="calibration">Calibration</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Cycle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 aspora-card"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Q1 2024 Review Cycle</h2>
                  <p className="text-sm text-muted-foreground">Due: February 15, 2024</p>
                </div>
                <StatusBadge status="in-progress" variant="warning" />
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Overall Progress</span>
                  <span className="text-sm font-medium text-foreground">{cycleProgress}%</span>
                </div>
                <ProgressBar value={cycleProgress} variant="primary" size="lg" />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-muted/30 text-center">
                  <p className="text-2xl font-semibold text-foreground">{reviews.length}</p>
                  <p className="text-xs text-muted-foreground">Total Reviews</p>
                </div>
                <div className="p-4 rounded-lg bg-success/10 text-center">
                  <p className="text-2xl font-semibold text-success">{completedReviews}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="p-4 rounded-lg bg-warning/10 text-center">
                  <p className="text-2xl font-semibold text-warning">{inProgressReviews}</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 text-center">
                  <p className="text-2xl font-semibold text-muted-foreground">{pendingReviews}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="aspora-card"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setActiveTab('kpis')}>
                  <Target className="w-4 h-4 text-primary" />
                  View KPIs & Goals
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setActiveTab('reviews')}>
                  <Users className="w-4 h-4 text-accent" />
                  Team Reviews
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setActiveTab('ai-reviews')}>
                  <Sparkles className="w-4 h-4 text-primary" />
                  AI Review Generator
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setActiveTab('surveys')}>
                  <BarChart3 className="w-4 h-4 text-accent" />
                  eNPS Surveys
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" asChild>
                  <Link to="/dashboards">
                    <TrendingUp className="w-4 h-4 text-success" />
                    Performance Reports
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* KPIs At Risk */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="aspora-card mt-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <h2 className="text-lg font-semibold text-foreground">KPIs At Risk</h2>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => setActiveTab('kpis')}>
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {kpis.filter(g => g.status === 'at-risk').map((kpi) => {
                const employee = employees.find(e => e.id === kpi.employeeId);
                return (
                  <div key={kpi.id} className="p-4 rounded-lg bg-warning/5 border border-warning/20">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {employee && (
                          <img src={employee.avatar} alt={employee.name} className="w-8 h-8 rounded-full object-cover" />
                        )}
                        <div>
                          <p className="font-medium text-foreground">{kpi.title}</p>
                          <p className="text-sm text-muted-foreground">{employee?.name} • Due {kpi.dueDate}</p>
                        </div>
                      </div>
                      <StatusBadge status={kpi.status} />
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{kpi.progress}%</span>
                      </div>
                      <ProgressBar value={kpi.progress} variant="warning" size="sm" />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="kpis">
          <KPITab />
        </TabsContent>

        <TabsContent value="reviews">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {reviews.map((review) => (
              <div key={review.id} className="aspora-card-hover">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">{review.employeeName}</h3>
                        <StatusBadge status={review.status} />
                        {review.aiStatus === 'ai-draft' && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-warning/10 text-warning font-medium">AI Draft</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {review.cycle} • Reviewer: {review.reviewerName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Due</p>
                      <p className="text-sm font-medium text-foreground">{review.dueDate}</p>
                    </div>
                    <Button size="sm" onClick={() => setActiveTab('ai-reviews')}>
                      {review.status === 'pending' ? 'Start' : 'Continue'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="ai-reviews">
          <AIReviewTab />
        </TabsContent>

        <TabsContent value="meeting-notes">
          <MeetingNotesTab />
        </TabsContent>

        <TabsContent value="surveys">
          <SurveysTab />
        </TabsContent>

        <TabsContent value="calibration">
          <div className="aspora-card">
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Calibration Not Started</h3>
              <p className="text-muted-foreground mb-6">
                Calibration sessions will be available once all reviews are completed.
              </p>
              <Button variant="outline">Learn About Calibration</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create KPI Dialog */}
      <Dialog open={showCreateKPI} onOpenChange={setShowCreateKPI}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New KPI</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label>KPI Title</Label>
              <Input className="mt-1" placeholder="e.g. Increase customer retention by 15%" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea className="mt-1" placeholder="Describe the KPI objective..." rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Metric Type</Label>
                <Select>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="currency">Currency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Target Value</Label>
                <Input className="mt-1" type="number" placeholder="100" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Weight (%)</Label>
                <Input className="mt-1" type="number" placeholder="25" />
              </div>
              <div>
                <Label>Due Date</Label>
                <Input className="mt-1" type="date" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Owner</Label>
                <Select>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select owner..." /></SelectTrigger>
                  <SelectContent>
                    {employees.map(emp => (
                      <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Type</Label>
                <Select>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowCreateKPI(false)}>Cancel</Button>
            <Button onClick={() => { setShowCreateKPI(false); toast({ title: "KPI Created", description: "New KPI has been created successfully." }); }}>
              Create KPI
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Start Review Cycle Dialog */}
      <Dialog open={showStartCycle} onOpenChange={setShowStartCycle}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Start Review Cycle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label>Cycle Name</Label>
              <Input className="mt-1" placeholder="e.g. Q2 2024 Performance Review" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input className="mt-1" type="date" />
              </div>
              <div>
                <Label>End Date</Label>
                <Input className="mt-1" type="date" />
              </div>
            </div>
            <div>
              <Label>Review Type</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="quarterly">Quarterly Review</SelectItem>
                  <SelectItem value="annual">Annual Review</SelectItem>
                  <SelectItem value="360">360° Review</SelectItem>
                  <SelectItem value="probation">Probation Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Participants</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select scope..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  <SelectItem value="engineering">Engineering Only</SelectItem>
                  <SelectItem value="product">Product Only</SelectItem>
                  <SelectItem value="design">Design Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Instructions</Label>
              <Textarea className="mt-1" placeholder="Optional instructions for reviewers..." rows={2} />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowStartCycle(false)}>Cancel</Button>
            <Button onClick={() => { setShowStartCycle(false); toast({ title: "Review Cycle Started", description: "New review cycle has been initiated." }); }}>
              Start Cycle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

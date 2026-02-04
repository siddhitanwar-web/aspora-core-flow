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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ProgressBar } from '@/components/common/ProgressBar';
import { goals, reviews, employees } from '@/data/mockData';
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

export default function PerformancePage() {
  const [activeTab, setActiveTab] = useState('overview');

  const cycleProgress = 68;
  const completedReviews = reviews.filter(r => r.status === 'completed').length;
  const inProgressReviews = reviews.filter(r => r.status === 'self-review' || r.status === 'manager-review').length;
  const pendingReviews = reviews.filter(r => r.status === 'pending').length;

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Performance"
        description="Track goals, reviews, and team performance"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Target className="w-4 h-4" />
              Create Goal
            </Button>
            <Button className="gap-2">
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
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals & OKRs</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
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
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  View My Goals
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="w-4 h-4 text-accent" />
                  Team Reviews
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  Performance Reports
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Goals At Risk */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="aspora-card mt-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <h2 className="text-lg font-semibold text-foreground">Goals At Risk</h2>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {goals.filter(g => g.status === 'at-risk').map((goal) => {
                const employee = employees.find(e => e.id === goal.employeeId);
                return (
                  <div key={goal.id} className="p-4 rounded-lg bg-warning/5 border border-warning/20">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {employee && (
                          <img
                            src={employee.avatar}
                            alt={employee.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-foreground">{goal.title}</p>
                          <p className="text-sm text-muted-foreground">{employee?.name} • Due {goal.dueDate}</p>
                        </div>
                      </div>
                      <StatusBadge status={goal.status} />
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{goal.progress}%</span>
                      </div>
                      <ProgressBar value={goal.progress} variant="warning" size="sm" />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="goals">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {goals.map((goal) => {
              const employee = employees.find(e => e.id === goal.employeeId);
              return (
                <motion.div key={goal.id} variants={item} className="aspora-card">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {employee && (
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{goal.title}</h3>
                          <StatusBadge status={goal.type} />
                          <StatusBadge status={goal.status} />
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{goal.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {employee?.name} • Due {goal.dueDate}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">{goal.progress}%</span>
                    </div>
                    <ProgressBar
                      value={goal.progress}
                      variant={goal.status === 'at-risk' ? 'warning' : goal.status === 'completed' ? 'success' : 'primary'}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </TabsContent>

        <TabsContent value="reviews">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {reviews.map((review) => (
              <motion.div key={review.id} variants={item} className="aspora-card-hover">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">{review.employeeName}</h3>
                        <StatusBadge status={review.status} />
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
                    <Button size="sm">
                      {review.status === 'pending' ? 'Start' : 'Continue'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
    </div>
  );
}

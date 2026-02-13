import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Users,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/common/StatCard';
import { ProgressBar } from '@/components/common/ProgressBar';
import { enpsSurveys } from '@/data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';

const trendData = [
  { quarter: 'Q2 2023', score: 32 },
  { quarter: 'Q3 2023', score: 35 },
  { quarter: 'Q4 2023', score: 38 },
  { quarter: 'Q1 2024', score: 42 },
  { quarter: 'Feb 2024', score: 45 },
];

const responseBreakdown = [
  { category: 'Promoters (9-10)', count: 105, pct: 50, color: 'hsl(152, 69%, 40%)' },
  { category: 'Passives (7-8)', count: 63, pct: 30, color: 'hsl(38, 92%, 50%)' },
  { category: 'Detractors (0-6)', count: 42, pct: 20, color: 'hsl(0, 72%, 51%)' },
];

const sentimentInsights = [
  { text: 'Employees appreciate the flexible work arrangements and trust-based culture', sentiment: 'positive' },
  { text: 'Strong desire for more career development opportunities and mentorship programs', sentiment: 'improvement' },
  { text: 'Cross-team collaboration is seen as a key company strength', sentiment: 'positive' },
  { text: 'Some concerns about workload distribution during peak project periods', sentiment: 'concern' },
];

export function SurveysTab() {
  const [showCreate, setShowCreate] = useState(false);
  const latestSurvey = enpsSurveys[0];
  const prevSurvey = enpsSurveys[1];
  const scoreDiff = latestSurvey.score - prevSurvey.score;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">eNPS & Pulse Surveys</h2>
          <p className="text-sm text-muted-foreground">Measure employee engagement and satisfaction</p>
        </div>
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Survey
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create eNPS Survey</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Survey Title</Label>
                <Input className="mt-1" placeholder="e.g., March 2024 Employee Pulse" />
              </div>
              <div>
                <Label>Frequency</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select frequency..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Launch Date</Label>
                <Input type="date" className="mt-1" />
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-sm font-medium text-foreground mb-2">Standard eNPS Question</p>
                <p className="text-sm text-muted-foreground italic">
                  "On a scale of 0-10, how likely are you to recommend Aspora as a great place to work?"
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  + AI-generated follow-up questions based on individual scores
                </p>
              </div>
              <Button className="w-full" onClick={() => setShowCreate(false)}>
                Launch Survey
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Current eNPS"
          value={latestSurvey.score}
          change={{ value: scoreDiff, positive: scoreDiff > 0 }}
          icon={<BarChart3 className="w-5 h-5" />}
          color="primary"
        />
        <StatCard
          title="Response Rate"
          value={`${Math.round((latestSurvey.responses / latestSurvey.totalEmployees) * 100)}%`}
          icon={<Users className="w-5 h-5" />}
          color="accent"
        />
        <StatCard
          title="Promoters"
          value={`${responseBreakdown[0].pct}%`}
          icon={<ThumbsUp className="w-5 h-5" />}
          color="success"
        />
        <StatCard
          title="Detractors"
          value={`${responseBreakdown[2].pct}%`}
          icon={<ThumbsDown className="w-5 h-5" />}
          color="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="aspora-card"
        >
          <h3 className="font-semibold text-foreground mb-4">eNPS Trend</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(243, 75%, 42%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(243, 75%, 42%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis dataKey="quarter" stroke="hsl(215, 16%, 47%)" fontSize={12} />
                <YAxis stroke="hsl(215, 16%, 47%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(0, 0%, 100%)',
                    border: '1px solid hsl(214, 20%, 90%)',
                    borderRadius: '8px',
                  }}
                />
                <Area type="monotone" dataKey="score" stroke="hsl(243, 75%, 42%)" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Response Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="aspora-card"
        >
          <h3 className="font-semibold text-foreground mb-4">Response Breakdown</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseBreakdown} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis type="number" stroke="hsl(215, 16%, 47%)" fontSize={12} />
                <YAxis dataKey="category" type="category" stroke="hsl(215, 16%, 47%)" fontSize={11} width={120} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(214, 20%, 90%)', borderRadius: '8px' }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {responseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Department Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="aspora-card"
      >
        <h3 className="font-semibold text-foreground mb-4">eNPS by Department</h3>
        <div className="space-y-3">
          {latestSurvey.departmentScores.map((dept) => (
            <div key={dept.department}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-foreground">{dept.department}</span>
                <span className="text-sm font-medium text-foreground">{dept.score}</span>
              </div>
              <ProgressBar
                value={Math.max(0, Math.min(100, dept.score + 30))}
                variant={dept.score >= 50 ? 'success' : dept.score >= 30 ? 'primary' : 'warning'}
                size="sm"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI Sentiment Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="aspora-card bg-gradient-to-br from-primary/5 to-accent/5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">AI Sentiment Analysis</h3>
        </div>
        <div className="space-y-3">
          {sentimentInsights.map((insight, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
              {insight.sentiment === 'positive' ? (
                <ThumbsUp className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
              ) : insight.sentiment === 'concern' ? (
                <ThumbsDown className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
              ) : (
                <TrendingUp className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm text-foreground">{insight.text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Past Surveys */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">All Surveys</h3>
        {enpsSurveys.map((survey) => (
          <div key={survey.id} className="aspora-card-hover cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{survey.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{survey.date}</span>
                    <span>{survey.responses}/{survey.totalEmployees} responses</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">{survey.score}</p>
                  <p className="text-xs text-muted-foreground">eNPS Score</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  survey.status === 'active' ? 'bg-success/10 text-success' :
                  survey.status === 'completed' ? 'bg-muted text-muted-foreground' :
                  'bg-primary/10 text-primary'
                }`}>
                  {survey.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

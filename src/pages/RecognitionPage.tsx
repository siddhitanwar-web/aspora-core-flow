import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Leaf,
  Search,
  ExternalLink,
  TreePine,
  Award,
  BarChart3,
  Shield,
  Heart,
  TrendingUp,
  Users,
  Calendar,
  Filter,
  Trophy,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProgressBar } from '@/components/common/ProgressBar';
import {
  employeeForest,
  coreValues,
  recognitionTrend,
  teamInsights,
  leaderboardGivers,
  leaderboardReceivers,
  flaggedPairs,
} from '@/data/recognitionData';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const treeLevelEmoji: Record<string, string> = {
  seedling: '🌱',
  sapling: '🌿',
  young: '🌳',
  mature: '🌲',
  ancient: '🏔️',
};

const rankBadge = (rank: number) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `#${rank}`;
};

export default function RecognitionPage() {
  const [activeTab, setActiveTab] = useState('forest');
  const [searchQuery, setSearchQuery] = useState('');
  const [leaderboardPeriod, setLeaderboardPeriod] = useState('all');

  const filteredForest = employeeForest.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalLeaves = employeeForest.reduce((sum, e) => sum + e.leavesReceived, 0);

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Recognition"
        description="Aspora Leaf Recognition System — Celebrate your culture champions"
        actions={
          <Button className="gap-2" onClick={() => window.open('https://tally.so/r/zxEMgZ', '_blank')}>
            <Leaf className="w-4 h-4" />
            Give a Leaf
            <ExternalLink className="w-3 h-3" />
          </Button>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 flex-wrap">
          <TabsTrigger value="forest" className="gap-1"><TreePine className="w-3 h-3" /> Employee Forest</TabsTrigger>
          <TabsTrigger value="analytics" className="gap-1"><BarChart3 className="w-3 h-3" /> Analytics</TabsTrigger>
          <TabsTrigger value="leaderboard" className="gap-1"><Trophy className="w-3 h-3" /> Leaderboard</TabsTrigger>
          <TabsTrigger value="values" className="gap-1"><Heart className="w-3 h-3" /> Values</TabsTrigger>
          <TabsTrigger value="governance" className="gap-1"><Shield className="w-3 h-3" /> Governance</TabsTrigger>
        </TabsList>

        {/* EMPLOYEE FOREST */}
        <TabsContent value="forest">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Leaves" value={totalLeaves} icon={<Leaf className="w-5 h-5" />} color="primary" />
            <StatCard title="Active Trees" value={employeeForest.length} icon={<TreePine className="w-5 h-5" />} color="accent" />
            <StatCard title="This Month" value={52} icon={<Calendar className="w-5 h-5" />} color="success" />
            <StatCard title="Avg per Person" value={(totalLeaves / employeeForest.length).toFixed(1)} icon={<TrendingUp className="w-5 h-5" />} color="warning" />
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search employees..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-40"><SelectValue placeholder="All Teams" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="people">People</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredForest.map((emp) => (
              <motion.div key={emp.id} variants={item} className="aspora-card-hover">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={emp.avatar} alt={emp.name} className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/10" />
                    <span className="absolute -bottom-1 -right-1 text-2xl">{treeLevelEmoji[emp.treeLevel]}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{emp.name}</h3>
                    <p className="text-sm text-muted-foreground">{emp.department} • {emp.team}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Leaf className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">{emp.leavesReceived}</span>
                        <span className="text-xs text-muted-foreground">received</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Leaf className="w-4 h-4 text-accent" />
                        <span className="text-sm font-semibold text-foreground">{emp.leavesGiven}</span>
                        <span className="text-xs text-muted-foreground">given</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        {/* ANALYTICS */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Recognitions" value={215} icon={<Award className="w-5 h-5" />} color="primary" />
            <StatCard title="Active Employees" value={employeeForest.length} icon={<Users className="w-5 h-5" />} color="accent" />
            <StatCard title="Months Tracked" value={7} icon={<Calendar className="w-5 h-5" />} color="success" />
            <StatCard title="Avg per Person" value="35.8" icon={<TrendingUp className="w-5 h-5" />} color="warning" />
          </div>

          {/* Governance Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Submission Completeness', value: 94 },
              { label: 'Value Alignment Score', value: 87 },
              { label: 'Participation Rate', value: 91 },
              { label: 'Team Engagement', value: 82 },
            ].map((m) => (
              <div key={m.label} className="aspora-card text-center">
                <p className="text-3xl font-bold text-primary">{m.value}%</p>
                <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
                <ProgressBar value={m.value} variant="primary" size="sm" />
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-6">
            <Select><SelectTrigger className="w-40"><SelectValue placeholder="Core Value" /></SelectTrigger><SelectContent>{coreValues.map(v => <SelectItem key={v.name} value={v.name}>{v.emoji} {v.name}</SelectItem>)}</SelectContent></Select>
            <Select><SelectTrigger className="w-32"><SelectValue placeholder="Month" /></SelectTrigger><SelectContent><SelectItem value="all">All Months</SelectItem><SelectItem value="jan">January</SelectItem><SelectItem value="feb">February</SelectItem></SelectContent></Select>
            <Select><SelectTrigger className="w-40"><SelectValue placeholder="Employee" /></SelectTrigger><SelectContent>{employeeForest.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent></Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trend Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="aspora-card">
              <h3 className="font-semibold text-foreground mb-4">Recognition Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={recognitionTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                  <defs>
                    <linearGradient id="recGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="count" stroke="hsl(var(--primary))" fill="url(#recGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Values Distribution */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="aspora-card">
              <h3 className="font-semibold text-foreground mb-4">Core Values Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={coreValues} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis dataKey="name" type="category" width={120} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Team Insights */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="aspora-card mt-6">
            <h3 className="font-semibold text-foreground mb-4">Team Recognition Insights</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 text-muted-foreground font-medium">Team</th><th className="text-right py-3 px-4 text-muted-foreground font-medium">Given</th><th className="text-right py-3 px-4 text-muted-foreground font-medium">Received</th><th className="text-right py-3 px-4 text-muted-foreground font-medium">Net</th></tr></thead>
                <tbody>
                  {teamInsights.map(t => (
                    <tr key={t.team} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-4 font-medium text-foreground">{t.team}</td>
                      <td className="py-3 px-4 text-right text-foreground">{t.given}</td>
                      <td className="py-3 px-4 text-right text-foreground">{t.received}</td>
                      <td className={`py-3 px-4 text-right font-medium ${t.received - t.given >= 0 ? 'text-success' : 'text-warning'}`}>{t.received - t.given >= 0 ? '+' : ''}{t.received - t.given}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </TabsContent>

        {/* LEADERBOARD */}
        <TabsContent value="leaderboard">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-foreground">Recognition Leaderboard</h2>
            <p className="text-muted-foreground">Celebrating our culture champions</p>
            <div className="flex justify-center gap-2 mt-4">
              {['month', 'quarter', 'all'].map(p => (
                <Button key={p} variant={leaderboardPeriod === p ? 'default' : 'outline'} size="sm" onClick={() => setLeaderboardPeriod(p)}>
                  {p === 'month' ? 'This Month' : p === 'quarter' ? 'This Quarter' : 'All Time'}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Givers */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="aspora-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Leaf className="w-5 h-5 text-primary" /> Top Recognition Givers</h3>
              <div className="space-y-3">
                {leaderboardGivers.map(p => (
                  <div key={p.rank} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                    <span className="text-xl w-8 text-center">{rankBadge(p.rank)}</span>
                    <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{p.count}</p>
                      <p className="text-xs text-muted-foreground">leaves given</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Receivers */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="aspora-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-accent" /> Top Recognition Receivers</h3>
              <div className="space-y-3">
                {leaderboardReceivers.map(p => (
                  <div key={p.rank} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                    <span className="text-xl w-8 text-center">{rankBadge(p.rank)}</span>
                    <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-accent">{p.count}</p>
                      <p className="text-xs text-muted-foreground">leaves received</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </TabsContent>

        {/* VALUES */}
        <TabsContent value="values">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-foreground">Aspora Core Values</h2>
            <p className="text-muted-foreground">The principles that guide our culture and recognition</p>
          </div>
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreValues.map(v => (
              <motion.div key={v.name} variants={item} className="aspora-card">
                <div className="text-4xl mb-3">{v.emoji}</div>
                <h3 className="font-semibold text-foreground text-lg">{v.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{v.description}</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Recognitions</span>
                    <span className="font-bold text-primary">{v.count}</span>
                  </div>
                  <ProgressBar value={(v.count / 50) * 100} variant="primary" size="sm" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        {/* GOVERNANCE WATCHBOARD */}
        <TabsContent value="governance">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Submission Completeness" value="94%" icon={<CheckCircle2 className="w-5 h-5" />} color="success" />
            <StatCard title="Value Alignment" value="87%" icon={<Heart className="w-5 h-5" />} color="primary" />
            <StatCard title="Favouritism Flags" value="2" icon={<AlertTriangle className="w-5 h-5" />} color="warning" />
            <StatCard title="Team Engagement" value="82%" icon={<Users className="w-5 h-5" />} color="accent" />
          </div>

          {/* Active Rules */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="aspora-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">Active Governance Rules</h3>
            <div className="space-y-3">
              {[
                { name: 'Duplicate Pair ID Detection', description: 'Automatically detects when same pair exchanges recognitions', status: 'active', metric: '98.5% accuracy' },
                { name: '6-Week Cooldown Enforcement', description: 'Prevents same pair from exchanging leaves within 6 weeks', status: 'active', metric: '3 active cooldowns' },
                { name: 'Favouritism Detection', description: 'Flags pairs with >3 recognitions per month', status: 'active', metric: '2 flagged pairs' },
                { name: 'Value-Usage Governance', description: 'Monitors overuse/underuse of specific core values', status: 'active', metric: '1 overuse, 0 underuse' },
              ].map(rule => (
                <div key={rule.name} className="flex items-center justify-between p-4 rounded-lg border border-border bg-success/5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <div>
                      <p className="font-medium text-foreground">{rule.name}</p>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-foreground bg-muted px-3 py-1 rounded-full">{rule.metric}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Simulated Rules */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="aspora-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">Simulated Rules <span className="text-xs font-normal text-muted-foreground">(Coming Soon)</span></h3>
            <div className="space-y-3 opacity-50">
              {['3 Leaves Per Month Limit', 'Fairness Governance', 'Engagement Governance', 'Forest Health Monitoring'].map(rule => (
                <div key={rule} className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/20">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <p className="font-medium text-muted-foreground">{rule}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">Coming Soon</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Flagged Pairs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="aspora-card">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Flagged Pairs
            </h3>
            <div className="space-y-3">
              {flaggedPairs.map(fp => (
                <div key={fp.pair} className="flex items-center justify-between p-4 rounded-lg border border-warning/30 bg-warning/5">
                  <div>
                    <p className="font-medium text-foreground">{fp.pair}</p>
                    <p className="text-sm text-muted-foreground">{fp.exchanges} exchanges in {fp.period}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${fp.status === 'flagged' ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'}`}>
                    {fp.status === 'flagged' ? '⚠️ Flagged' : '👁️ Monitoring'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Briefcase,
  Target,
  GraduationCap,
  Clock,
  ArrowRight,
  Download,
  Filter,
  Calendar,
  DollarSign,
  Heart,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { dashboardStats } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';

const headcountData = [
  { month: 'Jul', count: 210 }, { month: 'Aug', count: 218 }, { month: 'Sep', count: 225 },
  { month: 'Oct', count: 232 }, { month: 'Nov', count: 240 }, { month: 'Dec', count: 244 }, { month: 'Jan', count: 248 },
];
const hiringData = [
  { month: 'Jul', hired: 8, openings: 10 }, { month: 'Aug', hired: 12, openings: 14 },
  { month: 'Sep', hired: 10, openings: 12 }, { month: 'Oct', hired: 9, openings: 11 },
  { month: 'Nov', hired: 11, openings: 15 }, { month: 'Dec', hired: 6, openings: 10 }, { month: 'Jan', hired: 4, openings: 12 },
];
const departmentData = [
  { name: 'Engineering', value: 95, color: 'hsl(243, 75%, 42%)' },
  { name: 'Product', value: 35, color: 'hsl(168, 80%, 40%)' },
  { name: 'Design', value: 28, color: 'hsl(38, 92%, 50%)' },
  { name: 'Sales', value: 45, color: 'hsl(152, 69%, 40%)' },
  { name: 'People', value: 20, color: 'hsl(0, 72%, 51%)' },
  { name: 'Other', value: 25, color: 'hsl(210, 20%, 60%)' },
];
const performanceDistribution = [
  { rating: 'Exceptional', count: 18, color: 'hsl(152, 69%, 40%)' },
  { rating: 'Exceeds', count: 45, color: 'hsl(168, 80%, 40%)' },
  { rating: 'Meets', count: 120, color: 'hsl(243, 75%, 42%)' },
  { rating: 'Developing', count: 35, color: 'hsl(38, 92%, 50%)' },
  { rating: 'Below', count: 8, color: 'hsl(0, 72%, 51%)' },
];
const forecastData = [
  { month: 'Feb', forecast: 252 }, { month: 'Mar', forecast: 258 }, { month: 'Apr', forecast: 265 },
  { month: 'May', forecast: 270 }, { month: 'Jun', forecast: 278 },
];
const diversityData = [
  { category: 'Gender', male: 58, female: 39, other: 3 },
  { category: 'Ethnicity', white: 45, asian: 28, black: 15, hispanic: 8, other: 4 },
];

const metrics = [
  { title: 'Headcount Growth', value: '+8.2%', description: 'vs. last quarter', trend: 'up', icon: Users, color: 'primary' },
  { title: 'Time to Hire', value: '28 days', description: '-3 days vs. last quarter', trend: 'down', icon: Clock, color: 'accent' },
  { title: 'Offer Accept Rate', value: '87%', description: '+5% vs. last quarter', trend: 'up', icon: Briefcase, color: 'success' },
  { title: 'Cost per Hire', value: '$4,200', description: '-$300 vs. last quarter', trend: 'down', icon: DollarSign, color: 'warning' },
];

export default function DashboardsPage() {
  const [dateRange, setDateRange] = useState('this-quarter');
  const [department, setDepartment] = useState('all');
  const { toast } = useToast();

  const handleExport = (format: string) => {
    if (format === 'csv') {
      const link = document.createElement('a');
      link.download = 'aspora-report.csv';
      link.href = 'data:text/csv;charset=utf-8,Metric,Value\nHeadcount,248\nOpen Roles,12\nTime to Hire,28 days\nOffer Accept Rate,87%\nCost per Hire,$4200';
      link.click();
    }
    toast({ title: `Exported as ${format.toUpperCase()}`, description: "Report has been downloaded." });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Dashboards"
        description="Executive insights and organizational health"
        actions={
          <div className="flex gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-quarter">Last Quarter</SelectItem>
                <SelectItem value="this-quarter">This Quarter</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Department" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2" onClick={() => handleExport('csv')}>
              <Download className="w-4 h-4" /> Export CSV
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => handleExport('pdf')}>
              <Download className="w-4 h-4" /> Export PDF
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => (
          <motion.div key={metric.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="aspora-card cursor-pointer hover:border-primary/20 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
                  {metric.trend === 'up' ? <TrendingUp className="w-4 h-4 text-success" /> : <TrendingDown className="w-4 h-4 text-success" />}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
              </div>
              <div className={`p-2.5 rounded-lg bg-${metric.color}/10`}>
                <metric.icon className={`w-5 h-5 text-${metric.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Headcount Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="aspora-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Headcount Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={headcountData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(243, 75%, 42%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(243, 75%, 42%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis dataKey="month" stroke="hsl(215, 16%, 47%)" fontSize={12} />
                <YAxis stroke="hsl(215, 16%, 47%)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(214, 20%, 90%)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="count" stroke="hsl(243, 75%, 42%)" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Headcount Forecast */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="aspora-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Headcount Forecast</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[...headcountData.slice(-2), ...forecastData]}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis dataKey="month" stroke="hsl(215, 16%, 47%)" fontSize={12} />
                <YAxis stroke="hsl(215, 16%, 47%)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(214, 20%, 90%)', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="count" stroke="hsl(243, 75%, 42%)" strokeWidth={2} />
                <Line type="monotone" dataKey="forecast" stroke="hsl(168, 80%, 40%)" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-primary" /><span className="text-sm text-muted-foreground">Actual</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-accent" /><span className="text-sm text-muted-foreground">Forecast</span></div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Hiring Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="aspora-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Hiring Activity</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hiringData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis dataKey="month" stroke="hsl(215, 16%, 47%)" fontSize={12} />
                <YAxis stroke="hsl(215, 16%, 47%)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(214, 20%, 90%)', borderRadius: '8px' }} />
                <Bar dataKey="openings" fill="hsl(214, 20%, 90%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="hired" fill="hsl(168, 80%, 40%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* D&I Metrics */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="aspora-card">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" /> Diversity & Inclusion
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Gender Distribution</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-6 rounded-full overflow-hidden flex">
                  <div className="bg-primary h-full" style={{ width: '58%' }} />
                  <div className="bg-accent h-full" style={{ width: '39%' }} />
                  <div className="bg-warning h-full" style={{ width: '3%' }} />
                </div>
              </div>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-primary" />Male 58%</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-accent" />Female 39%</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-warning" />Non-binary 3%</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Leadership Diversity</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <p className="text-xl font-semibold text-foreground">42%</p>
                  <p className="text-xs text-muted-foreground">Women in leadership</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <p className="text-xl font-semibold text-foreground">35%</p>
                  <p className="text-xs text-muted-foreground">URG in tech roles</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <p className="text-xl font-semibold text-foreground">8.5</p>
                  <p className="text-xs text-muted-foreground">Inclusion score</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="aspora-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Headcount by Department</h2>
          <div className="flex items-center gap-8">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={departmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
                    {departmentData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {departmentData.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: dept.color }} />
                    <span className="text-sm text-foreground">{dept.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{dept.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Performance Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="aspora-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Performance Distribution</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis type="number" stroke="hsl(215, 16%, 47%)" fontSize={12} />
                <YAxis dataKey="rating" type="category" stroke="hsl(215, 16%, 47%)" fontSize={12} width={80} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(214, 20%, 90%)', borderRadius: '8px' }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {performanceDistribution.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Additional Hiring Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="aspora-card text-center">
          <DollarSign className="w-8 h-8 text-warning mx-auto mb-2" />
          <p className="text-2xl font-semibold text-foreground">$4,200</p>
          <p className="text-sm text-muted-foreground">Cost per Hire</p>
          <p className="text-xs text-success mt-1">↓ 7% from last quarter</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="aspora-card text-center">
          <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
          <p className="text-2xl font-semibold text-foreground">28 days</p>
          <p className="text-sm text-muted-foreground">Time to Fill</p>
          <p className="text-xs text-success mt-1">↓ 3 days from last quarter</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="aspora-card text-center">
          <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-2xl font-semibold text-foreground">87%</p>
          <p className="text-sm text-muted-foreground">Offer Accept Rate</p>
          <p className="text-xs text-success mt-1">↑ 5% from last quarter</p>
        </motion.div>
      </div>
    </div>
  );
}

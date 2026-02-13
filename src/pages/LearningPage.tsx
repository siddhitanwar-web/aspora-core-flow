import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  BookOpen,
  Target,
  Clock,
  ArrowRight,
  Play,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Plus,
  Award,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { ProgressBar } from '@/components/common/ProgressBar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { learningPaths, employees, dashboardStats } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const courseCatalog = [
  { id: 1, title: 'React Advanced Patterns', category: 'Engineering', duration: '4h', level: 'Advanced', enrolled: 24 },
  { id: 2, title: 'Data-Driven Product Decisions', category: 'Product', duration: '3h', level: 'Intermediate', enrolled: 18 },
  { id: 3, title: 'Design System Fundamentals', category: 'Design', duration: '2h', level: 'Beginner', enrolled: 35 },
  { id: 4, title: 'People Management 101', category: 'Leadership', duration: '5h', level: 'Beginner', enrolled: 42 },
  { id: 5, title: 'Cloud Infrastructure', category: 'Engineering', duration: '6h', level: 'Advanced', enrolled: 12 },
  { id: 6, title: 'Sales Methodology', category: 'Sales', duration: '3h', level: 'Intermediate', enrolled: 28 },
];

const certifications = [
  { name: 'AWS Solutions Architect', holder: 'James Wilson', date: '2023-11-15', status: 'active' },
  { name: 'PMP Certification', holder: 'Sarah Chen', date: '2023-09-20', status: 'active' },
  { name: 'Google UX Certificate', holder: 'Priya Sharma', date: '2024-01-10', status: 'active' },
  { name: 'Scrum Master (CSM)', holder: 'Marcus Johnson', date: '2023-06-05', status: 'expiring' },
];

const coachingTopics = [
  { title: 'Career Growth', description: 'Explore paths to your next role', icon: TrendingUp },
  { title: 'Skill Development', description: 'Build new competencies', icon: Target },
  { title: 'Leadership', description: 'Develop management skills', icon: GraduationCap },
  { title: 'Work-Life Balance', description: 'Optimize productivity', icon: BookOpen },
];

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState('paths');
  const [showAssignCourse, setShowAssignCourse] = useState(false);
  const [showCreatePath, setShowCreatePath] = useState(false);
  const { toast } = useToast();

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Learning & Coaching"
        description="Personalized development paths and coaching journeys"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => setShowAssignCourse(true)}>
              <Users className="w-4 h-4" /> Assign Course
            </Button>
            <Button className="gap-2" onClick={() => setShowCreatePath(true)}>
              <Plus className="w-4 h-4" /> Create Path
            </Button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Learning Engagement" value={`${dashboardStats.learningEngagement}%`} icon={<GraduationCap className="w-5 h-5" />} color="primary" />
        <StatCard title="Active Paths" value={learningPaths.length} icon={<BookOpen className="w-5 h-5" />} color="accent" />
        <StatCard title="Completed Courses" value={24} icon={<CheckCircle2 className="w-5 h-5" />} color="success" />
        <StatCard title="Hours Learned" value="156" icon={<Clock className="w-5 h-5" />} color="warning" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="paths">Learning Paths</TabsTrigger>
          <TabsTrigger value="catalog">Course Catalog</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="coaching">LLM Coaching</TabsTrigger>
          <TabsTrigger value="skills">Skill Progress</TabsTrigger>
          <TabsTrigger value="hours">Hours Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="paths">
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {learningPaths.map((path) => (
              <motion.div key={path.id} variants={item}>
                <div className="aspora-card-hover h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{path.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{path.description}</p>
                    </div>
                    {path.progress >= 80 && <StatusBadge status="Almost Complete" variant="success" />}
                  </div>
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{path.duration}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{path.modules} modules</span>
                    <span className="flex items-center gap-1"><Target className="w-4 h-4" />{path.role}</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">{path.progress}%</span>
                    </div>
                    <ProgressBar value={path.progress} variant="accent" />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {path.skills.map((skill) => (<span key={skill} className="aspora-badge-muted">{skill}</span>))}
                  </div>
                  <Button className="w-full gap-2" asChild><Link to="/learning"><Play className="w-4 h-4" />Continue Learning</Link></Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="catalog">
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseCatalog.map((course) => (
              <motion.div key={course.id} variants={item}>
                <div className="aspora-card-hover h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="aspora-badge-primary">{course.category}</span>
                    <span className="aspora-badge-muted">{course.level}</span>
                  </div>
                  <h3 className="font-medium text-foreground mb-2">{course.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.enrolled} enrolled</span>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => toast({ title: "Enrolled!", description: `You've been enrolled in ${course.title}.` })}>
                    Enroll Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="certifications">
          <div className="aspora-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Certifications</h2>
              <Button variant="outline" size="sm" className="gap-1" onClick={() => toast({ title: "Add Certification", description: "Certification tracking form opened." })}>
                <Plus className="w-4 h-4" /> Add
              </Button>
            </div>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Award className={`w-5 h-5 ${cert.status === 'active' ? 'text-success' : 'text-warning'}`} />
                    <div>
                      <p className="font-medium text-foreground text-sm">{cert.name}</p>
                      <p className="text-xs text-muted-foreground">{cert.holder} • {cert.date}</p>
                    </div>
                  </div>
                  <StatusBadge status={cert.status === 'active' ? 'active' : 'expiring'} />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="coaching">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 aspora-card bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent"><Sparkles className="w-6 h-6 text-white" /></div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">LLM Coach</h2>
                  <p className="text-muted-foreground">Your personalized AI career coach</p>
                </div>
              </div>
              <div className="bg-background rounded-lg p-4 mb-4">
                <p className="text-sm text-muted-foreground mb-2">Recent conversation</p>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0"><span className="text-xs font-medium">You</span></div>
                    <div className="bg-muted/50 rounded-lg p-3 flex-1"><p className="text-sm text-foreground">How can I prepare for a leadership role?</p></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0"><Sparkles className="w-4 h-4 text-white" /></div>
                    <div className="bg-primary/5 rounded-lg p-3 flex-1"><p className="text-sm text-foreground">Based on your current role, I recommend focusing on stakeholder management, strategic thinking, and team mentorship.</p></div>
                  </div>
                </div>
              </div>
              <Button className="w-full gap-2" asChild><Link to="/coach"><Sparkles className="w-4 h-4" />Continue Conversation</Link></Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="aspora-card">
              <h3 className="font-semibold text-foreground mb-4">Coaching Topics</h3>
              <div className="space-y-3">
                {coachingTopics.map((topic) => (
                  <Link key={topic.title} to="/coach" className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10 text-accent"><topic.icon className="w-4 h-4" /></div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{topic.title}</p>
                      <p className="text-xs text-muted-foreground">{topic.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="skills">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="aspora-card">
            <h2 className="text-lg font-semibold text-foreground mb-6">Your Skill Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { skill: 'Product Strategy', level: 85, trend: 'up' },
                { skill: 'Data Analysis', level: 72, trend: 'up' },
                { skill: 'Leadership', level: 68, trend: 'up' },
                { skill: 'Technical Architecture', level: 55, trend: 'stable' },
                { skill: 'Stakeholder Management', level: 78, trend: 'up' },
                { skill: 'Agile Methodologies', level: 90, trend: 'stable' },
              ].map((skill) => (
                <div key={skill.skill} className="p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{skill.skill}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      {skill.trend === 'up' && <TrendingUp className="w-4 h-4 text-success" />}
                    </div>
                  </div>
                  <ProgressBar value={skill.level} variant={skill.level >= 80 ? 'success' : skill.level >= 60 ? 'primary' : 'warning'} />
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="hours">
          <div className="aspora-card">
            <h2 className="text-lg font-semibold text-foreground mb-6">Learning Hours by Employee</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-muted-foreground font-medium">Employee</th>
                    <th className="text-center py-3 text-muted-foreground font-medium">This Month</th>
                    <th className="text-center py-3 text-muted-foreground font-medium">This Quarter</th>
                    <th className="text-center py-3 text-muted-foreground font-medium">Total</th>
                    <th className="text-center py-3 text-muted-foreground font-medium">Courses</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.slice(0, 5).map((emp, i) => (
                    <tr key={emp.id} className="border-b border-border last:border-0">
                      <td className="py-3">
                        <Link to={`/employees/${emp.id}`} className="flex items-center gap-2">
                          <img src={emp.avatar} alt={emp.name} className="w-7 h-7 rounded-full object-cover" />
                          <span className="font-medium text-foreground">{emp.name}</span>
                        </Link>
                      </td>
                      <td className="py-3 text-center text-foreground">{8 + i * 2}h</td>
                      <td className="py-3 text-center text-foreground">{24 + i * 5}h</td>
                      <td className="py-3 text-center font-medium text-foreground">{48 + i * 12}h</td>
                      <td className="py-3 text-center text-foreground">{3 + i}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Assign Course Dialog */}
      <Dialog open={showAssignCourse} onOpenChange={setShowAssignCourse}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Assign Course</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label>Course</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select course..." /></SelectTrigger>
                <SelectContent>
                  {courseCatalog.map(c => (<SelectItem key={c.id} value={String(c.id)}>{c.title}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Assign To</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select employee..." /></SelectTrigger>
                <SelectContent>
                  {employees.map(e => (<SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Due Date</Label>
              <Input className="mt-1" type="date" />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowAssignCourse(false)}>Cancel</Button>
            <Button onClick={() => { setShowAssignCourse(false); toast({ title: "Course Assigned", description: "Employee has been notified." }); }}>Assign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Path Dialog */}
      <Dialog open={showCreatePath} onOpenChange={setShowCreatePath}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Create Learning Path</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div><Label>Path Name</Label><Input className="mt-1" placeholder="e.g. Frontend Mastery" /></div>
            <div><Label>Description</Label><Input className="mt-1" placeholder="Brief description" /></div>
            <div><Label>Target Role</Label><Input className="mt-1" placeholder="e.g. Senior Engineer" /></div>
            <div><Label>Duration</Label><Input className="mt-1" placeholder="e.g. 8 weeks" /></div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowCreatePath(false)}>Cancel</Button>
            <Button onClick={() => { setShowCreatePath(false); toast({ title: "Path Created", description: "New learning path has been created." }); }}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

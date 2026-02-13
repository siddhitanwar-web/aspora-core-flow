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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { ProgressBar } from '@/components/common/ProgressBar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { learningPaths, employees, dashboardStats } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const coachingTopics = [
  { title: 'Career Growth', description: 'Explore paths to your next role', icon: TrendingUp },
  { title: 'Skill Development', description: 'Build new competencies', icon: Target },
  { title: 'Leadership', description: 'Develop management skills', icon: GraduationCap },
  { title: 'Work-Life Balance', description: 'Optimize productivity', icon: BookOpen },
];

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState('paths');

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Learning & Coaching"
        description="Personalized development paths and coaching journeys"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Learning Engagement"
          value={`${dashboardStats.learningEngagement}%`}
          icon={<GraduationCap className="w-5 h-5" />}
          color="primary"
        />
        <StatCard
          title="Active Paths"
          value={learningPaths.length}
          icon={<BookOpen className="w-5 h-5" />}
          color="accent"
        />
        <StatCard
          title="Completed Courses"
          value={24}
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="success"
        />
        <StatCard
          title="Hours Learned"
          value="156"
          icon={<Clock className="w-5 h-5" />}
          color="warning"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="paths">Learning Paths</TabsTrigger>
          <TabsTrigger value="coaching">LLM Coaching</TabsTrigger>
          <TabsTrigger value="skills">Skill Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="paths">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {learningPaths.map((path) => (
              <motion.div key={path.id} variants={item}>
                <div className="aspora-card-hover h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{path.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{path.description}</p>
                    </div>
                    {path.progress >= 80 && (
                      <StatusBadge status="Almost Complete" variant="success" />
                    )}
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {path.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {path.modules} modules
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {path.role}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">{path.progress}%</span>
                    </div>
                    <ProgressBar value={path.progress} variant="accent" />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {path.skills.map((skill) => (
                      <span
                        key={skill}
                        className="aspora-badge-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <Button className="w-full gap-2" asChild>
                    <Link to="/learning">
                      <Play className="w-4 h-4" />
                      Continue Learning
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="coaching">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI Coach Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 aspora-card bg-gradient-to-br from-primary/5 to-accent/5"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">LLM Coach</h2>
                  <p className="text-muted-foreground">Your personalized AI career coach</p>
                </div>
              </div>

              <div className="bg-background rounded-lg p-4 mb-4">
                <p className="text-sm text-muted-foreground mb-2">Recent conversation</p>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium">You</span>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 flex-1">
                      <p className="text-sm text-foreground">How can I prepare for a leadership role?</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-primary/5 rounded-lg p-3 flex-1">
                      <p className="text-sm text-foreground">
                        Based on your current role as Senior Product Manager and your performance reviews,
                        I recommend focusing on three key areas: stakeholder management, strategic thinking,
                        and team mentorship. Would you like me to create a personalized development plan?
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full gap-2" asChild>
                <Link to="/coach">
                  <Sparkles className="w-4 h-4" />
                  Continue Conversation
                </Link>
              </Button>
            </motion.div>

            {/* Topics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="aspora-card"
            >
              <h3 className="font-semibold text-foreground mb-4">Coaching Topics</h3>
              <div className="space-y-3">
                {coachingTopics.map((topic) => (
                  <div
                    key={topic.title}
                    className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent/10 text-accent">
                        <topic.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{topic.title}</p>
                        <p className="text-xs text-muted-foreground">{topic.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="skills">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="aspora-card"
          >
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
                      {skill.trend === 'up' && (
                        <TrendingUp className="w-4 h-4 text-success" />
                      )}
                    </div>
                  </div>
                  <ProgressBar value={skill.level} variant={skill.level >= 80 ? 'success' : skill.level >= 60 ? 'primary' : 'warning'} />
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

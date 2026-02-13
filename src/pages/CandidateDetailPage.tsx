import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  FileText,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Download,
  Edit,
  MoreHorizontal,
  User,
  Briefcase,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ProgressBar } from '@/components/common/ProgressBar';
import { candidates, roles, offers } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

// Mock interview notes
const interviewNotes = [
  {
    id: '1',
    interviewer: 'Marcus Johnson',
    role: 'Hiring Manager',
    date: '2024-01-20',
    type: 'Technical Interview',
    rating: 4,
    recommendation: 'strong-yes' as const,
    strengths: ['Excellent React/TypeScript skills', 'Strong system design thinking', 'Great communicator'],
    concerns: ['Limited backend experience'],
    notes: 'Alexandra demonstrated deep knowledge of frontend architecture. She walked through a complex component refactor with clear reasoning. Would be a strong addition to the team.',
  },
  {
    id: '2',
    interviewer: 'Emily Rodriguez',
    role: 'VP Engineering',
    date: '2024-01-22',
    type: 'Culture Fit',
    rating: 5,
    recommendation: 'strong-yes' as const,
    strengths: ['Great culture fit', 'Strong leadership potential', 'Collaborative mindset'],
    concerns: [],
    notes: 'Alexandra showed great alignment with our values. She shared examples of mentoring junior developers and driving team improvements at her current company.',
  },
  {
    id: '3',
    interviewer: 'David Kim',
    role: 'Senior Engineer',
    date: '2024-01-18',
    type: 'Technical Assessment',
    rating: 4,
    recommendation: 'yes' as const,
    strengths: ['Clean code', 'Good testing practices', 'Performance-conscious'],
    concerns: ['Could improve on accessibility knowledge'],
    notes: 'The take-home assignment was well-structured. Code was clean and well-documented. Tests covered key scenarios.',
  },
];

// Mock timeline events
const timelineEvents = [
  { date: '2024-01-12', event: 'Application received', type: 'system' },
  { date: '2024-01-13', event: 'Resume reviewed by Marcus Johnson', type: 'review' },
  { date: '2024-01-14', event: 'Moved to Screening', type: 'stage-change' },
  { date: '2024-01-15', event: 'Phone screen completed', type: 'interview' },
  { date: '2024-01-16', event: 'Moved to Interview', type: 'stage-change' },
  { date: '2024-01-18', event: 'Technical assessment submitted', type: 'interview' },
  { date: '2024-01-20', event: 'On-site interview completed', type: 'interview' },
  { date: '2024-01-22', event: 'Culture fit interview completed', type: 'interview' },
  { date: '2024-01-25', event: 'Moved to Offer', type: 'stage-change' },
  { date: '2024-01-28', event: 'Offer created and sent for approval', type: 'offer' },
];

// Mock resume sections
const resumeSections = {
  experience: [
    { title: 'Senior Frontend Engineer', company: 'TechCorp Inc.', period: '2021 - Present', description: 'Led frontend architecture migration to React 18 with TypeScript. Mentored 4 junior developers. Reduced bundle size by 40%.' },
    { title: 'Frontend Developer', company: 'StartupXYZ', period: '2019 - 2021', description: 'Built customer-facing dashboard from scratch. Implemented design system used across 3 products.' },
    { title: 'Junior Developer', company: 'WebAgency', period: '2017 - 2019', description: 'Developed responsive websites for enterprise clients. Introduced automated testing practices.' },
  ],
  education: [
    { title: 'B.S. Computer Science', institution: 'Stanford University', year: '2017' },
  ],
  skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Node.js', 'Tailwind CSS', 'Jest', 'Cypress', 'Figma', 'AWS'],
};

const recommendationStyles = {
  'strong-yes': { bg: 'bg-green-100 dark:bg-green-950/50', text: 'text-green-600', label: 'Strong Yes', icon: ThumbsUp },
  'yes': { bg: 'bg-blue-100 dark:bg-blue-950/50', text: 'text-blue-600', label: 'Yes', icon: ThumbsUp },
  'maybe': { bg: 'bg-amber-100 dark:bg-amber-950/50', text: 'text-amber-600', label: 'Maybe', icon: AlertCircle },
  'no': { bg: 'bg-red-100 dark:bg-red-950/50', text: 'text-red-600', label: 'No', icon: ThumbsDown },
};

export default function CandidateDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const candidate = candidates.find(c => c.id === id) || candidates[0];
  const role = roles.find(r => r.id === candidate.roleId);
  const candidateOffer = offers.find(o => o.candidateId === candidate.id);

  const overallRating = interviewNotes.reduce((sum, n) => sum + n.rating, 0) / interviewNotes.length;

  const stages = ['applied', 'screening', 'interview', 'offer', 'hired'];
  const currentStageIndex = stages.indexOf(candidate.stage);

  return (
    <div className="max-w-7xl mx-auto">
      <Link to="/hiring/board" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Board
      </Link>

      <PageHeader
        title=""
        actions={
          <div className="flex items-center gap-3">
            {candidate.stage === 'interview' && (
              <Button className="gap-2">
                <ArrowRight className="w-4 h-4" />
                Move to Offer
              </Button>
            )}
            {candidate.stage === 'offer' && (
              <Link to={`/preonboarding/${candidate.id}`}>
                <Button className="gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Start Pre-onboarding
                </Button>
              </Link>
            )}
            <Button variant="outline" className="gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                <DropdownMenuItem>Add Note</DropdownMenuItem>
                <DropdownMenuItem>Share Profile</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Reject Candidate</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      />

      {/* Candidate Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="aspora-card mb-8"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={candidate.avatar}
            alt={candidate.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/10"
          />
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-semibold text-foreground">{candidate.name}</h1>
                  <StatusBadge status={candidate.stage} />
                </div>
                <p className="text-lg text-muted-foreground mt-1">
                  Applying for: <Link to={`/hiring/${candidate.roleId}`} className="text-primary hover:underline">{candidate.role}</Link>
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {candidate.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Applied {candidate.appliedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <ExternalLink className="w-4 h-4" />
                    Source: {candidate.source}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-1 text-2xl font-bold">
                    <Star className="w-5 h-5 fill-warning text-warning" />
                    {overallRating.toFixed(1)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Avg Rating</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-primary">{interviewNotes.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Interviews</p>
                </div>
              </div>
            </div>

            {/* Stage Progress */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-1">
                {stages.map((stage, index) => (
                  <div key={stage} className="flex-1 flex items-center">
                    <div className={cn(
                      'flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium',
                      index <= currentStageIndex
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}>
                      {index < currentStageIndex ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    {index < stages.length - 1 && (
                      <div className={cn(
                        'flex-1 h-0.5 mx-1',
                        index < currentStageIndex ? 'bg-primary' : 'bg-muted'
                      )} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex mt-1">
                {stages.map((stage) => (
                  <div key={stage} className="flex-1 text-center">
                    <p className="text-xs text-muted-foreground capitalize">{stage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="interviews">Interviews ({interviewNotes.length})</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          {candidateOffer && <TabsTrigger value="offer">Offer</TabsTrigger>}
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Scorecard */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 aspora-card"
            >
              <h3 className="font-medium mb-4">Interview Scorecard</h3>
              <div className="space-y-4">
                {interviewNotes.map((note) => {
                  const rec = recommendationStyles[note.recommendation];
                  return (
                    <div key={note.id} className="p-4 rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium text-foreground">{note.type}</p>
                          <p className="text-sm text-muted-foreground">{note.interviewer} • {note.role}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  'w-3.5 h-3.5',
                                  i < note.rating ? 'fill-warning text-warning' : 'text-muted'
                                )}
                              />
                            ))}
                          </div>
                          <span className={cn(
                            'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium',
                            rec.bg, rec.text
                          )}>
                            <rec.icon className="w-3 h-3" />
                            {rec.label}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{note.notes}</p>
                      <div className="flex flex-wrap gap-4 text-xs">
                        {note.strengths.length > 0 && (
                          <div>
                            <span className="text-green-600 font-medium">Strengths: </span>
                            <span className="text-muted-foreground">{note.strengths.join(', ')}</span>
                          </div>
                        )}
                        {note.concerns.length > 0 && (
                          <div>
                            <span className="text-amber-600 font-medium">Concerns: </span>
                            <span className="text-muted-foreground">{note.concerns.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Info */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="aspora-card"
              >
                <h3 className="font-medium mb-4">Offer Readiness</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Technical Skills', score: 90, color: 'primary' as const },
                    { label: 'Culture Fit', score: 95, color: 'accent' as const },
                    { label: 'Experience Match', score: 85, color: 'primary' as const },
                    { label: 'Leadership Potential', score: 80, color: 'accent' as const },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{metric.label}</span>
                        <span className="font-medium">{metric.score}%</span>
                      </div>
                      <ProgressBar value={metric.score} size="sm" variant={metric.color} />
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border text-center">
                  <p className="text-2xl font-bold text-green-500">87%</p>
                  <p className="text-sm text-muted-foreground">Overall Offer Readiness</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="aspora-card"
              >
                <h3 className="font-medium mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-2 text-sm">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Schedule Interview
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 text-sm">
                    <FileText className="w-4 h-4 text-accent" />
                    Create Offer
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    Send Message
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resume">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Experience */}
              <div className="aspora-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Work Experience</h3>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Download className="w-4 h-4" />
                    Download Resume
                  </Button>
                </div>
                <div className="relative pl-8 space-y-6">
                  <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border" />
                  {resumeSections.experience.map((exp, index) => (
                    <div key={index} className="relative">
                      <div className={cn(
                        'absolute left-[-26px] w-4 h-4 rounded-full border-4 border-background',
                        index === 0 ? 'bg-primary' : 'bg-muted'
                      )} />
                      <div>
                        <p className="font-medium text-foreground">{exp.title}</p>
                        <p className="text-sm text-primary">{exp.company}</p>
                        <p className="text-xs text-muted-foreground mb-2">{exp.period}</p>
                        <p className="text-sm text-muted-foreground">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="aspora-card">
                <h3 className="font-medium mb-4">Education</h3>
                {resumeSections.education.map((edu, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{edu.title}</p>
                      <p className="text-sm text-muted-foreground">{edu.institution} • {edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="aspora-card h-fit"
            >
              <h3 className="font-medium mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resumeSections.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="interviews">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {interviewNotes.map((note) => {
              const rec = recommendationStyles[note.recommendation];
              return (
                <motion.div key={note.id} variants={item} className="aspora-card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{note.interviewer}</p>
                        <p className="text-sm text-muted-foreground">{note.role} • {note.type}</p>
                        <p className="text-xs text-muted-foreground">{note.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'w-4 h-4',
                              i < note.rating ? 'fill-warning text-warning' : 'text-muted'
                            )}
                          />
                        ))}
                      </div>
                      <span className={cn(
                        'inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium',
                        rec.bg, rec.text
                      )}>
                        <rec.icon className="w-4 h-4" />
                        {rec.label}
                      </span>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4 mb-4">
                    <p className="text-sm text-foreground">{note.notes}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
                      <p className="text-xs font-medium text-green-700 dark:text-green-400 mb-2">Strengths</p>
                      <ul className="space-y-1">
                        {note.strengths.map((s) => (
                          <li key={s} className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {note.concerns.length > 0 && (
                      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900">
                        <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-2">Concerns</p>
                        <ul className="space-y-1">
                          {note.concerns.map((c) => (
                            <li key={c} className="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </TabsContent>

        <TabsContent value="timeline">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="aspora-card"
          >
            <h3 className="font-medium mb-6">Candidate Timeline</h3>
            <div className="relative pl-8 space-y-6">
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border" />
              {[...timelineEvents].reverse().map((event, index) => (
                <div key={index} className="relative">
                  <div className={cn(
                    'absolute left-[-26px] w-4 h-4 rounded-full border-4 border-background',
                    event.type === 'stage-change' ? 'bg-primary' :
                    event.type === 'interview' ? 'bg-accent' :
                    event.type === 'offer' ? 'bg-warning' :
                    'bg-muted'
                  )} />
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-sm font-medium text-foreground">{event.event}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {candidateOffer && (
          <TabsContent value="offer">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspora-card"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Offer Details</h3>
                <StatusBadge status={candidateOffer.status} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground">Role</p>
                    <p className="font-medium text-foreground">{candidateOffer.role}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground">Base Salary</p>
                    <p className="text-2xl font-bold text-foreground">${candidateOffer.salary.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">per year</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium text-foreground">{candidateOffer.startDate}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-3">Equity (RSUs)</p>
                    <p className="font-medium text-foreground">5,000 RSUs</p>
                    <p className="text-xs text-muted-foreground">4-year vesting, 1-year cliff</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-3">Signing Bonus</p>
                    <p className="font-medium text-foreground">$15,000</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-3">Approval Status</p>
                    <div className="space-y-2">
                      {candidateOffer.approvers.map((approver) => (
                        <div key={approver} className="flex items-center justify-between">
                          <span className="text-sm">{approver}</span>
                          <span className="px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-600">Pending</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-border">
                <Button className="gap-2">
                  <FileText className="w-4 h-4" />
                  Generate Offer Letter
                </Button>
                <Button variant="outline" className="gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Offer
                </Button>
              </div>
            </motion.div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
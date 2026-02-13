import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Building2,
  Users,
  Clock,
  Calendar,
  Star,
  ArrowRight,
  Edit,
  MoreHorizontal,
  CheckCircle2,
  Circle,
  UserPlus,
  Briefcase,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ProgressBar } from '@/components/common/ProgressBar';
import { roles, candidates, offers } from '@/data/mockData';
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

const interviewStages = [
  { name: 'Application Review', description: 'Resume screening and initial assessment', duration: '1-2 days' },
  { name: 'Phone Screen', description: 'Initial call with recruiter', duration: '30 min' },
  { name: 'Technical Assessment', description: 'Take-home assignment or live coding', duration: '2-3 hours' },
  { name: 'On-site Interview', description: 'Technical deep-dive + culture fit', duration: '4 hours' },
  { name: 'Hiring Manager Review', description: 'Final discussion with hiring manager', duration: '45 min' },
  { name: 'Offer', description: 'Compensation discussion and offer', duration: '1-2 days' },
];

export default function RoleDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const role = roles.find(r => r.id === id) || roles[0];
  const roleCandidates = candidates.filter(c => c.roleId === role.id);
  const roleOffers = offers.filter(o => o.roleId === role.id);

  const stageBreakdown = [
    { stage: 'Applied', count: roleCandidates.filter(c => c.stage === 'applied').length, color: 'bg-muted-foreground' },
    { stage: 'Screening', count: roleCandidates.filter(c => c.stage === 'screening').length, color: 'bg-blue-500' },
    { stage: 'Interview', count: roleCandidates.filter(c => c.stage === 'interview').length, color: 'bg-purple-500' },
    { stage: 'Offer', count: roleCandidates.filter(c => c.stage === 'offer').length, color: 'bg-amber-500' },
    { stage: 'Hired', count: roleCandidates.filter(c => c.stage === 'hired').length, color: 'bg-green-500' },
  ];

  const daysOpen = Math.ceil(
    (new Date().getTime() - new Date(role.openDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="max-w-7xl mx-auto">
      <Link to="/hiring" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Hiring
      </Link>

      <PageHeader
        title=""
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Role
            </Button>
            <Button className="gap-2">
              <UserPlus className="w-4 h-4" />
              Add Candidate
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Duplicate Role</DropdownMenuItem>
                <DropdownMenuItem>Share Posting</DropdownMenuItem>
                <DropdownMenuItem>Put on Hold</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Close Role</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      />

      {/* Role Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="aspora-card mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-foreground">{role.title}</h1>
              <StatusBadge status={role.status} />
              <StatusBadge status={role.priority} />
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {role.department} • {role.team}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {role.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {role.type} • {role.level}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Opened {role.openDate}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold text-foreground">{daysOpen}</p>
              <p className="text-xs text-muted-foreground">Days Open</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold text-primary">{roleCandidates.length}</p>
              <p className="text-xs text-muted-foreground">Candidates</p>
            </div>
          </div>
        </div>

        {/* Hiring Manager */}
        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Hiring Manager</p>
            <p className="font-medium text-foreground">{role.hiringManager}</p>
          </div>
        </div>

        {/* Pipeline Summary */}
        <div className="grid grid-cols-5 gap-3 mt-6 pt-6 border-t border-border">
          {stageBreakdown.map((s) => (
            <div key={s.stage} className="text-center p-3 rounded-lg bg-muted/30">
              <p className="text-xl font-semibold text-foreground">{s.count}</p>
              <p className="text-xs text-muted-foreground">{s.stage}</p>
              <div className={cn('h-1 rounded-full mt-2', s.color)} />
            </div>
          ))}
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="candidates">Candidates ({roleCandidates.length})</TabsTrigger>
          <TabsTrigger value="interview-plan">Interview Plan</TabsTrigger>
          <TabsTrigger value="offers">Offers ({roleOffers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Job Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspora-card"
            >
              <h3 className="font-medium mb-4">Job Description</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">About the Role</h4>
                  <p>We're looking for a {role.title} to join our {role.department} team in {role.location}. This is a {role.type} position at the {role.level} level.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Key Responsibilities</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Lead technical design and architecture decisions</li>
                    <li>Mentor junior team members and conduct code reviews</li>
                    <li>Collaborate with product and design teams on feature development</li>
                    <li>Contribute to team processes and engineering culture</li>
                    <li>Drive quality through testing and documentation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Requirements</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>5+ years of relevant experience</li>
                    <li>Strong technical foundation in relevant technologies</li>
                    <li>Experience with agile development methodologies</li>
                    <li>Excellent communication and collaboration skills</li>
                    <li>Track record of delivering high-quality software</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Role Details */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="aspora-card"
              >
                <h3 className="font-medium mb-4">Role Details</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Department', value: role.department, icon: Building2 },
                    { label: 'Team', value: role.team, icon: Users },
                    { label: 'Location', value: role.location, icon: MapPin },
                    { label: 'Employment Type', value: role.type, icon: Briefcase },
                    { label: 'Level', value: role.level, icon: Star },
                    { label: 'Compensation Range', value: '$150,000 - $200,000', icon: DollarSign },
                  ].map((detail) => (
                    <div key={detail.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <detail.icon className="w-4 h-4" />
                        {detail.label}
                      </div>
                      <span className="text-sm font-medium text-foreground">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Sourcing Stats */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="aspora-card"
              >
                <h3 className="font-medium mb-4">Sourcing Breakdown</h3>
                <div className="space-y-3">
                  {['LinkedIn', 'Referral', 'Career Page', 'Direct', 'Portfolio'].map((source) => {
                    const count = roleCandidates.filter(c => c.source === source).length;
                    const pct = roleCandidates.length > 0 ? Math.round((count / roleCandidates.length) * 100) : 0;
                    return (
                      <div key={source}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">{source}</span>
                          <span className="font-medium">{count} ({pct}%)</span>
                        </div>
                        <ProgressBar value={pct} size="sm" variant="primary" />
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="candidates">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {roleCandidates.length === 0 ? (
              <div className="aspora-card text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No candidates yet</h3>
                <p className="text-muted-foreground mb-4">Start sourcing candidates for this role.</p>
                <Button className="gap-2">
                  <UserPlus className="w-4 h-4" />
                  Add Candidate
                </Button>
              </div>
            ) : (
              roleCandidates.map((candidate) => (
                <motion.div key={candidate.id} variants={item}>
                  <Link to={`/hiring/candidate/${candidate.id}`}>
                    <div className="aspora-card-hover cursor-pointer">
                      <div className="flex items-center gap-4">
                        <img
                          src={candidate.avatar}
                          alt={candidate.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-medium text-foreground">{candidate.name}</h3>
                            <StatusBadge status={candidate.stage} />
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span>Applied {candidate.appliedDate}</span>
                            <span>Source: {candidate.source}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  'w-3 h-3',
                                  i < Math.floor(candidate.rating)
                                    ? 'fill-warning text-warning'
                                    : 'text-muted'
                                )}
                              />
                            ))}
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="interview-plan">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="aspora-card"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-medium">Interview Pipeline</h3>
              <Button variant="outline" size="sm">Edit Pipeline</Button>
            </div>
            <div className="relative pl-8 space-y-6">
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border" />
              {interviewStages.map((stage, index) => (
                <div key={stage.name} className="relative">
                  <div className={cn(
                    'absolute left-[-26px] w-4 h-4 rounded-full border-4 border-background',
                    index <= 2 ? 'bg-primary' : 'bg-muted'
                  )} />
                  <div className="p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{stage.name}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{stage.description}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {stage.duration}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="offers">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {roleOffers.length === 0 ? (
              <div className="aspora-card text-center py-12">
                <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No offers yet</h3>
                <p className="text-muted-foreground">Create an offer for a qualified candidate.</p>
              </div>
            ) : (
              roleOffers.map((offer) => (
                <motion.div key={offer.id} variants={item} className="aspora-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-foreground">{offer.candidateName}</h3>
                        <StatusBadge status={offer.status} />
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          ${offer.salary.toLocaleString()}/year
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Start: {offer.startDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Created: {offer.createdDate}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button size="sm">View Offer</Button>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Approvers: {offer.approvers.join(', ')}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
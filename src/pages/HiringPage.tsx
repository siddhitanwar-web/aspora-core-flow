import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search,
  Plus,
  Filter,
  Users,
  Clock,
  MapPin,
  Building2,
  MoreHorizontal,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Pause,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ProgressBar } from '@/components/common/ProgressBar';
import { roles, candidates, offers, dashboardStats } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

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

const pipelineStages = [
  { name: 'Applied', count: candidates.filter(c => c.stage === 'applied').length },
  { name: 'Screening', count: candidates.filter(c => c.stage === 'screening').length },
  { name: 'Interview', count: candidates.filter(c => c.stage === 'interview').length },
  { name: 'Offer', count: candidates.filter(c => c.stage === 'offer').length },
  { name: 'Hired', count: candidates.filter(c => c.stage === 'hired').length },
];

export default function HiringPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('roles');
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showOffer, setShowOffer] = useState<string | null>(null);
  const [showCSVImport, setShowCSVImport] = useState(false);
  const [showEmailTemplates, setShowEmailTemplates] = useState(false);
  const [showScheduleInterview, setShowScheduleInterview] = useState(false);
  const { toast } = useToast();

  const filteredRoles = roles.filter(role =>
    role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Hiring"
        description="Manage roles, candidates, and offers"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => setShowCSVImport(true)}>
              <ArrowUpRight className="w-4 h-4" />
              Import CSV
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => setShowEmailTemplates(true)}>
              <MoreHorizontal className="w-4 h-4" />
              Email Templates
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => setShowScheduleInterview(true)}>
              <Clock className="w-4 h-4" />
              Schedule Interview
            </Button>
            <Button className="gap-2" onClick={() => setShowCreateRole(true)}>
              <Plus className="w-4 h-4" />
              Create Role
            </Button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Open Roles"
          value={roles.filter(r => r.status === 'open').length}
          icon={<Building2 className="w-5 h-5" />}
          color="primary"
        />
        <StatCard
          title="Active Candidates"
          value={candidates.length}
          icon={<Users className="w-5 h-5" />}
          color="accent"
        />
        <StatCard
          title="Pending Offers"
          value={offers.filter(o => o.status === 'pending-approval').length}
          icon={<Clock className="w-5 h-5" />}
          color="warning"
        />
        <StatCard
          title="Avg Time to Hire"
          value={`${dashboardStats.avgTimeToHire} days`}
          icon={<Clock className="w-5 h-5" />}
          color="success"
        />
      </div>

      {/* Pipeline Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="aspora-card mb-8"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Pipeline Overview</h2>
        <div className="flex items-center justify-between gap-2">
          {pipelineStages.map((stage, index) => (
            <div key={stage.name} className="flex-1 text-center">
              <div className="relative">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`h-full ${index === pipelineStages.length - 1 ? 'bg-success' : 'bg-primary'}`}
                    style={{ opacity: 0.2 + (index * 0.2) }}
                  />
                </div>
                {index < pipelineStages.length - 1 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-background border-2 border-muted" />
                )}
              </div>
              <div className="mt-3">
                <p className="text-2xl font-semibold text-foreground">{stage.count}</p>
                <p className="text-xs text-muted-foreground">{stage.name}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Search and Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search roles or candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2" onClick={() => setShowFilters(true)}>
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="roles">Roles ({roles.length})</TabsTrigger>
          <TabsTrigger value="candidates">Candidates ({candidates.length})</TabsTrigger>
          <TabsTrigger value="offers">Offers ({offers.length})</TabsTrigger>
        </TabsList>
        
        {/* Link to Candidate Board */}
        <div className="flex justify-end mb-4 -mt-2">
          <Link to="/hiring/board">
            <Button variant="outline" size="sm" className="gap-2">
              <Users className="w-4 h-4" />
              Open Candidate Board
            </Button>
          </Link>
        </div>

        <TabsContent value="roles">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {filteredRoles.map((role) => (
              <motion.div key={role.id} variants={item}>
                <Link to={`/hiring/${role.id}`}>
                  <div className="aspora-card-hover cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium text-foreground">{role.title}</h3>
                          <StatusBadge status={role.status} />
                          <StatusBadge status={role.priority} />
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {role.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {role.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {role.candidates} candidates
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Opened {role.openDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{role.hiringManager}</p>
                          <p className="text-xs text-muted-foreground">Hiring Manager</p>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="candidates">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {filteredCandidates.map((candidate) => (
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
                          <span>{candidate.role}</span>
                          <span>Applied {candidate.appliedDate}</span>
                          <span>Source: {candidate.source}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${i < Math.floor(candidate.rating) ? 'bg-warning' : 'bg-muted'}`}
                            />
                          ))}
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="offers">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {offers.map((offer) => (
              <motion.div key={offer.id} variants={item}>
                <div className="aspora-card-hover">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-foreground">{offer.candidateName}</h3>
                        <StatusBadge status={offer.status} />
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{offer.role}</span>
                        <span>${offer.salary.toLocaleString()}/year</span>
                        <span>Start: {offer.startDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button size="sm" onClick={() => setShowOffer(offer.id)}>View Offer</Button>
                      <Button size="sm" variant="outline">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Approvers: {offer.approvers.join(', ')}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Create Role Dialog */}
      <Dialog open={showCreateRole} onOpenChange={setShowCreateRole}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label>Job Title</Label>
              <Input className="mt-1" placeholder="e.g. Senior Frontend Engineer" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Department</Label>
                <Select>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="people">People</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Team</Label>
                <Input className="mt-1" placeholder="e.g. Frontend" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Location</Label>
                <Input className="mt-1" placeholder="e.g. Remote" />
              </div>
              <div>
                <Label>Level</Label>
                <Select>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L2">L2 - Junior</SelectItem>
                    <SelectItem value="L3">L3 - Mid</SelectItem>
                    <SelectItem value="L4">L4 - Senior</SelectItem>
                    <SelectItem value="L5">L5 - Staff</SelectItem>
                    <SelectItem value="L6">L6 - Principal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Employment Type</Label>
                <Select>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Priority</Label>
                <Select>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Hiring Manager</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="marcus">Marcus Johnson</SelectItem>
                  <SelectItem value="sarah">Sarah Chen</SelectItem>
                  <SelectItem value="james">James Wilson</SelectItem>
                  <SelectItem value="david">David Kim</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Salary Min ($)</Label>
                <Input className="mt-1" type="number" placeholder="120000" />
              </div>
              <div>
                <Label>Salary Max ($)</Label>
                <Input className="mt-1" type="number" placeholder="180000" />
              </div>
            </div>
            <div>
              <Label>Job Description</Label>
              <Textarea className="mt-1" placeholder="Describe the role responsibilities..." rows={3} />
            </div>
            <div>
              <Label>Requirements</Label>
              <Textarea className="mt-1" placeholder="List key requirements, one per line..." rows={3} />
            </div>
            <div>
              <Label>Interview Pipeline</Label>
              <Input className="mt-1" placeholder="e.g. Phone Screen → Technical → System Design → Culture Fit" />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowCreateRole(false)}>Cancel</Button>
            <Button onClick={() => { setShowCreateRole(false); toast({ title: "Role Created", description: "New role has been created successfully." }); }}>
              Create Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filters Dialog */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Filter Results</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label>Department</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="All departments" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="All statuses" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Priority</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="All priorities" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowFilters(false)}>Reset</Button>
            <Button onClick={() => setShowFilters(false)}>Apply Filters</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Offer Dialog */}
      <Dialog open={!!showOffer} onOpenChange={() => setShowOffer(null)}>
        <DialogContent className="max-w-lg">
          {showOffer && (() => {
            const offer = offers.find(o => o.id === showOffer);
            if (!offer) return null;
            return (
              <>
                <DialogHeader>
                  <DialogTitle>Offer Details — {offer.candidateName}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-xs text-muted-foreground">Role</p>
                      <p className="font-medium text-foreground">{offer.role}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-xs text-muted-foreground">Salary</p>
                      <p className="font-medium text-foreground">${offer.salary.toLocaleString()}/year</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-xs text-muted-foreground">Start Date</p>
                      <p className="font-medium text-foreground">{offer.startDate}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-xs text-muted-foreground">Status</p>
                      <StatusBadge status={offer.status} />
                    </div>
                  </div>
                </div>
                <DialogFooter className="mt-4">
                  <Button variant="outline" onClick={() => setShowOffer(null)}>Close</Button>
                  <Button onClick={() => { setShowOffer(null); toast({ title: "Offer Approved", description: `Offer for ${offer.candidateName} has been approved.` }); }}>
                    Approve Offer
                  </Button>
                </DialogFooter>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* CSV Import Dialog */}
      <Dialog open={showCSVImport} onOpenChange={setShowCSVImport}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Import Candidates via CSV</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/30 transition-colors">
              <ArrowUpRight className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium text-foreground">Drop CSV file here</p>
              <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Expected columns:</p>
              <p className="text-xs font-mono text-foreground">name, email, role, source, resume_url</p>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowCSVImport(false)}>Cancel</Button>
            <Button onClick={() => { setShowCSVImport(false); toast({ title: "Import Started", description: "Processing CSV file. Candidates will appear shortly." }); }}>
              Import
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Templates Dialog */}
      <Dialog open={showEmailTemplates} onOpenChange={setShowEmailTemplates}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Email Templates</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            {[
              { stage: 'Application Received', subject: 'Thank you for applying to {role}' },
              { stage: 'Screening Invite', subject: 'Invitation to phone screen for {role}' },
              { stage: 'Interview Invite', subject: 'Interview scheduled for {role}' },
              { stage: 'Rejection', subject: 'Update on your application for {role}' },
              { stage: 'Offer Letter', subject: 'Offer from Aspora — {role}' },
            ].map(t => (
              <div key={t.stage} className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.stage}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.subject}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => toast({ title: "Template Opened", description: `Editing "${t.stage}" template.` })}>Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Interview Dialog */}
      <Dialog open={showScheduleInterview} onOpenChange={setShowScheduleInterview}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label>Candidate</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select candidate..." /></SelectTrigger>
                <SelectContent>
                  {candidates.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name} — {c.role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Interview Type</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">Phone Screen</SelectItem>
                  <SelectItem value="technical">Technical Interview</SelectItem>
                  <SelectItem value="system-design">System Design</SelectItem>
                  <SelectItem value="culture">Culture Fit</SelectItem>
                  <SelectItem value="hiring-manager">Hiring Manager Round</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date</Label>
                <Input className="mt-1" type="date" />
              </div>
              <div>
                <Label>Time</Label>
                <Input className="mt-1" type="time" />
              </div>
            </div>
            <div>
              <Label>Interviewers</Label>
              <Input className="mt-1" placeholder="e.g. Marcus Johnson, Sarah Chen" />
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground">📅 Calendar integration will check interviewer availability and send invites automatically.</p>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowScheduleInterview(false)}>Cancel</Button>
            <Button onClick={() => { setShowScheduleInterview(false); toast({ title: "Interview Scheduled", description: "Calendar invites have been sent." }); }}>
              Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Role
          </Button>
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
        <Button variant="outline" className="gap-2">
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
                      <Button size="sm">View Offer</Button>
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
    </div>
  );
}

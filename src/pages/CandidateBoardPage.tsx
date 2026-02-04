import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Filter,
  Search,
  RefreshCw,
  UserPlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/common/PageHeader';
import { CandidateBoard } from '@/components/hiring/CandidateBoard';
import { candidates, roles } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CandidateBoardPage() {
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const pipelineStats = {
    applied: candidates.filter(c => c.stage === 'applied').length,
    screening: candidates.filter(c => c.stage === 'screening').length,
    interview: candidates.filter(c => c.stage === 'interview').length,
    offer: candidates.filter(c => c.stage === 'offer').length,
    hired: candidates.filter(c => c.stage === 'hired').length,
  };

  return (
    <div className="max-w-full mx-auto">
      <PageHeader
        title="Candidate Board"
        description="Visual pipeline of all candidates across stages"
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="aspora-card">
          <p className="text-sm text-muted-foreground">Applied</p>
          <p className="text-2xl font-semibold mt-1">{pipelineStats.applied}</p>
        </div>
        <div className="aspora-card">
          <p className="text-sm text-muted-foreground">Screening</p>
          <p className="text-2xl font-semibold mt-1 text-primary">{pipelineStats.screening}</p>
        </div>
        <div className="aspora-card">
          <p className="text-sm text-muted-foreground">Interview</p>
          <p className="text-2xl font-semibold mt-1 text-accent">{pipelineStats.interview}</p>
        </div>
        <div className="aspora-card">
          <p className="text-sm text-muted-foreground">Offer</p>
          <p className="text-2xl font-semibold mt-1 text-amber-500">{pipelineStats.offer}</p>
        </div>
        <div className="aspora-card">
          <p className="text-sm text-muted-foreground">Hired</p>
          <p className="text-2xl font-semibold mt-1 text-green-500">{pipelineStats.hired}</p>
        </div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {roles.map(role => (
              <SelectItem key={role.id} value={role.id}>
                {role.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          More Filters
        </Button>
      </motion.div>

      {/* Kanban Board */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <CandidateBoard roleFilter={roleFilter === 'all' ? undefined : roleFilter} />
      </motion.div>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  User,
  Star,
  Calendar,
  MoreHorizontal,
  ArrowRight,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { candidates as allCandidates, type Candidate } from '@/data/mockData';

type Stage = 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';

interface StageConfig {
  id: Stage;
  label: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}

const stages: StageConfig[] = [
  { id: 'applied', label: 'Applied', color: 'text-muted-foreground', bgColor: 'bg-muted/50', icon: <User className="w-4 h-4" /> },
  { id: 'screening', label: 'Screening', color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-950/30', icon: <Clock className="w-4 h-4" /> },
  { id: 'interview', label: 'Interview', color: 'text-purple-600', bgColor: 'bg-purple-50 dark:bg-purple-950/30', icon: <Calendar className="w-4 h-4" /> },
  { id: 'offer', label: 'Offer', color: 'text-amber-600', bgColor: 'bg-amber-50 dark:bg-amber-950/30', icon: <Star className="w-4 h-4" /> },
  { id: 'hired', label: 'Hired', color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-950/30', icon: <CheckCircle className="w-4 h-4" /> },
  { id: 'rejected', label: 'Rejected', color: 'text-red-600', bgColor: 'bg-red-50 dark:bg-red-950/30', icon: <XCircle className="w-4 h-4" /> },
];

interface CandidateBoardProps {
  roleFilter?: string;
}

export function CandidateBoard({ roleFilter }: CandidateBoardProps) {
  const [candidatesList, setCandidatesList] = useState<Candidate[]>(allCandidates);

  const filteredCandidates = roleFilter
    ? candidatesList.filter(c => c.roleId === roleFilter)
    : candidatesList;

  const getCandidatesByStage = (stage: Stage) => {
    return filteredCandidates.filter(c => c.stage === stage);
  };

  const moveCandidate = (candidateId: string, newStage: Stage) => {
    setCandidatesList(prev =>
      prev.map(c =>
        c.id === candidateId ? { ...c, stage: newStage } : c
      )
    );
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {stages.map((stage) => {
        const stageCandidates = getCandidatesByStage(stage.id);
        return (
          <div
            key={stage.id}
            className={cn(
              'flex-shrink-0 w-72 rounded-xl border border-border',
              stage.bgColor
            )}
          >
            {/* Stage Header */}
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={stage.color}>{stage.icon}</span>
                  <h3 className={cn('font-medium', stage.color)}>{stage.label}</h3>
                </div>
                <span className={cn(
                  'text-sm font-semibold px-2 py-0.5 rounded-full',
                  stage.bgColor,
                  stage.color
                )}>
                  {stageCandidates.length}
                </span>
              </div>
            </div>

            {/* Candidates List */}
            <div className="p-3 space-y-3 min-h-[200px] max-h-[600px] overflow-y-auto">
              {stageCandidates.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No candidates
                </div>
              ) : (
                stageCandidates.map((candidate, index) => (
                  <motion.div
                    key={candidate.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-background rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-3">
                      <div className="flex items-start gap-3">
                        <img
                          src={candidate.avatar}
                          alt={candidate.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/hiring/candidate/${candidate.id}`}
                            className="font-medium text-foreground hover:text-primary truncate block"
                          >
                            {candidate.name}
                          </Link>
                          <p className="text-xs text-muted-foreground truncate">
                            {candidate.role}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/hiring/candidate/${candidate.id}`}>
                                View Profile
                              </Link>
                            </DropdownMenuItem>
                            {stages
                              .filter(s => s.id !== stage.id && s.id !== 'rejected')
                              .map(s => (
                                <DropdownMenuItem
                                  key={s.id}
                                  onClick={() => moveCandidate(candidate.id, s.id)}
                                >
                                  <ArrowRight className="w-4 h-4 mr-2" />
                                  Move to {s.label}
                                </DropdownMenuItem>
                              ))}
                            {stage.id !== 'rejected' && (
                              <DropdownMenuItem
                                onClick={() => moveCandidate(candidate.id, 'rejected')}
                                className="text-destructive"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
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
                        <span className="text-xs text-muted-foreground">
                          {candidate.source}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>Applied {candidate.appliedDate}</span>
                      </div>
                    </div>

                    {/* Quick Actions for specific stages */}
                    {stage.id === 'offer' && (
                      <div className="px-3 pb-3 pt-1 border-t border-border/50 mt-2">
                        <Link to={`/preonboarding/${candidate.id}`}>
                          <Button size="sm" className="w-full text-xs">
                            View Pre-onboarding
                          </Button>
                        </Link>
                      </div>
                    )}
                    {stage.id === 'hired' && (
                      <div className="px-3 pb-3 pt-1 border-t border-border/50 mt-2">
                        <Link to={`/employees/new-from/${candidate.id}`}>
                          <Button size="sm" variant="outline" className="w-full text-xs">
                            View Employee Profile
                          </Button>
                        </Link>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

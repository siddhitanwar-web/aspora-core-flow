import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Star,
  CheckCircle2,
  Clock,
  FileText,
  AlertCircle,
  X,
  Edit,
  RotateCcw,
  ThumbsUp,
  BarChart3,
  MessageSquare,
  GitBranch,
  Users,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ProgressBar } from '@/components/common/ProgressBar';
import { employees, reviews, aiScorecards } from '@/data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const aiStatusLabels: Record<string, { label: string; color: string }> = {
  'not-generated': { label: 'Not Generated', color: 'bg-muted text-muted-foreground' },
  'ai-draft': { label: 'AI Draft Ready', color: 'bg-warning/10 text-warning' },
  'manager-reviewed': { label: 'Manager Reviewed', color: 'bg-primary/10 text-primary' },
  'approved': { label: 'Approved', color: 'bg-success/10 text-success' },
};

export function AIReviewTab() {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [generating, setGenerating] = useState<string | null>(null);

  const handleGenerate = (employeeId: string) => {
    setGenerating(employeeId);
    setTimeout(() => {
      setGenerating(null);
      setSelectedEmployee(employeeId);
    }, 2000);
  };

  const handleBulkGenerate = () => {
    setGenerating('bulk');
    setTimeout(() => setGenerating(null), 3000);
  };

  const scorecard = selectedEmployee ? aiScorecards.find(s => s.employeeId === selectedEmployee) : null;
  const selectedEmp = selectedEmployee ? employees.find(e => e.id === selectedEmployee) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">AI-Powered Reviews</h2>
            <p className="text-sm text-muted-foreground">Generate comprehensive reviews using AI analysis</p>
          </div>
        </div>
        <Button
          className="gap-2"
          onClick={handleBulkGenerate}
          disabled={generating === 'bulk'}
        >
          <Sparkles className="w-4 h-4" />
          {generating === 'bulk' ? 'Generating All...' : 'Generate All AI Reviews'}
        </Button>
      </div>

      {/* Employee List */}
      <div className="space-y-3">
        {reviews.map((review) => {
          const emp = employees.find(e => e.id === review.employeeId);
          if (!emp) return null;
          const status = aiStatusLabels[review.aiStatus || 'not-generated'];
          const isGenerating = generating === emp.id;

          return (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspora-card-hover"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={emp.avatar} alt={emp.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">{emp.name}</h3>
                      <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', status.color)}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{emp.role} • {emp.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {review.aiStatus === 'ai-draft' || review.aiStatus === 'manager-reviewed' || review.aiStatus === 'approved' ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                      onClick={() => setSelectedEmployee(emp.id)}
                    >
                      <FileText className="w-4 h-4" />
                      View Scorecard
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="gap-1"
                      onClick={() => handleGenerate(emp.id)}
                      disabled={isGenerating}
                    >
                      <Sparkles className="w-4 h-4" />
                      {isGenerating ? 'Generating...' : 'Generate AI Review'}
                    </Button>
                  )}
                </div>
              </div>
              {isGenerating && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-primary">Analyzing employee data...</span>
                  </div>
                  <ProgressBar value={65} variant="primary" size="sm" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* AI Review Scorecard Modal */}
      <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          {scorecard && selectedEmp && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <img src={selectedEmp.avatar} alt={selectedEmp.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <span>AI Review: {selectedEmp.name}</span>
                    <p className="text-sm font-normal text-muted-foreground">{selectedEmp.role} • Q1 2024</p>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                {/* Data Sources Panel */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    Data Sources
                  </h3>
                  <div className="space-y-3">
                    {[
                      { icon: MessageSquare, label: '1:1 Meeting Notes', value: `${scorecard.dataSources.meetingNotes} notes found`, checked: true },
                      { icon: BarChart3, label: 'KPI Progress', value: scorecard.dataSources.kpiProgress, checked: true },
                      { icon: GitBranch, label: 'JIRA/Bitbucket', value: scorecard.dataSources.contributions, checked: true },
                      { icon: Users, label: 'Interviews Conducted', value: `${scorecard.dataSources.interviews} interviews held`, checked: true },
                      { icon: ThumbsUp, label: 'Peer Feedback', value: `${scorecard.dataSources.peerFeedback} peer reviews`, checked: true },
                      { icon: GraduationCap, label: 'Learning Progress', value: scorecard.dataSources.learningProgress, checked: true },
                    ].map((source) => (
                      <div key={source.label} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                        <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{source.label}</p>
                          <p className="text-xs text-muted-foreground">{source.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Generated Scorecard */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Overall Rating */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">Overall Rating</h3>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              'w-5 h-5',
                              star <= Math.round(scorecard.overallRating)
                                ? 'fill-warning text-warning'
                                : 'text-muted'
                            )}
                          />
                        ))}
                        <span className="ml-2 text-lg font-bold text-foreground">{scorecard.overallRating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Category Scores */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Category Scores</h3>
                    <div className="space-y-3">
                      {scorecard.categories.map((cat) => (
                        <div key={cat.name} className="p-3 rounded-lg bg-muted/30">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-foreground">{cat.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-primary">{cat.score}/5</span>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Edit className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <ProgressBar value={cat.score * 20} variant="primary" size="sm" />
                          <p className="text-xs text-muted-foreground mt-2">{cat.reasoning}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-foreground">Strengths</h3>
                      <Button variant="ghost" size="sm" className="h-7"><Edit className="w-3 h-3 mr-1" /> Edit</Button>
                    </div>
                    <ul className="space-y-2">
                      {scorecard.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Areas for Improvement */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-foreground">Areas for Improvement</h3>
                      <Button variant="ghost" size="sm" className="h-7"><Edit className="w-3 h-3 mr-1" /> Edit</Button>
                    </div>
                    <ul className="space-y-2">
                      {scorecard.improvements.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                          <AlertCircle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Summary */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-foreground">Summary</h3>
                      <Button variant="ghost" size="sm" className="h-7"><Edit className="w-3 h-3 mr-1" /> Edit</Button>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
                      {scorecard.summary}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <Button className="gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Approve as Final
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Edit className="w-4 h-4" />
                      Edit & Save Draft
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Regenerate
                    </Button>
                    <Button variant="ghost" className="gap-2 text-destructive">
                      <X className="w-4 h-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

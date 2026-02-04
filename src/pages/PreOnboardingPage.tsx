import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Upload,
  FileText,
  User,
  Building2,
  Mail,
  Phone,
  Laptop,
  Shield,
  AlertCircle,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { ProgressBar } from '@/components/common/ProgressBar';
import { preOnboardingCandidates, type OnboardingDocument, type OnboardingTask } from '@/data/onboardingData';
import { cn } from '@/lib/utils';
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

const documentCategoryIcons: Record<string, React.ReactNode> = {
  identity: <User className="w-4 h-4" />,
  tax: <FileText className="w-4 h-4" />,
  banking: <Building2 className="w-4 h-4" />,
  compliance: <Shield className="w-4 h-4" />,
  personal: <User className="w-4 h-4" />,
};

const documentStatusStyles: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  pending: { bg: 'bg-muted', text: 'text-muted-foreground', icon: <Clock className="w-3.5 h-3.5" /> },
  submitted: { bg: 'bg-blue-100 dark:bg-blue-950/50', text: 'text-blue-600', icon: <Upload className="w-3.5 h-3.5" /> },
  verified: { bg: 'bg-green-100 dark:bg-green-950/50', text: 'text-green-600', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  rejected: { bg: 'bg-red-100 dark:bg-red-950/50', text: 'text-red-600', icon: <AlertCircle className="w-3.5 h-3.5" /> },
};

export default function PreOnboardingPage() {
  const { candidateId } = useParams();
  const [activeTab, setActiveTab] = useState('documents');

  // Find the pre-onboarding candidate
  const candidate = preOnboardingCandidates.find(c => c.candidateId === candidateId) || preOnboardingCandidates[0];

  if (!candidate) {
    return (
      <div className="max-w-7xl mx-auto text-center py-16">
        <h1 className="text-2xl font-semibold mb-4">Candidate Not Found</h1>
        <Link to="/hiring">
          <Button>Back to Hiring</Button>
        </Link>
      </div>
    );
  }

  // Calculate progress
  const requiredDocs = candidate.documents.filter(d => d.required);
  const verifiedDocs = requiredDocs.filter(d => d.status === 'verified');
  const documentProgress = Math.round((verifiedDocs.length / requiredDocs.length) * 100);

  const completedTasks = candidate.tasks.filter(t => t.status === 'completed');
  const taskProgress = Math.round((completedTasks.length / candidate.tasks.length) * 100);

  // Days until start
  const startDate = new Date(candidate.startDate);
  const today = new Date();
  const daysUntilStart = Math.ceil((startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Group documents by category
  const documentsByCategory = candidate.documents.reduce((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = [];
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, OnboardingDocument[]>);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Button */}
      <Link to="/hiring" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Hiring
      </Link>

      <PageHeader
        title="Pre-Onboarding"
        description={`Prepare ${candidate.name} for their first day`}
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Mail className="w-4 h-4" />
              Send Reminder
            </Button>
            <Button className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Sync Status
            </Button>
          </div>
        }
      />

      {/* Candidate Overview Card */}
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
                <h2 className="text-xl font-semibold text-foreground">{candidate.name}</h2>
                <p className="text-muted-foreground">{candidate.role}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {candidate.department} • {candidate.team}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    Manager: {candidate.manager}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-center">
                <div className="p-4 rounded-lg bg-primary/10">
                  <div className="flex items-center gap-2 text-primary">
                    <Calendar className="w-5 h-5" />
                    <span className="text-2xl font-bold">{daysUntilStart}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Days to Start</p>
                </div>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Documents</span>
                  <span className="font-medium">{verifiedDocs.length}/{requiredDocs.length} verified</span>
                </div>
                <ProgressBar value={documentProgress} variant="primary" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Tasks</span>
                  <span className="font-medium">{completedTasks.length}/{candidate.tasks.length} complete</span>
                </div>
                <ProgressBar value={taskProgress} variant="accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Status */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center',
              candidate.welcomeMessageSent ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'
            )}>
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Welcome Email</p>
              <p className="text-xs text-muted-foreground">
                {candidate.welcomeMessageSent ? 'Sent' : 'Pending'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center',
              candidate.equipmentOrdered ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'
            )}>
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Equipment</p>
              <p className="text-xs text-muted-foreground">
                {candidate.equipmentOrdered ? 'Ordered' : 'Not Ordered'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center',
              candidate.accountsCreated ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'
            )}>
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Accounts</p>
              <p className="text-xs text-muted-foreground">
                {candidate.accountsCreated ? 'Created' : 'Pending'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs for Documents and Tasks */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="documents">
            Documents ({verifiedDocs.length}/{requiredDocs.length})
          </TabsTrigger>
          <TabsTrigger value="tasks">
            Tasks ({completedTasks.length}/{candidate.tasks.length})
          </TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {Object.entries(documentsByCategory).map(([category, docs]) => (
              <motion.div key={category} variants={item}>
                <div className="aspora-card">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-muted-foreground">
                      {documentCategoryIcons[category]}
                    </span>
                    <h3 className="font-medium capitalize">{category}</h3>
                    <span className="text-xs text-muted-foreground">
                      ({docs.filter(d => d.status === 'verified').length}/{docs.length})
                    </span>
                  </div>
                  <div className="space-y-3">
                    {docs.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-sm">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">{doc.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {doc.submittedDate && (
                            <span className="text-xs text-muted-foreground">
                              Submitted {doc.submittedDate}
                            </span>
                          )}
                          <span className={cn(
                            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                            documentStatusStyles[doc.status].bg,
                            documentStatusStyles[doc.status].text
                          )}>
                            {documentStatusStyles[doc.status].icon}
                            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          </span>
                          {doc.status === 'pending' && (
                            <Button size="sm" variant="outline" className="text-xs">
                              <Upload className="w-3 h-3 mr-1" />
                              Upload
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="tasks">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {candidate.tasks.map((task) => (
              <motion.div key={task.id} variants={item}>
                <div className={cn(
                  'aspora-card flex items-center justify-between',
                  task.status === 'completed' && 'opacity-60'
                )}>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center',
                      task.status === 'completed' && 'bg-green-100 text-green-600',
                      task.status === 'in-progress' && 'bg-blue-100 text-blue-600',
                      task.status === 'pending' && 'bg-muted text-muted-foreground'
                    )}>
                      {task.status === 'completed' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : task.status === 'in-progress' ? (
                        <RefreshCw className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className={cn(
                        'font-medium',
                        task.status === 'completed' && 'line-through'
                      )}>
                        {task.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{task.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {task.assignee && (
                      <span className="text-xs text-muted-foreground">
                        Assigned to: {task.assignee}
                      </span>
                    )}
                    <span className={cn(
                      'px-2.5 py-1 rounded-full text-xs font-medium',
                      task.status === 'completed' && 'bg-green-100 text-green-600',
                      task.status === 'in-progress' && 'bg-blue-100 text-blue-600',
                      task.status === 'pending' && 'bg-muted text-muted-foreground'
                    )}>
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="timeline">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="aspora-card"
          >
            <h3 className="font-medium mb-6">Onboarding Timeline</h3>
            <div className="relative pl-8 space-y-6">
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border" />
              
              <div className="relative">
                <div className="absolute left-[-26px] w-4 h-4 rounded-full bg-green-500 border-4 border-background" />
                <div>
                  <p className="font-medium">Offer Accepted</p>
                  <p className="text-sm text-muted-foreground">{candidate.offerAcceptedDate}</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-[-26px] w-4 h-4 rounded-full bg-green-500 border-4 border-background" />
                <div>
                  <p className="font-medium">Welcome Email Sent</p>
                  <p className="text-sm text-muted-foreground">
                    {candidate.welcomeMessageSent ? 'Completed' : 'Pending'}
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className={cn(
                  'absolute left-[-26px] w-4 h-4 rounded-full border-4 border-background',
                  documentProgress === 100 ? 'bg-green-500' : 'bg-blue-500'
                )} />
                <div>
                  <p className="font-medium">Document Collection</p>
                  <p className="text-sm text-muted-foreground">{documentProgress}% complete</p>
                </div>
              </div>

              <div className="relative">
                <div className={cn(
                  'absolute left-[-26px] w-4 h-4 rounded-full border-4 border-background',
                  candidate.equipmentOrdered ? 'bg-green-500' : 'bg-muted'
                )} />
                <div>
                  <p className="font-medium">Equipment Setup</p>
                  <p className="text-sm text-muted-foreground">
                    {candidate.equipmentOrdered ? 'Ordered' : 'Pending'}
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className={cn(
                  'absolute left-[-26px] w-4 h-4 rounded-full border-4 border-background',
                  candidate.accountsCreated ? 'bg-green-500' : 'bg-muted'
                )} />
                <div>
                  <p className="font-medium">Account Creation</p>
                  <p className="text-sm text-muted-foreground">
                    {candidate.accountsCreated ? 'Completed' : 'Pending'}
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-[-26px] w-4 h-4 rounded-full bg-primary border-4 border-background" />
                <div>
                  <p className="font-medium text-primary">Start Date</p>
                  <p className="text-sm text-muted-foreground">{candidate.startDate}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  User,
  FileText,
  Target,
  GraduationCap,
  Star,
  Download,
  Upload,
  Clock,
  CheckCircle2,
  MoreHorizontal,
  Edit,
  Briefcase,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { ProgressBar } from '@/components/common/ProgressBar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { employees, goals, reviews, learningPaths } from '@/data/mockData';
import { employeeDocuments, type EmployeeDocument } from '@/data/onboardingData';
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

const documentCategoryStyles: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  onboarding: { bg: 'bg-blue-100 dark:bg-blue-950/50', text: 'text-blue-600', icon: <User className="w-4 h-4" /> },
  performance: { bg: 'bg-purple-100 dark:bg-purple-950/50', text: 'text-purple-600', icon: <Target className="w-4 h-4" /> },
  compensation: { bg: 'bg-green-100 dark:bg-green-950/50', text: 'text-green-600', icon: <Briefcase className="w-4 h-4" /> },
  training: { bg: 'bg-amber-100 dark:bg-amber-950/50', text: 'text-amber-600', icon: <GraduationCap className="w-4 h-4" /> },
  personal: { bg: 'bg-pink-100 dark:bg-pink-950/50', text: 'text-pink-600', icon: <User className="w-4 h-4" /> },
  compliance: { bg: 'bg-red-100 dark:bg-red-950/50', text: 'text-red-600', icon: <FileText className="w-4 h-4" /> },
};

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const employee = employees.find(e => e.id === id) || employees[0];
  const employeeDocs = employeeDocuments[employee.id] || [];
  const employeeGoals = goals.filter(g => g.employeeId === employee.id);
  const employeeReviews = reviews.filter(r => r.employeeId === employee.id);
  const employeeLearning = learningPaths.slice(0, 2);

  // Group documents by category
  const documentsByCategory = employeeDocs.reduce((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = [];
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, EmployeeDocument[]>);

  // Calculate tenure
  const startDate = new Date(employee.startDate);
  const today = new Date();
  const tenureMonths = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
  const tenureYears = Math.floor(tenureMonths / 12);
  const remainingMonths = tenureMonths % 12;
  const tenureText = tenureYears > 0 
    ? `${tenureYears}y ${remainingMonths}m` 
    : `${remainingMonths} months`;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Button */}
      <Link to="/employees" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Employees
      </Link>

      <PageHeader
        title=""
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Role Change</DropdownMenuItem>
                <DropdownMenuItem>Transfer Team</DropdownMenuItem>
                <DropdownMenuItem>Start Offboarding</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      />

      {/* Employee Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="aspora-card mb-8"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-28 h-28 rounded-full object-cover ring-4 ring-primary/10"
          />
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-semibold text-foreground">{employee.name}</h1>
                  <StatusBadge status={employee.status} />
                </div>
                <p className="text-lg text-muted-foreground mt-1">{employee.role}</p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {employee.department} • {employee.team}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {employee.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Started {employee.startDate}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <span className="aspora-badge-primary">{employee.level}</span>
                  <p className="text-xs text-muted-foreground mt-1">Level</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="font-semibold">{tenureText}</p>
                  <p className="text-xs text-muted-foreground">Tenure</p>
                </div>
              </div>
            </div>

            {/* Contact & Manager */}
            <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-border">
              <a href={`mailto:${employee.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                <Mail className="w-4 h-4" />
                {employee.email}
              </a>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                Reports to: <span className="font-medium text-foreground">{employee.manager}</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="aspora-card text-center"
        >
          <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary">
            {employee.performanceRating ? (
              <>
                <Star className="w-5 h-5 fill-warning text-warning" />
                {employee.performanceRating}
              </>
            ) : (
              <span className="text-muted-foreground text-lg">N/A</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Performance Rating</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="aspora-card text-center"
        >
          <p className="text-2xl font-bold text-accent">{employeeGoals.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Active Goals</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="aspora-card text-center"
        >
          <p className="text-2xl font-bold">{employeeDocs.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Documents</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="aspora-card text-center"
        >
          <p className="text-2xl font-bold text-green-500">{employee.learningProgress || 0}%</p>
          <p className="text-xs text-muted-foreground mt-1">Learning Progress</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents ({employeeDocs.length})</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Goals Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspora-card"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Current Goals</h3>
                <Link to="/performance" className="text-sm text-primary hover:underline">View All</Link>
              </div>
              <div className="space-y-4">
                {employeeGoals.length > 0 ? employeeGoals.slice(0, 3).map((goal) => (
                  <div key={goal.id} className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">{goal.title}</p>
                      <StatusBadge status={goal.status} />
                    </div>
                    <ProgressBar value={goal.progress} size="sm" variant="primary" />
                  </div>
                )) : (
                  <p className="text-sm text-muted-foreground py-4 text-center">No active goals</p>
                )}
              </div>
            </motion.div>

            {/* Recent Documents */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="aspora-card"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Recent Documents</h3>
                <Button variant="outline" size="sm" className="gap-1 text-xs">
                  <Upload className="w-3 h-3" />
                  Upload
                </Button>
              </div>
              <div className="space-y-2">
                {employeeDocs.slice(0, 4).map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center',
                        documentCategoryStyles[doc.category]?.bg || 'bg-muted'
                      )}>
                        <FileText className={cn(
                          'w-4 h-4',
                          documentCategoryStyles[doc.category]?.text || 'text-muted-foreground'
                        )} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.uploadDate}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Learning Progress */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="aspora-card"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Learning Path</h3>
                <Link to="/learning" className="text-sm text-primary hover:underline">View All</Link>
              </div>
              <div className="space-y-4">
                {employeeLearning.map((path) => (
                  <div key={path.id} className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">{path.title}</p>
                      <span className="text-xs text-muted-foreground">{path.progress}%</span>
                    </div>
                    <ProgressBar value={path.progress} size="sm" variant="accent" />
                    <div className="flex flex-wrap gap-1 mt-2">
                      {path.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Review History */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="aspora-card"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Review History</h3>
              </div>
              <div className="space-y-3">
                {employeeReviews.length > 0 ? employeeReviews.map((review) => (
                  <div key={review.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="text-sm font-medium">{review.cycle}</p>
                      <p className="text-xs text-muted-foreground">By {review.reviewerName}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {review.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-warning text-warning" />
                          <span className="text-sm font-medium">{review.rating}</span>
                        </div>
                      )}
                      <StatusBadge status={review.status} />
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-muted-foreground py-4 text-center">No reviews yet</p>
                )}
              </div>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Upload Section */}
            <div className="aspora-card border-dashed border-2 border-border bg-muted/20">
              <div className="text-center py-6">
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-medium">Upload New Document</p>
                <p className="text-sm text-muted-foreground mb-3">Drag and drop or click to browse</p>
                <Button variant="outline">Choose File</Button>
              </div>
            </div>

            {/* Documents by Category */}
            {Object.entries(documentsByCategory).map(([category, docs]) => (
              <motion.div key={category} variants={item}>
                <div className="aspora-card">
                  <div className="flex items-center gap-2 mb-4">
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center',
                      documentCategoryStyles[category]?.bg || 'bg-muted'
                    )}>
                      {documentCategoryStyles[category]?.icon || <FileText className="w-4 h-4" />}
                    </div>
                    <h3 className="font-medium capitalize">{category}</h3>
                    <span className="text-xs text-muted-foreground">({docs.length})</span>
                  </div>
                  <div className="space-y-2">
                    {docs.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className={cn(
                            'w-5 h-5',
                            documentCategoryStyles[doc.category]?.text || 'text-muted-foreground'
                          )} />
                          <div>
                            <p className="font-medium text-sm">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Uploaded {doc.uploadDate} by {doc.addedBy}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {doc.expiryDate && (
                            <span className="text-xs text-muted-foreground">
                              Expires: {doc.expiryDate}
                            </span>
                          )}
                          <span className={cn(
                            'px-2 py-1 rounded-full text-xs font-medium',
                            doc.status === 'active' && 'bg-green-100 text-green-600 dark:bg-green-950/50',
                            doc.status === 'expired' && 'bg-red-100 text-red-600 dark:bg-red-950/50',
                            doc.status === 'pending-renewal' && 'bg-amber-100 text-amber-600 dark:bg-amber-950/50'
                          )}>
                            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1).replace('-', ' ')}
                          </span>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="space-y-6">
            {/* Performance Overview */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspora-card"
            >
              <h3 className="font-medium mb-4">Performance Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-lg bg-muted/30">
                  <div className="flex items-center justify-center gap-2 text-3xl font-bold">
                    <Star className="w-8 h-8 fill-warning text-warning" />
                    {employee.performanceRating || 'N/A'}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Current Rating</p>
                </div>
                <div className="text-center p-6 rounded-lg bg-muted/30">
                  <p className="text-3xl font-bold text-primary">{employeeGoals.filter(g => g.status === 'completed').length}</p>
                  <p className="text-sm text-muted-foreground mt-2">Goals Completed</p>
                </div>
                <div className="text-center p-6 rounded-lg bg-muted/30">
                  <p className="text-3xl font-bold text-accent">{employeeReviews.length}</p>
                  <p className="text-sm text-muted-foreground mt-2">Reviews</p>
                </div>
              </div>
            </motion.div>

            {/* Goals */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="aspora-card"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Goals & OKRs</h3>
                <Button size="sm">Add Goal</Button>
              </div>
              <div className="space-y-4">
                {employeeGoals.map((goal) => (
                  <div key={goal.id} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium">{goal.title}</p>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      </div>
                      <StatusBadge status={goal.status} />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <ProgressBar value={goal.progress} variant="primary" />
                      </div>
                      <span className="text-sm font-medium">{goal.progress}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Due: {goal.dueDate}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="learning">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Learning Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div variants={item} className="aspora-card text-center">
                <p className="text-3xl font-bold text-primary">{employee.learningProgress || 0}%</p>
                <p className="text-sm text-muted-foreground mt-1">Overall Progress</p>
              </motion.div>
              <motion.div variants={item} className="aspora-card text-center">
                <p className="text-3xl font-bold text-accent">{employeeLearning.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Active Paths</p>
              </motion.div>
              <motion.div variants={item} className="aspora-card text-center">
                <p className="text-3xl font-bold text-green-500">2</p>
                <p className="text-sm text-muted-foreground mt-1">Certifications</p>
              </motion.div>
            </div>

            {/* Learning Paths */}
            {employeeLearning.map((path) => (
              <motion.div key={path.id} variants={item} className="aspora-card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium">{path.title}</h3>
                    <p className="text-sm text-muted-foreground">{path.description}</p>
                  </div>
                  <Button variant="outline" size="sm">Continue</Button>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex-1">
                    <ProgressBar value={path.progress} variant="accent" />
                  </div>
                  <span className="text-sm font-medium">{path.progress}%</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{path.modules} modules • {path.duration}</span>
                  <div className="flex gap-1">
                    {path.skills.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs">
                        {skill}
                      </span>
                    ))}
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

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search,
  Plus,
  Filter,
  MapPin,
  Building2,
  Mail,
  ArrowUpRight,
  Grid3X3,
  List,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ProgressBar } from '@/components/common/ProgressBar';
import { employees, dashboardStats } from '@/data/mockData';

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

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const departments = [...new Set(employees.map(e => e.department))];

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Employees"
        description="Manage your workforce directory"
        actions={
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Employee
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Employees"
          value={dashboardStats.totalEmployees}
          change={{ value: 3.2, positive: true }}
          icon={<Building2 className="w-5 h-5" />}
          color="primary"
        />
        <StatCard
          title="Onboarding"
          value={employees.filter(e => e.status === 'onboarding').length}
          icon={<Building2 className="w-5 h-5" />}
          color="accent"
        />
        <StatCard
          title="Departments"
          value={departments.length}
          icon={<Building2 className="w-5 h-5" />}
          color="success"
        />
        <StatCard
          title="Attrition Rate"
          value={`${dashboardStats.attritionRate}%`}
          icon={<Building2 className="w-5 h-5" />}
          color="warning"
        />
      </div>

      {/* Department Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="aspora-card mb-8"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">By Department</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {departments.map((dept) => {
            const count = employees.filter(e => e.department === dept).length;
            return (
              <div key={dept} className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/20 transition-colors cursor-pointer">
                <p className="text-2xl font-semibold text-foreground">{count}</p>
                <p className="text-sm text-muted-foreground">{dept}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <div className="flex items-center border border-border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Employee Grid/List */}
      {viewMode === 'grid' ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredEmployees.map((employee) => (
            <motion.div key={employee.id} variants={item}>
              <Link to={`/employees/${employee.id}`}>
                <div className="aspora-card-hover cursor-pointer">
                  <div className="flex items-start gap-4">
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground truncate">{employee.name}</h3>
                        <StatusBadge status={employee.status} />
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{employee.role}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Building2 className="w-3 h-3" />
                        <span>{employee.department}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{employee.location}</span>
                      </div>
                      <span className="aspora-badge-muted">{employee.level}</span>
                    </div>
                    {employee.learningProgress !== undefined && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Learning</span>
                          <span className="font-medium">{employee.learningProgress}%</span>
                        </div>
                        <ProgressBar value={employee.learningProgress} size="sm" variant="accent" />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-2"
        >
          {filteredEmployees.map((employee) => (
            <motion.div key={employee.id} variants={item}>
              <Link to={`/employees/${employee.id}`}>
                <div className="aspora-card-hover cursor-pointer py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">{employee.name}</h3>
                        <StatusBadge status={employee.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">{employee.role}</p>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                      <div className="text-sm">
                        <p className="text-muted-foreground">Department</p>
                        <p className="font-medium text-foreground">{employee.department}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-medium text-foreground">{employee.location}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Level</p>
                        <p className="font-medium text-foreground">{employee.level}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

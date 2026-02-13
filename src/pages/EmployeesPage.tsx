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
  Network,
  Users as UsersIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ProgressBar } from '@/components/common/ProgressBar';
import { employees, dashboardStats } from '@/data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'org' | 'team'>('grid');
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

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
          <Button className="gap-2" onClick={() => setShowAddEmployee(true)}>
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
          <Button variant="outline" className="gap-2" onClick={() => setShowFilters(true)}>
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <div className="flex items-center border border-border rounded-lg p-1">
            <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setViewMode('grid')}>
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setViewMode('list')}>
              <List className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === 'org' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setViewMode('org')}>
              <Network className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === 'team' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setViewMode('team')}>
              <UsersIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Employee Views */}
      {viewMode === 'org' ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="aspora-card">
          <h2 className="text-lg font-semibold text-foreground mb-6">Organization Chart</h2>
          <div className="flex flex-col items-center gap-8">
            {/* CEO Level */}
            <div className="text-center">
              <div className="inline-flex flex-col items-center p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <span className="text-sm font-bold text-primary">CEO</span>
                </div>
                <p className="font-medium text-foreground text-sm">Rachel Green</p>
                <p className="text-xs text-muted-foreground">Chief Executive Officer</p>
              </div>
            </div>
            <div className="w-px h-6 bg-border" />
            {/* Department Heads */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {departments.map(dept => {
                const deptEmployees = employees.filter(e => e.department === dept);
                const manager = deptEmployees.find(e => e.level >= 'L5');
                return (
                  <div key={dept} className="flex flex-col items-center">
                    <div className="p-4 rounded-xl bg-muted/30 border border-border text-center w-full">
                      {manager ? (
                        <Link to={`/employees/${manager.id}`}>
                          <img src={manager.avatar} alt={manager.name} className="w-10 h-10 rounded-full mx-auto mb-2 object-cover" />
                          <p className="font-medium text-foreground text-sm">{manager.name}</p>
                        </Link>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-muted mx-auto mb-2" />
                      )}
                      <p className="text-xs text-muted-foreground">{dept}</p>
                      <span className="text-xs aspora-badge-primary mt-1">{deptEmployees.length} people</span>
                    </div>
                    <div className="w-px h-4 bg-border" />
                    <div className="space-y-1 w-full">
                      {deptEmployees.filter(e => e !== manager).slice(0, 3).map(emp => (
                        <Link key={emp.id} to={`/employees/${emp.id}`} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <img src={emp.avatar} alt={emp.name} className="w-6 h-6 rounded-full object-cover" />
                          <span className="text-xs text-foreground truncate">{emp.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      ) : viewMode === 'team' ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {departments.map(dept => {
            const deptEmployees = filteredEmployees.filter(e => e.department === dept);
            if (deptEmployees.length === 0) return null;
            return (
              <div key={dept} className="aspora-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">{dept}</h3>
                  <span className="aspora-badge-primary">{deptEmployees.length} members</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 text-muted-foreground font-medium">Employee</th>
                        <th className="text-left py-2 text-muted-foreground font-medium">Role</th>
                        <th className="text-left py-2 text-muted-foreground font-medium">Level</th>
                        <th className="text-left py-2 text-muted-foreground font-medium">Status</th>
                        <th className="text-left py-2 text-muted-foreground font-medium">Learning</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deptEmployees.map(emp => (
                        <tr key={emp.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                          <td className="py-3">
                            <Link to={`/employees/${emp.id}`} className="flex items-center gap-3">
                              <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full object-cover" />
                              <span className="font-medium text-foreground">{emp.name}</span>
                            </Link>
                          </td>
                          <td className="py-3 text-muted-foreground">{emp.role}</td>
                          <td className="py-3"><span className="aspora-badge-muted">{emp.level}</span></td>
                          <td className="py-3"><StatusBadge status={emp.status} /></td>
                          <td className="py-3">{emp.learningProgress !== undefined ? <ProgressBar value={emp.learningProgress} size="sm" variant="accent" /> : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </motion.div>
      ) : viewMode === 'grid' ? (
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

      {/* Add Employee Dialog */}
      <Dialog open={showAddEmployee} onOpenChange={setShowAddEmployee}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input className="mt-1" placeholder="John" />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input className="mt-1" placeholder="Doe" />
              </div>
            </div>
            <div>
              <Label>Email</Label>
              <Input className="mt-1" type="email" placeholder="john.doe@aspora.io" />
            </div>
            <div>
              <Label>Role / Job Title</Label>
              <Input className="mt-1" placeholder="e.g. Software Engineer" />
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
                <Label>Location</Label>
                <Input className="mt-1" placeholder="e.g. San Francisco, CA" />
              </div>
              <div>
                <Label>Start Date</Label>
                <Input className="mt-1" type="date" />
              </div>
            </div>
            <div>
              <Label>Manager</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select manager..." /></SelectTrigger>
                <SelectContent>
                  {employees.filter(e => e.level >= 'L5').map(emp => (
                    <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowAddEmployee(false)}>Cancel</Button>
            <Button onClick={() => { setShowAddEmployee(false); toast({ title: "Employee Added", description: "New employee has been added successfully." }); }}>
              Add Employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filters Dialog */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Filter Employees</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label>Department</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="All departments" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(d => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="All statuses" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="onboarding">Onboarding</SelectItem>
                  <SelectItem value="offboarding">Offboarding</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Location</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="All locations" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="sf">San Francisco, CA</SelectItem>
                  <SelectItem value="ny">New York, NY</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
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
    </div>
  );
}

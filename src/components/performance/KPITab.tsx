import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ProgressBar } from '@/components/common/ProgressBar';
import { kpis, employees } from '@/data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const metricFormat = (kpi: typeof kpis[0]) => {
  if (kpi.metric === 'currency') return `$${kpi.currentValue.toLocaleString()} / $${kpi.targetValue.toLocaleString()}`;
  if (kpi.metric === 'percentage') return `${kpi.currentValue}% / ${kpi.targetValue}%`;
  return `${kpi.currentValue} / ${kpi.targetValue}`;
};

export function KPITab() {
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);
  const { toast } = useToast();

  const kpi = selectedKPI ? kpis.find(k => k.id === selectedKPI) : null;
  const kpiEmployee = kpi ? employees.find(e => e.id === kpi.employeeId) : null;

  return (
    <>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
        {kpis.map((kpi) => {
          const employee = employees.find(e => e.id === kpi.employeeId);
          return (
            <motion.div key={kpi.id} variants={item} className="aspora-card">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {employee && (
                    <img src={employee.avatar} alt={employee.name} className="w-10 h-10 rounded-full object-cover" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">{kpi.title}</h3>
                      <StatusBadge status={kpi.type} />
                      <StatusBadge status={kpi.status} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{kpi.description}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span>{kpi.owner} • Due {kpi.dueDate}</span>
                      <span>Weight: {kpi.weight}%</span>
                      <span>{metricFormat(kpi)}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedKPI(kpi.id)}>View</Button>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{kpi.progress}%</span>
                </div>
                <ProgressBar
                  value={kpi.progress}
                  variant={kpi.status === 'at-risk' ? 'warning' : kpi.status === 'completed' ? 'success' : 'primary'}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* KPI Detail Dialog */}
      <Dialog open={!!selectedKPI} onOpenChange={() => setSelectedKPI(null)}>
        <DialogContent className="max-w-lg">
          {kpi && (
            <>
              <DialogHeader>
                <DialogTitle>{kpi.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <p className="text-sm text-muted-foreground">{kpi.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Owner</p>
                    <div className="flex items-center gap-2 mt-1">
                      {kpiEmployee && <img src={kpiEmployee.avatar} alt={kpiEmployee.name} className="w-6 h-6 rounded-full" />}
                      <p className="font-medium text-foreground text-sm">{kpi.owner}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <div className="mt-1"><StatusBadge status={kpi.status} /></div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Current / Target</p>
                    <p className="font-medium text-foreground text-sm">{metricFormat(kpi)}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Weight</p>
                    <p className="font-medium text-foreground text-sm">{kpi.weight}%</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="font-medium text-foreground text-sm capitalize">{kpi.type}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Due Date</p>
                    <p className="font-medium text-foreground text-sm">{kpi.dueDate}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{kpi.progress}%</span>
                  </div>
                  <ProgressBar value={kpi.progress} variant={kpi.status === 'at-risk' ? 'warning' : 'primary'} size="lg" />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setSelectedKPI(null)}>Close</Button>
                <Button onClick={() => { setSelectedKPI(null); toast({ title: "KPI Updated", description: `${kpi.title} has been updated.` }); }}>
                  Update KPI
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

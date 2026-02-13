import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ProgressBar } from '@/components/common/ProgressBar';
import { kpis, employees } from '@/data/mockData';

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
  return (
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
              <Button variant="ghost" size="sm">View</Button>
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
  );
}

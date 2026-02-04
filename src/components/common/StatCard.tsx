import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    positive: boolean;
  };
  icon: React.ReactNode;
  color?: 'primary' | 'accent' | 'success' | 'warning';
  className?: string;
}

const colorVariants = {
  primary: 'from-primary/10 to-primary/5 border-primary/20',
  accent: 'from-accent/10 to-accent/5 border-accent/20',
  success: 'from-success/10 to-success/5 border-success/20',
  warning: 'from-warning/10 to-warning/5 border-warning/20',
};

const iconColorVariants = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
};

export function StatCard({ title, value, change, icon, color = 'primary', className }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'aspora-stat-card bg-gradient-to-br',
        colorVariants[color],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold text-foreground mt-1">{value}</p>
          {change && (
            <p className={cn(
              'text-xs mt-1 font-medium',
              change.positive ? 'text-success' : 'text-destructive'
            )}>
              {change.positive ? '+' : ''}{change.value}% from last month
            </p>
          )}
        </div>
        <div className={cn('p-2.5 rounded-lg', iconColorVariants[color])}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

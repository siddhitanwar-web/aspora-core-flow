import { cn } from '@/lib/utils';

type BadgeVariant = 'primary' | 'accent' | 'success' | 'warning' | 'muted' | 'destructive';

// Extend the props interface to accept any variant

interface StatusBadgeProps {
  status: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  muted: 'bg-muted text-muted-foreground',
  destructive: 'bg-destructive/10 text-destructive',
};

const statusToVariant: Record<string, BadgeVariant> = {
  // General
  active: 'success',
  open: 'success',
  completed: 'success',
  approved: 'success',
  accepted: 'success',
  hired: 'success',
  'on-track': 'success',
  
  // Warning states
  pending: 'warning',
  'pending-approval': 'warning',
  'at-risk': 'warning',
  'on-hold': 'warning',
  onboarding: 'warning',
  'self-review': 'warning',
  'manager-review': 'warning',
  calibration: 'warning',
  interview: 'warning',
  screening: 'warning',
  offer: 'accent',
  
  // Neutral
  applied: 'muted',
  draft: 'muted',
  closed: 'muted',
  
  // Negative
  rejected: 'destructive',
  declined: 'destructive',
  offboarding: 'destructive',
  overdue: 'destructive',
  
  // Priority
  high: 'destructive',
  medium: 'warning',
  low: 'muted',
};

export function StatusBadge({ status, variant, className }: StatusBadgeProps) {
  const resolvedVariant = variant || statusToVariant[status.toLowerCase()] || 'muted';
  
  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
      variantStyles[resolvedVariant],
      className
    )}>
      {status.replace(/-/g, ' ')}
    </span>
  );
}

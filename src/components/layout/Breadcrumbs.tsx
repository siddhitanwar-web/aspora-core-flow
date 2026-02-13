import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
  '': 'Home',
  'hiring': 'Hiring',
  'board': 'Candidate Board',
  'candidate': 'Candidate',
  'employees': 'Employees',
  'performance': 'Performance',
  'surveys': 'Surveys',
  'knowledge': 'Knowledge',
  'learning': 'Learning',
  'recognition': 'Recognition',
  'governance': 'Governance',
  'dashboards': 'Dashboards',
  'gene': 'Gene',
  'coach': 'LLM Coach',
  'settings': 'Settings',
  'slack': 'Slack Integration',
  'hr-admin': 'HR Admin',
  'preonboarding': 'Pre-Onboarding',
};

export function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
      <Link to="/" className="hover:text-foreground transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {segments.map((segment, index) => {
        const path = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;
        const label = routeLabels[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        return (
          <span key={path} className="flex items-center gap-1">
            <ChevronRight className="w-3 h-3" />
            {isLast ? (
              <span className="text-foreground font-medium">{label}</span>
            ) : (
              <Link to={path} className="hover:text-foreground transition-colors">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

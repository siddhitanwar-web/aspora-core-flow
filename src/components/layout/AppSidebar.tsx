import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Users,
  Briefcase,
  Target,
  BookOpen,
  GraduationCap,
  Shield,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MessageSquare,
  ClipboardList,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Hiring', href: '/hiring', icon: Briefcase },
  { name: 'Employees', href: '/employees', icon: Users },
  { name: 'Performance', href: '/performance', icon: Target },
  { name: 'Surveys', href: '/surveys', icon: ClipboardList },
  { name: 'Knowledge', href: '/knowledge', icon: BookOpen },
  { name: 'Learning', href: '/learning', icon: GraduationCap },
  { name: 'Governance', href: '/governance', icon: Shield },
  { name: 'Dashboards', href: '/dashboards', icon: BarChart3 },
];

const bottomNavigation = [
  { name: 'Ask Gene', href: '/gene', icon: Sparkles },
  { name: 'LLM Coach', href: '/coach', icon: MessageSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const NavItem = ({ item, showTooltip }: { item: typeof navigation[0]; showTooltip: boolean }) => {
    const active = isActive(item.href);
    const content = (
      <Link
        to={item.href}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
          active
            ? 'bg-sidebar-accent text-sidebar-primary'
            : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
        )}
      >
        <item.icon className={cn('w-5 h-5 flex-shrink-0', active && 'text-sidebar-primary')} />
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="text-sm font-medium whitespace-nowrap overflow-hidden"
            >
              {item.name}
            </motion.span>
          )}
        </AnimatePresence>
        {active && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute left-0 w-1 h-6 bg-sidebar-primary rounded-r-full"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
      </Link>
    );

    if (showTooltip && collapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" className="bg-foreground text-background">
            {item.name}
          </TooltipContent>
        </Tooltip>
      );
    }

    return content;
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-sidebar flex flex-col border-r border-sidebar-border z-50"
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sidebar-primary to-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <span className="text-lg font-semibold text-sidebar-foreground whitespace-nowrap">
                  Aspora OS
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <div key={item.name} className="relative">
            <NavItem item={item} showTooltip />
          </div>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-1">
        {bottomNavigation.map((item) => (
          <div key={item.name} className="relative">
            <NavItem item={item} showTooltip />
          </div>
        ))}
      </div>
    </motion.aside>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  ChevronDown,
  X,
  CheckCircle2,
  Clock,
  FileText,
  Users,
  Briefcase,
  Target,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const notifications = [
  { id: 1, title: 'Offer approved for Alexandra Foster', time: '2 hours ago', read: false, icon: CheckCircle2 },
  { id: 2, title: 'Q1 2024 review cycle reminder', time: '5 hours ago', read: false, icon: Clock },
  { id: 3, title: 'Travel policy update approved', time: '1 day ago', read: true, icon: FileText },
  { id: 4, title: 'New candidate applied for ML Engineer', time: '2 days ago', read: true, icon: Users },
];

const searchResults = [
  { type: 'employee', name: 'Sarah Chen', description: 'Senior Product Manager', href: '/employees/emp-001', icon: User },
  { type: 'employee', name: 'James Wilson', description: 'Staff Software Engineer', href: '/employees/emp-002', icon: User },
  { type: 'role', name: 'Senior Frontend Engineer', description: 'Engineering • Open', href: '/hiring/role-001', icon: Briefcase },
  { type: 'document', name: 'Remote Work Policy', description: 'Policy document', href: '/knowledge', icon: FileText },
  { type: 'kpi', name: 'Launch v2.0 Platform Features', description: 'Sarah Chen • 72%', href: '/performance', icon: Target },
];

interface TopHeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function TopHeader({ darkMode, onToggleDarkMode }: TopHeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const filteredResults = searchQuery.length > 0
    ? searchResults.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.description.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6">
        <div className="flex items-center gap-4 flex-1">
          {/* Search trigger */}
          <Button
            variant="outline"
            className="gap-2 text-muted-foreground w-64 justify-start"
            onClick={() => setShowSearch(true)}
          >
            <Search className="w-4 h-4" />
            <span className="text-sm">Search... </span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <Button variant="ghost" size="icon" onClick={onToggleDarkMode} className="h-9 w-9">
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {/* Notifications */}
          <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b border-border">
                <h3 className="font-semibold text-sm">Notifications</h3>
              </div>
              {notifications.map(n => (
                <DropdownMenuItem key={n.id} className="flex items-start gap-3 p-3 cursor-pointer">
                  <div className={`p-1.5 rounded-lg ${n.read ? 'bg-muted' : 'bg-primary/10'}`}>
                    <n.icon className={`w-3.5 h-3.5 ${n.read ? 'text-muted-foreground' : 'text-primary'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${n.read ? 'text-muted-foreground' : 'text-foreground font-medium'}`}>{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                  </div>
                  {!n.read && <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-sm text-primary cursor-pointer justify-center">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 h-9 px-2">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
                  alt="Sarah Chen"
                  className="w-7 h-7 rounded-full object-cover"
                />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium leading-none">Sarah Chen</p>
                  <p className="text-xs text-muted-foreground leading-none mt-0.5">Sr. Product Manager</p>
                </div>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/employees/emp-001" className="gap-2">
                  <User className="w-4 h-4" /> My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="gap-2">
                  <Settings className="w-4 h-4" /> Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-destructive">
                <LogOut className="w-4 h-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Global Search Dialog */}
      <Dialog open={showSearch} onOpenChange={setShowSearch}>
        <DialogContent className="max-w-lg p-0 gap-0">
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search employees, roles, documents, KPIs..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              autoFocus
            />
            {searchQuery && (
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSearchQuery('')}>
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {filteredResults.length > 0 ? (
              <div className="p-2">
                {filteredResults.map((result, i) => (
                  <button
                    key={i}
                    onClick={() => { navigate(result.href); setShowSearch(false); setSearchQuery(''); }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="p-2 rounded-lg bg-muted">
                      <result.icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{result.name}</p>
                      <p className="text-xs text-muted-foreground">{result.description}</p>
                    </div>
                    <span className="ml-auto text-xs text-muted-foreground capitalize">{result.type}</span>
                  </button>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No results found for "{searchQuery}"
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Start typing to search...
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

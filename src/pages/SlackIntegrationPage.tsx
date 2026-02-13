import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  MessageSquare,
  CheckCircle2,
  Settings,
  Bell,
  Hash,
  Users,
  Clock,
  Target,
  Sparkles,
  GraduationCap,
  Star,
  CalendarDays,
  BarChart3,
  Shield,
  Send,
  ThumbsUp,
  ThumbsDown,
  Leaf,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface SlackBot {
  id: string;
  name: string;
  command: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
  features: string[];
}

const slackBots: SlackBot[] = [
  {
    id: 'leave',
    name: 'Leave Management Bot',
    command: '/aspora leave',
    description: 'Request leave, check balances, and manage approvals directly in Slack',
    icon: CalendarDays,
    enabled: true,
    features: ['Request leave with date picker', 'Check leave balance', 'Team availability view', 'Manager approval notifications'],
  },
  {
    id: 'pulse',
    name: 'eNPS & Pulse Bot',
    command: '/aspora pulse',
    description: 'Send and respond to eNPS surveys inline in Slack DMs',
    icon: BarChart3,
    enabled: true,
    features: ['Scheduled eNPS surveys in DMs', 'Inline response (0-10 scale)', 'Results sync to dashboard', 'AI follow-up questions'],
  },
  {
    id: 'gene',
    name: 'Gene Knowledge Bot',
    command: '/aspora ask [question]',
    description: 'Answer HR and policy questions from the knowledge base',
    icon: Sparkles,
    enabled: true,
    features: ['Natural language Q&A', 'Source document references', 'Policy lookups', 'Onboarding FAQs'],
  },
  {
    id: 'coach',
    name: 'LLM Coach Bot',
    command: '/aspora coach',
    description: 'Personalized career coaching conversations in Slack DMs',
    icon: GraduationCap,
    enabled: true,
    features: ['Private coaching threads', 'Career path guidance', 'Skill gap analysis', 'Conversation history sync'],
  },
  {
    id: 'feedback',
    name: 'Review & Feedback Bot',
    command: '/aspora feedback',
    description: 'Send peer recognition, get review reminders, submit reviews inline',
    icon: Star,
    enabled: true,
    features: ['Peer recognition/feedback', 'Review due notifications', 'Inline self-review submission', 'Manager review reminders'],
  },
  {
    id: 'kpi',
    name: 'KPI Updates Bot',
    command: '/aspora kpi',
    description: 'Quick KPI progress updates and at-risk alerts',
    icon: Target,
    enabled: false,
    features: ['Quick progress updates', 'Weekly KPI summaries', 'At-risk alerts to managers', 'Team KPI dashboards'],
  },
];

// Mock Slack message components
function SlackMessage({ user, time, children }: { user: string; time: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-3">
      <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-bold text-primary">{user[0]}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-foreground">{user}</span>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}

function SlackBotMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-3">
      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-bold text-primary-foreground">A</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-foreground">Aspora Bot</span>
          <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">APP</span>
          <span className="text-xs text-muted-foreground">Just now</span>
        </div>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}

function SlackPreview({ botId }: { botId: string }) {
  if (botId === 'leave') {
    return (
      <div className="rounded-lg border border-border bg-background overflow-hidden">
        <div className="bg-muted/30 px-3 py-2 border-b border-border flex items-center gap-2">
          <Hash className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">#general</span>
        </div>
        <SlackMessage user="Sarah Chen" time="10:32 AM">
          <p className="text-sm text-foreground">/aspora leave</p>
        </SlackMessage>
        <SlackBotMessage>
          <div className="border-l-4 border-primary rounded p-3 bg-muted/20 space-y-2">
            <p className="text-sm font-medium text-foreground">📅 Leave Request</p>
            <p className="text-sm text-muted-foreground">Type: <strong className="text-foreground">Casual Leave</strong></p>
            <p className="text-sm text-muted-foreground">Dates: <strong className="text-foreground">Feb 15 – Feb 16, 2024</strong></p>
            <p className="text-sm text-muted-foreground">Balance: <strong className="text-foreground">8 days remaining</strong></p>
            <div className="flex gap-2 mt-2">
              <Button size="sm" className="h-7 text-xs gap-1"><ThumbsUp className="w-3 h-3" /> Approve</Button>
              <Button size="sm" variant="outline" className="h-7 text-xs gap-1"><ThumbsDown className="w-3 h-3" /> Reject</Button>
            </div>
          </div>
        </SlackBotMessage>
      </div>
    );
  }

  if (botId === 'pulse') {
    return (
      <div className="rounded-lg border border-border bg-background overflow-hidden">
        <div className="bg-muted/30 px-3 py-2 border-b border-border flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">🔒 Direct Message</span>
        </div>
        <SlackBotMessage>
          <div className="border-l-4 border-accent rounded p-3 bg-muted/20 space-y-2">
            <p className="text-sm font-medium text-foreground">📊 Monthly eNPS Survey</p>
            <p className="text-sm text-muted-foreground">How likely are you to recommend Aspora as a great place to work? (0-10)</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {[...Array(11)].map((_, i) => (
                <button key={i} className={`w-8 h-8 rounded text-xs font-medium border transition-colors ${i === 8 ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary/50 text-foreground'}`}>
                  {i}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Your response is anonymous</p>
          </div>
        </SlackBotMessage>
      </div>
    );
  }

  if (botId === 'gene') {
    return (
      <div className="rounded-lg border border-border bg-background overflow-hidden">
        <div className="bg-muted/30 px-3 py-2 border-b border-border flex items-center gap-2">
          <Hash className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">#ask-hr</span>
        </div>
        <SlackMessage user="James Wilson" time="2:15 PM">
          <p className="text-sm text-foreground">/aspora ask What is the remote work policy?</p>
        </SlackMessage>
        <SlackBotMessage>
          <div className="border-l-4 border-accent rounded p-3 bg-muted/20 space-y-2">
            <p className="text-sm font-medium text-foreground">🧠 Gene AI Response</p>
            <p className="text-sm text-foreground">Aspora supports a hybrid remote work model. All employees can work remotely up to 3 days per week. Fully remote arrangements require manager + VP approval.</p>
            <div className="mt-2 p-2 rounded bg-muted/30 border border-border">
              <p className="text-xs text-muted-foreground">📄 Source: <span className="text-primary">Remote Work Policy v2.1</span> (Updated Jan 2024)</p>
            </div>
          </div>
        </SlackBotMessage>
      </div>
    );
  }

  if (botId === 'coach') {
    return (
      <div className="rounded-lg border border-border bg-background overflow-hidden">
        <div className="bg-muted/30 px-3 py-2 border-b border-border flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">🔒 Direct Message</span>
        </div>
        <SlackMessage user="Priya Sharma" time="4:00 PM">
          <p className="text-sm text-foreground">/aspora coach</p>
        </SlackMessage>
        <SlackBotMessage>
          <div className="border-l-4 border-primary rounded p-3 bg-muted/20 space-y-2">
            <p className="text-sm font-medium text-foreground">🎯 Career Coach</p>
            <p className="text-sm text-foreground">Hi Priya! Based on your current role as UX Designer (L4), here are some areas we can explore:</p>
            <ul className="text-sm text-foreground list-disc list-inside space-y-1">
              <li>Path to Senior Designer (L5)</li>
              <li>Skill gap analysis for your current goals</li>
              <li>Leadership readiness assessment</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-1">What would you like to focus on? 💬</p>
          </div>
        </SlackBotMessage>
      </div>
    );
  }

  if (botId === 'feedback') {
    return (
      <div className="rounded-lg border border-border bg-background overflow-hidden">
        <div className="bg-muted/30 px-3 py-2 border-b border-border flex items-center gap-2">
          <Hash className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">#kudos</span>
        </div>
        <SlackMessage user="Marcus Johnson" time="11:20 AM">
          <p className="text-sm text-foreground">/aspora feedback @sarah.chen Great job leading the v2.0 launch! 🚀</p>
        </SlackMessage>
        <SlackBotMessage>
          <div className="border-l-4 border-warning rounded p-3 bg-muted/20 space-y-2">
            <p className="text-sm font-medium text-foreground">⭐ Peer Recognition</p>
            <p className="text-sm text-foreground"><strong>Marcus Johnson</strong> recognized <strong>Sarah Chen</strong></p>
            <p className="text-sm text-foreground italic">"Great job leading the v2.0 launch! 🚀"</p>
            <p className="text-xs text-muted-foreground">🍃 +1 Leaf • Synced to Aspora OS</p>
          </div>
        </SlackBotMessage>
      </div>
    );
  }

  if (botId === 'kpi') {
    return (
      <div className="rounded-lg border border-border bg-background overflow-hidden">
        <div className="bg-muted/30 px-3 py-2 border-b border-border flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">🔒 Direct Message</span>
        </div>
        <SlackBotMessage>
          <div className="border-l-4 border-warning rounded p-3 bg-muted/20 space-y-2">
            <p className="text-sm font-medium text-foreground">📊 Weekly KPI Summary</p>
            <div className="space-y-1">
              <p className="text-sm text-foreground">✅ Launch v2.0 Features — <strong>72%</strong> (on track)</p>
              <p className="text-sm text-foreground">⚠️ Reduce Infra Costs — <strong>45%</strong> (at risk)</p>
              <p className="text-sm text-foreground">✅ Design System Docs — <strong>90%</strong> (on track)</p>
            </div>
            <Button size="sm" className="h-7 text-xs mt-2">Update Progress</Button>
          </div>
        </SlackBotMessage>
      </div>
    );
  }

  return null;
}

export default function SlackIntegrationPage() {
  const [activeTab, setActiveTab] = useState('bots');
  const [botStates, setBotStates] = useState<Record<string, boolean>>(
    Object.fromEntries(slackBots.map(b => [b.id, b.enabled]))
  );
  const [selectedBot, setSelectedBot] = useState<string | null>('leave');
  const { toast } = useToast();

  const toggleBot = (id: string) => {
    setBotStates(prev => ({ ...prev, [id]: !prev[id] }));
    toast({ title: `Bot ${botStates[id] ? 'disabled' : 'enabled'}`, description: `${slackBots.find(b => b.id === id)?.name} has been ${botStates[id] ? 'disabled' : 'enabled'}.` });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Link to="/settings" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Settings
      </Link>

      <PageHeader
        title="Slack Integration"
        description="Configure Slack bot capabilities and notification channels"
        actions={
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full bg-success/10 text-success font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Connected to Aspora HQ
            </span>
          </div>
        }
      />

      {/* Connection Status */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="aspora-card mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Aspora HQ Workspace</h3>
              <p className="text-sm text-muted-foreground">Connected • 147 members • Last synced 5 min ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">Reconnect</Button>
            <Button variant="outline" size="sm" className="text-destructive">Disconnect</Button>
          </div>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="bots">Bot Features</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="schedule">Notification Schedule</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="bots">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bot List */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground mb-3">Bot Features</h3>
              {slackBots.map((bot) => (
                <motion.div
                  key={bot.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`aspora-card cursor-pointer transition-all ${selectedBot === bot.id ? 'ring-2 ring-primary/50' : ''}`}
                  onClick={() => setSelectedBot(bot.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <bot.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{bot.name}</h4>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">{bot.command}</p>
                        <p className="text-sm text-muted-foreground mt-1">{bot.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {bot.features.map((f) => (
                            <span key={f} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{f}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={botStates[bot.id]}
                      onCheckedChange={() => toggleBot(bot.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Preview Panel */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground mb-3">Slack Preview</h3>
              <div className="sticky top-4">
                {selectedBot && <SlackPreview botId={selectedBot} />}
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Preview of how the interaction looks in Slack
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="channels">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Channel Configuration</h3>
            <p className="text-sm text-muted-foreground">Configure which Slack channels are used for different notifications.</p>
            {[
              { label: 'Leave Requests', channel: '#hr-leave', description: 'Leave request notifications and approvals' },
              { label: 'Hiring Updates', channel: '#hiring', description: 'New candidates, interview schedules, offers' },
              { label: 'Kudos & Recognition', channel: '#kudos', description: 'Peer recognition and leaf awards' },
              { label: 'KPI Alerts', channel: '#kpi-alerts', description: 'At-risk KPI notifications for managers' },
              { label: 'General HR', channel: '#ask-hr', description: 'Gene knowledge bot answers' },
              { label: 'Performance Reviews', channel: '#performance', description: 'Review cycle notifications and reminders' },
              { label: 'Onboarding', channel: '#onboarding', description: 'New hire welcome messages and tasks' },
            ].map((ch) => (
              <div key={ch.label} className="aspora-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{ch.label}</p>
                    <p className="text-sm text-muted-foreground">{ch.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Input className="w-40" defaultValue={ch.channel} />
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            ))}
            <Button onClick={() => toast({ title: "Channels Saved", description: "Channel configuration has been updated." })}>
              Save Channel Configuration
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Notification Schedule</h3>
            {[
              { label: 'eNPS Survey Delivery', schedule: 'Monthly', day: 'First Monday', time: '09:00 AM' },
              { label: 'Weekly KPI Summary', schedule: 'Weekly', day: 'Friday', time: '04:00 PM' },
              { label: 'Review Reminders', schedule: 'Weekly', day: 'Monday', time: '09:00 AM' },
              { label: 'Leave Balance Digest', schedule: 'Monthly', day: 'Last Friday', time: '03:00 PM' },
              { label: 'Recognition Digest', schedule: 'Weekly', day: 'Friday', time: '05:00 PM' },
            ].map((s) => (
              <div key={s.label} className="aspora-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{s.label}</p>
                    <p className="text-sm text-muted-foreground">{s.schedule} • {s.day} at {s.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select defaultValue={s.schedule.toLowerCase()}>
                      <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            ))}
            <Button onClick={() => toast({ title: "Schedule Saved", description: "Notification schedule has been updated." })}>
              Save Schedule
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="permissions">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Bot Permissions</h3>
            <p className="text-sm text-muted-foreground">Control what the Aspora bot can access and do in your Slack workspace.</p>
            {[
              { perm: 'Read messages in public channels', granted: true },
              { perm: 'Send messages to channels', granted: true },
              { perm: 'Send direct messages to employees', granted: true },
              { perm: 'Read user profiles and email addresses', granted: true },
              { perm: 'Create and manage channels', granted: false },
              { perm: 'Access file uploads', granted: false },
              { perm: 'Manage reactions and emojis', granted: true },
              { perm: 'Access workspace analytics', granted: false },
            ].map((p) => (
              <div key={p.perm} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{p.perm}</span>
                </div>
                <Switch defaultChecked={p.granted} />
              </div>
            ))}
            <Button onClick={() => toast({ title: "Permissions Saved", description: "Bot permissions have been updated." })}>
              Save Permissions
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

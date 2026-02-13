import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Key,
  HelpCircle,
  ExternalLink,
  Link2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Calendar,
  GitBranch,
  MessageSquare,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const settingsGroups = [
  {
    title: 'Account',
    icon: User,
    items: [
      { name: 'Profile Settings', description: 'Update your personal information' },
      { name: 'Security', description: 'Password and 2FA settings' },
      { name: 'Sessions', description: 'Manage active sessions' },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    items: [
      { name: 'Email Notifications', description: 'Configure email alerts', toggle: true, enabled: true },
      { name: 'Slack Notifications', description: 'Configure Slack integration', toggle: true, enabled: true },
      { name: 'In-App Notifications', description: 'Manage notification preferences', toggle: true, enabled: false },
    ],
  },
  {
    title: 'Appearance',
    icon: Palette,
    items: [
      { name: 'Theme', description: 'Choose light or dark mode' },
      { name: 'Language', description: 'Select your preferred language' },
      { name: 'Accessibility', description: 'Accessibility options' },
    ],
  },
  {
    title: 'Administration',
    icon: Shield,
    items: [
      { name: 'User Management', description: 'Manage user accounts and permissions' },
      { name: 'Audit Settings', description: 'Configure audit log retention' },
    ],
  },
];

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: 'connected' | 'disconnected';
  lastSynced?: string;
  enabled: boolean;
}

const integrations: Integration[] = [
  {
    id: 'jira',
    name: 'JIRA',
    description: 'Connect workspace, select projects, sync frequency',
    icon: GitBranch,
    status: 'connected',
    lastSynced: '2 hours ago',
    enabled: true,
  },
  {
    id: 'bitbucket',
    name: 'Bitbucket / GitHub',
    description: 'Connect repos, track commits & PRs',
    icon: GitBranch,
    status: 'connected',
    lastSynced: '1 hour ago',
    enabled: true,
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Connect workspace, enable Gene & Coach bots',
    icon: MessageSquare,
    status: 'connected',
    lastSynced: '5 minutes ago',
    enabled: true,
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Sync 1:1 meetings and events',
    icon: Calendar,
    status: 'disconnected',
    enabled: false,
  },
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    description: 'SSO & directory sync',
    icon: Globe,
    status: 'disconnected',
    enabled: false,
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [integrationStates, setIntegrationStates] = useState<Record<string, boolean>>(
    Object.fromEntries(integrations.map(i => [i.id, i.enabled]))
  );
  const [configuring, setConfiguring] = useState<string | null>(null);

  const toggleIntegration = (id: string) => {
    setIntegrationStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedIntegration = integrations.find(i => i.id === configuring);

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Settings"
        description="Manage your Aspora OS preferences"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="integrations" className="gap-1">
            <Link2 className="w-3 h-3" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="space-y-6">
            {settingsGroups.map((group, groupIndex) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: groupIndex * 0.1 }}
                className="aspora-card"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <group.icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">{group.title}</h2>
                </div>

                <div className="space-y-1">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      {item.toggle ? (
                        <Switch defaultChecked={item.enabled} />
                      ) : (
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Help & Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="aspora-card bg-gradient-to-br from-primary/5 to-accent/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Help & Support</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Documentation
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Key className="w-4 h-4" />
                  API Reference
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Database className="w-4 h-4" />
                  Data Export
                </Button>
              </div>
            </motion.div>

            {/* Version Info */}
            <div className="text-center text-sm text-muted-foreground py-4">
              Aspora OS v2.1.0 • © 2024 Aspora Inc.
            </div>
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Integrations</h2>
                <p className="text-sm text-muted-foreground">Connect third-party tools to enhance Aspora OS</p>
              </div>
            </div>

            {integrations.map((integration, idx) => {
              const isEnabled = integrationStates[integration.id];
              return (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="aspora-card"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <integration.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{integration.name}</h3>
                          {integration.status === 'connected' && isEnabled ? (
                            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">
                              <CheckCircle2 className="w-3 h-3" />
                              Connected
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                              <XCircle className="w-3 h-3" />
                              Disconnected
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                        {integration.lastSynced && isEnabled && (
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <RefreshCw className="w-3 h-3" />
                            Last synced: {integration.lastSynced}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={() => toggleIntegration(integration.id)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setConfiguring(integration.id)}
                      >
                        Configure
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Configure Integration Modal */}
          <Dialog open={!!configuring} onOpenChange={() => setConfiguring(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedIntegration && (
                    <>
                      <selectedIntegration.icon className="w-5 h-5 text-primary" />
                      Configure {selectedIntegration.name}
                    </>
                  )}
                </DialogTitle>
              </DialogHeader>
              {selectedIntegration && (
                <div className="space-y-4 mt-4">
                  {selectedIntegration.id === 'jira' && (
                    <>
                      <div>
                        <Label>Workspace URL</Label>
                        <Input className="mt-1" placeholder="https://your-org.atlassian.net" defaultValue="https://aspora.atlassian.net" />
                      </div>
                      <div>
                        <Label>Project Keys</Label>
                        <Input className="mt-1" placeholder="CORE, INFRA, ML" defaultValue="CORE, INFRA, ML, DESIGN" />
                      </div>
                      <div>
                        <Label>Sync Frequency</Label>
                        <Select defaultValue="hourly">
                          <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realtime">Real-time</SelectItem>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                  {selectedIntegration.id === 'bitbucket' && (
                    <>
                      <div>
                        <Label>Platform</Label>
                        <Select defaultValue="github">
                          <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="github">GitHub</SelectItem>
                            <SelectItem value="bitbucket">Bitbucket</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Organization</Label>
                        <Input className="mt-1" defaultValue="aspora-eng" />
                      </div>
                      <div>
                        <Label>Repositories</Label>
                        <Input className="mt-1" placeholder="All repos" defaultValue="All repositories (15 repos)" />
                      </div>
                    </>
                  )}
                  {selectedIntegration.id === 'slack' && (
                    <>
                      <div>
                        <Label>Workspace</Label>
                        <Input className="mt-1" defaultValue="Aspora HQ" disabled />
                      </div>
                      <div className="space-y-2">
                        <Label>Bots</Label>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <span className="text-sm">Gene (Knowledge Bot)</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <span className="text-sm">LLM Coach (Career Bot)</span>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </>
                  )}
                  {selectedIntegration.id === 'google-calendar' && (
                    <>
                      <div>
                        <Label>Google Account</Label>
                        <Input className="mt-1" placeholder="admin@aspora.io" />
                      </div>
                      <div className="p-3 rounded-lg bg-muted/30">
                        <p className="text-sm text-muted-foreground">
                          Connect Google Calendar to automatically sync 1:1 meetings into the Meeting Notes module.
                        </p>
                      </div>
                    </>
                  )}
                  {selectedIntegration.id === 'google-workspace' && (
                    <>
                      <div>
                        <Label>Domain</Label>
                        <Input className="mt-1" placeholder="aspora.io" />
                      </div>
                      <div className="p-3 rounded-lg bg-muted/30">
                        <p className="text-sm text-muted-foreground">
                          Enable SSO and directory sync to automatically manage employee accounts from Google Workspace.
                        </p>
                      </div>
                    </>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" onClick={() => setConfiguring(null)}>Save Configuration</Button>
                    <Button variant="outline" onClick={() => setConfiguring(null)}>Cancel</Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}

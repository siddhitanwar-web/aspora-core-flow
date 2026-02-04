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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
      { name: 'Integrations', description: 'Configure third-party integrations' },
      { name: 'Audit Settings', description: 'Configure audit log retention' },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Settings"
        description="Manage your Aspora OS preferences"
      />

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
              {group.items.map((item, itemIndex) => (
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
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Users,
  CalendarDays,
  Target,
  Briefcase,
  Bell,
  Shield,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

function Section({ title, icon: Icon, children, defaultOpen = false }: { title: string; icon: React.ElementType; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="aspora-card">
      <button className="w-full flex items-center justify-between" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10"><Icon className="w-5 h-5 text-primary" /></div>
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        {open ? <ChevronDown className="w-5 h-5 text-muted-foreground" /> : <ChevronRight className="w-5 h-5 text-muted-foreground" />}
      </button>
      {open && <div className="mt-4 pt-4 border-t border-border space-y-4">{children}</div>}
    </div>
  );
}

export default function HRAdminPage() {
  const [activeTab, setActiveTab] = useState('organization');
  const { toast } = useToast();

  const save = (section: string) => toast({ title: "Settings Saved", description: `${section} settings have been updated.` });

  return (
    <div className="max-w-5xl mx-auto">
      <Link to="/settings" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Settings
      </Link>

      <PageHeader title="HR Administration" description="Comprehensive HRMS configuration panel" />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 flex-wrap">
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="employee">Employee</TabsTrigger>
          <TabsTrigger value="leave">Leave & Attendance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="hiring">Hiring</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Data & Security</TabsTrigger>
        </TabsList>

        {/* ORGANIZATION */}
        <TabsContent value="organization">
          <div className="space-y-4">
            <Section title="Company Profile" icon={Building2} defaultOpen>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Company Name</Label><Input className="mt-1" defaultValue="Aspora Inc." /></div>
                <div><Label>Industry</Label><Select defaultValue="tech"><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="tech">Technology</SelectItem><SelectItem value="finance">Finance</SelectItem><SelectItem value="healthcare">Healthcare</SelectItem></SelectContent></Select></div>
              </div>
              <div><Label>Address</Label><Textarea className="mt-1" defaultValue="100 Market Street, San Francisco, CA 94105" rows={2} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Company Logo</Label><div className="mt-1 border-2 border-dashed border-border rounded-lg p-4 text-center"><Button variant="outline" size="sm">Upload Logo</Button></div></div>
                <div><Label>Website</Label><Input className="mt-1" defaultValue="https://aspora.io" /></div>
              </div>
              <Button onClick={() => save('Company Profile')}>Save Profile</Button>
            </Section>

            <Section title="Fiscal Year Settings" icon={CalendarDays}>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Fiscal Year Start</Label><Select defaultValue="jan"><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="jan">January</SelectItem><SelectItem value="apr">April</SelectItem><SelectItem value="jul">July</SelectItem><SelectItem value="oct">October</SelectItem></SelectContent></Select></div>
                <div><Label>Time Zone</Label><Select defaultValue="pst"><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pst">PST (UTC-8)</SelectItem><SelectItem value="est">EST (UTC-5)</SelectItem><SelectItem value="utc">UTC</SelectItem><SelectItem value="ist">IST (UTC+5:30)</SelectItem></SelectContent></Select></div>
              </div>
              <Button onClick={() => save('Fiscal Year')}>Save</Button>
            </Section>

            <Section title="Work Week" icon={CalendarDays}>
              <div className="flex gap-2">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d,i) => <button key={d} className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${i < 5 ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-muted border-border text-muted-foreground'}`}>{d}</button>)}</div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Start Time</Label><Input className="mt-1" type="time" defaultValue="09:00" /></div>
                <div><Label>End Time</Label><Input className="mt-1" type="time" defaultValue="18:00" /></div>
              </div>
              <Button onClick={() => save('Work Week')}>Save</Button>
            </Section>

            <Section title="Holiday Calendar" icon={CalendarDays}>
              <div className="space-y-2">
                {[{ name: "New Year's Day", date: 'Jan 1' }, { name: 'MLK Day', date: 'Jan 15' }, { name: "Presidents' Day", date: 'Feb 19' }, { name: 'Memorial Day', date: 'May 27' }, { name: 'Independence Day', date: 'Jul 4' }, { name: 'Labor Day', date: 'Sep 2' }, { name: 'Thanksgiving', date: 'Nov 28-29' }, { name: 'Christmas', date: 'Dec 25' }].map(h => (
                  <div key={h.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div><p className="font-medium text-sm text-foreground">{h.name}</p><p className="text-xs text-muted-foreground">{h.date}</p></div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="gap-2"><Plus className="w-4 h-4" /> Add Holiday</Button>
            </Section>

            <Section title="Office Locations" icon={Building2}>
              <div className="space-y-2">
                {['San Francisco, CA (HQ)', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Boston, MA'].map(loc => (
                  <div key={loc} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <span className="text-sm font-medium text-foreground">{loc}</span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="gap-2"><Plus className="w-4 h-4" /> Add Location</Button>
            </Section>
          </div>
        </TabsContent>

        {/* EMPLOYEE */}
        <TabsContent value="employee">
          <div className="space-y-4">
            <Section title="Employee ID Format" icon={Users} defaultOpen>
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Prefix</Label><Input className="mt-1" defaultValue="EMP" /></div>
                <div><Label>Separator</Label><Select defaultValue="dash"><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="dash">- (dash)</SelectItem><SelectItem value="none">None</SelectItem></SelectContent></Select></div>
                <div><Label>Start Number</Label><Input className="mt-1" type="number" defaultValue="001" /></div>
              </div>
              <p className="text-sm text-muted-foreground">Preview: <span className="font-mono font-medium text-foreground">EMP-007</span></p>
              <Button onClick={() => save('Employee ID')}>Save</Button>
            </Section>

            <Section title="Probation Settings" icon={Users}>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Default Duration</Label><Select defaultValue="90"><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="30">30 days</SelectItem><SelectItem value="60">60 days</SelectItem><SelectItem value="90">90 days</SelectItem><SelectItem value="180">180 days</SelectItem></SelectContent></Select></div>
                <div><Label>Review Reminder</Label><Select defaultValue="7"><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="7">7 days before</SelectItem><SelectItem value="14">14 days before</SelectItem><SelectItem value="30">30 days before</SelectItem></SelectContent></Select></div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30"><span className="text-sm">Auto-send reminder to manager</span><Switch defaultChecked /></div>
              <Button onClick={() => save('Probation')}>Save</Button>
            </Section>

            <Section title="Notice Period" icon={Users}>
              {[{ level: 'L2-L3 (Junior/Mid)', period: '30 days' }, { level: 'L4-L5 (Senior/Staff)', period: '60 days' }, { level: 'L6+ (Principal/Director)', period: '90 days' }].map(n => (
                <div key={n.level} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm font-medium text-foreground">{n.level}</span>
                  <Select defaultValue={n.period}><SelectTrigger className="w-32"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="30 days">30 days</SelectItem><SelectItem value="60 days">60 days</SelectItem><SelectItem value="90 days">90 days</SelectItem></SelectContent></Select>
                </div>
              ))}
              <Button onClick={() => save('Notice Period')}>Save</Button>
            </Section>

            <Section title="Employment Types" icon={Briefcase}>
              {['Full-time', 'Part-time', 'Contract', 'Intern'].map(t => (
                <div key={t} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm font-medium text-foreground">{t}</span>
                  <Switch defaultChecked />
                </div>
              ))}
              <Button variant="outline" className="gap-2"><Plus className="w-4 h-4" /> Add Type</Button>
            </Section>

            <Section title="Custom Fields" icon={Users}>
              <p className="text-sm text-muted-foreground">Add custom fields to employee profiles.</p>
              {[{ name: 'T-Shirt Size', type: 'Dropdown' }, { name: 'Emergency Contact', type: 'Text' }, { name: 'Dietary Preferences', type: 'Dropdown' }].map(f => (
                <div key={f.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div><p className="text-sm font-medium text-foreground">{f.name}</p><p className="text-xs text-muted-foreground">Type: {f.type}</p></div>
                  <div className="flex gap-2"><Button variant="ghost" size="sm">Edit</Button><Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button></div>
                </div>
              ))}
              <Button variant="outline" className="gap-2"><Plus className="w-4 h-4" /> Add Custom Field</Button>
            </Section>
          </div>
        </TabsContent>

        {/* LEAVE & ATTENDANCE */}
        <TabsContent value="leave">
          <div className="space-y-4">
            <Section title="Leave Types" icon={CalendarDays} defaultOpen>
              {[
                { type: 'Casual Leave', balance: 12, accrual: 'Monthly' },
                { type: 'Sick Leave', balance: 10, accrual: 'Annual' },
                { type: 'Earned Leave', balance: 15, accrual: 'Monthly' },
                { type: 'Work From Home', balance: 24, accrual: 'Annual' },
                { type: 'Comp-off', balance: 0, accrual: 'As earned' },
              ].map(l => (
                <div key={l.type} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div><p className="text-sm font-medium text-foreground">{l.type}</p><p className="text-xs text-muted-foreground">Balance: {l.balance} days • Accrual: {l.accrual}</p></div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              ))}
              <Button variant="outline" className="gap-2"><Plus className="w-4 h-4" /> Add Leave Type</Button>
            </Section>

            <Section title="Leave Balance Rules" icon={CalendarDays}>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30"><span className="text-sm">Allow carry forward</span><Switch defaultChecked /></div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30"><span className="text-sm">Max carry forward days</span><Input className="w-20" type="number" defaultValue="5" /></div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30"><span className="text-sm">Allow leave encashment</span><Switch /></div>
              </div>
              <Button onClick={() => save('Leave Rules')}>Save</Button>
            </Section>

            <Section title="Leave Approval Workflow" icon={CalendarDays}>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm text-foreground">1. Employee submits leave → 2. Direct Manager approves → 3. HR notified</div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30"><span className="text-sm">Auto-escalate after</span><Select defaultValue="48"><SelectTrigger className="w-32"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="24">24 hours</SelectItem><SelectItem value="48">48 hours</SelectItem><SelectItem value="72">72 hours</SelectItem></SelectContent></Select></div>
              </div>
              <Button onClick={() => save('Leave Workflow')}>Save</Button>
            </Section>

            <Section title="Attendance & Shifts" icon={CalendarDays}>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30"><span className="text-sm">Enable attendance tracking</span><Switch defaultChecked /></div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30"><span className="text-sm">Enable shift management</span><Switch /></div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30"><span className="text-sm">Grace period (minutes)</span><Input className="w-20" type="number" defaultValue="15" /></div>
              </div>
              <Button onClick={() => save('Attendance')}>Save</Button>
            </Section>
          </div>
        </TabsContent>

        {/* PERFORMANCE */}
        <TabsContent value="performance">
          <div className="space-y-4">
            <Section title="Review Cycle Configuration" icon={Target} defaultOpen>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Default Frequency</Label><Select defaultValue="quarterly"><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="monthly">Monthly</SelectItem><SelectItem value="quarterly">Quarterly</SelectItem><SelectItem value="biannual">Bi-annual</SelectItem><SelectItem value="annual">Annual</SelectItem></SelectContent></Select></div>
                <div><Label>Self-Review Phase (days)</Label><Input className="mt-1" type="number" defaultValue="14" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Manager Review Phase (days)</Label><Input className="mt-1" type="number" defaultValue="7" /></div>
                <div><Label>Calibration Phase (days)</Label><Input className="mt-1" type="number" defaultValue="5" /></div>
              </div>
              <Button onClick={() => save('Review Cycle')}>Save</Button>
            </Section>

            <Section title="Rating Scale" icon={Target}>
              <div><Label>Scale Type</Label><Select defaultValue="5"><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="5">1-5 Scale</SelectItem><SelectItem value="10">1-10 Scale</SelectItem><SelectItem value="descriptive">Descriptive (Needs Improvement → Exceptional)</SelectItem></SelectContent></Select></div>
              <div className="space-y-2 mt-3">
                {['1 - Needs Improvement', '2 - Below Expectations', '3 - Meets Expectations', '4 - Exceeds Expectations', '5 - Exceptional'].map(r => (
                  <div key={r} className="p-2 rounded bg-muted/30 text-sm text-foreground">{r}</div>
                ))}
              </div>
              <Button onClick={() => save('Rating Scale')}>Save</Button>
            </Section>

            <Section title="AI Review Settings" icon={Target}>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30"><span className="text-sm">Enable AI review generation</span><Switch defaultChecked /></div>
                <p className="text-xs text-muted-foreground font-medium">Data Sources for AI:</p>
                {['1:1 Meeting Notes', 'KPI Progress', 'JIRA/Bitbucket Contributions', 'Peer Feedback', 'Learning Progress', 'Interviews Conducted'].map(s => (
                  <div key={s} className="flex items-center justify-between p-3 rounded-lg bg-muted/30"><span className="text-sm">{s}</span><Switch defaultChecked /></div>
                ))}
              </div>
              <Button onClick={() => save('AI Review')}>Save</Button>
            </Section>

            <Section title="Peer Review Settings" icon={Target}>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30"><span className="text-sm">Anonymous peer reviews</span><Switch defaultChecked /></div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30"><span className="text-sm">Minimum reviewers</span><Input className="w-20" type="number" defaultValue="3" /></div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30"><span className="text-sm">Maximum reviewers</span><Input className="w-20" type="number" defaultValue="5" /></div>
              </div>
              <Button onClick={() => save('Peer Review')}>Save</Button>
            </Section>
          </div>
        </TabsContent>

        {/* HIRING */}
        <TabsContent value="hiring">
          <div className="space-y-4">
            <Section title="Interview Pipeline Stages" icon={Briefcase} defaultOpen>
              {['Applied', 'Phone Screen', 'Technical Interview', 'Culture Fit', 'Hiring Manager', 'Offer', 'Hired'].map((s, i) => (
                <div key={s} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">{i + 1}</span>
                  <span className="text-sm font-medium text-foreground flex-1">{s}</span>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              ))}
              <Button variant="outline" className="gap-2"><Plus className="w-4 h-4" /> Add Stage</Button>
            </Section>

            <Section title="Offer Approval Workflow" icon={Briefcase}>
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm text-foreground">
                1. Hiring Manager creates offer → 2. Department Head approves → 3. HR validates → 4. VP/CTO final sign-off
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30"><span className="text-sm">Require VP approval for L5+</span><Switch defaultChecked /></div>
              <Button onClick={() => save('Offer Workflow')}>Save</Button>
            </Section>

            <Section title="Referral Program" icon={Users}>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Referral Bonus</Label><Input className="mt-1" type="number" defaultValue="5000" /></div>
                <div><Label>Payout After (days)</Label><Input className="mt-1" type="number" defaultValue="90" /></div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30"><span className="text-sm">Enable referral program</span><Switch defaultChecked /></div>
              <Button onClick={() => save('Referral')}>Save</Button>
            </Section>
          </div>
        </TabsContent>

        {/* NOTIFICATIONS */}
        <TabsContent value="notifications">
          <div className="space-y-4">
            <Section title="Notification Rules" icon={Bell} defaultOpen>
              {[
                { trigger: 'New leave request', channel: 'Email + Slack' },
                { trigger: 'Review cycle starts', channel: 'Email + In-app' },
                { trigger: 'KPI at risk', channel: 'Slack DM' },
                { trigger: 'Offer approved', channel: 'Email' },
                { trigger: 'Onboarding task due', channel: 'Email + Slack' },
                { trigger: 'Probation ending', channel: 'Email to Manager' },
              ].map(n => (
                <div key={n.trigger} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div><p className="text-sm font-medium text-foreground">{n.trigger}</p><p className="text-xs text-muted-foreground">Channel: {n.channel}</p></div>
                  <Switch defaultChecked />
                </div>
              ))}
            </Section>

            <Section title="Reminder Schedules" icon={Bell}>
              {[
                { name: 'Review deadline reminder', timing: '3 days before due' },
                { name: 'KPI update reminder', timing: 'Every Monday 9 AM' },
                { name: 'Timesheet submission', timing: 'Friday 4 PM' },
              ].map(r => (
                <div key={r.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div><p className="text-sm font-medium text-foreground">{r.name}</p><p className="text-xs text-muted-foreground">{r.timing}</p></div>
                  <Button variant="ghost" size="sm">Configure</Button>
                </div>
              ))}
            </Section>

            <Section title="Email Templates" icon={Bell}>
              {['Welcome Email', 'Offer Letter', 'Review Reminder', 'Leave Approval', 'Probation Completion'].map(t => (
                <div key={t} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm font-medium text-foreground">{t}</span>
                  <Button variant="outline" size="sm">Edit Template</Button>
                </div>
              ))}
            </Section>
          </div>
        </TabsContent>

        {/* DATA & SECURITY */}
        <TabsContent value="security">
          <div className="space-y-4">
            <Section title="Data Retention" icon={Shield} defaultOpen>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Employee Data</Label><Select defaultValue="7years"><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="3years">3 years</SelectItem><SelectItem value="5years">5 years</SelectItem><SelectItem value="7years">7 years</SelectItem><SelectItem value="forever">Indefinite</SelectItem></SelectContent></Select></div>
                <div><Label>Audit Logs</Label><Select defaultValue="5years"><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1year">1 year</SelectItem><SelectItem value="3years">3 years</SelectItem><SelectItem value="5years">5 years</SelectItem></SelectContent></Select></div>
              </div>
              <Button onClick={() => save('Data Retention')}>Save</Button>
            </Section>

            <Section title="Role-Based Access Control" icon={Shield}>
              {[
                { role: 'Super Admin', access: 'Full access to all modules', users: 2 },
                { role: 'HR Admin', access: 'Employee, Leave, Performance management', users: 4 },
                { role: 'Hiring Manager', access: 'Hiring module + team management', users: 8 },
                { role: 'Manager', access: 'Team view, reviews, approvals', users: 12 },
                { role: 'Employee', access: 'Self-service, learning, feedback', users: 142 },
              ].map(r => (
                <div key={r.role} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div><p className="text-sm font-medium text-foreground">{r.role}</p><p className="text-xs text-muted-foreground">{r.access}</p></div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{r.users} users</span>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                </div>
              ))}
            </Section>

            <Section title="Export & Import" icon={Shield}>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="gap-2"><Save className="w-4 h-4" /> Export All Employee Data (CSV)</Button>
                <Button variant="outline" className="gap-2"><Plus className="w-4 h-4" /> Import Employees (CSV)</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="gap-2"><Save className="w-4 h-4" /> Export Audit Logs</Button>
                <Button variant="outline" className="gap-2"><Save className="w-4 h-4" /> Export Recognition Data</Button>
              </div>
            </Section>

            <Section title="Compliance & GDPR" icon={Shield}>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30"><span className="text-sm">Enable GDPR data subject requests</span><Switch defaultChecked /></div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30"><span className="text-sm">Auto-anonymize after offboarding</span><Switch /></div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30"><span className="text-sm">Cookie consent management</span><Switch defaultChecked /></div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30"><span className="text-sm">Data processing agreement</span><Button variant="ghost" size="sm">View DPA</Button></div>
              </div>
              <Button onClick={() => save('Compliance')}>Save</Button>
            </Section>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

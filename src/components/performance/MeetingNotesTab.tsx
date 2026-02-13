import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Circle,
  SmilePlus,
  Frown,
  Meh,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/common/StatusBadge';
import { meetingNotes, employees } from '@/data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const sentimentIcons = {
  positive: { icon: SmilePlus, color: 'text-success', bg: 'bg-success/10' },
  neutral: { icon: Meh, color: 'text-muted-foreground', bg: 'bg-muted' },
  concerned: { icon: Frown, color: 'text-warning', bg: 'bg-warning/10' },
};

const templateLabels: Record<string, string> = {
  'weekly-checkin': 'Weekly Check-in',
  'monthly-review': 'Monthly Review',
  'career-discussion': 'Career Discussion',
};

export function MeetingNotesTab() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">1:1 Meeting Notes</h2>
          <p className="text-sm text-muted-foreground">Track discussions, action items, and sentiment from your 1:1s</p>
        </div>
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Meeting Note
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Meeting Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Employee</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select employee..." />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.filter(e => e.status === 'active').map(emp => (
                      <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Template</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose template..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly-checkin">Weekly Check-in</SelectItem>
                    <SelectItem value="monthly-review">Monthly Review</SelectItem>
                    <SelectItem value="career-discussion">Career Discussion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Date</Label>
                <Input type="date" className="mt-1" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                <Label>Discussion Topics</Label>
                <Textarea className="mt-1" placeholder="What was discussed..." rows={3} />
              </div>
              <div>
                <Label>Action Items</Label>
                <Textarea className="mt-1" placeholder="List action items, one per line..." rows={3} />
              </div>
              <div>
                <Label>Sentiment</Label>
                <div className="flex gap-3 mt-1">
                  {Object.entries(sentimentIcons).map(([key, val]) => (
                    <button
                      key={key}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary/30 transition-colors ${val.bg}`}
                    >
                      <val.icon className={`w-4 h-4 ${val.color}`} />
                      <span className="text-sm capitalize">{key}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Button className="w-full" onClick={() => setShowCreate(false)}>
                Save Meeting Note
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {meetingNotes.map((note) => {
          const emp = employees.find(e => e.id === note.employeeId);
          const sentiment = sentimentIcons[note.sentiment];
          const SentimentIcon = sentiment.icon;

          return (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspora-card-hover cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {emp && (
                    <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full object-cover" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">{note.employeeName}</h3>
                      <span className="aspora-badge-muted text-xs">{templateLabels[note.template]}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {note.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {note.attendees.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${sentiment.bg}`}>
                  <SentimentIcon className={`w-4 h-4 ${sentiment.color}`} />
                </div>
              </div>

              {/* Topics */}
              <div className="mt-3 flex flex-wrap gap-1">
                {note.topics.map((topic) => (
                  <span key={topic} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {topic}
                  </span>
                ))}
              </div>

              {/* Action Items */}
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground mb-2">Action Items</p>
                <div className="space-y-1">
                  {note.actionItems.map((ai, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      {ai.done ? (
                        <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className={ai.done ? 'line-through text-muted-foreground' : 'text-foreground'}>
                        {ai.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

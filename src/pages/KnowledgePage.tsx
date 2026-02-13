import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search,
  Plus,
  BookOpen,
  FileText,
  Presentation,
  File,
  Building2,
  Users,
  Clock,
  Eye,
  Download,
  ArrowRight,
  Edit,
  History,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/common/PageHeader';
import { documents } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const categoryIcons: Record<string, React.ElementType> = {
  policy: FileText,
  handbook: BookOpen,
  template: File,
  presentation: Presentation,
  letter: FileText,
  sop: FileText,
  wiki: BookOpen,
};

const quickLinks = [
  { title: 'What Aspora Does', description: 'Company mission and vision', icon: Building2 },
  { title: 'Teams & Org Structure', description: 'Department hierarchy', icon: Users },
  { title: 'Employee Policies', description: 'Guidelines and procedures', icon: FileText },
  { title: 'Benefits Overview', description: 'Compensation and perks', icon: BookOpen },
];

export default function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showCreateDoc, setShowCreateDoc] = useState(false);
  const [showDocDetail, setShowDocDetail] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === 'all' || doc.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'policy', 'handbook', 'template', 'presentation'];

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Knowledge"
        description="Company knowledge base and documentation"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" asChild>
              <Link to="/gene">
                <Sparkles className="w-4 h-4" />
                Ask Gene
              </Link>
            </Button>
            <Button className="gap-2" onClick={() => setShowCreateDoc(true)}>
              <Plus className="w-4 h-4" />
              Create Document
            </Button>
          </div>
        }
      />

      {/* Quick Links */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {quickLinks.map((link) => (
          <div key={link.title} className="aspora-card-hover cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                <link.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">{link.title}</p>
                <p className="text-xs text-muted-foreground">{link.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Search with Gene integration */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search knowledge base or ask Gene..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories and Documents */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="capitalize">
              {cat === 'all' ? 'All Documents' : cat}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab}>
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocs.map((doc) => {
              const Icon = categoryIcons[doc.category] || FileText;
              return (
                <motion.div key={doc.id} variants={item}>
                  <div className="aspora-card-hover cursor-pointer h-full" onClick={() => setShowDocDetail(doc.id)}>
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-muted">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{doc.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{doc.lastUpdated}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{doc.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="aspora-badge-muted">v1.0</span>
                        <Button variant="ghost" size="sm" className="h-7 px-2" onClick={(e) => { e.stopPropagation(); toast({ title: "Downloaded", description: `${doc.title} downloaded.` }); }}>
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </TabsContent>
      </Tabs>

      {filteredDocs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No documents found</h3>
          <p className="text-muted-foreground">Try adjusting your search or browse categories.</p>
        </div>
      )}

      {/* Create Document Dialog */}
      <Dialog open={showCreateDoc} onOpenChange={setShowCreateDoc}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label>Title</Label>
              <Input className="mt-1" placeholder="Document title" />
            </div>
            <div>
              <Label>Category</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select category..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="policy">Policy</SelectItem>
                  <SelectItem value="sop">SOP</SelectItem>
                  <SelectItem value="template">Template</SelectItem>
                  <SelectItem value="wiki">Company Wiki</SelectItem>
                  <SelectItem value="handbook">Handbook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Description</Label>
              <Input className="mt-1" placeholder="Brief description" />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea className="mt-1" placeholder="Write document content here... (Rich text editor coming soon)" rows={8} />
            </div>
            <div>
              <Label>Approval Required</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No approval needed</SelectItem>
                  <SelectItem value="manager">Manager approval</SelectItem>
                  <SelectItem value="hr">HR approval</SelectItem>
                  <SelectItem value="legal">Legal review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowCreateDoc(false)}>Cancel</Button>
            <Button onClick={() => { setShowCreateDoc(false); toast({ title: "Document Created", description: "New document has been created as v1.0." }); }}>
              Create Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Document Detail Dialog */}
      <Dialog open={!!showDocDetail} onOpenChange={() => setShowDocDetail(null)}>
        <DialogContent className="max-w-lg">
          {showDocDetail && (() => {
            const doc = documents.find(d => d.id === showDocDetail);
            if (!doc) return null;
            return (
              <>
                <DialogHeader>
                  <DialogTitle>{doc.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-xs text-muted-foreground">Author</p>
                      <p className="font-medium text-foreground">{doc.author}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-xs text-muted-foreground">Last Updated</p>
                      <p className="font-medium text-foreground">{doc.lastUpdated}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-xs text-muted-foreground">Version</p>
                      <p className="font-medium text-foreground">v1.0</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-xs text-muted-foreground">Views</p>
                      <p className="font-medium text-foreground">{doc.views}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Version History</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                        <History className="w-4 h-4 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm text-foreground">v1.0 — Initial version</p>
                          <p className="text-xs text-muted-foreground">{doc.lastUpdated} by {doc.author}</p>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter className="mt-4">
                  <Button variant="outline" onClick={() => toast({ title: "Downloaded", description: `${doc.title} downloaded.` })}>
                    <Download className="w-4 h-4 mr-1" /> Download
                  </Button>
                  <Button onClick={() => { setShowDocDetail(null); toast({ title: "Editing", description: `Opening ${doc.title} for editing.` }); }}>
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                </DialogFooter>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}

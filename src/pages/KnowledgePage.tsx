import { useState } from 'react';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/common/PageHeader';
import { documents } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
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
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Document
          </Button>
        }
      />

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        {quickLinks.map((link) => (
          <div
            key={link.title}
            className="aspora-card-hover cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                <link.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {link.title}
                </p>
                <p className="text-xs text-muted-foreground">{link.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search knowledge base..."
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
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredDocs.map((doc) => {
              const Icon = categoryIcons[doc.category] || FileText;
              return (
                <motion.div key={doc.id} variants={item}>
                  <div className="aspora-card-hover cursor-pointer h-full">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-muted">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                          {doc.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {doc.lastUpdated}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {doc.views}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <Download className="w-3 h-3" />
                      </Button>
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
          <p className="text-muted-foreground">
            Try adjusting your search or browse categories.
          </p>
        </div>
      )}
    </div>
  );
}

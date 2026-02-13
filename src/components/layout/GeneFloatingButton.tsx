import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function GeneFloatingButton() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on Gene page itself
  if (location.pathname === '/gene') return null;

  const suggestions = [
    "What's our remote work policy?",
    "How do I request PTO?",
    "What are the company holidays?",
  ];

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 z-50 w-80 bg-card border border-border rounded-xl shadow-float overflow-hidden"
          >
            <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Ask Gene</p>
                    <p className="text-xs text-muted-foreground">Aspora Knowledge Assistant</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-xs text-muted-foreground">Quick questions:</p>
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => { navigate(`/gene`); setOpen(false); }}
                  className="w-full text-left text-sm p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-foreground"
                >
                  {s}
                </button>
              ))}
              <div className="flex gap-2 pt-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { navigate('/gene'); setOpen(false); } }}
                  placeholder="Ask anything..."
                  className="flex-1 text-sm px-3 py-2 rounded-lg border border-input bg-background outline-none focus:ring-1 focus:ring-ring"
                />
                <Button size="icon" className="h-9 w-9" onClick={() => { navigate('/gene'); setOpen(false); }}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="w-full gap-1 text-primary" onClick={() => { navigate('/gene'); setOpen(false); }}>
                Open full Gene assistant <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-float flex items-center justify-center"
      >
        {open ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
      </motion.button>
    </>
  );
}

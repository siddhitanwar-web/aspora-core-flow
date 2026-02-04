import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, Bot, ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/common/PageHeader';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "What's our remote work policy?",
  "How do I request PTO?",
  "What are the company holidays?",
  "How do I submit an expense report?",
  "What's the promotion process?",
  "Who should I contact for IT issues?",
];

const mockResponses: Record<string, string> = {
  "remote": "According to our Remote Work Policy (last updated January 2024), Aspora supports a hybrid work model. Employees can work remotely up to 3 days per week, with 2 days required in-office for collaboration. Remote work arrangements must be approved by your direct manager. For full details, see the Remote Work Policy document in the Knowledge Base.",
  "pto": "To request PTO, go to the Employees module → Your Profile → Time Off. You'll see your current balance and can submit a request. Your manager will receive a notification and can approve directly in Aspora OS. Standard PTO accrual is 20 days per year for most roles.",
  "holiday": "Aspora observes 10 company holidays annually: New Year's Day, MLK Day, Presidents' Day, Memorial Day, Juneteenth, Independence Day, Labor Day, Thanksgiving (2 days), and Christmas Day. Additionally, you have 2 floating holidays to use at your discretion.",
  "expense": "Expense reports are submitted through the Finance portal. Navigate to Settings → Finance → Expense Reports. Upload receipts, categorize expenses, and submit for manager approval. Reimbursements are processed within 5-7 business days after approval.",
  "promotion": "Promotions at Aspora follow our Engineering/PM Ladders framework. Key steps: 1) Self-assessment against next-level criteria, 2) Discussion with manager during 1:1s, 3) Formal proposal during performance cycle, 4) Calibration review, 5) Approval by department head. See the Career Ladders document in Knowledge for detailed expectations.",
  "it": "For IT support, you can: 1) Submit a ticket in #it-help on Slack, 2) Email helpdesk@aspora.io, or 3) Ask Gene (me!) for quick answers. For urgent issues (system outages, security concerns), ping @it-oncall directly.",
};

function getResponse(query: string): string {
  const lowerQuery = query.toLowerCase();
  for (const [key, response] of Object.entries(mockResponses)) {
    if (lowerQuery.includes(key)) {
      return response;
    }
  }
  return "I can help you find information from Aspora's knowledge base. Try asking about policies, procedures, benefits, or company information. I have access to all approved HR documents and can provide accurate answers based on our official policies.";
}

export default function GenePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Gene, your Aspora knowledge assistant. I can help you find information about company policies, HR procedures, benefits, and more. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate API delay
    setTimeout(() => {
      const response = getResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-6rem)] flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Gene</h1>
            <p className="text-sm text-muted-foreground">Aspora Knowledge Assistant</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-xl p-4 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 text-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-muted-foreground hover:text-foreground">
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-muted-foreground hover:text-foreground">
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse animation-delay-200" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse animation-delay-400" />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <p className="text-sm text-muted-foreground mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                onClick={() => handleSuggestion(question)}
                className="text-sm px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input */}
      <div className="flex gap-2 pt-4 border-t border-border">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask Gene anything about Aspora..."
          className="flex-1"
        />
        <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

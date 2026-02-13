import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, User, Bot, ArrowLeft, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const coachingTopics = [
  "How can I grow into a leadership role?",
  "What skills should I develop this quarter?",
  "How do I have difficult conversations?",
  "Help me prepare for my performance review",
  "How can I improve my work-life balance?",
  "What's the path to becoming a senior engineer?",
];

const mockCoachingResponses: Record<string, string> = {
  "leadership": `Based on your profile as a Senior Product Manager at L5, here's a personalized path to leadership:

**Current Strengths:**
- Strong product execution (4.5 rating)
- Cross-functional collaboration
- Data-driven decision making

**Areas to Develop:**
1. **Strategic Thinking** - Move from feature-level to portfolio-level vision
2. **People Leadership** - Start mentoring junior PMs
3. **Stakeholder Management** - Build executive relationships

**Recommended Actions:**
- Volunteer to lead the next cross-team initiative
- Request 360 feedback on leadership behaviors
- Schedule monthly 1:1s with your skip-level manager

Would you like me to create a detailed 90-day development plan?`,

  "skills": `Looking at your current role and learning progress (78% through Advanced PM path), here are prioritized skills to focus on:

**High Priority:**
1. Technical Architecture - Your current score is 55%. Consider shadowing engineering leads.
2. Executive Communication - Key for L6 readiness

**Growth Areas:**
- ML/AI Product Management (emerging importance)
- Financial Modeling for business cases

I can enroll you in specific courses or connect you with mentors for any of these areas.`,

  "difficult": `Here's a framework for difficult conversations, tailored to common PM scenarios:

**The COIN Model:**
1. **C**ontext - Set the stage ("I wanted to discuss the project timeline...")
2. **O**bservation - State facts, not judgments ("The deadline was missed by 2 weeks")
3. **I**mpact - Explain the effect ("This affected our Q4 launch plans")
4. **N**ext Steps - Propose solutions ("How can we prevent this going forward?")

**Practice Scenario:**
Would you like to role-play a specific conversation? I can provide feedback on your approach.`,

  "review": `Let me help you prepare for your Q1 2024 review. Here's what I've gathered:

**Your Accomplishments:**
- Led v2.0 feature launch (on track at 72%)
- Stakeholder satisfaction improved 15%
- Mentored 2 junior PMs

**Goals Status:**
- 3 of 4 KPIs on track
- 1 at-risk (needs discussion)

**Suggested Talking Points:**
1. Highlight the impact of v2.0 features on customer retention
2. Discuss career growth aspirations
3. Request feedback on leadership readiness

Want me to draft a self-review summary?`,

  "balance": `Work-life balance is crucial for sustained performance. Based on your patterns:

**Current Observations:**
- Average 45-50 hours/week (healthy range)
- Heavy meeting load on Tuesdays/Wednesdays

**Recommendations:**
1. **Block "Deep Work" time** - Protect 2-3 hour blocks for focused work
2. **Meeting Audit** - Review recurring meetings quarterly
3. **Boundaries** - Set clear "offline" hours

**Quick Wins:**
- Enable Slack quiet hours (already available)
- Delegate one recurring meeting
- Schedule exercise/breaks as calendar events

Would you like me to analyze your calendar and suggest optimizations?`,

  "engineer": `Great question! Here's the path from your current level to Senior Engineer:

**L4 → L5 (Senior) Requirements:**
1. **Technical Scope** - Own major subsystems independently
2. **Influence** - Mentor others, improve team practices
3. **Impact** - Deliver projects that affect business metrics

**Your Progress:**
- Technical skills: Strong (ML fundamentals at 25% - keep going!)
- Collaboration: Building (consider more cross-team projects)
- Documentation: Area for growth

**Timeline:** Typically 2-3 years at L4 with consistent performance.

**Action Items:**
- Complete ML Engineering Fundamentals path
- Lead a technical design review
- Contribute to engineering blog

Ready to dive deeper into any of these areas?`,
};

function getCoachingResponse(query: string): string {
  const lowerQuery = query.toLowerCase();
  for (const [key, response] of Object.entries(mockCoachingResponses)) {
    if (lowerQuery.includes(key)) {
      return response;
    }
  }
  return `I'm your personalized career coach, powered by AI. I have context about your role, performance, and learning journey.

I can help you with:
- Career development and growth paths
- Skill building and learning recommendations
- Preparing for reviews and difficult conversations
- Work-life balance and productivity
- Leadership development

What aspect of your growth would you like to explore?`;
}

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your LLM Career Coach. I have context about your role as a Senior Product Manager, your performance history, and learning progress. I'm here to help you grow professionally. What would you like to work on today?",
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
      const response = getCoachingResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-success flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">LLM Coach</h1>
            <p className="text-sm text-muted-foreground">Your AI Career Coach</p>
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
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-success flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-white" />
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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-success flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
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
          <p className="text-sm text-muted-foreground mb-2">Explore topics:</p>
          <div className="flex flex-wrap gap-2">
            {coachingTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleSuggestion(topic)}
                className="text-sm px-3 py-1.5 rounded-full bg-accent/10 hover:bg-accent/20 text-accent transition-colors"
              >
                {topic}
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
          placeholder="Ask your coach anything about your career..."
          className="flex-1"
        />
        <Button onClick={handleSend} disabled={!input.trim() || isTyping} className="bg-accent hover:bg-accent/90">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

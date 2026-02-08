
import React, { useState } from 'react';
import type { PageId } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQProps {
  onNavigate: (page: PageId) => void;
}

const FAQ_CATEGORIES = [
  {
    id: 'technical',
    label: 'Technical Capabilities',
    questions: [
      {
        q: "What technical stacks do you support?",
        a: "We are specialists in the modern TypeScript ecosystem. This includes Next.js, React, Node.js, and Express. We have deep expertise in database management (Prisma, PostgreSQL, Supabase, MongoDB) and infrastructure (Vercel, AWS, Fly.io, Heroku). If your app was built by an AI agent like Cursor or Lovable, we can almost certainly refactor and stabilize it."
      },
      {
        q: "Can you fix apps built entirely by AI?",
        a: "Yes. In fact, that's one of our core specialties. AI builders are excellent at generating 80% of a product but often fail at complex state management, secure auth patterns, and production-grade API integrations. We step in to perform 'AI Prototype Remediation'—cleaning up the technical debt and ensuring the code is maintainable by humans."
      },
      {
        q: "How do you handle sensitive API keys and secrets?",
        a: "Security is non-negotiable. We never ask for secrets via email or chat. We guide you through setting up secure environment variables in Vercel or AWS directly, or use tools like 1Password for secure credential sharing. Every engagement includes a security gut-check for exposed keys."
      }
    ]
  },
  {
    id: 'process',
    label: 'Process & Delivery',
    questions: [
      {
        q: "How fast is the 'Surgical Strike' delivery?",
        a: "Most surgical fixes (like wiring a Stripe webhook or fixing a login loop) are delivered in 24-72 hours. Larger refactors or full deployments typically take 5-10 business days. We provide a guaranteed delivery window during the diagnostic phase."
      },
      {
        q: "What does the handoff process look like?",
        a: "You get more than just a repo. We provide a full handoff document or video walkthrough explaining exactly what we fixed, how the new logic works, and how to maintain it. We also ensure your CI/CD pipelines are green and your production environments are stable."
      },
      {
        q: "Do you offer long-term maintenance?",
        a: "While we specialize in finishing projects, we also offer an 'Engineering Reserve' model for scaling startups that need senior-level oversight without the overhead of a full-time hire. This is managed on a flexible, project-by-project basis."
      }
    ]
  },
  {
    id: 'commercial',
    label: 'Commercial & IP',
    questions: [
      {
        q: "Who owns the intellectual property?",
        a: "You do. 100%. FINISH Inc is a work-for-hire service. Every line of code we ship is owned by you the moment the final invoice is paid. We provide a clean transfer of all credentials and source code access."
      },
      {
        q: "Why fixed pricing instead of hourly billing?",
        a: "Hourly billing creates a conflict of interest where partners are incentivized to move slow. Fixed pricing ensures we are incentivized for speed and efficiency. You get budget certainty, and we get the freedom to ship high-quality code at pace."
      },
      {
        q: "What is the '24-hour Diagnostic'?",
        a: "It's our technical vetting process. You provide us with repository access, and within 24 hours, a senior engineer performs a non-invasive audit and provides a fixed-price quote. If we can't fix it, we'll tell you immediately—no discovery fees."
      }
    ]
  }
];

const FAQItem: React.FC<{ question: string; answer: string; index: number }> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`border rounded-2xl overflow-hidden mb-4 transition-all ${isOpen ? 'bg-white border-green-200 shadow-xl shadow-green-50/50' : 'bg-white border-slate-100 hover:border-slate-200'}`}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`font-bold tracking-tight transition-colors ${isOpen ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-slate-900 text-white rotate-45' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-8 pb-8 text-slate-500 text-[15px] leading-relaxed border-t border-slate-50 pt-6">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ: React.FC<FAQProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState(FAQ_CATEGORIES[0].id);

  return (
    <div className="pt-20 bg-white selection:bg-green-100 overflow-x-hidden min-h-screen">
      {/* Hero Header */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 font-mono text-xs font-black uppercase tracking-[0.4em] mb-6"
          >
            Engineering Knowledge Base
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]"
          >
            Answers for <br/>
            <span className="text-slate-400">Builders.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto"
          >
            Everything you need to know about our surgical engineering process, commercial terms, and technical scope.
          </motion.p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="px-6 mb-16">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === cat.id 
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                  : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Display */}
      <section className="pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {FAQ_CATEGORIES.find(c => c.id === activeTab)?.questions.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Dark Help Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4ade80 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 italic leading-tight">Can't find your answer?</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Our Lead Architect is available for direct technical scoping calls. No sales pitches, just engineering solutions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => onNavigate('diagnostic')}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white px-12 py-6 rounded-2xl font-black text-xl shadow-2xl shadow-green-900/50 border-none transition-all hover:scale-105 active:scale-95"
            >
              Start Diagnostic
            </button>
            <a 
              href="mailto:hello@finishlab.app"
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white px-12 py-6 rounded-2xl font-black text-xl transition-all border-none flex items-center justify-center gap-3"
            >
              Email Support
            </a>
          </div>
        </div>
      </section>

      {/* Structured SEO Data (Informational) */}
      <section className="py-24 px-6 border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight uppercase tracking-widest font-mono text-xs opacity-40">Engineering FAQ Directory</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-[11px] text-slate-400 uppercase tracking-wider font-mono leading-relaxed">
            <p>
              FINISH Inc provides high-context <strong>Surgical Engineering</strong> support for startups. We specialize in <strong>Technical Debt Remediation</strong>, resolving <strong>Auth Loop Errors</strong>, and optimizing <strong>Stripe Payment Integrations</strong>. Our fixed-price model ensures budget predictability for founders and technical leads.
            </p>
            <p>
              We act as an <strong>On-Demand CTO</strong> service, performing comprehensive <strong>Security Audits</strong> and <strong>Production Deployments</strong>. Every project includes a 100% <strong>Intellectual Property Handoff</strong>, ensuring that you maintain full ownership of your application's source code and infrastructure.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;

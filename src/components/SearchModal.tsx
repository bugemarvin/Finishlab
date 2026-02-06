
import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../types';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

interface SearchItem {
  id: PageId;
  title: string;
  description: string;
  keywords: string[];
  type: 'page' | 'action';
  category: string;
}

interface AiDiagnosis {
  problemSummary: string;
  technicalPath: string;
  recommendedService: string;
  logic: string;
  targetPage: PageId;
  suggestions: string[];
}

const SEARCH_PAGES: SearchItem[] = [
  { id: 'home', title: 'Studio Home', description: 'Core studio overview, engineering speed metrics, and trust signals.', keywords: ['start', 'main', 'landing', 'finish'], type: 'page', category: 'Overview' },
  { id: 'how-it-works', title: 'The Process', description: 'Our 3-step engineering pipeline: Audit, Stabilize, and Ship.', keywords: ['process', 'steps', 'timeline', 'methodology'], type: 'page', category: 'Operations' },
  { id: 'pricing', title: 'Pricing & Tiers', description: 'Transparent engineering rates from $299 to $2,995+.', keywords: ['cost', 'price', 'packages', 'billing'], type: 'page', category: 'Commercials' },
  { id: 'idea-stage', title: 'Idea Stage (FINISH Start)', description: 'Technical blueprints and MVP design for pre-code projects.', keywords: ['idea', 'concept', 'blueprint', 'design', 'start'], type: 'page', category: 'Launch' },
  { id: 'for-founders', title: 'For Solo Founders', description: 'Unblocking solo builders with CTO-on-demand support.', keywords: ['founder', 'solo', 'entrepreneur'], type: 'page', category: 'Solutions' },
  { id: 'for-startups', title: 'For Scaling Startups', description: 'Augmented engineering reserve teams for growth-stage companies.', keywords: ['startup', 'scale', 'team', 'reserve'], type: 'page', category: 'Solutions' },
  { id: 'for-developers', title: 'For Technical Leads', description: 'Surgical refactoring and technical debt elimination.', keywords: ['developer', 'code', 'refactor', 'debt', 'tech'], type: 'page', category: 'Solutions' },
  { id: 'faq', title: 'Technical FAQ', description: 'IP ownership, security audits, and delivery guarantees.', keywords: ['help', 'questions', 'support', 'ip'], type: 'page', category: 'Support' },
  { id: 'diagnostic', title: 'Fix My App', description: 'Priority engineering intake for a 24h project quote.', keywords: ['start', 'quote', 'apply', 'intake'], type: 'action', category: 'Action' },
];

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>(SEARCH_PAGES);
  const [aiDiagnosis, setAiDiagnosis] = useState<AiDiagnosis | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [activeTab, setActiveTab] = useState<'directory' | 'ai'>('directory');
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = 'unset'; };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(SEARCH_PAGES);
      setAiDiagnosis(null);
      setActiveTab('directory');
      return;
    }
    const filtered = SEARCH_PAGES.filter(page => 
      page.title.toLowerCase().includes(query.toLowerCase()) ||
      page.description.toLowerCase().includes(query.toLowerCase()) ||
      page.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
    );
    setResults(filtered);

    if (query.length > 5) {
      const timer = setTimeout(() => handleAiArchitectSearch(query), 1200);
      return () => clearTimeout(timer);
    }
  }, [query]);

  const handleAiArchitectSearch = async (input: string) => {
    setIsAiThinking(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as the Lead Solutions Architect at FINISH Inc. 
        Your specialty is resolving high-friction technical blockers for modern web apps (Next.js, Node, Stripe, Supabase, AWS).
        
        Analyze the following user query for signals of:
        1. AUTH LOOPS: Hydration mismatches, JWT persistence, Clerk/Auth0 custom wiring.
        2. PAYMENTS: Stripe webhook sync, multi-tier plan gating, subscription state recovery.
        3. DATA DEBT: Messy Prisma schemas, circular relations, slow PostgreSQL queries.
        4. INFRA: Vercel deployment loops, DNS/SSL failures, CI/CD pipeline breakage.
        
        FINISH Inc Model:
        - Surgical Debug Call ($299): 1-hour live session for single blockers.
        - Stabilize & Ship ($995): Bridge for AI-built apps (Cursor/Lovable/Bolt) to Production.
        - Production Refactor ($2,995): Full debt clearing and scaling prep.
        - FINISH Start: Pre-code blueprints for new ideas.
        
        Query: "${input}"
        
        Respond with a JSON object ONLY:
        {
          "problemSummary": "1-sentence senior technical summary",
          "technicalPath": "The specific engineering execution steps needed to fix this",
          "recommendedService": "Surgical Call | Stabilize & Ship | Production Refactor | FINISH Start",
          "logic": "Architectural reasoning for this recommendation",
          "targetPage": "One of: ${SEARCH_PAGES.map(p => p.id).join(', ')}",
          "suggestions": ["3 short technical follow-ups like 'Fix hydration error' or 'Scale DB'"]
        }`,
        config: { responseMimeType: "application/json" }
      });
      const data = JSON.parse(response.text);
      setAiDiagnosis(data);
      // On mobile, if AI diagnosis arrives, don't necessarily switch tabs automatically to avoid jarring UI, 
      // but the UI will show a badge or the side panel on desktop.
    } catch (e) {
      console.error("AI Architect connection error", e);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleSelect = (id: PageId) => {
    onNavigate(id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-start justify-center p-0 sm:pt-20 sm:px-6" role="dialog">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl" 
        onClick={onClose} 
      />
      
      <motion.div 
        initial={{ y: 20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        className="relative w-full h-full sm:h-auto sm:max-h-[85vh] sm:max-w-6xl bg-white sm:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Responsive Header & Search */}
        <div className="flex flex-col border-b border-slate-100">
          <div className="flex items-center p-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              ref={inputRef}
              className="flex-1 px-3 py-3 sm:px-4 sm:py-4 bg-transparent text-slate-900 placeholder:text-slate-300 focus:outline-none text-lg sm:text-xl font-bold"
              placeholder="Describe your tech blocker..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={onClose} className="p-3 text-slate-400 hover:text-slate-900 transition-colors uppercase font-black text-[9px] sm:text-[10px] tracking-widest shrink-0">
              <span className="hidden sm:inline">Close (Esc)</span>
              <span className="sm:hidden">Close</span>
            </button>
          </div>

          {/* Mobile Tab Switcher */}
          <div className="flex lg:hidden px-4 pb-2 gap-4 border-t border-slate-50 pt-2">
            <button 
              onClick={() => setActiveTab('directory')}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'directory' ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400'}`}
            >
              Directory ({results.length})
            </button>
            <button 
              onClick={() => setActiveTab('ai')}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all relative ${activeTab === 'ai' ? 'bg-green-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400'}`}
            >
              AI Architect
              {isAiThinking && (
                <span className="absolute top-1.5 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              )}
              {aiDiagnosis && activeTab !== 'ai' && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Main Results Area */}
          <div className={`flex-1 overflow-y-auto p-4 sm:p-8 scrollbar-hide border-r border-slate-50 ${activeTab === 'directory' ? 'block' : 'hidden lg:block'}`}>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 sm:mb-8">Directory Results</p>
            <div className="space-y-2 sm:space-y-3">
              {results.length > 0 ? (
                results.map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => handleSelect(item.id)} 
                    className="w-full flex items-center gap-4 sm:gap-6 px-4 py-4 sm:px-6 sm:py-5 rounded-[1.5rem] sm:rounded-[2.5rem] hover:bg-slate-50 transition-all text-left group border border-transparent hover:border-slate-100"
                  >
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-lg sm:text-xl group-hover:bg-green-600 group-hover:text-white transition-all transform group-hover:scale-110 shrink-0">
                      {item.type === 'action' ? '⚡' : '📄'}
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-black text-slate-900 text-sm sm:text-[16px] tracking-tight truncate">{item.title}</p>
                      <p className="text-[12px] sm:text-sm text-slate-400 truncate mt-0.5">{item.description}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-20 text-center">
                  <div className="text-4xl mb-4 grayscale opacity-20">📂</div>
                  <p className="text-slate-400 font-bold">No static matches found.</p>
                  <button onClick={() => setActiveTab('ai')} className="mt-4 text-green-600 font-black text-[10px] uppercase tracking-widest hover:underline">Switch to AI Architect insight →</button>
                </div>
              )}
            </div>
          </div>

          {/* AI Architect Panel - Side on Desktop, Tabbed on Mobile */}
          <div className={`w-full lg:w-[450px] bg-slate-50/50 overflow-y-auto p-6 sm:p-10 scrollbar-hide border-t lg:border-t-0 border-slate-100 ${activeTab === 'ai' ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Architect's Intelligence</p>
              </div>
              {isAiThinking && (
                <div className="flex gap-1.5 bg-green-100 px-3 py-1 rounded-full items-center">
                   <span className="text-[9px] font-black uppercase text-green-700 tracking-tighter">Analyzing Stack</span>
                   <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce [animation-delay:0s]" />
                   <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                   <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              {aiDiagnosis ? (
                <motion.div
                  key="diagnosis"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8 sm:space-y-10"
                >
                  <div className="bg-slate-900 text-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                      <svg className="w-24 h-24 sm:w-32 sm:h-32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                    </div>
                    <div className="relative z-10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-green-500 mb-4 sm:mb-6">Project Diagnosis</p>
                      <h4 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 tracking-tight leading-[1.1]">{aiDiagnosis.problemSummary}</h4>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8">
                        <p className="text-slate-400 text-[11px] sm:text-[12px] leading-relaxed font-medium italic">
                          "{aiDiagnosis.logic}"
                        </p>
                      </div>
                      <button 
                        onClick={() => handleSelect(aiDiagnosis.targetPage)}
                        className="w-full bg-green-600 hover:bg-green-500 text-white py-4 sm:py-5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest transition-all shadow-xl shadow-green-900/40 transform active:scale-[0.98] border-none"
                      >
                        Explore {aiDiagnosis.recommendedService}
                      </button>
                    </div>
                  </div>

                  <div className="px-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 sm:mb-6">Engineering Roadmap</p>
                    <div className="p-5 sm:p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                      <p className="text-[13px] sm:text-sm font-bold text-slate-700 leading-relaxed">
                        {aiDiagnosis.technicalPath}
                      </p>
                    </div>
                  </div>

                  <div className="px-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 sm:mb-6">Refine Diagnosis</p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {aiDiagnosis.suggestions.map((s, i) => (
                        <button 
                          key={i}
                          onClick={() => setQuery(s)}
                          className="px-4 py-2 sm:px-6 sm:py-2.5 bg-white border border-slate-200 rounded-full text-[10px] sm:text-[11px] font-black text-slate-500 hover:border-green-500 hover:text-green-600 transition-all uppercase tracking-tight shadow-sm hover:shadow-md"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 sm:py-20 text-center"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-slate-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 sm:mb-10 text-2xl sm:text-3xl shadow-sm">
                    ⚡
                  </div>
                  <h5 className="text-slate-900 font-black text-sm uppercase tracking-widest mb-4">Senior Architect Review</h5>
                  <p className="text-[13px] sm:text-sm text-slate-400 font-medium leading-relaxed max-w-xs mx-auto mb-10">
                    Describe your project stage or technical bottleneck for a surgical engineering assessment.
                  </p>
                  
                  <div className="space-y-3 sm:space-y-4 max-w-xs mx-auto">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">Popular Assessments</p>
                    {[
                      "Fixing hydration loop in Next.js",
                      "Wiring Stripe webhook state sync",
                      "Production deployment failing on AWS",
                      "Refactoring messy AI prototype code"
                    ].map(q => (
                      <button 
                        key={q}
                        onClick={() => { setQuery(q); setActiveTab('ai'); }}
                        className="w-full text-[11px] sm:text-[12px] text-slate-500 font-bold hover:text-green-600 transition-all py-3 px-4 bg-white border border-slate-100 rounded-xl text-left flex items-center justify-between group shadow-sm hover:shadow-md"
                      >
                        <span className="truncate mr-4 italic">"{q}"</span>
                        <span className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchModal;

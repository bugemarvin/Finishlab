
import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface HomeProps {
  onNavigate: (page: PageId) => void;
}

type AudienceId = 'founder' | 'developer' | 'startup';

interface JourneyStage {
  label: string;
  title: string;
  desc: string;
  status: 'info' | 'warning' | 'error' | 'success';
  code?: string;
}

const JOURNEYS: Record<AudienceId, { role: string; stages: JourneyStage[] }> = {
  founder: {
    role: "Founders & Solo-Builders",
    stages: [
      { 
        label: "Concept", 
        title: "The Visionary Spark", 
        desc: "You've validated the market and the dream is clear. You start building with raw speed, fueled by conviction.", 
        status: 'info' 
      },
      { 
        label: "Velocity", 
        title: "The 80% Sprint", 
        desc: "Cursor and Lovable get you further than ever. The UI is stunning and the core features are starting to click.", 
        status: 'info' 
      },
      { 
        label: "The Wall", 
        title: "Technical Paralysis", 
        desc: "Stripe webhooks are failing, auth tokens are leaking, and the AI is hallucinating fixes. You're stalled at the 1-yard line.", 
        status: 'error', 
        code: "CRIT_ERR: PRODUCTION_GATEWAY_TIMEOUT" 
      },
      { 
        label: "The Finish", 
        title: "Production Reality", 
        desc: "FINISH Inc performs surgical engineering. We wire the last mile, secure the infra, and turn your prototype into a profit machine.", 
        status: 'success' 
      }
    ]
  },
  developer: {
    role: "Technical Leads & Devs",
    stages: [
      { 
        label: "Init", 
        title: "Architecture Draft", 
        desc: "The stack is chosen and the repo is initialized. You're building clean, modular, and fast.", 
        status: 'info' 
      },
      { 
        label: "Sprawl", 
        title: "The AI Debt Trap", 
        desc: "Rapid-fire AI generation creates a sprawl of unmaintainable logic. Complexity spikes faster than you can refactor.", 
        status: 'warning', 
        code: "WARN: DEBT_THRESHOLD_EXCEEDED" 
      },
      { 
        label: "Stall", 
        title: "Infrastructure Hell", 
        desc: "Hydration errors, database locks, and Vercel build loops. You're spending 40 hours a week on bugs instead of features.", 
        status: 'error', 
        code: "500: DEPLOYMENT_PIPELINE_COLLAPSE" 
      },
      { 
        label: "Handoff", 
        title: "Architectural Zen", 
        desc: "We step in as your surgical reserve. We clean the debt, harden the core, and hand back a stable, scalable codebase.", 
        status: 'success' 
      }
    ]
  },
  startup: {
    role: "Growing Startups",
    stages: [
      { 
        label: "Seed", 
        title: "Market Capture", 
        desc: "Your MVP is live and gaining traction. The team is small, lean, and hyper-focused on growth.", 
        status: 'info' 
      },
      { 
        label: "Feature", 
        title: "Integration Friction", 
        desc: "Scale brings complexity. Salesforce, custom LLMs, and multi-tier plan gating start to break your core stability.", 
        status: 'warning' 
      },
      { 
        label: "Crisis", 
        title: "Product Stagnation", 
        desc: "Technical debt has turned into a product ceiling. Churn is rising because you can't ship stability fixes fast enough.", 
        status: 'error', 
        code: "ALRT: CHURN_VELOCITY_CRITICAL" 
      },
      { 
        label: "Launch", 
        title: "Scaling Velocity", 
        desc: "We act as your 'Finish Unit', unblocking your core engineers so they can return to high-impact innovation.", 
        status: 'success' 
      }
    ]
  }
};

const AUDIENCE_ROUTING = [
  { id: 'for-founders', title: 'For Solo Founders', desc: 'Go from prototype to production in 72 hours. Fixed-price unblocking.', icon: '👤', action: 'Unblock My Build' },
  { id: 'for-startups', title: 'For Scaling Teams', desc: 'Augmented engineering reserve to clear your debt and ship features.', icon: '🏢', action: 'Scale My Team' },
  { id: 'for-developers', title: 'For Tech Leads', desc: 'Surgical refactoring for complex logic & infra. PR-first delivery.', icon: '💻', action: 'Clean My Code' },
  { id: 'idea-stage', title: 'For Early Ideas', desc: 'Technical blueprints and MVP architecture before you write code.', icon: '💡', action: 'Start FINISH Start' }
];

const TECHNICAL_AUDIT = [
  { label: "STP-WHOOK", name: "Stripe Webhooks", status: "Critical Path", desc: "Wiring listener logic and multi-tier plan gating." },
  { label: "AUTH-JWT", name: "Token Persistence", status: "Security Audit", desc: "Fixing hydration loops and cross-session leaks." },
  { label: "DB-SCHEMA", name: "Prisma Optimization", status: "Data Integrity", desc: "Cleaning messy AI-generated relations and indices." },
  { label: "CI-CD-INF", name: "Cloud Handoff", status: "Production Ready", desc: "Environment variable and DNS wiring for Vercel/AWS." }
];

/**
 * Animated Runner component that follows the journey path
 */
const FinishRunner: React.FC<{ stage: number; status: 'info' | 'warning' | 'error' | 'success' }> = ({ stage, status }) => {
  return (
    <motion.div
      className="absolute top-[35px] z-[20] hidden lg:block"
      animate={{ 
        left: `${(stage * 25) + 12.5}%`,
        x: '-50%' 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 45, 
        damping: 15,
        duration: 0.8
      }}
    >
      <div className="relative">
        {/* Shadow */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/10 rounded-full blur-md"></div>
        
        {/* Man Icon */}
        <motion.div 
          animate={
            status === 'error' ? { 
              y: [0, -4, 0], 
              rotate: [-5, 5, -5],
              scale: [1, 0.95, 1] 
            } : 
            status === 'success' ? {
              y: [0, -12, 0],
              rotate: [0, -10, 10, 0],
              scale: 1.1
            } : 
            { 
              y: [0, -8, 0],
              rotate: [0, 5, -5, 0]
            }
          }
          transition={{ 
            repeat: Infinity, 
            duration: status === 'success' ? 0.3 : 0.6,
            ease: "easeInOut" 
          }}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xl border-2 border-white transition-colors duration-500 ${
            status === 'success' ? 'bg-green-600' : 
            status === 'error' ? 'bg-slate-900' : 
            'bg-white text-slate-900'
          }`}
        >
          {status === 'success' ? '⚡' : status === 'error' ? '🚧' : '🏃'}
        </motion.div>
        
        {/* Progress Particle Trail */}
        {status === 'success' && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0 }}
                animate={{ opacity: 0, scale: 1.5, x: (i % 2 === 0 ? -20 : 20), y: 20 }}
                transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-green-400 rounded-full"
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [activeAudience, setActiveAudience] = useState<AudienceId>('founder');
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  // Logic to advance stages and then switch audiences
  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setActiveStageIdx(prevStage => {
        if (prevStage < 3) {
          return prevStage + 1;
        } else {
          // Switch Audience after finishing all stages
          setActiveAudience(currentAudience => {
            const keys = Object.keys(JOURNEYS) as AudienceId[];
            const nextIdx = (keys.indexOf(currentAudience) + 1) % keys.length;
            return keys[nextIdx];
          });
          return 0; // Reset to stage 1
        }
      });
    }, 4500); // Time spent per stage

    return () => clearInterval(interval);
  }, [autoRotate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } }
  };

  const currentJourney = JOURNEYS[activeAudience];
  const currentStage = currentJourney.stages[activeStageIdx];

  return (
    <div className="pt-20 bg-white selection:bg-green-100">
      {/* Surgical Hero Section */}
      <section className="relative py-24 md:py-56 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.p variants={itemVariants} className="text-green-600 font-mono text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-8">
              Surgical Engineering Partner
            </motion.p>
            <motion.h1 variants={itemVariants} className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter mb-10 leading-[0.8]">
              Your app. <br/>
              <span className="text-slate-400">Actually finished.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed mb-16 font-medium">
              We bridge the gap between "almost done" and production-live. High-velocity engineering to ship your stuck app in <span className="text-slate-900 font-bold underline decoration-green-500/30 underline-offset-4">24-72 hours.</span>
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onNavigate('diagnostic')}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white px-14 py-7 rounded-2xl font-black text-2xl transition-all shadow-[0_25px_60px_rgba(34,197,94,0.35)] border-none transform hover:-translate-y-2 active:scale-95"
              >
                Fix My App Now
              </button>
              <button 
                onClick={() => onNavigate('how-it-works')}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-14 py-7 rounded-2xl font-black text-2xl transition-all shadow-[0_25px_60px_rgba(15,23,42,0.25)] border-none transform hover:-translate-y-2 active:scale-95"
              >
                How It Works
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust & SEO Stack Ticker */}
      <section className="py-14 border-y border-slate-50 bg-slate-50/50 overflow-hidden">
        <div className="flex whitespace-nowrap gap-16 animate-[scroll_50s_linear_infinite] px-6">
          {['Next.js', 'TypeScript', 'Node.js', 'Stripe', 'Clerk', 'AWS', 'Vercel', 'Supabase', 'Cursor', 'Lovable', 'PostgreSQL', 'Auth0', 'Prisma', 'Tailwind'].map((tech, i) => (
            <span key={i} className="text-slate-300 font-black text-3xl uppercase tracking-tighter italic flex items-center gap-8">
              {tech} <span className="text-green-500/20">/</span>
            </span>
          ))}
          {/* Repeat */}
          {['Next.js', 'TypeScript', 'Node.js', 'Stripe', 'Clerk', 'AWS', 'Vercel', 'Supabase', 'Cursor', 'Lovable', 'PostgreSQL', 'Auth0', 'Prisma', 'Tailwind'].map((tech, i) => (
            <span key={`repeat-${i}`} className="text-slate-300 font-black text-3xl uppercase tracking-tighter italic flex items-center gap-8">
              {tech} <span className="text-green-500/20">/</span>
            </span>
          ))}
        </div>
      </section>

      {/* The Journey Section */}
      <section className="py-32 px-6 bg-slate-50 relative overflow-hidden" 
               onMouseEnter={() => setAutoRotate(false)} 
               onMouseLeave={() => setAutoRotate(true)}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-green-600 font-mono text-[10px] font-bold uppercase tracking-[0.4em] mb-4 text-center md:text-left">Interactive Roadmap</p>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] text-center md:text-left">
                The Path to <br/><span className="text-slate-400">Production.</span>
              </h2>
            </motion.div>
            
            <div className="flex p-1.5 bg-slate-200/50 rounded-[2rem] w-fit mx-auto md:mx-0 backdrop-blur-sm border border-slate-200/50">
              {(Object.keys(JOURNEYS) as AudienceId[]).map((id) => (
                <button
                  key={id}
                  onClick={() => { setActiveAudience(id); setActiveStageIdx(0); setAutoRotate(false); }}
                  className={`px-10 py-5 rounded-[1.6rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                    activeAudience === id ? 'bg-white text-slate-900 shadow-2xl scale-105' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {id}s
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* The Background Path Line */}
            <div className="absolute top-[60px] left-0 right-0 h-[3px] bg-slate-200 hidden lg:block z-0" />

            {/* Finish Runner Component */}
            <FinishRunner stage={activeStageIdx} status={currentStage.status} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
              <AnimatePresence mode="wait">
                {currentJourney.stages.map((stage, idx) => (
                  <motion.div
                    key={`${activeAudience}-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      scale: activeStageIdx === idx ? 1.02 : 1 
                    }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    onClick={() => { setActiveStageIdx(idx); setAutoRotate(false); }}
                    className="group cursor-pointer"
                  >
                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-10 border-4 border-white shadow-2xl transition-all duration-500 ${
                      activeStageIdx === idx && stage.status === 'success' ? 'bg-green-600 text-white rotate-12 scale-110 ring-4 ring-green-500/10' : 
                      activeStageIdx === idx && stage.status === 'error' ? 'bg-slate-900 text-white animate-pulse' : 
                      activeStageIdx === idx ? 'bg-green-500 text-white' :
                      'bg-white text-slate-400'
                    }`}>
                      <span className="font-mono text-lg font-black">{idx + 1}</span>
                    </div>

                    <div className={`p-12 rounded-[3rem] h-full border transition-all duration-500 ${
                      activeStageIdx === idx && stage.status === 'success' ? 'bg-white border-green-200 shadow-[0_30px_60px_rgba(34,197,94,0.15)] ring-4 ring-green-500/5' :
                      activeStageIdx === idx && stage.status === 'error' ? 'bg-slate-900 border-slate-800 text-white shadow-2xl relative' :
                      activeStageIdx === idx ? 'bg-white border-green-400 shadow-xl' :
                      'bg-white border-slate-100 opacity-60'
                    }`}>
                      {stage.status === 'error' && activeStageIdx === idx && (
                        <div className="absolute top-6 right-8 w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                      )}
                      <p className={`font-mono text-[9px] uppercase tracking-[0.3em] mb-6 ${
                        activeStageIdx === idx && stage.status === 'success' ? 'text-green-600' : 
                        activeStageIdx === idx && stage.status === 'error' ? 'text-red-400' : 
                        activeStageIdx === idx ? 'text-green-500' : 'text-slate-400'
                      }`}>
                        {stage.label}
                      </p>
                      <h3 className="text-3xl font-bold mb-6 tracking-tight leading-[1.1]">{stage.title}</h3>
                      <p className={`text-base leading-relaxed mb-10 ${
                        activeStageIdx === idx && stage.status === 'error' ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {stage.desc}
                      </p>

                      {stage.code && activeStageIdx === idx && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-auto pt-8 border-t border-slate-100/10"
                        >
                          <code className={`font-mono text-[11px] font-bold px-5 py-2.5 rounded-2xl block overflow-hidden truncate ${
                            stage.status === 'error' ? 'bg-red-500/10 text-red-400' : 'bg-slate-50 text-slate-400'
                          }`}>
                            {stage.code}
                          </code>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-56 text-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={() => onNavigate('diagnostic')}
              className="group text-slate-900 font-black text-xs uppercase tracking-[0.4em] flex items-center gap-6 mx-auto hover:text-green-600 transition-colors bg-white px-10 py-5 rounded-2xl shadow-xl"
            >
              Skip to the Finish Stage
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 group-hover:translate-x-3 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
        </div>
      </section>

      {/* The AI Gap Section */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-green-600 font-mono text-xs font-bold uppercase tracking-[0.4em] mb-6">The Market Reality</p>
            <h2 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter mb-10 leading-[0.9]">
              Built with AI. <br/>
              <span className="text-slate-400 italic">Finished by humans.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-12">
              AI development tools are fantastic for rapid prototyping and generating 80% of a UI. But they lack the context for <span className="text-slate-900 font-bold">production-grade security</span>, complex state management, and reliable infrastructure. We provide the senior oversight that AI cannot.
            </p>
            <div className="space-y-8">
              {[
                { label: 'AI Builder Status', value: 'Excellent Mockups, 80% Logic, Brittle Edge Cases', status: 'limit' },
                { label: 'FINISH Deliverables', value: 'Security Hardened, Wired Payments, Scalable Architecture', status: 'finish' }
              ].map((row, i) => (
                <div key={i} className={`p-8 rounded-[2.5rem] border-2 ${row.status === 'finish' ? 'bg-green-50/50 border-green-200' : 'bg-slate-50 border-slate-100'}`}>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">{row.label}</p>
                  <p className={`text-lg font-bold ${row.status === 'finish' ? 'text-green-800' : 'text-slate-700'}`}>{row.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TECHNICAL_AUDIT.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, rotate: -1 }}
                className="bg-slate-900 p-12 rounded-[3.5rem] text-white border border-slate-800 shadow-3xl relative overflow-hidden group transition-all"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                   <div className="font-mono text-6xl font-black tracking-tighter">{item.label}</div>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-green-500">{item.status}</span>
                </div>
                <h4 className="text-2xl font-bold mb-4 tracking-tight">{item.name}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Routing Section */}
      <section className="py-40 px-6 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4ade80 1.5px, transparent 1.5px)', backgroundSize: '50px 50px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <p className="text-green-500 font-mono text-xs font-bold uppercase tracking-[0.5em] mb-6">Vertical Specific Expertise</p>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-24 italic">Built for <span className="text-slate-600">everyone.</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {AUDIENCE_ROUTING.map((route, i) => (
              <motion.div 
                key={route.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onNavigate(route.id as PageId)}
                className="p-12 bg-slate-800/30 border border-slate-800 rounded-[3.5rem] text-left hover:bg-slate-800 hover:border-green-500/50 transition-all cursor-pointer group hover:shadow-2xl hover:shadow-green-500/5"
              >
                <div className="text-5xl mb-10 group-hover:scale-110 group-hover:rotate-12 transition-transform block">{route.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">{route.title}</h3>
                <p className="text-slate-400 text-base leading-relaxed mb-10">{route.desc}</p>
                <div className="mt-auto flex items-center gap-4 text-green-500 font-black text-xs uppercase tracking-[0.3em] group-hover:text-white transition-colors">
                  {route.action}
                  <span className="group-hover:translate-x-3 transition-transform text-xl">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-48 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white border-4 border-slate-900 p-16 md:p-32 rounded-[5rem] shadow-[60px_60px_0px_#f1f5f9] relative"
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-green-600 text-white px-12 py-5 rounded-3xl font-black text-xs uppercase tracking-[0.5em] shadow-3xl">
              Next Audit Slot: Tomorrow
            </div>
            <h2 className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter mb-12 leading-[0.8]">
              Cross the <br/>
              <span className="text-green-600 italic">finish line.</span>
            </h2>
            <p className="text-xl md:text-3xl text-slate-500 mb-20 max-w-3xl mx-auto leading-relaxed font-medium">
              We operate with fixed-price certainty and surgical execution. 
              Get your app out of the repo and into users' hands today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <button 
                onClick={() => onNavigate('diagnostic')}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white px-16 py-8 rounded-[2rem] font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_30px_70px_rgba(34,197,94,0.4)] border-none"
              >
                Fix My App Now
              </button>
              <button 
                onClick={() => onNavigate('pricing')}
                className="w-full sm:w-auto bg-slate-100 text-slate-900 px-16 py-8 rounded-[2rem] font-black text-2xl hover:bg-slate-200 transition-all border-none"
              >
                View Pricing
              </button>
            </div>
            <p className="mt-24 text-slate-400 font-mono text-[10px] uppercase tracking-[0.6em] opacity-60">Est. 2024 • Build to Ship • No Retainers • Global Partner</p>
          </motion.div>
        </div>
      </section>

      {/* SEO Strategy Footer */}
      <section className="py-24 px-6 border-t border-slate-100 bg-slate-50/20">
        <div className="max-w-5xl mx-auto text-center md:text-left">
          <h3 className="text-lg font-bold text-slate-900 mb-10 tracking-[0.2em] uppercase font-mono text-xs opacity-40">Engineering Philosophy & Directory</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-[12px] text-slate-400 uppercase tracking-widest font-mono leading-relaxed">
            <p>
              FINISH Inc is the premier <strong>Technical Partner</strong> for early-stage and seed-funded startups. We specialize exclusively in the <strong>Last Mile Engineering</strong> phase—the transition from AI prototypes (Cursor, Lovable, Bolt) to production-ready scalable software. Our core competencies include <strong>Next.js Refactoring</strong>, <strong>Stripe Payment Integration</strong>, <strong>PostgreSQL Optimization</strong>, and <strong>Automated Deployment Pipelines</strong>.
            </p>
            <p>
              We solve the "80% trap" by providing senior-level technical oversight and manual execution. Our <strong>Fixed-Price Software Diagnostic</strong> provides absolute budget predictability, while our <strong>Clean Code Handoff</strong> guarantees you maintain 100% intellectual property ownership of your application's source and cloud infrastructure.
            </p>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
};

export default Home;

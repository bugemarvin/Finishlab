
import React from 'react';
import type { PageId } from '../types';
import { motion } from 'framer-motion';

interface StartupsLandingProps {
  onNavigate: (page: PageId) => void;
}

const STARTUP_CHALLENGES = [
  {
    title: "Feature Stall",
    desc: "Your core team is so bogged down by legacy debt and maintenance that you haven't shipped a major feature in weeks.",
    icon: "🛑"
  },
  {
    title: "Integration Debt",
    desc: "You need to wire in Salesforce, Stripe, or a custom LLM, but your engineers are focused on the core product stability.",
    icon: "🔌"
  },
  {
    title: "The Churn Trap",
    desc: "Small, nagging bugs are driving user churn, but they aren't 'critical' enough to pull your senior leads off the roadmap.",
    icon: "📉"
  }
];

const RESERVE_SERVICES = [
  {
    label: "Stability",
    title: "Bug Eradication",
    desc: "We clear your backlog of P2/P3 bugs that annoy users but distract your core team.",
    features: ["Error Monitoring", "Regression Testing", "Hotfixes"]
  },
  {
    label: "Growth",
    title: "API & Integrations",
    desc: "Rapidly expanding your ecosystem by wiring in third-party tools and custom microservices.",
    features: ["Webhook Sync", "Data Mapping", "Vendor APIs"]
  },
  {
    label: "Scale",
    title: "Infrastructure Tuning",
    desc: "Optimizing your cloud costs and performance bottlenecks before your next big traffic spike.",
    features: ["AWS/Vercel Audit", "Query Optimization", "Caching"]
  },
  {
    label: "Handoff",
    title: "Audit & Refactor",
    desc: "Cleaning messy legacy code and improving documentation for easier onboarding of new hires.",
    features: ["TS Enforcement", "Component Cleanup", "Docs"]
  }
];

const StartupsLanding: React.FC<StartupsLandingProps> = ({ onNavigate }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } }
  };

  return (
    <div className="pt-20 bg-white selection:bg-green-100 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-24 md:py-40 px-6">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              className="lg:w-1/2"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.p variants={itemVariants} className="text-green-600 font-mono text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-6">
                Engineering Reserve Team
              </motion.p>
              <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]">
                Scale faster <br/>
                <span className="text-slate-400">without the drag.</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-xl text-slate-500 mb-10 leading-relaxed max-w-xl">
                We unblock your core team by handling the technical debt, complex integrations, and maintenance sprints that slow down your product roadmap.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onNavigate('partner')} 
                  className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-200 border-none hover:scale-105 transition-all"
                >
                  Book Reserve Support
                </button>
                <button 
                  onClick={() => onNavigate('how-it-works')} 
                  className="bg-white border border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all"
                >
                  View Workflow
                </button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {RESERVE_SERVICES.map((item, i) => (
                <div key={i} className="p-8 bg-slate-900 text-white rounded-[2rem] border border-slate-800 hover:border-green-500/50 transition-all shadow-xl">
                  <div className="text-green-500 font-mono text-[9px] uppercase tracking-widest mb-4">{item.label}</div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.features.map(f => (
                      <span key={f} className="text-[8px] font-bold text-slate-500 uppercase tracking-widest px-2 py-1 bg-slate-800 rounded">{f}</span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Scaling Wall Section */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6">
              The Scaling <span className="text-slate-400">Wall.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              As your user base grows, so does the weight of your codebase. 
              Eventually, the cost of maintenance exceeds the cost of innovation. 
              We are the release valve for your engineering pressure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STARTUP_CHALLENGES.map((challenge, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm"
              >
                <div className="text-4xl mb-6">{challenge.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{challenge.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{challenge.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Operations Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <p className="text-green-600 font-mono text-xs font-bold uppercase tracking-[0.3em] mb-4">Operational Excellence</p>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-8 leading-tight">
              We plug in where <br/> 
              <span className="text-slate-400 italic">you need us most.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              We don't replace your engineering team; we augment them. We operate with high-context autonomy, 
              meaning we don't need hand-holding to get technical tasks done.
            </p>
            <div className="space-y-4">
              {[
                { title: "Direct Linear/Jira Access", desc: "We pick up tickets from your backlog and ship PRs." },
                { title: "Priority Slack/Discord Support", desc: "Instant communication with your leads." },
                { title: "Quarterly Tech Debt Audits", desc: "Proactive scanning to prevent future bottlenecks." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                    <p className="text-slate-500 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative p-1 bg-slate-900 rounded-[3rem] shadow-2xl">
              <div className="bg-slate-800 rounded-[2.8rem] p-12 text-white">
                <div className="grid grid-cols-2 gap-12">
                  <div className="text-center md:text-left">
                    <p className="text-4xl font-black text-green-500 mb-1">24/7</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Monitoring</p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-4xl font-black text-white mb-1">0</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Onboarding Friction</p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-4xl font-black text-white mb-1">PR-First</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Delivery Model</p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-4xl font-black text-white mb-1">99.9%</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deployment Success</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Call to Action */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">
              Reclaim your <br/>
              <span className="text-green-500 italic">product roadmap.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              Stop letting technical debt dictate your launch cycle. 
              Bring in the reserve team to handle the heavy lifting while 
              your core engineers focus on innovation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onNavigate('partner')}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white px-12 py-6 rounded-2xl font-black text-xl shadow-2xl shadow-green-900/50 border-none transition-all hover:scale-105 active:scale-95"
              >
                Inquire about Reserve
              </button>
              <button 
                onClick={() => onNavigate('stories')}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white px-12 py-6 rounded-2xl font-black text-xl transition-all border-none"
              >
                Case Studies
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO Footer Text */}
      <section className="py-24 px-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-left opacity-60">
           <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight">Engineering Solutions for High-Growth Startups</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] text-slate-500 leading-relaxed uppercase tracking-wider font-mono">
              <p>
                Finish Studio provides <strong>On-Demand Engineering Reserve</strong> teams for startups in the Series A to Series C stages. We act as a high-velocity partner to eliminate <strong>Technical Debt</strong>, manage <strong>Legacy Code Refactoring</strong>, and execute complex <strong>Third-Party Integrations</strong>.
              </p>
              <p>
                Our engineers integrate directly into your workflow via <strong>GitHub</strong>, <strong>Linear</strong>, and <strong>Slack</strong>. We focus on <strong>Stability</strong>, <strong>Scalability</strong>, and <strong>Operational Velocity</strong>, allowing your primary team to focus on the core competitive advantages of your product.
              </p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default StartupsLanding;

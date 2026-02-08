
import React from 'react';
import { PageId } from '../types';
import { motion } from 'framer-motion';

interface WhyFinishProps {
  onNavigate: (page: PageId) => void;
}

const COMPARISON_DATA = [
  { feature: "Turnaround Time", agency: "3-6 Months", freelancer: "Unpredictable", finish: "24-72 Hours" },
  { feature: "Pricing Model", agency: "Huge Retainer", freelancer: "Hourly Drain", finish: "Fixed Project" },
  { feature: "Tech Focus", agency: "Generalist", freelancer: "Hit or Miss", finish: "Last Mile Surgical" },
  { feature: "IP Handoff", agency: "Often Gated", freelancer: "Messy", finish: "100% Clean Handoff" },
];

const CORE_DIFFERENTIATORS = [
  {
    title: "AI Prototype Remediation",
    desc: "AI builders are excellent at generating 80% of a UI, but they lack the context for production-grade security and state management. We specialize in fixing 'black box' AI logic.",
    icon: "🤖"
  },
  {
    title: "CTO-Level Strategy",
    desc: "We don't just fix bugs; we look at your entire architecture to ensure your database schema and API routes are ready for the first 10,000 users.",
    icon: "🧠"
  },
  {
    title: "Operational Autonomy",
    desc: "Most agencies need a 50-page spec. We need a GitHub link and a Linear ticket. We work with senior-level independence so you don't have to manage us.",
    icon: "⚡"
  }
];

const WhyFinish: React.FC<WhyFinishProps> = ({ onNavigate }) => {
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
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.p variants={itemVariants} className="text-green-600 font-mono text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-6">
              The FINISH Philosophy
            </motion.p>
            <motion.h1 variants={itemVariants} className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.85]">
              Production is the <br/>
              <span className="text-slate-400">only metric.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto">
              Code that sits in a repo is a liability. Code that lives in production is an asset. We exist because "almost done" is the most expensive stage of any product's lifecycle.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onNavigate('diagnostic')}
                className="w-full sm:w-auto bg-slate-900 text-white px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-slate-200 border-none"
              >
                Fix My App
              </button>
              <button 
                onClick={() => onNavigate('how-it-works')}
                className="w-full sm:w-auto bg-white border border-slate-200 text-slate-900 px-12 py-6 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all"
              >
                Our Process
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The 80% Trap (Contextual Content) */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-8 leading-tight">
              The "Almost Done" <br/> 
              <span className="text-slate-400">Delusion.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-6">
              AI development tools (Cursor, Lovable, v0) have democratized prototyping. You can build a stunning UI and basic logic in a weekend. 
            </p>
            <p className="text-slate-900 font-bold text-lg mb-8">
              But then you hit the wall: Stripe webhooks, JWT persistence, hydration errors, and production infrastructure.
            </p>
            <p className="text-slate-500 text-base leading-relaxed mb-10">
              The "Last 20%" of a product usually requires 80% of the total engineering effort. That's where most startups die. We are the rescue unit that ensures you don't become part of that statistic.
            </p>
            <div className="flex gap-12">
               <div>
                 <p className="text-3xl font-black text-slate-900 mb-1">90%</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Apps Stuck at 80%</p>
               </div>
               <div>
                 <p className="text-3xl font-black text-green-600 mb-1">24h</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Unblocking Speed</p>
               </div>
            </div>
          </motion.div>

          <div className="space-y-4">
             {CORE_DIFFERENTIATORS.map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group"
               >
                 <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
                 <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{item.title}</h3>
                 <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Competitive Table (Trust & Credibility) */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-green-600 font-mono text-xs font-bold uppercase tracking-[0.3em] mb-4">Comparison</p>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Engineered for <span className="text-slate-400">Outcome Velocity.</span></h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-6 px-4 text-left font-mono text-[10px] uppercase tracking-widest text-slate-400">Feature</th>
                  <th className="py-6 px-4 text-left font-mono text-[10px] uppercase tracking-widest text-slate-400">Big Agency</th>
                  <th className="py-6 px-4 text-left font-mono text-[10px] uppercase tracking-widest text-slate-400">Freelancer</th>
                  <th className="py-6 px-4 text-left font-mono text-[10px] uppercase tracking-widest text-green-600">FINISH Inc</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {COMPARISON_DATA.map((row, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-6 px-4 font-bold text-slate-900 text-sm">{row.feature}</td>
                    <td className="py-6 px-4 text-slate-500 text-sm">{row.agency}</td>
                    <td className="py-6 px-4 text-slate-500 text-sm">{row.freelancer}</td>
                    <td className="py-6 px-4 font-black text-green-600 text-sm">{row.finish}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Technical Authority (SEO Grid) */}
      <section className="py-32 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-24 opacity-5 rotate-12 scale-150">
           <svg className="w-96 h-96" viewBox="0 0 24 24" fill="currentColor">
             <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
           </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl mb-20">
            <h2 className="text-5xl font-black tracking-tighter mb-8 leading-tight">
              Surgical Engineering <br/>
              <span className="text-slate-500">over Generalist Dev.</span>
            </h2>
            <p className="text-slate-400 text-xl leading-relaxed">
              We don't build "websites." We engineer production applications. 
              Our focus is the deep technical wiring that makes or breaks a startup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Authentication & Identity", list: ["Hydration mismatch fixes", "JWT persistence tuning", "Clerk/Auth0 custom wiring", "RBAC implementation"] },
              { title: "Financial Engineering", list: ["Stripe webhook listeners", "Multi-tenant plan gating", "Subscription lifecycle sync", "Revenue recovery logic"] },
              { title: "Data Architecture", list: ["Prisma relation optimization", "Supabase RLS auditing", "PostgreSQL query tuning", "Migrations & cleanup"] }
            ].map((box, i) => (
              <div key={i} className="p-10 border border-slate-800 bg-slate-800/30 rounded-[3rem] backdrop-blur-md">
                <h4 className="text-xl font-bold mb-8 tracking-tight text-white">{box.title}</h4>
                <ul className="space-y-4">
                  {box.list.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                       <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                       {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 md:p-24 bg-white border-4 border-slate-900 rounded-[3.5rem] shadow-[40px_40px_0px_#f1f5f9] relative"
          >
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]">
              Stop guessing. <br/>
              <span className="text-green-600 italic">Start shipping.</span>
            </h2>
            <p className="text-slate-500 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
              We provide fixed-price certainty and senior-level execution. 
              Your app deserves to be finished.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onNavigate('diagnostic')}
                className="w-full sm:w-auto bg-slate-900 text-white px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-slate-200 border-none"
              >
                Start Diagnostic
              </button>
              <button 
                onClick={() => onNavigate('pricing')}
                className="w-full sm:w-auto bg-slate-100 text-slate-900 px-12 py-6 rounded-2xl font-black text-xl hover:bg-slate-200 transition-all border-none"
              >
                View Packages
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO Footer Text */}
      <section className="py-24 px-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-left opacity-60">
           <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight">Technical Partner for Last Mile Engineering</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] text-slate-500 leading-relaxed uppercase tracking-wider font-mono">
              <p>
                FINISH Inc is the leading technical partner for startups navigating the <strong>Technical Debt</strong> of early prototypes. We bridge the gap between <strong>AI-Generated Code</strong> and production-ready applications, focusing on <strong>Deployment Reliability</strong> and <strong>Architecture Security</strong>.
              </p>
              <p>
                Our team specializes in <strong>Last Mile Engineering</strong>, ensuring that complex integrations like <strong>Stripe</strong> and <strong>Clerk Auth</strong> are wired correctly for high-traffic environments. We eliminate the friction of software development for <strong>Solo Founders</strong> and <strong>Agile Startups</strong>.
              </p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default WhyFinish;

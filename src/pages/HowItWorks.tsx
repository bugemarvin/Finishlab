
import React from 'react';
import type { PageId } from '../types';
import { motion } from 'framer-motion';

interface HowItWorksProps {
  onNavigate: (page: PageId) => void;
}

const PHASES = [
  {
    tag: "Phase 01",
    title: "Project Intake & Secure Audit",
    desc: "You drop your GitHub repo or deployment link into our secure intake. We perform a non-invasive technical scan to understand the current state of your 'last 20%'.",
    details: ["Private Repo Access", "Environment Review", "Scope Definition"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    tag: "Phase 02",
    title: "The Last-Mile Diagnosis",
    desc: "A senior engineer manually audits your auth loops, Stripe webhooks, and state management. We provide a fixed-price 'Finish Quote' within 24 hours.",
    details: ["Edge Case Mapping", "Fixed-Price Guarantee", "24hr Turnaround"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  },
  {
    tag: "Phase 03",
    title: "Surgical Execution",
    desc: "We don't do 'general' development. We perform surgical fixes to unblock production. We wire the missing pieces, squash the bugs, and refactor for stability.",
    details: ["Bug Eradication", "Feature Wiring", "Performance Triage"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    tag: "Phase 04",
    title: "Production Handoff",
    desc: "We deploy to your Vercel, AWS, or Fly.io account. You get a full handoff document, clean version control, and a production-live product. Keys are yours.",
    details: ["Infrastructure Setup", "CI/CD Wiring", "Full IP Handoff"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    )
  }
];

const AUDIT_POINTS = [
  "Auth Loops & Token Persistence",
  "Stripe Webhook Synchronization",
  "Environment Variable Integrity",
  "Database Schema Optimization",
  "Hydration & State Mismatches",
  "API Rate Limit Handling",
  "Production SSL & DNS Config",
  "Error Boundary Robustness"
];

const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-green-600 font-mono text-xs font-bold uppercase tracking-[0.3em] mb-4">The Pipeline</p>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8">
              How We <span className="text-slate-400">Finish</span>.
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Most software stays at 80% because the last 20% is actually the hardest 80%. 
              Our delivery pipeline is built to bridge that gap with surgical precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Pipeline Visualization */}
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Background Line */}
            <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-100 -translate-x-1/2 hidden sm:block">
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="w-full bg-green-500 origin-top"
              />
            </div>

            <div className="space-y-32">
              {PHASES.map((phase, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`flex flex-col sm:flex-row items-center gap-12 ${idx % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${idx % 2 === 0 ? 'sm:text-right' : 'sm:text-left'} w-full`}>
                    <p className="text-green-600 font-mono text-[10px] font-bold uppercase tracking-widest mb-2">{phase.tag}</p>
                    <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">{phase.title}</h3>
                    <p className="text-slate-500 text-base leading-relaxed mb-6">
                      {phase.desc}
                    </p>
                    <div className={`flex flex-wrap gap-2 ${idx % 2 === 0 ? 'sm:justify-end' : 'sm:justify-start'}`}>
                      {phase.details.map((detail, dIdx) => (
                        <span key={dIdx} className="bg-slate-50 border border-slate-100 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Icon Node */}
                  <div className="relative z-10 w-16 h-16 rounded-3xl bg-slate-900 text-white flex items-center justify-center shadow-2xl shrink-0 ring-8 ring-white">
                    {phase.icon}
                  </div>

                  {/* Spacer for reverse layout alignment */}
                  <div className="flex-1 hidden sm:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Technical Audit Grid */}
      <section className="py-32 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-green-500 font-mono text-xs font-bold uppercase tracking-[0.3em] mb-6">Technical Scope</p>
              <h2 className="text-5xl font-black tracking-tighter mb-8 leading-none">
                What we look for in the <span className="text-slate-500">Last Mile Audit.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                AI can generate code, but it doesn't understand your business logic or 
                production edge cases. Our audit is a deep scan of the structural integrity 
                that separates a prototype from a product.
              </p>
              <button 
                onClick={() => onNavigate('diagnostic')}
                className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all"
              >
                Diagnostic Intake
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AUDIT_POINTS.map((point, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-2xl border border-slate-800 bg-slate-800/30 flex items-center gap-4 group hover:border-green-500/50 transition-colors"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 group-hover:scale-150 transition-transform"></div>
                  <span className="text-sm font-bold text-slate-300 tracking-tight">{point}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final Commitment CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-50 p-12 sm:p-20 rounded-[3rem] border border-slate-100"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
              Ready to cross the <br/>
              <span className="text-green-600 underline decoration-green-500/20 underline-offset-8 italic">Finish line?</span>
            </h2>
            <p className="text-slate-500 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              We don't do retainers. We don't do discovery workshops. 
              We do engineering execution that gets you live.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => onNavigate('diagnostic')}
                className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-slate-200 border-none"
              >
                Start My Diagnostic
              </button>
              <button 
                onClick={() => onNavigate('pricing')}
                className="w-full sm:w-auto bg-white border border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-black text-lg transition-all hover:bg-slate-50"
              >
                View Pricing
              </button>
            </div>
          </motion.div>
          
          <div className="mt-16 flex items-center justify-center gap-12 grayscale opacity-40">
             <div className="font-black text-xl tracking-tighter italic">FINISH.STUDIO</div>
             <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
             <div className="font-black text-xl tracking-tighter italic">OPS.LIVE</div>
             <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
             <div className="font-black text-xl tracking-tighter italic">EST.2024</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;

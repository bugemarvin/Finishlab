
import React from 'react';
import { PageId } from '../types';
import { motion } from 'framer-motion';

interface BlueprintWorkflowProps {
  onNavigate: (page: PageId) => void;
}

const MILESTONES = [
  {
    day: "Day 01",
    title: "Extraction & Vision",
    desc: "A 90-minute technical deep dive to extract every nuance of your product vision. We identify the 'Atomic Unit' of your app.",
    icon: "🎯"
  },
  {
    day: "Day 03",
    title: "System Architecture",
    desc: "We map the infrastructure. Next.js vs Remix, Supabase vs PostgreSQL, AWS vs Vercel. We choose for scale.",
    icon: "🏗️"
  },
  {
    day: "Day 05",
    title: "The Schema Lock",
    desc: "We design the relational database schema. Every table, relation, and index is mapped for performance from day one.",
    icon: "📊"
  },
  {
    day: "Day 07",
    title: "The Handoff",
    desc: "You receive the full Technical Blueprint, a prioritized Linear backlog, and an optional quote for the MVP Build.",
    icon: "📦"
  }
];

const BlueprintWorkflow: React.FC<BlueprintWorkflowProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 bg-white min-h-screen">
      <section className="py-24 px-6 border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-green-600 font-mono text-xs font-bold uppercase tracking-[0.4em] mb-4">The 7-Day Sprint</p>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8">
              The Blueprint <span className="text-slate-400">Workflow.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We don't spend months in discovery. We spend one week in surgical planning to ensure your build is flawless.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200"></div>

            <div className="space-y-24">
              {MILESTONES.map((m, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative pl-24"
                >
                  <div className="absolute left-0 top-0 w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl shadow-xl z-10 border-4 border-white">
                    {m.icon}
                  </div>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                      <span className="text-green-600 font-mono text-[10px] font-black uppercase tracking-widest mb-2 block">{m.day}</span>
                      <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">{m.title}</h3>
                      <p className="text-slate-500 text-lg leading-relaxed max-w-xl">{m.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-8 tracking-tighter italic">Ready to see the blueprint?</h2>
          <button 
            onClick={() => onNavigate('blueprint-intake')}
            className="bg-green-600 hover:bg-green-500 text-white px-12 py-6 rounded-2xl font-black text-xl transition-all shadow-2xl shadow-green-900/50 border-none"
          >
            Apply for Studio Start
          </button>
        </div>
      </section>
    </div>
  );
};

export default BlueprintWorkflow;

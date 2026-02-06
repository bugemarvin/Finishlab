
import React from 'react';
import type { PageId } from '../types';
import { motion } from 'framer-motion';

interface FoundersLandingProps {
  onNavigate: (page: PageId) => void;
}

const FOUNDER_PAIN_POINTS = [
  {
    title: "The AI Prototype Wall",
    desc: "You used Cursor, Lovable, or v0 to build 80% of your app in days. Now, Stripe won't connect and Auth is looping.",
    icon: "🧱"
  },
  {
    title: "Technical Sprawl",
    desc: "Your codebase is a mess of AI-generated files that no one understands. You're afraid to change a single line.",
    icon: "🕸️"
  },
  {
    title: "Investor Pressure",
    desc: "You have a demo next week but the app crashes every time you refresh. You need a stable production build now.",
    icon: "⏱️"
  }
];

const FOUNDER_SOLUTIONS = [
  {
    label: "Audit",
    title: "The Zero-BS Review",
    desc: "We scan your repo for security leaks, auth loops, and architectural debt. No fluff, just a fix list.",
    tags: ["Security", "Architecture"]
  },
  {
    label: "Fix",
    title: "Surgical Execution",
    desc: "Our senior engineers wire your payments, stabilize your DB, and fix the bugs AI can't see.",
    tags: ["Stripe", "Auth", "API"]
  },
  {
    label: "Ship",
    title: "Production Handoff",
    desc: "We deploy to your infra. You get the keys, the clean code, and a live product for your users.",
    tags: ["Vercel", "AWS", "CI/CD"]
  }
];

const FoundersLanding: React.FC<FoundersLandingProps> = ({ onNavigate }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="pt-20 bg-white selection:bg-green-100 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-24 md:py-40 px-6 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.p variants={itemVariants} className="text-green-600 font-mono text-[10px] md:text-xs font-black uppercase tracking-[0.5em] mb-8">
              Solo Founder & Builder Support
            </motion.p>
            <motion.h1 variants={itemVariants} className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.85]">
              You build the <span className="text-slate-400">vision.</span> <br/>
              We build the <span className="text-green-600 italic">reality.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-12">
              We specialize in unblocking solo-founders. Whether you're stuck in a code loop or ready to scale a prototype, we take your app from <span className="text-slate-900 font-bold underline decoration-green-500/30">"80% done" to production-live.</span>
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onNavigate('diagnostic')}
                className="w-full sm:w-auto bg-slate-900 text-white px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-[0_20px_50px_rgba(15,23,42,0.3)] border-none"
              >
                Fix My App
              </button>
              <button 
                onClick={() => onNavigate('pricing')}
                className="w-full sm:w-auto bg-slate-100 text-slate-900 px-12 py-6 rounded-2xl font-black text-xl hover:bg-slate-200 transition-all border-none"
              >
                View Packages
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Founder's Dilemma (Problem Section) */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-slate-400 font-mono text-[10px] font-black uppercase tracking-widest mb-4">The Challenge</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Why solo-builders <span className="text-slate-400">get stuck.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FOUNDER_PAIN_POINTS.map((point, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{point.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{point.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-green-600 font-mono text-xs font-bold uppercase tracking-[0.3em] mb-4">Surgical Support</p>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-8 leading-tight">
              One partner for the <br/> 
              <span className="text-slate-400 italic">entire lifecycle.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              Stop hiring random freelancers or overpriced agencies. We operate with senior-level precision to solve the specific bottlenecks of solo-founded products.
            </p>
            <button 
              onClick={() => onNavigate('how-it-works')}
              className="group text-slate-900 font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:text-green-600 transition-colors"
            >
              See our workflow
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </motion.div>

          <div className="space-y-4">
            {FOUNDER_SOLUTIONS.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900 p-8 rounded-[2rem] text-white border border-slate-800 shadow-2xl group hover:border-green-500/50 transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-green-500">{item.label}</span>
                  </div>
                  <div className="flex gap-2">
                    {item.tags.map(t => (
                      <span key={t} className="text-[8px] font-bold uppercase tracking-widest text-slate-500 px-2 py-1 bg-slate-800 rounded">{t}</span>
                    ))}
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-2 tracking-tight">{item.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Idea Stage Bridge */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-green-600 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden group shadow-2xl shadow-green-100"
          >
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
               <svg className="w-48 h-48" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
               </svg>
            </div>
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.4em] mb-6">Pre-Code? No Problem.</p>
              <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">Just have an <br/> <span className="text-green-900 italic">idea stage project?</span></h2>
              <p className="text-green-50 text-lg mb-10 leading-relaxed">
                If you haven't started building yet, we can help you design a production-grade 
                technical blueprint and architecture before the first line of code is written.
              </p>
              <button 
                onClick={() => onNavigate('idea-stage')}
                className="bg-white text-green-600 px-10 py-5 rounded-2xl font-black text-lg hover:bg-green-50 transition-all border-none"
              >
                Go to Idea Stage (Studio Start)
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial / Outcome Section */}
      <section className="py-32 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white tracking-tighter mb-20 italic">"Engineering the Finish."</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {[
              { founder: "Alex Rivera", company: "Fluxify AI", quote: "We were stuck in a deployment loop for 3 weeks. Finish Studio resolved the infra issues in 48 hours. We launched the next day." },
              { founder: "Sarah Chen", company: "HealthStack", quote: "The AI code was a black box. Finish refactored our core auth and payments flow. Now we handle 1k+ daily active users without a glitch." },
              { founder: "Marcus Thorne", company: "DevLayer", quote: "No fluff, just clean PRs. They act like an extension of my brain. Best engineering investment I've made." }
            ].map((t, i) => (
              <div key={i} className="p-10 border border-slate-800 bg-slate-800/30 rounded-[2.5rem] relative">
                <div className="text-green-500 text-4xl mb-6">“</div>
                <p className="text-slate-300 text-sm leading-relaxed mb-8 italic">{t.quote}</p>
                <div>
                  <p className="text-white font-bold text-sm tracking-tight">{t.founder}</p>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t.company}</p>
                </div>
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
            className="p-12 md:p-24 bg-white border-4 border-slate-900 rounded-[3.5rem] shadow-[40px_40px_0px_#f1f5f9]"
          >
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]">
              Let's get it <br/>
              <span className="text-green-600">shipped.</span>
            </h2>
            <p className="text-slate-500 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
              We operate with fixed-price certainty and surgical execution. 
              Get your app out of the repo and into users' hands.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onNavigate('diagnostic')}
                className="w-full sm:w-auto bg-slate-900 text-white px-12 py-6 rounded-2xl font-black text-xl transition-all shadow-2xl shadow-slate-200 border-none"
              >
                Fix My App
              </button>
              <button 
                onClick={() => onNavigate('stories')}
                className="w-full sm:w-auto bg-slate-100 text-slate-900 px-12 py-6 rounded-2xl font-black text-xl transition-all border-none"
              >
                See Case Studies
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO Footer Text */}
      <section className="py-24 px-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-left opacity-60">
           <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight">Software Studio for Solo Founders</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] text-slate-500 leading-relaxed uppercase tracking-wider font-mono">
              <p>
                Finish Studio is a specialized engineering partner for early-stage startup founders. We focus on <strong>Last Mile Engineering</strong>—the critical phase between prototyping and production. Our services include <strong>Stripe Integration</strong>, <strong>Authentication Debugging</strong>, <strong>Database Optimization</strong>, and <strong>Cloud Deployment</strong>.
              </p>
              <p>
                We bridge the gap for founders using AI development tools like <strong>Cursor</strong>, <strong>Lovable</strong>, and <strong>v0</strong>. By providing senior-level technical oversight, we ensure your product is scalable, secure, and ready for market launch.
              </p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default FoundersLanding;

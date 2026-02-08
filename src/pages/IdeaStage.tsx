
import React from 'react';
import { PageId } from '../types';
import { motion } from 'framer-motion';

interface IdeaStageProps {
  onNavigate: (page: PageId) => void;
}

const BLUEPRINT_FEATURES = [
  {
    title: "Stack Selection",
    desc: "We choose the right infrastructure (Next.js, Supabase, AWS, etc.) based on your scale targets, not just what's trendy.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    title: "Schema Design",
    desc: "A messy database is the #1 cause of product death. We design relational schemas that grow with your user base.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    )
  },
  {
    title: "User Flow Mapping",
    desc: "We wireframe every critical conversion point to ensure your MVP isn't just functional, but high-converting.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    )
  },
  {
    title: "API Strategy",
    desc: "Integration first. We map out how your app talks to Stripe, OpenAI, Clerk, and your internal services.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z" />
      </svg>
    )
  }
];

const IdeaStage: React.FC<IdeaStageProps> = ({ onNavigate }) => {
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
      {/* Hero: The Blueprint Section */}
      <section className="relative py-24 md:py-40 px-6">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-600 font-mono text-[10px] font-black uppercase tracking-widest mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Studio Start
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.85]">
                Plan for <br/>
                <span className="text-slate-400">Production.</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-xl text-slate-500 mb-10 leading-relaxed max-w-xl">
                Most founders start with a "Vercel Deploy" button. We start with a <span className="text-slate-900 font-bold">Technical Blueprint</span>. We ensure your first line of code is your most scalable one.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onNavigate('blueprint-intake')}
                  className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-slate-200 border-none group"
                >
                  Start The Blueprint
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button 
                  onClick={() => onNavigate('blueprint-workflow')}
                  className="bg-white border border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all"
                >
                  View Workflow
                </button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-green-100 rounded-[3rem] blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative bg-slate-900 rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-800 overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <svg className="w-40 h-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                     <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                   </svg>
                </div>
                <div className="space-y-6 relative z-10">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center text-white font-bold">01</div>
                      <div className="h-px flex-grow bg-slate-800"></div>
                      <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Discovery</span>
                   </div>
                   <h3 className="text-2xl font-bold text-white tracking-tight">System Architecture Review</h3>
                   <div className="space-y-3">
                      {['Database Relation Mapping', 'Auth Flow Optimization', 'API Edge-Case Audit'].map((check, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                           {check}
                        </div>
                      ))}
                   </div>
                   <div className="pt-8 border-t border-slate-800">
                      <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-4">Output Format</p>
                      <div className="flex gap-2">
                         <span className="px-3 py-1 bg-slate-800 rounded-lg text-white font-mono text-[10px]">BLUEPRINT.PDF</span>
                         <span className="px-3 py-1 bg-slate-800 rounded-lg text-white font-mono text-[10px]">TICKET_BACKLOG.JSON</span>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Planning Matters Section (SEO Focused) */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">
              Don't build your MVP on <br/>
              <span className="text-slate-400">technical sand.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Most startup failures happen not from a lack of users, but from an inability to iterate. 
              We solve for <span className="text-slate-900 font-bold">Product Velocity</span> by fixing the technical foundations before you hit the gas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BLUEPRINT_FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 mb-8 border border-slate-100">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Idea Stage Pipeline */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="space-y-6">
               {[
                 { step: "01", title: "Strategy Session", sub: "1:1 deep dive into your product vision and user flows." },
                 { step: "02", title: "Technical Audit", sub: "We map out every API and DB relation needed to ship." },
                 { step: "03", title: "The Blueprint", sub: "You receive a full architectural doc and execution plan." },
                 { step: "04", title: "MVP Sprint", sub: "We build the core 20% that matters in record time." }
               ].map((item, i) => (
                 <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 items-start group"
                 >
                    <div className="font-mono text-slate-200 text-3xl font-black group-hover:text-green-500 transition-colors">{item.step}</div>
                    <div>
                       <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                       <p className="text-sm text-slate-500">{item.sub}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-green-600 font-mono text-xs font-bold uppercase tracking-[0.3em] mb-4">Execution Framework</p>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-8 leading-tight">
              We turn "I wish" <br/> 
              <span className="text-slate-400">into "It's live."</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              Stop wandering through documentation and expensive agency retainers. 
              Our "Studio Start" package is a fixed-price, 7-day sprint to turn 
              your abstract idea into a concrete technical roadmap.
            </p>
            <div className="flex items-center gap-12 border-t border-slate-100 pt-10">
              <div>
                <p className="text-3xl font-black text-slate-900 mb-1">7 Days</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Roadmap Delivery</p>
              </div>
              <div className="w-px h-12 bg-slate-100"></div>
              <div>
                <p className="text-3xl font-black text-slate-900 mb-1">Fixed</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Price Certainty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Strategic Moat (Dark Section) */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 italic">"Building without a plan is just <br/> expensive guessing."</h2>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
              Don't be another founder stuck at the 80% mark with a broken prototype. 
              Build with the confidence that your architecture supports your ambition.
              We ensure your MVP is production-ready from day one.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onNavigate('blueprint-intake')}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white px-12 py-6 rounded-2xl font-black text-xl shadow-2xl shadow-green-900/50 border-none transform hover:scale-105 active:scale-95 transition-all"
              >
                Schedule Strategy Call
              </button>
              <button 
                onClick={() => onNavigate('pricing')}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white px-12 py-6 rounded-2xl font-black text-xl transition-all border-none"
              >
                View Packages
              </button>
            </div>
            <p className="mt-12 text-slate-500 font-mono text-[9px] uppercase tracking-[0.4em]">Strategy • Architecture • MVP Delivery • Scale</p>
          </motion.div>
        </div>
      </section>

      {/* Final SEO Text Section */}
      <section className="py-24 px-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-left">
           <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Technical Strategy for Early-Stage Startups</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-500 leading-relaxed">
              <p>
                Getting the technical architecture right in the pre-seed or seed stage is the difference between scaling effortlessly or spending 6 months refactoring a broken codebase. Our <strong>Studio Start</strong> service is designed specifically for non-technical founders or solo-builders who need a high-trust engineering partner to lead the way.
              </p>
              <p>
                We focus on <strong>Scalable Infrastructure</strong>, <strong>Data Integrity</strong>, and <strong>Secure Auth flows</strong>. Whether you are building an AI-powered marketplace or a complex SaaS tool, our goal is to eliminate the technical friction that stops 90% of MVPs from reaching production.
              </p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default IdeaStage;

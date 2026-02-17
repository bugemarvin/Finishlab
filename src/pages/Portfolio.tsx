
import React, { useState } from 'react';
import type { PageId } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioProps {
  onNavigate: (page: PageId) => void;
}

interface Project {
  id: string;
  name: string;
  url: string;
  tag: string;
  desc: string;
  stack: string[];
  finishImpact: string;
  scrapedData: {
    title: string;
    description: string;
    keywords: string[];
    ssl: boolean;
    loadTime: string;
  };
}

const PROJECTS: Project[] = [
  {
    id: 'fintrack',
    name: 'FinTrack Pro',
    url: 'https://demo.fintrack.io',
    tag: 'FinTech SaaS',
    desc: 'Advanced portfolio management for high-net-worth individuals.',
    stack: ['Next.js', 'Prisma', 'Stripe', 'Supabase'],
    finishImpact: 'Resolved a critical memory leak in the real-time ticker and secured the multi-tenant DB structure.',
    scrapedData: {
      title: 'FinTrack Pro | Wealth Management Reimagined',
      description: 'The premier platform for tracking global assets with surgical precision.',
      keywords: ['Wealth', 'Assets', 'Ticker', 'Real-time'],
      ssl: true,
      loadTime: '0.8s'
    }
  },
  {
    id: 'healthsync',
    name: 'HealthSync',
    url: 'https://demo.healthsync.app',
    tag: 'MedTech',
    desc: 'HIPAA-compliant data synchronization for clinic networks.',
    stack: ['Node.js', 'AWS', 'Auth0', 'PostgreSQL'],
    finishImpact: 'Hardened the Auth0 identity bridge and optimized complex relational queries for patient records.',
    scrapedData: {
      title: 'HealthSync | HIPAA Compliant Data Ops',
      description: 'Unifying patient data across distributed clinic nodes securely.',
      keywords: ['MedTech', 'Compliance', 'Sync', 'Data'],
      ssl: true,
      loadTime: '1.2s'
    }
  },
  {
    id: 'petconnect',
    name: 'PetConnect',
    url: 'https://demo.petconnect.social',
    tag: 'Marketplace',
    desc: 'Hyper-local marketplace for dog walkers and specialized pet care.',
    stack: ['Next.js', 'Clerk', 'Stripe Webhooks', 'Vercel'],
    finishImpact: 'Wired the Stripe webhook listener system and fixed a production-only hydration mismatch loop.',
    scrapedData: {
      title: 'PetConnect | Find Local Pet Care',
      description: 'Connect with vetted pet professionals in your neighborhood.',
      keywords: ['Pet Care', 'Dog Walker', 'Marketplace', 'Social'],
      ssl: true,
      loadTime: '0.9s'
    }
  },
  {
    id: 'hire-reserve',
    name: 'HireReserve',
    url: 'https://demo.hirereserve.tech',
    tag: 'HR Tech',
    desc: 'On-demand engineering talent platform for scaling startups.',
    stack: ['React', 'Express', 'JWT', 'PostgreSQL'],
    finishImpact: 'Implemented a robust JWT persistence strategy and fixed session leaks in the contractor dashboard.',
    scrapedData: {
      title: 'HireReserve | Engineering Talent On-Demand',
      description: 'The surgical strike team for your startup technical debt.',
      keywords: ['Talent', 'Engineering', 'Hiring', 'Startups'],
      ssl: true,
      loadTime: '1.1s'
    }
  }
];

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-10"
    >
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div 
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.95 }}
        className="relative w-full max-w-7xl h-full bg-white rounded-[3rem] shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-6 sm:px-10 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-green-600 text-white flex items-center justify-center font-black">FS</div>
             <div>
               <h3 className="text-xl font-black text-slate-900 tracking-tight">{project.name}</h3>
               <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Architect Scraper Live</p>
             </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors text-slate-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
          {/* Left: Scraper Details (Simulated) */}
          <div className="w-full lg:w-[400px] bg-slate-50 border-r border-slate-100 p-8 sm:p-10 overflow-y-auto scrollbar-hide">
             <div className="space-y-10">
               <div>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600 mb-6">Technical Scan</p>
                 <div className="bg-slate-900 rounded-3xl p-6 font-mono text-[11px] text-green-400 space-y-4 shadow-xl">
                   <div><span className="text-slate-500">// Header Scrape</span></div>
                   <div><span className="text-white">Title:</span> {project.scrapedData.title}</div>
                   <div><span className="text-white">Desc:</span> {project.scrapedData.description}</div>
                   <div className="flex gap-2 flex-wrap pt-2">
                     {project.scrapedData.keywords.map(k => (
                       <span key={k} className="bg-green-400/10 px-2 py-0.5 rounded text-[9px] uppercase tracking-tighter">#{k}</span>
                     ))}
                   </div>
                   <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                      <span className="text-white">SSL Status:</span>
                      <span className="text-green-500 font-black">SECURE</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-white">Load Time:</span>
                      <span className="text-yellow-400 font-black">{project.scrapedData.loadTime}</span>
                   </div>
                 </div>
               </div>

               <div>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Finish Impact</p>
                 <div className="p-6 bg-white border border-slate-200 rounded-[2rem] shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                   <p className="text-sm font-bold text-slate-800 leading-relaxed italic">
                     "{project.finishImpact}"
                   </p>
                 </div>
               </div>

               <div>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Environment Stack</p>
                 <div className="flex flex-wrap gap-2">
                   {project.stack.map(s => (
                     <span key={s} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest">
                       {s}
                     </span>
                   ))}
                 </div>
               </div>
             </div>
          </div>

          {/* Right: Live Preview Iframe */}
          <div className="flex-grow bg-slate-200 relative overflow-hidden group">
             {/* Simulated Browser Bar */}
             <div className="h-10 bg-white border-b border-slate-100 flex items-center px-4 gap-4">
                <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-400" />
                   <div className="w-3 h-3 rounded-full bg-yellow-400" />
                   <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="bg-slate-50 flex-1 h-6 rounded-md px-4 flex items-center text-[10px] text-slate-400 font-mono">
                   {project.url}
                </div>
             </div>
             
             {/* Actual Iframe with fallback messaging */}
             <div className="w-full h-full relative">
                <iframe 
                  src={project.url} 
                  className="w-full h-full border-none bg-white" 
                  title={project.name}
                />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-10 pointer-events-none">
                   <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                   </div>
                   <p className="text-xl font-black tracking-tight mb-2">Live Deployment Viewer</p>
                   <p className="text-sm text-slate-300">Interact with the production environment.</p>
                </div>
             </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 px-10 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
           <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Architect Certification ID: FIN-{project.id.toUpperCase()}-09-24</p>
           <button 
             onClick={() => window.open(project.url, '_blank')}
             className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl"
           >
             Open in New Tab
           </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Portfolio: React.FC<PortfolioProps> = ({ onNavigate }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } }
  };

  return (
    <div className="pt-20 bg-white selection:bg-green-100 overflow-x-hidden min-h-screen">
      {/* Hero Header */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 font-mono text-xs font-black uppercase tracking-[0.4em] mb-6"
          >
            Production Proof
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.8]"
          >
            Shipped by <br/>
            <span className="text-slate-400 italic">Finish.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto"
          >
            A curated showcase of applications we've bridged from "80% prototype" to production-grade scalable software.
          </motion.p>
        </div>
      </section>

      {/* Project Grid */}
      <section className="pb-32 px-6">
        <motion.div 
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {PROJECTS.map((project) => (
            <motion.div 
              key={project.id}
              variants={cardVariants}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-slate-100 border border-slate-100 transition-all hover:border-green-500 hover:shadow-2xl hover:-translate-y-2">
                 {/* Project Placeholder with URL overlay */}
                 <div className="absolute inset-0 flex flex-col items-center justify-center p-10 bg-white">
                    <div className="text-[120px] font-black text-slate-50 tracking-tighter group-hover:scale-110 group-hover:text-green-50 transition-all">
                       {project.id.toUpperCase()}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-all transform translate-y-10 group-hover:translate-y-0 text-center">
                       <span className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl">
                          Launch Deployment Scan
                       </span>
                    </div>
                 </div>
              </div>

              <div className="mt-8 px-4 flex items-start justify-between">
                 <div>
                    <div className="flex items-center gap-3 mb-3">
                       <span className="px-3 py-1 bg-slate-50 text-slate-400 font-mono text-[9px] uppercase tracking-widest rounded-full border border-slate-100">
                          {project.tag}
                       </span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{project.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-md">{project.desc}</p>
                 </div>
                 <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-green-600 group-hover:text-white transition-all transform group-hover:rotate-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                 </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Technical Reserve Callout */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#4ade80 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 italic leading-tight">Your project here?</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            We operate with surgical precision to ensure your startup doesn't stall at the 80% wall. Start your diagnostic today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => onNavigate('diagnostic')}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white px-12 py-6 rounded-2xl font-black text-xl shadow-2xl shadow-green-900/50 border-none transition-all hover:scale-105 active:scale-95"
            >
              Start Diagnostic
            </button>
            <button 
              onClick={() => onNavigate('how-it-works')}
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white px-12 py-6 rounded-2xl font-black text-xl transition-all border-none"
            >
              The Process
            </button>
          </div>
        </div>
      </section>

      {/* SEO Footer for Portfolio */}
      <section className="py-24 px-6 border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight uppercase tracking-widest font-mono text-xs opacity-40">Portfolio Engineering Directory</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-[11px] text-slate-400 uppercase tracking-wider font-mono leading-relaxed">
            <p>
              FINISH Inc's <strong>Engineering Portfolio</strong> represents our expertise in the <strong>Last Mile Engineering</strong> phase. We specialize in <strong>SaaS refactoring</strong>, <strong>MedTech compliance</strong>, and <strong>marketplace unblocking</strong>. Our projects demonstrate high-fidelity <strong>Next.js optimization</strong> and robust <strong>Stripe ecosystem wiring</strong>.
            </p>
            <p>
              Each project in our showcase underwent a rigorous <strong>technical audit</strong> and surgical remediation process. We bridge the gap for <strong>Seed-stage and Series A startups</strong>, ensuring their production environments are secured with <strong>Senior Technical Oversight</strong> and production-ready architectures.
            </p>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;

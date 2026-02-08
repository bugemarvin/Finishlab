
import React from 'react';
import type { PageId } from '../types';
import { motion } from 'framer-motion';

interface PartnerProps {
  onNavigate: (page: PageId) => void;
}

const PARTNER_TRACKS = [
  {
    title: "VC Technical Due Diligence",
    quote: "Our portfolio founders build fast prototypes but hit technical walls right before their seed round. We needed a reliable team to step in for the last mile.",
    solution: "We provide comprehensive VC technical due diligence and engineering reserve for portfolio companies, ensuring technical debt doesn't stall growth.",
    category: "Venture Capital",
    icon: "🏦"
  },
  {
    title: "Agency White-Label Services",
    quote: "We are great at design and branding, but we kept getting bogged down in messy API integrations and Stripe webhook loops.",
    solution: "We offer premium agency white-label services, acting as your invisible engineering hand to turn designs into production-ready software for your clients.",
    category: "Creative Agencies",
    icon: "🎨"
  },
  {
    title: "Studio Overflow Support",
    quote: "Our core team is focused on high-ticket new builds. We don't have the capacity to handle maintenance or 'unbreaking' smaller legacy projects.",
    solution: "Our studio overflow support handles technical cleanup and high-friction maintenance tasks that distract your top-tier engineers, keeping you lean.",
    category: "Dev Studios",
    icon: "⚙️"
  }
];

const PARTNER_BENEFITS = [
  { title: "Priority Queue", desc: "Partners get guaranteed 12-hour response times for their referrals." },
  { title: "Revenue Share", desc: "10% recurring referral reward for the lifetime of the engagement." },
  { title: "Dedicated Lead", desc: "Direct line to our Lead Architect for project scoping." },
  { title: "Portfolio Audit", desc: "Quarterly technical health checks for your entire portfolio." }
];

const Partner: React.FC<PartnerProps> = ({ onNavigate }) => {
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
            className="text-center max-w-5xl mx-auto"
          >
            <motion.p variants={itemVariants} className="text-green-600 font-mono text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-6">
              Strategic Startup Partnerships
            </motion.p>
            <motion.h1 variants={itemVariants} className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.85]">
              Be the partner <br/>
              <span className="text-slate-400 italic">who finishes.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-slate-500 mb-12 leading-relaxed max-w-3xl mx-auto">
              We specialize in strategic startup partnerships for VCs, creative agencies, and dev studios. From VC technical due diligence to agency white-label services, we ensure your ecosystem actually crosses the finish line.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onNavigate('partner-intake')}
                className="w-full sm:w-auto bg-slate-900 text-white px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-slate-200 border-none"
              >
                Apply for Partnership
              </button>
              <button 
                onClick={() => onNavigate('stories')}
                className="w-full sm:w-auto bg-white border border-slate-200 text-slate-900 px-12 py-6 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all"
              >
                View Case Studies
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Track Breakdown */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Strategic solutions for <span className="text-slate-400">your business model.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PARTNER_TRACKS.map((track, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm flex flex-col group hover:shadow-xl transition-all"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    {track.category}
                  </span>
                  <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{track.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">{track.title}</h3>
                
                <div className="pl-6 border-l-[3px] border-green-500 mb-8">
                  <p className="text-slate-500 italic text-base leading-relaxed">
                    “{track.quote}”
                  </p>
                </div>
                
                <div className="mt-auto">
                  <p className="text-slate-700 text-sm leading-relaxed">
                    <span className="font-extrabold uppercase text-[10px] tracking-wider block mb-2 text-slate-400">The Value:</span>
                    {track.solution}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <p className="text-green-600 font-mono text-xs font-bold uppercase tracking-[0.3em] mb-4">Partner Advantages</p>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-8 leading-tight">
              High-trust scaling <br/> 
              <span className="text-slate-400 italic">without the overhead.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              By initiating a startup partnership with FINISH, you provide your network with a world-class technical reserve team. We handle everything from VC technical due diligence to agency white-label services.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PARTNER_BENEFITS.map((benefit, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="font-bold text-slate-900 tracking-tight">{benefit.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
             <div className="relative aspect-square sm:aspect-video lg:aspect-square">
                <div className="absolute inset-0 bg-green-100 rounded-[4rem] rotate-3 blur-3xl opacity-20"></div>
                <div className="relative bg-slate-900 rounded-[3rem] p-12 h-full flex flex-col justify-center text-white overflow-hidden border border-slate-800">
                  <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                     <svg className="w-64 h-64" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                     </svg>
                  </div>
                  <h3 className="text-4xl font-black mb-6 tracking-tighter italic">"Finish allows our agencies to pitch bigger tech projects with 100% confidence in delivery."</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700"></div>
                    <div>
                      <p className="font-bold text-sm">Managing Director</p>
                      <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">Top-Tier Digital Agency</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Rewards Callout */}
      <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-green-500 font-mono text-[10px] font-black uppercase tracking-[0.5em] mb-8">Ecosystem Growth</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">
              10% Recurring <br/> 
              <span className="text-green-500 italic">Referral Rewards.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
              We reward our strategic partners for helping us unblock the world's most innovative builders. 
              Simple, transparent tracking and monthly payouts for referral startup partnerships.
            </p>
            <button 
              onClick={() => onNavigate('partner-intake')}
              className="bg-white text-slate-900 px-12 py-6 rounded-2xl font-black text-xl hover:bg-green-500 hover:text-white transition-all shadow-2xl shadow-green-900/50 border-none"
            >
              Apply to Partner Track
            </button>
          </motion.div>
        </div>
      </section>

      {/* SEO Footer Text */}
      <section className="py-24 px-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-left opacity-60">
           <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight italic">Technical Partner for Last Mile Engineering & Startup Partnerships</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] text-slate-500 leading-relaxed uppercase tracking-wider font-mono">
              <p>
                FINISH Inc is a specialized <strong>Engineering Reserve Team</strong> providing <strong>startup partnerships</strong> for <strong>Venture Capital Firms</strong>. We conduct rigorous <strong>VC technical due diligence</strong> to identify technical risk and provide stability to high-fidelity investments.
              </p>
              <p>
                We provide <strong>agency white-label services</strong> to handle complex backend logic and <strong>studio overflow support</strong> for high-growth tech ecosystems. Our mission is to ensure <strong>Product-Market Fit</strong> is never stalled by technical friction or unmanaged technical debt.
              </p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Partner;

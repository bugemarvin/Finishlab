
import React from 'react';
import { PageId } from '../types';
import { motion } from 'framer-motion';

interface TermsOfServiceProps {
  onNavigate: (page: PageId) => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 bg-white selection:bg-green-100 min-h-screen">
      <section className="py-24 px-6 border-b border-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 font-mono text-xs font-black uppercase tracking-[0.4em] mb-6"
          >
            Commercial Terms
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]"
          >
            Terms of <br/>
            <span className="text-slate-400">Execution.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto"
          >
            Our operational rules for delivery, billing, and the fixed-price guarantee for all FINISH Inc projects.
          </motion.p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-slate prose-lg max-w-none"
          >
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-6">1. The Fixed-Price Guarantee</h2>
            <p className="text-slate-600 leading-relaxed">
              Every project starts with a 24-hour diagnostic. The price quoted at the end of this diagnostic is the final price for the defined scope. If we discover additional complexity that was not visible during our audit, we honor the original price—absorbing the risk of the 'Last Mile' ourselves.
            </p>
            
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-6 mt-12">2. IP Transfer & Work-for-Hire</h2>
            <p className="text-slate-600 leading-relaxed">
              All engineering work performed by FINISH Inc is considered 'Work for Hire'. You retain 100% ownership of all source code, design assets, and infrastructure configurations the moment full payment for the milestone is received. We do not use proprietary 'black box' libraries that force dependency on our engineering.
            </p>

            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-6 mt-12">3. Delivery Windows & SLA</h2>
            <p className="text-slate-600 leading-relaxed">
              We define 'Ship Dates' for every project. A surgical fix is typically delivered in 24-72 hours. Larger refactors are scheduled in 1-week sprints. We guarantee a production-ready PR within the agreed window, provided we have all necessary cloud credentials and technical context.
            </p>

            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-6 mt-12">4. Payment & Refunds</h2>
            <p className="text-slate-600 leading-relaxed">
              Stabilize & Ship packages require a 50% upfront deposit to lock an engineering slot. The remaining 50% is due upon production handoff. In the rare event that we cannot resolve the identified issue within our diagnostic scope, we provide a 100% refund of the deposit.
            </p>

            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-6 mt-12">5. Support & Maintenance</h2>
            <p className="text-slate-600 leading-relaxed">
              Every project includes 48 hours of post-launch hyper-care to ensure the production deployment is stable. Long-term maintenance requires an 'Engineering Reserve' agreement. We are not liable for breaking changes introduced by third-party APIs (Stripe, OpenAI, Clerk) after our handoff period ends.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 bg-slate-900 rounded-[2.5rem] border border-slate-800 text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl"
          >
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight italic">Ready to finish?</h3>
              <p className="text-slate-400 text-sm">Accept these terms and get your diagnostic quote tomorrow.</p>
            </div>
            <button 
              onClick={() => onNavigate('diagnostic')}
              className="bg-green-600 text-white px-10 py-5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-green-500 transition-all border-none shrink-0 shadow-xl shadow-green-900/20"
            >
              Start My Project
            </button>
          </motion.div>
        </div>
      </section>

      {/* SEO Footer for Legal */}
      <section className="py-24 px-6 border-t border-slate-50 bg-slate-50/20">
        <div className="max-w-4xl mx-auto text-center opacity-40">
           <p className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold leading-relaxed">
             FINISH Inc Terms of Service • Build to Ship • IP Handoff Guaranteed • Fixed-Price Model • Est. 2024
           </p>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;

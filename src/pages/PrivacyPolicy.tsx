
import React from 'react';
import type { PageId } from '../types';
import { motion } from 'framer-motion';

interface PrivacyPolicyProps {
  onNavigate: (page: PageId) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
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
            Trust & Security
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]"
          >
            Privacy <br/>
            <span className="text-slate-400">Protocols.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto"
          >
            How we protect your intellectual property, repository access, and project data during the surgical engineering process.
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
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-6">1. Engineering Data Sovereignty</h2>
            <p className="text-slate-600 leading-relaxed">
              At FINISH Inc, we treat your code like the asset it is. We do not "mine" your project data for training AI models, nor do we share your unique architectural decisions with other clients. When you grant us repository access for a diagnostic or execution phase, that access is restricted to the specific engineers assigned to your project.
            </p>
            
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-6 mt-12">2. Repository & Secret Management</h2>
            <p className="text-slate-600 leading-relaxed">
              We never store sensitive environment variables (API Keys, DB Secrets) locally on our machines. We interact with your secrets directly through secure production environments (Vercel, AWS Secrets Manager, GitHub Actions). Our policy is to never ask for a secret via plain-text chat or email.
            </p>

            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-6 mt-12">3. Data Collection Transparency</h2>
            <p className="text-slate-600 leading-relaxed">
              We collect minimal data required to perform our surgical strikes:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-600">
              <li><strong>Project Metadata:</strong> Tech stack details, repository structure, and bug reports.</li>
              <li><strong>Contact Information:</strong> For high-bandwidth communication during execution phases.</li>
              <li><strong>Diagnostic Logs:</strong> Non-invasive logs generated during our 24-hour audit phase.</li>
            </ul>

            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-6 mt-12">4. Intellectual Property Retention</h2>
            <p className="text-slate-600 leading-relaxed">
              Your privacy includes the right to your IP. As a standard part of our operating agreement, we perform a clean handoff. Once a project is finalized and paid, we prune our access to your systems within 7 business days unless a long-term 'Engineering Reserve' agreement is in place.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center gap-10"
          >
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Need a custom NDA?</h3>
              <p className="text-slate-500 text-sm">We provide standard non-disclosure agreements for all high-context enterprise diagnostics.</p>
            </div>
            <button 
              onClick={() => onNavigate('diagnostic')}
              className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all border-none shrink-0"
            >
              Request Scoped Audit
            </button>
          </motion.div>
        </div>
      </section>

      {/* SEO Footer for Legal */}
      <section className="py-24 px-6 border-t border-slate-50 bg-slate-50/20">
        <div className="max-w-4xl mx-auto text-center opacity-40">
           <p className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold leading-relaxed">
             FINISH Inc Privacy Policy • Effective Jan 2024 • Built for Founders • No Data Harvesting • Secure Engineering Protocols
           </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;

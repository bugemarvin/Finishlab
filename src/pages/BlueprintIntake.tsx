
import React, { useState } from 'react';
import { PageId } from '../types';
import { motion } from 'framer-motion';

interface BlueprintIntakeProps {
  onNavigate: (page: PageId) => void;
}

const BlueprintIntake: React.FC<BlueprintIntakeProps> = ({ onNavigate }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    await new Promise(r => setTimeout(r, 1500));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="pt-40 pb-24 px-6 text-center max-w-2xl mx-auto">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">✓</div>
          <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight text-center">Vision Received.</h1>
          <p className="text-slate-500 text-lg mb-10 leading-relaxed text-center">
            Our Lead Architect is reviewing your concept. We'll reach out within 24 hours to schedule your Extraction Session.
          </p>
          <button onClick={() => onNavigate('home')} className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold">Back to Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="text-green-600 font-mono text-[10px] font-black uppercase tracking-[0.4em] mb-4">Application</p>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">
            Start Your <span className="text-slate-400">Blueprint.</span>
          </h1>
          <p className="text-slate-500 text-lg">Tell us about the product you want to exist.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Full Name</label>
              <input required type="text" className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" placeholder="Jane Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <input required type="email" className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" placeholder="jane@vision.com" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">The Vision</label>
            <textarea required rows={4} className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none resize-none" placeholder="Explain the core problem you are solving and how the app works..." />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Target Audience</label>
            <input required type="text" className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" placeholder="e.g. B2B SaaS Founders, Fitness Coaches, etc." />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Inspiration / Competitors (URLs)</label>
            <input type="text" className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" placeholder="List apps you admire or want to improve upon" />
          </div>

          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-200 border-none flex items-center justify-center gap-3"
          >
            {status === 'submitting' ? 'Submitting Vision...' : 'Request My Blueprint'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default BlueprintIntake;

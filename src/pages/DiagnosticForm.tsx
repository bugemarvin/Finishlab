
import React, { useState } from 'react';
import type { PageId } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface DiagnosticFormProps {
  onNavigate: (page: PageId) => void;
}

const RequiredAsterisk = () => (
  <span className="text-red-500 ml-1" aria-hidden="true">*</span>
);

const InfoTooltip: React.FC<{ content: string }> = ({ content }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block ml-2 align-middle group">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="w-5 h-5 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center text-[10px] font-black hover:border-green-500 hover:text-green-600 transition-all focus:outline-none focus:ring-2 focus:ring-green-100"
        aria-label="more information"
      >
        ?
      </button>
      <AnimatePresence>
        {show && (
          <motion.div 
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-5 bg-slate-900 text-white text-[11px] font-medium leading-relaxed rounded-2xl shadow-2xl z-50 pointer-events-none"
          >
            <div className="relative z-10 lowercase">{content}</div>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AITip: React.FC<{ text: string }> = ({ text }) => (
  <div className="mt-3 flex items-start gap-3 p-4 bg-green-50/50 border border-green-100 rounded-2xl group transition-all hover:bg-green-50">
    <div className="w-5 h-5 rounded-lg bg-green-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-green-200">
      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-black uppercase tracking-widest text-green-600 opacity-60">Architect Tip</span>
      <p className="text-[12px] font-bold text-green-800 leading-relaxed lowercase">{text}</p>
    </div>
  </div>
);

const DiagnosticForm: React.FC<DiagnosticFormProps> = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStatus('success');
    setTimeout(() => {
      setStatus('idle');
    }, 8000);
  };

  return (
    <div className="pt-20 bg-slate-50 min-h-screen relative overflow-x-hidden">
      {/* Toast Notification */}
      <div 
        role="alert"
        aria-live="assertive"
        className={`fixed top-24 right-6 left-6 md:left-auto md:w-96 z-[160] transform transition-all duration-500 ease-out ${
          status === 'success' ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white border-l-8 border-green-500 shadow-2xl rounded-2xl p-8 flex gap-6 items-start">
          <div className="bg-green-100 p-3 rounded-2xl text-green-600 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-base">diagnostic received</h4>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed lowercase">
              thanks for submitting! our engineering team will review your project and get back to you with a quote within 24 hours.
            </p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-4 text-[10px] font-black text-green-600 hover:text-green-700 uppercase tracking-widest"
            >
              dismiss notification
            </button>
          </div>
        </div>
      </div>

      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-left mb-16">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-green-600 font-mono text-[10px] font-black uppercase tracking-[0.4em] mb-4">engineering intake</p>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-[0.9]">
              Fix My App. <br/><span className="text-slate-400 italic">Fast.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-medium">
              the more detail you provide, the faster we can give you an accurate quote and timeline. let's get your product shipped.
            </p>
          </motion.div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[3rem] p-10 md:p-20 shadow-2xl shadow-slate-200/50 mb-16 relative">
          {/* AI Banner */}
          <div className="absolute top-8 right-10 hidden lg:flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-green-600">ai architect unblocked</span>
          </div>

          <form className="space-y-14" onSubmit={handleSubmit} aria-label="app diagnostic information">
            
            {/* Section: Your Contact Info */}
            <section className="space-y-8" aria-labelledby="contact-info-heading">
              <h2 id="contact-info-heading" className="text-xl font-black text-slate-900 border-b-2 border-slate-100 pb-6 tracking-tight">
                your identity
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="full-name" className="block text-xs font-black uppercase tracking-widest text-slate-400">
                    full name <RequiredAsterisk />
                  </label>
                  <input 
                    id="full-name"
                    type="text" 
                    placeholder="e.g., john doe"
                    required
                    aria-required="true"
                    disabled={status === 'submitting'}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all placeholder:text-slate-300 font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email-address" className="block text-xs font-black uppercase tracking-widest text-slate-400">
                    email address <RequiredAsterisk />
                  </label>
                  <input 
                    id="email-address"
                    type="email" 
                    placeholder="e.g., john@company.com"
                    required
                    aria-required="true"
                    disabled={status === 'submitting'}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all placeholder:text-slate-300 font-bold" 
                  />
                </div>
              </div>
            </section>

            {/* Section: Project Diagnostic */}
            <section className="space-y-10" aria-labelledby="project-diagnostic-heading">
              <h2 id="project-diagnostic-heading" className="text-xl font-black text-slate-900 border-b-2 border-slate-100 pb-6 tracking-tight">
                project diagnostic
              </h2>
              
              <div className="space-y-12">
                <div className="space-y-3">
                  <label htmlFor="app-description" className="block text-xs font-black uppercase tracking-widest text-slate-400">
                    what does your app do? <RequiredAsterisk />
                    <InfoTooltip content="provide the 30,000-ft view. what is the core value proposition? e.g. 'b2b saas for automated inventory tracking' or 'd2c marketplace for vintage furniture'." />
                  </label>
                  <textarea 
                    id="app-description"
                    rows={3}
                    placeholder="e.g., a marketplace for local dog walkers."
                    required
                    aria-required="true"
                    disabled={status === 'submitting'}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all placeholder:text-slate-300 resize-none font-bold leading-relaxed"
                  ></textarea>
                  <AITip text="keep this high-level. our engineers need to understand the 'atomic unit' of your product before diving into bugs." />
                </div>

                <div className="space-y-3">
                  <label htmlFor="target-audience" className="block text-xs font-black uppercase tracking-widest text-slate-400">
                    who is it for?
                    <InfoTooltip content="who are the primary users? solo entrepreneurs, enterprise hr teams, or general consumers? this helps us prioritize ux/ui polish vs deep backend security." />
                  </label>
                  <input 
                    id="target-audience"
                    type="text" 
                    placeholder="e.g., dog owners in major cities."
                    disabled={status === 'submitting'}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all placeholder:text-slate-300 font-bold" 
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="tech-stack" className="block text-xs font-black uppercase tracking-widest text-slate-400">
                    technical stack or ai builder
                    <InfoTooltip content="knowing if the code was generated by cursor, lovable, or v0 is vital. it tells us how the logic is likely structured and where ai typically fails (state management, secure auth, complex loops)." />
                  </label>
                  <select 
                    id="tech-stack"
                    disabled={status === 'submitting'}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all bg-white text-slate-900 font-bold"
                  >
                    <option value="">Select Tech Environment</option>
                    <option value="cursor">Cursor / AI-built (High technical debt)</option>
                    <option value="v0">v0 / Lovable / Bolt (Prototype stage)</option>
                    <option value="nocode">Bubble / No-code (Integration help)</option>
                    <option value="react">React / Next.js / TypeScript (Surgical Refactor)</option>
                    <option value="other">Other / Custom Legacy</option>
                  </select>
                  <AITip text="if you used an ai agent, don't hide it. we specialize in refactoring ai-generated state loops and circular database dependencies." />
                </div>

                <div className="space-y-3">
                  <label htmlFor="broken-missing" className="block text-xs font-black uppercase tracking-widest text-slate-400">
                    what's broken or missing? <RequiredAsterisk />
                    <InfoTooltip content="identify specific blockers. e.g. 'login works locally but loops on vercel', 'stripe webhooks are returning 404', or 'database relations are creating circular dependencies'." />
                  </label>
                  <textarea 
                    id="broken-missing"
                    rows={4}
                    placeholder="e.g., user login doesn't work in production. stripe payments fail."
                    required
                    aria-required="true"
                    disabled={status === 'submitting'}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all placeholder:text-slate-300 resize-none font-bold leading-relaxed"
                  ></textarea>
                  <AITip text="the more technical the better. mention specific errors like 'hydration mismatch' or 'jwt persistence failure' for a faster quote." />
                </div>

                <div className="space-y-3">
                  <label htmlFor="attempts" className="block text-xs font-black uppercase tracking-widest text-slate-400">
                    what have you tried so far?
                    <InfoTooltip content="don't be shy. tell us if you've spent 40 hours fighting cursor prompts or if you've tried manual refactors. this helps us avoid repeating your mistakes." />
                  </label>
                  <textarea 
                    id="attempts"
                    rows={3}
                    placeholder="e.g., i tried debugging the vercel logs but can't find the root cause."
                    disabled={status === 'submitting'}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all placeholder:text-slate-300 resize-none font-bold leading-relaxed"
                  ></textarea>
                </div>

                <div className="space-y-3">
                  <label htmlFor="repo-link" className="block text-xs font-black uppercase tracking-widest text-slate-400">
                    repository link <RequiredAsterisk />
                    <InfoTooltip content="we cannot perform a diagnostic without code access. submit a github, gitlab, or bitbucket link. we will request access if the repo is private." />
                  </label>
                  <input 
                    id="repo-link"
                    type="url" 
                    placeholder="https://github.com/your/project"
                    required
                    aria-required="true"
                    disabled={status === 'submitting'}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all placeholder:text-slate-300 font-bold" 
                  />
                  <AITip text="make sure the repository has public read access or be ready to invite 'hello@finishlab.app' to your private organization." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="loom-link" className="block text-xs font-black uppercase tracking-widest text-slate-400">
                      loom demo (optional)
                      <InfoTooltip content="a 2-minute video walkthrough of the bug in action is worth 1,000 emails. show us exactly where the user flow breaks." />
                    </label>
                    <input 
                      id="loom-link"
                      type="url" 
                      placeholder="loom.com/share/..."
                      disabled={status === 'submitting'}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all placeholder:text-slate-300 font-bold" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="timeline" className="block text-xs font-black uppercase tracking-widest text-slate-400">
                      timeline / urgency
                      <InfoTooltip content="do you have a demo day tomorrow? a marketing launch in 48 hours? let us know the 'real world' deadline so we can triage accordingly." />
                    </label>
                    <input 
                      id="timeline"
                      type="text" 
                      placeholder="e.g., launching in 48h"
                      disabled={status === 'submitting'}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all placeholder:text-slate-300 font-bold" 
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="pt-10">
              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white px-12 py-8 rounded-[2rem] font-black text-2xl transition-all shadow-2xl shadow-slate-200/50 border-none transform hover:-translate-y-1 active:scale-[0.98] disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-4"
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="animate-spin h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    executing diagnostic...
                  </>
                ) : 'Submit Diagnostic & Get Quote'}
              </button>
              <p className="text-center mt-6 text-slate-400 font-mono text-[9px] uppercase tracking-[0.4em]">non-invasive audit • fixed-price delivery • 24h guarantee</p>
            </div>
          </form>
        </div>
      </section>

      {/* SEO/Informational Footer */}
      <section className="py-24 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-4xl mx-auto text-center md:text-left opacity-60">
           <h3 className="text-sm font-bold text-slate-900 mb-6 tracking-widest uppercase font-mono">confidentiality & ip handoff</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-[11px] text-slate-500 leading-relaxed uppercase tracking-[0.15em] font-mono">
              <p className="lowercase">
                finish inc maintains strict <strong>non-disclosure protocols</strong> for all repository submissions. your intellectual property is protected by the terms of our <strong>commercial diagnostic service</strong>. we do not store code locally; audits are performed in real-time within your existing cloud ecosystem.
              </p>
              <p className="lowercase">
                every engagement includes a 100% <strong>intellectual property transfer</strong>. upon final delivery and production handoff, you maintain exclusive ownership of all source code, database schemas, and infrastructure configurations generated by our senior engineering team.
              </p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default DiagnosticForm;


import React, { useState, useEffect, useRef } from 'react';
import type { PageId } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

interface PartnerIntakeProps {
  onNavigate: (page: PageId) => void;
}

const RequiredAsterisk = () => (
  <span className="text-red-500 ml-1" aria-hidden="true">*</span>
);

const PartnerIntake: React.FC<PartnerIntakeProps> = ({ onNavigate }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [aiTip, setAiTip] = useState<string>('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    orgName: '',
    partnerType: '',
    contactName: '',
    contactEmail: '',
    clientProfile: '',
    techCapabilities: '',
    collaborationGoals: '',
    projectVolume: 'low',
    interests: [] as string[]
  });

  // Use ReturnType<typeof setTimeout> instead of NodeJS.Timeout for browser compatibility
  const aiDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // AI Logic to provide strategic value as the partner fills the form
  useEffect(() => {
    if (formData.collaborationGoals.length > 20 || formData.techCapabilities.length > 20) {
      if (aiDebounceRef.current) clearTimeout(aiDebounceRef.current);
      aiDebounceRef.current = setTimeout(() => {
        generateAiPartnerTip();
      }, 1500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.collaborationGoals, formData.techCapabilities]);

  const generateAiPartnerTip = async () => {
    setIsAiThinking(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as the Partnerships Director at FINISH Inc. 
        A potential partner is filling out our intake form. 
        Type: ${formData.partnerType}
        Capabilities: ${formData.techCapabilities}
        Goals: ${formData.collaborationGoals}
        
        Provide a 2-sentence "Strategic Alignment Tip" in lowercase. 
        Focus on how FINISH Inc can specifically unblock their model (e.g., handling their technical overflow or providing 24/7 engineering reserve). 
        Avoid fluff. Be technical and professional.`,
      });
      setAiTip(response.text || '');
    } catch (e) {
      console.error("ai tip failed", e);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    await new Promise(r => setTimeout(r, 2000));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="pt-40 pb-24 px-6 text-center max-w-2xl mx-auto">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 text-4xl shadow-xl shadow-green-100">🤝</div>
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter italic text-center">strategic link established.</h1>
          <p className="text-slate-500 text-xl mb-12 leading-relaxed text-center lowercase">
            our partnership director is reviewing your profile. we'll reach out within 24 hours to schedule a deep-dive on how we can synchronize our engineering efforts.
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => onNavigate('home')} className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">Back to Home</button>
            <button onClick={() => onNavigate('stories')} className="bg-white border border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all">Review Stories</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-slate-50 min-h-screen relative overflow-x-hidden selection:bg-green-100 selection:text-green-900">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/2 h-screen opacity-[0.03] pointer-events-none bg-no-repeat bg-right-top" style={{ backgroundImage: 'radial-gradient(circle, #22c55e 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <section className="py-24 px-6 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Header Content */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-green-600 font-mono text-[10px] font-black uppercase tracking-[0.5em] mb-6">Strategic Onboarding</p>
              <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.85]">
                Partner with <br/><span className="text-slate-400 italic">FINISH Inc.</span>
              </h1>
              <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-md lowercase">
                we scale with high-trust organizations. tell us how your ecosystem operates and we'll build a custom engineering reserve protocol for you.
              </p>

              {/* AI Insight Box */}
              <AnimatePresence mode="wait">
                {(aiTip || isAiThinking) && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-2 h-2 rounded-full bg-green-500 ${isAiThinking ? 'animate-ping' : ''}`} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Architect's Recommendation</span>
                    </div>
                    {isAiThinking ? (
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-800 rounded-lg w-full animate-pulse" />
                        <div className="h-4 bg-slate-800 rounded-lg w-3/4 animate-pulse" />
                      </div>
                    ) : (
                      <p className="text-[13px] font-bold leading-relaxed text-slate-300 lowercase">
                        {aiTip}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-12 pt-12 border-t border-slate-200">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Partner Tier Benefits</p>
                 <div className="grid grid-cols-2 gap-4">
                    {['10% Revenue Share', '12h Response SLA', 'Custom Onboarding', 'Portfolio Audits'].map(b => (
                      <div key={b} className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                        <div className="w-1 h-1 rounded-full bg-green-500" />
                        {b}
                      </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-10 bg-white p-10 md:p-16 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
              
              {/* Profile Section */}
              <div className="space-y-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                   <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-xs">01</span>
                   Entity Identification
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Organization Name <RequiredAsterisk /></label>
                    <input 
                      required 
                      type="text" 
                      value={formData.orgName}
                      onChange={e => setFormData({...formData, orgName: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-bold placeholder:text-slate-300" 
                      placeholder="e.g. Visionary Ventures" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Partner Category <RequiredAsterisk /></label>
                    <select 
                      required 
                      value={formData.partnerType}
                      onChange={e => setFormData({...formData, partnerType: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all bg-white font-bold text-slate-900"
                    >
                      <option value="">Select Category</option>
                      <option value="vc">Venture Capital / Incubator</option>
                      <option value="agency">Digital / Creative Agency</option>
                      <option value="studio">Development Studio</option>
                      <option value="referral">Technical Consultant</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Ecosystem Section */}
              <div className="space-y-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                   <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-xs">02</span>
                   Ecosystem Intelligence
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Typical Client Profile</label>
                    <textarea 
                      rows={3}
                      value={formData.clientProfile}
                      onChange={e => setFormData({...formData, clientProfile: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all resize-none font-bold placeholder:text-slate-300 leading-relaxed" 
                      placeholder="e.g. early-stage fintech founders, b2b saas with $1m-5m arr..." 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Existing Technical Stack/Capabilities</label>
                    <textarea 
                      rows={3}
                      value={formData.techCapabilities}
                      onChange={e => setFormData({...formData, techCapabilities: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all resize-none font-bold placeholder:text-slate-300 leading-relaxed" 
                      placeholder="e.g. core team handles design/react, we need backend/infra unblocking..." 
                    />
                  </div>
                </div>
              </div>

              {/* Strategic Alignment Section */}
              <div className="space-y-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                   <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-xs">03</span>
                   Collaboration Logic
                </h3>
                
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Specific Interests (Select all that apply)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: 'whitelabel', label: 'White-Label Execution' },
                      { id: 'referral', label: 'Recurring Referral Program' },
                      { id: 'reserve', label: 'Engineering Reserve Team' },
                      { id: 'audits', label: 'Portfolio Health Audits' },
                      { id: 'emergency', label: 'Emergency Support Unit' },
                      { id: 'migration', label: 'Legacy-to-NextJS Migration' }
                    ].map(interest => (
                      <button
                        key={interest.id}
                        type="button"
                        onClick={() => handleInterestToggle(interest.label)}
                        className={`flex items-center gap-3 px-5 py-4 rounded-2xl border text-left transition-all ${
                          formData.interests.includes(interest.label)
                            ? 'bg-green-600 border-green-600 text-white shadow-xl shadow-green-100'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-green-500'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          formData.interests.includes(interest.label) ? 'border-white' : 'border-slate-300'
                        }`}>
                          {formData.interests.includes(interest.label) && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className="text-xs font-black uppercase tracking-tighter">{interest.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Collaboration Goals <RequiredAsterisk /></label>
                  <textarea 
                    required 
                    rows={4} 
                    value={formData.collaborationGoals}
                    onChange={e => setFormData({...formData, collaborationGoals: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all resize-none font-bold placeholder:text-slate-300 leading-relaxed" 
                    placeholder="how can we unblock your model? tell us about your high-priority technical needs..." 
                  />
                </div>
              </div>

              {/* Submission Area */}
              <div className="pt-10 border-t border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Contact Name <RequiredAsterisk /></label>
                    <input 
                      required 
                      type="text" 
                      value={formData.contactName}
                      onChange={e => setFormData({...formData, contactName: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-bold placeholder:text-slate-300" 
                      placeholder="John Smith" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contact Email <RequiredAsterisk /></label>
                    <input 
                      required 
                      type="email" 
                      value={formData.contactEmail}
                      onChange={e => setFormData({...formData, contactEmail: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-bold placeholder:text-slate-300" 
                      placeholder="john@org.com" 
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-8 rounded-[2rem] font-black text-2xl transition-all shadow-2xl shadow-slate-200/50 border-none transform hover:-translate-y-1 active:scale-[0.98] disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-4 group"
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      initiating synchronization...
                    </>
                  ) : (
                    <>
                      Apply for Partner Track
                      <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </>
                  )}
                </button>
                <p className="text-center mt-6 text-slate-400 font-mono text-[9px] uppercase tracking-[0.4em]">strategic alignment • recurring value • senior execution</p>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* SEO/Informational Footer */}
      <section className="py-24 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-4xl mx-auto text-center md:text-left opacity-60">
           <h3 className="text-sm font-bold text-slate-900 mb-6 tracking-widest uppercase font-mono">strategic synergy protocols</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-[11px] text-slate-500 leading-relaxed uppercase tracking-[0.15em] font-mono">
              <p className="lowercase">
                FINISH Inc operates as a high-fidelity <strong>technical extension</strong> for strategic partners. we prioritize referrals from VCs, agencies, and studios by maintaining a dedicated <strong>engineering reserve queue</strong> specifically for partner-sourced projects.
              </p>
              <p className="lowercase">
                our <strong>white-label engineering</strong> services allow partners to focus on their core competitive advantages—whether that's portfolio scaling, design, or business strategy—while we handle the <strong>deep technical debt remediation</strong> and production-grade deployments.
              </p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default PartnerIntake;

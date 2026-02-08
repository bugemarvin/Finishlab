
import React from 'react';
import { PageId } from '../types';
import { motion } from 'framer-motion';

interface PricingProps {
  onNavigate: (page: PageId) => void;
}

const PRICING_TIERS = [
  {
    id: 'consult',
    tag: 'Quick Fix',
    title: 'Surgical Debug Call',
    price: '$299',
    unit: '/ hour',
    desc: 'Instant access to a senior engineer to solve a specific blocker live on screen.',
    features: [
      '60-minute 1-on-1 Debugging',
      'Direct Screen-Share Fixes',
      'Session Recording Provided',
      'Architecture Gut-Check',
      'Immediate Post-Call PR'
    ],
    cta: 'Book Live Fix',
    secondary: 'Ideal for specific API/Auth issues',
    popular: false
  },
  {
    id: 'ship',
    tag: 'The Standard',
    title: 'Stabilize & Ship',
    price: '$995',
    unit: 'starts at',
    desc: 'The "Last Mile" package. We take your prototype and wire it for a production launch.',
    features: [
      'Full Security & Auth Audit',
      'Stripe/Payment Integration',
      'Production DB Migration',
      'CI/CD Pipeline Setup',
      'Vercel/AWS Deployment',
      '2-Day Post-Launch Support'
    ],
    cta: 'Fix My App',
    secondary: 'Average turnaround: 72 hours',
    popular: true
  },
  {
    id: 'rebuild',
    tag: 'High Velocity',
    title: 'Production Refactor',
    price: '$2,995',
    unit: 'starts at',
    desc: 'For apps built on messy foundations that need a senior rebuild to scale.',
    features: [
      'Core Logic Refactoring',
      'Type-Safety Enforcement',
      'Component Library Audit',
      'Performance Optimization',
      'Full Architectural Docs',
      '7-Day Post-Launch Support'
    ],
    cta: 'Request Rebuild',
    secondary: 'Fixed-price scalability',
    popular: false
  }
];

const Pricing: React.FC<PricingProps> = ({ onNavigate }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } }
  };

  return (
    <div className="pt-20 bg-white selection:bg-green-100 overflow-x-hidden">
      {/* Header Section */}
      <section className="py-24 px-6 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-green-600 font-mono text-[10px] font-black uppercase tracking-[0.4em] mb-6">Commercial Transparency</p>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
            Fixed price. <br/>
            <span className="text-slate-400">Zero retainers.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            We don't sell hours. We sell outcomes. Choose the surgical strike team that fits your current product stage.
          </p>
        </motion.div>
      </section>

      {/* Pricing Grid */}
      <section className="pb-32 px-6">
        <motion.div 
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {PRICING_TIERS.map((tier) => (
            <motion.div 
              key={tier.id}
              variants={cardVariants}
              className={`relative flex flex-col p-10 rounded-[3rem] border transition-all hover:shadow-2xl hover:-translate-y-2 ${
                tier.popular 
                  ? 'bg-white border-green-500 shadow-xl shadow-green-100/50 scale-105 z-10' 
                  : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                  Most Efficient
                </div>
              )}
              
              <div className="mb-10">
                <span className="text-green-600 font-mono text-[9px] font-black uppercase tracking-widest block mb-4">{tier.tag}</span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-4">{tier.title}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-slate-900 tracking-tighter">{tier.price}</span>
                  <span className="text-slate-400 font-bold text-sm">{tier.unit}</span>
                </div>
                <p className="mt-6 text-slate-500 text-sm leading-relaxed">{tier.desc}</p>
              </div>

              <div className="space-y-4 mb-12 flex-grow">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-slate-700 tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <button 
                  onClick={() => onNavigate('diagnostic')}
                  className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all transform active:scale-95 border-none shadow-xl ${
                    tier.popular 
                      ? 'bg-green-600 hover:bg-green-500 text-white shadow-green-200' 
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-200'
                  }`}
                >
                  {tier.cta}
                </button>
                <p className="text-center mt-6 font-mono text-[9px] font-black uppercase tracking-widest text-slate-400">
                  {tier.secondary}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Comparison / Included Section */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">Standard on all plans.</h2>
            <p className="text-slate-500 font-medium">No hidden fees. No extra charges for core engineering.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              { title: "100% IP Handoff", desc: "You own every line of code we ship. No licensing, no hooks." },
              { title: "Security Gut-Check", desc: "We scan for exposed keys and weak auth patterns automatically." },
              { title: "Senior Oversight", desc: "Every PR is reviewed by a Lead Architect with 10+ years exp." },
              { title: "Scalability Audit", desc: "We ensure your DB schema won't crash when you hit 10k users." },
              { title: "CI/CD Setup", desc: "Automated deployments so you can ship future fixes instantly." },
              { title: "Direct Handoff Doc", desc: "A video or PDF guide explaining exactly what we changed." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"></div>
                <div>
                  <h4 className="font-bold text-slate-900 tracking-tight mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Fixed Price Section (SEO focus) */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-green-600 font-mono text-xs font-bold uppercase tracking-[0.3em] mb-4">Pricing Strategy</p>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-8 leading-tight">
              Why we don't <br/> 
              <span className="text-slate-400">bill by the hour.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              Hourly billing creates a perverse incentive for engineers to move slow. Retainers create "bloat" where work is done just to fill time. 
            </p>
            <p className="text-slate-900 font-bold text-lg mb-10 leading-relaxed">
              FINISH Inc is built on <span className="underline decoration-green-500/30">Value Realization</span>. We price based on the speed and reliability of the outcome, giving you absolute budget certainty from day one.
            </p>
            <button 
              onClick={() => onNavigate('why-finish')}
              className="text-slate-900 font-black text-sm uppercase tracking-[0.2em] flex items-center gap-3 hover:text-green-600 transition-colors group"
            >
              The FINISH Philosophy
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {[
               { icon: "🛡️", title: "Budget Safety", desc: "The price we quote is the price you pay. Period." },
               { icon: "🚀", title: "Incentivized Speed", desc: "The faster we finish, the better for everyone." },
               { icon: "💎", title: "Clean Handoff", desc: "No messy billing logs. Just working software." },
               { icon: "🔍", title: "Audit First", desc: "We never quote without seeing the code first." }
             ].map((benefit, i) => (
               <div key={i} className="p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl">
                 <div className="text-3xl mb-4">{benefit.icon}</div>
                 <h4 className="font-bold mb-2 tracking-tight">{benefit.title}</h4>
                 <p className="text-xs text-slate-400 leading-relaxed">{benefit.desc}</p>
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
            className="p-12 md:p-24 bg-white border-4 border-slate-900 rounded-[3.5rem] shadow-[40px_40px_0px_#f1f5f9] relative"
          >
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]">
              Let's build <br/>
              <span className="text-green-600 italic">your quote.</span>
            </h2>
            <p className="text-slate-500 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
              Ready to unblock your launch? Submit your repository for a non-invasive technical diagnostic and fixed-price quote.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onNavigate('diagnostic')}
                className="w-full sm:w-auto bg-slate-900 text-white px-12 py-6 rounded-2xl font-black text-xl transition-all shadow-2xl shadow-slate-200 border-none"
              >
                Start Diagnostic
              </button>
              <button 
                onClick={() => onNavigate('how-it-works')}
                className="w-full sm:w-auto bg-slate-100 text-slate-900 px-12 py-6 rounded-2xl font-black text-xl transition-all border-none"
              >
                Learn Our Process
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO Footer Text */}
      <section className="py-24 px-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-left opacity-60">
           <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight">Software Pricing & Engineering Rates</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] text-slate-500 leading-relaxed uppercase tracking-wider font-mono">
              <p>
                FINISH Inc provides transparent, <strong>Fixed-Price Software Development</strong> for startups and founders. Our pricing is calculated based on the technical complexity of the <strong>Last Mile Engineering</strong> phase, covering <strong>API Integration</strong>, <strong>Security Audits</strong>, and <strong>Production Deployment</strong>.
              </p>
              <p>
                By avoiding hourly billing, we eliminate the conflict of interest inherent in traditional agencies. We focus on <strong>Technical Outcome Delivery</strong>, ensuring your app is production-ready with absolute <strong>Budget Predictability</strong> and senior-level technical oversight.
              </p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;

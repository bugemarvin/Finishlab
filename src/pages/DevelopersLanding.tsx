
import React from 'react';
import { PageId } from '../types';
import { motion } from 'framer-motion';

interface DevelopersLandingProps {
  onNavigate: (page: PageId) => void;
}

const TECH_NIGHTMARES = [
  {
    title: "The AI Debt Trap",
    desc: "Inherited a 10,000-line prototype built by Cursor or Lovable? We refactor the 'black box' logic into clean, typed, and maintainable modules.",
    icon: "💣"
  },
  {
    title: "Production Hydration Hell",
    desc: "Fighting Next.js hydration mismatches and state loops that only happen in production? We diagnose and kill the root cause.",
    icon: "🔥"
  },
  {
    title: "Fragile Integrations",
    desc: "Stripe webhooks failing silently? Auth persistence issues? We implement robust error boundaries and retry logic for your critical paths.",
    icon: "🔌"
  }
];

const SURGICAL_SERVICES = [
  {
    title: "Infrastructure Audit",
    items: [
      "Environment Variable Integrity",
      "CI/CD Pipeline Optimization",
      "Secret Management Review",
      "Production Log Monitoring",
      "Vercel/AWS Cost Reduction"
    ],
    color: "bg-slate-50",
    textColor: "text-slate-900"
  },
  {
    title: "Code Refactor",
    items: [
      "Auth Loop Remediation",
      "Hydration Error Fixes",
      "API Rate Limit Handling",
      "Type-Safety Enforcement",
      "Database Schema Tuning"
    ],
    color: "bg-slate-900",
    textColor: "text-white"
  }
];

const DevelopersLanding: React.FC<DevelopersLandingProps> = ({ onNavigate }) => {
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
              Senior Technical Support
            </motion.p>
            <motion.h1 variants={itemVariants} className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.85]">
              Clean code. <br/>
              <span className="text-slate-400">Senior speed.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-slate-500 mb-12 leading-relaxed max-w-3xl mx-auto">
              We act as the specialized "Finish" unit for technical teams. No fluff, just clean PRs, robust error boundaries, and infrastructure that actually deploys. We clear the technical debt so you can ship the roadmap.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
              {['Next.js', 'Prisma', 'Stripe', 'AWS', 'Vercel', 'Clerk', 'TypeScript', 'Node.js', 'PostgreSQL'].map(tech => (
                <motion.span 
                  key={tech} 
                  whileHover={{ y: -2, color: '#16a34a' }}
                  className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest cursor-default transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onNavigate('diagnostic')}
                className="w-full sm:w-auto bg-slate-900 text-white px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-slate-200 border-none"
              >
                Request Code Audit
              </button>
              <button 
                onClick={() => onNavigate('how-it-works')}
                className="w-full sm:w-auto bg-white border border-slate-200 text-slate-900 px-12 py-6 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all"
              >
                View Workflow
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Nightmares Section (SEO Content) */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">What we <span className="text-slate-400 italic">actually fix.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TECH_NIGHTMARES.map((nightmare, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-6">{nightmare.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{nightmare.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{nightmare.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The PR-First Delivery Model */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-green-600 font-mono text-xs font-bold uppercase tracking-[0.3em] mb-4">The Handoff</p>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-8 leading-tight">
              PR-First <br/> 
              <span className="text-slate-400">Autonomy.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              We don't need hand-holding. Give us access to your GitHub and Linear/Jira, and we start clearing tickets. Every fix comes with a detailed PR description, type coverage, and test signals.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <p className="text-2xl font-black text-slate-900 mb-1">90%+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">PR Approval Rate</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 mb-1">&lt; 24h</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Response Time</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('partner')}
              className="text-slate-900 font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:text-green-600 transition-colors group"
            >
              Enterprise & Team Partnerships
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>

          <div className="relative">
            <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] blur-2xl opacity-50"></div>
            <div className="relative bg-slate-900 rounded-[3rem] p-1 shadow-2xl">
              <div className="bg-slate-800 rounded-[2.8rem] overflow-hidden border border-slate-700">
                <div className="flex items-center gap-2 p-4 bg-slate-900 border-b border-slate-700">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="ml-4 font-mono text-[10px] text-slate-500 uppercase tracking-widest">pull_request_refactor.ts</div>
                </div>
                <div className="p-8 font-mono text-sm space-y-2">
                  <div className="text-green-400">+ export const handlePaymentFlow = async (ctx: Context) =&gt; &#123;</div>
                  <div className="text-green-400">+   try &#123;</div>
                  <div className="text-green-400">+     const session = await stripe.sessions.create(&#123;</div>
                  <div className="text-green-400">+       payment_intent_data: &#123; metadata: ctx.user &#125;</div>
                  <div className="text-green-400">+     &#125;);</div>
                  <div className="text-slate-500">      // Fixed: Race condition in webhook listener</div>
                  <div className="text-red-400">-     return result.status === 200;</div>
                  <div className="text-green-400">+     return &#123; success: true, url: session.url &#125;;</div>
                  <div className="text-green-400">+   &#125; catch (err) &#123; logger.error(err); &#125;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Tiers */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {SURGICAL_SERVICES.map((tier, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`p-12 ${tier.color} rounded-[3rem] border border-slate-100 shadow-xl`}
            >
              <h2 className={`text-3xl font-black ${tier.textColor} mb-8 tracking-tighter`}>{tier.title}</h2>
              <ul className="space-y-4">
                {tier.items.map((item, idx) => (
                  <li key={idx} className={`flex items-center gap-3 ${tier.textColor === 'text-white' ? 'text-slate-400' : 'text-slate-600'} font-bold text-sm`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => onNavigate('diagnostic')}
                className={`mt-12 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all border-none ${
                  tier.textColor === 'text-white' ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                Inquire for Audit
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dark Strategy Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4ade80 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 italic">"We handle the debt. <br/> You handle the vision."</h2>
          <p className="text-slate-400 text-lg mb-12 leading-relaxed">
            Technical debt isn't just a nuisance; it's a liability. 
            We provide senior-level oversight to ensure your application 
            architecture is secure, performant, and ready for scale.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => onNavigate('diagnostic')}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white px-12 py-6 rounded-2xl font-black text-xl shadow-2xl shadow-green-900/50 border-none transition-all hover:scale-105 active:scale-95"
            >
              Diagnostic Intake
            </button>
            <button 
              onClick={() => onNavigate('pricing')}
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white px-12 py-6 rounded-2xl font-black text-xl transition-all border-none"
            >
              View Tiers
            </button>
          </div>
          <p className="mt-12 text-slate-500 font-mono text-[9px] uppercase tracking-[0.4em]">Surgical Debugging • Performance Optimization • Infrastructure Tuning</p>
        </div>
      </section>

      {/* SEO Footer Text */}
      <section className="py-24 px-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-left opacity-60">
           <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight">Surgical Engineering & Code Refactoring for Developers</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] text-slate-500 leading-relaxed uppercase tracking-wider font-mono">
              <p>
                Finish Studio provides senior-level <strong>Engineering Reserve</strong> support for technical leads and solo developers. We specialize in <strong>Refactoring AI-Generated Code</strong>, resolving <strong>Next.js Hydration Errors</strong>, and optimizing <strong>Database Schema Performance</strong>.
              </p>
              <p>
                Our surgical approach ensures <strong>Production Stability</strong> and <strong>Security Compliance</strong>. We operate with high autonomy, providing clean, tested, and documented <strong>GitHub Pull Requests</strong> that unblock your engineering roadmap.
              </p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default DevelopersLanding;


import React from 'react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-24">
          
          {/* Brand & Social Column */}
          <div className="space-y-8 lg:col-span-1">
            <div 
              className="flex items-center gap-1 cursor-pointer w-fit group"
              onClick={() => onNavigate('home')}
            >
              <span className="font-extrabold text-2xl tracking-tighter text-slate-900 group-hover:text-green-600 transition-colors">
                FINISH
              </span>
            </div>
            <p className="text-slate-500 text-[15px] leading-relaxed max-w-xs">
              Your app. Actually finished. We bridge the gap between AI prototypes and production-ready software.
            </p>
            
            <div className="flex items-center gap-4">
              <a href="mailto:hello@finishlab.app" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-green-600 hover:text-white transition-all shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/finishlabapp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#0077b5] hover:text-white transition-all shadow-sm">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div className="space-y-6">
            <h4 className="font-bold text-slate-900 text-[15px]">The Service</h4>
            <ul className="space-y-4">
              <li><button onClick={() => onNavigate('home')} className="text-slate-500 hover:text-green-600 text-sm transition-colors text-left w-full">Home</button></li>
              <li><button onClick={() => onNavigate('how-it-works')} className="text-slate-500 hover:text-green-600 text-sm transition-colors text-left w-full">How It Works</button></li>
              <li><button onClick={() => onNavigate('pricing')} className="text-slate-500 hover:text-green-600 text-sm transition-colors text-left w-full">Pricing</button></li>
              <li><button onClick={() => onNavigate('why-finish')} className="text-slate-500 hover:text-green-600 text-sm transition-colors text-left w-full">Why FINISH</button></li>
              <li><button onClick={() => onNavigate('faq')} className="text-slate-500 hover:text-green-600 text-sm transition-colors text-left w-full">FAQ</button></li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="space-y-6">
            <h4 className="font-bold text-slate-900 text-[15px]">Solutions</h4>
            <ul className="space-y-4">
              <li><button onClick={() => onNavigate('for-founders')} className="text-slate-500 hover:text-green-600 text-sm transition-colors text-left w-full">For Founders</button></li>
              <li><button onClick={() => onNavigate('for-startups')} className="text-slate-500 hover:text-green-600 text-sm transition-colors text-left w-full">For Startups</button></li>
              <li><button onClick={() => onNavigate('for-developers')} className="text-slate-500 hover:text-green-600 text-sm transition-colors text-left w-full">For Developers</button></li>
              <li><button onClick={() => onNavigate('partner')} className="text-slate-500 hover:text-green-600 text-sm transition-colors text-left w-full">VC & Agency Partnership</button></li>
            </ul>
          </div>

          {/* Stage Column */}
          <div className="space-y-6">
            <h4 className="font-bold text-slate-900 text-[15px]">Life Cycle</h4>
            <ul className="space-y-4">
              <li><button onClick={() => onNavigate('idea-stage')} className="text-slate-500 hover:text-green-600 text-sm transition-colors text-left w-full">Idea Stage (FINISH Start)</button></li>
              <li><button onClick={() => onNavigate('how-it-works')} className="text-slate-500 hover:text-green-600 text-sm transition-colors text-left w-full">The Build (Execution)</button></li>
              <li><button onClick={() => onNavigate('diagnostic')} className="text-slate-500 hover:text-green-600 text-sm transition-colors text-left w-full">The Finish (Production)</button></li>
              <li><button onClick={() => onNavigate('for-startups')} className="text-slate-500 hover:text-green-600 text-sm transition-colors text-left w-full">The Scale (Reserve Team)</button></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-6">
            <h4 className="font-bold text-slate-900 text-[15px]">Connect</h4>
            <ul className="space-y-4">
              <li><button onClick={() => onNavigate('stories')} className="text-slate-500 hover:text-green-600 text-sm transition-colors text-left w-full">Founder Stories</button></li>
              <li><button onClick={() => onNavigate('diagnostic')} className="text-slate-900 font-bold hover:text-green-600 text-sm transition-colors text-left w-full">Diagnostic Intake</button></li>
              <li><a href="mailto:hello@finishlab.app" className="text-slate-500 hover:text-green-600 text-sm transition-colors">hello@finishlab.app</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-12 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-slate-400 text-xs font-medium">© {new Date().getFullYear()} FINISH Inc. Est. 2024.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('privacy-policy')} className="text-slate-400 hover:text-slate-900 text-xs transition-colors border-none bg-transparent cursor-pointer">Privacy Policy</button>
            <button onClick={() => onNavigate('terms-of-service')} className="text-slate-400 hover:text-slate-900 text-xs transition-colors border-none bg-transparent cursor-pointer">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

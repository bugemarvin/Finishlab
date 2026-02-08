
import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { motion } from 'framer-motion';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onOpenSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'why-finish', label: 'Why FINISH' },
    { id: 'faq', label: 'FAQ' },
  ] as const;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: PageId) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const handleOpenSearchFromMenu = () => {
    setIsMenuOpen(false);
    onOpenSearch();
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-300 h-20 ${
        scrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-md border-b border-slate-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Animated FINISH Logo */}
        <motion.div 
          className="relative flex items-center gap-2 cursor-pointer group z-[160] outline-none"
          onClick={() => handleNavigate('home')}
          role="button"
          tabIndex={0}
          aria-label="Navigate to Home"
          onKeyDown={(e) => e.key === 'Enter' && handleNavigate('home')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.span 
            className="font-extrabold text-2xl tracking-tighter text-slate-900 transition-all duration-300"
            animate={isHovered ? {
              scale: 1.1,
              color: "#16a34a",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "-0.05em",
            } : {
              scale: 1,
              color: "#0f172a", // slate-900
              fontFamily: ["'Inter', sans-serif", "'JetBrains Mono', monospace", "'Playfair Display', serif", "'Inter', sans-serif"],
              letterSpacing: ["-0.05em", "0.05em", "-0.02em", "-0.05em"],
            }}
            transition={isHovered ? {
              type: "spring",
              stiffness: 400,
              damping: 25
            } : {
              fontFamily: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              letterSpacing: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              default: { duration: 0.3 }
            }}
          >
            FINISH
          </motion.span>
          
          <motion.div 
            className="h-1.5 w-1.5 rounded-full bg-green-500"
            initial={{ opacity: 0, scale: 0 }}
            animate={isHovered ? { opacity: 1, scale: 1.2 } : { opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`text-[12px] xl:text-[13px] font-bold uppercase tracking-wider transition-all hover:text-green-600 relative py-2 ${
                currentPage === item.id ? 'text-green-600' : 'text-slate-500'
              }`}
            >
              {item.label}
              {currentPage === item.id && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-500 rounded-full animate-in fade-in slide-in-from-bottom-1 duration-300"></span>
              )}
            </button>
          ))}
        </nav>

        {/* Action Area */}
        <div className="flex items-center gap-3 z-[160]">
          <button 
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 sm:px-4 py-2.5 text-slate-500 hover:text-slate-900 rounded-xl bg-slate-100/50 hover:bg-slate-100 transition-all text-xs font-bold group"
            title="Search (⌘K)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden md:inline uppercase tracking-widest text-[9px]">Quick Search</span>
            <kbd className="hidden lg:inline-flex items-center gap-1 bg-white/50 px-1.5 py-0.5 rounded text-[9px] font-sans ml-1 shadow-sm text-slate-400">
              ⌘K
            </kbd>
          </button>
          
          <button 
            onClick={() => handleNavigate('diagnostic')}
            className="hidden lg:block bg-green-600 hover:bg-green-700 text-white px-6 xl:px-8 py-3 rounded-xl font-black text-[12px] uppercase tracking-widest transition-all transform active:scale-95 shadow-xl shadow-green-100 border-none"
          >
            Fix My App
          </button>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-lg active:scale-95"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`fixed inset-0 w-full h-screen bg-white z-[155] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] lg:hidden ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="pt-28 px-6 pb-12 h-full flex flex-col overflow-y-auto">
          <nav className="flex flex-col space-y-2 mb-10">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`group flex items-center justify-between py-5 text-2xl sm:text-3xl font-black tracking-tighter transition-all text-left ${
                  currentPage === item.id ? 'text-green-600' : 'text-slate-900 hover:pl-2'
                } ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}
                style={{ transitionDelay: `${index * 50}ms`, transitionDuration: '600ms' }}
              >
                <span>{item.label}</span>
                <div className={`flex items-center gap-2 transition-all ${currentPage === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover:opacity-30'}`}>
                  <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest hidden sm:inline">Active</span>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
              </button>
            ))}
            
            <button
              onClick={handleOpenSearchFromMenu}
              className={`flex items-center gap-4 py-6 text-slate-400 transition-all ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}
              style={{ transitionDelay: `${navItems.length * 50}ms`, transitionDuration: '600ms' }}
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span className="uppercase tracking-[0.2em] text-[10px] font-black">Search Directory</span>
            </button>
          </nav>

          <div className={`mt-auto space-y-8 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '350ms', transitionDuration: '800ms' }}>
            <div className="p-1 bg-slate-900 rounded-[2rem] shadow-2xl shadow-slate-200">
              <button 
                onClick={() => handleNavigate('diagnostic')}
                className="w-full bg-green-600 hover:bg-green-500 text-white p-6 rounded-[1.8rem] font-black text-xl sm:text-2xl tracking-tighter transition-all flex items-center justify-between group active:scale-[0.98] border-none"
              >
                <span>Fix My App</span>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </button>
            </div>
            
            <div className="flex justify-between items-end px-2">
              <div className="space-y-1">
                <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Inquiries</p>
                <a href="mailto:hello@finishlab.app" className="text-slate-900 font-bold text-base sm:text-lg hover:text-green-600 transition-colors">hello@finishlab.app</a>
              </div>
              <div className="text-right">
                <p className="text-slate-300 text-[9px] font-black uppercase tracking-widest">Status</p>
                <div className="flex items-center gap-1.5 justify-end">
                  <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-900 font-bold text-[10px] uppercase tracking-tighter">Ops Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

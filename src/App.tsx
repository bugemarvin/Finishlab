import React, { useState, useEffect } from 'react';
import type { PageId } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import SearchModal from './components/SearchModal';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import Portfolio from './pages/Portfolio';
import WhyFinish from './pages/WhyFinish';
import FAQ from './pages/FAQ';
import DiagnosticForm from './pages/DiagnosticForm';
import Partner from './pages/Partner';
import PartnerIntake from './pages/PartnerIntake';
import Stories from './pages/Stories';
import FoundersLanding from './pages/FoundersLanding';
import StartupsLanding from './pages/StartupsLanding';
import DevelopersLanding from './pages/DevelopersLanding';
import IdeaStage from './pages/IdeaStage';
import BlueprintWorkflow from './pages/BlueprintWorkflow';
import BlueprintIntake from './pages/BlueprintIntake';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const pageMetadata: Record<PageId, { title: string; description: string }> = {
      'home': { title: 'FINISH | Your App. Actually Finished.', description: 'Take your AI-built or prototype app to production with FINISH Inc.' },
      'how-it-works': { title: 'How It Works | FINISH Process', description: 'Our 3-step engineering pipeline to stabilize, wire, and ship your application.' },
      'portfolio': { title: 'Portfolio | Shipped by FINISH', description: 'Explore the high-fidelity projects we have bridged from prototype to production.' },
      'pricing': { title: 'Pricing & Packages | FINISH Inc', description: 'Transparent pricing for software finishing.' },
      'why-finish': { title: 'Why FINISH? | The Last Mile Engineering', description: 'Learn why AI apps fail at 80% and how our human engineers bridge the gap.' },
      'faq': { title: 'Technical FAQ | FINISH Inc Support', description: 'Frequently asked questions about IP ownership and process.' },
      'diagnostic': { title: 'Fix My App | Diagnostic Intake Form', description: 'Submit your project details for a 24-hour fixed-price project quote.' },
      'partner': { title: 'Startup Partnerships & VC Technical Due Diligence | FINISH Inc', description: 'Powering VCs with expert technical due diligence and agencies with premium white-label software services. Studio overflow support for high-growth tech ecosystems.' },
      'partner-intake': { title: 'Partner Onboarding | FINISH Inc', description: 'Apply to join our partner ecosystem as a VC, Agency, or Individual.' },
      'stories': { title: 'Founder Stories | Shipped by FINISH', description: 'Real-world case studies of apps that were stuck.' },
      'for-founders': { title: 'For Founders | FINISH Inc', description: 'Specialized support for solo founders and visionaries.' },
      'for-startups': { title: 'For Startups | FINISH Inc', description: 'Augmented engineering teams for scaling startups.' },
      'for-developers': { title: 'For Developers | FINISH Inc', description: 'Technical refactoring and infrastructure support.' },
      'idea-stage': { title: 'FINISH Start | Idea to Product', description: 'Turn your concept into a production-grade MVP and architecture.' },
      'blueprint-workflow': { title: 'Blueprint Workflow | FINISH Start', description: 'Our 7-day technical blueprint sprint for new ideas.' },
      'blueprint-intake': { title: 'Apply for Blueprint | FINISH Start', description: 'Start your technical roadmap journey with FINISH.' },
      'privacy-policy': { title: 'Privacy Policy | FINISH Inc', description: 'How we handle your project data and intellectual property.' },
      'terms-of-service': { title: 'Terms of Service | FINISH Inc', description: 'Our commercial terms and fixed-price guarantees.' }
    };

    const metadata = pageMetadata[currentPage] || pageMetadata.home;
    document.title = metadata.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', metadata.description);
  }, [currentPage]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = ['home', 'how-it-works', 'portfolio', 'pricing', 'why-finish', 'faq', 'diagnostic', 'partner', 'partner-intake', 'stories', 'for-founders', 'for-startups', 'for-developers', 'idea-stage', 'blueprint-workflow', 'blueprint-intake', 'privacy-policy', 'terms-of-service'];
      if (hash && validPages.includes(hash)) setCurrentPage(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={navigate} />;
      case 'how-it-works': return <HowItWorks onNavigate={navigate} />;
      case 'portfolio': return <Portfolio onNavigate={navigate} />;
      case 'pricing': return <Pricing onNavigate={navigate} />;
      case 'why-finish': return <WhyFinish onNavigate={navigate} />;
      case 'faq': return <FAQ onNavigate={navigate} />;
      case 'diagnostic': return <DiagnosticForm onNavigate={navigate} />;
      case 'partner': return <Partner onNavigate={navigate} />;
      case 'partner-intake': return <PartnerIntake onNavigate={navigate} />;
      case 'stories': return <Stories onNavigate={navigate} />;
      case 'for-founders': return <FoundersLanding onNavigate={navigate} />;
      case 'for-startups': return <StartupsLanding onNavigate={navigate} />;
      case 'for-developers': return <DevelopersLanding onNavigate={navigate} />;
      case 'idea-stage': return <IdeaStage onNavigate={navigate} />;
      case 'blueprint-workflow': return <BlueprintWorkflow onNavigate={navigate} />;
      case 'blueprint-intake': return <BlueprintIntake onNavigate={navigate} />;
      case 'privacy-policy': return <PrivacyPolicy onNavigate={navigate} />;
      case 'terms-of-service': return <TermsOfService onNavigate={navigate} />;
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col antialiased bg-white selection:bg-green-100 selection:text-green-900">
      <Header currentPage={currentPage} onNavigate={navigate} onOpenSearch={() => setIsSearchOpen(true)} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div key={currentPage} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.25, ease: "easeOut" }}>
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onNavigate={navigate} />
      <ChatWidget onNavigate={navigate} />
      <ScrollToTop />
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;

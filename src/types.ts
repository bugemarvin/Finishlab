
export type PageId = 
  | 'home' 
  | 'how-it-works' 
  | 'pricing' 
  | 'why-finish' 
  | 'faq' 
  | 'diagnostic' 
  | 'partner' 
  | 'stories'
  | 'for-founders'
  | 'for-startups'
  | 'for-developers'
  | 'idea-stage'
  | 'blueprint-workflow'
  | 'blueprint-intake'
  | 'partner-intake'
  | 'privacy-policy'
  | 'terms-of-service';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingPlan {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  priceSuffix?: string;
  description: string;
  features: string[];
  bestFor: string;
  ctaText: string;
  isPopular?: boolean;
}

export interface CaseStudy {
  founder: string;
  company: string;
  problem: string;
  solution: string;
  outcome: string;
  tag: string;
}

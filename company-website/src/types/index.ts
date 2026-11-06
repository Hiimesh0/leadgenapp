export interface CompanyInfo {
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  founder: {
    name: string;
    role: string;
    bio: string;
    location: string;
    avatarUrl?: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsappNumber: string; // e.g. 919974012606
    location: string;
    workingHours: string;
  };
  links: {
    githubRepo: string;
    demoSiteUrl: string;
  };
  values: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface ServiceItem {
  id: string;
  category: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  recommendedFor: string;
  icon: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  essentialFeatures: string[];
  icon: string;
  badge?: string;
}

export interface PricingFeature {
  name: string;
  included: boolean;
  highlight?: boolean;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  priceNumeric: number;
  periodLabel?: string;
  badge?: string;
  isPopular?: boolean;
  targetAudience: string;
  description: string;
  deliveryTime: string;
  pageCount: string;
  features: string[];
  revisions: string;
  support: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  type: string;
  category: 'Dental' | 'Dermatology' | 'Healthcare' | 'Other';
  description: string;
  features: string[];
  liveDemoUrl: string;
  badge: string;
  isConceptDemo: boolean;
  screenshotUrl: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Pricing' | 'Process' | 'Technical' | 'Features';
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
}

export interface QuoteFormData {
  fullName: string;
  businessName: string;
  phone: string;
  email: string;
  industry: string;
  requiredService: string;
  preferredPackage: string;
  estimatedPages: string;
  budgetRange: string;
  projectDescription: string;
}

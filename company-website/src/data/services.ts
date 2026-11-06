import { ServiceItem } from '../types';

export const SERVICES_CONFIG: ServiceItem[] = [
  {
    id: 'clinic-healthcare',
    category: 'Primary Specialization',
    title: 'Clinic & Healthcare Websites',
    shortDescription: 'Tailored websites for dental clinics, dermatologists, IVF centers, doctors, and hospitals with appointment intake and WhatsApp desks.',
    fullDescription: 'Our signature healthcare development service. We design patient-friendly digital portals engineered to build clinical credibility, showcase specialist doctor credentials, explain complex medical procedures simply, and allow friction-free appointment inquiries.',
    features: [
      'Doctor & specialist profiles with qualification badges',
      'Categorized treatment & procedure breakdown pages',
      'Clinical infrastructure & sterilization photo galleries',
      'Click-to-WhatsApp direct patient desk integration',
      'Interactive appointment consultation intake forms',
      'Embedded Google Maps with step-free clinic access details',
      'Clear compliance notices and patient preparation guides'
    ],
    recommendedFor: 'Dental clinics, dermatology centers, IVF clinics, physiotherapy studios, and private hospitals.',
    icon: 'Stethoscope'
  },
  {
    id: 'custom-web-development',
    category: 'Core Service',
    title: 'Custom Website Design & Development',
    shortDescription: 'Modern, fully responsive multi-page websites and high-converting landing pages built from scratch with clean code.',
    fullDescription: 'We build high-performance, mobile-first websites tailored specifically to your business identity. Rather than heavy, bloated themes, we utilize modern component frameworks that load in milliseconds and adapt fluidly across phones, tablets, and desktops.',
    features: [
      'Mobile-first responsive layout architecture',
      'Custom brand identity styling and color integration',
      'Fast loading speed optimized for low-bandwidth mobile connections',
      'Multi-page informational architecture (Home, About, Services, Contact)',
      'High-converting action buttons and strategic placement',
      'Cross-browser compatibility across Chrome, Safari, Edge & Firefox',
      'Clean semantic code ready for future feature expansions'
    ],
    recommendedFor: 'Local businesses, consulting professionals, boutiques, and service providers.',
    icon: 'Layout'
  },
  {
    id: 'website-redesign',
    category: 'Modernization',
    title: 'Website Redesign & Modernization',
    shortDescription: 'Transform outdated, slow, or cluttered websites into modern, aesthetic, and mobile-responsive experiences.',
    fullDescription: 'If your existing website looks like it was built ten years ago, breaks on smartphones, or fails to convey your clinical standard, our redesign process rebuilds your digital identity from the ground up while preserving your brand equity.',
    features: [
      'Contemporary UI/UX overhaul aligned with modern design aesthetics',
      'Full mobile responsiveness and touch-friendly navigation',
      'Content restructuring to make services easily discoverable',
      'Asset and image compression to slash page load times',
      'Preservation of existing business URLs where appropriate',
      'Clearer call-to-actions to turn passive visitors into inquiries'
    ],
    recommendedFor: 'Established clinics and businesses with outdated or non-responsive websites.',
    icon: 'RefreshCw'
  },
  {
    id: 'website-maintenance',
    category: 'Ongoing Support',
    title: 'Website Maintenance & Care Plans',
    shortDescription: 'Ongoing technical upkeep, routine content revisions, security monitoring, and backup peace of mind.',
    fullDescription: 'A website should never sit neglected. We provide dependable, ongoing maintenance so your business website remains secure, fast, and up to date with your latest service additions, doctor timings, and festival hours.',
    features: [
      'Routine text, timing, and fee schedule updates',
      'Adding new doctor profiles or treatment announcements',
      'Periodic link audits to prevent 404 dead ends',
      'Domain DNS and hosting connection monitoring',
      'Regular codebase backups to guard against accidental disruptions',
      'Priority WhatsApp support for quick turnaround requests'
    ],
    recommendedFor: 'Busy clinic owners and business managers who want reliable technical care without hiring full-time staff.',
    icon: 'Wrench'
  },
  {
    id: 'seo-online-presence',
    category: 'Visibility',
    title: 'SEO Foundations & Local Presence',
    shortDescription: 'On-page SEO, structured schema metadata, Google Business setup guidance, and speed optimization.',
    fullDescription: 'A beautiful website is useless if prospective local patients cannot find it. We implement foundational search engine optimization so your practice ranks accurately for local searches in your city and district.',
    features: [
      'Comprehensive on-page title and meta description crafting',
      'Local Business & MedicalPractice JSON-LD schema markup',
      'Google Search Console and XML sitemap registration guidance',
      'Google Business Profile integration and matching coordinates',
      'Mobile viewport optimization for Google mobile-first indexing',
      'Fast core web vitals performance tuning'
    ],
    recommendedFor: 'Clinics and local enterprises seeking organic local discoverability.',
    icon: 'Search'
  },
  {
    id: 'custom-web-solutions',
    category: 'Advanced Solutions',
    title: 'Custom Web Solutions & Dashboards',
    shortDescription: 'Admin portals, custom intake workflows, automated notification hooks, and dynamic client tools.',
    fullDescription: 'When off-the-shelf static templates cannot fulfill your operational workflow, we architect custom web applications and interactive portals tailored to your specific business requirements.',
    features: [
      'Custom administrative dashboards and lead review interfaces',
      'Automated messaging webhooks and intake queues',
      'Interactive calculators (e.g. dental procedure cost estimators)',
      'Multi-branch practice location selectors',
      'Custom database integrations and secure API endpoints',
      'Scalable cloud deployment architecture'
    ],
    recommendedFor: 'Multi-specialty clinics, diagnostic chains, and growing healthcare networks.',
    icon: 'Cpu'
  }
];

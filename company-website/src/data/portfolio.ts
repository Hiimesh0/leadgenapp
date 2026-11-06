import { PortfolioItem } from '../types';

export const PORTFOLIO_PROJECTS: PortfolioItem[] = [
  {
    id: 'aurelia-dental-demo',
    title: 'Aurelia Dental Demo Practice',
    type: 'Dental Clinic Website (Concept Project)',
    category: 'Dental',
    badge: 'Concept Demo — Not a Real Client Project',
    isConceptDemo: true,
    description: 'A premium concept website demonstrating how a modern dental clinic can present its services, doctor information, gallery, location and appointment enquiry options.',
    features: [
      'Editorial medical aesthetic with custom Playfair Display & Plus Jakarta Sans typography',
      '6 comprehensive dental treatments with benefit bullet points and category filters',
      'Clinician profile page featuring Dr. Him and specialized orthodontic faculty',
      'High-resolution operatory gallery with full interactive Lightbox viewer',
      'Interactive appointment booking intake with reference ID generation',
      'Direct WhatsApp chat redirect with automated appointment details prefill',
      'Zero backend required — pure static delivery loading in under 1 second'
    ],
    liveDemoUrl: 'https://hiimesh0.github.io/leadgenapp/demos/aurelia-dental/dist/index.html#/',
    screenshotUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80'
  }
];

export const PORTFOLIO_NOTE = `We believe in absolute honesty. The above project is a concept demonstration built by ClinicCraft Solutions to showcase our clinical design standards, user experience, and technical execution. We do not invent fake client logos or fabricate customer reviews. Future real client projects will be added here as they launch.`;

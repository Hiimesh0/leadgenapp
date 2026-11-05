import { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'general-dentistry',
    title: 'General Dentistry',
    shortDescription: 'Comprehensive oral examinations, digital decay detection, and gentle restorative treatments.',
    fullDescription: 'Our general dental consultations focus on preserving your natural teeth through early detection, meticulous cleaning, and restorative fillings using durable aesthetic bio-compatible composites.',
    benefits: [
      'Comprehensive oral tissue and gum screening',
      'High-definition intraoral digital scanning',
      'Tooth-colored composite aesthetic restorations',
      'Gentle scaling and ultrasonic plaque removal'
    ],
    iconName: 'ShieldCheck',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    durationEstimate: '45 mins',
    category: 'General'
  },
  {
    id: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry',
    shortDescription: 'Custom ceramic veneers, tooth contouring, and subtle smile enhancements.',
    fullDescription: 'Personalized aesthetic smile design carefully tailored to your facial harmony. We combine minimally invasive ceramic veneers and composite bonding to craft natural, luminous smiles.',
    benefits: [
      'Digital smile preview before treatment begins',
      'Ultra-thin custom porcelain veneers',
      'Gap closure and minor alignment correction',
      'Natural enamel-mimicking translucent ceramics'
    ],
    iconName: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    durationEstimate: '60 mins',
    category: 'Cosmetic'
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    shortDescription: 'In-office professional laser brightening and tailored take-home maintenance systems.',
    fullDescription: 'Safe, medically supervised teeth brightening that effectively lifts stubborn stains caused by tea, coffee, and age, while strictly protecting tooth enamel and minimizing sensitivity.',
    benefits: [
      'Up to 6-8 shades brighter in a single comfortable session',
      'Desensitizing formula protecting enamel nerves',
      'Custom-molded trays for home touch-ups',
      'Long-lasting natural luster without artificial chalkiness'
    ],
    iconName: 'Sun',
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    durationEstimate: '45 mins',
    category: 'Cosmetic'
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    shortDescription: 'Permanent titanium tooth root replacements with natural ceramic crowns.',
    fullDescription: 'Permanent restorative solutions for missing teeth. Using 3D computer-guided implantology, titanium posts integrate with the jawbone to provide rock-solid chewing stability and restore confident speech.',
    benefits: [
      'Permanent foundation preventing adjacent tooth shift',
      'Preserves facial jawbone density and structural contours',
      'Matches natural tooth bite strength and chewing efficiency',
      'Individually custom-milled zirconia crowns'
    ],
    iconName: 'Layers',
    imageUrl: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80',
    durationEstimate: '90 mins',
    category: 'Restorative'
  },
  {
    id: 'orthodontic-consultation',
    title: 'Orthodontic Consultation',
    shortDescription: 'Clear aligner evaluations and discreet teeth straightening plans for teens and adults.',
    fullDescription: 'Evaluate your bite alignment and teeth spacing in a relaxed consultation. We explore modern discreet solutions like removable clear aligners that straighten teeth without metal brackets or dietary restrictions.',
    benefits: [
      'Virtually invisible removable clear aligners',
      '3D simulation of teeth movement week by week',
      'No dietary restrictions during treatment',
      'Improved long-term chewing function and easier flossing'
    ],
    iconName: 'Smile',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    durationEstimate: '30 mins',
    category: 'General'
  },
  {
    id: 'preventive-dental-care',
    title: 'Preventive Dental Care',
    shortDescription: 'Protective fissure sealants, fluoride varnishes, and customized hygiene coaching.',
    fullDescription: 'Proactive dental wellness designed to stop decay and gum inflammation before discomfort arises. Includes customized home-care regimens, enamel remineralization treatments, and dietary consultations.',
    benefits: [
      'Deep periodontal gum pocket evaluation',
      'Protective fluoride enamel strengthening',
      'Pediatric and adult protective fissure sealants',
      'Customized oral microbiome & hygiene plan'
    ],
    iconName: 'HeartHandshake',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    durationEstimate: '40 mins',
    category: 'Preventive'
  }
];

export const SERVICES_DATA = SERVICES;


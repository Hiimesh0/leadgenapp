import { DoctorProfile } from '../types';

export const DOCTORS: DoctorProfile[] = [
  {
    id: 'dr-him',
    name: 'Dr. Him',
    title: 'Lead Aesthetic Dental Specialist',
    specialty: 'Dentistry & Aesthetic Dental Care',
    bio: 'Dedicated to combining microscopic precision with compassionate patient care. Dr. Him focuses on minimally invasive aesthetic restorations, digital smile design, and calm, anxiety-free clinical experiences.',
    focusAreas: [
      'Digital Smile Architecture & Porcelain Veneers',
      'Microscopic Restorative Dentistry',
      'Minimally Invasive Dental Implants',
      'Comfort-First Dental Procedures'
    ],
    philosophy: 'Healthcare is most effective when technical excellence meets genuine empathy and calm communication.',
    portraitUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    fictionalNotice: 'DEMO PROFILE — Fictional Doctor Identity for Concept Showcase'
  },
  {
    id: 'dr-aanya',
    name: 'Dr. Aanya Mehta',
    title: 'Orthodontic & Clear Aligner Consultant',
    specialty: 'Preventive Orthodontics & Clear Aligners',
    bio: 'Specializing in computer-guided teeth alignment and pediatric preventive dental care, Dr. Mehta creates discreet, comfortable teeth straightening journeys for teens and adults.',
    focusAreas: [
      'Clear Aligner Planning & Digital Bite Analysis',
      'Early Childhood Preventive Orthodontics',
      'Adult Disclose Alignment Therapy',
      'Gum Health & Preventive Diagnostics'
    ],
    philosophy: 'A balanced bite does not just transform how you smile; it preserves your natural teeth for decades.',
    portraitUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    fictionalNotice: 'DEMO PROFILE — Fictional Doctor Identity for Concept Showcase'
  }
];

export const DOCTORS_DATA = DOCTORS;


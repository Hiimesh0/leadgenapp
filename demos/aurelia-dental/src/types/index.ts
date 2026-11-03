export interface Service {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  category: 'cosmetic' | 'restorative' | 'preventive' | 'specialized';
  duration: string;
  startingPrice: string;
  benefits: string[];
  procedureSteps: { title: string; desc: string }[];
  idealFor: string[];
  imageUrl: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experience: string;
  qualifications: string;
  bio: string;
  philosophy: string;
  languages: string[];
  memberships: string[];
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  location: string;
  treatment: string;
  quote: string;
  rating: number;
  date: string;
  verifiedDemo: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
  category: 'general' | 'appointments' | 'treatments' | 'pricing';
}

export interface PriceItem {
  treatment: string;
  category: string;
  priceRange: string;
  note: string;
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  email: string;
  serviceId: string;
  doctorId: string;
  preferredDate: string;
  preferredTimeSlot: string;
  isFirstVisit: boolean;
  notes: string;
  agreedToTerms: boolean;
}


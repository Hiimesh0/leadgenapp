export interface ClinicInfo {
  name: string;
  tagline: string;
  doctorName: string;
  specialty: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  sundayHours: string;
  whatsappNumber: string;
  demoNotice: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  iconName: string;
  imageUrl: string;
  durationEstimate: string;
  category: 'General' | 'Cosmetic' | 'Restorative' | 'Preventive';
}

export interface DoctorProfile {
  id: string;
  name: string;
  title: string;
  specialty: string;
  bio: string;
  focusAreas: string[];
  philosophy: string;
  portraitUrl: string;
  fictionalNotice: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  email?: string;
  serviceId: string;
  preferredDoctorId?: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/**
 * Centralized Clinic & Doctor Configuration
 * All demo information is stored here. Changing values in this file updates the entire website.
 * 
 * Fictional Demonstration Practice
 */

export interface ClinicConfig {
  clinicName: string;
  tagline: string;
  subheadline: string;
  doctorName: string;
  doctorTitle: string;
  doctorQualification: string;
  doctorSpecialization: string;
  specialization: string;
  doctorExperience: string;
  doctorBio: string;
  doctorPhilosophy: string;
  phoneNumber: string;
  contactPhone: string;
  displayPhone: string;
  whatsappNumber: string;
  email: string;
  contactEmail: string;
  address: string;
  clinicAddress: string;
  city: string;
  state: string;
  country: string;
  clinicTimings: string;
  timings: {
    weekdays: string;
    sunday: string;
    emergency: string;
  };
  demoNotice: string;
  socialLinks: {
    whatsapp: string;
    email: string;
    phone: string;
  };
  metadata: {
    title: string;
    description: string;
    keywords: string;
  };
}

export const CLINIC_CONFIG: ClinicConfig = {
  clinicName: "XYZ Dental Clinic",
  tagline: "XYZ Dental Care — Modern Healthcare Demo",
  subheadline: "A fictional, modern dental practice demonstration in Surat, Gujarat.",
  
  // Doctor details
  doctorName: "Dr. XYZ",
  doctorTitle: "Chief Dental Surgeon & Specialist",
  doctorQualification: "XYZ (BDS, MDS Demo)",
  doctorSpecialization: "XYZ (General, Cosmetic & Restorative Dentistry)",
  specialization: "XYZ (General, Cosmetic & Restorative Dentistry)",
  doctorExperience: "XYZ (10+ Years Demo Experience)",
  doctorBio: "Dr. XYZ is a fictional dental professional profile created for this demonstration website. In a live client deployment, this section highlights the dentist's verified qualifications, university credentials, clinical focus areas, and patient care philosophy.",
  doctorPhilosophy: "XYZ — Compassionate, conservative, and patient-centered clinical care focused on comfort and long-term oral wellness.",
  
  // Contact details (User specified)
  phoneNumber: "9974012606",
  contactPhone: "9974012606",
  displayPhone: "+91 99740 12606",
  whatsappNumber: "919974012606",
  email: "kanthariyahimesh@gmail.com",
  contactEmail: "kanthariyahimesh@gmail.com",
  address: "XYZ, Surat, Gujarat, India",
  clinicAddress: "XYZ, Surat, Gujarat, India",
  city: "Surat",
  state: "Gujarat",
  country: "India",
  clinicTimings: "Monday – Saturday: 9:00 AM – 8:00 PM (XYZ Demo)",
  
  // Clinic timings
  timings: {
    weekdays: "Monday – Saturday: XYZ (e.g. 9:00 AM – 8:00 PM Demo)",
    sunday: "Sunday: XYZ (By Prior Appointment Demo)",
    emergency: "XYZ (Emergency Concierge Available)",
  },
  
  // Compulsory Demo Disclaimer Notice
  demoNotice: "DEMO WEBSITE — All doctor, clinic, appointment, and service information is fictional and provided for demonstration purposes only.",
  
  socialLinks: {
    whatsapp: "https://wa.me/919974012606?text=Hello%20XYZ%20Dental%20Clinic%2C%20I%20am%20inquiring%20about%20a%20demo%20dental%20appointment.",
    email: "mailto:kanthariyahimesh@gmail.com",
    phone: "tel:9974012606",
  },
  
  metadata: {
    title: "XYZ Dental Clinic — Dr. XYZ | Demo Website | Surat, Gujarat",
    description: "XYZ Dental Clinic is a fictional dental practice demonstration website in Surat, Gujarat. Showcasing modern healthcare UI, appointment management, and doctor admin dashboard.",
    keywords: "XYZ Dental Clinic, Dr. XYZ, dental clinic Surat, dentist demo Surat, dental appointment dashboard",
  },
};

export default CLINIC_CONFIG;

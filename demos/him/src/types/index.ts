export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Rescheduled';

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
  doctorId?: string;
  preferredDate: string;
  preferredTimeSlot: string;
  isFirstVisit?: boolean;
  notes?: string;
  agreedToTerms: boolean;
}

export interface Appointment {
  id: string;
  appointmentRef: string;
  patientName: string;
  phone: string;
  email: string;
  serviceId: string;
  serviceName: string;
  doctorName: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
  // WhatsApp Notification Integration
  notificationChannel?: string;
  notificationStatus?: 'Not Configured' | 'Pending' | 'Sent to WAHA' | 'Failed' | 'Delivered';
  notificationMessageId?: string | null;
  notificationLastAttempt?: string | null;
  notificationError?: string | null;
  notificationMaskedPhone?: string;
}

export interface WahaStatus {
  configured: boolean;
  status: 'CONNECTED' | 'SCAN_QR_CODE' | 'CONNECTING' | 'DISCONNECTED' | 'UNAVAILABLE' | 'NOT_CONFIGURED';
  label: string;
  connected: boolean;
  qrRequired?: boolean;
  session: string;
  baseUrl: string;
  error?: string;
}

export interface AppointmentHistory {
  id: string;
  appointmentRef: string;
  previousStatus: string;
  newStatus: string;
  changedBy: string;
  changedAt: string;
  note: string;
}

export interface PatientEnquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Reviewed' | 'Replied';
  createdAt: string;
}

export interface DoctorUser {
  id: string;
  name: string;
  email: string;
  role: string;
  token?: string;
}

export interface DashboardStats {
  total: number;
  today: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  rescheduled: number;
  enquiriesTotal: number;
  enquiriesUnread: number;
}

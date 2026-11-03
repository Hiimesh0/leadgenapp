import React, { useState } from 'react';
import { 
  Calendar, Clock, ShieldCheck, User, Phone, Mail, FileText, 
  CheckCircle2, Sparkles, MapPin, PhoneCall 
} from 'lucide-react';
import { SERVICES, DOCTORS, CLINIC_INFO } from '../data/clinicData';
import { AppointmentFormData } from '../types';

export const AppointmentPage: React.FC = () => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    email: '',
    serviceId: 'cosmetic-dentistry',
    doctorId: 'any',
    preferredDate: '',
    preferredTimeSlot: 'morning',
    isFirstVisit: true,
    notes: '',
    agreedToTerms: true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Partial<Record<keyof AppointmentFormData, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name.';
    if (!formData.phone.trim() || !/^[6-9]\d{9}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Please provide a valid 10-digit Indian mobile number.';
    }
    if (!formData.preferredDate) newErrors.preferredDate = 'Please select your preferred visit date.';
    if (!formData.agreedToTerms) newErrors.agreedToTerms = 'Please confirm agreement to clinic consultation policies.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-bg">
      
      {/* Header Banner */}
      <section className="pt-16 pb-14 bg-bg-soft border-b border-border text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent-light px-3 py-1 rounded-full">
            Direct Consultation Desk
          </span>
          <h1 className="font-serif-heading text-h1 font-normal text-primary mt-4 mb-4">
            Request an Appointment at Aurelia
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
            Choose your preferred treatment and time. Our team in Vesu, Surat will confirm your slot within 2 hours.
          </p>
        </div>
      </section>

      {/* Main Appointment Container */}
      <section className="py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
            
            {/* Left: Reassurance & Clinic Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-surface border border-border shadow-sm space-y-4">
                <h2 className="font-serif-heading text-xl font-bold text-primary">
                  The Aurelia Consultation Standard
                </h2>

                <ul className="space-y-3 text-xs sm:text-sm text-text-secondary">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>45-Minute Dedicated Slot:</strong> We never double-book appointments or keep you waiting.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>Comprehensive 3D Imaging:</strong> Full intraoral digital scan and digital diagnostic X-rays.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>100% Written Transparency:</strong> You receive an itemized proposal with clear fee estimates.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-primary text-text-inverse space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-accent">Prefer to Call Directly?</div>
                <div className="font-serif-heading text-2xl font-bold text-white">{CLINIC_INFO.phone}</div>
                <p className="text-xs text-white/80">
                  Our front desk in Vesu, Surat is happy to assist with directions, insurance questions, or scheduling.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-accent">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Mon–Sat: 9:00 AM – 8:00 PM</span>
                </div>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-7 bg-surface p-8 sm:p-10 rounded-3xl border border-border shadow-card">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="font-serif-heading text-2xl font-bold text-primary mb-1">
                    Patient Details
                  </h2>
                  <p className="text-xs text-text-secondary mb-4">
                    Please share your details. All consultation requests are handled with strict medical confidentiality.
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-text-primary mb-1" htmlFor="p-name">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="p-name"
                      type="text"
                      required
                      placeholder="e.g. Kinjal Patel"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                    />
                    {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-primary mb-1" htmlFor="p-phone">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="p-phone"
                        type="tel"
                        required
                        placeholder="e.g. 98250 12345"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                      />
                      {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-primary mb-1" htmlFor="p-email">
                        Email Address
                      </label>
                      <input
                        id="p-email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-primary mb-1" htmlFor="p-service">
                        Treatment of Interest
                      </label>
                      <select
                        id="p-service"
                        value={formData.serviceId}
                        onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-primary mb-1" htmlFor="p-doctor">
                        Preferred Specialist
                      </label>
                      <select
                        id="p-doctor"
                        value={formData.doctorId}
                        onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                      >
                        <option value="any">First Available Specialist</option>
                        {DOCTORS.map((d) => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-primary mb-1" htmlFor="p-date">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="p-date"
                        type="date"
                        min={minDateStr}
                        required
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                      />
                      {errors.preferredDate && <p className="text-xs text-red-600 mt-1">{errors.preferredDate}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-primary mb-1" htmlFor="p-time">
                        Preferred Time Slot
                      </label>
                      <select
                        id="p-time"
                        value={formData.preferredTimeSlot}
                        onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                      >
                        <option value="morning">Morning (9:00 AM – 12:00 PM)</option>
                        <option value="afternoon">Afternoon (12:00 PM – 4:00 PM)</option>
                        <option value="evening">Evening (4:00 PM – 8:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-primary mb-1" htmlFor="p-notes">
                      Chief Concern / Special Requests (Optional)
                    </label>
                    <textarea
                      id="p-notes"
                      rows={2}
                      placeholder="e.g. Mild anxiety; interested in Invisalign aligner consultation..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-2 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 text-xs text-text-secondary cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreedToTerms}
                        onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                        className="mt-0.5 rounded text-primary focus:ring-primary h-4 w-4 border-border"
                      />
                      <span>
                        I understand this submits an appointment request. Clinic reception will confirm the exact schedule via call or WhatsApp.
                      </span>
                    </label>
                    {errors.agreedToTerms && <p className="text-xs text-red-600 mt-1">{errors.agreedToTerms}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary-light text-text-inverse py-3.5 rounded-pill font-medium text-sm shadow-btn transition-colors flex items-center justify-center gap-2 mt-2"
                  >
                    {isSubmitting ? 'Registering Request...' : 'Submit Consultation Request'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-accent bg-accent-light px-3 py-1 rounded-full">
                    Demo Request Logged
                  </span>
                  <h3 className="font-serif-heading text-2xl font-bold text-primary mt-3 mb-2">
                    Consultation Request Registered
                  </h3>
                  <p className="text-sm text-text-secondary max-w-sm mx-auto mb-6">
                    Thank you, {formData.fullName}. In a production clinic deployment, your appointment is logged to the clinic EHR/calendar and an SMS/WhatsApp alert is sent to {formData.phone}.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="border border-primary text-primary px-6 py-2.5 rounded-pill text-xs font-semibold"
                  >
                    Book Another Slot
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};


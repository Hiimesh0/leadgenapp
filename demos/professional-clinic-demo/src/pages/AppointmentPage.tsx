import React, { useState } from 'react';
import { Calendar, Sparkles, CheckCircle2, AlertCircle, Send, Check, Shield } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinic';
import { SERVICES_DATA } from '../data/services';
import { DOCTORS_DATA } from '../data/doctors';
import type { AppointmentFormData, ServiceItem, DoctorProfile } from '../types';

export const AppointmentPage: React.FC = () => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    email: '',
    serviceId: SERVICES_DATA[0].id,
    preferredDoctorId: DOCTORS_DATA[0].id,
    preferredDate: '',
    preferredTimeSlot: 'Morning (09:00 AM - 12:00 PM)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingRef, setBookingRef] = useState<string>('');

  const timeSlots = [
    '09:30 AM - 10:30 AM',
    '11:00 AM - 12:00 PM',
    '02:00 PM - 03:00 PM',
    '04:00 PM - 05:00 PM',
    '05:30 PM - 06:30 PM',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(null);
  };

  const handleTimeSlotSelect = (slot: string) => {
    setFormData(prev => ({
      ...prev,
      preferredTimeSlot: slot,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setError('Please provide your full legal name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setError('Please provide a valid phone contact number.');
      return;
    }
    if (!formData.preferredDate) {
      setError('Please choose your preferred appointment date.');
      return;
    }

    const ref = `APT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setSubmitted(true);
  };

  const selectedService = SERVICES_DATA.find((s: ServiceItem) => s.id === formData.serviceId)?.title || 'General Consultation';
  const selectedDoctor = DOCTORS_DATA.find((d: DoctorProfile) => d.id === formData.preferredDoctorId)?.name || CLINIC_INFO.doctorName;

  const sendToWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${CLINIC_INFO.name},\n\nI would like to request an appointment consultation:\n• Reference: ${bookingRef}\n• Name: ${formData.fullName}\n• Phone: ${formData.phone}\n• Doctor: ${selectedDoctor}\n• Treatment: ${selectedService}\n• Date: ${formData.preferredDate}\n• Time Slot: ${formData.preferredTimeSlot}\n\n(Demo Appointment Request)`
    );
    window.open(`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="pt-8 pb-20">
      {/* Header */}
      <section className="bg-bg py-16 sm:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-primary font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-primary-light" />
            <span>Dedicated Consultation</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text">
            Book Your Dental Appointment
          </h1>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Reserve your private consultation suite at {CLINIC_INFO.name}. An unhurried, reassuring clinical experience designed around you.
          </p>
        </div>
      </section>

      {/* Main Booking Container */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left instructions & guarantees */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-bg rounded-3xl p-6 sm:p-8 border border-border space-y-4">
                <h3 className="font-serif text-xl font-bold text-text">What to Expect</h3>
                <ul className="space-y-3 text-xs text-text-muted">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>30–45 minute comprehensive examination & smile mapping.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Zero high-pressure sales; fully transparent treatment estimates.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Complimentary tea, artisan coffee, and calm lounge environment.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Dedicated parking assistance at our Surat clinic.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-semibold text-primary">
                  <Shield className="w-4 h-4" />
                  <span>Rescheduling Policy</span>
                </div>
                <p className="text-text-muted leading-relaxed">
                  We kindly request at least 24 hours notice for any appointment changes or cancellations so we can offer the time to patients on our priority waiting list.
                </p>
              </div>
            </div>

            {/* Right form container */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border shadow-lg">
                {submitted ? (
                  <div className="text-center py-8 space-y-6">
                    <div className="w-16 h-16 rounded-full bg-accent/30 text-primary flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-primary-light uppercase tracking-wider">Booking Confirmed (Demo)</span>
                      <h3 className="font-serif text-3xl font-bold text-text">Thank You, {formData.fullName}!</h3>
                      <p className="text-text-muted text-sm max-w-md mx-auto">
                        Your consultation has been reserved with reference ID:
                      </p>
                      <span className="inline-block px-4 py-2 rounded-xl bg-bg border border-border font-mono font-bold text-primary text-base mt-2">
                        {bookingRef}
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-bg border border-border text-left text-xs space-y-2.5 max-w-md mx-auto">
                      <div className="flex justify-between">
                        <span className="text-text-muted">Doctor:</span>
                        <span className="font-semibold text-text">{selectedDoctor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Treatment:</span>
                        <span className="font-semibold text-text">{selectedService}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Scheduled Date:</span>
                        <span className="font-semibold text-text">{formData.preferredDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Time Slot:</span>
                        <span className="font-semibold text-text">{formData.preferredTimeSlot}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Contact Phone:</span>
                        <span className="font-semibold text-text">{formData.phone}</span>
                      </div>
                    </div>

                    <div className="bg-accent/15 border border-accent/40 text-primary rounded-xl p-3.5 text-xs text-left max-w-md mx-auto">
                      ℹ️ <strong>Demonstration Notice:</strong> In a live clinic platform deployment, this triggers real-time WAHA WhatsApp confirmations, automatic calendar booking sync, and administrative patient queue updates.
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={sendToWhatsApp}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-all shadow-md"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Details to WhatsApp</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            fullName: '',
                            phone: '',
                            email: '',
                            serviceId: SERVICES_DATA[0].id,
                            preferredDoctorId: DOCTORS_DATA[0].id,
                            preferredDate: '',
                            preferredTimeSlot: '09:30 AM - 10:30 AM',
                            notes: '',
                          });
                        }}
                        className="w-full sm:w-auto px-6 py-3 rounded-full border border-border text-text-muted hover:text-text hover:bg-bg text-xs font-semibold transition-all"
                      >
                        Book Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border-b border-border pb-4">
                      <h3 className="font-serif text-2xl font-bold text-text">Consultation Intake Form</h3>
                      <p className="text-text-muted text-xs mt-1">
                        Please provide your details below. We guarantee confidential handling of all health inquiries.
                      </p>
                    </div>

                    {error && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-text mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-text mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 99740 12606"
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-text mb-1">
                          Select Clinician
                        </label>
                        <select
                          name="preferredDoctorId"
                          value={formData.preferredDoctorId}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                        >
                          {DOCTORS_DATA.map((doc: DoctorProfile) => (
                            <option key={doc.id} value={doc.id}>
                              {doc.name} — {doc.specialty}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text mb-1">
                          Interested Treatment
                        </label>
                        <select
                          name="serviceId"
                          value={formData.serviceId}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                        >
                          {SERVICES_DATA.map((s: ServiceItem) => (
                            <option key={s.id} value={s.id}>
                              {s.title} ({s.category})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text mb-1">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text mb-2">
                        Select Preferred Time Slot
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {timeSlots.map(slot => (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => handleTimeSlotSelect(slot)}
                            className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                              formData.preferredTimeSlot === slot
                                ? 'bg-primary text-white border-primary shadow-sm'
                                : 'bg-bg/60 border-border text-text hover:border-text-muted'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text mb-1">
                        Additional Notes or Medical Concerns <span className="text-text-muted font-normal">(Optional)</span>
                      </label>
                      <textarea
                        rows={3}
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Mention any symptoms, tooth sensitivity, or specific cosmetic aspirations..."
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-primary hover:bg-primary-light text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                    >
                      <Calendar className="w-4 h-4 text-accent" />
                      <span>Confirm Consultation Request</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

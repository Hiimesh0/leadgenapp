import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, Send, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../../data/clinic';
import { SERVICES_DATA } from '../../data/services';
import type { AppointmentFormData, ServiceItem } from '../../types';

export const AppointmentCtaSection: React.FC = () => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    email: '',
    serviceId: SERVICES_DATA[0].id,
    preferredDate: '',
    preferredTimeSlot: 'Morning (09:00 - 12:00)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingRef, setBookingRef] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setError('Please provide a valid phone number (minimum 8 digits).');
      return;
    }
    if (!formData.preferredDate) {
      setError('Please select your preferred consultation date.');
      return;
    }

    const ref = `APT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      serviceId: SERVICES_DATA[0].id,
      preferredDate: '',
      preferredTimeSlot: 'Morning (09:00 - 12:00)',
      notes: '',
    });
    setError(null);
  };

  const selectedService = SERVICES_DATA.find((s: ServiceItem) => s.id === formData.serviceId)?.title || 'General Consultation';

  const sendToWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${CLINIC_INFO.name},\n\nI would like to request an appointment consultation:\n• Name: ${formData.fullName}\n• Phone: ${formData.phone}\n• Service: ${selectedService}\n• Date: ${formData.preferredDate}\n• Time: ${formData.preferredTimeSlot}\n\n(Demo reference: ${bookingRef})`
    );
    window.open(`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-accent text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Easy Online Reservation</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Begin Your Smile Journey Today
            </h2>
            <p className="text-white/80 text-base leading-relaxed">
              Schedule your personalized examination or aesthetic consultation. Experience quiet luxury, attentive care, and transparent treatment plans designed specifically for you.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/15">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-accent">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Flexible Scheduling</h4>
                  <p className="text-white/70 text-xs">Morning, afternoon, and evening consultations Monday to Saturday.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-accent">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Minimal Waiting Guarantee</h4>
                  <p className="text-white/70 text-xs">Dedicated one-on-one appointments with zero overbooking.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/75 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span>Need immediate assistance? Call <a href={`tel:${CLINIC_INFO.phone}`} className="font-semibold text-accent hover:underline">{CLINIC_INFO.phone}</a></span>
            </div>
          </div>

          {/* Right form container */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 text-text shadow-2xl border border-white/20">
              {submitted ? (
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-primary-light/10 text-primary-light rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-primary-light">Booking Request Submitted</span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text">Thank You, {formData.fullName}!</h3>
                    <p className="text-text-muted text-sm max-w-md mx-auto">
                      Your consultation request has been logged under reference <strong className="text-primary font-mono">{bookingRef}</strong>.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-bg border border-border text-left text-xs space-y-2 max-w-md mx-auto">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Selected Treatment:</span>
                      <span className="font-semibold text-text">{selectedService}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Preferred Date:</span>
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

                  <div className="bg-accent/15 border border-accent/40 text-primary rounded-xl p-3 text-xs">
                    ℹ️ <strong>Demonstration Note:</strong> This is a client showcase demo. In a live clinic deployment, this trigger automatically delivers an instant WhatsApp & Email confirmation to both the patient and clinic reception desk.
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={sendToWhatsApp}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all shadow-md"
                    >
                      <Send className="w-4 h-4" />
                      <span>Test WhatsApp Direct Send</span>
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full sm:w-auto px-6 py-3 rounded-full border border-border hover:bg-bg text-text-muted hover:text-text text-sm font-medium transition-all"
                    >
                      Book Another Consultation
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-border pb-4">
                    <h3 className="font-serif text-2xl font-bold text-text">Request Consultation</h3>
                    <p className="text-text-muted text-xs mt-1">
                      Fill out the form below. Our care coordinator will reach out to confirm your scheduled slot.
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
                      <label className="block text-xs font-semibold text-text mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Patel"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text mb-1.5">
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
                      <label className="block text-xs font-semibold text-text mb-1.5">
                        Email Address <span className="text-text-muted font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text mb-1.5">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text mb-1.5">
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
                      <label className="block text-xs font-semibold text-text mb-1.5">
                        Time Preference
                      </label>
                      <select
                        name="preferredTimeSlot"
                        value={formData.preferredTimeSlot}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                      >
                        <option value="Morning (09:00 - 12:00)">Morning (09:00 AM – 12:00 PM)</option>
                        <option value="Afternoon (12:00 - 04:00)">Afternoon (12:00 PM – 04:00 PM)</option>
                        <option value="Evening (04:00 - 07:00)">Evening (04:00 PM – 07:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text mb-1.5">
                      Notes or Special Requests <span className="text-text-muted font-normal">(Optional)</span>
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Tell us about any specific dental concerns, anxiety, or previous treatments..."
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-primary hover:bg-primary-light text-white font-semibold text-sm transition-all shadow-lg hover:shadow-xl active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <span>Request Consultation</span>
                    <Sparkles className="w-4 h-4 text-accent" />
                  </button>

                  <p className="text-center text-[11px] text-text-muted">
                    No upfront payment required. Your information is confidential and used solely for scheduling.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

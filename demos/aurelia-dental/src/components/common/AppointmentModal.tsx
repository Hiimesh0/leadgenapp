import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, Phone, Mail, FileText, ShieldAlert } from 'lucide-react';
import { SERVICES, DOCTORS } from '../../data/clinicData';
import { AppointmentFormData } from '../../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId = 'cosmetic-dentistry',
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    email: '',
    serviceId: preselectedServiceId,
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

  if (!isOpen) return null;

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
    // Simulate safe local submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
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
    onClose();
  };

  // Get tomorrow's date as min
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-surface rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-border animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full text-text-muted hover:text-text-primary hover:bg-bg-soft transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent-light px-2.5 py-1 rounded-full">
                Priority Patient Desk
              </span>
              <h2 id="modal-title" className="font-serif-heading text-2xl sm:text-3xl font-bold text-primary mt-2">
                Request a Consultation
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                Please share your preferred schedule. Our patient coordinator in Vesu, Surat will confirm your slot within 2 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5" htmlFor="fullName">
                  Patient Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="fullName"
                    type="text"
                    required
                    placeholder="e.g. Priyavadan Mehta"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                  />
                </div>
                {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1.5" htmlFor="phone">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="e.g. 98250 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1.5" htmlFor="email">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Service & Doctor Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1.5" htmlFor="serviceId">
                    Treatment of Interest
                  </label>
                  <select
                    id="serviceId"
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1.5" htmlFor="doctorId">
                    Preferred Doctor
                  </label>
                  <select
                    id="doctorId"
                    value={formData.doctorId}
                    onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                  >
                    <option value="any">First Available Specialist</option>
                    {DOCTORS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.title.split('&')[0]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1.5" htmlFor="preferredDate">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="preferredDate"
                      type="date"
                      min={minDateStr}
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                    />
                  </div>
                  {errors.preferredDate && <p className="text-xs text-red-600 mt-1">{errors.preferredDate}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1.5" htmlFor="preferredTimeSlot">
                    Time Window
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      id="preferredTimeSlot"
                      value={formData.preferredTimeSlot}
                      onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                    >
                      <option value="morning">Morning (9:00 AM – 12:00 PM)</option>
                      <option value="afternoon">Afternoon (12:00 PM – 4:00 PM)</option>
                      <option value="evening">Evening (4:00 PM – 8:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5" htmlFor="notes">
                  Chief Concern / Specific Requests (Optional)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
                  <textarea
                    id="notes"
                    rows={2}
                    placeholder="e.g. Mild sensitivity in lower right molar; interested in cosmetic smile makeover."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                  />
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-1">
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

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-light text-text-inverse py-3 rounded-pill font-medium text-sm shadow-btn transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Registering Consultation Request...</span>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 text-accent" />
                      <span>Confirm Consultation Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Demo Success Confirmation Screen */
          <div className="text-center py-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>

            <span className="text-xs font-semibold tracking-wider uppercase text-accent bg-accent-light px-3 py-1 rounded-full">
              Demo Request Logged
            </span>

            <h3 className="font-serif-heading text-2xl font-bold text-primary mt-3 mb-2">
              Appointment Request Received
            </h3>

            <p className="text-sm text-text-secondary max-w-md mx-auto mb-6">
              Thank you, <strong>{formData.fullName}</strong>. Your request for <strong>{SERVICES.find(s => s.id === formData.serviceId)?.name}</strong> on <strong>{formData.preferredDate}</strong> ({formData.preferredTimeSlot}) has been registered in the demonstration workflow.
            </p>

            {/* Live Production Explanation Card */}
            <div className="p-4 rounded-xl bg-bg-muted border border-primary-subtle/30 text-left text-xs text-text-secondary space-y-2 mb-6">
              <div className="flex items-center gap-2 text-primary font-semibold text-xs">
                <ShieldAlert className="w-4 h-4 text-accent" />
                <span>What Happens in a Live Clinic Deployment:</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-text-secondary">
                <li>Instantly alerts the clinic reception WhatsApp and Google Calendar.</li>
                <li>Sends an automated SMS and WhatsApp confirmation to the patient ({formData.phone}).</li>
                <li>Zero external API fees — integrates smoothly with WhatsApp Business & Google Sheets.</li>
              </ul>
            </div>

            <button
              onClick={handleReset}
              className="bg-primary hover:bg-primary-light text-text-inverse px-6 py-2.5 rounded-pill text-sm font-medium transition-colors"
            >
              Return to Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
};


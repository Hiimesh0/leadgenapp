import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, Phone, Mail, FileText, ShieldAlert } from 'lucide-react';
import { SERVICES, DOCTORS } from '../../data/clinicData';
import { CLINIC_CONFIG } from '../../config/clinicConfig';
import { AppointmentFormData } from '../../types';
import { clinicApi } from '../../services/api';

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
    preferredTimeSlot: '11:00 AM',
    isFirstVisit: true,
    notes: '',
    agreedToTerms: true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedRef, setGeneratedRef] = useState<string>('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const selectedService = SERVICES.find((s) => s.id === formData.serviceId);
      const res = await clinicApi.createPublicAppointment({
        patient_name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        service_id: formData.serviceId,
        service_name: selectedService ? selectedService.name : 'Dental Consultation',
        doctor_name: CLINIC_CONFIG.doctorName,
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTimeSlot,
        notes: formData.notes
      });
      setGeneratedRef(res.appointment.appointmentRef);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to submit appointment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setGeneratedRef('');
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      serviceId: 'cosmetic-dentistry',
      doctorId: 'any',
      preferredDate: '',
      preferredTimeSlot: '11:00 AM',
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
        className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                Priority Patient Desk
              </span>
              <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                Request a Consultation
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {CLINIC_CONFIG.clinicName} — All appointment submissions are saved directly to the clinic doctor portal.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="fullName">
                  Patient Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="fullName"
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                  />
                </div>
                {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="phone">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="e.g. 98250 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="email">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Service & Doctor Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="serviceId">
                    Treatment of Interest
                  </label>
                  <select
                    id="serviceId"
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="doctorId">
                    Consulting Doctor
                  </label>
                  <select
                    id="doctorId"
                    value={formData.doctorId}
                    onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                  >
                    <option value="any">{CLINIC_CONFIG.doctorName} ({CLINIC_CONFIG.specialization})</option>
                  </select>
                </div>
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="preferredDate">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="preferredDate"
                      type="date"
                      min={minDateStr}
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                    />
                  </div>
                  {errors.preferredDate && <p className="text-xs text-red-600 mt-1">{errors.preferredDate}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="preferredTimeSlot">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      id="preferredTimeSlot"
                      value={formData.preferredTimeSlot}
                      onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                    >
                      <option value="09:30 AM">Morning (09:30 AM)</option>
                      <option value="11:00 AM">Morning (11:00 AM)</option>
                      <option value="02:30 PM">Afternoon (02:30 PM)</option>
                      <option value="04:30 PM">Evening (04:30 PM)</option>
                      <option value="06:00 PM">Evening (06:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="notes">
                  Chief Concern / Specific Requests (Optional)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <textarea
                    id="notes"
                    rows={2}
                    placeholder="e.g. Mild sensitivity in lower right molar; interested in cosmetic smile makeover."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                  />
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                    className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 h-4 w-4 border-slate-300"
                  />
                  <span>
                    I confirm this consultation request. The request will appear immediately inside {CLINIC_CONFIG.doctorName}'s administrative portal.
                  </span>
                </label>
                {errors.agreedToTerms && <p className="text-xs text-red-600 mt-1">{errors.agreedToTerms}</p>}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-xl font-semibold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Recording Appointment Request...</span>
                    </div>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
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
            <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-4 border border-teal-200">
              <CheckCircle2 className="w-10 h-10 text-teal-600" />
            </div>

            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Request Successfully Recorded
            </span>

            <h3 className="text-2xl font-bold text-slate-900 mt-3 mb-1">
              Appointment Request Received
            </h3>

            <div className="my-3 inline-block bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-800">
              Booking Ref: {generatedRef}
            </div>

            <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
              Thank you, <strong>{formData.fullName}</strong>. Your request for{' '}
              <strong>{SERVICES.find((s) => s.id === formData.serviceId)?.name}</strong> on{' '}
              <strong>{formData.preferredDate}</strong> ({formData.preferredTimeSlot}) has been saved with status{' '}
              <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Pending
              </span>
              . You can review it in the Doctor Admin Dashboard.
            </p>

            <button
              onClick={handleReset}
              className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition"
            >
              Close & Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

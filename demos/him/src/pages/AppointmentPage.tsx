import React, { useState } from 'react';
import { 
  Calendar, Clock, User, Phone, Mail, FileText, 
  CheckCircle2, MapPin, ShieldAlert, ArrowRight
} from 'lucide-react';
import { SERVICES } from '../data/clinicData';
import { CLINIC_CONFIG } from '../config/clinicConfig';
import { AppointmentFormData } from '../types';
import { clinicApi } from '../services/api';

export const AppointmentPage: React.FC = () => {
  const [formData, setFormData] = useState<AppointmentFormData>({
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

  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedRef, setGeneratedRef] = useState<string>('');

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
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Compulsory Demo Notice Banner */}
      <div className="bg-amber-500/10 border-b border-amber-200 px-4 py-2 text-xs text-amber-900 text-center font-medium">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            <strong>DEMO NOTICE:</strong> {CLINIC_CONFIG.demoNotice}
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <section className="pt-16 pb-14 bg-white border-b border-slate-200 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            Direct Consultation Desk
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-3 tracking-tight">
            Request an Appointment at {CLINIC_CONFIG.clinicName}
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Select your preferred dental treatment and time slot. Your booking logs immediately into the clinic doctor dashboard.
          </p>
        </div>
      </section>

      {/* Main Appointment Container */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
            
            {/* Left: Reassurance & Clinic Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900">
                  The {CLINIC_CONFIG.clinicName} Standard
                </h2>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Dedicated Patient Slot:</strong> We never double-book appointments or keep patients waiting.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Direct Doctor Review:</strong> Reviewed and confirmed by {CLINIC_CONFIG.doctorName}.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>100% Written Transparency:</strong> Clear treatment fee proposals and digital 3D scans.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-teal-900 text-white space-y-3 shadow-md">
                <div className="text-xs font-semibold uppercase tracking-wider text-teal-200">Clinic Direct Contact</div>
                <div className="text-2xl font-bold font-mono text-white">{CLINIC_CONFIG.contactPhone}</div>
                <p className="text-xs text-teal-100">
                  {CLINIC_CONFIG.clinicAddress}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-teal-200">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Timings: {CLINIC_CONFIG.clinicTimings}</span>
                </div>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">
                    Patient Consultation Form
                  </h2>
                  <p className="text-xs text-slate-500 mb-4">
                    All consultation requests are saved into the JSON database and appear in the doctor portal.
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="p-name">
                      Patient Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="p-name"
                      type="text"
                      required
                      placeholder="e.g. Kinjal Patel"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                    />
                    {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="p-phone">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="p-phone"
                        type="tel"
                        required
                        placeholder="e.g. 98250 12345"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                      />
                      {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="p-email">
                        Email Address (Optional)
                      </label>
                      <input
                        id="p-email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="p-service">
                        Treatment of Interest
                      </label>
                      <select
                        id="p-service"
                        value={formData.serviceId}
                        onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="p-doctor">
                        Consulting Doctor
                      </label>
                      <select
                        id="p-doctor"
                        value={formData.doctorId}
                        onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                      >
                        <option value="any">{CLINIC_CONFIG.doctorName} ({CLINIC_CONFIG.specialization})</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="p-date">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="p-date"
                        type="date"
                        min={minDateStr}
                        required
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                      />
                      {errors.preferredDate && <p className="text-xs text-red-600 mt-1">{errors.preferredDate}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="p-time">
                        Preferred Time Slot
                      </label>
                      <select
                        id="p-time"
                        value={formData.preferredTimeSlot}
                        onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                      >
                        <option value="09:30 AM">Morning (09:30 AM)</option>
                        <option value="11:00 AM">Morning (11:00 AM)</option>
                        <option value="02:30 PM">Afternoon (02:30 PM)</option>
                        <option value="04:30 PM">Evening (04:30 PM)</option>
                        <option value="06:00 PM">Evening (06:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="p-notes">
                      Chief Concern / Special Requests (Optional)
                    </label>
                    <textarea
                      id="p-notes"
                      rows={2}
                      placeholder="e.g. Mild sensitivity; interested in clear aligner consultation..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-2 text-sm rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreedToTerms}
                        onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                        className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 h-4 w-4 border-slate-300"
                      />
                      <span>
                        I understand this submits an appointment request. It will appear live in {CLINIC_CONFIG.doctorName}'s administrative portal.
                      </span>
                    </label>
                    {errors.agreedToTerms && <p className="text-xs text-red-600 mt-1">{errors.agreedToTerms}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3.5 rounded-xl font-semibold text-sm shadow-md transition flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Recording Consultation Request...</span>
                      </div>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" />
                        <span>Submit Consultation Request</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    Appointment Request Logged
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-3 mb-2">
                    Consultation Request Registered
                  </h3>

                  <div className="my-3 inline-block bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-800">
                    Booking Ref: {generatedRef}
                  </div>

                  <p className="text-sm text-slate-600 max-w-sm mx-auto mb-6">
                    Thank you, <strong>{formData.fullName}</strong>. Your appointment has been recorded with status{' '}
                    <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Pending
                    </span>
                    . {CLINIC_CONFIG.doctorName} can now view and confirm your slot in the doctor portal.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="border border-teal-700 text-teal-700 hover:bg-teal-50 px-6 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer"
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

import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, 
  Navigation, Car, Plane, ShieldAlert
} from 'lucide-react';
import { CLINIC_CONFIG } from '../config/clinicConfig';
import { clinicApi } from '../services/api';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Consultation Enquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;
    setSubmitting(true);
    try {
      await clinicApi.createPublicEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Demo Notice Banner */}
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
            Connect With Us
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-3 tracking-tight">
            Contact {CLINIC_CONFIG.clinicName}
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Reach out via phone, email, or our online inquiry desk. Messages appear directly in {CLINIC_CONFIG.doctorName}'s dashboard.
          </p>
        </div>
      </section>

      {/* Main Grid: Form & Location Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Contact Info & Transit Guide */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Clinic Contact Details
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-slate-900">Clinic Premises</div>
                      <div className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                        {CLINIC_CONFIG.clinicAddress}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <Phone className="w-5 h-5 text-teal-600 shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-slate-900">Direct Phone Line</div>
                      <div className="text-slate-600 text-xs mt-0.5">
                        <a href={`tel:${CLINIC_CONFIG.contactPhone}`} className="hover:text-teal-700 font-semibold">
                          {CLINIC_CONFIG.contactPhone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <Mail className="w-5 h-5 text-teal-600 shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-slate-900">Email Address</div>
                      <div className="text-slate-600 text-xs mt-0.5">
                        <a href={`mailto:${CLINIC_CONFIG.contactEmail}`} className="hover:text-teal-700 font-semibold">
                          {CLINIC_CONFIG.contactEmail}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-slate-900">Consultation Timings</div>
                      <div className="text-slate-600 text-xs mt-0.5">
                        <div>{CLINIC_CONFIG.clinicTimings}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transit & Parking Guide */}
              <div className="p-6 rounded-2xl bg-teal-900 text-white space-y-3 shadow-md">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-teal-300" />
                  <span>Visiting the Clinic</span>
                </h3>
                <ul className="space-y-2 text-xs text-teal-100">
                  <li className="flex items-start gap-2">
                    <Plane className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                    <span><strong>From Airport / Station:</strong> Accessible via central ring roads in Surat, Gujarat.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Car className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                    <span><strong>Parking:</strong> Dedicated patient parking available on clinic premises.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Contact Enquiry Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                Send an Inquiry to {CLINIC_CONFIG.doctorName}
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Have a question regarding treatments, procedures, or timings? Send an inquiry and it will log directly into the doctor portal.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="c-name">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        required
                        placeholder="e.g. Hardik Shah"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="c-phone">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="c-phone"
                        type="tel"
                        required
                        placeholder="e.g. 98250 12345"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="c-email">
                        Email Address (Optional)
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="c-subject">
                        Subject of Inquiry
                      </label>
                      <select
                        id="c-subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                      >
                        <option value="General Consultation Enquiry">General Consultation Enquiry</option>
                        <option value="Cosmetic Smile Makeover">Cosmetic Smile Makeover & Veneers</option>
                        <option value="Dental Implants">Dental Implants</option>
                        <option value="Root Canal Treatment">Gentle Root Canal</option>
                        <option value="Clear Aligners">Clear Aligners / Orthodontics</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="c-message">
                      Your Message or Inquiry <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="c-message"
                      rows={4}
                      required
                      placeholder="Please share any specific details about your dental needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 text-sm rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-xl font-semibold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending message...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message to Clinic Desk</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Enquiry Logged in Doctor Portal
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto mb-6">
                    Thank you, <strong>{formData.name}</strong>. Your message has been saved in the JSON database and is now visible in {CLINIC_CONFIG.doctorName}'s admin portal under Patient Enquiries.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        subject: 'General Consultation Enquiry',
                        message: ''
                      });
                    }}
                    className="border border-teal-700 text-teal-700 hover:bg-teal-50 px-5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
                  >
                    Send Another Inquiry
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

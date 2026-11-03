import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, 
  Navigation, Car, Plane
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Enquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-bg">
      
      {/* Header Banner */}
      <section className="pt-16 pb-14 bg-bg-soft border-b border-border text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent-light px-3 py-1 rounded-full">
            Connect With Us
          </span>
          <h1 className="font-serif-heading text-h1 font-normal text-primary mt-4 mb-4">
            Visit Aurelia Dental Studio in Vesu, Surat
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
            We are conveniently located in Surat's premier residential district. Reach out via call, WhatsApp, or through our direct desk form below.
          </p>
        </div>
      </section>

      {/* Main Grid: Form & Location Details */}
      <section className="py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Contact Info & Transit Guide */}
            <div className="lg:col-span-5 space-y-8">
              
              <div>
                <h2 className="font-serif-heading text-2xl font-bold text-primary mb-6">
                  Studio Contact Details
                </h2>

                <div className="space-y-5 text-sm">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-border shadow-sm">
                    <MapPin className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-primary">Studio Location</div>
                      <div className="text-text-secondary text-xs mt-0.5 leading-relaxed">
                        {CLINIC_INFO.address}, {CLINIC_INFO.city}, {CLINIC_INFO.state} - {CLINIC_INFO.pincode}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-border shadow-sm">
                    <Phone className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-primary">Phone Lines</div>
                      <div className="text-text-secondary text-xs mt-0.5">
                        <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-primary font-semibold">
                          {CLINIC_INFO.phone}
                        </a>
                        <span className="block text-text-muted mt-0.5">Desk: {CLINIC_INFO.displayPhone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-border shadow-sm">
                    <Clock className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-primary">Studio Hours</div>
                      <div className="text-text-secondary text-xs mt-0.5">
                        <div>{CLINIC_INFO.timings.weekdays}</div>
                        <div>{CLINIC_INFO.timings.sunday}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-border shadow-sm">
                    <MessageCircle className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-primary">Instant WhatsApp Concierge</div>
                      <div className="text-text-secondary text-xs mt-0.5">
                        <a
                          href={`https://wa.me/${CLINIC_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary font-semibold hover:text-accent inline-flex items-center gap-1"
                        >
                          <span>Chat directly (+91 98250 12345)</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transit & Parking Guide */}
              <div className="p-6 rounded-2xl bg-bg-soft border border-border space-y-3">
                <h3 className="font-serif-heading text-lg font-bold text-primary flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-accent" />
                  <span>Getting Here in Surat</span>
                </h3>
                <ul className="space-y-2 text-xs text-text-secondary">
                  <li className="flex items-start gap-2">
                    <Plane className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>From Surat International Airport:</strong> Approx. 10–12 minutes via Dumas Road / VIP Road.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Car className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>Parking:</strong> Dedicated complimentary valet parking available in the building basement.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Right: Contact Enquiry Form */}
            <div className="lg:col-span-7 bg-surface p-8 sm:p-10 rounded-3xl border border-border shadow-card">
              <h2 className="font-serif-heading text-2xl font-bold text-primary mb-2">
                Send a Message to Our Front Desk
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary mb-6">
                Have a question regarding treatments, treatment timelines, or billing? Send us an inquiry and our patient coordinator will respond within 2 hours.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-primary mb-1.5" htmlFor="c-name">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        required
                        placeholder="e.g. Hardik Shah"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-primary mb-1.5" htmlFor="c-phone">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="c-phone"
                        type="tel"
                        required
                        placeholder="e.g. 98250 12345"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-primary mb-1.5" htmlFor="c-email">
                        Email Address
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-primary mb-1.5" htmlFor="c-subject">
                        Subject of Inquiry
                      </label>
                      <select
                        id="c-subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                      >
                        <option value="General Enquiry">General Consultation Enquiry</option>
                        <option value="Cosmetic / Veneers">Cosmetic Smile Makeover & Veneers</option>
                        <option value="Dental Implants">Dental Implants & Surgery</option>
                        <option value="Clear Aligners">Clear Aligners / Orthodontics</option>
                        <option value="Fee / Insurance">Pricing & Payment Inquiries</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-primary mb-1.5" htmlFor="c-message">
                      Your Message or Inquiry
                    </label>
                    <textarea
                      id="c-message"
                      rows={4}
                      required
                      placeholder="Please share any specific details about your dental needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-light text-text-inverse py-3 rounded-pill font-medium text-sm shadow-btn transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-accent" />
                    <span>Send Message to Clinic Desk</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif-heading text-xl font-bold text-primary mb-2">
                    Enquiry Logged (Demo)
                  </h3>
                  <p className="text-xs text-text-secondary max-w-sm mx-auto mb-6">
                    Thank you, {formData.name}. In a production clinic deployment, this immediately routes to the front desk CRM and sends a confirmation to {formData.phone}.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="border border-primary text-primary px-5 py-2 rounded-pill text-xs font-semibold"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* Interactive Google Map Embed */}
          <div className="mt-16 rounded-2xl overflow-hidden border border-border shadow-card aspect-[21/9]">
            <iframe
              title="Aurelia Dental Studio Detailed Map"
              src={CLINIC_INFO.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </section>

    </div>
  );
};


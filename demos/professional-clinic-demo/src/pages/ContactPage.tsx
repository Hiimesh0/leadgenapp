import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinic';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setError('Please provide either a contact phone number or email address.');
      return;
    }
    if (!message.trim()) {
      setError('Please enter a short message or inquiry.');
      return;
    }

    setSubmitted(true);
    setError(null);
  };

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent(
      `Hello ${CLINIC_INFO.name},\n\nI have a general question about your treatments and services in Surat.\n• Name: ${name || 'Patient'}\n• Message: ${message || 'Consultation inquiry'}`
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
            <span>Connect With Us</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text">
            We're Here to Help
          </h1>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about cosmetic veneers, aligner treatments, or booking an appointment? Reach our team by phone, email, or WhatsApp.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Form */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Clinic Coordinates */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-primary-light">Practice Location</span>
                <h2 className="font-serif text-3xl font-bold text-text mt-1">Visit Our Surat Clinic</h2>
                <p className="text-text-muted text-sm mt-2 leading-relaxed">
                  Conveniently situated in Athwa Lines, Surat with dedicated valet parking and step-free patient accessibility.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-border">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-text text-base">Address</h4>
                    <p className="text-text-muted text-sm mt-0.5">{CLINIC_INFO.address}</p>
                    <p className="text-text-muted text-xs mt-1">Surat, Gujarat, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-border">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-text text-base">Telephone</h4>
                    <a href={`tel:${CLINIC_INFO.phone}`} className="text-primary hover:text-primary-light font-medium text-sm mt-0.5 block">
                      {CLINIC_INFO.phone}
                    </a>
                    <p className="text-text-muted text-xs mt-0.5">Direct line for scheduling & emergency enquiries</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-border">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-text text-base">Email</h4>
                    <a href={`mailto:${CLINIC_INFO.email}`} className="text-primary hover:text-primary-light font-medium text-sm mt-0.5 block">
                      {CLINIC_INFO.email}
                    </a>
                    <p className="text-text-muted text-xs mt-0.5">Inquiries answered within 24 business hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-border">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-text text-base">Operating Hours</h4>
                    <p className="text-text-muted text-sm mt-0.5">{CLINIC_INFO.openingHours}</p>
                    <p className="text-text-muted text-xs mt-0.5">{CLINIC_INFO.sundayHours}</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-emerald-950 text-sm">Instant WhatsApp Desk</h5>
                    <p className="text-emerald-800 text-xs">Chat directly with our care coordinator</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleWhatsAppChat}
                  className="w-full py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Start WhatsApp Conversation</span>
                </button>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border shadow-md space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-text">Send Us an Enquiry</h3>
                  <p className="text-text-muted text-xs sm:text-sm mt-1">
                    Please provide your contact details and message. A clinic representative will be in touch shortly.
                  </p>
                </div>

                {submitted ? (
                  <div className="text-center py-10 space-y-5">
                    <div className="w-16 h-16 rounded-full bg-accent/30 text-primary flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="font-serif text-2xl font-bold text-text">Message Received!</h4>
                    <p className="text-text-muted text-sm max-w-md mx-auto">
                      Thank you, <strong className="text-text">{name}</strong>. Your enquiry has been received by our clinic reception.
                    </p>
                    <div className="bg-accent/15 border border-accent/40 text-primary rounded-xl p-3 text-xs max-w-md mx-auto">
                      ℹ️ <strong>Demonstration Note:</strong> In production, contact submissions trigger immediate CRM capture, SMS auto-responders, and coordinator alerts.
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setPhone('');
                        setMessage('');
                      }}
                      className="px-6 py-2.5 rounded-full border border-border text-text-muted hover:text-text text-xs font-semibold hover:bg-bg transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-text mb-1">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-text mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="+91 99740 12606"
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-text mb-1">
                          Email Address <span className="text-text-muted font-normal">(Optional)</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="priya@example.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text mb-1">
                        Your Message or Dental Concerns <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Please tell us how we can assist you..."
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-primary hover:bg-primary-light text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <span>Submit Message</span>
                      <Send className="w-3.5 h-3.5 text-accent" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styled Interactive Location Map Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-bg rounded-3xl p-8 border border-border overflow-hidden space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-text">Clinic Location Map</h3>
              <p className="text-text-muted text-xs">{CLINIC_INFO.address}, Surat, Gujarat</p>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(`${CLINIC_INFO.name}, ${CLINIC_INFO.address}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-white border border-border text-primary hover:bg-primary hover:text-white text-xs font-semibold transition-all inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
            </a>
          </div>

          <div className="aspect-[21/9] rounded-2xl bg-white border border-border flex items-center justify-center text-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#123C3A_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="relative z-10 space-y-2 max-w-md">
              <div className="w-12 h-12 rounded-full bg-primary text-accent flex items-center justify-center mx-auto shadow-md">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-text text-base">{CLINIC_INFO.name}</h4>
              <p className="text-xs text-text-muted">
                Ring Road, Athwa Lines, Surat, Gujarat 395007
              </p>
              <span className="inline-block text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                ● Open Today: 09:00 AM – 07:00 PM
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

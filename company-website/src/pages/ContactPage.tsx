import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, AlertCircle, Sparkles, Clock } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/company';
import { SERVICES_CONFIG } from '../data/services';
import { ContactFormData } from '../types';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    serviceInterest: SERVICES_CONFIG[0].title,
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setError('Please provide a valid contact phone number.');
      return;
    }
    if (!formData.message.trim()) {
      setError('Please enter a brief description of your requirements.');
      return;
    }

    setSubmitted(true);
    setError(null);
  };

  const sendDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${COMPANY_CONFIG.name},\n\nI have a general inquiry:\n• Name: ${formData.fullName || 'Prospective Client'}\n• Phone: ${formData.phone || 'Not provided'}\n• Service: ${formData.serviceInterest}\n• Message: ${formData.message || 'I would like to discuss a website project.'}`
    );
    window.open(`https://wa.me/${COMPANY_CONFIG.contact.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="pt-8 pb-20">
      
      {/* Header */}
      <section className="bg-bg py-16 sm:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-subtle text-primary font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>Direct Discussion</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-heading tracking-tight">
            Let's Talk About Your Website
          </h1>
          <p className="text-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about doctor profile setups, appointment workflows, or package scopes? Reach out directly via WhatsApp, phone, or the contact form below.
          </p>
        </div>
      </section>

      {/* Main Form & Details Grid */}
      <section className="py-16 sm:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
            
            {/* Left Coordinates Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-secondary">
                  Location & Contact
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-heading mt-1">
                  Connect Directly with Himesh
                </h2>
                <p className="text-body text-sm mt-2 leading-relaxed">
                  Based in Gujarat, India. Working with doctors, healthcare professionals, and business owners across India.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent-subtle text-primary flex items-center justify-center shrink-0 border border-border shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-heading text-sm sm:text-base">Direct Phone & WhatsApp</h4>
                    <a href={`tel:${COMPANY_CONFIG.contact.phone}`} className="text-primary hover:text-secondary font-semibold text-sm mt-0.5 block">
                      {COMPANY_CONFIG.contact.phone}
                    </a>
                    <p className="text-body text-xs mt-0.5">Available for discovery calls and instant messaging</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent-subtle text-primary flex items-center justify-center shrink-0 border border-border shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-heading text-sm sm:text-base">Email Address</h4>
                    <a href={`mailto:${COMPANY_CONFIG.contact.email}`} className="text-primary hover:text-secondary font-semibold text-sm mt-0.5 block">
                      {COMPANY_CONFIG.contact.email}
                    </a>
                    <p className="text-body text-xs mt-0.5">Written proposals and project briefs answered within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent-subtle text-primary flex items-center justify-center shrink-0 border border-border shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-heading text-sm sm:text-base">Location</h4>
                    <p className="text-body text-sm mt-0.5">{COMPANY_CONFIG.contact.location}</p>
                    <p className="text-body text-xs mt-0.5">Independent Web Development Studio</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent-subtle text-primary flex items-center justify-center shrink-0 border border-border shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-heading text-sm sm:text-base">Working Hours</h4>
                    <p className="text-body text-sm mt-0.5">{COMPANY_CONFIG.contact.workingHours}</p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Direct Card */}
              <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-emerald-950 text-sm">Instant WhatsApp Discussion</h5>
                    <p className="text-emerald-800 text-xs">Fastest channel for questions and portfolio links</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={sendDirectWhatsApp}
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Start WhatsApp Conversation</span>
                </button>
              </div>

            </div>

            {/* Right Contact Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border shadow-premium space-y-6">
                <div>
                  <h3 className="text-2xl font-extrabold text-heading">Send an Enquiry</h3>
                  <p className="text-body text-xs sm:text-sm mt-1">
                    Fill out the form below. We will review your requirements and respond within 24 business hours.
                  </p>
                </div>

                {submitted ? (
                  <div className="text-center py-10 space-y-5">
                    <div className="w-16 h-16 rounded-full bg-accent-subtle text-primary flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-secondary uppercase tracking-wider">Enquiry Logged (Demo)</span>
                      <h4 className="text-2xl font-bold text-heading">Thank You, {formData.fullName}!</h4>
                      <p className="text-body text-sm max-w-md mx-auto">
                        Your inquiry regarding <strong>{formData.serviceInterest}</strong> has been received.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-bg border border-border text-left text-xs space-y-2 max-w-md mx-auto">
                      <div className="flex justify-between">
                        <span className="text-body">Contact Phone:</span>
                        <span className="font-semibold text-heading">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-body">Service Focus:</span>
                        <span className="font-semibold text-heading">{formData.serviceInterest}</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-accent-subtle text-primary border border-accent/40 text-xs text-left max-w-md mx-auto leading-relaxed">
                      ℹ️ <strong>Demonstration Note:</strong> In our production setup, submissions trigger automated CRM entries and WhatsApp coordinator alerts. You can test immediate transmission right now using the button below.
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={sendDirectWhatsApp}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send to WhatsApp Now</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            fullName: '',
                            email: '',
                            phone: '',
                            serviceInterest: SERVICES_CONFIG[0].title,
                            message: ''
                          });
                        }}
                        className="w-full sm:w-auto px-6 py-3 rounded-full border border-border text-body hover:text-heading hover:bg-bg text-xs font-semibold transition-all"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-heading mb-1.5">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Dr. Rajesh Shah"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-heading mb-1.5">
                          Phone / WhatsApp Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 99740 12606"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-heading mb-1.5">
                          Email Address <span className="text-body font-normal">(Optional)</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="doctor@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-heading mb-1.5">
                        Interested Service
                      </label>
                      <select
                        name="serviceInterest"
                        value={formData.serviceInterest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm transition-all"
                      >
                        {SERVICES_CONFIG.map(s => (
                          <option key={s.id} value={s.title}>
                            {s.title} ({s.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-heading mb-1.5">
                        Project Description or Questions <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your clinic specialty, desired website features, or existing website URL..."
                        className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm transition-all"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                    >
                      <span>Submit Inquiry</span>
                      <Send className="w-3.5 h-3.5 text-accent" />
                    </button>

                    <p className="text-[11px] text-body text-center">
                      We never spam or sell your information. Used strictly to respond to your project request.
                    </p>
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

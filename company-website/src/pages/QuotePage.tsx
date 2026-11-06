import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle2, AlertCircle, FileText, Check } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/company';
import { SERVICES_CONFIG } from '../data/services';
import { INDUSTRIES_CONFIG } from '../data/industries';
import { PRICING_PACKAGES } from '../data/pricing';
import { QuoteFormData } from '../types';

export const QuotePage: React.FC = () => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    businessName: '',
    phone: '',
    email: '',
    industry: INDUSTRIES_CONFIG[0].name,
    requiredService: SERVICES_CONFIG[0].title,
    preferredPackage: 'Professional (₹19,999) — Most Popular',
    estimatedPages: 'Up to 7 Pages (Recommended)',
    budgetRange: '₹15,000 – ₹25,000',
    projectDescription: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quoteRef, setQuoteRef] = useState<string>('');

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
      setError('Please provide your full name.');
      return;
    }
    if (!formData.businessName.trim()) {
      setError('Please provide your clinic or business name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setError('Please provide a valid phone / WhatsApp contact number.');
      return;
    }

    const ref = `QUO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setQuoteRef(ref);
    setSubmitted(true);
    setError(null);
  };

  const sendToWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${COMPANY_CONFIG.name},\n\nI have submitted a Project Quote Request:\n• Reference: ${quoteRef}\n• Name: ${formData.fullName}\n• Clinic/Business: ${formData.businessName}\n• Phone: ${formData.phone}\n• Industry: ${formData.industry}\n• Service: ${formData.requiredService}\n• Package: ${formData.preferredPackage}\n• Est. Pages: ${formData.estimatedPages}\n• Budget: ${formData.budgetRange}\n• Notes: ${formData.projectDescription || 'Ready for consultation'}`
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
            <span>Project Estimation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-heading tracking-tight">
            Get a Fixed-Scope Project Quote
          </h1>
          <p className="text-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Tell us about your practice, intended features, and preferred delivery timeframe. We will prepare an itemized proposal within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Quote Container */}
      <section className="py-16 sm:py-24 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: What to Expect */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-bg rounded-3xl p-6 sm:p-8 border border-border space-y-4">
                <div className="w-10 h-10 rounded-xl bg-accent-subtle text-primary flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-lg text-heading">Proposal Inclusions</h3>
                <ul className="space-y-3 text-xs text-body">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>Exact itemized scope and feature breakdown.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>Guaranteed fixed completion milestone dates.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>Domain, hosting, and WhatsApp guidance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>Zero commitment consultation call before deposit.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-primary text-white space-y-2 text-xs">
                <span className="text-accent font-bold uppercase tracking-wider block">Direct Guarantee</span>
                <p className="text-white/80 leading-relaxed">
                  No salesperson commissions, no junior developers. You work directly with founder Himesh throughout the entire build.
                </p>
              </div>
            </div>

            {/* Right Form Container */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border shadow-premium">
                
                {submitted ? (
                  <div className="text-center py-8 space-y-6">
                    <div className="w-16 h-16 rounded-full bg-accent-subtle text-primary flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-secondary uppercase tracking-wider">Quote Logged (Demo)</span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-heading">
                        Thank You, {formData.fullName}!
                      </h3>
                      <p className="text-body text-sm max-w-md mx-auto">
                        Your project parameters have been configured under reference:
                      </p>
                      <span className="inline-block px-4 py-2 rounded-xl bg-bg border border-border font-mono font-bold text-primary text-base mt-2">
                        {quoteRef}
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-bg border border-border text-left text-xs space-y-2.5 max-w-md mx-auto">
                      <div className="flex justify-between">
                        <span className="text-body">Practice / Business:</span>
                        <span className="font-semibold text-heading">{formData.businessName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-body">Industry:</span>
                        <span className="font-semibold text-heading">{formData.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-body">Preferred Package:</span>
                        <span className="font-semibold text-heading">{formData.preferredPackage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-body">Estimated Budget:</span>
                        <span className="font-semibold text-heading">{formData.budgetRange}</span>
                      </div>
                    </div>

                    <div className="bg-accent-subtle text-primary border border-accent/40 rounded-xl p-3.5 text-xs text-left max-w-md mx-auto leading-relaxed">
                      ℹ️ <strong>Demonstration Note:</strong> In production, this form generates a PDF estimate and triggers a WhatsApp notification. You can test instant transmission right now with Himesh below.
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={sendToWhatsApp}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Quote Request via WhatsApp</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="w-full sm:w-auto px-6 py-3 rounded-full border border-border text-body hover:text-heading hover:bg-bg text-xs font-semibold transition-all"
                      >
                        Edit Parameters
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border-b border-border pb-4">
                      <h3 className="text-2xl font-extrabold text-heading">Project Intake Form</h3>
                      <p className="text-body text-xs sm:text-sm mt-1">
                        Please provide your contact and project details. All communications are confidential.
                      </p>
                    </div>

                    {error && (
                      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-heading mb-1.5">
                          Your Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Dr. Amit Desai"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-heading mb-1.5">
                          Clinic or Business Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          placeholder="e.g. Desai Skin & Laser Clinic"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-heading mb-1.5">
                          Phone / WhatsApp <span className="text-red-500">*</span>
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
                          placeholder="doctor@desaiclinic.com"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-heading mb-1.5">
                          Your Industry / Domain
                        </label>
                        <select
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm transition-all"
                        >
                          {INDUSTRIES_CONFIG.map(ind => (
                            <option key={ind.id} value={ind.name}>
                              {ind.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-heading mb-1.5">
                          Required Service
                        </label>
                        <select
                          name="requiredService"
                          value={formData.requiredService}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm transition-all"
                        >
                          {SERVICES_CONFIG.map(s => (
                            <option key={s.id} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-heading mb-1.5">
                          Preferred Package
                        </label>
                        <select
                          name="preferredPackage"
                          value={formData.preferredPackage}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm transition-all"
                        >
                          <option value="Starter (₹9,999)">Starter (₹9,999)</option>
                          <option value="Professional (₹19,999) — Most Popular">Professional (₹19,999)</option>
                          <option value="Premium (₹29,999+)">Premium (₹29,999+)</option>
                          <option value="Enterprise (Custom Quote)">Enterprise (Custom)</option>
                          <option value="Need Guidance">Need Guidance</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-heading mb-1.5">
                          Number of Pages
                        </label>
                        <select
                          name="estimatedPages"
                          value={formData.estimatedPages}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm transition-all"
                        >
                          <option value="Single Landing Page">Single Landing Page</option>
                          <option value="Up to 3 Pages">Up to 3 Pages (Starter)</option>
                          <option value="Up to 7 Pages (Recommended)">Up to 7 Pages (Recommended)</option>
                          <option value="8 to 15 Pages">8 to 15 Pages (Premium)</option>
                          <option value="15+ Pages (Multi-Branch)">15+ Pages (Hospital)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-heading mb-1.5">
                          Target Budget Range
                        </label>
                        <select
                          name="budgetRange"
                          value={formData.budgetRange}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm transition-all"
                        >
                          <option value="₹9,999 – ₹15,000">₹9,999 – ₹15,000</option>
                          <option value="₹15,000 – ₹25,000">₹15,000 – ₹25,000</option>
                          <option value="₹25,000 – ₹40,000">₹25,000 – ₹40,000</option>
                          <option value="₹40,000 – ₹75,000">₹40,000 – ₹75,000</option>
                          <option value="₹75,000+ (Hospital / Enterprise)">₹75,000+ (Enterprise)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-heading mb-1.5">
                        Project Description or Specific Features <span className="text-body font-normal">(Optional)</span>
                      </label>
                      <textarea
                        rows={3}
                        name="projectDescription"
                        value={formData.projectDescription}
                        onChange={handleChange}
                        placeholder="Mention any specific features like multi-doctor booking, before/after smile sliders, existing website link, or target launch date..."
                        className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm transition-all"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-premium hover:shadow-elevated transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                    >
                      <span>Request Itemized Project Quote</span>
                      <Sparkles className="w-4 h-4 text-accent" />
                    </button>

                    <p className="text-[11px] text-body text-center">
                      No upfront payment required to receive a proposal. We review requirements and send exact pricing within 24 hours.
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

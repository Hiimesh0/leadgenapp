import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Calendar, ArrowRight, ShieldCheck, HeartPulse, Clock, 
  MapPin, CheckCircle2, Phone, Star, Award, Layers, Sun, Activity, Smile, ShieldAlert
} from 'lucide-react';
import { CLINIC_INFO, SERVICES, DOCTORS, TESTIMONIALS } from '../data/clinicData';
import { CLINIC_CONFIG } from '../config/clinicConfig';
import { SmileComparisonSlider } from '../components/common/SmileComparisonSlider';

interface HomePageProps {
  onOpenAppointmentModal: (serviceId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAppointmentModal }) => {
  // Map icon strings to Lucide components
  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Sun': return <Sun className="w-6 h-6" />;
      case 'Activity': return <Activity className="w-6 h-6" />;
      case 'Smile': return <Smile className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Discreet Compulsory Demo Notice */}
      <div className="bg-amber-500/10 border-b border-amber-200/80 px-4 py-2 text-xs text-amber-900 text-center font-medium">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            <strong>DEMO NOTICE:</strong> {CLINIC_CONFIG.demoNotice}
          </span>
        </div>
      </div>
      
      {/* ═══════════════════════════════════════════════════════
          1. HERO SECTION (Split-screen, Editorial Luxury)
      ═══════════════════════════════════════════════════════ */}
      <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-bg to-bg-soft">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & High-intent Conversion CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-light/80 text-primary border border-accent/30 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Premier Dental Boutique • Vesu, Surat</span>
              </div>

              <h1 className="font-serif-heading text-display font-normal text-primary text-balance">
                Gentle, State-of-the-Art <span className="italic font-serif-heading text-primary-light">Dental Care</span> Designed Around You.
              </h1>

              <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl">
                Experience pain-free dentistry in a calming, hospitality-inspired environment. From bespoke porcelain veneers to computer-guided dental implants, we blend clinical mastery with genuine compassion.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenAppointmentModal()}
                  className="bg-primary hover:bg-primary-light text-text-inverse px-7 py-3.5 rounded-pill font-medium text-sm sm:text-base shadow-btn hover:shadow-green transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-95"
                >
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>Request Consultation</span>
                </button>

                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-pill border border-primary text-primary hover:bg-primary hover:text-text-inverse font-medium text-sm sm:text-base transition-all duration-200"
                >
                  <span>Explore All Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Verified Trust Markers */}
              <div className="pt-6 border-t border-border grid grid-cols-3 gap-4 max-w-lg text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-serif-heading text-primary">12+</div>
                  <div className="text-xs text-text-secondary">Years Specialist Experience</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-serif-heading text-primary">100%</div>
                  <div className="text-xs text-text-secondary">Metal-Free Ceramics</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-serif-heading text-primary">Class-B</div>
                  <div className="text-xs text-text-secondary">Vacuum Autoclave Sterilization</div>
                </div>
              </div>
            </div>

            {/* Right Column: High-Res Editorial Photography & Micro Trust Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Visual: Confident, Radiant Natural Smile in Warm Lighting */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-surface aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80"
                    alt="Confident patient smile after modern dental care at XYZ Dental Clinic"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                  
                  {/* Floating Doctor Endorsement Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-surface/95 backdrop-blur-md p-4 rounded-xl border border-border shadow-lg flex items-center gap-3">
                    <img
                      src={DOCTORS[0].imageUrl}
                      alt={DOCTORS[0].name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-accent shrink-0"
                    />
                    <div>
                      <div className="text-xs font-bold text-primary">{DOCTORS[0].name}</div>
                      <div className="text-[11px] text-text-secondary">MDS Prosthodontics & Aesthetic Director</div>
                      <div className="flex items-center gap-1 text-[11px] text-accent font-semibold mt-0.5">
                        <Star className="w-3 h-3 fill-accent text-accent" />
                        <span>Dedicated Personalized Care in Surat</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Subtle Background Accent Glow */}
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. TRUST & CLINICAL PILLARS (Painless, Sterile, Precision)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-12 bg-surface border-y border-border">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-bg-soft/60">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <HeartPulse className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-primary">Gentle Digital Numbing</h2>
                <p className="text-xs text-text-secondary mt-1">Computer-assisted local anesthesia delivers zero sting or sharp pinches.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-bg-soft/60">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-primary">European Class-B Sterilization</h2>
                <p className="text-xs text-text-secondary mt-1">Hospital-grade autoclave cycles; pouch unsealed in front of you.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-bg-soft/60">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-primary">3D Optical Digital Impressions</h2>
                <p className="text-xs text-text-secondary mt-1">No messy putty or gagging. 5-minute digital scans with instant previews.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-bg-soft/60">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-primary">100% Written Price Transparency</h2>
                <p className="text-xs text-text-secondary mt-1">Itemized proposals shared in advance with zero surprise bills.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. FEATURED SERVICES GRID
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-bg">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent-light px-3 py-1 rounded-full">
              Comprehensive Dental Disciplines
            </span>
            <h2 className="font-serif-heading text-h2 font-normal text-primary mt-3 mb-4">
              Care Delivered with Clinical Precision & Calm
            </h2>
            <p className="text-text-secondary text-sm sm:text-base">
              Every procedure at XYZ Dental Clinic is performed using magnifying loupes or operating microscopes to protect healthy tooth structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-surface rounded-2xl p-6 border border-border hover:border-primary-subtle shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-bg-soft text-primary group-hover:bg-primary group-hover:text-accent flex items-center justify-center transition-colors mb-5">
                    {getServiceIcon(service.iconName)}
                  </div>

                  <h3 className="font-serif-heading text-xl font-bold text-primary mb-2">
                    {service.name}
                  </h3>

                  <p className="text-text-secondary text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/80 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-text-muted block text-[10px]">Starting from</span>
                    <span className="font-semibold text-primary">{service.startingPrice}</span>
                  </div>

                  <Link
                    to={`/services/${service.id}`}
                    className="text-primary hover:text-accent font-semibold text-xs inline-flex items-center gap-1 group/link"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-primary text-text-inverse px-7 py-3 rounded-pill text-sm font-medium hover:bg-primary-light transition-colors shadow-btn"
            >
              <span>Explore All Procedures & Treatments</span>
              <ArrowRight className="w-4 h-4 text-accent" />
            </Link>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. INTERACTIVE BEFORE/AFTER SMILE SLIDER
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-bg-soft border-y border-border">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <SmileComparisonSlider />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. MEET THE DENTISTS (FOUNDER SHOWCASE)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-surface">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent-light px-3 py-1 rounded-full">
              Leadership & Clinical Care
            </span>
            <h2 className="font-serif-heading text-h2 font-normal text-primary mt-3 mb-4">
              Dedicated Specialists Who Truly Listen
            </h2>
            <p className="text-text-secondary text-sm sm:text-base">
              You are never treated as a number or rushed through an assembly line. Every consultation begins with a conversation over warm herbal tea.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {DOCTORS.map((doc) => (
              <div 
                key={doc.id}
                className="bg-bg rounded-2xl p-6 sm:p-8 border border-border shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/4.5] rounded-xl overflow-hidden mb-6 border border-border">
                    <img
                      src={doc.imageUrl}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-semibold text-primary">
                      {doc.experience}
                    </div>
                  </div>

                  <h3 className="font-serif-heading text-2xl font-bold text-primary">{doc.name}</h3>
                  <div className="text-accent text-xs font-semibold uppercase tracking-wider mt-1">{doc.title}</div>
                  <div className="text-text-secondary text-xs font-medium mt-1">{doc.qualifications}</div>

                  <p className="text-text-secondary text-sm leading-relaxed mt-4">
                    {doc.bio}
                  </p>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-xs text-text-primary font-semibold mb-1">Languages:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {doc.languages.map((l) => (
                        <span key={l} className="text-[11px] bg-surface px-2.5 py-0.5 rounded-full border border-border text-text-secondary">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4">
                  <button
                    onClick={() => onOpenAppointmentModal()}
                    className="w-full py-2.5 rounded-pill border border-primary text-primary hover:bg-primary hover:text-text-inverse font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    <span>Consult with {doc.name.split(' ')[1]}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/team" className="text-primary hover:text-accent font-semibold text-sm inline-flex items-center gap-1.5">
              <span>Read Full Biographies & Academic Research</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. THE PATIENT EXPERIENCE (5-Step Calming Journey)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-bg-soft border-y border-border">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent-light px-3 py-1 rounded-full">
              Your Journey With Us
            </span>
            <h2 className="font-serif-heading text-h2 font-normal text-primary mt-3 mb-4">
              What to Expect on Your First Visit
            </h2>
            <p className="text-text-secondary text-sm sm:text-base">
              We eliminate dental anxiety by making every single step completely transparent before you ever sit in the chair.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 relative">
            
            {[
              { num: '01', title: 'Warm Welcome', desc: 'No crowded waiting rooms. Arrive at our quiet lounge with herbal refreshments.' },
              { num: '02', title: 'Digital 3D Scan', desc: 'Low-radiation panoramic X-rays & optical scanning without messy silicone trays.' },
              { num: '03', title: 'Honest Consultation', desc: 'Review your 3D digital model on a wide screen with Dr. Ananya. Zero pressure.' },
              { num: '04', title: 'Gentle Care', desc: 'Profound computer-guided numbing, soothing music, and continuous check-ins.' },
              { num: '05', title: 'Continuing Care', desc: 'Post-treatment follow-up and personalized home hygiene guidance.' }
            ].map((step, idx) => (
              <div key={idx} className="bg-surface rounded-2xl p-5 border border-border shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-accent font-serif-heading text-2xl font-bold mb-2">{step.num}</div>
                  <h3 className="font-serif-heading text-base font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. PATIENT TESTIMONIALS & TRUST SIGNALS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-bg">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent-light px-3 py-1 rounded-full">
              Patient Testimonials
            </span>
            <h2 className="font-serif-heading text-h2 font-normal text-primary mt-3 mb-4">
              Real Patient Stories from Surat
            </h2>
            <p className="text-text-secondary text-sm">
              Discover how our calm aesthetic and restorative treatments have renewed confidence across Gujarat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <div
                key={t.id}
                className="bg-surface rounded-2xl p-6 sm:p-8 border border-border shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-accent mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>

                  <p className="text-sm text-text-primary italic leading-relaxed mb-6 font-serif-heading">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-primary">{t.patientName}</div>
                    <div className="text-text-muted text-[11px]">{t.location} • {t.treatment}</div>
                  </div>
                  <span className="text-[10px] bg-accent-light text-primary px-2 py-0.5 rounded font-semibold uppercase">
                    Sample Review
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/testimonials" className="text-primary hover:text-accent font-semibold text-sm inline-flex items-center gap-1">
              <span>Read All Verified Patient Case Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          8. LOCATION, HOURS & CONTACT BLOCK
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent-light px-3 py-1 rounded-full">
                Visit Our Studio
              </span>
              
              <h2 className="font-serif-heading text-h2 font-normal text-primary">
                A Peaceful Haven on VIP Road, Vesu
              </h2>

              <p className="text-text-secondary text-sm leading-relaxed">
                Centrally located in Surat’s premier residential and business corridor, with ample dedicated valet parking and complete wheelchair accessibility.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-primary">Studio Address</div>
                    <div className="text-xs text-text-secondary mt-0.5">{CLINIC_INFO.address}, {CLINIC_INFO.city}, {CLINIC_INFO.state} - {CLINIC_INFO.pincode}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-primary">Operating Hours</div>
                    <div className="text-xs text-text-secondary mt-0.5">{CLINIC_INFO.timings.weekdays}</div>
                    <div className="text-xs text-text-secondary">{CLINIC_INFO.timings.sunday}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-primary">Direct Concierge Line</div>
                    <div className="text-xs text-text-secondary mt-0.5">{CLINIC_INFO.phone} (WhatsApp Enabled)</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="inline-flex items-center gap-2 bg-primary text-text-inverse px-5 py-2.5 rounded-pill text-xs font-medium hover:bg-primary-light transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  <span>Call {CLINIC_INFO.phone}</span>
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border border-primary text-primary px-5 py-2.5 rounded-pill text-xs font-medium hover:bg-primary hover:text-text-inverse transition-colors"
                >
                  <span>Driving Directions & Parking</span>
                </Link>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-border shadow-card aspect-[16/10]">
              <iframe
                title="XYZ Dental Clinic Location Map"
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

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          9. CONVERSION APPOINTMENT CTA BANNER
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-primary text-text-inverse">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-white/10 px-3 py-1 rounded-full">
            Begin Your Smile Journey
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-normal text-white mt-4 mb-4">
            Ready for a Calmer, More Confident Dental Experience?
          </h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8">
            Whether you need a routine checkup or a complete cosmetic transformation, we welcome you to experience dentistry reimagined in Surat.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenAppointmentModal()}
              className="w-full sm:w-auto bg-accent hover:bg-accent-light text-primary font-bold px-8 py-3.5 rounded-pill text-sm shadow-lg transition-all duration-200 active:scale-95"
            >
              Request Your Consultation Today
            </button>
            <a
              href={`https://wa.me/${CLINIC_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-white/30 hover:border-white text-white px-7 py-3.5 rounded-pill text-sm font-medium transition-all"
            >
              Quick WhatsApp Chat
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};


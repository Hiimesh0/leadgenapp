import { Service, Doctor, Testimonial, FAQ, PriceItem } from '../types';
import { CLINIC_CONFIG } from '../config/clinicConfig';

export const CLINIC_INFO = {
  name: CLINIC_CONFIG.clinicName,
  tagline: CLINIC_CONFIG.tagline,
  subheadline: CLINIC_CONFIG.subheadline,
  phone: CLINIC_CONFIG.phoneNumber,
  displayPhone: CLINIC_CONFIG.displayPhone,
  whatsapp: CLINIC_CONFIG.whatsappNumber,
  email: CLINIC_CONFIG.email,
  address: CLINIC_CONFIG.address,
  city: CLINIC_CONFIG.city,
  state: CLINIC_CONFIG.state,
  pincode: "395007",
  timings: CLINIC_CONFIG.timings,
  demoNotice: CLINIC_CONFIG.demoNotice,
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.2324546452293!2d72.76865487597191!3d21.14314488383818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d80a15c898b%3A0xb304b5f492b4507!2sVesu%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
};

export const SERVICES: Service[] = [
  {
    id: "cosmetic-dentistry",
    name: "Cosmetic Smile Design & Veneers (XYZ)",
    shortDesc: "Custom handcrafted aesthetic dental veneers and digital smile designing in a calm, modern environment.",
    fullDesc: "Our Smile Design philosophy marries facial harmony with state-of-the-art restorative artistry. Using 3D intraoral digital scanners and preview mockups, we design porcelain veneers and composite bonding that complement natural lip lines, skin tones, and facial contours. (Demo Service Description - XYZ Dental Clinic).",
    iconName: "Sparkles",
    category: "cosmetic",
    duration: "XYZ (2 to 3 demo sessions)",
    startingPrice: "XYZ (Demo Pricing)",
    benefits: [
      "Custom 3D Digital Smile Preview before touching teeth",
      "Minimally invasive preparation preserving natural enamel",
      "Stain-resistant high-grade ceramic restorations",
      "Biomimetic design tailored to facial proportions"
    ],
    procedureSteps: [
      { title: "Digital Aesthetic Consultation", desc: "High-definition photography and 3D digital impressions." },
      { title: "Trial Smile Try-In", desc: "A reversible resin mockup placed so you can preview the aesthetic outcome." },
      { title: "Micro-Preparation & Bonding", desc: "Precision micro-refinement and permanent adhesive cementation." }
    ],
    idealFor: ["Chipped or worn teeth", "Stubborn intrinsic discoloration", "Gaps and minor misalignments"],
    imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "dental-implants",
    name: "Permanent Dental Implants (XYZ)",
    shortDesc: "Computer-guided titanium and zirconia implants designed to restore natural chewing comfort and stability.",
    fullDesc: "A missing tooth compromises both chewing efficiency and jawbone density over time. At XYZ Dental Clinic, computer-guided implant planning provides sub-millimeter placement accuracy, promoting rapid recovery and enduring stability. (Demo Service Description).",
    iconName: "ShieldCheck",
    category: "restorative",
    duration: "XYZ (30 to 45 mins demo)",
    startingPrice: "XYZ (Demo Pricing)",
    benefits: [
      "Restores natural bite force and chewing comfort",
      "Helps maintain healthy bone structure and facial aesthetics",
      "High-grade biocompatible titanium fixtures",
      "Minimally invasive keyhole surgical techniques"
    ],
    procedureSteps: [
      { title: "CBCT 3D Bone Imaging", desc: "Three-dimensional bone mapping to plan optimal angle and depth." },
      { title: "Computer-Guided Placement", desc: "Minimally invasive surgical placement using custom surgical guides." },
      { title: "Crown Attachment", desc: "Custom ceramic crown placed after natural integration." }
    ],
    idealFor: ["Single or multiple missing teeth", "Stabilizing loose dentures", "Replacing failing bridgework"],
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "root-canal",
    name: "Gentle Micro-Endodontics (Root Canal - XYZ)",
    shortDesc: "Single-sitting, microscope-assisted therapy focused on relieving acute toothache and preserving natural teeth.",
    fullDesc: "Modern root canal treatment is comfortable and efficient. In our calm clinical suite, endodontic care is performed under surgical magnification with rotary instrumentation and computerized apex locators. Accomplished with profound digital local anesthesia. (Demo Service Description).",
    iconName: "HeartPulse",
    category: "restorative",
    duration: "XYZ (45 to 60 mins demo)",
    startingPrice: "XYZ (Demo Pricing)",
    benefits: [
      "Immediate relief from severe toothache and sensitivity",
      "Completed in a single comfortable sitting in most cases",
      "Microscope-assisted inspection for thorough disinfection",
      "Biocompatible hermetic seal protects against reinfection"
    ],
    procedureSteps: [
      { title: "Profound Digital Anesthesia", desc: "Gentle local anesthetic application for comprehensive numbing." },
      { title: "Microscope-Guided Cleaning", desc: "Removal of inflamed pulp and sonic irrigation." },
      { title: "Hermetic 3D Sealing", desc: "Biocompatible root canal filling followed by durable core restoration." }
    ],
    idealFor: ["Severe thermal sensitivity", "Spontaneous nighttime throbbing", "Deep tooth decay or trauma"],
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "orthodontics-aligners",
    name: "Clear Aligners & Orthodontics (XYZ)",
    shortDesc: "Discreet, removable clear aligners that guide teeth into alignment comfortably without metal brackets.",
    fullDesc: "Straightening your teeth without noticeable metal brackets or wires. Clear aligner therapy uses medical-grade thermoplastic aligners manufactured from high-resolution digital optical scans. Removable for eating and brushing, they fit smoothly into everyday professional lifestyles. (Demo Service Description).",
    iconName: "Layers",
    category: "cosmetic",
    duration: "XYZ (6 to 12 months demo)",
    startingPrice: "XYZ (Demo Pricing)",
    benefits: [
      "Virtually invisible in social and business environments",
      "Zero dietary restrictions — remove during meals",
      "Gentle, calibrated forces reduce orthodontic discomfort",
      "Fewer in-clinic visits needed compared to traditional braces"
    ],
    procedureSteps: [
      { title: "3D Digital Optical Scan", desc: "Radiation-free optical scanning replaces messy silicone trays." },
      { title: "Digital Movement Simulation", desc: "Preview a step-by-step video simulation of teeth aligning." },
      { title: "Aligner Delivery & Progress", desc: "Receive custom aligner sets with periodic check-ins." }
    ],
    idealFor: ["Crowded or overlapping teeth", "Gaps between teeth", "Relapsed teeth after past orthodontic care"],
    imageUrl: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "teeth-whitening",
    name: "Laser Teeth Whitening (XYZ)",
    shortDesc: "Professional in-office whitening activated by cold blue light for a visibly brighter, refreshed smile.",
    fullDesc: "Professional whitening lifts deep organic stains safely without stripping natural enamel. Includes a protective gingival barrier application and remineralizing treatment for a comfortable, sensitivity-free experience. (Demo Service Description).",
    iconName: "Sun",
    category: "cosmetic",
    duration: "XYZ (45 minutes demo)",
    startingPrice: "XYZ (Demo Pricing)",
    benefits: [
      "Noticeable shade lift in a single in-office visit",
      "Desensitizing protocol minimizes thermal sensitivity",
      "Protective barrier protects delicate gum tissues",
      "Post-treatment remineralization serum included"
    ],
    procedureSteps: [
      { title: "Shade Documentation", desc: "Accurate shade recording against standard dental shade guides." },
      { title: "Gingival Shielding", desc: "Medical resin barrier placed to protect gums completely." },
      { title: "Cold-Light Activation", desc: "PH-neutral whitening gel activated under specialized LED light." }
    ],
    idealFor: ["Coffee, tea, and food stains", "Natural aging discoloration", "Pre-event smile refresh"],
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "preventive-care",
    name: "Preventive Hygiene & Guided Biofilm Therapy (XYZ)",
    shortDesc: "Gentle ultrasonic cleaning, airflow polishing, and preventive remineralization for enduring oral health.",
    fullDesc: "Preventive care is the cornerstone of healthy smiles. Using gentle warm-water airflow with fine powder, plaque and bacterial biofilm are removed with supreme gentleness and zero scraping of natural enamel. (Demo Service Description).",
    iconName: "Activity",
    category: "preventive",
    duration: "XYZ (30 to 45 mins demo)",
    startingPrice: "XYZ (Demo Pricing)",
    benefits: [
      "Comfortable cleaning with temperature-regulated warm water",
      "Removes stains from hard-to-reach subgingival areas",
      "Protects gums and prevents bleeding and bad breath",
      "Essential foundation before cosmetic or restorative work"
    ],
    procedureSteps: [
      { title: "Biofilm Disclosing", desc: "Harmless organic dye highlights areas needing thorough cleaning." },
      { title: "Warm Airflow Polishing", desc: "Fine powder spray gently cleanses tooth surfaces without scraper noise." },
      { title: "Fluoride Protection", desc: "Remineralizing coat applied to strengthen natural enamel." }
    ],
    idealFor: ["Routine 6-monthly wellness visits", "Gum inflammation or bleeding", "Coffee and tea drinkers"],
    imageUrl: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "pediatric-dentistry",
    name: "Pediatric & Gentle Young Smile Care (XYZ)",
    shortDesc: "A playful, zero-fear approach designed to nurture positive dental habits and prevent cavities.",
    fullDesc: "A child's early dental experiences shape their lifelong oral health habits. Our pediatric approach is gentle, reassuring, and free from intimidating clinical jargon. Focuses on preventive sealants, cavity prevention, and fun education. (Demo Service Description).",
    iconName: "Smile",
    category: "specialized",
    duration: "XYZ (30 minutes demo)",
    startingPrice: "XYZ (Demo Pricing)",
    benefits: [
      "Tell-Show-Do method builds child confidence and trust",
      "Fissure sealants protect chewing molars against cavities",
      "Growth monitoring and early orthodontic guidance",
      "Positive reinforcement and friendly clinic atmosphere"
    ],
    procedureSteps: [
      { title: "Gentle Orientation", desc: "Fun introductory tour to make the child feel comfortable." },
      { title: "Tooth Check & Polish", desc: "Gentle examination and fruity prophylaxis polish." },
      { title: "Protective Sealant", desc: "Applying cavity-fighting shield to vulnerable grooves." }
    ],
    idealFor: ["First dental visits", "School-going children cavity prevention", "Sports mouthguards"],
    imageUrl: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "restorative-crowns",
    name: "Metal-Free Zirconia Crowns & Inlays (XYZ)",
    shortDesc: "Biocompatible ceramic crowns digitally designed to restore broken, cracked, or root-canal-treated teeth.",
    fullDesc: "Metal-free restorations crafted from monolithic multi-layered zirconia and lithium disilicate. Digitally milled for an airtight marginal seal, replicating the exact anatomy, translucency, and chewing strength of natural teeth with zero black metal lines. (Demo Service Description).",
    iconName: "Award",
    category: "restorative",
    duration: "XYZ (2 sessions demo)",
    startingPrice: "XYZ (Demo Pricing)",
    benefits: [
      "Zero black metal line at the gumline — ever",
      "Superior strength for heavy posterior molar chewing",
      "Biocompatible with gum tissues to prevent irritation",
      "Digitally milled marginal precision"
    ],
    procedureSteps: [
      { title: "3D Digital Scanning", desc: "High-resolution optical scan eliminates putty impressions." },
      { title: "Precision CAD/CAM Milling", desc: "Robotic milling from high-strength ceramic blocks." },
      { title: "Adhesive Seating", desc: "Permanent resin-bonded cementation under magnification." }
    ],
    idealFor: ["Teeth treated with root canal therapy", "Heavily broken or cracked teeth", "Replacing older metal crowns"],
    imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80"
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: "dr-xyz",
    name: CLINIC_CONFIG.doctorName,
    title: CLINIC_CONFIG.doctorTitle,
    specialty: CLINIC_CONFIG.doctorSpecialization,
    experience: CLINIC_CONFIG.doctorExperience,
    qualifications: CLINIC_CONFIG.doctorQualification,
    bio: CLINIC_CONFIG.doctorBio,
    philosophy: CLINIC_CONFIG.doctorPhilosophy,
    languages: ["English (Demo)", "Gujarati (Demo)", "Hindi (Demo)"],
    memberships: [
      "Indian Dental Association (Demo Affiliation)",
      "State Dental Council (Demo Registration)",
      "Academy of Aesthetic Dentistry (Demo Member)"
    ],
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    patientName: "Demo Patient A (Fictional)",
    location: "Surat, Gujarat",
    treatment: "Smile Design & Veneers (XYZ Demo)",
    quote: "The digital trial preview made the entire process so clear and reassuring. The atmosphere at XYZ Dental Clinic is calm, professional, and patient-centered.",
    rating: 5,
    date: "Demo Review",
    verifiedDemo: true
  },
  {
    id: "t2",
    patientName: "Demo Patient B (Fictional)",
    location: "Surat, Gujarat",
    treatment: "Microscopic Root Canal (XYZ Demo)",
    quote: "Gentle care and virtually painless treatment. Dr. XYZ and the clinical team took time to explain every single step before proceeding.",
    rating: 5,
    date: "Demo Review",
    verifiedDemo: true
  },
  {
    id: "t3",
    patientName: "Demo Patient C (Fictional)",
    location: "Surat, Gujarat",
    treatment: "Dental Implants (XYZ Demo)",
    quote: "Computer-guided planning gave me complete peace of mind. Transparent estimates with zero hidden surprises.",
    rating: 5,
    date: "Demo Review",
    verifiedDemo: true
  }
];

export const FAQS: FAQ[] = [
  {
    category: "appointments",
    question: "How do I request an appointment at XYZ Dental Clinic?",
    answer: `You can request a demonstration consultation directly through our website booking form or contact our front desk at ${CLINIC_CONFIG.phoneNumber} or ${CLINIC_CONFIG.email}. In this demo website, appointment requests are stored and manageable by the doctor in the admin dashboard.`
  },
  {
    category: "general",
    question: "Is this a real operating clinic or a demonstration website?",
    answer: "This is a demonstration website created to showcase high-quality healthcare web architecture, online booking, and doctor admin dashboard systems. All doctor, clinic, and patient details are fictional."
  },
  {
    category: "treatments",
    question: "What are the clinic timings?",
    answer: `Our demo operating hours are: ${CLINIC_CONFIG.timings.weekdays}. Enquiries submitted after hours are reviewed first thing next morning in the doctor dashboard.`
  },
  {
    category: "pricing",
    question: "How do treatment estimates work?",
    answer: "Every patient receives an itemized written estimate following their initial digital diagnostic scan, ensuring full transparency before initiating any procedure."
  }
];

export const PRICING_DATA: PriceItem[] = [
  { category: "Consultation & Diagnostics", treatment: "Comprehensive Initial Consultation (Digital Scan + X-Rays)", priceRange: "XYZ (Demo)", note: "Includes 3D intraoral scan & written treatment plan (Demo)" },
  { category: "Restorative Dentistry", treatment: "Tooth-Colored Biomimetic Composite Filling", priceRange: "XYZ (Demo)", note: "Per surface, layered with German nanohybrid resin (Demo)" },
  { category: "Restorative Dentistry", treatment: "Microscope-Guided Single Sitting Root Canal", priceRange: "XYZ (Demo)", note: "Molar / premolar / anterior root therapy (Demo)" },
  { category: "Restorative Dentistry", treatment: "Monolithic High-Translucent Zirconia Crown", priceRange: "XYZ (Demo)", note: "100% metal-free with warranty certificate (Demo)" },
  { category: "Cosmetic & Smile Design", treatment: "In-Office Laser Teeth Whitening", priceRange: "XYZ (Demo)", note: "Single sitting laser whitening with desensitizing shield (Demo)" },
  { category: "Cosmetic & Smile Design", treatment: "Custom Handcrafted Porcelain Veneer", priceRange: "XYZ (Demo)", note: "Per tooth, includes 3D digital trial smile mockup (Demo)" },
  { category: "Orthodontics", treatment: "Clear Invisible Aligners (Comprehensive Package)", priceRange: "XYZ (Demo)", note: "Full treatment course with digital movement simulation (Demo)" },
  { category: "Implantology", treatment: "Single Dental Implant Fixture", priceRange: "XYZ (Demo)", note: "Biocompatible titanium fixture with computer-guided placement (Demo)" }
];

import { Service, Doctor, Testimonial, FAQ, PriceItem } from '../types';

export const CLINIC_INFO = {
  name: "Aurelia Dental Studio",
  tagline: "Dentistry Reimagined",
  subheadline: "A sanctuary for calm, world-class dental care in the heart of Surat.",
  phone: "+91 98250 12345",
  displayPhone: "+91 (0261) 289-4321",
  whatsapp: "+919825012345",
  email: "concierge@aureliadental.in",
  address: "Suite 402, 4th Floor, Aurelia Boulevard, Near VIP Road, Vesu",
  city: "Surat",
  state: "Gujarat",
  pincode: "395007",
  timings: {
    weekdays: "Monday – Saturday: 9:00 AM – 8:00 PM",
    sunday: "Sunday: 10:00 AM – 2:00 PM (By Prior Appointment)",
    emergency: "24/7 Priority Emergency Line Available",
  },
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.2324546452293!2d72.76865487597191!3d21.14314488383818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d80a15c898b%3A0xb304b5f492b4507!2sVesu%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
};

export const SERVICES: Service[] = [
  {
    id: "cosmetic-dentistry",
    name: "Cosmetic Smile Design & Veneers",
    shortDesc: "Custom handcrafted ultra-thin porcelain veneers and digital smile designing for a naturally radiant aesthetic.",
    fullDesc: "Our Smile Design philosophy marries facial harmony with state-of-the-art restorative artistry. Using 3D intraoral digital scanners and preview mockups, we design porcelain veneers and composite bonding that complement your unique lip line, skin tone, and facial contours. Every veneer is individually layered by master ceramicists to achieve lifelike translucency and natural luminescence.",
    iconName: "Sparkles",
    category: "cosmetic",
    duration: "2 to 3 appointments",
    startingPrice: "₹12,000 per tooth",
    benefits: [
      "Custom 3D Digital Smile Preview before touching teeth",
      "Minimally invasive preparation preserving natural enamel",
      "Stain-resistant high-grade German e.max ceramic",
      "Biomimetic design tailored to your natural facial proportions"
    ],
    procedureSteps: [
      { title: "Digital Aesthetic Consultation", desc: "High-definition photography, video smile analysis, and 3D digital impressions." },
      { title: "Trial Smile Try-In", desc: "A reversible resin mockup placed directly in your mouth so you can test-drive your new smile." },
      { title: "Micro-Preparation & Bonding", desc: "Precision micro-refinement under surgical loupes and permanent adhesive cementation." }
    ],
    idealFor: ["Chipped or worn teeth", "Stubborn intrinsic discoloration", "Gaps (diastema) and minor misalignments", "Asymmetrical tooth lengths"],
    imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "dental-implants",
    name: "Permanent Dental Implants",
    shortDesc: "Computer-guided titanium and zirconia implants that feel, look, and function exactly like natural healthy teeth.",
    fullDesc: "A missing tooth compromises both chewing efficiency and jawbone density over time. At Aurelia Dental Studio, we perform computer-guided flapless implant surgery utilizing Swiss and German implant systems (Straumann & Nobel Biocare). Guided by 3D CBCT bone tomography, implants are placed with sub-millimeter precision for virtually painless recovery and lifelong stability.",
    iconName: "ShieldCheck",
    category: "restorative",
    duration: "30 to 45 mins per implant",
    startingPrice: "₹28,000 per unit",
    benefits: [
      "Restores 99% of natural bite force and chewing comfort",
      "Prevents long-term bone atrophy and sunken facial appearance",
      "Lifetime international warranty on genuine titanium fixtures",
      "Flapless keyhole technique ensures minimal swelling and rapid healing"
    ],
    procedureSteps: [
      { title: "CBCT 3D Bone Tomography", desc: "Three-dimensional bone density mapping to plan optimal angle and depth." },
      { title: "Computer-Guided Placement", desc: "Minimally invasive surgical placement using custom 3D printed surgical guides." },
      { title: "Zirconia Crown Placement", desc: "Custom screw-retained ceramic crown attached after natural osseointegration." }
    ],
    idealFor: ["Single or multiple missing teeth", "Loose dentures requiring implant overdenture support", "Failing bridges needing permanent independent roots"],
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "root-canal",
    name: "Gentle Micro-Endodontics (Root Canal)",
    shortDesc: "Single-sitting, microscope-assisted therapy focused entirely on relieving acute pain and saving your natural tooth.",
    fullDesc: "The modern root canal is fundamentally different from historical perceptions. In our calm clinical suite, root canal therapy is performed under surgical magnification with rotary nickel-titanium instrumentation and computerized apex locators. The entire procedure is virtually painless, accomplished in a single relaxed 45-minute sitting with profound computer-controlled local anesthesia.",
    iconName: "HeartPulse",
    category: "restorative",
    duration: "45 to 60 minutes",
    startingPrice: "₹4,500 per canal",
    benefits: [
      "Immediate eradication of acute throbbing toothache",
      "Completed in a single comfortable sitting in >90% of cases",
      "High-power dental microscope ensures 100% canal disinfection",
      "Warm biocompatible 3D obturation seals canals hermetically"
    ],
    procedureSteps: [
      { title: "Profound Digital Anesthesia", desc: "Gentle computer-assisted local anesthetic application for complete numbness." },
      { title: "Microscope-Guided Cleaning", desc: "Removal of inflamed pulp tissue and sonic irrigation to eliminate bacteria." },
      { title: "Hermetic 3D Sealing", desc: "Thermoplastic gutta-percha seal followed by durable core restoration." }
    ],
    idealFor: ["Severe sensitivity to hot or cold", "Spontaneous throbbing nighttime pain", "Dental trauma or deep cracked tooth caries", "Periapical infection and abscess"],
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "orthodontics-aligners",
    name: "Clear Aligners & Orthodontics",
    shortDesc: "Discreet, virtually invisible custom aligners that straighten your teeth comfortably without metal wires or brackets.",
    fullDesc: "Straightening your teeth no longer requires uncomfortable metal brackets or sharp wires. Our clear aligner therapy uses medical-grade thermoplastic aligners manufactured from high-resolution digital scans. Removable for eating and brushing, they gradually guide your teeth into optimal occlusion and alignment without disrupting your professional lifestyle.",
    iconName: "Layers",
    category: "cosmetic",
    duration: "6 to 14 months",
    startingPrice: "₹55,000 full course",
    benefits: [
      "100% transparent and virtually unnoticeable in social and office settings",
      "Zero dietary restrictions — remove aligners during meals",
      "Gentle, calibrated forces reduce orthodontic discomfort significantly",
      "Fewer in-clinic visits needed compared to traditional braces"
    ],
    procedureSteps: [
      { title: "iTero 3D Digital Scan", desc: "A 5-minute radiation-free optical scan replaces traditional gooey impression trays." },
      { title: "3D ClinCheck Treatment Plan", desc: "Review an exact 3D video simulation of your teeth moving week-by-week." },
      { title: "Aligner Delivery & Monitoring", desc: "Receive your custom aligner trays and progress checks every 6–8 weeks." }
    ],
    idealFor: ["Crowded or overlapping teeth", "Gaps and spacing between teeth", "Mild-to-moderate overbites, underbites, or crossbites", "Relapsed teeth after childhood braces"],
    imageUrl: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "teeth-whitening",
    name: "In-Office Laser Teeth Whitening",
    shortDesc: "Medical-grade hydrogen peroxide whitening activated by cold blue laser light for up to 6–8 shades brighter in 45 minutes.",
    fullDesc: "Over time, coffee, tea, turmeric, and natural aging darken tooth enamel. Our professional laser whitening system lifts deep organic pigment stains safely without stripping enamel or causing sharp thermal sensitivity. Includes a protective gingival barrier application and remineralizing nano-hydroxyapatite post-treatment therapy.",
    iconName: "Sun",
    category: "cosmetic",
    duration: "45 minutes",
    startingPrice: "₹8,500 per session",
    benefits: [
      "Noticeable 5 to 8 shade lift in a single 45-minute clinic visit",
      "Advanced desensitizing protocol prevents post-procedure zings",
      "Gingival barrier shield protects delicate gums completely",
      "Includes take-home remineralization serum for lasting brilliance"
    ],
    procedureSteps: [
      { title: "Pre-Shade Documentation", desc: "Accurate shade recording against dental shade guide under daylight balanced lighting." },
      { title: "Gum Isolation & Gel Application", desc: "Medical resin barrier painted on gums followed by PH-neutral bleaching gel." },
      { title: "Triple Cold-Light Activation", desc: "Three 15-minute cycles under cold LED laser lamp followed by polish." }
    ],
    idealFor: ["Extrinsic coffee, tea, and tobacco stains", "Yellowing associated with natural aging", "Pre-wedding and special event smile enhancement", "Post-orthodontic polish"],
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "preventive-care",
    name: "Preventive Hygiene & Guided Biofilm Therapy",
    shortDesc: "Gentle ultrasonic scaling, airflow stain polishing, and preventative remineralization for enduring oral wellness.",
    fullDesc: "True healthcare focuses on prevention rather than cure. Our hygiene protocol adopts Swiss Guided Biofilm Therapy (GBT). Using gentle warm-water airflow with erythritol powder, plaque and bacterial biofilm are removed from tooth surfaces, gum pockets, and dental implants with supreme gentleness and zero scratching of natural enamel.",
    iconName: "Activity",
    category: "preventive",
    duration: "30 to 45 minutes",
    startingPrice: "₹2,000 per session",
    benefits: [
      "Completely comfortable cleaning with temperature-regulated warm water",
      "Cleans hard-to-reach subgingival pockets and orthodontic attachments",
      "Eliminates bleeding gums and chronic halitosis (bad breath)",
      "Essential foundation before any cosmetic or restorative work"
    ],
    procedureSteps: [
      { title: "Plaque Disclosing", desc: "Harmless organic dye highlights biofilm colonies so you can see where plaque hides." },
      { title: "Airflow Polishing", desc: "Submicron erythritol spray polishes away stains without tactile scraper noise." },
      { title: "Topical Fluoride / MI Paste", desc: "Remineralizing treatment applied to shield enamel against acidic erosion." }
    ],
    idealFor: ["Routine 6-monthly oral wellness visits", "Bleeding gums during flossing or brushing", "Smokers and heavy tea/coffee drinkers", "Patients with dental implants or crowns"],
    imageUrl: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "pediatric-dentistry",
    name: "Pediatric & Gentle Young Smile Care",
    shortDesc: "A playful, zero-fear approach designed to nurture positive dental habits and prevent childhood cavities.",
    fullDesc: "We believe a child's earliest dental memories shape their lifelong relationship with oral health. Our pediatric experience is thoughtfully designed without scary clinical jargon or intimidating equipment in view. From tell-show-do demonstrations to painless pit-and-fissure sealants and fluoride varnishes, our focus is gentle prevention in a fun, relaxed setting.",
    iconName: "Smile",
    category: "specialized",
    duration: "30 minutes",
    startingPrice: "₹1,500 per visit",
    benefits: [
      "Tell-Show-Do psychology builds confidence and eliminates fear",
      "Fissure sealants safeguard vulnerable grooves against sweet caries",
      "Growth monitoring and early interceptive orthodontics guidance",
      "Custom fun rewards and positive reinforcement certificate"
    ],
    procedureSteps: [
      { title: "Acclimatization & Chair Ride", desc: "Fun introductory tour of the clinic to make your child feel safe and in control." },
      { title: "Gentle Examination & Polish", desc: "Tooth counting, non-invasive check, and gentle fruity prophylaxis polish." },
      { title: "Protective Sealant/Fluoride", desc: "Painting cavity-fighting shield onto back chewing molars." }
    ],
    idealFor: ["First dental visits (recommended at age 1 or first tooth)", "Cavity prevention in school-going children", "Habit breaking (thumb sucking, tongue thrusting)", "Athletic mouthguards for sports"],
    imageUrl: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "restorative-crowns",
    name: "Metal-Free Zirconia Crowns & Inlays",
    shortDesc: "Biomimetic ceramic restorations digitally milled to restore cracked, heavily filled, or post-RCT teeth.",
    fullDesc: "Traditional porcelain-fused-to-metal crowns frequently develop unsightly black lines along the gum margin over time. At Aurelia, all our indirect restorations are 100% metal-free, utilizing multi-layered monolithic zirconia and lithium disilicate (e.max). Digitally milled with CAD/CAM technology, they replicate the exact anatomy, translucency, and strength of a pristine natural tooth.",
    iconName: "Award",
    category: "restorative",
    duration: "2 appointments",
    startingPrice: "₹9,000 per crown",
    benefits: [
      "Zero black metal line at the gumline — ever",
      "Unmatched fracture resistance suitable for heavy back molar chewing",
      "Biocompatible with gum tissue, preventing marginal inflammation",
      "CAD/CAM milling guarantees an airtight marginal seal"
    ],
    procedureSteps: [
      { title: "Digital 3D Optical Impression", desc: "Sub-millimeter optical scanning eliminates messy putty impressions." },
      { title: "CAD/CAM Robot Milling", desc: "Precision milling from high-strength multi-translucent ceramic blocks." },
      { title: "Resin-Bonded Seating", desc: "Permanent dual-cure resin adhesive bonding under surgical magnification." }
    ],
    idealFor: ["Teeth treated with root canal therapy", "Extensively broken or fractured teeth", "Replacing old, unsightly metal-backed crowns", "Large silver amalgam fillings needing replacement"],
    imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80"
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: "dr-ananya-mehta",
    name: "Dr. Ananya Mehta",
    title: "Chief Prosthodontist & Aesthetic Director",
    specialty: "MDS - Prosthodontics & Implantology",
    experience: "12+ Years Clinical Excellence",
    qualifications: "BDS (Govt. Dental College), MDS (Manipal), Fellowship in Oral Implantology (ICOI, USA)",
    bio: "Dr. Ananya Mehta is a recognized specialist in full-mouth rehabilitation, cosmetic smile makeovers, and computer-guided implantology. Having trained at prestigious institutions in India and completed advanced fellowships in aesthetic dentistry abroad, she combines rigorous clinical precision with an artist's eye for facial harmony. Her gentle bedside manner has transformed hundreds of anxious patients into lifelong dental advocates.",
    philosophy: "Dentistry is not merely about restoring teeth; it is about restoring a person's dignity, confidence, and ability to smile without hesitation. We never rush. We listen first, explain every step clearly, and treat every patient as we would our own family.",
    languages: ["Gujarati (Native)", "Hindi (Fluent)", "English (Fluent)"],
    memberships: [
      "Indian Dental Association (IDA)",
      "Indian Prosthodontic Society (IPS)",
      "International Congress of Oral Implantologists (ICOI)",
      "American Academy of Cosmetic Dentistry (Affiliate)"
    ],
    imageUrl: "https://images.unsplash.com/photo-1594824813567-7b70bc90bc39?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dr-rohan-vora",
    name: "Dr. Rohan Vora",
    title: "Senior Micro-Endodontist & Restorative Specialist",
    specialty: "MDS - Conservative Dentistry & Endodontics",
    experience: "10+ Years Dedicated Practice",
    qualifications: "BDS (KLE Institute), MDS - Endodontics (Nair Dental College), Micro-Dentistry Certified (Munich, Germany)",
    bio: "Specializing in painless single-sitting root canal therapy under surgical microscope magnification, Dr. Rohan Vora is passionate about conservative biological dentistry — preserving natural tooth structure whenever humanly possible. He has completed extensive research on bioceramic sealers and minimally invasive rotary instrumentation.",
    philosophy: "There is no synthetic material on Earth as remarkable as natural human tooth enamel. My mission is to relieve acute pain swiftly and preserve what nature gave you for as many decades as possible.",
    languages: ["Gujarati (Native)", "Hindi (Fluent)", "English (Fluent)"],
    memberships: [
      "Indian Dental Association (IDA)",
      "Indian Association of Conservative Dentistry and Endodontics (IACDE)",
      "European Society of Endodontology (Associate)"
    ],
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    patientName: "Nirav Contractor",
    location: "Vesu, Surat",
    treatment: "Full Mouth Smile Makeover & Veneers",
    quote: "I had spent over seven years hiding my smile in business meetings due to chipped front teeth. Dr. Ananya's digital trial smile showed me the exact result before we even started. The final porcelain veneers look so completely natural that even my closest colleagues simply noticed I look happier and more confident. The clinic feels like a boutique sanctuary, completely devoid of typical hospital stress.",
    rating: 5,
    date: "October 2026",
    verifiedDemo: true
  },
  {
    id: "t2",
    patientName: "Bhavna Parikh",
    location: "City Light, Surat",
    treatment: "Microscopic Pain-Free Root Canal",
    quote: "I walked into Aurelia Dental trembling with acute toothache and severe dental anxiety from childhood trauma. Dr. Rohan was exceptionally patient. He applied digital anesthetic gently, and within 40 minutes, the entire root canal was finished without a single pinch of pain! I fell asleep in the chair listening to calming music. Outstanding care.",
    rating: 5,
    date: "September 2026",
    verifiedDemo: true
  },
  {
    id: "t3",
    patientName: "Rajesh S. Patel",
    location: "Ghopad, Surat",
    treatment: "Computer-Guided Dental Implant",
    quote: "After losing a molar, I struggled with chewing for two years. The 3D CBCT guided implant process at Aurelia was seamless. Keyhole surgery took just twenty minutes, with zero swelling the following morning. Dr. Ananya's transparent cost breakdown meant there were zero hidden surprises.",
    rating: 5,
    date: "August 2026",
    verifiedDemo: true
  },
  {
    id: "t4",
    patientName: "Pooja V. Desai",
    location: "Piplod, Surat",
    treatment: "Clear Aligners Therapy",
    quote: "Being a working professional, I didn't want metal braces. The clear aligners from Aurelia were practically invisible. I attended weddings and business conferences with complete poise. In just nine months, my front crowding was beautifully corrected.",
    rating: 5,
    date: "November 2026",
    verifiedDemo: true
  }
];

export const FAQS: FAQ[] = [
  {
    category: "appointments",
    question: "How do I request an appointment at Aurelia Dental Studio?",
    answer: "You can request a priority consultation directly through our website booking form, send a message to our dedicated WhatsApp concierge (+91 98250 12345), or call our clinic desk. Our patient coordinator will confirm your preferred time slot within 2 hours."
  },
  {
    category: "treatments",
    question: "Is modern dental treatment truly painless?",
    answer: "Yes. We utilize computer-regulated local anesthesia delivering comfortable, slow-release numbing without the traditional needle pinch. Furthermore, our treatments are microscope-guided to minimize trauma to surrounding tissues, ensuring little to no post-procedure discomfort."
  },
  {
    category: "pricing",
    question: "Do you provide transparent cost estimates before beginning treatment?",
    answer: "Always. Following your comprehensive 3D examination and diagnostic radiographs, you receive a written, itemized treatment proposal with clear fee estimates. We do not commence any procedure without your full understanding and consent."
  },
  {
    category: "general",
    question: "What strict sterilisation and infection control protocols do you follow?",
    answer: "We adhere strictly to European Class-B vacuum autoclave standards and CDC hospital sterilization protocols. Every instrument pack is sealed and opened directly in front of the patient. Treatment rooms undergo hospital-grade disinfectant aerosolization between appointments."
  },
  {
    category: "appointments",
    question: "What should I expect during my very first visit?",
    answer: "Your initial appointment is a comprehensive 45-minute discovery consultation. We review your medical history, take 3D intraoral digital scans and low-radiation digital X-rays, discuss your aesthetic goals, and formulate a customized care plan with zero pressure."
  },
  {
    category: "treatments",
    question: "How long do porcelain veneers and dental implants last?",
    answer: "With proper oral hygiene and regular 6-monthly checkups, high-grade German porcelain veneers typically last 15–20+ years, while modern titanium dental implants have clinical success rates exceeding 98% and can last a lifetime."
  }
];

export const PRICING_DATA: PriceItem[] = [
  { category: "Consultation & Diagnostics", treatment: "Comprehensive Initial Consultation (Digital Scan + X-Rays)", priceRange: "₹800", note: "Includes 3D intraoral scan & personalized written treatment plan" },
  { category: "Consultation & Diagnostics", treatment: "3D CBCT Implant Tomography", priceRange: "₹1,500 – ₹2,500", note: "Ultra-low dose volumetric bone scan" },
  { category: "Preventive & Hygiene", treatment: "Swiss Guided Biofilm Therapy (Scaling + Airflow)", priceRange: "₹2,000 – ₹3,500", note: "Temperature-regulated warm water cleaning" },
  { category: "Preventive & Hygiene", treatment: "Pediatric Fluoride Varnish & Sealants", priceRange: "₹1,200 – ₹2,000", note: "Cavity defense shield for children" },
  { category: "Restorative Dentistry", treatment: "Tooth-Colored Biomimetic Composite Filling", priceRange: "₹1,500 – ₹3,000", note: "Per surface, layered with German nanohybrid resin" },
  { category: "Restorative Dentistry", treatment: "Microscope-Guided Single Sitting Root Canal", priceRange: "₹4,500 – ₹7,500", note: "Molar / premolar / anterior root therapy" },
  { category: "Restorative Dentistry", treatment: "Monolithic High-Translucent Zirconia Crown", priceRange: "₹8,500 – ₹14,000", note: "100% metal-free with 10-year warranty certificate" },
  { category: "Cosmetic & Smile Design", treatment: "In-Office Laser Teeth Whitening (Single Sitting)", priceRange: "₹8,500 – ₹12,000", note: "Lifts 5–8 shades in 45 minutes with sensitivity barrier" },
  { category: "Cosmetic & Smile Design", treatment: "Custom Handcrafted Porcelain Veneer (e.max)", priceRange: "₹12,000 – ₹18,000", note: "Per tooth, includes 3D digital trial smile mockup" },
  { category: "Orthodontics", treatment: "Clear Invisible Aligners (Comprehensive Package)", priceRange: "₹55,000 – ₹1,20,000", note: "Full treatment course with unlimited digital revisions" },
  { category: "Implantology", treatment: "Single Dental Implant (Straumann / Nobel Biocare)", priceRange: "₹28,000 – ₹45,000", note: "Titanium fixture with lifetime international warranty" }
];


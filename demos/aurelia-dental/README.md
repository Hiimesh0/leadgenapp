# 🦷 Aurelia Dental Studio — Modern Healthcare Web Platform
**Demo Client:** Aurelia Dental Studio  
**Location:** Vesu, Surat, Gujarat, India  
**Stack:** React 19, TypeScript, Vite 6, Tailwind CSS, Lucide Icons, HashRouter  
**License:** Free & Open Source for Commercial Customization by DigiBoost Gujarat  

---

## 🌟 Executive Summary

**Aurelia Dental Studio** is a high-fidelity, production-grade demonstration website designed and engineered specifically for modern private dental practices, cosmetic smile clinics, and multispecialty healthcare centers in India.

Built on extensive market research of over 20 award-winning international and Indian healthcare websites (see [WEBSITE_RESEARCH.md](WEBSITE_RESEARCH.md)), this platform breaks away from generic, sterile blue-and-white templates. Instead, it utilizes a sophisticated **Boutique Wellness Aesthetic**—combining warm ivory backgrounds, rich forest green accents, refined typography, and high-converting, anxiety-reducing patient flows.

---

## 🎯 Key Functional Features

1. **Complete Multi-Page Architecture:**
   - **Homepage:** Asymmetrical split-screen hero, 4 clinical trust pillars, 8 specialized service cards, interactive Before/After cosmetic smile slider, founder dentist profile cards, 5-step patient journey timeline, verified sample reviews, and integrated Google Maps location.
   - **About the Studio:** Origin story, "Minimal Intervention" clinical pledge, hospital-grade technology tour (Zeiss microscopes, iTero 3D scanners, Melag Class-B vacuum autoclaves).
   - **Meet the Dentists:** Detailed specialist biographies for Dr. Ananya Mehta (MDS Prosthodontics) and Dr. Rohan Vora (MDS Endodontics), qualifications, clinical philosophy, languages spoken (Gujarati, Hindi, English), and professional association memberships.
   - **Dental Services Catalog:** Filterable treatment catalog (All, Cosmetic, Restorative, Preventive, Specialized) with starting prices and procedure durations.
   - **Individual Treatment Detail Pages:** Dedicated pages for each of the 8 treatments (e.g. `/services/cosmetic-dentistry`, `/services/dental-implants`) featuring clinical benefits, 3-step procedure breakdown, and candidate criteria.
   - **Patient Info & Fee Guide:** First-visit preparation guide, transparent treatment pricing guide table, and expandable FAQ accordion.
   - **Patient Stories:** Verified patient case studies with treatment filters (Smile Makeovers, Implants, Aligners, Endodontics).
   - **Contact & Location:** Operating hours, interactive Google Map, direct click-to-call, and transit guide from Surat International Airport and Railway Station.
   - **Appointment Booking:** Dedicated appointment booking page and global quick-access consultation modal.

2. **Conversion & Engagement Tools:**
   - **Interactive Smile Comparison Slider:** Allows patients to drag left/right to visualize before-and-after smile transformations.
   - **Interactive Consultation Request Modal:** Full form with validation, preferred date picker, preferred time window, doctor preference, and Chief Concern notes.
   - **Floating WhatsApp Concierge:** Instant click-to-chat button with prefilled Gujarati/English inquiry text.
   - **Click-to-Call Telephony:** Seamless mobile calling to clinic reception.
   - **Scroll-to-Top Navigation:** Automatic window reset across all page routes.

3. **SEO, Performance & Accessibility:**
   - Local Business Schema.org JSON-LD structured data for Google Local Search.
   - Open Graph social share metadata.
   - WCAG 2.1 AA compliant color contrast and keyboard focus indicators.
   - Responsive breakpoints tested from 375px mobile screens up to 1920px 4K displays.
   - Pure client-side bundle: Sub-200ms route transitions with zero server latency.

---

## 📋 List of Demo Placeholders Requiring Replacement for Real Clients

When adapting this project for a paying dental clinic client, simply edit `src/data/clinicData.ts`. All content is centralized in this single file:

| Component / Field | Current Demo Placeholder | Real Clinic Replacement |
|---|---|---|
| **Clinic Name** | Aurelia Dental Studio | Client's official practice name |
| **Address & Area** | Suite 402, Aurelia Blvd, Vesu, Surat | Client's physical clinic address |
| **Contact Phone** | `+91 98250 12345` / `(0261) 289-4321` | Client's real mobile & desk telephone |
| **WhatsApp Number** | `+919825012345` | Reception WhatsApp Business mobile number |
| **Clinic Email** | `concierge@aureliadental.in` | Client's official email address |
| **Google Maps Embed** | Vesu, Surat coordinates | Client's Google Business Profile embed URL |
| **Dentist Profiles** | Dr. Ananya Mehta & Dr. Rohan Vora | Real doctors' names, photos, degrees, & bios |
| **Pricing Schedule** | Representative Surat fee schedule | Client's actual consultation & treatment fees |
| **Testimonials** | 4 sample case narratives | Verified patient reviews with client consent |
| **Clinic Photography** | Curated high-res Unsplash imagery | Real interior & operatory photos of client's clinic |

---

## 🛠️ Local Development & Setup

### Prerequisites
- Node.js v18+ (tested on Node v24)
- pnpm, npm, or yarn

### Installation Steps

```bash
# 1. Navigate to project directory
cd c:\Users\kanth\Desktop\business\demos\aurelia-dental

# 2. Install dependencies
pnpm install
# (or: npm install)

# 3. Launch local development server
pnpm dev
# (or: npm run dev)
```

The site will instantly launch at `http://localhost:5173`.

---

## 🚀 Free Hosting & Deployment Guide

This project is built using `HashRouter` and produces a completely self-contained static build inside the `dist/` directory. It requires **zero monthly server costs**.

### Option A: GitHub Pages (100% Free)

1. Build the production assets:
   ```bash
   pnpm build
   ```
2. Upload the project to a GitHub repository (e.g. `your-username/aurelia-dental`).
3. In repository **Settings** → **Pages**:
   - Source: Deploy from branch
   - Branch: `main` / `gh-pages` (folder: `/dist` or root if copying files)
4. Your website is live with free HTTPS at `https://your-username.github.io/aurelia-dental/`!

### Option B: Vercel (100% Free Tier)

1. Install Vercel CLI: `pnpm add -g vercel` (or deploy via GitHub integration on [vercel.com](https://vercel.com)).
2. Run `vercel` in the project root.
3. Accept default Vite settings. Deployed in under 30 seconds with global CDN and automated SSL.

### Option C: Netlify (100% Free Tier)

1. Drag and drop the `dist/` folder directly onto [app.netlify.com/drop](https://app.netlify.com/drop).
2. Live instantly with custom domain support.

---

## 📄 Project Structure

```
aurelia-dental/
├── src/
│   ├── components/
│   │   └── common/
│   │       ├── AnnouncementBar.tsx      # Top utility banner
│   │       ├── AppointmentModal.tsx     # Interactive consultation booking dialog
│   │       ├── Footer.tsx               # Footer with hours, links, and demo disclaimer
│   │       ├── Header.tsx               # Responsive navbar with mobile drawer
│   │       ├── SmileComparisonSlider.tsx# Interactive Before/After smile makeover slider
│   │       └── WhatsAppButton.tsx       # Floating WhatsApp click-to-chat action
│   ├── data/
│   │   └── clinicData.ts                # Single source of truth for all clinic data
│   ├── pages/
│   │   ├── HomePage.tsx                 # Full luxury homepage
│   │   ├── AboutPage.tsx                # Studio story, philosophy & technology
│   │   ├── TeamPage.tsx                 # Doctor profiles & academic research
│   │   ├── ServicesPage.tsx             # Filterable treatment catalog
│   │   ├── ServiceDetailPage.tsx        # Dynamic individual procedure guide
│   │   ├── PatientInfoPage.tsx          # First visit guide & fee schedule table
│   │   ├── TestimonialsPage.tsx         # Patient stories & case studies
│   │   ├── ContactPage.tsx              # Transit directions, map & inquiry form
│   │   └── AppointmentPage.tsx          # Dedicated appointment request page
│   ├── types/
│   │   └── index.ts                     # TypeScript data interfaces
│   ├── App.tsx                          # HashRouter setup & scroll management
│   ├── index.css                        # Tailwind directives & typography styling
│   └── main.tsx                         # React 19 entry point
├── public/                              # Static public assets
├── DESIGN_SYSTEM.md                     # Complete UI design system documentation
├── WEBSITE_RESEARCH.md                  # Comprehensive research on 20 clinic websites
├── tailwind.config.js                   # Custom brand tokens & typography config
├── vite.config.ts                       # Vite bundler config with relative pathing
└── package.json                         # Project dependencies and build scripts
```

---

*Designed and developed by **DigiBoost Gujarat** — The AI-Powered Web & Automation Agency for Gujarat SMBs.*


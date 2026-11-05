# PRICING_PLANS.md — Tiered Packaging & Feature Matrix
## Standardized Clinic Solutions & Boundaries

---

## 1. Feature Matrix by Plan Tier

| Feature / Capability | Starter (₹9,999) | Professional (₹19,999) | Premium (₹29,999+) | Enterprise (Custom) |
| :--- | :---: | :---: | :---: | :---: |
| **Number of Pages** | 1 (Long-form Landing) | 5–7 Pages | 7–10 Pages + Admin Portal | Unlimited / Multi-Branch |
| **Mobile-First Responsive Design** | ✅ Included | ✅ Included | ✅ Included | ✅ Included |
| **Doctor / Clinic Profile** | Single Doctor | Up to 5 Doctors | Unlimited Doctors | Full Multi-Branch Hierarchy |
| **Google Maps & Directions** | ✅ Included | ✅ Included | ✅ Included | Multi-Location Pins |
| **WhatsApp Direct Floating Button** | ✅ Included | ✅ Included | ✅ Included | ✅ Included |
| **Before / After Treatment Sliders** | ❌ None | Up to 3 Sliders | Unlimited Sliders | Video & 3D Interactive |
| **Interactive Enquiry Form** | Basic Forwarding | ✅ Email/WhatsApp alerts | ✅ Full Database Storage | ✅ EMR/HIS Integration |
| **Online Appointment Intake Engine** | ❌ None | Basic Form | ✅ Dynamic Slot Selector | ✅ Multi-Chair Scheduling |
| **Doctor Administrative Dashboard** | ❌ None | ❌ None | ✅ Protected Web Portal | ✅ RBAC Enterprise Portal |
| **WAHA Automated WhatsApp Alerts** | ❌ None | ❌ None | ✅ Instant Patient & Doctor alerts | ✅ Multi-Branch WhatsApp Bot |
| **WhatsApp-to-Website Image Automation** | ❌ None | ❌ None | ✅ Supported (Approval Mode) | ✅ Auto-Publishing & AI tagging |
| **Database-Backed Persistence** | ❌ Static | ❌ Static/Serverless | ✅ SQLite / PostgreSQL | ✅ Dedicated Cloud Cluster |
| **SEO & Schema Markup** | Basic Local | Advanced Medical Schema | Comprehensive Local SEO | Regional Multi-City SEO |
| **Hosting & Cloud Architecture** | Free Static CDN | Static / Web Service | 24/7 Managed Cloud Service | High-Availability Cluster |
| **Delivery SLA** | 24 Hours | 3 Days | 7 Days | 14–30 Days |

---

## 2. Add-On Menu & Upsell Pricing

Clinics on lower tiers can purchase standalone modular upgrades:

- **Additional Doctor Profile Page:** ₹1,499 per doctor.
- **Before/After Interactive Smile Slider:** ₹999 per slider.
- **Automated WAHA WhatsApp Integration Upgrade (for Starter/Pro):** ₹9,999 setup + ₹999/month.
- **WhatsApp Image Update Pipeline (for Pro):** ₹4,999 setup + ₹499/month.
- **Custom Domain Registration & Annual Management:** ₹1,200/year.
- **Professional Clinic Photography Session (Regional):** ₹4,999.
- **Google My Business Optimization & Review Booster:** ₹2,999.

---

## 3. Plan Enforcement Rules for AI Agents
- The `starter_plan_agent` and `professional_plan_agent` MUST NEVER generate backend database schemas or WAHA webhook handlers without an explicit signed add-on approval in `client.config.json`.
- The `requirements_agent` is required to cross-check client feature requests against this matrix during the initial interview.


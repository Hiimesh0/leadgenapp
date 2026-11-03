# ✅ Quality Assurance Checklist
**AI-Powered Business Websites | Kanth Web Solutions, Gujarat**

*Run this checklist on Day 6 before final delivery. Check every item. Do NOT skip.*

---

## 🎨 1. Design Quality

### Layout & Visual
- [ ] Website looks professional and clean (not cluttered)
- [ ] Colors match client's brand / agreed color scheme
- [ ] Consistent fonts used throughout (max 2 font families)
- [ ] Adequate white space — not cramped
- [ ] Hero section is visually impactful and clearly shows what the business does
- [ ] Logo is displayed clearly in the header
- [ ] All images are high quality (not pixelated or stretched)
- [ ] Images are relevant to the business
- [ ] No placeholder text (no "Lorem Ipsum" anywhere)
- [ ] Footer is complete with business name, copyright, and links

### Mobile Responsive Design
- [ ] Test at 375px width (iPhone SE) — nothing overflows horizontally
- [ ] Test at 414px width (iPhone Pro) — layout looks correct
- [ ] Test at 768px width (tablet) — layout adapts properly
- [ ] Navigation menu collapses to hamburger menu on mobile (or simplified nav)
- [ ] All text is readable on mobile without zooming
- [ ] Buttons are large enough to tap on mobile (min 44x44px)
- [ ] Images scale correctly on all screen sizes
- [ ] No horizontal scrollbar on mobile
- [ ] Contact form is usable on mobile
- [ ] WhatsApp floating button does not cover important content

### Page Speed
- [ ] Run test on pagespeed.web.dev — Enter website URL
- [ ] Mobile score is 70 or above ✅ (aim for 80+)
- [ ] Desktop score is 85 or above ✅
- [ ] All images are optimized (under 200KB each)
- [ ] No unnecessary large files or scripts

---

## ✍️ 2. Content Quality

### Accuracy
- [ ] Business name spelled correctly throughout (check every occurrence)
- [ ] Phone number is correct (call it to verify if possible)
- [ ] WhatsApp number is correct (test the button)
- [ ] Email address is correct
- [ ] Business address is correct (verify on map)
- [ ] Business hours are correct
- [ ] All service names and descriptions are accurate
- [ ] Prices are correct (or removed if client prefers "Call for Quote")
- [ ] Social media links point to the correct pages

### Writing Quality
- [ ] No spelling mistakes (read every word carefully)
- [ ] No grammatical errors
- [ ] No incomplete sentences
- [ ] All headings make sense and are relevant
- [ ] Content is clear and easy to understand for a non-technical reader
- [ ] No duplicate content (same paragraph repeated)
- [ ] "About Us" is specific to this business (not generic)
- [ ] Testimonials use real customer names (not "Happy Customer")

### SEO Basics
- [ ] **Title Tag:** Page title is set and includes business name + city + main service
  - Format: `[Business Name] | [City] | [Main Service]`
  - Example: `Patel Electronics | Surat | TV Repair & Sales`
  - Length: 50–60 characters
- [ ] **Meta Description:** Set and compelling
  - Describes the business in 1–2 sentences
  - Includes main keyword and city name
  - Length: 140–160 characters
- [ ] **H1 Tag:** Page has exactly ONE H1 (the main hero headline)
- [ ] **H2 Tags:** Section headings use H2 properly
- [ ] **Alt Text:** All images have descriptive alt text (`alt="[description]"`)
- [ ] **Page URL:** Clean and readable (GitHub Pages URL is acceptable)
- [ ] **Business Name in Content:** Appears naturally in text at least 3–4 times
- [ ] **City/Location:** Mentioned naturally in About or Contact section

---

## 🔧 3. Technical Quality

### Links & Navigation
- [ ] All navigation links scroll to correct sections
- [ ] Navigation links are not broken (404 errors)
- [ ] Logo in header links back to top of page (or home)
- [ ] All external links open in new tab (`target="_blank"`)
- [ ] Social media links work and go to correct pages
- [ ] "Back to Top" button works (if present)

### Contact & Communication
- [ ] Phone number link works: `<a href="tel:+91XXXXXXXXXX">` — clicking should offer to call
- [ ] Email link works: `<a href="mailto:email@example.com">` — clicking should open email app
- [ ] WhatsApp button opens correct WhatsApp number
- [ ] WhatsApp pre-filled message is appropriate (e.g., "Hello, I found your website...")
- [ ] Contact form displays correctly (all fields visible)
- [ ] Contact form submit button works (even if backend is not connected, it should not error)
- [ ] Google Maps embed loads and shows correct location (if included)

### Code Quality
- [ ] No JavaScript console errors (press F12 in Chrome → Console tab → no red errors)
- [ ] HTML validates without critical errors (validator.w3.org — paste HTML)
- [ ] No broken image links (no broken image icons visible)
- [ ] Favicon is set (small icon in browser tab)
- [ ] Viewport meta tag is present (ensures mobile scaling works)
- [ ] charset is set to UTF-8

---

## 🌐 4. Cross-Browser Testing Checklist

Test the live GitHub Pages URL in each browser available:

### Google Chrome ✅ (Primary — always test this)
- [ ] Layout looks correct
- [ ] All images load
- [ ] All links work
- [ ] WhatsApp button works
- [ ] Fonts load correctly
- [ ] Animations/transitions work (if any)

### Microsoft Edge (usually available on Windows)
- [ ] Layout looks correct
- [ ] No broken elements
- [ ] Site loads without errors

### Firefox (test if installed)
- [ ] Layout looks correct
- [ ] No alignment issues

### Mobile Browser (MUST TEST)
- [ ] Open on your actual phone's Chrome or Safari
- [ ] Entire site scrolls correctly
- [ ] WhatsApp button tappable and working
- [ ] Phone number tappable (opens dialer)
- [ ] Images loading
- [ ] Text readable without zooming
- [ ] Navigation working

---

## 📱 5. Mobile Testing Checklist (Detailed)

*Use Chrome DevTools (F12 → Toggle device toolbar) AND test on a real phone.*

### Using Chrome DevTools (F12):
1. Press F12 → Click the phone icon (Toggle device toolbar)
2. Select "iPhone SE" (375px) → Check layout
3. Select "iPhone 12 Pro" (390px) → Check layout
4. Select "iPad" (768px) → Check layout

### Checklist:
- [ ] No horizontal overflow/scrolling at 375px
- [ ] Hero section looks good on small screen (headline readable)
- [ ] Navigation accessible on mobile
- [ ] Services section: cards stack properly (not side by side on small screens)
- [ ] Contact section usable on mobile
- [ ] WhatsApp button visible and not covering content
- [ ] Footer readable on mobile
- [ ] All CTAs (Call-to-Action buttons) are large and tappable
- [ ] Test on real Android phone (open GitHub Pages URL)
- [ ] Test on real iPhone if possible (ask family/friend)

---

## 🔍 6. SEO Basics Checklist

*Verify in Chrome: Right-click → View Page Source and search for these elements.*

### Must-Have SEO Elements:
- [ ] `<title>` tag present and optimized (search "title" in source)
  ```html
  <title>Business Name | City | Main Service</title>
  ```
- [ ] `<meta name="description">` present (search "description" in source)
  ```html
  <meta name="description" content="Your 140-160 char description here">
  ```
- [ ] `<meta name="viewport">` present (required for mobile)
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ```
- [ ] Single `<h1>` tag (the main headline — search "h1" in source)
- [ ] Multiple `<h2>` tags for section headings
- [ ] `alt` attributes on all images
- [ ] Business name, city, and main service appear in body text
- [ ] Page loads in under 3 seconds (check pagespeed.web.dev)

### Google Business Profile Connection (if applicable):
- [ ] Website URL matches what is on Google Business Profile
- [ ] Business address on website matches Google Business Profile exactly
- [ ] Phone number on website matches Google Business Profile

---

## 💬 7. WhatsApp Integration Checklist

- [ ] WhatsApp floating button is visible on all pages
- [ ] Button is positioned correctly (bottom right, does not cover content)
- [ ] Button has WhatsApp icon (green, recognizable)
- [ ] Clicking/tapping opens WhatsApp with correct number
- [ ] Number format is correct: `+91XXXXXXXXXX` (country code included)
- [ ] Pre-filled message is helpful (e.g., "Hello! I found your website and have an enquiry.")
- [ ] Button works on desktop (opens web.whatsapp.com or WhatsApp app)
- [ ] Button works on mobile (opens WhatsApp app directly)
- [ ] WhatsApp link format is correct:
  ```
  https://wa.me/91XXXXXXXXXX?text=Hello%20I%20found%20your%20website
  ```
- [ ] Test the actual WhatsApp link by clicking it yourself

---

## 🗺️ 8. Google Business Profile Checklist

*(For clients who have signed up for GBP optimization as part of their package)*

### Profile Completeness:
- [ ] Business name matches exactly (no extra words or wrong spelling)
- [ ] Business category is correct (e.g., "Electronics store", "Restaurant")
- [ ] Address is complete and correct
- [ ] Phone number added
- [ ] Website URL added (their new GitHub Pages URL)
- [ ] Business hours added (all 7 days)
- [ ] Business description written (keyword-rich, 750 character limit)

### Photos:
- [ ] Cover photo uploaded (1080x608px recommended)
- [ ] Logo uploaded (250x250px)
- [ ] At least 5 interior/product/team photos uploaded
- [ ] All photos high quality (not blurry)

### Posts & Reviews:
- [ ] At least 1 Google Post created (announcing website launch is a good first post)
- [ ] Business has asked at least 3–5 existing customers to leave reviews
- [ ] Review link shared with client (via Google Business Profile → Get more reviews)

### Verification:
- [ ] Business is verified on Google (postcard or video verification done)
- [ ] Profile shows "Verified" badge

---

## 🤝 9. Final Client Approval Checklist

*Do this on Day 6 or early Day 7, before requesting balance payment.*

### Prepare for Client Review:
- [ ] Send client the final preview link
- [ ] Provide clear instructions on what to check
- [ ] Set a deadline for feedback (24 hours)

### Client Approval Message (WhatsApp):
```
Namaste [Name]! 🙏

Your website is ready for final approval!

🔗 Final Preview: [URL]

Please check on your mobile phone also.

Review this:
1️⃣ Is all your business information correct?
2️⃣ Are you happy with the design?
3️⃣ Any final small changes needed?

Once you reply "Approved ✅", I will prepare your complete handover package!

Thank you for your patience — it's been a pleasure working on this! 😊
```

### After Client Approval:
- [ ] Client has responded "Approved" (save this WhatsApp message as record)
- [ ] Date and time of approval noted
- [ ] No outstanding revision requests
- [ ] Request balance payment
- [ ] Prepare handover document

---

## 📊 QA Sign-Off

```
PROJECT: _______________________
CLIENT: ________________________
QA DATE: _______________________

DESIGN QUALITY:          ✅ Pass / ❌ Fail
CONTENT QUALITY:         ✅ Pass / ❌ Fail
SEO BASICS:              ✅ Pass / ❌ Fail
TECHNICAL QUALITY:       ✅ Pass / ❌ Fail
CROSS-BROWSER:           ✅ Pass / ❌ Fail
MOBILE TESTING:          ✅ Pass / ❌ Fail
WHATSAPP INTEGRATION:    ✅ Pass / ❌ Fail
PAGESPEED SCORE:         Mobile: ___ / Desktop: ___
CLIENT APPROVAL:         ✅ Received / ⏳ Pending

READY FOR DELIVERY:  ✅ YES  /  ❌ NO (fix issues first)

Notes / Issues Found:
_________________________________________
_________________________________________
```

---

*Document Version: 1.0 | Created: November 2026 | Owner: Kanth Web Solutions*

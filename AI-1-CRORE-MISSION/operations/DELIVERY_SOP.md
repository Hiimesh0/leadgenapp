# 🚀 Standard Operating Procedures — Website Delivery
**AI-Powered Business Websites | Kanth Web Solutions, Gujarat**

---

## 🗓️ The 7-Day Delivery Model

| Day | Phase | Key Activities | Output |
|-----|-------|---------------|--------|
| Day 1 | Kickoff & Collection | Welcome client, kickoff call, collect assets | All assets received |
| Day 2 | Planning & Content | Structure site, write/edit all content with AI | Content document ready |
| Day 3 | Design & Build | Build HTML/CSS/JS, set up structure and layout | Working local site |
| Day 4 | Integration & Preview | Add all content, WhatsApp button, deploy preview | Preview link sent |
| Day 5 | Review & Revision | Client reviews, collect feedback, make changes | Revision complete |
| Day 6 | QA & Polish | Full quality check, cross-browser, mobile test | QA sign-off |
| Day 7 | Launch & Handover | Deploy final site, send handover doc, collect payment | Project closed ✅ |

---

## 📅 Day-by-Day Detailed SOP

---

### DAY 1 — Kickoff & Asset Collection

**Morning Tasks:**
1. Send WhatsApp welcome message to client
2. Send email welcome (formal record)
3. Share brand assets checklist on WhatsApp
4. Schedule kickoff call for today or tomorrow morning

**Kickoff Call (15–20 min):**
- Confirm project scope and delivery date
- Review intake form answers
- Clarify design preferences
- Set asset submission deadline (end of Day 1)

**Setup Tasks:**
- [ ] Create GitHub repository: `[clientid]-[businessname]-website`
  - Go to github.com → New Repository → Public → Add README
- [ ] Create local project folder: `projects/KWS-00X-BusinessName/`
- [ ] Add to CLIENT_TRACKER.csv
- [ ] Create subfolder structure:
  ```
  KWS-00X-BusinessName/
  ├── assets/        (images from client)
  ├── images/        (optimized images for site)
  ├── content/       (text content doc)
  └── website/       (actual HTML/CSS/JS files)
  ```

**End of Day 1 Check:**
- [ ] All client assets received (or follow up on WhatsApp)
- [ ] GitHub repo created
- [ ] Project folder set up
- [ ] Kickoff call done

**Tools Used Today:**
- WhatsApp (client communication)
- Gmail (formal email)
- GitHub.com (repository creation)
- Google Drive or local folder (asset storage)

---

### DAY 2 — Planning & Content Creation

**Morning: Plan the Website Structure**
1. Decide on sections based on client's business type:
   - Standard: Hero → About → Services → Why Us → Testimonials → Contact
   - Restaurant: Hero → Menu → Gallery → Hours → Location → Contact
   - Shop: Hero → Products → About → Gallery → Contact
2. Create a simple wireframe sketch (paper is fine)
3. Note which sections need which client content

**Content Creation with AI (Gemini/ChatGPT):**

Use this prompt template in Gemini or ChatGPT:
```
I am building a professional website for a [type of business] in Gujarat, India.
Business name: [Name]
Services: [List]
Target customers: [Description]
Unique selling point: [What client said]

Please write:
1. A compelling hero section headline and subheadline (in English)
2. An About Us paragraph (3-4 sentences, warm and professional)
3. Short descriptions for each service (2-3 sentences each)
4. A "Why Choose Us" section with 4 bullet points
5. A call-to-action for the bottom of the page

Make it sound professional, trustworthy, and locally relevant to Gujarat.
```

**Content Tasks:**
- [ ] Write/generate all section text using AI
- [ ] Review and edit AI content — add client-specific details
- [ ] Save final content to `content/website-content.txt`
- [ ] Optimize/resize client photos using Squoosh (squoosh.app — free)
- [ ] Save optimized images to `images/` folder

**End of Day 2 Check:**
- [ ] All written content finalized and saved
- [ ] All images optimized (under 200KB each)
- [ ] Website structure planned and mapped

**Tools Used Today:**
- Google Gemini (gemini.google.com) — free, content writing
- ChatGPT (chatgpt.com) — free, alternative for content
- Squoosh (squoosh.app) — free, image optimization
- VS Code or Notepad++ — content editing

---

### DAY 3 — Design & Development (Build the Website)

**Setup the HTML Template:**

Start with this base structure for every project:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="[Business description — 150 chars]">
    <title>[Business Name] | [City] | [Main Service]</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- HEADER / NAV -->
    <!-- HERO SECTION -->
    <!-- ABOUT SECTION -->
    <!-- SERVICES SECTION -->
    <!-- WHY CHOOSE US -->
    <!-- TESTIMONIALS -->
    <!-- CONTACT SECTION -->
    <!-- FOOTER -->
    <!-- WHATSAPP FLOATING BUTTON -->
    <script src="script.js"></script>
</body>
</html>
```

**Use AI to Generate Code:**

Prompt for Gemini/ChatGPT:
```
Create a complete, professional, mobile-responsive HTML website for:
Business: [Name]
Type: [Industry]
Color scheme: [Primary color] and white
Sections needed: Hero, About, Services (list them), Contact
WhatsApp number: [Number with country code — 91XXXXXXXXXX]

Requirements:
- Pure HTML, CSS, JS (no frameworks)
- Mobile-first responsive design
- Floating WhatsApp button that opens chat
- Contact form (no backend needed, just styled)
- Clean, modern design
- Google Fonts (choose appropriate font)
- Smooth scroll navigation
- Footer with copyright

Make it production-ready.
```

**Development Steps:**
1. Generate base template with AI
2. Paste into VS Code, save as `index.html` and `style.css`
3. Test locally by opening `index.html` in Chrome
4. Fill in all the content from Day 2 content document
5. Add client logo and images to correct sections
6. Adjust colors to match client's brand

**End of Day 3 Check:**
- [ ] All sections built and styled
- [ ] Logo and images added
- [ ] All content from Day 2 inserted
- [ ] Site opens correctly in Chrome
- [ ] WhatsApp button present and styled

**Tools Used Today:**
- VS Code (code editor — free)
- Google Chrome (testing)
- Google Gemini / ChatGPT (code generation)
- Google Fonts (fonts.google.com — free)

---

### DAY 4 — Integration, Testing & Preview Deployment

**Morning: Integration & Polish**
- [ ] Add WhatsApp floating button (verify number is correct with `+91`)
- [ ] Test all navigation links scroll to correct sections
- [ ] Add Google Maps embed for client's address (maps.google.com → Share → Embed)
- [ ] Check all phone numbers are clickable (`<a href="tel:+91XXXXXXXXXX">`)
- [ ] Verify email address is correct
- [ ] Add favicon (use favicon.io to generate from logo — free)

**Deploy to GitHub Pages for Preview:**

Step-by-step:
```
1. Open GitHub Desktop (or use github.com directly)
2. Open your repository for this client
3. Upload all website files:
   - Go to repository on github.com
   - Click "Add file" → "Upload files"
   - Drag and drop: index.html, style.css, script.js, images/ folder
   - Commit message: "Initial website build"
   - Click "Commit changes"

4. Enable GitHub Pages:
   - Go to repository → Settings
   - Left sidebar: click "Pages"
   - Source: "Deploy from a branch"
   - Branch: "main" → folder: "/ (root)"
   - Click Save

5. Wait 2-3 minutes — your site will be live at:
   https://[your-github-username].github.io/[repository-name]/
```

**Send Preview to Client:**

WhatsApp message:
```
Namaste [Name]! 🙏

Great news — your website preview is ready!

🔗 Preview Link: [GitHub Pages URL]

Please open this on both your mobile and computer.

I need your feedback by tomorrow [Date] so we can make changes and stay on schedule.

Please check:
✅ Is all your information correct?
✅ Do you like the design?
✅ Any changes needed?

WhatsApp me your feedback anytime! 😊
```

**End of Day 4 Check:**
- [ ] Site deployed to GitHub Pages
- [ ] Preview link works on mobile and desktop
- [ ] WhatsApp button tested (opens chat correctly)
- [ ] Preview link sent to client with clear instructions

**Tools Used Today:**
- GitHub.com (deployment)
- favicon.io (favicon generation — free)
- Google Maps (embed code)
- WhatsApp (client communication)

---

### DAY 5 — Client Review & Revisions

**Morning: Await Client Feedback**
- If no feedback by 11 AM, send a gentle WhatsApp reminder:
  ```
  Namaste [Name]! Just checking — did you get a chance to review your website preview? 😊
  Looking forward to your feedback so we can finalize everything!
  ```

**Collecting Feedback:**
- Ask client to list changes clearly: "Please number them: 1, 2, 3..."
- Clarify anything vague before starting changes
- Remind client: up to 2 revision rounds included

**Making Revisions:**
- Work through feedback systematically, one item at a time
- Test each change before moving to next
- For content changes: update directly in HTML
- For design changes: update CSS

**After Revisions:**
- Re-deploy to GitHub Pages (upload updated files)
- Send confirmation WhatsApp:
  ```
  Hi [Name]! I've made all your requested changes. 
  Please review the updated site: [Link]
  Let me know if everything looks good! 👍
  ```

**End of Day 5 Check:**
- [ ] All client feedback received and implemented
- [ ] Updated site re-deployed
- [ ] Client has confirmed Round 1 revisions received
- [ ] No major pending changes

**Tools Used Today:**
- VS Code (code edits)
- GitHub.com (re-deploy)
- WhatsApp (communication)

---

### DAY 6 — Full Quality Assurance

**Run the complete QUALITY_CHECKLIST.md today.**

**QA Testing Steps:**
1. Open site in Chrome → test all interactions
2. Open Chrome DevTools (F12) → Mobile view → test at 375px (iPhone) and 768px (tablet)
3. Check all links: navigation, social media, phone, email
4. Test WhatsApp button: does it open the correct number?
5. Test contact form: does it display correctly?
6. Check page load speed: pagespeed.web.dev (free)
7. Check SEO: verify title tag and meta description
8. Open in Firefox (if available) and check layout

**Final Content Review:**
- [ ] Read every word on the site — no typos
- [ ] All prices correct (or removed if "Call for Quote")
- [ ] Business hours correct
- [ ] Address correct and map pointing to right location
- [ ] All photos loading (not broken)
- [ ] Copyright year correct in footer

**Get Client's Final Approval:**
WhatsApp message:
```
Hi [Name]! Your website is ready for final approval! 🎉

Please do a final review: [Link]

Once you confirm "Approved ✅", I will:
1. Finalize everything
2. Send you all login details
3. Share your handover document

Looking good — nearly there! 😊
```

**End of Day 6 Check:**
- [ ] Full quality checklist completed
- [ ] Page speed score above 70 on mobile
- [ ] No broken links or images
- [ ] Final approval requested from client

**Tools Used Today:**
- Google PageSpeed Insights (pagespeed.web.dev — free)
- Chrome DevTools (built into Chrome — free)
- W3C Validator (validator.w3.org — free)

---

### DAY 7 — Launch & Handover

**Morning: Receive Final Payment**
- Confirm client has approved the site
- Request balance payment before sharing login details
- WhatsApp message:
  ```
  Namaste [Name]! 🙏
  Your website is approved and ready to launch!
  
  Balance payment: ₹[Amount]
  Payment details: [UPI ID / Bank details]
  
  Once payment is received, I'll immediately send you:
  ✅ All login details
  ✅ Complete handover document
  ✅ Tips for keeping your site updated
  
  Thank you for trusting us! 🙏
  ```

**On Payment Receipt:**
1. Confirm payment received
2. Take final screenshots of the live website
3. Fill out CLIENT_HANDOVER.md template for this client
4. Update CLIENT_TRACKER.csv — Status: Delivered, Payment: Complete

**Send Handover Package via WhatsApp + Email:**
- Send CLIENT_HANDOVER.md (as PDF or in email)
- Send GitHub repository link and login details
- Brief video walkthrough (record your screen on phone — optional but impressive)

**Post-Launch:**
- [ ] Payment received and confirmed
- [ ] Handover document sent
- [ ] Ask for Google review (politely):
  ```
  [Name], working with you was a pleasure! 😊
  If you're happy with the result, a quick Google review would mean the world to us:
  [Google Business Profile link]
  Thank you so much! 🙏
  ```
- [ ] Schedule 30-day check-in reminder in your calendar
- [ ] Update CLIENT_TRACKER.csv fully
- [ ] Ask for a referral:
  ```
  Also, if you know any other business owners who need a website, 
  please refer them to us! We offer a ₹500 referral bonus for successful projects. 🎁
  ```

**End of Day 7 Check:**
- [ ] Payment 100% received
- [ ] Handover document delivered
- [ ] Google review requested
- [ ] Referral asked
- [ ] Tracker updated
- [ ] 30-day check-in scheduled

---

## 🤖 How to Use AI Tools to Speed Up Work

### Best Prompts for Common Tasks

**Writing "About Us" section:**
```
Write a professional About Us section for [Business Name], a [type] in [city], Gujarat. 
They have been in business for [X] years. They specialize in [services]. 
Their main customers are [target audience]. Keep it warm, trustworthy, under 100 words.
```

**Writing service descriptions:**
```
Write 5 service descriptions for a [industry] business. 
Services: [list]. Each description: 2 sentences, benefit-focused, professional tone.
```

**Generating HTML sections:**
```
Write the HTML and CSS for a [section name] section for a professional business website.
Color: [hex code]. Include: [elements needed]. Must be mobile responsive.
```

**Fixing bugs:**
```
This HTML/CSS code has a problem — [describe problem]. Here is the code: [paste code].
Please fix it and explain what was wrong.
```

---

## 📤 Final Delivery Checklist

Before marking any project as "Delivered":

### Website
- [ ] All content accurate and proofread
- [ ] Mobile responsive (tested on real phone)
- [ ] WhatsApp button working with correct number
- [ ] Contact form styled and functional
- [ ] All images loading, no broken images
- [ ] Page speed score 70+ on mobile (pagespeed.web.dev)
- [ ] Title tag and meta description set
- [ ] Footer copyright year correct
- [ ] Social media links working

### GitHub Pages
- [ ] Site live at correct URL
- [ ] URL tested and loading correctly
- [ ] Repository named appropriately

### Handover
- [ ] CLIENT_HANDOVER.md filled out for this client
- [ ] GitHub login/repo details documented
- [ ] Handover document sent via email + WhatsApp
- [ ] Balance payment received

### Tracker
- [ ] CLIENT_TRACKER.csv updated with delivery date
- [ ] Status set to "Delivered"
- [ ] Payment status set to "Complete"

---

## 🔧 Post-Delivery Support Protocol

### 30-Day Included Support
- Minor text changes: handle within 24 hours
- Minor image swaps: handle within 24 hours
- Bug fixes: handle within 48 hours
- "How do I..." questions: answer on WhatsApp

### What Is NOT Included (Charge Extra)
- Adding new sections or pages
- Redesigning the layout
- New features (booking system, e-commerce, etc.)
- After 30-day period ends

### Pricing for Extra Work (Post-Delivery)
- Minor text/image update: ₹200–500
- New page: ₹1,000–2,000
- New feature: Quote separately
- Monthly maintenance retainer: ₹1,000/month

### How to Handle Support Requests
1. Client messages on WhatsApp
2. Assess: Is it covered under 30-day support?
   - Yes → Fix it, no charge, send confirmation
   - No → Explain politely, quote price, get approval first
3. Make the fix
4. Send confirmation WhatsApp with "Fixed! ✅"
5. Log in tracker Notes column

---

*Document Version: 1.0 | Created: November 2026 | Owner: Kanth Web Solutions*

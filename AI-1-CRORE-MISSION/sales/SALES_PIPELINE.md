# 🔄 SALES PIPELINE MANAGEMENT SYSTEM
**Mission:** AI-1-Crore Business Execution  
**Target:** ₹1,00,000 in 30 Days | ₹1,00,00,000 in 365 Days  
**Owner:** Kanth & AI Agent Team  

---

## 1. PIPELINE OVERVIEW & STAGES

The sales pipeline is the operational engine that transforms unreached local business owners into paying, delighted clients. Every prospect must move through structured, predictable stages.

```
[STAGE 1: LEAD]
      │
      ▼ (Qualification criteria met)
[STAGE 2: QUALIFIED]
      │
      ▼ (Demo link/mockup shared & reviewed)
[STAGE 3: DEMO PRESENTED]
      │
      ▼ (Custom proposal delivered)
[STAGE 4: PROPOSAL SENT]
      │
      ▼ (Scope/pricing alignment)
[STAGE 5: NEGOTIATION]
      │
      ├──▶ [STAGE 6A: WON (50% Advance Received)]
      │
      └──▶ [STAGE 6B: LOST (Logged with reason)]
```

### Stage Definitions & Exit Criteria

| Stage ID | Stage Name | Definition & Entry Point | Exit Criteria to Next Stage | Probability Weight |
|---|---|---|---|---|
| **S1** | **Lead (Identified)** | Business identified via Google Maps, walk-in, warm contact, or IndiaMART. Has no website or outdated site. | Verified owner contact (WhatsApp/phone) + business category confirmed active. | 10% |
| **S2** | **Qualified** | First contact initiated. Verified pain point (losing customers, outdated site, manual WhatsApp handling). | Prospect expresses curiosity or agrees to view sample demo / audit. | 25% |
| **S3** | **Demo Presented** | Niche-specific demo link (e.g. Mehta Clinic demo) or 3-minute Loom video / PDF audit presented via WhatsApp. | Prospect acknowledges demo and asks about pricing, packages, or specific customization. | 50% |
| **S4** | **Proposal Sent** | Formal 2-page proposal delivered with 3 tier options (Starter ₹15K, Growth ₹28K, Premium ₹48K) + 7-day timeline. | Prospect confirms receipt and requests meeting, phone call, or price negotiation. | 70% |
| **S5** | **Negotiation** | Objections addressed, package selected, payment terms confirmed (50% advance / 50% on completion). | Advance payment link or UPI QR code sent. | 85% |
| **S6-W** | **Closed Won** | **50% advance payment received in bank/UPI.** Welcome onboarding message sent. | Project handed over to Operations Agent. | 100% |
| **S6-L** | **Closed Lost** | Prospect explicitly declines, stops responding after 4 follow-ups, or opts for internal solution. | Reason logged in `LEAD_TRACKER.csv` for post-mortem analysis. | 0% |

---

## 2. REVENUE FORECAST FORMULA & MATHEMATICS

To accurately predict revenue without self-delusion, use **Weighted Pipeline Value (WPV)**:

$$\text{Weighted Pipeline Value} = \sum (\text{Deal Value}_i \times \text{Stage Probability}_i)$$

### Example 30-Day Pipeline Snapshot:
| Stage | Active Deals | Avg Deal Value | Stage Probability | Weighted Expected Cash |
|---|---|---|---|---|
| S1: Lead | 25 | ₹25,000 | 10% | ₹62,500 |
| S2: Qualified | 10 | ₹25,000 | 25% | ₹62,500 |
| S3: Demo Presented | 6 | ₹25,000 | 50% | ₹75,000 |
| S4: Proposal Sent | 4 | ₹25,000 | 70% | ₹70,000 |
| S5: Negotiation | 2 | ₹25,000 | 85% | ₹42,500 |
| **Total Pipeline** | **47 prospects** | **₹11,75,000** | — | **₹3,12,500 Weighted** |

> **Crucial Rule:** To collect **₹1,00,000 in cash**, you need at least **₹3,00,000 in weighted pipeline**, or roughly 4 closed deals at ₹25,000 average order value (AOV).

---

## 3. HOW TO CALCULATE CONVERSION RATES

Monitor conversion efficiency weekly using these standard ratios:

1. **Lead-to-Qualified Rate (LQR):**
   $$\text{LQR} = \frac{\text{Qualified Prospects}}{\text{Total Leads Contacted}} \times 100$$
   *Benchmark:* 20%–35% (Warm leads: 60%–80%)

2. **Demo-to-Proposal Rate (DPR):**
   $$\text{DPR} = \frac{\text{Proposals Sent}}{\text{Demos Presented}} \times 100$$
   *Benchmark:* 50%–65%

3. **Proposal-to-Close Rate (Win Rate):**
   $$\text{Win Rate} = \frac{\text{Closed Won Deals}}{\text{Total Proposals Sent}} \times 100$$
   *Benchmark:* 30%–45%

4. **Overall Sales Velocity (Time to Close):**
   - From initial contact to advance collection: Target **7 to 14 calendar days** for Gujarat SMBs.

---

## 4. WEEKLY PIPELINE AUDIT CHECKLIST

Run this 15-minute checklist every Monday morning at 09:30 AM IST:

- [ ] **Clean the Stale Leads:** Has any lead in Stage 2 or 3 sat without communication for > 5 business days? Send Breakup Template or mark *Paused*.
- [ ] **Check Proposal Expiry:** Are any proposals older than 7 calendar days? Send urgency message ("Launch discount valid until Thursday").
- [ ] **Advance Payment Verification:** Are any signed clients pending advance transfer? Do NOT begin production code until advance reflects in account.
- [ ] **Top-of-Funnel Health:** Are there at least 15 new leads added to `LEAD_TRACKER.csv` this week? If not, schedule a 90-minute Google Maps prospecting sprint.
- [ ] **Update Metrics:** Calculate total active pipeline and update `reports/DAILY_DASHBOARD.md`.

---

## 5. DIAGNOSING PIPELINE BOTTLENECKS & CORRECTIVE ACTIONS

When revenue targets are missed, diagnose the exact leak in the funnel:

### Problem 1: High outreach, zero replies (Stuck at Stage 1)
- **Root Cause:** Irrelevant messaging, generic corporate tone, or targeting businesses with low pain.
- **Fix:** Switch from text email to WhatsApp 45-second voice notes or a 1-minute screencast showing their competitors' Google Maps presence. Use Gujarati/Hinglish greetings ("Kem chho, Patel bhai").

### Problem 2: Prospects love the demo, but balk at proposal (Stuck at Stage 3/4)
- **Root Cause:** Price shock or failure to demonstrate tangible financial ROI.
- **Fix:** Anchor high with the ₹50,000 package first, then introduce the ₹15,000–₹22,000 Starter package as an accessible "pilot". Frame cost in customer value: *"Just 2 new clinic patients pays for this entire website forever."*

### Problem 3: Deals stall in negotiation ("Vichar karine kahiye" / Will think & tell)
- **Root Cause:** Lack of urgency, fear of making a wrong tech decision, or consulting family members.
- **Fix:** Offer a limited-time incentive: *"If we initiate this week, I will include free Google Business Profile SEO optimization worth ₹5,000 at zero extra cost."* Offer split payment: 40% advance, 30% on demo review, 30% on final launch.

### Problem 4: High volume of inquiries, but non-paying "time wasters"
- **Root Cause:** Prospecting hobbyists or micro-vendors earning under ₹5 lakh/year who cannot afford ₹15,000.
- **Fix:** Disqualify earlier. Check physical storefront location, number of staff, and Google review volume prior to reaching out. Target businesses with 20+ Google reviews and active commercial spaces.

---

## 6. INTEGRATION WITH WORKSPACE TOOLS

- All active leads are recorded and tracked in [LEAD_TRACKER.csv](file:///c:/Users/kanth/Desktop/business/AI-1-CRORE-MISSION/sales/LEAD_TRACKER.csv).
- Outreach scripts for each pipeline movement are referenced in [OUTREACH_TEMPLATES.md](file:///c:/Users/kanth/Desktop/business/AI-1-CRORE-MISSION/sales/OUTREACH_TEMPLATES.md).
- Detailed objections handling for Stage 5 is documented in [SALES_PLAYBOOK.md](file:///c:/Users/kanth/Desktop/business/AI-1-CRORE-MISSION/sales/SALES_PLAYBOOK.md).


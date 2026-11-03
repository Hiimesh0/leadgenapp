# DESIGN SYSTEM
## Aurelia Dental Studio — Brand & UI Design System
**Version:** 1.0 | **Created:** 2026-11-03 | **Status:** Production

---

> This design system governs every visual and interactive element of the Aurelia Dental Studio website. All UI components must reference this document to maintain consistency.

---

## 1. BRAND IDENTITY

### Clinic Name
**AURELIA DENTAL STUDIO**

### Brand Promise
*"Where expert care meets exceptional comfort — creating confident smiles for Surat's families and professionals."*

### Tagline
**"Dentistry Reimagined."**

### Personality Traits
| Trait | Expression |
|---|---|
| Premium | Never cheap; generous spacing, quality typography |
| Trustworthy | Evidence-based claims only; transparent process |
| Warm | Ivory/sage palette; human photography; empathetic copy |
| Calm | No urgent CTAs, no flashing elements, restrained animations |
| Precise | Pixel-perfect alignment; consistent spacing grid |

### Logo Concept
SVG wordmark: "AURELIA" in DM Serif Display + a small laurel leaf accent (representing excellence and nature). "DENTAL STUDIO" in Inter, uppercase, tracked widely, in sage green below the main wordmark.

---

## 2. COLOR SYSTEM

### Primary Palette

| Token | Name | Hex | Usage |
|---|---|---|---|
| `--color-primary` | Forest Green | `#1B4332` | Primary buttons, key headings, nav links |
| `--color-primary-light` | Sage Medium | `#2D6A4F` | Hover states, secondary headings |
| `--color-primary-subtle` | Sage Light | `#84A98C` | Borders, dividers, icon fills |
| `--color-accent` | Warm Gold | `#C9A96E` | Highlight accents, decorative elements, active states |
| `--color-accent-light` | Pale Gold | `#F0E6D3` | Accent backgrounds, badge backgrounds |

### Neutral Palette

| Token | Name | Hex | Usage |
|---|---|---|---|
| `--color-bg` | Warm Ivory | `#FAFAF7` | Page background |
| `--color-bg-soft` | Linen | `#F4F0E8` | Section alternating backgrounds |
| `--color-bg-muted` | Sage Tint | `#EEF2EE` | Card backgrounds, form backgrounds |
| `--color-surface` | Pure White | `#FFFFFF` | Card surfaces, modal backgrounds |
| `--color-border` | Warm Gray | `#E8E4DC` | All borders, dividers |

### Text Palette

| Token | Name | Hex | Usage |
|---|---|---|---|
| `--color-text-primary` | Deep Charcoal | `#1A1A1A` | Primary body text, headings |
| `--color-text-secondary` | Warm Gray | `#5C5C5C` | Secondary text, captions |
| `--color-text-muted` | Light Gray | `#9A9A9A` | Placeholder text, disabled states |
| `--color-text-inverse` | Ivory | `#FAFAF7` | Text on dark/green backgrounds |

### Semantic Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-success` | `#2D6A4F` | Success messages (matches brand green) |
| `--color-error` | `#C0392B` | Form errors, alerts |
| `--color-warning` | `#C9A96E` | Warnings (matches accent gold) |
| `--color-info` | `#2980B9` | Informational notes |

---

## 3. TYPOGRAPHY

### Font Stack

```css
--font-heading: 'DM Serif Display', Georgia, serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Sources:** Both fonts available free from Google Fonts with SIL OFL license (commercial use permitted).

### Type Scale

| Token | Size | Line Height | Weight | Font | Usage |
|---|---|---|---|---|---|
| `--text-display` | `clamp(3rem, 6vw, 5.5rem)` | 1.05 | 400 | DM Serif Display | Hero H1 |
| `--text-h1` | `clamp(2.25rem, 4vw, 3.5rem)` | 1.15 | 400 | DM Serif Display | Page titles |
| `--text-h2` | `clamp(1.75rem, 3vw, 2.75rem)` | 1.2 | 400 | DM Serif Display | Section headings |
| `--text-h3` | `clamp(1.25rem, 2vw, 1.75rem)` | 1.3 | 600 | Inter | Card headings |
| `--text-h4` | `1.125rem` | 1.4 | 600 | Inter | Sub-headings |
| `--text-body-lg` | `1.125rem` | 1.7 | 400 | Inter | Lead paragraphs |
| `--text-body` | `1rem` | 1.65 | 400 | Inter | Body copy |
| `--text-sm` | `0.875rem` | 1.55 | 400 | Inter | Captions, labels |
| `--text-xs` | `0.75rem` | 1.5 | 500 | Inter | Tags, metadata |

### Typography Rules
- **Headlines:** DM Serif Display, italic where elegant emphasis is needed
- **Never use more than 2 weights per page section**
- **Maximum line length:** 70 characters for body text
- **Minimum contrast:** 4.5:1 for all text on background

---

## 4. SPACING SYSTEM

An 8px base grid. All spacing values are multiples of 8.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `8px` | Inline micro-spacing |
| `--space-2` | `16px` | Component internal padding |
| `--space-3` | `24px` | Card padding, section internal |
| `--space-4` | `32px` | Small gap between elements |
| `--space-5` | `48px` | Medium section spacing |
| `--space-6` | `64px` | Large section gaps |
| `--space-7` | `80px` | Section vertical padding (mobile) |
| `--space-8` | `96px` | Section vertical padding (desktop) |
| `--space-9` | `128px` | Major section separators |

---

## 5. COMPONENT LIBRARY

### Buttons

```
PRIMARY BUTTON
Background: --color-primary (#1B4332)
Text: --color-text-inverse (#FAFAF7)
Border-radius: 999px (pill shape)
Padding: 14px 32px
Font: Inter 500, 0.9375rem
Hover: --color-primary-light (#2D6A4F), translateY(-1px), box-shadow

SECONDARY BUTTON (Ghost)
Background: transparent
Border: 1.5px solid --color-primary
Text: --color-primary
Border-radius: 999px
Hover: background fills with --color-primary, text inverts

ACCENT BUTTON
Background: --color-accent (#C9A96E)
Text: #1A1A1A (dark)
Border-radius: 999px
Use: Appointment CTA, high-priority actions

TEXT LINK
Color: --color-primary
Underline: none (underline on hover via border-bottom)
```

### Cards

```
SERVICE CARD
Background: --color-surface (#FFFFFF)
Border: 1px solid --color-border (#E8E4DC)
Border-radius: 16px
Padding: 32px
Hover: border-color → --color-primary-subtle, translateY(-4px), shadow-md
Icon: 48x48, color --color-primary

TEAM CARD
Border-radius: 20px (image top) + 16px (full card)
Image: 280x340px, object-fit: cover
Name: --text-h3
Title: --text-sm, --color-accent
Background: --color-surface

TESTIMONIAL CARD
Background: --color-bg-soft (#F4F0E8)
Border-left: 4px solid --color-accent
Padding: 32px
Quote mark: DM Serif Display, 4rem, --color-accent, opacity 0.4
```

### Forms

```
INPUT FIELDS
Background: --color-surface
Border: 1.5px solid --color-border
Border-radius: 10px
Padding: 14px 18px
Font: Inter, 1rem
Focus: border-color → --color-primary, box-shadow: 0 0 0 3px rgba(27,67,50,0.12)
Error: border-color → --color-error

LABELS
Font: Inter 500, 0.875rem, --color-text-primary
Margin-bottom: 8px

SELECT / DROPDOWN
Same styling as inputs
Custom arrow via SVG background

CHECKBOX
Custom styled: 18x18px, border-radius: 4px
Checked: background --color-primary, white checkmark
```

---

## 6. BORDER RADIUS SYSTEM

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `6px` | Badges, tags |
| `--radius-md` | `10px` | Inputs, small cards |
| `--radius-lg` | `16px` | Cards, modals |
| `--radius-xl` | `24px` | Feature cards, hero elements |
| `--radius-pill` | `999px` | Buttons, pills |

---

## 7. SHADOW SYSTEM

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` | Subtle card lift |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.1)` | Card hover, dropdowns |
| `--shadow-lg` | `0 10px 40px rgba(0,0,0,0.12)` | Modals, featured sections |
| `--shadow-green` | `0 8px 24px rgba(27,67,50,0.2)` | Primary button hover |

---

## 8. RESPONSIVE BREAKPOINTS

| Name | Width | Description |
|---|---|---|
| `xs` | `375px` | Small mobile (iPhone SE) |
| `sm` | `430px` | Standard mobile (iPhone 14 Pro) |
| `md` | `768px` | Tablet portrait |
| `lg` | `1024px` | Tablet landscape / small laptop |
| `xl` | `1280px` | Desktop |
| `2xl` | `1440px` | Wide desktop |
| `3xl` | `1920px` | Ultra-wide |

**Mobile-first CSS approach:** Base styles target mobile; media queries add desktop refinements.

---

## 9. ANIMATION & INTERACTION

### Principles
- **Purposeful:** Every animation must serve a UX function (draw attention, confirm action, aid navigation)
- **Subtle:** Maximum duration of 0.4s for most transitions
- **No autoplay video** unless muted and clearly controlled
- **No loading spinners** on initial page load

### Tokens

```css
--transition-fast: 0.15s ease;
--transition-base: 0.25s ease;
--transition-slow: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### Approved Animations
- **Fade + slide up:** Section elements on scroll entry (translateY 20px → 0, opacity 0 → 1)
- **Button press:** `scale(0.97)` on mousedown
- **Card hover:** `translateY(-4px)` + shadow increase
- **Nav underline:** Width 0 → 100% on hover
- **Form focus ring:** Box-shadow expand

### Forbidden Animations
- Parallax scrolling (performance and accessibility)
- Auto-playing carousels
- Continuous looping animations
- Pop-up overlays on entry

---

## 10. ICON SYSTEM

**Library:** Lucide Icons (MIT license, commercially usable)  
**Style:** Outlined, 1.5px stroke weight  
**Sizes:** 16px (inline), 20px (nav), 24px (cards), 32px (feature sections), 48px (hero features)  
**Color:** Inherits from text color or explicitly set to `--color-primary`

---

## 11. PHOTOGRAPHY GUIDELINES

**For the demo, use Unsplash images with verified free license.**

| Context | Style | Avoid |
|---|---|---|
| Hero | Confident smiling person in warm, lifestyle setting | Dental chair close-ups |
| Services | Clean, abstract macro or elegant dental tools | Intimidating clinical imagery |
| Team | Warm, professional headshot in clinic or natural light | Generic stock "doctor" photos |
| Interior | Modern, warm-lit clinic spaces | Cold fluorescent-lit treatment rooms |
| Patient stories | Smiling people in real-life contexts (family, work, social) | Medical procedure imagery |

**Suggested Unsplash search terms:**
- `confident woman smiling` / `confident man smiling`
- `modern dental office interior warm`
- `doctor portrait professional warm light`
- `family smiling natural light`

---

## 12. PAGE LAYOUT SYSTEM

### Container Widths
```
max-width: 1280px (content sections)
max-width: 1440px (full-bleed backgrounds)
padding: 0 clamp(16px, 5vw, 96px)
```

### Grid System
```
desktop: 12 columns, 24px gap
tablet: 6 columns, 16px gap
mobile: 4 columns, 12px gap
```

---

## 13. ACCESSIBILITY STANDARDS

- **WCAG 2.1 AA** compliance minimum
- All color combinations pass 4.5:1 contrast ratio
- Focus indicators on all interactive elements (3px ring, --color-primary)
- All images have descriptive alt text
- All forms have associated labels
- Semantic HTML5 structure (main, nav, aside, section, article, header, footer)
- ARIA labels for icon-only buttons
- Skip to main content link as first focusable element
- Keyboard navigation for all menu and carousel items

---

*Design System approved: 2026-11-03 | Next review: After first client customization*


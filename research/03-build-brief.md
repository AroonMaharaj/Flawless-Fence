# Phase 3: Build Brief -- Flawless Fence Premium Website

> **Client:** Flawless Fence (Owner: Mike)
> **Location:** Mississauga, Ontario -- serving western GTA (Toronto, Oakville, Brampton, Milton)
> **Phone:** (416) 419-1721
> **Date:** 2026-03-30

---

## 1. Design Direction

### 1.1 Color Palette

| Role | Hex | Name | Usage |
|------|-----|------|-------|
| **Primary** | `#1B3A4B` | Deep Slate Blue | Headers, nav background, primary buttons, section accents |
| **Secondary** | `#C45D3E` | Warm Terracotta | Hover states, secondary buttons, highlights, active indicators |
| **Accent** | `#D4A574` | Warm Gold/Tan | Decorative borders, icons, badges, subtle emphasis |
| **Background** | `#F8F6F2` | Warm Off-White | Page background, card backgrounds, form fields |
| **Dark** | `#0F1C24` | Near-Black Blue | Footer, dark sections, overlay backgrounds |
| **Text** | `#2D3436` | Soft Black | Body text, headings, labels |
| **Light Text** | `#6B7B8D` | Muted Slate | Secondary text, captions, placeholders, metadata |

**Rationale:** The current brand uses harsh red `#E21212`, which reads as aggressive rather than premium. Competitor analysis shows the winning pattern is warm, earthy, and sophisticated:

- **GTA Fencing** (market leader): warm cream + orange palette
- **Bramalea Fence**: deep purple
- **Flawless Fence** (new): deep slate blue + warm terracotta

The terracotta secondary color keeps the red DNA alive while evolving it into something warmer and more refined. The gold/tan accent evokes natural wood and craftsmanship -- core to the fencing trade. The warm off-white background avoids the sterile feel of pure white.

### 1.2 Typography

| Role | Font | Weight Range | Source |
|------|------|-------------|--------|
| **Headings** | Plus Jakarta Sans | 600 (semibold), 700 (bold) | Google Fonts (free) |
| **Body** | Inter | 400 (regular), 500 (medium), 600 (semibold) | Google Fonts (free) |

**Rationale:** The current site uses 5 different font families, creating visual noise. Plus Jakarta Sans is geometric, modern, and confident -- perfect for a premium trades business. Inter is the gold standard for body copy: clean, highly readable at all sizes, and battle-tested across thousands of production sites.

**Implementation:**
- Preload both fonts via `<link rel="preload">`
- Use `font-display: swap` to prevent FOIT (flash of invisible text)
- Load only required weights to minimize payload
- Set base font size at 16px with a modular scale for headings (1.25 ratio)

### 1.3 Photography Style

- **Warm-toned outdoor photography** showing completed fence projects
- **Golden hour light** preferred -- backyards bathed in late afternoon sun
- Show the **RESULT** (beautiful backyard with fence) not the **PROCESS** (construction mess)
- Human presence where possible -- families enjoying their fenced yard, dogs playing safely
- Source from client's **60+ gallery photos** first, supplement with stock for hero/section backgrounds
- All images processed through consistent warm color grading to match the brand palette

**Image Treatment:**
- Slight warm filter applied to all project photos for consistency
- Soft vignette on hero images to draw focus to headline text
- Gallery images cropped to consistent aspect ratios (3:2 for landscape, 4:5 for portrait)

### 1.4 Animation Approach

| Element | Animation | Library | Details |
|---------|-----------|---------|---------|
| Section reveals | Fade up + translate Y | GSAP ScrollTrigger | 40px upward, 0.6s duration, ease: power2.out |
| Card grids | Staggered fade up | GSAP ScrollTrigger | 0.1s stagger between items |
| Card hover | Lift + shadow | CSS transitions | translateY(-4px), box-shadow increase, 0.3s |
| Hero | Scroll-driven frame animation | GSAP ScrollTrigger + Canvas | Sticky + frame sequence from MP4 |
| Stats counter | Count up on scroll | GSAP ScrollTrigger | Triggered once when stats bar enters viewport |
| Navigation | Shrink on scroll | CSS + JS | Reduce nav height, add shadow after 100px scroll |
| Mobile menu | Slide in from right | CSS transitions | Transform + opacity, 0.3s |
| Page transitions | None | -- | Keep page loads fast and simple |

**Accessibility:** All animations respect `prefers-reduced-motion: reduce`. When enabled:
- Disable all GSAP animations
- Set all elements to their final visible state immediately
- Remove scroll-driven hero, show static fallback
- Keep hover states but remove motion (shadow only, no translate)

### 1.5 What to AVOID

- **Harsh red/black color schemes** -- reads aggressive, not premium
- **Multiple font families** -- current site has 5; we use exactly 2
- **Wix/template aesthetic** -- most competitors use Wix; differentiate with custom build
- **Generic stock photos** -- no fences on white backgrounds, no handshake photos
- **Auto-playing video backgrounds** -- poor mobile performance, wastes data
- **Cluttered layouts** -- no more than 1 primary CTA and 1 secondary CTA per viewport
- **Parallax scrolling** -- overused, causes jank on mobile
- **Carousel/slider heroes** -- low engagement, users rarely click past slide 1
- **Popup modals** -- no "subscribe" or "chat with us" popups; let the work speak

---

## 2. Site Architecture

### 2.1 Pages to Build

| # | File | Page Title | Purpose |
|---|------|-----------|---------|
| 1 | `index.html` | Home | Hero, services overview, stats, testimonials, CTA |
| 2 | `wood-fencing.html` | Wood Fencing | Pressure-treated, cedar, custom wood fence installation |
| 3 | `vinyl-fencing.html` | Vinyl Fencing | Low-maintenance PVC/vinyl fencing |
| 4 | `chain-link-fencing.html` | Chain Link Fencing | Security, commercial, residential chain link |
| 5 | `ornamental-fencing.html` | Ornamental Fencing | Iron, wrought iron, decorative fencing |
| 6 | `gate-installation.html` | Gate Installation | Driveway, garden, security, automatic gates |
| 7 | `fence-repair.html` | Fence Repair | Storm damage, rot, leaning, panel replacement |
| 8 | `gallery.html` | Gallery | Photo gallery with category filters |
| 9 | `service-areas.html` | Service Areas | All cities served with local content |
| 10 | `about.html` | About Us | Mike's story, 10+ years, values, team |
| 11 | `contact.html` | Contact | Form, phone, map embed, hours |
| 12 | `404.html` | Page Not Found | Custom 404 with helpful navigation |

**Total: 12 pages**

### 2.2 Navigation Structure

```
Logo [Flawless Fence]                              (416) 419-1721  [Get Free Estimate]
---------------------------------------------------------------------------------------
Home | Services v | Gallery | Service Areas | About | Contact
              |
              +-- Wood Fencing
              +-- Vinyl Fencing
              +-- Chain Link Fencing
              +-- Ornamental Fencing
              +-- Gate Installation
              +-- Fence Repair
```

**Navigation Rules:**
- Phone number visible in nav at all times (desktop: top-right, mobile: sticky bar)
- "Get Free Estimate" button is always visible as the primary CTA
- Services dropdown on hover (desktop) and tap (mobile)
- Current page highlighted in nav
- Mobile: hamburger menu, slide-in panel from right
- Nav shrinks and gains shadow after 100px scroll (desktop)
- Skip-to-main link as first focusable element for accessibility

### 2.3 Content Hierarchy -- Homepage

| Order | Section | Content |
|-------|---------|---------|
| 1 | **Hero** | Scroll-driven animation with headline + 2 CTAs ("Get Free Estimate" + "View Our Work") |
| 2 | **Trust Stats Bar** | 10+ Years Experience / Hundreds of Projects / Licensed & Insured / Free Estimates |
| 3 | **Services Grid** | 6 cards (one per fence type/service) linking to service pages |
| 4 | **Why Choose Us** | 4 value propositions with icons |
| 5 | **Gallery Preview** | 6 project photos in a masonry or grid layout, "View Full Gallery" link |
| 6 | **Testimonials** | 3 customer reviews with names (sourced from Google reviews) |
| 7 | **Service Areas** | Map or illustrated area with list of cities served |
| 8 | **FAQ** | 6 questions in accordion format |
| 9 | **Final CTA** | Full-width dark section with headline + phone + estimate button |
| 10 | **Footer** | Contact info, nav links, service links, cities, social links, copyright |

### 2.4 Content Hierarchy -- Service Pages (Template)

Each service page follows a consistent structure:

| Order | Section | Content |
|-------|---------|---------|
| 1 | **Hero** | Service-specific headline, background image, breadcrumb |
| 2 | **Benefits** | Why this fence type -- 3-4 key benefits with icons |
| 3 | **Features/Materials** | Detailed materials, styles, options available |
| 4 | **Gallery** | 4-6 photos of that specific fence type |
| 5 | **FAQ** | 4-6 questions specific to that service |
| 6 | **CTA + Contact Form** | Inline form or link to contact page + phone number |

### 2.5 Content Hierarchy -- Other Pages

**Gallery Page:**
1. Hero with page title
2. Category filter bar (All / Wood / Vinyl / Chain Link / Ornamental / Gates)
3. Filterable photo grid (masonry layout)
4. CTA section

**Service Areas Page:**
1. Hero with page title
2. Map embed or illustrated coverage area
3. City-by-city sections (Mississauga, Toronto, Oakville, Brampton, Milton)
4. CTA section

**About Page:**
1. Hero with page title
2. Mike's story / company origin (rewritten from scratch -- current is lorem ipsum)
3. Values / mission section
4. Stats / achievements
5. CTA section

**Contact Page:**
1. Hero with page title
2. Two-column layout: form on left, contact info on right
3. Phone: (416) 419-1721 (current site shows wrong number -- fix this)
4. Map embed placeholder
5. Business hours

**404 Page:**
1. Friendly "page not found" message
2. Search suggestion or popular links
3. Navigation back to homepage and key pages

---

## 3. Content Framework

### 3.1 Homepage Headline Options

Three variations based on competitor patterns and SEO targets:

1. **"Mississauga's Trusted Fence Contractors -- Craftsmanship That Stands the Test of Time"**
   - Leads with location (SEO), emphasizes trust and durability
2. **"Premium Fencing Solutions for the Greater Toronto Area -- Where Security Meets Elegance"**
   - Broader geographic appeal, positions as premium
3. **"Your Property Deserves a Flawless Fence -- Expert Installation Across the Western GTA"**
   - Brand name play, aspirational, clear service area

**Recommended:** Option 1 for SEO impact. Use option 3 as subheadline.

### 3.2 Value Proposition Structure

| Prop | Headline | Supporting Copy |
|------|----------|----------------|
| **Safety & Security** | Protect What Matters Most | Professional fencing that keeps your family, pets, and property safe and secure |
| **Curb Appeal** | Transform Your Property | Expert craftsmanship that enhances your home's appearance and increases property value |
| **Experience** | Over a Decade of Trust | 10+ years of fence installation experience across the Greater Toronto Area |
| **Quality Materials** | Built to Last | Premium wood, vinyl, chain link, and ornamental options -- every fence built to withstand Canadian weather |

### 3.3 Section-by-Section Copy Direction

| Section / Page | Direction | Source |
|---------------|-----------|--------|
| Homepage hero | New copy with SEO-rich headline | Write new |
| Homepage services | Brief descriptions for each fence type | Adapt from existing residential/commercial pages |
| Homepage testimonials | Real customer reviews | Source from Google reviews |
| Wood fencing page | Benefits of wood, types (pressure-treated, cedar, custom), maintenance tips | Write new, informed by competitor copy |
| Vinyl fencing page | Low-maintenance benefits, style options, durability claims | Write new |
| Chain link page | Security focus, commercial and residential applications, cost-effectiveness | Write new |
| Ornamental page | Decorative appeal, wrought iron, property value enhancement | Write new |
| Gate installation | Types of gates, automation options, security features | Write new |
| Fence repair | Common issues (storm damage, rot, leaning), quick response messaging | Write new |
| Gallery | Minimal copy -- category labels and project captions | Write new |
| Service areas | City-specific content mentioning neighborhoods and bylaws | Write new |
| About page | Mike's story, 10+ years experience, values, team | **Rewrite from scratch** (currently lorem ipsum) |
| Contact page | Clear instructions, correct phone number, hours | **Rewrite from scratch** (currently shows wrong phone number) |
| FAQ sections | 6 homepage FAQs + 4-6 per service page | Write new, based on common customer questions |

**Copy Rules:**
- Emphasize **FREE ESTIMATES** in every CTA
- Use **"10+ years"** experience claim consistently (never "over 10 years" in one place and "a decade" in another)
- **Canadian spelling** throughout (colour, favourite, centre, licence)
- Address the homeowner directly ("your fence", "your property")
- Keep paragraphs short (3-4 sentences max)
- Every page ends with a clear CTA

### 3.4 SEO Keyword Targets

**Primary Keywords (high intent, target in H1/title tags):**

| Keyword | Target Page |
|---------|-------------|
| fence contractor Mississauga | index.html |
| fence installation GTA | index.html |
| fence repair Mississauga | fence-repair.html |
| wood fence installation Toronto | wood-fencing.html |
| vinyl fence Mississauga | vinyl-fencing.html |
| chain link fence GTA | chain-link-fencing.html |
| ornamental fence Mississauga | ornamental-fencing.html |
| fence company Oakville | service-areas.html |
| fence contractor Brampton | service-areas.html |

**Secondary Keywords (support content, use in body copy and H2s):**

- fence installation near me
- fence builders Mississauga
- residential fence installation
- commercial fencing GTA
- cedar fence Toronto
- privacy fence Mississauga
- automatic gate installation
- fence post repair
- storm damage fence repair

**SEO Implementation:**
- Unique `<title>` and `<meta description>` for every page
- H1 contains primary keyword for that page
- Schema.org `LocalBusiness` markup on every page
- XML sitemap (`sitemap.xml`) listing all 12 pages
- `robots.txt` allowing full crawl
- Canonical URLs on all pages
- Open Graph and Twitter Card meta tags

---

## 4. Conversion Playbook

### 4.1 Primary Conversion Goal

**Phone call or form submission requesting a free estimate.**

Every design decision, every piece of copy, every page layout serves this single goal. Secondary goals (gallery views, service page reads) are stepping stones toward the primary conversion.

### 4.2 Lead Capture Strategy

| Touchpoint | Implementation | Priority |
|------------|---------------|----------|
| **Phone in nav** | Visible on every page, click-to-call on mobile | Critical |
| **"Get Free Estimate" button** | Primary CTA in nav, always visible | Critical |
| **Footer contact form** | Simple form (name, phone, email, message) on every page | High |
| **Service page inline form** | Contact form embedded in CTA section of each service page | High |
| **Sticky mobile CTA bar** | Fixed bottom bar with phone icon + "Get Estimate" button | High |
| **Final CTA section** | Full-width dark section before footer on every page | Medium |

**Form Fields (keep minimal to reduce friction):**
1. Name (required)
2. Phone (required)
3. Email (required)
4. Service needed (dropdown: Wood / Vinyl / Chain Link / Ornamental / Gate / Repair / Other)
5. Message (optional textarea)

**Form Handling:** Formspree as primary integration (no backend needed for static site). Include a comment noting WPForms as an alternative if the site moves to WordPress.

### 4.3 Social Proof Plan

| Proof Type | Content | Placement |
|-----------|---------|-----------|
| **Stats bar** | "10+ Years Experience" / "Hundreds of Projects Completed" / "Licensed & Insured" / "Free Estimates" | Homepage (below hero), repeated in footer |
| **Testimonials** | 3 customer reviews with first names and city (sourced from Google reviews) | Homepage section, about page |
| **Project gallery** | 60+ photos organized by fence type | Dedicated gallery page + 6-image preview on homepage |
| **Service area coverage** | List of all cities served with "Serving the Western GTA" messaging | Homepage section, dedicated page, footer |
| **Experience badge** | "10+ Years Serving the GTA" badge/icon | Header area, about page |

### 4.4 Trust Signal Checklist

- [ ] Phone number `(416) 419-1721` in header on every page
- [ ] "Licensed & Insured" badge displayed prominently
- [ ] "10+ Years Experience" stat with icon
- [ ] 3+ customer testimonials with names
- [ ] Real project photos (not stock) in gallery
- [ ] Service area map or list showing coverage
- [ ] "Free Estimate" messaging in every CTA
- [ ] Clear contact information on every page (footer at minimum)
- [ ] Physical service area mentioned (Mississauga + western GTA)
- [ ] Consistent branding across all pages (logo, colors, fonts)

---

## 5. Hero Animation Spec

### 5.1 Concept: Before/After Fence Transformation

A backyard scene transforming from a bare or deteriorating yard to a beautifully fenced property with a Flawless Fence installation. The transformation is driven entirely by scroll position -- the user scrolls to reveal the transformation.

**This is NOT:**
- CSS parallax
- Autoplay video
- Side-by-side split panel
- Lottie animation

**This IS:**
- A scroll-driven frame sequence rendered to an HTML5 canvas
- GSAP ScrollTrigger controlling playback based on scroll position
- Sticky positioning keeping the canvas in view during the scroll track

### 5.2 Technical Specification

| Parameter | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| Track height | 350vh | 300vh | 250vh |
| Canvas dimensions | 1920x1080 | 1280x720 | 960x540 |
| Frame count | 60-150 | 60-150 | 60-150 |
| Frame format | JPEG (q80) | JPEG (q80) | JPEG (q70) |
| Pixel ratio | `devicePixelRatio` (capped at 2) | `devicePixelRatio` (capped at 2) | `devicePixelRatio` (capped at 2) |

**Frame Extraction Pipeline:**
1. Source: MP4 video of fence transformation (to be provided by client or produced)
2. Extract frames via FFmpeg: `ffmpeg -i input.mp4 -vf "fps=30,scale=1920:1080" frame_%04d.jpg`
3. Optimize with quality setting for web delivery
4. Preload all frames into memory before displaying content

**Scroll Behavior:**
- 0% scroll: First frame (bare yard / old fence)
- 50% scroll: Mid-transformation
- 85% scroll: Final frame (completed fence) + CTA overlay fades in
- 100% scroll: Section scrolls away, next section enters

**CTA Overlay (appears at ~85% scroll):**
- Semi-transparent dark overlay on the final frame
- Headline: "Ready to Transform Your Property?"
- Two buttons: "Get Your Free Estimate" (primary) + "Call (416) 419-1721" (secondary)

### 5.3 Placeholder Implementation

Since no MP4 video is available yet, the hero will be built with:

```html
<!-- SCROLL-DRIVEN HERO: Provide MP4 video, frames will be extracted via FFmpeg -->
<!-- Expected: 60-150 JPEG frames at 1920x1080, named frame_0001.jpg through frame_NNNN.jpg -->
<!-- Place frames in /assets/hero-frames/ directory -->
```

**Placeholder design:**
- Full-viewport section with CSS gradient matching brand colors (`#1B3A4B` to `#0F1C24`)
- Headline text centered with Plus Jakarta Sans
- Subtle animated gradient shift (CSS only) to add visual interest
- Two CTA buttons visible immediately
- When frames are provided, swap gradient for canvas-based frame animation

---

## 6. Image Sourcing Plan

### 6.1 Image Inventory

| Image | Dimensions | Format | Source | Page | Priority |
|-------|-----------|--------|--------|------|----------|
| Hero background (fallback) | 1920x1080 | WebP + JPEG fallback | Client gallery or stock | Homepage | P0 |
| OG image (social sharing) | 1200x630 | PNG | Generate from logo + brand colors | All pages | P0 |
| Favicon | 64x64 | ICO + PNG | Extract from existing logo | All pages | P0 |
| Apple touch icon | 180x180 | PNG | Extract from existing logo | All pages | P1 |
| Wood fence hero | 1920x600 | WebP + JPEG fallback | Stock (Pexels/Unsplash) | wood-fencing.html | P1 |
| Vinyl fence hero | 1920x600 | WebP + JPEG fallback | Stock | vinyl-fencing.html | P1 |
| Chain link hero | 1920x600 | WebP + JPEG fallback | Stock | chain-link-fencing.html | P1 |
| Ornamental fence hero | 1920x600 | WebP + JPEG fallback | Stock | ornamental-fencing.html | P1 |
| Gate hero | 1920x600 | WebP + JPEG fallback | Stock | gate-installation.html | P1 |
| Fence repair hero | 1920x600 | WebP + JPEG fallback | Stock | fence-repair.html | P1 |
| About section (Mike) | 800x600 | WebP + JPEG fallback | Client photo | about.html | P1 |
| Gallery thumbnails (60+) | 600x400 | WebP + JPEG fallback | Client's project photos | gallery.html | P1 |
| Service area map | 800x600 | SVG or PNG | Generate or Google Maps embed | service-areas.html | P2 |
| Service card icons (6) | 64x64 | SVG | Custom or icon library | Homepage | P1 |
| Value prop icons (4) | 48x48 | SVG | Custom or icon library | Homepage | P1 |
| Trust badge icons (4) | 32x32 | SVG | Custom or icon library | Homepage | P2 |

### 6.2 Image Optimization Strategy

- **Format:** WebP as primary, JPEG as fallback via `<picture>` element
- **Lazy loading:** All images below the fold use `loading="lazy"`
- **Responsive images:** Use `srcset` and `sizes` for hero images (mobile/tablet/desktop)
- **Compression:** WebP at quality 80, JPEG at quality 75
- **Dimensions:** Always specify `width` and `height` attributes to prevent layout shift

### 6.3 Sourcing Timeline

Source stock images **during build** (Phase 4), not as an afterthought. For each service page hero:

1. Search Pexels and Unsplash for "[fence type] backyard" with warm tones
2. Select images that match the photography style guide (golden hour, result-focused)
3. Process through consistent color grading
4. Export in WebP + JPEG at required dimensions
5. Optimize file size (target under 200KB per hero image)

---

## 7. Technical Notes

### 7.1 Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Markup | HTML5 | Semantic elements, no div soup |
| Styling | CSS3 | Custom properties for theming, no preprocessor needed |
| Scripting | Vanilla JS | ES6+, no framework |
| Animation | GSAP + ScrollTrigger | Via CDN with `defer` attribute |
| Fonts | Google Fonts | Plus Jakarta Sans + Inter, preloaded |
| Icons | SVG inline or sprite | No icon font libraries |
| Forms | Formspree | Serverless form handling |

**No frameworks. No build tools. No npm. Pure HTML + CSS + JS.**

### 7.2 Responsive Breakpoints

| Breakpoint | Width | Target |
|-----------|-------|--------|
| Mobile | < 768px | Phones |
| Tablet | 768px - 1024px | Tablets, small laptops |
| Desktop | > 1024px | Laptops, desktops |
| Wide | > 1440px | Large monitors (max-width container) |

**Approach:** Mobile-first. Base styles target mobile, then use `min-width` media queries to enhance for larger screens.

### 7.3 Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 90+ |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Total page weight (homepage) | < 1.5MB |
| Time to Interactive | < 3.5s |

### 7.4 Accessibility Requirements

- Skip-to-main-content link as first focusable element
- ARIA labels on interactive elements (buttons, forms, nav)
- Focus indicators visible on all interactive elements (outline, not just color)
- Color contrast meeting WCAG 2.1 AA (4.5:1 for body text, 3:1 for large text)
- `alt` text on all images
- Form labels associated with inputs (no placeholder-only labels)
- `prefers-reduced-motion: reduce` disables all animations
- Keyboard navigable: tab through all interactive elements, Enter/Space to activate
- Semantic heading hierarchy (one H1 per page, sequential H2-H6)
- `lang="en"` on `<html>` element

### 7.5 SEO Infrastructure

- **Schema.org:** `LocalBusiness` structured data on every page (JSON-LD in `<head>`)
- **Sitemap:** `sitemap.xml` listing all 12 pages with `lastmod` dates
- **Robots:** `robots.txt` allowing full crawl, pointing to sitemap
- **Canonical:** `<link rel="canonical">` on every page
- **Open Graph:** `og:title`, `og:description`, `og:image`, `og:url` on every page
- **Twitter Cards:** `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- **Meta:** Unique `<title>` and `<meta name="description">` per page

### 7.6 File Structure

```
/
+-- index.html
+-- wood-fencing.html
+-- vinyl-fencing.html
+-- chain-link-fencing.html
+-- ornamental-fencing.html
+-- gate-installation.html
+-- fence-repair.html
+-- gallery.html
+-- service-areas.html
+-- about.html
+-- contact.html
+-- 404.html
+-- sitemap.xml
+-- robots.txt
+-- assets/
|   +-- css/
|   |   +-- styles.css          (main stylesheet)
|   |   +-- variables.css       (CSS custom properties / design tokens)
|   +-- js/
|   |   +-- main.js             (nav, scroll effects, form validation)
|   |   +-- hero.js             (scroll-driven hero animation)
|   |   +-- gallery.js          (gallery filtering)
|   +-- images/
|   |   +-- logo.svg
|   |   +-- favicon.ico
|   |   +-- og-image.png
|   |   +-- heroes/             (page hero backgrounds)
|   |   +-- gallery/            (project photos)
|   |   +-- icons/              (SVG icons)
|   +-- hero-frames/            (JPEG frames for scroll animation)
+-- research/                   (planning docs, not deployed)
```

### 7.7 Browser Support

- Chrome 90+ (desktop and mobile)
- Firefox 90+
- Safari 15+ (desktop and iOS)
- Edge 90+
- No IE11 support

### 7.8 Third-Party Dependencies

| Dependency | Version | Loaded Via | Purpose |
|-----------|---------|-----------|---------|
| GSAP | 3.x | CDN (`defer`) | Animation engine |
| ScrollTrigger | 3.x | CDN (`defer`) | Scroll-driven animations |
| Google Fonts | -- | `<link rel="preload">` | Plus Jakarta Sans + Inter |
| Formspree | -- | Form `action` attribute | Contact form submission |

No other dependencies. No jQuery. No Bootstrap. No Tailwind.

---

## 8. Deployment Notes

- Static site -- deploy to any static host (Netlify, Vercel, GitHub Pages, or client's existing host)
- No server-side rendering or build step required
- HTTPS required (most static hosts provide free SSL)
- Custom domain configuration per host provider
- Set up 404.html as custom error page in host configuration

---

## 9. Phase 4 Handoff Checklist

When this brief is approved, Phase 4 (build) begins. The builder should:

- [ ] Set up file structure per Section 7.6
- [ ] Create CSS custom properties file with all design tokens (colors, fonts, spacing)
- [ ] Build mobile-first responsive layout system
- [ ] Implement nav with dropdown, phone number, and CTA button
- [ ] Build homepage with all 10 sections
- [ ] Create service page template and build all 6 service pages
- [ ] Build gallery page with category filtering
- [ ] Build service areas, about, contact, and 404 pages
- [ ] Implement GSAP scroll animations
- [ ] Build hero placeholder (swap for frame animation when MP4 is provided)
- [ ] Source and optimize all stock images
- [ ] Add schema.org markup, sitemap, robots.txt
- [ ] Add all meta tags (SEO, OG, Twitter Cards)
- [ ] Test accessibility (keyboard nav, screen reader, color contrast)
- [ ] Test responsive design across breakpoints
- [ ] Run Lighthouse audit and optimize to 90+ performance score
- [ ] Validate all forms submit correctly via Formspree
- [ ] Cross-browser test (Chrome, Firefox, Safari, Edge)

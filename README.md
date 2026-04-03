# Polaris Car Care — Custom Shopify Theme

A custom Shopify theme built from scratch for the Polaris Car Care brand. Black and white, no compromises. Designed for a premium automotive detailing product line.

---

## Table of Contents

1. [Theme Overview](#theme-overview)
2. [Connecting to Shopify via GitHub](#connecting-to-shopify-via-github)
3. [Required Shopify Admin Setup](#required-shopify-admin-setup)
4. [Using the Theme Editor](#using-the-theme-editor)
5. [Adding Content](#adding-content)
6. [File Structure](#file-structure)
7. [Brand Rules (For Developers)](#brand-rules-for-developers)
8. [Known Limitations](#known-limitations)

---

## Theme Overview

**Brand:** Polaris Car Care
**Theme type:** Custom-built from scratch (not based on Dawn or any Shopify base theme)
**Aesthetic:** Strict black and white — no gradients, no color accents, no grays
**Product:** The Nova — a premium automotive detailing product

This theme is purpose-built for a single hero product launch with a strong brand identity. Every section, font choice, and interaction is intentional. Do not deviate from brand rules without good reason.

---

## Connecting to Shopify via GitHub

This theme is managed through GitHub. Follow these steps to connect it to your Shopify store.

### Steps

1. Go to your **Shopify Admin**
2. Navigate to **Online Store → Themes**
3. Click **Add theme → Connect from GitHub**
4. Authorize Shopify to access your GitHub account if prompted
5. Select your **repository** and set the branch to **`main`**
6. Click **Connect**

### Important: File Location Requirement

> Theme files must live in the **root of the repository**. Do not nest them inside a subdirectory (e.g., no `/theme/` or `/src/` folder). Shopify reads `assets/`, `sections/`, `templates/`, etc. directly from the repo root.

### After Connecting

- The theme will appear in your Themes list as an unpublished theme
- Click **Customize** to open the theme editor and preview it
- Click **Publish** to make it your live storefront

### Staying in Sync

Any commit pushed to the `main` branch will automatically sync to your Shopify theme. You do not need to manually re-upload files.

---

## Required Shopify Admin Setup

These items **cannot** be configured through the theme editor. You must set them up directly in Shopify Admin before the store goes live.

---

### 1. Create the Product: "The Nova"

Go to **Admin → Products → Add product**

| Field | Value |
|---|---|
| Title | The Nova |
| Handle (URL slug) | `the-nova` |
| Price | $29.99 |
| Shipping | Mark as physical product, set up free shipping (see below) |
| Photos | Upload 8 product photos |

**The product handle must be exactly `the-nova`.** The theme hardcodes this handle in buy buttons and product links. If the handle is different, links will break.

For photos, upload high-quality images with a consistent white or dark background. The product image gallery on the product page will display them in the order they are uploaded.

---

### 2. Create Navigation

Go to **Admin → Content → Navigation → Add menu**

Create a menu with the following settings:

| Field | Value |
|---|---|
| Menu title | Main Menu |
| Handle | `main-menu` |

Add these links in order:

| Label | Link |
|---|---|
| Home | `/` |
| Shop | `/collections/all` |
| Our Story | `/pages/our-story` |
| FAQ | `/pages/faq` |

**The handle must be exactly `main-menu`.** The theme reads navigation using this handle.

---

### 3. Create Pages

Go to **Admin → Content → Pages → Add page** for each of the following:

#### Our Story
| Field | Value |
|---|---|
| Title | Our Story |
| Handle | `our-story` |
| Template | `page.our-story` |

After creating the page, assign the template `page.our-story` from the **Theme template** dropdown on the right side of the page editor. This loads the custom Our Story section layout instead of the default page template.

#### FAQ
| Field | Value |
|---|---|
| Title | FAQ |
| Handle | `faq` |

Content is managed through the theme editor for this page.

#### Contact
| Field | Value |
|---|---|
| Title | Contact |
| Handle | `contact` |

---

### 4. Set Up the Discount Code for the Email Popup

The email popup reveals the code `NOVA-X7K4M` to every subscriber via a typewriter animation. You need to create this exact code once in Shopify Admin.

#### What you need to create

Go to **Admin → Discounts → Create discount**

| Field | Value |
|---|---|
| Discount code | `NOVA-X7K4M` |
| Type | Percentage |
| Discount value | 10% |
| Applies to | All products |
| Minimum purchase | None |
| Customer eligibility | Everyone |
| Usage limits | Unlimited uses, no per-customer limit |
| Active dates | Set start date, no end date |

**The code must be exactly `NOVA-X7K4M`** — this is what every subscriber sees and uses at checkout.

---

### 5. Set Up Free Shipping

Go to **Admin → Settings → Shipping and delivery**

Under your shipping profile:

1. Click **Add rate** for each zone you ship to
2. Set the rate name to `Free Shipping`
3. Set the price to **$0.00**
4. Set conditions to apply to all orders (no minimum)

This ensures "Free Shipping" appears at checkout and on the product page.

---

### 6. Set TikTok and Instagram URLs

Social media links are configured through the theme editor, not hardcoded.

Go to **Online Store → Themes → Customize → Theme Settings → Social Media** and enter your TikTok and Instagram profile URLs.

---

### 7. Fonts

No upload required. The theme loads **DM Sans** and **Inter** automatically from Google Fonts via the theme layout file. As long as the store is online, fonts will load correctly.

---

## Using the Theme Editor

Go to **Online Store → Themes → Customize** to open the theme editor.

### Homepage Sections

All homepage sections are customizable. In the left sidebar you will see a list of sections in order. Each section has its own settings panel that opens when you click on it.

**To reorder sections:** Drag and drop them in the sidebar.

**Sections on the homepage include:**
- Announcement bar
- Hero / above the fold
- Product feature callouts
- Social proof (reviews)
- Video UGC
- Photo UGC grid
- Press bar
- Email popup trigger

### Specific Section Notes

**Announcement bar** — Toggle it on or off. Edit the message text and control the scroll speed.

**Product page** — Edit content in the `product-main` section settings. This includes feature bullet points, guarantee text, and supporting copy.

**Our Story page** — Edit all content in the `our-story` section settings. This includes the brand narrative text and any images used on that page.

### Schema Settings

Every section uses Shopify's schema system, meaning all editable fields (text, images, links, toggles) appear as form fields in the theme editor. You do not need to touch code to update content.

---

## Adding Content

### Reviews

Go to the **Social Proof section** in the theme editor. You can add up to **6 review blocks**. Each block has fields for:
- Reviewer name
- Star rating
- Review text

Reviews are added directly in the theme editor — no third-party reviews app is required for this section.

### Video UGC

The video section accepts embed codes from TikTok or Instagram.

1. Go to TikTok or Instagram
2. Find the video you want to feature
3. Click **Share → Embed** and copy the embed code
4. Paste it into the video block field in the theme editor

> **Note:** Autoplay is restricted on mobile browsers by default. Videos will display with a play button on mobile and may autoplay on desktop depending on the browser.

### Photo UGC Grid

Upload photos directly using the image picker in the Photo UGC section. Use real customer photos or brand lifestyle content. Recommended aspect ratio: square (1:1) or portrait (4:5).

### Press Logos

Upload press/media logos in the **Press Bar section** blocks. Each block has an image picker. The press bar will show placeholder boxes until images are uploaded.

---

## File Structure

```
/
├── assets/                  → All CSS and JavaScript files
│
├── config/
│   ├── settings_schema.json → Defines global theme settings (colors, social links, etc.)
│   └── settings_data.json   → Saved values for those settings
│
├── layout/
│   ├── theme.liquid         → Global HTML shell (head, header, footer, cart drawer)
│   └── password.liquid      → Coming soon / password page layout
│
├── sections/                → All page sections with embedded schema
│   ├── announcement-bar.liquid
│   ├── hero.liquid
│   ├── product-main.liquid
│   ├── social-proof.liquid
│   ├── video-ugc.liquid
│   ├── photo-ugc.liquid
│   ├── press-bar.liquid
│   ├── email-popup.liquid
│   ├── our-story.liquid
│   └── ...
│
├── snippets/                → Reusable Liquid components
│   ├── product-card.liquid  → Product card used in collections
│   ├── cart-drawer.liquid   → Slide-out cart
│   └── ...
│
├── templates/               → Page templates (JSON-based + Liquid)
│   ├── index.json           → Homepage
│   ├── product.json         → Product page
│   ├── collection.json      → Collection page
│   ├── page.json            → Default page
│   ├── page.our-story.json  → Our Story custom template
│   ├── cart.json            → Cart page
│   └── ...
│
└── locales/
    └── en.default.json      → Translation strings (English)
```

---

## Brand Rules (For Developers)

These rules are non-negotiable. They exist to keep the brand visually consistent. Do not override them without explicit approval.

### Colors

- **Background:** `#000000` (black) or `#FFFFFF` (white) only
- **Text:** `#FFFFFF` on dark backgrounds, `#000000` on light backgrounds
- **Never** use grays, off-whites, gradients, or any color accents
- **Never** introduce a brand color (no gold, no red, no blue)

### Typography

| Use | Font | Weight |
|---|---|---|
| Headings | DM Sans | 600–700 |
| Body | Inter | 400–500 |

Do not change these fonts. Do not use system fonts as fallbacks for anything visible.

### Spacing and Shape

- **Border radius:** `0px` everywhere — no rounded corners
- **Exception:** Product images may use a maximum of `2px` border radius
- **No box shadows** — ever
- **Borders:** Use `1px solid #000` or `1px solid #FFF` only

### Buttons

| State | Background | Text | Border |
|---|---|---|---|
| Default | `#000000` | `#FFFFFF` | none |
| Hover | `#FFFFFF` | `#000000` | `1px solid #000000` |

This applies to all buttons across the theme — primary, secondary, and icon buttons.

### Layout

- Maximum content width: `1200px`
- Sections should breathe — use generous vertical padding
- Mobile-first approach: design for 375px width, scale up

---

## Known Limitations

### Email Popup Discount Code

Every subscriber sees the same code: `NOVA-X7K4M`. Create this once in Shopify Admin as a 10% off, unlimited-use discount. No per-customer limit — it's a permanent offer code.

---

### Video UGC Autoplay on Mobile

Mobile browsers (iOS Safari, Chrome on Android) block autoplay for videos with audio. TikTok and Instagram embeds may not autoplay on mobile. This is a browser-level restriction and cannot be overridden by theme code.

**Workaround:** Ensure the videos are muted by default, or accept that mobile users will need to tap to play.

---

### Product Rating Stars

The product card and product page display a star rating. These stars will only populate if you use a reviews app that writes ratings to:

```
product.metafields.reviews.rating
```

Compatible apps include: **Judge.me**, **Stamped.io**, **Okendo** (with metafield output enabled).

If no reviews app is installed, the star rating display will be empty or hidden depending on the section settings. The rating is currently hardcoded in the `product-main` section schema as a fallback for display purposes.

---

### Press Bar Placeholders

The press bar section shows empty placeholder boxes until real press logo images are uploaded in the theme editor. Do not launch with placeholder boxes visible — upload logos or hide the section before going live.

---

## Quick Launch Checklist

Before publishing, confirm all of the following:

- [ ] Theme connected from GitHub (`main` branch, files in repo root)
- [ ] Product "The Nova" created with handle `the-nova`, price $29.99, 8 photos
- [ ] Navigation menu `main-menu` created with correct links
- [ ] Pages created: Our Story (template: `page.our-story`), FAQ, Contact
- [ ] Discount code `NOVA-X7K4M` created in Admin → Discounts (10% off, unlimited uses)
- [ ] Free shipping rate set up in Shipping settings
- [ ] TikTok and Instagram URLs entered in Theme Settings
- [ ] Reviews added to Social Proof section (up to 6)
- [ ] Video embed codes added to Video UGC section
- [ ] Photo UGC images uploaded
- [ ] Press logos uploaded (or press bar section hidden)
- [ ] Theme published

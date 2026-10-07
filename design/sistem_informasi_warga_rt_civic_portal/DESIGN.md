---
name: Sistem Informasi Warga RT Civic Portal
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464651'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777683'
  outline-variant: '#c7c5d3'
  surface-tint: '#5156aa'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#070666'
  on-primary-container: '#777cd3'
  inverse-primary: '#bfc1ff'
  secondary: '#5451b8'
  on-secondary: '#ffffff'
  secondary-container: '#9592fe'
  on-secondary-container: '#29228d'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001e2c'
  on-tertiary-container: '#488bad'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#bfc1ff'
  on-primary-fixed: '#070666'
  on-primary-fixed-variant: '#393d91'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#0f0069'
  on-secondary-fixed-variant: '#3c379f'
  tertiary-fixed: '#c3e8ff'
  tertiary-fixed-dim: '#8dcff3'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c68'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
  code-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes an authoritative, reliable, and approachable digital interface for neighborhood-level civic administration (Rukun Tetangga / RT). It is built to balance public-sector legitimacy with modern communal accessibility, serving community heads (Ketua RT/RW), administrative secretaries, and local residents.

The visual direction draws from **Modern Civic Editorial & Enterprise Dashboard** paradigms:
- **Authority & Integrity:** Anchored by ultra-deep navy and structured geometric containers to instill institutional trust and data security.
- **Clarity over Decoration:** High data density designed for speed, scan-efficiency, legible citizen registries (Kartu Keluarga, NIK), and transparent local dues/finances (Iuran Warga).
- **Communal Warmth:** Tempered by balanced sand/pale-gold callouts and ocean-teal accents to prevent clinical alienation, making neighborly communication, social aid distributions (Bansos), and RT announcements intuitive and accessible for all generations.

## Colors

The color palette is engineered for maximum contrast, civic authority, and scannable visual hierarchy across dense tabular and statistical views.

### Core Swatches
- **Primary Civic Blue (`#030164`):** The primary anchor. Used for primary command navigation, main headers, critical call-to-action buttons, high-level administrative indicators, and key structural framing.
- **Secondary Royal Indigo (`#363199`):** Interactive elevation. Applied to focused and hovered interactive elements, secondary button states, selected sidebar states, and active tabular tab bars.
- **Tertiary Ocean Teal (`#2D7495`):** Administrative accent. Employed for supporting analytical metrics, trendlines, informational chips, and verified verification badges.
- **Pale Gold Highlight (`#E8E085`):** Warm community accent. Used selectively for notice tags, alert badge fills (paired with dark navy text), metric milestone accents, and pending household approval indicators.

### Background & Surface Hierarchy
- **Canvas / Root Background:** `#F8FAFC` (Slate White) provides a calm, eye-fatigue-reducing field for prolonged administrative usage.
- **Surface / Card Background:** `#FFFFFF` (Pure White) delivers pure contrast for structured tables, forms, and analytical widgets.
- **Subtle Structural Border:** `#E2E8F0` defines clear, non-distracting container boundaries.
- **Primary Text:** `#0F172A` ensures AAA-grade legibility against white and slate backgrounds.
- **Muted Text / Metadata:** `#64748B` handles citizen record identifiers, auxiliary timestamps, and secondary captions.

### Civic Status Mapping
- **Warga Tetap (Permanent Resident):** Background `#ECFDF5`, text `#047857`, border `#A7F3D0`
- **Warga Kontrak (Contract Tenant):** Background `#EFF6FF`, text `#1D4ED8`, border `#BFDBFE`
- **Warga Kos (Boarder/Roomer):** Background `#F5F3FF`, text `#6D28D9`, border `#DDD6FE`
- **Warga Pindah / Nonaktif (Relocated/Inactive):** Background `#F1F5F9`, text `#475569`, border `#CBD5E1`
- **Perlu Verifikasi (Pending Review):** Background `#FEFCE8`, text `#854D0E`, border `#E8E085`

## Typography

The typography uses **Plus Jakarta Sans** uniformly across display, body, and label roles. Its geometric foundation and open apertures guarantee high legibility for Indonesian official naming patterns, 16-digit NIK/KK numerical sequences, addresses (Blok, No., RT/RW), and rapid dashboard skimming.

### Typography Guidelines
- **Numerical Data & Codes (NIK, KK, RT/RW):** Utilize `code-sm` or `body-md` with `font-variant-numeric: tabular-nums` to ensure exact column alignment across tables and registry sheets.
- **Case Rhythms:** Top-level section badges and status pills use uppercase styling with `label-sm` and slight positive letter spacing (`0.04em`) to ensure instant identification against card titles.
- **Editorial Contrast:** Metric stat numbers are presented in `display-lg` with `800` weight to provide clear visual anchors on executive dashboard summaries.

## Layout & Spacing

The layout is grounded in a flexible 12-column desktop grid with a permanent left-hand command sidebar for administrators and a responsive top-navigation bar for resident-facing views.

### Form Factor Adaptations
- **Desktop (1280px and above):** 12-column layout with fixed 260px admin navigation panel. Standard `margin` is 2rem (32px), `gutter` is 1.5rem (24px). Primary citizen registries utilize wide-table layouts with sticky action columns.
- **Tablet (768px – 1279px):** 8-column layout. The admin sidebar collapses into an icon-first vertical bar (72px) or off-canvas drawer. Data metric cards transition from 4 columns to a 2x2 grid. Standard `margin` is 1.5rem (24px).
- **Mobile (Below 768px):** 4-column single-flow layout. Margins reduce to `margin-mobile` (1rem / 16px) and `gutter-mobile` (0.75rem / 12px). Dense tables gracefully fold into card-based citizen profile tiles displaying key metadata (Nama, NIK, Status, No. Rumah).

### Component Spacing Rhythm
- **Micro Spacing (`space-xs` = 4px, `space-sm` = 8px):** Used inside status tags, avatar pairings, input adornments, and metric percentage indicators.
- **Standard Spacing (`space-md` = 16px):** The default gap for form field groups, table row heights, and standard card inner padding.
- **Macro Spacing (`space-lg` = 24px, `space-xl` = 32px):** Applied to card margins, filter toolbar stacks, and page section dividers.

## Elevation & Depth

This design system favors structured **low-contrast outlines** complemented by **subtle ambient shadows**, maintaining a clean and disciplined civic aesthetic rather than heavy floating layers.

### Elevation Levels
- **Level 0 (Flat / Canvas):** Surface color `#F8FAFC`. Zero elevation. Used for canvas backgrounds and grouped section containers.
- **Level 1 (Card / Resting Surface):** Background `#FFFFFF`, border `1px solid #E2E8F0`, shadow `0 1px 3px 0 rgba(3, 1, 100, 0.04), 0 1px 2px -1px rgba(3, 1, 100, 0.02)`. Used for standard citizen cards, analytical panels, and data table rows.
- **Level 2 (Interactive Hover & Dropdowns):** Background `#FFFFFF`, border `1px solid #CBD5E1`, shadow `0 4px 6px -1px rgba(3, 1, 100, 0.07), 0 2px 4px -2px rgba(3, 1, 100, 0.05)`. Applied to hover states on citizen tiles, filter popovers, active search menus, and calendar pickers.
- **Level 3 (Modals & Verification Dialogs):** Background `#FFFFFF`, border `1px solid #E2E8F0`, shadow `0 20px 25px -5px rgba(3, 1, 100, 0.12), 0 8px 10px -6px rgba(3, 1, 100, 0.08)`. Applied to official citizen registration modals, digital letter requests (Surat Pengantar RT), and confirmation prompts.

All elevation drop shadows are explicitly tinted with `#030164` (Deep Navy) instead of neutral gray, ensuring seamless atmospheric cohesion with the primary brand.

## Shapes

The design system adopts a **Soft (Level 1)** shape geometry to project institutional authority, clean civic structure, and crisp data alignment. 

- **Base Radius (0.25rem / 4px):** Used on status chips, inline badges, table selections, and checkbox controls.
- **Large Radius / `rounded-lg` (0.5rem / 8px):** The core foundational radius applied to action buttons, text input fields, metric cards, and citizen registry table containers.
- **Extra Large Radius / `rounded-xl` (0.75rem / 12px):** Reserved for administrative modal dialogues, high-level banner announcements, and prominent civic stat summaries.
- **Full Radius (Pill):** Used strictly for citizen category filters (e.g., "Semua Warga", "Kepala Keluarga") and circular avatar holders.

## Components

### Buttons
- **Primary Civic Button:** Solid Deep Navy (`#030164`) background with pure white text. Hover state transitions to Royal Indigo (`#363199`). Active state triggers an internal ring offset. Applied to key actions like "Tambah Warga", "Cetak Surat Pengantar", and "Simpan Data".
- **Secondary Action Button:** Transparent background, 1px border in `#2D7495` (Ocean Teal), text `#2D7495`. Hover applies 8% tint of `#2D7495`.
- **Tertiary / Ghost Button:** Transparent background, text `#0F172A`, hover `#F1F5F9`. Used for table row actions, quick edits, and pagination arrows.
- **Highlight CTA Button:** Soft Warm Sand (`#E8E085`) background with `#030164` text. Used exclusively for community announcements or urgent broadcast actions (e.g., "Kirim Pengumuman Darurat").

### Citizen Status Chips & Badges
- Displayed with `label-sm` uppercase text and an inline 6px status circle indicator.
- **Tetap:** Green theme (`#047857` text on `#ECFDF5`).
- **Kontrak:** Blue theme (`#1D4ED8` text on `#EFF6FF`).
- **Kos:** Violet theme (`#6D28D9` text on `#F5F3FF`).
- **Pindah:** Gray theme (`#475569` text on `#F1F5F9`).
- **Pill Filter Bar:** Multi-select pills resting on top of citizen lists using `#FFFFFF` with `#E2E8F0` border; selected pill transitions to `#030164` background with white text.

### Data Tables & Lists
- **Header:** Background `#F8FAFC`, bottom border `1px solid #E2E8F0`, typography `label-sm` in `#64748B`.
- **Row:** Pure white background, border-bottom `1px solid #F1F5F9`. Hover state switches row to subtle blue-tinted `#F8FAFC`.
- **Identity Cells (NIK / KK):** Styled with `code-sm` font, high-contrast `#0F172A`, copy-to-clipboard action icon revealed on row hover.
- **Action Column:** Pin to the far-right containing quick action icons: view details, download "Surat Pengantar", and status edit.

### Input Fields & Search Bars
- **Registry Search Input:** Background `#FFFFFF`, border `1px solid #CBD5E1`, height 40px, roundedness 8px (`rounded-lg`). Includes leading search icon in `#2D7495`. Focus ring: 2px solid `#363199` with zero offset blur.
- **Form Groups (Data Kependudukan):** Labels set in `label-md` `#0F172A`. Helper text in `body-sm` `#64748B`. Required fields indicated by a red dot (`#EF4444`).

### Metric & Statistic Cards (Dashboard Ringkasan)
- Container: White card with 1px border in `#E2E8F0`.
- Top-accent rule: 3px solid top border colored according to category (`#030164` for total population, `#2D7495` for KK count, `#363199` for dues collection, `#E8E085` for pending requests).
- Value Display: `display-lg` (`36px` bold).
- Subtext: Trend indicators (e.g., "+3 KK bulan ini") utilizing small status pill badges.

### Specialized Civic Components
- **Surat Pengantar Document Card:** Pre-styled official layout frame with RT seal placeholder, watermarked header bar in `#030164`, tracking ID badge, and signature status indicators (Menunggu RT / Disetujui / Selesai).
- **Rumah & Blok Selector:** Compact visual tag system denoting street blocks (e.g., `Blok A1 / No. 12`) with active color-coding matching the residency type.
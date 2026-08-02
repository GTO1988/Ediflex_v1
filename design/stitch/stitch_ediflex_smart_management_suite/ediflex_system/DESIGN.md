---
name: Ediflex System
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#434651'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#747783'
  outline-variant: '#c4c6d3'
  surface-tint: '#385bac'
  primary: '#002667'
  on-primary: '#ffffff'
  primary-container: '#123c8c'
  on-primary-container: '#8babff'
  inverse-primary: '#b2c5ff'
  secondary: '#475d92'
  on-secondary: '#ffffff'
  secondary-container: '#adc3ff'
  on-secondary-container: '#394f84'
  tertiary: '#003220'
  on-tertiary: '#ffffff'
  tertiary-container: '#004b32'
  on-tertiary-container: '#29c48b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b2c5ff'
  on-primary-fixed: '#001848'
  on-primary-fixed-variant: '#1b4292'
  secondary-fixed: '#dae2ff'
  secondary-fixed-dim: '#b1c5ff'
  on-secondary-fixed: '#001947'
  on-secondary-fixed-variant: '#2f4579'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style
The design system for this building management platform is rooted in **Modern Minimalism** with a strong foundation in **Material Design 3** principles. The brand personality is professional, clean, and inherently trustworthy, reflecting the precision required in facility management.

The aesthetic prioritizes clarity and utility, using a mobile-first philosophy to ensure facility managers can navigate complex building data on the move. The interface utilizes a structured "Surface-Container" model where depth is communicated through subtle tonal shifts rather than heavy shadows, creating a sophisticated, utilitarian environment.

## Colors
The palette is dominated by "Ediflex Blue" to instill a sense of institutional stability. 
- **Primary & Dark Blue:** Used for high-emphasis actions and structural navigation.
- **Surface Strategy:** The primary background is pure white (#FFFFFF), while `#F8FAFC` is used for secondary containers, sidebar backgrounds, and card grouping to create a clear visual separation without adding weight.
- **Semantic Colors:** Success, Warning, and Danger colors are calibrated for high legibility against white backgrounds, specifically for status monitoring and alert systems.

## Typography
Inter is the exclusive typeface for the design system. It is chosen for its exceptional legibility in data-heavy SaaS environments and its neutral, modern tone.
- **Scale:** Use `headline-lg-mobile` for all screen widths below 600px.
- **Hierarchy:** Use `title-md` for card headers and section titles.
- **Functional:** `label-md` is reserved for status badges, table headers (all-caps), and micro-copy.

## Layout & Spacing
This system uses a **Fluid Grid** based on an 8px square rhythm. 
- **Mobile Layout:** 4-column grid with 16px margins and 16px gutters. Navigation is primarily through a Bottom Navigation Bar or a Modal Drawer.
- **Desktop Layout:** 12-column grid with a fixed left-hand navigation rail (72px collapsed, 256px expanded).
- **Alignment:** All components should align to the 4px baseline grid to maintain vertical rhythm in dense data views.

## Elevation & Depth
In alignment with Material Design 3, this design system uses **Tonal Layers** as the primary method of showing elevation. 
- **Level 0 (Flat):** The main background (`#FFFFFF`).
- **Level 1 (Elevated):** Surface-variant (`#F8FAFC`) with no shadow. Used for cards and secondary content areas.
- **Level 2 (Interaction):** A very soft, ambient shadow (Blur: 8px, Y: 2px, Opacity: 4% Black) used only when a card or button is hovered or active.
- **Level 3 (Overlays):** Used for Modals and Menus. Uses a slightly more defined shadow (Blur: 16px, Y: 4px, Opacity: 8% Black) to clearly separate from the background.

## Shapes
The shape language follows a "Variable Roundedness" strategy to distinguish between interactive elements and containers.
- **Structural Elements:** Cards and large containers use a 16px radius to appear approachable and modern.
- **Interactive Elements:** Buttons and Input fields use an 8px radius to feel precise and firm.
- **Indicators:** Status badges and chips are fully rounded (Pill-shaped) to distinguish them from functional buttons.

## Components
- **Buttons:** Filled Primary buttons use `#123C8C` with white text. Ghost buttons use Primary text and no border. All buttons have an 8px corner radius.
- **Status Badges:** Use a "Soft Fill" style. For example, a "Success" badge uses a 10% opacity version of `#10B981` for the background and the full-strength color for the text.
- **Cards:** Cards should have a 16px radius, a 1px border of `#F1F5F9`, and a very subtle hover-state elevation.
- **Input Fields:** Outlined style with a 1px border. On focus, the border thickens to 2px using the Primary color.
- **Navigation:** Top App Bars use the Dark Blue (`#0A2558`) with white icons and text for high-contrast branding.
- **Icons:** Use Material Design 3 "Rounded" icon set at a standard 24px size.
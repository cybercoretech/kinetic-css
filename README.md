# ⚡ Kinetic CSS v0.3.0

**Fluid by nature. Responsive by context.** Kinetic CSS is a high-performance, framework-agnostic design toolkit combining Tailwind-style atomic utilities with Bootstrap-grade components and Cybercore-Minimalist aesthetics. Built entirely on modern CSS with zero runtime JavaScript required for styling.

- 🚫 **Zero JS Runtime Styling:** Pure CSS architecture with native browser primitives.
- 📐 **Fluid-First Architecture:** Continuous scaling across viewports using `clamp()` instead of arbitrary breakpoints.
- 🧱 **Container-Aware by Context:** Components react to their own available container width via `@container`.
- ⚡ **Utility-Component Mashup:** Exhaustive atomic utilities combined with high-fidelity UI components and modern layout primitives (`kbox`).
- 🔮 **Next-Gen CSS Ready:** Proactive support for Anchor Positioning, Scroll-Driven Animations, View Transitions, and Typed Custom Properties (`@property`).

---

## 🚀 Quick Start

### 🌐 Via CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/kinetic-css/css/kinetic.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/kinetic-css/css/kinetic-theme.css">
```

### 📦 Via Package Manager

```bash
npm install kinetic-css
```

```js
import "kinetic-css";
import "kinetic-css/theme.css";
```

---

## 📦 Core Architecture & Primitives

### 1. 📦 Modern Layout Primitive (`kbox`)
Say goodbye to verbose flexbox utility chains. Use `.k-box` for clean, expressive layouts:
```html
<div class="k-box k-box--col k-box--center k-box--gap-4">
  <h2 class="k-text-2xl k-font-bold">Centered Content</h2>
  <p class="k-muted">Fluid spacing and alignment made effortless.</p>
</div>
```

### 2. 📐 12-Column Fluid Grid (`.k-row`, `.k-col-*`)
Responsive layouts powered by CSS Grid with fluid gutters:
```html
<div class="k-row">
  <div class="k-col-12 k-col-md-8">Main content area (span 8)</div>
  <div class="k-col-12 k-col-md-4">Sidebar area (span 4)</div>
</div>
```

### 3. ⚡ Exhaustive Utility Layer (`k-utilities`)
Comprehensive atomic classes inspired by Tailwind:
- **Display & Flex:** `.k-flex`, `.k-grid`, `.k-flex-col`, `.k-items-center`, `.k-justify-between`
- **Fluid Spacing:** `.k-p-1` through `.k-p-6`, `.k-px-*`, `.k-py-*`, `.k-m-*`, `.k-mx-auto`
- **Typography:** `.k-text-xs` to `.k-text-5xl`, `.k-font-bold`, `.k-text-center`, `.k-uppercase`, `.k-truncate`
- **Sizing & Borders:** `.k-w-full`, `.k-rounded-lg`, `.k-border`, `.k-shadow-md`, `.k-shadow-glow`
- **State Modifiers:** `.k-is-active`, `.k-is-open`, `.k-is-disabled`, `.k-has-shadow`, `.k-has-border`
- **Accessibility & Visibility:** `.k-sr-only` (screen readers), `.k-show-desktop`, `.k-hide-mobile`

### 4. 💎 High-Fidelity Cybercore/Minimalist Components
- **Glassmorphism & Glow Cards:** `.k-card--glass`, `.k-card--glow`
- **Floating Labels:** `.k-floating` form pattern with pure CSS state animation
- **Offcanvas Slide-Over Panels:** `.k-offcanvas`
- **Button Groups:** `.k-button-group` for connected action toolbars

### 5. 🔮 Phase 6 Next-Gen CSS APIs
- **Typed Custom Properties (`@property`):** Smooth hue rotations and gradient animations.
- **Scroll-Driven Animations (`animation-timeline: view()`):** `.k-scroll-fade` for hardware-accelerated scroll reveals.
- **Anchor Positioning (`anchor-name`):** Native tethered popovers and tooltips without JS math.
- **View Transitions (`view-transition-name`):** App-like state morphing.

### 6. 🛠️ DX & Type-Safe Tooling (`@kinetic/ts`, `@kinetic/js`)
- **Type-Safe Tokens (`KineticTokens`):** Instant autocomplete and type safety for TypeScript projects.
- **Dynamic Theme Controller (`ThemeController`):** High-performance runtime hue and custom property injection.

---

## 🛠️ Build & Tooling

```bash
# Build framework distribution files (dist/kinetic.css & dist/kinetic.min.css)
npm run build

# Run stylelint checks
npm run lint

# Run automated test suite
npm test
```

---

## 📄 License
MIT. See [LICENSE](LICENSE).

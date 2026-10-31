# 🏛️ Kinetic CSS Architecture

## 📐 Core Principles
1. **Fluid by Nature** 🌊 — Using `clamp()` for continuous type and spacing scaling across viewports without arbitrary breakpoint jumps.
2. **Container-Aware by Context** 🧱 — Leveraging CSS container queries (`@container`) so components adapt to their own available container width rather than viewport width.
3. **Density as a Design Axis** ⚖️ — Global density attribute (`[data-k-density="compact|comfortable|spacious"]`) controlling spacing and padding ratios.
4. **Utility-Component Mashup** ⚡ — Combining Tailwind-style atomic utilities (`k-utilities`) with Bootstrap-grade high-fidelity components (`k-components`) and a 12-column fluid grid system (`k-layout`).
5. **Modern Layout Primitives (`kbox`)** 📦 — Clean, expressive flexbox and grid ergonomics via `.k-box` and concise modifier classes.
6. **Next-Gen CSS Standards (Phase 6)** 🔮 — Proactive integration of MDN standards: CSS Anchor Positioning, Scroll-Driven Animations (`animation-timeline: scroll()`), View Transitions API (`view-transition-name`), Typed Custom Properties (`@property`), and native CSS Nesting.
7. **Zero Runtime Overhead** 🚀 — Pure CSS architecture with lightweight optional JS controllers only when native browser APIs benefit from programmatic binding.

## 📂 Project Structure
- `css/` — Core framework stylesheets (`kinetic.css`, `kinetic-theme.css`)
- `packages/` — Modular sub-packages (`@kinetic/*`, `@cybercoretech/js`, `@cybercoretech/ts`)
- `docs/` — Comprehensive documentation and component guides
- `site/` — Interactive live documentation and theme explorer
- `starter/` — Consuming project starter template
- `tests/` — Automated Node.js test suite

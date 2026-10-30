# Kinetic CSS

**Fluid by nature. Responsive by context.** Kinetic is a small, standalone, mobile-first CSS framework. It is designed around three ideas: fluid scales, container-aware components, and a global density mode.

- No JavaScript runtime
- No compiler, package manager, or build step
- No external dependencies
- Modern CSS: cascade layers, custom properties, `clamp()`, container queries, `light-dark()`, and OKLCH colors

## Quick start

### Via CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/kinetic-css/css/kinetic.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/kinetic-css/css/kinetic-theme.css">
```

### Via package

```bash
npm install kinetic-css
```

```js
import "kinetic-css";
import "kinetic-css/theme.css";
```

### Self-hosted

Copy `css/kinetic.css` and `css/kinetic-theme.css` into your project and load them in the document head:

```html
<link rel="stylesheet" href="/css/kinetic.css">
```

Optional theme presets:

```html
<link rel="stylesheet" href="/css/kinetic-theme.css">
```

Use semantic HTML and add Kinetic classes where you want the framework's behavior.

```html
<main class="k-shell k-region k-stack">
  <h1>Build something that moves.</h1>
  <p class="k-prose k-muted">Fluid typography and spacing adapt continuously.</p>
  <div class="k-grid" style="--k-min: 17rem">
    <article class="k-card k-stack">
      <h2>Card title</h2>
      <p>Cards flow into as many columns as fit.</p>
      <a class="k-button k-button--primary" href="#">Continue</a>
    </article>
  </div>
</main>
```

## The Kinetic difference

### 1. Fluid scale

Spacing and type tokens use `clamp()` so they interpolate instead of jumping between fixed viewport breakpoints. Override any token at the root or a local scope.

### 2. Container-aware components

`.k-card` and `.k-nav` establish inline-size containers. `.k-card--adaptive` changes its internal composition at 34rem of *its own width*. This lets the same component work in a sidebar, grid, or full-width page without viewport-specific variants.

### 3. Density as a design axis

Set one attribute on `<html>` to tune density:

```html
<html data-k-density="compact">      <!-- compact -->
<html data-k-density="comfortable">  <!-- default -->
<html data-k-density="spacious">     <!-- relaxed -->
```

Density-aware components read `--k-density`. You can apply it to your own component styles too.

## What's new in v0.2.0

- **Application patterns**: `.k-dialog` (native `<dialog>`), `.k-tabs` (CSS-only tab panels via hidden radios), `.k-accordion` (`<details>`), `.k-menu` (CSS disclosure), `[data-k-tooltip]`.
- **Navigation patterns**: `.k-header`, `.k-footer`, `.k-breadcrumb`.
- **Responsive data display**: `.k-table`, `.k-table-wrap`.
- **Feedback & loading**: `.k-alert` (+ `--info/--success/--warning/--danger`), `.k-skeleton`, `.k-progress`, `.k-spinner`, `.k-avatar`.
- **Native controls**: `accent-color` for checkboxes and radios.
- **Animations**: `k-skeleton-slide`, `k-spin` keyframes.
- **Distribution**: npm package (`kinetic-css`) and CDN entry points.

## Core classes

| Area | Classes |
|---|---|
| Containers | `k-shell`, `k-prose`, `k-region` |
| Layout | `k-stack`, `k-cluster`, `k-grid`, `k-split`, `k-center`, `k-flow` |
| Components | `k-card`, `k-button`, `k-field`, `k-input`, `k-select`, `k-textarea`, `k-badge`, `k-nav`, `k-divider` |
| Application | `k-header`, `k-footer`, `k-breadcrumb`, `k-tabs`, `k-accordion`, `k-menu`, `k-dialog`, `[data-k-tooltip]` |
| Feedback & data | `k-alert`, `k-table`, `k-table-wrap`, `k-skeleton`, `k-progress`, `k-spinner`, `k-avatar` |
| Utilities | `k-muted`, `k-accent`, `k-surface`, `k-rounded`, `k-shadow`, `k-hidden`, `k-w-full`, `k-text-center`, `k-gap-*`, `k-pad-*` |

### Layout recipes

```html
<!-- Auto-fit grid. Set the minimum card width locally. -->
<div class="k-grid" style="--k-min: 18rem; --k-gap: 1.25rem">...</div>

<!-- Vertical rhythm -->
<section class="k-stack" style="--k-gap: 2rem">...</section>

<!-- Wrapping inline controls -->
<div class="k-cluster" style="--k-gap: .75rem">...</div>

<!-- Split layout; stacks on small screens -->
<div class="k-split" style="--k-gap: 2rem">...</div>
```

## Design tokens

The public token namespace is prefixed `--k-` to reduce collisions. Important tokens include:

- Color: `--k-bg`, `--k-surface`, `--k-surface-raised`, `--k-ink`, `--k-muted`, `--k-line`, `--k-accent`
- Spacing: `--k-space-1` through `--k-space-8`
- Type: `--k-text-xs` through `--k-text-3xl`
- Shape/elevation: `--k-radius-*`, `--k-shadow-*`
- Motion: `--k-ease`, `--k-duration`
- Layout: `--k-content`, `--k-reading`, `--k-gutter`

Change the accent hue by setting `--k-hue` and `--k-accent` in your own stylesheet. Optional theme presets are in `css/kinetic-theme.css` (`ocean`, `ember`, `violet`). Example: `<html data-k-theme="ocean">`.

## Accessibility

Kinetic preserves semantic HTML, provides visible `:focus-visible` outlines, respects `prefers-reduced-motion`, uses real labels for form controls in examples, and avoids encoding meaning in color alone. Always provide accessible names and appropriate ARIA only when needed by your markup.

## Browser support

Kinetic uses modern CSS features including container queries, cascade layers, OKLCH, `light-dark()`, and logical properties. Target current evergreen browsers. If supporting older browsers is a requirement, add a project-specific fallback layer; Kinetic does not ship legacy polyfills.

## Files

- `css/kinetic.css` — complete framework
- `css/kinetic-theme.css` — optional accent presets
- `package.json` — npm package manifest (`kinetic-css`)
- `index.html` — live component showcase
- `CHANGELOG.md` — release notes
- `LICENSE` — MIT

## Theming API

Kinetic CSS exposes a comprehensive theming API via CSS custom properties. See [docs/theming](docs/theming/README.md) for the full token list.

### Full token override example

```css
:root {
  --k-hue: 35;
  --k-accent: oklch(68% .2 35);
  --k-bg: #0a0a0a;
  --k-surface: #121212;
  --k-ink: #f0f0f0;
  --k-muted: #777;
  --k-line: #333;
}
```

### Dark-mode default toggle (no JavaScript)

Use a checkbox and the `color-scheme` CSS property:

```html
<input type="checkbox" id="theme-toggle" class="k-toogle">
<label for="theme-toggle" class="k-toogle__label">⚫︎</label>
```

```css
html { color-scheme: light dark; }
input#theme-toggle { position: absolute; inset: -9999px; }
input#theme-toggle:checked ~ html { color-scheme: dark; }
```

No JS runtime required. See [docs/theming](docs/theming/README.md) for details.

## Documentation

- [Overview](docs/README.md)
- [Theming](docs/theming/README.md)
- [Patterns](docs/patterns/README.md)
- [API reference](docs/api/README.md)
- [Components](docs/components/) - per-component guides

## Adding Kinetic to a project

1. Load the framework stylesheet (CDN, package, or self-hosted — see Quick start).
2. Add the design tokens you want to override on `:root` or at a narrower scope.
3. Use semantic HTML plus `k-*` classes for layout, components, and utilities.
4. For app patterns (dialog, tabs, accordion, menu, tooltip), use the semantic elements described above; Kinetic styles them without JavaScript.

## License

MIT. See `LICENSE`.

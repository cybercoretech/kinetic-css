# Kinetic CSS Docs

Welcome to the Kinetic CSS documentation. This site documents every component, pattern, and API token the framework provides.

## Getting started

- [Quick start](README.md#quick-start) — via CDN, npm, or self-hosted
- [Theming guide](theming) — how to override tokens fully
- [API reference](api) — component classes and utilities
- [Patterns guide](patterns) — layout, data, feedback, application patterns

## Theming guide

### Core tokens

```css
:root {
  --k-hue: 263;
  --k-accent: oklch(62% .22 var(--k-hue));
  --k-bg: light-dark(oklch(98.5% .008 265), oklch(15% .018 265));
  --k-surface: light-dark(white, oklch(19% .02 265));
  --k-ink: light-dark(oklch(22% .025 265), oklch(94% .012 265));
  --k-muted: light-dark(oklch(49% .025 265), oklch(72% .02 265));
  --k-line: light-dark(oklch(87% .018 265), oklch(34% .025 265));
}
```

### Full token list

Spacing: `--k-space-1` through `--k-space-8`
Type: `--k-text-xs` through `--k-text-3xl`
Color: `--k-bg`, `--k-surface`, `--k-surface-raised`, `--k-ink`, `--k-muted`, `--k-line`, `--k-accent`, `--k-danger`, `--k-success`, `--k-warning`
Shape: `--k-radius-sm`, `--k-radius-md`, `--k-radius-lg`, `--k-radius-pill`
Elevation: `--k-shadow-sm`, `--k-shadow-md`
Layout: `--k-content`, `--k-reading`, `--k-gutter`
Motion: `--k-ease`, `--k-duration`
Density: `--k-density` (compact 0.78, comfortable 1.0, spacious 1.22)
Font: `--k-font-family: Inter, ui-sans-serif, system-ui, ...`

### Override at any scope

The `k-*` CSS custom properties cascade naturally — set them on `:root`, a parent element, or even inside a component to scope them.

## Patterns

### Layout patterns

- **Sidebar layout** — `.k-layout` with named container queries: `@container k-layout (max-width: 40rem) { ... }`
- **Pagination** — `.k-pagination` / `.k-pagination__list` / `.k-pagination__item` / `.k-pagination__item--disabled`
- **Carousels** — `.k-carousel` / `.k-carousel__slide` with scroll snap

### Data display

- **Responsive tables** — `.k-table`, `.k-table-wrap` (scrollable). Min-width 32rem, hover striping via `:hover`.
- **Alerts** — `.k-alert` / `.k-alert--info`, `.k-alert--success`, `.k-alert--warning`, `.k-alert--danger`.

### Feedback patterns

- **Toasts** — `.k-toast` (fixed, `data-state="closed"` to trigger animation). Uses `k-toast-in` / `k-toast-out` keyframes.
- **Skeleton & progress** — `.k-skeleton`, `.k-progress`, `.k-progress__bar`, `.k-spinner` with keyframes `k-skeleton-slide`, `k-spin`.
- **Avatars** — `.k-avatar` with inline-block grid centering.

### Application patterns

- **Tabs** — pure-CSS via hidden radios + `.k-tabs` / `.k-tabs__tab` / `.k-tabs__panel`. CSS-only, no JS.
- **Accordions** — `<details>` wrapped in `.k-accordion` with `.k-accordion__panel`.
- **Menus** — `.k-menu` / `.k-menu__panel` with side-position modifiers: `.k-menu--below`, `.k-menu--above`, `.k-menu--end`.
- **Tooltips** — `[data-k-tooltip]` with `::after` / `::before` styling; hover/focus-visible reveals.
- **Dialogs** — `.k-dialog` wrapping `<dialog>` with `::backdrop` and action buttons.

### Navigation patterns

- **Header / Footer** — `.k-header`, `.k-footer` with brand and nav.
- **Breadcrumbs** — `.k-breadcrumb` with separator `/`.

## Reference

### Utility classes

| Class | Description |
|---|---|
| `k-muted` | `color: var(--k-muted)` |
| `k-accent` | `color: var(--k-accent)` |
| `k-surface` | `background: var(--k-surface)` |
| `k-rounded` | `border-radius: var(--k-radius-lg)` |
| `k-shadow` | `box-shadow: var(--k-shadow-md)` |
| `k-hidden` | `display: none !important` |
| `k-w-full` | `inline-size: 100%` |
| `k-max-reading` | `max-inline-size: var(--k-reading)` |
| `k-text-center` | `text-align: center` |
| `k-mt-auto` | `margin-block-start: auto` |
| `k-gap-1` through `k-gap-5` | `var(--k-space-* )` |
| `k-pad-3` through `k-pad-5` | `padding: var(--k-space-* )` |
| `k-density-aware` | `padding: calc(var(--k-space-4) * var(--k-density))` |
| `k-text-center` | `text-align: center` |

### Global CSS custom properties ( `--k-*` )

See the [Theming guide](theming) for the full token catalogue.

## Accessibility

- Focus-visible outlines preserved via `:focus-visible { outline: 2px solid var(--k-focus) }`
- `prefers-reduced-motion` respected — all framework transitions/gracefully degrade.
- Form controls have real `<label>` elements; color is never the sole conveys meaning.
- Tooltips are announced via the `title` attribute; `data-k-tooltip` is presentational only.

## Browser support

Modern evergreen browsers that support container queries, OKLCH, `light-dark()`, `clamp()`, and cascade layers. If you need to support legacy browsers, add a project-specific fallback layer; Kinetic does not ship legacy polyfills.

## License

MIT. See `../LICENSE`.
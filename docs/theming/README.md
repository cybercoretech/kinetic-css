# Theming API

Override the entire Kinetic design system from a stylesheet or from a parent element.

## Core token override

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

The framework uses **only** CSS custom properties named `--k-*`. Any property can be overridden at any cascade point — `:root`, a parent container, or even inline.

## Full token catalogue

| Category | Tokens |
|---|---|
| **Hue & accent** | `--k-hue`, `--k-accent`, `--k-accent-ink` |
| **Colors** | `--k-bg`, `--k-surface`, `--k-surface-raised`, `--k-ink`, `--k-muted`, `--k-line`, `--k-danger`, `--k-success`, `--k-warning` |
| **Spacing** | `--k-space-1` → `--k-space-8`, `--k-gutter` |
| **Type** | `--k-text-xs` → `--k-text-3xl`, `--k-font-family` |
| **Shape** | `--k-radius-sm`, `--k-radius-md`, `--k-radius-lg`, `--k-radius-pill` |
| **Elevation** | `--k-shadow-sm`, `--k-shadow-md` |
| **Layout** | `--k-content`, `--k-reading`, `--k-layout-gap` |
| **Motion** | `--k-ease`, `--k-duration` |
| **Density** | `--k-density` (compact 0.78, comfortable 1.0, spacious 1.22) |

## Per-component overrides

Since every component reads `var(--k-*)`, you can scope them:

```css
.article { --k-accent: #d18cff; --k-radius-md: .4rem; }
```

or for a full layout:

```css
@media (min-width: 60rem) {
  :root { --k-content: 88rem; }
}
```

## Dark-mode default toggle without JavaScript

Kinetic ships a pure-CSS dark mode. Add a checkbox to your page markup:

```html
<input type="checkbox" id="theme-toggle" class="k-toogle">
<label for="theme-toggle" class="k-toogle__label">⚫︎</label>
```

And write this one rule:

```css
html { color-scheme: light dark; }
input#theme-toggle { position: absolute; inset: -9999px; }
input#theme-toggle:checked ~ html { color-scheme: dark; }
```

The `color-scheme` CSS property tells the browser and OS to use your dark stylesheet. No JS runtime, no persistent storage needed (unless you want to persist the choice — that's up to you).

## Theming checklist

- Override `--k-hue` and `--k-accent` to change the primary accent color.
- Set `--k-bg` / `--k-surface` / `--k-ink` for light/dark backgrounds.
- Set `--k-radius-*` and `--k-shadow-*` for the look-and-feel.
- Adjust `--k-density` on `:root` or `[data-k-density="compact"]` / `[data-k-density="spacious"]`.
- Use `color-scheme: light dark` + a checkbox for dark-mode toggle.
- Override individual component tokens at any scope.
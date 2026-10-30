# Patterns

Responsive layouts, data display, feedback, and application primitives built with pure CSS.

## Layout patterns

### Sidebar layout

```html
<main class="k-layout">
  <aside class="k-layout__sidebar">
    <nav>Sidebar navigation</nav>
  </aside>
  <section class="k-layout__main">
    <h1>Main content</h1>
  </section>
</main>

@container k-layout (max-width: 40rem) {
  .k-layout { grid-template-columns: 1fr; }
  .k-layout__sidebar { border-inline-end: 0; border-block-end: 1px solid var(--k-line); }
}
```

### Pagination

```html
<div class="k-pagination">
  <div class="k-pagination__list">
    <a href="#" class="k-pagination__item" aria-label="Previous"><span aria-hidden="true">«</span></a>
    <a href="#" class="k-pagination__item k-pagination__item--active">1</a>
    <a href="#" class="k-pagination__item">2</a>
    <a href="#" class="k-pagination__item">3</a>
    <a href="#" class="k-pagination__item k-pagination__item--disabled" aria-disabled="true"><span aria-hidden="true">»</span></a>
  </div>
</div>
```

### Carousel

```html
<div class="k-carousel">
  <div class="k-carousel__slide"><h2>Slide 1</h2></div>
  <div class="k-carousel__slide"><h2>Slide 2</h2></div>
  <div class="k-carousel__slide"><h2>Slide 3</h2></div>
</div>
```

## Data display

### Responsive table

```html
<div class="k-table-wrap">
  <table class="k-table">
    <thead><tr><th>Name</th><th>Version</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td>kinetic-core</td><td>0.2.0</td><td><span class="k-badge">live</span></td></tr>
      <tr><td>vexlang</td><td>0.1.0</td><td><span class="k-badge">proposed</span></td></tr>
    </tbody>
  </table>
</div>
```

## Feedback patterns

### Toast notification

```html
<div class="k-toast" data-state="open">Operation successful</div>
```

```css
.k-toast { animation: k-toast-in var(--k-duration) var(--k-ease) both; }
.k-toast[data-state="closed"], .k-toast--leaving { animation: k-toast-out var(--k-duration) var(--k-ease) both; }
```

### Skeleton & progress

```html
<span class="k-spinner" role="status" aria-label="Loading"></span>
<div class="k-skeleton" style="inline-size: 12rem;"></div>
<div class="k-progress" style="inline-size: 10rem;"><div class="k-progress__bar" style="width: 64%;"></div></div>
```

### Avatar

```html
<span class="k-avatar">K</span>
```

## Application patterns

### Tabs (CSS only)

```html
<div class="k-tabs" role="tablist">
  <input type="radio" name="ktabs" id="kt-1" checked>
  <label class="k-tabs__tab" for="kt-1">One</label>
  <div class="k-tabs__panel">Panel one content</div>

  <input type="radio" name="ktabs" id="kt-2">
  <label class="k-tabs__tab" for="kt-2">Two</label>
  <div class="k-tabs__panel">Panel two content</div>
</div>
```

### Accordion

```html
<details class="k-accordion">
  <summary>Question</summary>
  <div class="k-accordion__panel">Answer goes here.</div>
</details>
```

### Menu

```html
<div class="k-menu k-menu--below">
  <summary>Actions</summary>
  <div class="k-menu__panel">
    <div class="k-menu__item"><a href="#">Cut</a></div>
    <div class="k-menu__item"><a href="#">Copy</a></div>
    <div class="k-menu__item"><a href="#">Paste</a></div>
  </div>
</div>
```

### Tooltip

```html
<button class="k-button" data-k-tooltip="Copy to clipboard">Copy</button>
```

```css
[k-tooltip]:hover::after, [k-tooltip]:focus-visible::after { opacity: 1; }
```

## Navigation patterns

### Header + Footer

```html
<header class="k-header">
  <strong class="k-header__brand">KINETIC</strong>
  <nav class="k-header__nav">
    <a href="#">Products</a><a href="#">Pricing</a><a href="#">Docs</a>
  </nav>
</header>

<footer class="k-footer">
  <div class="k-footer__inner">
    <span>2026 VexLang</span>
    <nav aria-label="Footer links">
      <a href="#">Privacy</a><a href="#">Terms</a>
    </nav>
  </div>
</footer>
```

### Breadcrumb

```html
<nav class="k-breadcrumb" aria-label="Breadcrumb">
  <a href="#">Home</a>
  <span>→</span>
  <a>Docs</a>
  <span>→</span>
  <span>Kinetic CSS</span>
</nav>
```
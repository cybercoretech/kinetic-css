# Pagination

Pagination controls with variants.

## Usage

```html
<div class="k-pagination k-pagination--centered">
  <div class="k-pagination__list">
    <a href="#" class="k-pagination__item" aria-label="Previous"><span aria-hidden="true">«</span></a>
    <a href="#" class="k-pagination__item k-pagination__item--active">1</a>
    <a href="#" class="k-pagination__item">2</a>
    <a href="#" class="k-pagination__item k-pagination__item--disabled" aria-disabled="true"><span aria-hidden="true">»</span></a>
  </div>
</div>
```

## Variants

- `.k-pagination--compact` — smaller items
- `.k-pagination--centered` — centered layout
- `.k-pagination--simple` — prev/next only (hides list)
# Tabs

CSS-only tab panels using hidden radio inputs.

## Usage

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

## CSS classes

- `.k-tabs` — container
- `.k-tabs__tab` — tab label
- `.k-tabs__panel` — content panel

## JavaScript (optional)

```js
import { Tabs, initTabs } from 'kinetic-js/tabs';
initTabs();
```

Adds keyboard navigation (arrow keys, Home, End).
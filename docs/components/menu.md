# Menu

CSS disclosure menu with positioning modifiers.

## Usage

```html
<div class="k-menu k-menu--below">
  <summary>Actions</summary>
  <div class="k-menu__panel">
    <div class="k-menu__item"><a href="#">Cut</a></div>
    <div class="k-menu__item"><a href="#">Copy</a></div>
  </div>
</div>
```

## Modifiers

- `.k-menu--below` — open below trigger
- `.k-menu--above` — open above trigger
- `.k-menu--end` — align to end (right)
- `.k-menu--center` — center align

## JavaScript (optional)

```js
import { Dropdown, initDropdowns } from 'kinetic-js/dropdown';
initDropdowns();
```
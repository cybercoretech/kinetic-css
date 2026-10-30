# Toast

Toast notification system.

## Usage

```html
<div class="k-toast-container">
  <div class="k-toast k-alert k-alert--success" data-state="open">Operation successful</div>
</div>
```

## JavaScript

```js
import { Toast, initToast } from 'kinetic-js/toast';
const toast = initToast();
toast.show('Hello', { type: 'success', duration: 4000 });
```

## CSS classes

- `.k-toast` — toast element
- `.k-toast-container` — fixed container
- `.k-toast--leaving` — exit animation class
- `[data-state="closed"]` — triggers exit animation
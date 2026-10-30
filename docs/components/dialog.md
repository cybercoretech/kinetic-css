# Dialog

Native `<dialog>` element styled with Kinetic CSS tokens.

## Usage

```html
<dialog class="k-dialog" id="my-dialog">
  <h2>Dialog title</h2>
  <p class="k-dialog__body">Dialog body content goes here.</p>
  <div class="k-dialog__actions">
    <button class="k-button k-button--primary" data-k-close>Got it</button>
  </div>
</dialog>

<button class="k-button" data-k-open="my-dialog">Open dialog</button>
```

## CSS classes

- `.k-dialog` — the dialog container
- `.k-dialog__body` — body text
- `.k-dialog__actions` — action button row

## JavaScript (optional)

```js
import { Dialog, openDialog, closeDialog } from 'kinetic-js/dialog';
openDialog('my-dialog');
```

## Tokens used

`--k-surface`, `--k-line`, `--k-radius-lg`, `--k-shadow-md`, `--k-space-5`, `--k-text-2xl`
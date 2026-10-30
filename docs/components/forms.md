# Forms

Form validation states.

## Usage

```html
<form class="k-form">
  <label class="k-field">
    Email
    <input class="k-input" type="email" name="email" required>
  </label>
  <span class="k-field__error" data-k-error="email"></span>
  <button class="k-button k-button--primary" type="submit">Submit</button>
</form>
```

## CSS classes

- `.k-form` — form grid container
- `.k-invalid` — invalid field border
- `.k-valid` — valid field border
- `.k-field__error` — error message text
- `:user-invalid` — native validation pseudo-class

## JavaScript (optional)

```js
import { Form, initForms } from 'kinetic-js/form';
initForms();
```
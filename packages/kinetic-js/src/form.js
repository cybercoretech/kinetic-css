/**
 * Form — validation utilities.
 */

export class Form {
  constructor(form) {
    this.form = form;
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.form.addEventListener('input', this.handleInput);
    this.form.addEventListener('submit', this.handleSubmit);
  }

  validateField(field) {
    if (!field.checkValidity()) {
      field.classList.add('k-invalid');
      field.classList.remove('k-valid');
      field.setAttribute('aria-invalid', 'true');
      const err = this.form.querySelector(`[data-k-error="${field.name}"]`);
      if (err) err.textContent = field.validationMessage;
      return false;
    }
    field.classList.remove('k-invalid');
    field.classList.add('k-valid');
    field.setAttribute('aria-invalid', 'false');
    const err = this.form.querySelector(`[data-k-error="${field.name}"]`);
    if (err) err.textContent = '';
    return true;
  }

  handleInput(e) {
    const field = e.target;
    if (field.matches('input, textarea, select')) {
      if (field.hasAttribute('required') || field.value.length > 0) {
        this.validateField(field);
      }
    }
  }

  handleSubmit(e) {
    let valid = true;
    this.form.querySelectorAll('input, textarea, select').forEach((field) => {
      if (!this.validateField(field)) valid = false;
    });
    if (!valid) {
      e.preventDefault();
      this.form.dispatchEvent(new CustomEvent('k:invalid', { bubbles: true }));
    }
  }
}

export function initForms(root = document) {
  root.querySelectorAll('form').forEach((form) => {
    if (form.__kineticForm) return;
    form.__kineticForm = new Form(form);
  });
  return this;
}

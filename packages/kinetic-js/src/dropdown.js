/**
 * Dropdown — menu controls with positioning.
 */

export class Dropdown {
  constructor(el) {
    this.el = el;
    this.trigger = el.querySelector('[data-k-trigger]');
    this.menu = el.querySelector('.k-menu__panel, .k-dropdown__menu');
    this.handleOutside = this.handleOutside.bind(this);
    this.trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });
  }

  open() {
    this.el.setAttribute('open', '');
    this.el.classList.add('k-menu--open');
    document.addEventListener('click', this.handleOutside);
    this.el.dispatchEvent(new CustomEvent('k:open', { bubbles: true }));
  }

  close() {
    this.el.removeAttribute('open');
    this.el.classList.remove('k-menu--open');
    document.removeEventListener('click', this.handleOutside);
    this.el.dispatchEvent(new CustomEvent('k:close', { bubbles: true }));
  }

  toggle() {
    if (this.el.hasAttribute('open')) this.close();
    else this.open();
  }

  handleOutside(e) {
    if (!this.el.contains(e.target)) this.close();
  }
}

export function initDropdowns(root = document) {
  root.querySelectorAll('[data-k-dropdown], .k-menu').forEach((el) => {
    if (el.__kineticDropdown) return;
    const instance = new Dropdown(el);
    el.__kineticDropdown = instance;
  });
  return this;
}

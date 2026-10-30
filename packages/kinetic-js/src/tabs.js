/**
 * Tabs — interactive tab controller (enhances CSS-only tabs with keyboard nav).
 */

export class Tabs {
  constructor(el) {
    this.el = el;
    this.radios = Array.from(el.querySelectorAll('input[type="radio"]'));
    this.tabs = Array.from(el.querySelectorAll('.k-tabs__tab'));
    this.panels = Array.from(el.querySelectorAll('.k-tabs__panel'));
    this.current = this.radios.findIndex((r) => r.checked) || 0;
    this.handleKey = this.handleKey.bind(this);
    this.tabs.forEach((tab, i) => {
      tab.addEventListener('keydown', (e) => this.handleKey(e, i));
    });
  }

  select(index) {
    if (index < 0 || index >= this.radios.length) return;
    this.radios[index].checked = true;
    this.current = index;
    this.el.dispatchEvent(new CustomEvent('k:change', { bubbles: true, detail: { index } }));
  }

  handleKey(e, i) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      this.select((i + 1) % this.radios.length);
      this.tabs[(i + 1) % this.radios.length]?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      this.select((i - 1 + this.radios.length) % this.radios.length);
      this.tabs[(i - 1 + this.radios.length) % this.radios.length]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      this.select(0);
      this.tabs[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      this.select(this.radios.length - 1);
      this.tabs[this.radios.length - 1]?.focus();
    }
  }
}

export function initTabs(root = document) {
  root.querySelectorAll('.k-tabs').forEach((el) => {
    if (el.__kineticTabs) return;
    el.__kineticTabs = new Tabs(el);
  });
  return this;
}

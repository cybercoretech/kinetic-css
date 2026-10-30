/**
 * Theme — dark-mode toggle without JavaScript (CSS-only via checkbox).
 * JS helper for persisting preference to localStorage.
 */

export class Theme {
  constructor() {
    this.toggle = document.querySelector('[data-k-theme-toggle]');
    this.storageKey = 'k-theme';
    this.handleToggle = this.handleToggle.bind(this);
    this.init();
  }

  init() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) document.documentElement.setAttribute('data-k-theme', saved);
    this.toggle?.addEventListener('change', this.handleToggle);
  }

  handleToggle(e) {
    const isDark = e.target.checked;
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-k-theme', theme);
    localStorage.setItem(this.storageKey, theme);
  }

  set(theme) {
    document.documentElement.setAttribute('data-k-theme', theme);
    localStorage.setItem(this.storageKey, theme);
    if (this.toggle) this.toggle.checked = theme === 'dark';
  }

  get() {
    return document.documentElement.getAttribute('data-k-theme') || 'light';
  }
}

export function initTheme(root = document) {
  if (!window.__kineticTheme) {
    window.__kineticTheme = new Theme();
  }
  return window.__kineticTheme;
}

/**
 * Scroll — motion and scroll utilities.
 */

export class Scroll {
  constructor() {
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    this.handleScroll();
  }

  handleScroll() {
    const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) || 0;
    document.documentElement.style.setProperty('--k-scroll-progress', String(progress));
  }

  scrollTo(target, options = {}) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start', ...options });
  }
}

export function initScroll(root = document) {
  if (!window.__kineticScroll) {
    window.__kineticScroll = new Scroll();
  }
  return window.__kineticScroll;
}

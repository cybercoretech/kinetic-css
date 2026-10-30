/**
 * Kinetic JS — interactive behavior add-on for Kinetic CSS.
 * Zero external dependencies. Works with the Kinetic CSS core framework.
 *
 * Usage:
 *   import { Kinetic } from 'kinetic-js';
 *   Kinetic.autoInit();
 *
 * Or import individual modules:
 *   import { Dialog } from 'kinetic-js/dialog';
 */

export { Dialog, initDialogs } from './dialog.js';
export { Tabs, initTabs } from './tabs.js';
export { Dropdown, initDropdowns } from './dropdown.js';
export { Toast, initToast } from './toast.js';
export { Theme, initTheme } from './theme.js';
export { Form, initForms } from './form.js';
export { Scroll, initScroll } from './scroll.js';

/**
 * Auto-initialize all Kinetic JS components in the document.
 * Call once on DOMContentLoaded or after dynamic content injection.
 */
export function autoInit(root = document) {
  initDialogs(root);
  initTabs(root);
  initDropdowns(root);
  initToast(root);
  initTheme(root);
  initForms(root);
  initScroll(root);
  return this;
}

/**
 * Convenience default export.
 */
const Kinetic = { autoInit };
export default Kinetic;

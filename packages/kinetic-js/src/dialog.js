/**
 * Dialog — native <dialog> controls with Kinetic CSS styling.
 * Uses the HTMLDialogElement API; falls back gracefully.
 */

export class Dialog {
  constructor(el) {
    this.el = el;
    this.closeBtn = el.querySelector('[data-k-close]');
    this.openers = [];
    this.handleClose = this.handleClose.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.closeBtn?.addEventListener('click', this.handleClose);
    el.addEventListener('click', (e) => {
      if (e.target === el) this.close();
    });
  }

  open() {
    if (typeof this.el.showModal === 'function') this.el.showModal();
    else this.el.show();
    this.el.setAttribute('aria-modal', 'true');
    this.el.dispatchEvent(new CustomEvent('k:open', { bubbles: true }));
  }

  close() {
    if (typeof this.el.close === 'function') this.el.close();
    else this.el.removeAttribute('open');
    this.el.dispatchEvent(new CustomEvent('k:close', { bubbles: true }));
  }

  handleClose() { this.close(); }

  handleKey(e) {
    if (e.key === 'Escape') this.close();
  }
}

export function initDialogs(root = document) {
  root.querySelectorAll('dialog.k-dialog').forEach((el) => {
    if (el.__kineticDialog) return;
    const instance = new Dialog(el);
    el.__kineticDialog = instance;
    // wire openers via data-k-open target
    const id = el.id;
    if (id) {
      document.querySelectorAll(`[data-k-open="${id}"]`).forEach((btn) => {
        btn.addEventListener('click', () => instance.open());
      });
    }
  });
  return this;
}

/**
 * Global helper to open a dialog by id.
 */
export function openDialog(id) {
  const el = document.getElementById(id);
  if (el?.__kineticDialog) el.__kineticDialog.open();
  else if (el) el.showModal?.();
}

export function closeDialog(id) {
  const el = document.getElementById(id);
  if (el?.__kineticDialog) el.__kineticDialog.close();
  else if (el) el.close?.();
}

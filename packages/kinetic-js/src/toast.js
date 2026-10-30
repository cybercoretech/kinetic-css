/**
 * Toast — notification system.
 */

export class Toast {
  constructor(container) {
    this.container = container || document.body;
    this.toasts = [];
  }

  show(message, options = {}) {
    const { type = 'info', duration = 4000, dismissible = true } = options;
    const el = document.createElement('div');
    el.className = `k-toast k-alert k-alert--${type}`;
    el.setAttribute('role', 'status');
    el.textContent = message;
    if (dismissible) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('data-k-close', '');
      btn.setAttribute('aria-label', 'Dismiss');
      btn.textContent = '×';
      btn.addEventListener('click', () => this.dismiss(el));
      el.appendChild(btn);
    }
    this.container.appendChild(el);
    this.toasts.push(el);
    if (duration > 0) {
      setTimeout(() => this.dismiss(el), duration);
    }
    return el;
  }

  dismiss(el) {
    el.setAttribute('data-state', 'closed');
    el.classList.add('k-toast--leaving');
    setTimeout(() => {
      el.remove();
      this.toasts = this.toasts.filter((t) => t !== el);
    }, 200);
  }

  clear() {
    this.toasts.forEach((el) => this.dismiss(el));
  }
}

export function initToast(root = document) {
  const container = root.querySelector('[data-k-toast-container]') || document.body;
  const toast = new Toast(container);
  root.querySelectorAll('[data-k-toast]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      toast.show(trigger.dataset.kToast || 'Notification', {
        type: trigger.dataset.kToastType,
        duration: parseInt(trigger.dataset.kToastDuration, 10) || 4000,
      });
    });
  });
  return toast;
}

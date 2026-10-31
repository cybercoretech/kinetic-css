// @kinetic/js - JavaScript runtime controllers for Kinetic CSS

export class DialogController {
  constructor(selector, core = undefined) {
    this.selector = selector;
    this.core = core;
    this.element = null;
  }

  mount() {
    if (typeof document === "undefined") {
      return;
    }

    this.element = document.querySelector(this.selector);
  }

  open() {
    if (this.element && typeof this.element.showModal === "function") {
      this.element.showModal();
    }
  }

  close() {
    if (this.element && typeof this.element.close === "function") {
      this.element.close();
    }
  }

  destroy() {
    this.element = null;
  }
}

export class TabsController {
  constructor(selector) {
    this.selector = selector;
    this.container = null;
    this.tabs = [];
  }

  mount() {
    if (typeof document === "undefined") return;
    this.container = document.querySelector(this.selector);
    if (this.container) {
      this.tabs = [...this.container.querySelectorAll('[role="tab"], input[type="radio"]')];
    }
  }

  select(index) {
    if (this.tabs[index]) {
      if (typeof this.tabs[index].click === "function") {
        this.tabs[index].click();
      } else {
        this.tabs[index].checked = true;
      }
    }
  }

  destroy() {
    this.container = null;
    this.tabs = [];
  }
}

export class AccordionController {
  constructor(selector) {
    this.selector = selector;
    this.element = null;
  }

  mount() {
    if (typeof document === "undefined") return;
    this.element = document.querySelector(this.selector);
  }

  toggle() {
    if (this.element) {
      this.element.open = !this.element.open;
    }
  }

  destroy() {
    this.element = null;
  }
}

export class ToastQueue {
  constructor(containerSelector = ".k-toast-container") {
    this.selector = containerSelector;
    this.container = null;
    this.toasts = [];
  }

  mount() {
    if (typeof document === "undefined") return;
    this.container = document.querySelector(this.selector);
  }

  push(message, type = "info") {
    const toast = { id: Math.random().toString(36).slice(2), message, type };
    this.toasts.push(toast);
    if (this.container && typeof document !== "undefined") {
      const el = document.createElement("div");
      el.className = `k-toast k-toast--${type}`;
      el.textContent = message;
      el.setAttribute("data-toast-id", toast.id);
      this.container.appendChild(el);
    }
    return toast.id;
  }

  dismiss(id) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    if (this.container) {
      const el = this.container.querySelector(`[data-toast-id="${id}"]`);
      if (el) el.remove();
    }
  }

  destroy() {
    this.container = null;
    this.toasts = [];
  }
}

export class DropdownController {
  constructor(selector) {
    this.selector = selector;
    this.element = null;
  }

  mount() {
    if (typeof document === "undefined") return;
    this.element = document.querySelector(this.selector);
  }

  position(modifier = "center") {
    if (this.element) {
      this.element.classList.remove("k-dropdown--above", "k-dropdown--end", "k-dropdown--center");
      this.element.classList.add(`k-dropdown--${modifier}`);
    }
  }

  destroy() {
    this.element = null;
  }
}

export class ThemeController {
  constructor(rootSelector = ":root") {
    this.rootSelector = rootSelector;
    this.root = null;
  }

  mount() {
    if (typeof document === "undefined") return;
    this.root = document.querySelector(this.rootSelector) || document.documentElement;
  }

  setHue(hue) {
    if (this.root) {
      this.root.style.setProperty("--k-hue", String(hue));
    }
  }

  setTokens(tokens = {}) {
    if (this.root) {
      for (const [k, v] of Object.entries(tokens)) {
        const prop = k.startsWith("--") ? k : `--k-${k}`;
        this.root.style.setProperty(prop, String(v));
      }
    }
  }

  destroy() {
    this.root = null;
  }
}

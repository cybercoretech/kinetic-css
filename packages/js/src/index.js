// @cybercoretech/js - JavaScript runtime controllers for Kinetic CSS

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

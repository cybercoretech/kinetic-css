// @cybercoretech/js - JavaScript runtime controllers for Kinetic CSS
export class DialogController {
  private selector: string;
  private core: any;
  private element: HTMLElement | null = null;

  constructor(selector: string, core?: any) {
    this.selector = selector;
    this.core = core;
  }

  mount() {
    this.element = document.querySelector(this.selector);
  }

  open() {
    if (this.element && typeof (this.element as HTMLDialogElement).showModal === 'function') {
      (this.element as HTMLDialogElement).showModal();
    }
  }

  close() {
    if (this.element && typeof (this.element as HTMLDialogElement).close === 'function') {
      (this.element as HTMLDialogElement).close();
    }
  }

  destroy() {
    this.element = null;
  }
}

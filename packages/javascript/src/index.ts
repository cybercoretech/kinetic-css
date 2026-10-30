// @kinetic/js - JavaScript Add-on Controllers implementing KAS
import { KineticCore, KineticConfig, ComponentLifecycle } from '@kinetic-css/core';

export class DialogController implements ComponentLifecycle {
  private element: HTMLDialogElement | null;
  private core: KineticCore;

  constructor(selector: string, core: KineticCore) {
    this.element = document.querySelector(selector) as HTMLDialogElement;
    this.core = core;
  }

  public mount(): void {
    if (!this.element) return;
    this.element.addEventListener('close', () => {
      this.core.emit('dialog:close', { id: this.element?.id });
    });
  }

  public update(): void {}

  public destroy(): void {
    this.element = null;
  }

  public open(): void {
    if (this.element && !this.element.open) {
      this.element.showModal();
      this.core.emit('dialog:open', { id: this.element.id });
    }
  }

  public close(): void {
    if (this.element && this.element.open) {
      this.element.close();
    }
  }
}

export class KineticJS {
  public static create(config?: KineticConfig): KineticCore {
    return new KineticCore(config);
  }
}

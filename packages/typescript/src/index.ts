// @kinetic/ts - Type-safe wrapper and declarations implementing KAS
import { KineticCore, KineticConfig } from '@kinetic-css/core';
import { DialogController } from '@kinetic-css/javascript';

export interface TypedKineticConfig extends KineticConfig {
  debug?: boolean;
}

export class KineticTS {
  private core: KineticCore;

  constructor(config?: TypedKineticConfig) {
    this.core = new KineticCore(config);
  }

  public mount(container?: HTMLElement | string): void {
    this.core.mount(container);
  }

  public dialog<T extends HTMLElement = HTMLDialogElement>(selector: string): DialogController {
    return new DialogController(selector, this.core);
  }

  public static create(config?: TypedKineticConfig): KineticTS {
    return new KineticTS(config);
  }
}

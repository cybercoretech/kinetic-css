// @kinetic/core - Kinetic API Standard (KAS) Reference Implementation

export interface KineticConfig {
  theme?: 'light' | 'dark' | 'auto';
  density?: 'compact' | 'comfortable' | 'spacious';
  motion?: boolean;
  prefix?: string;
}

export interface ComponentLifecycle {
  mount(container?: HTMLElement | string): void;
  update(config?: Record<string, any>): void;
  destroy(): void;
}

export class KineticCore {
  private config: KineticConfig;
  private plugins: Set<Function> = new Set();
  private registry: Map<string, ComponentLifecycle> = new Map();

  constructor(config: KineticConfig = {}) {
    this.config = {
      theme: 'auto',
      density: 'comfortable',
      motion: true,
      prefix: 'k',
      ...config
    };
  }

  public mount(container: HTMLElement | string = document.body): void {
    const el = typeof container === 'string' ? document.querySelector(container) : container;
    if (!el) {
      console.warn(`[Kinetic] Container not found: ${container}`);
      return;
    }
    el.setAttribute('data-k-theme', this.config.theme || 'auto');
    el.setAttribute('data-k-density', this.config.density || 'comfortable');
    if (!this.config.motion) {
      el.setAttribute('data-k-reduced-motion', 'true');
    }
  }

  public update(newConfig: KineticConfig): void {
    this.config = { ...this.config, ...newConfig };
    this.mount();
  }

  public use(plugin: Function, options?: Record<string, any>): this {
    if (this.plugins.has(plugin)) return this;
    this.plugins.add(plugin);
    plugin(this, options);
    return this;
  }

  public register(id: string, component: ComponentLifecycle): void {
    this.registry.set(id, component);
  }

  public get(id: string): ComponentLifecycle | undefined {
    return this.registry.get(id);
  }

  public emit(eventName: string, detail: Record<string, any>, target: EventTarget = window): CustomEvent {
    const event = new CustomEvent(`kinetic:${eventName}`, {
      detail: { timestamp: Date.now(), ...detail },
      bubbles: true,
      cancelable: true
    });
    target.dispatchEvent(event);
    return event;
  }
}

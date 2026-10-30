export declare class Tabs {
  constructor(el: HTMLElement);
  select(index: number): void;
  handleKey(e: KeyboardEvent, i: number): void;
  readonly el: HTMLElement;
  readonly radios: HTMLInputElement[];
  readonly tabs: HTMLElement[];
  readonly panels: HTMLElement[];
  current: number;
}
export declare function initTabs(root?: Document | Element): void;

export declare class Dropdown {
  constructor(el: HTMLElement);
  open(): void;
  close(): void;
  toggle(): void;
  handleOutside(e: MouseEvent): void;
  readonly el: HTMLElement;
  readonly trigger: HTMLElement | null;
  readonly menu: HTMLElement | null;
}
export declare function initDropdowns(root?: Document | Element): void;

export interface ToastOptions { type?: string; duration?: number; dismissible?: boolean; }
export declare class Toast {
  constructor(container?: HTMLElement);
  show(message: string, options?: ToastOptions): HTMLElement;
  dismiss(el: HTMLElement): void;
  clear(): void;
  readonly container: HTMLElement;
  readonly toasts: HTMLElement[];
}
export declare function initToast(root?: Document | Element): Toast;

export declare class Theme {
  constructor();
  init(): void;
  handleToggle(e: Event): void;
  set(theme: 'light' | 'dark'): void;
  get(): string;
  readonly toggle: HTMLInputElement | null;
  readonly storageKey: string;
}
export declare function initTheme(root?: Document | Element): Theme;

export interface FormOptions { validateOnInput?: boolean; validateOnSubmit?: boolean; }
export declare class Form {
  constructor(form: HTMLFormElement, options?: FormOptions);
  validateField(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): boolean;
  handleInput(e: Event): void;
  handleSubmit(e: SubmitEvent): void;
  readonly form: HTMLFormElement;
}
export declare function initForms(root?: Document | Element): void;

export declare class Scroll {
  constructor();
  handleScroll(): void;
  scrollTo(target: string | Element, options?: ScrollIntoViewOptions): void;
}
export declare function initScroll(root?: Document | Element): Scroll;


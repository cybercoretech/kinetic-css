export class Tabs {
  constructor(el: HTMLElement);
  select(index: number): void;
  handleKey(e: KeyboardEvent, i: number): void;
  readonly el: HTMLElement;
  readonly radios: HTMLInputElement[];
  readonly tabs: HTMLElement[];
  readonly panels: HTMLElement[];
  current: number;
}
export function initTabs(root?: Document | Element): void;

export class Dropdown {
  constructor(el: HTMLElement);
  open(): void;
  close(): void;
  toggle(): void;
  handleOutside(e: MouseEvent): void;
  readonly el: HTMLElement;
  readonly trigger: HTMLElement | null;
  readonly menu: HTMLElement | null;
}
export function initDropdowns(root?: Document | Element): void;

export interface ToastOptions { type?: string; duration?: number; dismissible?: boolean; }
export class Toast {
  constructor(container?: HTMLElement);
  show(message: string, options?: ToastOptions): HTMLElement;
  dismiss(el: HTMLElement): void;
  clear(): void;
  readonly container: HTMLElement;
  readonly toasts: HTMLElement[];
}
export function initToast(root?: Document | Element): Toast;

export class Theme {
  constructor();
  init(): void;
  handleToggle(e: Event): void;
  set(theme: 'light' | 'dark'): void;
  get(): string;
  readonly toggle: HTMLInputElement | null;
  readonly storageKey: string;
}
export function initTheme(root?: Document | Element): Theme;

export interface FormOptions { validateOnInput?: boolean; validateOnSubmit?: boolean; }
export class Form {
  constructor(form: HTMLFormElement, options?: FormOptions);
  validateField(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): boolean;
  handleInput(e: Event): void;
  handleSubmit(e: SubmitEvent): void;
  readonly form: HTMLFormElement;
}
export function initForms(root?: Document | Element): void;

export class Scroll {
  constructor();
  handleScroll(): void;
  scrollTo(target: string | Element, options?: ScrollIntoViewOptions): void;
}
export function initScroll(root?: Document | Element): Scroll;

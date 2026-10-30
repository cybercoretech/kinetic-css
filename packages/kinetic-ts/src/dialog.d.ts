export interface DialogOptions {
  modal?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

export class Dialog {
  constructor(el: HTMLDialogElement, options?: DialogOptions);
  open(): void;
  close(): void;
  handleClose(): void;
  handleKey(e: KeyboardEvent): void;
  readonly el: HTMLDialogElement;
}

export function initDialogs(root?: Document | Element): void;
export function openDialog(id: string): void;
export function closeDialog(id: string): void;

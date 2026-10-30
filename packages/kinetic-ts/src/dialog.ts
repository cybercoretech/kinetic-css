export interface DialogOptions { modal?: boolean; closeOnBackdrop?: boolean; closeOnEscape?: boolean; }
export declare class Dialog {
  constructor(el: HTMLDialogElement, options?: DialogOptions);
  open(): void;
  close(): void;
  handleClose(): void;
  handleKey(e: KeyboardEvent): void;
  readonly el: HTMLDialogElement;
}
export declare function initDialogs(root?: Document | Element): void;
export declare function openDialog(id: string): void;
export declare function closeDialog(id: string): void;
export { Dialog as default };

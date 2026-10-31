/**
 * TypeScript declarations for the Kinetic CSS JavaScript runtime & type-safe design tokens.
 */

export type KineticColorToken = "bg" | "surface" | "surface-raised" | "ink" | "muted" | "line" | "accent";
export type KineticSpaceToken = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type KineticTextToken = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

export interface KineticTokens {
  hue?: number;
  accent?: string;
  bg?: string;
  surface?: string;
  ink?: string;
  [key: string]: string | number | undefined;
}

export declare class DialogController {
  constructor(selector: string, core?: unknown);
  mount(): void;
  open(): void;
  close(): void;
  destroy(): void;
}

export declare class TabsController {
  constructor(selector: string);
  mount(): void;
  select(index: number): void;
  destroy(): void;
}

export declare class AccordionController {
  constructor(selector: string);
  mount(): void;
  toggle(): void;
  destroy(): void;
}

export declare class ToastQueue {
  constructor(containerSelector?: string);
  mount(): void;
  push(message: string, type?: string): string;
  dismiss(id: string): void;
  destroy(): void;
}

export declare class DropdownController {
  constructor(selector: string);
  mount(): void;
  position(modifier?: string): void;
  destroy(): void;
}

export declare class ThemeController {
  constructor(rootSelector?: string);
  mount(): void;
  setHue(hue: number): void;
  setTokens(tokens: KineticTokens): void;
  destroy(): void;
}

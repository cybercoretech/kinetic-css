// @kinetic/accessibility - Focus trapping, live announcements, and ARIA utilities
export class KineticA11y {
  public static announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    let region = document.getElementById('k-announcer');
    if (!region) {
      region = document.createElement('div');
      region.id = 'k-announcer';
      region.setAttribute('aria-live', priority);
      region.setAttribute('aria-atomic', 'true');
      region.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
      document.body.appendChild(region);
    }
    region.textContent = message;
  }

  public static trapFocus(element: HTMLElement): () => void {
    const focusableEls = element.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), tabindex="0"') as NodeListOf<HTMLElement>;
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            lastEl?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastEl) {
            firstEl?.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown as EventListener);
    firstEl?.focus();

    return () => {
      element.removeEventListener('keydown', handleKeyDown as EventListener);
    };
  }
}

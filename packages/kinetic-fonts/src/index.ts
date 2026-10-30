// @kinetic/fonts - Google Fonts selector and loader utility
export class KineticFonts {
  public static loadGoogleFonts(families: string[]): void {
    const familiesParam = families.map(f => `family=${encodeURIComponent(f)}`).join('&');
    const url = `https://fonts.googleapis.com/css2?${familiesParam}&display=swap`;
    
    if (!document.querySelector(`link[href*="${encodeURIComponent(families[0])}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link);
    }
  }

  public static setFont(type: 'sans' | 'serif' | 'mono' | 'display', familyName: string): void {
    this.loadGoogleFonts([familyName]);
    document.documentElement.style.setProperty(`--k-font-${type}`, `'${familyName}', sans-serif`);
  }
}

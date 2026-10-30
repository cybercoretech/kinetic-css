// Kinetic TS — TypeScript add-on for Kinetic CSS.
// Strongly typed APIs, component controllers, and developer tooling.

export * from './dialog';
export * from './components';

export declare function autoInit(root?: Document | Element): void;
export declare const Kinetic: { autoInit: typeof autoInit };
export default Kinetic;

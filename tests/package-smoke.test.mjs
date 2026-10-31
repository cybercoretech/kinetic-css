import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");

async function readJson(path) {
  return JSON.parse(await readFile(resolve(root, path), "utf8"));
}

test("root package exports existing CSS files", async () => {
  const pkg = await readJson("package.json");
  assert.equal(pkg.name, "kinetic-css");

  for (const path of Object.values(pkg.exports)) {
    const file = resolve(root, path.replace(/^\.\//, ""));
    const contents = await readFile(file, "utf8");
    assert.ok(contents.trim().length > 0, `${path} must not be empty`);
  }
});

test("JavaScript package exports its runtime entry point and controllers", async () => {
  const pkg = await readJson("packages/js/package.json");
  assert.equal(pkg.name, "@kinetic/js");
  assert.equal(pkg.main, "./src/index.js");
  assert.deepEqual(pkg.exports, { ".": "./src/index.js" });
  assert.deepEqual(pkg.files, ["src/index.js"]);

  const entry = resolve(root, "packages/js/src/index.js");
  const mod = await import(pathToFileURL(entry).href);
  assert.equal(typeof mod.DialogController, "function");
  assert.equal(typeof mod.TabsController, "function");
  assert.equal(typeof mod.AccordionController, "function");
  assert.equal(typeof mod.ToastQueue, "function");
  assert.equal(typeof mod.DropdownController, "function");
});

test("DialogController mounts, opens, closes, and destroys", async () => {
  const entry = resolve(root, "packages/js/src/index.js");
  const { DialogController } = await import(pathToFileURL(entry).href);
  const calls = [];
  const dialog = {
    showModal() { calls.push("open"); },
    close() { calls.push("close"); },
  };

  const previousDocument = globalThis.document;
  try {
    globalThis.document = {
      querySelector(selector) {
        assert.equal(selector, "#dialog");
        return dialog;
      },
    };

    const controller = new DialogController("#dialog");
    controller.mount();
    controller.open();
    controller.close();
    controller.destroy();
    controller.open();

    assert.deepEqual(calls, ["open", "close"]);
  } finally {
    if (previousDocument === undefined) {
      delete globalThis.document;
    } else {
      globalThis.document = previousDocument;
    }
  }
});

test("TabsController initializes and selects tabs", async () => {
  const entry = resolve(root, "packages/js/src/index.js");
  const { TabsController } = await import(pathToFileURL(entry).href);
  let clicked = false;
  const tab = { click() { clicked = true; } };
  const container = {
    querySelectorAll(sel) {
      assert.equal(sel, '[role="tab"], input[type="radio"]');
      return [tab];
    }
  };

  const previousDocument = globalThis.document;
  try {
    globalThis.document = {
      querySelector(selector) {
        assert.equal(selector, "#tabs");
        return container;
      }
    };

    const ctrl = new TabsController("#tabs");
    ctrl.mount();
    ctrl.select(0);
    assert.ok(clicked);
    ctrl.destroy();
  } finally {
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  }
});

test("AccordionController toggles open state", async () => {
  const entry = resolve(root, "packages/js/src/index.js");
  const { AccordionController } = await import(pathToFileURL(entry).href);
  const details = { open: false };

  const previousDocument = globalThis.document;
  try {
    globalThis.document = {
      querySelector(selector) {
        assert.equal(selector, "#accordion");
        return details;
      }
    };

    const ctrl = new AccordionController("#accordion");
    ctrl.mount();
    ctrl.toggle();
    assert.equal(details.open, true);
    ctrl.toggle();
    assert.equal(details.open, false);
    ctrl.destroy();
  } finally {
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  }
});

test("ToastQueue pushes and dismisses toasts", async () => {
  const entry = resolve(root, "packages/js/src/index.js");
  const { ToastQueue } = await import(pathToFileURL(entry).href);
  const children = [];
  const container = {
    appendChild(el) { children.push(el); },
    querySelector(sel) {
      const id = sel.match(/data-toast-id="([^"]+)"/)?.[1];
      return children.find(c => c.getAttribute("data-toast-id") === id);
    }
  };

  const previousDocument = globalThis.document;
  try {
    globalThis.document = {
      createElement(tag) {
        assert.equal(tag, "div");
        const attrs = {};
        return {
          tagName: "DIV",
          className: "",
          textContent: "",
          setAttribute(k, v) { attrs[k] = v; },
          getAttribute(k) { return attrs[k]; },
          remove() {
            const idx = children.indexOf(this);
            if (idx >= 0) children.splice(idx, 1);
          }
        };
      },
      querySelector(selector) {
        assert.equal(selector, ".k-toast-container");
        return container;
      }
    };

    const queue = new ToastQueue(".k-toast-container");
    queue.mount();
    const id = queue.push("Test message", "success");
    assert.equal(children.length, 1);
    queue.dismiss(id);
    assert.equal(children.length, 0);
    queue.destroy();
  } finally {
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  }
});

test("DropdownController positions dropdowns", async () => {
  const entry = resolve(root, "packages/js/src/index.js");
  const { DropdownController } = await import(pathToFileURL(entry).href);
  const classList = {
    classes: new Set(),
    remove(...names) { names.forEach(n => this.classes.delete(n)); },
    add(name) { this.classes.add(name); },
    has(name) { return this.classes.has(name); }
  };
  const dropdown = { classList };

  const previousDocument = globalThis.document;
  try {
    globalThis.document = {
      querySelector(selector) {
        assert.equal(selector, "#dropdown");
        return dropdown;
      }
    };

    const ctrl = new DropdownController("#dropdown");
    ctrl.mount();
    ctrl.position("above");
    assert.ok(classList.has("k-dropdown--above"));
    ctrl.position("end");
    assert.ok(classList.has("k-dropdown--end"));
    assert.ok(!classList.has("k-dropdown--above"));
    ctrl.destroy();
  } finally {
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  }
});

test("ThemeController sets hue and dynamic tokens", async () => {
  const entry = resolve(root, "packages/js/src/index.js");
  const { ThemeController } = await import(pathToFileURL(entry).href);
  const styles = {};
  const rootEl = {
    style: {
      setProperty(prop, val) { styles[prop] = val; }
    }
  };

  const previousDocument = globalThis.document;
  try {
    globalThis.document = {
      querySelector(selector) {
        assert.equal(selector, ":root");
        return rootEl;
      }
    };

    const ctrl = new ThemeController(":root");
    ctrl.mount();
    ctrl.setHue(180);
    assert.equal(styles["--k-hue"], "180");
    ctrl.setTokens({ accent: "oklch(60% .2 180)", bg: "#000" });
    assert.equal(styles["--k-accent"], "oklch(60% .2 180)");
    assert.equal(styles["--k-bg"], "#000");
    ctrl.destroy();
  } finally {
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  }
});

test("TypeScript package exposes its declaration file", async () => {
  const pkg = await readJson("packages/ts/package.json");
  assert.equal(pkg.name, "@kinetic/ts");
  assert.equal(pkg.types, "src/index.d.ts");

  const declaration = await readFile(
    resolve(root, "packages/ts/src/index.d.ts"), "utf8"
  );
  for (const member of [
    "DialogController",
    "TabsController",
    "AccordionController",
    "ToastQueue",
    "DropdownController",
    "ThemeController",
    "KineticTokens",
    "mount(): void",
    "open(): void",
    "close(): void",
    "destroy(): void",
  ]) {
    assert.ok(declaration.includes(member), `Missing declaration: ${member}`);
  }
});

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

test("JavaScript package exports only its runtime entry point", async () => {
  const pkg = await readJson("packages/js/package.json");
  assert.equal(pkg.name, "@kinetic/js");
  assert.equal(pkg.main, "./src/index.js");
  assert.deepEqual(pkg.exports, { ".": "./src/index.js" });
  assert.deepEqual(pkg.files, ["src/index.js"]);

  const entry = resolve(root, "packages/js/src/index.js");
  const { DialogController } = await import(pathToFileURL(entry).href);
  assert.equal(typeof DialogController, "function");
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

test("TypeScript package exposes its declaration file", async () => {
  const pkg = await readJson("packages/ts/package.json");
  assert.equal(pkg.name, "@kinetic/ts");
  assert.equal(pkg.types, "src/index.d.ts");

  const declaration = await readFile(
    resolve(root, "packages/ts/src/index.d.ts"), "utf8"
  );
  for (const member of [
    "DialogController",
    "mount(): void",
    "open(): void",
    "close(): void",
    "destroy(): void",
  ]) {
    assert.ok(declaration.includes(member), `Missing declaration: ${member}`);
  }
});

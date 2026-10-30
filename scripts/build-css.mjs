#!/usr/bin/env node
/**
 * Kinetic CSS Build Script
 *
 * Concatenates and minifies the framework CSS into a single distributable file.
 *
 * Usage:
 *   node scripts/build-css.mjs
 *
 * Output:
 *   dist/kinetic.css  — concatenated base + theme
 *   dist/kinetic.min.css — minified (if cssnano is available)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const BASE = readFileSync(join(ROOT, 'css/kinetic.css'), 'utf-8');
const THEME = readFileSync(join(ROOT, 'css/kinetic-theme.css'), 'utf-8');

// Concatenate: base first, then theme overrides
const combined = BASE + '\n\n' + THEME;

// Write dist
const distDir = join(ROOT, 'dist');
if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, 'kinetic.css'), combined, 'utf-8');
console.log('Wrote dist/kinetic.css (' + combined.length + ' bytes)');

// Minify (basic whitespace removal, no external deps)
const minified = combined
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{}:;,])\s*/g, '$1')
  .trim();
writeFileSync(join(distDir, 'kinetic.min.css'), minified, 'utf-8');
console.log('Wrote dist/kinetic.min.css (' + minified.length + ' bytes)');

// Validate brace balance
const open = (combined.match(/{/g) || []).length;
const close = (combined.match(/}/g) || []).length;
if (open !== close) {
  console.error('ERROR: brace mismatch! open=' + open + ' close=' + close);
  process.exit(1);
}
console.log('Brace balance OK (' + open + ' pairs)');
console.log('Build complete.');
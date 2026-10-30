# Sidebar

Collapsible sidebar layout.

## Usage

```html
<div class="k-layout">
  <aside class="k-sidebar">
    <button class="k-sidebar__toggle">Toggle</button>
    <span class="k-sidebar__label">Sidebar</span>
  </aside>
  <main class="k-layout__main">
    <h1>Main content</h1>
  </main>
</div>
```

## Modifiers

- `.k-sidebar--collapsed` — collapses sidebar width to 4rem

## JavaScript (optional)

```js
document.querySelector('.k-sidebar__toggle').addEventListener('click', () => {
  document.querySelector('.k-sidebar').classList.toggle('k-sidebar--collapsed');
});
```
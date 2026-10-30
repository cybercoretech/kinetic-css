# Tooltip

CSS-only tooltip via `data-k-tooltip` attribute.

## Usage

```html
<button class="k-button" data-k-tooltip="Copy to clipboard">Copy</button>
```

## Notes

- Tooltip appears on hover and `:focus-visible`
- Uses `::after` for content and `::before` for arrow
- Set `data-k-tooltip` attribute with the tooltip text
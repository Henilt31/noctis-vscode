# Noctis Theme Specification

> "Darkness, clarity, and code."
> Engineered for extended deep-work sessions with controlled contrast and zero noise.

## 1. Visual Hierarchy

The Noctis design philosophy prioritizes **calm visual hierarchy** over neon saturation:

1. **Surfaces**: Layered depth from `#08090C` up to `#151922`.
2. **Text**: Primary `#E6E9EF` with high readability against `#0B0D11`.
3. **Accents**: Functional astral indigo (`#8B7CFF`) and sky cyan (`#5CC8FF`).

### Color System Summary

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `Workbench Base` | `#08090C` | Sidebars, title bar, activity bar |
| `Editor Canvas` | `#0B0D11` | Primary code editor area |
| `Primary Accent` | `#8B7CFF` | Cursor, active tabs, buttons |
| `String Literal` | `#A6E3A1` | Calm soft mint green |
| `Function Call` | `#82AAFF` | Soft periwinkle blue |
| `Warning State` | `#F5C76B` | Amber yellow |

## 2. Code Example

```typescript
import { Noctis } from '@noctis/core';

const session = new Noctis({
  focusMode: true,
  variant: 'default',
});

await session.start();
```

* For more details, inspect [GitHub Repository](https://github.com/Henilt31/noctis-vscode).
* Report issues via the issue tracker.

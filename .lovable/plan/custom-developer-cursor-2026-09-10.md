# Custom developer cursor

Replace the default mouse cursor with a minimal, premium dot + ring pointer that tracks the mouse smoothly and expands to show contextual hover labels.

## Goal
- A small dot with a thin ring follows the cursor with spring physics.
- On hover, the ring expands and a label appears (e.g. `VIEW PROJECT`, `OPEN`, `LET'S TALK`).
- Native cursor is hidden on pointer-capable desktops, preserved on touch devices.
- Animations stay subtle, fast and high-end.

## Implementation

### Components
- `src/components/portfolio/CustomCursor.tsx`
  - Fixed container with `pointer-events-none` and a high z-index.
  - Renders:
    - Inner dot (4 px) at exact pointer position.
    - Outer ring (24 px default) lagging slightly behind via `motion` spring.
    - Label text revealed only when a hovered element provides one.
  - State driven by a `CursorContext` provider:
    - `hovered: boolean`
    - `label: string | null`
    - `variant: 'default' | 'ring'`

### Cursor context / hook
- `src/hooks/use-cursor.tsx` (provider + hook)
  - `setCursor(label, variant)` called on `mouseenter` of marked elements.
  - `resetCursor()` on `mouseleave`.
  - Use `matchMedia('(pointer: fine)')` to skip the custom cursor on touch devices.

### Marking interactive elements
- Add data attributes to existing components so the cursor adapts contextually:
  - **Projects**: project card/article gets `data-cursor-label="VIEW PROJECT"`.
  - **Contact CTA button**: `data-cursor-label="LET'S TALK"`.
  - **External/social links** (GitHub, LinkedIn, mail, nav links): `data-cursor-label="OPEN"`.
  - Other links/buttons get the default expand with no label.
- Attach global `mouseenter`/`mouseleave` listeners via a small effect in the provider, or use attribute-driven event delegation on `document`.

### Global cursor hiding
- Add to `src/styles.css` in `@layer base`:
  ```css
  @media (pointer: fine) {
    html,
    body,
    a,
    button {
      cursor: none;
    }
  }
  ```
- The custom cursor component renders only when `pointer: fine` is true.

### Mounting
- Mount `<CustomCursor />` once in `src/routes/index.tsx` next to `<ChatWidget />`, wrapped by `CursorProvider`.

### Visual details
- Dot uses `bg-accent-tech`, ring uses `border accent-tech/60`.
- Default ring size 24 px, hover expands to 48–56 px with label centered.
- Use `motion` spring values for `x`, `y`, `scale`, `opacity`.
- Follow delay for ring ~0.06–0.12 s; label fade ~0.15 s.

## Verification
- Build passes (`bun run build:dev`).
- Screenshot/Playwright confirms:
  - Cursor dot + ring visible on desktop preview.
  - Ring expands and label shows on project card hover.
  - Native cursor is hidden and custom cursor tracks smoothly.

## Notes
- Keep current `motion` dependency; no new packages needed.
- Does not change existing page content or layout except the added cursor layer.

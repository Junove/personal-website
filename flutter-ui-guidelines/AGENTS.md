# Flutter UI conventions

Drop this file in the Flutter repo root (as `AGENTS.md`, or `@`-import it from `CLAUDE.md`). Pair it with `analysis_options.yaml`, which enforces the mechanical parts.

## 1. Project structure

Feature-first, with the layers Flutter's own architecture guide recommends (UI → Logic → Data).

```
lib/
  main.dart                 # bootstrap only: runApp, DI, error zones
  app/                      # MaterialApp.router, router, theme wiring, localization setup
  core/
    theme/                  # ColorScheme, TextTheme, ThemeExtensions, spacing/radius tokens
    widgets/                # design-system widgets shared by 2+ features (AppButton, AppCard…)
    utils/  extensions/  constants/
  data/                     # repositories, services, DTOs, serialization (no Flutter imports)
  domain/                   # optional: models and use-cases (pure Dart)
  features/
    <feature>/
      presentation/
        <feature>_screen.dart       # route-level widget, wires state to UI
        <feature>_controller.dart   # view-model / notifier / bloc
        widgets/                    # widgets used only by this feature
      data/                         # feature-specific repositories (if not global)
test/                       # mirrors lib/ one-to-one
```

Rules:
- One public widget per file; filename is the snake_case class name (`app_button.dart` → `AppButton`).
- Features never import another feature's `presentation/`. Share through `core/widgets` or `domain/`.
- `data/` and `domain/` must not import `package:flutter/*` (except `foundation` where unavoidable).
- Widgets never call repositories or HTTP directly; they read state from a controller.
- Promote a widget to `core/widgets` only when a second feature needs it.
- Use package imports (`package:app/...`) everywhere; no relative imports across folders.
- Barrel files only at `core/widgets/widgets.dart`; don't add them elsewhere.

## 2. Building components

**Composition**
- Prefer **composition over inheritance**; extend `StatelessWidget`/`StatefulWidget` only.
- Extract UI into **widget classes, not helper methods** (`_buildHeader()`): classes get their own `const`, element identity and rebuild boundary.
- Default to `StatelessWidget`. Use `StatefulWidget` only for ephemeral UI state owned by that widget (controllers, animations, focus). App/feature state lives in the controller layer.
- Keep `build` under ~60 lines and nesting under ~5 levels; split by meaning, not just by size.

**API**
- Constructors are `const` with `super.key`. Required params are `required`; avoid positional booleans.
- Fields are `final`. Doc-comment each public parameter whose meaning isn't obvious.
- Expose callbacks as `VoidCallback`/`ValueChanged<T>` named `onXxx`; a `null` callback means disabled.
- Accept `child`/`children` slots instead of ten config flags. Don't pass `BuildContext` into non-widget code.
- Variants are an `enum` (e.g. `AppButtonVariant`), not a bool-per-variant.

**Styling**
- No hard-coded colors, text styles, radii or spacing in feature widgets. Use `Theme.of(context).colorScheme`/`textTheme`, `ThemeExtension`s, and spacing tokens from `core/theme`.
- Both light and dark themes must work; check contrast ≥ 4.5:1 for body text, 3:1 for large text and UI borders.
- Prefer Material 3 components; adapt to platform only where behaviour differs (e.g. `.adaptive` constructors).

**Layout and responsiveness**
- Never assume a screen size. Use `LayoutBuilder`/`MediaQuery.sizeOf` with shared breakpoints; use `Flexible`/`Expanded`, not fixed widths.
- Scrollable content uses `ListView.builder`/`SliverList` for anything beyond a handful of items.
- Wrap content in `SafeArea`. Use `SizedBox`/`Gap` for spacing, `DecoratedBox`/`ColoredBox` before `Container`.

**Performance**
- Mark widgets and subtrees `const` wherever possible.
- Narrow rebuilds: `select`/`Selector`/`BlocSelector`, and push state down the tree.
- Never do work in `build` (no parsing, sorting, network, or creating controllers). Dispose every controller, focus node and subscription.
- Use `RepaintBoundary` only after profiling shows a need.

**Accessibility and i18n**
- Tap targets ≥ 48×48 dp. Icon-only buttons need `tooltip`/`Semantics.label`.
- Support text scaling; never clip text with fixed heights.
- All user-facing strings come from localization (`AppLocalizations`), never literals.

**Testing**
- Every shared widget in `core/widgets` has a widget test and a golden test for light and dark.
- Add a widget preview for each shared widget.

## 3. Adherence

- `analysis_options.yaml` is the source of truth for mechanical rules; CI runs `dart format --set-exit-if-changed .` and `flutter analyze --fatal-infos`.
- Rules the analyzer can't express (no helper methods returning widgets, no cross-feature imports, no hard-coded colors, no `Container` misuse) need an extra tool: DCM or `custom_lint`. See the commented block at the bottom of `analysis_options.yaml`.

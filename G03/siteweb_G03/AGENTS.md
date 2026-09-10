# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Selected visual direction

- The user selected Product Design ideation option 1 on 2026-09-10.
- Treat `/Users/edouardfort/.codex/generated_images/01a08a3b-fce0-7e40-a8d1-5b4c31ce184a/exec-52cf98f9-cc4e-4e56-b334-ba90103e8731.png` as the visual source of truth.
- Preserve the immersive rainy bus-stop hero, oversized condensed title, left-aligned editorial hierarchy, restrained cinema-red accents, and black editorial sections.

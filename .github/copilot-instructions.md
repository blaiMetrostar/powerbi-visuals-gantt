## Repository guidance for AI coding agents

This file gives concise, actionable guidance for working on the powerbi-visuals-gantt repository.

1. Project purpose and high-level architecture
- This is a Power BI custom visual (Gantt chart). The TypeScript visual implementation lives under `src/` (primary entry: `src/gantt.ts`). UI styling is in `style/gantt.less` and assets are in `assets/`.
- Visual settings and models are in `settings/` and `src/services/settingsService.ts` controls persisted settings/state.
- Data contract is defined in `capabilities.json` (roles: `Task`, `StartDate`, `EndDate`, `Duration`, `Completion`, `Resource`, `Milestones`) and drives how code parses the DataView.

2. Build / run / test workflows (exact commands)
- Install deps: `npm install` (relies on `powerbi-visuals-tools` in devDependencies).
- Run dev server: `npm run start` (invokes `pbiviz start`) — use this to iterate and test during development.
- Package visual: `npm run package` (invokes `pbiviz package`).
- Run tests: `npm run test` (runs Karma using `karma.conf.ts`). Use `npm run debug` to launch Chrome for interactive test debugging.
- Lint: `npm run lint` (runs `npx eslint .` with `eslint-plugin-powerbi-visuals`).

3. Key files and where to look for patterns
- Visual entry & rendering: `src/gantt.ts` — follow existing `Visual` class implementation and lifecycle methods.
- Data parsing and mapping helpers: `src/columns.ts`, `src/durationHelper.ts`, and `src/utils.ts`.
- Settings models and cards: `settings/ganttChartSettingsModels.ts` and files under `settings/cards/`.
- Tests: `test/visualTest.ts`, `test/visualBuilder.ts`, `test/visualData.ts` and helpers in `test/helpers/helpers.ts`.
- Manifest and packaging: `pbiviz.json` and `capabilities.json`.

4. Project-specific conventions and patterns
- Use the Power BI visuals utility libraries (dependencies named `powerbi-visuals-*`) and their helper patterns for formatting, tooltip, color, and SVG handling instead of reimplementing similar utilities.
- Localization strings live under `stringResources/<locale>/resources.resjson`; update these when adding user-facing text.
- Settings are centralized in `settings/` and exposed via the settings service; prefer adding new setting models there and connecting cards under `settings/cards/`.
- Keep visual DOM updates within the Visual update lifecycle; avoid global side-effects that break interactive embedding in Power BI host.

5. Tests and CI notes
- Unit/integration tests run in Karma and may rely on `karma-webpack` and `karma-typescript` config; see `karma.conf.ts` and `test.webpack.config.js` for webpack/test plumbing.
- CI uses the repository's GitHub Actions workflow (see `.github/workflows/build.yml` in upstream repo). Keep changes compatible with headless test runners.

6. Editing and review guidance
- Preserve `capabilities.json` role names and mapping shapes; changing role names or kinds requires updating DataView mapping code and tests.
- Follow existing lint rules; run `npm run lint` before PRs.
- When adding dependencies, prefer the `powerbi-visuals-*` utilities where possible and keep `devDependencies` minimal.

7. Useful quick references for code agents
- Where rendering logic lives: `src/gantt.ts`, `src/drawButtons.ts`, `src/behavior.ts`.
- Settings and persisted state: `src/services/settingsService.ts`, `settings/persist` models in `settings/`.
- Data roles and mappings: `capabilities.json` (start here when adding new fields).

If anything here is unclear or you want more examples (e.g., typical PR change for adding a new setting or role), tell me what to expand and I'll iterate.

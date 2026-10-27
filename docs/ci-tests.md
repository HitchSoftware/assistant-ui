# Package Lane CI

Use Node 24, exactly `pnpm@11.10.0` from `packageManager`, and the unchanged
`pnpm-lock.yaml`. Run from the repository root:

```sh
corepack pnpm install --frozen-lockfile --filter './packages/*'
corepack pnpm run build:ci
corepack pnpm run test:ci
```

`build:ci` builds packages, not docs/examples or native platform applications.
`test:ci` first writes `test-results/core.xml` from the actual core Vitest suite,
then runs every existing package test through Turbo, both configured React
Compiler suites, and package-scoped typechecks. Archive the JUnit XML even when
later stages fail. It covers core only, not the whole Turbo run; preserve the
full CI log as well. Baseline: 1059 core tests, 494 tap tests, 8 React Compiler
tests, and 57/57 Turbo test tasks passed. Builds passed 40/40 tasks.
The tap replay fixture now calls its zero-argument resource without a spurious
argument, and tap's typecheck includes Node types for its filesystem tests.

All 42 configured TypeScript projects now pass across the 45 package checks
(tw-glass, tw-shimmer, and private x-changelog have no tsconfig). There are no test exclusions or relaxed compiler
diagnostics. Fixtures use current argument/metadata shapes, checked narrowing,
and correctly typed mocks. Production fixes cover the empty-array conditional
type, MCP request-context cancellation signal, and Vue's renderable slot/active
thread contracts. The full `test:ci` command passes, including its final type gate.
The baseline root `test` script also includes docs/examples typechecks; this
package lane explicitly scopes to `packages/*`, matching its publish inventory.

Do not append Vitest-only options to `turbo test -- ...`: assistant-stream and
cloud-ai-sdk have compound scripts ending in `tsc`; those options reach TypeScript
instead of configuring all Vitest invocations. Existing peer-version tests must
remain intact. This adapter does not install a registry or change package versions.

Shared-bed commands use `flock /tmp/opencode/package-fleet-local-build.lock`,
`PATH=/mnt/jenkins-agent/tools/node-24/bin:$PATH`, finite timeouts, and
`NODE_OPTIONS=--max-old-space-size=1536`. `--env-mode=loose` passes this resource
limit to Turbo's child processes; do not supply publish credentials to PR builds.

PRs never publish. Master release stays on `1.8.N` AR with the existing scoped
`publishConfig` values. `cloudbuild.yaml` still describes a legacy GitHub Packages
publisher, so it is not an approved AR release adapter. Resolve that mismatch
through the owning release path; this PR changes no registry, live job, or pipeline.

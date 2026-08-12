#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const UNSCOPED_TO_HITCH = {
  "assistant-stream": "@hitchsoftware/assistant-stream",
  "assistant-cloud": "@hitchsoftware/assistant-cloud",
  "assistant-ui": "@hitchsoftware/assistant-ui",
  "create-assistant-ui": "@hitchsoftware/create-assistant-ui",
  "safe-content-frame": "@hitchsoftware/safe-content-frame",
  "tw-shimmer": "@hitchsoftware/tw-shimmer",
  "tw-glass": "@hitchsoftware/tw-glass",
  "heat-graph": "@hitchsoftware/heat-graph",
};

function mapName(name) {
  if (!name || typeof name !== "string") return name;
  if (name.startsWith("@hitchsoftware/")) return name;
  if (name.startsWith("@assistant-ui/")) {
    return `@hitchsoftware/assistant-ui-${name.slice("@assistant-ui/".length)}`;
  }
  if (UNSCOPED_TO_HITCH[name]) return UNSCOPED_TO_HITCH[name];
  return name;
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (
      ent.name === "node_modules" ||
      ent.name === ".git" ||
      ent.name === "dist" ||
      ent.name === ".turbo" ||
      ent.name === ".next" ||
      ent.name === "build"
    ) {
      continue;
    }
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function rewriteDepMap(obj) {
  if (!obj || typeof obj !== "object") return obj;
  const next = {};
  for (const [k, v] of Object.entries(obj)) {
    next[mapName(k)] = v;
  }
  return next;
}

function rewritePackageJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  let pkg;
  try {
    pkg = JSON.parse(raw);
  } catch {
    return false;
  }
  let changed = false;
  if (pkg.name) {
    const n = mapName(pkg.name);
    if (n !== pkg.name) {
      pkg.name = n;
      changed = true;
    }
  }
  for (const field of [
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "optionalDependencies",
  ]) {
    if (pkg[field]) {
      const rewritten = rewriteDepMap(pkg[field]);
      if (JSON.stringify(rewritten) !== JSON.stringify(pkg[field])) {
        pkg[field] = rewritten;
        changed = true;
      }
    }
  }
  if (pkg.peerDependenciesMeta) {
    const rewritten = rewriteDepMap(pkg.peerDependenciesMeta);
    if (JSON.stringify(rewritten) !== JSON.stringify(pkg.peerDependenciesMeta)) {
      pkg.peerDependenciesMeta = rewritten;
      changed = true;
    }
  }
  if (pkg.pnpm?.overrides) {
    const rewritten = rewriteDepMap(pkg.pnpm.overrides);
    if (JSON.stringify(rewritten) !== JSON.stringify(pkg.pnpm.overrides)) {
      pkg.pnpm.overrides = rewritten;
      changed = true;
    }
  }
  if (pkg.overrides) {
    const rewritten = rewriteDepMap(pkg.overrides);
    if (JSON.stringify(rewritten) !== JSON.stringify(pkg.overrides)) {
      pkg.overrides = rewritten;
      changed = true;
    }
  }
  if (pkg.publishConfig) {
    const pc = { ...pkg.publishConfig };
    delete pc.provenance;
    pc.access = "restricted";
    pc.registry = "https://npm.pkg.github.com";
    if (JSON.stringify(pc) !== JSON.stringify(pkg.publishConfig)) {
      pkg.publishConfig = pc;
      changed = true;
    }
  } else if (pkg.name?.startsWith("@hitchsoftware/") && pkg.private !== true) {
    // only set publishConfig on packages/* publishable packages later if needed
  }

  // Only write publishConfig for packages under packages/ that are not private
  const rel = path.relative(ROOT, filePath);
  if (
    rel.startsWith(`packages${path.sep}`) &&
    pkg.private !== true &&
    pkg.name?.startsWith("@hitchsoftware/")
  ) {
    pkg.publishConfig = {
      access: "restricted",
      registry: "https://npm.pkg.github.com",
    };
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + "\n");
  }
  return changed;
}

function buildReplacePairs() {
  // Discover all old names from a frozen list of known patterns by scanning
  // current package.json files BEFORE rename — but we may already have renamed
  // some. Build pairs from both conventions.
  const pairs = [];

  // Unscoped first (longer / more specific first for some)
  const unscoped = Object.entries(UNSCOPED_TO_HITCH).sort(
    (a, b) => b[0].length - a[0].length,
  );
  for (const [from, to] of unscoped) {
    pairs.push([from, to]);
  }

  // We'll also replace @assistant-ui/X → @hitchsoftware/assistant-ui-X globally
  // via regex in text pass
  return pairs;
}

const TEXT_EXTS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".mts",
  ".cts",
  ".json",
  ".jsonc",
  ".md",
  ".mdx",
  ".yml",
  ".yaml",
  ".toml",
  ".css",
  ".scss",
  ".html",
  ".txt",
  ".sh",
  ".bash",
]);

function shouldTouchText(file) {
  const base = path.basename(file);
  if (base === "pnpm-lock.yaml") return false;
  if (base === "rename-hitch-packages.mjs") return false;
  const ext = path.extname(file);
  if (TEXT_EXTS.has(ext)) return true;
  // extensionless scripts
  if (base === "Dockerfile" || base.endsWith("rc")) return true;
  return false;
}

function rewriteText(filePath, unscopedPairs) {
  let text = fs.readFileSync(filePath, "utf8");
  const original = text;

  // Scoped: @assistant-ui/foo → @hitchsoftware/assistant-ui-foo
  text = text.replace(/@assistant-ui\/([A-Za-z0-9._~/-]+)/g, (_, pkg) => {
    return `@hitchsoftware/assistant-ui-${pkg}`;
  });

  // Unscoped package names in dependency-like contexts
  // Be careful: only replace when it looks like a package reference
  for (const [from, to] of unscopedPairs) {
    // "from" as JSON string key/value package name
    const patterns = [
      // "name": "assistant-stream"
      [new RegExp(`"name"\\s*:\\s*"${escapeReg(from)}"`, "g"), `"name": "${to}"`],
      // dependency keys "assistant-stream":
      [new RegExp(`"${escapeReg(from)}"(\\s*:)`, "g"), `"${to}"$1`],
      // from "assistant-stream" / from 'assistant-stream'
      [new RegExp(`from\\s+["']${escapeReg(from)}(["'/])`, "g"), `from "${to}$1`],
      [new RegExp(`from\\s+['']${escapeReg(from)}([''/])`, "g"), `from '${to}$1`],
      // import("assistant-stream")
      [new RegExp(`import\\(\\s*["']${escapeReg(from)}(["'/])`, "g"), `import("${to}$1`],
      // require("assistant-stream")
      [new RegExp(`require\\(\\s*["']${escapeReg(from)}(["'/])`, "g"), `require("${to}$1`],
      // workspace protocol references already handled via package.json
      // filter=@assistant already handled
      // pnpm --filter assistant-ui
      [
        new RegExp(`(--filter=)${escapeReg(from)}\\b`, "g"),
        `$1${to}`,
      ],
    ];
    for (const [re, rep] of patterns) {
      text = text.replace(re, rep);
    }
  }

  if (text !== original) {
    fs.writeFileSync(filePath, text);
    return true;
  }
  return false;
}

function escapeReg(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// --- main ---
const files = walk(ROOT);
const pkgFiles = files.filter((f) => path.basename(f) === "package.json");
let pkgCount = 0;
for (const f of pkgFiles) {
  if (rewritePackageJson(f)) {
    pkgCount++;
    console.log("package.json", path.relative(ROOT, f));
  }
}

const unscopedPairs = buildReplacePairs();
let textCount = 0;
for (const f of files) {
  if (!shouldTouchText(f)) continue;
  if (path.basename(f) === "package.json") continue; // already done structurally
  try {
    if (rewriteText(f, unscopedPairs)) {
      textCount++;
      console.log("text", path.relative(ROOT, f));
    }
  } catch (e) {
    console.warn("skip", path.relative(ROOT, f), e.message);
  }
}

// pnpm-workspace.yaml minimumReleaseAgeExclude
const wsPath = path.join(ROOT, "pnpm-workspace.yaml");
if (fs.existsSync(wsPath)) {
  let ws = fs.readFileSync(wsPath, "utf8");
  const orig = ws;
  ws = ws.replace(/@assistant-ui\/\*/g, "@hitchsoftware/*");
  for (const [from, to] of Object.entries(UNSCOPED_TO_HITCH)) {
    ws = ws.replace(new RegExp(`^(\\s+)- ${escapeReg(from)}$`, "m"), `$1- ${to}`);
  }
  if (ws !== orig) {
    fs.writeFileSync(wsPath, ws);
    console.log("pnpm-workspace.yaml updated");
  }
}

console.log(`\nDone. package.json files: ${pkgCount}, text files: ${textCount}`);

#!/usr/bin/env node
/**
 * Offline checks for this repository. Nothing here needs the network, so it runs
 * anywhere and never fails for reasons outside the repository's control.
 *
 *   1. Front matter: every docs/**\/*.md opens with a `---` block carrying the
 *      required keys, and every date/status/source value means what
 *      CONTRIBUTING.md says it means.
 *   2. Official sources: inside a section headed "Official sources" (or
 *      "官方来源"), every link points at an official host — unless the line says
 *      in words that it is not an official source.
 *   3. Internal links: every relative link and anchor resolves.
 *   4. Skills: every skills/<name>/SKILL.md opens with front matter carrying a
 *      non-empty `name` and `description` (the two fields an agent reads when it
 *      decides whether to load the skill at all).
 *
 * Usage: node scripts/check-docs.mjs
 */

import { readFileSync, existsSync } from "node:fs";
import { readdirSync, statSync } from "node:fs";
import { join, relative, dirname, basename, resolve, sep } from "node:path";

const DOCS = resolve("docs");
const SKILLS = resolve("skills");
const ROOT = resolve(".");

/** Only the law cards and the comparisons carry front matter; docs/README.md does not. */
const CARD_PATH = /^(cn|eu|compare)[\\/]/;

const REQUIRED_KEYS = ["title", "evidence", "verified"];
const DATE_KEYS = ["published", "effective", "applies"];
const STATUSES = new Set(["in-force", "draft", "proposed", "repealed", "stub"]);
/** Statuses for which `published: —` / `effective: —` and an empty `source` are allowed. */
const NO_TEXT_STATUSES = new Set(["draft", "proposed", "stub"]);

/** Hosts that count as an official publication of a legal instrument. */
const OFFICIAL_HOSTS = [
  "eur-lex.europa.eu",
  "data.europa.eu",
  "ec.europa.eu",
  "digital-strategy.ec.europa.eu",
  "www.europarl.europa.eu",
  "www.npc.gov.cn",
  "flk.npc.gov.cn",
  "www.gov.cn",
  "www.cac.gov.cn",
  "www.moj.gov.cn",
  "www.news.cn",
  "www.mofcom.gov.cn",
  "policy.mofcom.gov.cn",
  "www.miit.gov.cn",
  "www.mps.gov.cn",
  "www.samr.gov.cn",
  "openstd.samr.gov.cn",
  "std.samr.gov.cn",
  "www.mee.gov.cn",
  "www.tc260.org.cn",
];

/** A line that says this in words is allowed to carry a non-official link. */
const EXPLICITLY_NOT_OFFICIAL = /not an official source|非官方来源/i;

const errors = [];
const warnings = [];

const fail = (file, message) => errors.push(`${file}: ${message}`);
const warn = (file, message) => warnings.push(`${file}: ${message}`);

function rel(p) {
  return relative(ROOT, p).split(sep).join("/");
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (p.endsWith(".md")) out.push(p);
  }
  return out;
}

const isRealDate = (s) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
};

/**
 * Blank out fenced code blocks and inline code spans, preserving line numbers
 * and line lengths. Templates and examples live in code blocks, so their
 * placeholder links must not be treated as real ones.
 */
function stripCode(text) {
  const lines = text.split(/\r?\n/);
  let fence = null;
  return lines
    .map((line) => {
      const marker = /^\s*(`{3,}|~{3,})/.exec(line);
      if (fence) {
        if (marker && line.trim().startsWith(fence)) fence = null;
        return "";
      }
      if (marker) {
        fence = marker[1];
        return "";
      }
      return line.replace(/`[^`]*`/g, (span) => " ".repeat(span.length));
    })
    .join("\n");
}

const today = new Date();
const tomorrow = new Date(today.getTime() + 24 * 3600 * 1000)
  .toISOString()
  .slice(0, 10);

// ---------------------------------------------------------------- front matter

/**
 * Parse the leading `---` block into a key/value map, or return null when there
 * is none. Values are flat scalars; a trailing `# comment` is metadata for the
 * reader, not part of the value.
 */
function parseFrontMatter(file_, text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text);
  if (!m) return null;
  const fields = new Map();
  m[1].split(/\r?\n/).forEach((rawLine, i) => {
    if (!rawLine.trim() || rawLine.trimStart().startsWith("#")) return;
    const line = rawLine.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
    if (!line) {
      fail(file_, `front matter line ${i + 2} is not a \`key: value\` pair: ${rawLine.trim()}`);
      return;
    }
    fields.set(line[1], line[2].replace(/\s+#.*$/, "").trim());
  });
  return fields;
}

function checkFrontMatter(file, text) {
  const file_ = rel(file);
  const fields = parseFrontMatter(file_, text);
  if (!fields) {
    fail(file_, "no YAML front matter (the file must open with a `---` block)");
    return;
  }

  for (const key of REQUIRED_KEYS) {
    if (!fields.get(key)) fail(file_, `front matter is missing a non-empty \`${key}\``);
  }

  const status = fields.get("status");
  if (status && !STATUSES.has(status)) {
    fail(file_, `status: ${status} — must be one of ${[...STATUSES].join(" / ")}`);
  }

  for (const key of DATE_KEYS) {
    if (!fields.has(key)) continue;
    const value = fields.get(key);
    if (value === "—") {
      if (status && !NO_TEXT_STATUSES.has(status)) {
        fail(file_, `${key}: — is only allowed when status is draft/proposed/stub`);
      }
      continue;
    }
    if (value === "") {
      fail(file_, `${key} is empty — give a date, or — when status is draft/proposed/stub`);
    } else if (!isRealDate(value)) {
      fail(file_, `${key}: ${value} is not a YYYY-MM-DD date`);
    }
  }

  const verified = fields.get("verified");
  if (verified && !isRealDate(verified)) {
    fail(file_, `verified: ${verified} is not a YYYY-MM-DD date`);
  } else if (verified && verified > tomorrow) {
    fail(file_, `verified: ${verified} is in the future — you cannot have checked the source yet`);
  }

  const evidence = fields.get("evidence");
  if (evidence && /^[A-Za-z]$/.test(evidence) && !/^[ABC]$/.test(evidence)) {
    fail(file_, `evidence: ${evidence} — a single-letter grade must be A, B or C`);
  }

  const source = fields.get("source");
  if (source !== undefined) {
    if (!source) {
      if (status && !NO_TEXT_STATUSES.has(status)) {
        fail(file_, "source is empty — a card whose instrument exists must link its official text");
      }
    } else {
      for (const token of source.split(/\s+/)) {
        if (!/^https?:\/\/\S+$/.test(token)) {
          fail(file_, `source token is not an http(s) URL: ${token}`);
          continue;
        }
        const host = new URL(token).host;
        if (!OFFICIAL_HOSTS.includes(host)) {
          fail(
            file_,
            `source: ${host} is not an official host — cite the official text ` +
              `(a Commission summary page or a third-party tracker belongs in the body, not here)`
          );
        }
      }
    }
  }
}

// -------------------------------------------------------------------- skills

/**
 * A skill is a directory holding a `SKILL.md`. An agent sees only the front
 * matter when it decides whether to load one: `description` is the text it
 * matches a question against. A skill whose front matter is empty or mistyped is
 * never loaded, and nothing else in the repository would notice.
 */
function checkSkill(file, text) {
  const file_ = rel(file);
  const fields = parseFrontMatter(file_, text);
  if (!fields) {
    fail(
      file_,
      "no YAML front matter — a skill must open with a `---` block carrying `name` and `description`"
    );
    return;
  }
  for (const key of ["name", "description"]) {
    if (!fields.get(key)) fail(file_, `front matter is missing a non-empty \`${key}\``);
  }
  const name = fields.get("name");
  const dir = basename(dirname(file));
  if (name && name !== dir) {
    fail(file_, `name: ${name} — must match the directory name (${dir})`);
  }
}

/** Every `skills/<name>/SKILL.md`, if any. */
function findSkills() {
  if (!existsSync(SKILLS)) return [];
  return readdirSync(SKILLS)
    .map((entry) => join(SKILLS, entry, "SKILL.md"))
    .filter((p) => existsSync(p) && statSync(p).isFile());
}

// ----------------------------------------------------------- official sources

function checkOfficialSources(file, text) {
  const file_ = rel(file);
  const lines = text.split(/\r?\n/);
  let inSection = false;
  let sectionLine = 0;

  lines.forEach((line, i) => {
    if (/^##\s+/.test(line)) {
      inSection = /^##\s+.*(official sources|官方来源)/i.test(line);
      sectionLine = i + 1;
      return;
    }
    if (!inSection) return;

    const links = line.match(/https?:\/\/[^\s)[\]>"']+/g) || [];
    if (!links.length) return;
    if (EXPLICITLY_NOT_OFFICIAL.test(line)) return; // labelled honestly; allowed

    for (const link of links) {
      let host;
      try {
        host = new URL(link).host;
      } catch {
        fail(file_, `line ${i + 1}: unparseable URL ${link}`);
        continue;
      }
      if (!OFFICIAL_HOSTS.includes(host)) {
        fail(
          file_,
          `line ${i + 1} (under the heading on line ${sectionLine}): ${host} is not an official host. ` +
            `Either use the official text or mark the line as "not an official source" / "非官方来源".`
        );
      }
    }
  });
}

// ----------------------------------------------------------- internal links

function slug(heading) {
  return heading
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/\s+/g, "-");
}

function checkInternalLinks(file, text) {
  const file_ = rel(file);
  const ownAnchors = new Set(
    [...text.matchAll(/^#{1,6}\s+(.+)$/gm)].map((m) => slug(m[1]))
  );

  const links = [...text.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)];
  for (const [, target] of links) {
    if (/^(https?:|mailto:|tel:)/.test(target)) continue;

    const [path, anchor] = target.split("#");
    if (path) {
      if (/^[a-zA-Z]:|^\\\\/.test(path)) {
        fail(file_, `local absolute path in a link: ${target}`);
        continue;
      }
      const resolved = resolve(dirname(file), decodeURI(path));
      if (!existsSync(resolved)) {
        fail(file_, `link target does not exist: ${target}`);
      }
      continue;
    }
    // Same-file anchor.
    if (anchor && /^[a-z0-9-]+$/.test(anchor) && !ownAnchors.has(anchor)) {
      warn(file_, `anchor not found in this file: #${anchor}`);
    }
  }
}

// ------------------------------------------------------------------------ run

const files = walk(DOCS);
for (const file of files) {
  const text = readFileSync(file, "utf8");
  const code = stripCode(text);
  if (CARD_PATH.test(relative(DOCS, file))) checkFrontMatter(file, text);
  checkOfficialSources(file, code);
  checkInternalLinks(file, code);
}

const skills = findSkills();
for (const file of skills) checkSkill(file, readFileSync(file, "utf8"));

for (const w of warnings) console.log(`warning  ${w}`);
for (const e of errors) console.error(`error    ${e}`);

console.log(
  `\nchecked ${files.length} files under docs/ and ${skills.length} skill(s) — ` +
    `${errors.length} error(s), ${warnings.length} warning(s)`
);
process.exit(errors.length ? 1 : 0);

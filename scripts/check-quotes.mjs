#!/usr/bin/env node
/**
 * Quote-anchor check — offline, no network.
 *
 * Every law card may carry a section headed `## Source quotes` (English cards)
 * or `## 原文引证` (Chinese cards). Each bullet in it pins a span of the
 * **official original text** to the snapshot it must be found in:
 *
 *     - `处二百万元以上一千万元以下罚款` — Art. 61 top band (snapshot: `snapshots/cn/cybersecurity-law.txt`)
 *
 * This is the difference between "the link is still alive" and "the sentence I
 * am quoting is still in the text". A link check says nothing about the second,
 * and 28 of the 45 hosts this repository cites are Chinese government sites that
 * CI deliberately does not probe (they refuse datacenter traffic).
 *
 * Verdicts per quote:
 *   present        — the string is in the snapshot, character for character
 *   drifted        — a majority of it is there but the tail differs (source moved,
 *                    or the card was edited into something the text no longer says)
 *   absent         — nothing recognizable is there
 *   unverifiable   — the snapshot is missing or unreadable
 *
 * Snapshots are self-certifying: the header records the official source URL and
 * the SHA-256 of the body, so an edited snapshot fails here rather than silently
 * becoming the new truth.
 *
 * Usage: node scripts/check-quotes.mjs [--quiet]
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import { createHash } from "node:crypto";

const DOCS = resolve("docs");
const ROOT = resolve(".");
const HEADINGS = ["## Source quotes", "## 原文引证"];
const OFFICIAL_HOSTS = [
  "eur-lex.europa.eu", "data.europa.eu", "ec.europa.eu", "digital-strategy.ec.europa.eu",
  "www.europarl.europa.eu", "www.npc.gov.cn", "flk.npc.gov.cn", "www.gov.cn", "www.cac.gov.cn",
  "www.moj.gov.cn", "www.news.cn", "www.mofcom.gov.cn", "policy.mofcom.gov.cn", "www.miit.gov.cn",
  "www.mps.gov.cn", "www.samr.gov.cn", "openstd.samr.gov.cn", "std.samr.gov.cn", "www.mee.gov.cn",
  "www.tc260.org.cn",
];

const quiet = process.argv.includes("--quiet");
const problems = [];
const fail = (where, message) => problems.push(`${where}: ${message}`);

/** Same normalisation the snapshot builder applies: whitespace carries no meaning in CJK statute text. */
const norm = (s) => s.replace(/[\s\u3000]+/g, "");

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (p.endsWith(".md")) out.push(p);
  }
  return out;
}
const rel = (p) => relative(ROOT, p).split(sep).join("/");

/** How much of the quote is present from its start — the drift signal. */
function longestPresentPrefix(quote, body) {
  let lo = 0, hi = quote.length;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (body.includes(quote.slice(0, mid))) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

const snapshots = new Map();
function loadSnapshot(path) {
  if (snapshots.has(path)) return snapshots.get(path);
  let entry;
  if (!existsSync(path)) {
    entry = { error: "snapshot file does not exist" };
  } else {
    const raw = readFileSync(path, "utf8");
    const lines = raw.split(/\r?\n/);
    const header = lines.filter((l) => l.startsWith("# "));
    const body = norm(lines.filter((l) => !l.startsWith("# ")).join(""));
    const source = (/^# source:\s*(\S+)/m.exec(raw) || [])[1];
    const declared = (/^# sha256\(body\):\s*([0-9a-f]{64})/m.exec(raw) || [])[1];
    const actual = createHash("sha256").update(body).digest("hex");
    let host = null;
    try { host = new URL(source).hostname; } catch { /* recorded below */ }
    entry = {
      body,
      error: !source
        ? "snapshot header has no `# source: <url>` line"
        : !OFFICIAL_HOSTS.includes(host)
          ? `snapshot source host is not an official host: ${host || source}`
          : !declared
            ? "snapshot header has no `# sha256(body):` line"
            : declared !== actual
              ? `snapshot body no longer matches its own header (sha256 ${actual.slice(0, 12)}…, header says ${declared.slice(0, 12)}…) — an edited snapshot is not evidence`
              : null,
    };
  }
  snapshots.set(path, entry);
  return entry;
}

let checked = 0;
const tally = { present: 0, drifted: 0, absent: 0, unverifiable: 0 };
const cardsWithSection = new Set();

for (const file of walk(DOCS)) {
  const where = rel(file);
  const text = readFileSync(file, "utf8");
  const start = HEADINGS.map((h) => text.indexOf(`\n${h}\n`)).find((i) => i >= 0);
  if (start === undefined || start < 0) continue;
  cardsWithSection.add(where);
  const section = text.slice(start + 1).split(/\n#{2,3}\s/)[0];
  for (const line of section.split(/\r?\n/)) {
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    if (!bullet) continue;
    const spans = [...bullet[1].matchAll(/`([^`]+)`/g)].map((m) => m[1]);
    const snap = spans.find((s) => s.startsWith("snapshots/"));
    const quotes = spans.filter((s) => !s.startsWith("snapshots/"));
    if (!snap) {
      fail(where, `quote bullet without a snapshot path: ${bullet[1].slice(0, 60)}…`);
      continue;
    }
    if (!quotes.length) {
      fail(where, `snapshot ${snap} referenced with no quoted original text in the bullet`);
      continue;
    }
    const snapshot = loadSnapshot(resolve(snap));
    for (const q of quotes) {
      checked += 1;
      const needle = norm(q);
      if (snapshot.error) {
        tally.unverifiable += 1;
        fail(where, `unverifiable — ${q.slice(0, 24)}… (${snapshot.error})`);
        continue;
      }
      if (snapshot.body.includes(needle)) { tally.present += 1; continue; }
      const hit = longestPresentPrefix(needle, snapshot.body);
      if (hit >= Math.max(6, Math.floor(needle.length * 0.6))) {
        tally.drifted += 1;
        problems.push(`${where}: DRIFTED — ${q.slice(0, 30)}… matches only to ${hit}/${needle.length} characters`);
      } else {
        tally.absent += 1;
        fail(where, `ABSENT — ${q.slice(0, 30)}… not in ${snap} (longest run from its start: ${hit}/${needle.length})`);
      }
    }
  }
}

// Every snapshot should be cited by at least one card, or it is dead weight that looks like evidence.
// This walk used to be hard-coded to `snapshots/cn`: the rule existed, but only one
// jurisdiction could ever trip it, so an EU snapshot could sit in the repository for
// ever without a single card citing it. It now walks every `snapshots/<jur>/`.
const cited = new Set();
for (const [, v] of snapshots) void v;
for (const file of walk(DOCS)) {
  const raw = readFileSync(file, "utf8");
  for (const m of raw.matchAll(/`(snapshots\/[^`]+)`/g)) cited.add(m[1]);
}
if (existsSync(resolve("snapshots"))) {
  for (const jur of readdirSync(resolve("snapshots"))) {
    const dir = resolve("snapshots", jur);
    if (!statSync(dir).isDirectory()) continue;
    for (const entry of readdirSync(dir)) {
      const path = `snapshots/${jur}/${entry}`;
      if (!cited.has(path)) {
        problems.push(`snapshots: ORPHAN — ${path} is in the repository but no card cites it`);
      }
    }
  }
}

const errors = problems.filter((p) => !p.includes("DRIFTED") && !p.includes("ORPHAN"));
if (!quiet) {
  console.log(`quotes checked: ${checked} — present ${tally.present}, drifted ${tally.drifted}, absent ${tally.absent}, unverifiable ${tally.unverifiable}`);
  console.log(`cards carrying a quote section: ${cardsWithSection.size}`);
  for (const p of problems) console.log(p.startsWith("snapshots:") ? p : `  ${p}`);
}
if (errors.length) {
  console.error(`check-quotes: ${errors.length} error(s)`);
  process.exit(1);
}

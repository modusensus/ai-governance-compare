#!/usr/bin/env node
/**
 * Official-text snapshot builder — a one-off tool, deliberately NOT wired into CI.
 *
 * `check-quotes.mjs` is offline by design: it asks one question — is the sentence
 * a card quotes still inside the snapshot on disk? Something has to put that text
 * there, and this is it: pull the official original, flatten it to plain text, and
 * write it under `snapshots/<jur>/<slug>.txt` with the header the checker
 * self-certifies against (`# source`, `# retrieved`, `# sha256(body):`, …).
 *
 * Two extraction rules, and the difference is the whole reason this tool has a
 * `--jur` switch:
 *   CN — Chinese statutes; deleting every whitespace character is lossless.
 *   EU — English; whitespace carries word boundaries, so flatten tag-aware:
 *        drop <script>/<style>/comments, turn block-level tags into newlines,
 *        drop inline tags (otherwise an <a> splits "deep fakes"), unescape
 *        entities, strip soft hyphens (U+00AD) and zero-width marks, NBSP → space.
 * Either way the body is whitespace-insensitive to the checker: both it and this
 * script hash and compare the body with all whitespace removed, so the recorded
 * `# sha256(body):` is stable across the two — and a hand-edited snapshot fails
 * the check instead of quietly becoming the new truth.
 *
 * The body is never printed: the AI Act alone flattens to ~582k characters. The
 * in-process assertions (a character floor plus required probes) are the guard;
 * only the journal line reaches the terminal.
 *
 * Usage:
 *   node scripts/snapshot.mjs --eu
 *   node scripts/snapshot.mjs --celex 32016R0679 --slug gdpr --what "..."
 *   node scripts/snapshot.mjs --url 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679' --slug gdpr --what "..."
 *   node scripts/snapshot.mjs --url 'https://www.cac.gov.cn/…' --jur cn --slug minors-draft --what "…" --probe '…'
 *
 * `--jur` selects the extraction rule and the `snapshots/<jur>/` directory. The
 * twelve CN snapshots predate this script and were flattened by hand: re-fetching
 * them through the CN rule reproduces nine byte for byte, while three differ only
 * where the hand flattening kept an HTML comment's text or a zero-width space that
 * `flattenHtml` strips — not legal text, and each stored body still hashes to its
 * own recorded `# sha256(body):`. So a re-fetch is a cross-check on a CN snapshot,
 * not a proof that the body on disk is the one you would get today. Their headers
 * record the shorter wording the hand flattening used, which is what those bodies
 * actually show; snapshots this script writes record the fuller rule above.
 */

import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { createHash } from "node:crypto";

const UA = "mneme-evidence-snapshot/1.0 (+https://github.com/slow-stack/ai-governance-compare)";
const BLOCK_TAGS = "address|article|aside|blockquote|br|caption|dd|div|dl|dt|fieldset|figcaption|figure|footer|form|h[1-6]|header|hr|li|main|nav|ol|p|pre|section|table|tbody|td|tfoot|th|thead|tr|ul";

/**
 * The 10 EU instruments this repository's EU cards rest on, all verified reachable
 * from this machine on 2026-10-11. Regulations are `3<year>R<number>` and
 * directives are `3<year>L<number>` — asking for a directive with `R` returns 404.
 *
 * `probes` are strings the flattened body must contain (whitespace-insensitive,
 * case-insensitive); they exist to catch a bad extraction, not to be evidence.
 * `minChars` is the floor below which the extraction is presumed broken.
 */
const EU_SOURCES = [
  { celex: "32024R1689", slug: "ai-act", minChars: 400000, what: "Regulation (EU) 2024/1689 (AI Act) — full text", probes: ["35 000 000", "machine-readable", "Article 99", "2 August 2026"] },
  { celex: "32026R1744", slug: "ai-act-amendment", minChars: 8000, what: "Regulation (EU) 2026/1744 — amendment to the AI Act (deferred high-risk dates)", probes: ["2 December 2027", "2 August 2028", "2024/1689"] },
  { celex: "32016R0679", slug: "gdpr", minChars: 60000, what: "Regulation (EU) 2016/679 (GDPR) — full text", probes: ["20 000 000", "10 000 000", "4 %", "2 %"] },
  { celex: "32022R2065", slug: "dsa", minChars: 80000, what: "Regulation (EU) 2022/2065 (Digital Services Act) — full text", probes: ["6 %", "17 February 2024"] },
  { celex: "32022R1925", slug: "dma", minChars: 60000, what: "Regulation (EU) 2022/1925 (Digital Markets Act) — full text", probes: ["10 %", "20 %"] },
  // DGA and the Data Act set no EU-level fine cap of their own — both leave penalties to
  // Member States (DGA recital 55, Data Act recital 109). First-draft probes guessed caps
  // that do not exist in either text; these are the strings the texts actually carry.
  { celex: "32022R0868", slug: "dga", minChars: 50000, what: "Regulation (EU) 2022/868 (Data Governance Act) — full text", probes: ["24 September 2023", "lay down rules on penalties"] },
  { celex: "32023R2854", slug: "data-act", minChars: 60000, what: "Regulation (EU) 2023/2854 (Data Act) — full text", probes: ["12 September 2025", "could include financial penalties"] },
  { celex: "32024R2847", slug: "cra", minChars: 100000, what: "Regulation (EU) 2024/2847 (Cyber Resilience Act) — full text", probes: ["11 September 2026", "11 December 2027"] },
  { celex: "32022L2555", slug: "nis2", minChars: 60000, what: "Directive (EU) 2022/2555 (NIS2) — full text", probes: ["17 October 2024"] },
  { celex: "32024L2853", slug: "pld", minChars: 40000, what: "Directive (EU) 2024/2853 (new Product Liability Directive) — full text", probes: ["9 December 2026"] },
];

const argv = process.argv.slice(2);
const flag = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 ? (argv[i + 1] ?? "") : null;
};
const has = (name) => argv.includes(name);

/** Named + numeric HTML entities that actually occur in EU legal texts. */
const ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", shy: "",
  ndash: "–", mdash: "—", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
  hellip: "…", middot: "·", deg: "°", eacute: "é", egrave: "è", agrave: "à",
  ccedil: "ç", uuml: "ü", ouml: "ö", auml: "ä", szlig: "ß", euro: "€",
  sect: "§", para: "¶", copy: "©", reg: "®", trade: "™", laquo: "«", raquo: "»",
  bull: "•", dagger: "†", times: "×", frac12: "½", frac14: "¼",
};

function unescapeHtml(text) {
  return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]*);/g, (match, body) => {
    if (body[0] === "#") {
      const code = body[1] === "x" || body[1] === "X" ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      return Number.isFinite(code) && code > 0 ? String.fromCodePoint(code) : match;
    }
    const named = ENTITIES[body.toLowerCase()];
    return named === undefined ? match : named;
  });
}

/**
 * Tag-aware flattening, in the order the plan validated: script/style first (their
 * contents are not text), then block boundaries, then the remaining tags, then
 * entities — unescaping last so an escaped `&lt;p&gt;` in the source does not
 * become a layout break.
 */
function flattenHtml(html) {
  let out = html;
  out = out.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ");
  out = out.replace(/<!--[\s\S]*?-->/g, " ");
  out = out.replace(new RegExp(`</?(?:${BLOCK_TAGS})\\b[^>]*>`, "gi"), "\n");
  out = out.replace(/<[^>]+>/g, "");
  out = unescapeHtml(out);
  out = out.replace(/[\u00ad\u200b\u200c\u200d\ufeff]/g, "");
  out = out.replace(/[\u00a0\u2007\u202f]/g, " ");
  out = out.replace(/\r\n?/g, "\n");
  out = out.split("\n").map((line) => line.replace(/[ \t\f\v]+/g, " ").trim()).join("\n");
  out = out.replace(/\n{3,}/g, "\n\n").trim();
  return out;
}

/** The checker's own normalisation: whitespace carries no meaning in evidence text. */
const norm = (s) => s.replace(/[\s\u3000]+/g, "");
const normLoose = (s) => norm(s).toLowerCase();

/**
 * The hash must match what `check-quotes.mjs` computes: every line that does not
 * start with `# ` (the header), joined, with all whitespace removed. A body line
 * beginning with `# ` would be read as header and silently dropped from the body,
 * so such a line is indented by one space — visually identical, and `norm` erases
 * the difference anyway.
 */
function bodyForHash(body) {
  return body
    .split("\n")
    .map((line) => (line.startsWith("# ") ? ` ${line}` : line))
    .join("\n");
}

/**
 * `# chars` counts the body the way the checker measures it — all whitespace
 * removed — so the number means the same thing on a CN snapshot (whose extraction
 * deletes whitespace outright) and an EU one (which keeps it for word boundaries).
 */
function header(source, what, body, extraction) {
  const hashed = norm(bodyForHash(body).split("\n").filter((l) => !l.startsWith("# ")).join(""));
  return [
    "# 官方原文快照 —— 只作证据底稿，不是本库撰写的文档",
    `# source: ${source}`,
    `# what: ${what}`,
    `# retrieved: ${new Date().toISOString().slice(0, 10)}`,
    `# extraction: ${extraction}`,
    `# sha256(body): ${createHash("sha256").update(hashed).digest("hex")}`,
    `# chars: ${hashed.length}`,
    "",
  ].join("\n");
}

const EU_EXTRACTION = "去 <script>/<style>/注释，块级标签换行为界、行内标签删除，html.unescape，去软连字符与零宽字符，NBSP→空格（英文保留词边界：与 CN 的「删全部空白」不同；两侧在 check-quotes 里统一按「去空白」比对）";

const CN_EXTRACTION = "去 <script>/<style>/注释，去全部标签，html.unescape，去软连字符与零宽字符，删除所有空白字符";

/**
 * The two rules, in the shape the rest of the script needs them. `flatten` maps
 * raw HTML to the body that gets hashed; `extraction` is the sentence written
 * into the header, and it is the *whole* rule — a snapshot whose header misdescribes
 * how its body was made is a snapshot nobody can rebuild, which is why the EU rule
 * above spells out its four deviations from the CN one instead of saying "like CN
 * but tag-aware".
 */
const JURISDICTIONS = {
  eu: { flatten: flattenHtml, extraction: EU_EXTRACTION },
  cn: { flatten: (html) => flattenHtml(html).replace(/[\s\u3000]+/g, ""), extraction: CN_EXTRACTION },
};

/** The extraction rule for a job's jurisdiction; an unknown `--jur` is a typo, not a default. */
function jurisdictionFor(jur) {
  const found = JURISDICTIONS[jur];
  if (!found) throw new Error(`unknown --jur "${jur}" — known: ${Object.keys(JURISDICTIONS).join(", ")}`);
  return found;
}

/**
 * EUR-Lex answers a burst of requests with an occasional ~150-character stub
 * instead of the document — observed twice while building this set: the same URL
 * fetches 807 KB on its own and 158 characters inside a batch. That is a reason to
 * retry, not a reason to lower the floor. The stub's head is kept in the error so a
 * genuine extraction bug stays legible, and the floor stays where it was.
 */
async function oneOnce(job) {
  const res = await fetch(job.source, { headers: { "user-agent": UA, accept: "text/html,*/*" } });
  const html = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${job.source}`);
  const body = bodyForHash(job.flatten(html));
  if (body.length < job.minChars) {
    throw new Error(
      `flattened body is ${body.length} chars (html ${html.length}), below the ${job.minChars} floor — stub response or broken extraction; head=${JSON.stringify(body.slice(0, 120))}`
    );
  }
  const haystack = normLoose(body);
  const probes = job.probes ?? [];
  const found = probes.filter((p) => haystack.includes(normLoose(p)));
  const missing = probes.filter((p) => !haystack.includes(normLoose(p)));
  if (probes.length && !found.length) {
    throw new Error(`none of the probes are in the body (${probes.join(" | ")}) — the extraction does not look like this text`);
  }
  return { body, found, missing };
}

async function one(job) {
  const retries = job.retries ?? 3;
  let last;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const { body, found, missing } = await oneOnce(job);
      const file = resolve(join("snapshots", job.jur, `${job.slug}.txt`));
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, `${header(job.source, job.what, body, job.extraction)}${body}\n`, "utf8");
      return { slug: job.slug, chars: norm(body).length, probes: `${found.length}/${(job.probes ?? []).length}`, missing };
    } catch (error) {
      last = error;
      if (attempt < retries) {
        const wait = 500 * 3 ** (attempt - 1);
        console.error(`retry ${job.slug} ${attempt}/${retries} in ${wait}ms — ${String(error.message).slice(0, 160)}`);
        await new Promise((r) => setTimeout(r, wait));
      }
    }
  }
  throw last;
}

/**
 * `--rehash` — offline header repair, no network. Recomputes `# chars` and
 * `# sha256(body):` from the body already on disk and rewrites nothing else.
 *
 * Needed for two real situations this set ran into: EUR-Lex's bot challenge can
 * block a rebuild while the stored snapshot is still perfectly good, and `# chars`
 * changed meaning once (raw character count → the whitespace-free count the checker
 * itself measures, so the number means the same thing on CN and EU snapshots).
 */
function rehashSnapshots() {
  const root = resolve("snapshots");
  let changed = 0;
  let seen = 0;
  for (const jur of readdirSync(root)) {
    const dir = join(root, jur);
    if (!statSync(dir).isDirectory()) continue;
    for (const entry of readdirSync(dir).sort()) {
      const file = join(dir, entry);
      const raw = readFileSync(file, "utf8");
      if (!/^# sha256\(body\):/m.test(raw)) continue;
      seen += 1;
      const hashed = norm(raw.split(/\r?\n/).filter((l) => !l.startsWith("# ")).join(""));
      const next = raw
        .replace(/^# sha256\(body\):.*$/m, `# sha256(body): ${createHash("sha256").update(hashed).digest("hex")}`)
        .replace(/^# chars:.*$/m, `# chars: ${hashed.length}`);
      if (next === raw) {
        console.log(`keep  ${jur}/${entry}`);
        continue;
      }
      writeFileSync(file, next, "utf8");
      changed += 1;
      console.log(`fix   ${jur}/${entry}  chars=${hashed.length}`);
    }
  }
  console.log(`rehash: ${seen} snapshot(s), ${changed} header(s) rewritten`);
}

async function main() {
  if (has("--rehash")) {
    rehashSnapshots();
    return;
  }
  const jobs = [];
  if (has("--eu")) {
    for (const src of EU_SOURCES) {
      const { flatten, extraction } = jurisdictionFor("eu");
      jobs.push({
        ...src,
        jur: "eu",
        flatten,
        extraction,
        source: `https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:${src.celex}`,
      });
    }
  } else {
    const celex = flag("--celex");
    const url = flag("--url");
    const slug = flag("--slug");
    const what = flag("--what");
    if ((!celex && !url) || !slug || !what) {
      console.error('usage: node scripts/snapshot.mjs --eu | --celex <id> | --url <url> --slug <name> --what "<what>" [--jur eu|cn] [--min-chars N] [--probe <string>]...');
      process.exit(2);
    }
    const jur = flag("--jur") ?? "eu";
    const { flatten, extraction } = jurisdictionFor(jur);
    // `--probe` may repeat; the probes are asserted in-process and never printed as
    // evidence, so a one-off CN pull can name the sentences it expects to find.
    const probes = [];
    for (let i = 0; i < argv.length; i += 1) if (argv[i] === "--probe" && argv[i + 1]) probes.push(argv[i + 1]);
    jobs.push({
      source: url ?? `https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:${celex}`,
      jur,
      flatten,
      extraction,
      slug,
      what,
      minChars: Number(flag("--min-chars") ?? 10000),
      probes,
    });
  }

  for (const job of jobs) {
    try {
      const r = await one(job);
      console.log(`ok   ${r.slug.padEnd(20)} chars=${String(r.chars).padStart(7)}  probes=${r.probes}${r.missing.length ? `  MISSING: ${r.missing.join(" | ")}` : ""}`);
    } catch (error) {
      console.error(`FAIL ${job.slug.padEnd(20)} ${error.message}`);
      process.exitCode = 1;
    }
  }
}

await main();

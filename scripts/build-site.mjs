#!/usr/bin/env node
/**
 * Build the GitHub Pages site from the Markdown under docs/.
 *
 *   node scripts/build-site.mjs            →  _site/
 *
 * The repository stays the single source of truth: this script only reads
 * docs/**\/*.md and never writes into it. Nothing is hand-authored for the site —
 * every page, index row and metadata line is derived from a file's front matter,
 * so a card cannot read differently on the site than it does in Git.
 *
 * Two rules keep the output honest:
 *
 *   1. URLs mirror file paths one to one. `docs/eu/ai-act.md` becomes
 *      `eu/ai-act/`, and `docs/eu/ai-act-zh.md` becomes `eu/ai-act-zh/`. The
 *      `-zh` suffix is the repository's own translation convention, so the
 *      address a reader sees is the file a contributor edits.
 *   2. Every link is rewritten to something that resolves. A relative link to a
 *      published document becomes a relative site URL; a relative link to a file
 *      that is not published (CONTRIBUTING.md, the root README) becomes a link
 *      to that file on GitHub. A published site has no dead links.
 *
 * All internal URLs are relative rather than rooted, so the same output works
 * from a `file://` preview, from a project page under `/ai-governance-compare/`,
 * and from a custom domain without a rebuild.
 *
 * Front matter is parsed with the same rules as scripts/check-docs.mjs, and
 * heading anchors use the same slug function, so an anchor that resolves in Git
 * resolves on the site.
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, relative, dirname, basename, sep } from "node:path";
import { marked } from "./site/vendor/marked.esm.js";

const ROOT = resolve(".");
const DOCS = join(ROOT, "docs");
const OUT = join(ROOT, "_site");
const REPO = "https://github.com/modusensus/ai-governance-compare";
/** Pages serves a project site at <owner>.github.io/<repo>; SITE_URL overrides it. */
const PAGES_URL = `https://${REPO.replace("https://github.com/", "").replace("/", ".github.io/")}`;
const SITE_URL = (process.env.SITE_URL || PAGES_URL).replace(/\/$/, "");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Identical to the slug in check-docs.mjs — keep the two in step. */
function slug(heading) {
  return heading
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/\s+/g, "-");
}

function parseFrontMatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text);
  if (!m) return { fields: new Map(), body: text };
  const fields = new Map();
  for (const raw of m[1].split(/\r?\n/)) {
    if (!raw.trim() || raw.trimStart().startsWith("#")) continue;
    const kv = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/.exec(raw);
    if (kv) fields.set(kv[1], kv[2].replace(/\s+#.*$/, "").trim());
  }
  return { fields, body: text.slice(m[0].length) };
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir).sort()) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (p.endsWith(".md")) out.push(p);
  }
  return out;
}

/** docs/eu/ai-act.md → eu/ai-act/ ; docs/README.md → guide/ */
function urlOf(docRel) {
  if (docRel === "README.md") return "guide/";
  return `${docRel.replace(/\.md$/, "")}/`;
}

// --------------------------------------------------------------------------------
// collect documents

const documents = walk(DOCS).map((file) => {
  const docRel = relative(DOCS, file).split(sep).join("/");
  const { fields, body } = parseFrontMatter(readFileSync(file, "utf8"));
  const url = urlOf(docRel);
  const zh = docRel.endsWith("-zh.md");
  return {
    file,
    docRel,
    url,
    depth: url.split("/").filter(Boolean).length, // eu/ai-act/ → two levels up to the root
    lang: zh ? "zh-Hans" : "en",
    fm: fields,
    body,
  };
});

const byDocPath = new Map(); // repo-relative path with .md → document
for (const d of documents) byDocPath.set(`docs/${d.docRel}`, d);

const up = (depth) => "../".repeat(depth);

// --------------------------------------------------------------------------------
// per-page HTML transforms

/**
 * Anchor ids, table labels and the language-switch line.
 *
 * Tables carry `data-label` on every cell so the CSS can turn an EU | China
 * comparison into stacked blocks on a narrow screen. The alternative — a
 * horizontal scrollbar — would put the two jurisdictions out of sight of each
 * other, which is the one thing these tables exist to prevent.
 */
function renderBody(html) {
  const toc = [];
  const seen = new Map();
  html = html.replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g, (_, level, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#\d+;/g, "");
    let id = slug(text);
    if (!id) return `<h${level}>${inner}</h${level}>`;
    seen.set(id, (seen.get(id) ?? 0) + 1);
    if (seen.get(id) > 1) id += `-${seen.get(id) - 1}`;
    if (level === "2") toc.push({ id, text });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

  html = html.replace(/<table>[\s\S]*?<\/table>/g, (whole) => {
    const rowMatches = [...whole.matchAll(/<tr>[\s\S]*?<\/tr>/g)];
    if (rowMatches.length < 2) return `<div class="table-wrap">${whole}</div>`;
    const headers = [...rowMatches[0][0].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) =>
      m[1].replace(/<[^>]+>/g, "").trim()
    );
    let pos = 0;
    let out = "";
    rowMatches.forEach((m, ri) => {
      let i = 0;
      const row =
        ri === 0
          ? m[0]
          : m[0].replace(/<td([^>]*)>([\s\S]*?)<\/td>/g, (mm, attrs, cell) => {
              const label = headers[i++];
              const text = cell.replace(/<[^>]+>/g, "").trim();
              const grade = /^[ABC]$/.test(text) ? text : "";
              const cls = /c-date/.test(attrs)
                ? attrs
                : /^\s*\d{4}-\d{2}-\d{2}\s*$/.test(text)
                  ? `${attrs} class="c-date"`
                  : attrs;
              const labelled = label && !/data-label/.test(cls) ? `${cls} data-label="${esc(label)}"` : cls;
              // One wrapper span per cell: the narrow-screen layout makes the cell
              // a two-column grid (label, value), and bare text plus <strong>
              // children would each become their own grid item.
              return `<td${labelled}><span class="cc">${
                grade
                  ? `<span class="m-grade g-${grade.toLowerCase()}">${grade}</span>`
                  : cell
              }</span></td>`;
            });
      out += whole.slice(pos, m.index) + row;
      pos = m.index + m[0].length;
    });
    return `<div class="table-wrap">${out}${whole.slice(pos)}</div>`;
  });

  // The authored switch line — `English · [中文](x-zh.md)` — becomes the byline.
  html = html.replace(
    /<p>(English|中文)\s*·\s*<a href="([^"]+)">([^<]*)<\/a><\/p>/,
    '<p class="lang-switch">$1 · <a href="$2">$3</a></p>'
  );

  return { html, toc };
}

/**
 * Rewrite a relative href into something that resolves on the site. The match
 * stops at the closing quote of `href`, so the replacement must not add the `>`
 * that follows it.
 */
function rewriteLinks(html, doc) {
  return html.replace(/<a href="([^"]*)"/g, (whole, href) => {
    if (/^(https?:|mailto:|tel:|#|\/)/i.test(href)) return whole;
    const [rawPath, anchor] = href.split("#");
    const hash = anchor ? `#${anchor}` : "";
    if (!rawPath) return whole;

    const from = dirname(join(ROOT, "docs", doc.docRel));
    let target;
    try {
      target = relative(ROOT, resolve(from, decodeURI(rawPath))).split(sep).join("/");
    } catch {
      return whole;
    }
    if (/^[a-zA-Z]:|^\.\./.test(target)) return whole;

    if (target.endsWith(".md")) {
      const doc_ = byDocPath.get(target);
      if (doc_) return `<a href="${up(doc.depth)}${doc_.url}${hash}"`;
    }
    if (target.startsWith("docs/")) {
      return `<a href="${up(doc.depth)}assets/${esc(basename(target))}"`;
    }
    return `<a href="${REPO}/blob/main/${encodeURI(target)}${hash}"`;
  });
}

// --------------------------------------------------------------------------------
// page furniture

/* Chrome labels follow the page's language. The *values* stay as written in the
   front matter — `in-force` is a schema enum, and translating it would invent a
   legal term the repository does not define. */
const LABEL = {
  en: { authority: "authority", published: "published", effective: "effective", applies: "applies", status: "status", checked: "checked", source: "source", grade: "Grade", compare: "Compare", china: "China", onpage: "On this page", dark: "Dark", light: "Light" },
  zh: { authority: "发布机关", published: "公布", effective: "施行", applies: "适用", status: "状态", checked: "核查", source: "来源", grade: "等级", compare: "对照", china: "中国", onpage: "本页", dark: "深色", light: "浅色" },
};

const labels = (doc) => LABEL[doc.lang === "en" ? "en" : "zh"];

function metaStrip(doc) {
  const { fm } = doc;
  const L = labels(doc);
  const bits = [];
  const jurisdiction = fm.get("jurisdiction");
  const status = fm.get("status");
  const evidence = fm.get("evidence");
  const verified = fm.get("verified");
  if (jurisdiction) bits.push(`<span class="m-jur">${esc(jurisdiction)}</span>`);
  if (status) bits.push(`<span>${esc(status)}</span>`);
  if (evidence) {
    // A card grades itself with one letter; a comparison grades per row and says so.
    bits.push(
      /^[ABC]$/.test(evidence)
        ? `<span class="m-grade g-${evidence.toLowerCase()}">${L.grade} ${evidence}</span>`
        : `<span>${esc(evidence)}</span>`
    );
  }
  if (verified) bits.push(`<span>${L.checked} ${esc(verified)}</span>`);
  const source = fm.get("source");
  if (source) {
    const links = source
      .split(/\s+/)
      .filter((t) => /^https?:\/\//.test(t))
      .map((t, i, all) => `<a href="${esc(t)}" rel="noopener">${L.source}${all.length > 1 ? ` ${i + 1}` : ""} ↗</a>`);
    bits.push(links.join(" "));
  }
  return bits.length ? `<p class="meta-strip">${bits.join('<span class="sep">·</span>')}</p>` : "";
}

function cardMeta(doc) {
  const { fm } = doc;
  const L = labels(doc);
  const rows = [
    ["authority", fm.get("authority")],
    ["published", fm.get("published")],
    ["effective", fm.get("effective")],
    ["applies", fm.get("applies")],
    ["status", fm.get("status")],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `<div><dt>${L[k]}</dt><dd>${esc(v)}</dd></div>`);
  if (!rows.length) return "";
  return `<dl class="card-meta">${rows.join("")}</dl>`;
}

/** The translation sitting beside a file: `x.md` ↔ `x-zh.md`, per CONTRIBUTING.md. */
function siblingOf(docRel) {
  const alt = docRel.endsWith("-zh.md") ? `${docRel.slice(0, -6)}.md` : `${docRel.replace(/\.md$/, "")}-zh.md`;
  return documents.find((d) => d.docRel === alt);
}

function layout(doc, bodyHtml) {
  const { fm, depth, lang } = doc;
  const title = fm.get("title") || doc.docRel;
  const sibling = siblingOf(doc.docRel);
  const zh = lang !== "en";
  const L = labels(doc);
  const nav = [
    [`${zh ? "首页" : "Home"}`, up(depth)],
    [`${zh ? "对照" : "Compare"}`, `${up(depth)}#compare`],
    ["EU", `${up(depth)}#eu`],
    [`${zh ? "中国" : "China"}`, `${up(depth)}#cn`],
    ["GitHub ↗", REPO],
  ]
    .map(([label, href]) => `<a href="${href}"${href === REPO ? ' rel="noopener"' : ""}>${label}</a>`)
    .join("");
  const toggle = `<button class="theme-toggle" type="button"><span class="t-when-light">${L.dark}</span><span class="t-when-dark">${L.light}</span></button>`;

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<script>try{var t=localStorage.getItem("agc-theme");if(t)document.documentElement.setAttribute("data-theme",t);}catch(e){}</script>
<title>${esc(title)}</title>
<meta name="description" content="${esc(fm.get("evidence") ? `${L.grade} ${fm.get("evidence")}` : "")} ${esc(
    zh ? "欧盟与中国 AI 与数据监管对照" : "EU × China AI and data governance, source-traceable"
  )}">
<link rel="icon" href="${up(depth)}assets/logo.png">
<link rel="stylesheet" href="${up(depth)}style.css">
${sibling ? `<link rel="alternate" hreflang="${sibling.lang}" href="${SITE_URL}/${sibling.url}">` : ""}
</head>
<body${doc.docRel ? "" : ' class="home"'}>
<header class="masthead">
  <a class="wordmark" href="${up(depth)}">AI Governance Compare</a>
  <nav>${nav}${toggle}</nav>
</header>
<main>
${bodyHtml}
</main>
<footer>
  <p class="foot-line">${
    zh
      ? "本仓库是公开知识库，<strong>不是法律意见</strong>。法律会变，请核对你所读卡片上的 <code>verified</code> 日期。"
      : "A public knowledge base, <strong>not legal advice</strong>. Laws change — check the <code>verified</code> date on the card you are reading."
  }</p>
  <p class="foot-meta">
    <a href="${REPO}">${REPO.replace("https://", "")}</a> ·
    ${zh ? "文档 CC BY-SA 4.0 · 代码 MIT" : "documents CC BY-SA 4.0 · code MIT"} ·
    <a href="${up(depth)}guide/">${zh ? "阅读与写作规则" : "reading guide"}</a>
  </p>
</footer>
<script>
(function () {
  var root = document.documentElement;
  function isDark() {
    var set = root.getAttribute("data-theme");
    return set ? set === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  document.querySelectorAll(".theme-toggle").forEach(function (button) {
    button.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("agc-theme", next); } catch (e) {}
    });
  });
})();
</script>
</body>
</html>
`;
}

// --------------------------------------------------------------------------------
// landing page

/**
 * The two rails answer different questions, so they are not the same table.
 * A comparison has no status and no effective date — it is not an instrument —
 * and it grades each row rather than itself. Printing "compare" and "—" in
 * those columns for every row, as one shared table would, is noise that hides
 * the one column that does vary.
 */
function landingRow(doc, kind) {
  const { fm } = doc;
  const link = `<td class="c-title"><a href="${doc.url}">${esc(fm.get("title") || doc.docRel)}</a></td>`;
  const checked = `<td class="c-date" data-label="checked">${esc(fm.get("verified") || "")}</td>`;
  if (kind === "compare") return `<tr>${link}${checked}</tr>`;
  const evidence = fm.get("evidence") || "";
  const grade = /^[ABC]$/.test(evidence)
    ? `<span class="m-grade g-${evidence.toLowerCase()}">${evidence}</span>`
    : esc(evidence);
  return `<tr>${link}<td data-label="status">${esc(fm.get("status") || "")}</td><td class="c-date" data-label="effective">${esc(
    fm.get("effective") || "—"
  )}</td><td class="c-grade" data-label="grade">${grade}</td>${checked}</tr>`;
}

function landingRail(id, zhHeading, enHeading, docs, kind) {
  if (!docs.length) return "";
  const head = (kind === "compare" ? ["comparison", "checked"] : ["instrument", "status", "effective", "grade", "checked"])
    .map((h) => `<th>${esc(h)}</th>`)
    .join("");
  return `<section id="${id}">
  <h2>${esc(enHeading)} <span class="alt">${esc(zhHeading)}</span></h2>
  <div class="table-wrap"><table class="index-${kind}"><thead><tr>${head}</tr></thead><tbody>${docs
    .map((d) => landingRow(d, kind))
    .join("")}</tbody></table></div>
</section>`;
}

function landingPage() {
  const compare = documents
    .filter((d) => d.fm.get("type") === "compare" && d.lang === "en")
    .sort((a, b) => a.docRel.localeCompare(b.docRel));
  const eu = documents
    .filter((d) => d.fm.get("jurisdiction") === "EU" && d.lang === "en")
    .sort((a, b) => a.docRel.localeCompare(b.docRel));
  const cn = documents
    .filter((d) => d.fm.get("jurisdiction") === "CN" && d.lang === "en")
    .sort((a, b) => a.docRel.localeCompare(b.docRel));
  const zhCompare = documents.filter((d) => d.fm.get("type") === "compare" && d.lang !== "en");

  const body = `
<section class="hero">
  <img src="assets/logo.png" alt="AI Governance Compare — EU × China · Laws · Evidence · Trust" width="420" height="315">
  <blockquote class="principle"><p>
    <strong>Nothing enters this repository without a source.</strong><br>
    <span lang="zh-Hans">任何主张，没有一手来源就不进这个仓库。</span>
  </p></blockquote>
  <p>A source-traceable comparison of how the EU and China regulate AI and data. Each comparison answers one
     legal question, and every key claim carries an evidence grade and the date it was last checked.</p>
  <p lang="zh-Hans">欧盟与中国如何监管 AI 与数据的<strong>可溯源对照</strong>：一份对比回答一个法律问题，
     每条关键主张都标注<strong>证据等级</strong>与<strong>最后核查日期</strong>。
     <a href="compare/00-overview-zh/">中文总览</a>。</p>
</section>

${landingRail("compare", "按问题对照", "Comparisons — one question each", compare, "compare")}
${landingRail("eu", "欧盟法条卡片", "EU law cards", eu, "card")}
${landingRail("cn", "中国法条卡片", "China law cards", cn, "card")}

<section id="zh">
  <h2>Chinese translations <span class="alt">中文译本</span></h2>
  <p>English is the default. A translation sits beside its source file with a <code>-zh</code> suffix;
     the switch line under each heading links the two.</p>
  <ul class="zh-list">${zhCompare
    .map((d) => `<li><a href="${d.url}">${esc(d.fm.get("title") || d.docRel)}</a></li>`)
    .join("")}</ul>
</section>

<section id="grades">
  <h2>Evidence grades <span class="alt">证据等级</span></h2>
  <div class="table-wrap"><table><thead><tr><th>Grade</th><th>Meaning</th><th>Can support a conclusion</th></tr></thead><tbody>
    <tr><td><span class="m-grade g-a">A</span></td><td data-label="Meaning">The primary official text — statute, regulation, mandatory standard — checked live against the link in <code>source</code></td><td data-label="Can support a conclusion">yes</td></tr>
    <tr><td><span class="m-grade g-b">B</span></td><td data-label="Meaning">Another official source, or a direct mechanical reading of the primary text</td><td data-label="Can support a conclusion">as an official reading — say which</td></tr>
    <tr><td><span class="m-grade g-c">C</span></td><td data-label="Meaning">This repository's own comparison or inference, or a claim not yet traced back to the primary text</td><td data-label="Can support a conclusion">never on its own</td></tr>
  </tbody></table></div>
  <p class="fine">The same table opens <a href="guide/">the reading guide</a> and
     <a href="compare/00-overview/">the overview</a>; <a href="${REPO}/blob/main/CONTRIBUTING.md">CONTRIBUTING.md</a>
     is the binding version.</p>
</section>

<section id="use">
  <h2>Use it from an agent <span class="alt">给智能体用</span></h2>
  <p>The same content is published as an agent skill — one line, nothing to install. See
     <a href="${REPO}/blob/main/skills/ai-governance-compare/SKILL.md">skills/ai-governance-compare/SKILL.md</a>.</p>
</section>`;

  return layout(
    { fm: new Map([["title", "AI Governance Compare — EU × China · Laws · Evidence · Trust"]]), depth: 0, lang: "en", docRel: "" },
    body,
  );
}

// --------------------------------------------------------------------------------
// write

rmSync(OUT, { recursive: true, force: true });
const write = (url, html) => {
  const file = join(OUT, url, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
};

marked.use({ gfm: true, breaks: false });

for (const doc of documents) {
  const rendered = renderBody(marked.parse(doc.body));
  let body = rewriteLinks(rendered.html, doc).trim();

  // The title and the language switch lead the page; provenance follows, then
  // the argument. Reading the grade before the name of the law is backwards.
  let head = "";
  const h1 = /^<h1[^>]*>[\s\S]*?<\/h1>/.exec(body);
  if (h1) {
    head = h1[0];
    body = body.slice(h1[0].length).trim();
    const ls = /^<p class="lang-switch">[\s\S]*?<\/p>/.exec(body);
    if (ls) {
      head += `\n${ls[0]}`;
      body = body.slice(ls[0].length).trim();
    }
    if (!doc.fm.get("title")) {
      doc.fm.set(
        "title",
        head
          .replace(/<[^>]+>/g, "")
          .replace(/&#39;/g, "'")
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, "&")
          .trim()
      );
    }
  }

  const kind = doc.fm.get("type") === "compare" ? "is-compare" : "is-card";
  const article = `<article class="${kind}">\n${head}\n${metaStrip(doc)}\n${cardMeta(doc)}\n${body}\n</article>`;

  // The left sidebar is the site map: the three sections with every canonical
  // page, the current one marked — a Chinese page marks its English sibling, so
  // a reader sees where they are in the tree either way. Under it, the page's
  // own sections. It is the first element in the DOM and hidden below 1180 px,
  // so a phone reads title, provenance, argument — in that order.
  const L = labels(doc);
  const current = doc.docRel.endsWith("-zh.md") ? `${doc.docRel.slice(0, -6)}.md` : doc.docRel;
  const group = (key, label) => {
    const items = documents
      .filter((d) => d.docRel.startsWith(`${key}/`) && d.lang === "en")
      .sort((a, b) => a.docRel.localeCompare(b.docRel))
      .map(
        (d) =>
          `<li><a class="${d.docRel === current ? "on" : ""}" href="${up(doc.depth)}${d.url}">${esc(
            d.fm.get("title") || d.docRel
          )}</a></li>`
      )
      .join("");
    return `<p class="sn-cap">${label}</p><ul>${items}</ul>`;
  };
  const onpage = rendered.toc.length
    ? `<p class="sn-cap">${L.onpage}</p><ul>${rendered.toc
        .map((t) => `<li><a href="#${t.id}">${esc(t.text)}</a></li>`)
        .join("")}</ul>`
    : "";
  const sidenav = doc.docRel
    ? `\n<nav class="sidenav">${group("compare", L.compare)}${group("eu", "EU")}${group(
        "cn",
        L.china
      )}${onpage}</nav>`
    : "";
  write(doc.url, layout(doc, sidenav + article));
}

write("", landingPage());

mkdirSync(join(OUT, "assets"), { recursive: true });
copyFileSync(join(ROOT, "assets", "logo.png"), join(OUT, "assets", "logo.png"));
copyFileSync(join(ROOT, "scripts", "site", "style.css"), join(OUT, "style.css"));
writeFileSync(join(OUT, ".nojekyll"), "");

writeFileSync(
  join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${["", ...documents.map((d) => d.url)]
  .map((u) => `  <url><loc>${SITE_URL}/${u}</loc></url>`)
  .join("\n")}
</urlset>
`
);

const count = documents.length + 1;
console.log(`built ${count} pages into ${relative(ROOT, OUT)}/ from ${documents.length} documents`);

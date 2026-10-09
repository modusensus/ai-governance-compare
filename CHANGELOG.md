# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.10.0] - 2026-10-10

### Added

- `docs/cn/generative-ai-services-measures-zh.md` 与 `docs/cn/deep-synthesis-provisions-zh.md` — 两张新中文卡片，与 #10、#11 的英文卡片配成对（两边都补了语言切换行）。措辞不回译：正文按网信办官方全文逐条落，凡引法条的加粗片段都要求在官方文本中逐字定位（生成式 45/60、深度合成 54/74，其余为本库自己的标签与分析语）。审计改回官方写法的十处包括：`准确性和可靠性`被写成`准确性、可靠性`、`制定和公开`被写成`制定并公开`、`暂停或者终止向其提供服务`被简写成`暂停或者终止服务`、`标明其备案编号`丢了`其`、`提示深度合成服务使用者`被缩成`提示使用者`，以及生成式办法第二十一条的兜底前提被写成"这些法律没有规定的"。另把"网络安全法 1000 万元"的链接从网络安全法卡片改指到实际记载该数字的责任卡片，并在两处注明该卡罚则段仍待补。
- `docs/cn/deep-synthesis-provisions.md` — a card for **《互联网信息服务深度合成管理规定》**（网信办、工信部、公安部令**第 12 号**：2022-11-03 国家网信办 2022 年第 21 次室务会议审议通过，2022-11-25 签署公布，**2023-01-10 施行**，五章二十五条）。This is where China's synthetic-media regime actually starts: real-identity verification of users (Art 9), review of **inputs as well as outputs** (Art 10), a rumour-response mechanism (Art 11), app-store gating on assessment and filing (Art 13), **separate consent from the person whose face or voice is edited** (Art 14), the three-part labelling core — a technical label that must not interfere with use (Art 16), a prominent label where the public could be misled (Art 17), and a ban on removing either (Art 18) — plus filing through the algorithm-recommendation rules (Art 19). Article 22 sets **no fine of its own**: punishment runs through the general laws, with heavier punishment where serious consequences result. Carded from the CAC full text and the State Council policy document library, cross-checked against each other (47 load-bearing strings, present in both); `evidence: A`, `published: 2022-11-25` on the instrument's own date, `verified: 2026-10-10`. The generative-AI card's "no card yet" note and the roadmap row are updated accordingly.
- `docs/cn/generative-ai-services-measures.md` — a card for **《生成式人工智能服务管理暂行办法》**（七部门令**第 15 号**：2023-05-23 国家网信办 2023 年第 12 次室务会会议审议通过，2023-07-10 签署公布，**2023-08-15 施行**，五章二十四条）。It fills the roadmap gap that most other cards already point at, and settles an open ⚠: **Article 21 sets no fine of its own** — punishment is routed to the Cybersecurity Law, Data Security Law, Personal Information Protection Law and Science and Technology Progress Law, and where those are silent the measure's own sanctions are warning, circulated criticism, order to correct and order to suspend the service. Carded from the CAC full text and the State Council policy document library, whose two copies were checked against each other (34 load-bearing strings, present in both); `evidence: A`, `verified: 2026-10-10`. `published` is the instrument's own date 2023-07-10, not the 2023-07-13 web posting, per the rule applied in #8. `docs/README.md` — the roadmap row is now ticked.
- Comparisons wired to the anthropomorphic-interaction measures: `docs/compare/01-ai-labeling.md` and its Chinese version gain a **Beyond content: the interaction itself** row (Article 18), a fourth observation on labelling the relationship rather than the output, and the Article 30 penalty bands; `docs/compare/04-platform-responsibility.md` gains a **Gatekeeping the app itself** row (Article 25, against the DSA's notice-and-action and the DMA's sideloading duty), the Article 22 assessment trigger on the core-device row, the minors row extended to Article 14, a sixth observation, and a note that Article 26 routes filing through the algorithm provisions; the two overviews move from eight to nine Chinese tracks. `verified` on all five files is now 2026-10-10.
- `docs/cn/ai-anthropomorphic-interaction-measures.md` — a card for **《人工智能拟人化互动服务管理暂行办法》** (CAC, NDRC, MIIT, MPS and SAMR Order No. 21, signed 2026-04-10, in force 2026-07-15), the first Chinese rule aimed at AI companions rather than at AI content: dependency and emotional-manipulation bans, the prohibition on virtual relatives and virtual partners for minors, the two-hour usage reminder, interaction-data copy-and-delete and the bar on training on users' sensitive interaction data, the Article 22 assessment thresholds (1,000,000 registered or 100,000 monthly active users), filing through the Algorithmic Recommendation Provisions, and the RMB 10,000–100,000 / 100,000–200,000 penalty bands. Text read against the CAC publication and the State Council Gazette; the translation is ours and is marked ⚠. `docs/README.md` — the roadmap row.
- `docs/cn/ai-anthropomorphic-interaction-measures-zh.md` — 该办法的中文卡片，与英文卡片配成一对（两边都补了语言切换行）。正文措辞按网信办官方文本逐条对齐，并用脚本把卡片里加引号引用的门槛数字、罚款区间、禁止清单和排除清单与官方全文比对，缺失 0 项；英文卡片是本库自译，已在两边都写明措辞不一致时以官方中文文本为准。
- **A website.** `scripts/build-site.mjs` renders `docs/` into `_site/` and the new `Site` workflow publishes it to GitHub Pages. Nothing is authored for the site: the landing index, the evidence grade, the check date and the source link on every page are read from the front matter of the file they came from, so the site cannot drift from the repository. Addresses mirror paths (`docs/eu/ai-act.md` → `/eu/ai-act/`, `-zh.md` → `-zh/`), heading anchors use the same slug function as `check-docs.mjs`, and every relative link is rewritten either to a page that exists or to the file on GitHub — a published site has no dead links.
- `scripts/site/style.css` — the stylesheet, in a **Swiss grid** direction: one grotesque typeface, one accent (red `#E30613`), black structural rules, and typographic scale instead of boxes and shadows. The three evidence grades are three filled blocks — **A green, B amber, C red** — in the meta strip, the landing index, and every Grade cell of every comparison table: the build recognises a bare `A`/`B`/`C` cell and renders it as its block, so 99 grade cells across `docs/` read by colour before they read by letter. Amber carries black text because white on it fails contrast; the dark palette brightens all three and flips their text to near-black for the same reason. No webfonts: a reference work that cites EUR-Lex should not depend on a font CDN, and a CJK face is megabytes. The comparison tables stack EU over China per row below 900 px rather than scrolling sideways, which would put the two jurisdictions out of sight of each other.
- **Light and dark.** Dark is the same grid inverted: near-black `#0F0F0F` paper, structural rules lifted to grey so they organise without glaring, and the accent pushed to a brighter red `#FF4438` to hold contrast. The inverted blocks stay inverted — a table header and a grade block flip to white-on-dark rather than being shaded down. It follows the system setting, and the masthead carries a toggle that remembers the choice; the theme is applied by a four-line inline script before first paint, so there is no flash. Print always renders light, because browsers drop background fills and light text would vanish on paper.
- **A sidebar that is the site map.** Above 1180 px the left column carries the whole site — the three sections with every canonical page, the current one marked (a Chinese page marks its English sibling, so a reader sees where they are in the tree either way) — and the page's own `##` sections beneath it. It is emitted from the same front matter that drives everything else, not authored. Below 1180 px it is gone and the document reads title → provenance → argument.
- **A custom-domain attempt, and what it cost.** The site was briefly aimed at `docs.modusensus.space`. It turned out that a Pages site deployed from a workflow **ignores a `CNAME` file in the artifact** — the domain lives only in the Pages settings — and that attaching a new hostname through the API is refused until its certificate is issued, while the certificate is not requested until the hostname is attached. That deadlock has no clean exit, so the attempt was dropped and the `CNAME` file removed. Two facts worth keeping: a custom domain on the *user* site redirects **every** project site of the account to it, which is why the project URL 404ed all along; and `GITHUB_TOKEN` cannot create a Pages site at all (`Resource not accessible by integration`) — the owner's credentials are required for the one-time enablement.
- `scripts/site/vendor/marked.esm.js` (v18.1.0) and its licence — the only dependency the build has, vendored so there is still no install step.
- `README.md` — a **Reading it in a browser** section, and `scripts/` added to the layout block.
- `CITATION.cff` — CFF 1.2.0 citation metadata, so GitHub shows a **Cite this repository** button and can export BibTeX.
- `skills/ai-governance-compare/` and `AGENTS.md` — the comparison is now loadable as an **agent skill**. `SKILL.md` tells a coding agent (Claude Code, Codex, …) to answer how the EU or China regulates AI and data by reading this repository rather than from memory, and to carry the evidence grade and the check date into its answer. It points at the `## Start here` table instead of copying it, so adding a comparison never requires editing it. `AGENTS.md` routes an agent that is editing the repository to `CONTRIBUTING.md`.
- `assets/logo.png` — the project mark, shown centred at the top of `README.md`, 320 px wide. Cropped to the mark, resized to 840 px and flattened to one background colour, which took the file from 1.2 MB to 89 KB.
- `README.md` — a centred row of **nine badges**, replacing the single CI badge: CI status, jurisdictions, evidence grades, the sourcing rule, languages, citation file, licences, the weekly link re-check, and the absence of dependencies. Drawn `flat-square` in the mark's own palette, and deliberately carrying **no number anyone would have to maintain by hand** — the only changing one is the CI status, and it updates itself.
- `docs/compare/03-cross-border-data-zh.md` — a Chinese version of the cross-border comparison, so the question readers ask most is no longer the one comparison without a translation.

### Changed

- `README.md` — added the CI status badge for the `Validate` workflow, and a Chinese introduction with links to the Chinese overview and AI-labeling pages.
- The `External links` check no longer treats a `5xx` response as a broken link (the server answered; it simply could not serve the page), and it now runs the whole check a second time before reporting failure, so a host that refuses datacenter traffic at random can no longer block a merge.
- `scripts/check-docs.mjs` — now also checks `skills/<name>/SKILL.md`: the front matter must open the file and carry a non-empty `name` and `description`, and `name` must match its directory. A skill with mistyped front matter is silently never loaded, and nothing else in the repository would notice.
- `skills/ai-governance-compare/SKILL.md` — the `description` was longer than the host shows in its skill list, so the English trigger words were being cut off and never reached the agent. It now states the "look it up, never from memory" rule first and fits inside that budget with every Chinese and English trigger intact.
- `docs/cn/cross-border-data-flow-provisions.md` — the thresholds are now read article by article against the official text, and the `⚠` is gone. Two corrections matter: the small-volume exemption is open to **non-sensitive** personal information only (Art. 5(4)), so a single sensitive record already needs a standard contract or certification; and the CIIO rule (Art. 7(1)) covers any transfer of personal information or important data whatever the volume, while Articles 3 and 4 still exempt everyone, a CIIO included. Also recorded: a security assessment result is valid for 3 years and extendable once by another 3 (Art. 9), and important data counts only when a department or region has said so (Art. 2).
- `docs/cn/cross-border-data-flow-provisions.md`, `docs/compare/03-cross-border-data.md` and its new Chinese version — the certification route now names its instrument and date: 《个人信息出境认证办法》, CAC and SAMR Order No. 20, published 2025-10-14, in force 2026-01-01, which also settles who may use it.
- `README.md` — **Use it from an agent** now opens with one line to paste into an agent instead of an install procedure, so the skill needs no installation at all. The line points at `SKILL.md` through a CDN mirror, because `raw.githubusercontent.com` is reset on some networks — measured on 2026-10-07: three attempts, connection reset, 0 bytes, while the mirror returned the same 7 826-byte file.
- `skills/ai-governance-compare/README.md` — a CDN-mirror install command beside the canonical one, a pointer to the paste-line form, and a note that Codex has been changing where it looks for skills.
- `docs/cn/ai-generated-content-labeling-measures.md` and its Chinese version, plus the two overview files — the `source` field and the source list for the labelling measures now point at the **full text** (《关于印发〈人工智能生成合成内容标识办法〉的通知》). They pointed at the press release announcing the measures, which carries no article text at all (checked: no 第一条 on the page), so `source` — the field the skill tells an agent to cite — sent readers somewhere the provisions could not be read. The announcement stays listed as a secondary link.

- **Licensing** — `skills/` (the agent skill) is now **MIT**, alongside `scripts/`; the comparison documents (`docs/`, `assets/` and all prose) stay **CC BY-SA 4.0**. A tool should carry the licence of the code, and the licence badge, this file, `README.md`, `CONTRIBUTING.md` and the skill's own README now say the same thing.

### Fixed

- **The Chinese penalty ⚠ is closed.** `compare/01-ai-labeling` (both languages) said the penalties under the Generative AI Interim Measures and the Deep Synthesis Provisions still needed checking, and `compare/05-liability-and-pending-law` carried the same open question. Both are now carded and neither states an amount, but they are not the same device: **Article 21** of the generative measures enumerates the Cybersecurity Law, Data Security Law, Personal Information Protection Law and Science and Technology Progress Law and then supplies its own ladder — warning, circulated criticism, order to correct, and suspension on refusal or serious cases — while **Article 22** of the deep-synthesis provisions refers generally to the relevant laws and administrative regulations and aggravates where serious consequences result, with no fallback of its own. The penalty row in `compare/01` moves from **B** to **A**; the two labelling cards and the liability card tick the matching TODO.
- Both labelling cards' `authority` field named only "CAC and three other departments" / "国家互联网信息办公室等四部门" while the body listed all four, so the site's **发布机关** row disagreed with the text beneath it. The field now carries the four organs in full, matching the notice's 落款.
  - **The labelling measures' `published` date was the web release, not the instrument's own date.** The notice issuing them — 《关于印发〈人工智能生成合成内容标识办法〉的通知》, 国信办通字〔2025〕2号 — is signed by CAC, MIIT, MPS and NRTA **2025-03-07** and was posted on cac.gov.cn on 2025-03-14; `CONTRIBUTING.md` defines `published` as the date the instrument carries, so `docs/cn/ai-generated-content-labeling-measures.md` and its Chinese version now read `published: 2025-03-07`, with the release date kept in the body. The four departments are named, and the 文号 is attributed to the notice rather than to the measures, in both cards, in `compare/01-ai-labeling` (both languages) and in the two overviews' source lists. Verified against the official text on 2026-10-10.
## [0.9.0] - 2026-10-07

### Added

- `README.md` — a **Related work** section listing nine comparable open projects, each described by what it is and how it records its sources, with an explicit note that we list them for discovery only and do not audit their legal analysis.
- **Evidence grades on every comparison.** All seven comparison files now carry an explicit grade on each table row, observation, practical point and limitation — **A** primary text checked live, **B** other official source or a direct reading, **C** our own comparison or inference. The grades were promised in the front matter but had never been given per item.
- `.github/workflows/validate.yml` — CI on every push and pull request, plus a weekly run: an offline documentation check, and an external link check.
- `scripts/check-docs.mjs` — validates front matter (required keys, real dates, `evidence` in A/B/C, `source` on an official host), checks that links under an "Official sources" heading point at official hosts, and resolves internal links and anchors.
- `.lychee.toml` — link-check configuration, with the hosts CI cannot reach documented rather than silently ignored.

### Changed

- `docs/cn/cybersecurity-law.md` — the **2025 amendment** is now carded: adopted 2025-10-28, in force 2026-01-01, articles renumbered, a new Article 20 on AI, and penalties raised up to RMB 10 million.
- `docs/eu/ai-act.md`, `docs/eu/ai-act-transparency.md` — the **Digital Omnibus on AI** (Regulation (EU) 2026/1744, in force 2026-07-27) is now carded: the Annex III and Annex I high-risk stages move to 2027-12-02 and 2028-08-02, and the machine-readable marking grace period runs to 2026-12-02.
- `docs/compare/00-overview.md`, `-zh` — the staged-application row and the limits note follow Article 113 as amended.
- Law cards — the `source` field now points at the primary text for each instrument (npc.gov.cn, gov.cn, cac.gov.cn, EUR-Lex ELI), replacing legal-database home pages. Third-party trackers were removed from "Official sources" sections or labelled as not official.
- `docs/README.md`, `CONTRIBUTING.md` — one definition of the evidence grades, replacing two that disagreed, and a new **Automated checks** section.
- `CONTRIBUTING.md` — the submission rules now state that `main` is protected (both CI checks must pass; direct pushes are rejected) and that commits are authored from a GitHub `noreply` address rather than a personal one.

### Fixed

- `docs/eu/liability.md` — `effective` now carries the directive's entry into force (2024-12-08) with the 2026-12-09 transposition deadline moved into `applies`, where it belongs; `status: in-force` no longer conflicts with a future "effective" date.
- `docs/compare/00-overview.md` — the AI Liability Directive is shown as withdrawn (11 February 2025), not pending.
- `README.md` — the layout listing was missing five of the seven comparison files.

## [0.8.0] - 2026-10-06

### Added

- `docs/compare/06-data-and-infrastructure.md` — data and infrastructure compared: sharing versus control, product versus operator security, category triggers, twin compliance calendars.
- `docs/eu/data-governance-and-data-act.md` — Data Governance Act and Data Act card.
- `docs/eu/cra-nis2.md` — Cyber Resilience Act and NIS2 card.
- `docs/cn/cybersecurity-law.md`, `docs/cn/data-security-law.md`, `docs/cn/network-data-security-regulations.md` — the Chinese data pillars and their implementing regulation.

### Changed

- `docs/README.md` — roadmap complete for the data and infrastructure group.

## [0.7.0] - 2026-10-06

### Added

- `docs/compare/05-liability-and-pending-law.md` — liability and pending law compared: the withdrawn AI Liability Directive, the revised Product Liability Directive, and China's comprehensive AI legislation on the 2026 State Council plan.
- `docs/eu/liability.md` — product liability plus the withdrawn AI Liability Directive.
- `docs/cn/ai-law-and-liability.md` — where AI liability sits in China today, and the pending comprehensive law.

## [0.6.0] - 2026-10-06

### Added

- `docs/compare/04-platform-responsibility.md` — platform responsibility compared: DSA/DMA vs China's algorithm provisions (filing versus auditing, user control, minors, competition, price discrimination, labour, penalties).
- `docs/eu/dsa-dma.md` — DSA and DMA card.
- `docs/cn/algorithmic-recommendation-provisions.md` — China's algorithmic recommendation provisions card, read from the official text.

## [0.5.0] - 2026-10-06

### Added

- `docs/compare/03-cross-border-data.md` — cross-border data regimes compared: GDPR Chapter V vs China's 2024 provisions (routes, thresholds, exemptions, group/HR data, important data and CIIO triggers).
- `docs/eu/gdpr-transfers.md` — GDPR Chapter V card.
- `docs/cn/cross-border-data-flow-provisions.md` — China's 2024 cross-border provisions card, with the volume thresholds.

## [0.4.0] - 2026-10-06

### Added

- `docs/compare/02-personal-data.md` — personal data regimes compared: GDPR vs PIPL (lawful bases, sensitive data and separate consent, rights, accountability, breach notice, cross-border routes, penalties, extraterritorial reach).
- `docs/eu/gdpr.md` — GDPR card.
- `docs/cn/personal-information-protection-law.md` — PIPL card.

## [0.3.0] - 2026-10-06

### Changed

- **Language policy: English is now the default.** `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md`, `docs/README.md` and the law cards are in English; the previous Chinese versions are kept alongside as `*-zh.md`.

## [0.2.0] - 2026-10-06

### Added

- `docs/compare/01-ai-labeling.md` — labelling regimes compared: EU AI Act Article 50 vs China's labelling measures.
- `docs/eu/ai-act-transparency.md` — card for Article 50 transparency obligations (applicable from 2026-08-02).

### Changed

- `docs/cn/ai-generated-content-labeling-measures.md` — added the companion mandatory national standard GB 45438-2025 (published 2025-02-28, effective 2025-09-01) and official sources.
- `docs/README.md` — roadmap updated.

## [0.1.0] - 2026-10-06

### Added

- Repository skeleton: README, contributing guide, code of conduct, dual licence (documents CC BY-SA 4.0 / code MIT).
- `docs/README.md` — reading guide and writing rules (evidence grades A/B/C, front matter, file naming, translations).
- `docs/compare/00-overview.md` — EU vs China overview: summary table, main statutes on each side, eight dimensions, the cross-border enforcement gap, entry points for research, limits.
- `docs/eu/ai-act.md` — EU AI Act card.
- `docs/cn/ai-generated-content-labeling-measures.md` — China's AI-generated content labelling measures card.

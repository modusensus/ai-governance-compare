# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

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

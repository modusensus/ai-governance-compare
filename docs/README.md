# Reading guide and writing rules

## Three kinds of content

| Directory | What goes in | Granularity |
|---|---|---|
| `docs/eu/` | Single-law cards for the EU | one law per file |
| `docs/cn/` | Single-law cards for China | one law per file |
| `docs/compare/` | Cross-jurisdiction comparisons | one question per file |

## Law card template

```markdown
---
title: Official title of the law, in English
jurisdiction: CN
authority: issuing body
published: YYYY-MM-DD      # the date the instrument carries, not the OJ date
effective: YYYY-MM-DD      # date of entry into force
applies: YYYY-MM-DD        # optional — date it first binds those it governs
status: in-force
source: <link to the official text>
evidence: A
verified: YYYY-MM-DD
---

# Official title

English · [中文](same-file-zh.md)

## In one line

## Who and what it governs

## Key provisions (only the ones that change behaviour)

## Penalties

## Relationship to other laws

## Unverified / TODO
```

The date fields carry one meaning each — see [CONTRIBUTING.md](../CONTRIBUTING.md#required-front-matter) for the full rule:

| Field | Means | Does **not** mean |
|---|---|---|
| `published` | the date the instrument carries in its official title ("of 13 June 2024") | the Official Journal date |
| `effective` | the date of entry into force, from the instrument's final article | adoption, first application, or a transposition deadline |
| `applies` | optional — the date it first binds those it governs | entry into force |

## Evidence grades

Every key claim carries one of three grades. Use these exact meanings — a comparison file repeats this table at the top so readers can grade what they are reading.

| Grade | Meaning | Can support a conclusion |
|---|---|---|
| **A** | The primary official text — statute, regulation, mandatory standard — checked live against the link in `source` | ✅ yes |
| **B** | Another official source (regulator guidance, an official press release, European Commission pages), or a direct mechanical reading of the primary text | ⚠️ as an official reading — say which |
| **C** | This repository's own comparison or inference, or a claim not yet traced back to the primary text (news reports included) | ❌ never on its own |

A **C** that has not been checked at all also keeps the `⚠` marker. Media and commentary carry no grade of their own: they may prompt an entry, but the entry is a C until a primary text backs it.

In a law card, `evidence` in the front matter grades the card as a whole — A means the instrument's own text was secured and read. In the comparison files, grade each table row and each observation in the body. The same table opens [`compare/00-overview.md`](compare/00-overview.md), so a reader who starts there meets it first.

## Checklist before you commit

- [ ] Complete front matter; `source` is the official text, not a summary page
- [ ] `published` is the date the instrument carries, `effective` is entry into force (use `applies` for the date it starts to bind)
- [ ] Every key fact carries an evidence grade
- [ ] `verified` is today's date
- [ ] Anything unverified is marked `⚠ unverified`
- [ ] No invented numbers, article numbers or dates

## Language

- English is the default: `ai-act.md`
- A translation sits beside it with a language suffix: `ai-act-zh.md`, and both files carry a switch line under the H1:
  - English file: `English · [中文](ai-act-zh.md)`
  - Chinese file: `中文 · [English](ai-act.md)`
- A missing translation is never a defect.

## Roadmap

### EU

- [x] AI Act — main card → `docs/eu/ai-act.md`
- [x] AI Act Article 50 transparency obligations (applicable 2026-08-02) → `docs/eu/ai-act-transparency.md`
- [x] GDPR (2016/679) → `docs/eu/gdpr.md`
- [x] GDPR Chapter V — transfers to third countries → `docs/eu/gdpr-transfers.md`
- [x] Data Governance Act (2022/868) and Data Act (2023/2854) → `docs/eu/data-governance-and-data-act.md`
- [x] Digital Services Act (2022/2065) and Digital Markets Act (2022/1925) → `docs/eu/dsa-dma.md`
- [x] New Product Liability Directive (2024/2853) → `docs/eu/liability.md`
- [x] Cyber Resilience Act (2024/2847) and NIS2 (2022/2555) → `docs/eu/cra-nis2.md`
- [x] AI Liability Directive (2022 proposal) — withdrawn 11 February 2025 → `docs/eu/liability.md`

### China

- [x] Measures for Labelling AI-Generated Synthetic Content (effective 2025-09-01, with mandatory standard GB 45438-2025) → `docs/cn/ai-generated-content-labeling-measures.md`
- [x] Personal Information Protection Law (effective 2021-11-01) → `docs/cn/personal-information-protection-law.md`
- [x] Data Security Law (effective 2021-09-01) → `docs/cn/data-security-law.md`
- [x] Cybersecurity Law (effective 2017-06-01; amended 2025-10-28, in force 2026-01-01, articles renumbered) → `docs/cn/cybersecurity-law.md`
- [x] Regulations on Network Data Security Management (Order No. 790, effective 2025-01-01) → `docs/cn/network-data-security-regulations.md`
- [x] Provisions on the Administration of Algorithmic Recommendations (effective 2022-03-01) → `docs/cn/algorithmic-recommendation-provisions.md`
- [x] Interim Measures for the Administration of AI Anthropomorphic Interaction Services (Order No. 21, effective 2026-07-15) → `docs/cn/ai-anthropomorphic-interaction-measures.md`
- [ ] Provisions on the Administration of Deep Synthesis (effective 2023-01-10)
- [x] Interim Measures for the Administration of Generative AI Services (Order No. 15, effective 2023-08-15) → `docs/cn/generative-ai-services-measures.md`
- [x] Provisions on Promoting and Regulating Cross-Border Data Flows (effective 2024-03-22) → `docs/cn/cross-border-data-flow-provisions.md`
- [x] Measures for Ethical Review of Science and Technology (trial) (effective 2023-12-01) → `docs/cn/ai-law-and-liability.md`
- [x] AI Law — comprehensive legislation directed by the State Council 2026 plan (no draft yet) → `docs/cn/ai-law-and-liability.md`

> Before writing a card, secure the official source link first.

---
title: Artificial Intelligence Act (AI Act)
jurisdiction: EU
authority: European Parliament and Council of the European Union
published: 2024-06-13
effective: 2024-08-01
status: in-force
source: https://eur-lex.europa.eu/eli/reg/2024/1689/oj https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng
evidence: A
retrieved: 2026-10-11
verified: 2026-10-16
---

# Artificial Intelligence Act (AI Act)

English · [中文](ai-act-zh.md)

> Regulation (EU) 2024/1689. The EU's horizontal AI law: in force since 1 August 2024, setting obligations by **risk tier** and applying in stages. **Amended in July 2026** by the Digital Omnibus on AI (Regulation (EU) 2026/1744, in force 27 July 2026), which pushed the high-risk stages back by roughly eighteen months.

## In one line

The EU's first cross-sector AI statute: AI systems are sorted into four risk tiers, the higher the risk the heavier the obligations, and the top tier is banned outright.

## Who and what it governs

- The object is the **AI system**; the duties fall on the **provider** and the **deployer**.
- It covers all sectors — it is not limited to particular industries.

## The four tiers

| Tier | Meaning | Treatment |
|---|---|---|
| Unacceptable risk | social scoring, manipulative techniques, and similar | **prohibited** |
| High risk | recruitment, credit, education, critical infrastructure, etc. (Annex III) | strict: risk management, data governance, technical documentation, human oversight, conformity assessment |
| Limited risk | chatbots, generated content | **transparency** only (tell users they are dealing with AI; label content) |
| Minimal risk | everything else | essentially unregulated |

## Staged application (as amended by the Digital Omnibus on AI)

| Date | What applies |
|---|---|
| 2024-08-01 | entry into force |
| 2025-02-02 | prohibitions and the AI literacy duty |
| 2025-08-02 | obligations for general-purpose AI (GPAI) models, governance, penalties |
| 2026-08-02 | transparency obligations in Article 50 |
| **2026-12-02** | two things on the same day — see below: (a) **new prohibitions** in Article 5(1), points **(ba)** and **(bb)**, and the conditions in Article 5(1a) and (1b), start to apply; (b) end of the grace period for machine-readable marking of generative systems placed on the market before 2026-08-02 |
| **2027-12-02** | high-risk systems listed in **Annex III** — deferred from 2026-08-02 |
| **2028-08-02** | high-risk systems embedded in regulated products (**Annex I**) — deferred from 2027-08-02 |

## The 2026 amendment

**Regulation (EU) 2026/1744** (the Digital Omnibus on AI), adopted 8 July 2026, published in the Official Journal on 24 July 2026 and in force from **27 July 2026**, amends the AI Act, Regulation (EU) 2018/1139 and Regulation (EU) 2023/1230. Its headline effect is timing: the high-risk regime is deferred to **2 December 2027** (Annex III) and **2 August 2028** (Annex I), keeping the split between stand-alone and embedded high-risk systems. It also adds prohibitions to Article 5 and adjusts the supervisory architecture. The general application date of 2 August 2026 was left in place.

## The new prohibitions that apply from 2026-12-02

The amendment inserted two points into Article 5(1)'s first subparagraph, and they are the part of the 2026-12-02 date that is easiest to miss:

- **Article 5(1), point (ba)** — prohibiting the placing on the market, putting into service or use of an AI system that generates or manipulates realistic material of an **identifiable natural person's intimate parts**, or of an identifiable natural person **engaged in sexually explicit activities**, without that person's freely-given, specific, informed, unambiguous and explicit consent.
- **Article 5(1), point (bb)** — prohibiting the same conduct in respect of material or performance within the meaning of Article 2, points (c) and (e), of **Directive 2011/93/EU** (child sexual abuse material), except where a "without right" defence applies under national law.

Both are **criminal-law-adjacent content prohibitions**, not transparency duties, and the amendment narrows them deliberately. Article 5(1a) makes the *provider-side* prohibition bite only where the generation or manipulation is the system's **intended purpose**, or where the system's design, training, architecture, capabilities or user-facing functions make it a **reasonably foreseeable and reproducible** outcome without significant technical modification and without reasonable technical safeguards against it, including against reasonably foreseeable misuse. Article 5(1b) carves out manipulation that does not increase exposure of depicted intimate parts or alter the nature of depicted sexually explicit activities.

Timing: the amendment's own amendment to Article 113 keeps these points **out** of the general 2 February 2025 date — Chapter I and II apply from 2025-02-02 *with the exception of* Article 5(1), first subparagraph, points (ba) and (bb), and Article 5(1a) and (1b), which apply from **2 December 2026**. — **A**

## Penalties

Up to **EUR 35 million** or **7% of total worldwide annual turnover**, whichever is higher, for breaching the prohibitions; other tiers carry lower caps.

## Comparison with China

- China has no equivalent horizontal statute; it governs through sector-specific rules such as the Interim Measures for Generative AI Services, the Deep Synthesis Provisions and the Labelling Measures.
- See [`../compare/00-overview.md`](../compare/00-overview.md).

## Unverified / TODO

- [x] Add the EUR-Lex link to the official text — https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- [x] Verify each stage date against the official timeline — done; the high-risk stages were deferred by Regulation (EU) 2026/1744
- [x] Confirm the date from which the new Article 5 prohibitions apply, and the rest of the amendment's changes to the Act — confirmed: points (ba) and (bb) of Article 5(1), first subparagraph, together with Article 5(1a) and (1b), apply from **2026-12-02**, per the amendment's own amendment to Article 113; the text was already in `snapshots/eu/ai-act-amendment.txt` and is now cited below (checked 2026-10-16)
- [ ] Complete the GPAI chapter: model cards, training-data summaries, copyright policy, adversarial testing for systemic risk
- [x] Confirm the three penalty tiers (amounts and percentages) — Article 99(3), (4) and (5), anchored below

## Source quotes

- `Non-compliance with the prohibition of the AI practices referred to in Article 5 shall be subject to administrative fines of up to EUR 35 000 000 or, if the offender is an undertaking, up to 7 % of its total worldwide annual turnover for the preceding financial year, whichever is higher.` — Article 99(3) — the top penalty tier in the Penalties section (snapshot: `snapshots/eu/ai-act.txt`)
- `shall be subject to administrative fines of up to EUR 15 000 000 or, if the offender is an undertaking, up to 3 % of its total worldwide annual turnover for the preceding financial year, whichever is higher` — Article 99(4) — the middle tier (snapshot: `snapshots/eu/ai-act.txt`)
- `shall be subject to administrative fines of up to EUR 7 500 000 or, if the offender is an undertaking, up to 1 % of its total worldwide annual turnover for the preceding financial year, whichever is higher` — Article 99(5) — the lowest tier (snapshot: `snapshots/eu/ai-act.txt`)
- `shall apply from 2 August 2026. However: (a) Chapters I and II shall apply from 2 February 2025; (b) Chapter III Section 4, Chapter V, Chapter VII and Chapter XII and Article 78 shall apply from 2 August 2025, with the exception of Article 101;` — Article 113 — the staged application dates in the card's timeline (snapshot: `snapshots/eu/ai-act.txt`)
- `the date of application of Sections 1, 2 and 3 of Chapter III is set to 2 December 2027 for AI systems classified as high-risk pursuant to Article 6(2) and Annex III, and to 2 August 2028 for AI systems classified as high-risk pursuant to Article 6(1) and Annex I` — Regulation (EU) 2026/1744 — the Annex III and Annex I deferrals the card flags (snapshot: `snapshots/eu/ai-act-amendment.txt`)
- `Providers of AI systems, including general-purpose AI systems, generating synthetic audio, image, video or text content, that have been placed on the market before 2 August 2026 shall take the necessary steps in order to comply with Article 50(2) by 2 December 2026` — Regulation (EU) 2026/1744 — the grace period that ends 2 December 2026 (snapshot: `snapshots/eu/ai-act-amendment.txt`)
- `the placing on the market, the putting into service or the use of an AI system that generates or manipulates realistic images, videos, audio or similar material of an identifiable natural person’s intimate parts, or of an identifiable natural person engaged in sexually explicit activities, without that person’s freely-given, specific, informed, unambiguous and explicit consent for that generation or manipulation` — Regulation (EU) 2026/1744, inserting Article 5(1), first subparagraph, point (ba) — the first of the new prohibitions (snapshot: `snapshots/eu/ai-act-amendment.txt`)
- `the placing on the market, the putting into service or the use of an AI system that generates or manipulates material or performance within the meaning of Article 2, points (c) and (e), of Directive 2011/93/EU, except where a “without right” defence applies under national law` — Regulation (EU) 2026/1744, inserting Article 5(1), first subparagraph, point (bb) — the second of the new prohibitions (snapshot: `snapshots/eu/ai-act-amendment.txt`)
- `that generation or manipulation is the intended purpose of the AI system; or` — Regulation (EU) 2026/1744, new Article 5(1a)(a)(i) — the intended-purpose limb of the provider-side trigger (snapshot: `snapshots/eu/ai-act-amendment.txt`)
- `the system’s design, training, architecture, capabilities or user-facing functionalities make that generation or manipulation a reasonably foreseeable and reproducible outcome, without requiring significant technical modification, and the system does not have reasonable and adequate technical safety measures and other safeguards to reliably prevent that generation or manipulation, taking into account reasonably foreseeable misuse, and to correct observed or reported misuse` — Regulation (EU) 2026/1744, new Article 5(1a)(a)(ii) — the foreseeable-outcome limb (snapshot: `snapshots/eu/ai-act-amendment.txt`)
- `an AI system that manipulates material in a way that does not increase the exposure of any depicted intimate parts or alter the nature of any depicted sexually explicit activities shall not constitute manipulation` — Regulation (EU) 2026/1744, new Article 5(1b) — the manipulation carve-out (snapshot: `snapshots/eu/ai-act-amendment.txt`)
- `Chapters I and II shall apply from 2 February 2025, with the exception of Article 5(1), first subparagraph, points (ba) and (bb), and Article 5(1a) and (1b) which shall apply from 2 December 2026;` — Regulation (EU) 2026/1744, amending Article 113 — the provision that sets the 2026-12-02 date for the new prohibitions (snapshot: `snapshots/eu/ai-act-amendment.txt`)

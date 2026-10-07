---
title: Data and infrastructure regulation compared — EU vs China
type: compare
evidence: graded per item, sources below
verified: 2026-10-06
---

# Data and infrastructure regulation compared — EU vs China

> One question: **who owns, may use, and must protect the data and systems underneath AI?**
> Short answer: **the EU legislates for sharing and product security; China legislates for classification and control.** Both push duties down the supply chain — from opposite directions.
>
> Evidence grades (defined in [`00-overview.md`](00-overview.md)): **A** primary text, checked live; **B** other official source or a direct reading of the primary text; **C** our own comparison or inference, or not yet checked.

## 1. The table

| Dimension | EU | China | Grade |
|---|---|---|---|
| Non-personal and mixed data | Data Governance Act (2022/868) + Data Act (2023/2854) | Data Security Law (effective 2021-09-01) + Regulations on Network Data Security Management (effective 2025-01-01) | A |
| Core idea | **sharing**: re-use public-sector data, trusted intermediaries, data access rights | **control**: classification and grading, important data, national security review | C |
| Product security | Cyber Resilience Act (2024/2847) — essential requirements + CE marking | Cybersecurity Law (effective 2017-06-01; amended version in force 2026-01-01) — product and service compliance, mandatory standards | A |
| Operator security | NIS2 (2022/2555) — risk management, supply chain, incident reporting | Cybersecurity Law + network data regulations — operator duties, incident response | A |
| Key category triggers | products with digital elements; essential and important entities | **critical information infrastructure (CII)** and **important data** | A |
| Data access rights | yes — Data Act gives users of connected products access and third-party sharing rights | no direct equivalent; the emphasis is on security and lawful processing | A |
| Trusted intermediation | yes — DGA registration regime for data intermediation services and data altruism | no direct equivalent | A |
| Applying from | DGA 2023-09-24; Data Act 2025-09-12 ⚠; CRA reporting 2026-09-11, full 2027-12-11; NIS2 transposition 2024-10-17 ⚠ | CSL 2017-06-01 (amended version 2026-01-01); DSL 2021-09-01; network data regulations 2025-01-01 | B |
| Sanctions | national penalties, market withdrawal, CE-marking consequences | fines, suspension of business, licence revocation, personal liability | A |

## 2. Five observations

1. **Sharing versus control is the real dividing line.** The EU's most distinctive instrument here is the Data Act's right to access and share data from connected products. China has no analogue — its instruments are about securing and classifying data, not expanding access to it. — **C**
2. **Same two questions, different splits.** The EU separates product security (CRA) from operator security (NIS2). China handles both through the Cybersecurity Law plus the network data regulations, and lets CII status drive the extra duties. — **C**
3. **China's triggers are category-based; the EU's are product- and entity-based.** "Is this important data?" and "is this CII?" have no EU equivalent; "is this a product with digital elements?" has no direct Chinese equivalent. — **C**
4. **Two compliance calendars.** China's rules are already in force. The EU's heaviest security obligations arrive in 2026–2027, so a company operating in both runs a fast lane and a slow lane at once. — **B**
5. **Both reach down the supply chain.** NIS2 does it contractually through supply-chain risk management; China does it through the CII chain and product-compliance duties. — **C**

## 3. What it means in practice

- AI companies in the EU should plan for **two conformity tracks** on the same hardware: AI Act and CRA. — **B**
- In China, the operative question is classification: whether your data is "important data" and whether you are CII or a large network platform. — **A**
- If you both train on IoT data and sell in Europe, the Data Act's access rights and the AI Act's data-governance duties can collide. — **C**

## 4. Limits and unverified ⚠

- The Data Act's application date, the NIS2 transposition deadline and the CRA dates should be confirmed against EUR-Lex. — **B** ⚠
- The Chinese cards' article numbers are still TODO; the Cybersecurity Law amendment is confirmed (adopted 2025-10-28, in force 2026-01-01) but its articles were renumbered, so article-level comparisons need the re-promulgated text. — **A**
- Important-data catalogues, where they exist, are sectoral and change. — **C**

## 5. Official sources

- DGA policy page: https://digital-strategy.ec.europa.eu/en/policies/data-governance-act
- CRA summary: https://digital-strategy.ec.europa.eu/en/policies/cra-summary
- Network Data Security Regulations (Order No. 790, gov.cn): https://www.gov.cn/zhengce/zhengceku/202409/content_6977767.htm
- CAC Q&A on the regulations: http://www.cac.gov.cn/2024-09/30/c_1729384453671239.htm
- Cybersecurity Law, re-promulgated text (CAC): https://www.cac.gov.cn/2025-12/29/c_1768735112911946.htm
- Data Security Law (NPC): http://www.npc.gov.cn/npc/c2/c30834/202106/t20210610_311888.html

---
title: Labelling regimes compared — EU AI Act Article 50 vs China's labelling measures
type: compare
evidence: graded per item, sources below
verified: 2026-10-06
---

# Labelling regimes compared — EU AI Act Article 50 vs China's labelling measures

English · [中文](01-ai-labeling-zh.md)

> One question: **when AI generates content, how does each side make it show?**
> Short answer: **China turned the technical format into a mandatory national standard — finer-grained, and earlier. The EU wrote the duty into its main statute and left the detail to guidance — broader in scope.**
>
> Evidence grades (defined in [`00-overview.md`](00-overview.md)): **A** primary text, checked live; **B** other official source or a direct reading of the primary text; **C** our own comparison or inference, or not yet checked.

## 1. The table

| Dimension | EU | China | Grade |
|---|---|---|---|
| Source of law | AI Act (Regulation (EU) 2024/1689), Article 50 | Measures for Labelling AI-Generated Synthetic Content (CAC et al.) | A |
| Technical detail | Commission interpretive guidelines (2026-07-20) + voluntary code of practice | **Mandatory national standard GB 45438-2025** (published 2025-02-28, effective 2025-09-01) | A |
| Starts to apply | 2026-08-02 | 2025-09-01 (measures and standard together) | A |
| Duty holders | **providers** and **deployers** of AI systems | **generating service providers**, distribution platforms, app stores, users | A |
| Labelling method | notice + **machine-readable marking** + deepfake disclosure | **explicit** labelling + **implicit** labelling (file metadata) | A |
| Trigger | ① interaction with AI ② synthetic content ③ deepfakes ④ emotion recognition / biometric categorisation | AI-generated **text, images, audio, video, virtual scenes** | A |
| Enforcer | national market surveillance authorities | CAC, with other departments | A |
| Penalty | up to EUR 15m or 3% of worldwide turnover (AI Act Article 99(4)) | handled under the Generative AI Interim Measures / Deep Synthesis Provisions (⚠ provisions to verify) | B |

## 2. Three observations you can use directly

### 2.1 Both are two-tier — but the second tier differs
- **China: measures set the duty, a mandatory standard sets the format.** GB 45438-2025 fixes labelling methods, use cases, formats and metadata. It is **measurable and testable**. — **A**
- **EU: the regulation sets the duty, Commission guidance sets the detail.** The guidance is interpretive and does not create new obligations; firms can also show compliance through a voluntary code. — **B**
- In practice: in China you **can** be found non-compliant on format; in the EU the argument is more often about whether disclosure happened at all. — **C**

### 2.2 The effective dates are almost eleven months apart
- China: 2025-09-01. — **A**
- EU: applies from 2026-08-02, with a grace period until **2026-12-02** for machine-readable marking of generative systems already placed on the market before that date. That grace period was introduced when the AI Act was amended by the Digital Omnibus on AI (Regulation (EU) 2026/1744). — **A**
- So on digital labelling, **China went first** — which cuts against the common intuition that EU legislation is always ahead. — **C**

### 2.3 Different centre of gravity
- China aims at **content form** (text/image/audio/video/virtual scene) and the **distribution chain** (generator → distribution platform → app store → user). — **A**
- The EU aims at **use situation** (chatbots, emotion recognition, biometric categorisation, deepfakes) — "you must know when you are talking to AI" counts as transparency. — **C**

## 3. What it means for an ordinary person

- In China: an unlabelled AI-generated video can plausibly be found non-compliant, with a mandatory standard behind it. — **B**
- In the EU: you must be told when you are subject to emotion recognition, or shown that a deepfake is a deepfake. — **A**
- Common limit: **both can reach platforms at home; neither reaches the same clip hosted abroad.** — **C**

## 4. Limits and unverified ⚠

- The EU penalty tier is confirmed as Article 99(4) (EUR 15m or 3%); the scope of the 2026-12-02 grace period rests on Regulation (EU) 2026/1744 rather than the original AI Act text. — **A**
- Chinese penalty provisions and amounts need checking against the Generative AI Interim Measures and the Deep Synthesis Provisions. — **C** ⚠
- GB 45438-2025 details (metadata fields, implicit-label text) require the full standard. — **C** ⚠

## 5. Official sources

- EU, quick facts on transparency rules: https://digital-strategy.ec.europa.eu/en/factpages/quick-facts-transparency-rules-ai-systems
- EU, Commission guidelines on Article 50 transparency obligations: https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-transparency-obligations
- EU, AI Act consolidated text (Article 50, Article 99): https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- EU, Digital Omnibus on AI, Regulation (EU) 2026/1744: https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng
- China, Q&A on the labelling measures: https://www.cac.gov.cn/2025-03/14/c_1743654685896173.htm
- China, GB 45438-2025 full text: https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=F32EA2A561F1886CD8D606513512D547
- China, expert explainer: https://www.cac.gov.cn/2025-09/05/c_1758792061408012.htm

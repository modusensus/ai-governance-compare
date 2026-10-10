---
title: Labelling regimes compared — EU AI Act Article 50 vs China's labelling measures
type: compare
evidence: graded per item, sources below
verified: 2026-10-11
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
| Source of law | AI Act (Regulation (EU) 2024/1689), Article 50 | Measures for Labelling AI-Generated Synthetic Content — adopted 2025-03-07 by four departments, issued as CAC notice 国信办通字〔2025〕2号 | A |
| Technical detail | Commission interpretive guidelines (2026-07-20) + voluntary code of practice | **Mandatory national standard GB 45438-2025** (published 2025-02-28, effective 2025-09-01) | A |
| Starts to apply | 2026-08-02 | 2025-09-01 (measures and standard together) | A |
| Duty holders | **providers** and **deployers** of AI systems | **generating service providers**, distribution platforms, app stores, users | A |
| Labelling method | notice + **machine-readable marking** + deepfake disclosure | **explicit** labelling + **implicit** labelling (file metadata) | A |
| Trigger | ① interaction with AI ② synthetic content ③ deepfakes ④ emotion recognition / biometric categorisation | AI-generated **text, images, audio, video, virtual scenes** | A |
| Beyond content: the interaction itself | Article 50 covers **direct interaction with an AI system** (e.g. chatbots) — users must be informed | Anthropomorphic Interaction Services Measures (Order No. 21, effective 2026-07-15), **Article 18**: the labelling duty applies here too, users must be told they are interacting with an AI service rather than a natural person, on signs of over-dependency the reminder must be prominent and dynamic (e.g. pop-up), and a usage-time reminder is owed **each time continuous use exceeds 2 hours** | A |
| Enforcer | national market surveillance authorities | CAC, with other departments | A |
| Penalty | up to EUR 15m or 3% of worldwide turnover (AI Act Article 99(4)) | **no fine of its own.** Generative AI Interim Measures **Article 21** names the Cybersecurity Law, Data Security Law, PIPL and Science and Technology Progress Law, and only where those are silent gives warning, circulated criticism and an order to correct — then suspension of the service on refusal or serious cases. Deep Synthesis Provisions **Article 22** refers outright to the relevant laws and administrative regulations, adds heavier punishment where serious consequences result, and provides no fallback of its own | A |

## 2. Four observations you can use directly

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

### 2.4 China labels the relationship, not only the output
- Order No. 21 attaches the labelling duty to a **service** and then builds conduct duties around it: no virtual relatives or virtual partners for minors (Article 14), no service goal of replacing social interaction or inducing dependency (Article 10), an exit that must not be blocked by continued interaction (Article 19). — **A**
- The EU's Article 50 disclosure tells you the counterpart is a machine and stops there; what the machine then does to you is regulated by the AI Act's risk tiers, not by the transparency clause. — **A**
- So on AI companions the two regimes are not "stricter" and "looser": they take different objects. China regulates the provider's influence on the user; the EU regulates whether you are informed. — **C**

## 3. What it means for an ordinary person

- In China: an unlabelled AI-generated video can plausibly be found non-compliant, with a mandatory standard behind it. — **B**
- In the EU: you must be told when you are subject to emotion recognition, or shown that a deepfake is a deepfake. — **A**
- Common limit: **both can reach platforms at home; neither reaches the same clip hosted abroad.** — **C**

## 4. Limits and unverified ⚠

- The EU penalty tier is confirmed as Article 99(4) (EUR 15m or 3%); the scope of the 2026-12-02 grace period rests on Regulation (EU) 2026/1744 rather than the original AI Act text. — **A**
- Chinese penalty provisions are carded now, and the two instruments are not alike. **Article 21** of the [Generative AI Interim Measures](../cn/generative-ai-services-measures.md) enumerates the Cybersecurity Law, Data Security Law, PIPL and Science and Technology Progress Law and then supplies its own ladder — warning, circulated criticism, order to correct, suspension — for cases the named laws do not reach. **Article 22** of the [Deep Synthesis Provisions](../cn/deep-synthesis-provisions.md) merely refers to the relevant laws and administrative regulations and aggravates where serious consequences result; it has no fallback of its own. Neither states an amount, so the ceilings sit in the general laws — PIPL Article 66 (RMB 50m or 5% of prior-year turnover) and the amended Cybersecurity Law (RMB 10m). — **A**
- GB 45438-2025 details (metadata fields, implicit-label text) require the full standard. — **C** ⚠
- Anthropomorphic services have their own penalty bands now: **Article 30** of Order No. 21 reaches RMB 10,000–100,000 for refusal to correct or serious cases, and RMB 100,000–200,000 where harm to life or health results. Both sit far below the Article 99(4) tier of the AI Act, and below the amended Cybersecurity Law's RMB 10 million ceiling. — **A**

## 5. Official sources

- EU, quick facts on transparency rules: https://digital-strategy.ec.europa.eu/en/factpages/quick-facts-transparency-rules-ai-systems
- EU, Commission guidelines on Article 50 transparency obligations: https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-transparency-obligations
- EU, AI Act consolidated text (Article 50, Article 99): https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- EU, Digital Omnibus on AI, Regulation (EU) 2026/1744: https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng
- China, Q&A on the labelling measures: https://www.cac.gov.cn/2025-03/14/c_1743654685896173.htm
- China, GB 45438-2025 full text: https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=F32EA2A561F1886CD8D606513512D547
- China, expert explainer: https://www.cac.gov.cn/2025-09/05/c_1758792061408012.htm
- China, Generative AI Interim Measures (Order No. 15), full text: https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm
- China, Deep Synthesis Provisions (Order No. 12), full text: https://www.cac.gov.cn/2022-12/11/c_1672221949354811.htm
- China, Anthropomorphic Interaction Services Measures (Order No. 21), full text: https://www.cac.gov.cn/2026-04/10/c_1777558395078289.htm
- China, the same text in the State Council Gazette: https://www.gov.cn/gongbao/2026/issue_12806/202606/content_7072472.html

---
title: 人工智能法案（AI Act）
jurisdiction: EU
authority: 欧洲议会与欧盟理事会
published: 2024-06-13
effective: 2024-08-01
status: in-force
source: https://eur-lex.europa.eu/eli/reg/2024/1689/oj https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng
evidence: A
retrieved: 2026-10-11
verified: 2026-10-16
---

# 人工智能法案（AI Act）

中文 · [English](ai-act.md)

> Regulation (EU) 2024/1689。欧盟 AI 监管的主干法，2024-08-01 生效，按**风险等级**分档设义务，分阶段适用。

## 一句话是什么

欧盟第一部横向管 AI 的「大法」：按风险高低把 AI 系统分成四档，风险越高义务越重，禁止类直接不许做。

## 管谁、管什么

- 管的对象是 **AI 系统**，义务落在 **提供者（provider）** 与 **部署者（deployer）** 身上。
- 覆盖所有行业，不限于特定领域。

## 四档风险

| 档位 | 含义 | 处理 |
|---|---|---|
| 不可接受风险 | 社会评分、操纵性技术等 | **禁止** |
| 高风险 | 招聘、信贷、教育、关键基础设施等（附件三） | 严管：风险管理、数据治理、技术文档、人工监督、 conformity 评估 |
| 有限风险 | 聊天机器人、生成内容 | 只要求**透明度**（告知用户在与 AI 交互、内容加标识） |
| 最小风险 | 其余 | 基本不管 |

## 分阶段适用（以官方时间线为准）

| 时间 | 内容 |
|---|---|
| 2024-08-01 | 生效 |
| 2025-02-02 | 禁止类条款 + AI 素养义务先行适用 |
| 2025-08-02 | 通用 AI 模型（GPAI）义务、治理架构、罚则适用 |
| 2026-08-02 | 第 50 条透明度义务开始适用 |
| **2026-12-02** | 同一天两件事——详见下文：(a) 第 5(1) 条新增的 **(ba)、(bb)** 两项禁止条款，以及第 5(1a)、(1b) 条的适用条件，开始适用；(b) 2026-08-02 前已投放市场的生成式系统完成机器可读标记的截止日 |
| 2027-12-02 | 附件三高风险系统（由 2026/1744 自 2026-08-02 推迟） |
| 2028-08-02 | 嵌入受监管产品的高风险系统、附件一（由 2026/1744 自 2027-08-02 推迟） |

## 2026 年修正案

**Regulation (EU) 2026/1744**（Digital Omnibus on AI，即「AI 综合修正案」）2026-07-08 通过，2026-07-24 刊登于 Official Journal，**2026-07-27 起生效**，修正 AI Act、Regulation (EU) 2018/1139 与 Regulation (EU) 2023/1230。最醒目的改动是时间：高风险机制推迟到 **2027-12-02**（附件三）与 **2028-08-02**（附件一），保持「独立系统 / 嵌入产品」的二分。它同时给第 5 条增加了禁止条款，并调整了监管架构。2026-08-02 这个总适用日未动。

## 2026-12-02 起适用的新增禁止条款

修正案在第 5(1) 条第一分段插入了两项——这正是 2026-12-02 这个日期里最容易被漏掉的部分：

- **第 5(1) 条 (ba) 项**——禁止投放市场、投入使用或使用「生成或操纵**可识别自然人**的**私密部位**、或可识别自然人**从事露骨性行为**的写实图像、视频、音频或类似材料」的 AI 系统，除非取得该人自由作出、具体、知情、明确且明示的同意。
- **第 5(1) 条 (bb) 项**——禁止就 Directive 2011/93/EU 第 2 条 (c)、(e) 两项所指的材料或表演（即儿童性虐待材料）从事同样行为；依国内法成立「无权（without right）」抗辩的情形除外。

两项都是**接近刑法性质的内容禁令**，不是透明度义务，且修正案刻意收窄了范围。第 5(1a) 条把**提供者一侧**的禁止限定为：生成或操纵是该系统的**预期目的**，或者系统的设计、训练、架构、能力或面向用户的功能使其成为**可合理预见且可复现**的结果（无需重大技术改动），且系统没有合理充分的技术安全措施防止之（含防止可合理预见的滥用）并纠正已发现或已报告的滥用。第 5(1b) 条则排除「不增加所描绘私密部位暴露程度、也不改变所描绘露骨性行为性质」的操纵。

时点：修正案对第 113 条的修改，把这些项**排除**在 2025-02-02 总适用日之外——第一、二章自 2025-02-02 适用，但第 5(1) 条第一分段 (ba)、(bb) 两项及第 5(1a)、(1b) 条自 **2026-12-02** 适用。 — **A**

## 罚则

最高 **3500 万欧元** 或**全球年营业额 7%**（取高者），适用于违反禁止类条款的情形；其他义务档位另有较低上限。

## 与中国法的对照

- 中国无同位的横向大法，靠《生成式人工智能服务管理暂行办法》《深度合成管理规定》《标识办法》等分领域规章代管。
- 见 [`../compare/00-overview.md`](../compare/00-overview.md)。

## 待核实 / TODO

- [x] 补 EUR-Lex 官方原文链接（法规全文；含修正案 2026/1744）
- [x] 核实各阶段生效日期是否有修订/推迟 — 已核实：附件三推迟至 2027-12-02、附件一推迟至 2028-08-02（见原文引证）
- [x] 补齐 GPAI 章节的具体义务清单（模型卡、训练数据摘要、版权政策、系统性风险对抗测试）
- [x] 核实第 5 条新增禁止条款的适用日期 — 已核实：第 5(1) 条第一分段 (ba)、(bb) 两项及第 5(1a)、(1b) 条自 **2026-12-02** 适用（依修正案对第 113 条的修改）；原文自始就在 `snapshots/eu/ai-act-amendment.txt` 中，见下方引证
- [x] 罚则三档的准确金额与百分比 — 第 99(3)(4)(5) 条，见原文引证

## 原文引证

- `Non-compliance with the prohibition of the AI practices referred to in Article 5 shall be subject to administrative fines of up to EUR 35 000 000 or, if the offender is an undertaking, up to 7 % of its total worldwide annual turnover for the preceding financial year, whichever is higher.` — 第 99(3) 条——卡里「3500 万欧元或 7%」的出处 (snapshot: `snapshots/eu/ai-act.txt`)
- `shall apply from 2 August 2026. However: (a) Chapters I and II shall apply from 2 February 2025; (b) Chapter III Section 4, Chapter V, Chapter VII and Chapter XII and Article 78 shall apply from 2 August 2025, with the exception of Article 101;` — 第 113 条——分阶段适用日期 (snapshot: `snapshots/eu/ai-act.txt`)
- `the date of application of Sections 1, 2 and 3 of Chapter III is set to 2 December 2027 for AI systems classified as high-risk pursuant to Article 6(2) and Annex III, and to 2 August 2028 for AI systems classified as high-risk pursuant to Article 6(1) and Annex I` — Regulation (EU) 2026/1744——附件三推迟到 2027-12-02、附件一推迟到 2028-08-02 (snapshot: `snapshots/eu/ai-act-amendment.txt`)
- `the placing on the market, the putting into service or the use of an AI system that generates or manipulates realistic images, videos, audio or similar material of an identifiable natural person’s intimate parts, or of an identifiable natural person engaged in sexually explicit activities, without that person’s freely-given, specific, informed, unambiguous and explicit consent for that generation or manipulation` — Regulation (EU) 2026/1744 新增第 5(1) 条第一分段 (ba) 项——新增禁止条款之一 (snapshot: `snapshots/eu/ai-act-amendment.txt`)
- `the placing on the market, the putting into service or the use of an AI system that generates or manipulates material or performance within the meaning of Article 2, points (c) and (e), of Directive 2011/93/EU, except where a “without right” defence applies under national law` — Regulation (EU) 2026/1744 新增第 5(1) 条第一分段 (bb) 项——新增禁止条款之二 (snapshot: `snapshots/eu/ai-act-amendment.txt`)
- `the system’s design, training, architecture, capabilities or user-facing functionalities make that generation or manipulation a reasonably foreseeable and reproducible outcome, without requiring significant technical modification, and the system does not have reasonable and adequate technical safety measures and other safeguards to reliably prevent that generation or manipulation, taking into account reasonably foreseeable misuse, and to correct observed or reported misuse` — Regulation (EU) 2026/1744 新增第 5(1a)(a)(ii) 条——提供者一侧的「可预见结果」触发条件 (snapshot: `snapshots/eu/ai-act-amendment.txt`)
- `an AI system that manipulates material in a way that does not increase the exposure of any depicted intimate parts or alter the nature of any depicted sexually explicit activities shall not constitute manipulation` — Regulation (EU) 2026/1744 新增第 5(1b) 条——操纵的除外情形 (snapshot: `snapshots/eu/ai-act-amendment.txt`)
- `Chapters I and II shall apply from 2 February 2025, with the exception of Article 5(1), first subparagraph, points (ba) and (bb), and Article 5(1a) and (1b) which shall apply from 2 December 2026;` — Regulation (EU) 2026/1744 对第 113 条的修改——新增禁止条款 2026-12-02 适用日的出处 (snapshot: `snapshots/eu/ai-act-amendment.txt`)

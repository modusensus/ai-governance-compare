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
verified: 2026-10-11
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
| 2026-12-02 | 2026-08-02 前已投放市场的生成式系统完成机器可读标记的截止日（由 Regulation (EU) 2026/1744 引入） |
| 2027-12-02 | 附件三高风险系统（由 2026/1744 自 2026-08-02 推迟） |
| 2028-08-02 | 嵌入受监管产品的高风险系统、附件一（由 2026/1744 自 2027-08-02 推迟） |

## 罚则

最高 **3500 万欧元** 或**全球年营业额 7%**（取高者），适用于违反禁止类条款的情形；其他义务档位另有较低上限。

## 与中国法的对照

- 中国无同位的横向大法，靠《生成式人工智能服务管理暂行办法》《深度合成管理规定》《标识办法》等分领域规章代管。
- 见 [`../compare/00-overview.md`](../compare/00-overview.md)。

## 待核实 / TODO

- [x] 补 EUR-Lex 官方原文链接（法规全文；含修正案 2026/1744）
- [x] 核实各阶段生效日期是否有修订/推迟 — 已核实：附件三推迟至 2027-12-02、附件一推迟至 2028-08-02（见原文引证）
- [ ] 补齐 GPAI 章节的具体义务清单（模型卡、训练数据摘要、版权政策、系统性风险对抗测试）
- [x] 罚则三档的准确金额与百分比 — 第 99(3)(4)(5) 条，见原文引证

## 原文引证

- `Non-compliance with the prohibition of the AI practices referred to in Article 5 shall be subject to administrative fines of up to EUR 35 000 000 or, if the offender is an undertaking, up to 7 % of its total worldwide annual turnover for the preceding financial year, whichever is higher.` — 第 99(3) 条——卡里「3500 万欧元或 7%」的出处 (snapshot: `snapshots/eu/ai-act.txt`)
- `shall apply from 2 August 2026. However: (a) Chapters I and II shall apply from 2 February 2025; (b) Chapter III Section 4, Chapter V, Chapter VII and Chapter XII and Article 78 shall apply from 2 August 2025, with the exception of Article 101;` — 第 113 条——分阶段适用日期 (snapshot: `snapshots/eu/ai-act.txt`)
- `the date of application of Sections 1, 2 and 3 of Chapter III is set to 2 December 2027 for AI systems classified as high-risk pursuant to Article 6(2) and Annex III, and to 2 August 2028 for AI systems classified as high-risk pursuant to Article 6(1) and Annex I` — Regulation (EU) 2026/1744——附件三推迟到 2027-12-02、附件一推迟到 2028-08-02 (snapshot: `snapshots/eu/ai-act-amendment.txt`)

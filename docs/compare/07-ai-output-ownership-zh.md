---
title: AI 生成内容的权利归属对照 —— 欧盟与中国
type: compare
evidence: 逐条定级，来源见下
verified: 2026-10-15
retrieved: 2026-10-11
---

# AI 生成内容的权利归属对照 —— 欧盟与中国

中文 · [English](07-ai-output-ownership.md)

> 一个问题：**模型生成一张图，两个法域有没有说这张图归谁？**
>
> 一句话答案：**本仓库已锁定的文本里没有答案，而且这两部文书都不是为回答它而写的。** 两边管的都是**输入端**——欧盟要求通用模型提供者制定遵守版权法的政策；中国要求训练数据来源合法、不侵害他人知识产权——也都要求**输出端**声明为生成内容。标识回答的是「这是不是生成的」，不是「这归谁」。归属是著作权法的问题，而本仓库两侧的著作权法都还没有成卡。
>
> 证据等级（定义见 [`00-overview-zh.md`](00-overview-zh.md)）：**A** 官方一手文本，现场核对；**B** 其他官方来源或对一手文本的直接机械阅读；**C** 本库自己的对照或推断，或尚未核实。

## 1. 对照表

| 维度 | 欧盟 | 中国 | 等级 |
|---|---|---|---|
| 唯一涉及版权的条款 | AI Act（Regulation (EU) 2024/1689）**第 53(1)(c) 条** | 《生成式人工智能服务管理暂行办法》**第四条第(三)项**与**第七条第(二)项** | A |
| 约束的是系统的哪一侧 | **输入端**：通用模型提供者须制定遵守欧盟版权与邻接权法的政策，并遵守 (EU) 2019/790 第 4(3) 条的权利保留 | **输入端**：使用来源合法的训练数据，涉及知识产权的不得侵害他人依法享有的知识产权 | A |
| 有没有为生成物分配权利 | **没有**——AI Act 没有任何操作性条款把生成物的权利分给谁，它管的是提供者与部署者 | **没有**——办法给服务提供者设的是行为义务，已锁定的文本都没有为生成物分配权利 | B |
| 输出侧规则实际要求什么 | 第 50(2) 条：生成式系统输出**须以机器可读方式标识，并可被检测为人工生成或篡改** | 《标识办法》（2025-09-01 起施行）第三至五条：在图片**适当位置添加显著提示标识**，并在文件元数据中写入隐式标识 | A |
| 各自指向的文书 | Directive (EU) 2019/790——被第 53(1)(c) 条点名；**本仓库尚无其卡片或快照** ⚠ | 《中华人民共和国著作权法》——**本仓库尚无其卡片** ⚠ | — |
| 归属问题最终由谁回答 | 各国著作权法与法院，不在本仓库射程内 | 《著作权法》与法院，不在本仓库射程内 | C |
| 该问题有无待定变动 | 无：2026 年修正案（Regulation (EU) 2026/1744）未提及版权，AI Act 的任何阶段都不改变这一分析 | 国务院 2026 年度立法工作计划把「知识产权」列入人工智能基础要素立法方向，属计划事项，无文本可引 | B |

## 2. 两边实际写了什么

### 欧盟——唯一一条操作性版权条款，管的是训练

- **第 53(1)(c) 条**要求通用人工智能模型提供者制定遵守版权与邻接权法的政策；完整句子见引文一节。 — **A**
- **序言 105** 说明了原因：大型生成式模型需要获取大量文本、图像、视频和其他数据，文本与数据挖掘可能用于处理*可能受版权与邻接权保护*的内容，并且*对受版权保护内容的任何使用都需取得权利人授权，除非适用相关版权例外与限制*。 — **A**
- **序言 106** 使该政策义务不受地域限制：提供者须在*训练这些通用模型的涉版权行为发生于任何法域的情况下*一律遵守。 — **A**
- **序言 107** 把训练数据摘要定位为透明度工具，以便*包括版权人在内的有正当利益方行使其在欧盟法下的权利*。 — **A**
- **序言 108** 划出本法自身的边界：监管不涉及逐作品评估训练数据的版权合规，且*本条例不影响欧盟法所规定的版权规则的执行*。 — **A**
- **第 50(2) 条**是输出侧义务，而它是一条标识义务，不是权利规则：生成式系统的输出*须以机器可读格式标识，并可被检测为人工生成或篡改*。相关卡片见 [`ai-act-transparency-zh.md`](../eu/ai-act-transparency-zh.md)。 — **A**
- **对整部法的阅读**：`copyright` 在快照中共命中 8 行——序言 104–108、第 53(1)(c) 条，以及点名 Directive (EU) 2019/790 的引用清单——没有任何操作性条款为模型生成物分配权利，也没有一条界定输出的作者是谁。 — **B** *（对一手文本的直接机械阅读）*

### 中国——对服务提供者的行为义务，不是权利分配

- **第四条第(三)项**把尊重知识产权、商业道德列入生成式人工智能服务提供者与使用者的行为规范。 — **A**
- **第七条第(二)项**是训练数据规则：涉及知识产权的，不得侵害他人依法享有的知识产权——这是禁止侵害，不是授予或分配权利。 — **A**
- **第十二条**把输出侧义务接到标识规则上：提供者应当按照《互联网信息服务深度合成管理规定》对图片、视频等生成内容进行标识。 — **A**
- **《标识办法》**（2025-09-01 起施行）把生成合成内容定义为文本、图片、音频、视频、虚拟场景等，界定了显式标识与隐式标识（第三条），要求**在图片的适当位置添加显著的提示标识**（第四条第(三)项），并要求在文件元数据中添加隐式标识（第五条）。 — **A**
- **对已锁定文本的阅读**：这些文本管的是服务怎么建、输出怎么标，没有一条说生成图片的权利归谁。 — **B**

### 归属问题上唯一落到「计划」里的一处

- **国务院 2026 年度立法工作计划**（2026-05-11 印发）提出推进人工智能健康发展综合性立法，并完善人工智能基础要素立法，知识产权是其中之一。这是计划事项、没有文本，因此不能从中引出任何义务；卡片见 [`ai-law-and-liability.md`](../cn/ai-law-and-liability.md)。 — **B**

## 3. 五点观察

1. **两边都立了输入端与标识，都没立权利归属。** 欧盟那条是训练环节的合规政策；中国两条是训练数据合法与不侵害知识产权。 — **C** *（依据上面的 A 级阅读）*
2. **义务主体不是同一个角色。** 欧盟的义务落在通用人工智能**模型**提供者身上；中国的义务落在向公众提供的生成式人工智能**服务**提供者身上。同一个权利人利益是在链条的不同位置被回应的——应读成两条规定，而不是一对平行条款。 — **C**
3. **标识不等于权利归属。** 第 50(2) 条和《标识办法》回答的都是「这是不是生成的」，都不告诉读者这张图归谁。 — **C**
4. **两部文书都没有界定生成图片的作者是谁，也没有说它能否构成作品。** 这个问题要靠著作权法与法院回答，本仓库锁定的文本里没有答案。 — **C**
5. **对使用本仓库的人的后果：** 本仓库的任何内容都不能被引用来断言 AI 生成图片可受或不受著作权保护，也不能用来指认权利人。这个问题在本仓库里是开放的——是设计如此，不是疏漏，理由见第 6 节。 — **C**

## 4. 本对照不覆盖什么

- **《中华人民共和国著作权法》**——本仓库无卡、无快照。生成图片是否构成「作品」、谁是作者，由它和法院决定。
- **Directive (EU) 2019/790** 及其第 4(3) 条的权利保留机制——被第 53(1)(c) 条和序言 106 点名，但本仓库没有它的快照，因此本对照除「被点名」之外，不对该保留机制的内容作任何陈述。
- **两侧的判例**——欧盟法院的独创性标准，以及公开讨论中的中国法院判决，都超出本仓库已成卡文书的范围；本仓库不引它们。
- **确实触及输出端的义务**已在别处成卡，它们管的是披露而非归属：[`ai-act-transparency-zh.md`](../eu/ai-act-transparency-zh.md)、[`01-ai-labeling-zh.md`](01-ai-labeling-zh.md)、[`ai-generated-content-labeling-measures-zh.md`](../cn/ai-generated-content-labeling-measures-zh.md)。

## 5. 官方来源

- AI Act 合并文本（EUR-Lex ELI 链接）：https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- AI Act 英文全文——本文所用快照的来源（快照抓取于 2026-10-11）：https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R1689
- Regulation (EU) 2026/1744，2026 年对 AI Act 适用日期的修正：https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng
- Directive (EU) 2019/790（数字单一市场版权指令）——被第 53(1)(c) 条点名，本仓库未成卡：https://eur-lex.europa.eu/eli/dir/2019/790/oj
- 《生成式人工智能服务管理暂行办法》（国家网信办等七部门，第 15 号令）：https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm
- 《人工智能生成合成内容标识办法》（国信办通字〔2025〕2 号），该页载有办法全文：https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm
- 国务院 2026 年度立法工作计划（司法部）：https://www.moj.gov.cn/pub/sfbgw/zwgkztzl/xxxcgcxjpfzsx/fzsxyw/202605/t20260511_534688.html

## 6. 未核实 / 待办

- [ ] 获取并成卡 **Directive (EU) 2019/790**——AI Act 点名了它的第 4(3) 条权利保留；在此之前本对照只陈述「名字出现」，不陈述该保留要求什么 ⚠ [gap:not_located]
- [ ] 成卡 **《中华人民共和国著作权法》**——AI 生成图片能否受著作权保护、作者是谁，由它和法院决定，而非本对照已成卡的部门规章 ⚠ [gap:not_located]
- [ ] 跟踪**两侧司法立场**（欧盟法院的独创性标准；中国法院判决）作为本仓库可引的官方文本 ⚠ [gap:not_located]
- [x] 确认 AI Act 中所有版权提及都在训练侧或属于交叉引用：`copyright` 在 `snapshots/eu/ai-act.txt` 命中 8 行——序言 104–108、第 53(1)(c) 条，以及点名 Directive (EU) 2019/790 的引用清单——在 `snapshots/eu/ai-act-amendment.txt` 中命中 0 次（核对于 2026-10-15）
- [ ] 待国务院人工智能立法产生草案后重读该立场——计划把知识产权列为人工智能基础要素，权利分配规则若出现会在这里出现 ⚠ [gap:no_instrument]

## 原文引证

每条 bullet 都是官方原文片段，并锚定该主张所依据的快照；`node scripts/check-quotes.mjs` 会离线复核。上文叙述是本仓库自己的表述，以下是原文。

- `put in place a policy to comply with Union law on copyright and related rights, and in particular to identify and comply with, including through state-of-the-art technologies, a reservation of rights expressed pursuant to Article 4(3) of Directive (EU) 2019/790` —— AI Act 第 53(1)(c) 条，唯一一条操作性版权条款 （快照：`snapshots/eu/ai-act.txt`）
- `General-purpose AI models, in particular large generative AI models, capable of generating text, images, and other content, present unique innovation opportunities but also challenges to artists, authors, and other creators and the way their creative content is created, distributed, used and consumed.` —— 序言 105 （快照：`snapshots/eu/ai-act.txt`）
- `Text and data mining techniques may be used extensively in this context for the retrieval and analysis of such content, which may be protected by copyright and related rights.` —— 序言 105 （快照：`snapshots/eu/ai-act.txt`）
- `Any use of copyright protected content requires the authorisation of the rightsholder concerned unless relevant copyright exceptions and limitations apply.` —— 序言 105，输入端规则 （快照：`snapshots/eu/ai-act.txt`）
- `providers of general-purpose AI models should put in place a policy to comply with Union law on copyright and related rights, in particular to identify and comply with the reservation of rights expressed by rightsholders pursuant to Article 4(3) of Directive (EU) 2019/790` —— 序言 106 （快照：`snapshots/eu/ai-act.txt`）
- `regardless of the jurisdiction in which the copyright-relevant acts underpinning the training of those general-purpose AI models take place` —— 序言 106 （快照：`snapshots/eu/ai-act.txt`）
- `to facilitate parties with legitimate interests, including copyright holders, to exercise and enforce their rights under Union law` —— 序言 107，训练数据摘要 （快照：`snapshots/eu/ai-act.txt`）
- `This Regulation does not affect the enforcement of copyright rules as provided for under Union law.` —— 序言 108，AI Act 给自己划的边界 （快照：`snapshots/eu/ai-act.txt`）
- `Providers of AI systems, including general-purpose AI systems, generating synthetic audio, image, video or text content, shall ensure that the outputs of the AI system are marked in a machine-readable format and detectable as artificially generated or manipulated.` —— AI Act 第 50(2) 条，输出侧义务 （快照：`snapshots/eu/ai-act.txt`）
- `尊重知识产权、商业道德，保守商业秘密，不得利用算法、数据、平台等优势，实施垄断和不正当竞争行为` —— 《生成式人工智能服务管理暂行办法》第四条第(三)项 （快照：`snapshots/cn/generative-ai-services-measures.txt`）
- `涉及知识产权的，不得侵害他人依法享有的知识产权` —— 生成式办法第七条第(二)项，训练数据处理 （快照：`snapshots/cn/generative-ai-services-measures.txt`）
- `提供者应当按照《互联网信息服务深度合成管理规定》对图片、视频等生成内容进行标识` —— 生成式办法第十二条，输出侧标识义务 （快照：`snapshots/cn/generative-ai-services-measures.txt`）
- `显式标识是指在生成合成内容或者交互场景界面中添加的，以文字、声音、图形等方式呈现并可以被用户明显感知到的标识` —— 《标识办法》第三条，显式标识的定义 （快照：`snapshots/cn/ai-generated-content-labeling-measures.txt`）
- `在图片的适当位置添加显著的提示标识` —— 《标识办法》第四条第(三)项，图片的显式标识 （快照：`snapshots/cn/ai-generated-content-labeling-measures.txt`）

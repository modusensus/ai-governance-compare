---
name: ai-governance-compare
description: "Look it up — never answer from memory. How the EU and China regulate AI and data: AI content labelling, personal data, cross-border transfers, platform responsibility, AI liability, data and infrastructure. Cite the official source, the evidence grade (A/B/C) and the date each claim was last checked. Triggers: EU AI Act, GDPR, PIPL, AI labelling, cross-border data transfer, platform liability; 欧盟, 中国, AI 法, 人工智能, AI 标识, 标识义务, 个人信息, 数据出境, 跨境数据, 平台责任, AI 责任, 合规, 怎么规定, 合不合法, 犯不犯法."
---

# AI governance, EU × China: look it up before you answer

## What this skill does

Someone asks how the EU or China regulates something to do with AI or data. Find the answer in the
`ai-governance-compare` knowledge base, then answer with the source attached to every claim.

That is the whole job. The repository makes one promise: **every key claim is graded against an
official source and dated.** An answer that drops the grade or the date breaks that promise.

**If the knowledge base does not cover it, say so.** Do not fill the gap from memory — no article
numbers, no dates, no thresholds, no fines. General knowledge may be offered, but label it as *not
from this repository*.

## Step 0 — Can this repository answer the question at all?

- **EU or China, AI or data.** Yes. Continue.
- **Another jurisdiction** (US, UK, UN, …). Not covered. Say so: the repository has exactly two
  jurisdictions, and the *comparison* between them is the point, not either side alone.
- **A live dispute** — a summons, an investigation, a filing deadline, "am I about to be fined".
  Say first that the repository states what the rules are and is **not legal advice**, and that a
  specific case needs a lawyer in the relevant jurisdiction. Then answer the general question, if
  there is one.
- **A question about the repository itself** (how to contribute, how to cite it). Answer from
  `README.md` or `CONTRIBUTING.md`, not from the comparison files.

## Step 1 — Get the text

**Local.** If the current directory or a parent has `README.md` and `docs/compare/00-overview.md`,
this is a clone of the knowledge base. Read it directly.

**Local snapshot.** A full copy may exist at `~/.dsh/skill-data/ai-governance-compare` (`~` is the home
directory). If it is there, prefer it — no network needed. If it is missing, use the remote route.

**Remote.** The repository is small and public:

```bash
git clone --depth 1 https://github.com/modusensus/ai-governance-compare.git "${TMPDIR:-/tmp}/agc"
```

Single file, without git:

```bash
curl -fsSL --compressed "https://raw.githubusercontent.com/modusensus/ai-governance-compare/main/docs/compare/01-ai-labeling.md"
```

If none of the three works, say the text could not be retrieved. **Do not answer from recollection.**

## Step 2 — Find the right file

Read the `## Start here` table in the repository root `README.md`: one row per question, each row
naming the comparison file that answers it. Match the question to a row.

Keep no list of comparison files here — that table *is* the list, and it is the only one.

| Looking for | Where |
|---|---|
| A cross-jurisdiction comparison, organised by question | `docs/compare/` |
| One law on one side, in detail | `docs/eu/`, `docs/cn/` |
| The big picture | `docs/compare/00-overview.md` |
| How the cards are written and read | `docs/README.md` |

**Language.** If the question is in Chinese, prefer the `-zh.md` file where one exists beside the
source file (for example `docs/compare/01-ai-labeling-zh.md`). Otherwise answer from the English file;
a missing translation is never a defect.

## Step 3 — Pull the claims out, with their evidence

The files are small, but read by search rather than whole:

```bash
grep -n '^|' docs/compare/03-cross-border-data.md      # one table row = one claim
grep -rn 'PIPL\|Article 38\|标准合同' docs/             # full text
```

Every law card opens with front matter. Read it before quoting anything:

```yaml
source: <link to the official text>    # quote this link; do not substitute another
evidence: A                           # grade for the card as a whole
verified: YYYY-MM-DD                  # when the claim was last checked
status: in-force | draft | …
```

`published` is the date the instrument carries in its own title, `effective` is entry into force,
`applies` is the date it first binds. They are not interchangeable — do not collapse them.

**Evidence grades.** Every comparison file and law card prints its own grade table at the top. Use the
wording there, not this sentence: **A** is the primary official text checked live against `source`,
**B** another official source or a direct mechanical reading of the primary text, **C** the
repository's own comparison or inference — anything not the primary text, news reports included. A
conclusion may rest on A, B may explain it, C may set context only.

## Step 4 — How to answer

1. **The one-line answer** — what each side requires, one sentence each.
2. **The rules, side by side** — EU and China as parallel rows or bullets, one claim per line.
3. **What each claim rests on** — grade and `verified` date, the article or section number exactly as
   the file writes it, and the `source` link for anything load-bearing.
4. **What the repository does not cover** — say it plainly. Silence reads as coverage.
5. **Not legal advice** — one line. Laws change; confirm against the official text.

Not negotiable:

- **Copy numbers, article numbers, dates and thresholds verbatim from the file.** Never round, never
  reconstruct, never supply one that is not there. If the file marks something `⚠ unverified`, do not
  present it as settled.
- **Carry the date.** An old `verified` date is a claim about a moving target — give the date and say
  the law may have moved since.
- **Never cite anything the repository does not cite.** No extra articles, no secondary commentary the
  files do not carry, no "the EU also requires…" from memory.
- **Quote the `source` field as the link.** It points at the official text, not at a summary page.
- **Do not force symmetry.** "Both regulate X" is wrong if one regulates X and the other regulates the
  effect of X.
- **Answer in the language the question was asked in** — Chinese or English.

## Step 5 — Editing the repository, not just reading it

- `CONTRIBUTING.md` and `docs/README.md` are binding; follow their checklist.
- Run the checks before committing:

```bash
node scripts/check-docs.mjs
```

- CI runs the same checks plus a link check, and both must pass — `main` is protected.
- No AI co-author line in commit messages.

## Boundaries

- The repository states what the rules are. It does not advise on a specific system, filing, or dispute.
- Two jurisdictions only, and their value is that the two sides are put against each other on one question.
- When the repository and your own recollection disagree, **the repository wins**; if it looks wrong,
  say so and open an issue — do not silently correct it in the answer.

## Maintenance

Nothing here may go stale when the content changes. This file names no comparison, quotes no article
number, states no threshold, and holds no count. It carries only vocabulary that does not move — the
three date fields, the A/B/C letters, the shape of an answer — and each time it names the file that has
the authority: the list of comparisons is the `## Start here` table in `README.md`, the grade table is at
the top of each comparison file and in `docs/README.md`, the front-matter contract is in
`CONTRIBUTING.md`. Read those; do not mirror them here. **Adding a comparison or a law card must not
require editing this file.**

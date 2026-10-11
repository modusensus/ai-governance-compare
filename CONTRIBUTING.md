# Contributing

Thanks for helping make this comparison trustworthy. The first rule of this repository is:

> **Nothing enters without a source.**

## What you can contribute

1. **A new law card** — add a file under `docs/eu/` or `docs/cn/`.
2. **A comparison** — add or improve a topical table under `docs/compare/`.
3. **A correction** — a law was amended, an effective date changed, a link went dead.

## File rules

- Format: Markdown (`.md`).
- Name: lowercase English slug, hyphen-separated.
  - e.g. `docs/eu/ai-act.md`, `docs/cn/personal-information-protection-law.md`
- One law per file.
- **English is the default.** Title and body in English. A Chinese (or other) translation goes in the same directory with a `-zh.md` suffix.

### Required front matter

```yaml
---
title: Measures for Labelling AI-Generated Synthetic Content
jurisdiction: CN            # CN / EU / other
authority: Cyberspace Administration of China and three other departments
published: 2025-03-07       # the date the instrument carries (adoption or signature), not the OJ date
effective: 2025-09-01       # date of entry into force
applies: 2025-09-01         # optional: date it first binds those it governs, if that differs
status: in-force            # in-force / draft / proposed / repealed / stub
stage: in-force             # plan / public-comment / adopted-not-in-force / in-force — required when status is draft, proposed or stub
source: <link to the official text>
evidence: A                 # the card's own grade — A / B / C, see docs/README.md
verified: 2026-10-06        # date you last checked the source
retrieved: 2026-10-06       # optional: date the snapshot in snapshots/ was pulled
source_updated: 2026-01-01  # optional: date the text itself last changed (an amendment, a renumbering)
---
```

The three date fields mean exactly one thing each. Do not blur them:

- **`published`** — the date printed on the instrument itself, i.e. the "of 13 June 2024" in its official title. This is **not** always the Official Journal date: Regulation (EU) 2024/1689 carries 13 June 2024 but was published in the OJ on 12 July 2024. Put the OJ date in the body.
- **`effective`** — the **date of entry into force**, taken from the instrument's own final article (e.g. "the twentieth day following that of its publication"). Never put an adoption date, an application date, or a transposition deadline here.
- **`applies`** — optional, and only when it differs from `effective`: the date the instrument first binds the people it governs. For a directive that is the transposition deadline; for a regulation with staged application it is the first stage. Where the stages are numerous, or one card covers more than one instrument, give every date in the body instead and omit this field.

`status: in-force` means the instrument is currently in force — not repealed, not a draft, not lapsed. It does **not** mean its obligations already bind everyone: a directive in force is still binding only once transposed.

**`source`** — one or more links to the official text, separated by a space. A card that covers more than one instrument lists every instrument's text, and an EU instrument's text means the EUR-Lex ELI link (`https://eur-lex.europa.eu/eli/…`), not a Commission summary page. A summary page may be cited in the body, but it cannot be the `source` of an `evidence: A` card.

**`published: —` and `effective: —`** are allowed **only** when `status` is `draft`, `proposed` or `stub` — that is, when there is no instrument in force to date. State in the body what is missing.

`status: stub` means the card exists but the official text has not been secured yet; leave `source` empty and state in the body what is missing.

**Three timestamps, not one.** `verified` answers *when we last checked*; `retrieved` answers *when the snapshot was pulled*; `source_updated` answers *when the law itself changed*. They come apart constantly — the Cybersecurity Law changed on 2026-01-01 and this repository read it on 2026-10-10 — and a single field forces one of the two meanings to be dropped. Give `source_updated` whenever the text has an amendment, a re-promulgation or a renumbering after its `effective` date; the checker **fails** a card whose `source_updated` is later than its `verified`, because that is the exact shape of a card that has silently gone stale.

**`stage` says where in the pipeline.** `status: draft` on its own is ambiguous in a way that matters: it covers both "the legislature has directed a law that has no text yet" and "a consultation draft is out for comment", and only the second has anything to read. So a card whose `status` is `draft`, `proposed` or `stub` **must** carry a `stage`:

| `stage` | Meaning | Citation rule |
|---|---|---|
| `plan` | directed, announced or on a legislative work plan — no text exists | never cite an obligation from it; cite the plan itself |
| `public-comment` | a consultation draft is published for comment | cite as a proposal only, and say it is not adopted |
| `adopted-not-in-force` | signed and promulgated, awaiting entry into force | needs a real `effective` date; nothing binds before it |
| `in-force` | in force | the only stage that pairs with `status: in-force` |

`plan` and `public-comment` may not carry an `effective` date — there is no instrument to date — and `adopted-not-in-force` may not omit one.

### Quote anchors and typed gaps

A card that renders a foreign-language law is a translation, and a translation drifts. This repository caught itself twice — writing 或者 as 或 in five places, and describing a six-item statutory list as five items — and neither error was visible on the page. The mechanism that catches them is a quote anchor:

- `snapshots/<jurisdiction>/<slug>.txt` holds the official text as plain text, with a header recording the `# source:` URL, the `# retrieved:` date, the `# extraction:` rule and the `# sha256(body):` of what follows. Two extraction rules, because the languages differ: Chinese is flattened by deleting every whitespace character (lossless for CJK); English keeps its line structure and word boundaries — scripts and styles dropped, block-level tags turned into newlines, inline tags dropped (an `<a>` in the middle of "deep fakes" would otherwise split the phrase), entities unescaped, soft hyphens and zero-width marks stripped. Both end up whitespace-insensitive to the checker, which compares with all whitespace removed, so the recorded hash and `# chars` mean the same thing on a CN snapshot and an EU one. Statute text published by a government is not our composition; keeping a copy is what makes the check offline. `node scripts/snapshot.mjs --eu` builds the EU set; `--rehash` rewrites only the header of snapshots already on disk (offline).
- The card ends with a section headed `## Source quotes` (English cards) or `## 原文引证` (Chinese cards). Each bullet is one span of the **official original**, in backticks, then where the card relies on it, then the snapshot in backticks:

  ```markdown
  - `处二百万元以上一千万元以下罚款` — Arts. 61 and 69 top band (snapshot: `snapshots/cn/cybersecurity-law.txt`)
  ```

- The prose above the section is ours; those bullets are the anchors. `node scripts/check-quotes.mjs` asks only one question — *is that sentence still in the text?* — and answers present / drifted / absent / unverifiable. A link returning `200` says nothing about any of it.
- A snapshot whose body no longer matches its own header hash fails the check. An altered snapshot is not evidence.

Absence is typed as well. A TODO that records something missing ends with `[gap:<type>]`, from a closed list:

| Type | Means | Example in this repository |
|---|---|---|
| `no_instrument` | the law does not exist yet | China's comprehensive AI law is on the State Council's plan, with no draft |
| `not_located` | it exists; we have not found the official text | the social-mobilisation security assessment template |
| `not_transcribable` | published, but not in a form that can be re-checked | GB 45438-2025, served only as tiled page images |
| `no_official_translation` | no official text in the other language | every CN card's English rendering |
| `interpretation_missing` | no official Q&A or drafting note to cite | the anthropomorphic-services measures |

The type is the answer to "what would it take to close this?", which a blank or a bare `⚠` does not give. A backlog that cannot distinguish those five is not plannable — 80 open TODOs become one number instead of five different jobs.

## Writing rules

- **Cite the source for every key fact** — link or official document number.
- **Grade the evidence.** **A** = the primary official text (statute, regulation, mandatory standard), checked live against the link in `source`. **B** = another official source (regulator guidance, an official press release, Commission pages), or a direct mechanical reading of the primary text. **C** = our own comparison or inference, or a claim not yet traced back to the primary text — news reports included; a C never supports a conclusion on its own, and an unchecked one keeps the `⚠`. The table is repeated in [`docs/README.md`](docs/README.md#evidence-grades).
- **Date the check.** Laws change; readers need to know when you verified this. Say which of the three timestamps you mean (`verified`, `retrieved`, `source_updated`).
- **Anchor the load-bearing quote.** Wherever a card states what a provision *says* — a fine band, a threshold, an enumerated list — put that sentence in the card's quote section, in the official language, pinned to its snapshot. The prose is ours; the anchor is the text's.
- **Type the absence.** A TODO for something missing ends with `[gap:<type>]`, so the backlog says what kind of missing it is and what would close it.
- Mark anything you could not verify with `⚠ unverified`. Never write it as settled fact.
- Numbers (penalties, amounts, dates, article numbers) must come from the official text. Do not estimate, and do not invent.

## Language and translations

- English is the default and the merge criterion.
- Example pair: `ai-act.md` (English) and `ai-act-zh.md` (Chinese).
- Add a language switch line under the H1: `English · [中文](ai-act-zh.md)`.
- A missing translation is never a defect.

## Automated checks

CI runs on every push and pull request (`.github/workflows/validate.yml`), and weekly to catch links that rot. Run the same checks locally before opening a pull request:

```bash
node scripts/check-docs.mjs                              # offline, no network needed
node scripts/check-quotes.mjs                            # offline: are the quoted sentences still in the snapshots
lychee --config .lychee.toml --no-progress './**/*.md'   # external links
```

`scripts/check-docs.mjs` fails on:

- missing or incomplete front matter (`title`, `evidence`, `verified` are required);
- a date field that is not `YYYY-MM-DD`, or `—` outside `status: draft / proposed / stub`;
- a `verified` date in the future;
- a `source_updated` later than `verified` — the instrument changed after the card was last attested;
- an `evidence` letter other than A, B or C;
- a `source` whose host is not an official publication;
- a link under an "Official sources" heading that is not on an official host;
- a relative link that does not resolve;
- a `stage` outside `plan / public-comment / adopted-not-in-force / in-force`, a `status: draft / proposed / stub` with no `stage`, a stage that contradicts its status, or a `plan` / `public-comment` card carrying an `effective` date;
- a `[gap:…]` tag whose type is not one of the five declared types, or that sits on a TODO already checked off;
- a card carrying a quote section without a `retrieved` date;
- a `skills/<name>/SKILL.md` whose front matter does not open the file, whose `name` or `description` is empty, or whose `name` does not match its directory.

`scripts/check-quotes.mjs` fails on a quote that is **absent** from its snapshot or **unverifiable** (missing snapshot, no source URL, a non-official source host, or a snapshot whose body no longer matches its own recorded hash), and warns on **drift** (most of the sentence is still there but the tail moved) and on snapshots no card cites.

Two things the checker deliberately lets through: links inside fenced code blocks and inline code spans (they are examples, not links), and a link on a line that says in words that it is *not* an official source (`not an official source`, `非官方来源`) — label it honestly and it may stay.

CI runs from GitHub's runners, which cannot reliably reach sites that only serve mainland China. `.lychee.toml` excludes those hosts; run the link check from a network inside China to cover them. That is why the quote check is offline: 30 of the 47 distinct URLs in `docs/` are hosts CI never reaches, so "is the sentence still there" cannot depend on reaching them.

The same is true, for a different reason, of EUR-Lex. It sits behind a filter that treats datacenter traffic erratically: from a runner the identical URL alternates between a real `200`, an empty `202`, a `502`, a `503` and a connect timeout, and the answer does not depend on the User-Agent. `.lychee.toml` therefore keeps the request rate low, counts every `5xx` as reachable, and keeps the retry budget generous; on top of that the `External links` job runs the whole check a second time before it reports failure. What survives two passes is a link that is really broken — a `404`, a `410`, or a host that does not resolve — so take a reported error at face value. The one exception: if the error is on `eur-lex.europa.eu` and the URL opens fine in your browser, it was a timeout, and re-running the job is the fix.

## Submitting

- Fork, branch, open a pull request.
- `main` is protected: both CI checks must pass before anything reaches it, and direct pushes are rejected. Push a branch and open a pull request; the merge button unlocks once the checks are green.
- Do not publish a personal email: author commits from a GitHub `noreply` address (`git config user.email`).
- One pull request, one change (one law, one table, one correction).
- **Do not add any AI attribution** to commits or files (no `Co-Authored-By: Claude`, no "generated with …" lines).
- This repository uses **DCO**: sign off your commits (`git commit -s`) to certify you have the right to submit the work under this repository's licences.

```bash
git commit -s -m "docs(cn): add card for the labelling measures"
```

## Not accepted

- Claims without a source.
- Flaming, personal attacks, or partisan point-scoring.
- Copy-pasting someone else's work without attribution.
- Private or personal information, internal documents.

## License

By contributing you agree that prose is licensed under CC BY-SA 4.0 and code — the skill and the scripts included — under MIT. See the [README](README.md#license).

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
published: 2025-03-14       # the date the instrument carries (adoption or signature), not the OJ date
effective: 2025-09-01       # date of entry into force
applies: 2025-09-01         # optional: date it first binds those it governs, if that differs
status: in-force            # in-force / draft / proposed / repealed / stub
source: <link to the official text>
evidence: A                 # the card's own grade — A / B / C, see docs/README.md
verified: 2026-10-06        # date you last checked the source
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

## Writing rules

- **Cite the source for every key fact** — link or official document number.
- **Grade the evidence.** **A** = the primary official text (statute, regulation, mandatory standard), checked live against the link in `source`. **B** = another official source (regulator guidance, an official press release, Commission pages), or a direct mechanical reading of the primary text. **C** = our own comparison or inference, or a claim not yet traced back to the primary text — news reports included; a C never supports a conclusion on its own, and an unchecked one keeps the `⚠`. The table is repeated in [`docs/README.md`](docs/README.md#evidence-grades).
- **Date the check.** Laws change; readers need to know when you verified this.
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
lychee --config .lychee.toml --no-progress './**/*.md'   # external links
```

`scripts/check-docs.mjs` fails on:

- missing or incomplete front matter (`title`, `evidence`, `verified` are required);
- a date field that is not `YYYY-MM-DD`, or `—` outside `status: draft / proposed / stub`;
- a `verified` date in the future;
- an `evidence` letter other than A, B or C;
- a `source` whose host is not an official publication;
- a link under an "Official sources" heading that is not on an official host;
- a relative link that does not resolve;
- a `skills/<name>/SKILL.md` whose front matter does not open the file, whose `name` or `description` is empty, or whose `name` does not match its directory.

Two things the checker deliberately lets through: links inside fenced code blocks and inline code spans (they are examples, not links), and a link on a line that says in words that it is *not* an official source (`not an official source`, `非官方来源`) — label it honestly and it may stay.

CI runs from GitHub's runners, which cannot reliably reach sites that only serve mainland China. `.lychee.toml` excludes those hosts; run the link check from a network inside China to cover them.

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

# ai-governance-compare — an agent skill

[`SKILL.md`](SKILL.md) is an instruction file for a coding agent (Claude Code, Codex, DSH, OpenCode, …). Load it and the agent answers "how does the EU or China regulate …" by reading *this repository* rather than from memory — and carries the evidence grade and the check date into its answer.

It is a pointer, not a copy. The skill deliberately holds no list of comparison files and no evidence-grade table: it sends the agent to the `## Start here` table in [`README.md`](../../README.md) and to the writing rules in [`docs/README.md`](../../docs/README.md). Adding a comparison never requires editing it.

## Install

A skill is a directory containing a `SKILL.md`. Copy this directory's `SKILL.md` into the skills directory of whichever agent you use.

### From a clone

```bash
git clone --depth 1 https://github.com/modusensus/ai-governance-compare.git
mkdir -p ~/.claude/skills/ai-governance-compare
cp ai-governance-compare/skills/ai-governance-compare/SKILL.md ~/.claude/skills/ai-governance-compare/
```

### Without a clone

```bash
mkdir -p ~/.claude/skills/ai-governance-compare
curl -fsSL -o ~/.claude/skills/ai-governance-compare/SKILL.md \
  https://raw.githubusercontent.com/modusensus/ai-governance-compare/main/skills/ai-governance-compare/SKILL.md
```

Some networks reset `raw.githubusercontent.com`. The same file is served through a CDN mirror:

```bash
mkdir -p ~/.claude/skills/ai-governance-compare
curl -fsSL -o ~/.claude/skills/ai-governance-compare/SKILL.md \
  https://cdn.jsdelivr.net/gh/modusensus/ai-governance-compare@main/skills/ai-governance-compare/SKILL.md
```

On Windows call `curl.exe`: in PowerShell `curl` is an alias for `Invoke-WebRequest`, which does not take these flags.

Rather not install anything? The one-line form — paste it into the agent instead — is in the root README under **Use it from an agent**.

### Where each agent looks

| Agent | Skills directory |
|---|---|
| Claude Code | `~/.claude/skills/<name>/` |
| Codex | `~/.agents/skills/<name>/` |
| DSH | `~/.dsh/skills/<name>/` |
| OpenCode | `~/.config/opencode/skills/<name>/` |

`<name>` is `ai-governance-compare`, and it must match the `name` field inside the file — `scripts/check-docs.mjs` enforces that. Whichever agent you use, it may also load the skill on its own: the `description` in the front matter is written as a list of triggers, and that is the only part the agent sees when it decides whether the skill is relevant. Codex's manual invocation is `$ai-governance-compare`; it has also been changing where it looks for skills, so if it does not pick this one up, check your version's documentation.

### Project-level

The same directory also works inside a project, at `.claude/skills/`, `.agents/skills/` or `.opencode/skills/` — for example inside a clone of this repository, to make the skill available only there.

### Offline

Step 1 of the skill reads a local copy before it reaches for the network, so any clone is enough. Keep a snapshot at `~/.dsh/skill-data/ai-governance-compare` and no network is needed at all.

## Changing it

`SKILL.md` must not go stale when the content changes — that is the whole design. Do not add a list of comparisons, an evidence-grade table, a jurisdiction list, or a count of anything: link to where those live. Only `name` and `description` are required in the front matter, and they are checked on every push.

## Licence

[MIT](../../LICENSE) — the skill is a tool, and the scripts are licensed the same way. The comparison documents under `docs/` are [CC BY-SA 4.0](../../LICENSE-docs).

---
applyTo: "docs/**/*.md"
---

# Docs Instructions — ocg-ui

## Purpose
Docs in this repo are decision-useful references, not essays.
Readers are future Copilot sessions and the one developer/operator.

## Style rules
- Write in short, declarative sentences.
- Prefer bullet lists over paragraphs for anything enumerable.
- Maximum section length: ~10 bullets or ~100 words of prose before splitting.
- Use `## Assumptions` and `## Open questions` sections wherever uncertainty exists.
- Avoid hedging language ("it might be useful to perhaps consider…"). State or question, don't hedge.

## Structure
- Every doc should open with a one-sentence purpose statement.
- Use H2 (`##`) for sections; avoid going deeper than H3 unless a table is clearer.
- Tables are fine for comparisons; avoid tables for simple lists.

## What docs should NOT do
- Document process for process's sake.
- Duplicate information already clear from code.
- Speculate about future enterprise requirements.
- Include placeholder filler ("TBD — to be determined later").
  Replace TBD with an explicit open question instead.

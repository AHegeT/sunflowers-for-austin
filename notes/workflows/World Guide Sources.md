# World Guide drafting notes

The initial English reader-facing guide is in `../../manuscript/en/guide/`. It is intentionally separate from the author glossary and future plans. The guide drafts explanations; this file records sources and choices to review.

## Sources and reveal boundaries

| Reader page | Main sources | Boundary choices |
| --- | --- | --- |
| [Glossary](../../manuscript/en/guide/glossary.md) | [Author glossary](../world/Glossary.md), [reading chapters](../../manuscript/en/SUMMARY.md), world/technology notes for orientation | Foundational terms are explained after chapter 1; classroom tools after 2; egg after 3; hatching, Unseen, and Apex after 4; Hub research after 5. |
| [People](../../manuscript/en/guide/people.md) and individual profiles | Reading chapters and [main](../characters/Character%20Briefs%20-%20Main.md)/[secondary](../characters/Character%20Briefs%20-%20Secondary.md) briefs | Category directories show names and introduction chapters. Basic identity and descriptive introductions are visible on profile pages; later story events remain chapter-gated. Natalia's age (37) and personality summary come from her current brief and need author review. Future arcs, birth years, and detailed student biographies remain omitted. |
| [History and places](../../manuscript/en/guide/timeline.md) | Reading chapters and [timeline exploration](../world/history/Exploring%20the%20timeline.md) | Broad orientation without exact era dates, since chronology still needs reconciliation. Nothing from later-act plans is revealed. |

## Editorial choices to review

- Main/supporting categories are navigation choices for this first wiki layout, not a final statement about each character’s importance. Julia can move categories as the guide grows.
- Natalia’s card reuses the chapter-1 train artwork and labels it as scene concept art. Julia reuses existing artwork; all other profiles have image placeholders. No new character images were generated.
- Profile basics and character names are deliberately browsable before finishing their first chapter. The reveal system protects later events and discoveries, rather than hiding the entire cast directory.

- “Green Hands / Green Gloves” is presented as terminology used by the current draft. Decide whether the two names are interchangeable or describe distinct groups before expanding the guide.
- Returner/Remainer orientation is available after chapter 1. More precise rules about identity, subjective age, memory, and uploads remain out of the basic guide.
- The author glossary’s TDS tiers are omitted: the first pass describes what the reading chapters establish rather than publishing the entire model.
- The chapter-5 family revelation is attributed to Monty’s account to Natalia. It is not treated as a universally known fact or proof of what all characters believe.
- Alvin and Bruno’s claims about signals and the Download remain competing interpretations. Their theories do not become the narrator’s confirmed explanation.
- Reader content can include useful context beyond verbatim chapter wording, but review reveal timing whenever adding an explanation from the author notes.

## Next steps

- [ ] Author review of definitions, terminology, and reveal timing.
- [ ] Add or refine entries while editing chapters 2 and 5.
- [ ] Translate reviewed guide content into Spanish using `story-translate`; localize controls and map Spanish chapter filenames at the same time.
- [ ] Consider term links from the manuscript after the glossary’s stable entry IDs are reviewed.

The prototype uses ordinary HTML details wrappers in mdBook. The technical authoring pattern is documented in the repository README. Author notes are not included in the guide build.

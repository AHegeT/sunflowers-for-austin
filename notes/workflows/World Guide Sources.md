# World Guide drafting notes

The initial English reader-facing guide is in `../../manuscript/en/guide/`. It is intentionally separate from the author glossary and future plans. The guide drafts explanations; this file records sources and choices to review.

## Sources and reveal boundaries

| Reader page | Main sources | Boundary choices |
| --- | --- | --- |
| [Glossary](../../manuscript/en/guide/glossary.md) | [Author glossary](../world/Glossary.md), [reading chapters](../../manuscript/en/SUMMARY.md), world/technology notes for orientation | Foundational terms are explained after chapter 1; classroom tools after 2; egg after 3; hatching, Unseen, and Apex after 4; Hub research after 5. |
| [People](../../manuscript/en/guide/people.md) and individual profiles | Reading chapters and [main](../characters/Character%20Briefs%20-%20Main.md)/[secondary](../characters/Character%20Briefs%20-%20Secondary.md) briefs | Directories and whole profiles are freely browsable. Descriptive facts, including ages and birth years, draw from the current character briefs; later events and background are displayed as ordinary reference sections. Future arcs and detailed student biographies remain omitted. |
| [History and places](../../manuscript/en/guide/timeline.md) | Reading chapters and [timeline exploration](../world/history/Exploring%20the%20timeline.md) | Place orientation is kept separate from the new world chronology, which supplies provisional era dates with reconciliation notes below. Nothing from later-act plans is revealed. |

## Editorial choices to review

- Main/supporting categories are navigation choices for this first wiki layout, not a final statement about each character’s importance. Julia can move categories as the guide grows.
- Natalia’s card reuses the chapter-1 train artwork and labels it as scene concept art. Julia reuses existing artwork; all other profiles have image placeholders. No new character images were generated.
- Profiles and directories no longer have spoiler gates, at the author’s request.

- The author has confirmed **Green Gloves** as the faction name; earlier Green Hands references in active reading material and briefs have been updated.
- Returner/Remainer orientation is available after chapter 1. More precise rules about identity, subjective age, memory, and uploads remain out of the basic guide.
- The author glossary’s TDS tiers are omitted: the first pass describes what the reading chapters establish rather than publishing the entire model.
- The chapter-5 family revelation is attributed to Monty’s account to Natalia. It is not treated as a universally known fact or proof of what all characters believe.
- Alvin and Bruno’s claims about signals and the Download remain competing interpretations. Their theories do not become the narrator’s confirmed explanation.
- Reader content can include useful context beyond verbatim chapter wording, but review reveal timing whenever adding an explanation from the author notes.

## Next steps

- [ ] Author review of definitions, terminology, and reveal timing.
- [ ] Add or refine entries while editing chapters 2 and 5.
- [ ] Translate reviewed guide content into Spanish using `story-translate`; retain the existing localized controls and Spanish chapter map.
- [ ] Consider term links from the manuscript after the glossary’s stable entry IDs are reviewed.

The prototype uses ordinary HTML details wrappers in mdBook. The technical authoring pattern is documented in the repository README. Author notes are not included in the guide build.

## Whole-page reveal and factions

Character profiles and their directory/sidebar entries are always visible. Whole-page reveal support remains available for future pages, with an empty `pageReveals` registry. The shared setting now sits at the bottom of the sidebar and still controls the glossary and History and places reveals.

Factions is a sibling of People, with a reader-facing landing page at `manuscript/en/guide/factions.md`. The faction notes include material marked for review, so they have not been published wholesale. Future profiles belong under `guide/factions/`, linking back to individual members in People.

## Character enrichment and world chronology

The profiles now draw descriptive reference material from both character briefs: physical appearance, personality, skills, origins, and existing relationships. Added five Chapter 4 guest profiles: Kenji, Thorne, Rostova, Lena/Ihor, and Sharma. All keep image placeholders. Biography from the briefs is draft reference material, not a claim that every detail has already appeared verbatim in the manuscript.

The world chronology uses **Story Setting** (rather than the alternate optimistic/pessimistic forecasts) in [Exploring the timeline](../world/history/Exploring%20the%20timeline.md), plus the dedicated [Hum](../world/history/The%20Years%20of%20The%20Hum.md), [Cold Dawn](../world/history/The%20Cold%20Dawn.md), and [Great Upload](../world/history/The%20Great%20Upload.md) files. It covers the 2020s–2073, marks dates provisional, and gives competing era names. All chronology sections are now visible without warnings or chapter gates, at the author’s request.

### Reconciliation status

See [Story Decisions](Story%20Decisions.md) for the author-confirmed names, Paloma’s hair, missing decade, thirteen-year separation, and corrected Monty age ranges. These choices have been applied in current manuscripts, guide pages, and active character/world briefs.

Still open:

- Thirteen elapsed years, Natalia’s “five years for me,” and the missing decade need a coherent shared reference point. No explanation or replacement lived-age figure has been invented.
- Aurelius’s chronology is resolved: illness at 17 in 2040, death at 20 in 2043. The illness prompts Arcturus to join Telomere. Oculus develops gradually from 2040; the established Hum dates remain approximate. See Story Decisions.
- Mendez’s earlier name is now Lomeli Lopez. Her age 43 and upload age 31 can fit a 2061 upload and 2068 return; exact dates remain unspecified.
- The timeline’s older simultaneous/everyone-returned claim differs from the manuscript’s remaining sleepers and two return waves.
- First Spring’s 2057–2058 boundary remains provisional.
- Sharma’s allegedly unrecordable voice and Chapter 4’s amplifier need reconciliation.
- Nicolai/Nikolai and Codi/Cody remain undecided.

### Material kept in author notes

Planned betrayals, future-book outcomes, Leon's true death and Codi's spiritual origin, Lena/Ihor's eventual reveal, the actual Continuum failure mechanism, and Sharma's secret alliance remain out of reader profiles. Nicolai and Queonh do not have current published chapter introductions, so no reader profiles have been added for them yet. Alvin and Bruno have no entries in these two briefs; their existing chapter-based profiles are retained without invented backstories. MBTI, Enneagram, zodiac, and fictional comparison labels remain writing aids in the source notes.

## Supporting-character navigation

Supporting characters are grouped in the directory and sidebar: Cuernavaca (Lina), The school (Mendez), Green Gloves (Julia), The Unseen and world leadership (Kaelo, Kenji, Thorne, Sharma), Apex and long-lifers (Rostova, Lena/Ihor), and The Sleeping Hub (Alvin, Bruno). These are navigation groupings by community, workplace, or affiliation, not a claim that everyone shares a single current political allegiance. Profiles link back to their group.

See [Chapter 2 Review](Chapter%202%20Review.md) for the more precise age/date/name audit, including the manuscript’s Raul/Baltazar Montante and Mendez/Lopez differences. The review also clarifies that five experienced years versus fifteen elapsed years is compatible with ten missing years; it is distinct from the brief’s inconsistent five-year memory-gap claim.

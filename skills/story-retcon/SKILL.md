---
name: story-retcon
description: Find the passages and dependent story facts affected by an author-requested retcon, then report them or apply the requested revision. Use for changes to established characters, world rules, events, or chronology, not ordinary proofreading.
---

# Story retcon impact review

Turn the author's proposed change into an evidence-based impact map. Keep the distinction between current manuscript, reader guide, plans, and historical source material. The author decides new facts; do not invent replacement history to make a retcon fit.

## Determine the change and mode

Extract the old and new facts from the request and sources. For example, changing Natalia to a 20-year-old male hockey player affects age, gender, occupation, pronouns, expertise, work obligations, relationships, and possibly the Upload timeline. This example is illustrative, not a change to apply unless requested.

If the user asks to find, show, audit, or assess impact, use report mode and leave content untouched. If they ask to update or apply the retcon, make the requested edits and report unresolved dependencies. An explicit update request is authorization for those edits; do not ask for redundant confirmation. If no mode is clear, produce the impact report first.

Read the project's author index and relevant briefs, then compare them with the actual manuscript. In Sunflowers for Austin, start at `notes/INDEX.md` and `notes/story/chapters/INDEX.md`. Treat notes and AI passages as unreviewed until their relationship to the manuscript is established. The author's new instruction supersedes conflicting source facts within its stated scope.

## Search for direct and dependent references

Use `rg` for names, aliases, old facts, age expressions, dates, professional titles, and related terms in both languages and reader-facing material. Inspect nearby paragraphs to attribute each match to the right entity. Pronouns and generic words need contextual reading: do not replace every “she,” “woman,” or “therapist” in a document containing many people.

Follow dependencies beyond literal matches: birth year versus present age, subjective versus biological age, education and career timing, specialized knowledge, relationships, who knows a fact, and actions motivated by it. Look for implicit descriptions and Spanish grammatical agreement. Review relevant scenes even if the old fact is not named outright.

Group findings by manuscript, reader guide/translation, active planning notes, and archive/transcripts. Include a file link with a verified line number, a short excerpt, why it is affected, and whether it is a direct mismatch, likely dependency, or author decision. Distinguish a character's mistaken belief, lie, or past description from an accidental inconsistency. Do not assume an old statement becomes false in a scene set before the retcon's effective date.

## Apply only what the change determines

In edit mode, update direct facts and unambiguous grammatical agreement in the requested active material. Make minimal changes preserving the author's voice. Where a therapist's scene would need an entirely different motivation or expertise, identify the decision and leave that passage for the author unless they explicitly request new writing. Never use global pronoun substitution as a character retcon.

Do not rewrite raw recordings, AI conversations, old versions, or archives merely to match new canon. They preserve the writing history; list their conflicting references separately if relevant. Update active briefs or guide entries when included in scope, preserving reveal thresholds so the retcon does not introduce earlier spoilers. Track affected translations as outdated, or synchronize them when translation is within the requested scope.

## Close the loop

Search again for old facts and inspect remaining hits rather than declaring all occurrences errors. Verify related dates, names, and speaker/character attribution. Build changed reader editions when applicable. Report files edited, passages deliberately left unchanged, unresolved narrative choices, and remaining edition-sync work. Describe search scope and limits rather than claiming exhaustive semantic coverage.

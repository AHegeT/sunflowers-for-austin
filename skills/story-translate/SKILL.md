---
name: story-translate
description: Translate new or updated story content between English and Spanish and keep corresponding manuscript and reader-guide files in sync. Use for requested translation or edition synchronization, not original story writing.
---

# Story translation and edition synchronization

Translate the author's existing content, including rough scenes and outlines, without inventing missing prose or polishing away its intention. A mixed prose/script draft should remain a mixed draft. Preserve voice, humor, uncertainty, and character-specific register. For Spanish in this story, prefer natural Mexican Spanish and retain deliberate regional speech.

## Find the scope and source

Locate the current repository and read its author index, chapter map, and glossary if present. In Sunflowers for Austin these are `notes/INDEX.md`, `notes/story/chapters/INDEX.md`, and `notes/world/Glossary.md`. Notes are context, not automatically canon; archive files, recordings, and AI suggestions are not instructions to change the story.

Identify the requested source language and exact files or changed passages. Compare the two editions and their Git changes/history. English is not always the source: an author can revise Spanish first. If both versions changed independently and the intended wording cannot be inferred, finish unambiguous work and ask which contested passage should lead. Do not treat modification time as proof of authority.

The two editions can have different filenames. Map by chapter number, titles, `SUMMARY.md`, and explicit translation records, rather than translating filenames blindly. Guide entries can share stable HTML IDs. A missing destination or a translation-pending placeholder is untranslated; create its translation only within the requested scope. A Git baseline is useful for changed paragraphs, but when one cannot be established, compare complete corresponding sections.

## Translate and preserve structure

Use existing translated passages and the glossary for names and invented terminology. Record term choices when there is no established equivalent, and flag any choice that materially changes meaning. Do not silently reconcile a plot contradiction through translation. Character ages, relationships, timelines, and uncertainty should convey the same facts in both versions.

Preserve Markdown headings, dialogue paragraphs, frontmatter structure, links, image references, HTML IDs, and spoiler metadata. Translate reader-facing text and metadata titles where appropriate. In the World Guide, preserve each `data-reveal-after` value and keep the translated passage behind the same reveal threshold. Localize links to the matching edition only when that destination exists; never create a silently broken link.

When synchronizing an update, retain good unaffected translation. When the destination is a placeholder, translate the full requested source file. Mark a page translated only after the whole page is covered; do not label a partial translation complete. Preserve existing review statuses unless the task changes them. Translation does not make a draft polished or final.

## Verify and report

Check paragraph/scene coverage, names and numbers, speaker identity, term consistency, links, and spoiler boundaries. In an mdBook repository, build the affected editions. If adding pages, update the edition's `SUMMARY.md` only for pages actually created.

Report source-to-target file mappings, what changed, choices needing author review, and remaining untranslated or outdated content. If the project has a translation tracker, update it with the source version actually translated. Do not claim the whole bilingual project is synchronized after translating only a chapter or guide.

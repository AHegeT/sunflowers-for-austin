# [Insert Book Title Here]

> **Status:** 🚧 In Progress (v0.9)
> **Author:** Alan Hegewisch

## 🌿 The Whitman Protocol
I am writing this book in public. This repository contains the living manuscript, concept art, and discarded drafts of my story.

### How to Read This
* **📖 Read the Story:** Go to the [`manuscript/`](/manuscript) folder to read the latest chapters.
* **🎨 See the Vibes:** Check [`assets/concept-art/`](/assets/concept-art) for visuals.
* **🗑️ The Ongoing Work:** Check [`drafts/`](/drafts) for rough ideas that are in development.

### How to Help
This story is open source. If you find a plot hole, a typo, or a logical inconsistency, please **[Open an Issue](../../issues)**. 

### 🛠️ Local Development
This book is built with [mdBook](https://rust-lang.github.io/mdBook/).

**Setup**
```sh
cargo install mdbook --version 0.5.4 --locked
cargo install mdbook-frontmatter-strip --version 1.1.3 --locked
```
> These versions must match the ones pinned in [`.scripts/vercel-build.sh`](.scripts/vercel-build.sh) (the production build command, referenced from [`vercel.json`](vercel.json)) — `mdbook` and `mdbook-frontmatter-strip` are versioned independently, and an unpinned `cargo install` silently grabs the latest preprocessor release, which can break compatibility with an older pinned `mdbook` binary.

**Useful commands**
| Command | What it does |
| --- | --- |
| `mdbook serve` | Serves the English edition locally at `http://localhost:3000` with live reload (watches `manuscript/en`) |
| `mdbook serve manuscript/es` | Serves the Spanish edition locally with live reload |
| `mdbook build manuscript/en && mdbook build manuscript/es` | Builds both editions into `book/`, mirroring the production build ([`.scripts/vercel-build.sh`](.scripts/vercel-build.sh)) |
| `./.scripts/replace-hyphen.sh` | Separates em-dash dialogue and known speaker labels into Markdown paragraphs in both editions. Preserves ordinary lists, frontmatter, code blocks, and `SUMMARY.md`. Requires Python 3; safe to re-run. |
| `./.scripts/replace-hyphen.sh --check` | Reports dialogue formatting changes without writing files; exits with status 1 if changes are needed. |
| `./.scripts/replace-hyphen.sh --legacy-hyphens manuscript/en/your-chapter.md` | Also converts bare `- ` lines into em-dash dialogue in the specified chapter. Use only when its non-link lists are dialogue. |
| `./.scripts/bump-mdbook.sh` | Checks for newer `mdbook` / `mdbook-frontmatter-strip` releases, test-builds both editions locally, and — only if that succeeds — updates the version pins in `.scripts/vercel-build.sh` and this README together. Leaves everything untouched if the test build fails. |

### License
* **The Story (Prose):** [CC BY-NC-ND 4.0](LICENSE-PROSE)
* **The Code/Structure:** [MIT License](LICENSE)

### World Guide and spoilers

The English [World Guide](manuscript/en/guide/index.md) is a wiki-style landing page with a glossary, character directories/profiles, and history/places. Browse **People → Main characters → Natalia** for the profile layout: an information card, existing concept art or an image placeholder, and chapter-aware sections. The mdBook sidebar mirrors this hierarchy and folds its categories. Preview it with `mdbook serve` or `mdbook serve manuscript/en`; both English configurations include the same guide styles and script.

Readers choose the last chapter they finished using **Show information through**. **Finished Chapter** buttons at the end of reading chapters advance that setting. Opening a chapter does not advance it. Later guide sections stay collapsed behind a chapter warning and can be opened voluntarily. Reset returns to **Before the story**; the selection is stored locally in the browser when available.

Author new reveal sections using this pattern (HTML content inside the wrapper avoids Markdown/HTML parsing surprises):

```html
<details class="story-reveal" data-reveal-after="5">
<summary>Spoilers through Chapter 5 — reveal anyway</summary>
<div class="story-reveal-body">
<h2>A heading that would reveal too much outside the warning</h2>
<p>The reader-facing explanation.</p>
</div>
</details>
```

Keep both revealing headings and their contents inside the wrapper. `data-reveal-after="5"` means **after finishing chapter 5**. Without JavaScript these sections remain manually expandable. Guide pages are excluded from mdBook search so snippets cannot expose collapsed text. The printable book keeps closed guide sections hidden; the story chapters themselves remain in the normal full-book print view.

When adding a chapter, update the chapter filename map and `LAST_CHAPTER` in `theme/story-guide.js`. Existing reveal values and browser progress remain stable. The prototype is English-only; translating the guide also requires localizing the controls and adding the matching Spanish chapter map.

### Story editing skills

Reusable skill sources live under `skills/`:

- `story-translate`: translate new content or synchronize updated English/Spanish passages while preserving voice, structure, terminology, and reveal thresholds.
- `story-retcon`: find direct references and narrative dependencies affected by a proposed change, or apply the retcon when requested. Report mode does not edit; archives and raw recordings retain their historical wording.

Example requests: “Use $story-translate to bring Spanish chapter 2 up to date with English,” or “Use $story-retcon to show where Natalia’s age and occupation would need changing.” An instruction to apply a retcon permits the direct edits; unresolved motivations and scene rewrites remain author decisions.

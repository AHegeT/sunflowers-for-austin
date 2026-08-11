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
cargo install mdbook mdbook-frontmatter-strip
```

**Useful commands**
| Command | What it does |
| --- | --- |
| `mdbook serve` | Serves the English edition locally at `http://localhost:3000` with live reload (watches `manuscript/en`) |
| `mdbook serve manuscript/es` | Serves the Spanish edition locally with live reload |
| `mdbook build manuscript/en && mdbook build manuscript/es` | Builds both editions into `book/`, mirroring the production build ([`vercel.json`](vercel.json)) |
| `./.scripts/replace-hyphen.sh` | Converts dialogue lines that start with `- ` into proper em-dashes (`— `) across `manuscript/en` and `manuscript/es` so mdBook renders them correctly. Safe to re-run. |

### License
* **The Story (Prose):** [CC BY-NC-ND 4.0](LICENSE-PROSE)
* **The Code/Structure:** [MIT License](LICENSE)
#!/usr/bin/env python3
"""Separate dialogue turns without rewriting their words or ordinary lists."""

import argparse
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
# Explicit manuscript speaker labels; don't mistake arbitrary hyphenated words
# (or story-beat notes such as "Day 3 - Proposed") for dialogue.
SPEAKERS = (
    "N", "M", "P", "D", "A", "Nat", "Natalia", "Monty", "Montante",
    "Paloma", "Lina", "Julia", "Arcturus", "Kaelo", "Ivan", "Girl",
    "Person", "Claus", "Shaggy", "Daniela", "Nestor", "Aimé", "Valeria",
    "Santiago", "Codi", "Alvin", "Bruno", "M and N",
)
SPEAKER = re.compile(r"^(?:" + "|".join(map(re.escape, SPEAKERS)) + r")\s*[-:]")
FENCE = re.compile(r"^ {0,3}(`{3,}|~{3,})")


def format_dialogue(source, legacy_hyphens=False):
    lines = source.splitlines(keepends=True)
    newline = "\r\n" if "\r\n" in source else "\n"
    marked = []
    frontmatter = False
    fence = None
    for index, line in enumerate(lines):
        value = line.rstrip("\r\n")
        if index == 0 and value == "---":
            frontmatter = True
            marked.append((line, False))
            continue
        if frontmatter:
            marked.append((line, False))
            if value in ("---", "..."):
                frontmatter = False
            continue
        match = FENCE.match(value)
        if fence:
            marked.append((line, False))
            if match and match[1][0] == fence[0] and len(match[1]) >= len(fence) and not value.strip()[len(match[1]):].strip():
                fence = None
            continue
        if match:
            fence = match[1]
            marked.append((line, False))
            continue
        # Preserve indented code, blockquotes, and list nesting.
        if value.startswith("    ") or value.startswith("\t"):
            marked.append((line, False))
            continue
        stripped = value.lstrip(" ")
        dialogue = stripped.startswith("— ") or bool(SPEAKER.match(stripped))
        if legacy_hyphens and stripped.startswith("- ") and not stripped.startswith(("- [", "- ![")):
            stripped = "— " + stripped[2:]
            dialogue = True
        if dialogue:
            # Retain speaker labels and wording; blank paragraphs supply the
            # breaks, so invisible trailing-space breaks are unnecessary.
            line = stripped.rstrip() + (newline if line.endswith("\n") else "")
        marked.append((line, dialogue))
    output = []
    previous_dialogue = False
    for line, dialogue in marked:
        if output and output[-1].strip() and line.strip() and (dialogue or previous_dialogue):
            if not output[-1].endswith("\n"):
                output[-1] += newline
            output.append(newline)
        output.append(line)
        previous_dialogue = dialogue
    return "".join(output)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("paths", nargs="*", type=Path, help="Files to format (default: both manuscript editions, excluding SUMMARY.md).")
    parser.add_argument("--check", action="store_true", help="Report needed changes without writing; exit 1 if any are needed.")
    parser.add_argument("--legacy-hyphens", action="store_true", help="Treat bare '- ' lines as dialogue. Use only on files whose non-link lists are dialogue.")
    args = parser.parse_args()
    paths = args.paths or sorted((ROOT / "manuscript").glob("*/*.md"))
    changed = 0
    for path in paths:
        if path.name == "SUMMARY.md":
            continue
        with path.open(encoding="utf-8", newline="") as handle:
            original = handle.read()
        formatted = format_dialogue(original, args.legacy_hyphens)
        if original != formatted:
            changed += 1
            print(f"{'Needs formatting' if args.check else 'Formatted'}: {path}")
            if not args.check:
                with path.open("w", encoding="utf-8", newline="") as handle:
                    handle.write(formatted)
    return int(args.check and changed > 0)


if __name__ == "__main__":
    raise SystemExit(main())

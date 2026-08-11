#!/bin/bash
# Converts dialogue lines that start with "- " into proper em-dashes ("— ")
# so mdBook renders them correctly. Safe to re-run (idempotent).
sed -i '' 's/^- /— /g' manuscript/en/*.md manuscript/es/*.md

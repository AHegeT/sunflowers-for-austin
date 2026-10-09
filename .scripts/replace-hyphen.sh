#!/bin/bash
# Format dialogue as separate Markdown paragraphs. Works from any directory.
set -euo pipefail
script_dir="$(cd -- "$(dirname -- "$0")" && pwd)"
exec python3 "$script_dir/format-dialogue.py" "$@"

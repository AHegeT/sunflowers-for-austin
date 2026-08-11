#!/bin/bash
# Checks for newer mdbook / mdbook-frontmatter-strip releases, test-builds both
# editions with them locally, and only on success rewrites the version pins in
# .scripts/vercel-build.sh and README.md. Never touches those files if the
# build fails.
#
# Why pin at all: an unpinned `cargo install mdbook-frontmatter-strip` grabs
# whatever is newest, and that preprocessor's expected protocol can drift out
# of sync with an older pinned `mdbook` binary — that mismatch broke the
# production deploy once already. This script keeps both versions moving
# together, verified, instead of drifting independently.
set -euo pipefail
cd "$(dirname "$0")/.."

CRATES_UA="sunflowers-for-austin-bump-script (aheget11@gmail.com)"
BUILD_SCRIPT=".scripts/vercel-build.sh"

current_mdbook=$(grep -oE '^MDBOOK_VERSION="[0-9.]+"' "$BUILD_SCRIPT" | grep -oE '[0-9.]+')
current_fms=$(grep -oE '^FRONTMATTER_STRIP_VERSION="[0-9.]+"' "$BUILD_SCRIPT" | grep -oE '[0-9.]+')

latest_mdbook=$(curl -sSL https://api.github.com/repos/rust-lang/mdBook/releases/latest | python3 -c 'import json,sys; print(json.load(sys.stdin)["tag_name"].lstrip("v"))')
latest_fms=$(curl -sSL -H "User-Agent: $CRATES_UA" https://crates.io/api/v1/crates/mdbook-frontmatter-strip | python3 -c 'import json,sys; print(json.load(sys.stdin)["crate"]["max_version"])')

echo "mdbook:                   pinned=$current_mdbook  latest=$latest_mdbook"
echo "mdbook-frontmatter-strip: pinned=$current_fms  latest=$latest_fms"

if [[ "$current_mdbook" == "$latest_mdbook" && "$current_fms" == "$latest_fms" ]]; then
  echo "Already up to date. Nothing to do."
  exit 0
fi

echo "Installing candidate versions and test-building..."
cargo install mdbook --version "$latest_mdbook" --locked --force
cargo install mdbook-frontmatter-strip --version "$latest_fms" --locked --force

rm -rf book
if ! mdbook build manuscript/en || ! mdbook build manuscript/es; then
  echo
  echo "Build FAILED with mdbook $latest_mdbook + mdbook-frontmatter-strip $latest_fms."
  echo "Pins in $BUILD_SCRIPT / README.md were left untouched."
  echo "Reinstall the last known-good versions with:"
  echo "  cargo install mdbook --version $current_mdbook --locked --force"
  echo "  cargo install mdbook-frontmatter-strip --version $current_fms --locked --force"
  exit 1
fi
rm -rf book

echo "Build succeeded. Updating pinned versions in $BUILD_SCRIPT and README.md..."

sed -i '' -E \
  -e "s#^MDBOOK_VERSION=\"[0-9.]+\"#MDBOOK_VERSION=\"${latest_mdbook}\"#" \
  -e "s#^FRONTMATTER_STRIP_VERSION=\"[0-9.]+\"#FRONTMATTER_STRIP_VERSION=\"${latest_fms}\"#" \
  "$BUILD_SCRIPT"

sed -i '' -E \
  -e "s#cargo install mdbook --version [0-9.]+#cargo install mdbook --version ${latest_mdbook}#g" \
  -e "s#cargo install mdbook-frontmatter-strip --version [0-9.]+#cargo install mdbook-frontmatter-strip --version ${latest_fms}#g" \
  README.md

echo "Done. Review the diff (git diff $BUILD_SCRIPT README.md), then commit and push to deploy."

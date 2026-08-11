#!/bin/bash
# Production build command, run by Vercel (see vercel.json's buildCommand).
# Versions here are kept in sync with README.md's "Setup" section by
# .scripts/bump-mdbook.sh — don't edit one without the other.
set -euo pipefail

MDBOOK_VERSION="0.5.4"
FRONTMATTER_STRIP_VERSION="1.1.3"

curl -sSL "https://github.com/rust-lang/mdBook/releases/download/v${MDBOOK_VERSION}/mdbook-v${MDBOOK_VERSION}-x86_64-unknown-linux-gnu.tar.gz" | tar -xz
cargo install mdbook-frontmatter-strip --version "$FRONTMATTER_STRIP_VERSION" --locked
./mdbook build manuscript/en
./mdbook build manuscript/es

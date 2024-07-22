#!/bin/sh
# shellcheck disable=SC2006
if [ -n "$NO_PREPARE_INSTALL" ] || [ -d ".husky" ]; then
  echo "NO_PREPARE_INSTALL is set or .husky directory exists. Skip setup husky"
else
  pnpm husky-setup
fi
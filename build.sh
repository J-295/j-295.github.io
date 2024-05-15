#!/bin/bash

rm -rf docs/
npx tsc
rsync -a --include '*/' --include='*.html' --include='*.css' --exclude='*' src/ docs/

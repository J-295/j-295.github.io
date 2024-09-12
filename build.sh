#!/bin/bash

rm -rf docs/
npx tsc
npx webpack
rsync -a --exclude='*.ts' src/ docs/

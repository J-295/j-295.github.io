#!/bin/bash

rm -rf docs/
npx tsc
rsync -a --exclude='*.ts' src/ docs/

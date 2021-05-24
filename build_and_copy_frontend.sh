#!/usr/bin/env sh

rm -rf assets
npm run build --prefix remote-frontend/
mv remote-frontend/build assets

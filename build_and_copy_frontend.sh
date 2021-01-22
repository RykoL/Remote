#!/usr/bin/env sh

npm run build --prefix remote-frontend/
cp -R remote-frontend/build assets

#!/bin/bash

# Build the project
npm run build

# Copy CNAME to dist
cp CNAME dist/

# Navigate to dist
cd dist

# Initialize git if not already
if [ ! -d .git ]; then
  git init
  git checkout -b master
fi

# Add all files
git add -A

# Commit
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch (or master for user pages)
git push -f git@github.com:codegass/codegass.github.io.git master

cd ..

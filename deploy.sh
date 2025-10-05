#!/bin/bash

echo "Building project..."
npm run build

echo "Copying CNAME..."
cp CNAME dist/

echo "Deploying to master branch..."
cd dist

# Initialize git if not already
if [ ! -d .git ]; then
  git init
  git checkout -b master
fi

# Add all files
git add -A

# Commit
git commit -m "Deploy to GitHub Pages - $(date)"

# Push to master branch
git push -f git@github.com:codegass/codegass.github.io.git master:master

cd ..

echo "Deployment complete!"
echo "Your site will be available at https://chenhao.phd"

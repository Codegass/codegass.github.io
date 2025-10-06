# Chenhao Wei Personal Website

A static website built with Vite featuring an interactive book navigation interface and a full-featured blog system with three-column layout, math rendering, and footnotes.

## Project Structure

```
├── src/                    # Source code
│   ├── pages/             # HTML pages
│   │   ├── index.html     # Home page with 4 book navigation
│   │   ├── about.html     # About Me section
│   │   ├── blog.html      # Blog section
│   │   ├── publication.html # Publication section
│   │   └── code.html      # Code section
│   ├── js/                # JavaScript modules
│   │   ├── main.js        # Main JS with GSAP animations
│   │   ├── blog.js        # Blog listing page logic
│   │   ├── article.js     # Article page logic
│   │   └── python-highlight-enhancer.js # Python syntax enhancement
│   ├── data/              # Development data
│   │   └── blog-posts.json # Auto-generated blog metadata (dev)
│   └── styles/            # CSS styles
│       ├── main.css       # Main styles with 12-column grid system
│       ├── blog.css       # Blog-specific styles
│       └── infinity-icon.css # Infinity icon animation styles
├── scripts/               # Build scripts
│   └── generate-blog-metadata.js # Blog metadata generator
├── public/                # Static assets
│   ├── blog/              # Blog markdown files
│   │   ├── *.md           # Blog posts with frontmatter
│   │   └── img/           # Blog images
│   ├── data/              # Data files
│   │   ├── news.json      # News banner content (editable)
│   │   ├── blog-posts.json # Auto-generated blog metadata
│   │   └── python-highlight-keywords.json # Python syntax keywords
│   ├── images/            # Image assets
│   │   ├── cover-about-me.jpg
│   │   ├── cover-blog.jpg
│   │   ├── cover-code.jpg
│   │   └── cover-pub.jpg
│   ├── CNAME              # GitHub Pages custom domain
│   └── .nojekyll          # GitHub Pages config
├── dist/                  # Build output (git ignored)
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies
└── deploy.sh              # Deployment script

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The site is deployed to GitHub Pages using the custom domain `chenhao.phd`.

```bash
# Deploy to GitHub Pages
./deploy.sh
```

## Features

### Homepage
- **Interactive Book Navigation**: 4 books representing different sections (About Me, Blog, Publication, Code)
- **News Banner**: Dynamic news display with peel-off button effect
- **GSAP Animations**: Smooth 3D hover effects on book covers
- **12-Column Grid System**: Responsive layout using CSS Grid

### Blog System
- **Three-Column Layout**: Table of contents (left), article content (center), sidenotes (right)
- **Search Functionality**: Real-time search across titles, excerpts, tags, and authors
- **Math Rendering**: Full LaTeX support with KaTeX for inline and display equations
- **Footnotes/Sidenotes**: Automatic conversion of footnotes to margin notes on wide screens
- **Syntax Highlighting**: Code blocks with highlight.js and enhanced Python support
- **Automatic Metadata**: Blog posts generated from markdown files with frontmatter
- **Reading Time**: Auto-calculated reading time for each post
- **Responsive Design**: Adapts to mobile, tablet, and desktop screens
- **Clean URLs**: SEO-friendly article URLs with query parameters

### Deployment
- **Custom Domain**: Hosted at chenhao.phd
- **Vite Build**: Fast development and optimized production builds
- **GitHub Pages**: Automated deployment with custom scripts

## Managing News Banner

The news banner is displayed above the book navigation and can be easily updated by editing `public/data/news.json`:

### Show News

Edit `public/data/news.json` with your news item:

```json
{
  "items": [
    {
      "text": "New publication accepted at CVPR 2025!",
      "url": "/publication.html"
    }
  ]
}
```

- **text**: The news message to display (keep it concise, 1-2 lines)
- **url**: The page to navigate to when clicked (can be any valid URL or page path)

### Hide News

To hide the news banner, simply empty the items array:

```json
{
  "items": []
}
```

The banner will automatically disappear when there are no items.

### Design

- Uses a peel-off sticker button effect with a soft pink color (#ffd6e0)
- Automatically fades in with a smooth animation
- Only displays the first item in the array
- Responsive design adapts to all screen sizes

## Managing Blog Posts

See [BLOG_GUIDE.md](./BLOG_GUIDE.md) for detailed instructions on creating and managing blog posts.

### Quick Start

1. Create a markdown file in `public/blog/`:
```bash
touch public/blog/my-new-post.md
```

2. Add frontmatter and content:
```markdown
---
title: "My New Post"
author: Chenhao Wei
date: 2025-01-10
tags:
  - research
  - AI
excerpt: A brief description of the post
---

# My New Post

Your content here...
```

3. The system automatically generates metadata when you run:
```bash
npm run dev  # or npm run build
```

## Technologies

### Core
- **Vite**: Build tool and dev server
- **Vanilla JavaScript**: No framework dependencies
- **CSS Grid**: Responsive layouts

### Animations & UI
- **GSAP**: Smooth 3D hover effects

### Blog System
- **markdown-it**: Markdown parser with plugin support
- **markdown-it-footnote**: Footnote/sidenote support
- **KaTeX**: Math rendering (LaTeX)
- **highlight.js**: Code syntax highlighting
- **gray-matter**: Frontmatter parsing
- **reading-time**: Reading time calculation

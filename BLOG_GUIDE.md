# Blog System Guide

## Overview

This blog system automatically generates metadata from markdown files with frontmatter. You only need to write markdown files, and the system handles everything else!

## How It Works

1. **Write Markdown Files**: Create `.md` files in `src/data/blog/` with frontmatter
2. **Auto-Generation**: When you run `npm run dev`, `npm run build`, or `./deploy.sh`, the system automatically:
   - Parses all markdown files
   - Extracts metadata from frontmatter
   - Calculates reading time
   - Generates `blog-posts.json`
3. **Display**: The blog pages automatically load and display your posts

## Adding a New Blog Post

### Step 1: Create a Markdown File

Create a new file in `src/data/blog/` with a `.md` extension:

```bash
touch src/data/blog/my-new-post.md
```

### Step 2: Add Frontmatter

Add frontmatter at the top of your file between triple dashes:

```yaml
---
title: "Your Awesome Post Title"
author: Chen Hao
date: 2025-01-06
tags:
  - tag1
  - tag2
  - tag3
excerpt: A brief description of your post (150-200 characters recommended)
featured: true  # Set to true to highlight this post
---
```

### Step 3: Write Your Content

Write your post using standard Markdown syntax:

```markdown
# Main Heading

Your introduction paragraph...

## Section 1

Content with **bold** and *italic* text.

### Subsection

- Bullet points
- More points

```javascript
// Code blocks with syntax highlighting
function example() {
  return "Hello World";
}
```

## Section 2

More content...
```

### Step 4: Run the Development Server

The blog metadata will be automatically generated:

```bash
npm run dev
```

Your post will appear on the blog page at `http://localhost:5173/blog.html`

## Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | The post title |
| `author` | string | No | Author name (defaults to "Chen Hao") |
| `date` | YYYY-MM-DD | No | Publication date (defaults to today) |
| `tags` | array | No | List of tags for categorization |
| `excerpt` | string | No | Brief description (auto-generated if not provided) |
| `featured` | boolean | No | Whether to feature this post (default: false) |
| `id` | string | No | Custom post ID (auto-generated from filename if not provided) |

## Commands

- **`npm run dev`**: Generates metadata and starts development server
- **`npm run build`**: Generates metadata and builds for production
- **`npm run generate-blog`**: Only generates blog metadata
- **`./deploy.sh`**: Builds and deploys to GitHub Pages

## File Structure

```
src/
├── data/
│   ├── blog/                 # Your markdown posts go here
│   │   ├── post-1.md
│   │   ├── post-2.md
│   │   └── ...
│   └── blog-posts.json       # Auto-generated metadata
├── js/
│   ├── blog.js               # Blog listing page logic
│   └── article.js            # Article page logic
├── pages/
│   ├── blog.html             # Blog listing page
│   └── article.html          # Article template
└── styles/
    └── blog.css              # Blog styles

scripts/
└── generate-blog-metadata.js # Metadata generation script
```

## Features

- ✅ **Automatic Metadata Generation**: No need to manually update JSON files
- ✅ **Reading Time Calculation**: Automatically calculated from content
- ✅ **Frontmatter Parsing**: Clean separation of metadata and content
- ✅ **Syntax Highlighting**: Code blocks with Prism.js
- ✅ **Markdown Support**: Full GitHub-flavored markdown
- ✅ **Responsive Design**: Works on all devices
- ✅ **SEO-Friendly**: Clean URLs and meta tags
- ✅ **Fast Loading**: Static generation for optimal performance

## Tips

1. **Image Paths**: Use absolute paths starting with `/` for images
2. **Date Format**: Use `YYYY-MM-DD` format for dates
3. **File Naming**: Use kebab-case for markdown filenames (e.g., `my-awesome-post.md`)
4. **Excerpts**: Keep them under 200 characters for best display
5. **Tags**: Use lowercase, descriptive tags for better organization

## Example Post

See `src/data/blog/example-new-post.md` for a complete example of how to structure your blog posts.

## Troubleshooting

If your post doesn't appear:
1. Check that the file is in `src/data/blog/` directory
2. Verify the frontmatter is valid YAML
3. Run `npm run generate-blog` to see any error messages
4. Ensure the date format is correct (`YYYY-MM-DD`)

## Future Enhancements

- Search functionality
- Tag filtering
- RSS feed generation
- Comments system
- Social sharing buttons
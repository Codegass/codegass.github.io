#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
const BLOG_DIR = path.join(__dirname, '../public/blog');
const OUTPUT_FILE = path.join(__dirname, '../src/data/blog-posts.json');

// Generate slug from filename
function generateSlug(filename) {
  return filename
    .replace('.md', '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

// Parse markdown files and extract metadata
function parseMarkdownFiles() {
  // Create blog directory if it doesn't exist
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
    console.log(`Created blog directory at ${BLOG_DIR}`);
    return [];
  }

  // Get all markdown files
  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));

  if (files.length === 0) {
    console.log('No markdown files found in blog directory');
    return [];
  }

  const posts = files.map(filename => {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Parse frontmatter
    const { data, content } = matter(fileContent);

    // Calculate reading time
    const stats = readingTime(content);

    // Generate ID from filename or frontmatter
    const id = data.id || generateSlug(filename);

    // Extract or generate metadata
    const post = {
      id,
      title: data.title || 'Untitled Post',
      author: {
        name: data.author || 'Chen Hao'
      },
      date: data.date || new Date().toISOString().split('T')[0],
      excerpt: data.excerpt || content.slice(0, 200).replace(/[#*`\n]/g, '').trim() + '...',
      tags: data.tags || [],
      readingTime: Math.ceil(stats.minutes),
      markdown: filename,
      featured: data.featured || false
    };

    return post;
  });

  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

// Generate blog-posts.json
function generateBlogMetadata() {
  console.log('Generating blog metadata...');

  try {
    const posts = parseMarkdownFiles();

    const blogData = {
      posts,
      generated: new Date().toISOString(),
      total: posts.length
    };

    // Ensure data directory exists
    const dataDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Ensure public blog directory exists
    if (!fs.existsSync(BLOG_DIR)) {
      fs.mkdirSync(BLOG_DIR, { recursive: true });
    }

    // Write JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(blogData, null, 2));

    console.log(`✓ Generated blog metadata with ${posts.length} posts`);
    console.log(`  Output: ${OUTPUT_FILE}`);

    // List generated posts
    if (posts.length > 0) {
      console.log('\nGenerated posts:');
      posts.forEach(post => {
        console.log(`  - ${post.title} (${post.date})`);
      });
    }

    return blogData;
  } catch (error) {
    console.error('Error generating blog metadata:', error);
    process.exit(1);
  }
}

// Run the generator
if (import.meta.url === `file://${process.argv[1]}`) {
  generateBlogMetadata();
}

export { generateBlogMetadata, parseMarkdownFiles };
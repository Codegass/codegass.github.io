// Individual article page functionality
import blogData from '../data/blog-posts.json';
import { enhancePythonHighlighting } from './python-highlight-enhancer.js';

// Get URL parameters
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Format date to readable string
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Load article header
function loadArticleHeader(post) {
  const headerElement = document.getElementById('article-header');
  const formattedDate = formatDate(post.date);

  headerElement.innerHTML = `
    <h1 class="article-title">${post.title}</h1>
    <div class="article-meta">
      <div class="article-author">
        <div class="article-author__name">${post.author.name}</div>
      </div>
      <span>${formattedDate}</span>
      <span>${post.readingTime} min read</span>
    </div>
  `;

  // Update page title
  document.title = `${post.title} - Chen Hao`;
}

// Load article content
async function loadArticleContent(markdownFile) {
  try {
    const response = await fetch(`/blog/${markdownFile}`);
    if (!response.ok) {
      throw new Error('Article not found');
    }

    let markdownContent = await response.text();
    console.log('Original markdown length:', markdownContent.length);

    // Remove frontmatter if present
    if (markdownContent.startsWith('---')) {
      const endOfFrontmatter = markdownContent.indexOf('---', 3);
      if (endOfFrontmatter !== -1) {
        markdownContent = markdownContent.substring(endOfFrontmatter + 3).trim();
        console.log('After frontmatter removal:', markdownContent.substring(0, 100));
      }
    }

    // Remove the first H1 heading (since we display title in header)
    markdownContent = markdownContent.replace(/^#\s+.+$/m, '').trim();

    // Wait for markdown-it to be loaded
    let attempts = 0;
    while (!window.markdownit && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }

    if (!window.markdownit) {
      console.error('markdown-it library failed to load');
      throw new Error('Markdown parser not available');
    }

    console.log('markdown-it is available:', typeof window.markdownit);

    // Configure markdown-it with footnote support
    const md = window.markdownit({
      html: true,
      linkify: true,
      typographer: true,
      breaks: true
    }).use(window.markdownitFootnote);

    // Parse markdown to HTML
    const htmlContent = md.render(markdownContent);
    console.log('HTML content length:', htmlContent.length);
    console.log('HTML preview:', htmlContent.substring(0, 200));

    const contentElement = document.getElementById('article-content');
    contentElement.innerHTML = htmlContent;

    // Apply syntax highlighting with highlight.js
    setTimeout(async () => {
      if (window.hljs) {
        const codeBlocks = contentElement.querySelectorAll('pre code');

        // First apply highlight.js
        codeBlocks.forEach(block => {
          hljs.highlightElement(block);
        });

        // Add line numbers to all code blocks
        codeBlocks.forEach(block => {
          addLineNumbers(block);
        });

        // Then enhance Python blocks with custom highlighting
        const pythonBlocks = contentElement.querySelectorAll('pre code.language-python, pre code.python');
        for (const block of pythonBlocks) {
          await enhancePythonHighlighting(block);
        }
      }
    }, 100);

    // Function to add line numbers
    function addLineNumbers(codeBlock) {
      // Get the code content
      const code = codeBlock.textContent;
      const lines = code.split('\n');

      // Remove the last line if it's empty (common with code blocks)
      if (lines[lines.length - 1].trim() === '') {
        lines.pop();
      }

      // Create line numbers
      const lineNumbers = lines.map((_, index) => index + 1).join('\n');

      // Wrap the pre element with a container
      const pre = codeBlock.parentElement;
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';

      // Create line numbers element
      const lineNumbersEl = document.createElement('pre');
      lineNumbersEl.className = 'line-numbers';
      lineNumbersEl.setAttribute('aria-hidden', 'true');
      lineNumbersEl.textContent = lineNumbers;

      // Insert wrapper
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(lineNumbersEl);
      wrapper.appendChild(pre);

      // Add copy button
      addCopyButton(wrapper, code);
    }

    // Function to add copy button
    function addCopyButton(wrapper, code) {
      const button = document.createElement('button');
      button.className = 'copy-button';
      button.setAttribute('aria-label', 'Copy code to clipboard');

      // Copy icon SVG
      const copyIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 2.5h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3.5 5.5h-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;

      // Checkmark icon SVG
      const checkIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;

      button.innerHTML = copyIcon;

      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code);
          button.innerHTML = checkIcon;
          button.classList.add('copied');

          setTimeout(() => {
            button.innerHTML = copyIcon;
            button.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code:', err);
        }
      });

      wrapper.appendChild(button);
    }

  } catch (error) {
    console.error('Error loading article content:', error);
    const contentElement = document.getElementById('article-content');
    contentElement.innerHTML = `<p style="text-align: center; color: var(--color-meta);">Error loading article: ${error.message}</p>`;
  }
}

// Load related articles
async function loadRelatedArticles(currentPostId, currentPostTags) {
  try {
    const data = blogData;

    // Find related posts based on shared tags
    const relatedPosts = data.posts
      .filter(post => post.id !== currentPostId)
      .map(post => ({
        ...post,
        sharedTags: post.tags.filter(tag => currentPostTags.includes(tag)).length
      }))
      .filter(post => post.sharedTags > 0)
      .sort((a, b) => b.sharedTags - a.sharedTags)
      .slice(0, 3);

    if (relatedPosts.length > 0) {
      const relatedSection = document.getElementById('related-articles');
      const relatedGrid = document.getElementById('related-articles-grid');

      const relatedHTML = relatedPosts.map(post => `
        <article class="article-card" onclick="window.location.href='article.html?id=${post.id}'" role="button" tabindex="0">
          <h3 class="article-card__title">${post.title}</h3>
          <p class="article-card__excerpt">${post.excerpt}</p>
          <div class="article-card__footer">
            <span class="article-card__reading-time">${post.readingTime} min read</span>
          </div>
        </article>
      `).join('');

      relatedGrid.innerHTML = relatedHTML;
      relatedSection.style.display = 'block';
    }

  } catch (error) {
    console.error('Error loading related articles:', error);
  }
}

// Main function to load article
async function loadArticle() {
  const articleId = getUrlParameter('id');

  if (!articleId) {
    window.location.href = 'blog.html';
    return;
  }

  try {
    const data = blogData;
    const post = data.posts.find(p => p.id === articleId);

    if (!post) {
      throw new Error('Article not found');
    }

    // Load article header
    loadArticleHeader(post);

    // Load article content
    await loadArticleContent(post.markdown);

    // Load related articles
    loadRelatedArticles(post.id, post.tags);

  } catch (error) {
    console.error('Error loading article:', error);
    document.getElementById('article-header').innerHTML = '<h1>Article Not Found</h1>';
    document.getElementById('article-content').innerHTML = `<p style="text-align: center; color: var(--color-meta);">The article you're looking for could not be found. <a href="blog.html">Return to blog</a></p>`;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadArticle);
} else {
  loadArticle();
}

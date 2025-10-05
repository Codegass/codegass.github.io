// Blog listing page functionality
import blogData from '../data/blog-posts.json';

// Format date to readable string
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Create article card HTML
function createArticleCard(post) {
  const formattedDate = formatDate(post.date);

  // Create tags HTML
  const tagsHTML = post.tags.map(tag =>
    `<span class="article-card__tag">${tag}</span>`
  ).join('');

  return `
    <article class="article-card" onclick="window.location.href='article.html?id=${post.id}'" role="button" tabindex="0">
      <h2 class="article-card__title">${post.title}</h2>
      <div class="article-card__meta">
        <div class="article-card__author">
          <span>${post.author.name}</span>
        </div>
        <span class="article-card__date">${formattedDate}</span>
      </div>
      <p class="article-card__excerpt">${post.excerpt}</p>
      <div class="article-card__footer">
        <div class="article-card__tags">
          ${tagsHTML}
        </div>
        <span class="article-card__reading-time">${post.readingTime} min read</span>
      </div>
    </article>
  `;
}

// Load and display blog posts
async function loadBlogPosts() {
  try {
    const data = blogData;

    const articlesGrid = document.getElementById('articles-grid');

    if (!data.posts || data.posts.length === 0) {
      articlesGrid.innerHTML = '<p style="text-align: center; color: var(--color-meta);">No articles found.</p>';
      return;
    }

    // Sort posts by date (newest first)
    const sortedPosts = data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Generate HTML for all posts
    const postsHTML = sortedPosts.map(post => createArticleCard(post)).join('');
    articlesGrid.innerHTML = postsHTML;

    // Add keyboard navigation support
    document.querySelectorAll('.article-card').forEach(card => {
      card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });

  } catch (error) {
    console.error('Error loading blog posts:', error);
    const articlesGrid = document.getElementById('articles-grid');
    articlesGrid.innerHTML = '<p style="text-align: center; color: var(--color-meta);">Error loading articles. Please try again later.</p>';
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadBlogPosts);
} else {
  loadBlogPosts();
}
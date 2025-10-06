// Blog listing page functionality

// Load blog data from public directory
let blogData = null;
async function loadBlogData() {
  if (blogData) return blogData;
  const response = await fetch('/data/blog-posts.json');
  blogData = await response.json();
  return blogData;
}

// Format date to readable string
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Format date to compact string (e.g., "Oct 1")
function formatDateCompact(dateString) {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Create article card HTML
function createArticleCard(post) {
  const compactDate = formatDateCompact(post.date);

  // Create tags HTML
  const tagsHTML = post.tags.map(tag =>
    `<span class="article-card__tag">${tag}</span>`
  ).join('');

  return `
    <article class="article-card" onclick="window.location.href='article.html?id=${post.id}'" role="button" tabindex="0">
      <div class="article-card__date">${compactDate}</div>
      <div class="article-card__content">
        <h2 class="article-card__title">${post.title}</h2>
        <div class="article-card__meta">
          <span class="article-card__author">${post.author.name}</span>
          <div class="article-card__tags">${tagsHTML}</div>
        </div>
      </div>
    </article>
  `;
}

// Store all posts for search
let allPosts = [];

// Load and display blog posts
async function loadBlogPosts(filterQuery = '') {
  try {
    const data = await loadBlogData();

    const articlesGrid = document.getElementById('articles-grid');

    if (!data.posts || data.posts.length === 0) {
      articlesGrid.innerHTML = '<p style="text-align: center; color: var(--color-meta);">No articles found.</p>';
      return;
    }

    // Sort posts by date (newest first)
    allPosts = data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Filter posts if search query exists
    let postsToDisplay = allPosts;
    if (filterQuery) {
      const query = filterQuery.toLowerCase();
      postsToDisplay = allPosts.filter(post => {
        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query)) ||
          post.author.name.toLowerCase().includes(query)
        );
      });
    }

    // Show message if no results
    if (postsToDisplay.length === 0) {
      articlesGrid.innerHTML = '<p style="text-align: center; color: var(--color-meta);">No articles found matching your search.</p>';
      return;
    }

    // Generate HTML for all posts
    const postsHTML = postsToDisplay.map(post => createArticleCard(post)).join('');
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

// Setup search functionality
function setupSearch() {
  const searchInput = document.getElementById('blog-search-input');

  if (!searchInput) return;

  // Debounce search to avoid too many rerenders
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      loadBlogPosts(e.target.value);
    }, 300);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadBlogPosts();
    setupSearch();
  });
} else {
  loadBlogPosts();
  setupSearch();
}
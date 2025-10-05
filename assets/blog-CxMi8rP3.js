import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css             */import{b as o}from"./blog-posts-D8qwlW9W.js";function s(t){const e=new Date(t),c={year:"numeric",month:"long",day:"numeric"};return e.toLocaleDateString("en-US",c)}function l(t){const e=s(t.date),c=t.tags.map(n=>`<span class="article-card__tag">${n}</span>`).join("");return`
    <article class="article-card" onclick="window.location.href='article.html?id=${t.id}'" role="button" tabindex="0">
      <h2 class="article-card__title">${t.title}</h2>
      <div class="article-card__meta">
        <div class="article-card__author">
          <span>${t.author.name}</span>
        </div>
        <span class="article-card__date">${e}</span>
      </div>
      <p class="article-card__excerpt">${t.excerpt}</p>
      <div class="article-card__footer">
        <div class="article-card__tags">
          ${c}
        </div>
        <span class="article-card__reading-time">${t.readingTime} min read</span>
      </div>
    </article>
  `}async function i(){try{const t=o,e=document.getElementById("articles-grid");if(!t.posts||t.posts.length===0){e.innerHTML='<p style="text-align: center; color: var(--color-meta);">No articles found.</p>';return}const n=t.posts.sort((a,r)=>new Date(r.date)-new Date(a.date)).map(a=>l(a)).join("");e.innerHTML=n,document.querySelectorAll(".article-card").forEach(a=>{a.addEventListener("keypress",r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),a.click())})})}catch(t){console.error("Error loading blog posts:",t);const e=document.getElementById("articles-grid");e.innerHTML='<p style="text-align: center; color: var(--color-meta);">Error loading articles. Please try again later.</p>'}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",i):i();

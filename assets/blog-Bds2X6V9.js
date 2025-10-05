import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css             */import{b as u}from"./blog-posts-C7u7XMbR.js";function m(t){const e=new Date(t),a={month:"short",day:"numeric"};return e.toLocaleDateString("en-US",a)}function g(t){const e=m(t.date),a=t.tags.map(o=>`<span class="article-card__tag">${o}</span>`).join("");return`
    <article class="article-card" onclick="window.location.href='article.html?id=${t.id}'" role="button" tabindex="0">
      <div class="article-card__date">${e}</div>
      <div class="article-card__content">
        <h2 class="article-card__title">${t.title}</h2>
        <div class="article-card__meta">
          <span class="article-card__author">${t.author.name}</span>
          <div class="article-card__tags">${a}</div>
        </div>
      </div>
    </article>
  `}let c=[];async function i(t=""){try{const e=u,a=document.getElementById("articles-grid");if(!e.posts||e.posts.length===0){a.innerHTML='<p style="text-align: center; color: var(--color-meta);">No articles found.</p>';return}c=e.posts.sort((r,n)=>new Date(n.date)-new Date(r.date));let o=c;if(t){const r=t.toLowerCase();o=c.filter(n=>n.title.toLowerCase().includes(r)||n.excerpt.toLowerCase().includes(r)||n.tags.some(d=>d.toLowerCase().includes(r))||n.author.name.toLowerCase().includes(r))}if(o.length===0){a.innerHTML='<p style="text-align: center; color: var(--color-meta);">No articles found matching your search.</p>';return}const l=o.map(r=>g(r)).join("");a.innerHTML=l,document.querySelectorAll(".article-card").forEach(r=>{r.addEventListener("keypress",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),r.click())})})}catch(e){console.error("Error loading blog posts:",e);const a=document.getElementById("articles-grid");a.innerHTML='<p style="text-align: center; color: var(--color-meta);">Error loading articles. Please try again later.</p>'}}function s(){const t=document.getElementById("blog-search-input");if(!t)return;let e;t.addEventListener("input",a=>{clearTimeout(e),e=setTimeout(()=>{i(a.target.value)},300)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{i(),s()}):(i(),s());

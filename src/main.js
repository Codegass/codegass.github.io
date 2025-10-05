import './styles/main.css';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);
CustomEase.create("bookEase", "0.25, 1, 0.5, 1");

document.addEventListener("DOMContentLoaded", function () {
  // Load and display news
  fetch('/data/news.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load news');
      }
      return response.json();
    })
    .then(data => {
      const newsBanner = document.getElementById('newsBanner');

      if (data.items && data.items.length > 0) {
        // Display the first news item
        const newsItem = data.items[0];
        const newsLink = document.createElement('a');
        newsLink.href = newsItem.url;
        newsLink.className = 'news-button';
        newsLink.textContent = newsItem.text;

        newsBanner.appendChild(newsLink);

        // Force a reflow to ensure the animation works
        newsBanner.offsetHeight;

        // Fade in the news banner
        setTimeout(() => {
          newsBanner.classList.add('visible');
        }, 100);
      } else {
        // Hide banner if no items
        newsBanner.style.display = 'none';
      }
    })
    .catch(error => {
      console.log('No news to display:', error);
      const newsBanner = document.getElementById('newsBanner');
      if (newsBanner) {
        newsBanner.style.display = 'none';
      }
    });

  const books = document.querySelectorAll(".books__item");

  books.forEach((book) => {
    const hitbox = book.querySelector(".books__hitbox");
    const bookImage = book.querySelector(".books__image");
    const bookEffect = book.querySelector(".books__effect");
    const pages = book.querySelectorAll(".books__page");
    const bookLight = book.querySelector(".books__light");

    // Set initial state for cover image and light effect
    gsap.set(bookImage, {
      boxShadow: "0 10px 20px rgba(0,0,0,0.15), 0 30px 45px rgba(0,0,0,0.12), 0 60px 80px rgba(0,0,0,0.1)"
    });

    gsap.set(bookLight, {
      opacity: 0.1,
      rotateY: 0
    });

    // Set initial state for pages - all stacked at 0
    gsap.set(pages, {
      x: 0
    });

    // Create hover animation timeline (paused by default)
    const hoverIn = gsap.timeline({ paused: true });

    // Add the book cover animation
    hoverIn.to(bookImage, {
      duration: 0.7,
      rotateY: -12,
      translateX: -6,
      scaleX: 0.96,
      boxShadow: "10px 10px 20px rgba(0,0,0,0.25), 20px 20px 40px rgba(0,0,0,0.2), 40px 40px 60px rgba(0,0,0,0.15)",
      ease: "bookEase"
    }, 0);

    // Add the book effect animation
    hoverIn.to(bookEffect, {
      duration: 0.7,
      marginLeft: 10,
      ease: "bookEase"
    }, 0);

    // Add the light effect animation
    hoverIn.to(bookLight, {
      duration: 0.7,
      opacity: 0.2,
      rotateY: -12,
      ease: "bookEase"
    }, 0);

    // Add the page animations to the same timeline
    if (pages.length) {
      hoverIn.to(pages[0], {
        x: "4px",
        duration: 0.7,
        ease: "power1.inOut"
      }, 0);

      hoverIn.to(pages[1], {
        x: "2px",
        duration: 0.7,
        ease: "power1.inOut"
      }, 0);

      hoverIn.to(pages[2], {
        x: "0px",
        duration: 0.7,
        ease: "power1.inOut"
      }, 0);
    }

    // Hover triggers
    hitbox.addEventListener("mouseenter", () => hoverIn.play());
    hitbox.addEventListener("mouseleave", () => hoverIn.reverse());
  });
});

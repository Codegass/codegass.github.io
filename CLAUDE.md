# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal static website hosted on GitHub Pages. The site is accessible at `chenhao.phd` (configured via [CNAME](CNAME)).

## Project Structure

- **Root Directory**: Contains deployment-ready static HTML, CSS, and JavaScript files that are served by GitHub Pages
- **example template/**: Reference implementations and design patterns
  - **book exmaple/**: A book showcase component with 3D hover animations featuring:
    - [home.html](example%20template/book%20exmaple/home.html): HTML structure with 12-column grid layout
    - [home.css](example%20template/book%20exmaple/home.css): CSS with CSS custom properties, grid system, and book animation styles
    - [home.js](example%20template/book%20exmaple/home.js): GSAP-based animations for interactive book covers
- **Static Assets**: Images like [cover-about-me.jpg](cover-about-me.jpg)

## Architecture Patterns

### CSS Architecture
- **CSS Custom Properties**: All theme values (colors, fonts, spacing) are defined in `:root` for consistency
- **12-Column Grid System**: The container uses `display: grid` with `grid-template-columns: repeat(12, 1fr)` for responsive layouts
- **Design Tokens**:
  - `--container-padding: 2rem`
  - `--grid-gap: 1rem`
  - `--color-background: #f5f5f0`
  - `--color-text-primary: #18191a`
  - Font families: `--primary-font` (Inter), `--secondary-font` (Cabinet Grotesk)

### JavaScript Architecture
- **GSAP Animations**: The site uses GSAP (GreenSock Animation Platform) with CustomEase plugin for smooth animations
- **Timeline-based Animations**: Hover effects are controlled via `gsap.timeline()` for synchronized multi-element animations
- **Event-driven Interactions**: Book hover effects are triggered by mouseenter/mouseleave events on hitbox elements

### HTML Structure Pattern
- **Semantic Layout**: Uses BEM-like naming (e.g., `books__item`, `books__container`, `books__cover`)
- **Grid-based Positioning**: Elements are positioned using `grid-column` and `grid-row` properties
- **Layered Elements**: Book components use z-index layering for depth effect (back cover, pages, front image)

## Deployment

This is a GitHub Pages site - all files in the root directory are automatically deployed when pushed to the repository. No build step is required as this is a static site.

### Key Deployment Files
- **CNAME**: Contains the custom domain `chenhao.phd` for GitHub Pages

## Development Guidelines

### Adding New Components
When creating new components, follow the established patterns:
1. Use the 12-column grid system for layout (`grid-column` positioning)
2. Define colors and spacing using CSS custom properties from `:root`
3. Use GSAP for complex animations (already used in book example)
4. Follow the BEM-like naming convention for CSS classes
5. Place working files in root; use `example template/` for reference designs

### CSS Guidelines
- All new theme values should be added to `:root` CSS custom properties
- Use the established grid system (`repeat(12, 1fr)`) for layouts
- Maintain the noise animation effect (applied to `body::before`)
- Font imports should use Google Fonts or CDN fonts

### Animation Guidelines
- GSAP is the animation library of choice
- Create paused timelines and control them with events
- Use `CustomEase.create()` for custom easing functions
- Set initial states with `gsap.set()` before animating

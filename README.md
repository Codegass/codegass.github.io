# Chen Hao Personal Website

A static website built with Vite featuring an interactive book navigation interface.

## Project Structure

```
├── index.html              # Home page with 4 book navigation
├── about.html             # About Me section
├── blog.html              # Blog section
├── publication.html       # Publication section
├── code.html              # Code section
├── src/
│   ├── main.js           # Main JavaScript with GSAP animations
│   └── styles/
│       └── main.css      # Styles with 12-column grid system
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies

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

- **Interactive Book Navigation**: 4 books representing different sections (About Me, Blog, Publication, Code)
- **GSAP Animations**: Smooth 3D hover effects on book covers
- **12-Column Grid System**: Responsive layout using CSS Grid
- **Custom Domain**: Hosted at chenhao.phd
- **Vite Build**: Fast development and optimized production builds

## Technologies

- Vite
- GSAP (GreenSock Animation Platform)
- CSS Grid
- Vanilla JavaScript

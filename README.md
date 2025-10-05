# Chen Hao Personal Website

A static website built with Vite featuring an interactive book navigation interface.

## Project Structure

```
├── src/                    # Source code
│   ├── pages/             # HTML pages
│   │   ├── index.html     # Home page with 4 book navigation
│   │   ├── about.html     # About Me section
│   │   ├── blog.html      # Blog section
│   │   ├── publication.html # Publication section
│   │   └── code.html      # Code section
│   ├── main.js            # Main JavaScript with GSAP animations
│   └── styles/            # CSS styles
│       ├── main.css       # Main styles with 12-column grid system
│       └── infinity-icon.css # Infinity icon animation styles
├── public/                # Static assets
│   ├── data/              # Data files
│   │   └── news.json      # News banner content (editable)
│   ├── images/            # Image assets
│   │   ├── cover-about-me.jpg
│   │   ├── cover-blog.jpg
│   │   ├── cover-code.jpg
│   │   └── cover-pub.jpg
│   └── CNAME              # GitHub Pages custom domain
├── dist/                  # Build output (git ignored)
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies
└── deploy.sh              # Deployment script

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
- **News Banner**: Dynamic news display with peel-off button effect
- **GSAP Animations**: Smooth 3D hover effects on book covers
- **12-Column Grid System**: Responsive layout using CSS Grid
- **Custom Domain**: Hosted at chenhao.phd
- **Vite Build**: Fast development and optimized production builds

## Managing News Banner

The news banner is displayed above the book navigation and can be easily updated by editing `public/data/news.json`:

### Show News

Edit `public/data/news.json` with your news item:

```json
{
  "items": [
    {
      "text": "New publication accepted at CVPR 2025!",
      "url": "/publication.html"
    }
  ]
}
```

- **text**: The news message to display (keep it concise, 1-2 lines)
- **url**: The page to navigate to when clicked (can be any valid URL or page path)

### Hide News

To hide the news banner, simply empty the items array:

```json
{
  "items": []
}
```

The banner will automatically disappear when there are no items.

### Design

- Uses a peel-off sticker button effect with a soft pink color (#ffd6e0)
- Automatically fades in with a smooth animation
- Only displays the first item in the array
- Responsive design adapts to all screen sizes

## Technologies

- Vite
- GSAP (GreenSock Animation Platform)
- CSS Grid
- Vanilla JavaScript

# TopimChytre.cz - Static Website

Modern, responsive static website for TopimChytre.cz - Professional heat pump installation and service by Rudolf Heinz.

## Features

- ✅ Pure HTML5, CSS3, and vanilla JavaScript (no frameworks)
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Fast loading and optimized performance
- ✅ SEO-friendly with structured data
- ✅ Accessible (WCAG 2.1 AA compliant)
- ✅ Modern CSS Grid and Flexbox layouts
- ✅ Smooth scrolling navigation
- ✅ Auto-playing hero slider
- ✅ Mobile-friendly hamburger menu

## Technology Stack

- **HTML5**: Semantic markup with Schema.org structured data
- **CSS3**: Modern CSS with custom properties, Grid, Flexbox
- **JavaScript**: Vanilla ES6+ (no dependencies)
- **Fonts**: Open Sans from Google Fonts

## File Structure

```
topimchytre-static/
├── index.html                 # Main single-page website
├── assets/
│   ├── css/
│   │   ├── reset.css         # CSS reset
│   │   ├── variables.css     # CSS custom properties
│   │   ├── main.css          # Main styles
│   │   └── responsive.css    # Media queries
│   ├── js/
│   │   ├── navigation.js     # Mobile menu & smooth scroll
│   │   ├── slider.js         # Hero image slider
│   │   └── main.js           # Initialization
│   └── images/               # All images and assets
└── README.md                  # This file
```

## Local Development

Simply open `index.html` in a web browser. For best results, use a local server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server)
npx http-server
```

Then open http://localhost:8000 in your browser.

## Deployment

This site can be deployed to any static hosting service:

### Netlify
1. Push to GitHub
2. Connect repository in Netlify
3. Deploy (no build command needed)

### Vercel
1. Push to GitHub
2. Import project in Vercel
3. Deploy (no configuration needed)

### GitHub Pages
1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Select main branch

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- iOS Safari (last 2 versions)
- Chrome Mobile (last 2 versions)

## Performance

- First Contentful Paint: < 1.5s
- Total page size: < 1MB
- Lighthouse score: 90+
- Mobile-friendly: Yes

## Contact

**Rudolf Heinz**
- Phone: +420 777 297 144
- Email: r.heinz@email.cz
- Address: Libeř 316, 252 41, Dolní Břežany
- IČ: 62869990

## License

© 2024 Rudolf Heinz - TopimChytre.cz. All rights reserved.

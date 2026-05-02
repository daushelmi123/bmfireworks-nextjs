# BMFireworks X Bearboom

Malaysia's licensed fireworks distributor website built with Next.js SSR for optimal SEO.

**Live Site:** https://bmfireworks.com

## Tech Stack

- **Framework:** Next.js 16 (App Router, SSR)
- **Styling:** CSS Modules
- **Deployment:** cPanel + PM2 + Cloudflare
- **SEO:** Server-Side Rendering, Schema.org, OpenGraph

## Features

- Server-Side Rendering for Google crawling
- Product catalog with filtering
- Shopping cart (localStorage)
- WhatsApp integration for orders
- Contact form with webhook backend
- Responsive design (mobile-first)
- Cloudflare CDN + HTTPS

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Required variables:
- `NEXT_PUBLIC_WEBHOOK_URL` - Contact form webhook endpoint

## Deployment

### Server Requirements
- Node.js 20+
- PM2 (process manager)
- Apache with mod_proxy

### Deploy Steps

1. Build locally:
```bash
npm run build
```

2. Upload to server (excluding node_modules):
```bash
tar -czf build.tar.gz --exclude='node_modules' .
scp build.tar.gz user@server:/path/to/site/
```

3. On server:
```bash
tar -xzf build.tar.gz
npm install --production
pm2 start app.js --name bmfireworks
pm2 save
```

4. Apache .htaccess (auto proxy to Node.js):
```apache
DirectoryIndex disabled
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/\.well-known/
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
```

### Update Site

```bash
# Local: build
npm run build

# Upload new build to server
# Server: restart PM2
pm2 restart bmfireworks
```

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── layout.js         # Root layout + SEO metadata
│   ├── page.js           # Homepage
│   ├── products/         # Product catalog page
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── checkout/         # Shopping cart
│   └── not-found.js      # 404 page
├── components/           # React components
│   ├── Navbar/
│   ├── Hero/
│   ├── ProductCard/
│   ├── Contact/
│   └── ...
├── context/              # React Context (Cart)
└── data/                 # Static data (products, categories)
```

## SEO Features

- Full SSR (Google can crawl all content)
- Schema.org LocalBusiness markup
- OpenGraph & Twitter cards
- Semantic HTML structure
- Optimized meta tags
- Sitemap & robots.txt ready

## Contact

- Website: https://bmfireworks.com
- WhatsApp: +60 11-124 60415
- Email: admin@bmfireworks.com

---

Built with Next.js SSR for Malaysia's #1 licensed fireworks distributor.

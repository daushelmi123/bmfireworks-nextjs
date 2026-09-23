import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "BMFireworks - Pengedar Bunga Api Berlesen Malaysia | Fireworks CNY Raya 2026",
  description: "Pengedar bunga api berlesen #1 di Malaysia. Permit bunga api CNY & Hari Raya 2026 DIBUKA! 100% legal, lesen PDRM. Mercun, bunga api perkahwinan, acara korporat. Penghantaran ke seluruh Semenanjung.",
  keywords: "BMFireworks, Bearboom, bunga api Malaysia, fireworks Malaysia, legal fireworks, licensed fireworks Malaysia, fireworks distributor, wedding fireworks, Raya fireworks 2026, CNY fireworks 2026, Deepavali fireworks, corporate events fireworks, Johor fireworks, Perak fireworks, permit bunga api, mercun Malaysia, bunga api johor, bunga api perak, bunga api selangor, bunga api KL, pengedar bunga api berlesen, fireworks permit Malaysia, bunga api perkahwinan, bunga api CNY 2026, bunga api Hari Raya 2026, lesen PDRM bunga api",
  metadataBase: new URL('https://bmfirework.com'),
  openGraph: {
    title: "BMFireworks - Pengedar Bunga Api Berlesen Malaysia",
    description: "Pengedar bunga api berlesen #1 di Malaysia. Permit bunga api CNY & Hari Raya 2026 DIBUKA! 100% legal, lesen PDRM.",
    url: 'https://bmfirework.com',
    siteName: 'BMFireworks',
    images: [
      {
        url: '/images/mascot.png',
        width: 800,
        height: 600,
        alt: 'BMFireworks Malaysia',
      },
    ],
    locale: 'ms_MY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "BMFireworks - Pengedar Bunga Api Berlesen Malaysia",
    description: "Pengedar bunga api berlesen #1 di Malaysia. Permit bunga api CNY & Hari Raya 2026 DIBUKA!",
    images: ['/images/mascot.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  icons: {
    icon: '/images/mascot.png',
    apple: '/images/mascot.png',
  },
  other: {
    'geo.region': 'MY',
    'geo.placename': 'Malaysia',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-D49HS0L7NG"></script>
        <script dangerouslySetInnerHTML={{__html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-D49HS0L7NG")`}} />
        <meta name="theme-color" content="#00CED1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "BMFireworks X Bearboom",
              "description": "Pengedar bunga api berlesen #1 di Malaysia. 100% legal, lesen PDRM.",
              "url": "https://bmfirework.com",
              "telephone": "+60-11-124-60415",
              "email": "admin@bmfireworks.com",
              "priceRange": "RM10-RM1000",
              "image": "/images/mascot.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Lot 5662A, Jalan Seelong Jaya 15",
                "addressLocality": "Senai",
                "addressRegion": "Johor",
                "postalCode": "81400",
                "addressCountry": "MY"
              },
              "openingHours": "Mo-Sa 09:00-18:00",
              "paymentAccepted": "Cash, Bank Transfer, Touch n Go, Grab Pay",
              "areaServed": [
                "Perlis", "Kedah", "Pulau Pinang", "Perak", "Kelantan",
                "Terengganu", "Pahang", "Selangor", "Kuala Lumpur",
                "Putrajaya", "Negeri Sembilan", "Melaka", "Johor"
              ]
            })
          }}
        />
      </head>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

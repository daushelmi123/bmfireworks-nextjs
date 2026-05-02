import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "BMFireworks Bearboom | Bunga Api Berlesen Malaysia - Permit CNY Raya 2026",
  description: "Kilang bunga api berlesen PDRM. Permit CNY Raya 2026 DIBUKA! Delivery ke KL, Johor Bahru, Ipoh, Penang, Melaka & seluruh Semenanjung. Wedding, corporate events, mercun. 100% legal!",
  keywords: "BMFireworks, Bearboom, BMFireworks Bearboom, bunga api Malaysia, fireworks Malaysia, bunga api berlesen, kilang bunga api, pemborong bunga api, bunga api KL, bunga api Kuala Lumpur, bunga api Selangor, bunga api Johor Bahru, bunga api JB, bunga api Johor, bunga api Ipoh, bunga api Perak, bunga api Penang, bunga api Melaka, bunga api Negeri Sembilan, bunga api Pahang, permit bunga api Malaysia, permit bunga api 2026, CNY fireworks 2026, Raya fireworks 2026, wedding fireworks Malaysia, corporate events fireworks, mercun Malaysia, lesen PDRM bunga api, delivery fireworks Malaysia, bunga api Semenanjung Malaysia",
  metadataBase: new URL('https://bmfireworks.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "BMFireworks Bearboom | Bunga Api Berlesen Malaysia - Permit CNY Raya 2026",
    description: "Kilang bunga api berlesen PDRM. Permit CNY Raya 2026 DIBUKA! Delivery ke KL, Johor Bahru, Ipoh, Penang, Melaka & seluruh Semenanjung. Wedding, corporate events, mercun. 100% legal!",
    url: 'https://bmfireworks.com',
    siteName: 'BMFireworks Bearboom',
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
    title: "BMFireworks Bearboom | Bunga Api Berlesen Malaysia",
    description: "Kilang bunga api berlesen PDRM. Permit CNY Raya 2026 DIBUKA! Delivery ke KL, JB, Ipoh, Penang, Melaka & seluruh Semenanjung. 100% legal!",
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
        <meta name="theme-color" content="#00CED1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "BMFireworks Bearboom",
              "alternateName": ["Bearboom", "BMFireworks", "BM Fireworks", "Bearboom Fireworks"],
              "description": "Kilang bunga api berlesen PDRM. Permit CNY Raya 2026. Delivery ke KL, Johor Bahru, Ipoh, Penang, Melaka & seluruh Semenanjung Malaysia. 100% legal.",
              "url": "https://bmfireworks.com",
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

export const metadata = {
  alternates: { canonical: '/' },
};

import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import ProductCatalog from '@/components/ProductCatalog/ProductCatalog';
import ServiceArea from '@/components/ServiceArea/ServiceArea';
import FloatingMascot from '@/components/FloatingMascot/FloatingMascot';
import AnnouncementBanner from '@/components/AnnouncementBanner/AnnouncementBanner';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <div className="app">
      <Navbar />
      <FloatingMascot position="corner" size="small" />
      <AnnouncementBanner />
      <main>
        <div id="home">
          <Hero />
        </div>
        <ProductCatalog />
        <ServiceArea />
      </main>
      <Footer />
    </div>
  );
}

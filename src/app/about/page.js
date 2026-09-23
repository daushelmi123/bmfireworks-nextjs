import Navbar from '@/components/Navbar/Navbar';
import About from '@/components/About/About';
import '../AboutPage.css';

export const metadata = {
  alternates: { canonical: '/about' },
  title: 'About Us - BMFireworks',
  description: 'Learn about BMFireworks X Bearboom - Malaysia licensed fireworks distributor',
};

export default function AboutPage() {
  return (
    <div className="about-page">
      <Navbar />
      <div className="page-header">
        <h1>BMFireworks X Bearboom</h1>
        <p>Your trusted fireworks partner in Malaysia</p>
      </div>
      <About />
    </div>
  );
}

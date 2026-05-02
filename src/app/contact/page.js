import Navbar from '@/components/Navbar/Navbar';
import Contact from '@/components/Contact/Contact';
import '../ContactPage.css';

export const metadata = {
  title: 'Contact Us - BMFireworks',
  description: 'Get in touch with BMFireworks X Bearboom team',
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      <Navbar />
      <div className="page-header">
        <h1>BMFireworks X Bearboom</h1>
        <p>Get in touch with our team</p>
      </div>
      <Contact />
    </div>
  );
}

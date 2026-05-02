import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import './NotFoundPage.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <Navbar />
      <div className="not-found-content">
        <div className="not-found-icon">🎆</div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you're looking for doesn't exist or has been moved.</p>
        <div className="not-found-actions">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/products" className="btn-secondary">
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
}

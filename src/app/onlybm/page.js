import Navbar from '@/components/Navbar/Navbar';
import SuratLantikanForm from '@/components/SuratLantikan/SuratLantikanForm';
import '../suratlantikan/SuratLantikanPage.css';

export const metadata = {
  alternates: { canonical: '/onlybm' },
  title: 'Permohonan Permit OnlyBM - Borang Automasi | BMFireworks',
  description:
    'Borang automasi permohonan permit OnlyBM — pakej dokumen BM + GRK (tanpa Amflex), dijana automatik untuk permohonan PDRM.',
  robots: { index: false, follow: false },
};

export default function OnlyBmPage() {
  return (
    <div className="surat-page">
      <Navbar />
      <div className="page-header">
        <h1>Permohonan Permit (OnlyBM)</h1>
        <p>Pakej dokumen BM + GRK — dijana automatik</p>
      </div>
      <div className="surat-container">
        <SuratLantikanForm variant="onlybm" />
      </div>
    </div>
  );
}

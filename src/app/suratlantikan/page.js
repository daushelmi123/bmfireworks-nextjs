import Navbar from '@/components/Navbar/Navbar';
import SuratLantikanForm from '@/components/SuratLantikan/SuratLantikanForm';
import './SuratLantikanPage.css';

export const metadata = {
  alternates: { canonical: '/suratlantikan' },
  title: 'Surat Lantikan Ejen - Borang Automasi | BMFireworks',
  description:
    'Mohon Surat Lantikan Ejen BMFireworks secara automatik. Isi borang, dokumen rasmi (Surat Lantikan + Borang IPD + sokongan) dijana untuk permohonan permit PDRM.',
};

export default function SuratLantikanPage() {
  return (
    <div className="surat-page">
      <Navbar />
      <div className="page-header">
        <h1>Surat Lantikan Ejen</h1>
        <p>Borang automasi — dokumen rasmi dijana dalam beberapa minit</p>
      </div>
      <div className="surat-container">
        <SuratLantikanForm />
      </div>
    </div>
  );
}

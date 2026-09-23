'use client';

import { useEffect, useMemo, useState } from 'react';
import ipdData from '@/data/ipd.json';
import './SuratLantikanForm.css';

/**
 * Borang Surat Lantikan Ejen BMFireworks.
 *
 * Payload & aliran SAMA dengan SPA lama (bmfirework.com/suratlantikanagent):
 *   POST /suratlantikan/hantar  ->  proxy selamat (server-side key)  ->  pdf-service /api/pdf-orders
 * Nama field JANGAN diubah — ikut schema zod backend.
 */

// Pakej PENUH — 18 dok: BMF + Amflex (surat lantikan guna slot nama perayaan)
const TEMPLATES_FULL = [
  'bmfireworks-borang-ipd',
  'bmfireworks-surat-lantikan',
  'bmfireworks-borang-c',
  'bmfireworks-borang-e',
  'bmfireworks-lampiran-a',
  'bmfireworks-surat-kdn',
  'bmfireworks-borang-a',
  'bmfireworks-borang-a-2',
  'bmfireworks-lampiran-a-3',
  'bmfireworks-lampiran-a-4',
  'amflex-surat-lantikan',
  'amflex-borang-c',
  'amflex-borang-e',
  'amflex-lampiran-a',
  'amflex-borang-a',
  'amflex-lampiran-a-1',
  'amflex-lampiran-a2',
  'amflex-lampiran-a3',
];

// Pakej OnlyBM — 17 dok: BM + GRK (TANPA Amflex) — sama macam flow /onlybm SPA lama
const TEMPLATES_ONLYBM = [
  'onlybm-borang-ipd',
  'grk-lampiran-a',
  'bmfireworks-lampiran-a-new',
  'grk-surat-kebenaran',
  'grk-surat-agen',
  'grk-borang-e',
  'grk-surat-kelulusan',
  'grk-borang-a',
  'bmfireworks-surat-lantikan',
  'bmfireworks-borang-c',
  'bmfireworks-borang-e',
  'bmfireworks-lampiran-a',
  'bmfireworks-surat-kdn',
  'bmfireworks-borang-a',
  'bmfireworks-borang-a-2',
  'bmfireworks-lampiran-a-3',
  'bmfireworks-lampiran-a-4',
];

// Pilihan perayaan -> label utk tab (tanpa tahun), name utk dalam surat (dgn tahun)
const FESTIVALS = [
  { key: 'cny-2027', label: 'CNY', name: 'CHINESE NEW YEAR 2027' },
  { key: 'raya-2027', label: 'Hari Raya Aidilfitri', name: 'HARI RAYA AIDILFITRI 2027' },
  { key: 'deepavali-2026', label: 'Deepavali', name: 'DEEPAVALI 2026' },
];

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '601112460415';

const IPDS = ipdData;

const EMPTY_IPD = {
  selectedIpdId: '',
  ipdLine1: '',
  ipdLine2: '',
  ipdLine3: '',
  ipdLine4: '',
  ipdLine5: '',
};

// Tarikh Malaysia (MYT) — JANGAN guna toISOString() (UTC, silap 00:00–08:00 MYT)
const todayMyt = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kuala_Lumpur' }).format(new Date());

const initialForm = () => ({
  festivalType: '',
  fullName: '',
  icNumber: '',
  occupation: '',
  countryCode: '60',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  addressLine3: '',
  companyName: '',
  businessAddressLine1: '',
  businessAddressLine2: '',
  businessAddressLine3: '',
  businessState: '',
  ...EMPTY_IPD,
  applicationDate: '', // diisi selepas mount (elak hydration mismatch)
});

// 011-1234 5678 -> 601112345678 (sama macam SPA lama)
const normalisePhone = (raw) => {
  let x = String(raw).replace(/\D/g, '');
  x = x.replace(/^0+/, '');
  return x.startsWith('60') ? x : `60${x}`;
};

const joinLines = (...lines) =>
  lines.map((l) => String(l || '').trim()).filter(Boolean).join(', ');

function Field({ label, required, hint, error, children }) {
  return (
    <label className="sl-field">
      <span className="sl-label">
        {label} {required && <span className="sl-req">*</span>}
      </span>
      {children}
      {hint && !error && <span className="sl-hint">{hint}</span>}
      {error && <span className="sl-error">{error}</span>}
    </label>
  );
}

export default function SuratLantikanForm({ variant = 'full' }) {
  const [f, setF] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | ok | err
  const [result, setResult] = useState(null);
  const [errMsg, setErrMsg] = useState('');

  // Isi tarikh selepas mount — elak hydration mismatch + tarikh build dalam HTML
  useEffect(() => {
    setF((prev) => (prev.applicationDate ? prev : { ...prev, applicationDate: todayMyt() }));
  }, []);

  const states = useMemo(
    () => Array.from(new Set(IPDS.map((i) => i.state))).sort(),
    []
  );

  const siteIpds = useMemo(() => {
    if (!f.businessState) return [];
    return IPDS.filter((i) => i.state === f.businessState).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [f.businessState]);

  const set = (k) => (e) => {
    const value = e.target.value;
    setF((prev) => ({ ...prev, [k]: value }));
    setErrors((prev) => {
      if (!prev[k]) return prev;
      const next = { ...prev };
      delete next[k];
      return next;
    });
  };

  const pickState = (e) => {
    const businessState = e.target.value;
    setF((prev) => ({ ...prev, businessState, ...EMPTY_IPD }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.businessState;
      delete next.selectedIpdId;
      return next;
    });
  };

  const pickIpd = (e) => {
    const id = e.target.value;
    const p = IPDS.find((x) => x.id === id);
    setErrors((prev) => {
      if (!prev.selectedIpdId) return prev;
      const next = { ...prev };
      delete next.selectedIpdId;
      return next;
    });
    if (!p) {
      setF((prev) => ({ ...prev, ...EMPTY_IPD }));
      return;
    }
    setF((prev) => ({
      ...prev,
      selectedIpdId: id,
      ipdLine1: p.name,
      ipdLine2: p.address,
      ipdLine3: `${p.postcode} ${p.city}`.trim(),
      ipdLine4: p.state,
      ipdLine5: '',
    }));
  };

  const validate = () => {
    const e = {};
    const addressLine23 = joinLines(f.addressLine2, f.addressLine3);
    const businessAddressLine23 = joinLines(f.businessAddressLine2, f.businessAddressLine3);

    if (!f.festivalType) e.festivalType = 'Sila pilih jenis perayaan (CNY, Hari Raya atau Deepavali)';
    if (f.fullName.trim().length < 3) e.fullName = 'Nama penuh diperlukan (sekurang-kurangnya 3 huruf)';
    if (!/^\d{12}$/.test(f.icNumber.replace(/\D/g, '')))
      e.icNumber = 'No. Kad Pengenalan tidak sah (12 digit, contoh 900101-01-1234)';
    if (f.occupation.trim().length < 2) e.occupation = 'Pekerjaan diperlukan';
    if (!/^60\d{8,10}$/.test(normalisePhone(f.phone))) e.phone = 'No. telefon tidak sah';
    if (f.addressLine1.trim().length < 5) e.addressLine1 = 'Alamat kediaman (Baris 1) diperlukan';
    if (addressLine23.length > 400) e.addressLine2 = 'Alamat terlalu panjang (baris 2 + 3 melebihi 400 aksara)';
    if (f.companyName.trim().length < 3) e.companyName = 'Nama syarikat diperlukan (sekurang-kurangnya 3 huruf)';
    if (f.businessAddressLine1.trim().length < 5)
      e.businessAddressLine1 = 'Alamat premis perniagaan (Baris 1) diperlukan';
    if (businessAddressLine23.length > 400)
      e.businessAddressLine2 = 'Alamat premis terlalu panjang (baris 2 + 3 melebihi 400 aksara)';
    if (!f.businessState) e.businessState = 'Sila pilih negeri premis perniagaan';
    else if (!f.ipdLine1) e.selectedIpdId = 'Sila pilih IPD';
    if (!f.applicationDate) e.applicationDate = 'Tarikh permohonan diperlukan';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  async function submit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    setErrMsg('');
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setStatus('sending');
    const payload = {
      fullName: f.fullName.trim(),
      icNumber: f.icNumber.replace(/\D/g, ''), // backend terima 12 digit tanpa dash
      occupation: f.occupation.trim(),
      phone: normalisePhone(f.phone),
      countryCode: f.countryCode,
      addressLine1: f.addressLine1.trim(),
      addressLine23: joinLines(f.addressLine2, f.addressLine3),
      companyName: f.companyName.trim(),
      businessAddressLine1: f.businessAddressLine1.trim(),
      businessAddressLine23: joinLines(f.businessAddressLine2, f.businessAddressLine3),
      businessState: f.businessState,
      ipd: f.ipdLine1,
      ipdLine1: f.ipdLine1,
      ipdLine2: f.ipdLine2,
      ipdLine3: f.ipdLine3,
      ipdLine4: f.ipdLine4,
      ipdLine5: f.ipdLine5,
      applicationDate: f.applicationDate,
      festivalType: f.festivalType,
      festivalName: (FESTIVALS.find((x) => x.key === f.festivalType) || {}).name || '',
      templates: variant === 'onlybm' ? TEMPLATES_ONLYBM : TEMPLATES_FULL,
    };
    try {
      const r = await fetch('/suratlantikan/hantar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await r.json().catch(() => null);
      if (!r.ok || !data || data.status !== 'success') {
        throw new Error((data && data.message) || `Ralat server (HTTP ${r.status})`);
      }
      const files = Array.isArray(data.files) ? data.files : [];
      const main = files.find((x) => (x.name || '').includes('merged')) || files[0] || null;
      setResult({ file: main, phone: payload.phone, fullName: payload.fullName });
      setStatus('ok');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setStatus('err');
      setErrMsg(err.message || 'Ralat tidak diketahui. Sila cuba lagi.');
    }
  }

  function resetAll() {
    setF({ ...initialForm(), applicationDate: todayMyt() });
    setErrors({});
    setResult(null);
    setStatus('idle');
    setErrMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (status === 'ok' && result) {
    const waMsg = result.file
      ? `Hi BMFireworks! Saya ${result.fullName}. Saya dah download Surat Lantikan Agent dan Borang IPD. Nak proceed dengan permohonan. No telefon: ${result.phone}`
      : `Hi BMFireworks! Saya ${result.fullName}. Permohonan Surat Lantikan saya telah dihantar. No telefon: ${result.phone}`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`;
    return (
      <div className="sl-success">
        <div className="sl-success-icon">✅</div>
        <h2>Permohonan Diterima!</h2>
        <p>
          Dokumen rasmi anda telah dijana. Muat turun PDF di bawah, kemudian hubungi kami
          melalui WhatsApp untuk proses seterusnya.
        </p>
        {result.file ? (
          <>
            <p className="sl-success-warn">
              ⚠️ Pautan muat turun sah untuk masa terhad (~10 minit). Sila muat turun sekarang.
            </p>
            <a
              className="sl-btn sl-btn-download"
              href={result.file.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 Muat Turun PDF
            </a>
          </>
        ) : (
          <p className="sl-success-warn">
            ⚠️ Pautan muat turun belum tersedia. Sila hubungi kami melalui WhatsApp untuk
            mendapatkan dokumen anda.
          </p>
        )}
        <a className="sl-btn sl-btn-wa" href={waUrl} target="_blank" rel="noopener noreferrer">
          💬 WhatsApp Kami
        </a>
        <button type="button" className="sl-btn sl-btn-reset" onClick={resetAll}>
          Hantar Permohonan Baru
        </button>
      </div>
    );
  }

  const errorList = Object.values(errors);

  return (
    <form onSubmit={submit} className="sl-form" noValidate>
      {status === 'err' && <div className="sl-banner-error" role="alert">❌ Gagal hantar: {errMsg}</div>}

      {errorList.length > 0 && (
        <div className="sl-banner-error" role="alert">
          <strong>Sila semak {errorList.length} perkara:</strong>
          <ul className="sl-banner-list">
            {errorList.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Jenis Permohonan */}
      <fieldset className="sl-section">
        <h2>Jenis Permohonan</h2>
        <p className="sl-section-note">
          Pilih perayaan yang anda mohon — sistem akan auto pilih Surat Lantikan dan dokumen
          yang bersesuaian.
        </p>
        <Field label="Permohonan Untuk" required error={errors.festivalType}>
          <select
            value={f.festivalType}
            onChange={set('festivalType')}
            aria-invalid={!!errors.festivalType}
            className="sl-input"
          >
            <option value="">— Pilih Perayaan —</option>
            {FESTIVALS.map((x) => (
              <option key={x.key} value={x.key}>
                {x.label}
              </option>
            ))}
          </select>
        </Field>
      </fieldset>

      {/* Maklumat Pemohon */}
      <fieldset className="sl-section">
        <h2>Maklumat Pemohon</h2>
        <p className="sl-section-note">
          Pastikan maklumat sama seperti dalam IC untuk elak permohonan ditolak.
        </p>
        <Field label="Nama Penuh" required error={errors.fullName}>
          <input
            value={f.fullName}
            onChange={set('fullName')}
            maxLength={160}
            placeholder="Contoh: Ahmad Bin Ali"
            aria-invalid={!!errors.fullName}
            className="sl-input"
          />
        </Field>
        <div className="sl-row sl-row-2">
          <Field label="No. Kad Pengenalan" required error={errors.icNumber}>
            <input
              value={f.icNumber}
              onChange={set('icNumber')}
              maxLength={14}
              inputMode="numeric"
              placeholder="900101-01-1234"
              aria-invalid={!!errors.icNumber}
              className="sl-input"
            />
          </Field>
          <Field label="Pekerjaan" required error={errors.occupation}>
            <input
              value={f.occupation}
              onChange={set('occupation')}
              maxLength={120}
              placeholder="Contoh: Peniaga"
              aria-invalid={!!errors.occupation}
              className="sl-input"
            />
          </Field>
        </div>
        <div className="sl-row sl-row-phone">
          <Field label="Kod Negara">
            <select value={f.countryCode} onChange={set('countryCode')} className="sl-input">
              <option value="60">+60 (MY)</option>
            </select>
          </Field>
          <Field
            label="No. Telefon"
            required
            hint="Taip tanpa kod negara. Contoh: 01112460415"
            error={errors.phone}
          >
            <input
              value={f.phone}
              onChange={set('phone')}
              maxLength={15}
              inputMode="tel"
              placeholder="01112460415"
              aria-invalid={!!errors.phone}
              className="sl-input"
            />
          </Field>
        </div>
      </fieldset>

      {/* Alamat Kediaman */}
      <fieldset className="sl-section">
        <h2>Alamat Kediaman</h2>
        <Field label="Alamat Rumah (Baris 1)" required error={errors.addressLine1}>
          <input
            value={f.addressLine1}
            onChange={set('addressLine1')}
            maxLength={200}
            placeholder="No 123, Jalan..."
            aria-invalid={!!errors.addressLine1}
            className="sl-input"
          />
        </Field>
        <Field label="Alamat Rumah (Baris 2)" error={errors.addressLine2}>
          <input
            value={f.addressLine2}
            onChange={set('addressLine2')}
            maxLength={200}
            aria-invalid={!!errors.addressLine2}
            className="sl-input"
          />
        </Field>
        <Field label="Alamat Rumah (Baris 3)">
          <input
            value={f.addressLine3}
            onChange={set('addressLine3')}
            maxLength={200}
            className="sl-input"
          />
        </Field>
      </fieldset>

      {/* Maklumat Syarikat */}
      <fieldset className="sl-section">
        <h2>Maklumat Syarikat</h2>
        <p className="sl-section-note">
          Maklumat ini digunakan untuk surat lantikan dan dokumen sokongan.
        </p>
        <Field label="Nama Syarikat" required error={errors.companyName}>
          <input
            value={f.companyName}
            onChange={set('companyName')}
            maxLength={160}
            placeholder="Contoh: Ahmad Trading Sdn Bhd"
            aria-invalid={!!errors.companyName}
            className="sl-input"
          />
        </Field>
        <Field label="Tarikh Permohonan" required error={errors.applicationDate}>
          <input
            type="date"
            value={f.applicationDate}
            onChange={set('applicationDate')}
            aria-invalid={!!errors.applicationDate}
            className="sl-input"
          />
        </Field>
      </fieldset>

      {/* Premis Perniagaan */}
      <fieldset className="sl-section">
        <h2>Maklumat Premis Perniagaan</h2>
        <p className="sl-section-note">
          Pilih negeri premis berniaga dan IPD yang menjaga kawasan tersebut.
        </p>
        <Field label="Alamat Premis (Baris 1)" required error={errors.businessAddressLine1}>
          <input
            value={f.businessAddressLine1}
            onChange={set('businessAddressLine1')}
            maxLength={200}
            placeholder="No 456, Jalan..."
            aria-invalid={!!errors.businessAddressLine1}
            className="sl-input"
          />
        </Field>
        <Field label="Alamat Premis (Baris 2)" error={errors.businessAddressLine2}>
          <input
            value={f.businessAddressLine2}
            onChange={set('businessAddressLine2')}
            maxLength={200}
            aria-invalid={!!errors.businessAddressLine2}
            className="sl-input"
          />
        </Field>
        <Field label="Alamat Premis (Baris 3)">
          <input
            value={f.businessAddressLine3}
            onChange={set('businessAddressLine3')}
            maxLength={200}
            className="sl-input"
          />
        </Field>
        <div className="sl-row sl-row-2">
          <Field label="Negeri Premis" required error={errors.businessState}>
            <select
              value={f.businessState}
              onChange={pickState}
              aria-invalid={!!errors.businessState}
              className="sl-input"
            >
              <option value="">— Pilih Negeri —</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label="IPD Bertanggungjawab" required={!!f.businessState} error={errors.selectedIpdId}>
            <select
              value={f.selectedIpdId}
              onChange={pickIpd}
              disabled={!f.businessState}
              aria-invalid={!!errors.selectedIpdId}
              className="sl-input"
            >
              <option value="">
                {f.businessState ? '— Pilih IPD —' : 'Pilih negeri dahulu'}
              </option>
              {siteIpds.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </fieldset>

      {/* Info */}
      <div className="sl-info">
        <p className="sl-info-title">Apa jadi selepas submit?</p>
        <p>1. Dokumen rasmi (Surat Lantikan Ejen + Borang IPD + sokongan) dijana automatik.</p>
        <p>2. Muat turun PDF melalui pautan yang dipaparkan (~10 minit sahaja).</p>
        <p>3. Hubungi kami melalui WhatsApp untuk proses permohonan seterusnya.</p>
      </div>

      <div className="sl-actions">
        <button type="submit" className="sl-submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Menghantar...' : 'Hantar Permohonan'}
        </button>
        <p className="sl-actions-note">
          Dengan menekan submit, anda bersetuju maklumat adalah tepat dan akan digunakan untuk
          proses permit.
        </p>
      </div>
    </form>
  );
}

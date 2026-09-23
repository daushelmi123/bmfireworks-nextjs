import { NextResponse } from 'next/server';

/**
 * Proxy selamat ke PDF service (pdf-service :4001).
 *
 * - API key disimpan server-side (env PDF_SERVICE_KEY) — TIDAK didedahkan ke browser.
 * - Ada validation asas + had saiz + rate limit ringkas + timeout (elak penyalahgunaan).
 * Nota: path ini sengaja BUKAN di bawah /api kerana Apache memproksi /api/* terus
 * ke servis PDF (lihat vhost bmfirework.com).
 */

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 16 * 1024; // 16 KB — cukup untuk payload borang
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 6; // 6 permohonan / 10 minit / IP

// Template yang dibenarkan (pakej penuh BMF+Amflex, dan pakej OnlyBM BM+GRK)
const ALLOWED_TEMPLATES = new Set([
  // Pakej penuh
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
  // Pakej OnlyBM (BM + GRK)
  'onlybm-borang-ipd',
  'grk-lampiran-a',
  'bmfireworks-lampiran-a-new',
  'grk-surat-kebenaran',
  'grk-surat-agen',
  'grk-borang-e',
  'grk-surat-kelulusan',
  'grk-borang-a',
]);

// Perayaan yang dibenarkan
const ALLOWED_FESTIVALS = new Set(['cny-2027', 'raya-2027', 'deepavali-2026']);

// Rate limit ringkas dalam memori (satu proses next start, cukup untuk guna ini)
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (list.length >= RATE_LIMIT_MAX) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  // buang entry lama sekali-sekala
  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if (!v.some((t) => now - t < RATE_LIMIT_WINDOW_MS)) hits.delete(k);
    }
  }
  return false;
}

const str = (v) => (typeof v === 'string' ? v.trim() : '');

function validatePayload(b) {
  if (!b || typeof b !== 'object') return 'Permintaan tidak sah';
  if (!ALLOWED_FESTIVALS.has(b.festivalType)) return 'Jenis perayaan tidak sah';
  if (str(b.festivalName).length < 3 || str(b.festivalName).length > 80) return 'Nama perayaan tidak sah';
  if (str(b.fullName).length < 3 || str(b.fullName).length > 160) return 'Nama penuh tidak sah';
  if (!/^\d{12}$/.test(str(b.icNumber))) return 'No. Kad Pengenalan tidak sah';
  if (str(b.occupation).length < 2 || str(b.occupation).length > 120) return 'Pekerjaan tidak sah';
  if (!/^\d{8,15}$/.test(str(b.phone))) return 'No. telefon tidak sah';
  if (b.countryCode !== '60') return 'Kod negara tidak sah';
  if (str(b.addressLine1).length < 5 || str(b.addressLine1).length > 200) return 'Alamat kediaman tidak sah';
  if (str(b.companyName).length < 3 || str(b.companyName).length > 160) return 'Nama syarikat tidak sah';
  if (str(b.businessAddressLine1).length < 5 || str(b.businessAddressLine1).length > 200)
    return 'Alamat premis tidak sah';
  if (str(b.businessState).length < 2 || str(b.businessState).length > 120) return 'Negeri premis tidak sah';
  if (str(b.ipdLine1).length < 2 || str(b.ipdLine1).length > 200) return 'IPD tidak sah';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(str(b.applicationDate))) return 'Tarikh permohonan tidak sah';
  if (!Array.isArray(b.templates) || b.templates.length < 1 || b.templates.length > 40)
    return 'Senarai dokumen tidak sah';
  if (!b.templates.every((t) => ALLOWED_TEMPLATES.has(t))) return 'Senarai dokumen tidak sah';
  return null;
}

export async function POST(req) {
  const serviceUrl = process.env.PDF_SERVICE_URL || 'http://127.0.0.1:4001';
  const apiKey = process.env.PDF_SERVICE_KEY;

  if (!apiKey) {
    console.error('PDF_SERVICE_KEY tidak diset');
    return NextResponse.json(
      { status: 'error', message: 'Servis tidak tersedia. Sila hubungi kami melalui WhatsApp.' },
      { status: 500 }
    );
  }

  const ip =
    req.headers.get('cf-connecting-ip') ||
    (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { status: 'error', message: 'Terlalu banyak permohonan. Sila cuba sebentar lagi.' },
      { status: 429 }
    );
  }

  const len = Number(req.headers.get('content-length') || 0);
  if (len > MAX_BODY_BYTES) {
    return NextResponse.json(
      { status: 'error', message: 'Permintaan terlalu besar' },
      { status: 413 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ status: 'error', message: 'Permintaan tidak sah' }, { status: 400 });
  }

  const invalid = validatePayload(body);
  if (invalid) {
    return NextResponse.json({ status: 'error', message: invalid }, { status: 400 });
  }

  try {
    const r = await fetch(`${serviceUrl}/api/pdf-orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
      signal: AbortSignal.timeout(120000),
    });

    const data = await r.json().catch(() => null);

    if (!r.ok || !data || data.status !== 'success') {
      console.error('PDF service error:', r.status, data);
      return NextResponse.json(
        {
          status: 'error',
          message: 'Permohonan tidak dapat diproses. Sila semak maklumat atau hubungi kami melalui WhatsApp.',
        },
        { status: r.status >= 500 ? 502 : 400 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('PDF service proxy error:', err);
    return NextResponse.json(
      { status: 'error', message: 'Servis dokumen tidak dapat dihubungi. Sila cuba sebentar lagi.' },
      { status: 504 }
    );
  }
}

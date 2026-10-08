import { createClient } from '@supabase/supabase-js'

const URL = import.meta.env.VITE_SUPABASE_URL
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(URL && KEY)

export const supabase = isSupabaseConfigured ? createClient(URL, KEY) : null

// ---------- util ----------
const PALETTE = ['#030164', '#5451b8', '#64748B', '#2D7495', '#94A3B8']
const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

const inisialDari = (nama = '') =>
  nama.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('')

const warnaDari = (id) => PALETTE[(Number(id) || 0) % PALETTE.length]

const tanggalIndo = (iso) => {
  if (!iso) return '-'
  const d = new Date(iso)
  const tgl = `${String(d.getDate()).padStart(2, '0')} ${BULAN[d.getMonth()]} ${d.getFullYear()}`
  const jam = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  return `${tgl} ${jam} WIB`
}

const umurDari = (tanggalLahir) => {
  if (!tanggalLahir) return '- th'
  const lahir = new Date(tanggalLahir)
  const kini = new Date()
  let umur = kini.getFullYear() - lahir.getFullYear()
  const m = kini.getMonth() - lahir.getMonth()
  if (m < 0 || (m === 0 && kini.getDate() < lahir.getDate())) umur--
  return `${umur} th`
}

// ---------- mapping row -> objek frontend ----------
const mapKK = (row) => ({
  id: row.id,
  noKK: row.noKK,
  kepala: row.kepala,
  inisial: inisialDari(row.kepala),
  nikKepala: row.nikKepala,
  alamat: row.alamat,
  blok: row.blok,
  status: row.status,
  anggotaCount: row.anggotaCount ?? 0,
  genderKepala: row.genderKepala ?? 'L',
  warna: warnaDari(row.id),
  noHp: row.noHp ?? '',
  isArsip: row.isArsip,
  alasanArsip: row.alasanArsip ?? '',
  catatanArsip: row.catatanArsip ?? '',
  anggota: [],
  updatedBy: row.updatedBy || 'Sistem',
  updatedAt: tanggalIndo(row.updatedAt),
  updatedAtIso: row.updatedAt,
})

const mapAnggota = (row) => ({
  id: row.id,
  nama: row.nama,
  hub: row.hubungan_keluarga,
  umur: umurDari(row.tanggal_lahir),
  jk: row.jenis_kelamin === 'P' ? 'Perempuan' : 'Laki-laki',
  nik: row.nik,
  kerja: row.pekerjaan || '-',
  status: row.status_kependudukan,
  tanggalLahir: row.tanggal_lahir,
})

// ---------- API ----------
/** Ambil semua KK + anggotanya (untuk halaman KelolaKK, DetailKK, Dashboard) */
export async function fetchKKList({ includeArsip = true } = {}) {
  const { data: kkRows, error: errKK } = await supabase
    .from('v_kelola_kk')
    .select('*')
    .order('updatedAt', { ascending: false })
  if (errKK) throw errKK

  const { data: anggotaRows, error: errAgt } = await supabase
    .from('anggota_keluarga')
    .select('*')
    .order('id', { ascending: true })
  if (errAgt) throw errAgt

  const list = (kkRows || []).map(r => mapKK(r))
  const byId = new Map(list.map(k => [k.id, k]))
  for (const a of anggotaRows || []) {
    const kk = byId.get(a.kartu_keluarga_id)
    if (kk && !a.is_arsip) kk.anggota.push(mapAnggota(a))
  }
  return includeArsip ? list : list.filter(k => k.status !== 'Pindah')
}

/** Tambah KK baru (FR-03) — payload dari form TambahKKModal */
export async function insertKK(payload) {
  const { data, error } = await supabase
    .from('kartu_keluarga')
    .insert({
      no_kk: payload.noKK,
      nama_kepala_keluarga: payload.kepala,
      nik_kepala_keluarga: payload.nikKepala || null,
      alamat: payload.alamat,
      blok: payload.blok || 'A',
      status_hunian: payload.status || 'Tetap',
      no_hp: payload.noHp || null,
      dibuat_oleh: payload.oleh || 'Admin RT',
    })
    .select()
    .single()
  if (error) throw error

  // kepala keluarga ikut terdaftar sebagai anggota
  if (payload.nikKepala) {
    await supabase.from('anggota_keluarga').insert({
      kartu_keluarga_id: data.id,
      nik: payload.nikKepala,
      nama: payload.kepala,
      hubungan_keluarga: 'Kepala Keluarga',
      jenis_kelamin: 'L',
      pekerjaan: payload.pekerjaan || null,
      status_kependudukan: payload.status || 'Tetap',
    })
  }
  return data.id
}

/** Ubah data KK (FR-04) — payload dari form EditKKModal */
export async function updateKK(id, payload) {
  const { error } = await supabase
    .from('kartu_keluarga')
    .update({
      no_kk: payload.noKK,
      nama_kepala_keluarga: payload.kepala,
      nik_kepala_keluarga: payload.nikKepala || null,
      alamat: payload.alamat,
      blok: payload.blok,
      status_hunian: payload.status,
      no_hp: payload.noHp || null,
      diperbarui_oleh: payload.oleh || 'Admin RT',
    })
    .eq('id', id)
  if (error) throw error
}

/** Soft delete / arsip KK (FR-05) */
export async function arsipkanKK(id, alasan, catatan) {
  const { error } = await supabase
    .from('kartu_keluarga')
    .update({
      is_arsip: true,
      status_hunian: 'Pindah',
      alasan_arsip: alasan || 'Pindah domisili keluar RT',
      catatan_arsip: catatan || '',
      arsip_pada: new Date().toISOString(),
      diperbarui_oleh: 'Ketua RT (Bpk. Haryono)',
    })
    .eq('id', id)
  if (error) throw error
}

/** Tambah anggota keluarga (FR-06) — payload dari form AddAnggotaModal */
export async function insertAnggota(kkId, payload) {
  const { error } = await supabase.from('anggota_keluarga').insert({
    kartu_keluarga_id: kkId,
    nik: payload.nik,
    nama: payload.nama,
    hubungan_keluarga: payload.hub || 'Anak',
    jenis_kelamin: payload.jk === 'Perempuan' ? 'P' : 'L',
    tanggal_lahir: payload.tanggalLahir || null,
    pekerjaan: payload.pekerjaan || null,
    status_kependudukan: payload.status || 'Tetap',
  })
  if (error) {
    if (error.code === '23505') throw new Error('NIK tersebut sudah terdaftar.')
    throw error
  }
}
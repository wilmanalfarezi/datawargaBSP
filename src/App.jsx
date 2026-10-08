import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { EditKKModal, DeleteKKModal, AddAnggotaModal, TambahKKModal } from './components/Modals'
import Dashboard from './pages/Dashboard'
import DaftarWarga from './pages/DaftarWarga'
import KelolaKK from './pages/KelolaKK'
import DetailKK from './pages/DetailKK'
import { RiwayatMutasi, AuditTrail } from './pages/MutasiAudit'
import { KK_LIST } from './data/mock'
import {
  isSupabaseConfigured, fetchKKList,
  insertKK, updateKK, arsipkanKK, insertAnggota,
} from './lib/kkApi'

export default function App() {
  const [kkList, setKkList] = useState(KK_LIST)
  const [memuat, setMemuat] = useState(false)
  const [editKK, setEditKK] = useState(null)
  const [arsipKK, setArsipKK] = useState(null)
  const [anggotaKK, setAnggotaKK] = useState(null)
  const [tambahKK, setTambahKK] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3200) }

  // ---- muat data dari Supabase (fallback ke mock bila .env belum diisi) ----
  const muatData = async () => {
    if (!isSupabaseConfigured) return
    setMemuat(true)
    try {
      const list = await fetchKKList()
      setKkList(list)
    } catch (e) {
      showToast(`Gagal memuat data Supabase: ${e.message || e}`)
    } finally {
      setMemuat(false)
    }
  }

  useEffect(() => { muatData() }, [])

  // ---- aksi (CRUD) ----
  const handleSimpanEdit = async (payload) => {
    setEditKK(null)
    if (isSupabaseConfigured) {
      try {
        await updateKK(editKK.id, payload)
        await muatData()
        showToast('Perubahan KK disimpan & tercatat di Audit Trail (FR-18).')
      } catch (e) {
        showToast(`Gagal menyimpan: ${e.message || e}`)
      }
    } else {
      setKkList(list => list.map(k => k.id === editKK.id ? { ...k, ...payload } : k))
      showToast('Perubahan KK disimpan (mode mock, isi .env untuk Supabase).')
    }
  }

  const handleArsip = async ({ alasan, catatan } = {}) => {
    const target = arsipKK
    setArsipKK(null)
    if (isSupabaseConfigured) {
      try {
        await arsipkanKK(target.id, alasan, catatan)
        await muatData()
        showToast(`KK ${target.kepala} diarsipkan (soft-delete, dapat dipulihkan).`)
      } catch (e) {
        showToast(`Gagal mengarsipkan: ${e.message || e}`)
      }
    } else {
      setKkList(list => list.map(k => k.id === target.id ? { ...k, status: 'Pindah' } : k))
      showToast(`KK ${target.kepala} diarsipkan (mode mock).`)
    }
  }

  const handleTambahKK = async (payload) => {
    setTambahKK(false)
    if (isSupabaseConfigured) {
      try {
        await insertKK(payload)
        await muatData()
        showToast('KK baru berhasil diregistrasi (FR-03).')
      } catch (e) {
        showToast(`Gagal menambah KK: ${e.message || e}`)
      }
    } else {
      showToast('Isi .env (VITE_SUPABASE_URL & ANON_KEY) lalu restart dev server untuk menyimpan ke Supabase.')
    }
  }

  const handleTambahAnggota = async (payload) => {
    const target = anggotaKK
    setAnggotaKK(null)
    if (isSupabaseConfigured) {
      try {
        await insertAnggota(target.id, payload)
        await muatData()
        showToast('Anggota baru ditambahkan ke KK (FR-06).')
      } catch (e) {
        showToast(`Gagal menambah anggota: ${e.message || e}`)
      }
    } else {
      showToast('Isi .env (VITE_SUPABASE_URL & ANON_KEY) lalu restart dev server untuk menyimpan ke Supabase.')
    }
  }

  return (
    <BrowserRouter>
      <Layout onTambahKK={() => setTambahKK(true)}>
        {memuat && <div style={{ background: '#EEF2FF', color: '#030164', padding: '8px 24px', fontSize: 13, fontWeight: 600 }}>Memuat data dari Supabase…</div>}
        <Routes>
          <Route path="/" element={<Dashboard kkList={kkList} setKkList={setKkList} onEdit={setEditKK} onArsip={setArsipKK} onTambahAnggota={setAnggotaKK} onTambahKK={() => setTambahKK(true)} />} />
          <Route path="/warga" element={<DaftarWarga />} />
          <Route path="/kk" element={<KelolaKK kkList={kkList} onEdit={setEditKK} onArsip={setArsipKK} onTambahKK={() => setTambahKK(true)} />} />
          <Route path="/kk/:id" element={<DetailKK kkList={kkList} onEdit={setEditKK} onArsip={setArsipKK} onTambahAnggota={setAnggotaKK} />} />
          <Route path="/mutasi" element={<RiwayatMutasi />} />
          <Route path="/audit" element={<AuditTrail />} />
        </Routes>
      </Layout>
      {editKK && <EditKKModal kk={editKK} onClose={() => setEditKK(null)} onSave={handleSimpanEdit} />}
      {arsipKK && <DeleteKKModal kk={arsipKK} onClose={() => setArsipKK(null)} onConfirm={handleArsip} />}
      {anggotaKK && <AddAnggotaModal kk={anggotaKK} onClose={() => setAnggotaKK(null)} onSave={handleTambahAnggota} />}
      {tambahKK && <TambahKKModal onClose={() => setTambahKK(false)} onSave={handleTambahKK} />}
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#030164', color: '#fff', padding: '12px 18px', borderRadius: 12, boxShadow: '0 10px 30px rgba(3,1,100,.3)', zIndex: 200, fontSize: 13, fontWeight: 600, maxWidth: 380 }}>{toast}</div>}
    </BrowserRouter>
  )
}
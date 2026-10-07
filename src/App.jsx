import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { EditKKModal, DeleteKKModal, AddAnggotaModal, TambahKKModal } from './components/Modals'
import Dashboard from './pages/Dashboard'
import DaftarWarga from './pages/DaftarWarga'
import KelolaKK from './pages/KelolaKK'
import DetailKK from './pages/DetailKK'
import { RiwayatMutasi, AuditTrail } from './pages/MutasiAudit'
import { KK_LIST } from './data/mock'

export default function App() {
  const [kkList, setKkList] = useState(KK_LIST)
  const [editKK, setEditKK] = useState(null)
  const [arsipKK, setArsipKK] = useState(null)
  const [anggotaKK, setAnggotaKK] = useState(null)
  const [tambahKK, setTambahKK] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2600) }

  const handleArsip = () => {
    setKkList(list => list.map(k => k.id === arsipKK.id ? { ...k, status: 'Pindah' } : k))
    setArsipKK(null); showToast(`KK ${arsipKK.kepala} diarsipkan (soft-delete, dapat dipulihkan).`)
  }

  return (
    <BrowserRouter>
      <Layout onTambahKK={() => setTambahKK(true)}>
        <Routes>
          <Route path="/" element={<Dashboard kkList={kkList} setKkList={setKkList} onEdit={setEditKK} onArsip={setArsipKK} onTambahAnggota={setAnggotaKK} onTambahKK={() => setTambahKK(true)} />} />
          <Route path="/warga" element={<DaftarWarga />} />
          <Route path="/kk" element={<KelolaKK kkList={kkList} onEdit={setEditKK} onArsip={setArsipKK} onTambahKK={() => setTambahKK(true)} />} />
          <Route path="/kk/:id" element={<DetailKK kkList={kkList} onEdit={setEditKK} onArsip={setArsipKK} onTambahAnggota={setAnggotaKK} />} />
          <Route path="/mutasi" element={<RiwayatMutasi />} />
          <Route path="/audit" element={<AuditTrail />} />
        </Routes>
      </Layout>
      {editKK && <EditKKModal kk={editKK} onClose={() => setEditKK(null)} onSave={() => { setEditKK(null); showToast('Perubahan KK disimpan & tercatat di Audit Trail (FR-18).') }} />}
      {arsipKK && <DeleteKKModal kk={arsipKK} onClose={() => setArsipKK(null)} onConfirm={handleArsip} />}
      {anggotaKK && <AddAnggotaModal kk={anggotaKK} onClose={() => setAnggotaKK(null)} onSave={() => { setAnggotaKK(null); showToast('Anggota baru ditambahkan ke KK (FR-06).') }} />}
      {tambahKK && <TambahKKModal onClose={() => setTambahKK(false)} onSave={() => { setTambahKK(false); showToast('KK baru berhasil diregistrasi (FR-03).') }} />}
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#030164', color: '#fff', padding: '12px 18px', borderRadius: 12, boxShadow: '0 10px 30px rgba(3,1,100,.3)', zIndex: 200, fontSize: 13, fontWeight: 600 }}>{toast}</div>}
    </BrowserRouter>
  )
}
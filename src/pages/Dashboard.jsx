import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { KK_LIST, statusClass } from '../data/mock'

export default function Dashboard({ kkList, setKkList, onEdit, onArsip, onTambahAnggota, onTambahKK }) {
  const [q, setQ] = useState('Bambang')
  const [fStatus, setFStatus] = useState('Tetap')
  const [fGender, setFGender] = useState('')
  const [fBlok, setFBlok] = useState('')
  const [selectedId, setSelectedId] = useState(1)

  const filtered = useMemo(() => kkList.filter(k => {
    const s = (k.kepala + ' ' + k.noKK + ' ' + k.nikKepala + ' ' + k.alamat).toLowerCase()
    if (q && !s.includes(q.toLowerCase())) return false
    if (fStatus && k.status !== fStatus) return false
    if (fGender && k.genderKepala !== fGender) return false
    if (fBlok && k.blok !== fBlok) return false
    return true
  }), [kkList, q, fStatus, fGender, fBlok])

  const selected = kkList.find(k => k.id === selectedId) || kkList[0]

  return (
    <>
      <div className="page-head">
        <div>
          <div className="crumb"><span>Pusat Administrasi</span><span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span><span className="cur">Dashboard & Rekap Data Warga</span></div>
          <h2>Kependudukan & Registrasi Kartu Keluarga</h2>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="period"><span className="material-symbols-outlined" style={{ color: '#5451b8' }}>calendar_month</span>Periode Aktif: Oktober 2026</span>
          <button className="btn" title="Muat Ulang"><span className="material-symbols-outlined">refresh</span></button>
        </div>
      </div>

      <section className="stats">
        <div className="stat s-navy">
          <div className="stat-top"><span>Total Kartu Keluarga (FR-12)</span><span className="stat-ic" style={{ background: '#E1E0FF', color: '#030164' }}><span className="material-symbols-outlined">folder_shared</span></span></div>
          <div className="stat-val" style={{ color: '#030164' }}>142<small>KK</small></div>
          <div className="stat-foot"><span className="pill pill-indigo"><span className="material-symbols-outlined" style={{ fontSize: 14 }}>trending_up</span>+4 KK bln ini</span><span>100% Terverifikasi</span></div>
        </div>
        <div className="stat s-indigo">
          <div className="stat-top"><span>Total Warga Terdaftar</span><span className="stat-ic" style={{ background: '#E2DFFF', color: '#363199' }}><span className="material-symbols-outlined">person</span></span></div>
          <div className="stat-val">486<small>Jiwa</small></div>
          <div className="stat-foot"><span>🔵 248 Laki-laki</span><span>🩵 238 Perempuan</span></div>
        </div>
        <div className="stat s-teal">
          <div className="stat-top"><span>Distribusi Status Hunian</span><span className="stat-ic" style={{ background: '#C3E8FF', color: '#004C68' }}><span className="material-symbols-outlined">home_work</span></span></div>
          <div className="bar"><i style={{ flex: 83, background: '#2D7495' }} /><i style={{ flex: 13, background: '#5451b8' }} /><i style={{ flex: 4, background: '#C3C0FF' }} /></div>
          <div className="stat-foot"><b style={{ color: '#2D7495' }}>Tetap: 118 (83%)</b><span>Kontrak: 19</span><span>Kos: 5</span></div>
        </div>
        <div className="stat s-gold">
          <div className="stat-top"><span>Mutasi & Audit Terkini</span><span className="stat-ic" style={{ background: '#DAE2FD' }}><span className="material-symbols-outlined">published_with_changes</span></span></div>
          <div className="stat-val">+3<small style={{ color: '#2D7495' }}>Warga Masuk</small></div>
          <div className="stat-foot"><span>↗ 1 Mutasi Keluar</span><span className="mono">Okt 2026</span></div>
        </div>
      </section>

      <div className="grid2">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card card-pad toolbar">
            <div className="toolbar-row">
              <div className="search-box">
                <span className="material-symbols-outlined lead">search</span>
                <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari berdasarkan nama warga atau 16-digit No. KK..." />
                <span className="instant"><i />{'< 2s instan'}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button className="btn"><span className="material-symbols-outlined" style={{ color: '#BA1A1A' }}>picture_as_pdf</span>PDF</button>
                <button className="btn"><span className="material-symbols-outlined" style={{ color: '#2D7495' }}>table_view</span>Excel (.xlsx)</button>
                <button className="btn btn-dark" onClick={onTambahKK}><span className="material-symbols-outlined">person_add</span>+ Tambah KK Baru</button>
              </div>
            </div>
            <div className="filters">
              <div className="field"><label>Status Hunian</label>
                <select value={fStatus} onChange={e => setFStatus(e.target.value)}><option value="">Semua Status Hunian</option><option value="Tetap">Tetap (Keluarga Tetap)</option><option value="Kontrak">Kontrak (Sewa Rumah)</option><option value="Kos">Kos (Pondokan)</option><option value="Pindah">Pindah (Arsip)</option></select>
              </div>
              <div className="field"><label>Gender Kepala Keluarga</label>
                <select value={fGender} onChange={e => setFGender(e.target.value)}><option value="">Semua Gender</option><option value="L">Laki-laki</option><option value="P">Perempuan</option></select>
              </div>
              <div className="field"><label>Blok / Wilayah RT 05</label>
                <select value={fBlok} onChange={e => setFBlok(e.target.value)}><option value="">Semua Blok RT 05</option><option value="A">Blok A (Jl. Mawar Raya)</option><option value="B">Blok B (Jl. Melati Utama)</option><option value="C">Blok C (Jl. Anggrek Indah)</option></select>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="tbl-head">
              <div className="tbl-title"><span className="material-symbols-outlined">format_list_bulleted</span>Daftar Kartu Keluarga Terdaftar <span className="count">{filtered.length} Hasil Ditemukan</span></div>
              <div style={{ fontSize: 12, color: '#64748B' }}>Urutkan: <b style={{ color: '#030164' }}>Terbaru Diperbarui</b></div>
            </div>
            <div className="tbl-wrap">
              <table>
                <thead><tr><th>No & Kepala Keluarga</th><th>NIK Kepala Keluarga</th><th style={{ textAlign: 'center' }}>Anggota</th><th>Status Hunian</th><th style={{ textAlign: 'right' }}>Aksi Cepat</th></tr></thead>
                <tbody>
                  {filtered.map(k => (
                    <tr key={k.id} className={k.id === selectedId ? 'selected' : ''} onClick={() => setSelectedId(k.id)} style={{ cursor: 'pointer' }}>
                      <td><div className="kk-head"><div className="avatar-lg" style={{ background: k.warna }}>{k.inisial}</div>
                        <div><div style={{ fontWeight: 700 }}>{k.kepala}</div><div className="mono" style={{ color: '#64748B' }}>KK: {k.noKK}</div><div className="addr">{k.alamat}</div></div></div></td>
                      <td><div className="mono" style={{ fontWeight: 600 }}>{k.nikKepala}</div><span className="tag">Kepala Keluarga</span></td>
                      <td style={{ textAlign: 'center' }}><span className="pill" style={{ background: '#EAEDFF', color: '#030164' }}>{k.status === 'Pindah' ? 'Arsip' : `${k.anggotaCount} Jiwa`}</span></td>
                      <td><span className={`badge ${statusClass(k.status)}`}><i />{k.status}</span></td>
                      <td style={{ textAlign: 'right' }}><div className="row-actions">
                        <Link className="mini-btn" to={`/kk/${k.id}`} title="Detail & Kelola Anggota" onClick={e => e.stopPropagation()}><span className="material-symbols-outlined">person_search</span></Link>
                        <button className="mini-btn" title="Ubah Data KK" onClick={e => { e.stopPropagation(); onEdit(k) }}><span className="material-symbols-outlined">edit</span></button>
                        <button className="mini-btn danger" title="Arsipkan KK" onClick={e => { e.stopPropagation(); onArsip(k) }}><span className="material-symbols-outlined">archive</span></button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && <div className="empty">Tidak ada hasil. Ubah kata kunci atau filter.</div>}
            </div>
            <div className="pager"><div>Menampilkan <b>1 - {filtered.length}</b> dari <b>142 KK</b> terdaftar</div>
              <div className="pg"><button disabled>Sebelumnya</button><button className="on">1</button><button>2</button><button>3</button><span>...</span><button>29</button><button>Selanjutnya</button></div>
            </div>
          </div>
        </div>

        {selected && (
          <aside className="card drawer">
            <div className="drawer-banner">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge" style={{ background: '#C3E8FF', color: '#001E2C', borderColor: '#C3E8FF' }}><i style={{ background: '#004C68', width: 6, height: 6, borderRadius: 99 }} />Status: {selected.status}</span>
                <div><button className="mini-btn" style={{ color: '#fff' }}><span className="material-symbols-outlined">print</span></button>
                  <Link className="mini-btn" style={{ color: '#fff' }} to={`/kk/${selected.id}`}><span className="material-symbols-outlined">open_in_new</span></Link></div>
              </div>
              <div><div style={{ fontSize: 11, color: '#BFC1FF' }}>Kepala Keluarga Terpilih:</div><h3>Bpk. {selected.kepala}</h3><div className="mono" style={{ color: '#BFC1FF' }}>No KK: {selected.noKK}</div></div>
              <div className="drawer-meta"><span>📍 {selected.alamat} (RT 05/RW 08)</span><span style={{ background: 'rgba(255,255,255,.2)', padding: '2px 6px', borderRadius: 4 }}>{selected.anggotaCount} Jiwa</span></div>
            </div>
            <div className="drawer-actions">
              <button className="btn" onClick={() => onTambahAnggota(selected)}><span className="material-symbols-outlined" style={{ color: '#5451b8' }}>person_add</span>+ Anggota</button>
              <button className="btn"><span className="material-symbols-outlined">description</span>Surat Pengantar</button>
              <button className="btn" onClick={() => onEdit(selected)}><span className="material-symbols-outlined">edit</span></button>
            </div>
            <div className="member-list">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748B', fontWeight: 700 }}><span>Daftar Anggota Keluarga ({selected.anggotaCount} Jiwa)</span><span>Hub. Keluarga</span></div>
              {selected.anggota.map((a, i) => (
                <div className="member" key={i}>
                  <div className="member-top"><div className="member-id"><div className="num" style={{ background: i === 0 ? '#030164' : i === 1 ? '#5451b8' : '#CBD5E1', color: i > 1 ? '#0F172A' : '#fff' }}>{i + 1}</div>
                    <div><div style={{ fontWeight: 700 }}>{a.nama}</div><div style={{ fontSize: 11, color: '#2D7495', fontWeight: 600 }}>{a.hub} • {a.umur}</div></div></div>
                    <span className="tag">{a.jk}</span></div>
                  <div className="member-bot"><span className="mono">NIK: {a.nik}</span><span>{a.kerja}</span></div>
                </div>
              ))}
              {selected.anggota.length === 0 && <div className="empty">KK diarsip — tidak ada anggota aktif.</div>}
            </div>
            <div className="audit-mini"><span className="material-symbols-outlined">verified_user</span><div><b>Audit Trail Terverifikasi (FR-18)</b><br /><span style={{ color: '#64748B' }}>Terakhir diupdate oleh <b>{selected.updatedBy}</b> pada {selected.updatedAt}</span></div></div>
          </aside>
        )}
      </div>
    </>
  )
}
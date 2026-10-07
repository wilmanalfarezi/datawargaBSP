import { useMemo, useState } from 'react'
import { WARGA_LIST, statusClass } from '../data/mock'

export default function DaftarWarga() {
  const [q, setQ] = useState('')
  const [fStatus, setFStatus] = useState('')
  const [fHub, setFHub] = useState('')
  const data = useMemo(() => WARGA_LIST.filter(w => {
    const s = (w.nama + ' ' + w.nik + ' ' + w.kk).toLowerCase()
    if (q && !s.includes(q.toLowerCase())) return false
    if (fStatus && w.status !== fStatus) return false
    if (fHub && w.hub !== fHub) return false
    return true
  }), [q, fStatus, fHub])
  return (
    <>
      <div className="page-head"><div><div className="crumb"><span>Master Data</span><span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span><span className="cur">Daftar Semua Warga</span></div><h2>Daftar Semua Warga — Master Data Penduduk</h2></div>
        <span className="period"><span className="material-symbols-outlined" style={{ color: '#5451b8' }}>groups</span>{data.length} dari 486 Jiwa</span></div>
      <div className="card card-pad toolbar">
        <div className="toolbar-row">
          <div className="search-box"><span className="material-symbols-outlined lead">search</span><input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari nama / NIK / No KK..." /><span className="instant"><i />{'< 2s instan'}</span></div>
          <div style={{ display: 'flex', gap: 8 }}><button className="btn"><span className="material-symbols-outlined" style={{ color: '#BA1A1A' }}>picture_as_pdf</span>PDF</button><button className="btn"><span className="material-symbols-outlined" style={{ color: '#2D7495' }}>table_view</span>Excel</button></div>
        </div>
        <div className="filters">
          <div className="field"><label>Status Hunian</label><select value={fStatus} onChange={e => setFStatus(e.target.value)}><option value="">Semua</option><option>Tetap</option><option>Kontrak</option><option>Kos</option><option>Pindah</option></select></div>
          <div className="field"><label>Hubungan Keluarga</label><select value={fHub} onChange={e => setFHub(e.target.value)}><option value="">Semua</option><option>Kepala Keluarga</option><option>Istri</option><option>Anak</option></select></div>
          <div className="field"><label>Blok</label><select><option>Semua Blok</option><option>Blok A</option><option>Blok B</option><option>Blok C</option></select></div>
        </div>
      </div>
      <div className="card">
        <div className="tbl-head"><div className="tbl-title"><span className="material-symbols-outlined">groups</span>Master Data Penduduk<span className="count">{data.length} Warga</span></div></div>
        <div className="tbl-wrap"><table>
          <thead><tr><th>Nama / NIK</th><th>No KK / Hubungan</th><th>Umur / JK</th><th>Status</th><th>Alamat / Pekerjaan</th></tr></thead>
          <tbody>{data.map(w => (
            <tr key={w.nik}><td><div style={{ fontWeight: 700 }}>{w.nama}</div><div className="mono" style={{ color: '#64748B' }}>{w.nik}</div></td>
              <td><div className="mono">{w.kk}</div><span className="tag">{w.hub}</span></td>
              <td>{w.umur} th / {w.jk === 'L' ? 'Laki-laki' : 'Perempuan'}</td>
              <td><span className={`badge ${statusClass(w.status)}`}><i />{w.status}</span></td>
              <td><div>{w.alamat}</div><div style={{ color: '#64748B', fontSize: 12 }}>{w.kerja}</div></td></tr>
          ))}</tbody></table></div>
        <div className="pager"><div>Menampilkan <b>{data.length}</b> warga</div><div className="pg"><button disabled>Sebelumnya</button><button className="on">1</button><button>Selanjutnya</button></div></div>
      </div>
    </>
  )
}
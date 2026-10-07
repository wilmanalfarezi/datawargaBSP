import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { statusClass } from '../data/mock'

export default function KelolaKK({ kkList, onEdit, onArsip, onTambahKK }) {
  const [q, setQ] = useState('')
  const [showArsip, setShowArsip] = useState(false)
  const data = useMemo(() => kkList.filter(k => {
    if (!showArsip && k.status === 'Pindah') return false
    const s = (k.kepala + ' ' + k.noKK).toLowerCase()
    return !q || s.includes(q.toLowerCase())
  }), [kkList, q, showArsip])
  return (
    <>
      <div className="page-head"><div><div className="crumb"><span>Master Data</span><span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span><span className="cur">Kelola Kartu Keluarga</span></div><h2>Kelola Kartu Keluarga — Master Data KK</h2></div>
        <div style={{ display: 'flex', gap: 8 }}><button className="btn" onClick={() => setShowArsip(!showArsip)}><span className="material-symbols-outlined">archive</span>{showArsip ? 'Sembunyikan Arsip' : 'Tampilkan Arsip'}</button><button className="btn btn-dark" onClick={onTambahKK}><span className="material-symbols-outlined">add_circle</span>Tambah KK Baru</button></div></div>
      <div className="card card-pad"><div className="search-box"><span className="material-symbols-outlined lead">search</span><input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari kepala keluarga / No KK..." /><span className="instant"><i />{'< 2s instan'}</span></div></div>
      <div className="card">
        <div className="tbl-head"><div className="tbl-title"><span className="material-symbols-outlined">badge</span>Master Data KK<span className="count">{data.length} KK</span></div></div>
        <div className="tbl-wrap"><table>
          <thead><tr><th>No KK</th><th>Kepala Keluarga</th><th>Alamat</th><th>Anggota</th><th>Status</th><th style={{ textAlign: 'right' }}>Aksi</th></tr></thead>
          <tbody>{data.map(k => (
            <tr key={k.id}><td className="mono" style={{ fontWeight: 700 }}>{k.noKK}</td>
              <td><div style={{ fontWeight: 700 }}>{k.kepala}</div><div className="mono" style={{ color: '#64748B', fontSize: 12 }}>{k.nikKepala}</div></td>
              <td><div className="addr">{k.alamat}</div><span className="tag">Blok {k.blok}</span></td>
              <td style={{ textAlign: 'center' }}><b>{k.anggotaCount} Jiwa</b></td>
              <td><span className={`badge ${statusClass(k.status)}`}><i />{k.status}</span></td>
              <td style={{ textAlign: 'right' }}><div className="row-actions">
                <Link className="mini-btn" to={`/kk/${k.id}`}><span className="material-symbols-outlined">visibility</span></Link>
                <button className="mini-btn" onClick={() => onEdit(k)}><span className="material-symbols-outlined">edit</span></button>
                <button className="mini-btn danger" onClick={() => onArsip(k)}><span className="material-symbols-outlined">archive</span></button>
              </div></td></tr>
          ))}</tbody></table></div>
      </div>
    </>
  )
}
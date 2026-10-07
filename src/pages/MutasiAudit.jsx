import { useState } from 'react'
import { MUTASI_LIST, AUDIT_LIST } from '../data/mock'

export function RiwayatMutasi() {
  const [q, setQ] = useState('')
  const data = MUTASI_LIST.filter(m => !q || (m.nama + m.nik + m.jenis).toLowerCase().includes(q.toLowerCase()))
  const color = (j) => j.includes('Masuk') ? '#ECFDF5' : j.includes('Keluar') ? '#FFDAD6' : j.includes('Lahir') ? '#EFF6FF' : '#FEFCE8'
  return (
    <>
      <div className="page-head"><div><div className="crumb"><span>Administrasi</span><span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span><span className="cur">Riwayat Mutasi (FR-07)</span></div><h2>Riwayat Mutasi & Perubahan Status Warga</h2></div><span className="period"><span className="material-symbols-outlined">swap_horiz</span>{data.length} Peristiwa</span></div>
      <div className="card card-pad"><div className="search-box"><span className="material-symbols-outlined lead">search</span><input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari nama / NIK / jenis mutasi..." /><span className="instant"><i />{'< 2s instan'}</span></div></div>
      <div className="card"><div className="timeline">{data.map(m => (
        <div className="tl-item" key={m.id}><div className="tl-dot" style={{ background: color(m.jenis) }}><span className="material-symbols-outlined">{m.jenis.includes('Masuk') ? 'login' : m.jenis.includes('Keluar') ? 'logout' : m.jenis.includes('Lahir') ? 'child_care' : 'sync'}</span></div>
          <div style={{ flex: 1 }}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}><b>{m.nama}</b><span className="tag">{m.tgl}</span></div><div className="mono" style={{ color: '#64748B' }}>{m.nik} • {m.jenis}</div><div style={{ fontSize: 13 }}>{m.dari} → <b>{m.ke}</b></div><div style={{ fontSize: 12, color: '#64748B' }}>Oleh {m.oleh} • <b>{m.status}</b></div></div></div>
      ))}</div></div>
    </>
  )
}

export function AuditTrail() {
  const [q, setQ] = useState('')
  const data = AUDIT_LIST.filter(a => !q || (a.aktor + a.aksi + a.target).toLowerCase().includes(q.toLowerCase()))
  return (
    <>
      <div className="page-head"><div><div className="crumb"><span>Sistem</span><span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span><span className="cur">Audit Trail (FR-18)</span></div><h2>Audit Trail & Rekam Jejak Sistem</h2></div><span className="period"><span className="material-symbols-outlined">verified_user</span>Terverifikasi • Immutabel</span></div>
      <div className="card card-pad"><div className="search-box"><span className="material-symbols-outlined lead">search</span><input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari aktor / aksi / target..." /><span className="instant"><i />{'< 2s instan'}</span></div></div>
      <div className="card"><div className="tbl-head"><div className="tbl-title"><span className="material-symbols-outlined">history</span>Log Aktivitas<span className="count">{data.length} Event</span></div></div>
        <div className="tbl-wrap"><table><thead><tr><th>Waktu</th><th>Aktor</th><th>Aksi</th><th>Target / Detail</th><th>IP</th><th>Status</th></tr></thead>
          <tbody>{data.map(a => (<tr key={a.id}><td className="mono">{a.waktu}</td><td>{a.aktor}</td><td><span className="tag" style={{ fontWeight: 700 }}>{a.aksi}</span></td><td>{a.target}</td><td className="mono">{a.ip}</td><td>{a.status === 'Berhasil' ? <span className="badge b-tetap"><i />Berhasil</span> : <span className="badge b-pindah"><i />Ditolak</span>}</td></tr>))}</tbody></table></div></div>
    </>
  )
}
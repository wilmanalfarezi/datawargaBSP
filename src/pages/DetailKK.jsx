import { Link, useParams } from 'react-router-dom'
import { statusClass } from '../data/mock'

export default function DetailKK({ kkList, onEdit, onArsip, onTambahAnggota }) {
  const { id } = useParams()
  const kk = kkList.find(k => String(k.id) === String(id))
  if (!kk) return <div className="card card-pad">Data KK tidak ditemukan. <Link to="/">Kembali ke Dashboard</Link></div>
  return (
    <>
      <div className="page-head"><div><div className="crumb"><Link to="/">Dashboard</Link><span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span><Link to="/kk">Kelola KK</Link><span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span><span className="cur">Detail {kk.noKK}</span></div><h2>Detail Kartu Keluarga — {kk.kepala}</h2></div>
        <div style={{ display: 'flex', gap: 8 }}><button className="btn" onClick={() => onEdit(kk)}><span className="material-symbols-outlined">edit</span>Ubah Data (FR-04)</button><button className="btn" onClick={() => onTambahAnggota(kk)}><span className="material-symbols-outlined">person_add</span>+ Anggota (FR-06)</button></div></div>
      <div className="grid2">
        <div className="card"><div className="drawer-banner"><span className={`badge ${statusClass(kk.status)}`} style={{ width: 'fit-content' }}><i />{kk.status}</span><h3>{kk.kepala}</h3><div className="mono">No KK: {kk.noKK} • NIK Kepala: {kk.nikKepala}</div><div className="drawer-meta"><span>{kk.alamat}</span><span>{kk.anggotaCount} Jiwa</span></div></div>
          <div className="tbl-head"><div className="tbl-title"><span className="material-symbols-outlined">diversity_3</span>Anggota Keluarga ({kk.anggota.length})</div></div>
          <div className="member-list" style={{ maxHeight: 'none' }}>{kk.anggota.map((a, i) => (
            <div className="member" key={i}><div className="member-top"><div className="member-id"><div className="num" style={{ background: '#030164' }}>{i + 1}</div><div><div style={{ fontWeight: 700 }}>{a.nama}</div><div style={{ fontSize: 12, color: '#2D7495' }}>{a.hub} • {a.umur} • {a.jk}</div></div></div><span className="tag">{a.kerja}</span></div><div className="member-bot"><span className="mono">NIK: {a.nik}</span><button className="mini-btn danger"><span className="material-symbols-outlined">delete</span></button></div></div>
          ))}{kk.anggota.length === 0 && <div className="empty">Belum ada anggota aktif.</div>}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card card-pad"><h4 style={{ margin: '0 0 8px' }}>Aksi Cepat</h4><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><button className="btn"><span className="material-symbols-outlined">description</span>Cetak Surat Pengantar RT</button><button className="btn"><span className="material-symbols-outlined">print</span>Cetak Salinan KK</button><button className="btn btn-danger-soft" onClick={() => onArsip(kk)}><span className="material-symbols-outlined">archive</span>Arsipkan KK (FR-05)</button></div></div>
          <div className="card"><div className="tbl-head"><div className="tbl-title"><span className="material-symbols-outlined">verified_user</span>Audit KK ini</div></div><div className="audit-mini"><span className="material-symbols-outlined">history</span><div>Terakhir oleh <b>{kk.updatedBy}</b><br />{kk.updatedAt}</div></div></div>
        </div>
      </div>
    </>
  )
}
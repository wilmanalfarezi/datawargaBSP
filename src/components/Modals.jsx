export function ModalShell({ children, wide, onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className={`modal ${wide ? 'wide' : ''}`} onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  )
}

export function EditKKModal({ kk, onClose, onSave }) {
  if (!kk) return null
  return (
    <ModalShell wide onClose={onClose}>
      <div className="modal-head">
        <span className="badge b-kontrak"><i />FR-04 • Ubah Data KK</span>
        <h3>Perbarui Data Kartu Keluarga</h3>
        <p>No KK: <b className="mono">{kk.noKK}</b> — Kepala: <b>{kk.kepala}</b></p>
      </div>
      <form className="modal-body" onSubmit={e => { e.preventDefault(); onSave(Object.fromEntries(new FormData(e.target))) }}>
        <div className="grid-form">
          <div className="field"><label>No. Kartu Keluarga (16 digit) *</label><input name="noKK" defaultValue={kk.noKK} maxLength={16} required /></div>
          <div className="field"><label>Nama Kepala Keluarga *</label><input name="kepala" defaultValue={kk.kepala} required /></div>
          <div className="field full"><label>Alamat Lengkap *</label><input name="alamat" defaultValue={kk.alamat} required /></div>
          <div className="field"><label>Status Hunian (FR-09) *</label>
            <select name="status" defaultValue={kk.status}><option>Tetap</option><option>Kontrak</option><option>Kos</option><option>Pindah</option></select>
          </div>
          <div className="field"><label>Blok / Wilayah RT 05 *</label>
            <select name="blok" defaultValue={kk.blok}><option value="A">Blok A (Jl. Mawar Raya)</option><option value="B">Blok B (Jl. Melati Utama)</option><option value="C">Blok C (Jl. Anggrek Indah)</option></select>
          </div>
          <div className="field"><label>NIK Kepala Keluarga *</label><input name="nikKepala" defaultValue={kk.nikKepala} /></div>
          <div className="field"><label>No. HP / WA</label><input name="noHp" defaultValue={kk.noHp || ''} placeholder="08xx-xxxx-xxxx" /></div>
        </div>
        <div className="warn-box">Perubahan tercatat di <b>Audit Trail (FR-18)</b> beserta aktor, waktu, dan IP. Pastikan NIK 16 digit valid sebelum menyimpan.</div>
        <div className="modal-foot" style={{ margin: '0 -20px -18px', borderRadius: '0 0 12px 12px' }}>
          <button type="button" className="btn" onClick={onClose}>Batal</button>
          <button type="submit" className="btn btn-dark"><span className="material-symbols-outlined">save</span>Simpan Perubahan</button>
        </div>
      </form>
    </ModalShell>
  )
}

export function DeleteKKModal({ kk, onClose, onConfirm }) {
  if (!kk) return null
  return (
    <ModalShell onClose={onClose}>
      <div className="modal-head">
        <span className="badge b-pindah"><i />FR-05 • Soft Delete</span>
        <h3>Arsipkan Kartu Keluarga?</h3>
        <p>Data tidak dihapus permanen — dipindah ke status <b>Pindah / Arsip</b> dan dapat dipulihkan.</p>
      </div>
      <form id="form-arsip-kk" className="modal-body" onSubmit={e => { e.preventDefault(); onConfirm(Object.fromEntries(new FormData(e.target))) }}>
        <div className="danger-box"><b>{kk.kepala}</b> — KK <span className="mono">{kk.noKK}</span><br />{kk.alamat} • {kk.anggotaCount} jiwa</div>
        <div className="field"><label>Alasan pengarsipan *</label>
          <select name="alasan"><option>Pindah domisili keluar RT</option><option>Data ganda / duplikat</option><option>Permintaan keluarga</option><option>Lainnya</option></select>
        </div>
        <div className="field"><label>Catatan tambahan</label><textarea name="catatan" rows={3} placeholder="Contoh: Pindah ke Bandung, Kel. Dago per 01 Okt 2026..." /></div>
      </form>
      <div className="modal-foot">
        <button className="btn" onClick={onClose}>Batal</button>
        <button type="submit" form="form-arsip-kk" className="btn" style={{ background: '#BA1A1A', color: '#fff', borderColor: '#BA1A1A' }}><span className="material-symbols-outlined">archive</span>Ya, Arsipkan</button>
      </div>
    </ModalShell>
  )
}

export function AddAnggotaModal({ kk, onClose, onSave }) {
  if (!kk) return null
  return (
    <ModalShell wide onClose={onClose}>
      <div className="modal-head">
        <span className="badge b-tetap"><i />FR-06 • Tambah Anggota</span>
        <h3>Tambah Anggota Keluarga Baru</h3>
        <p>Ke KK <b className="mono">{kk.noKK}</b> — {kk.kepala}</p>
      </div>
      <form className="modal-body" onSubmit={e => { e.preventDefault(); onSave(Object.fromEntries(new FormData(e.target))) }}>
        <div className="grid-form">
          <div className="field full"><label>Nama Lengkap (sesuai KTP/KK) *</label><input name="nama" placeholder="Contoh: Salsa Nabila" required /></div>
          <div className="field"><label>NIK (16 digit) *</label><input name="nik" placeholder="3275xxxxxxxxxxxx" maxLength={16} required /></div>
          <div className="field"><label>Hubungan Keluarga *</label>
            <select name="hub"><option>Anak</option><option>Istri</option><option>Suami</option><option>Orang Tua</option><option>Menantu</option><option>Cucu</option><option>Famili Lain</option></select>
          </div>
          <div className="field"><label>Jenis Kelamin *</label><select name="jk"><option>Laki-laki</option><option>Perempuan</option></select></div>
          <div className="field"><label>Tanggal Lahir *</label><input name="tanggalLahir" type="date" required /></div>
          <div className="field"><label>Pekerjaan</label><input name="pekerjaan" placeholder="Pelajar / Mahasiswa / Wiraswasta..." /></div>
          <div className="field"><label>Status Kependudukan</label><select name="status"><option>Tetap</option><option>Kontrak</option><option>Kos</option></select></div>
        </div>
        <div className="modal-foot" style={{ margin: '0 -20px -18px', borderRadius: '0 0 12px 12px' }}>
          <button type="button" className="btn" onClick={onClose}>Batal</button>
          <button type="submit" className="btn btn-dark"><span className="material-symbols-outlined">person_add</span>Simpan Anggota</button>
        </div>
      </form>
    </ModalShell>
  )
}

export function TambahKKModal({ onClose, onSave }) {
  return (
    <ModalShell wide onClose={onClose}>
      <div className="modal-head">
        <span className="badge b-kontrak"><i />FR-03 • KK Baru</span>
        <h3>Tambah Kartu Keluarga Baru</h3>
        <p>Registrasi KK baru warga RT 05/RW 08 — verifikasi NIK ganda otomatis.</p>
      </div>
      <form className="modal-body" onSubmit={e => { e.preventDefault(); onSave(Object.fromEntries(new FormData(e.target))) }}>
        <div className="grid-form">
          <div className="field"><label>No. KK (16 digit) *</label><input name="noKK" placeholder="3275xxxxxxxxxxxx" maxLength={16} required /></div>
          <div className="field"><label>Nama Kepala Keluarga *</label><input name="kepala" placeholder="Nama lengkap" required /></div>
          <div className="field"><label>NIK Kepala Keluarga *</label><input name="nikKepala" placeholder="16 digit NIK" maxLength={16} required /></div>
          <div className="field"><label>Status Hunian *</label><select name="status"><option>Tetap</option><option>Kontrak</option><option>Kos</option></select></div>
          <div className="field"><label>Blok / Wilayah *</label><select name="blok"><option value="A">Blok A (Jl. Mawar Raya)</option><option value="B">Blok B (Jl. Melati Utama)</option><option value="C">Blok C (Jl. Anggrek Indah)</option></select></div>
          <div className="field full"><label>Alamat *</label><input name="alamat" placeholder="Jl. Mawar No. xx, Blok x" required /></div>
        </div>
        <div className="modal-foot" style={{ margin: '0 -20px -18px', borderRadius: '0 0 12px 12px' }}>
          <button type="button" className="btn" onClick={onClose}>Batal</button>
          <button type="submit" className="btn btn-dark"><span className="material-symbols-outlined">add_circle</span>Simpan KK Baru</button>
        </div>
      </form>
    </ModalShell>
  )
}
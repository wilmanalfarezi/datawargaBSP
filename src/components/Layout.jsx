import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Layout({ children, onTambahKK }) {
  const [open, setOpen] = useState(false)
  const nav = [
    { to: '/', icon: 'dashboard', label: 'Dashboard & Rekap', end: true },
    { to: '/warga', icon: 'groups', label: 'Daftar Semua Warga' },
    { to: '/kk', icon: 'badge', label: 'Kelola Kartu Keluarga' },
    { to: '/mutasi', icon: 'swap_horiz', label: 'Riwayat Mutasi Warga' },
    { to: '/audit', icon: 'history', label: 'Audit Trail Log' },
  ]
  return (
    <div className="app">
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div>
          <div className="brand">
            <div className="brand-icon"><span className="material-symbols-outlined">account_balance</span></div>
            <div><div className="brand-name">SIP-Warga</div><div className="brand-sub">RT 05 / RW 08 Kelurahan</div></div>
          </div>
          <div style={{ marginTop: 12 }}>
            <button className="btn-primary" onClick={onTambahKK}>
              <span className="material-symbols-outlined">add_circle</span><span>Tambah KK Baru</span>
            </button>
          </div>
          <nav className="nav" aria-label="Menu Utama">
            {nav.map(n => (
              <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')} onClick={() => setOpen(false)}>
                <span className="material-symbols-outlined">{n.icon}</span><span>{n.label}</span>
              </NavLink>
            ))}
            <span className="nav-item" style={{ opacity: .6 }}><span className="material-symbols-outlined">admin_panel_settings</span><span>Pengaturan Role</span></span>
          </nav>
        </div>
        <div className="side-foot">
          <div className="session-pill"><span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span className="dot" />Sesi Aktif</span><b>60m</b></div>
          <span className="nav-item"><span className="material-symbols-outlined">help_outline</span><span>Bantuan & Dokumentasi</span></span>
          <span className="nav-item danger"><span className="material-symbols-outlined">logout</span><span>Keluar</span></span>
        </div>
      </aside>
      <div className="main">
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
            <button className="btn menu-btn" onClick={() => setOpen(!open)}><span className="material-symbols-outlined">menu</span></button>
            <div className="topbar-title"><span className="material-symbols-outlined">domain</span><span>Sistem Informasi Warga RT 05/RW 08</span><span className="chip-loc">Kelurahan Cibubur</span></div>
            <div className="search-global"><span className="material-symbols-outlined lead">search</span><input placeholder="Pencarian cepat global (NIK / Nama / No KK)..." /><span className="kbd">⌘K</span></div>
          </div>
          <div className="top-actions">
            <button className="icon-btn" aria-label="Notifikasi"><span className="material-symbols-outlined">notifications</span><span className="notif-dot" /></button>
            <button className="icon-btn"><span className="material-symbols-outlined">help</span></button>
            <div className="vdiv" />
            <div className="user-pill"><div className="avatar">NH</div><div><div className="user-name">Sekretaris RT - Ibu Nurhayati</div><div className="user-role">Role: Admin • Sesi 60m</div></div><span className="material-symbols-outlined">keyboard_arrow_down</span></div>
          </div>
        </header>
        <main className="content">{children}</main>
        <footer className="footer">
          <div><b style={{ color: '#030164' }}>SIP-Warga Kelurahan Cibubur</b> • Versi BRD Fase 1.4-LTS</div>
          <div style={{ display: 'flex', gap: 16 }}><span>Kebijakan Privasi Data Kependudukan</span><span>Standar Operasional RT</span><span>Waktu Server: 07 Okt 2026, 14:32 WIB</span></div>
        </footer>
      </div>
    </div>
  )
}
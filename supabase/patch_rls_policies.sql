-- ============================================================
-- PATCH: Aktifkan policy INSERT/UPDATE/DELETE untuk anon
-- Jalankan di Supabase SQL Editor bila script utama
-- (supabase/schema_kelola_kk.sql) dijalankan SEBELUM
-- bagian RLS diubah menjadi `true`.
--
-- Gejala bila belum dijalankan:
--   HTTP 401 / 42501 "new row violates row-level security policy"
--   saat frontend menyimpan data (insert sukses tapi update
--   tersenyap 0 baris).
-- Script ini aman dijalankan berulang kali.
-- ======================================= sv=====================

alter table public.kartu_keluarga enable row level security;
alter table public.anggota_keluarga enable row level security;

drop policy if exists kk_select on public.kartu_keluarga;
create policy kk_select on public.kartu_keluarga
  for select using (true);

drop policy if exists kk_insert on public.kartu_keluarga;
create policy kk_insert on public.kartu_keluarga
  for insert with check (true);

drop policy if exists kk_update on public.kartu_keluarga;
create policy kk_update on public.kartu_keluarga
  for update using (true) with check (true);

drop policy if exists kk_delete on public.kartu_keluarga;
create policy kk_delete on public.kartu_keluarga
  for delete using (true);

drop policy if exists anggota_select on public.anggota_keluarga;
create policy anggota_select on public.anggota_keluarga
  for select using (true);

drop policy if exists anggota_insert on public.anggota_keluarga;
create policy anggota_insert on public.anggota_keluarga
  for insert with check (true);

drop policy if exists anggota_update on public.anggota_keluarga;
create policy anggota_update on public.anggota_keluarga
  for update using (true) with check (true);

drop policy if exists anggota_delete on public.anggota_keluarga;
create policy anggota_delete on public.anggota_keluarga
  for delete using (true);
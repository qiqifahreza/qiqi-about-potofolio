-- ====================================================================
-- BLUEPRINT SKEMA DATABASE PORTOFOLIO (SUPABASE)
-- File ini aman: menggunakan 'IF NOT EXISTS' sehingga jika tidak sengaja
-- dijalankan di masa depan, data yang sudah kamu isi TIDAK AKAN HILANG.
-- ====================================================================

-- 1. Tabel General Settings (Beranda, Tema, Favicon)
create table if not exists public.general_settings (
  id text primary key default 'default',
  web_title text default '',
  favicon_url text default '',
  logo_text text default '',
  navbar_logo_url text default '',
  badge_text text default '',
  hero_katakana text default '',
  hero_big_text text default '',
  hero_signature text default '',
  hero_image_url text default '',
  current_status_title text default '',
  current_status_text text default '',
  news_label text default '',
  hero_intro text default '',
  hero_description text default '',
  hero_quote text default '',
  hero_quote_author text default '',
  jikosoukai_title text default '',
  hero_meta_text text default '',
  primary_color text default '#000000',
  secondary_color text default '#ffffff',
  is_dark boolean default true,
  updated_at timestamptz default now()
);

-- 2. Tabel Personal Info (Data Diri, Profil, CV)
create table if not exists public.personal_info (
  id text primary key default 'default',
  name text default '',
  nickname text default '',
  role text default '',
  greeting text default '',
  bio text default '',
  about_image_url text default '',
  cv_url text default '',
  skills text[] default array[]::text[],
  updated_at timestamptz default now()
);

-- 3. Tabel Riwayat Pendidikan (Education)
create table if not exists public.education (
  id text primary key,
  institution text not null,
  major text not null,
  sub_detail text default '',
  period text default '',
  created_at timestamptz default now()
);

-- 4. Tabel Pengalaman (Experience)
create table if not exists public.experience (
  id text primary key,
  company text not null,
  role text not null,
  sub_detail text default '',
  period text default '',
  created_at timestamptz default now()
);

-- 5. Tabel Dokumentasi Projek (Projects)
create table if not exists public.projects (
  id text primary key,
  title text not null,
  category text default '',
  description text default '',
  tags text[] default array[]::text[],
  github text default '',
  demo text default '',
  image_url text default '',
  created_at timestamptz default now()
);

-- 6. Tabel Sertifikat (Certificates)
create table if not exists public.certificates (
  id text primary key,
  title text not null,
  issuer text default '',
  year text default '',
  credential_id text default '',
  credential_url text default '',
  image_url text default '',
  created_at timestamptz default now()
);

-- 7. Tabel Penghargaan (Awards)
create table if not exists public.awards (
  id text primary key,
  title text not null,
  issuer text default '',
  year text default '',
  description text default '',
  image_url text default '',
  created_at timestamptz default now()
);

-- 8. Tabel Akun Kontak / Sosmed (Contacts)
create table if not exists public.contacts (
  id text primary key,
  platform text not null,
  label text not null,
  url text not null,
  created_at timestamptz default now()
);

-- 9. Tabel Pengaturan Teks Kontak
create table if not exists public.contact_settings (
  id text primary key default 'default',
  title text default '',
  description text default '',
  updated_at timestamptz default now()
);

-- 10. Tabel Akun Kredensial Admin
create table if not exists public.admin_credentials (
  id text primary key default 'default',
  username text default 'admin',
  password text default 'admin123',
  updated_at timestamptz default now()
);

-- AKTIFKAN ROW LEVEL SECURITY (RLS)
alter table public.general_settings enable row level security;
alter table public.personal_info enable row level security;
alter table public.education enable row level security;
alter table public.experience enable row level security;
alter table public.projects enable row level security;
alter table public.certificates enable row level security;
alter table public.awards enable row level security;
alter table public.contacts enable row level security;
alter table public.contact_settings enable row level security;
alter table public.admin_credentials enable row level security;

-- KEBIJAKAN AKSES (POLICIES)
drop policy if exists "Allow all general_settings" on public.general_settings;
create policy "Allow all general_settings" on public.general_settings for all using (true) with check (true);

drop policy if exists "Allow all personal_info" on public.personal_info;
create policy "Allow all personal_info" on public.personal_info for all using (true) with check (true);

drop policy if exists "Allow all education" on public.education;
create policy "Allow all education" on public.education for all using (true) with check (true);

drop policy if exists "Allow all experience" on public.experience;
create policy "Allow all experience" on public.experience for all using (true) with check (true);

drop policy if exists "Allow all projects" on public.projects;
create policy "Allow all projects" on public.projects for all using (true) with check (true);

drop policy if exists "Allow all certificates" on public.certificates;
create policy "Allow all certificates" on public.certificates for all using (true) with check (true);

drop policy if exists "Allow all awards" on public.awards;
create policy "Allow all awards" on public.awards for all using (true) with check (true);

drop policy if exists "Allow all contacts" on public.contacts;
create policy "Allow all contacts" on public.contacts for all using (true) with check (true);

drop policy if exists "Allow all contact_settings" on public.contact_settings;
create policy "Allow all contact_settings" on public.contact_settings for all using (true) with check (true);

drop policy if exists "Allow all admin_credentials" on public.admin_credentials;
create policy "Allow all admin_credentials" on public.admin_credentials for all using (true) with check (true);

-- INISIALISASI BARIS PERTAMA (Hanya masuk jika baris belum ada, tidak akan menimpa data yang sudah kamu simpan)
insert into public.general_settings (id, web_title, favicon_url, logo_text, navbar_logo_url, badge_text, hero_katakana, hero_big_text, hero_signature, hero_image_url, current_status_title, current_status_text, news_label, hero_intro, hero_description, hero_quote, hero_quote_author, jikosoukai_title, hero_meta_text, primary_color, secondary_color, is_dark)
values ('default', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '#000000', '#ffffff', true)
on conflict (id) do nothing;

insert into public.personal_info (id, name, nickname, role, greeting, bio, about_image_url, cv_url, skills)
values ('default', '', '', '', '', '', '', '', array[]::text[])
on conflict (id) do nothing;

insert into public.contact_settings (id, title, description)
values ('default', '', '')
on conflict (id) do nothing;

insert into public.admin_credentials (id, username, password)
values ('default', 'admin', 'admin123')
on conflict (id) do nothing;
-- ====================================================================
-- BLUEPRINT SKEMA DATABASE PORTOFOLIO (SUPABASE)
-- Jalankan seluruh file ini di Supabase SQL Editor.
-- Migrasi ini mempertahankan isi tabel, kecuali kolom yang tidak lagi dipakai:
-- current_status_text (dipindah ke hero_description), news_label, dan skills.
-- Sebelum perubahan, user admin harus diberi app_metadata {"role":"admin"}
-- melalui Supabase Dashboard / server tepercaya.
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

-- Buat tabel tech_logos untuk menyimpan logo di LogoLoop
create table if not exists public.tech_logos (
  id text primary key,
  title text not null,
  src text default '',
  href text default '',
  hover_color text default '',
  created_at timestamptz default now()
);

-- Migrasi aman untuk instalasi lama: pertahankan deskripsi status yang lama.
alter table public.general_settings
  add column if not exists hero_description text default '';

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'general_settings'
      and column_name = 'current_status_text'
  ) then
    execute $migration$
      update public.general_settings
      set hero_description = coalesce(nullif(hero_description, ''), current_status_text, '')
      where current_status_text is not null
    $migration$;
  end if;
end;
$$;

alter table public.general_settings
  drop column if exists current_status_text,
  drop column if exists news_label;

alter table public.personal_info
  drop column if exists skills;

-- Hapus tabel lama yang menyimpan password admin plaintext.
drop table if exists public.admin_credentials;

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
alter table public.tech_logos enable row level security;

-- Baca konten publik diperbolehkan; semua perubahan dibatasi ke admin.
grant select on public.general_settings, public.personal_info, public.education,
  public.experience, public.projects, public.certificates, public.awards,
  public.contacts, public.contact_settings, public.tech_logos to anon, authenticated;
grant insert, update, delete on public.general_settings, public.personal_info,
  public.education, public.experience, public.projects, public.certificates,
  public.awards, public.contacts, public.contact_settings, public.tech_logos
  to authenticated;

-- KEBIJAKAN AKSES (POLICIES)
drop policy if exists "Allow all general_settings" on public.general_settings;
drop policy if exists "Public read general_settings" on public.general_settings;
drop policy if exists "Admin manage general_settings" on public.general_settings;
create policy "Public read general_settings" on public.general_settings for select using (true);
create policy "Admin manage general_settings" on public.general_settings for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Allow all personal_info" on public.personal_info;
drop policy if exists "Public read personal_info" on public.personal_info;
drop policy if exists "Admin manage personal_info" on public.personal_info;
create policy "Public read personal_info" on public.personal_info for select using (true);
create policy "Admin manage personal_info" on public.personal_info for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Allow all education" on public.education;
drop policy if exists "Public read education" on public.education;
drop policy if exists "Admin manage education" on public.education;
create policy "Public read education" on public.education for select using (true);
create policy "Admin manage education" on public.education for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Allow all experience" on public.experience;
drop policy if exists "Public read experience" on public.experience;
drop policy if exists "Admin manage experience" on public.experience;
create policy "Public read experience" on public.experience for select using (true);
create policy "Admin manage experience" on public.experience for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Allow all projects" on public.projects;
drop policy if exists "Public read projects" on public.projects;
drop policy if exists "Admin manage projects" on public.projects;
create policy "Public read projects" on public.projects for select using (true);
create policy "Admin manage projects" on public.projects for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Allow all certificates" on public.certificates;
drop policy if exists "Public read certificates" on public.certificates;
drop policy if exists "Admin manage certificates" on public.certificates;
create policy "Public read certificates" on public.certificates for select using (true);
create policy "Admin manage certificates" on public.certificates for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Allow all awards" on public.awards;
drop policy if exists "Public read awards" on public.awards;
drop policy if exists "Admin manage awards" on public.awards;
create policy "Public read awards" on public.awards for select using (true);
create policy "Admin manage awards" on public.awards for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Allow all contacts" on public.contacts;
drop policy if exists "Public read contacts" on public.contacts;
drop policy if exists "Admin manage contacts" on public.contacts;
create policy "Public read contacts" on public.contacts for select using (true);
create policy "Admin manage contacts" on public.contacts for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Allow all contact_settings" on public.contact_settings;
drop policy if exists "Public read contact_settings" on public.contact_settings;
drop policy if exists "Admin manage contact_settings" on public.contact_settings;
create policy "Public read contact_settings" on public.contact_settings for select using (true);
create policy "Admin manage contact_settings" on public.contact_settings for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Allow all tech_logos" on public.tech_logos;
drop policy if exists "Public read tech_logos" on public.tech_logos;
drop policy if exists "Admin manage tech_logos" on public.tech_logos;
create policy "Public read tech_logos" on public.tech_logos for select using (true);
create policy "Admin manage tech_logos" on public.tech_logos for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');


-- INISIALISASI BARIS PERTAMA (Hanya masuk jika baris belum ada, tidak akan menimpa data yang sudah kamu simpan)
insert into public.general_settings (id, web_title, favicon_url, logo_text, navbar_logo_url, badge_text, hero_katakana, hero_big_text, hero_signature, hero_image_url, current_status_title, hero_intro, hero_description, hero_quote, hero_quote_author, jikosoukai_title, hero_meta_text, primary_color, secondary_color, is_dark)
values ('default', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '#000000', '#ffffff', true)
on conflict (id) do nothing;

insert into public.personal_info (id, name, nickname, role, greeting, bio, about_image_url, cv_url)
values ('default', '', '', '', '', '', '', '')
on conflict (id) do nothing;

insert into public.contact_settings (id, title, description)
values ('default', '', '')
on conflict (id) do nothing;
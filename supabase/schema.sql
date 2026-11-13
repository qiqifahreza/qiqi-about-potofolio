-- 1. Tabel General Settings (Pengaturan Beranda, Favicon, & Tema)
create table if not exists public.general_settings (
  id text primary key default 'default',
  web_title text default 'Mochamad Rifki Al Farizi',
  favicon_url text default '',
  logo_text text default 'Rifki',
  navbar_logo_url text default '',
  badge_text text default 'DEV 2026',
  hero_katakana text default 'モハマド・リフキ',
  hero_big_text text default 'RIFKI',
  hero_signature text default 'Al Farizi',
  hero_image_url text default '',
  current_status_title text default 'Current Status !!',
  current_status_text text default '',
  news_label text default 'N E W S',
  hero_intro text default '',
  hero_description text default '',
  hero_quote text default '',
  hero_quote_author text default '',
  jikosoukai_title text default 'JIKOSOUKAI',
  hero_meta_text text default 'Rifki.09-01-2006',
  primary_color text default '#000000',
  secondary_color text default '#ffffff',
  is_dark boolean default true,
  updated_at timestamptz default now()
);

-- 2. Tabel Profil & Data Diri (CV)
create table if not exists public.personal_info (
  id text primary key default 'default',
  name text default 'Mochamad Rifki Al Farizi',
  nickname text default 'Rifki',
  role text default 'Software Engineer & Creative Developer',
  greeting text default 'Hi, I''m',
  bio text default '',
  about_image_url text default '',
  cv_url text default '',
  skills text[] default array['TypeScript', 'React.js', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'Git & Linux'],
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

-- 4. Tabel Riwayat Pengalaman (Experience)
create table if not exists public.experience (
  id text primary key,
  company text not null,
  role text not null,
  sub_detail text default '',
  period text default '',
  created_at timestamptz default now()
);

-- 5. Tabel Projek
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

-- 6. Tabel Sertifikat
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

-- 8. Tabel Akun Kontak
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
  title text default 'Mari Terhubung',
  description text default 'Punya ide menarik atau proyek yang ingin didiskusikan? Kirim pesan langsung ke saya.',
  updated_at timestamptz default now()
);

-- 10. Tabel Kredensial Login Admin
create table if not exists public.admin_credentials (
  id text primary key default 'default',
  username text default 'admin',
  password text default 'admin123',
  updated_at timestamptz default now()
);

-- AKTIFKAN ROW LEVEL SECURITY (RLS) & PUBLIC POLICIES
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

create policy "Allow all general_settings" on public.general_settings for all using (true) with check (true);
create policy "Allow all personal_info" on public.personal_info for all using (true) with check (true);
create policy "Allow all education" on public.education for all using (true) with check (true);
create policy "Allow all experience" on public.experience for all using (true) with check (true);
create policy "Allow all projects" on public.projects for all using (true) with check (true);
create policy "Allow all certificates" on public.certificates for all using (true) with check (true);
create policy "Allow all awards" on public.awards for all using (true) with check (true);
create policy "Allow all contacts" on public.contacts for all using (true) with check (true);
create policy "Allow all contact_settings" on public.contact_settings for all using (true) with check (true);
create policy "Allow all admin_credentials" on public.admin_credentials for all using (true) with check (true);
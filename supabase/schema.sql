create table if not exists public.portfolio_data (
  id text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists portfolio_data_updated_at_idx
on public.portfolio_data (updated_at desc);

alter table public.portfolio_data enable row level security;

create policy "Allow public read access"
on public.portfolio_data
for select
using (true);

create policy "Allow public write access"
on public.portfolio_data
for all
using (true)
with check (true);

-- TechPop: articles table, admin allowlist, RLS. Run once in the Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) > 0),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  summary text not null check (length(trim(summary)) > 0),
  content text not null check (length(trim(content)) > 0),
  category text not null check (category in ('ai-tech','startups','business','cybersecurity','tech-culture','programming','gaming','careers')),
  image_url text check (image_url is null or image_url ~* '^https?://'),
  image_alt text,
  author_name text not null check (length(trim(author_name)) > 0),
  source_name text,
  published_at timestamptz,
  status text not null default 'draft' check (status in ('draft','published')),
  is_featured boolean not null default false,
  is_sponsored boolean not null default false,
  external_url text check (external_url is null or external_url ~* '^https?://'),
  reading_time_minutes integer check (reading_time_minutes is null or reading_time_minutes > 0),
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint published_has_date check (status <> 'published' or published_at is not null)
);

create index if not exists articles_category_published_idx on public.articles (category, published_at desc);
create index if not exists articles_published_idx on public.articles (published_at desc) where status = 'published';

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at before update on public.articles
  for each row execute function public.set_updated_at();

-- Admin allowlist. RLS is on with NO policies, so clients can never read or write it.
-- Rows are added only via the SQL Editor (see SUPABASE_SETUP.md).
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid())
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.articles enable row level security;

drop policy if exists "public reads published" on public.articles;
create policy "public reads published" on public.articles
  for select to anon, authenticated using (status = 'published');

drop policy if exists "admins read all" on public.articles;
create policy "admins read all" on public.articles
  for select to authenticated using (public.is_admin());

drop policy if exists "admins insert" on public.articles;
create policy "admins insert" on public.articles
  for insert to authenticated with check (public.is_admin());

drop policy if exists "admins update" on public.articles;
create policy "admins update" on public.articles
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete" on public.articles;
create policy "admins delete" on public.articles
  for delete to authenticated using (public.is_admin());

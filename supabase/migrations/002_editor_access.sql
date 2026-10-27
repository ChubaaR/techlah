-- Editors can manage only their own non-Careers news updates.
-- The existing admin_users allowlist and is_admin() permissions remain unchanged.

create table if not exists public.editor_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.editor_users enable row level security;

create or replace function public.is_editor() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.editor_users
    where user_id = auth.uid()
  ) and not public.is_admin()
$$;
revoke all on function public.is_editor() from public;
grant execute on function public.is_editor() to authenticated;

alter table public.articles
  add column if not exists created_by uuid references auth.users(id) on delete set null;

create or replace function public.enforce_editor_article_access()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null or public.is_admin() then
    return new;
  end if;

  if not public.is_editor() then
    raise exception 'Only editors and admins may manage articles.';
  end if;

  if new.category = 'careers' then
    raise exception 'Editors cannot post Careers articles.';
  end if;

  if new.is_featured or new.is_sponsored then
    raise exception 'Editors cannot feature or sponsor articles.';
  end if;

  if tg_op = 'INSERT' then
    new.created_by := auth.uid();
  elsif old.created_by is distinct from auth.uid() then
    raise exception 'Editors may update only their own articles.';
  else
    new.created_by := old.created_by;
  end if;

  return new;
end $$;

drop trigger if exists articles_enforce_editor_access on public.articles;
create trigger articles_enforce_editor_access
  before insert or update on public.articles
  for each row execute function public.enforce_editor_article_access();

drop policy if exists "editors read own articles" on public.articles;
create policy "editors read own articles" on public.articles
  for select to authenticated
  using (public.is_editor() and created_by = auth.uid());

drop policy if exists "editors insert own articles" on public.articles;
create policy "editors insert own articles" on public.articles
  for insert to authenticated
  with check (
    public.is_editor()
    and created_by = auth.uid()
    and category <> 'careers'
    and not is_featured
    and not is_sponsored
  );

drop policy if exists "editors update own articles" on public.articles;
create policy "editors update own articles" on public.articles
  for update to authenticated
  using (public.is_editor() and created_by = auth.uid())
  with check (
    public.is_editor()
    and created_by = auth.uid()
    and category <> 'careers'
    and not is_featured
    and not is_sponsored
  );

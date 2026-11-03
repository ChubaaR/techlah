-- Public article images; only authenticated admins and editors may upload.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'article-images',
  'article-images',
  true,
  10485760,
  array['image/jpeg','image/png','image/webp','image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public reads article images" on storage.objects;
create policy "public reads article images" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'article-images');

drop policy if exists "editors upload own article images" on storage.objects;
create policy "editors upload own article images" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'article-images'
    and (public.is_admin() or public.is_editor())
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "editors update own article images" on storage.objects;
create policy "editors update own article images" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'article-images'
    and (public.is_admin() or public.is_editor())
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'article-images'
    and (public.is_admin() or public.is_editor())
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "editors delete own article images" on storage.objects;
create policy "editors delete own article images" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'article-images'
    and (public.is_admin() or public.is_editor())
    and (storage.foldername(name))[1] = auth.uid()::text
  );
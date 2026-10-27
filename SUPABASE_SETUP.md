# Supabase setup

Status: the code is written but **not yet tested against a live Supabase project**. Complete and verify these steps yourself.

1. **Create a project** at supabase.com → New project. Save the database password.
2. **Find credentials:** Project Settings → API Keys (or "API"). Copy the *Project URL* and the *publishable* (or legacy *anon*) key. Never use the `service_role`/secret key in this app.
3. **Configure env:** edit the existing `.env` file (or create one) and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, then restart `npm run dev`. Do not use a `service_role`/secret key.
4. **Run the migrations in order:** SQL Editor → paste and run `supabase/migrations/001_create_articles.sql`, then `supabase/migrations/002_editor_access.sql`. They create `articles`, the separate admin/editor allowlists, the role-check functions, and row-level security policies.
5. **Create the first admin user:** Authentication → Users → Add user (email + password, tick auto-confirm). Also turn off public sign-ups: Authentication → Sign In / Providers → disable "Allow new users to sign up".
6. **Grant admin access** (you have already done this for `codewithchuba@gmail.com`; no need to repeat it). SQL Editor runs with privileged rights; clients cannot write either role allowlist:
   ```sql
   insert into public.admin_users (user_id)
   select id from auth.users where email = 'codewithchuba@gmail.com'
   on conflict (user_id) do nothing;
   ```
   To verify the existing admin assignment:
   ```sql
   select u.email, a.user_id
   from auth.users u
   join public.admin_users a on a.user_id = u.id
   where u.email = 'codewithchuba@gmail.com';
   ```
7. **Add an editor:** in Supabase Authentication → Users, add the editor with their email and password. Then grant that account editor access in the SQL Editor, replacing the example email with the editor's exact email:
   ```sql
   insert into public.editor_users (user_id)
   select id from auth.users where email = 'editor@example.com'
   on conflict (user_id) do nothing;
   ```
   To verify the editor assignment:
   ```sql
   select u.email, e.user_id
   from auth.users u
   join public.editor_users e on e.user_id = u.id
   where u.email = 'editor@example.com';
   ```
   Editors sign in to the website dashboard at `/Boss`; they do not get Supabase dashboard access. To revoke access, delete their row from `public.editor_users`.
8. **Run locally:** `npm install && npm run dev`, open `/Boss`, sign in.
9. **Test:** (a) add a draft as admin: it must not appear on the site; (b) publish it: it appears on Home/Latest, its category page and `/article/<slug>`; (c) edit and save: publication date stays; (d) unpublish: the article URL shows not-found; (e) delete: row removed; (f) sign in with an unlisted account: access denied; (g) sign in as an editor: only their own articles are listed and editable, publishing/unpublishing works, Careers is unavailable, feature/sponsor controls and Delete are absent; (h) confirm RLS prevents editors from reading or modifying another user's drafts or changing categories, ownership, featured, or sponsored status through direct API calls.
10. **Deploy:** set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your host's environment settings (Vercel/Netlify/etc.) and rebuild. Add your site URL under Authentication → URL Configuration. Configure SPA rewrites so `/Boss` and `/article/*` serve `index.html`.

Notes: images are pasted URLs (`image_url`); Supabase Storage uploads can be added later in `articleService.ts`. Popularity tracking is not implemented. There is no demo data: publish stories from the dashboard.

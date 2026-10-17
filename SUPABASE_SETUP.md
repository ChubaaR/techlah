# Supabase setup

Status: the code is written but **not yet tested against a live Supabase project**. Complete and verify these steps yourself.

1. **Create a project** at supabase.com → New project. Save the database password.
2. **Find credentials:** Project Settings → API Keys (or "API"). Copy the *Project URL* and the *publishable* (or legacy *anon*) key. Never use the `service_role`/secret key in this app.
3. **Configure env:** `cp .env.example .env`, fill `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, restart `npm run dev`.
4. **Run the migration:** SQL Editor → paste `supabase/migrations/001_create_articles.sql` → Run. It creates `articles`, `admin_users`, `is_admin()` and all policies (RLS is enabled by the script itself).
5. **Create the first admin user:** Authentication → Users → Add user (email + password, tick auto-confirm). Also turn off public sign-ups: Authentication → Sign In / Providers → disable "Allow new users to sign up".
6. **Grant admin access** (SQL Editor, which runs with privileged rights; clients cannot write `admin_users`):
   ```sql
   insert into public.admin_users (user_id)
   select id from auth.users where email = 'you@example.com';
   ```
7. **Run locally:** `npm install && npm run dev`, open `/admin`, sign in.
8. **Test:** (a) add a draft: it must not appear on the site; (b) publish it: it appears on Home/Latest, its category page and `/article/<slug>`; (c) edit and save: publication date stays; (d) unpublish: the article URL shows not-found; (e) delete: row removed; (f) sign in with a non-admin user: access denied; (g) in a private window, confirm drafts are not visible and `/admin` needs login.
9. **Deploy:** set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your host's environment settings (Vercel/Netlify/etc.) and rebuild. Add your site URL under Authentication → URL Configuration. Configure SPA rewrites so `/admin` and `/article/*` serve `index.html`.

Notes: images are pasted URLs (`image_url`); Supabase Storage uploads can be added later in `articleService.ts`. Popularity tracking is not implemented. There is no demo data: publish stories from the dashboard.

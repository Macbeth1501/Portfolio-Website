# Setup — Phase 1

Manual steps only you can do (creating accounts, clicking through dashboards).
Everything else — the code, the schema, the config — is already written and
committed. Do these in order.

## 1. Create the Supabase project

1. Go to [supabase.com](https://supabase.com) → sign up / log in (GitHub login is fine) → **New Project**.
2. Pick any organization, name it something like `rochan-portfolio`, generate/save a **database password** somewhere safe (a password manager, not this repo), and pick a region close to your visitors — **Mumbai (`ap-south-1`)** is the obvious choice here.
3. Wait ~2 minutes for the project to finish provisioning.
4. Go to **Project Settings → API**. Copy two values, you'll need them in step 5:
   - **Project URL**
   - **anon / public** key (not the `service_role` key — never use that one client-side)

## 2. Run the schema

1. In the Supabase dashboard, open **SQL Editor → New query**.
2. Open [`supabase/schema.sql`](supabase/schema.sql) in this repo, copy the whole file, paste it into the SQL Editor, and click **Run**.
3. It should finish with no errors. If you ever need to re-run it (e.g. after I add to it in a later phase), it's safe to run again — it does not duplicate or wipe existing rows.
4. Verify:
   - **Table Editor** → you should see `projects`, `experiences`, `skills`, `achievements`, `field_definitions`, `site_settings`, `app_owner`.
   - Open `site_settings` → there should be exactly one row, with `full_name = Rochan Shrish Awasthi`.
   - **Storage** → there should be a bucket named `media`.

## 3. Set up auth (your one owner login)

1. **Authentication → Providers** → confirm **Email** is enabled (it is by default).
2. **Authentication → Settings** (or **Sign In / Providers** depending on the dashboard version) → turn **off** "Allow new users to sign up". This site has exactly one editor (you); nobody else should be able to register.
3. **Authentication → Users → Add user** → enter your email and a strong password → check **Auto Confirm User** → create.
4. Click into that new user and copy their **User UID** (a long uuid).
5. Back in **SQL Editor**, run (with your actual UID pasted in):
   ```sql
   insert into app_owner (user_id) values ('paste-your-uid-here');
   ```
   This is what grants that one account write access — see the RLS policies at the bottom of `schema.sql`.

## 4. Sanity-check that RLS is actually blocking writes

Still in the SQL Editor, run:
```sql
set role anon;
insert into achievements (title) values ('should fail');
reset role;
```
This should fail with a `permission denied` / row-level security error. If it succeeds instead, stop and tell me — it means the RLS policies didn't apply and public write access is open.

## 5. Run the site locally

1. In this project folder:
   ```
   cp .env.example .env.local
   ```
   (On Windows PowerShell: `Copy-Item .env.example .env.local`)
2. Open `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` — the Project URL from step 1.4
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — the anon key from step 1.4
   - `CRON_SECRET` — any random string. Generate one with:
     ```
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```
3. Install dependencies and run:
   ```
   npm install
   npm run dev
   ```
4. Open **http://localhost:3000** — you should see "Rochan Shrish Awasthi" and a green "✓ Supabase connected" line. If you instead see an amber warning, re-check `.env.local` against step 5.2.

## 6. Push to GitHub

I've already run `git init` and made the first commit locally. You push it:

- **If you want to reuse your existing empty `Macbeth1501/Portfolio-Website` repo:**
  ```
  git remote add origin https://github.com/Macbeth1501/Portfolio-Website.git
  git branch -M main
  git push -u origin main
  ```
- **If you'd rather create a fresh repo:** go to [github.com/new](https://github.com/new), create it **empty** (no README/gitignore/license — we already have those), then run the same three commands with that repo's URL.

## 7. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → sign up / log in with GitHub → **Add New → Project** → import the repo you just pushed.
2. Vercel auto-detects Next.js; leave the build settings as-is.
3. Before clicking Deploy, expand **Environment Variables** and add all three from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `CRON_SECRET`
4. Click **Deploy**. When it finishes, open the given `*.vercel.app` URL — you should see the same page as locally.
5. Go to **Project → Settings → Cron Jobs** — you should see `/api/keepalive` scheduled daily. Click it and use **Run** (or "Trigger") to fire it once manually; it should return a `200` with `{"ok": true, ...}`. This is what keeps the free Supabase project from auto-pausing after 7 idle days.

## 8. If something doesn't work

| Symptom | Likely cause |
|---|---|
| Amber "not connected" warning, locally or on Vercel | Env var typo'd, or you copied the `service_role` key instead of `anon` |
| Works locally, amber warning on Vercel | Env vars weren't added to the Vercel project (step 7.3) — add them, then redeploy |
| `permission denied for table ...` even for a plain read | `schema.sql` didn't finish running — re-run it and check for a red error in the SQL Editor output |
| Step 4's RLS check *succeeds* instead of failing | Something's wrong with the policies — tell me, don't proceed to Phase 2 |
| Cron job "Run" returns 401 | `CRON_SECRET` isn't set on the Vercel project, or doesn't match what you put in `.env.local` |

---

Once every checkbox above works, tell me and I'll start Phase 2 (`/impeccable shape`).

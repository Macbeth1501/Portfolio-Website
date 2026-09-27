# Rochan Awasthi — Portfolio

Personal portfolio site for Rochan Shrish Awasthi. See [`SPEC.md`](SPEC.md) for the
full project spec (design direction, content schema, build phases) and
[`SETUP.md`](SETUP.md) for the one-time manual setup (Supabase, Vercel).

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript, Tailwind CSS)
- [Supabase](https://supabase.com) — database, auth, and image storage (free tier)
- Deployed on [Vercel](https://vercel.com)

## Local development

```bash
cp .env.example .env.local   # then fill in the values — see SETUP.md
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

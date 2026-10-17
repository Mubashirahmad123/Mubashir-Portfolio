# Free Deployment Guide for Mubashir Nazir's Portfolio

This portfolio is built as a high-performance React 19 + Vite SPA, styled with Tailwind CSS, and uses Supabase for free-tier persistence.

---

## Option 1: Deploy Free to Vercel (Recommended — Same as reference)

### Via Vercel Web Dashboard (Easiest — 2 Minutes)
1. Push this project to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: Mubashir Nazir engineering portfolio"
   git branch -M main
   git remote add origin https://github.com/Mubashirahmad123/portfolio.git
   git push -u origin main
   ```
2. Go to **[vercel.com](https://vercel.com)** and log in with your GitHub account.
3. Click **"Add New"** > **"Project"** and select your `portfolio` repository.
4. Settings are automatically detected (`framework: Vite`, `output: dist`).
5. (Optional) Add your Supabase environment variables under **Environment Variables**:
   - `VITE_SUPABASE_URL` = `https://your-project.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your-anon-key`
   *(If not provided, the contact form and like buttons automatically fall back gracefully to local storage).*
6. Click **Deploy**. Your site will be live at `https://your-name.vercel.app` with free SSL!

### Via Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## Option 2: Deploy Free to Netlify

1. Go to **[netlify.com](https://www.netlify.com)** and connect your GitHub repository.
2. Build Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Click **Deploy Site**.

---

## Option 3: Deploy Free to Cloudflare Pages

1. Go to **Cloudflare Dashboard** > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select Framework preset: **Vite**.
3. Build command: `npm run build`, output: `dist`.
4. Click **Save and Deploy**.

---

## Setting Up Supabase (100% Free Forever Tier)

To persist contact messages, visitor views, and project likes to Supabase:
1. Create a free account at **[supabase.com](https://supabase.com)**.
2. Create a new project (e.g., `portfolio-db`).
3. In the **SQL Editor**, run this schema:
   ```sql
   create table contact_messages (
     id uuid default gen_random_uuid() primary key,
     name text not null,
     email text not null,
     company text,
     message text not null,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   create table project_likes (
     project_id text primary key,
     count integer default 0
   );

   create table visitor_analytics (
     id uuid default gen_random_uuid() primary key,
     timestamp timestamp with time zone default timezone('utc'::text, now()) not null,
     user_agent text
   );

   -- Allow anonymous insertions/reads for portfolio visitors
   alter table contact_messages enable row level security;
   create policy "Allow anonymous insert" on contact_messages for insert with check (true);

   alter table project_likes enable row level security;
   create policy "Allow public read" on project_likes for select using (true);
   create policy "Allow public update" on project_likes for update using (true);

   alter table visitor_analytics enable row level security;
   create policy "Allow anonymous views" on visitor_analytics for insert with check (true);
   ```
4. Copy your **Project URL** and **Anon Public Key** from **Project Settings > API**, and add them as:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

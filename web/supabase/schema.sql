-- EdTech MVP schema — Task 7 (Google OAuth + progress persistence)
-- Apply in the Supabase SQL editor. Both tables are keyed by auth.users(id)
-- and protected with RLS: a user may only read/write their own row.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  tasks_completed int not null default 1,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: select own row"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles: insert own row"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles: update own row"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create table if not exists public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  drill1 boolean not null default false,
  drill2 boolean not null default false,
  drill3 boolean not null default false,
  streak int not null default 0,
  last_active date,
  checkpoint_passed boolean not null default false
);

alter table public.progress enable row level security;

create policy "progress: select own row"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "progress: insert own row"
  on public.progress for insert
  with check (auth.uid() = user_id);

create policy "progress: update own row"
  on public.progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Roadmaps table with nested JSON
create table
  if not exists roadmaps (
    id uuid primary key default gen_random_uuid (),
    user_id uuid not null references auth.users (id) on delete cascade,
    title text not null,
    data jsonb not null,
    created_at timestamp
    with
      time zone default now ()
  );
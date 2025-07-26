create table
  public.streaks (
    id uuid primary key default gen_random_uuid (),
    user_id uuid not null references auth.users (id) on delete cascade,
    count integer not null default 1,
    last_triggered_at date not null default current_date,
    created_at timestamp
    with
      time zone default now (),
      updated_at timestamp
    with
      time zone default now ()
  );
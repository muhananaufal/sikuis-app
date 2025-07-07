CREATE TABLE
  summaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id uuid not null references auth.users (id) on delete cascade,
    summary TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now ()
  );
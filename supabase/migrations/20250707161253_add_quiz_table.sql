CREATE TABLE
  quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id uuid not null references auth.users (id) on delete cascade,
    summary_id UUID REFERENCES summaries (id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    questions JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT now ()
  );
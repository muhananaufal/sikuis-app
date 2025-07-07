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

-- Insert Dummy User
INSERT INTO
  auth.users (id, email, encrypted_password, aud, role)
VALUES
  (
    '00000000-0000-0000-0000-000000000099',
    'han.sy@gmail.com',
    crypt ('password', gen_salt ('bf')), -- hashed password
    'authenticated',
    'authenticated'
  );

-- ✅ Insert into summaries (with dummy user_id)
INSERT INTO
  summaries (user_id, title, summary)
VALUES
  (
    '00000000-0000-0000-0000-000000000099', -- replace with real user ID
    'WWI Summary',
    'An overview of World War I.'
  );

-- ✅ Insert into quizzes (linked to latest summary)
INSERT INTO
  quizzes (user_id, summary_id, title, questions)
VALUES
  (
    '00000000-0000-0000-0000-000000000099',
    (
      SELECT
        id
      FROM
        summaries
      ORDER BY
        created_at DESC
      LIMIT
        1
    ),
    'WWI Quiz #1',
    '[
    {
      "type": "Multiple choices",
      "question": "Who died?",
      "options": ["Bob", "Franz"],
      "answer": "Franz"
    }
  ]'
  );

-- ✅ Insert into roadmaps (nested JSON)
INSERT INTO
  roadmaps (user_id, title, data)
VALUES
  (
    '00000000-0000-0000-0000-000000000099',
    'WWI Roadmap',
    '[
    {
      "id": "intro",
      "title": "Intro to WWI",
      "description": "History time.",
      "children": []
    }
  ]'
  );
TRUNCATE TABLE
  experts_languages,
  experts,
  users,
  specialties,
  languages
RESTART IDENTITY CASCADE;

INSERT INTO
  users (id, email, password_hash, full_name, date_of_birth, gender, email_verified)
VALUES
  ('cuid123456789abcdef0001', 'alice@example.com', '$2b$12$abc123fakebcryptpasswordhash0000000000000000000', 'alice smith', '1980-05-10', 'F', true)
;

INSERT INTO
  specialties (name)
VALUES
  ('cardiology'),
  ('dermatology'),
  ('neurology'),
  ('pediatrics')
;

INSERT INTO
  languages (code)
VALUES
  ('en'),
  ('fr'),
  ('es'),
  ('de')
;

INSERT INTO
  users (id, email, password_hash, full_name, date_of_birth, gender, email_verified)
VALUES
  ('cuid123456789abcdef0002', 'bob@example.com', '$2b$12$def456fakebcryptpasswordhash1111111111111111111', 'bob johnson', '1975-11-23', 'M', true),
  ('cuid123456789abcdef0003', 'carol@example.com', '$2b$12$ghi789fakebcryptpasswordhash2222222222222222222', 'carol williams', '1990-02-15', 'F', false)
;
INSERT INTO
  experts (id, specialty_id, city, phone)
VALUES
  ('cuid123456789abcdef0002', 1, 'new york', '+1-555-0101'),
  ('cuid123456789abcdef0003', 3, 'san francisco', '+1-555-0303')
;
INSERT INTO
  experts_languages (expert_id, language_id)
VALUES
  ('cuid123456789abcdef0002', 1),
  ('cuid123456789abcdef0002', 2),
  ('cuid123456789abcdef0003', 3)
;

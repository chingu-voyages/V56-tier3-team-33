CREATE TYPE gender_enum AS ENUM ('M', 'F');

CREATE TABLE users (
  id VARCHAR(24) PRIMARY KEY, -- cuid2
  email VARCHAR(254) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL CHECK (CHAR_LENGTH(password_hash) <= 60), --bcrypt size
  full_name VARCHAR(50) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender gender_enum NOT NULL,
  email_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE specialties (
  id SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE experts (
  id VARCHAR(24) PRIMARY KEY,
  specialty_id SMALLINT NOT NULL,
  city VARCHAR(50) NOT NULL,
  phone VARCHAR(25) NOT NULL,
  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (specialty_id) REFERENCES specialties(id) ON DELETE RESTRICT
);

CREATE TABLE languages (
  id SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  code CHAR(2) UNIQUE NOT NULL
);

CREATE TABLE experts_languages (
  expert_id VARCHAR(24),
  language_id SMALLINT,
  FOREIGN KEY (expert_id) REFERENCES experts(id) ON DELETE CASCADE,
  FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE,
  PRIMARY KEY (expert_id, language_id)
);

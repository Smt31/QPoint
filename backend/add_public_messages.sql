-- Add allow_public_messages column to users table
ALTER TABLE users ADD COLUMN allow_public_messages BOOLEAN NOT NULL DEFAULT false;

-- Add columns to Questions table
ALTER TABLE public."Questions"
ADD COLUMN name TEXT,
ADD COLUMN email TEXT,
ADD COLUMN question TEXT;
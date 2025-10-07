-- Add columns to Contributions table
ALTER TABLE public."Contributions"
ADD COLUMN name TEXT,
ADD COLUMN email TEXT,
ADD COLUMN article_topic TEXT,
ADD COLUMN article_summary TEXT,
ADD COLUMN policy_agreement BOOLEAN DEFAULT false;

-- Add columns to Newsletter Sub table
ALTER TABLE public."Newsletter Sub"
ADD COLUMN email TEXT,
ADD COLUMN policy_agreement BOOLEAN DEFAULT false;
DO $$ BEGIN
  CREATE TYPE "MessageStatus" AS ENUM ('UNREAD', 'READ', 'REPLIED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "contact_messages" (
  "id"        TEXT NOT NULL,
  "name"      TEXT NOT NULL,
  "email"     TEXT NOT NULL,
  "phone"     TEXT,
  "subject"   TEXT,
  "message"   TEXT NOT NULL,
  "status"    "MessageStatus" NOT NULL DEFAULT 'UNREAD',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id")
);

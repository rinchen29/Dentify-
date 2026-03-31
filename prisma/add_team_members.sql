CREATE TABLE IF NOT EXISTS "team_members" (
  "id"          TEXT         NOT NULL,
  "name"        TEXT         NOT NULL,
  "designation" TEXT         NOT NULL,
  "imageUrl"    TEXT,
  "experience"  TEXT,
  "description" TEXT,
  "sortOrder"   INTEGER      NOT NULL DEFAULT 0,
  "isActive"    BOOLEAN      NOT NULL DEFAULT true,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);

set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";

CREATE TABLE "public"."users" (
  "userId" serial NOT NULL,
  "username" TEXT NOT NULL UNIQUE,
  "hashedPassword" TEXT NOT NULL,
  "createdAt" timestamptz default now(),
  CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "public"."tasks" (
    "taskId" serial NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamptz default now(),
    CONSTRAINT "tasks_pk" PRIMARY KEY ("taskId")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

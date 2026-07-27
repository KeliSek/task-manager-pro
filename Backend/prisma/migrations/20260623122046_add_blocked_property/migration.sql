/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" ADD COLUMN     "blocked" BOOLEAN,
ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq'),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";

-- DropIndex
DROP INDEX "User_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

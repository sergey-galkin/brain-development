-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "salt" TEXT;

-- CreateIndex
CREATE INDEX "Result_userId_gameName_idx" ON "Result"("userId", "gameName");

-- CreateIndex
CREATE INDEX "User_login_email_created_idx" ON "User"("login", "email", "created");

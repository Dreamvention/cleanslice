-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailConfirmationExpiresAt" TIMESTAMP(3),
ADD COLUMN     "emailConfirmationToken" TEXT DEFAULT '',
ADD COLUMN     "emailConfirmed" BOOLEAN DEFAULT false,
ADD COLUMN     "password" TEXT DEFAULT '';

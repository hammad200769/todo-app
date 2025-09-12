/*
  Warnings:

  - A unique constraint covering the columns `[public_token]` on the table `email_verifications` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `email_verifications` ADD COLUMN `public_token` VARCHAR(255) NULL,
    ADD COLUMN `updated_at` TIMESTAMP(0) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `email_verifications_public_token_key` ON `email_verifications`(`public_token`);

/*
  Warnings:

  - Made the column `created_at` on table `email_verifications` required. This step will fail if there are existing NULL values in that column.
  - Made the column `public_token` on table `email_verifications` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `email_verifications` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `email_verifications` MODIFY `created_at` TIMESTAMP(0) NOT NULL,
    MODIFY `public_token` VARCHAR(255) NOT NULL,
    MODIFY `updated_at` TIMESTAMP(0) NOT NULL;

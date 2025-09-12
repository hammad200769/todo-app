/*
  Warnings:

  - Made the column `created_at` on table `blog_posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `blog_posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `blog_posts` ADD COLUMN `author` VARCHAR(255) NULL,
    ADD COLUMN `description` VARCHAR(350) NULL,
    MODIFY `created_at` TIMESTAMP(0) NOT NULL,
    MODIFY `updated_at` TIMESTAMP(0) NOT NULL;

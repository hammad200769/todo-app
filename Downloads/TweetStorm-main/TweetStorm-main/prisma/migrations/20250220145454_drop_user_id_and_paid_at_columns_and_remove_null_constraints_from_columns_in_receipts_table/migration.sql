/*
  Warnings:

  - You are about to drop the column `paid_at` on the `receipts` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `receipts` table. All the data in the column will be lost.
  - Made the column `created_at` on table `receipts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `receipts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amount_due` on table `receipts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amount_paid` on table `receipts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `invoice_url` on table `receipts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `receipts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subscription_id` on table `receipts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `receipts_user_id_index` ON `receipts`;

-- AlterTable
ALTER TABLE `receipts` DROP COLUMN `paid_at`,
    DROP COLUMN `user_id`,
    MODIFY `created_at` TIMESTAMP(0) NOT NULL,
    MODIFY `updated_at` TIMESTAMP(0) NOT NULL,
    MODIFY `amount_due` VARCHAR(255) NOT NULL,
    MODIFY `amount_paid` VARCHAR(255) NOT NULL,
    MODIFY `invoice_url` VARCHAR(255) NOT NULL,
    MODIFY `status` VARCHAR(255) NOT NULL,
    MODIFY `subscription_id` VARCHAR(255) NOT NULL;

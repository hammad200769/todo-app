/*
  Warnings:

  - Made the column `current_period_end` on table `subscriptions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `current_period_start` on table `subscriptions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `plan_id` on table `subscriptions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `subscriptions` DROP FOREIGN KEY `subscriptions_plan_id_fkey`;

-- AlterTable
ALTER TABLE `subscriptions` MODIFY `current_period_end` TIMESTAMP(0) NOT NULL,
    MODIFY `current_period_start` TIMESTAMP(0) NOT NULL,
    MODIFY `plan_id` TINYINT UNSIGNED NOT NULL;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

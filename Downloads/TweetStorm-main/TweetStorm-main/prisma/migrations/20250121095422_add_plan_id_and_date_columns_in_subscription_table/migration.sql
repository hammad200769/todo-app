/*
  Warnings:

  - You are about to drop the column `plan_id` on the `bulk_actions_usage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `bulk_actions_usage` DROP FOREIGN KEY `bulk_actions_usage_plan_id_fkey`;

-- AlterTable
ALTER TABLE `bulk_actions_usage` DROP COLUMN `plan_id`;

-- AlterTable
ALTER TABLE `subscriptions` ADD COLUMN `current_period_end` TIMESTAMP(0) NULL,
    ADD COLUMN `current_period_start` TIMESTAMP(0) NULL,
    ADD COLUMN `plan_id` TINYINT UNSIGNED NULL;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

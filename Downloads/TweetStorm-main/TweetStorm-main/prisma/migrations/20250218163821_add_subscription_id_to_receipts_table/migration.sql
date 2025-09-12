-- AlterTable
ALTER TABLE `receipts` ADD COLUMN `subscription_id` VARCHAR(255) NULL,
    MODIFY `user_id` BIGINT UNSIGNED NULL,
    MODIFY `paid_at` TIMESTAMP(0) NULL;

-- CreateIndex
CREATE INDEX `receipts_subscription_id_idx` ON `receipts`(`subscription_id`);

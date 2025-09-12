-- AlterTable
ALTER TABLE `receipts` ADD COLUMN `finalized_at` TIMESTAMP(0) NULL,
    ADD COLUMN `status` VARCHAR(255) NULL;

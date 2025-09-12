-- AlterTable
ALTER TABLE `receipts` ADD COLUMN `amount_due` VARCHAR(255) NULL,
    ADD COLUMN `amount_paid` VARCHAR(255) NULL;

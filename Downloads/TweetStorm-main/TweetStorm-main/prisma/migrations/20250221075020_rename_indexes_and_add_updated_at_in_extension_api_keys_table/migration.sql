-- DropForeignKey
ALTER TABLE `account_deletions` DROP FOREIGN KEY `account_deletions_user_id_foreign`;

-- AlterTable
ALTER TABLE `extension_api_keys` ADD COLUMN `updated_at` TIMESTAMP(0) NULL;

-- AddForeignKey
ALTER TABLE `account_deletions` ADD CONSTRAINT `account_deletions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `account_deletions` RENAME INDEX `user_id` TO `account_deletions_userId_key`;

-- AlterTable
ALTER TABLE `users` MODIFY `password` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `account_deletions` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` BIGINT UNSIGNED NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `deleted_at` TIMESTAMP(0) NOT NULL,
    `permanent_deletion_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `user_id`(`userId`),
    UNIQUE INDEX `account_deletions_email_unique`(`email`),
    INDEX `account_deletions_user_id_foreign`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account_deletion_verifications` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` BIGINT UNSIGNED NOT NULL,
    `code` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `expires_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `user_id`(`userId`),
    UNIQUE INDEX `account_deletion_verifications_code_unique`(`code`),
    INDEX `account_deletion_verifications_user_id_foreign`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `account_deletions` ADD CONSTRAINT `account_deletions_user_id_foreign` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `account_deletion_verifications` ADD CONSTRAINT `account_deletion_verifications_user_id_foreign` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

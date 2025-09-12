-- CreateTable
CREATE TABLE `extension_api_keys` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `key` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `expires_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `extension_api_keys_key_unique`(`key`),
    INDEX `extension_api_keys_user_id_foreign`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `extension_api_keys` ADD CONSTRAINT `extension_api_keys_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

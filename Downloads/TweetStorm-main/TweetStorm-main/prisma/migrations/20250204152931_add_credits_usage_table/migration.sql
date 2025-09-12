-- CreateTable
CREATE TABLE `credits_usage` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `credits_used` INTEGER UNSIGNED NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL,
    `updatedAt` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `credits_usage_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

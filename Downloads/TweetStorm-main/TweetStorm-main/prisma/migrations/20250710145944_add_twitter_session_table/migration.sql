-- CreateTable
CREATE TABLE `twitter_sessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `headers` JSON NOT NULL,
    `cookies` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_valid` BOOLEAN NOT NULL DEFAULT true,
    `last_used` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `url` VARCHAR(255) NOT NULL,

    INDEX `twitter_sessions_is_valid_idx`(`is_valid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

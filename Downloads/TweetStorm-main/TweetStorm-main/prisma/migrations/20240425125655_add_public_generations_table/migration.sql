-- CreateTable
CREATE TABLE `public_generations` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` TINYINT NOT NULL,
    `ip_address` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,

    INDEX `public_generations_type_ip_address_idx`(`type`, `ip_address`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

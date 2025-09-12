-- CreateTable
CREATE TABLE `tweet_searches` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `all_these_words` VARCHAR(1000) NULL,
    `exact_match_phrase` VARCHAR(500) NULL,
    `any_these_words` VARCHAR(2000) NULL,
    `excluded_words` VARCHAR(1000) NULL,
    `hashtags` VARCHAR(1000) NULL,
    `language` VARCHAR(255) NULL,
    `from_accounts` VARCHAR(500) NULL,
    `to_accounts` VARCHAR(500) NULL,
    `mention_accounts` VARCHAR(500) NULL,
    `min_likes` INTEGER NULL,
    `min_replies` INTEGER NULL,
    `min_reposts` INTEGER NULL,
    `replies_filter` TINYINT NOT NULL DEFAULT 0,
    `links_filter` TINYINT NOT NULL DEFAULT 0,
    `from_followed_people` BOOLEAN NOT NULL DEFAULT false,
    `from_nearby` BOOLEAN NOT NULL DEFAULT false,
    `location` VARCHAR(500) NULL,
    `distance` INTEGER NULL,
    `start_date` TIMESTAMP(0) NULL,
    `end_date` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    INDEX `tweet_searches_user_id_foreign`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tweet_searches` ADD CONSTRAINT `tweet_searches_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- CreateTable
CREATE TABLE `plans` (
    `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `stripe_price_id` VARCHAR(255) NOT NULL,
    `price` INTEGER UNSIGNED NOT NULL,
    `interval` VARCHAR(255) NOT NULL,
    `tweet_deletions` INTEGER UNSIGNED NULL,
    `tweet_unlikes` INTEGER UNSIGNED NULL,
    `tweet_likes` INTEGER UNSIGNED NULL,
    `retweets` INTEGER UNSIGNED NULL,
    `follows` INTEGER UNSIGNED NULL,
    `unfollows` INTEGER UNSIGNED NULL,
    `credits` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `plans_stripe_price_id_key`(`stripe_price_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bulk_actions_usage` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `plan_id` TINYINT UNSIGNED NULL,
    `tweet_deletions` INTEGER UNSIGNED NOT NULL,
    `tweet_unlikes` INTEGER UNSIGNED NOT NULL,
    `tweet_likes` INTEGER UNSIGNED NOT NULL,
    `retweets` INTEGER UNSIGNED NOT NULL,
    `follows` INTEGER UNSIGNED NOT NULL,
    `unfollows` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,
    `last_reset_on` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `bulk_actions_usage_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bulk_actions_usage` ADD CONSTRAINT `bulk_actions_usage_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `bulk_actions_usage` ADD CONSTRAINT `bulk_actions_usage_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

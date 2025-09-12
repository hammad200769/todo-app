/*
  Warnings:

  - You are about to drop the column `name` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `trial_ends_at` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `user_generations` table. All the data in the column will be lost.
  - You are about to drop the column `billing_address` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `billing_address_line_2` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `billing_city` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `billing_country` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `billing_postal_code` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `billing_state` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `current_team_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `extra_billing_information` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_login_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_login_ip` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `receipt_emails` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `trial_ends_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `two_factor_confirmed_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `two_factor_recovery_codes` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `two_factor_secret` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `vat_id` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `subscriptions` DROP COLUMN `name`,
    DROP COLUMN `quantity`,
    DROP COLUMN `trial_ends_at`;

-- AlterTable
ALTER TABLE `user_generations` DROP COLUMN `tag`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `billing_address`,
    DROP COLUMN `billing_address_line_2`,
    DROP COLUMN `billing_city`,
    DROP COLUMN `billing_country`,
    DROP COLUMN `billing_postal_code`,
    DROP COLUMN `billing_state`,
    DROP COLUMN `current_team_id`,
    DROP COLUMN `extra_billing_information`,
    DROP COLUMN `last_login_at`,
    DROP COLUMN `last_login_ip`,
    DROP COLUMN `receipt_emails`,
    DROP COLUMN `trial_ends_at`,
    DROP COLUMN `two_factor_confirmed_at`,
    DROP COLUMN `two_factor_recovery_codes`,
    DROP COLUMN `two_factor_secret`,
    DROP COLUMN `vat_id`;

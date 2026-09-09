-- Widens the credential columns so they can hold a PBKDF2 hash and a session
-- token, and adds the token expiry used by the /login endpoint.
--
-- Run once against the `avtobase` database:
--     mysql -u root -p avtobase < db/002_auth.sql

ALTER TABLE `users`
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `token`    VARCHAR(255) NULL;

ALTER TABLE `users`
    ADD COLUMN IF NOT EXISTS `token_expires` DATETIME NULL AFTER `token`;

CREATE INDEX IF NOT EXISTS `idx_users_token` ON `users` (`token`);
CREATE INDEX IF NOT EXISTS `idx_users_email` ON `users` (`email`);

-- Helpful indexes for the filters on the vehicle list.
CREATE INDEX IF NOT EXISTS `idx_vehicles_brand` ON `vehicles` (`brand`);
CREATE INDEX IF NOT EXISTS `idx_vehicles_price` ON `vehicles` (`price`);

-- The existing rows still hold clear text passwords. They keep working and are
-- rewritten as a hash the first time each user logs in successfully.

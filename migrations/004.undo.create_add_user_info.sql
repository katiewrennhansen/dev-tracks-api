ALTER TABLE dev_tracks_users
    DROP COLUMN IF EXISTS email;

ALTER TABLE dev_tracks_users
    DROP COLUMN IF EXISTS bio;

ALTER TABLE dev_tracks_users
    DROP COLUMN IF EXISTS photo;
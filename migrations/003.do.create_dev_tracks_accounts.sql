CREATE TABLE user_accounts (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    user_id INTEGER REFERENCES dev_tracks_users(id)  
        ON DELETE SET NULL
);


CREATE TABLE user_projects (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL,
    url TEXT,
    description TEXT,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    user_id INTEGER REFERENCES dev_tracks_users(id)  
        ON DELETE SET NULL
);


